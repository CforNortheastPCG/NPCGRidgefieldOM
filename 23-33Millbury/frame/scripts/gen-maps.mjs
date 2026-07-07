#!/usr/bin/env node
/* ═══════════ MAP GENERATOR (deterministic, no AI) ═══════════
   Builds everything the Location & Amenities and Drive Times pages need,
   for ANY deal, from payload.json:

     1. Geocode the subject address           (Google Geocoding API)
     2. Drive-time bands 15/30/45/60          (Valhalla /isochrone)
        — geometry auto-selected: inland → radial envelope (smooth),
          coastal → raw road-following polygon (excludes water).
          Per DRIVE_TIMES_MAP_FINAL.md.
     3. Frame (CENTER/ZOOM/640×460) auto-fit to the 60-min band
     4. City strip times                       (Valhalla matrix — same
        engine as the rings, never estimated)
     5. Transparent labels+highways overlay    (Static Maps + chroma-key)
     6. Nearby amenities by category           (Places Nearby Search)

   Outputs: src/data/mapdata.ts + public/photos/maps/drivetime-labels.png

   Env: GOOGLE_MAPS_API_KEY (falls back to VITE_GOOGLE_MAPS_API_KEY or
   frame/.env.local), VALHALLA_BASE (default valhalla1.openstreetmap.de).

   Usage: node scripts/gen-maps.mjs [--skip-amenities] [--skip-labels]    */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

function apiKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) return process.env.GOOGLE_MAPS_API_KEY
  if (process.env.VITE_GOOGLE_MAPS_API_KEY) return process.env.VITE_GOOGLE_MAPS_API_KEY
  const envLocal = join(frameDir, '.env.local')
  if (existsSync(envLocal)) {
    const m = readFileSync(envLocal, 'utf8').match(/VITE_GOOGLE_MAPS_API_KEY=(\S+)/)
    if (m) return m[1].trim()
  }
  return null
}

const KEY = apiKey() // may be null — routing parts still run; Google parts skip
const VALHALLA = process.env.VALHALLA_BASE ?? 'https://valhalla1.openstreetmap.de'

/** openrouteservice key — the STABLE routing provider (free key at
    openrouteservice.org). When present it's preferred for isochrones and
    the city matrix; the community Valhalla server is only a fallback. */
function orsKey() {
  if (process.env.ORS_API_KEY) return process.env.ORS_API_KEY
  const envLocal = join(frameDir, '.env.local')
  if (existsSync(envLocal)) {
    const m = readFileSync(envLocal, 'utf8').match(/ORS_API_KEY=(\S+)/)
    if (m) return m[1].trim()
  }
  return null
}
const ORS = orsKey()

const payload = JSON.parse(readFileSync(join(frameDir, 'payload.json'), 'utf8'))
const fullAddr = `${payload.deal.address}, ${payload.deal.cityState}`

/* ── helpers ─────────────────────────────────────────────────────── */
const R = 6371
const toRad = (d) => (d * Math.PI) / 180
const toDeg = (r) => (r * 180) / Math.PI
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
function medianFilter(r, w) {
  if (w <= 1) return r.slice()
  const n = r.length, h = (w - 1) / 2, out = new Array(n)
  for (let i = 0; i < n; i++) {
    const win = []
    for (let k = -h; k <= h; k++) win.push(r[(i + k + n) % n])
    win.sort((a, b) => a - b)
    out[i] = win[Math.floor(win.length / 2)]
  }
  return out
}
function movingAvg(r, w) {
  if (w <= 1) return r.slice()
  const n = r.length, h = (w - 1) / 2, out = new Array(n)
  for (let i = 0; i < n; i++) {
    let s = 0
    for (let k = -h; k <= h; k++) s += r[(i + k + n) % n]
    out[i] = s / w
  }
  return out
}
function fillGaps(r) {
  const n = r.length
  for (let i = 0; i < n; i++) {
    if (r[i] >= 0) continue
    let lo = i, hi = i
    while (r[((lo % n) + n) % n] < 0) lo--
    while (r[hi % n] < 0) hi++
    const a = r[((lo % n) + n) % n], b = r[hi % n], t = (i - lo) / (hi - lo)
    r[i] = a + (b - a) * t
  }
  return r
}
function outerRing(geom) {
  const rings = geom.type === 'Polygon' ? [geom.coordinates[0]] : geom.coordinates.map((p) => p[0])
  return rings.sort((a, b) => b.length - a.length)[0]
}
function decimate(ring, minM) {
  const out = [ring[0]]
  let last = ring[0]
  for (let i = 1; i < ring.length; i++) {
    if (haversine(last[1], last[0], ring[i][1], ring[i][0]) * 1000 >= minM) {
      out.push(ring[i])
      last = ring[i]
    }
  }
  return out
}

