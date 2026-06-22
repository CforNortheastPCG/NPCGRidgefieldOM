# OM Pages — how to build each page

The page-by-page playbook for an NPCG offering memorandum. Every book is the same deck
in the same order; this is what each page **is**, where its **component/data** live, and
how to **build/fill** it. Companions: `OM_CATALOG.md` (deals + markets), `markets/`
(town copy), `DRIVE_TIMES_MAP_FINAL.md` (the drive-time page).

> Engine: one Vite/React app per deal (clone of `om-template`). Page **order is the
> source of truth** — `App.jsx` renders a `pages[]` array and auto-numbers via
> `cloneElement(el, { pageNum: i+1 })`. Add/move a page → update `Toc.jsx` `n` values.

---

## Layout rules (do this every page)
1. **Fill the page** — content should reach the footer, no dead space. The grid box
   fills via `flex:1`, but a single auto grid row sits at the top → add
   `gridTemplateRows:'1fr'` and/or `justifyContent:'space-between'` so it distributes.
2. **`.page` clips (`overflow:hidden`)** — overflow is *hidden, not scrolled*, so a too-tall
   page silently **cuts off** the bottom. Don't trust `scrollHeight==clientHeight`;
   measure the **content column** (its `scrollHeight` vs `clientHeight`) to catch overflow.
3. **Size to fit, then enlarge** — bump type for presence, but verify the longest
   paragraph still fits (see Ware Exec Summary: 11.8→10.6 to stop clipping).
4. **Boxes sparingly** — golden-rule (`borderLeft`/`borderTop`) reads cleaner than filled
   cards; drop heavy boxes when a page feels busy.
5. **Verify by screenshot** — puppeteer the built page (same as `npm run pdf`), don't eyeball.

---

