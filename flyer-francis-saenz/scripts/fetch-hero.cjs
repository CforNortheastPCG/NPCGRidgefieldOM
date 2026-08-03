const fs = require('fs');
const path = require('path');
const https = require('https');
const puppeteer = require('puppeteer');

/* ═══════════════════ PAGE-1 HERO ═══════════════════
   Fetches the closing photo used in the band at the foot of the Advisor Profile
   page — HERO_DEAL_ID in src/data/deck.js — at a higher resolution than the
   900px card copies fetch-photos.cjs writes, since this tile spans the full
   748px content width.

   The original one-pager used a stock glass tower behind a cut-out headshot.
   That's gone: the page now uses the clean roster headshot
   (public/photos/team/francis-saenz.png) on a white sheet, and the only
   photography is a real asset he sold.

   Re-encodes through a headless-Chromium canvas, same as compress-canvas.cjs —
   sharp/ImageMagick aren't installed and GDI+ chokes on big JPEGs. The canvas
   pass also strips any exotic ICC profile off the Buildout original, which is
   what a vector render wants (RENDER-PIPELINE §0).

   Usage:  npm run hero                                                       */

const ROOT = path.join(__dirname, '..');
const PHOTOS = path.join(ROOT, 'public', 'photos');
const HERO_WIDTH = 1400;  // ~1.9x the 748px CSS box
const Q = 0.85;

function heroDealId() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'deck.js'), 'utf8');
  const m = src.match(/HERO_DEAL_ID\s*=\s*(?:'([^']+)'|null)/);
  if (!m) throw new Error('HERO_DEAL_ID not found in src/data/deck.js');
  return m[1] || null; // null = hand-supplied hero, leave public/photos/hero.jpg alone
}

function download(url, tries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = n => {
      https.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' },
      }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return download(res.headers.location, n).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          if (n <= 1) return reject(new Error(`HTTP ${res.statusCode}`));
          return setTimeout(() => attempt(n - 1), 800);
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', err => (n > 1 ? setTimeout(() => attempt(n - 1), 800) : reject(err)));
    };
    attempt(tries);
  });
}

const mimeFor = p => (/\.png$/i.test(p) ? 'image/png' : /\.webp$/i.test(p) ? 'image/webp' : 'image/jpeg');

(async () => {
  fs.mkdirSync(PHOTOS, { recursive: true });

  const id = heroDealId();
  if (!id) {
    console.log('HERO_DEAL_ID is null — leaving public/photos/hero.jpg as supplied.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'comps.json'), 'utf8'));
  const deal = data.deals.find(d => d.id === id);
  if (!deal) throw new Error(`HERO_DEAL_ID ${id} is not in comps.json`);
  if (!deal.imageUrl) {
    throw new Error(`${deal.address}, ${deal.city} has no photo in Salesforce.\n` +
      '  → supply public/photos/hero.jpg by hand and set HERO_DEAL_ID = null in src/data/deck.js');
  }

  const raw = await download(deal.imageUrl);
  const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  try {
    const page = await browser.newPage();
    const out = await page.evaluate(async (uri, width, q) => {
      const img = new Image();
      img.src = uri;
      await img.decode();
      const scale = Math.min(1, width / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      return { uri: c.toDataURL('image/jpeg', q), w, h };
    }, `data:${mimeFor(deal.imageUrl.split('?')[0])};base64,${raw.toString('base64')}`, HERO_WIDTH, Q);

    const bytes = Buffer.from(out.uri.split(',')[1], 'base64');
    fs.writeFileSync(path.join(PHOTOS, 'hero.jpg'), bytes);
    console.log(`✓ hero: ${deal.address}, ${deal.city} · ${out.w}x${out.h} · ${(bytes.length / 1024).toFixed(0)}KB → public/photos/hero.jpg`);
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(err.message || err); process.exit(1); });
