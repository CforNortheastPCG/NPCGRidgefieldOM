/* Screenshot one .page by index (0-based) from the running dev server.
   Usage: node scripts/shot-page.cjs <pageIndex> <outPath> [port] */
const puppeteer = require('puppeteer')
const [, , IDX = '0', OUT = 'C:/Users/CAMERO~1/AppData/Local/Temp/claude/page.png', PORT = '5173'] = process.argv
;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 })
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r }))))
  })
  await new Promise((r) => setTimeout(r, 600))
  const el = await page.evaluateHandle((idx) => document.querySelectorAll('.page')[idx], Number(IDX))
  await el.asElement().scrollIntoView()
  await el.asElement().screenshot({ path: OUT })
  await browser.close()
  console.log('shot saved:', OUT)
})()
