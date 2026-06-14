# System Guide — How the OM Engine Works

Internals and design rationale. Read this if you're extending the engine
(new page types, layout changes, tweaking the print pipeline) rather than just
filling in a deal — for that, see [GUIDE.md](GUIDE.md).

---

## Big picture

One React/Vite app renders the entire OM as a vertical stack of fixed-size
"pages." The **same DOM** is used two ways:

- **On screen** — `npm run dev`, a scrollable deck.
- **In print** — `export.cjs` loads the built site in headless Chrome,
  screenshots each page, and composes a rasterized PDF.

There is no separate print stylesheet or PDF layout engine — what you see in the
browser is what prints. This keeps one source of truth for layout.

```
src/deal.js ─┐
src/firm.js  ─┼─▶ data
src/amenities│
src/photos.js┘
                  src/App.jsx ── assembles ──▶ <div.page> × N ──▶ browser deck
   src/Shell.jsx ─┘ (header/footer/frame)                    │
   src/*Map.jsx ──┘ (maps)                                   ▼
                                          print.cjs / export.cjs ──▶ PDF
```

---

## The page model

Each slide is a `<div className="page">`. `index.css` fixes its dimensions:

```css
:root { --page-w: 960px; --page-h: 742px; }   /* 960:742 ≈ 11:8.5 landscape */
.page { width: var(--page-w); height: var(--page-h); overflow: hidden; ... }
```

The 960×742 aspect ratio matches an 11×8.5in landscape page exactly, so screenshots
drop onto PDF pages with no letterboxing.

**Page order lives in one place** — the `pages` array in `App.jsx`:

```jsx
const pages = [
  <CoverHero />, <Toc />, <DealContacts />, <ExecutiveSummary />,
  <Divider eyebrow="01" title="The Property" />, <BuildingDescriptions />,
  ...PHOTO_PAGES.map(p => p.kind === 'comingsoon' ? <PhotoComingSoon {...p}/> : <PhotoGallery {...p}/>),
  <Divider eyebrow="02" title="Financial Analysis" />, <RentRoll />, <IncomeExpense />,
  ...
]
return <div className="om-container">{pages.map((el,i) => cloneElement(el, { key:i, pageNum:i+1 }))}</div>
```

`pageNum` is injected by position (1-based) via `cloneElement`, so reordering a
page renumbers the footer automatically. **The TOC (`Toc.jsx`) is NOT automatic**
— its `n` values are hand-maintained to match this array.

To add a page: write a component that returns a `<div className="page">` (or uses
`StaticShell`), then drop it into the `pages` array at the right spot and update
`Toc.jsx`.

---

## The shared frame — `Shell.jsx`

- `PageHeader` — dark bar with NPCG logo + section label + `FULL_ADDR`.
- `PageFooter` — compass logo + `{DEAL.status} · {DEAL.name} · {FULL_ADDR}` + page number.
- `StaticShell` — convenience wrapper (header + titled body + footer) for simple
  content pages.

`Shell.jsx` imports `DEAL`/`ADDR`/`CITY_STATE`/`FULL_ADDR` from `deal.js` and
re-exports them, so page components can `import { DEAL, ADDR } from './Shell.jsx'`
in one line.

---

## Maps

Three map components, all rendering to the print-safe screenshot:

- **LocationMap** — Google **Static Maps** image centered on `PROPERTY.lat/lng`
  with category-colored POI pins from `amenities.js`. Static (not interactive)
  so it screenshots reliably. Needs `VITE_GOOGLE_MAPS_API_KEY` in `.env.local`
  (Maps Static API enabled); without it the page shows a placeholder.
- **RegionalMap / EastCoastMap** — `d3-geo` + `us-atlas`/`topojson` projections
  drawing the region/East Coast with plotted markers (cities, rail, offices).
  Pure SVG, no API key.

Map coordinates in the template are valid placeholders flagged `// TODO`.

---

## Print pipeline — `print.cjs` + `export.cjs`

`print.cjs` exports `renderPdf(opts)` and also runs as a CLI. `export.cjs` is the
turn-key wrapper (`npm run pdf`): **build → serve (vite preview) → renderPdf →
kill server**. Steps inside `renderPdf`:

1. **Launch headless Chrome** with `--force-color-profile=srgb` (keeps screenshot
   color true so photos don't print dark) and `--allow-file-access-from-files`.
2. **Load** the running site at `deviceScaleFactor = DSF` (DPI ≈ `960*DSF/11`).
3. **Wait** for fonts + every `<img>` to finish `decode()` — `networkidle` alone
   leaves the big cover photo undecoded and screenshots it blank.
4. **Inject print-only brightness** CSS (see below).
5. **Screenshot** each `.page` as JPEG (quality = `QUALITY`).
6. **Compose** — write an HTML page of `file://` `<img>` tags (one per
   screenshot, each on an 11×8.5in `@page`) and `page.pdf()` it. Images are
   referenced by file path, not base64 — embedding base64 crashes the compositor.

Output filename comes from `deal.js → pdfName` (parsed with a regex since
`print.cjs` is CommonJS and can't import the ESM `deal.js`).

### Why rasterized

Pages are screenshots, not selectable text — **intentional, anti-scrape**. Do not
"improve" the exporter to emit vector/selectable PDF text.

### Print brightness (screen vs paper)

Source photos are faithful sRGB and the screenshot step reproduces them exactly.
But paper isn't backlit, so a faithful render prints darker than it looks. Two
**print-only** lifts (injected into the headless capture, never the web build)
compensate:

- `BRIGHTEN` (default 1.05) — mild `filter: brightness()` on regular photos.
- `COVER` (default 1.18) — stronger lift on the whole `.cover-hero` container, so
  the dark text-legibility scrims on the cover/dividers lighten while pure-white
  text stays white (white × brightness clips at white).

---

## Photos & print resolution

At `DSF 3` the deck renders at ~262 DPI on an 11in page, so a **full-width** photo
needs ~2640px of source width to stay crisp. Export web/print photos at **≈2600px
long edge, JPEG q85**. Grid photos can be smaller, but a uniform 2600px is simplest
and lets any photo be used full-width.

`QUALITY` is the main file-size lever (it's the JPEG quality of the page
screenshots, not the source photos). Lower it to shrink the PDF.

Shoot masters (`RISE MEDIA/`) and spreadsheets (`*.xlsx`) are gitignored; only the
web-sized `public/photos/` exports are committed.

---

## File map

| File | Role |
| --- | --- |
| `src/deal.js` | Per-deal identity config (the engine entry point). |
| `src/Shell.jsx` | Header / footer / `StaticShell`; re-exports `deal.js`. |
| `src/App.jsx` | Page order + all page bodies. |
| `src/Toc.jsx` | Table of contents (page numbers hand-synced to `App.jsx`). |
| `src/PhotoPages.jsx` | `PhotoComingSoon` + `PhotoGallery` page renderers. |
| `src/photos.js` | Photo page sequence (data). |
| `src/firm.js` | Team + offices (data). |
| `src/amenities.js` | Property coords, connectivity, POIs (data). |
| `src/LocationMap/RegionalMap/EastCoastMap.jsx` | Maps. |
| `src/index.css` / `App.css` | Page size, brand tokens, component styles. |
| `print.cjs` | `renderPdf()` + CLI. |
| `export.cjs` | One-command build→serve→render→cleanup. |
