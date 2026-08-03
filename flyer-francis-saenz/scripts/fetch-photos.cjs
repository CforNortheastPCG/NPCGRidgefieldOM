const fs = require('fs');
const path = require('path');
const https = require('https');
const puppeteer = require('puppeteer');

/* ═══════════════════ PROPERTY PHOTO FETCH + COMPRESS ═══════════════════
   Downloads the Buildout/S3 property images referenced by comps.json, re-encodes
   them in a headless-Chromium canvas (≤MAX px, JPEG qQ, clean sRGB), and writes
   public/properties/comp-<sf_deal_id>.jpg plus a src/data/photos.json manifest.

   Only ~71 of the 194 deals carry a property_image_url; the rest have none and
   simply never appear on the Featured page. The manifest is keyed by deal id and
   contains ONLY files that actually landed on disk, so a missing key
   unambiguously means "no photo".

   Idempotent: existing files are skipped, so re-runs are free and a network
   outage can't wipe committed assets. The compressed JPEGs are committed, which
   is what lets the deck build offline.

   The canvas re-encode also strips the exotic ICC profiles Buildout originals
   sometimes carry — exactly what a vector render needs (RENDER-PIPELINE §0).

   Usage:  npm run photos          FORCE=1 npm run photos   (re-download all)  */

const ROOT = path.join(__dirname, '..');
const OUTDIR = path.join(ROOT, 'public', 'properties');
const MANIFEST = path.join(ROOT, 'src', 'data', 'photos.json');
const MAX = Number(process.env.MAX || 900); // ~2.5x the 364px card box
const Q = Number(process.env.Q || 0.84);
const FORCE = !!process.env.FORCE;

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
          // 403/404 means the asset is gone from Buildout — record, don't crash.
          if (res.statusCode === 403 || res.statusCode === 404 || n <= 1) {
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          return setTimeout(() => attempt(n - 1), 800);
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', err => (n > 1 ? setTimeout(() => attempt(n - 1), 800) : reject(err)));
      }).on('error', err => (n > 1 ? setTimeout(() => attempt(n - 1), 800) : reject(err)));
    };
    attempt(tries);
  });
}

(async () => {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'comps.json'), 'utf8'));
  fs.mkdirSync(OUTDIR, { recursive: true });

  const withUrl = data.deals.filter(d => d.imageUrl);
  const noUrl = data.deals.length - withUrl.length;
  console.log(`▸ ${withUrl.length} deals carry an image URL · ${noUrl} have none`);

  const manifest = {};
  let downloaded = 0, cached = 0, failed = 0;
  const failures = [];

  // One browser for the whole batch — launching per file is the slow way.
  const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();

  try {
    for (const d of withUrl) {
      const rel = `/properties/comp-${d.id}.jpg`;
      const dst = path.join(OUTDIR, `comp-${d.id}.jpg`);

      if (!FORCE && fs.existsSync(dst)) { manifest[d.id] = rel; cached++; continue; }

      let raw;
      try {
        raw = await download(d.imageUrl);
      } catch (err) {
        failed++;
        failures.push(`${d.address || d.name}, ${d.city} — ${err.message}`);
        continue;
      }

      const ext = (d.imageUrl.split('?')[0].match(/\.(png|jpe?g|gif|webp)$/i) || [, 'jpeg'])[1].toLowerCase();
      const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
      const dataUri = `data:${mime};base64,${raw.toString('base64')}`;

      let out;
      try {
        out = await page.evaluate(async (uri, MAX, Q) => {
          const img = new Image();
          img.src = uri;
          await img.decode();
          const scale = Math.min(1, MAX / img.naturalWidth);
          const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          return { uri: c.toDataURL('image/jpeg', Q), w, h };
        }, dataUri, MAX, Q);
      } catch (err) {
        failed++;
        failures.push(`${d.address || d.name}, ${d.city} — decode failed: ${err.message}`);
        continue;
      }

      const bytes = Buffer.from(out.uri.split(',')[1], 'base64');
      fs.writeFileSync(dst, bytes);
      manifest[d.id] = rel;
      downloaded++;
      console.log(`  ${String(downloaded).padStart(3)} ${out.w}x${out.h} ${(bytes.length / 1024).toFixed(0)}KB  ${d.address || d.name}, ${d.city}`);
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

  const totalKb = Object.keys(manifest)
    .reduce((s, id) => s + fs.statSync(path.join(OUTDIR, `comp-${id}.jpg`)).size, 0) / 1024;
  console.log(`\n  downloaded ${downloaded} · cached ${cached} · unavailable ${failed} · no-url ${noUrl}`);
  if (failures.length) {
    console.log('  unavailable:');
    failures.forEach(f => console.log(`    ${f}`));
  }
  console.log(`✓ ${Object.keys(manifest).length} photos on disk · ${(totalKb / 1024).toFixed(1)} MB → ${MANIFEST}`);
})().catch(err => { console.error(err); process.exit(1); });
