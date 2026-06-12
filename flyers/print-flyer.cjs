/* Flyer exporter — screenshots each .flyer-page at 2× and composes a
   landscape 11×8.5 PDF (one side per page), plus a PNG per side for the web.
   Usage: node print-flyer.cjs [port] [slug] */
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = process.argv[2] || '5173';
const SLUG = process.argv[3] || '1-kelley-square';
const OUTDIR = path.join(__dirname, 'out');
fs.mkdirSync(OUTDIR, { recursive: true });
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'flyer-'));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:${PORT}/?slug=${SLUG}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2500));

  const pages = await page.$$('.flyer-page');
  console.log(`Found ${pages.length} flyer sides`);
  const sides = ['front', 'back'];
  const files = [];
  for (let i = 0; i < pages.length; i++) {
    const png = path.join(OUTDIR, `${SLUG}-${sides[i] || i}.png`);
    await pages[i].screenshot({ path: png, type: 'png' });
    files.push(png);
    console.log(`Captured ${sides[i] || i}`);
  }
  await page.close();

  // Compose a 2-page landscape PDF, one side per page.
  const pdfPage = await browser.newPage();
  const imgTags = files.map((f) => `<div class="pp"><img src="file://${f}" /></div>`).join('\n');
  const htmlPath = path.join(TMP, 'index.html');
  fs.writeFileSync(htmlPath, `
    <html><style>
      * { margin: 0; padding: 0; }
      @page { size: 11in 8.5in; margin: 0; }
      .pp { width: 11in; height: 8.5in; page-break-after: always; display: flex; align-items: center; justify-content: center; background: #fff; }
      .pp:last-child { page-break-after: auto; }
      .pp img { width: 100%; height: 100%; object-fit: contain; }
    </style><body>${imgTags}</body></html>`);
  await pdfPage.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  const pdfOut = path.join(OUTDIR, `${SLUG}-flyer.pdf`);
  await pdfPage.pdf({ path: pdfOut, width: '11in', height: '8.5in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`PDF: ${pdfOut}`);
  console.log(`PNGs: ${files.join(', ')}`);
})();
