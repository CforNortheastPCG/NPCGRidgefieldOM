/* Generate social images off the OM cover look (outlined aerial + title + stats).
   Outputs: Ware-Portfolio-social-linkedin.png (1200x1200) and
            Ware-Portfolio-social-instagram.png (1080x1350). */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer');
const ROOT = __dirname;
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const BG = b64('public/photos/ware/cover-hero.jpg', 'image/jpeg');
const LOGO = b64('public/logos/npcg-white-hires.png', 'image/png');
const GOLD = '#F8971D';

const html = (W, H) => {
  const u = W / 1080;                 // scale unit
  const pad = Math.round(64 * u);
  return `<!doctype html><html><head><meta charset="utf-8">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
    html,body{width:${W}px;height:${H}px;overflow:hidden}
    .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:#2b3038}
    .bg{position:absolute;inset:0;background:url('${BG}') center 44%/cover no-repeat}
    .scrim{position:absolute;inset:0;background:linear-gradient(to bottom,
        rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 22%, rgba(0,0,0,0) 42%,
        rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.88) 100%)}
    .logo{position:absolute;top:${pad}px;right:${pad}px;height:${Math.round(56*u)}px}
    .head{position:absolute;top:${pad}px;left:${pad}px;right:${pad}px;color:#fff}
    .eyebrow{font-size:${Math.round(22*u)}px;font-weight:700;letter-spacing:${0.22*u}em;text-transform:uppercase;
        color:#fff;text-shadow:0 1px 10px rgba(0,0,0,0.9);margin-bottom:${Math.round(16*u)}px}
    .title{font-size:${Math.round(100*u)}px;font-weight:800;line-height:0.96;letter-spacing:-0.01em;
        text-shadow:0 3px 20px rgba(0,0,0,0.8)}
    .rule{width:${Math.round(86*u)}px;height:${Math.round(5*u)}px;background:${GOLD};margin:${Math.round(22*u)}px 0 0}
    .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px;color:#fff}
    .addr{font-size:${Math.round(21*u)}px;font-weight:600;letter-spacing:${0.04*u}em;
        color:#fff;text-shadow:0 1px 8px rgba(0,0,0,0.95)}
    .stats{display:flex;justify-content:space-between;align-items:flex-end;gap:${Math.round(40*u)}px;
        border-top:1px solid rgba(255,255,255,0.35);padding-top:${Math.round(20*u)}px}
    .stat .v{font-size:${Math.round(34*u)}px;font-weight:800;color:${GOLD};line-height:1;text-shadow:0 2px 10px rgba(0,0,0,0.7)}
    .stat .k{font-size:${Math.round(15*u)}px;font-weight:700;letter-spacing:${0.1*u}em;text-transform:uppercase;
        color:#fff;opacity:0.92;margin-top:${Math.round(7*u)}px;text-shadow:0 1px 6px rgba(0,0,0,0.9)}
    .contacts{display:flex;gap:${Math.round(34*u)}px;text-align:right}
    .broker .n{font-size:${Math.round(18*u)}px;font-weight:800;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,0.9)}
    .broker .c{font-size:${Math.round(14*u)}px;font-weight:600;color:#fff;opacity:0.9;margin-top:${Math.round(3*u)}px;text-shadow:0 1px 6px rgba(0,0,0,0.9)}
  </style></head><body>
    <div class="card">
      <div class="bg"></div><div class="scrim"></div>
      <img class="logo" src="${LOGO}">
      <div class="head">
        <div class="eyebrow">20-Unit Apartment Portfolio</div>
        <div class="title">Ware<br>Multifamily<br>Portfolio</div>
        <div class="rule"></div>
      </div>
      <div class="foot">
        <div class="addr">27 Parker St &middot; 28-30 &amp; 28.5 North St &middot; 38 North St &middot; Ware, MA 01082</div>
      </div>
    </div>
  </body></html>`;
};

const sizes = [
  { name: 'linkedin', w: 1200, h: 1200 },
  { name: 'instagram', w: 1080, h: 1350 },
];
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (const s of sizes) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
    await page.setContent(html(s.w, s.h), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(ROOT, `Ware-Portfolio-social-${s.name}.png`);
    await page.screenshot({ path: out });
    console.log(`${path.basename(out)}  ${s.w}x${s.h}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
    await page.close();
  }
  await browser.close();
})();