/** fetch with retry — the local dev TLS proxy drops connections
    intermittently; 3 attempts with backoff ride out the blips. */
async function rfetch(url, opts, what) {
  let lastErr
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetch(url, opts)
    } catch (err) {
      lastErr = err
      if (attempt < 3) {
        console.log(`  … ${what}: connection failed (attempt ${attempt}), retrying`)
        await new Promise((r) => setTimeout(r, attempt * 2000))
      }
    }
  }
  throw lastErr
}

async function gfetch(url, what) {
  const res = await rfetch(url, { headers: { 'User-Agent': 'autoom3-gen-maps/1.0' } }, what)
  if (!res.ok) throw new Error(`${what} ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res
}

/* ── 1. subject coords: payload override, else geocode ───────────── */
let SUBJECT
if (payload.market?.lat != null && payload.market?.lng != null) {
  SUBJECT = { lat: payload.market.lat, lon: payload.market.lng }
  console.log(`subject from payload.market: ${SUBJECT.lat}, ${SUBJECT.lon}`)
} else {
  if (!KEY) {
    console.error('gen-maps: no Google key and no payload.market.lat/lng — cannot locate the subject; skipping maps')
    process.exit(0)
  }
  console.log(`geocoding ${fullAddr}…`)
  const geo = await (
    await gfetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddr)}&key=${KEY}`, 'geocode')
  ).json()
  if (!geo.results?.[0]) throw new Error(`geocode found nothing for "${fullAddr}"`)
  SUBJECT = { lat: geo.results[0].geometry.location.lat, lon: geo.results[0].geometry.location.lng }
  console.log(`  subject ${SUBJECT.lat.toFixed(5)}, ${SUBJECT.lon.toFixed(5)}`)
}

/* ── 2. isochrone bands (Valhalla — a free community service that has
      outages; every Valhalla-dependent stage degrades independently) ── */
