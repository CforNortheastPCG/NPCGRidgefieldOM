const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn, spawnSync } = require('child_process');
const { renderPdf } = require('./print.cjs');
const { fixPdf } = require('./fix-pdf.cjs');

/* ═══════════════════ ONE-COMMAND OM EXPORT ═══════════════════
   `npm run pdf` → builds the site, serves the production bundle, renders the
   PDF (print.cjs), and tears the server down. Self-contained: no dev server
   needs to be running. All print.cjs env knobs apply, e.g.:
     QUALITY=55 npm run pdf      (smaller file)
     COVER=1.28 npm run pdf      (lift a still-dark printed cover) */

// Every OM folder is a clone and ALL default to 4173 — so if a sibling deck's
// preview/dev server is already up, `vite preview --strictPort` here fails to
// bind and we'd silently screenshot the WRONG deck. Pick a genuinely-free port
// (probe upward from the requested one) and verify the served deck is ours
// before rendering. PORT env still forces a specific port if you need one.
const PORT_START = Number(process.env.PORT || 4173);

// Probe a port with an HTTP GET: ECONNREFUSED ⇒ nothing there ⇒ free.
function portFree(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/`, res => { res.destroy(); resolve(false); });
    req.on('error', err => resolve(err.code === 'ECONNREFUSED'));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}
async function findFreePort(start) {
  for (let p = start; p < start + 40; p++) if (await portFree(p)) return p;
  throw new Error(`no free port found near ${start}`);
}
// Pull the deck's <title> from the built dist so we can confirm the server on
// our port is serving THIS deck (not a sibling clone squatting the port).
function expectedTitle() {
  try { return (fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8').match(/<title>([^<]+)<\/title>/) || [])[1] || null; }
  catch { return null; }
}
function servedTitle(port) {
  return new Promise(resolve => {
    http.get(`http://localhost:${port}/`, res => {
      let body = ''; res.on('data', d => body += d);
      res.on('end', () => resolve((body.match(/<title>([^<]+)<\/title>/) || [])[1] || null));
    }).on('error', () => resolve(null));
  });
}
// Invoke vite via `node <vite.js>` rather than the .bin shim. The shim is a
// POSIX shell script with no .cmd sibling resolved here, so spawning it on
// Windows fails silently (status null → exit 1). Driving the JS entry with the
// current node binary is shell-free and works identically on every platform.
const node = process.execPath;
const vite = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

function waitForServer(port, tries = 80) {
  return new Promise((resolve, reject) => {
    const tick = n => {
      const req = http.get(`http://localhost:${port}/`, res => { res.destroy(); resolve(); });
      req.on('error', () => {
        if (n <= 0) return reject(new Error(`preview server never came up on :${port}`));
        setTimeout(() => tick(n - 1), 500);
      });
    };
    tick(tries);
  });
}

(async () => {
  console.log('▸ Building production bundle…');
  const build = spawnSync(node, [vite, 'build'], { cwd: __dirname, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status || 1);

  const PORT = await findFreePort(PORT_START);
  if (PORT !== PORT_START) console.log(`  ↳ :${PORT_START} busy — using free port :${PORT}`);

  console.log(`▸ Serving on :${PORT}…`);
  const server = spawn(node, [vite, 'preview', '--port', String(PORT), '--strictPort'], { cwd: __dirname, stdio: 'ignore' });
  const cleanup = () => { try { server.kill('SIGTERM'); } catch { /* already gone */ } };
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });

  try {
    await waitForServer(PORT);
    // Guard: make sure the server on our port is serving THIS deck before we
    // spend minutes screenshotting it (catches any port-squat slipping through).
    const want = expectedTitle(), got = await servedTitle(PORT);
    if (want && got && want !== got) {
      throw new Error(`port :${PORT} is serving "${got}", not this deck ("${want}"). ` +
        `Another OM's preview/dev server is running on it — stop that server and re-run.`);
    }
    console.log('▸ Rendering PDF…');
    const { out } = await renderPdf({ port: String(PORT) });
    // Normalize Skia's ICC v4 colorspaces (pink photos in Acrobat/Preview) and
    // embed the broker metadata.
    await fixPdf(out);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
})();
