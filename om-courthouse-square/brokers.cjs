/* "Transaction Brokered By" — companion broker slide for the closing posts.
   A SEPARATE page from the JUST SOLD graphics (closing.cjs). Same brand system.

   Produces three PNGs:
     • email     1200x1200
     • linkedin  1200x1200
     • instagram 1080x1350

   Layout: property-photo band up top (ties it to the deal) + carbon panel below
   with "Transaction Brokered By" and a centered row of broker cards
   (circular headshot · name · title · phone · email). Scales to broker count.

   Setup:  photos/cover.jpg  +  headshots in photos/team/  (see BROKERS below)
   Run:    node brokers.cjs   |   ONLY=email node brokers.cjs
   Output: <slug>-brokers-<layout>.png */
const fs = require('fs'), path = require('path');
let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('C:/NPCGRidgefieldOM/om-southend-plaza/node_modules/puppeteer'); }

const ROOT = __dirname;
const GOLD = '#F8971D';
const CARBON = '#2b3038';
const PANEL = '#23272e';

// ── deal + broker config ─────────────────────────────────────────────────────
const DEAL = {
  slug: 'Courthouse-Square',
  status: 'Just Sold',
  title: 'Courthouse Square',
  addr: 'Westfield, MA',
  heading: 'Transaction Brokered By',
  focus: '54% center',          // cover-photo framing for the top band
};

const BROKERS = [
  { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: 'Brad-Balletto.jpg' },
  { name: 'Taylor Perun',  title: 'Senior Vice President, Investments', phone: '(203) 307-1576', email: 'tperun@northeastpcg.com', photo: 'Taylor-Perun.jpg' },
];

// ── assets ──────────────────────────────────────────────────────────────────
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const mime = (f) => /\.png$/i.test(f) ? 'image/png' : 'image/jpeg';
const COVER = 'photos/cover.jpg';
const LOGO = b64('logos/npcg-white-hires.png', 'image/png');

// ── render ──────────────────────────────────────────────────────────────────
const card = (b, u, n) => {
  const big = n <= 2;
  const photo = b64(`photos/team/${b.photo}`, mime(b.photo));
  return `
    <div class="bcard">
      <div class="ph" style="background-image:url('${photo}')"></div>
      <div class="nm">${b.name}</div>
      <div class="ti">${b.title}</div>
      <div class="ct">${b.phone}</div>
      <div class="ct"><a>${b.email}</a></div>
    </div>`;
};

const render = (W, H, bg) => {
  const u = W / 1080, pad = Math.round(64 * u);
  const n = BROKERS.length, big = n <= 2;
  const bandH = Math.round(H * (H > W ? 0.34 : 0.40));
  const gap = Math.round(30 * u);
  const avail = W - 2 * pad;
  const cardW = Math.min(Math.floor((avail - gap * (n - 1)) / n), Math.round(300 * u));
  const circle = Math.min(Math.round(cardW * 0.82), Math.round(210 * u));
  const nm = Math.round((big ? 30 : 23) * u);
  const ti = Math.round((big ? 16.5 : 13.5) * u);
  const ct = Math.round((big ? 16 : 13) * u);

  const css = `
    *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
    html,body{width:${W}px;height:${H}px;overflow:hidden}
    .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:${CARBON};color:#fff}
    .band{position:absolute;top:0;left:0;right:0;height:${bandH}px;overflow:hidden}
    .band .bg{position:absolute;inset:0;background:url('${bg}') ${DEAL.focus}/cover no-repeat;filter:brightness(1.03) saturate(1.04)}
    .band .scrim{position:absolute;inset:0;background:linear-gradient(to bottom,
        rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 40%, rgba(43,48,56,0.55) 80%, ${CARBON} 100%)}
    .logo{position:absolute;top:${pad}px;right:${pad}px;height:${Math.round(54*u)}px;z-index:5}
    .bhead{position:absolute;left:${pad}px;right:${pad}px;bottom:${Math.round(26*u)}px;z-index:4}
    .kick{color:${GOLD};font-size:${Math.round(20*u)}px;font-weight:800;letter-spacing:${0.24*u}em;
        text-transform:uppercase;text-shadow:0 2px 12px rgba(0,0,0,0.9)}
    .pname{font-size:${Math.round(50*u)}px;font-weight:800;line-height:1;margin-top:${Math.round(10*u)}px;
        text-shadow:0 3px 18px rgba(0,0,0,0.85)}
    .lower{position:absolute;left:${pad}px;right:${pad}px;top:${bandH}px;bottom:${pad}px;
        display:flex;flex-direction:column;align-items:center;justify-content:center}
    .brokhead{color:${GOLD};font-size:${Math.round(23*u)}px;font-weight:800;letter-spacing:${0.18*u}em;
        text-transform:uppercase;text-align:center;margin-bottom:${Math.round(40*u)}px}
    .brokhead::after{content:'';display:block;width:${Math.round(70*u)}px;height:${Math.round(4*u)}px;
        background:${GOLD};margin:${Math.round(16*u)}px auto 0}
    .cards{display:flex;justify-content:center;flex-wrap:wrap;gap:${gap}px ${gap}px}
    .bcard{width:${cardW}px;text-align:center}
    .ph{width:${circle}px;height:${circle}px;border-radius:50%;margin:0 auto ${Math.round(18*u)}px;
        background-position:center 26%;background-size:cover;background-repeat:no-repeat;background-color:#fff;
        border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 8px 22px rgba(0,0,0,0.45)}
    .nm{font-size:${nm}px;font-weight:800;line-height:1.05}
    .ti{font-size:${ti}px;font-weight:700;color:${GOLD};margin-top:${Math.round(6*u)}px;line-height:1.2}
    .ct{font-size:${ct}px;color:#cfd4da;margin-top:${Math.round(5*u)}px;line-height:1.25;word-break:break-word}
    .ct a{color:#cfd4da;text-decoration:none}`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
    <div class="card">
      <div class="band"><div class="bg"></div><div class="scrim"></div>
        <div class="bhead"><div class="kick">${DEAL.status}</div><div class="pname">${DEAL.title}</div></div>
      </div>
      <img class="logo" src="${LOGO}">
      <div class="lower">
        <div class="brokhead">${DEAL.heading}</div>
        <div class="cards">${BROKERS.map(b => card(b, u, n)).join('')}</div>
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
