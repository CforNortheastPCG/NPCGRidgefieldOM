# OM / Flyer React Audit

Read-only audit of the NPCG marketing-document React codebase, performed to scope a programmatic
generation system. Covers the canonical Offering Memoranda (OMs), flyers, the cloneable template,
the `logos/static` BOV component library, the `deal.js` content schema, and the `om-generator` app.

**Headline finding:** these documents are *highly* regular — one shared 960×742px page system, one
brand palette, one rasterized-screenshot PDF pipeline, and a near-identical page array across all six
multifamily OMs. They are clearly systematizable. The main complications are (1) **three coexisting
content schemas** (`deal.js` for OMs, `Bov` for the static library, a flattened model in the
generator) that need reconciling, and (2) **no overflow handling anywhere** — every page relies on
hand-tuned static font sizes against a fixed-height box.

---

## Step 1 — Inventory

The real document content lives in each project's `src/App.jsx` (the `main.jsx` entry points are 10-line
stubs). "Pages" are fixed `~960×742px` blocks pushed into a `pages[]` array and auto-numbered at render.

| Folder | Document | Type | Pages | App.jsx LOC |
|---|---|---|---|---|
| `om-ridgefield` | Main Street Apartments, 613-615 Main St, Ridgefield CT (9-unit, 8-30g affordable) | Multifamily OM | ~34 | 930 |
| `om-westhaven-main` | 300 Main Street, West Haven CT (10-unit) | Multifamily OM | 18 | 683 |
| `om-westhaven-martin` | 254 Main Street, West Haven CT (19-unit) | Multifamily OM | 18 | 663 |
| `om-westhaven-williston` | The Williston, 711 Savin Ave, West Haven CT (69-unit) | Multifamily OM | ~20 | 712 |
| `om-westhaven-campbell` | The Campbell, 590-608 Campbell Ave, West Haven CT (39-unit) | Multifamily OM | ~20 | 695 |
| `om-elm-norwalk` | Elm Street Apartments, 6 Elm St, Norwalk CT (12-unit) | Multifamily OM | ~29 | 674 |
| `om-template` | "Property Name" placeholder base | Template OM | ~22 | 689 |
| `flyers` | Generic 2-sided "For Sale" flyer (data-driven `FLYERS` map) | Flyer | 2 | 104 (`Flyer.jsx`) |
| `flyer-250-danbury` | 250 Danbury Rd, Wilton CT — 4-page investment brief | Flyer (long-form) | 4 | 198 (`DanburyFlyer.jsx`) |

**Supporting assets (not standalone documents, but central to generation):**

| Folder | What it is |
|---|---|
| `logos/static` (34 `.tsx`) | Extracted BOV/seller-pitch section-component library, targets a separate `Bov` schema |
| `om-drafts/{ridgefield,martin,williston}` | Refactored OM copies that read from `src/deal.js` (the content schema, Step 3) |
| `om-generator` | Cloudflare Pages app: address + facts → Claude structured output → OM deck → PDF |
| `social-templates` | Interactive social-post image generator (LinkedIn/IG slides) — different medium, shares brand |

> The `om-drafts/*` folders are deliberately divergent refactors and are excluded from the frequency
> matrix below to avoid double-counting; they are the source of the `deal.js` schema in Step 3.

---

## Step 2 — Component / Section Inventory  *(priority)*

### Frequency matrix

Columns are the nine canonical documents. `●` present · `○` absent · annotation = notable variant.
RF=ridgefield, WM=wh-main, MA=wh-martin, WI=wh-williston, CA=wh-campbell, EN=elm-norwalk, TM=template,
FL=flyers, DB=flyer-250-danbury.

| Section | RF | WM | MA | WI | CA | EN | TM | FL | DB |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Cover / Hero | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Table of Contents | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Deal Contacts (Team + Disclaimer) | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Executive Summary | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Investment Highlights | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Section Divider | ●×4 | ●×4 | ●×4 | ●×4 | ●×4 | ●×4 | ●×4 | ○ | ○ |
| Property Overview (Building Descriptions) | ● | ● | ● | ● | ● | ● | ● | ◐ tagline | ● facts |
| Unit Mix | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Rent Roll | ● line | ● line | ● mix | ● mix | ● mix | ● line | ● mix | ○ | ○ |
| Financial Summary / NOI (I&E) | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Affordability / Value-Add Analysis | ● 8-30g | ○ | ○ | ◐ | ◐ | ● capex | ○ | ○ | ● paths |
| Location & Maps | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Demographics | ● Fairfld | ● NewHvn | ● NewHvn | ● NewHvn | ● NewHvn | ● Fairfld | ● | ○ | ○ |
| Comparables | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| Photos / Gallery | ●×13 | ●×2 | ●×2 | ●×3 | ●×3 | ●×6 coming-soon | ●×4 | ○ | ● |
| Team Page (firm roster) | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Locations Page (offices/map) | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Marketing / Process | ✗ dead | ✗ dead | ✗ dead | ✗ dead | ✗ dead | ✗ dead | ✗ dead | ○ | ○ |
| Zoning Overlay | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● one-off |

