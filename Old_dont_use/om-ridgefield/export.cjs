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
const vite = path.join(__dirname, 'node_modules', '.bin', 'vite');

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
  const build = spawnSync(vite, ['build'], { cwd: __dirname, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status || 1);

  console.log(`▸ Serving on :${PORT}…`);
  const server = spawn(vite, ['preview', '--port', String(PORT), '--strictPort'], { cwd: __dirname, stdio: 'ignore' });
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
