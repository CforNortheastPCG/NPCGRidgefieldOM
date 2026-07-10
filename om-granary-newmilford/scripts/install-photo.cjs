/* Install a source JPEG into public/photos as <destName>, downscaled to
   ≤1600px wide and re-encoded JPEG q0.84 via a puppeteer canvas (sharp /
   ImageMagick aren't on this PC; the canvas re-encode also strips any
   embedded ICC profile). Per RENDER-PIPELINE.md §0.

   Usage: node scripts/install-photo.cjs "<abs source path>" <destName.jpg>   */
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const [, , SRC, DEST] = process.argv
if (!SRC || !DEST) {
  console.error('Usage: node scripts/install-photo.cjs "<source>" <destName.jpg>')
  process.exit(1)
}
const OUT = path.resolve(__dirname, '..', 'public', 'photos', DEST)
const MAXW = 1600
const Q = 0.84

;(async () => {
  const buf = fs.readFileSync(SRC)
  const dataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const out = await page.evaluate(
    async (src, maxw, q) => {
      const img = new Image()
      await new Promise((res, rej) => {
        img.onload = res
        img.onerror = rej
        img.src = src
      })
      const scale = Math.min(1, maxw / img.naturalWidth)
      const w = Math.round(img.naturalWidth * scale)
      const h = Math.round(img.naturalHeight * scale)
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, w, h)
      return c.toDataURL('image/jpeg', q)
    },
    dataUrl,
    MAXW,
    Q
  )
  await browser.close()
  const outBuf = Buffer.from(out.split(',')[1], 'base64')
  fs.writeFileSync(OUT, outBuf)
  console.log(`${DEST}: ${(buf.length / 1048576).toFixed(1)} → ${(outBuf.length / 1048576).toFixed(2)} MB`)
})()
