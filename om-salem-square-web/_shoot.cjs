const http = require('http'), fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer');
const ROOT = path.join(process.cwd(), 'dist');
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(ROOT, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(ROOT, 'index.html');
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(4178, r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4178', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { await Promise.all(Array.from(document.images).map(i => i.complete && i.naturalWidth ? i.decode().catch(()=>{}) : new Promise(r => { i.onload = i.onerror = r; }))); });
  const el = (await page.$$('.page'))[4]; // 5th page = Investment Highlights
  await el.screenshot({ path: '/tmp/highlights.png' });
  await browser.close(); server.close();
  console.log('shot saved');
})().catch(e => { console.error(e); process.exit(1); });
