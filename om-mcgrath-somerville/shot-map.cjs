const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: 1100, height: 800, deviceScaleFactor: 2 });
  await p.goto('http://localhost:5191/', { waitUntil: 'networkidle0', timeout: 60000 });
  const handles = await p.$$('.page');
  let target = null;
  for (const h of handles) {
    const t = await p.evaluate(el => el.innerText, h);
    if (t.includes('Subject Property') && t.includes('Amenities')) { target = h; break; }
  }
  if (!target) { console.log('not found'); await b.close(); return; }
  await target.screenshot({ path: 'C:/Users/CAMERO~1/AppData/Local/Temp/map-page.png' });
  console.log('shot taken');
  await b.close();
})();
