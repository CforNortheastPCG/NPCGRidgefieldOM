# OM Render Pipeline — Canonical Spec

How the PDF export pipeline **should** work in every OM folder. Existing folders
diverge (each folder is authoritative — see README; never backport fixes
unprompted), so treat this as the reference when spinning up a new OM or when
asked to bring an old one up to standard.

**Reference implementations:** `om-southend-plaza-vector` (vector — has every fix
below), `om-coppshill` (raster — has the port-collision fix). The per-deck
`RENDER-GUIDE.md` documents the raster settings rationale for 6 Elm Street.

---

## Principles

1. **One command.** `npm run pdf` does everything: build → serve → render →
   post-process → report. No manual steps, no pre-running servers required.
2. **Deterministic output.** The same repo state produces the same PDF. Filename
   comes from `pdfName` in `src/deal.js` — the single source of truth.
3. **Never post-process with Ghostscript.** To change size or quality, re-render
   with different knobs. GS downsampling blurs text ("blur af") and GS 9.56
   crashes on Skia gradient patterns in vector PDFs.
4. **Verify before delivering.** Every export ends with the verification
   checklist below — page count, visual spot-check, encoding scan, metadata.
5. **Cross-platform.** Cameron switches between Mac and PC. Nothing in the
   pipeline may depend on POSIX shell shims, GDI+, poppler, or Ghostscript.

---

## Two render modes

| | **Vector** (`page.pdf()`) | **Raster** (screenshots) |
|---|---|---|
| Text | Selectable, searchable, crisp at any zoom | Rasterized — anti-scrape by design |
| Machine-readable | Full body text | PDF metadata only |
| Size (typical deck) | ~18–23 MB | ~10 MB (q77 DSF3) – ~42 MB (q92 DSF3.5) |
| Folders | `*-vector` decks | original decks |

Pick per deal: **vector** when shareability/searchability wins, **raster** when
anti-scrape wins. Both share the same stages; only the render step differs.

---

## Pipeline stages

### 0 · Photo prep (once, when adding photos)

