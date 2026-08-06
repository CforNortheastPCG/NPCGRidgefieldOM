/* Page screenshotter — QA the deck without rendering a full PDF.
   Usage: node shot.cjs <port> <outDir> [pageNums…]   (default: every page) */
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const port = process.argv[2] || '4291';
  const outDir = process.argv[3] || 'shots';
  const want = process.argv.slice(4).map(Number);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 960, height: 742, deviceScaleFactor: 1.5 });
  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 60000 });
  const title = await page.title();
  const count = await page.$$eval('.page', els => els.length);
  console.log(`"${title}" — ${count} pages`);

  const nums = want.length ? want : Array.from({ length: count }, (_, i) => i + 1);
  for (const n of nums) {
    const el = (await page.$$('.page'))[n - 1];
    if (!el) { console.log(`  page ${n}: missing`); continue; }
    await el.screenshot({ path: `${outDir}/p${String(n).padStart(2, '0')}.png` });
    console.log(`  page ${n} ✓`);
  }
  await browser.close();
})();
