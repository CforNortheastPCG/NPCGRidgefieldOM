const path = require('path');
const puppeteer = require('puppeteer');

// Usage: node shot.cjs [port] [pageNums...] — screenshots .page elements (1-based)
const PORT = process.argv[2] || '5199';
const NUMS = process.argv.slice(3).map(Number);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 1.5 });
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  const pages = await page.$$('.page');
  console.log(`Found ${pages.length} pages`);
  for (const n of NUMS) {
    if (!pages[n - 1]) { console.log(`page ${n} missing`); continue; }
    const f = path.join(__dirname, `shot-page-${String(n).padStart(2, '0')}.png`);
    await pages[n - 1].screenshot({ path: f, type: 'png' });
    console.log(`saved ${f}`);
  }
  await browser.close();
})();
