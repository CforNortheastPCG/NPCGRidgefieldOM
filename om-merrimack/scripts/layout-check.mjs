#!/usr/bin/env node
/* ═══════════ DETERMINISTIC LAYOUT / WHITESPACE CHECK ═══════════
   Measures every rendered .page for dead whitespace — the failure mode the
   fact-verify agent can't see. No AI. Geometry only.

   Method: for each page, collect the client rects of everything that paints
   (text runs, images/svg/canvas, elements with a visible background), then
   inside the content area (between the running header and footer) measure:

     - fullGap   largest vertical band with NO content across the full width
     - halfGap   the worse of the same measure computed per horizontal half
                 (catches a one-column desert even when the other column
                 holds photos — the Regional Overview bug)
     - cover     min per-half fraction of content-area height that has any
                 content (low = a mostly-empty column)

   Thresholds are CALIBRATED against om-152-chelsea (the hand-built book
   whose spacing is the standard; see --calibrate) with headroom, so pages
   as tight as the reference pass and deserts fail.

   Usage:
     node scripts/layout-check.mjs [--dist <dir>] [--json] [--calibrate]
                                   [--shots <dir>]   (save per-page PNGs for
                                                      the verify agent's
                                                      visual review)
   Exit codes: 0 clean · 4 findings (deliberately distinct from build fails)
*/

import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const distDir = resolve(args.includes('--dist') ? args[args.indexOf('--dist') + 1] : join(frameDir, 'dist'))
const asJson = args.includes('--json')
const calibrate = args.includes('--calibrate')
const shotsDir = args.includes('--shots') ? resolve(args[args.indexOf('--shots') + 1]) : null
const port = 4231

/* Calibrated on om-152-chelsea (21 pages, 2026-07-05 --calibrate run):
   worst fullGap 82px (Rent Roll), worst halfGap 102px, min cover 0.33
   (Property Overview spec column). ~35% headroom so pages as tight as the
   reference never flag, while the Regional-Overview-style desert (200px+
   column bands) fails clearly. */
