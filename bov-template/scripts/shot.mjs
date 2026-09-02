#!/usr/bin/env node
/* Screenshot one page of the built book (for vision-assisted formatting
   fixes). Resolves the page id via the injected manifest.

   Usage: node scripts/shot.mjs <pageId> <out.png> [--port 4199]          */

import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(frameDir, 'dist')
const [pageId, outArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const args = process.argv.slice(2)
const port = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : 4199)

if (!pageId || !outArg) {
  console.error('usage: shot.mjs <pageId> <out.png>')
  process.exit(2)
}

/* Prefer the manifest the BUILD emitted: it is produced from the same
   module App.tsx renders from, so it cannot drift from the DOM, and it
   works whether the manifest is a JSON-style literal (the OM frame) or
   computed (the BOV, where FORMAT and ASSET_CLASS select pages). Falls back
   to parsing the source for a tree with no build yet. */
const builtManifest = join(distDir, 'manifest.json')
const manifest = existsSync(builtManifest)
  ? JSON.parse(readFileSync(builtManifest, 'utf8'))
  : (() => {
      const src = readFileSync(join(frameDir, 'src', 'data', 'manifest.ts'), 'utf8')
      return JSON.parse(src.slice(src.indexOf('= [') + 2, src.lastIndexOf(']') + 1))
    })()
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
  // dist may be built with the per-book preview base — strip it.
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(
    /^\/api\/books\/[^/]+\/preview/,
    ''
  )
  let file = join(distDir, urlPath === '/' || urlPath === '' ? 'index.html' : urlPath)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(distDir, 'index.html')
  try {
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(readFileSync(file))
  } catch {
    res.writeHead(404)
    res.end()
  }
})
await new Promise((ok) => server.listen(port, ok))

mkdirSync(dirname(resolve(outArg)), { recursive: true })
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 })
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 120_000 })
  await page.evaluate(() => document.fonts.ready)
  // Prefer the DOM's own id stamp — the positional #p-N anchor skips
  // whenever a manifest entry renders null. Fallback covers old builds.
  const el = (await page.$(`[data-page-id="${pageId}"] .page`)) ?? (await page.$(`#p-${pageNum} .page`))
  if (!el) throw new Error(`page ${pageId} (#p-${pageNum}) not found in the built book`)
  await el.screenshot({ path: resolve(outArg) })
  console.log(`shot ${pageId} (page ${pageNum}) → ${outArg}`)
} finally {
  await browser.close()
  server.close()
}
