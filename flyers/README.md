# NPCG Property Flyers

One-page, **two-sided** marketing flyers for the **Worcester Canal District** portfolio
(LoopNet / Crexi / website). Same NPCG brand system as the OMs. Data is pulled from the
**Worwebsite** project (`/Users/cam/Worwebsite`) so the flyers always match the live site.

- **Front** — full-bleed aerial (parcels outlined), logo, "FOR SALE", property name, addresses. Nothing else — it makes the reader flip.
- **Back** — Executive Summary + CTA + Investment Highlights (left); outlined parcel map, "The Offering" tagline, firm bio + Brad/Taylor/Tim contact bar (right). Matching carbon header/footer.

PDFs are **rasterized** (flattened page images, no text layer) — same anti-scrape behavior as the OMs. Keep it that way.

## The pipeline (regenerate → render → compress)

```bash
# 1. Regenerate flyer data from the Worwebsite source of truth
cd /Users/cam/Worwebsite
npx tsx tools/gen-flyers.ts        # writes flyers/src/flyers.generated.js (all 10 OMs)

# 2. Start the flyer dev server
cd /Users/cam/NPCGRidgefieldOM/flyers
npm run dev                        # http://localhost:5173

# 3. Render a flyer to PDF + front/back PNG (out/)
node print-flyer.cjs 5173 <slug>   # e.g. 1-kelley-square  → out/1-kelley-square-flyer.pdf + -front/-back.png

# 4. Compress the PDF (rasterize at 300dpi/q92 — ~2.5–3 MB, crisp)
node compress.cjs out/<slug>-flyer.pdf "<dest>/<Name> - Flyer.pdf" 300 92
```

### Batch all 10 → Desktop

With the dev server running, this renders + compresses every flyer and copies PDFs + PNGs to
`~/Desktop/Worcester Canal District Flyers/`:

```bash
cd /Users/cam/NPCGRidgefieldOM/flyers
DEST="/Users/cam/Desktop/Worcester Canal District Flyers"; mkdir -p "$DEST"
name() { case $1 in
  1-kelley-square) echo "Kelley Square Portfolio";; 56-water-st) echo "Water Street Portfolio";;
  7-lamartine-st) echo "Lamartine Street Portfolio";; 172-washington-st) echo "172 Washington Street";;
  182-harding-st) echo "182 Harding Street";; 156-washington-st) echo "156 Washington Street";;
  15-millbury-st) echo "15 Millbury Street";; 23-millbury-st) echo "23 Millbury Street";;
  30-millbury-st) echo "30 Millbury Street";; 9-langdon-st) echo "9 Langdon Street";; esac }
for slug in 1-kelley-square 56-water-st 7-lamartine-st 172-washington-st 182-harding-st \
            156-washington-st 15-millbury-st 23-millbury-st 30-millbury-st 9-langdon-st; do
  nm=$(name $slug)
  node print-flyer.cjs 5173 $slug > /dev/null 2>&1
  node compress.cjs "out/$slug-flyer.pdf" "$DEST/$nm - Flyer.pdf" 300 92 > /dev/null 2>&1
  cp "out/$slug-front.png" "$DEST/$nm - Front.png"; cp "out/$slug-back.png" "$DEST/$nm - Back.png"
done
```

## Files

```
flyers/
  src/
    flyerData.js          # R2 base, photo(), FIRM_BIO, BROKERS — and re-exports FLYERS
    flyers.generated.js   # AUTO-GENERATED (do not hand-edit) — one entry per OM
    Flyer.jsx             # FlyerFront (full-bleed) + FlyerBack; builds the parcel map URL
    App.jsx               # renders ?slug=… (default 1-kelley-square)
    flyer.css             # the 1056×816 (11×8.5 landscape) page styles
  print-flyer.cjs         # screenshots .flyer-page → PDF + front/back PNG
  compress.cjs            # pdftoppm + recompose to shrink the PDF
  out/                    # render outputs
.env.local                # VITE_GOOGLE_MAPS_API_KEY (Static Maps — parcel outline map)
```

The generator lives in the **Worwebsite** repo: `tools/gen-flyers.ts`.

## How the generator works (`Worwebsite/tools/gen-flyers.ts`)

- Imports `properties.ts` + `parcels.json`; emits `flyers/src/flyers.generated.js`.
- **OM set (10):** 3 portfolios (`1-kelley-square`, `56-water-st`, `7-lamartine-st`) + 7 standalone.
- **Parcels:** package flyers outline every parcel sharing the property's `groupId`; standalone outline their one lot. Property slug `56-water-st` → parcel slug `water-56`.
- **Photos:** Cloudflare R2 — `heroImage` `/photos/<key>` is rewritten to the public bucket URL
  `https://pub-c23015e950e74bf2a7068de2409e26d1.r2.dev/<key>`
  (get it with `wrangler r2 bucket dev-url get kelley-square-photos`).
- **Map:** zoom + center are **auto-fit** to the parcel bounding box (`fitMap`) so no lot clips.
- **Length caps:** executive summary → 2 paragraphs, highlights → 4 (keeps the back page from overflowing).
- **Per-flyer overrides:** `HERO_OVERRIDE` (Kelley uses the outlined assemblage aerial, not the building shot) and `TITLE_TOP` (182 Harding puts the title up top so the photo isn't covered).

## Adding / changing a flyer

Edit the data in **Worwebsite** (`src/data/properties.ts` for content, `src/data/parcels.json`
for lot polygons), then re-run the generator and re-render. For cover tweaks, use
`HERO_OVERRIDE` / `TITLE_TOP` in the generator. Firm bio + broker roster live in `flyerData.js`.

## Tech

React 19 · Vite · Puppeteer (render) · poppler `pdftoppm` (compress) · Google Static Maps
(parcel-outline map) · Montserrat. Brand palette from `src/index.css`.
