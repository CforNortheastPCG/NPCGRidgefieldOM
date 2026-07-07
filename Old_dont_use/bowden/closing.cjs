/* Closing / "JUST SOLD" social posts — config-driven generator.
   Mirrors om-southend-plaza/social-variants.cjs but for a CLOSED deal.

   Produces three PNGs (no financial info — info only):
     • email     1200x1200  — clean top "JUST SOLD" banner + photo + logo (matches
                              reference-Courthouse-Social.png)
     • linkedin  1200x1200  — full-bleed photo, gold "JUST SOLD" ribbon, big title overlay
     • instagram 1080x1350  — same big-title style, portrait crop

   Setup:  drop the hero photo at  photos/cover.jpg
           (optional portrait crop at photos/cover-portrait.jpg — falls back to cover.jpg)
   Run:    node closing.cjs
           ONLY=email node closing.cjs          # one layout
   Output: Courthouse-Square-sold-<layout>.png

   To reuse for the next closing: copy this folder, swap photos/, edit DEAL below. */
const fs = require('fs'), path = require('path');
let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('C:/NPCGRidgefieldOM/om-southend-plaza/node_modules/puppeteer'); }

const ROOT = __dirname;
const GOLD = '#F8971D';
const CARBON = '#2b3038';

// ── deal config ─────────────────────────────────────────────────────────────
const DEAL = {
  slug: 'Bowden-Street',               // output filename prefix
  status: 'Just Sold',                 // gold ribbon label
  // big-title overlay (all three posts) — info only, no financials
  eyebrow: 'Eight-Unit Multifamily Property',
  title: 'Bowden Street<br>Apartments',
  addr: 'Lowell, MA',
  // photo focus: object-position used by background-position (x% y%)
  focus:         '55% center',         // square (email + linkedin)
  focusPortrait: '58% center',         // instagram portrait
};

// ── assets ──────────────────────────────────────────────────────────────────
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const photoExists = (p) => fs.existsSync(path.join(ROOT, p));
const COVER = 'photos/cover.jpg';
const COVER_PORTRAIT = photoExists('photos/cover-portrait.jpg') ? 'photos/cover-portrait.jpg' : COVER;
const LOGO = b64('logos/npcg-white-hires.png', 'image/png');

// ── shared base css ─────────────────────────────────────────────────────────
const baseCss = (W, H, u, pad) => `
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:${CARBON};color:#fff}
  .logo{position:absolute;height:${Math.round(56*u)}px;z-index:5}
  .eyebrow{font-size:${Math.round(22*u)}px;font-weight:700;letter-spacing:${0.22*u}em;text-transform:uppercase;
      text-shadow:0 1px 10px rgba(0,0,0,0.9);margin-bottom:${Math.round(16*u)}px}
  .title{font-size:${Math.round(100*u)}px;font-weight:800;line-height:0.96;letter-spacing:-0.01em;
      text-shadow:0 3px 20px rgba(0,0,0,0.8)}
  .rule{width:${Math.round(86*u)}px;height:${Math.round(5*u)}px;background:${GOLD};margin:${Math.round(22*u)}px 0 0}
  .addr{font-size:${Math.round(21*u)}px;font-weight:600;letter-spacing:${0.04*u}em;text-shadow:0 1px 8px rgba(0,0,0,0.95)}
`;