`◐` = related content embedded elsewhere · `✗ dead` = component coded but **not** in the render array.

**Two structural facts jump out of the matrix:**

1. **Core OM spine is fixed.** Cover, TOC, Deal Contacts, Exec Summary, 4 Section Dividers, Building
   Descriptions, Rent Roll, Income & Expense, Location, Demographics, Team, Locations appear in *every*
   OM, in the same order. The six multifamily OMs are the same deck with different data.
2. **Marketing/Process pages are dead code in every OM.** `SellingProcess`, `MarketingTimeline`,
   `MarketingStrategy`, `NationalVisibility` are defined in all of them but never pushed to `pages[]`.
   They live "for real" only in the `logos/static` BOV library — i.e. they belong to the *seller-pitch
   BOV* product, not the *buyer-facing OM*.

### Recurring section detail

- **Cover / Hero** — full-bleed photo + scrim + title block + NPCG logo. Consumes
  `status/name, address, cityLong, type, coverImage`. *Minor* variance (RF/EN bottom scrim; WI/CA top
  scrim; otherwise identical).
- **Table of Contents** (`Toc.jsx`) — 2-col dotted-leader list + accent photo, from a hardcoded
  `TOC[]` of `{n,label,section,sub}` **manually kept in sync with page order** (a fragility, not a
  feature). *Identical* layout across OMs.
- **Deal Contacts** (`DealContacts`/`StaticShell`) — 1-3 broker cards `{name,title,phone,email,photo}`
  + a fixed Confidentiality & Disclaimer block. *Identical* layout; doubles as the legal page.
- **Executive Summary** — 2-col: two stat tiles (price + unit count) · 3-4 narrative paragraphs · 4
  Investment-Highlight bullets · 2 photos. *Minor* variance (font shrinks from 11.5→9.4px as paragraph
  count grows). Price label is the only copy that flexes: "Asking Price" (RF, EN) vs "Offering Price".
- **Section Divider** (`Divider.jsx`) — faded aerial + eyebrow `01-04` + title + `FULL_ADDR`.
  *Identical*.
- **Property Overview** (`BuildingDescriptions`) — 2-col grid of `bldg-card`s (Site Summary, Utilities,
  Construction & Systems, Unit Mix & Rents, Investment Profile), each an array of `{label,value}` rows.
  *Minor* variance — RF nests per-building cards; everyone else uses flat category cards.
- **Rent Roll** — **the one genuinely bespoke section.** Two shapes:
  - *Line-by-line* (RF 9, WM 10, EN 12): per-unit rows `{unit, bldg, type, sqft, inPlace, market/high,
    proforma, leaseStart, leaseEnd}` + totals (EN computes totals via `.reduce`).
  - *Unit-mix summary* (MA 2, CA 3, WI 2 rows): aggregated `{type, units, avg, high, pf, monthly,
    pfMonthly}`. This is the deliberate large-deal pattern — does **not** grow with unit count.
  - All carry a hand-rolled inline-SVG `DonutChart` (1-4 segments; no charting library) and most a CSS
    `BarChartCard` for rent upside.
- **Income & Expense** (`IncomeExpense`) — NOI strip + Operating Income table + Operating Expenses
  table, each row `{label, Year1/$unit/%, ProForma/$unit/%}`, hardcoded to mirror the source workbook.
  *Minor* variance (CA/WI use `Head`/`Row` helper components; others hardcode `<tr>`s; column label
  "Year 1" vs "Current"). **Consistently the densest, most overflow-prone page** (7-8.5px fonts).
- **Location & Maps + Demographics** — `{City}Combined` narrative + "About" bullets + 2 photos;
  `LocationMap`/`RegionalMap`; a county demographics comparison table. *Minor* variance — New Haven vs
  Fairfield County data; otherwise identical structure.
