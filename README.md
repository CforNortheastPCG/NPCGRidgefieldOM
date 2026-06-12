# NPCG Offering Memoranda — React Templates

A collection of **Northeast Private Client Group (NPCG)** offering memoranda, each built as a
standalone **React + Vite** app that renders a paginated, print-ready "book" and exports it to a
landscape PDF. Every OM shares the same page-component template, so a new deal is produced by
**cloning an existing OM and swapping in the property-specific data** — not by starting over.

Each "slide" is a fixed **960 × 742 px** `.page`; the deck prints to landscape **11 × 8.5 in**.

## OMs in this repo

| Folder | Property | Units | Notes |
|---|---|---|---|
| `om-ridgefield` | 613-615 Main Street, Ridgefield, CT | 13 | Original template; includes 8-30g affordability page |
| `om-westhaven-main` | 300 Main St & 491 Washington Ave, West Haven, CT | 10 | Tudor, two buildings; line-by-line rent roll |
| `om-westhaven-martin` | 254 Main St & 106–108 Martin St, West Haven, CT | 19 | Brick, three buildings; unit-mix summary rent roll |
| `om-westhaven-williston` | 711 Savin Avenue, West Haven, CT | 69 | Elevator mid-rise; unit-mix summary + real interiors |

The three West Haven OMs were cloned from `om-westhaven-main`, which was itself cloned from
`om-ridgefield`. Source deal data lives in `deals/` (one "deal room" per property: rent roll,
NPCG I&E model, field card, P&L, photos).

## Anatomy of a template

Pages fall into two buckets. **Cloning a template means rewriting the property-specific pages and
leaving the shared ones alone.**

**Property / town-specific** (rewrite per deal):
- `App.jsx` — `CoverHero`, `ExecutiveSummary`, `BuildingDescriptions` (property overview),
  `RentRoll`, `IncomeExpense`, `WestHavenCombined`/location overview, `NewHavenCounty`/county
  positioning, `DealContacts`, and the `pages[]` deck order
- `Shell.jsx` — `ADDR` / `CITY_STATE` constants + footer label
- `photos.js` + `public/photos/` — photo-page manifest and imagery
- `amenities.js` — `PROPERTY` lat/lng + curated, geocoded amenity directory
- `LocationMap.jsx` / `RegionalMap.jsx` — map center, subject pin, narrative

**Shared / firm-wide** (copy as-is):
- `Toc.jsx`, `Divider.jsx`, Selling Process / Marketing Timeline / Strategy / National Visibility
  (in `App.jsx`), `BrokerProfile.jsx`, `TeamPage.jsx`, `LocationsPage.jsx`, `EastCoastMap.jsx`,
  `firm.js` (offices + team roster), and the confidentiality disclaimer

The rent roll auto-scales by size: small properties list every unit; larger ones (Martin, Williston)
use a unit-mix summary table plus donut charts.

## Spin up a new OM from a template

```bash
# 1. Clone the closest existing OM (carries node_modules so it runs immediately)
cp -R om-westhaven-main om-<newdeal>

# 2. Pull the deal data from deals/<deal>/ — rent roll, NPCG I&E xlsx, field card, photos
#    (resize photos into public/photos/<deal>/ with: sips -Z 1800 in.jpg --out out.jpg)

# 3. Rewrite the property-specific pages (see list above); leave shared pages untouched

# 4. Update package.json name, index.html title, print.cjs output filename
```

## Run + export

```bash
cd om-<deal>
npm install            # only needed if node_modules wasn't copied
npm run dev            # open the printed URL (e.g. http://localhost:5173)
node print.cjs <port>  # → <deal>-OM.pdf  (Puppeteer screenshots each .page at 2×)
```

`print.cjs` writes frames to a temp dir and composes via `file://` to avoid memory limits.

**Compress for sharing** (originals run ~40 MB). With poppler installed (`pdftoppm`), rasterize at
~185 DPI / quality 90 and recompose — keeps text crisp and lands each file under ~10 MB. Shareable
copies of the West Haven set live in `~/Desktop/West Haven OMs/`.

### Environment

Each OM needs a Google Maps key in `om-<deal>/.env.local` (Maps Static API enabled):

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

The Location & Amenities, Regional Positioning, and Our Locations maps use Google Static Maps;
without the key those pages show a placeholder. Amenity coordinates are geocoded once (Google
Geocoding API) and baked into `amenities.js` so the map renders deterministically.

## Data sources (per deal)

- **Financials** (rent roll, income & expense): the deal's NPCG I&E `.xlsx` and rent roll in `deals/`.
- **Property facts** (SF, lot, year built, construction): the assessor field card in `deals/`.
- **Demographics**: U.S. Census ACS estimates (town & county) — confirm before publishing.
- **Team / offices**: northeastpcg.com (headshots + agent links hard-coded in `firm.js`).
- **Reference**: `deals/Offering Memo Hadley Portfolio-Opt.pdf` (prior portfolio OM) seeded the West
  Haven / New Haven market narrative, rent comps, and sales comps.

## Tech

React 19 · Vite · d3-geo / topojson (Our Locations map) · Puppeteer (PDF) · poppler (compression) ·
Montserrat (brand font). Brand palette and editorial rules follow `NPCGStyleGuide.md`.
