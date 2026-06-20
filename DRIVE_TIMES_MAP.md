# Drive Times Map — system reference & how-to

A reusable, full-page **Drive Times** map for the OM decks: road-network
drive-time bands (15 / 30 / 45 / 60-min) around the subject property, on a bold
styled basemap with town labels and highways composited cleanly on top.

First built for **South End Plaza** (Thomaston — inland), then refined for
**Black Rock / 2836 Fairfield Ave** (coastal). The Black Rock build is the
canonical reference — **full code at the bottom of this doc.**

> TL;DR for a new deal: copy the three files, change `SUBJECT` + the
> `CENTER/ZOOM/W/H` frame + the `CITIES` strip & narrative, pick the method by
> geography (**inland → radial rings; coastal → raw-polygon filled bands**), then
> run `npm run isochrones` and `npm run map-labels`.

---

## Files & scripts
| File | Role |
|---|---|
| `src/DriveTimeMap.jsx` | The page component — composites the layers + legend + drive-time strip |
| `src/isochrones.js` | **Generated** band geometry (`{min, color, coords:[[lat,lng]…]}` per band) |
| `scripts/gen-isochrones.mjs` | Generates the bands from one Valhalla `/isochrone` call — `npm run isochrones` |
| `scripts/gen-map-labels.mjs` | Bakes the transparent labels/highways overlay — `npm run map-labels` |
| `public/photos/maps/drivetime-labels.png` | **Generated** transparent labels/highways overlay |

```json
"isochrones": "node scripts/gen-isochrones.mjs",
"map-labels": "node scripts/gen-map-labels.mjs"
```
Requires `VITE_GOOGLE_MAPS_API_KEY` (Maps Static API enabled) in `.env.local`.
Both scripts hit external services (Valhalla, Google Static Maps + puppeteer) and
are run **deliberately**, not on every build.

---

## How it's layered (z-order, bottom → top)
The whole reason for the layering: bands must sit **behind** the town labels and
highways, which a single Static Maps image or a blend mode can't do cleanly.

1. **Base image** — bold Google Static Maps basemap (orange highways, blue
   water), **labels off**. Fetched live at render.
2. **Bands** — SVG overlay projected from `isochrones.js`. Rendered as either
   outlined rings *or* filled translucent areas (see *Rendering* below). Colors:
   15 `#229954` (green), 30 `#2471A3` (blue), 45 `#7D3C98` (purple), 60 `#C0392B` (red).
3. **Labels image** — pre-baked **transparent** PNG of labels + highway shields +
   highway lines (white background chroma-keyed out). Composited normally, so it
   paints opaquely **on top** of the bands → roads never cut through town names.
4. **Property pin** — gold SVG teardrop marker, tip on the site.

All four share one Web-Mercator frame and stretch-fill the container
(`objectFit:fill` / `preserveAspectRatio="none"`), so they stay registered. The
projection (`worldXY`/`toPx` in the component) converts band lat/lng → frame px.

### Why not bake the bands into the Static Maps URL?
Raw isochrones have thousands of vertices; encoded into `path=` params they blow
past Google's ~16,384-char URL limit (the map silently fails). The SVG overlay
has no such limit and exports as crisp vectors.

---

## The frame (must match everywhere)
`CENTER`, `ZOOM`, and `size` (W×H @ scale 2) define the frame. These constants
appear in **both** `DriveTimeMap.jsx` and `gen-map-labels.mjs` and **must be
identical** — the labels overlay is pre-rendered to that exact frame. The
isochrone projection updates automatically from the component's copy.

**If you change center/zoom/size, re-run `npm run map-labels`** so the labels
overlay re-registers.

Per-deal frames on record:
| Deal | Subject | CENTER | ZOOM | Method |
|---|---|---|---|---|
| South End Plaza (Thomaston, inland) | `41.6650, -73.0730` | `41.60, -72.95` | 8 | radial-envelope rings |
| Black Rock — 2836 Fairfield (coastal) | `41.157532, -73.226828` | `41.15, -73.40` | 8 | raw-polygon filled bands |