- **Team / Locations** (`TeamPage.jsx`, `LocationsPage.jsx`) — firm roster avatar grids + office
  directory + `EastCoastMap`, all from a shared `firm.js`. *Identical* across OMs.

---

## Step 3 — Reverse-Engineered Content Schema

This is grounded in the real `deal.js` files (`om-drafts/{ridgefield,martin,williston}/src/deal.js`),
extended with the flyer (`flyerData.js`, `flyer-250-danbury/data.js`) and generator
(`om-generator/functions/api/fill.js`) field sets. Pre-formatted `$`/`%` **strings** are flagged where
the existing code stores display strings rather than numbers — a normalization decision for the
generator.

```typescript
// ============================================================================
// NPCG marketing-document content schema (union of deal.js + flyer + generator)
// Doc-type legend: OM = multifamily OM · FL = flyer · DB = long-form flyer · BOV = seller pitch
// ============================================================================

interface MarketingDocument {
  docType: 'multifamily-om' | 'flyer' | 'long-flyer' | 'bov';   // required
  deal: Deal;                                                    // required, all docs
  property: Property;                                            // OM, DB
  financials?: Financials;                                       // OM
  rentRoll?: RentRoll;                                           // OM
  affordability?: Affordability;                                 // OM (ridgefield/elm only)
  charts?: Charts;                                               // OM
  location: Location;                                            // required, all docs
  demographics?: Demographics;                                   // OM
  comps?: Comp[];                                                // NONE today — see gotchas
  agents: Agent[];                                               // required, all docs
  assets: Assets;                                                // required (photos/maps)
  narrative: Narrative;                                          // required, all docs
}

// --- deal / identity (Cover, headers, footers, dividers) -------------------
interface Deal {
  name: string;                       // "The Williston"            req
  address: string;                    // "711 Savin Avenue"         req
  addressShort?: string;              //                            opt
  cityState: string;                  // "West Haven, CT 06516"     req
  cityLong: string;                   // "West Haven, Connecticut"  req
  status: string;                     // "For Sale"                 req
  type: string;                       // "69-Unit Multifamily..."   req
  coverImage: string;                 // path/URL                   req
  pdfName?: string;                   //                            opt
  forSaleTagline?: string;            // flyer eyebrow              FL/DB
  url?: string;                       // CTA / listing URL          FL/DB
}

// --- property / pricing (Exec Summary tiles + Building Descriptions) --------
interface Property {
  askingPrice: number;                // store numeric; format at render   req
  priceLabel: 'Asking Price' | 'Offering Price';                // req (RF/EN="Asking")
  totalUnits: number;                                           // req
  pricePerUnit?: number;              // martin/williston                  opt
  pricePerSF?: number;                                                     // opt
  // category cards — each an array of label/value rows:
  siteSummary: LabelValue[];          // address, type, units, lot, SF, year, zoning, parking  req
  utilities: LabelValue[];                                                 // req
  construction?: LabelValue[];        // martin/williston/campbell         opt
  unitMixRents?: LabelValue[];                                             // opt
  investmentProfile?: LabelValue[];                                       // opt
  buildings?: BuildingBlock[];        // ridgefield nests per-building     opt
}
interface BuildingBlock { title: string; rows: LabelValue[]; }
interface LabelValue { label: string; value: string; }

// --- financials (Income & Expense) -----------------------------------------
// NOTE: existing code stores PRE-FORMATTED strings ("$456,439", "7.21%").
interface Financials {
  noiSummary: { label: string; val: string }[];                // req
  incomeRows: FinRow[];                                         // req
  expenseRows: FinRow[];                                        // req
  expenseTotals: Omit<FinRow,'label'>;                         // req
  noiRow: Omit<FinRow,'label'>;                                // req
  midColLabel?: 'Year 1' | 'Current';                          // opt (default "Year 1")
}
interface FinRow {                    // any blank cell renders as em-dash / empty
  label: string;
  bold?: false | true | 'total';
  t12?: string; t12unit?: string; t12pct?: string;
  yr1: string;  yr1unit: string;  yr1pct: string;
  pf: string;   pfunit: string;   pfpct: string;
}

// --- rentRoll (two mutually-exclusive shapes) ------------------------------
type RentRoll = LineByLineRentRoll | UnitMixRentRoll;
interface LineByLineRentRoll {                   // ridgefield, wh-main, elm-norwalk
  mode: 'line';
  units: {
    unit: string; building?: string; type: string; sqft?: number;
    designation?: string;                        // ridgefield affordability tier
    inPlace: number; market?: number; high?: number; proforma: number;
    leaseStart?: string; leaseEnd?: string;      // wh-main, elm
  }[];
  incomeSummary?: { designation?: string; scenario?: string;
                    units?: number; monthly: number; annual?: number; avg?: number }[];
}
interface UnitMixRentRoll {                       // martin, campbell, williston, template
  mode: 'mix';
  mix: { type: string; units: number; avg: number; high: number;
         pf: number; monthly: number; pfMonthly: number }[];
  totals: { units: number; avg: number; high: number;
            pf: number; monthly: number; pfMonthly: number };
  incomeSummary?: { scenario: string; monthly: number; annual: number; perUnit: number }[];
}

// --- affordability (ridgefield 8-30g; elm capex is a lighter cousin) -------
interface Affordability {
  subtitle: string;
  deedRestriction: LabelValue[];
  maxGrossRent: { bedrooms: string; hhSize: string; smi80: string; smi60: string }[];
  maxGrossRentNote?: string;
  gapAnalysis: { unit: string; current: string; market: string; gap: string; annualGap: string }[];
  gapTotals: { unit: string; current: string; market: string; gap: string; annualGap: string };
  incomeBasis?: { standard: string; pct100: string; pct80: string; pct60: string }[];
  incomeBasisNote?: string;
  caveats?: string;
}

// --- charts (hand-rolled SVG donut + CSS bar; no library) ------------------
interface Charts {
  donuts: { title: string; segments: ChartSegment[]; centerLabel?: string }[];  // 1-2 per deck
  bar?: { title: string; inPlace: number; proForma: number; deltaNote?: string };
}
interface ChartSegment { label: string; value: number; color: string; }

// --- location & maps --------------------------------------------------------
interface Location {
  town: { name: string; state: string; tagline?: string;
          paragraphs: string[]; aboutBullets: string[]; photos: string[] };  // req
  maps?: { locationMap?: string; regionalMap?: string;                       // OM
           parcels?: string[]; center?: string; zoom?: number };             // flyer static-map
  gisMap?: string;                                                           // DB
}
interface Demographics {
  county: { name: string; townLabel: string; title: string; paragraphs: string[];
            rows: { metric: string; town: string; county: string }[];
            note?: string; photo?: string };
}

// --- comparables (NOT in any current document — schema reserved) -----------
interface Comp { address: string; price: number; units?: number;
                 capRate?: number; pricePerUnit?: number; date?: string; }

// --- agents (Deal Contacts, broker cards) ----------------------------------
interface Agent {
  name: string; title: string; phone: string; email: string; photo: string;   // all req
  bio?: string;                       // elm BrokerProfile / social spotlight
  stats?: { label: string; value: string }[];   // "225+ txns", "$1.084B"
}

// --- assets -----------------------------------------------------------------
interface Assets {
  photoPages: PhotoPage[];            // OM galleries
  coverImage: string;
  summaryPhotos?: string[];
}
interface PhotoPage {
  kind: 'gallery' | 'coming-soon' | 'floorplan';
  section: string; title: string; accent?: string; subtitle?: string;
  hero?: string; tiles: (string | { src: string; cap?: string })[];
}

// --- narrative (prose blocks) ----------------------------------------------
interface Narrative {
  summaryParagraphs: string[];        // exec summary; may contain inline <strong>   req
  highlights: { title?: string; body: string }[];  // 4 investment highlights        req
  tagline?: string;                   // flyer "The Offering"
  offeringParagraphs?: string[];      // ridgefield/elm "The Offering" page
}
```

