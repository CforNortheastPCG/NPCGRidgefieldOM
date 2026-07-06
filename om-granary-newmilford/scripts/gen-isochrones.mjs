/* Drive-time band generator for Black Rock Commons — COASTAL raw-polygon method.

   The property is on the Long Island Sound shoreline, so a point-centered radial
   ring is the wrong shape (it fills the water wedge between the east/west coastal
   arms). Instead we take Valhalla's raw road-following isochrone polygon — which,
   because costing:auto only follows roads, already EXCLUDES the water — then
   decimate it to even spacing and Chaikin-smooth it for a clean filled band.

   The radial-envelope helpers below (destPoint/bearingFrom/fillGaps/medianFilter/
   movingAvg + BINS/MEDIAN/SMOOTH/CHAIKIN) are retained for INLAND deals that want
   the organic "star" rings; the coastal block at the bottom is what runs here.
   One /isochrone call — fast to re-run.  npm run isochrones */
import { writeFileSync } from 'node:fs'

const SUBJECT = { lat: 41.157532, lon: -73.226828 } // 2836 Fairfield Ave, Bridgeport CT (Black Rock)
const CONTOURS = [
  { time: 60, color: '#C0392B' },
  { time: 45, color: '#7D3C98' },
  { time: 30, color: '#2471A3' },
  { time: 15, color: '#229954' },
]
const VALHALLA = 'https://valhalla1.openstreetmap.de/isochrone'
const BINS = 360      // bearing bins around the property
const MEDIAN = 3      // radius median-filter window (despike outliers); 1 = off
const SMOOTH = 5      // radius moving-average window — turns zigzag into rolling waves
const CHAIKIN = 1     // corner-rounding passes

const R = 6371, toRad = d => d * Math.PI / 180, toDeg = r => r * 180 / Math.PI
function destPoint(lat, lon, brgDeg, km) {
  const d = km / R, b = toRad(brgDeg), la = toRad(lat), lo = toRad(lon)
  const la2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(b))
  const lo2 = lo + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(la), Math.cos(d) - Math.sin(la) * Math.sin(la2))
  return [toDeg(la2), toDeg(lo2)]
}
function bearingFrom(lat1, lon1, lat2, lon2) {
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2))
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1))
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}
function haversine(lat1, lon1, lat2, lon2) {
  const dLa = toRad(lat2 - lat1), dLo = toRad(lon2 - lon1)
  const s = Math.sin(dLa / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLo / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}
function outerRing(geom) {
  const rings = geom.type === 'Polygon' ? [geom.coordinates[0]] : geom.coordinates.map(p => p[0])
  return rings.sort((a, b) => b.length - a.length)[0]
}
function fillGaps(r) { // circular nearest-interpolation of empty (-1) bins
  const n = r.length
  for (let i = 0; i < n; i++) {
    if (r[i] >= 0) continue
    let lo = i, hi = i
    while (r[(lo + n) % n] < 0) lo--
    while (r[hi % n] < 0) hi++
    const a = r[(lo + n) % n], b = r[hi % n], t = (i - lo) / (hi - lo)
    r[i] = a + (b - a) * t
  }
  return r
}
function medianFilter(r, w) {
  if (w <= 1) return r.slice()
  const n = r.length, h = (w - 1) / 2, out = new Array(n)
  for (let i = 0; i < n; i++) {
    const win = []
    for (let k = -h; k <= h; k++) win.push(r[(i + k + n) % n])
    win.sort((a, b) => a - b); out[i] = win[Math.floor(win.length / 2)]
  }
  return out
}
function movingAvg(r, w) { // circular low-pass — kills zigzag, keeps big waves
  if (w <= 1) return r.slice()
  const n = r.length, h = (w - 1) / 2, out = new Array(n)
  for (let i = 0; i < n; i++) {
    let s = 0
    for (let k = -h; k <= h; k++) s += r[(i + k + n) % n]
    out[i] = s / w
  }
  return out
}
function chaikin(pts, iters) {
  let p = pts
  for (let k = 0; k < iters; k++) {
    const out = []
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length]
      out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25])
      out.push([a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75])
    }
    p = out
  }
  return p
}

const body = { locations: [SUBJECT], costing: 'auto', contours: CONTOURS.map(c => ({ time: c.time })), polygons: true, generalize: 6, denoise: 0.1 }
console.log('Requesting isochrone polygons from Valhalla…')
const res = await fetch(`${VALHALLA}?json=${encodeURIComponent(JSON.stringify(body))}`, { headers: { 'User-Agent': 'npcg-om-blackrock/1.0' } })
if (!res.ok) throw new Error(`Valhalla ${res.status} — ${(await res.text()).slice(0, 200)}`)
const gj = await res.json()
const byTime = new Map()
for (const f of gj.features || []) {
  if (f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon') byTime.set(f.properties.contour, outerRing(f.geometry))
}

/* COASTAL METHOD — raw road-following polygon (not the radial envelope).
   For a shoreline property the radial "one radius per bearing" star always fills
   the pie between the east- and west-coast arms, which spans open water (Long
   Island Sound). Valhalla's raw isochrone polygon already follows the road
   network and therefore EXCLUDES the water — it's the geometrically correct
   coastal shape. We just decimate it (even spacing) and Chaikin-smooth so it's
   clean enough to render as a filled band. (See DRIVE_TIMES_MAP.md → "Coastal".) */
const MIN_SPACING_M = 350   // decimation spacing — larger = simpler/smoother outline
const SMOOTH_PASSES = 2     // Chaikin rounding passes
function decimate(ring, minM) {
  const out = [ring[0]]; let last = ring[0]
  for (let i = 1; i < ring.length; i++) {
    if (haversine(last[1], last[0], ring[i][1], ring[i][0]) * 1000 >= minM) { out.push(ring[i]); last = ring[i] }
  }
  return out
}

const bands = CONTOURS.map(c => {
  const ring = byTime.get(c.time)            // [[lng,lat],…] road-following outline (excludes water)
  if (!ring) throw new Error(`No isochrone for ${c.time} min`)
  let raw = decimate(ring, MIN_SPACING_M)
  // ring is closed (last ≈ first) — drop the dup so Chaikin's wrap doesn't double it
  if (raw.length > 1 && raw[0][0] === raw[raw.length - 1][0] && raw[0][1] === raw[raw.length - 1][1]) raw.pop()
  let pts = chaikin(raw.map(([lng, lat]) => [+lat.toFixed(5), +lng.toFixed(5)]), SMOOTH_PASSES)
  pts.push(pts[0])
  console.log(`  ${c.time} min: ${ring.length} raw → ${pts.length} pts`)
  return { min: c.time, color: c.color, coords: pts }
})

const file = `/* AUTO-GENERATED by scripts/gen-isochrones.mjs (coastal raw-polygon method) —
   do not hand-edit. Drive-time bands from 2836 Fairfield Ave, Bridgeport (Black
   Rock): raw Valhalla road-following isochrone polygons (costing auto, so they
   exclude Long Island Sound), decimated + Chaikin-smoothed, as [lat,lng] arrays.
   Largest contour first. Re-run: npm run isochrones */

export const ISOCHRONES = [
${bands.map(b => `  { min: ${b.min}, color: '${b.color}', coords: ${JSON.stringify(b.coords)} },`).join('\n')}
]
`
writeFileSync(new URL('../src/isochrones.js', import.meta.url), file)
console.log('Wrote src/isochrones.js')