---

## Two methods — pick by geography

### Inland → radial-envelope rings (original)
Raw Valhalla polygons are wavy but scribbly (self-intersecting tendrils); the
pure spider method is clean but too smooth. The radial envelope resolves the raw
polygon into **one radius per bearing bin** (farthest reach in that direction),
median-filtered to kill spikes and lightly Chaikin-smoothed → organic waviness
that follows real road reach but can't self-intersect or tangle.

Knobs (top of `gen-isochrones.mjs`, inland values in parens):
- `BINS` (360) — bearing bins; more = finer detail.
- `MEDIAN` (3) — despike window; 1 = off.
- `SMOOTH` (5) — moving-average window. **Lower = bigger/wavier; higher = smoother.**
- `CHAIKIN` (1) — corner rounding passes.
- request `generalize` (6) / `denoise` (0.1) — source polygon detail.

Rendered as **outlined rings** (`<polyline>`, no fill). These helpers
(`destPoint`/`bearingFrom`/`fillGaps`/`medianFilter`/`movingAvg`) are retained in
the Black Rock generator for reuse on inland deals.

### Coastal / waterfront → raw road-following polygon + filled bands  ★ default near water
A point-centered radial ring is the **wrong shape** on a shoreline: roughly the
seaward half of every bearing points over open water. Two attempts failed before
the fix:
1. **Plain radial envelope** → `fillGaps()` interpolated a radius *across* the
   Sound (bridging the SW→NYC and E→New Haven reaches); bands ballooned into the
   ocean.
2. **Radial + seaward clamp** (pin no-road bearings to the shore) → killed the
   balloon, but the "pie" between the east/west coastal arms still spanned water,
   so the band still skimmed the Sound.

The lesson: **any point-radial method fills the wedge between coastal arms, which
is water.** Don't use it near a shoreline.

**The fix that worked:** use Valhalla's **raw isochrone polygon** directly.
Because `costing: auto` only follows roads, the polygon already **excludes the
water** — the geometrically correct coastal shape. The generator just takes the
outer ring, **decimates** to even spacing, and **Chaikin-smooths** it (no radial
bins, no clamp):
```js
const MIN_SPACING_M = 350   // decimation spacing — larger = simpler/smoother
const SMOOTH_PASSES = 2     // Chaikin rounding passes
let raw = decimate(byTime.get(c.time), MIN_SPACING_M)   // [[lng,lat]…], excludes water
if (raw.length > 1 && raw[0][0] === raw.at(-1)[0] && raw[0][1] === raw.at(-1)[1]) raw.pop()
let pts = chaikin(raw.map(([lng, lat]) => [lat, lng]), SMOOTH_PASSES)
pts.push(pts[0])
```

---

## Rendering: outline vs filled bands
- **Inland:** outlined rings read fine — `<polyline fill="none" stroke>`.
- **Coastal (the look that landed):** draw each band twice — a translucent
  **fill** then a thin **stroke**, largest contour first so they nest into a
  shaded heat-map. The fill tints only reachable **land**; the water stays clear,
  so the coastal corridor reads as intentional reach, not stray lines:
```jsx
{RING_PATHS.map(r => <polygon key={`f-${r.min}`} points={r.points} fill={r.color} fillOpacity={0.16} stroke="none" />)}
{RING_PATHS.map(r => <polygon key={`s-${r.min}`} points={r.points} fill="none" stroke={r.color} strokeWidth={2} strokeOpacity={0.95} vectorEffect="non-scaling-stroke" />)}
```
The transparent labels overlay still composites on top, so town names / highway
shields stay readable over the fills. Knob: `fillOpacity`.

---

## Spin up for a new deal
1. Copy `src/DriveTimeMap.jsx`, `scripts/gen-isochrones.mjs`,
   `scripts/gen-map-labels.mjs`; add the two npm scripts; ensure `.env.local` has
   the Maps key.