**Schema reconciliation note (important for the build):** the codebase already contains **three**
schemas that must be unified or mapped:
- `deal.js` — the OM schema above (richest, store-as-display-string in places).
- `Bov` (`schema/bov`, consumed by every `logos/static` `.tsx`) — uses `bov.advisors`,
  `bov.pageData[pageId]` per-page overrides; drives the **seller-pitch BOV**, not the OM.
- `om-generator` `fill.js` JSON-Schema — a **flattened, numeric** cousin (`siteSummary`, `utilities`,
  `buildingInfo`, `rentRoll`, `expenses`, `locationOverview`); AI returns `"TODO"` for unknown facts.

The generator schema is the best starting point for a canonical model because it's already
numeric-first and AI-friendly; it needs the `affordability`, `charts`, `town/county`, and
`demographics` shapes grafted on from `deal.js` (the generator's own `TODO.md §6` already plans the
location/demographics graft to match the Campbell OM).

---

## Step 4 — Brand & Styling

**Palette** (CSS custom properties in each `index.css`, also inlined literally throughout JSX):

| Token | Hex | Role |
|---|---|---|
| `--carbon` | `#3f4753` | primary dark / header bar / donut base |
| `--golden` | `#F8971D` | accent (rules, badges, chart, map fill `0xF8971D55`) |
| `--terracotta` | `#B55D37` | secondary chart segment (a.k.a. brick `#B55D37`) |
| `--stone` | `#B1A8A0` | muted text |
| `--graphite` | `#281B12` | deep brown text |
| `--linen` | `#F6F2EE` | page/footer background |
| `--border` | `#e0dbd6` / donut track `#ece7e1` | hairlines |