## The deck (canonical order)
| # | Page | Component | Shared / per-deal |
|---|---|---|---|
| 1 | Cover | `App.jsx CoverHero` | per-deal |
| 2 | Table of Contents | `Toc.jsx` | per-deal (page #s) |
| 3 | Deal Contacts + Disclaimer | `App.jsx DealContacts` (`StaticShell`) | brokers per-deal, disclaimer shared |
| — | **Divider 01 — The Property** | `Divider.jsx` | shared |
| 4 | Executive Summary | `App.jsx ExecutiveSummary` | per-deal |
| 5 | Property Overview | `App.jsx PropertyOverview` | per-deal |
| 6 | Building History *(optional)* | `App.jsx BuildingHistory` | per-deal |
| 7 | Site Map | `SiteMap.jsx` | per-deal (GIS) |
| 8 | Investment Highlights *(optional)* | `App.jsx InvestmentHighlights` | per-deal |
| 9 | Property Photos | `PhotoPages.jsx` + `photos.js` | per-deal |
| — | **Divider 02 — Financial Analysis** | `Divider.jsx` | shared |
| 10 | Unit Mix & Rent Roll | `App.jsx RentRoll` (`ChartCard`/`DonutChart`) | per-deal |
| 11 | Income & Expense | `App.jsx IncomeExpense` | per-deal |
| 12 | Mgmt Transition / T-12 *(optional)* | `App.jsx ManagementTransition` | per-deal |
| — | **Divider 03 — Location & Market** | `Divider.jsx` | shared |
| 13 | Neighborhood overview | `App.jsx <Town>Overview` | market (`markets/`) |
| 14 | Why <town> / value *(optional)* | `App.jsx WhyX` | market |
| 15 | Aerial context | `App.jsx AerialContext` | per-deal pins |
| 16 | Location & Amenities | `LocationMap.jsx` + `amenities.js` | per-deal |
| 17 | Drive Times | `DriveTimeMap.jsx` | see FINAL spec |
| 18 | County / Demographics | `App.jsx <County>` | market |
| 19 | Regional Positioning | `RegionalMap.jsx` | per-deal subject |
| — | **Divider 04 — The Team** | `Divider.jsx` | shared |
| 20 | Team | `TeamPage.jsx` + `firm.js` | shared |
| 21 | Our Locations | `LocationsPage.jsx` + `firm.js` | shared |

---

## Per-page notes

### Cover — `CoverHero`
- **What:** full-bleed hero + status chip + name / address / type (all from `deal.js`).
- **Build:** layer scrim gradients for text legibility. Two variants: **single-property**
  hero (Ridgefield/Black Rock) vs **portfolio cover** (Ware — aerial w/ outlined parcels +
  building thumbnails along the bottom). Cover photo → `/photos/cover*.jpg`.

### Table of Contents — `Toc.jsx`
- **What:** section/sub list with dotted leaders + accent photo.
- **Build:** page numbers are **manual** (`n`) — re-sync after any add/move/reorder.

### Deal Contacts + Disclaimer — `DealContacts`
- **What:** "Exclusively Listed By" broker cards + confidentiality boilerplate.
- **Build:** brokers from the deal team; **mirror headshots locally** to `public/photos/team/`
  (remote `northeastpcg.com` URLs are WAF-gated and blank out in the PDF). Disclaimer text
  is identical every book — copy it.

### Dividers — `Divider.jsx`
- **What:** full-bleed faded aerial + golden eyebrow (`01`…`04`) + section title. Shared.

### Executive Summary — `ExecutiveSummary`
- **What:** stat tiles (price · units · cap · $/unit) + narrative + addresses + aerial +
  property-summary table.
- **Build:** the page that overflows/under-fills most. `gridTemplateRows:'1fr'` + left
  column `justify-content:space-between`. Dress addresses (numbered, two-line). See Ware.

### Property Overview — `PropertyOverview`
- **What:** `bldg-card` grid — Site Summary · Utilities/Mechanicals · Unit Composition ·
  Taxes/Assessment · (Commercial tenant). Facts from `deal.js` + the I&E workbook.

### Building History *(optional)* — `BuildingHistory`
- **What:** timeline + narrative + highlights for buildings with a story (e.g., adaptive
  reuse). Keep it **character/branding**, not "landmark/historic-register" (implies
  preservation restrictions). Footnote "verify independently."

### Site Map — `SiteMap.jsx`
- **What:** Google Static **hybrid** aerial with the **real parcel outline** + facts panel.
- **Build:** pull parcel geometry from the town/state GIS (CT State Parcel Layer 2023 →
  `src/parcel.js`), draw via Static Maps `path=` (golden fill+stroke); center/zoom on the
  parcel. Needs `VITE_GOOGLE_MAPS_API_KEY`.

### Investment Highlights *(optional)* — `InvestmentHighlights`
- **What:** the thesis. Two formats: **numbered cards** grid, or **title + paragraph** list.

### Property Photos — `PhotoPages.jsx` + `photos.js`
- **What:** captioned photo grids, grouped (exterior → interiors → commercial → common /
  systems → aerial). Data in `PHOTO_PAGES`.
- **Build:** `rows` override controls layout (`[1,2]` = one wide on top, two below).
  Placeholder convention: flat `/photos/*.jpg` names — drop real photos at the same names.

### Unit Mix & Rent Roll — `RentRoll` (`ChartCard`/`DonutChart`)
- **What:** unit table (In-Place / Market / Pro Forma) + donuts (unit mix, income makeup)
  + income summary.
- **Build:** donut seam fix = extend each arc `+0.8` so slices don't gap; `ChartCard` takes
  `fmt` (e.g. `$`), `centerFont`, optional `note`. Keep monthly vs annual consistent.

### Income & Expense — `IncomeExpense`
- **What:** operating income + expense schedules → **NOI strip** (Year 1 / Pro Forma) with
  caps. Truncate at NOI (no debt) unless asked. Numbers straight from the I&E workbook.

### Mgmt Transition / T-12 *(optional)* — `ManagementTransition`
- **What:** when there's a real trailing-12 story (manager change, actuals). Monthly-NOI bar
  chart + T-12 totals + a "reach out to brokers for detail" line. Reconcile cash NOI vs
  underwritten NOI.

### Neighborhood / Why <town> / County — market pages
- **What:** the reusable market layer. **Pull from `markets/<town>.md`** — don't rewrite.
  Neighborhood = editorial (narrative + about-bullets + photos); County = shared
  demographics table + economy paragraph.

### Aerial context — `AerialContext`
- **What:** full-bleed aerial with labeled callouts (`AerialPoint` subject/POI, `AerialStreet`).
- **Build:** points are `{x,y}` % of the image — tune with `aerial-pin-tuner.html`.

### Location & Amenities — `LocationMap.jsx` + `amenities.js`
- **What:** Google Static map + categorized amenity directory. Coords geocoded into
  `amenities.js`; markers de-cluttered. Subject = circular photo pin.

### Drive Times — `DriveTimeMap.jsx`
- See **`DRIVE_TIMES_MAP_FINAL.md`** (inland radial vs coastal raw-polygon; filled bands;
  real Valhalla strip).

### Regional Positioning — `RegionalMap.jsx`
- **What:** tristate Static map (highways gold, cities/airports/anchors pinned, rail line) +
  commute facts. Set `SUBJECT` + rail stops; isochrone rings optional (`enc` polylines).

### Team / Our Locations — `TeamPage.jsx` / `LocationsPage.jsx` (`firm.js`)
- **What:** firm roster + office map. **Shared, identical every book** — edit `firm.js`
  (remove departed staff, add deal team). East-coast office map via d3-geo.

---

## Add / edit a page
1. Write the component in `App.jsx` (or its own file for maps).
2. Insert it into the `pages[]` array at the right spot — numbering is automatic.
3. Update `Toc.jsx` `n` values for it and everything after.
4. Fill-check (Layout rules 1–2) and screenshot-verify.
5. If it's market content, source it from `markets/`; if new, write it back to `markets/`.