2. Set `SUBJECT` (in **both** scripts/component) and choose a `CENTER/ZOOM/W/H`
   frame that fits the 60-min reach (set it in `DriveTimeMap.jsx` **and**
   `gen-map-labels.mjs`).
3. Pick the method: inland → keep the radial block; **coastal → use the
   raw-polygon block + filled bands** (the default near water).
4. Edit the `CITIES` drive-time strip + the intro narrative.
5. `npm run isochrones` then `npm run map-labels`.
6. Wire `<DriveTimeMap />` into `src/App.jsx` (Location & Market section, after
   *Location & Amenities*) and add the TOC entry in `src/Toc.jsx`.

### Verifying the look
Bands are an SVG overlay (not baked into the static image), so you can't see the
final map by fetching the static URL alone. Composite it with puppeteer (already
a dependency): load base img + SVG bands + labels overlay + pin and screenshot —
this is also what `npm run pdf` does, so the PDF export matches what you verify.

### Export
When ready to ship: `npm run pdf` (rasterized, anti-scrape export — see README).

---

## Reference implementation (Black Rock) — full code

The canonical coastal drive-time files, copied verbatim from
`om-blackrock-fairfield`. Use these as the starting point for the next waterfront
deal.

### scripts/gen-isochrones.mjs
```js
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
```

### scripts/gen-map-labels.mjs
```js
/* Bakes a TRANSPARENT labels+highways overlay for the Drive Times map.

   Google Static Maps only returns opaque PNGs, so a multiply blend was the only
   way to put labels "over" the rings — but blended lines still bleed through the
   text. Instead we fetch a white-background labels layer and chroma-key the
   white to transparent, leaving only opaque town labels, highway shields, and
   highway lines. The component then composites this normally ON TOP of the
   rings, so the rings are fully covered where labels/roads are.

   Static asset tied to the map's CENTER/ZOOM/size — re-run if those change:
     npm run map-labels
   (Requires VITE_GOOGLE_MAPS_API_KEY + puppeteer.) */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer'

const KEY = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .match(/VITE_GOOGLE_MAPS_API_KEY=(\S+)/)[1].trim()

const CENTER = { lat: 41.15, lng: -73.40 }, ZOOM = 8, W = 640, H = 460

// Labels + highways on a pure-white field (everything else white so it keys out).
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
const url = `https://maps.googleapis.com/maps/api/staticmap?size=${W}x${H}&scale=2&maptype=roadmap&format=png`
  + `&center=${CENTER.lat},${CENTER.lng}&zoom=${ZOOM}`
  + `&${LABELS_STYLE.map(s => 'style=' + encodeURIComponent(s)).join('&')}&key=${KEY}`

console.log('Fetching labels layer…')
const res = await fetch(url)
if (!res.ok) throw new Error(`Static Maps ${res.status} — ${(await res.text()).slice(0, 200)}`)
const dataIn = 'data:image/png;base64,' + Buffer.from(await res.arrayBuffer()).toString('base64')

const browser = await puppeteer.launch()
const page = await browser.newPage()
const dataOut = await page.evaluate(async (src) => {
  const img = new Image()
  await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = src })
  const c = document.createElement('canvas')
  c.width = img.naturalWidth; c.height = img.naturalHeight
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, c.width, c.height), a = im.data
  for (let i = 0; i < a.length; i += 4) {
    const m = Math.min(a[i], a[i + 1], a[i + 2])
    if (m >= 236) a[i + 3] = 0                                   // white field → clear
    else if (m >= 206) a[i + 3] = Math.round(255 * (236 - m) / 30) // soft edge
  }
  ctx.putImageData(im, 0, 0)
  return c.toDataURL('image/png')
}, dataIn)
await browser.close()