const CONTOURS = [
  { time: 60, color: '#C0392B' },
  { time: 45, color: '#7D3C98' },
  { time: 30, color: '#2471A3' },
  { time: 15, color: '#229954' },
]
async function isochronesFromOrs() {
  const res = await rfetch('https://api.openrouteservice.org/v2/isochrones/driving-car', {
    method: 'POST',
    headers: { Authorization: ORS, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      locations: [[SUBJECT.lon, SUBJECT.lat]],
      range: CONTOURS.map((c) => c.time * 60).sort((a, b) => a - b),
      range_type: 'time',
    }),
  }, 'ors isochrones')
  if (!res.ok) throw new Error(`ORS isochrones ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const gj = await res.json()
  const map = new Map()
  for (const f of gj.features ?? []) {
    const min = Math.round((f.properties?.value ?? 0) / 60)
    if (f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon') map.set(min, outerRing(f.geometry))
  }
  if (map.size < CONTOURS.length) throw new Error(`ORS returned ${map.size}/${CONTOURS.length} contours`)
  return map
}

async function isochronesFromValhalla() {
  const isoBody = { locations: [SUBJECT], costing: 'auto', contours: CONTOURS.map((c) => ({ time: c.time })), polygons: true, generalize: 6, denoise: 0.1 }
  const gj = await (await gfetch(`${VALHALLA}/isochrone?json=${encodeURIComponent(JSON.stringify(isoBody))}`, 'valhalla isochrone')).json()
  const map = new Map()
  for (const f of gj.features ?? []) {
    if (f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon') map.set(f.properties.contour, outerRing(f.geometry))
  }
  if (map.size < CONTOURS.length) throw new Error(`valhalla returned ${map.size}/${CONTOURS.length} contours`)
  return map
}

let byTime = null
let routingProvider = null
for (const [name, fn, enabled] of [
  ['openrouteservice', isochronesFromOrs, Boolean(ORS)],
  ['valhalla', isochronesFromValhalla, true],
]) {
  if (!enabled) continue
  try {
    console.log(`requesting isochrones from ${name}…`)
    byTime = await fn()
    routingProvider = name
    break
  } catch (err) {
    console.error(`  ! ${name} unavailable (${String(err.message ?? err).slice(0, 140)})`)
  }
}
if (!byTime) console.error('  ! no routing provider reachable — drive-time bands skipped this run')

/* Previous run's mapdata — when providers are down we KEEP existing bands
   rather than silently dropping the Drive Times page from the book. */
let previous = null
try {
  const prevSrc = readFileSync(join(frameDir, 'src', 'data', 'mapdata.ts'), 'utf8')
  const parsed = JSON.parse(prevSrc.slice(prevSrc.indexOf('= {') + 2, prevSrc.lastIndexOf('}') + 1))
  if (parsed?.isochrones?.length > 0) previous = parsed
} catch {
  /* placeholder or missing — nothing to preserve */
}

/* Coastal detection on the 60-min ring: bin vertices by bearing; a long
   contiguous run of empty bins = the sea (no road reach that way). */
const BINS = 360, MEDIAN = 3, SMOOTH = 5, CHAIKIN_PASSES = 1
function radiiFor(ring) {
  const radii = new Array(BINS).fill(-1)
  for (const [lng, lat] of ring) {
    const b = Math.floor(bearingFrom(SUBJECT.lat, SUBJECT.lon, lat, lng)) % BINS
    const d = haversine(SUBJECT.lat, SUBJECT.lon, lat, lng)
    if (d > radii[b]) radii[b] = d
  }
  return radii
}

const W = 640, H = 460
let bands = []
let coastal = false
let CENTER = null
let ZOOM = 8
if (byTime) {
  /* Coastal detection, provider-independent: sample elevations on a ring
     around the subject (Google Elevation API, one request). A contiguous
     arc of below-sea-level points = open water = shoreline deal. Falls
     back to the no-road-arc heuristic (reliable for Valhalla geometry). */
  let waterArcDeg = null
  if (KEY) {
    try {
      // Multi-radius rings: a single ring breaks on harbor islands sitting
      // exactly at that distance (East Boston read 30° through the Georges
      // chain). A bearing counts as water if ANY radius finds open water —
      // islands can't mask the same bearing at 6, 12, AND 18 km. One
      // request: 36×3 = 108 points, well under the API's 512 cap.
      const SAMPLES = 36
      const RADII = [6, 12, 18]
      const pts = RADII.flatMap((km) =>
        Array.from({ length: SAMPLES }, (_, i) => destPoint(SUBJECT.lat, SUBJECT.lon, (i * 360) / SAMPLES, km))
      )
      const locs = pts.map(([la, lo]) => `${la.toFixed(5)},${lo.toFixed(5)}`).join('|')
      const el = await (await gfetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${encodeURIComponent(locs)}&key=${KEY}`, 'elevation')).json()
      if (el.status === 'OK' && el.results.length === SAMPLES * RADII.length) {
        const water = new Array(SAMPLES).fill(false)
        el.results.forEach((r, idx) => {
          if (r.elevation < -2) water[idx % SAMPLES] = true
        })
        let maxRun = 0, run = 0
        for (let i = 0; i < SAMPLES * 2; i++) {
          if (water[i % SAMPLES]) {
            run++
            maxRun = Math.max(maxRun, run)
          } else run = 0
        }
        waterArcDeg = (Math.min(maxRun, SAMPLES) / SAMPLES) * 360
      }
    } catch {
      /* fall through to the road-gap heuristic */
    }
  }
  if (waterArcDeg != null) {
    coastal = waterArcDeg >= 40
    console.log(`  water arc ${Math.round(waterArcDeg)}° (elevation probe) → ${coastal ? 'COASTAL' : 'inland'}`)
  } else {
    const radii60 = radiiFor(byTime.get(60))
    let maxGap = 0, gap = 0
    for (let i = 0; i < BINS * 2; i++) {
      if (radii60[i % BINS] < 0) {
        gap++
        maxGap = Math.max(maxGap, gap)
      } else gap = 0
    }
    coastal = maxGap >= BINS * 0.12
    console.log(`  no-road arc ${Math.round((maxGap / BINS) * 360)}° → ${coastal ? 'COASTAL' : 'inland'}`)
  }

  /* Geometry method: the radial envelope is only valid for Valhalla's
     road-following polygons (per the spec). ORS rings are grid-smoothed
     already — radializing them interpolates ACROSS water; use them raw. */
  const useRadial = !coastal && routingProvider === 'valhalla'
  console.log(`  geometry: ${useRadial ? 'INLAND radial-envelope' : 'raw-polygon (decimate + chaikin)'} [${routingProvider}]`)

  bands = CONTOURS.map((c) => {
    const ring = byTime.get(c.time)
    let pts
    if (useRadial) {
      let radii = fillGaps(radiiFor(ring))
      radii = movingAvg(medianFilter(radii, MEDIAN), SMOOTH)
      pts = chaikin(
        radii.map((r, i) => destPoint(SUBJECT.lat, SUBJECT.lon, (i * 360) / BINS, r).map((v) => +v.toFixed(5))),
        CHAIKIN_PASSES
      )
    } else {
      let raw = decimate(ring, 350)
      if (raw.length > 1 && raw[0][0] === raw[raw.length - 1][0] && raw[0][1] === raw[raw.length - 1][1]) raw.pop()
      pts = chaikin(raw.map(([lng, lat]) => [+lat.toFixed(5), +lng.toFixed(5)]), 2)
    }
    pts.push(pts[0])
    return { min: c.time, color: c.color, coords: pts }
  })

  /* frame: fit the 60-min band */
  const all60 = bands.find((b) => b.min === 60).coords
  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180
  for (const [lat, lng] of all60) {
    minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat)
    minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng)
  }
  CENTER = { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 }
  const worldXY = (lat, lng, zoom) => {
    const world = 256 * 2 ** zoom
    const x = ((lng + 180) / 360) * world
    const s = Math.sin((lat * Math.PI) / 180)
    const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * world
    return [x, y]
  }
  ZOOM = 10
  for (; ZOOM > 5; ZOOM--) {
    const [x1, y1] = worldXY(maxLat, minLng, ZOOM)
    const [x2, y2] = worldXY(minLat, maxLng, ZOOM)
    if (Math.abs(x2 - x1) <= W * 0.92 && Math.abs(y2 - y1) <= H * 0.92) break
  }
  console.log(`  frame center ${CENTER.lat.toFixed(3)},${CENTER.lng.toFixed(3)} zoom ${ZOOM}`)
} else if (previous) {
  bands = previous.isochrones
  coastal = previous.coastal
  if (previous.frame) {
    CENTER = { lat: previous.frame.centerLat, lng: previous.frame.centerLng }
    ZOOM = previous.frame.zoom
  }
  console.log(`  reusing previous run's ${bands.length} bands (providers unreachable)`)
}

