/* "Transaction Brokered By" — companion broker slide for the closing posts.
   A SEPARATE page from the JUST SOLD graphics (closing.cjs). The sale message
   lives on that slide; this one is about the brokers.

   Design: full-bleed property photo + dark veil, centered "Transaction Brokered
   By" header, small property/location context line, then a centered row of
   circular headshots (name · title · phone · email). Scales to broker count
   (wraps to a 3-up grid for larger teams).

   Produces three PNGs:
     • email     1200x1200
     • linkedin  1200x1200
     • instagram 1080x1350

   Setup:  photos/cover.jpg  +  headshots in photos/team/  (see BROKERS)
   Run:    node brokers.cjs   |   ONLY=email node brokers.cjs
   Output: <slug>-brokers-<layout>.png */
const fs = require('fs'), path = require('path');
let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('C:/NPCGRidgefieldOM/om-southend-plaza/node_modules/puppeteer'); }

const ROOT = __dirname;
const GOLD = '#F8971D';
const CARBON = '#2b3038';

// ── deal + broker config ─────────────────────────────────────────────────────
const DEAL = {
  slug: 'Bowden-Street',
  title: 'Bowden Street Apartments',
  addr: 'Lowell, MA',
  heading: 'Transaction Brokered By',
  focus: '55% center',            // cover-photo framing
  faceSize: '115% auto',          // headshot zoom inside the circle (top-anchored)
};
DEAL.sub = `${DEAL.title} · ${DEAL.addr}`;

const BROKERS = [
  { name: 'Drew Kirkland',     title: 'Vice President, Investments', phone: '(857) 990-6802', email: 'dkirkland@northeastpcg.com', photo: 'Drew-Kirkland.png' },
  { name: 'Francis Saenz',     title: 'Vice President, Investments', phone: '(857) 990-6803', email: 'fsaenz@northeastpcg.com', photo: 'Francis-Saenz.png' },
  { name: 'Jim Casey',         title: 'Senior Associate', phone: '(857) 990-6821', email: 'jcasey@northeastpcg.com', photo: 'Jim-Casey.png' },
  { name: 'Patrick Wheeler',   title: 'Investment Associate', phone: '(857) 990-6819', email: 'pwheeler@northeastpcg.com', photo: 'Patrick-Wheeler.jpg' },
  { name: 'Anthony Rakauskas', title: 'Associate', phone: '(857) 990-6807', email: 'arakauskas@northeastpcg.com', photo: 'Anthony-Rakauskas.png' },
];

// ── assets ──────────────────────────────────────────────────────────────────
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const mime = (f) => /\.png$/i.test(f) ? 'image/png' : 'image/jpeg';
const COVER = 'photos/cover.jpg';
const LOGO = b64('logos/npcg-white-hires.png', 'image/png');
const PH = (b) => b64(`photos/team/${b.photo}`, mime(b.photo));

// ── render ──────────────────────────────────────────────────────────────────
const render = (W, H, bg) => {
  const u = W / 1080, pad = Math.round(64 * u);
  const n = BROKERS.length, big = n <= 2;
  const perRow = n <= 3 ? n : 3;
  const gap = Math.round((big ? 60 : 40) * u);
  const avail = W - 2 * pad;
  const cardW = Math.floor((avail - gap * (perRow - 1)) / perRow);
  const circle = Math.min(Math.round(cardW * 0.66),
                          Math.round((n <= 2 ? 210 : n === 3 ? 180 : n === 4 ? 165 : 150) * u));
  const nm = Math.round((big ? 30 : 23) * u);
  const ti = Math.round((big ? 16.5 : 14) * u);
  const ct = Math.round((big ? 16 : 13.5) * u);

  const card = (b) => `
    <div class="bcard">
      <div class="ph" style="background-image:url('${PH(b)}')"></div>
      <div class="nm">${b.name}</div>
      <div class="ti">${b.title}</div>
      <div class="ct">${b.phone}</div>
      <div class="ct">${b.email}</div>
    </div>`;

  const css = `
    *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
    html,body{width:${W}px;height:${H}px;overflow:hidden}
    .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:${CARBON};color:#fff}
    .bg{position:absolute;inset:0;background:url('${bg}') ${DEAL.focus}/cover no-repeat;filter:saturate(1.03)}
    .veil{position:absolute;inset:0;background:linear-gradient(to bottom,
        rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.64) 45%, rgba(0,0,0,0.84) 100%)}
    .logo{position:absolute;top:${pad}px;right:${pad}px;height:${Math.round(54*u)}px;z-index:6}
    .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${pad}px}
    .brokhead{color:${GOLD};font-weight:800;text-transform:uppercase;text-align:center;font-size:${Math.round(34*u)}px;letter-spacing:${0.16*u}em}
    .rule{width:${Math.round(74*u)}px;height:${Math.round(4*u)}px;background:${GOLD};margin:${Math.round(20*u)}px auto ${Math.round(16*u)}px}
    .sub{font-size:${Math.round(21*u)}px;font-weight:600;letter-spacing:${0.04*u}em;color:#e7eaee;margin-bottom:${Math.round(46*u)}px;text-align:center}
    .cards{display:flex;flex-wrap:wrap;justify-content:center;gap:${Math.round(34*u)}px ${gap}px;max-width:${avail}px}
    .bcard{width:${cardW}px;text-align:center}
    .ph{width:${circle}px;height:${circle}px;border-radius:50%;margin:0 auto ${Math.round(16*u)}px;
        background-size:${DEAL.faceSize};background-position:center top;background-repeat:no-repeat;background-color:#fff;
        border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 10px 26px rgba(0,0,0,0.5)}
    .nm{font-size:${nm}px;font-weight:800;line-height:1.05}
    .ti{font-size:${ti}px;font-weight:700;color:${GOLD};margin-top:${Math.round(6*u)}px;line-height:1.2}
    .ct{font-size:${ct}px;color:#d7dbe0;margin-top:${Math.round(5*u)}px;line-height:1.25;word-break:break-word}`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
    <div class="card">
      <div class="bg"></div><div class="veil"></div>
      <img class="logo" src="${LOGO}">
      <div class="wrap">
        <div class="brokhead">${DEAL.heading}</div><div class="rule"></div>
        <div class="sub">${DEAL.sub}</div>
        <div class="cards">${BROKERS.map(card).join('')}</div>
      </div>
    </div></body></html>`;
};

const jobs = [
  { out: 'email',     w: 1200, h: 1200 },
  { out: 'linkedin',  w: 1200, h: 1200 },
  { out: 'instagram', w: 1080, h: 1350 },
];

(async () => {
  if (!exists(COVER)) { console.error(`Missing ${COVER}`); process.exit(1); }
  for (const b of BROKERS) {
    if (!exists(`photos/team/${b.photo}`)) { console.error(`Missing headshot photos/team/${b.photo}`); process.exit(1); }
  }
  const BG = b64(COVER, 'image/jpeg');
  const browser = await puppeteer.launch({ headless: true });
  const only = process.env.ONLY ? process.env.ONLY.split(',') : jobs.map(j => j.out);
  for (const j of jobs) {
    if (!only.includes(j.out)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width: j.w, height: j.h, deviceScaleFactor: 2 });
    await page.setContent(render(j.w, j.h, BG), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(ROOT, `${DEAL.slug}-brokers-${j.out}.png`);
    await page.screenshot({ path: file });
    console.log(`${path.basename(file)}  ${j.w}x${j.h}  ${(fs.statSync(file).size/1024).toFixed(0)}KB`);
    await page.close();
  }
  await browser.close();
})();
