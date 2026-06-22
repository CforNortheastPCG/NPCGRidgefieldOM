# NPCG OM — Catalog & Playbook

The canonical store of **every offering memorandum we've built** (facts + narrative, so
each deal story is a reusable asset) and the **markets we've already produced** (so we
reuse town pages — neighborhood, demographics, drive-time, aerials — instead of
rebuilding "Bridgeport pages" for every book).

Companion specs: **`DRIVE_TIMES_MAP_FINAL.md`** (drive-time page playbook) ·
**`markets/`** (paste-ready per-town copy, demographics, frames, media).

_Last updated: 2026-06-20._

---

## House style (do this every book)
1. **Clone, don't start fresh** — copy `om-template` (multifamily) → `om-<deal>`; set
   `src/deal.js` (name · address · cityState · type · pdfName). That drives cover,
   headers, footers, export name.
2. **Reuse the market, don't rewrite it** — if the town is in *Markets* below, pull its
   page from `markets/<town>.md` + the source folder; only refresh subject-specific bits.
3. **Reuse the shared pages** — team, deal-contacts/disclaimer, selling process,
   marketing, national-visibility, Drive Times system are identical every book.
4. **Real data, sourced** — financials from the deal I&E workbook; demographics/comps
   carry a source note; nothing eyeballed.
5. **Export** — `npm run pdf` (rasterized, anti-scrape; JPEG-compressed, target < ~10 MB).

---

## Engine (shared across every book)
| Piece | Where |
|---|---|
| Per-deal identity | `src/deal.js` (older clones: `src/App.jsx` consts) |
| Financials + page bodies | `src/App.jsx` |
| Market/town copy + demographics + media paths | `markets/<town>.md` |
| Drive Times map (inland vs coastal) | `DRIVE_TIMES_MAP_FINAL.md` + `src/DriveTimeMap.jsx` |
| Export → PDF | `npm run pdf` (build → serve → puppeteer rasterize → teardown) |

---

## Deals (the books)
| Deal | Folder | Address | Market | Type | Units | Price | Cap (cur / PF) |
|---|---|---|---|---|---|---|---|
| **Black Rock Commons** | `om-blackrock-fairfield` | 2836 Fairfield Ave | Black Rock, **Bridgeport CT** | Mixed-use MF (adaptive reuse — former bank) | 16 (15 res + retail) | $4,300,000 | 6.05% / 7.29% |
| **Ware Portfolio** | `om-ware-portfolio` | 27 Parker · 28-30 & 28.5 · 38 North St | **Ware, MA** | 3-building apt portfolio | 20 | $2,550,000 | 8.01% / 11.33% |
| **Main Street Apartments** | `om-ridgefield` | 613-615 Main St | **Ridgefield, CT** | Multifamily (8-30g set-aside) | 9 | $3,600,000 | — |
| **Salem Square** | `om-salem-square` | 628 New Haven Rd | **Naugatuck, CT** | Value-add mixed-use + entitled 51-unit dev parcel | mixed + 51 | $3,800,000 | — |
| **South End Plaza** | `om-southend-plaza` | 310 South Main St | **Thomaston, CT** | Mixed-use retail + apt (value-add) | 17 | $2,450,000 | 6.47% / 7.81% |
| **The Campbell** | `om-westhaven-campbell` | Campbell Ave | **West Haven, CT** | Multifamily | 39 | $5,265,000 | — |
| **The Williston** | `om-westhaven-williston` | 711 Savin Ave | **West Haven, CT** | Multifamily | 69 | $9,315,000 | — |
| **254 Main (Martin)** | `om-westhaven-martin` | 254 Main St | **West Haven, CT** | Multifamily | 19 | $2,565,000 | — |
| **300 Main Street** | `om-westhaven-main` | 300 Main St | **West Haven, CT** | Multifamily | 10 | $1,400,000 | — |
| **Elm (Norwalk)** | `om-elm-norwalk` | Elm St area | **Norwalk, CT** | Multifamily | 12 | $3,275,000 | — |

