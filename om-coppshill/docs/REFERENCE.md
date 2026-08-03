# Reference — Data Shapes, Scripts & Env

Exact shapes of the data files and the knobs you can turn. For the workflow see
[GUIDE.md](GUIDE.md); for internals see [SYSTEM.md](SYSTEM.md).

---

## `src/deal.js` — `DEAL`

| Key | Type | Used by | Example |
| --- | --- | --- | --- |
| `name` | string | cover, footer | `'The Elm Street Apartments'` |
| `address` | string | cover, headers (`ADDR`) | `'6 Elm Street'` |
| `cityState` | string | headers (`CITY_STATE`) | `'Norwalk, CT 06850'` |
| `cityLong` | string | cover subtitle | `'Norwalk, Connecticut'` |
| `status` | string | cover chip, footer | `'For Sale'` |
| `type` | string | cover descriptor | `'12-Unit Multifamily Property'` |
| `coverImage` | string (path) | cover + accent photos | `'/photos/cover.jpg'` |
| `pdfName` | string | exporter output filename | `'6-Elm-Street-OM.pdf'` |

Derived exports: `ADDR = DEAL.address`, `CITY_STATE = DEAL.cityState`,
`FULL_ADDR = "${ADDR}, ${CITY_STATE}"`.

---

## `src/firm.js`

```js
// Advisor roster arrays — LEADERSHIP, SENIOR_INVESTMENT_SALES, INVESTMENT_SALES
{ name, title, phone, email, photo, url }
//   photo: '/photos/team/jane.png' or '' (→ initials avatar)
//   url:   profile link or '' (→ non-linked card)

export const SUPPORT_STAFF = [{ name, title, phone, email }]
export const OFFICES = [{ region, address1, address2, phone }]
export const OFFICE_MARKERS = [{ key, lat, lng }]   // plotted on East Coast map
```

Keep these export names and object keys — `TeamPage.jsx` and `LocationsPage.jsx`
render directly from them.

---

## `src/amenities.js`

```js
export const PROPERTY = { lat, lng, address }       // map center + subject marker

export const CONNECTIVITY = [{ label, value }]      // transit/anchor facts row

export const MAP_CATEGORIES = [
  { heading, label, color, swatch }                 // color '0xRRGGBB', swatch '#RRGGBB'
]

export const DIRECTORY = [
  { heading, items: [ { name, note, address? } ] }  // heading matches MAP_CATEGORIES
]

const COORDS = { 'address string': [lat, lng] }     // one per DIRECTORY item with an address
// MAP_POIS is derived: directory items that have a COORDS entry, tagged by category.
```

Items **without** an `address` still appear in the printed directory but are not
plotted (keeps far-flung POIs off the map while staying in the list).

---

## `src/photos.js` — `PHOTO_PAGES`

Array of page objects, rendered in order. Two kinds:

```js
// Placeholder (default in the template):
{ kind: 'comingsoon', section, title, accent, subtitle, tiles: ['Label', ...] }

// Real gallery:
{ kind: 'gallery', section, title, accent, subtitle,
  hero: '/photos/deal/exterior-1.jpg',        // optional large lead image
  heroPosition: 'center',                      // optional object-position
  tiles: ['/photos/deal/2.jpg', ...] }         // grid images
```

`section` shows in the page header; `title` + `accent` form the colored page
title (`accent` is the orange-highlighted part).

---

## Scripts (`package.json`)

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server (live deck) at :5173. |
| `npm run build` | Production build to `dist/`. |
| `npm run preview` | Serve the built `dist/` (used by the exporter). |
| `npm run pdf` | **Full export** — build → serve → render → cleanup (`export.cjs`). |
| `npm run print` | Render against an already-running server (`print.cjs`, defaults to :5173). |
| `npm run lint` | ESLint. |

Direct: `node print.cjs [port] [outfile]` renders against a server on `[port]`.

---

## Export env vars

Apply to `npm run pdf`, `npm run print`, and `node print.cjs`.

| Var | Default | Effect |
| --- | --- | --- |
| `DSF` | `3` | deviceScaleFactor → DPI ≈ `960 * DSF / 11`. `3` ≈ 262 DPI, `2.5` ≈ 218 DPI (both 200+). |
| `QUALITY` | `62` | JPEG quality 1-100 of the page screenshots. Main file-size lever. |
| `BRIGHTEN` | `1.05` | Print-only brightness on regular photos. |
| `COVER` | `1.18` | Print-only brightness on the cover/divider heroes (lifts dark scrims; white text stays white). |
| `PORT` | `4173` (pdf) / `5173` (print) | Server port. |

```bash
QUALITY=55 npm run pdf            # smaller PDF
COVER=1.28 npm run pdf            # lift a still-dark printed cover
DSF=2.5 QUALITY=70 npm run pdf    # 218 DPI, mid size
node print.cjs 5173 out.pdf       # render an already-running dev server
```

---

## Other config

- **`index.html`** — `<title>` + SEO/OpenGraph meta. Plain HTML, **not** wired to
  `deal.js`; edit by hand per deal.
- **`.env.local`** — `VITE_GOOGLE_MAPS_API_KEY=...` for the Location map (Maps
  Static API). Without it the location map renders a placeholder.
- **`.gitignore`** — ignores `node_modules`, `dist`, `RISE MEDIA/` (shoot
  masters), and `*.xlsx`.
