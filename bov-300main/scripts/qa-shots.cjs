/* ═══════════════════ PAGE QA — screenshots + overflow audit ═══════════════════
   Serves the built app (vite preview), screenshots every page to the out dir,
   and flags any page whose content overflows its fixed 960×742 box (pages are
   overflow:hidden, so clipping is silent in the browser).

   Usage:  npm run build && node scripts/qa-shots.cjs [outDir]            */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

const OUT = process.argv[2] || path.join(__dirname, '..', 'qa-shots');
const PORT = 4183;
const ROOT = path.join(__dirname, '..');

// Invoke vite via `node <vite.js>` rather than `npx` / the .bin shim. The shim
// is a POSIX shell script with no .cmd sibling resolved here, so spawning it on
// Windows fails outright (spawn npx ENOENT). Driving the JS entry with the
// current node binary is shell-free and works identically on every platform.
// Matches the pattern already used by export.cjs / export-vector.cjs.
const node = process.execPath;
const vite = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');

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
  fs.mkdirSync(OUT, { recursive: true });
  const server = spawn(node, [vite, 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT, stdio: 'ignore',
  });
  const cleanup = () => { try { server.kill('SIGTERM'); } catch { /* already gone */ } };
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });
  await waitForServer(PORT);

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      await Promise.all(Array.from(document.images).map(i => i.complete ? i.decode().catch(() => {}) : new Promise(r => { i.onload = i.onerror = r })));
    });
    await new Promise(r => setTimeout(r, 500));

    const pages = await page.$$('.page');
    console.log(`${pages.length} pages rendered`);
    const overflows = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.page').forEach((p, i) => {
        const pb = p.getBoundingClientRect();
        let worst = 0;
        p.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.height > 0 && r.bottom > pb.bottom + 0.5) worst = Math.max(worst, r.bottom - pb.bottom);
        });
        if (worst > 0.5) out.push({ page: i + 1, px: Math.round(worst) });
      });
      return out;
    });

    for (let i = 0; i < pages.length; i++) {
      await pages[i].scrollIntoView();
      await pages[i].screenshot({ path: path.join(OUT, `page-${String(i + 1).padStart(2, '0')}.png`) });
    }
    console.log(`shots → ${OUT}`);
    if (overflows.length) {
      console.log('OVERFLOW FINDINGS (content clipped past the page box):');
      overflows.forEach(o => console.log(`  page ${o.page}: ${o.px}px past bottom`));
      process.exitCode = 4;
    } else {
      console.log('no overflow findings');
    }
  } finally {
    await browser.close();
    server.kill();
  }
})();
