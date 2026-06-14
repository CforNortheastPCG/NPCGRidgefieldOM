const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

/* ═══════════════════ OM PDF RENDERER ═══════════════════
   Screenshots every `.page` from a running OM (dev or preview server) and
   composes a print-ready, rasterized PDF (one 11x8.5in landscape page each).
   Rasterized on purpose — anti-scrape; do not switch to selectable text.

   Used two ways:
     • node print.cjs [port] [outfile]   — against a server you already started
     • require('./print.cjs').renderPdf() — from export.cjs (full auto pipeline)

   Tunables (env or opts):
     DSF      deviceScaleFactor → DPI ≈ 960*DSF/11  (3 ≈ 262 · 2.5 ≈ 218; 200+)
     QUALITY  JPEG quality 1-100 (drives file size; ~62 ≈ 13 MB for 34 pages)
     BRIGHTEN mild print-only lift on regular photos (paper prints darker)
     COVER    stronger lift on the cover/divider heroes (lifts dark scrims) */

// Pull the output filename from src/deal.js (single source of truth) without an
// ESM import from this CJS script — a regex on the string literal is enough.
function dealPdfName() {
  try {
    const src = fs.readFileSync(path.join(__dirname, 'src', 'deal.js'), 'utf8');
    const m = src.match(/pdfName:\s*'([^']+)'/);
    if (m) return m[1];
  } catch { /* fall through */ }
  return 'offering-memorandum.pdf';
}

async function renderPdf({
  port = process.env.PORT || '5173',
  out = path.join(__dirname, dealPdfName()),
  dsf = Number(process.env.DSF || 3),
  quality = Number(process.env.QUALITY || 62),
  brighten = Number(process.env.BRIGHTEN || 1.05),
  cover = Number(process.env.COVER || 1.18),
} = {}) {
  const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ompdf-'));
  const browser = await puppeteer.launch({
    headless: true,
    // force-color-profile=srgb keeps screenshot colors true to the browser so
    // photos don't print dark; allow-file-access lets the compose step load
    // the file:// page screenshots.
    args: ['--allow-file-access-from-files', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: dsf });

  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // Wait for EVERY image to actually finish decoding (networkidle alone isn't
  // enough — the big cover photo can still be undecoded and screenshot blank).
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalWidth > 0) return img.decode().catch(() => {});
      return new Promise(res => { img.onload = img.onerror = res; }).then(() => img.decode().catch(() => {}));
    }));
  });
  // Print-only brightness lift (paper prints darker than screen). Injected into
  // the headless capture only — the live web app is unaffected. Regular photos
  // get a mild lift; the cover/divider heroes get a stronger one on the whole
  // container so their dark scrims lighten too (white text stays white).
  await page.addStyleTag({ content: `
    .page img:not(.cover-hero-img) { filter: brightness(${brighten}); }
    .cover-hero { filter: brightness(${cover}); }
  ` });
  // One more paint cycle so everything is composited before we capture.
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await new Promise(r => setTimeout(r, 1500));

  const pages = await page.$$('.page');
  console.log(`Found ${pages.length} pages · DSF ${dsf} (~${Math.round(960 * dsf / 11)} DPI) · JPEG q${quality} · brighten ${brighten} · cover ${cover}`);

  const files = [];
  for (let i = 0; i < pages.length; i++) {
    await pages[i].scrollIntoView();
    const f = path.join(TMP, `page-${String(i).padStart(2, '0')}.jpg`);
    await pages[i].screenshot({ path: f, type: 'jpeg', quality });
    files.push(f);
    console.log(`Captured page ${i + 1}/${pages.length}`);
  }
  await page.close();

  // Compose: one landscape 11x8.5 page per screenshot, referenced by file:// so
  // the HTML stays tiny (embedding base64 images crashes the compositor).
  const pdfPage = await browser.newPage();
  const imgTags = files.map(f => `<div class="pdf-page"><img src="file://${f}" /></div>`).join('\n');
  const htmlPath = path.join(TMP, 'index.html');
  fs.writeFileSync(htmlPath, `
    <html><style>
      * { margin: 0; padding: 0; }
      @page { size: 11in 8.5in; margin: 0; }
      .pdf-page { width: 11in; height: 8.5in; page-break-after: always; display: flex; align-items: center; justify-content: center; background: white; }
      .pdf-page:last-child { page-break-after: auto; }
      .pdf-page img { width: 100%; height: 100%; object-fit: contain; }
    </style><body>${imgTags}</body></html>
  `);
  // Open as a file:// page so the file:// images load same-origin.
  await pdfPage.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });

  await pdfPage.pdf({
    path: out,
    width: '11in',
    height: '8.5in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
  console.log(`PDF saved to ${out} · ${mb} MB`);
  if (Number(mb) > 14) console.log(`  ↳ large — rerun with a lower QUALITY (e.g. QUALITY=55) for a smaller file`);
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
  return { out, mb, pages: pages.length };
}

module.exports = { renderPdf, dealPdfName };

// CLI: node print.cjs [port] [outfile]  (against an already-running server)
if (require.main === module) {
  const port = process.argv[2] || undefined;
  const out = process.argv[3] || undefined;
  renderPdf({ port, out }).catch(err => { console.error(err); process.exit(1); });
}
