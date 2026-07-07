/* ═══════════════════ API MIDDLEWARE — runs before every /api/* function ═══════
   Cross-cutting guards, applied centrally so each endpoint can't forget them:
     • POST-only            (405 otherwise)
     • Same-origin only      (403 for cross-site browser calls)
     • Per-IP burst limit + global daily ceiling (KV-backed; fail-open until the
       RL namespace is bound in the Pages dashboard)
   Per-endpoint concerns (password, input caps, max_tokens) stay in each function. */

const PER_MIN = 15      // requests per IP per minute (a "Build" = enrich + fill = 2)
const PER_IP_DAY = 120  // requests per IP per day
const DAILY = 400       // global requests per day — coarse cost ceiling

function json(obj, status, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  })
}

async function underLimit(kv, key, limit, ttl) {
  if (!kv) return true // KV not bound → rate limiting disabled (fail open)
  const n = parseInt((await kv.get(key)) || '0', 10)
  if (n >= limit) return false
  await kv.put(key, String(n + 1), { expirationTtl: ttl })
  return true
}

export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { allow: 'POST' })

  const origin = request.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return json({ error: 'Forbidden.' }, 403)
    } catch { return json({ error: 'Forbidden.' }, 403) }
  }

  const kv = env.RL
  const ip = request.headers.get('cf-connecting-ip') || 'unknown'
  const now = Date.now()
  const min = Math.floor(now / 60000)
  const day = Math.floor(now / 86400000)

  if (!(await underLimit(kv, `m:${ip}:${min}`, PER_MIN, 120))) {
    return json({ error: 'Too many requests — slow down and retry in a minute.' }, 429, { 'retry-after': '60' })
  }
  if (!(await underLimit(kv, `id:${ip}:${day}`, PER_IP_DAY, 90000))) {
    return json({ error: 'Daily limit reached for your network. Try again tomorrow.' }, 429, { 'retry-after': '3600' })
  }
  if (!(await underLimit(kv, `gd:${day}`, DAILY, 90000))) {
    return json({ error: 'Service daily limit reached. Try again tomorrow.' }, 429, { 'retry-after': '3600' })
  }

  return context.next()
}