// ── layout builders ─────────────────────────────────────────────────────────
// Full-bleed photo, gold "JUST SOLD" ribbon, big title overlay.
// align = 'left'  → socials (IG + LinkedIn), title bottom-left
// align = 'center'→ email, title centered along the bottom
// tagInTitle:true → no separate ribbon; "JUST SOLD" becomes the gold kicker above
//                   the title, and the descriptor folds into the bottom line (email)
const bigtitle = (W, H, u, pad, bg, align, tagInTitle) => {
  const centered = align === 'center';
  const eyebrow = tagInTitle ? DEAL.status : DEAL.eyebrow;
  const sub = tagInTitle ? `${DEAL.eyebrow} &middot; ${DEAL.addr}` : DEAL.addr;
  return {
    css: `
      .bg{position:absolute;inset:0;background:url('${bg}') ${H>W?DEAL.focusPortrait:DEAL.focus}/cover no-repeat;
          filter:brightness(1.20) contrast(1.04) saturate(1.07)}
      .scrim{position:absolute;inset:0;background:linear-gradient(to bottom,
          rgba(0,0,0,0.26) 0%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.18) 66%, rgba(0,0,0,0.62) 86%, rgba(0,0,0,0.80) 100%)}
      .logo{top:${pad}px;right:${pad}px}
      .ribbon{position:absolute;top:${Math.round(54*u)}px;left:0;background:${GOLD};color:#1b1e23;
          font-size:${Math.round(20*u)}px;font-weight:800;letter-spacing:${0.18*u}em;text-transform:uppercase;
          padding:${Math.round(12*u)}px ${Math.round(34*u)}px ${Math.round(12*u)}px ${pad}px;
          box-shadow:0 6px 18px rgba(0,0,0,0.4)}
      .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px;text-align:${centered?'center':'left'}}
      .foot .title{text-shadow:0 2px 20px rgba(0,0,0,0.85),0 1px 4px rgba(0,0,0,0.7)}
      .foot .eyebrow{color:${GOLD};font-size:${Math.round((tagInTitle?34:25)*u)}px;
          letter-spacing:${(tagInTitle?0.28:0.22)*u}em;text-shadow:0 2px 16px rgba(0,0,0,0.95),0 1px 3px rgba(0,0,0,0.85)}
      .foot .rule{margin:${Math.round(22*u)}px ${centered?'auto':'0'} 0}
      .foot .addr{margin-top:${Math.round(18*u)}px;font-size:${Math.round(22*u)}px;text-shadow:0 2px 12px rgba(0,0,0,0.95),0 1px 3px rgba(0,0,0,0.85)}`,
    body: `<div class="bg"></div>
      <img class="logo" src="${LOGO}">
      <div class="scrim"></div>
      ${tagInTitle ? '' : `<div class="ribbon">${DEAL.status}</div>`}
      <div class="foot"><div class="eyebrow">${eyebrow}</div><div class="title">${DEAL.title}</div>
        <div class="rule"></div><div class="addr">${sub}</div></div>`,
  };
};

const render = (W, H, bg, align, tagInTitle) => {
  const u = W / 1080, pad = Math.round(64 * u);
  const v = bigtitle(W, H, u, pad, bg, align, tagInTitle);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W,H,u,pad)}${v.css}</style></head>
    <body><div class="card">${v.body}</div></body></html>`;
};

// out = filename suffix; align = title alignment; tagInTitle = fold "JUST SOLD" into title
const jobs = [
  { out: 'email',     align: 'center', tagInTitle: true,  w: 1200, h: 1200, portrait: false },
  { out: 'linkedin',  align: 'left',   tagInTitle: false, w: 1200, h: 1200, portrait: false },
  { out: 'instagram', align: 'left',   tagInTitle: false, w: 1080, h: 1350, portrait: true  },
];

(async () => {
  if (!photoExists(COVER)) {
    console.error(`\n  ⚠  Missing hero photo: ${path.join(ROOT, COVER)}`);
    console.error(`     Drop the Courthouse Square photo there, then re-run.\n`);
    process.exit(1);
  }
  const SQ_BG = b64(COVER, 'image/jpeg');
  const PT_BG = b64(COVER_PORTRAIT, 'image/jpeg');

  const browser = await puppeteer.launch({ headless: true });
  const only = process.env.ONLY ? process.env.ONLY.split(',') : jobs.map(j => j.out);
  for (const j of jobs) {
    if (!only.includes(j.out)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width: j.w, height: j.h, deviceScaleFactor: 2 });
    await page.setContent(render(j.w, j.h, j.portrait ? PT_BG : SQ_BG, j.align, j.tagInTitle), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(ROOT, `${DEAL.slug}-sold-${j.out}.png`);
    await page.screenshot({ path: file });
    console.log(`${path.basename(file)}  ${j.w}x${j.h}  ${(fs.statSync(file).size/1024).toFixed(0)}KB`);
    await page.close();
  }
  await browser.close();
})();
