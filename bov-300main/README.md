# NPCG Broker Opinion of Value — Template

Reusable BOV deck: React + Vite, 28 landscape pages (960×742), NPCG brand
system, raster + vector PDF export. Cloned from the Gen-1 OM engine
(om-granary-newmilford) with page designs harvested from the AutoOM v3 BOV
frame and AutoBOV. **A new BOV = copy this folder, edit the data files, drop
photos. No JSX edits needed for the standard flow.**

Ships with a complete fictional sample deal ("Maple Court Apartments") so
every page renders out of the box, and `DRAFT = true` so a diagonal watermark
covers every page until the numbers are final.

## New-BOV checklist

1. **Copy the folder**: `cp -R bov-template bov-<deal-slug>` → `npm install`.
2. **Edit `src/data/` in this order** (each file opens with an EDIT-ME header
   saying exactly what it feeds):
   | File | Feeds |
   |---|---|
   | `deal.js` | cover, headers/footers, `pdfName`, DRAFT toggle |
   | `advisors.js` | Your Advisors page (+ disclaimer text) |
   | `project.js` | The Project (assignment + methodology) |
   | `properties.js` | Property Information — **2+ entries = portfolio mode** (summary page + one page per property, TOC renumbers itself) |
   | `rentRoll.js` | Rent Roll, unit-mix donuts, rent-comp subject strip |
   | `financials.js` | Operating Expenses + income stack (vacancy %, mgmt %, other income, expenses) |
   | `valuation.js` | Valuation & Trade Range (cap scenarios, concluded range, loan terms) |
   | `salesComps.js` / `rentComps.js` | comp pages (pull candidates from CoStar / Salesforce, paste in) |
   | `trackRecord.js` | Our Track Record (hand-author from the Salesforce closed-deal report) |
   | `market.js` | Market Overview (demographics vs state) + Development & Regulation |
   | `photos.js` | optional photo pages (delete entries to drop them) |
   | `process.js`, `firm.js` | firm-standard marketing-process + Why NPCG copy — usually untouched |
3. **Drop photos** in `public/photos/` at the placeholder filenames
   (cover.jpg, toc.jpg, divider.jpg, project-1.jpg, property-1.jpg,
   exterior-*.jpg, interior-*.jpg, market-*.jpg). Regenerate placeholders
   anytime: `node scripts/gen-placeholders.cjs`.
4. **Update `pdf-meta.cjs`** (AI-facing PDF metadata — property + advisors;
   it's CJS so it can't import the data files).
5. **Check every page**: `npm run dev` (or `npm run build && node
   scripts/qa-shots.cjs` — screenshots all pages and **fails loudly if any
   page's content overflows its fixed box**, which is otherwise clipped
   silently).
6. **Flip `DRAFT = false`** in `src/data/deal.js`.
7. **Export**: `npm run pdf` (raster, anti-scrape image-only — DSF / QUALITY /
   BRIGHTEN / COVER env knobs) and/or `npm run pdf:vector` (selectable-text
   vector + `fix-pdf.cjs` color/metadata pass). Both probe for a free port and
   verify the served deck's `<title>` is this deck before rendering, so a
   sibling deck's dev server can't get screenshotted by mistake.

## Architecture

```
src/App.jsx          pageDefs array — SINGLE SOURCE OF TRUTH for page order,
                     page numbers, AND the Table of Contents (all derived).
                     Add/remove/reorder entries; everything renumbers.
src/data/*.js        the per-deal edit surface (see checklist above)
src/lib/calc.js      ALL derived numbers: rent-roll totals, unit mix, income
                     stack (GPR→NOI), valuation matrix, debt metrics.
                     Never hand-total — edit the inputs in src/data/.
src/pages/*.jsx      one component per page
src/components/      Shell (header/footer/Md), Charts, Blocks… shared chrome
src/index.css        NPCG tokens + page vocabulary (Montserrat, carbon/golden)
```

Page flow: Cover → TOC+Disclaimer → Your Advisors → **01 The Project &
Property** (Project, Property/Portfolio, Photos, Why NPCG, Track Record) →
**02 Financial Analysis & Valuation** (Rent Roll, Expenses, Unit Mix & I&E,
Valuation & Trade Range, Sales Comps, Rent Comps) → **03 The Marketing
Process** (Process, What to Expect, Contract & DD, Closing) → **04 The
Market** (Overview, Development & Regulation) → **05 The Team** (Team,
Locations).

## Guardrails

- Pages are fixed 960×742 boxes with `overflow: hidden` — overflow clips
  silently in the browser. `scripts/qa-shots.cjs` exits 4 on any finding.
- The exporters read `pdfName` from `src/data/deal.js` by regex and **throw**
  if missing — keep it single-quoted on one line.
- `fix-pdf.cjs` (vector path) strips the Skia soft-mask/ICC artifacts that
  turn covers pink in Firefox/Preview — don't remove it from the pipeline.
- Rent-roll `type` strings drive the unit-mix grouping and colors — keep them
  consistent (`TYPE_COLORS` in `rentRoll.js` covers 4 types).
