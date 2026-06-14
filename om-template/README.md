# NPCG Offering Memorandum — Template

Clean starting point for a Northeast Private Client Group offering memorandum.
The OM is a React/Vite single-page deck where each `.page` is one slide; the
same components render both the on-screen deck and the exported print PDF.

Everything in here is **placeholder** (`Property Name`, `$0,000,000`, `00`,
`TODO:`). Clone the folder, fill in the data files and the `TODO`s, drop in
photos, and export.

## Quick start

```bash
npm install
npm run dev      # live deck at http://localhost:5173
npm run pdf      # build + render the print-ready PDF (self-contained)
```

## Documentation

Full docs live in [`docs/`](docs/):

- **[docs/GUIDE.md](docs/GUIDE.md)** — step-by-step walkthrough for building a new OM from this template.
- **[docs/SYSTEM.md](docs/SYSTEM.md)** — how the engine works internally (page model, maps, print pipeline) — read this to extend it.
- **[docs/REFERENCE.md](docs/REFERENCE.md)** — exact data-file shapes, scripts, and export env vars.

The rest of this README is the short version.

## Where the content lives

Per-deal data is separated from the page components so a new OM is mostly a
data swap:

| File | What it holds |
| --- | --- |
| `src/deal.js` | **Start here.** Property identity — name, address, asset type, listing status, cover photo, PDF filename. Drives the cover, page headers/footers, and document title. |
| `src/firm.js` | Deal team (brokers shown on Deal Contacts + Team pages) and office locations. |
| `src/amenities.js` | Location data — property coordinates, POIs, distances for the Location & Amenities map. |
| `src/photos.js` | Photo + floor-plan page sequence. Ships as "coming soon" placeholders. |
| `src/App.jsx` | Page order (the `pages` array) and the page bodies — exec summary, property overview, rent roll, income & expense, etc. **Search `TODO` to find every spot that needs real content.** |
| `src/Toc.jsx` | Table of contents (page numbers are hand-kept in sync with the `pages` array). |
| `index.html` | `<title>` + SEO/OpenGraph meta (per deal). |

Shared frame and styling — `src/Shell.jsx` (header/footer), `src/PhotoPages.jsx`
(photo + floor-plan layouts), `src/index.css` (page size, brand tokens). The
map components (`LocationMap`, `RegionalMap`, `EastCoastMap`) carry placeholder
coordinates flagged `// TODO: set ... coordinates`.

## Filling it in

1. `npm install`.
2. Edit `src/deal.js` (name, address, type, cover image path, `pdfName`).
3. Work through every `TODO` in `src/App.jsx` — exec summary, property overview,
   rent roll, income & expense, location/county pages.
4. Update `src/firm.js` (brokers + offices) and `src/amenities.js` (property
   coordinates + nearby POIs).
5. Drop web-sized photos in `public/photos/` and wire them in `src/photos.js`
   (switch pages from `kind: 'comingsoon'` to real galleries). Add the cover at
   the path set in `deal.js → coverImage`.
6. Update `index.html` meta and `src/Toc.jsx` page numbers/labels.
7. `npm run pdf`.

## PDF export

`npm run pdf` (→ `export.cjs`) builds the bundle, serves it, screenshots every
`.page` with Puppeteer, and composes a rasterized 11×8.5in landscape PDF named
from `deal.js → pdfName`. Pages are **rasterized on purpose** (anti-scrape) —
do not switch the export to vector/selectable text.

Already have a dev/preview server running? Render against it directly:

```bash
npm run print            # uses :5173
node print.cjs 4173      # or a specific port
```

### Tuning (env vars)

| Var | Default | Effect |
| --- | --- | --- |
| `DSF` | `3` | deviceScaleFactor → DPI ≈ `960 * DSF / 11`. `3` ≈ 262 DPI, `2.5` ≈ 218 DPI (both 200+). |
| `QUALITY` | `62` | JPEG quality 1-100. Main lever on file size (lower = smaller file). |
| `BRIGHTEN` | `1.05` | Mild **print-only** brightness lift on regular photos (paper prints darker than a backlit screen). |
| `COVER` | `1.18` | Stronger lift applied to the whole cover/divider hero, so their dark text scrims lighten while white text stays white. |

```bash
QUALITY=55 npm run pdf       # smaller file
COVER=1.28 npm run pdf       # lift a still-dark printed cover
```

Brightness lifts are injected into the headless capture only — the live web
deck is never modified.

## Photos

Web-sized exports go in `public/photos/` (committed). Keep high-res shoot
masters out of git — `RISE MEDIA/` and `*.xlsx` are gitignored. Export web/print
sizes from the masters (≈2600px long edge holds up at 200+ DPI).
