/* Rasterize-and-recompose a flyer PDF to shrink it (poppler pdftoppm + puppeteer).
   Usage: node compress.cjs <in.pdf> <out.pdf> [dpi] [quality] */
const fs = require('fs'); const os = require('os'); const path = require('path');
const { execSync } = require('child_process'); const puppeteer = require('puppeteer');
const IN = process.argv[2], OUT = process.argv[3], DPI = process.argv[4] || '185', Q = process.argv[5] || '88';
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'flyc-'));
(async () => {
  execSync(`pdftoppm -jpeg -r ${DPI} -jpegopt quality=${Q} "${IN}" "${path.join(TMP, 'p')}"`);
  const files = fs.readdirSync(TMP).filter(f => f.endsWith('.jpg')).sort().map(f => path.join(TMP, f));
  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const imgTags = files.map(f => `<div class="pp"><img src="file://${f}"/></div>`).join('');
  const htmlPath = path.join(TMP, 'i.html');
  fs.writeFileSync(htmlPath, `<html><style>*{margin:0;padding:0}@page{size:11in 8.5in;margin:0}.pp{width:11in;height:8.5in;page-break-after:always;display:flex;align-items:center;justify-content:center;background:#fff}.pp:last-child{page-break-after:auto}.pp img{width:100%;height:100%;object-fit:contain}</style><body>${imgTags}</body></html>`);
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.pdf({ path: OUT, width: '11in', height: '8.5in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close(); fs.rmSync(TMP, { recursive: true, force: true });
  const mb = (p) => (fs.statSync(p).size / 1e6).toFixed(1);
  console.log(`${path.basename(OUT)}: ${mb(IN)}MB -> ${mb(OUT)}MB`);
})();
