import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

/* ═══ CONTAINER (adapted) ═══ npcgstudio/frame/vite.config.ts
   Every build ships dist/manifest.json derived from src/data/manifest.ts —
   the SAME module App.tsx renders from, so any tool that reasons about page
   order (shot.mjs, layout-check.mjs, the exporters) can never drift from
   the built DOM.

   Product difference from the OM frame: the BOV's manifest is COMPUTED
   (deal.ts FORMAT selects short vs full, and pages drop when their source
   data is null), so it is never a JSON literal. The frame's fast
   JSON.parse path can't apply here — we always evaluate the module. */
function emitManifest(): Plugin {
  return {
    name: 'bov-emit-manifest',
    apply: 'build',
    // closeBundle runs after vite's public/ copy, so a stale
    // public/manifest.json is overwritten rather than winning.
    async closeBundle() {
      const file = join(rootDir, 'src', 'data', 'manifest.ts')
      // Rolldown, not esbuild: Vite 8 ships the Rolldown bundler and no
      // esbuild, so the frame's esbuild path would silently emit nothing.
      const { rolldown } = await import('rolldown')
      const bundle = await rolldown({ input: file, platform: 'neutral', logLevel: 'silent' })
      const { output } = await bundle.generate({ format: 'esm' })
      const code = output[0]?.code
      if (!code) throw new Error('src/data/manifest.ts produced no output — cannot emit dist/manifest.json')
      const mod = (await import(
        `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
      )) as { MANIFEST?: unknown }
      const manifest = mod.MANIFEST
      if (!Array.isArray(manifest) || manifest.length === 0) {
        throw new Error('src/data/manifest.ts evaluated empty — refusing to ship a blank manifest.json')
      }
      mkdirSync(join(rootDir, 'dist'), { recursive: true })
      writeFileSync(join(rootDir, 'dist', 'manifest.json'), JSON.stringify(manifest, null, 1))
      console.log(`  dist/manifest.json  ${manifest.length} pages`)
    },
  }
}

export default defineConfig({
  plugins: [react(), emitManifest()],
  // Books served under a path prefix (a preview route) set this so asset
  // URLs resolve there; assetUrl() in Shell.tsx reads the same base.
  base: process.env.BOV_BASE ?? process.env.AUTOOM_BASE ?? '/',
  // 5181 — the OM frame owns 5180; a BOV and an OM often run side by side.
  server: { port: 5181 },
  build: { chunkSizeWarningLimit: 1200 },
})
