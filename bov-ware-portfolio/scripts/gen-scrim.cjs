/* ═══════════════════ COVER SCRIM GENERATOR ═══════════════════
   Writes public/scrim-feather.png — the soft dark wash behind the cover
   type. It is a PNG on purpose and must stay one.

   A CSS gradient fading to transparent has no PDF primitive: Skia
   rasterizes it into a luminosity soft-mask group, and PDF.js — the engine
   behind Firefox's and Chrome's built-in PDF viewers — composites that as a
   PINK BLOCK across the cover. Alpha carried inside an image embeds as an
   image + SMask instead, which every viewer handles. See PDF-ARTIFACTS.md.

   ⚠ Apple CoreGraphics (qlmanage / Preview) renders the soft-mask version
   CORRECTLY, so checking only there will not catch the bug. Open the export
   in a PDF.js viewer as well.

   Usage:  node scripts/gen-scrim.cjs                                     */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Deliberately small: this is a lossless RGBA image, so it embeds in the
// PDF as raw Flate at roughly W*H*4 bytes. A smooth gradient upscales
// invisibly, so keep this modest — 900x700 cost ~2 MB of the export.
const W = 380, H = 296;
const CSS = 'radial-gradient(130% 110% at 0% 100%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0) 82%)';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.setContent(
      `<html><body style="margin:0"><div style="width:${W}px;height:${H}px;background:${CSS}"></div></body></html>`
    );
    const out = path.join(__dirname, '..', 'public', 'scrim-feather.png');
    await page.screenshot({ path: out, omitBackground: true });
    console.log(`scrim → ${out} (${W}x${H}, ${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
  } finally {
    await browser.close();
  }
})();
