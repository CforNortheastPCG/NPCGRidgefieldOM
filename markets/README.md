# Market Library — reusable town/market assets

The **store of reusable market content** so we don't rebuild the same town pages for
every book. One file per market. When a new deal lands in a market that already has a
file here, **copy its narrative/demographics/drive-time frame** and just refresh the
subject-specific bits.

Deal-level facts live in `../OM_CATALOG.md`. This folder holds the **market-level
reusable assets**:

- **Narrative / copy** — neighborhood + county positioning paragraphs (paste-ready)
- **Demographics** — the figures + source notes used on the county/overview page
- **Drive Times frame** — `CENTER / ZOOM` + method (inland vs coastal) so the map
  re-renders identically (see `../DRIVE_TIMES_MAP.md`)
- **Media** — paths to the aerials / parcel / amenity assets already on disk
- **Deals using it** — which books draw on this market

## Files
| Market | File | Deals |
|---|---|---|
| Bridgeport — Black Rock | `bridgeport-black-rock.md` | Black Rock Commons |
| West Haven | `west-haven.md` | Campbell · Williston · Martin · 300 Main (×4) |
| Fairfield County (shared) | `fairfield-county.md` | Ridgefield · Black Rock · Norwalk |

_To add a market: copy an existing file, swap the content, and add a row above + to
`../OM_CATALOG.md`._

## High-level reuse assets (identical every book — don't rewrite)
- NPCG **team page**, **our-locations**, **deal-contacts/disclaimer**
- **Selling process**, **marketing timeline/strategy**, **national visibility** pages
- **Drive Times map system** (`../DRIVE_TIMES_MAP.md` — code + inland/coastal method)
- Cover / divider / shell components, brand CSS (`index.css`), logos (`/logos`)
