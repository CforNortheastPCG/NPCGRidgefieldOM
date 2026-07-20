#!/usr/bin/env node
/* One-off: render a single page of the built book to PDF.
   Usage: node scripts/print-one.mjs <pageId> <out.pdf> [--port 4188] [--bare]
   --bare hides the page header and footer.                              */

import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { PDFDocument, PDFName, PDFArray, PDFDict, PDFRef, PDFStream, PDFNumber } from 'pdf-lib'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(frameDir, 'dist')
const [pageId, outArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const args = process.argv.slice(2)
const port = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : 4188)
const bare = args.includes('--bare')

if (!pageId || !outArg) {
  console.error('usage: print-one.mjs <pageId> <out.pdf>')
  process.exit(2)
}
if (!existsSync(join(distDir, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first')
  process.exit(1)
}

const manifestSrc = readFileSync(join(frameDir, 'src', 'data', 'manifest.ts'), 'utf8')
const manifest = JSON.parse(manifestSrc.slice(manifestSrc.indexOf('= [') + 2, manifestSrc.lastIndexOf(']') + 1))
const idx = manifest.findIndex((e) => e.id === pageId)
if (idx < 0) {
  console.error(`page "${pageId}" not in manifest`)
  process.exit(2)
}
const pageNum = idx + 1

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

const outPath = resolve(outArg)
mkdirSync(dirname(outPath), { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 960, height: 742, deviceScaleFactor: 2 })
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 120_000 })
  await page.evaluate(() => document.fonts.ready)
  if (bare) await page.addStyleTag({ content: '.page-header, .page-footer { display: none !important; }' })
  await page.emulateMediaType('print')
  const pdfBytes = await page.pdf({
    width: '960px',
    height: '742px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: String(pageNum),
    timeout: 240_000,
  })

  /* Colorspace normalize (same pass as print.mjs) — Skia's ICC v4 profiles
     render photos pink in Acrobat/Preview; swap to /Device*.               */
  let outBytes = pdfBytes
  try {
    const doc = await PDFDocument.load(pdfBytes, { updateMetadata: false })
    const ctx = doc.context
    const DEVICE = { 1: PDFName.of('DeviceGray'), 3: PDFName.of('DeviceRGB'), 4: PDFName.of('DeviceCMYK') }
    const iccN = new Map()
    for (const [ref, obj] of ctx.enumerateIndirectObjects()) {
      if (obj instanceof PDFStream) {
        const n = obj.dict.get(PDFName.of('N'))
        if (n instanceof PDFNumber && !obj.dict.has(PDFName.of('Type'))) iccN.set(ref.toString(), n.asNumber())
      }
    }
    const replacementFor = (obj) => {
      if (!(obj instanceof PDFArray) || obj.size() !== 2) return null
      const [tag, ref] = [obj.get(0), obj.get(1)]
      if (!(tag instanceof PDFName && tag.asString() === '/ICCBased')) return null
      if (!(ref instanceof PDFRef)) return null
      return DEVICE[iccN.get(ref.toString())] || DEVICE[3]
    }
    let swapped = 0
    const seen = new Set()
    const walk = (obj) => {
      if (obj instanceof PDFRef) {
        if (seen.has(obj.toString())) return
        seen.add(obj.toString())
        const target = ctx.lookup(obj)
        const rep = replacementFor(target)
        if (rep) { ctx.assign(obj, rep); swapped++; return }
        return walk(target)
      }
      if (obj instanceof PDFStream) return walk(obj.dict)
      if (obj instanceof PDFDict) {
        for (const key of obj.keys()) {
          const val = obj.get(key)
          const rep = replacementFor(val)
          if (rep) { obj.set(key, rep); swapped++ } else walk(val)
        }
      }
      if (obj instanceof PDFArray) {
        for (let i = 0; i < obj.size(); i++) {
          const val = obj.get(i)
          const rep = replacementFor(val)
          if (rep) { obj.set(i, rep); swapped++ } else walk(val)
        }
      }
    }
    for (const [ref] of ctx.enumerateIndirectObjects()) walk(ref)
    console.log(`  colorspace: ${swapped} ICCBased → Device*`)
    outBytes = await doc.save({ useObjectStreams: false })
  } catch (err) {
    console.error(`  ! colorspace pass skipped (${String(err?.message ?? err).slice(0, 120)})`)
  }
  writeFileSync(outPath, outBytes)
  console.log(`wrote ${outPath} (page ${pageNum}: ${pageId})`)
} finally {
  await browser.close()
  server.close()
}
