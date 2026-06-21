# Drive Times Map — FINAL spec & playbook

The canonical, full-page **Drive Times** page for the OM decks: road-network
drive-time bands (15 / 30 / 45 / 60-min) around the subject, on a bold styled
basemap with town labels + highways composited cleanly on top, a legend, and a
6-city drive-time strip.

This is the **finalized** reference — it supersedes the working notes in
`DRIVE_TIMES_MAP.md`. Three builds got us here: **South End Plaza** (first cut,
inland), **Black Rock / 2836 Fairfield Ave** (coastal, solved the water problem),
and **Ware Portfolio** (inland, locked in the house style). Copy from **Ware**
for an inland deal, **Black Rock** for a coastal one.

---

## House style (do this every time)
1. **Filled shaded bands** — each band drawn as a translucent fill **plus** a thin
   stroke, largest contour first, so they nest into a heat-map that darkens toward
   the center. (The outline-only `<polyline>` from the first South End build is
   **deprecated** — don't use it.)
2. **Real drive-time strip** — the `CITIES` numbers are **Valhalla-routed**, never
   eyeballed, computed with the same engine as the rings so the two agree.
3. **Geometry by location** — the only thing that changes with geography:
   **inland → radial-envelope rings** (smooth), **coastal → raw road-following
   polygon** (jaggy, but it has to be — see *What we tried*).

---

## Files & scripts
| File | Role |
|---|---|
| `src/DriveTimeMap.jsx` | The page component — composites the layers + legend + strip |
| `src/isochrones.js` | **Generated** band geometry (`{min, color, coords:[[lat,lng]…]}`) |
| `scripts/gen-isochrones.mjs` | Builds the bands from one Valhalla `/isochrone` call — `npm run isochrones` |
| `scripts/gen-map-labels.mjs` | Bakes the transparent labels/highways overlay — `npm run map-labels` |
| `public/photos/maps/drivetime-labels.png` | **Generated** transparent labels/highways overlay |

```json
"isochrones": "node scripts/gen-isochrones.mjs",
"map-labels": "node scripts/gen-map-labels.mjs"
```
Requires `VITE_GOOGLE_MAPS_API_KEY` (Maps Static API enabled) in `.env.local`.
Both scripts hit external services (Valhalla; Google Static Maps + puppeteer) and
are run **deliberately**, not on every build.

---

## How it's layered (z-order, bottom → top)
Bands must sit **behind** the town labels and highways — a single Static Maps
image or a CSS blend can't do that cleanly, hence the layering:

1. **Base image** — bold Google Static Maps basemap (orange highways, blue water),
   **labels off**. Fetched live at render.
2. **Bands** — SVG overlay projected from `isochrones.js` → filled shaded bands
   (see *Rendering*). Colors: 15 `#229954` (green), 30 `#2471A3` (blue),
   45 `#7D3C98` (purple), 60 `#C0392B` (red).
3. **Labels image** — pre-baked **transparent** PNG of labels + highway shields +
   lines (white chroma-keyed out). Composited normally, so it paints opaquely **on
   top** of the bands → roads never cut through town names.
4. **Property pin** — gold SVG teardrop, tip on the site.

All four share one Web-Mercator frame and stretch-fill the container
(`objectFit:fill` / `preserveAspectRatio="none"`), so they stay registered. The
`worldXY`/`toPx` projection in the component converts band lat/lng → frame px.

---

## The frame (must match everywhere)
`CENTER`, `ZOOM`, and `size` (W×H @ scale 2) define the frame. These appear in
**both** `DriveTimeMap.jsx` and `gen-map-labels.mjs` and **must be identical** —
the labels overlay is pre-rendered to that exact frame; the isochrone projection
updates automatically from the component's copy.

**Change center/zoom/size → re-run `npm run map-labels`** so the overlay
re-registers. Pick a frame whose 60-min reach fits with margin (verify with the
proof composite below).

### Reference builds
| Deal | Subject | CENTER | ZOOM | Geometry |
|---|---|---|---|---|
| South End Plaza (Thomaston, inland) | `41.6650, -73.0730` | `41.60, -72.95` | 8 | radial rings + filled shaded bands |
| Black Rock — 2836 Fairfield (coastal) | `41.157532, -73.226828` | `41.15, -73.40` | 8 | raw-polygon + filled shaded bands |
| Ware Portfolio (Ware MA, inland) | `42.2616, -72.2420` | `42.18, -72.25` | 8 | radial rings + filled shaded bands |

---

## Geometry by location

### Inland → radial-envelope rings (smooth)  ·  canonical: Ware
Raw Valhalla polygons follow roads but are scribbly (self-intersecting tendrils);
a pure spider is clean but too smooth. The radial envelope resolves the raw
polygon into **one radius per bearing bin** (farthest reach in that direction),
median-filters to kill spikes, then moving-average low-passes + Chaikin-smooths →
organic rolling waves that can't self-intersect.

Knobs (top of `gen-isochrones.mjs`, Ware values):
- `BINS` (360) — bearing bins; more = finer.
- `MEDIAN` (3) — despike window; 1 = off.
- `SMOOTH` (5) — moving-average window. **Lower = bigger/wavier; higher = smoother.**
- `CHAIKIN` (1) — corner-rounding passes.
- request `generalize` (6) / `denoise` (0.1) — source polygon detail.

### Coastal / waterfront → raw road-following polygon (jaggy by necessity)  ·  canonical: Black Rock
On a shoreline the radial method is the **wrong shape** — roughly the seaward half
of every bearing points over open water. Use Valhalla's **raw isochrone polygon**
directly: because `costing: auto` only follows roads, the polygon already
**excludes the water**. Take the outer ring, **decimate** to even spacing, and
**Chaikin-smooth** — no bins, no clamp:
```js
const MIN_SPACING_M = 350   // decimation spacing — larger = simpler/smoother
const SMOOTH_PASSES = 2     // Chaikin rounding passes
let raw = decimate(byTime.get(c.time), MIN_SPACING_M)   // [[lng,lat]…], excludes water
if (raw.length > 1 && raw[0][0] === raw.at(-1)[0] && raw[0][1] === raw.at(-1)[1]) raw.pop()
let pts = chaikin(raw.map(([lng, lat]) => [lat, lng]), SMOOTH_PASSES)
pts.push(pts[0])
```
It reads jaggier than an inland map **on purpose** — it's tracing real coastal road
reach (peninsulas, bridges, the water cut out). Over-smoothing (`MIN_SPACING_M` or
`SMOOTH_PASSES` too high) rounds the coastal corners back **out over the water**,
so there's a hard limit before it looks wrong.

---

## What we tried (lessons — don't repeat these)
- **Coastal, attempt 1 — plain radial envelope:** `fillGaps()` interpolated a
  radius *across* the Sound (bridging the SW→NYC and E→New Haven arms); bands
  **ballooned into the ocean**. ✗
- **Coastal, attempt 2 — radial + seaward clamp** (pin no-road bearings to shore):
  killed the balloon, but the "pie" between the coastal arms still spanned water,
  so the band **still skimmed the Sound**. ✗
- **Coastal, fix — raw road-following polygon:** `costing:auto` already excludes
  water, so the raw outline is the geometrically correct coastal shape. ✓ (This is
  why Black Rock is jaggy and that's correct.)
- **Bands baked into the Static Maps `path=` URL:** raw isochrones have thousands
  of vertices; encoded into `path=` they blow past Google's ~16,384-char URL limit
  and the map **silently fails**. → SVG overlay instead (no limit, crisp vectors). ✗→✓
- **Labels via CSS multiply/blend over the bands:** blended highway lines still
  **bleed through the text**. → pre-bake a transparent labels PNG (chroma-key the
  white field out) and composite it normally on top. ✗→✓
- **Strip times by eyeball:** drift out of agreement with the rings and read as
  guesses. → compute them from the same Valhalla engine (matrix call). ✗→✓
- **Inland smoothness:** `SMOOTH=5` was the landing spot — lower got too wavy,
  higher washed the rings flat.

---

## Rendering: filled shaded bands (the look)
Draw each band **twice** — translucent **fill**, then thin **stroke** — largest
contour first so they nest and darken toward the center:
```jsx
{RING_PATHS.map(r => <polygon key={`f-${r.min}`} points={r.points} fill={r.color} fillOpacity={0.16} stroke="none" />)}
{RING_PATHS.map(r => <polygon key={`s-${r.min}`} points={r.points} fill="none" stroke={r.color} strokeWidth={2} strokeOpacity={0.95} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />)}
```
The transparent labels overlay composites on top, so town names / shields stay
readable over the fills. Knob: `fillOpacity` (0.16). Legend swatches use the ring
icon — the fill is the band, the stroke is its edge.

---

## Drive-time strip: real Valhalla-routed values (never estimate)
Geocode each city (Google Geocoding), then one Valhalla **matrix** call
(`sources_to_targets`, `costing: auto` — same engine as the rings):
```js
const body = { sources: [SUBJECT], targets, costing: 'auto' }   // targets = [{lat,lon}…]
const r = await fetch('https://valhalla1.openstreetmap.de/sources_to_targets?json=' + encodeURIComponent(JSON.stringify(body)))
const row = (await r.json()).sources_to_targets[0]
// row[i].distance (km) → miles ×0.621371 ;  row[i].time (s) → minutes /60
```
Round to friendly figures (`~28 mi · 40 min`); pick ~6 cities that bracket the
bands (nearest hub → the ~60-min edge). Make the intro narrative match the routed
numbers (if Hartford routes at 62 min, say "about an hour," not "inside ~60").

---

## Spin up for a new deal
1. Copy `src/DriveTimeMap.jsx`, `scripts/gen-isochrones.mjs`,
   `scripts/gen-map-labels.mjs`; add the two npm scripts; ensure `.env.local` has
   the Maps key (copy from a sibling OM).
2. Set `SUBJECT` (component **and** isochrone script) + a `CENTER/ZOOM/W/H` frame
   (component **and** `gen-map-labels.mjs` — keep identical).
3. Pick geometry: **inland → radial block (Ware); coastal → raw-polygon block
   (Black Rock).** Rendering is always filled shaded bands.
4. Compute the `CITIES` strip with the Valhalla matrix; write the intro to match.
5. `npm run isochrones`, then `npm run map-labels`.
6. Wire `<DriveTimeMap />` into `src/App.jsx` (Location & Market section) and add
   the TOC entry in `src/Toc.jsx`.

### Proof it (verify the look)
Bands are an SVG overlay, not baked into the static image, so you can't see the
final map from the static URL alone. Composite it with puppeteer (already a dep):
load base img + SVG bands + labels overlay + pin into one HTML at the frame size
and screenshot. Confirm the subject pin is centered and all four bands sit inside
the frame with margin. This is also what `npm run pdf` rasterizes, so the proof
matches the export.

### Export
Ship with `npm run pdf` (rasterized, anti-scrape export — see the project README).
