# NPCG Broker Opinion of Value — Template

Reusable BOV deck: React + Vite, fixed 960×742 landscape pages, NPCG brand
system, raster + vector PDF export. **A new BOV = copy this folder, edit the
data files, drop photos. No JSX edits needed for the standard flow.**

Ships with a complete fictional sample deal ("Maple Court Apartments") so
every page renders out of the box, and `DRAFT = true` so a diagonal watermark
covers every page on screen until the numbers are final.

## Two formats

`FORMAT` in `src/data/deal.js` selects the deck. Both are built from the same
`pageDefs` array in `src/App.jsx`, so page numbers and the TOC follow
automatically.

| | `'short'` — 9 pages (default) | `'full'` — 33 pages |
|---|---|---|
| **What it is** | The analytical BOV. The document itself, nothing to skim past. | The same nine analytical pages plus the pitch around them. |
| **When** | Most owner conversations. You are answering "what is it worth?" | The BOV doubles as the listing pitch, or the owner is deciding between brokers. |
| **Pages** | Cover · Executive Summary · Valuation & Pricing · Property Record Card · Rent Roll & Unit Mix · Operating Statement · Real Estate Taxes · Photography · Conclusion & Contact | + TOC, Advisors, Disclaimer, The Project, Property Information, Why NPCG, Track Record, Unit Mix & Income, Sales Comps, Rent Comps, Process/Expect/Contract/Closing, Market Overview, Development & Regulation, Team, Locations |

Conclusion & Contact is always the last page — a BOV should end on the stated
opinion and a phone number.

Two pages drop out automatically when their source data is absent: **Property
Record Card** (needs `assessor.js`) and **Real Estate Taxes** (needs
`taxes.js`). Set either export to `null` and the page disappears from both
formats and from the TOC. Don't ship an empty shell.

## New-BOV checklist

1. **Copy the folder**: `cp -R bov-template bov-<deal-slug>` → `npm install`.
2. **Rename the deck identity** — three places, none of them wired together:
   - `src/data/deal.js` → `DEAL` + `pdfName`
   - `index.html` → `<title>`, `<meta description>`, `og:title` (ships as
     `NPCG BOV — REPLACE ME` so an unrenamed clone is obvious). **This one
     matters beyond cosmetics:** `export.cjs` and `qa-shots.cjs` compare the
     served `<title>` against `dist/index.html`'s to prove they are rendering
     *this* deck and not a sibling clone squatting the port. Two clones
     sharing a title defeat that guard.
   - `package.json` → `"name"`
3. **Pick the format**: `FORMAT = 'short' | 'full'` in `src/data/deal.js`.
4. **Edit `src/data/` in this order** (each file opens with an EDIT-ME header
   saying exactly what it feeds):
   | File | Feeds |
   |---|---|
   | `deal.js` | cover, headers/footers, `pdfName`, `FORMAT`, `COVER_STATS`, DRAFT toggle |
   | `advisors.js` | Advisors page (bio + 3 stat tiles each) and the Conclusion contact card |
   | `project.js` | Executive Summary (`summary`, numbered `highlights`, `locationNote`) + The Project page |
   | `properties.js` | Property Information + the Executive Summary profile table — **2+ entries = portfolio mode** (summary page + one page per property, TOC renumbers itself) |
   | `rentRoll.js` | Rent Roll & Unit Mix, unit-mix donuts, rent-comp subject strip. Optional per-unit `status` / `leaseFrom` / `leaseEnd` columns appear only if present |
   | `financials.js` | Operating Statement — vacancy %, mgmt %, other income, expenses, and the **T-12 column** (`t12` per row + `T12_EFFECTIVE_RENTAL_INCOME`) |
   | `assessor.js` | Property Record Card. Handles 1 parcel or N (side-by-side with a portfolio total). `null` to drop the page |
   | `taxes.js` | Real Estate Taxes + reassessment sensitivity. `null` to drop the page |
   | `valuation.js` | Valuation & Pricing and Conclusion — `askingPrice`, `capLadder`, loan terms, the three argument cards, `opinionParagraphs` |
   | `salesComps.js` / `rentComps.js` | comp pages, `full` format only (pull candidates from CoStar / Salesforce, paste in) |
   | `trackRecord.js` | Our Track Record (hand-author from the Salesforce closed-deal report) |
   | `market.js` | Market Overview (demographics vs state) + Development & Regulation |
   | `photos.js` | photo pages. The first entry's first three images also fill the Record Card strip |
   | `process.js`, `firm.js` | firm-standard marketing-process + Why NPCG copy — usually untouched |
5. **Drop photos** in `public/photos/` at the placeholder filenames
   (cover.jpg, toc.jpg, divider.jpg, project-1.jpg, property-1.jpg,
   exterior-*.jpg, interior-*.jpg, market-*.jpg). Regenerate placeholders
   anytime: `node scripts/gen-placeholders.cjs`.
   **Size them first** (per `RENDER-PIPELINE.md` §0): vector ≤1600px long edge
   at JPEG q82–85; raster ~2400px at q85; 3-component sRGB only, never CMYK.
   `page.pdf()` embeds the source JPEG byte-for-byte — 2600px sources once
   produced a 162 MB deck.
6. **Update `pdf-meta.cjs`** (AI-facing PDF metadata — property + advisors;
   it's CJS so it can't import the ESM data files, and must be hand-synced).
