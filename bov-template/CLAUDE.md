# CLAUDE.md — NPCG BOV Frame (`@npcg/bov-frame`)

Reusable Broker Opinion of Value book: React + TypeScript + Vite, fixed
960×742 landscape pages, NPCG brand system, raster + vector PDF export.
**A new BOV = copy this folder, edit `src/data/` and `src/content/`, drop
photos. No component edits in the standard flow.**

Ships with a fictional sample deal ("Maple Court Apartments") so every page
renders out of the box, `DRAFT = true` so a watermark covers every page, and
`generated: false` on every content module so the sample prose is loudly
marked as unwritten.

`README.md` is the human checklist. This file is what an agent needs first.

## Two products, one container

This is the **BOV**. Its sibling is the **OM book** at
`npcgstudio/frame` (`@autoom/frame`). They are separate products with
separate pages, data and prose — but they share a *container*, and that
sharing is enforced, not remembered:

- **Container** — ported between the two by copying: `src/components/Shell.tsx`,
  `src/lib/types.ts` (the `ManifestEntry` contract), the `src/App.tsx`
  assembly skeleton, the `═══ CONTAINER ═══` blocks in
  `src/styles/index.css`, `scripts/print.mjs`, `scripts/layout-check.mjs`,
  `scripts/shot.mjs`, `tsconfig.json`.
- **Product** — diverges freely, never synced: `src/styles/tokens.css`,
  `src/data/**`, `src/content/**`, `src/components/pages/**`, `pageFor()`.

`npm run container-check` diffs every container file against the frame and
prints the documented deltas; it exits 4 if a file that should be identical
has drifted. `node scripts/container-sync.mjs --pull <file>` takes the
frame's version. Set `BOV_FRAME_DIR` if the frame is not at the default
sibling path.

**Changing a container file.** Sometimes the fix has to be made here first.
When it is, write a patch into `container-ports/` (see its README) and add a
note saying why. `container-check` then reports that file as a **pending
port** rather than as drift, and `npm run container-ports` prints the command
that applies it in the frame. **Nothing in this repo ever writes to
`npcgstudio/`** — porting is the frame owner's act, not ours. Unexplained
drift still exits 4: either write the port or revert the change.

**The type ramp is the deliberate divergence.** The OM is a presentation
(`--fs-body: 10.5px`, `--fs-section-title: 28px`); a BOV is an analyst
document and runs `9px` / `21px`. Never "sync" `tokens.css` from the frame.

## What matters most

1. **Numbers are sacred, and they are computed.** Every derived figure —
   rent-roll totals, occupancy, unit mix, the three income scenarios
   (as given / market / pro forma), the cap ladder, assessment ratios, tax
   reassessment scenarios — comes from `src/lib/calc.ts`. **Never hand-total
   anything into a data file or into prose.** Edit the inputs; let calc do
   the arithmetic. If a number on a page looks wrong, fix the input.
2. **The page is a fixed 960×742 box with `overflow: hidden`** — content past
   the footer clips silently in the browser and in the PDF.
   `npm run build && node scripts/qa-shots.cjs` screenshots every page and
   **exits 4 on any overflow**. Run it in **both** formats after any layout
   or copy change.
3. **Data carries numbers; content carries prose.** `src/data/*.ts` is the
   deal's figures and structure. `src/content/*.content.ts` is what a person
   writes for this deal, typed against `src/content/types.ts` and carrying a
   `generated` flag — `false` renders a red placeholder banner on the page,
   so unwritten prose is never silently sample copy.
4. **Know which pages you are editing.** The firm-standard pitch pages
   (`process.ts`, `firm.ts`, `advisory.ts` — 25 pages in the long format)
   carry no deal data. A request to "fix the timeline" means the firm's
   timeline, for every future deck.
5. **Copy has hard word caps**, stated in the content contracts (highlights
   ≤18 words, the three valuation cards ≤26). Pages are laid out assuming
   that length — longer copy pushes charts off the page. Charts carry the
   argument; prose says what a chart can't.

