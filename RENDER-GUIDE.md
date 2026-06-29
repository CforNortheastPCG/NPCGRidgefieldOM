# 6 Elm Street OM — Render Guide

How to produce the print-ready PDF for this OM, and why the settings are what they
are. The pages are **rasterized on purpose** (anti-scrape) — there is no selectable
text in the output; the only machine-readable text is the embedded PDF metadata.

---

## Quick start

```bash
npm run pdf
```

That's it. `export.cjs` builds the production bundle, serves it, screenshots every
`.page`, composes a landscape 11×8.5in PDF, and embeds broker metadata — then tears
the server down. Output: `6-Elm-Street-Norwalk-OM.pdf` in the project root (the
filename comes from `pdfName` in `src/deal.js`).

### Render against an already-running server

If a dev/preview server is already up, skip the build and screenshot it directly:

```bash
node print.cjs [port] [outfile]
```

---

## Locked-in settings (current defaults)

These live in `print.cjs` and are the agreed "go big — initial render matters most"
configuration. They are the defaults, so a plain `npm run pdf` uses them.

| Setting   | Default | Meaning |
|-----------|---------|---------|
| `DSF`     | **3.5** | deviceScaleFactor → capture DPI ≈ `960 * DSF / 11` ≈ **305 DPI** (print-grade) |
| `QUALITY` | **92**  | JPEG quality (1–100) for photo-heavy pages only |
| `BRIGHTEN`| 1.05    | mild print-only brightness lift on regular photos (paper prints darker than screen) |
| `COVER`   | 1.18    | stronger lift on the cover/divider heroes so dark scrims lighten (white text stays white) |

All four are overridable via env vars, e.g. `QUALITY=82 npm run pdf`.

---

## Per-page format: PNG for text, JPEG for photos

**This is the fix for the "halo" / fuzzy-text artifact** seen especially on printed
copies.

- **Why it happened:** JPEG compresses in 8×8 DCT blocks and cannot hold a hard
  edge, so it rings a faint fuzzy halo around sharp black-on-light text. Any JPEG
  quality rings *some* — print exposes it.
- **The fix:** `print.cjs` measures, per page, how much of the page area is covered
  by `<img>` elements:
  - **> 55% images → photo-heavy → JPEG q92** (PNG here would balloon the file for
    no visible gain).
  - **≤ 55% images → text-heavy → lossless PNG** (zero ringing, pixel-exact text).

The render log prints the choice per page, e.g. `Captured page 4/18 · png (text)`.

For this 18-page deck the split is:
- **JPEG:** cover, dividers, photo pages (pages 1, 7–9, 14)
- **PNG:** exec summary, investment highlights, property overview, rent roll,
  income & expense, deal contacts, etc. (pages 2–6, 10–13, 15–18)

---

## File size

Lossless PNG text pages at 305 DPI don't compress like JPEG, so the file is large
by design: **~42 MB** for this deck. That's the accepted tradeoff — crisp printed
text wins over a small file.

If a smaller file is ever needed *without* reintroducing the halo:
- `DSF=3 npm run pdf` → ~262 DPI, still ring-free text, ~30 MB, marginally less
  crisp on paper.
- `QUALITY=82 npm run pdf` → trims only the JPEG photo pages; text pages unaffected.

The script warns if the output exceeds 35 MB — at these settings that warning is
expected and can be ignored.

---

## Gotchas

- **Port collision:** `export.cjs` serves on `:4173` by default. If another OM's
  preview server is already holding that port, `--strictPort` makes the new server
  fail to bind, but the renderer can still connect to the *stale* server and
  silently render the **wrong deck**. Render on a dedicated port to be safe:
  ```bash
  PORT=4192 npm run pdf
  ```
- **Rasterized by design:** do not "fix" the blurry-on-zoom look by switching to
  selectable/vector text — rasterization is intentional anti-scrape.
- **Metadata is the only readable text:** broker/listing info is written into the
  PDF document metadata (`pdf-meta.cjs`) so any reader or AI ingesting the file
  still surfaces the exclusive listing brokers.
- **Image decode wait:** `print.cjs` waits for `document.fonts.ready` and for every
  image to finish decoding before capturing — otherwise the big cover photo can
  screenshot blank.

---

## Tuning cheatsheet

```bash
npm run pdf                      # standard: DSF 3.5, q92, PNG text — ~42 MB
DSF=3 npm run pdf                # smaller (~30 MB), still ring-free text
QUALITY=82 npm run pdf           # trim photo pages only
COVER=1.28 npm run pdf           # lift a still-dark printed cover
PORT=4192 npm run pdf            # avoid :4173 collision with another OM
node print.cjs 5173 out.pdf      # render an already-running server to a custom file
```
