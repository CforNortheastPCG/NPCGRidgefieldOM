# NPCG Broker Opinion of Value — `@npcg/bov-frame`

Reusable BOV book: React + TypeScript + Vite, fixed 960×742 landscape pages,
NPCG brand system, raster + vector PDF export. **A new BOV = copy this
folder, edit `src/data/` and `src/content/`, drop photos. No component edits
needed for the standard flow.**

Ships with a complete fictional sample deal ("Maple Court Apartments") so
every page renders out of the box, `DRAFT = true` so a diagonal watermark
covers every page until the numbers are final, and `generated: false` on
every content module so the sample prose is loudly marked as unwritten.

## Two formats

`FORMAT` in `src/data/deal.ts` selects the deck. Both are built from the same
`pageDefs` array in `src/App.tsx`, so page numbers and the TOC follow
automatically.

| | `'short'` — 9 pages (default) | `'full'` — 41 pages |
|---|---|---|
| **What it is** | The analytical BOV. The document itself, nothing to skim past. | The same nine analytical pages plus the pitch around them. |
| **When** | Most owner conversations. You are answering "what is it worth?" | The BOV doubles as the listing pitch, or the owner is deciding between brokers. |
| **Pages** | Cover · The Project · Property Record & Taxes · Underwriting · Valuation & Pricing · Sales Comparables · Rent Comparables · Conclusion & Recommendation · Northeast Private Client Group | + TOC, Advisors, Disclaimer, Property Information, Why NPCG, Proven Performance, Track Record, Unit Mix & Income, Photography, Selling Process Stages, Marketing Timeline, National Visibility, Buyer Tracking, Client Reporting, Process/Expect/Contract/Closing, Market Overview, Development & Regulation, Beyond the Sale (Why Owners Sell, Tax Deferral, Advisory Flywheel), Team, Locations |

Conclusion & Contact is always the last page — a BOV should end on the stated
opinion and a phone number.

Two pages drop out automatically when their source data is absent: **Property
Record Card** (needs `assessor.ts`) and **Real Estate Taxes** (needs
`taxes.ts`). Set either export to `null` and the page disappears from both
formats and from the TOC. Don't ship an empty shell.

## Asset classes

`ASSET_CLASS` in `src/data/deal.ts` — `multifamily` · `sro` · `retail` ·
`office` · `industrial` · `mixed-use` — sets the vocabulary (a suite is
never called a unit; a room is never called a unit) and swaps the rent-roll
pages:

| | reads | renders |
|---|---|---|
| residential (`multifamily`, `sro`) | `rentRoll.ts` | Unit Mix & Income |
| commercial (`retail`, `office`, `industrial`) | `commercialRoll.ts` | Tenant Rent Roll · Lease Rollover & WALT · Tenant Profiles |
| `mixed-use` | both | both |

The two commercial analysis pages run in the **short** format as well — on a
lease-driven deal they are the analysis, not the pitch. Retail and office
also drop the per-suite price everywhere (they trade on $/SF) and the
Underwriting page's per-space column becomes **/ SF**.

## Two products, one container

This is the **BOV**. Its sibling is the **OM book** at `npcgstudio/frame`.
Separate products, separate pages — one shared container: `Shell.tsx`, the
`ManifestEntry` contract, the `App.tsx` assembly skeleton, the
`═══ CONTAINER ═══` blocks of `styles/index.css`, and
`scripts/{print,layout-check,shot}.mjs`. Those are ported by copying.

`npm run container-check` diffs them against the frame and exits 4 if a file
that should be identical has drifted; `node scripts/container-sync.mjs
--pull <file>` takes the frame's version. Set `BOV_FRAME_DIR` if the frame
is not at the default sibling path.

When a container file has to change *here* first, a patch goes in
`container-ports/` with a note on why. `container-check` then calls it a
**pending port** instead of drift, and `npm run container-ports` prints the
command to apply it in the frame. This repo never writes to `npcgstudio/`.

Everything else — `styles/tokens.css`, `src/data/**`, `src/content/**`,
`src/components/pages/**` — is product and never synced. **The type ramp is
the deliberate divergence:** the OM is a presentation (10.5px body / 28px
titles); a BOV is an analyst document and runs 9px / 21px.

## New-BOV checklist

1. **Copy the folder**: `cp -R bov-template bov-<deal-slug>` → `npm install`.
2. **Rename the deck identity** — three places, none of them wired together:
   - `src/data/deal.ts` → `DEAL` + `pdfName`
   - `index.html` → `<title>`, `<meta description>`, `og:title` (ships as
     `NPCG BOV — REPLACE ME` so an unrenamed clone is obvious). **This one
     matters beyond cosmetics:** `export.cjs` and `qa-shots.cjs` compare the
     served `<title>` against `dist/index.html`'s to prove they are rendering
     *this* deck and not a sibling clone squatting the port. Two clones
     sharing a title defeat that guard.
   - `package.json` → `"name"`
