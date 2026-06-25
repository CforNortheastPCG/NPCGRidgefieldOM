/* Drive-time ring generator for South End Plaza — "radial envelope" method.

   Raw Valhalla isochrone polygons are wavy but scribbly (self-intersecting
   tendrils); the pure spider method is clean but too smooth. This takes the raw
   polygon and resolves it into ONE radius per bearing bin (the farthest reach in
   that direction), median-filtered to kill thin spikes and lightly Chaikin-
   smoothed. Result: organic waviness that follows real road reach, but a clean
   star-shaped ring that can't self-intersect or tangle with its neighbors.

   Tune waviness with BINS (more = finer) and MEDIAN/CHAIKIN (more = smoother).
   One /isochrone call — fast to re-run.  npm run isochrones */
import { writeFileSync } from 'node:fs'

const SUBJECT = { lat: 41.6650, lon: -73.0730 } // 310 South Main St, Thomaston CT
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
const res = await fetch(`${VALHALLA}?json=${encodeURIComponent(JSON.stringify(body))}`, { headers: { 'User-Agent': 'npcg-om-southend/1.0' } })
if (!res.ok) throw new Error(`Valhalla ${res.status} — ${(await res.text()).slice(0, 200)}`)
const gj = await res.json()
const byTime = new Map()
for (const f of gj.features || []) {
  if (f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon') byTime.set(f.properties.contour, outerRing(f.geometry))
}

const bands = CONTOURS.map(c => {
  const ring = byTime.get(c.time)
  if (!ring) throw new Error(`No isochrone for ${c.time} min`)
  const rad = new Array(BINS).fill(-1)
  for (const [lng, lat] of ring) {
    const th = bearingFrom(SUBJECT.lat, SUBJECT.lon, lat, lng)
    const d = haversine(SUBJECT.lat, SUBJECT.lon, lat, lng)
    const b = Math.floor(th / (360 / BINS)) % BINS
    if (d > rad[b]) rad[b] = d
  }
  const sm = movingAvg(medianFilter(fillGaps(rad), MEDIAN), SMOOTH)
  let pts = sm.map((d, b) => destPoint(SUBJECT.lat, SUBJECT.lon, (b + 0.5) * (360 / BINS), d).map(v => +v.toFixed(5)))
  pts = chaikin(pts, CHAIKIN)
  pts.push(pts[0])
  console.log(`  ${c.time} min: ${ring.length} raw → ${pts.length} pts`)
  return { min: c.time, color: c.color, coords: pts }
})

const file = `/* AUTO-GENERATED by scripts/gen-isochrones.mjs (radial-envelope method) —
   do not hand-edit. Organic-but-clean drive-time rings from 310 South Main St,
   Thomaston: raw Valhalla isochrone polygons (costing auto) resolved to one
   radius per bearing, despiked and lightly smoothed, as [lat,lng] arrays.
   Largest contour first. Re-run: npm run isochrones */

export const ISOCHRONES = [
${bands.map(b => `  { min: ${b.min}, color: '${b.color}', coords: ${JSON.stringify(b.coords)} },`).join('\n')}
]
`
writeFileSync(new URL('../src/isochrones.js', import.meta.url), file)
console.log('Wrote src/isochrones.js')