/* ── 4. city strip: Valhalla matrix (same engine as the rings) ───── */
const cityNames = payload.market?.driveTimeCities ?? []
let cities = []
if (KEY && byTime) {
  const targets = []
  if (cityNames.length > 0) {
    console.log(`routing ${cityNames.length} strip cities…`)
    for (const name of cityNames) {
      try {
        const g = await (await gfetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(name)}&key=${KEY}`, `geocode ${name}`)).json()
        const loc = g.results?.[0]?.geometry?.location
        if (loc) targets.push({ name, lat: loc.lat, lon: loc.lng })
        else console.log(`  ! could not geocode "${name}" — skipping`)
      } catch (err) {
        console.log(`  ! geocode failed for "${name}" — skipping (${String(err).slice(0, 80)})`)
      }
    }
  } else {
    // No broker-entered cities — the rail must never be empty. Fall back to
    // the most prominent localities within ~50 km (Places API New).
    try {
      const res = await rfetch('https://places.googleapis.com/v1/places:searchNearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': KEY,
          'X-Goog-FieldMask': 'places.displayName,places.location',
        },
        body: JSON.stringify({
          includedTypes: ['locality'],
          maxResultCount: 10,
          rankPreference: 'POPULARITY',
          locationRestriction: { circle: { center: { latitude: SUBJECT.lat, longitude: SUBJECT.lon }, radius: 50000 } },
        }),
      }, 'places localities')
      if (!res.ok) throw new Error(`places localities ${res.status}: ${(await res.text()).slice(0, 150)}`)
      const data = await res.json()
      const own = (payload.market?.city ?? payload.deal.cityState.split(',')[0] ?? '').trim().toLowerCase()
      for (const p of data.places ?? []) {
        const name = p.displayName?.text?.trim()
        if (!name || name.toLowerCase() === own) continue
        if (targets.some((t) => t.name === name)) continue
        targets.push({ name, lat: p.location.latitude, lon: p.location.longitude })
        if (targets.length >= 6) break
      }
      console.log(`  no driveTimeCities in payload — defaulted to ${targets.length} nearby localities: ${targets.map((t) => t.name).join(', ')}`)
    } catch (err) {
      console.error(`  ! locality fallback failed (${String(err.message ?? err).slice(0, 120)}) — no city strip this run`)
    }
  }
  if (targets.length > 0) {
    // Same provider preference as the rings so strip and bands agree.
    let cells = null // [{km, sec}] aligned to targets
    if (ORS) {
      try {
        const res = await rfetch('https://api.openrouteservice.org/v2/matrix/driving-car', {
          method: 'POST',
          headers: { Authorization: ORS, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locations: [[SUBJECT.lon, SUBJECT.lat], ...targets.map((t) => [t.lon, t.lat])],
            sources: [0],
            destinations: targets.map((_, i) => i + 1),
            metrics: ['distance', 'duration'],
          }),
        }, 'ors matrix')
        if (!res.ok) throw new Error(`ORS matrix ${res.status}: ${(await res.text()).slice(0, 150)}`)
        const m = await res.json()
        cells = targets.map((_, i) => {
          const sec = m.durations?.[0]?.[i]
          const meters = m.distances?.[0]?.[i]
          return sec != null && meters != null ? { km: meters / 1000, sec } : null
        })
        console.log('  matrix via openrouteservice')
      } catch (err) {
        console.error(`  ! ORS matrix failed (${String(err.message ?? err).slice(0, 120)}) — trying valhalla`)
      }
    }
    if (!cells) {
      try {
        const mBody = { sources: [SUBJECT], targets: targets.map((t) => ({ lat: t.lat, lon: t.lon })), costing: 'auto' }
        const matrix = await (await gfetch(`${VALHALLA}/sources_to_targets?json=${encodeURIComponent(JSON.stringify(mBody))}`, 'valhalla matrix')).json()
        const row = matrix.sources_to_targets?.[0] ?? []
        cells = targets.map((_, i) => {
          const cell = row[i]
          return cell && cell.time != null ? { km: cell.distance, sec: cell.time } : null
        })
        console.log('  matrix via valhalla')
      } catch (err) {
        console.error(`  ! valhalla matrix failed (${String(err.message ?? err).slice(0, 120)}) — no city strip this run`)
      }
    }
    if (cells) {
      cities = targets
        .map((t, i) => {
          const cell = cells[i]
          if (!cell) return null
          const mi = Math.round(cell.km * 0.621371)
          const min = Math.round(cell.sec / 60)
          return {
            name: t.name.replace(/,?\s*(MA|CT|RI|NH|NY|VT|ME)\b.*$/i, '').trim(),
            drive: `~${mi} mi · ${min} min`,
            lat: +t.lat.toFixed(5),
            lng: +t.lon.toFixed(5),
          }
        })
        .filter(Boolean)
      for (const c of cities) console.log(`  ${c.name}: ${c.drive}`)
    }
  }
}
if (cities.length === 0 && previous?.cities?.length > 0 && bands.length > 0) {
  cities = previous.cities
  console.log(`  reusing previous run's ${cities.length} routed city times`)
}

/* ── 5. labels overlay (transparent PNG, chroma-keyed) ───────────── */
let hasLabels = false
if (!args.includes('--skip-labels') && KEY && CENTER) {
  console.log('baking labels overlay…')
  const LABELS_STYLE = [
    'feature:poi|visibility:off',
    'feature:landscape|color:0xffffff',
    'feature:water|color:0xffffff',
    'feature:administrative|element:geometry|visibility:off',
    'feature:road.arterial|element:geometry|color:0xffffff',
    'feature:road.arterial|element:labels|visibility:off',
    'feature:road.highway|element:geometry.fill|color:0xF4A93C',
    'feature:road.highway|element:geometry.stroke|color:0xC9781A',
    'feature:road.highway|element:labels|visibility:on',
    'feature:administrative.locality|element:labels|visibility:on',
    'feature:administrative.province|element:labels|visibility:on',
  ]
  const url =
    `https://maps.googleapis.com/maps/api/staticmap?size=${W}x${H}&scale=2&maptype=roadmap&format=png` +
    `&center=${CENTER.lat},${CENTER.lng}&zoom=${ZOOM}` +
    `&${LABELS_STYLE.map((s) => 'style=' + encodeURIComponent(s)).join('&')}&key=${KEY}`
  const dataIn = 'data:image/png;base64,' + Buffer.from(await (await gfetch(url, 'labels static map')).arrayBuffer()).toString('base64')

  const { default: puppeteer } = await import('puppeteer')
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
  try {
    const page = await browser.newPage()
    const dataOut = await page.evaluate(async (src) => {
      const img = new Image()
      await new Promise((ok, no) => {
        img.onload = ok
        img.onerror = no
        img.src = src
      })
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const im = ctx.getImageData(0, 0, c.width, c.height)
      const a = im.data
      for (let i = 0; i < a.length; i += 4) {
        const m = Math.min(a[i], a[i + 1], a[i + 2])
        if (m >= 236) a[i + 3] = 0
        else if (m >= 206) a[i + 3] = Math.round((255 * (236 - m)) / 30)
      }
      ctx.putImageData(im, 0, 0)
      return c.toDataURL('image/png')
    }, dataIn)
    mkdirSync(join(frameDir, 'public', 'photos', 'maps'), { recursive: true })
    writeFileSync(join(frameDir, 'public', 'photos', 'maps', 'drivetime-labels.png'), Buffer.from(dataOut.split(',')[1], 'base64'))
    hasLabels = true
    console.log('  wrote public/photos/maps/drivetime-labels.png')
  } finally {
    await browser.close()
  }
}
if (!hasLabels && previous?.hasLabelsOverlay && existsSync(join(frameDir, 'public', 'photos', 'maps', 'drivetime-labels.png'))) {
  hasLabels = true // keep the previously baked overlay
}

/* ── 6. amenities via Places Nearby Search ───────────────────────── */
const CATEGORIES = [
  { label: 'Dining & Cafés', swatch: '#B55D37', color: '0xB55D37', types: ['restaurant'], n: 4 },
  { label: 'Grocery & Retail', swatch: '#2471A3', color: '0x2471A3', types: ['supermarket'], n: 3 },
  { label: 'Parks & Recreation', swatch: '#229954', color: '0x229954', types: ['park'], n: 3 },
  { label: 'Health & Schools', swatch: '#7D3C98', color: '0x7D3C98', types: ['hospital', 'school'], n: 3 },
  { label: 'Transit', swatch: '#C0392B', color: '0xC0392B', types: ['transit_station'], n: 3 },
]
let amenities = []
if (!args.includes('--skip-amenities') && KEY) {
  console.log('searching nearby places (Places API New)…')
  for (const cat of CATEGORIES) {
    const seen = new Set()
    const picks = []
    try {
      for (const type of cat.types) {
        const res = await rfetch('https://places.googleapis.com/v1/places:searchNearby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': KEY,
            'X-Goog-FieldMask': 'places.displayName,places.location,places.shortFormattedAddress,places.businessStatus',
          },
          body: JSON.stringify({
            includedTypes: [type],
            maxResultCount: Math.min(cat.n + 3, 20),
            rankPreference: 'POPULARITY',
            locationRestriction: { circle: { center: { latitude: SUBJECT.lat, longitude: SUBJECT.lon }, radius: 1800 } },
          }),
        }, 'places')
        if (!res.ok) {
          console.log(`  ! places ${type}: ${res.status} ${(await res.text()).slice(0, 150)}`)
          continue
        }
        const data = await res.json()
        for (const p of data.places ?? []) {
          if (picks.length >= cat.n) break
          const name = p.displayName?.text
          if (!name || !p.location || seen.has(name)) continue
          if (p.businessStatus && p.businessStatus !== 'OPERATIONAL') continue
          seen.add(name)
          picks.push({ name, lat: p.location.latitude, lng: p.location.longitude, note: p.shortFormattedAddress ?? '' })
        }
      }
    } catch (err) {
      console.log(`  ! places ${cat.label} failed: ${String(err).slice(0, 120)}`)
    }
    picks.forEach((p, i) => amenities.push({ ...p, n: i + 1, color: cat.color, swatch: cat.swatch, category: cat.label }))
    console.log(`  ${cat.label}: ${picks.length}`)
  }
}

/* ── write mapdata.ts ────────────────────────────────────────────── */
const out = `// AUTO-GENERATED by scripts/gen-maps.mjs — DO NOT EDIT (protected data tier)
import type { MapData } from '../lib/types.ts'

export const MAPDATA: MapData = ${JSON.stringify(
  {
    generated: bands.length > 0 || amenities.length > 0,
    subject: { lat: +SUBJECT.lat.toFixed(6), lng: +SUBJECT.lon.toFixed(6) },
    frame: CENTER ? { centerLat: +CENTER.lat.toFixed(5), centerLng: +CENTER.lng.toFixed(5), zoom: ZOOM, w: W, h: H } : null,
    coastal,
    isochrones: bands,
    cities,
    hasLabelsOverlay: hasLabels,
    amenities,
    categories: CATEGORIES.map(({ label, swatch }) => ({ label, swatch })),
  },
  null,
  1
)}
`
writeFileSync(join(frameDir, 'src', 'data', 'mapdata.ts'), out)

/* Sync the manifest to the data that actually materialized: map pages
   appear iff their data exists (re-added on later maps-only runs, dropped
   when a source was down — a final book never carries a placeholder page). */
const manifestFile = join(frameDir, 'src', 'data', 'manifest.ts')
const mSrc = readFileSync(manifestFile, 'utf8')
const manifest = JSON.parse(mSrc.slice(mSrc.indexOf('= [') + 2, mSrc.lastIndexOf(']') + 1))
const withoutMaps = manifest.filter((e) => e.type !== 'drive-time-map' && e.type !== 'location-map')
const mapEntries = [
  ...(amenities.length > 0 ? [{ id: 'location-map', type: 'location-map', title: 'Location & Amenities' }] : []),
  ...(bands.length > 0 ? [{ id: 'drive-time-map', type: 'drive-time-map', title: 'Drive Times' }] : []),
]
// Insert after the city overview (falling back to before the regional
// overview, else at the end).
let at = withoutMaps.findIndex((e) => e.type === 'city-overview')
if (at >= 0) at += 1
else {
  at = withoutMaps.findIndex((e) => e.type === 'county-overview')
  if (at < 0) at = withoutMaps.length
}
const synced = [...withoutMaps.slice(0, at), ...mapEntries, ...withoutMaps.slice(at)]
if (JSON.stringify(synced) !== JSON.stringify(manifest)) {
  writeFileSync(
    manifestFile,
    `// AUTO-GENERATED by scripts/inject.mjs — DO NOT EDIT (protected data tier)
import type { ManifestEntry } from '../lib/types.ts'

export const MANIFEST: ManifestEntry[] = ${JSON.stringify(synced, null, 2)}
`
  )
  writeFileSync(join(frameDir, 'public', 'manifest.json'), JSON.stringify(synced, null, 1))
  console.log(`  manifest synced: ${mapEntries.length} map page(s) in the deck`)
}
console.log('wrote src/data/mapdata.ts — maps ready')