3. **Pick the format**: `FORMAT: DeckFormat = 'short' | 'full'` in `src/data/deal.ts`.
4. **Edit `src/data/` in this order** (each file opens with an EDIT-ME header
   saying exactly what it feeds):
   | File | Feeds |
   |---|---|
   | `deal.ts` | cover, headers/footers, `pdfName`, `FORMAT`, `COVER_STATS`, DRAFT toggle |
   | `advisors.ts` | Advisors page (bio + 3 stat tiles each) and the Conclusion contact card |
   | `project.ts` | Executive Summary (`summary`, numbered `highlights`, `locationNote`) + The Project page |
   | `properties.ts` | Property Information + the Executive Summary profile table — **2+ entries = portfolio mode** (summary page + one page per property, TOC renumbers itself) |
   | `commercialRoll.ts` | **Commercial classes only** — the lease-by-lease roll. Feeds Tenant Rent Roll, Lease Rollover & WALT, Tenant Profiles. Set `asOfDate` so WALT doesn't drift with the clock |
   | `rentRoll.ts` | **Residential classes only** — Rent Roll & Unit Mix, unit-mix donuts, rent-comp subject strip. Optional per-unit `status` / `leaseFrom` / `leaseEnd` columns appear only if present |
   | `financials.ts` | Operating Statement — vacancy %, mgmt %, other income, expenses, and the **T-12 column** (`t12` per row + `T12_EFFECTIVE_RENTAL_INCOME`) |
   | `assessor.ts` | Property Record Card. Handles 1 parcel or N (side-by-side with a portfolio total). `null` to drop the page |
   | `taxes.ts` | Real Estate Taxes + reassessment sensitivity. `null` to drop the page |
   | `valuation.ts` | Valuation & Pricing and Conclusion — `askingPrice`, `capLadder`, loan terms, the three argument cards, `opinionParagraphs` |
   | `salesComps.ts` / `rentComps.ts` | comp pages, `full` format only (pull candidates from CoStar / Salesforce, paste in) |
   | `trackRecord.ts` | Our Track Record (hand-author from the Salesforce closed-deal report) |
   | `market.ts` | Market Overview (demographics vs state) + Development & Regulation |
   | `photos.ts` | photo pages. The first entry's first three images also fill the Record Card strip |
   | `src/content/*.content.ts` | the deal's PROSE — The Project paragraphs + highlights, the three valuation cards, the stated opinion. Typed against `src/content/types.ts`; **flip each module's `generated` flag to `true` once authored**, or the page prints a red placeholder banner |
   | `process.ts`, `firm.ts`, `advisory.ts` | firm-standard copy: marketing-process pages (stages, timeline, visibility, buyer tracking, reporting), Why NPCG / Proven Performance / Locations, and the Beyond the Sale pages — usually untouched |
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
7. **Check every page**: `npm run typecheck` must be green, then
   `npm run build && node scripts/qa-shots.cjs` — screenshots all pages and
   **exits 4 if any page's content overflows its fixed box**, which is
   otherwise clipped silently. Run it again after switching `FORMAT`.
   `node scripts/layout-check.mjs` adds the frame's whitespace audit; its
   thresholds are calibrated on the OM book, so on a BOV treat its
   *underfull* findings as advisory.
8. **Flip `DRAFT = false`** in `src/data/deal.ts`.
9. **Export**: `npm run pdf` (raster, anti-scrape image-only — DSF / QUALITY /
   BRIGHTEN / COVER env knobs) and/or `npm run pdf:vector` (selectable-text
   vector + `fix-pdf.cjs` color/metadata pass). Both probe for a free port and
   verify the served deck's `<title>` before rendering.

## Architecture

```
src/data/manifest.ts MANIFEST — SINGLE SOURCE OF TRUTH for page order, page
                     numbers, AND the Table of Contents (all derived).
                     full(...) marks long-format-only entries; ifData(...)
                     marks pages that need their source file to exist.
                     Every build emits it as dist/manifest.json.
src/App.tsx          pageFor(entry) — manifest type → page component. Each
                     page renders inside a PageBoundary, so one bad page
                     costs one page, not the deck.
src/data/*.ts        the per-deal NUMBERS (see checklist above)
src/content/*.ts     the per-deal PROSE — typed against content/types.ts,
                     each carrying a `generated` flag; false renders a red
                     placeholder banner rather than passing sample copy off
                     as authored
src/lib/types.ts     ManifestEntry (shared with the OM frame) + every data
                     contract — the shapes an injector would have to write
src/lib/calc.ts      ALL derived numbers: rent-roll totals, occupancy, unit
                     mix, the three income scenarios (as given / market /
                     pro forma), the cap-rate ladder, assessment ratios, and
                     the tax reassessment scenarios.
                     Never hand-total — edit the inputs in src/data/.
src/components/pages/  one component per page
src/components/      Shell (header/footer/StaticShell/Md/Img/assetUrl/
                     PlaceholderBanner), Blocks (SectionTitle, KpiTile/
                     Strip/Rail, Callout, NumberedList, SourceNote),
                     tableKit (T cell styles, zebra), Divider, PhotoPages,
                     Charts — the chart kit:
                       DonutChart / ChartCard  composition (unit mix, expenses)
                       PairedBars              in-place vs pro forma by type
                       RangeBar                a range with the ask marked
                       Waterfall               NOI bridge
                       RankedBars              one sorted series
                       Gauge                   a single proportion
                       LadderCurve             price vs cap rate
src/styles/tokens.css  NPCG brand + the dense BOV type ramp (product layer —
                     never synced from the OM frame)
src/styles/index.css   layout system; ═══ CONTAINER ═══ blocks are shared
                     with npcgstudio/frame
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
- The exporters read `pdfName` from `src/data/deal.ts` by regex and **throw**
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
  consistent (`TYPE_COLORS` in `rentRoll.ts` covers 4 types).
- The rent roll goes two-column above 16 units and fits ~48. Past that,
  `qa-shots.cjs` will tell you.
- `taxes.ts` → `installmentsArePreliminary` decides whether installments get
  annualized ×2. Getting it wrong doubles the tax on the page.