const MAX_FULL_GAP = 110
const MAX_HALF_GAP = 145
const MIN_COVER = 0.25

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
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/api\/books\/[^/]+\/preview/, '')
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

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
let pages = []
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1100, height: 900 })
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 120_000 })
  await page.evaluate(() => document.fonts.ready)

  pages = await page.evaluate(() => {
    const out = []
    const els = [...document.querySelectorAll('.page')]
    els.forEach((el, idx) => {
      const pr = el.getBoundingClientRect()
      if (pr.width < 10 || pr.height < 10) return

      // Content area: between running header and footer (when present).
      const header = el.querySelector('.page-header')?.getBoundingClientRect()
      const footer = el.querySelector('.page-footer')?.getBoundingClientRect()
      const top = header ? header.bottom : pr.top
      const bottom = footer ? footer.top : pr.bottom
      const H = bottom - top
      if (H < 100) return

      // Everything that paints.
      const rects = []
      const pushRect = (r) => {
        if (r.width < 2 || r.height < 2) return
        const y0 = Math.max(r.top, top)
        const y1 = Math.min(r.bottom, bottom)
        if (y1 <= y0) return
        rects.push({ x0: r.left - pr.left, x1: r.right - pr.left, y0: y0 - top, y1: y1 - top })
      }
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      let node
      while ((node = walker.nextNode())) {
        if (!node.textContent || !node.textContent.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(node)
        for (const r of range.getClientRects()) pushRect(r)
      }
      for (const e of el.querySelectorAll('img,svg,canvas,video,table')) pushRect(e.getBoundingClientRect())
      for (const e of el.querySelectorAll('*')) {
        const cs = getComputedStyle(e)
        const bg = cs.backgroundColor
        const painted = (bg && !/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)|transparent/.test(bg)) || cs.backgroundImage !== 'none'
        const bordered = ['Left', 'Top', 'Right', 'Bottom'].some((s) => parseFloat(cs[`border${s}Width`]) >= 2)
        if (painted || bordered) pushRect(e.getBoundingClientRect())
      }

      // Largest vertical gap in a horizontal band [bx0,bx1): merge the
      // y-intervals of rects overlapping the band; gaps include the runs
      // from the content-area edges to the first/last content.
      const gapAndCover = (bx0, bx1) => {
        const iv = rects
          .filter((r) => r.x1 > bx0 + 4 && r.x0 < bx1 - 4)
          .map((r) => [r.y0, r.y1])
          .sort((a, b) => a[0] - b[0])
        if (iv.length === 0) return { gap: H, cover: 0 }
        const merged = [iv[0].slice()]
        for (const [a, b] of iv.slice(1)) {
          const last = merged[merged.length - 1]
          if (a <= last[1] + 2) last[1] = Math.max(last[1], b)
          else merged.push([a, b])
        }
        let gap = merged[0][0] // leading gap
        for (let i = 1; i < merged.length; i++) gap = Math.max(gap, merged[i][0] - merged[i - 1][1])
        gap = Math.max(gap, H - merged[merged.length - 1][1]) // trailing gap
        const covered = merged.reduce((s, [a, b]) => s + (b - a), 0)
        return { gap: Math.round(gap), cover: +(covered / H).toFixed(2) }
      }

      const W = pr.width
      const full = gapAndCover(0, W)
      const left = gapAndCover(0, W / 2)
      const right = gapAndCover(W / 2, W)

      const titleEl = el.querySelector('.section-title, .cover-hero-name, .divider-title, h1, h2')
      out.push({
        index: idx + 1,
        title: (titleEl?.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60) || `page ${idx + 1}`,
        fullGap: full.gap,
        halfGap: Math.max(left.gap, right.gap),
        leftGap: left.gap,
        rightGap: right.gap,
        cover: Math.min(left.cover, right.cover),
        height: Math.round(H),
      })
    })
    return out
  })

  if (shotsDir) {
    mkdirSync(shotsDir, { recursive: true })
    const els = await page.$$('.page')
    for (let i = 0; i < els.length; i++) {
      await els[i].screenshot({ path: join(shotsDir, `page-${String(i + 1).padStart(2, '0')}.png`) })
    }
    console.error(`saved ${els.length} page screenshots → ${shotsDir}`)
  }
} finally {
  await browser.close()
  server.close()
}

if (calibrate) {
  for (const p of pages) {
    console.log(
      `p${String(p.index).padStart(2)}  full ${String(p.fullGap).padStart(4)}  half ${String(p.halfGap).padStart(4)} (L ${p.leftGap} / R ${p.rightGap})  cover ${p.cover}  · ${p.title}`
    )
  }
  const worst = (k) => Math.max(...pages.map((p) => p[k]))
  console.log(`\nworst fullGap ${worst('fullGap')} · worst halfGap ${worst('halfGap')} · min cover ${Math.min(...pages.map((p) => p.cover))}`)
  process.exit(0)
}

const findings = []
for (const p of pages) {
  if (p.fullGap > MAX_FULL_GAP) {
    findings.push({
      page: p.index,
      title: p.title,
      kind: 'layout',
      note: `full-width dead band of ~${p.fullGap}px (reference max ${MAX_FULL_GAP}px) — content likely not filling the page`,
    })
  } else if (p.halfGap > MAX_HALF_GAP) {
    findings.push({
      page: p.index,
      title: p.title,
      kind: 'layout',
      note: `~${p.halfGap}px empty band in the ${p.leftGap >= p.rightGap ? 'left' : 'right'} column (reference max ${MAX_HALF_GAP}px) — column desert`,
    })
  }
  if (p.cover < MIN_COVER) {
    findings.push({
      page: p.index,
      title: p.title,
      kind: 'layout',
      note: `a column is only ${Math.round(p.cover * 100)}% filled (reference min ${Math.round(MIN_COVER * 100)}%) — likely missing photos or truncated content`,
    })
  }
}

if (asJson) {
  console.log(JSON.stringify({ pages, findings }, null, 1))
} else {
  if (findings.length === 0) console.log(`layout check: ${pages.length} pages clean (standard: om-152-chelsea)`)
  for (const f of findings) console.log(`  ! p${f.page} ${f.title}: ${f.note}`)
}
process.exit(findings.length > 0 ? 4 : 0)
