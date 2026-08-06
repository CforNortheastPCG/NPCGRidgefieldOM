/* ═══════════════════ PLACEHOLDER PHOTO GENERATOR ═══════════════════
   Renders branded placeholder JPEGs for every photo slot the sample deal
   references, so the template builds complete out of the box. Drop real
   photos at the same filenames to replace them — or re-run this after
   adding new slots below:  node scripts/gen-placeholders.cjs */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const SLOTS = [
  'cover.jpg', 'toc.jpg', 'divider.jpg', 'project-1.jpg', 'property-1.jpg',
  'exterior-1.jpg', 'exterior-2.jpg', 'exterior-3.jpg', 'exterior-4.jpg',
  'interior-1.jpg', 'interior-2.jpg', 'interior-3.jpg', 'interior-4.jpg',
  'market-1.jpg', 'market-2.jpg',
];

const html = (label) => `<!doctype html><html><body style="margin:0">
  <div style="width:1600px;height:1000px;background:linear-gradient(135deg,#3f4753 0%,#2a3038 100%);
       display:flex;flex-direction:column;align-items:center;justify-content:center;
       font-family:Helvetica,Arial,sans-serif;color:#B1A8A0">
    <div style="font-size:44px;font-weight:700;letter-spacing:0.2em;color:#F8971D">PLACEHOLDER</div>
    <div style="width:70px;height:4px;background:#F8971D;margin:26px 0"></div>
    <div style="font-size:30px;letter-spacing:0.05em">replace <span style="color:#F6F2EE">/photos/${label}</span></div>
  </div></body></html>`;

(async () => {
  const dir = path.join(__dirname, '..', 'public', 'photos');
  fs.mkdirSync(dir, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  for (const slot of SLOTS) {
    await page.setContent(html(slot));
    await page.screenshot({ path: path.join(dir, slot), type: 'jpeg', quality: 70 });
    console.log('  •', slot);
  }
  await browser.close();
  console.log(`Wrote ${SLOTS.length} placeholders to public/photos/`);
})();
