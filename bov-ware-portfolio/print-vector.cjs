const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/* ═══════════════════ OM PDF RENDERER (VECTOR) ═══════════════════
   Renders a running OM (dev or preview server) straight to a TRUE VECTOR PDF
   via page.pdf() over the live app DOM — text stays selectable/searchable and
   crisp at any zoom; CSS backgrounds/gradients print as vectors; photos embed
   as-is. One slide per sheet, sized 1:1 to the 960x742px DOM page.

   This is the VECTOR side of a raster-vs-vector side-by-side. The original
   om-salem-square keeps the rasterized screenshot pipeline as the control.

   page.pdf() defaults to PRINT media, so the app's `@media print` block in
   src/index.css activates automatically: page-break-after per .page, the
   print-color-adjust:exact opt-in (needed alongside printBackground), and the
   property-photo brightness lift. No runtime brightness injection here.

   Used two ways:
     • node print.cjs [port] [outfile]   — against a server you already started
     • require('./print.cjs').renderPdf() — from export.cjs (full auto pipeline) */

// Pull the output filename from src/data/deal.js (single source of truth)
// without an ESM import from this CJS script — a regex on the literal is
// enough. Fails loudly rather than silently falling back to a stale name.
function dealPdfName() {
  const src = fs.readFileSync(path.join(__dirname, 'src', 'data', 'deal.js'), 'utf8');
  const m = src.match(/pdfName:\s*['"]([^'"]+)['"]/);
  if (!m) throw new Error('pdfName not found — set DEAL.pdfName in src/data/deal.js as a quoted single-line string.');
  return m[1];
}

// Distinct '-vector' filename so the vector PDF never collides with the raster
// control if the two are placed side by side.
function vectorPdfName() {
  return dealPdfName().replace(/\.pdf$/i, '-vector.pdf');
}

async function renderPdf({
  port = process.env.PORT || '5173',
  out = path.join(__dirname, vectorPdfName()),
} = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 300000,
    // force-color-profile=srgb keeps colors true to the browser so photos don't
    // print dark.
    args: ['--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  // A real browser UA so bot-gated hosts (e.g. northeastpcg.com headshots) serve
  // the actual image instead of a challenge page.
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36')
  // Match the DOM page box exactly (960x742px = 10in x 7.73in @96dpi).
  await page.setViewport({ width: 960, height: 742, deviceScaleFactor: 1 });

  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // Wait for EVERY image to actually finish decoding (networkidle alone isn't
  // enough — the big cover photo can still be undecoded and render blank).
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    // Cap each image so a hung/blocked remote image can't stall the whole render.
    const cap = (p, ms) => Promise.race([p, new Promise(res => setTimeout(res, ms))]);
    await Promise.all(imgs.map(img => {
      const done = (img.complete && img.naturalWidth > 0)
        ? img.decode().catch(() => {})
        : new Promise(res => { img.onload = img.onerror = res; }).then(() => img.decode().catch(() => {}));
      return cap(done, 12000);
    }));
  });
  // One more paint cycle so everything is composited before we capture.
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await new Promise(r => setTimeout(r, 1500));

  const count = (await page.$$('.page')).length;
  console.log(`Found ${count} pages · vector page.pdf() at 960x742px`);

  // Direct vector render of the live DOM. printBackground:true + the
  // print-color-adjust:exact rule in @media print keep dark header bars, table
  // headers, zebra rows, and divider/cover scrims on paper.
  await page.pdf({
    path: out,
    width: '960px',
    height: '742px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });
  await page.close();

  const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
  console.log(`PDF saved to ${out} · ${mb} MB`);
  await browser.close();
  return { out, mb, pages: count };
}

module.exports = { renderPdf, dealPdfName };

// CLI: node print.cjs [port] [outfile]  (against an already-running server)
if (require.main === module) {
  const port = process.argv[2] || undefined;
  const out = process.argv[3] || undefined;
  renderPdf({ port, out }).catch(err => { console.error(err); process.exit(1); });
}
