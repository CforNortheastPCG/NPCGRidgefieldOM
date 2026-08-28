const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/* ═══════════════════ PHOTO COMPRESSOR (canvas) ═══════════════════
   Downscales/re-encodes source photos to ≤MAX px wide, JPEG qQ, clean sRGB
   (the canvas re-encode drops any embedded ICC profile). Needed for VECTOR
   decks: page.pdf() embeds each source JPEG byte-for-byte (DCTDecode
   passthrough), so oversized sources bloat the PDF directly.

   sharp/ImageMagick aren't installed on the PC and PowerShell/GDI+ chokes on big
   JPEGs, so we re-encode in a headless Chromium canvas.

   Usage: node compress-canvas.cjs file1.jpg file2.png ...
     - .png inputs are written out as .jpg (same basename); caller updates refs.
     - .jpg inputs are overwritten in place.
   Backup the originals first — this is destructive. */

const DIR = path.join(__dirname, 'public', 'photos');
const MAX = Number(process.env.MAX || 1600);
const Q = Number(process.env.Q || 0.84);

const targets = process.argv.slice(2);
if (!targets.length) { console.error('no files given'); process.exit(1); }

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();
  let before = 0, after = 0;
  for (const rel of targets) {
    const src = path.join(DIR, rel);
    if (!fs.existsSync(src)) { console.warn(`skip (missing): ${rel}`); continue; }
    const buf = fs.readFileSync(src);
    before += buf.length;
    const ext = path.extname(rel).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const dataUri = `data:${mime};base64,${buf.toString('base64')}`;
    const out = await page.evaluate(async (dataUri, MAX, Q) => {
      const img = new Image();
      img.src = dataUri;
      await img.decode();
      const scale = Math.min(1, MAX / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const cx = c.getContext('2d');
      cx.drawImage(img, 0, 0, w, h);
      return c.toDataURL('image/jpeg', Q);
    }, dataUri, MAX, Q);
    const bytes = Buffer.from(out.split(',')[1], 'base64');
    const dstRel = rel.replace(/\.png$/i, '.jpg');
    fs.writeFileSync(path.join(DIR, dstRel), bytes);
    after += bytes.length;
    const kb = n => (n / 1024).toFixed(0) + 'KB';
    console.log(`${rel}${dstRel !== rel ? ' → ' + dstRel : ''}: ${kb(buf.length)} → ${kb(bytes.length)}`);
  }
  await browser.close();
  console.log(`Total: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB`);
})();
