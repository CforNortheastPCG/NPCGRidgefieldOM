/* ═══════════════════ PAGE QA — screenshots + overflow audit ═══════════════════
   Serves the built app (vite preview), screenshots every page to the out dir,
   and flags any page whose content overflows its fixed 960×742 box (pages are
   overflow:hidden, so clipping is silent in the browser — this is the only
   thing that catches it). Exits 4 on any finding.

   Usage:  npm run build && node scripts/qa-shots.cjs [outDir]            */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const OUT = process.argv[2] || path.join(ROOT, 'qa-shots');

// Same port-collision guard as export.cjs: every deck folder is a clone, so a
// sibling deck's server could be squatting our default port — probe for a free
// one and verify the served <title> is THIS deck before screenshotting.
const PORT_START = Number(process.env.PORT || 4183);

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

function expectedTitle() {
  try { return (fs.readFileSync(path.join(ROOT, 'dist', 'index.html'), 'utf8').match(/<title>([^<]+)<\/title>/) || [])[1] || null; }
  catch { return null; }
}

// Poll until the preview server actually answers — a fixed sleep races the
// build on a cold cache and screenshots a blank page.
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

// Invoke vite via `node <vite.js>` rather than the .bin shim / npx (shell-free,
// works identically on every platform — npx spawn fails on Windows).
const node = process.execPath;
const vite = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const PORT = await findFreePort(PORT_START);
  if (PORT !== PORT_START) console.log(`  ↳ :${PORT_START} busy — using free port :${PORT}`);

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

    const want = expectedTitle(), got = await page.title();
    if (want && got && want !== got) {
      throw new Error(`port :${PORT} is serving "${got}", not this deck ("${want}") — stop the other server and re-run.`);
    }

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
    cleanup();
  }
})();
