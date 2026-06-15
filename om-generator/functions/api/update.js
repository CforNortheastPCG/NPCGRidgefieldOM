import Anthropic from '@anthropic-ai/sdk'

/* ═══════════════════ AI UPDATE CHAT ═══════════════════
   POST /api/update  { password, model, deal, instruction }
   Applies a natural-language edit to the deal model and returns the updated one.
   Only the AI-owned CONTENT fields are regenerated; the scripted identity/media
   fields (street, cityState, cover, map, amenities, lat/lng) are preserved. */

const ALLOWED_MODELS = ['claude-opus-4-8', 'claude-fable-5', 'claude-sonnet-4-6', 'claude-haiku-4-5']

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    name: { type: 'string' }, type: { type: 'string' }, askingPrice: { type: 'string' }, units: { type: 'integer' },
    summary: { type: 'array', items: { type: 'string' } },
    highlights: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, body: { type: 'string' } }, required: ['title', 'body'] } },
    siteSummary: { type: 'object', additionalProperties: false, properties: { propertyType: { type: 'string' }, totalUnits: { type: 'string' }, buildings: { type: 'string' }, lotSize: { type: 'string' }, buildingSF: { type: 'string' }, yearBuilt: { type: 'string' }, zoning: { type: 'string' }, parking: { type: 'string' } }, required: ['propertyType', 'totalUnits', 'buildings', 'lotSize', 'buildingSF', 'yearBuilt', 'zoning', 'parking'] },
    utilities: { type: 'object', additionalProperties: false, properties: { heat: { type: 'string' }, electric: { type: 'string' }, water: { type: 'string' } }, required: ['heat', 'electric', 'water'] },
    rentRoll: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { unit: { type: 'string' }, type: { type: 'string' }, sf: { type: 'string' }, designation: { type: 'string' }, inPlace: { type: 'string' }, market: { type: 'string' }, proforma: { type: 'string' } }, required: ['unit', 'type', 'sf', 'designation', 'inPlace', 'market', 'proforma'] } },
    expenses: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { label: { type: 'string' }, amount: { type: 'string' } }, required: ['label', 'amount'] } },
    locationOverview: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'type', 'askingPrice', 'units', 'summary', 'highlights', 'siteSummary', 'utilities', 'rentRoll', 'expenses', 'locationOverview'],
}
const CONTENT_KEYS = Object.keys(SCHEMA.properties)

const SYSTEM = `You edit the content of a Northeast Private Client Group multifamily Offering Memorandum. You are given the current content as JSON and an instruction. Apply ONLY what the instruction asks; leave everything else exactly as-is. Return the full updated content object matching the schema. Never invent specific numbers (prices, rents, units) the user didn't provide — if asked to add a fact that isn't given, use "TODO". Keep NPCG-style professional prose.`

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })
}
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0
}

export async function onRequestPost(context) {
  const { request, env } = context
  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid request.' }, 400) }
  if (!safeEqual(body.password, env.OM_PASSWORD || 'NPCGOM2026!')) return json({ error: 'Wrong password.' }, 401)
  if (!body.deal || typeof body.deal !== 'object') return json({ error: 'No OM to update.' }, 400)
  const instruction = (typeof body.instruction === 'string' ? body.instruction : '').trim()
  if (!instruction) return json({ error: 'What should I change?' }, 400)
  if (instruction.length > 2000) return json({ error: 'Instruction too long.' }, 413)

  const apiKey = env.ANTHROPIC_API_KEY
  if (!apiKey) return json({ error: 'Server is missing the ANTHROPIC_API_KEY secret.' }, 500)
  const model = ALLOWED_MODELS.includes(body.model) ? body.model : 'claude-opus-4-8'

  // Pass only the AI-owned content fields to the model.
  const content = {}
  for (const k of CONTENT_KEYS) if (k in body.deal) content[k] = body.deal[k]

  const client = new Anthropic({ apiKey })
  try {
    const res = await client.messages.create({
      model, max_tokens: 8000, system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema: SCHEMA } },
      messages: [{ role: 'user', content: `Current content:\n${JSON.stringify(content)}\n\nInstruction: ${instruction}` }],
    })
    const text = res.content.find(b => b.type === 'text')?.text || '{}'
    let updated
    try { updated = JSON.parse(text) } catch { return json({ error: 'Model returned malformed JSON.' }, 502) }
    // Merge: keep scripted identity/media (street, cover, map, amenities, …); overwrite content.
    return json({ deal: { ...body.deal, ...updated }, note: 'Updated.' })
  } catch (err) {
    const status = err?.status ? ` (HTTP ${err.status})` : ''
    return json({ error: `Update failed${status}: ${err?.message || String(err)}` }, 502)
  }
}