## Architecture

```
src/data/manifest.ts   MANIFEST — the single source of page ORDER and page
                       NUMBERS. Page numbers are 1-based positions; the TOC
                       derives from the same array. Never renumber by hand.
                       Computed: FORMAT selects short/full, and pages drop
                       when their source data is null.
src/App.tsx            pageFor(entry) — manifest type → component. Each page
                       renders inside a PageBoundary (one bad page costs one
                       page, not the deck) and can carry a --page-zoom tweak.
src/lib/types.ts       ManifestEntry (container) + every data contract.
                       An inject.mjs writing these shapes would need no
                       component change.
src/lib/calc.ts        ALL derived numbers. Never hand-total.
src/data/*.ts          the per-deal figures. Each opens with an EDIT-ME
                       header saying what it feeds. rentRoll.ts is the
                       residential roll; commercialRoll.ts the leases.
src/lib/vocab.ts       the asset-class table → VOCAB, IS_COMMERCIAL.
src/content/*.ts       authored prose, typed, with `generated` flags.
src/components/        Shell (header/footer/StaticShell/Img/assetUrl/
                       PlaceholderBanner), Blocks, tableKit, Divider,
                       PhotoPages, Charts, Icons, Pitch, EastCoastMap.
src/components/pages/  one component per page.
src/styles/tokens.css  brand + the dense BOV type ramp (product layer).
src/styles/index.css   layout system; CONTAINER blocks shared with the frame.
```

Every build emits `dist/manifest.json` from the same module `App.tsx`
renders from, so any tool reasoning about page order cannot drift from the
built DOM. Pages carry `data-page-id` for the same reason.

## Asset classes

`ASSET_CLASS` in `src/data/deal.ts` decides the deck's **vocabulary** and
**which rent-roll pages render**. The table lives in `src/lib/vocab.ts` and
matches the OM frame's, so the two products name things identically.

| Class | Noun | Roll | Per-space price |
|---|---|---|---|
| `multifamily` | Unit | residential | yes |
| `sro` | **Room** | residential | yes |
| `retail` | Suite | commercial | **no — trades on $/SF** |
| `office` | Suite | commercial | **no** |
| `industrial` | Unit | commercial | yes (small-bay does trade per unit) |
| `mixed-use` | Unit | **both** | yes |

- Residential classes read `rentRoll.ts` and render **Unit Mix & Income**.
- Commercial classes read `commercialRoll.ts` and render **Tenant Rent
  Roll**, **Lease Rollover & WALT** (both in the SHORT format too — on a
  commercial deal the leases *are* the analysis) and **Tenant Profiles**
  (long format, prose from `content/tenants.content.ts`).
- Mixed-use renders both rolls.

**Never hardcode "Unit".** Components read `VOCAB` — a retail BOV that calls
a suite a unit reads as a multifamily deck with the words swapped, which is
exactly what that layer exists to prevent. `VOCAB.perUnitPrice` decides
whether a per-space price appears at all: it is dropped from the ladder, the
conclusion line and the comp metrics on retail and office, and the
Underwriting page's per-space column becomes **/ SF**.

`src/lib/calc.ts` exposes `BASIS` — the one place the deck decides where
income comes from (unit roll, leases, or both). Every per-space and per-SF
metric divides by it, so a retail BOV can never quietly price itself per
apartment. `CRE` carries the commercial roll-ups: NRA, occupancy **by SF**,
base rent, recoveries, WALT (weighted by SF *and* by rent), and the rollover
schedule.

Two rules the commercial pages enforce, because they are how a rent roll
starts lying: **vacancy is never hidden** (a row *and* a slice of the mix),
and **an expired lease is never rolled forward** — month-to-month and
expired space is its own bucket at the top of the rollover table, because it
is exposure today.

## Two formats

`FORMAT` in `src/data/deal.ts`, typed `DeckFormat`:

- `'short'` — the 9-page analytical BOV: Cover · The Project · Property
  Record & Taxes · Underwriting · Valuation & Pricing · Sales Comparables ·
  Rent Comparables · Conclusion · Northeast Private Client Group. The
  default, and the right answer for most owner conversations.
