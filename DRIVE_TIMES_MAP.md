# South End Plaza OM — Drive Times map + session changes

Notes on the work done this session: a new full-page **Drive Times** map (the
bulk of it) plus a round of OM copy/financial edits.

---

## 1. Drive Times map (new page)

A full-page page showing road-network drive-time rings (15/30/45/60-min) around
the property, with the basemap, town labels, and highways on top of the rings.

**Page position:** page 19, in the *Location & Market* section (after *Location &
Amenities*). Added to `src/App.jsx` page order and `src/Toc.jsx`.

### Files
| File | Role |
|---|---|
| `src/DriveTimeMap.jsx` | The page component — composites the layers + legend + drive-time strip |
| `src/isochrones.js` | **Generated** ring geometry (`[lat,lng]` arrays per band) |
| `scripts/gen-isochrones.mjs` | Generates the rings — `npm run isochrones` |
| `scripts/gen-map-labels.mjs` | Generates the transparent labels overlay — `npm run map-labels` |
| `public/photos/maps/drivetime-labels.png` | **Generated** transparent labels/highways overlay |

Requires `VITE_GOOGLE_MAPS_API_KEY` (Maps Static API) in `.env.local`.

### How it's layered (z-order, bottom → top)
The whole reason for the layering: rings must sit **behind** the town labels and
highways, which a single Static Maps image or a blend mode couldn't do cleanly.

1. **Base image** — bold Google Static Maps basemap (orange highways, blue
   water), **labels off**. Live at render.
2. **Rings** — SVG `<polyline>` overlay, projected from `isochrones.js`.
   Stroke opacity `0.9`, colors: 15 `#229954` (green), 30 `#2471A3` (blue),
   45 `#7D3C98` (purple), 60 `#C0392B` (red).
3. **Labels image** — pre-baked **transparent** PNG of labels + highway shields +
   highway lines (white background chroma-keyed out). Composited normally, so it
   paints opaquely **on top** of the rings → lines never cut through town names.
4. **Property pin** — gold SVG teardrop marker, tip on the site.

All four share one Web-Mercator frame and stretch-fill the container
(`objectFit:fill` / `preserveAspectRatio="none"`), so they stay registered.

### The frame (must match everywhere)
`CENTER = 41.60, -72.95` · `ZOOM = 8` · `size 640x460 @ scale 2`.
These constants appear in `DriveTimeMap.jsx`, `gen-map-labels.mjs`, and the
projection. **If you change center/zoom/size, re-run `npm run map-labels`** so the
labels overlay re-registers, and the projection updates automatically.

Subject: 310 South Main St, Thomaston = `41.6650, -73.0730`.

### How the rings are generated — "radial envelope" method
`scripts/gen-isochrones.mjs` (one Valhalla `/isochrone` call):

1. Pull the raw road-following isochrone polygon for each contour.
2. Resolve it to **one radius per bearing bin** (the farthest reach in that
   direction) → guarantees a clean, non-self-intersecting ring (raw polygons are
   "scribbly" and tangle; the pure smooth spider was "not wavy enough").
3. Median-filter the radius profile (despike), then **moving-average low-pass**
   it (turns sharp zig-zag into rolling waves), then light Chaikin rounding.
4. Reconstruct points along each bearing → `[lat,lng]` arrays.

**Tuning knobs** (top of `gen-isochrones.mjs`) — current values in parens:
- `BINS` (360) — bearing bins; more = finer detail.
- `MEDIAN` (3) — despike window; 1 = off.
- `SMOOTH` (5) — moving-average window. **Lower = bigger/wavier; higher = smoother.**
- `CHAIKIN` (1) — corner rounding passes.
- request `generalize` (6) / `denoise` (0.1) — source polygon detail.

The waviness was dialed in by lowering `SMOOTH`; `5` was the landing spot.

### Regenerating
```bash
npm run isochrones    # rebuild the rings (1 Valhalla call)
npm run map-labels    # rebuild the transparent labels overlay (only if frame changes)
```
Both hit external services and are run **deliberately** (not on every build).

### Verifying the look
Because the rings are an SVG overlay (not baked into the Static Maps URL), you
can't see the final map by fetching the static image alone. Composite it with
puppeteer (already a dependency) — load base img + SVG rings + labels overlay +
pin into an HTML and screenshot. This is also what `npm run pdf` uses, so the
PDF export matches what you verify.

### Why not bake everything into the Static Maps URL?
Raw isochrones have thousands of vertices; encoded into `path=` params they blow
past Google's ~16,384-char URL limit (the map silently fails). The SVG overlay
has no such limit and exports as crisp vectors.

---

## 2. OM copy / financial edits (same session)

- **Real estate tax now set** → taxes `$40,959` (escrowed) → **`$30,719`** (2025
  town-wide revaluation, Grand List mill rate **27.21**). Flows to NOI:
  - In-place (normalized) NOI **$158,400 · 6.47% cap** (was $148,160 · 6.05%)
  - Pro forma NOI **$191,443 · 7.81% cap** (was $181,203 · 7.40%)
  - Updated everywhere: Exec Summary, Property Overview card, Income & Expense
    (table + NOI strip + notes), Investment Highlights.
- **Income & Expense** — Current column filled in (rental `$251,910`, EGI
  `$267,689`, OpEx `$109,289`); R&M note `$0.50/SF`; tax-basis note (fixed
  through 2030 reval, CT doesn't reassess on sale).
- **Rent Roll** — apartments shown annual `$175,800 → $196,800` (avg $1,465 →
  $1,640); total GSR `$260,700 → $303,100`; chart switched to total GSR; CAM
  water-recovery note.
- **Executive Summary** — rewritten to the value-add + tax-basis paragraphs.
- **Investment Highlights** — replaced with the 7 canonical bullets (residential
  upside, commercial lease-up/CAM, diversified income, tenancy, Route 8 location,
  $168/SF basis ≈ 56% of replacement cost, assessment set through 2025 reval).
- **Demographics** — Thomaston median HH income **$91,967** / avg **$111,200**,
  pop **7,492**, **3,097** households; "above the CT median" softened to "in line
  with." County figures unchanged. Employer lists enriched.

---

## Export
When ready to ship: `npm run pdf` (rasterized, anti-scrape export — see README).