mkdirSync(new URL('../public/photos/maps/', import.meta.url), { recursive: true })
const out = new URL('../public/photos/maps/drivetime-labels.png', import.meta.url)
writeFileSync(out, Buffer.from(dataOut.split(',')[1], 'base64'))
console.log('Wrote public/photos/maps/drivetime-labels.png')
```

### src/DriveTimeMap.jsx
```jsx
import { PageHeader, PageFooter } from './Shell.jsx'
import { ISOCHRONES } from './isochrones.js'

/* ═══════════════════ DRIVE TIMES ═══════════════════
   Full-page drive-time map, layered so the rings truly sit BEHIND the map's
   labels and highways (z-order, not a blend hack):

     1. base image  — bold styled basemap, NO labels (Google Static Maps)
     2. rings       — Valhalla isochrone rings, SVG overlay
     3. labels image— transparent labels+highways layer composited on top
     4. subject     — the property marker, drawn last so it stays on top

   All four share one Web-Mercator frame (CENTER/ZOOM/size), and every layer
   stretch-fills the container, so they stay registered.

   Band geometry: `npm run isochrones`. Labels overlay: `npm run map-labels`
   (re-run if CENTER/ZOOM/size change). Requires VITE_GOOGLE_MAPS_API_KEY. */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const SUBJECT = { lat: 41.157532, lng: -73.226828 } // 2836 Fairfield Ave, Black Rock
const CENTER = { lat: 41.15, lng: -73.40 }
const ZOOM = 8, W = 640, H = 460

const CITIES = [
  { name: 'Bridgeport', drive: '~3 mi · 10 min' },
  { name: 'Stamford', drive: '~20 mi · 30 min' },
  { name: 'New Haven', drive: '~22 mi · 30 min' },
  { name: 'White Plains', drive: '~30 mi · 45 min' },
  { name: 'Danbury', drive: '~30 mi · 45 min' },
  { name: 'New York City', drive: '~55 mi · 75 min' },
]
const BAND_HEX = { 15: '#229954', 30: '#2471A3', 45: '#7D3C98', 60: '#C0392B' }

// Bold basemap geometry, no labels — the bottom layer.
const BASE_STYLE = [
  'feature:poi|visibility:off',
  'feature:landscape|color:0xe7dfcc',
  'feature:water|color:0x8fbcd6',
  'feature:road.arterial|element:geometry|color:0xffffff',
  'feature:road.highway|element:geometry.fill|color:0xF4A93C',
  'feature:road.highway|element:geometry.stroke|color:0xC9781A',
  'feature:road|element:labels|visibility:off',
  'feature:administrative|element:labels|visibility:off',
]
// The labels+highways overlay is a pre-baked TRANSPARENT PNG (white chroma-keyed
// out) so it composites opaquely ON TOP of the rings — generated by
// `npm run map-labels`, tied to the CENTER/ZOOM/size above.
const LABELS_OVERLAY = '/photos/maps/drivetime-labels.png'

/* Web-Mercator projection (logical px) → frame pixels. */
function worldXY(lat, lng) {
  const world = 256 * 2 ** ZOOM
  const x = (lng + 180) / 360 * world
  const s = Math.sin(lat * Math.PI / 180)
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * world
  return [x, y]
}
const CX = worldXY(CENTER.lat, CENTER.lng)
const toPx = (lat, lng) => { const [x, y] = worldXY(lat, lng); return [x - CX[0] + W / 2, y - CX[1] + H / 2] }

