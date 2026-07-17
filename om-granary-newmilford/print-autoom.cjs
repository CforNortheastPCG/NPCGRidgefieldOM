#!/usr/bin/env node
/* AutoOM-style vector print (mirrors AutoOMv3 frame/scripts/print.mjs):
   serve dist/ → emulate print media → artifact guard (flag CSS that Skia
   rasterizes into soft-mask groups: the pink/black-box bug in Preview,
   Firefox, Quick Look) → page.pdf() vector render.
   Usage: node print-autoom.cjs [outfile] [--port 4293] */

const { createServer } = require('node:http')
const { readFileSync, existsSync, statSync, writeFileSync } = require('node:fs')
const { resolve, join, extname } = require('node:path')
const puppeteer = require('puppeteer')

const distDir = join(__dirname, 'dist')
const args = process.argv.slice(2)
const outPath = resolve(args.find((a) => !a.startsWith('--')) ?? '29-West-Street-OM-vector.pdf')
const port = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : 4293)

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let file = join(distDir, urlPath === '/' || urlPath === '' ? 'index.html' : urlPath)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(distDir, 'index.html')
  try {
    const body = readFileSync(file)
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
})

;(async () => {
  await new Promise((ok) => server.listen(port, ok))
  console.log(`serving dist/ on :${port}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 960, height: 742, deviceScaleFactor: 2 })
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 120_000 })
    await page.evaluate(() => document.fonts.ready)
    // wait for every image to load & decode — a hung image can't stall > ~12s
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((img) =>
          Promise.race([
            img.complete && img.naturalWidth > 0
              ? img.decode().catch(() => {})
              : new Promise((r) => { img.onload = () => img.decode().then(r, r); img.onerror = r }),
            new Promise((r) => setTimeout(r, 12_000)),
          ])
        )
      )
    )

    const pageCount = await page.$$eval('.page', (els) => els.length)
    console.log(`found ${pageCount} .page elements`)
    await page.emulateMediaType('print')

    /* Artifact guard — computed style under print emulation is exactly what
       Skia sees. Effects with no PDF primitive become soft-mask groups that
       some viewers composite as pink/black boxes. */
    const unsafe = await page.evaluate(() => {
      const out = []
      const seen = new Set()
      for (const el of document.querySelectorAll('.page, .page *')) {
        const cs = getComputedStyle(el)
        const hits = []
        if (cs.textShadow !== 'none') hits.push(`text-shadow: ${cs.textShadow}`)
        if (cs.filter !== 'none') hits.push(`filter: ${cs.filter}`)
        if (cs.backdropFilter && cs.backdropFilter !== 'none') hits.push(`backdrop-filter: ${cs.backdropFilter}`)
        if (cs.mixBlendMode !== 'normal') hits.push(`mix-blend-mode: ${cs.mixBlendMode}`)
        if (cs.boxShadow !== 'none') hits.push(`box-shadow: ${cs.boxShadow}`)
        if (hits.length === 0) continue
        const cls = el.getAttribute('class')
        const sig = `${el.tagName.toLowerCase()}${cls ? '.' + cls.trim().split(/\s+/).join('.') : ''} → ${hits.join('; ')}`
        if (seen.has(sig)) continue
        seen.add(sig)
        out.push(sig)
      }
      return out.slice(0, 20)
    })
    if (unsafe.length > 0) {
      console.error(`! print-unsafe CSS on ${unsafe.length} element type(s) — pink/black-box risk:`)
      for (const line of unsafe) console.error(`  ${line}`)
    } else {
      console.log('print-safe: no rasterizing CSS effects under print media')
    }

    const pdfBytes = await page.pdf({
      width: '960px',
      height: '742px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      timeout: 240_000,
    })
    writeFileSync(outPath, pdfBytes)
    console.log(`PDF saved to ${outPath} · ${(pdfBytes.length / 1e6).toFixed(1)} MB`)
  } finally {
    await browser.close()
    server.close()
  }
})().catch((e) => { console.error(e); process.exit(1) })
