/* Screenshot a local HTML file. Usage: node shot.cjs <file.html> <out.png> <width> <height> */
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer'));

(async () => {
  const [file, out, w, h, dsf] = process.argv.slice(2);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: parseInt(w || '1600'), height: parseInt(h || '1200'), deviceScaleFactor: parseFloat(dsf || '1') });
  await page.goto('file:///' + path.resolve(file).replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: out, fullPage: false });
  await browser.close();
  console.log('shot -> ' + out);
})();
