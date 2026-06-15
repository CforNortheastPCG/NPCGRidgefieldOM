const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map(i => i.complete ? i.decode().catch(()=>{}) : new Promise(r=>{i.onload=i.onerror=r})));
  });
  await new Promise(r => setTimeout(r, 800));
  const handle = await page.evaluateHandle(() => {
    const img = Array.from(document.images).find(i => i.src.includes('exec-aerial-1'));
    return img.closest('.page');
  });
  await handle.asElement().scrollIntoView();
  await handle.asElement().screenshot({ path: 'C:/NPCGRidgefieldOM/om-ridgefield/_exec-check.png' });
  await browser.close();
  console.log('shot saved');
})();
