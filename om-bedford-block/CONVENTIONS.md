# CONVENTIONS.md — Frame Component Map & Composition Rules (NPCG pack v1)

What each content module drives, its exact contract, and its length budget.
The type contracts live in `src/content/types.ts` — imports in your modules
must match them, and `vite build` will fail if they don't.

## The three tiers (what you may touch)

| Tier | Paths | Writer |
|---|---|---|
| Protected layout | `src/components/**`, `src/lib/**`, `src/styles/**`, `src/App.tsx`, `src/main.tsx`, configs, `scripts/**` | humans |
| Protected data | `payload.json`, `src/data/**` | `scripts/inject.mjs` only |
| **Agent-writable** | `src/content/*.content.ts` (NOT `types.ts`, NOT `index.ts`) | **you** |

Financial pages (Rent Roll, Income & Expense, Property Overview, stat tiles,
offering summary) render entirely from the protected data tier. You never
restate their tables; your prose references their numbers.

## Content modules

Every module exports one typed const with `generated: boolean`. Set
`generated: true` when you have authored it for this deal — pages with
`generated: false` print a red placeholder banner.

### `cover.content.ts` → `CoverContent`
- `subtitle`: ≤ 7 words. The thesis as a place-claim (see STYLE.md).

### `exec-summary.content.ts` → `ExecSummaryContent`
- `paragraphs`: 4–5 strings, 45–75 words each, ending with the verbatim
  info-on-request boilerplate. `**bold**` markdown supported — bold the deal
  name in ¶1 and anchor tenants in ¶2. The stat tiles and Offering Summary
  table beside your prose are data-tier; don't duplicate their labels.

### `highlights.content.ts` → `HighlightsContent`
- `groups`: exactly 2. Group 1 renders top-left at full size (3 items
  comfortable); group 2 renders bottom-right slightly smaller (up to 4
  items). `title`: ≤ 5 words, uppercase rendering. Items per STYLE.md
  (head ≤ 6 words, body one sentence ≤ 32 words with a hard stat).

### `city-overview.content.ts` → `CityOverviewContent`
- `heading`: place name only — the component appends the golden "Overview".
- `dek`: one line, ≤ 14 words.
- `paragraphs`: 2–3, totalling ≤ 170 words (left column is 56% wide).
- `bulletsTitle`: e.g. "About East Boston". `bullets`: 5–6, ≤ 12 words each.

### `county-overview.content.ts` → `CountyOverviewContent`
- `heading`: region name only ("Boston", "Plymouth County").
- `intro`: one paragraph ≤ 90 words.
- `employersTitle` + `employerGroups`: ≤ 3 groups; `label` ≤ 6 words,
  `items` one sentence ≤ 40 words. Empty array is valid when the payload
  gives you no market facts.

### `tenant-profiles.content.ts` → `TenantProfilesContent`
- Only in multi-tenant (annual-basis) decks. `intro` one sentence;
  `blurbs` keyed by EXACT tenant names from `payload.json` rentRoll rows.
  ≤ 25 words each. Six tenants fit; more will clip.

### `regional-map.content.ts` → `RegionalMapContent`
- The page already shows a regional map and a routed drive-times panel
  (pipeline-owned — `src/data/mapdata.ts`); you write the framing prose.
- `intro`: one paragraph ≤ 80 words opening with a **bolded claim** about
  the property's regional position.
- `statTiles`: exactly 4 `{v, l}` tiles; `v` is a short figure ("~2 mi",
  "Blue Line"), `l` ≤ 5 words uppercase-style label. Every figure must be
  payload-traceable or omitted — fewer tiles beat invented ones. Drive
  times/distances may also come from `src/data/mapdata.ts` `cities`
  (routed by the pipeline — quote them exactly).
- `highwayAccess`: one short paragraph, **bold** the route names.
- `economicAnchors`: one short paragraph on the region's employers and
  demand drivers, payload/positioning-sourced.

## Composition rules (from the shipped books)

1. **Fill the page, respect the clip.** Content should reach toward the
   footer without crossing it — `.page` is 960×742 and `overflow: hidden`
   cuts silently. The budgets above are calibrated to fill; don't exceed
   them and don't write half of them either.
2. **Golden-rule blocks read cleaner than boxes.** The layout already uses
   left-rule highlight cards and top-rule stat tiles; your text should not
   add its own decoration, headers, or bullets beyond the contracts.
3. **One hard stat per claim** — the highlight format is the house
   signature; keep it tight.
4. **Verify by building.** After writing all modules:
   `npx tsc --noEmit && npx vite build` — fix every error yourself. A type
   error in your content module is your bug.

## Design tokens

Brand colors/typography are canon in `src/styles/tokens.css` (Carbon
#3f4753, Golden #f8971d accent, Montserrat). You never reference or restate
them — components own all styling.
