#!/usr/bin/env node
/* ═══════════ CONTAINER SYNC ═══════════
   The BOV and the OM are two products that share one container. This script
   is what keeps that true: it diffs every container file against the OM
   frame and reports drift, so an improvement made in either product can be
   ported by copying rather than re-implementing.

   Usage:
     node scripts/container-sync.mjs --check          report drift
     node scripts/container-sync.mjs --pull <file>    take the frame's version
     node scripts/container-sync.mjs --list           show the file map
     node scripts/container-sync.mjs --ports          list pending ports

   A container file may legitimately change HERE first. When it does, a patch
   goes in container-ports/ (see its README) and this tool reports the file
   as a pending port rather than as drift — the change is tracked, and the
   frame's owner applies it on their side. Nothing here ever writes to the
   frame.

   The frame's location defaults to a sibling checkout; override with
   BOV_FRAME_DIR=/path/to/npcgstudio/frame.

   Exit codes: 0 clean · 4 drift in a file that should be identical
               (deliberately distinct from a crash, like layout-check.mjs) */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FRAME =
  process.env.BOV_FRAME_DIR ?? resolve(root, '..', '..', 'NPCGBackend', 'npcgstudio', 'frame')

/* ── THE FILE MAP ────────────────────────────────────────────────────────
   'identical'  must match the frame byte for byte. Drift here is a bug:
                either port the change back, or promote the file to 'diff'
                with the reason written down.
   'diff'       shared design, deliberate product deltas. Every delta is
                listed; anything else in the diff is drift worth a look. */
const TRACKED = [
  { file: 'scripts/layout-check.mjs', mode: 'identical' },
  { file: 'scripts/shot.mjs', mode: 'identical' },
  { file: 'scripts/print.mjs', mode: 'identical' },
  { file: 'tsconfig.json', mode: 'identical' },
  {
    file: 'src/components/Shell.tsx',
    mode: 'diff',
    deltas: [
      'Md() takes an `as` tag — BOV prose lands in headings and table cells, not just <p>',
      'FOOTER_DESCRIPTOR falls back to DEAL.type; the BOV has no cover content module',
      'imports src/data/deal.ts (BOV deal shape) rather than the frame\'s deal.ts + cover content',
    ],
  },
  {
    file: 'src/App.tsx',
    mode: 'diff',
    deltas: [
      'pageFor() switches over BovPageType — the BOV\'s pages, not the OM\'s',
      'NO runtime document.title: scripts/qa-shots.cjs proves it is rendering THIS deck by comparing page.title() against dist/index.html',
      'carries the DRAFT watermark class on .om-container',
    ],
  },
  {
    file: 'src/lib/types.ts',
    mode: 'diff',
    deltas: [
      'ManifestEntry is the shared contract — keep it field-for-field with the frame',
      'everything else is BOV product data (valuation, assessor, taxes, as-given, comps)',
    ],
  },
  {
    file: 'src/styles/index.css',
    mode: 'diff',
    deltas: [
      'blocks marked ═══ CONTAINER ═══ are shared; the rest is BOV page vocabulary',
      'brand values live in tokens.css, which is product and never synced',
    ],
  },
  {
    file: 'vite.config.ts',
    mode: 'diff',
    deltas: [
      'manifest emit evaluates the module with rolldown (Vite 8 ships no esbuild) — the BOV manifest is computed from FORMAT, so the frame\'s JSON fast path cannot apply',
      'base reads BOV_BASE; dev server on 5181 so a BOV and an OM can run side by side',
    ],
  },
]

/* Product files, listed so the boundary is visible in the report. These are
   never synced — the BOV's own pages, data, prose and type ramp. */
const PRODUCT = [
  'src/styles/tokens.css   the dense analyst ramp (9px body / 21px title)',
  'src/data/**             deal data + the computed manifest',
  'src/content/**          authored prose modules',
  'src/components/pages/** the BOV\'s pages',
  'src/lib/calc.ts         BOV financial math',
  'export.cjs, print.cjs   the rasterized anti-scrape export',
]

const args = process.argv.slice(2)
const mode = args.find((a) => a.startsWith('--')) ?? '--check'

if (!existsSync(FRAME)) {
  console.error(`frame not found at ${FRAME}`)
  console.error('Set BOV_FRAME_DIR to the OM frame checkout.')
  process.exit(1)
}

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)

/* Pending ports, read from container-ports/*.patch. A patch's `+++ b/<path>`
   line names the container file it covers, so the directory itself is the
   index — no second list to keep in sync. */
