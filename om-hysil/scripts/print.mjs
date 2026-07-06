#!/usr/bin/env node
/* ═══════════ VECTOR PDF PRINT ═══════════
   Serves the built dist/ on a local port and renders it with Puppeteer's
   page.pdf() under print media — vector output, photos pass through as
   JPEG (no CSS filters, see index.css print notes).

   Usage: node scripts/print.mjs [outPath] [--port 4173]                 */

import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { PDFDocument } from 'pdf-lib'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(frameDir, 'dist')
const args = process.argv.slice(2)
const outPath = resolve(args.find((a) => !a.startsWith('--')) ?? join(frameDir, 'out', 'om.pdf'))
const port = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : 4173)

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  // dist may be built with the per-book preview base — strip it so the
  // same build serves locally for printing.
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(
    /^\/api\/books\/[^/]+\/preview/,
    ''
  )
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

await new Promise((ok) => server.listen(port, ok))
console.log(`serving dist/ on :${port}`)

const { mkdirSync } = await import('node:fs')
mkdirSync(dirname(outPath), { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 960, height: 742, deviceScaleFactor: 2 })
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 120_000 })
  // Give webfonts a beat to settle before measuring pages.
  await page.evaluate(() => document.fonts.ready)

  const pageCount = await page.$$eval('.page', (els) => els.length)
  await page.emulateMediaType('print')
  const pdfBytes = await page.pdf({
    width: '960px',
    height: '742px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    timeout: 240_000,
  })

  /* Bake real document metadata (Chromium only carries document.title and
     stamps its UA as Author/Creator). Deal facts come from the injected
     payload.json; degrade to the Chromium output if anything is missing. */
  let outBytes = pdfBytes
  try {
    const { deal } = JSON.parse(readFileSync(join(frameDir, 'payload.json'), 'utf8'))
    const title =
      deal.name && deal.name !== deal.address
        ? `${deal.name}, ${deal.address} — ${deal.cityState} · Offering Memorandum`
        : `${deal.address} — ${deal.cityState} · Offering Memorandum`
    const doc = await PDFDocument.load(pdfBytes, { updateMetadata: false })
    doc.setTitle(title)
    doc.setAuthor('NorthEast Private Client Group')
    doc.setSubject(`Offering Memorandum — ${deal.address}, ${deal.cityState} (${deal.status ?? 'For Sale'})`)
    doc.setKeywords([deal.name, deal.cityState, deal.propertyType, 'offering memorandum', 'commercial real estate'].filter(Boolean))
    doc.setCreator('AutoOM v3')
    doc.setProducer('AutoOM v3 (Chromium vector print)')
    const now = new Date()
    doc.setCreationDate(now)
    doc.setModificationDate(now)
    outBytes = await doc.save()
    console.log(`metadata: "${title}"`)
  } catch (err) {
    console.error(`  ! metadata pass skipped (${String(err?.message ?? err).slice(0, 120)})`)
  }
  writeFileSync(outPath, outBytes)
  console.log(`wrote ${outPath} (${pageCount} pages)`)
} finally {
  await browser.close()
  server.close()
}
