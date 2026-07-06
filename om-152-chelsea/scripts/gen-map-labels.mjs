/* Bakes a TRANSPARENT labels+highways overlay for the Drive Times map.

   Google Static Maps only returns opaque PNGs, so a multiply blend was the only
   way to put labels "over" the rings — but blended lines still bleed through the
   text. Instead we fetch a white-background labels layer and chroma-key the
   white to transparent, leaving only opaque town labels, highway shields, and
   highway lines. The component then composites this normally ON TOP of the
   rings, so the rings are fully covered where labels/roads are.

   Static asset tied to the map's CENTER/ZOOM/size — re-run if those change:
     npm run map-labels
   (Requires VITE_GOOGLE_MAPS_API_KEY + puppeteer.) */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer'

const KEY = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .match(/VITE_GOOGLE_MAPS_API_KEY=(\S+)/)[1].trim()

const CENTER = { lat: 42.40, lng: -71.25 }, ZOOM = 8, W = 640, H = 460

// Labels + highways on a pure-white field (everything else white so it keys out).
const LABELS_STYLE = [
  'feature:poi|visibility:off',
  'feature:landscape|color:0xffffff',
  'feature:water|color:0xffffff',
  'feature:administrative|element:geometry|visibility:off',
  'feature:road.arterial|element:geometry|color:0xffffff',
  'feature:road.arterial|element:labels|visibility:off',
  'feature:road.highway|element:geometry.fill|color:0xF4A93C',
  'feature:road.highway|element:geometry.stroke|color:0xC9781A',
  'feature:road.highway|element:labels|visibility:on',
  'feature:administrative.locality|element:labels|visibility:on',
  'feature:administrative.province|element:labels|visibility:on',
]
const url = `https://maps.googleapis.com/maps/api/staticmap?size=${W}x${H}&scale=2&maptype=roadmap&format=png`
  + `&center=${CENTER.lat},${CENTER.lng}&zoom=${ZOOM}`
  + `&${LABELS_STYLE.map(s => 'style=' + encodeURIComponent(s)).join('&')}&key=${KEY}`

console.log('Fetching labels layer…')
const res = await fetch(url)
if (!res.ok) throw new Error(`Static Maps ${res.status} — ${(await res.text()).slice(0, 200)}`)
const dataIn = 'data:image/png;base64,' + Buffer.from(await res.arrayBuffer()).toString('base64')

const browser = await puppeteer.launch()
const page = await browser.newPage()
const dataOut = await page.evaluate(async (src) => {
  const img = new Image()
  await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = src })
  const c = document.createElement('canvas')
  c.width = img.naturalWidth; c.height = img.naturalHeight
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, c.width, c.height), a = im.data
  for (let i = 0; i < a.length; i += 4) {
    const m = Math.min(a[i], a[i + 1], a[i + 2])
    if (m >= 236) a[i + 3] = 0                                   // white field → clear
    else if (m >= 206) a[i + 3] = Math.round(255 * (236 - m) / 30) // soft edge
  }
  ctx.putImageData(im, 0, 0)
  return c.toDataURL('image/png')
}, dataIn)
await browser.close()

mkdirSync(new URL('../public/photos/maps/', import.meta.url), { recursive: true })
const out = new URL('../public/photos/maps/drivetime-labels.png', import.meta.url)
writeFileSync(out, Buffer.from(dataOut.split(',')[1], 'base64'))
console.log('Wrote public/photos/maps/drivetime-labels.png')
