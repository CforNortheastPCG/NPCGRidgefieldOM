# Vector-PDF Artifact + Size Fixes — om-hysil & 23-33 Millbury

**Date:** 2026-07-07
**Decks:** `om-hysil` (20 Hy-Sil Ave, Chelsea MA) and `23-33Millbury OM/frame` (23-33 Millbury St, Worcester MA)
**Symptom:** pink/magenta (and hard black-bar) boxes over photos in Preview/Acrobat/Quick Look, plus oversized files.

Both decks are the same autoom3 template (`scripts/print.mjs` vector `page.pdf()` path). Neither had the colorspace-normalize or print-safe-CSS work the canonical spec requires, so both showed the same artifacts. The fixes below were applied identically to each, per `RENDER-PIPELINE.md` §0/§4 and `PDF-ARTIFACTS.md`.

---

## Root causes

1. **Pink *photos* — ICC v4.** Skia tags every rendered image with a compact `[/ICCBased n 0 R]` profile. Chromium reads it, but Apple CoreGraphics / Acrobat / print RIPs can fail the v4 parse and cast photos pink. The deck's `print.mjs` had **no** colorspace-normalize pass.

2. **Pink/black *boxes* over scrims — luminosity soft masks.** CSS gradients that fade toward `transparent` have *varying alpha*, which PDF cannot express as a plain shading. Skia emits them as pattern fills behind a `/SMask /S /Luminosity` group, and viewers composite that group as a solid pink or black box. Offenders: cover scrim, TOC accent-photo scrim, photo captions, divider background scrim.

3. **Other print-unsafe effects.** `filter` on the header logo, `text-shadow` on the cover prep line, and `box-shadow`s on the map legend card + location pin — all rasterize into soft-mask groups under Skia.

4. **File bloat.** `page.pdf()` embeds source JPEGs byte-for-byte (DCTDecode passthrough), so oversized source photos inflate the PDF directly.

---

## Fixes applied (identical in both decks)

### 1 · Photo compression (RENDER-PIPELINE.md §0)
Resized photos to **≤1600px wide, JPEG q0.84, clean sRGB** via a one-off puppeteer-canvas script (sharp/ImageMagick aren't on the PC; the canvas re-encode also drops any embedded ICC). Originals are committed in git, so this is reversible.

- **om-hysil:** all 34 photos were 4032×3024 → **73.7 MB → 14.2 MB**.
- **Millbury:** only 10 of 25 exceeded 1600px; compressed just those, left the 1400px ones untouched → **12.4 MB → 6.9 MB**.

### 2 · ICC → Device colorspace normalize (RENDER-PIPELINE.md §4)
Added the canonical normalize pass (from `om-southend-plaza-vector/fix-pdf.cjs`) **into `scripts/print.mjs`'s existing pdf-lib metadata step**, and switched the save to `useObjectStreams:false`. It walks every indirect object and swaps each `[/ICCBased n 0 R]` colorspace to the matching `/Device*` (3ch→RGB, 1ch→Gray, 4ch→CMYK). Logs `colorspace: N ICCBased → Device*`.

Files changed: `scripts/print.mjs` (import line, normalize block after `PDFDocument.load`, `doc.save({ useObjectStreams:false })`).

### 3 · Print-safe CSS (PDF-ARTIFACTS.md) — screen keeps effects, print drops them
All under the `@media print` block in `src/styles/index.css`:

```css
.page-header img { filter: none; }          /* header-logo filter        */
.cover-hero-prep { text-shadow: none; }     /* cover prep line           */
.map-legend-card { box-shadow: none; }       /* regional-map legend card  */
.pin-ring        { box-shadow: none; }       /* location-map subject pin  */
.cover-scrim     { display: none !important; }        /* cover fade — not needed for legibility, hard edge removed */
.photo-caption   { background: rgba(40, 27, 18, 0.72); }  /* constant-alpha, no soft mask */
.divider-bg::after { background: rgba(10, 12, 16, 0.42); } /* constant-alpha, no soft mask */
```

Plus supporting changes:
- **`src/styles/index.css`** — `.photo-caption` base padding `20px 14px 8px` → `9px 14px 7px` (thinner caption bar).
- **`src/components/pages/CoverHero.tsx`** — added `className="cover-scrim"` to the inline scrim div (it had no class; the `.cover-hero-shade` CSS rule is dead code).
- **`src/components/Toc.tsx`** — removed the accent-photo gradient overlay `<div>` entirely (decorative, no text over it).
- **`src/components/pages/RegionalMap.tsx`** — added `className="map-legend-card"` to the legend card.
- **`src/components/pages/LocationMap.tsx`** — added `className="pin-ring"` to the subject pin span.

### 4 · Millbury-only setup
- Deck had **no `node_modules`** → ran `npm install`.
- Deck had **no `.env.local`** → copied the Google Maps key from `om-hysil/.env.local` (otherwise the rebuild blanks all map pages — the key is baked at build via `VITE_GOOGLE_MAPS_API_KEY`).

---

## Verification (raw PDF byte-scan; poppler/qlmanage are broken on the PC)


| Check | om-hysil | Millbury |
|---|---|---|
| Size | 66 MB → **15.09 MB** | ~13 MB → **8.31 MB** |
| `ICCBased` | 41 → **0** | 32 → **0** |
| Alpha gradients (`ShadingType2`) | 25 → **0** | **0** |
| `Luminosity` masks | 26 → **1** | **1** |
| Photos `DCTDecode` | 27 | 17 |
| Pages / metadata | 24 pp, baked | 23 pp, baked |

**The one remaining `Luminosity` mask in each** is the section-divider **background photo** (`.divider-bg { opacity: 0.22 }`) — an element-opacity group over an image, *not* a scrim-over-photo pink box. Left untouched (confirmed acceptable). If a divider ever shows a tint, convert that `opacity` to a pre-baked flat tone.

---

## Outputs
- `om-hysil/out/20-hysil-ave-chelsea-OM-vector.pdf`
- `23-33Millbury OM/frame/out/23-33-millbury-OM-vector.pdf`

Per RENDER-PIPELINE.md §6, final deliverables belong in `om-exports/` (gitignored) — not yet copied there.

## Follow-ups / notes
- These edits were **not** backported to the other OM folders (folders are authoritative). Apply the same set when any other autoom3 deck comes up for a vector render.
- Millbury metadata title is redundant (`"23 Millbury Street, 23-33 Millbury Street — Worcester, MA"`) — the deal `name` and `address` are both set; clean up in `payload.json` if desired.
- Consider promoting the ICC-normalize pass + the print-safe `@media print` block into the autoom3 template so new decks ship clean by default.