function mapUrl(styleArr) {
  const params = [
    `size=${W}x${H}`, 'scale=2', 'maptype=roadmap', 'format=png',
    `center=${CENTER.lat},${CENTER.lng}`, `zoom=${ZOOM}`,
    ...styleArr.map(s => `style=${encodeURIComponent(s)}`),
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

const RING_PATHS = ISOCHRONES.map(b => ({
  min: b.min, color: b.color,
  points: b.coords.map(([lat, lng]) => toPx(lat, lng).map(v => v.toFixed(1)).join(',')).join(' '),
}))
const SUBJ_PX = toPx(SUBJECT.lat, SUBJECT.lng)

function LegendRow({ color, label, ring, pin }) {
  let icon
  if (ring) icon = <span style={{ width: 13, height: 13, borderRadius: '50%', border: `3px solid ${color}`, background: 'transparent', flexShrink: 0 }} />
  else if (pin) icon = <span style={{ width: 13, height: 13, borderRadius: '50% 50% 50% 0', transform: 'rotate(45deg)', background: color, flexShrink: 0 }} />
  else icon = <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9 }}>
      {icon}
      <span style={{ color: 'var(--carbon)', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

const fill = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

export default function DriveTimeMap({ pageNum }) {
  const ok = !!API_KEY
  const baseUrl = ok ? mapUrl(BASE_STYLE) : null

  return (
    <div className="page">
      <PageHeader section="Drive Times" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Drive <span style={{ color: '#F8971D' }}>Times</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Road-network drive-time reach from the property.</strong> I-95 (Exits 24/25) and the Merritt
          Parkway put Stamford and New Haven inside ~30 minutes and midtown Manhattan inside ~75, while Metro-North&rsquo;s
          New Haven Line runs express to Grand Central &mdash; drawing on a deep Fairfield County and NYC-commuter
          tenant pool.
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 16px', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
          <LegendRow color="#F8971D" label="2836 Fairfield Ave (subject)" pin />
          <LegendRow color={BAND_HEX[15]} label="15-min drive" ring />
          <LegendRow color={BAND_HEX[30]} label="30-min drive" ring />
          <LegendRow color={BAND_HEX[45]} label="45-min drive" ring />
          <LegendRow color={BAND_HEX[60]} label="60-min drive" ring />
        </div>

        {/* MAP — layered: base → rings → labels overlay → subject marker */}
        <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', flex: 1, minHeight: 0 }}>
          {ok ? (
            <>
              <img src={baseUrl} alt="Drive-time map centered on Black Rock, Bridgeport CT" style={{ ...fill, objectFit: 'fill', display: 'block' }} />
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
                {/* Filled translucent bands (largest first → nested shading). Fills
                    tint only the reachable land; the Sound stays clear, so the
                    coastal corridor reads as intentional reach, not stray lines. */}
                {RING_PATHS.map(r => (
                  <polygon key={`f-${r.min}`} points={r.points} fill={r.color} fillOpacity={0.16} stroke="none" />
                ))}
                {RING_PATHS.map(r => (
                  <polygon key={`s-${r.min}`} points={r.points} fill="none" stroke={r.color} strokeWidth={2}
                    strokeOpacity={0.95} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
              <img src={LABELS_OVERLAY} alt="" aria-hidden="true" style={{ ...fill, objectFit: 'fill', pointerEvents: 'none' }} />
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
                {/* subject property marker — gold teardrop pin, tip at the site */}
                <g transform={`translate(${SUBJ_PX[0]} ${SUBJ_PX[1]})`}>
                  <ellipse cx="0" cy="1" rx="5" ry="2" fill="rgba(0,0,0,0.28)" />
                  <path d="M0 0 C -5 -8 -8 -11 -8 -15 A 8 8 0 1 1 8 -15 C 8 -11 5 -8 0 0 Z"
                    fill="#F8971D" stroke="#fff" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <circle cx="0" cy="-15" r="3.2" fill="#fff" />
                </g>
              </svg>
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
              Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API.
            </div>
          )}
        </div>

        {/* DRIVE-TIME STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginTop: 10 }}>
          {CITIES.map(c => (
            <div key={c.name} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{c.name}</div>
              <div style={{ fontSize: 9, color: 'var(--stone)', fontWeight: 600, marginTop: 2 }}>{c.drive}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 7.5, color: 'var(--stone)', marginTop: 6 }}>
          Drive-time bands reflect typical road-network travel times and are approximate; actual times vary with
          traffic and time of day.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
```