Secondary donut shades seen: `#566573`, `#B55D37`. Social templates expose 5 selectable `colorThemes[]`
built from the same hexes.

- **Typography:** **Montserrat** (Google Fonts) everywhere. No type scale tokens — sizes are inline px
  literals tuned per page (7px–22px), which is the root of the overflow fragility.
- **Logo:** NPCG logo on covers/footers; `npcg-white.png` / `npcg-color.png` in social.
- **Page dimensions:** OMs/template fixed **960×742px** portrait (`--page-w`/`--page-h`); flyers
  **1056×816px** landscape (11×8.5in @96dpi); social slides square/wide from a `platforms[]` table
  (1200×1200, 1080×1080, 1200×627).
- **Print / PDF:** rasterized **screenshot** pipeline, not print CSS. `print.cjs`/`export.cjs`
  (OMs), `print-flyer.cjs` (flyers) drive Puppeteer to screenshot each `.page` and compose a
  landscape PDF (~262 DPI, JPEG q62). Intentionally non-selectable text (anti-scrape). `om-elm-norwalk`
  is the lone OM that *also* carries an `@media print` block in its `index.css`.

**Divergences:**
- *Within-brand (acceptable):* scrim direction (top vs bottom), "Asking" vs "Offering Price",
  New Haven vs Fairfield demographics, donut segment counts, helper-component vs hardcoded I&E tables.
- *Genuine drift to clean up:* **data sourcing is inconsistent** — `om-ridgefield` + `om-template`
  read identity from `deal.js`, while `om-westhaven-*` hardcode `ADDR`/`CITY_STATE` in `Shell.jsx` and
  inline cover copy. The TOC page numbers are hand-synced. `om-elm-norwalk` has a latent bug
  (`TheOffering` hardcodes `pageNum={5}`, bypassing auto-numbering). `flyer-250-danbury/data.js`
  defines `coverStats`/`overview`/`forDiscussion` that the JSX never consumes (dead data).

---

## Step 5 — Density & Overflow

**Highest-risk surfaces (most likely to overflow in automated generation):**
1. **Income & Expense** — the single densest page in every OM; 15-20 hardcoded rows at 7-8.5px tuned to
   fill 742px exactly. Any added expense line overflows.
2. **Line-by-line rent rolls** (RF/WM/EN) — one `<tr>` per unit at fontSize 8-9.5; risk scales directly
   with unit count. This is *why* larger deals (MA 19, CA 39, WI 69) switched to the unit-mix summary,
   which is fixed-height — **the existing, deliberate overflow mitigation.**
3. **`om-ridgefield` Affordability page** — two income tables + gap table + 3 narrative blocks at
   7.8-9.5px; the most fragile single page in the corpus.
4. **Executive Summary narrative** — paragraph count drives a manual font step-down (11.5→9.4px).
5. **Flyer back page / Danbury p2** — unbounded `highlights[]`/`paths[]`/`watch[]` arrays in a fixed
   column.

**Overflow handling that already exists:** essentially none automated. The two real patterns are
(a) **the unit-mix-summary rent roll** as a content-aggregation strategy for big deals, and
(b) `ContactSlide`'s `cs-count-1..4` classes (social) that resize headshots by broker count. Everything
else is hand-tuned static sizing verified visually against the screenshot output. There is **no**
dynamic font-fit, table pagination, or page-splitting anywhere.

