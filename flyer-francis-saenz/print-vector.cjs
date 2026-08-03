const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/* ═══════════════════ PDF RENDERER (VECTOR, PORTRAIT) ═══════════════════
   Renders the running app straight to a TRUE VECTOR PDF via page.pdf() over the
   live DOM — text stays selectable and crisp at any zoom, which matters here
   because the transaction log sets 194 rows at 8px. Photos embed as-is
   (DCTDecode passthrough).

   Ported from bov-template/print-vector.cjs. The substantive differences:
     · 816x1056 portrait instead of 960x742 landscape
     · pdfName is read from src/data/deck.js
     · no .cover-hero brightness lift (this deck has no cover hero)
     · two pre-render guards, below

   page.pdf() defaults to PRINT media, so src/index.css's @media print block
   activates automatically: page-break-after per .page, print-color-adjust:exact
   (needed alongside printBackground for the dark header bars and zebra rows),
   and the blanket filter:none that keeps photos on the DCTDecode path.

   Used two ways:
     • node print-vector.cjs [port] [outfile]   — against a running server
     • require('./print-vector.cjs').renderPdf() — from export-vector.cjs      */

const PAGE_W = 816;   // 8.5in @96dpi
const PAGE_H = 1056;  // 11in  @96dpi

// Pull the output filename from src/data/deck.js without an ESM import from
// this CJS script — a regex on the literal is enough. Fails loudly rather than
// silently falling back to a stale name.
function dealPdfName() {
  const src = fs.readFileSync(path.join(__dirname, 'src', 'data', 'deck.js'), 'utf8');
  const m = src.match(/pdfName\s*=\s*['"]([^'"]+)['"]/);
  if (!m) throw new Error('pdfName not found — set `export const pdfName` in src/data/deck.js as a quoted single-line string.');
  return m[1];
}

async function renderPdf({
  port = process.env.PORT || '5173',
  out = path.join(__dirname, dealPdfName()),
} = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 300000,
    // Keeps colors true to the browser so photos don't print dark.
    args: ['--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  // A real browser UA so bot-gated hosts serve actual images, not a challenge page.
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 1 });

  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // Wait for EVERY image to finish decoding — networkidle alone isn't enough,
  // and an undecoded photo renders as a blank tile.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    // Cap each image so one hung fetch can't stall the whole render.
    const cap = (p, ms) => Promise.race([p, new Promise(res => setTimeout(res, ms))]);
    await Promise.all(imgs.map(img => {
      const done = (img.complete && img.naturalWidth > 0)
        ? img.decode().catch(() => {})
        : new Promise(res => { img.onload = img.onerror = res; }).then(() => img.decode().catch(() => {}));
      return cap(done, 12000);
    }));
  });
  // One more paint cycle so everything is composited before capture.
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await new Promise(r => setTimeout(r, 1500));

  const count = (await page.$$('.page')).length;
  console.log(`Found ${count} pages · vector page.pdf() at ${PAGE_W}x${PAGE_H}px`);

  /* ── GUARD 1 · clipping ──
     .page is overflow:hidden, so content past the bottom edge disappears with
     no error. The log's rows-per-page is a hand-computed constant; if a font
     metric shifts or a cell wraps, this is what catches it. */
  const clipped = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.page').forEach((p, i) => {
      const box = p.getBoundingClientRect();
      let worst = 0;
      p.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.bottom > box.bottom + 0.5) worst = Math.max(worst, r.bottom - box.bottom);
      });
      if (worst > 0.5) out.push({ page: i + 1, px: Math.round(worst) });
    });
    return out;
  });
  if (clipped.length) {
    console.warn('⚠ CLIPPED PAGES — content is being cut off:');
    clipped.forEach(c => console.warn(`    page ${c.page}: ${c.px}px past the bottom edge`));
  } else {
    console.log('No clipped pages.');
  }

  /* ── GUARD 2 · row count ──
     Every deal must appear exactly once in the log. A pagination bug that
     dropped the tail would otherwise ship silently — the pages would still
     look perfectly well-formed. */
  const logRows = await page.evaluate(() =>
    document.querySelectorAll('.tx-log tbody tr:not(.total-row)').length);
  const expected = require('./src/data/comps.json').totals.count;
  console.log(`Transaction log rows rendered: ${logRows}${logRows === expected ? ' ✓' : ` ✗ expected ${expected}`}`);
  if (logRows !== expected) console.warn('⚠ TRANSACTION LOG IS INCOMPLETE — do not deliver this file.');

  // Direct vector render of the live DOM. printBackground + print-color-adjust
  // keep the dark header bars, tiles, and zebra rows on paper.
  await page.pdf({
    path: out,
    width: `${PAGE_W}px`,
    height: `${PAGE_H}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });
  await page.close();

  const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
  console.log(`PDF saved to ${out} · ${mb} MB`);
  await browser.close();
  return { out, mb, pages: count, clipped, logRows };
}

module.exports = { renderPdf, dealPdfName };

// CLI: node print-vector.cjs [port] [outfile]  (against an already-running server)
if (require.main === module) {
  const port = process.argv[2] || undefined;
  const out = process.argv[3] || undefined;
  renderPdf({ port, out }).catch(err => { console.error(err); process.exit(1); });
}