- `'full'` — 41 pages: the same analysis plus the pitch around it (TOC,
  advisors, Why NPCG, track record, photography, the marketing-process
  pages, market, Beyond the Sale, team).

`full(...)` marks long-format-only entries in the manifest; `ifData(...)`
marks pages that drop when their source is `null` (Property Record & Taxes,
As Given). **Drop the page — never ship an empty shell.**

## Commands

- `npm run dev` — live deck on :5181 (the OM frame owns :5180)
- `npm run typecheck` — `tsc --noEmit`; must be green before you finish
- `npm run build` — production build + `dist/manifest.json`
- `node scripts/qa-shots.cjs` — screenshots + **overflow audit, exit 4**.
  The one check that catches silent clipping. Run in both formats.
- `node scripts/layout-check.mjs` — the frame's whitespace/geometry audit
  (exit 4). Its thresholds are calibrated against the OM reference book, so
  on a BOV read it as advisory: it flags *underfull* pages, and the sample
  deck trips 13 of them by design.
- `npm run pdf` — raster export, self-contained. Knobs: `DSF` `QUALITY`
  `BRIGHTEN` `COVER`
- `npm run pdf:vector` — selectable-text export + `fix-pdf.cjs` colour pass
- `npm run container-check` — container drift against the OM frame
- `node scripts/gen-placeholders.cjs` — regenerate placeholder photography

## Cloning for a new deal

`cp -R bov-template bov-<slug>` → `npm install`. Rename in **three unwired
places**: `deal.ts` (`DEAL` + `pdfName`), `index.html` (title, description,
og:title), `package.json`. The title matters beyond cosmetics —
`export.cjs` compares the served `<title>` and `qa-shots.cjs` compares
`page.title()` against `dist/index.html` to prove they are rendering *this*
deck and not a sibling clone squatting the port. **This is why `App.tsx`
must never set `document.title` at runtime the way the OM frame does.**

Then hand-sync `pdf-meta.cjs` (AI-facing PDF metadata; it's CJS and cannot
import the ESM data files), author the content modules and flip their
`generated` flags, and set `DRAFT = false` when the numbers are final.

## Don'ts

- Don't hand-total a number `calc.ts` derives.
- Don't renumber pages or hand-write the TOC — both derive from `MANIFEST`.
- Don't ship an empty page shell; set the source to `null` and let it drop.
- Don't put prose in `src/data/` or numbers in `src/content/`.
- Don't set `document.title` at runtime (see above).
- Don't switch the raster export to selectable text — image-only is
  deliberate, anti-scrape.
- **Don't reintroduce a gradient that fades to transparent anywhere that
  prints.** The cover scrim is `public/scrim-feather.png` and must stay a
  PNG: Skia turns a fade-to-`rgba(0,0,0,0)` into a luminosity soft mask that
  **PDF.js paints as a pink block**. Verify structurally, not by eye —
  `strings <deck>-vector.pdf | grep -c Luminosity` must return **0**. Apple
  Preview renders these groups correctly, so a clean Quick Look proves
  nothing. (`PDF-ARTIFACTS.md`)
- Don't weaken the blanket `@media print` reset (`box-shadow` / `filter` /
  `text-shadow` / `mix-blend-mode` → none). `.page-header img` depends on it,
  and `.page::after` is named explicitly because `.page *` does not match
  pseudo-elements.
- Don't put text inside an SVG with `preserveAspectRatio="none"` — stretching
  the viewBox stretches the glyphs.
- Don't oversize photos: `page.pdf()` embeds the source JPEG byte-for-byte.
  Vector ≤1600px long edge at q82–85, raster ~2400px at q85, 3-component
  sRGB only, never CMYK. 2600px sources once produced a 162 MB deck.
- Don't get `taxes.ts` → `installmentsArePreliminary` wrong; it decides
  whether installments annualize ×2, and doubles the tax on the page.
