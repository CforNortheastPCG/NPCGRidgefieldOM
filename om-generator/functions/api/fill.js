import Anthropic from '@anthropic-ai/sdk'

/* ═══════════════════ AI STRUCTURED FILL ═══════════════════
   POST /api/fill  { password, model, facts, enriched }
   Claude turns the user's free-text deal facts (+ the scripted Google enrichment)
   into a STRUCTURED deal model (JSON, not Markdown) that the deck renderer reads.
   Deterministic identity fields come from `enriched`; AI fills the prose +
   normalizes the rent roll. Income/expense math is done by script downstream. */

const ALLOWED_MODELS = ['claude-opus-4-8', 'claude-fable-5', 'claude-sonnet-4-6', 'claude-haiku-4-5']
const MAX_FACTS = 8000

// JSON Schema for structured outputs (no minLength/maximum etc — not supported).
const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'Marketing name, e.g. "Main Street Apartments"' },
    type: { type: 'string', description: 'e.g. "9-Unit Multifamily Property"' },
    askingPrice: { type: 'string', description: 'Formatted, e.g. "$3,600,000", or "TODO" if not given' },
    units: { type: 'integer' },
    summary: { type: 'array', items: { type: 'string' }, description: '2-3 executive-summary paragraphs' },
    highlights: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: { title: { type: 'string' }, body: { type: 'string' } },
        required: ['title', 'body'],
      },
      description: '4 investment highlights',
    },
    siteSummary: {
      type: 'object', additionalProperties: false,
      properties: {
        propertyType: { type: 'string' }, totalUnits: { type: 'string' }, buildings: { type: 'string' },
        lotSize: { type: 'string' }, buildingSF: { type: 'string' }, yearBuilt: { type: 'string' },
        zoning: { type: 'string' }, parking: { type: 'string' },
      },
      required: ['propertyType', 'totalUnits', 'buildings', 'lotSize', 'buildingSF', 'yearBuilt', 'zoning', 'parking'],
    },
    utilities: {
      type: 'object', additionalProperties: false,
      properties: { heat: { type: 'string' }, electric: { type: 'string' }, water: { type: 'string' } },
      required: ['heat', 'electric', 'water'],
    },
    rentRoll: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          unit: { type: 'string' }, type: { type: 'string' }, sf: { type: 'string' },
          designation: { type: 'string' }, inPlace: { type: 'string' }, market: { type: 'string' }, proforma: { type: 'string' },
        },
        required: ['unit', 'type', 'sf', 'designation', 'inPlace', 'market', 'proforma'],
      },
    },
    expenses: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: { label: { type: 'string' }, amount: { type: 'string' } },
        required: ['label', 'amount'],
      },
    },
    locationOverview: { type: 'array', items: { type: 'string' }, description: '1-2 paragraphs on the city/market' },
  },
  required: ['name', 'type', 'askingPrice', 'units', 'summary', 'highlights', 'siteSummary', 'utilities', 'rentRoll', 'expenses', 'locationOverview'],
}

const SYSTEM = `You structure the content for a Northeast Private Client Group (NPCG) multifamily Offering Memorandum. Return ONLY the structured object matching the schema. Base every number on the facts provided; where a fact is missing put "TODO" (never invent prices, rents, addresses, or unit counts). Write tight, professional NPCG-style prose. The property's address, city, and state are already known — use them but don't restate the whole address in every sentence.`

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
  const facts = (typeof body.facts === 'string' ? body.facts : '').trim()
  if (!facts) return json({ error: 'Describe the deal first.' }, 400)
  if (facts.length > MAX_FACTS) return json({ error: 'Deal description too long.' }, 413)

  const apiKey = env.ANTHROPIC_API_KEY
  if (!apiKey) return json({ error: 'Server is missing the ANTHROPIC_API_KEY secret.' }, 500)
  const model = ALLOWED_MODELS.includes(body.model) ? body.model : 'claude-opus-4-8'

  const enriched = body.enriched && typeof body.enriched === 'object'
    ? `Known (from the address — use verbatim): ${JSON.stringify({
        name: body.enriched.street, street: body.enriched.street, cityState: body.enriched.cityState, cityLong: body.enriched.cityLong,
      })}`
    : ''

  const client = new Anthropic({ apiKey })
  try {
    const res = await client.messages.create({
      model,
      max_tokens: 8000,
      system: SYSTEM,
      output_config: { format: { type: 'json_schema', schema: SCHEMA } },
      messages: [{ role: 'user', content: `${enriched}\n\nDeal facts:\n${facts}` }],
    })
    const text = res.content.find(b => b.type === 'text')?.text || '{}'
    let deal
    try { deal = JSON.parse(text) } catch { return json({ error: 'Model returned malformed JSON.', raw: text.slice(0, 400) }, 502) }
    return json({ deal })
  } catch (err) {
    const status = err?.status ? ` (HTTP ${err.status})` : ''
    return json({ error: `Generation failed${status}: ${err?.message || String(err)}` }, 502)
  }
}
