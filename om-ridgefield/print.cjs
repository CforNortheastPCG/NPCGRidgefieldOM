const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

// Usage: node print.cjs [port] [outfile]
// Tunables (env): DSF (deviceScaleFactor → DPI), QUALITY (JPEG 1-100).
//   DPI ≈ 960 * DSF / 11.  DSF 3 ≈ 262 DPI · DSF 2.5 ≈ 218 DPI (both 200+).
const PORT = process.argv[2] || process.env.PORT || '5173';
const OUT = process.argv[3] || path.join(__dirname, '613-Main-Street-OM.pdf');
const DSF = Number(process.env.DSF || 3);
const QUALITY = Number(process.env.QUALITY || 80);
// Print-only brightness lift. The photos are faithful sRGB on screen, but paper
// isn't backlit so a faithful render prints darker than it looks. 1.0 = off.
// BRIGHTEN = mild lift on regular photos; COVER = stronger lift on the cover &
// section dividers, whose dark text-legibility scrims print muddy. Brightening
// the whole .cover-hero lifts those scrims while pure-white text stays white.
const BRIGHTEN = Number(process.env.BRIGHTEN || 1.05);
const COVER = Number(process.env.COVER || 1.18);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ompdf-'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // force-color-profile=srgb keeps screenshot colors true to the browser so
    // photos don't print dark; allow-file-access lets the compose step load
    // the file:// page screenshots.
    args: ['--allow-file-access-from-files', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: DSF });

  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
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
    .page img:not(.cover-hero-img) { filter: brightness(${BRIGHTEN}); }
    .cover-hero { filter: brightness(${COVER}); }
  ` });
  // One more paint cycle so everything is composited before we capture.
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await new Promise(r => setTimeout(r, 1500));

  const pages = await page.$$('.page');
  console.log(`Found ${pages.length} pages · DSF ${DSF} (~${Math.round(960 * DSF / 11)} DPI) · JPEG q${QUALITY} · brighten ${BRIGHTEN} · cover ${COVER}`);

  const files = [];
  for (let i = 0; i < pages.length; i++) {
    await pages[i].scrollIntoView();
    const f = path.join(TMP, `page-${String(i).padStart(2, '0')}.jpg`);
    await pages[i].screenshot({ path: f, type: 'jpeg', quality: QUALITY });
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
    path: OUT,
    width: '11in',
    height: '8.5in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(1);
  console.log(`PDF saved to ${OUT} · ${mb} MB`);
  if (mb > 10.5) console.log(`  ↳ over 10 MB — rerun with a lower QUALITY (e.g. QUALITY=72 node print.cjs)`);
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
})();