7. **Check every page**: `npm run dev`, or `npm run build && node
   scripts/qa-shots.cjs` — screenshots all pages and **exits 4 if any page's
   content overflows its fixed box**, which is otherwise clipped silently.
   Run it again after switching `FORMAT`.
8. **Flip `DRAFT = false`** in `src/data/deal.js`.
9. **Export**: `npm run pdf` (raster, anti-scrape image-only — DSF / QUALITY /
   BRIGHTEN / COVER env knobs) and/or `npm run pdf:vector` (selectable-text
   vector + `fix-pdf.cjs` color/metadata pass). Both probe for a free port and
   verify the served deck's `<title>` before rendering.

## Architecture

```
src/App.jsx          pageDefs array — SINGLE SOURCE OF TRUTH for page order,
                     page numbers, AND the Table of Contents (all derived).
                     full(...) marks long-format-only entries; ifData(...)
                     marks pages that need their source file to exist.
src/data/*.js        the per-deal edit surface (see checklist above)
src/lib/calc.js      ALL derived numbers: rent-roll totals, occupancy, unit
                     mix, the three income scenarios (T-12 / current / pro
                     forma), the cap-rate ladder, assessment ratios, and the
                     tax reassessment scenarios.
                     Never hand-total — edit the inputs in src/data/.
src/pages/*.jsx      one component per page
src/components/      Shell (header/footer/Md), Blocks (SectionTitle,
                     KpiTile/Strip/Rail, Callout, NumberedList, SourceNote),
                     tableKit (T cell styles, zebra), Divider, PhotoPages,
                     Charts — the chart kit:
                       DonutChart / ChartCard  composition (unit mix, expenses)
                       PairedBars              in-place vs pro forma by type
                       RangeBar                a range with the ask marked
                       Waterfall               NOI bridge
                       RankedBars              one sorted series
                       Gauge                   a single proportion
                       LadderCurve             price vs cap rate
src/index.css        NPCG tokens + page vocabulary (Montserrat, carbon/golden)
```

**Use the `:root` tokens, never a fresh hex literal.** The type ramp
(`--fs-body`, `--fs-table`, `--fs-kpi`, …) is tuned for BOV density — an
analyst document, not a presentation. Enlarging anything there can clip
silently; re-run `qa-shots.cjs` after touching it.

## Guardrails

- Pages are fixed 960×742 boxes with `overflow: hidden` — overflow clips
  silently in the browser. `scripts/qa-shots.cjs` exits 4 on any finding.
  It is the only thing that catches this. Run it in **both** formats.
- **`DRAFT = true` watermarks the exports too**, not just the screen —
  verified on both the raster and vector PDFs. It is drawn with constant
  alpha rather than `mix-blend-mode` on purpose: blend modes have no PDF
  primitive and become Skia soft masks that composite as pink or black boxes
  in Preview/Firefox (`PDF-ARTIFACTS.md`). Note the blanket `@media print`
  reset alone would not have caught it — `.page *` does not match
  pseudo-elements, so `.page::after` is named explicitly.
- **The cover scrim is a PNG (`public/scrim-feather.png`) and must stay
  one.** It was a CSS radial-gradient fading to `rgba(0,0,0,0)`; Skia turns
  that into a luminosity soft-mask group and **PDF.js — Firefox's viewer —
  paints it as a pink block across the cover.** Alpha carried inside an
  image embeds as image + SMask and composites correctly everywhere.
  Regenerate with `node scripts/gen-scrim.cjs`. Never reintroduce a gradient
  that fades to transparent anywhere that prints; use constant alpha.
- **Verify soft masks structurally, not by eye in one viewer.**
  `strings <deck>-vector.pdf | grep -c Luminosity` should return **0**.
  Apple CoreGraphics (`qlmanage`, Preview) renders these groups *correctly*,
  so a clean Quick Look proves nothing — this bug was shipped once after
  passing exactly that check. If you want a visual confirmation, render
  through PDF.js, not Preview.
- Never weaken the blanket `@media print` reset (`box-shadow` / `filter` /
  `text-shadow` / `mix-blend-mode` → none). `.page-header img` carries a
  `filter` that depends on it.
- The exporters read `pdfName` from `src/data/deal.js` by regex and **throw**
  if missing — keep it single-quoted on one line.
- `fix-pdf.cjs` (vector path) normalizes ICC → Device colorspaces and embeds
  metadata — don't remove it from the pipeline.
- **Charts carry the argument; prose only says what a chart can't.** The
  copy fields have hard word caps in their EDIT-ME headers (`highlights`
  ≤18 words, the three Valuation cards ≤26). Respect them — the pages are
  laid out assuming that length, and longer copy pushes charts off the page.
- **Never put text inside an SVG that uses `preserveAspectRatio="none"`.**
  Stretching the viewBox to fill a column stretches the glyphs with it. The
  charts keep labels in HTML alongside the SVG for exactly this reason; a
  circle marker has the same problem (it becomes an ellipse) — `LadderCurve`
  uses a vertical rule instead.
- Rent-roll `type` strings drive the unit-mix grouping and colors — keep them
  consistent (`TYPE_COLORS` in `rentRoll.js` covers 4 types).
- The rent roll goes two-column above 16 units and fits ~48. Past that,
  `qa-shots.cjs` will tell you.
- `taxes.js` → `installmentsArePreliminary` decides whether installments get
  annualized ×2. Getting it wrong doubles the tax on the page.
