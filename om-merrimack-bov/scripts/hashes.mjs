#!/usr/bin/env node
/* ═══════════ PROTECTED-FILE HASH CHECK ═══════════
   The backstop behind the permission guard: snapshot a SHA-256 manifest
   of every frame file EXCEPT the agent-writable content modules before
   an agent run; verify after. Any change, deletion, or NEW file outside
   the allowlist fails the job. One rule (the inverse of the guard's
   allowlist), so the two can't drift.

   Usage:
     node scripts/hashes.mjs snapshot [outFile]     (default: out/hashes.json)
     node scripts/hashes.mjs verify  [manifestFile]  → exit 1 on violation  */

import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const SKIP_DIRS = new Set(['node_modules', 'dist', 'out', '.git', '.vite'])
// The ONE allowlist rule — must mirror guard.mjs CONTENT_RE.
const ALLOW_RE = /^src\/content\/(?!types\.ts$)(?!index\.ts$)[\w-]+\.content\.ts$/
// Written by the deterministic tweak job between agent runs (never by the
// agent — guard still denies it); excluded from the mutation check.
const PIPELINE_FILES = new Set(['src/data/tweaks.ts'])

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) yield* walk(full)
    } else {
      yield full
    }
  }
}

export function computeManifest(root = frameDir) {
  const manifest = {}
  for (const file of walk(root)) {
    const rel = relative(root, file).split(sep).join('/')
    if (ALLOW_RE.test(rel) || PIPELINE_FILES.has(rel)) continue
    manifest[rel] = createHash('sha256').update(readFileSync(file)).digest('hex')
  }
  return manifest
}

/** @returns {{ ok: boolean, changed: string[], added: string[], removed: string[] }} */
export function diffManifests(pre, post) {
  const changed = []
  const removed = []
  for (const [file, hash] of Object.entries(pre)) {
    if (!(file in post)) removed.push(file)
    else if (post[file] !== hash) changed.push(file)
  }
  const added = Object.keys(post).filter((f) => !(f in pre))
  return { ok: changed.length + added.length + removed.length === 0, changed, added, removed }
}

/* CLI — only when executed directly, not when imported by the harness. */
import { pathToFileURL } from 'node:url'
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
const [, , cmd, arg] = isMain ? process.argv : []
if (cmd === 'snapshot') {
  const out = resolve(arg ?? join(frameDir, 'out', 'hashes.json'))
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(computeManifest(), null, 1))
  console.log(`snapshot: ${Object.keys(computeManifest()).length} protected files → ${out}`)
} else if (cmd === 'verify') {
  const file = resolve(arg ?? join(frameDir, 'out', 'hashes.json'))
  const pre = JSON.parse(readFileSync(file, 'utf8'))
  const result = diffManifests(pre, computeManifest())
  if (result.ok) {
    console.log('hash check OK — no protected files touched')
  } else {
    console.error('HASH CHECK FAILED — protected files mutated:')
    for (const f of result.changed) console.error(`  changed: ${f}`)
    for (const f of result.added) console.error(`  added:   ${f}`)
    for (const f of result.removed) console.error(`  removed: ${f}`)
    process.exit(1)
  }
} else if (cmd) {
  console.error('usage: hashes.mjs snapshot|verify [file]')
  process.exit(2)
}