- Source photos come from Dropbox (`...\For OM Final\`). Compress **before**
  committing to `public/photos/`:
  - **Vector decks: ≤1600px wide, JPEG q82–85.** `page.pdf()` embeds the source
    JPEG byte-for-byte (DCTDecode passthrough), so oversized sources bloat the
    PDF directly (2600px sources → 162 MB deck).
  - **Raster decks: ~2400px, q85** (screenshots re-encode anyway; sources just
    need to out-resolve the capture).
- Compress via the puppeteer **canvas script** (`compress-canvas.cjs` pattern).
  PowerShell/GDI+ fails on big JPEGs; sharp/ImageMagick aren't installed on the PC.
- **Every photo must be 3-component sRGB JPEG** — no CMYK, no exotic ICC
  profiles. Stock photos (iStock) often carry Apple/Adobe profiles; they're
  tolerated because the post-process step (stage 4) normalizes colorspaces, but
  clean sRGB is the standard.
- Remote images (headshots from northeastpcg.com) are bot-gated — always use
  local copies in `public/photos/team/`.

### 1 · Build

Spawn vite as **`node node_modules/vite/bin/vite.js build`** — never the
`.bin/vite` shim. The shim is a POSIX shell script; `spawnSync` on Windows
returns `status null` and the failure is silent. Driving the JS entry with
`process.execPath` works identically on Mac and PC.

### 2 · Serve (port-safe)

Every OM folder defaults to `:4173`, so a sibling deck's server can squat the
port and you'd silently render the **wrong deck** with the right filename
(happened: Copps Hill PDF containing the Salem Square deck). `export.cjs` must:

1. **Probe upward** from 4173 for a genuinely free port (HTTP GET →
   `ECONNREFUSED` = free).
2. Serve `vite preview --strictPort` on the free port.
3. **Verify identity before rendering:** fetch the served `<title>` and compare
   it against `dist/index.html`'s `<title>`. Mismatch → abort with a clear error.

`PORT=xxxx` env still forces a specific port.

### 3 · Render

Common to both modes (`print.cjs`):

- Viewport/page box **960×742px**, matching the DOM `.page` 1:1.
- Launch Chromium with `--force-color-profile=srgb`.
- Real-browser UA string (bot-gated hosts serve challenge pages to headless UAs).
- **Wait for readiness:** `document.fonts.ready`, then every `document.images`
  entry loaded *and decoded* (capped ~12s each so a hung image can't stall the
  render), then two `requestAnimationFrame`s + a settle delay. Skipping this
  ships blank cover photos.
- Log the found `.page` count — a wrong count is the first tell of a bad render.

**Vector mode** — `page.pdf({ width:'960px', height:'742px',
printBackground:true, margin:0 })`:

- `@media print` must contain `* { print-color-adjust: exact }` (keeps header
  bars/scrims/zebra rows) and `.page:last-child { page-break-after: auto }`
  (kills the trailing blank sheet).
- **No CSS `filter` on photos in `@media print`.** A filter forces Chromium to
  bake each photo as lossless FlateDecode (~4× bloat) instead of passing the
  JPEG through as DCTDecode.
- Output name gets a `-vector` suffix so it never collides with a raster control.

**Raster mode** — per-page screenshots composed into a landscape PDF:

- Knobs: `DSF` (deviceScaleFactor; 3.5 ≈ 305 DPI print-grade, 3 ≈ 262 DPI),
  `QUALITY` (JPEG q for photo pages), `BRIGHTEN`/`COVER` (print-only lifts,
  paper prints darker than screen).
- **Per-page format choice:** >55% image area → JPEG; otherwise **lossless PNG**
  so text has zero JPEG ringing/halo. This is the fix for fuzzy printed text.
- **Smaller file = re-render at lower DSF** (size scales ~DSF²; reference:
  DSF 2.3 q85 ≈ 16.8 MB for a 31-page deck). Render downsized copies to a
  *separate* outfile so the crisp original survives.
- Email cap when it matters: **under 10 MB** → DSF 3, q77–78.

### 4 · Post-process (`fix-pdf.cjs`, vector mode)

Runs automatically at the end of `export.cjs`; also exposed as `npm run fix-pdf`
for in-place fixes of an existing file. Two jobs:

1. **Colorspace normalize.** Skia tags every image with a compact **ICC v4**
   profile (`[/ICCBased n 0 R]`). Chromium reads it; Adobe Acrobat, macOS
   Preview, and print RIPs can choke and render photos **pink/magenta**. Walk
   every indirect object with pdf-lib and swap each ICCBased array to
   `/DeviceRGB` / `/DeviceGray` / `/DeviceCMYK` per the profile's `/N`. (pdf-lib
   gotcha: image XObjects are `PDFStream`s — walk `obj.dict`, they are not
   `instanceof PDFDict`.) Save with `useObjectStreams:false`.
2. **Metadata embed.** Title / Author / Subject / Keywords from `pdf-meta.cjs`
   (listing + broker contacts + AI-facing CTA). Raw `page.pdf()` output has
   none. Raster decks embed the same block inside `print.cjs`; either way, every
   delivered PDF must carry it, kept in sync with the Deal Contacts page.

### 5 · Verify (every export)

- **Page count** printed by the renderer matches the deck (and the Toc).
- **Visual spot-check** with `shot-pdf.cjs` (Chromium/PDFium — poppler and GS
  are broken on the PC): cover, one photo-grid page, one map/gradient page, the
  I&E page (watch for table overflow pushing the footer off-page).
- **Encoding scan** (vector): photos embed as `DCTDecode`, not a wall of
  `FlateDecode`; **zero `ICCBased` references remain**; `FontFile`/Montserrat
  present.
- **Metadata**: `pdf-lib getTitle()/getAuthor()` non-empty.
- **Right deck**: sanity-check a page visually against the app — the port guard
  makes wrong-deck renders unlikely, not impossible.
- If the write fails with `EBUSY`, the PDF is open in a viewer — ask Cameron to
  close it.

### 6 · Deliver

- Deliverables go to `om-exports/` (gitignored, like all `*.pdf`).
- Vector and raster outputs keep distinct names (`...-OM.pdf` vs
  `...-OM-vector.pdf`).

---

## Never do

- ❌ Ghostscript / poppler on any output (blurs text; crashes on Skia patterns;
  both broken on the PC anyway).
- ❌ Spawn `.bin/*` shims from node on Windows.
- ❌ Assume `:4173` is yours.
- ❌ CSS `filter` on photos inside `@media print` in vector decks.
- ❌ Ship a vector PDF without the ICC → Device* normalize.
- ❌ "Fix" raster decks' non-selectable text by switching them to vector —
  rasterization is intentional anti-scrape on those decks.
- ❌ Commit uncompressed source photos.

---

## Wishlist (not yet built)

- **Independent text/photo compression** (raster): keep text pages at full DSF
  lossless while downsampling only photo pages/regions — a true "15 MB but
  still crisp text" copy instead of the global-DSF compromise.
- Backport the port-guard + fix-pdf post-process as folders come up for edits
  (only when asked — folders are authoritative).
