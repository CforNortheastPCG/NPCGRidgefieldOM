# CLAUDE.md — Exported Book Project (standalone)

This project was exported from AutoOM: a print offering-memorandum book as
a Vite/React/TypeScript app. **You are working on a standalone copy** — the
AutoOM write-guard does not apply here. You may edit anything. With that
freedom, keep these priorities:

## What matters most

1. **Numbers are sacred.** Every figure in `src/data/` and every number in
   prose traces to `payload.json` (the deal's verified data, including
   `computed` rollups). Never invent or "improve" a financial figure. If
   asked to change deal economics, change the payload AND the displayed
   values consistently, and say clearly that the numbers no longer come
   from AutoOM's verified engine.
2. **House style is canon.** `STYLE.md` (voice, structures, banned phrases)
   and `CONVENTIONS.md` (per-module length budgets) produced this book.
   New or edited copy should read like it belongs.
3. **The page is a fixed 960×742 box** with `overflow: hidden` — content
   past the footer clips silently. After layout changes, verify:
   `npx tsc --noEmit && npx vite build`, then
   `node scripts/layout-check.mjs` (exit 4 = whitespace/overflow findings),
   and screenshot pages you touched:
   `node scripts/shot.mjs --page <id> --out /tmp/p.png`.

## Architecture map

- `src/data/manifest.ts` — page order; 1-based positions are the printed
  page numbers. The ToC derives from it.
- `src/App.tsx` — `pageFor()` switch: manifest `type` → page component.
- `src/components/pages/*` — one component per page type; `Shell.tsx`
  provides `PageHeader`, `PageFooter`, `SectionTitle`, `Md` (markdown-bold),
  `StaticShell`, `assetUrl`.
- `src/content/*.content.ts` — typed prose modules (contracts in
  `src/content/types.ts`) — the safest layer for copy edits.
- `src/data/*.ts` — injected deal data (financials, photos, mapdata,
  tweaks). `tweaks.ts` holds per-page text-zoom + cover layout.
- `src/styles/tokens.css` + `src/styles/index.css` — brand tokens + page
  vocabulary. Prefer existing classes (stat tiles, `title-rule`,
  golden-rule blocks) over new one-off styles.

## Creating a custom page

1. Component in `src/components/pages/MyPage.tsx` (copy an existing page's
   skeleton — `.page` → `PageHeader` → content → `PageFooter`).
2. Add the type to `ManifestEntry` in `src/lib/types.ts`.
3. Add a `case` in `pageFor()` in `src/App.tsx`.
4. Insert the manifest entry in `src/data/manifest.ts` at the right spot.
5. If the page needs authored prose, follow the content-module pattern:
   typed interface in `src/content/types.ts`, module file, export via
   `src/content/index.ts`, render through `Md` for markdown bold.
6. Build + layout-check + screenshot before declaring it done.

## Commands

- `npm run dev` — live book at :5180
- `npx tsc --noEmit && npx vite build` — must be green before you finish
- `npm run print` — vector PDF → `out/om.pdf`
- `node scripts/layout-check.mjs` — geometry audit (calibrated to the
  firm's hand-built reference book)

## Don'ts

- Don't renumber pages by hand — numbering is manifest position.
- Don't inline new hex colors — use the tokens.
- Don't let any page exceed its box; shrink content or split the page.
- Don't edit `src/data/financials*.ts` values unless explicitly asked to
  change the deal's numbers (see "Numbers are sacred").
