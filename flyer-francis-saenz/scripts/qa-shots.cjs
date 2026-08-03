/* ═══════════════════ PAGE QA — screenshots + overflow audit ═══════════════════
   Serves the built app (vite preview), screenshots every page to the out dir,
   and flags any page whose content overflows its fixed 816x1056 box (pages are
   overflow:hidden, so clipping is silent in the browser).

   PORT SAFETY: every clone of this script in the repo hardcodes the same port,
   so a sibling deck's QA run or preview server can squat it and you'd audit the
   WRONG deck with a straight face — this happened during development here (a
   28-page BOV audited as if it were this 9-page flyer). Same defence as
   export-vector.cjs: probe upward for a genuinely free port, then verify the
   served <title> matches dist/index.html before trusting a single pixel.

   Usage:  npm run qa   ·   node scripts/qa-shots.cjs [outDir]              */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const OUT = process.argv[2] || path.join(ROOT, 'qa-shots');
const PORT_START = Number(process.env.PORT || 4183);

// ECONNREFUSED means nothing is listening, so the port is genuinely free.
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
const titleOf = html => (html.match(/<title>([^<]+)<\/title>/) || [])[1] || null;
function servedTitle(port) {
  return new Promise(resolve => {
    http.get(`http://localhost:${port}/`, res => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => resolve(titleOf(body)));
    }).on('error', () => resolve(null));
  });
}
function waitForServer(port, tries = 60) {
  return new Promise((resolve, reject) => {
    const tick = n => {
      const req = http.get(`http://localhost:${port}/`, res => { res.destroy(); resolve(); });
      req.on('error', () => {
        if (n <= 0) return reject(new Error(`preview server never came up on :${port}`));
        setTimeout(() => tick(n - 1), 400);
      });
    };
    tick(tries);
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const dist = path.join(ROOT, 'dist', 'index.html');
  if (!fs.existsSync(dist)) throw new Error('no dist/ — run `npm run build` first');
  const want = titleOf(fs.readFileSync(dist, 'utf8'));

  const PORT = await findFreePort(PORT_START);
  if (PORT !== PORT_START) console.log(`  ↳ :${PORT_START} busy — using free port :${PORT}`);

  // Drive vite's JS entry with the current node binary. `npx` and the .bin shim
  // are POSIX shell scripts that spawn silently (status null) on Windows.
  const vite = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const server = spawn(process.execPath, [vite, 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT, stdio: 'ignore',
  });

  const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  try {
    await waitForServer(PORT);
    const got = await servedTitle(PORT);
    if (want && got && want !== got) {
      throw new Error(`port :${PORT} is serving "${got}", not this deck ("${want}"). ` +
        'Another deck\'s preview/dev server is on it — stop that server and re-run.');
    }

    const page = await browser.newPage();
    // Wide enough for the 816px portrait page plus the deck's gutter.
    await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      await Promise.all(Array.from(document.images).map(i => (i.complete ? i.decode().catch(() => {}) : new Promise(r => { i.onload = i.onerror = r }))));
    });
    await new Promise(r => setTimeout(r, 500));

    const pages = await page.$$('.page');
    console.log(`${pages.length} pages rendered · "${got}"`);
    const overflows = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.page').forEach((p, i) => {
        const pb = p.getBoundingClientRect();
        let worst = 0, culprit = '';
        p.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.height > 0 && r.bottom > pb.bottom + 0.5 && r.bottom - pb.bottom > worst) {
            worst = r.bottom - pb.bottom;
            culprit = el.className || el.tagName;
          }
        });
        if (worst > 0.5) out.push({ page: i + 1, px: Math.round(worst), culprit: String(culprit).slice(0, 48) });
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
      overflows.forEach(o => console.log(`  page ${o.page}: ${o.px}px past bottom · ${o.culprit}`));
      process.exitCode = 4;
    } else {
      console.log('no overflow findings');
    }
  } finally {
    await browser.close();
    server.kill();
  }
})().catch(err => { console.error(err.message || err); process.exit(1); });
