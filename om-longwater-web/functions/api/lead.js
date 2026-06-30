/* ═══════════════════ POST /api/lead ═══════════════════
   Cloudflare Pages Function. Receives a gate submission and emails it to you
   via the Cloudflare Email Sending REST API (sent from your own Cloudflare
   domain, e.g. npcgexclusives.com). Email-only for now — no database.

   The email step degrades gracefully: if the vars below aren't set the lead
   is logged to the function console and the prospect is still let through
   (never block a real prospect on a backend hiccup).

   Env vars (Pages project → Settings → Variables and Secrets):
     CF_ACCOUNT_ID    var      — your Cloudflare account ID
     CF_EMAIL_TOKEN   secret   — API token with "Email Sending" send permission
     LEAD_FROM        var      — verified sender on your domain, e.g. "leads@npcgexclusives.com"
     LEAD_FROM_NAME   var      — sender display name (optional)
     LEAD_NOTIFY_TO   var      — where leads go (default below)

   The sender domain must be onboarded to Email Sending first:
     npx wrangler email sending enable npcgexclusives.com
   See SETUP.md for the full checklist. */

const DEFAULT_FROM = 'leads@npcgexclusives.com'
const DEFAULT_FROM_NAME = 'Longwater Corporate Center OM'
const DEFAULT_NOTIFY = 'tegbers@northeastpcg.com'

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }

  const name = String(body.name || '').trim().slice(0, 200)
  const email = String(body.email || '').trim().slice(0, 200)
  const phone = String(body.phone || '').trim().slice(0, 60)
  const company = String(body.company || '').trim().slice(0, 200)
  const deal = String(body.deal || 'Longwater Corporate Center').trim().slice(0, 200)
  const page = String(body.page || '').trim().slice(0, 500)

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Name and a valid email are required.' }, 422)
  }

  const ts = new Date().toISOString()
  const ip = request.headers.get('CF-Connecting-IP') || ''
  const ua = request.headers.get('User-Agent') || ''

  // ── Email the lead to you via Cloudflare Email Sending ──
  if (env.CF_ACCOUNT_ID && env.CF_EMAIL_TOKEN) {
    const to = (env.LEAD_NOTIFY_TO || DEFAULT_NOTIFY)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const rows = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone || '—'],
      ['Company', company || '—'],
      ['Deal', deal],
      ['Time', ts],
      ['Page', page],
      ['IP', ip],
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:700;color:#3f4753">${esc(k)}</td><td style="padding:4px 0;color:#281B12">${esc(v)}</td></tr>`,
      )
      .join('')
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px">
      <h2 style="color:#281B12;margin:0 0 4px">New OM lead — ${esc(deal)}</h2>
      <p style="color:#5b6470;margin:0 0 14px">A prospect requested access to the offering memorandum.</p>
      <table style="border-collapse:collapse">${rows}</table>
    </div>`
    const text =
      `New OM lead — ${deal}\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n` +
      `Company: ${company || '—'}\nTime: ${ts}\nPage: ${page}\nIP: ${ip}\nUA: ${ua}\n`

    try {
      const r = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.CF_EMAIL_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to,
            from: { address: env.LEAD_FROM || DEFAULT_FROM, name: env.LEAD_FROM_NAME || DEFAULT_FROM_NAME },
            reply_to: { address: email, name },
            subject: `New OM lead: ${name}${company ? ` (${company})` : ''} — ${deal}`,
            html,
            text,
          }),
        },
      )
      if (!r.ok) console.error('Email Sending failed', r.status, await r.text())
    } catch (e) {
      console.error('Email Sending request error', e)
    }
  } else {
    console.warn('CF_ACCOUNT_ID / CF_EMAIL_TOKEN not configured — lead not emailed:', {
      name,
      email,
      phone,
      company,
      ts,
    })
  }

  return json({ ok: true })
}
