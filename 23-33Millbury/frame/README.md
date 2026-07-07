# Your Offering Memorandum — Exported Source

This is the complete, standalone source of your book, exported from AutoOM.
It's a plain **Vite + React + TypeScript** project: everything the book
renders from is in this folder — the deal's numbers, the authored prose,
photos, map data, and the print pipeline. No AutoOM required.

## Run it

```sh
npm install
npm run dev        # live book at http://localhost:5180
npm run build && npm run print   # vector PDF → out/om.pdf
```

If the map pages show "Set VITE_GOOGLE_MAPS_API_KEY", create `.env.local`:

```
VITE_GOOGLE_MAPS_API_KEY=AIza...   # Maps Static API enabled
```

(The drive-time bands, routed city times, and amenities are already baked
into `src/data/mapdata.ts` — the key is only needed to fetch the base map
tiles at render time.)

## How the book is assembled

- **`src/data/manifest.ts`** is the single source of page order. Each entry
  is `{ id, type, title, … }`; page numbers are 1-based manifest positions.
- **`src/App.tsx`** maps each manifest entry's `type` to a component in
  `pageFor()`. Every page is a fixed **960×742** `.page` div (blows past
  the bottom = silently clipped in print — watch the footer line).
- **`src/data/*.ts`** — the deal's numbers, injected by AutoOM's
  deterministic pipeline. Rent roll, income/expense, computed returns,
  map data, tweaks. Edit knowingly: these were verified against the deal.
- **`src/content/*.content.ts`** — the authored prose, one typed module per
  page (contracts in `src/content/types.ts`). Editing these is the safest
  way to change what the book *says*.
- **`src/styles/tokens.css`** — the brand palette/typography variables;
  `src/styles/index.css` — the page vocabulary (stat tiles, golden rules,
  tables, team/locations grids).
- **`STYLE.md` / `CONVENTIONS.md`** — the house writing style and per-page
  budgets the original draft followed. Keep new copy consistent with them.

## Add a custom page (the recipe)

1. **Component** — create `src/components/pages/MyPage.tsx`:

   ```tsx
   import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'

   export function MyPage({ pageNum }: { pageNum?: number }) {
     return (
       <div className="page">
         <PageHeader section="My Section" />
         <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
           <SectionTitle text="My" accent="Page" />
           <div className="title-rule" />
           {/* content — keep inside the 960×742 page */}
         </div>
         <PageFooter pageNum={pageNum} />
       </div>
     )
   }
   ```

2. **Type** — add your page type to the `ManifestEntry` union in
   `src/lib/types.ts` (or reuse an existing type).

3. **Wire it** — add a `case` for it in `pageFor()` in `src/App.tsx`.

4. **Place it** — add an entry to `src/data/manifest.ts` where you want it
   in the deck. The ToC and page numbers update automatically.

5. **Check it** — `npx tsc --noEmit && npx vite build`, eyeball at :5180,
   then `node scripts/layout-check.mjs` (geometry audit — catches dead
   whitespace) and `npm run print` for the final PDF.

## Useful scripts

| Script | What it does |
| --- | --- |
| `npm run dev` / `build` / `print` | live preview / production build / vector PDF |
| `node scripts/shot.mjs --page <id> --out x.png` | screenshot one page (needs a build) |
| `node scripts/layout-check.mjs` | whitespace/layout audit vs the house standard |
| `node scripts/gen-maps.mjs` | regenerate map data (needs GOOGLE_MAPS_API_KEY / ORS_API_KEY) |

## A note on numbers

Every figure in `src/data/` traces to the deal's verified payload
(`payload.json` in this folder). If you change financial inputs, the
displayed tables/tiles will NOT recompute — they were computed by AutoOM's
engine at export time. For number changes, re-export from AutoOM (or edit
the display values consistently and carefully).