---

## Step 6 — Findings & Recommendations

### Regularity verdict
**Yes — systematize it.** Content and layout are cleanly separable for 90% of the OM. Six OMs are
provably the same deck (identical component vocabulary and page order) differing only in data, and the
team has *already started the work*: a `deal.js` content schema, an extracted `logos/static` component
library, and a working `om-generator` that produces a deck from an address. The bespoke surface is
small and bounded: the rent-roll shape switch, the optional affordability page, and per-page font
tuning. This is a templating problem, not a per-document craft problem.

### Core component library to extract (ranked by reuse value)
1. **Page shell / chrome** — `Shell.jsx` + `StaticPageShell` (header bar, footer, page numbering,
   960×742 frame). Used by literally every page.
2. **`CoverHero`, `Divider`, `DealContacts` (+Disclaimer), `Toc`** — present in every OM, near-identical.
3. **`ExecutiveSummary`** (stat tiles + narrative + highlights + photos) and
   **`BuildingDescriptions`** (label/value category cards).
4. **`RentRoll`** with the two-mode switch (line vs mix) + **`DonutChart`/`ChartCard`/`BarChartCard`**.
5. **`IncomeExpense`** (NOI strip + two financial tables; needs overflow-aware rework).
6. **`PhotoPages`** (`PhotoGallery`/`PhotoComingSoon`/`FloorPlanPage`, with `rowsFor` balancing).
7. **`TeamPage` / `LocationsPage` / `EastCoastMap`** — fully firm-data-driven, drop-in.
8. **Section-divider family** (`logos/static/PageDivider*`) and the static seller-pitch pages — reuse
   for the BOV product line.

### Per-document-type section templates
- **Multifamily OM:** Cover → TOC → Deal Contacts → Exec Summary → [Divider] → Building Descriptions →
  [Photos] → [Divider] → Rent Roll → Income & Expense → [Divider] → Location → Demographics →
  [Divider] → Team → Locations. *Optional inserts:* Affordability (8-30g), Capex/Value-Add, Floor Plans,
  Broker Profile.
- **Flyer (2-sided):** Cover/Hero front → back = Exec Summary + Highlights + Location/parcel map +
  Tagline + Broker cards.
- **Long-form flyer (Danbury):** Cover → Overview (lead + GIS map + facts + paths + highlights + watch)
  → Zoning Overlay → Closing (photos + brokers).
- **BOV (seller pitch):** the `logos/static` set — Advisor Letter, Why Owners Sell, Value-Add, Process
  Overview, Marketing Strategy/Timeline, Broker Leaderboard, Tax Deferral/1031, plus shared dividers.
- **Social:** Listing / Spotlight / Contact slides (separate interactive product).

### Biggest risks / gotchas for automation
1. **No overflow handling.** Every page is hand-fit to a fixed box. Automated content *will* overflow
   I&E, line-by-line rent rolls, and the affordability page. Needs a fit strategy (auto font-scale,
   table pagination, or the unit-mix-summary fallback) before generation is safe.
2. **Three schemas to reconcile** (`deal.js` / `Bov` / generator `fill.js`) — pick one canonical model
   (recommend the generator's numeric schema, extended) and map the others to it.
3. **Display strings vs numbers.** `deal.js` financials store pre-formatted `"$456,439"`/`"7.21%"`;
   the generator stores numbers. Standardize on numbers + a formatter, or generation math breaks.
4. **Hand-synced TOC page numbers** and bugs like elm's hardcoded `pageNum={5}` — page numbering must
   be fully computed, never authored.
5. **Inconsistent data sourcing** — unify on `deal.js`-style single-source identity; the
   `om-westhaven-*` hardcoded `Shell.jsx`/inline-cover pattern should be retired.
6. **Rasterized PDF = no text layer.** Intentional (anti-scrape), but means no accessibility / search /
   copy in output; confirm that's still desired and keep an eye on file size at q62/262 DPI.
7. **No comparables anywhere.** If the generator is expected to produce sales/rent comps, that section
   has zero precedent in the corpus and must be designed from scratch (schema reserved above).
8. **External data dependencies** — flyers need `VITE_GOOGLE_MAPS_API_KEY` (Static Maps) and R2-hosted
   photos; the generator needs Google geocode/Street View/Places + a Claude key. Generation is online,
   not hermetic.
