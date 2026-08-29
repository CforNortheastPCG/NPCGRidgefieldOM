# Route 9, Halfmoon — 4-Page Property Flyer

±1.32-acre commercial development site on Route 9 (US-9), Town of Halfmoon,
Saratoga County, NY. First deck out of the Albany office.

## House style

This deck is built on the **AutoOM style pack v1** — the same system as the
current books. `src/styles/tokens.css` and `src/styles/index.css` are copied
**verbatim** from `om-hysil/src/styles/`; don't edit them here. To pick up
house changes, re-copy both files.

```sh
cp ../om-hysil/src/styles/{tokens.css,index.css} src/styles/
```

`src/styles/flyer.css` holds the only flyer-specific vocabulary (cover stat
band, site inset, full-page aerial, paths grid) and is built from the same
tokens. Pages are the house **960×742** box (= 11×8.5in landscape) and clip
overflow silently — after any content change, re-render and eyeball.

House elements this deck uses, rather than one-off styles: `.page-header` /
`.page-footer`, `.eyebrow` (terracotta) + `.section-title` with `.accent` +
`.title-rule`, `.stat-tile`, `.hl-item`, `.highlights`, `.data-table`,
`.photo-grid` / `.photo-item` / `.photo-caption` / `.photo-missing`,
`.cover-hero-*`, and `.dc-*` for the contact block.

## Pages

| # | Page | Content |
|---|------|---------|
| 1 | Cover | Full-bleed drone hero, title block, 6 stat tiles on a white band |
| 2 | Investment Summary | Lead, overview, site map zoomed to the pin, Highlights, Deal at a Glance |
| 3 | Trade Area & Retail Context | Full-page retail aerial (Clifton Park Center / Village Plaza / Walmart / Exit 9) |
| 4 | Positioning & Contacts | Paths to Value, drone photo strip, Exclusively Listed By, Diligence & Watch Items |

## Render

**There is no dev server and nothing to `npm install`.** `print-flyer.cjs`
builds the whole deck straight from `src/data.js` + `src/styles/`.

```sh
npm run print   # render PNGs + PDF
npm run dev     # render, then open out/preview.html in a browser
```

There is no `node_modules` here — the `print` script borrows a sibling that
has both `puppeteer` and `pdf-lib` via `NODE_PATH`. The long form:

```sh
NODE_PATH=/Users/cam/NPCGRidgefieldOM/om-southend-plaza/node_modules \
  node print-flyer.cjs
```

Outputs to `out/`:

- `preview.html` — the whole deck, openable directly in a browser (no server)
- `route9-halfmoon-p1..p4.png` — 2× page screenshots
- `route9-halfmoon-flyer.pdf` — 4-page landscape PDF, rasterized (anti-scrape)
  with AI-facing metadata embedded via `flyer-meta.cjs`

## Editing

Everything the deck says lives in `src/data.js`. `print-flyer.cjs` builds the
markup from it.

Photos go in `public/photos/`. **Any photo that isn't there yet is simply
omitted** and its tile renders as the house `.photo-missing` placeholder, so
the deck always composes.

| File | Slot |
|------|------|
| `hero.jpg` | Page 1 cover (drone, Route 9 frontage) |
| `retail-aerial.png` | Page 3 trade-area aerial — **in hand** |
| `close-1.jpg` / `close-2.jpg` / `close-3.jpg` | Page 4 photo strip |
| `team/James-Morrissey.jpg` | Page 4 headshot — **in hand** |

Page 2's site map is the same `retail-aerial.png` zoomed to the subject pin
via CSS (`ROUTE9.siteInset` in `src/data.js` — `scale` / `originX` / `originY`).
Retarget it there rather than cropping a second image. If a replacement
aerial is reframed, the inset origin needs retargeting with it.

## Still open

- **Asking price** — `TBD` on the cover stat band and in Deal at a Glance.
- **Traffic count** — Route 9 AADT to be pulled from NYSDOT Region 1. Left as
  `TBD — NYSDOT` rather than estimated.
- **Drone photos** — cover + page 4 strip.

`ROUTE9.forDiscussion` is still in `src/data.js` but is not rendered — there
was no room on page 4 once the contact block landed. Drop it in if a page 5
ever appears.

## Sources

Parcel facts (acreage, frontage, lot SF, zoning code, utilities, flood zone,
parcel ID, assessment, taxes, school district) are transcribed from
`CRS-Property-Report-RR9.pdf` (Courthouse Retrieval System, tax parcel
285.1-1-38.1, SWIS 413800, pulled 07/10/2026). Current ownership, mortgage,
and sale history from that report are deliberately **not** on the flyer.

Note: the Salesforce property record for this site (`Route 9`, Halfmoon) is
stale — 1 acre, a 2013 $7,500 sale, wrong owner. Trust the CRS report.
