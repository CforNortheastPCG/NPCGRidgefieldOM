// Render a page of a PDF to PNG via Chromium/PDFium so we can eyeball it
// without poppler/Ghostscript (both broken on this PC). Uses the local puppeteer.
//   node shot-pdf.cjs <pdf> <out.png> [pageNum]
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const pdf = path.resolve(process.argv[2]);
  const out = path.resolve(process.argv[3] || 'pdf-shot.png');
  const pageNum = Number(process.argv[4] || 1);
  const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
  // Chromium's built-in PDF viewer renders the file; jump to the page and hide UI.
  await page.goto(`file://${pdf}#page=${pageNum}&toolbar=0&view=Fit`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: out });
  console.log('shot saved', out);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
