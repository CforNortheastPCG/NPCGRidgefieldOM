# NPCG Offering Memorandum — Ridgefield

Print-ready offering memorandum for **Main Street Apartments, 613-615 Main Street,
Ridgefield, CT**, built as a React/Vite single-page deck. Each `.page` is one
slide of the OM; the same components render both the on-screen deck and the
exported PDF. Marketed by Northeast Private Client Group.

This repo doubles as the **OM engine template** — clone it, point the data files
at a new deal, swap the photos, and export. Most of a new OM is data edits, not
component work.

## Quick start

```bash
npm install
npm run dev      # live deck at http://localhost:5173
npm run pdf      # build + render the print-ready PDF (self-contained)
```

## Where the content lives

Per-deal data is separated from the page components so a new OM is mostly a
data swap:

| File | What it holds |
| --- | --- |
| `src/deal.js` | **Start here.** Property identity — name, address, asset type, listing status, cover photo, PDF filename. Drives the cover, page headers/footers, and document title. |
| `src/firm.js` | Deal team (brokers shown on Deal Contacts + Team pages). |
| `src/amenities.js` | Location data — POIs, distances, geocoded coords for the Location & Amenities map. |
| `src/photos.js` | Photo + floor-plan page sequence (captions, grid layout, per-building grouping). |
| `src/App.jsx` | Page order (the `pages` array) and the page bodies — financials, narrative, rent roll, I&E. |
| `src/Toc.jsx` | Table of contents (page numbers are hand-kept in sync with the `pages` array). |
| `index.html` | `<title>` + SEO/OpenGraph meta (per deal). |

Shared frame and styling — `src/Shell.jsx` (header/footer), `src/PhotoPages.jsx`
(photo + floor-plan layouts), `src/index.css` (page size, brand tokens).

## Spinning up a new OM from this template

1. Clone the folder; `npm install`.
2. Edit `src/deal.js` (name, address, type, cover, `pdfName`).
3. Update `src/firm.js`, `src/amenities.js`, and the page bodies in `src/App.jsx`.
4. Drop web-sized photos in `public/photos/` and wire them in `src/photos.js`.
   Keep originals out of git (see below).
5. Update `index.html` meta and `src/Toc.jsx` page numbers.
6. `npm run pdf`.

## PDF export

`npm run pdf` (→ `export.cjs`) builds the bundle, serves it, screenshots every
`.page` with Puppeteer, and composes a rasterized 11×8.5in landscape PDF named
from `deal.js → pdfName`. The pages are **rasterized on purpose** (anti-scrape) —
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
| `QUALITY` | `62` | JPEG quality 1-100. Main lever on file size (~62 ≈ 13 MB for 34 pages; lower = smaller). |
| `BRIGHTEN` | `1.05` | Mild **print-only** brightness lift on regular photos (paper prints darker than a backlit screen). |
| `COVER` | `1.18` | Stronger lift applied to the whole cover/divider hero, so their dark text scrims lighten while white text stays white. |

```bash
QUALITY=55 npm run pdf       # smaller file
COVER=1.28 npm run pdf       # lift a still-dark printed cover
DSF=2.5 QUALITY=70 npm run pdf
```

Brightness lifts are injected into the headless capture only — the live web
deck is never modified. Source photos are faithful sRGB; the lifts exist purely
to compensate for paper.

## Photos

Web-sized exports live in `public/photos/` and are committed. High-res shoot
masters (`RISE MEDIA/`) are **gitignored** — keep them locally and export
web/print sizes from them (≈2600px long edge holds up at 200+ DPI). Floor plans
are cropped above the square-footage block on purpose.