_Caps "—" = confirm from the deal's I&E. Non-deal folders: `om-template` (clean base),
`om-generator` (tooling), `flyers` / `flyer-250-danbury`, `social-templates`, `logos`._

### One-liners
- **Black Rock Commons** — 16-unit mixed-use building (15 apts + ground-floor retail) in **Black Rock, Bridgeport** — the city's set-apart, old-money coastal pocket on the Fairfield line; former Black Rock Bank & Trust, adaptive-reused; ~$57,300/yr mark-to-market upside.
- **Ware Portfolio** — 3-property, 20-unit downtown apartment portfolio; below-market rents roll to market (~8% → ~11%).
- **Main Street Apartments** — 9-unit walkable downtown Ridgefield MF; partial 8-30g set-aside.
- **Salem Square** — value-add mixed-use **plus** an entitled 51-unit development parcel (income + dev play).
- **South End Plaza** — 17-unit mixed-use value-add on Route 8, Thomaston.
- **West Haven ×4** (Campbell 39 · Williston 69 · Martin 19 · 300 Main 10) — New Haven County MF, Yale/UNH demand. **Recurring market → one shared page set.**
- **Elm (Norwalk)** — 12-unit Fairfield County MF.

---

## Markets — reuse, don't rebuild
Paste-ready copy/demographics/frames/media per town live in **[`markets/`](markets/README.md)**.
This table is the index of what already exists.

| Market | County | Deals | On hand |
|---|---|---|---|
| **Bridgeport — Black Rock** | Fairfield | Black Rock Commons | Neighborhood (old-money) · Bridgeport-vs-county demographics · Drive Times (coastal `41.15,-73.40` z8) · GIS parcel · aerials · amenities → `markets/bridgeport-black-rock.md` |
| **West Haven** | New Haven | ×4 | Market + New Haven County copy · aerials — **consolidate to one set** → `markets/west-haven.md` |
| **Fairfield County** (shared) | Fairfield | Ridgefield · Black Rock · Norwalk | County economy + demographics + regional/tristate framing → `markets/fairfield-county.md` |
| **Naugatuck** | New Haven | Salem Square | Naugatuck Valley narrative · Drive Times |
| **Thomaston** | Litchfield | South End Plaza | Thomaston narrative + demographics · Drive Times (inland `41.60,-72.95` z8) |
| **Ware** | Hampshire (MA) | Ware Portfolio | Ware/Pioneer Valley narrative · Drive Times (`42.18,-72.25` z8) |
| **Norwalk** | Fairfield | Elm | Norwalk + Fairfield County narrative |

---

## Reuse — don't rebuild these (✓ already done somewhere)
- ✓ **Town narrative + demographics** → `markets/` (start there before writing any town copy)
- ✓ **County layer** — Fairfield County (Ridgefield/Black Rock/Norwalk) · New Haven County (West Haven ×4/Naugatuck)
- ✓ **Drive Times map system** — inland vs coastal, full code → `DRIVE_TIMES_MAP_FINAL.md`
- ✓ **Shared pages** — team · our-locations · deal-contacts/disclaimer · selling process · marketing timeline/strategy · national visibility (identical every book)
- ✓ **Brand shell** — cover/divider/shell components · `index.css` · `/logos`

---

## Spin up a new book
1. Clone `om-template` → `om-<deal>`; set `src/deal.js`.
2. **Check Markets above.** Town already here → copy its `markets/` page + source-folder
   pages; only swap subject-specific facts. New town → build it once, then add a
   `markets/<town>.md` so the next book reuses it.
3. Drop financials (rent roll, I&E) + photos into `public/photos/<deal>/`.
4. Add Drive Times per `DRIVE_TIMES_MAP_FINAL.md` (inland → Ware; coastal → Black Rock).
5. `npm run pdf` to export.
6. **Update this file** — add the deal row + one-liner; if a new town, add the Markets row.
