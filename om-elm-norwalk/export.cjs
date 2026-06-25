const path = require('path');
const http = require('http');
const { spawn, spawnSync } = require('child_process');
const { renderPdf } = require('./print.cjs');

/* ═══════════════════ ONE-COMMAND OM EXPORT ═══════════════════
   `npm run pdf` → builds the site, serves the production bundle, renders the
   PDF (print.cjs), and tears the server down. Self-contained: no dev server
   needs to be running. All print.cjs env knobs apply, e.g.:
     QUALITY=55 npm run pdf      (smaller file)
     COVER=1.28 npm run pdf      (lift a still-dark printed cover) */

const PORT = Number(process.env.PORT || 4173);
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

  console.log(`▸ Serving on :${PORT}…`);
  const server = spawn(node, [vite, 'preview', '--port', String(PORT), '--strictPort'], { cwd: __dirname, stdio: 'ignore' });
  const cleanup = () => { try { server.kill('SIGTERM'); } catch { /* already gone */ } };
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });

  try {
    await waitForServer(PORT);
    console.log('▸ Rendering PDF…');
    await renderPdf({ port: String(PORT) });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
})();
