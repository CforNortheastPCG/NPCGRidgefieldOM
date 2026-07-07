/* Compress a 2-side flyer by re-encoding its PNGs as JPEG (q92) in a canvas,
   then composing an 11x8.5 landscape PDF. Replaces the pdftoppm pipeline on
   machines without poppler. Usage: node compress-canvas.cjs <front.png> <back.png> <out.pdf> [quality] */
const fs = require('fs'), os = require('os'), path = require('path');
const puppeteer = require('puppeteer');
const [FRONT, BACK, OUT] = process.argv.slice(2);
const Q = Number(process.argv[5] || '0.92');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'flyc-'));
const b64 = (f) => fs.readFileSync(f).toString('base64');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const toJpeg = async (pngFile) => {
    const dataUrl = `data:image/png;base64,${b64(pngFile)}`;
    return page.evaluate(async (src, q) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      return c.toDataURL('image/jpeg', q);
    }, dataUrl, Q);
  };
  const jpgs = [];
  for (const f of [FRONT, BACK]) jpgs.push(await toJpeg(f));
  const imgTags = jpgs.map((d) => `<div class="pp"><img src="${d}"/></div>`).join('');
  const htmlPath = path.join(TMP, 'i.html');
  fs.writeFileSync(htmlPath, `<html><style>*{margin:0;padding:0}@page{size:11in 8.5in;margin:0}.pp{width:11in;height:8.5in;page-break-after:always;display:flex;align-items:center;justify-content:center;background:#fff}.pp:last-child{page-break-after:auto}.pp img{width:100%;height:100%;object-fit:contain}</style><body>${imgTags}</body></html>`);
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.pdf({ path: OUT, width: '11in', height: '8.5in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close(); fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`${path.basename(OUT)}: ${(fs.statSync(OUT).size / 1e6).toFixed(1)}MB`);
})();
