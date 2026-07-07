/* Compress public/photos JPEGs in place: downscale to ≤1600px wide and
   re-encode JPEG q0.84 via a puppeteer canvas (sharp/ImageMagick aren't on
   this PC; the canvas re-encode also strips any embedded ICC profile).
   Originals are backed up in frame/.photos-backup. Per VECTOR-PDF-FIXES /
   RENDER-PIPELINE.md §0.  Usage: node scripts/compress-photos.cjs          */
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const DIR = path.resolve(__dirname, '..', 'public', 'photos')
const MAXW = 1600
const Q = 0.84

;(async () => {
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g)$/i.test(f))
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  let before = 0
  let after = 0
  for (const f of files) {
    const fp = path.join(DIR, f)
    const buf = fs.readFileSync(fp)
    const dataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`
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
    const outBuf = Buffer.from(out.split(',')[1], 'base64')
    // Only write if we actually saved bytes.
    if (outBuf.length < buf.length) {
      fs.writeFileSync(fp, outBuf)
      after += outBuf.length
    } else {
      after += buf.length
    }
    before += buf.length
    console.log(`${f}: ${(buf.length / 1048576).toFixed(1)} → ${(Math.min(outBuf.length, buf.length) / 1048576).toFixed(2)} MB`)
  }
  await browser.close()
  console.log(`TOTAL: ${(before / 1048576).toFixed(1)} → ${(after / 1048576).toFixed(1)} MB`)
})()
