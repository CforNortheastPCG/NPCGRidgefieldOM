/* ═══════════════════ NEARBY POIS FOR FULL-BLEED AERIALS ═══════════════════
   Reusable across deals. Pulls nearby businesses/landmarks from the Google
   Places API around the subject property, then projects each onto the oblique
   drone photos using that photo's camera pose — which it reads automatically
   from the photo's own DJI EXIF/XMP (GPS + gimbal yaw). Nothing per-photo is
   hard-coded: point PHOTOS at the source files and run.

   Output: src/nearbyPois.js — `NEARBY[<id>]` is a list of { x, y, label } seeds.
   Oblique projection is approximate, so these are STARTING positions; drag each
   label in `npm run dev` to the exact storefront, then read the badge's x%/y%.

   Run:  npm run nearby
   Needs: VITE_GOOGLE_MAPS_API_KEY in .env.local + "Places API" enabled.

   ─── To reuse on another deal ───
   1. Set PHOTOS below: each { id, file } maps a full-bleed page id to its source
      drone photo. `id` must match what App.jsx reads (NEARBY['<id>']).
   2. Make sure src/amenities.js exports PROPERTY { lat, lng } (the search center).
   3. npm run nearby
*/
import { readFileSync, writeFileSync } from 'node:fs'
import { PROPERTY } from '../src/amenities.js'

/* ─────────── per-deal config ─────────── */
const PHOTOS = [
  { id: 'bleed-1', file: 'OM Photos (1)/300-310 S Main St-7.jpg' },
  { id: 'bleed-2', file: 'OM Photos (1)/300-310 S Main St-3.jpg' },
]
const RADIUS_M = 500          // how far up/down the street to pull
const MAX_PER_PHOTO = 14      // cap labels per page so it stays readable
const DEFAULT_FOV = 82        // horizontal FOV° (DJI Mini 4 Pro 24mm ≈ 82)
/* ──────────────────────────────────────── */

const root = new URL('../', import.meta.url)
const KEY = readFileSync(new URL('.env.local', root), 'utf8')
  .match(/VITE_GOOGLE_MAPS_API_KEY=(\S+)/)?.[1]?.trim()
if (!KEY) { console.error('No VITE_GOOGLE_MAPS_API_KEY in .env.local'); process.exit(1) }

/* Read camera pose (GPS + heading) from a DJI photo's embedded XMP. */
function readPose(file) {
  const buf = readFileSync(new URL(file, root)).subarray(0, 256000)
  const grab = (key) => {
    const m = buf.toString('latin1').match(new RegExp(`drone-dji:${key}="([^"]*)"`))
    return m ? parseFloat(m[1]) : null
  }
  const lat = grab('GpsLatitude')
  const lng = grab('GpsLongitude')
  const yaw = grab('GimbalYawDegree') ?? grab('FlightYawDegree')
  if (lat == null || lng == null || yaw == null) {
    console.error(`Could not read GPS/yaw from ${file} — is it a DJI drone photo?`)
    process.exit(1)
  }
  return { lat, lng, yaw }
}

const toRad = (d) => (d * Math.PI) / 180
const toDeg = (r) => (r * 180) / Math.PI

/* Great-circle bearing + distance from camera to a place. */
function bearingDist(from, to) {
  const φ1 = toRad(from.lat), φ2 = toRad(to.lat)
  const Δλ = toRad(to.lng - from.lng)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const bearing = (toDeg(Math.atan2(y, x)) + 360) % 360
  const R = 6371000
  const a = Math.sin((φ2 - φ1) / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return { bearing, dist: R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) }
}

/* Project a place into a photo's frame. Returns {x,y,dist} % or null if off-frame.
   x: horizontal angle off camera center, scaled by half-FOV.
   y: nearer places sit lower in an oblique frame; farther toward the horizon. */
function project(photo, place) {
  const { bearing, dist } = bearingDist(photo, place)
  const off = ((bearing - photo.yaw + 540) % 360) - 180   // -180..180
  const half = (photo.fov ?? DEFAULT_FOV) / 2
  if (Math.abs(off) > half) return null                   // outside camera view
  const x = 50 + (off / half) * 46                        // 4% inset each edge
  const t = Math.min(1, dist / RADIUS_M)                  // 0 near … 1 far
  const y = 70 - t * 38                                    // 70% (near) → 32% (far)
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, dist }
}

const KEEP = new Set([
  'restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway', 'food',
  'supermarket', 'grocery_or_supermarket', 'convenience_store', 'pharmacy',
  'bank', 'atm', 'store', 'clothing_store', 'hardware_store', 'gas_station',
  'gym', 'school', 'church', 'park', 'library', 'city_hall', 'post_office',
  'car_repair', 'doctor', 'liquor_store', 'beauty_salon',
  'bus_station', 'transit_station', 'light_rail_station', 'train_station',
])

async function fetchNearby() {
  const base = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
    `?location=${PROPERTY.lat},${PROPERTY.lng}&radius=${RADIUS_M}&key=${KEY}`
  const all = []
  let token = ''
  for (let page = 0; page < 3; page++) {
    const res = await fetch(base + (token ? `&pagetoken=${token}` : ''))
    const json = await res.json()
    if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
      console.error('Places API error:', json.status, json.error_message || '')
      process.exit(1)
    }
    for (const r of json.results || []) {
      if (r.business_status && r.business_status !== 'OPERATIONAL') continue
      if (!(r.types || []).some((t) => KEEP.has(t))) continue
      all.push({ name: r.name, lat: r.geometry.location.lat, lng: r.geometry.location.lng })
    }
    if (!json.next_page_token) break
    token = json.next_page_token
    await new Promise((r) => setTimeout(r, 2000))   // token needs a moment to activate
  }
  const seen = new Set()
  return all.filter((p) => (seen.has(p.name) ? false : seen.add(p.name)))
}

const places = await fetchNearby()
console.log(`Fetched ${places.length} nearby places within ${RADIUS_M} m.`)

const NEARBY = {}
for (const { id, file, fov } of PHOTOS) {
  const photo = { ...readPose(file), fov }
  const seeds = places
    .map((p) => { const xy = project(photo, p); return xy ? { ...xy, label: p.name } : null })
    .filter(Boolean)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, MAX_PER_PHOTO)
    .map(({ x, y, label }) => ({ x, y, label }))
  NEARBY[id] = seeds
  console.log(`  ${id}  (yaw ${photo.yaw}°): ${seeds.length} in-frame`)
}

const out = `/* AUTO-GENERATED by scripts/gen-nearby-pois.mjs — do not edit by hand.
   Per-photo POI seeds projected onto the oblique aerials. Positions are
   approximate starting points; drag in dev to the exact storefront. */
export const NEARBY = ${JSON.stringify(NEARBY, null, 2)}
`
writeFileSync(new URL('src/nearbyPois.js', root), out)
console.log('Wrote src/nearbyPois.js')
