/* Crop the bottom off the RISE floor-plan JPEGs (removes the "Total: X sq. ft"
   summary + Cubicasa disclaimer + RISE logo strip), downscale to <=1600px wide,
   and install into public/photos/floorplans as <destName>. Adapted from
   install-photo.cjs (no sharp / ImageMagick on this PC -> puppeteer canvas).

   Usage: node scripts/crop-floorplans.cjs   (paths hard-coded below) */
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const SRC_DIR = 'C:\\Users\\CameronFormica\\NPCG Dropbox\\Listings\\LISTINGS - CT\\NEW MILFORD - The Granary\\2026\\Property Photos\\Floorplans'
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'photos', 'floorplans')
const MAXW = 1600
const Q = 0.9
const CROP_BOTTOM = 0.11 // fraction of height to trim off the bottom (SF text)

// source file -> installed name
const MAP = [
  ['all_floors_29_west_street_103_new_milford_with_dim.jpg', 'fp-103.jpg'],
  ['1st_floor_29_west_street_105_new_milford_with_dim.jpg', 'fp-105-1.jpg'],
  ['2nd_floor_29_west_street_105_new_milford_with_dim.jpg', 'fp-105-2.jpg'],
  ['all_floors_29_west_street_105_new_milford_with_dim.jpg', 'fp-105.jpg'],
  ['all_floors_29_west_street_202_new_milford_with_dim.jpg', 'fp-202.jpg'],
  ['all_floors_29_west_street_204_new_milford_with_dim.jpg', 'fp-204.jpg'],
]

;(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  for (const [srcName, destName] of MAP) {
    const src = path.join(SRC_DIR, srcName)
    if (!fs.existsSync(src)) { console.error('MISSING', srcName); continue }
    const buf = fs.readFileSync(src)
    const dataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`
    const out = await page.evaluate(
      async (src, maxw, q, cropBottom) => {
        const img = new Image()
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src })
        const srcH = Math.round(img.naturalHeight * (1 - cropBottom)) // keep top portion
        const scale = Math.min(1, maxw / img.naturalWidth)
        const w = Math.round(img.naturalWidth * scale)
        const h = Math.round(srcH * scale)
        const c = document.createElement('canvas')
        c.width = w; c.height = h
        const ctx = c.getContext('2d')
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        // draw only the top (1-cropBottom) slice of the source, scaled to fit
        ctx.drawImage(img, 0, 0, img.naturalWidth, srcH, 0, 0, w, h)
        return c.toDataURL('image/jpeg', q)
      },
      dataUrl, MAXW, Q, CROP_BOTTOM
    )
    const outBuf = Buffer.from(out.split(',')[1], 'base64')
    fs.writeFileSync(path.join(OUT_DIR, destName), outBuf)
    console.log(`${destName}: ${(buf.length / 1048576).toFixed(2)} -> ${(outBuf.length / 1048576).toFixed(2)} MB`)
  }
  await browser.close()
})()
