# PDF Rendering Artifacts — pink/black boxes, and how to hunt them

The recurring bug: the printed OM looks perfect in one PDF viewer and has
**pink (or solid black) boxes** in another — behind cover tag lines, around
the header logo, over shadows. This doc explains why it happens, how to
diagnose it in minutes, and the rules that keep it from coming back.

First diagnosed July 2026 on the Worcester book (`bf78030`-era): Quick Look
drew a solid black bar behind the cover descriptor line; other engines
showed the same region pink. Poppler rendered it perfectly — which is why
our own screenshots never caught it.

---

## TL;DR rules

1. **Never use `text-shadow`, `filter`, `mix-blend-mode`, `backdrop-filter`,
   or `box-shadow` on anything that prints.** If a page needs one on
   screen, disable it under `@media print` (see the print block at the
   bottom of `frame/src/styles/index.css`).
2. **Alpha in images is fine.** PNGs with transparency (logos) embed as
   image + SMask and every viewer handles that. The problem is *effects
   Skia has to rasterize*, not transparency itself.
3. **Don't trust one viewer.** Poppler (our screenshots, most Linux tools)
   is the most forgiving engine. Always cross-check with Apple's renderer
   (`qlmanage`) — it's the strictest one we have locally and matches what
   brokers see in Preview, Mail, and most "in-app" PDF panes.

## Why it happens

The book is printed by Chromium (`puppeteer page.pdf()` in
`frame/scripts/print.mjs`) using the **Skia PDF backend**. Skia writes real
vector text and passes JPEGs through untouched — but CSS effects that have
no PDF primitive (`text-shadow`, `filter`, blend modes) get **rasterized
into an image with a luminosity soft mask** and composited via a
transparency group.

That construct is legal PDF, but viewers disagree on it:

| Engine | Behavior |
|---|---|
| Poppler (pdftoppm, most CI screenshots) | Composites correctly — looks clean |
| Apple CoreGraphics (Preview, Quick Look, Mail, Safari) | Can drop the mask → **solid black box** |
| Various in-app/JS viewers (PDF.js versions, embedded panes, print services) | Can misapply the mask or group color space → **pink/magenta box** |
| Adobe Acrobat | Usually correct |

Same file, same bytes — the artifact is the *viewer's* compositing of a
construct we shouldn't have emitted. So the fix is always on our side:
don't emit it.

## The built-in guard

`frame/scripts/print.mjs` checks for this automatically on every print:
after switching to print media and before rendering the PDF, it walks
every element under `.page` and inspects the **computed** style — exactly
what Skia will see, so `@media print` overrides are respected — for
`text-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`, and
`box-shadow`. Offenders are logged to the job output with page id,
selector, and the property value:

```
! print-unsafe CSS on 2 element type(s) — Skia rasterizes these into soft-mask groups; …
  p-16: span → box-shadow: rgb(248, 151, 29) 0px 0px 0px 1px
```

A clean run prints `print-safe: no rasterizing CSS effects under print
media`. The guard is advisory (the PDF still renders) — grep render-job
logs for `print-unsafe` before shipping a book. The first run of the
guard caught two inline `box-shadow`s on the map pages that a source grep
had missed; computed-style checking catches inline styles, stylepack CSS,
and anything a content module sneaks in.

## Diagnosis playbook (5 minutes)

1. **Confirm what's actually in the PDF:**

   ```bash
   pdfimages -list book.pdf | head -30
   ```

   Read the rows per page. Expected on every page: the footer logo mark
   and header logo as `image` + `smask` pairs (PNGs with alpha — fine),
   photos as `jpeg` with `icc` color. **Red flag:** extra `gray` images
   sized like text lines (e.g. `814×70`, `1364×69`) — those are rasterized
   `text-shadow` strips. Extra `image`+`smask` pairs that match a styled
   element's size are rasterized `filter` output.

2. **Render with Apple's engine** (the strict one):

   ```bash
   qlmanage -t -s 1200 -o . book.pdf   # writes book.pdf.png of page 1
   ```

   Compare against a poppler render (`pdftoppm -png -f 1 -l 1 book.pdf p`).
   If poppler is clean and qlmanage shows a box, it's a soft-mask construct.

3. **Find the CSS source:**

   ```bash
   grep -rn "text-shadow\|filter:\|mix-blend\|backdrop" frame/src
   ```

   Whatever matches and prints is your culprit.

4. **Check color while you're in there.** Photos should list as `icc` 3-comp
   (sRGB — we launch Chromium with `--force-color-profile=srgb`). A `cmyk`
   or 4-comp image would be its own class of viewer bug (inverted/pink
   *photos*, not boxes); we've not hit it because uploads are re-encoded
   RGB end-to-end.

## The fix pattern

Kill the effect in print only — screen preview keeps it:

```css
@media print {
  /* text-shadow and filter become rasterized soft-mask groups in Skia's
     PDF output; several viewers (Preview/Quick Look, some in-app PDF
     services) composite them as solid black or pink boxes. Drop both. */
  .page-header img { filter: none; }
  .cover-hero-prep { text-shadow: none; }
}
```

If the effect is load-bearing for legibility (white text on a photo),
replace it with something that has a PDF primitive: a real
semi-transparent fill behind the text (`background: rgba(0,0,0,.45)` on
the overlay box), or a darker gradient scrim on the image container —
plain alpha fills print correctly everywhere.

## Verify after fixing

```bash
cd frame && npx vite build && node scripts/print.mjs /tmp/test.pdf
pdfimages -list /tmp/test.pdf | head          # rasterized strips gone?
qlmanage -t -s 1200 -o /tmp /tmp/test.pdf     # box gone in Apple's engine?
```

Also confirm the PDF stayed vector and photos stayed passthrough: file
size should be roughly the sum of the JPEGs, and `pdfimages -list` should
show photos as `jpeg` (encoder column), not re-encoded `image` rows at
~4× the size.

## Related but different

- **~4× file bloat with clean rendering** — a CSS `filter` on a *photo*
  forces Chromium to re-encode it instead of JPEG passthrough. Same rule
  (no filters in print), different symptom. See the note in the
  `@media print` block of `index.css`.
- **Pink/inverted *photos* in some viewers** — CMYK/Adobe-marker JPEG
  slipped into the pipeline. Check `pdfimages -list` for 4-comp images;
  re-encode the source to sRGB.
- **Blank or missing divider art** — asset path escaping the preview base,
  not a viewer bug (see CHANGELOG Phase 11 and docs/TROUBLESHOOTING.md).
