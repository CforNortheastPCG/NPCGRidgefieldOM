import { zipSync, strToU8 } from 'fflate'

/* ═══════════════════ EXPORT AS STANDALONE PROJECT ═══════════════════
   Bundles the current deal + the real OM components into a downloadable Vite/
   React project, so a deal can be hand-tuned page-by-page ("fine motor control")
   and printed to PDF independent of the generator.

   The OM component source is pulled in at build time via import.meta.glob(raw),
   so the export always matches the live renderer. Images in the deal (cover, map,
   amenities, uploaded photos) are data URLs, so the export is self-contained. */

// All OM component/source files, as raw text (keys like './om/OmDeck.jsx').
const OM_SOURCES = import.meta.glob('./om/**/*.{jsx,js,css}', { query: '?raw', import: 'default', eager: true })

const PKG = {
  name: 'om-export',
  private: true,
  version: '1.0.0',
  type: 'module',
  scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
  dependencies: {
    react: '^19.2.6',
    'react-dom': '^19.2.6',
    'd3-geo': '^3.1.1',
    'topojson-client': '^3.1.0',
    'us-atlas': '^3.0.1',
  },
  devDependencies: { '@vitejs/plugin-react': '^6.0.1', vite: '^8.0.12' },
}

const VITE_CONFIG = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
`

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NPCG OM</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`

const MAIN_JSX = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './print.css'
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
`

const APP_JSX = `import OmDeck from './om/OmDeck.jsx'
import { deal } from './deal.js'

/* Hand-tune this deal: edit deal.js for data, or the components in src/om/ for
   layout. \`npm run dev\` to preview, then print to PDF (landscape, no margins —
   the @page rule in print.css already sets that up). */
export default function App() {
  return (
    <div style={{ background: '#ece7e1', minHeight: '100vh', padding: 24 }}>
      <OmDeck deal={deal} />
    </div>
  )
}
`

const PRINT_CSS = `body { margin: 0; font-family: 'Montserrat','Segoe UI',sans-serif; -webkit-font-smoothing: antialiased; }
.om-container { margin: 0 auto; }
@media print {
  @page { size: 11in 8.5in; margin: 0; }
  body { background: #fff; padding: 0 !important; }
  body > div { padding: 0 !important; background: #fff !important; }
  .page { box-shadow: none !important; page-break-after: always; break-after: page; }
  .page:last-child { page-break-after: auto; break-after: auto; }
}
`

const README = `# NPCG OM — exported project

A standalone copy of one offering memorandum for hand-tuning ("fine motor control").

\`\`\`bash
npm install
npm run dev      # preview at the printed URL
\`\`\`

- **Data** lives in \`src/deal.js\` — edit any field there.
- **Layout** lives in \`src/om/\` (the real OM components). \`OmDeck.jsx\` is the
  page order; each page is a component in that folder.
- Images (cover, map, amenities, uploaded photos) are embedded as data URLs, so
  this project is self-contained.
- **Export a PDF:** open the dev preview, then Print → landscape, margins None,
  background graphics on. \`print.css\` already sets one board per sheet.
`

const GITIGNORE = `node_modules\ndist\n`

// Pretty-print the deal so it's editable by hand in deal.js.
function dealModule(deal) {
  return `/* The deal model for this OM. Edit any value and the deck re-renders.\n   Images are data URLs so the project is self-contained. */\nexport const deal = ${JSON.stringify(deal, null, 2)}\n`
}

async function fetchBinary(path) {
  try {
    const res = await fetch(path)
    if (!res.ok) return null
    return new Uint8Array(await res.arrayBuffer())
  } catch { return null }
}

// Build the zip and trigger a download. Returns the filename.
export async function exportProject(deal, baseName = 'om-export') {
  const files = {}
  // Scaffold
  files[`${baseName}/package.json`] = strToU8(JSON.stringify(PKG, null, 2) + '\n')
  files[`${baseName}/vite.config.js`] = strToU8(VITE_CONFIG)
  files[`${baseName}/index.html`] = strToU8(INDEX_HTML)
  files[`${baseName}/README.md`] = strToU8(README)
  files[`${baseName}/.gitignore`] = strToU8(GITIGNORE)
  // App glue
  files[`${baseName}/src/main.jsx`] = strToU8(MAIN_JSX)
  files[`${baseName}/src/App.jsx`] = strToU8(APP_JSX)
  files[`${baseName}/src/print.css`] = strToU8(PRINT_CSS)
  files[`${baseName}/src/deal.js`] = strToU8(dealModule(deal))
  // The real OM components (keys are like './om/OmDeck.jsx')
  for (const [path, src] of Object.entries(OM_SOURCES)) {
    files[`${baseName}/src/${path.replace(/^\.\//, '')}`] = strToU8(String(src))
  }
  // Brand assets referenced by the components (/logos/*)
  for (const logo of ['npcg-white-hires.png', 'compass.png']) {
    const bin = await fetchBinary(`/logos/${logo}`)
    if (bin) files[`${baseName}/public/logos/${logo}`] = bin
  }

  const zipped = zipSync(files, { level: 6 })
  const blob = new Blob([zipped], { type: 'application/zip' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${baseName}.zip`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
  return `${baseName}.zip`
}