function pendingPorts() {
  const dir = join(root, 'container-ports')
  if (!existsSync(dir)) return new Map()
  const out = new Map()
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.patch')).sort()) {
    const body = readFileSync(join(dir, name), 'utf8')
    for (const m of body.matchAll(/^\+\+\+ b\/(.+)$/gm)) {
      const file = m[1].trim()
      if (!out.has(file)) out.set(file, [])
      out.get(file).push(name)
    }
  }
  return out
}
const PORTS = pendingPorts()

/** Line-level diff summary — enough to see drift without a diff library. */
function compare(rel) {
  const ours = read(join(root, rel))
  const theirs = read(join(FRAME, rel))
  if (ours == null) return { status: 'missing-here' }
  if (theirs == null) return { status: 'missing-in-frame' }
  if (ours === theirs) return { status: 'identical' }
  const a = ours.split('\n')
  const b = theirs.split('\n')
  const setB = new Set(b)
  const setA = new Set(a)
  return {
    status: 'differs',
    onlyHere: a.filter((l) => l.trim() && !setB.has(l)).length,
    onlyFrame: b.filter((l) => l.trim() && !setA.has(l)).length,
  }
}

if (mode === '--pull') {
  const target = args[args.indexOf('--pull') + 1]
  const entry = TRACKED.find((t) => t.file === target)
  if (!entry) {
    console.error(`"${target}" is not a container file. Run --list to see the map.`)
    process.exit(1)
  }
  const src = read(join(FRAME, target))
  if (src == null) {
    console.error(`${target} does not exist in the frame at ${FRAME}`)
    process.exit(1)
  }
  writeFileSync(join(root, target), src)
  console.log(`pulled ${target} from the frame`)
  if (entry.mode === 'diff') {
    console.log('\nThis file carries deliberate BOV deltas — re-apply them:')
    entry.deltas.forEach((d) => console.log(`  · ${d}`))
  }
  process.exit(0)
}

if (mode === '--ports') {
  if (!PORTS.size) {
    console.log('no pending ports — every container file matches the frame.')
    process.exit(0)
  }
  console.log(`pending ports (apply from ${FRAME}):\n`)
  for (const [file, patches] of PORTS) {
    console.log(`  ${file}`)
    for (const patch of patches) {
      console.log(`    patch -p1 < ${join(root, 'container-ports', patch)}`)
    }
  }
  console.log('\nRationale for each is in container-ports/README.md.')
  process.exit(0)
}

if (mode === '--list') {
  console.log(`frame: ${FRAME}\n`)
  console.log('CONTAINER — ported by copying:')
  TRACKED.forEach((t) => console.log(`  ${t.mode === 'identical' ? '=' : '~'} ${t.file}`))
  console.log('\nPRODUCT — never synced:')
  PRODUCT.forEach((p) => console.log(`    ${p}`))
  process.exit(0)
}

// ── --check ──
console.log(`container-sync · frame: ${FRAME}\n`)
let drift = 0
for (const t of TRACKED) {
  const r = compare(t.file)
  if (r.status === 'identical') {
    console.log(`  ✓ ${t.file}`)
  } else if (r.status === 'missing-here') {
    console.log(`  ! ${t.file} — not present in this product`)
    if (t.mode === 'identical') drift++
  } else if (r.status === 'missing-in-frame') {
    console.log(`  · ${t.file} — no counterpart in the frame (BOV-only container file)`)
  } else if (t.mode === 'identical' && PORTS.has(t.file)) {
    console.log(`  → ${t.file} — PENDING PORT: ${r.onlyHere} lines only here, ${r.onlyFrame} only in the frame`)
    for (const patch of PORTS.get(t.file)) {
      console.log(`      container-ports/${patch} — apply it in the frame to close this`)
    }
  } else if (t.mode === 'identical') {
    console.log(`  ✗ ${t.file} — DRIFT: ${r.onlyHere} lines only here, ${r.onlyFrame} only in the frame`)
    console.log(`      write a port (container-ports/README.md), or revert it here.`)
    drift++
  } else {
    console.log(`  ~ ${t.file} — ${r.onlyHere} lines only here, ${r.onlyFrame} only in the frame`)
    t.deltas.forEach((d) => console.log(`      · ${d}`))
  }
}

console.log(`\nproduct files (never synced): ${PRODUCT.length} paths — run --list to see them`)
if (PORTS.size) {
  console.log(`${PORTS.size} pending port(s) waiting to be applied to the frame — run --ports`)
}
if (drift) {
  console.log(`\n${drift} container file(s) drifted from the frame.`)
  process.exit(4)
}
console.log('\ncontainer in sync.')
