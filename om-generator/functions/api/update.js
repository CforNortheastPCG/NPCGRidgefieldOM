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
    buildingInfo: { type: 'object', additionalProperties: false, properties: { construction: { type: 'string' }, foundation: { type: 'string' }, roof: { type: 'string' }, exterior: { type: 'string' }, windows: { type: 'string' }, mechanicals: { type: 'string' }, electrical: { type: 'string' }, fireProtection: { type: 'string' } }, required: ['construction', 'foundation', 'roof', 'exterior', 'windows', 'mechanicals', 'electrical', 'fireProtection'] },
    rentRoll: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { unit: { type: 'string' }, type: { type: 'string' }, sf: { type: 'string' }, designation: { type: 'string' }, inPlace: { type: 'string' }, market: { type: 'string' }, proforma: { type: 'string' } }, required: ['unit', 'type', 'sf', 'designation', 'inPlace', 'market', 'proforma'] } },
    expenses: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { label: { type: 'string' }, amount: { type: 'string' } }, required: ['label', 'amount'] } },
    locationOverview: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'type', 'askingPrice', 'units', 'summary', 'highlights', 'siteSummary', 'utilities', 'buildingInfo', 'rentRoll', 'expenses', 'locationOverview'],
}
const CONTENT_KEYS = Object.keys(SCHEMA.properties)

const SYSTEM = `You edit ONE page of a Northeast Private Client Group multifamily Offering Memorandum. You are given only that page's slice of the deal model as JSON, plus an instruction. Apply ONLY what the instruction asks; leave every other field exactly as-is. Return the full object matching the schema you were given. Never invent specific numbers (prices, rents, units) the user didn't provide — if asked to add a fact that isn't given, use "TODO". Keep NPCG-style professional prose.`

// Build a reduced schema containing only the page's keys (all required) so the
// model returns just that page's slice — it isn't asked to regenerate the rest.
function subSchema(keys) {
  const properties = {}, required = []
  for (const k of keys) { properties[k] = SCHEMA.properties[k]; required.push(k) }
  return { type: 'object', additionalProperties: false, properties, required }
}

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

  // Scope the edit to one page: only the requested keys are sent to and merged
  // from the model. Falls back to all content keys if no valid scope is given.
  const requested = Array.isArray(body.scope) ? body.scope.filter(k => CONTENT_KEYS.includes(k)) : []
  const scope = requested.length ? requested : CONTENT_KEYS
  const pageName = typeof body.page === 'string' && body.page ? body.page : 'the selected page'

  const content = {}
  for (const k of scope) if (k in body.deal) content[k] = body.deal[k]

  // Reference documents (e.g. the attached rent roll / I&E) the edit can cite.
  let refBlock = ''
  if (Array.isArray(body.refs) && body.refs.length) {
    const joined = body.refs
      .filter(r => r && typeof r.text === 'string')
      .map(r => `[${typeof r.name === 'string' ? r.name : 'document'}]\n${r.text}`)
      .join('\n\n')
      .slice(0, 60000) // hard cap so a big workbook can't blow the prompt
    if (joined) refBlock = `\n\nReference documents (source of truth — pull exact figures from these where the instruction asks):\n${joined}`
  }

  const client = new Anthropic({ apiKey })
  try {
    const res = await client.messages.create({
      model, max_tokens: 8000, system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema: subSchema(scope) } },
      messages: [{ role: 'user', content: `Page being edited: ${pageName}\nThis page's current content:\n${JSON.stringify(content)}${refBlock}\n\nInstruction: ${instruction}` }],
    })
    const text = res.content.find(b => b.type === 'text')?.text || '{}'
    let updated
    try { updated = JSON.parse(text) } catch { return json({ error: 'Model returned malformed JSON.' }, 502) }
    // Merge only the scoped keys back; everything else (identity, media, other pages) is untouched.
    const patch = {}
    for (const k of scope) if (k in updated) patch[k] = updated[k]
    return json({ deal: { ...body.deal, ...patch }, note: `Updated ${pageName}.` })
  } catch (err) {
    const status = err?.status ? ` (HTTP ${err.status})` : ''
    return json({ error: `Update failed${status}: ${err?.message || String(err)}` }, 502)
  }
}
