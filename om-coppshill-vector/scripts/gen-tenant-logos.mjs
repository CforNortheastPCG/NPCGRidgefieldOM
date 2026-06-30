/* ═══════════════════ TENANT BRAND LOGOS ═══════════════════
   Fetches a clean square brand mark for each Copps Hill tenant and writes
   src/tenantLogos.js (tenant name → /logos/tenants/<file>). For each domain we
   parse the homepage and prefer, in order: apple-touch-icon → largest rel=icon
   → og:image, then fall back to Google's favicon service. Mom-and-pop spots
   with no usable mark simply don't get one (the page renders a monogram).

   Run:  npm run tenant-logos   (no API key needed)
*/
import { writeFileSync, mkdirSync } from 'node:fs'

// tenant display name (must match TENANTS in App.jsx) → site domain
const TENANTS = [
  { name: 'Nancy O', domain: 'shopnancyo.com' },
  { name: 'Tutoring Club', domain: 'tutoringclub.com' },
  { name: 'Legacy Martial Arts', domain: 'legacymartialartsridgefield.com' },
  { name: 'HIGHLIFE', domain: 'highlifebytom.com' },
  { name: 'Talbots', domain: 'talbots.com' },
  { name: 'DiMaggio Hair Design', domain: 'dimaggiohairdesign.com' },
  { name: 'Southwest Café', domain: 'southwestcafe.com' },
  { name: 'Ridgefield Organics', domain: 'ridgefieldorganics.com' },
  { name: 'Ross Bakery & Café', domain: 'rossartisanalbakeryandcafe.com' },
  { name: 'No. 109 Cheese Market', domain: '109cheeseandwine.com' },
  { name: 'À Table', domain: 'atableus.com' },
  { name: 'Kick Fit', domain: 'kickfitct.com' },
  { name: 'Ridgefield Health & Wellness', domain: 'ridgefieldhealthandwellness.com' },
  // JKH Laundry — no usable web logo; renders a monogram.
]

// Hand-picked clean logo URLs (override the auto homepage scrape) — used when a
// site's favicon is too small or its og:image is a hero photo, not a mark.
const OVERRIDES = {
  'Talbots': 'https://www.talbots.com/on/demandware.static/Sites-talbotsus-Site/-/default/dw0377f5ad/images/haven-images/talbots-logo.png',
  'DiMaggio Hair Design': 'https://www.dimaggiohairdesign.com/files/dimaggio-icon-sm.jpg',
  'Tutoring Club': 'https://tutoringclub.com/apple-icon-180x180.png',
  'Ridgefield Organics': 'https://lirp.cdn-website.com/08008879/dms3rep/multi/opt/RO_green-1920w-1920w.webp',
}
// Tenants whose only fetchable asset is junk (tiny favicon / building photo) —
// leave them logo-less so the page renders a clean monogram instead.
const SKIP = new Set(['No. 109 Cheese Market', 'Ridgefield Health & Wellness'])

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
const root = new URL('../', import.meta.url)
const outDir = new URL('public/logos/tenants/', root)
mkdirSync(outDir, { recursive: true })

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const ext = (ct, url) => {
  if (/svg/.test(ct) || /\.svg(\?|$)/i.test(url)) return 'svg'
  if (/png/.test(ct) || /\.png(\?|$)/i.test(url)) return 'png'
  if (/jpe?g/.test(ct) || /\.jpe?g(\?|$)/i.test(url)) return 'jpg'
  if (/webp/.test(ct) || /\.webp(\?|$)/i.test(url)) return 'webp'
  return 'png'
}

async function getBuf(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || ''
    if (!/image|octet-stream|svg/.test(ct) && !/\.(png|jpe?g|svg|webp|ico)(\?|$)/i.test(url)) return null
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length > 600 ? { buf, ct } : null   // skip 1x1 / empty placeholders
  } catch { return null }
}

// Pull candidate logo URLs out of the homepage <head>.
async function candidates(domain) {
  const base = `https://${domain}/`
  const list = []
  try {
    const res = await fetch(base, { redirect: 'follow', headers: { 'User-Agent': UA } })
    const finalBase = res.url || base
    const html = await res.text()
    const abs = (u) => { try { return new URL(u, finalBase).href } catch { return null } }
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0])
    const pick = (rel) => links.filter(l => new RegExp(`rel=["'][^"']*${rel}`, 'i').test(l))
      .map(l => (l.match(/href=["']([^"']+)["']/i) || [])[1]).filter(Boolean).map(abs).filter(Boolean)
    list.push(...pick('apple-touch-icon'))
    // rel=icon, biggest sizes first
    const icons = links.filter(l => /rel=["'][^"']*\bicon\b/i.test(l) && !/apple/i.test(l))
      .map(l => ({ href: (l.match(/href=["']([^"']+)["']/i) || [])[1], sz: parseInt((l.match(/sizes=["'](\d+)/i) || [])[1] || '0', 10) }))
      .filter(x => x.href).sort((a, b) => b.sz - a.sz).map(x => abs(x.href)).filter(Boolean)
    list.push(...icons)
    const og = (html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || [])[1]
      || (html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i) || [])[1]
    if (og) list.push(abs(og))
  } catch { /* fall through to favicon */ }
  list.push(`https://${domain}/apple-touch-icon.png`)
  list.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=256`)
  return [...new Set(list.filter(Boolean))]
}

const map = {}
for (const t of TENANTS) {
  if (SKIP.has(t.name)) { console.log(`  – ${t.name} (monogram)`); continue }
  let saved = null
  const urls = OVERRIDES[t.name] ? [OVERRIDES[t.name], ...await candidates(t.domain)] : await candidates(t.domain)
  for (const url of urls) {
    const got = await getBuf(url)
    if (!got) continue
    const file = `${slug(t.name)}.${ext(got.ct, url)}`
    writeFileSync(new URL(file, outDir), got.buf)
    map[t.name] = `/logos/tenants/${file}`
    saved = `${file}  ← ${url.replace(/\?.*/, '')}`
    break
  }
  console.log(saved ? `  ✓ ${t.name} → ${saved}` : `  ✗ ${t.name} (${t.domain})`)
}

const out = `/* AUTO-GENERATED by scripts/gen-tenant-logos.mjs — do not edit by hand.
   Maps a tenant \`name\` to a downloaded logo under /public/logos/tenants/. */
export const TENANT_LOGOS = ${JSON.stringify(map, null, 2)}
`
writeFileSync(new URL('src/tenantLogos.js', root), out)
console.log(`\nWrote src/tenantLogos.js (${Object.keys(map).length}/${TENANTS.length} logos)`)
