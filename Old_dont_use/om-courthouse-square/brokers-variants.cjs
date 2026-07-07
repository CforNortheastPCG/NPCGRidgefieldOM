/* Broker slide — DESIGN EXPLORATION. Full-bleed property photo as the background,
   brokers overlaid, "Transaction Brokered By" for closed deals.
   Renders several variants at 1200x1200 so we can pick a direction, then the
   winner gets promoted into brokers.cjs for all three sizes.

   Run:  node brokers-variants.cjs            (all variants)
         ONLY=centered node brokers-variants.cjs
   Out:  Courthouse-Square-brokersV-<variant>.png */
const fs = require('fs'), path = require('path');
let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require('C:/NPCGRidgefieldOM/om-southend-plaza/node_modules/puppeteer'); }

const ROOT = __dirname;
const GOLD = '#F8971D';
const CARBON = '#2b3038';

const DEAL = {
  slug: 'Courthouse-Square',
  title: 'Courthouse Square',
  addr: 'Westfield, MA',
  heading: 'Transaction Brokered By',   // the lead message on this slide
  focus: '54% center',
};
DEAL.sub = `${DEAL.title} · ${DEAL.addr}`;  // small context line (sale lives on the other slide)
const BROKERS = [
  { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: 'Brad-Balletto.jpg' },
  { name: 'Taylor Perun',  title: 'Senior Vice President, Investments', phone: '(203) 307-1576', email: 'tperun@northeastpcg.com', photo: 'Taylor-Perun.jpg' },
];

const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const mime = (f) => /\.png$/i.test(f) ? 'image/png' : 'image/jpeg';
const BG = b64('photos/cover.jpg', 'image/jpeg');
const LOGO = b64('logos/npcg-white-hires.png', 'image/png');
const PH = (b) => b64(`photos/team/${b.photo}`, mime(b.photo));

const baseCss = (W, H, u, pad) => `
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:${CARBON};color:#fff}
  .bg{position:absolute;inset:0;background:url('${BG}') ${DEAL.focus}/cover no-repeat;filter:brightness(1.0) saturate(1.03)}
  .logo{position:absolute;top:${pad}px;right:${pad}px;height:${Math.round(54*u)}px;z-index:6}
  .kick{color:${GOLD};font-weight:800;text-transform:uppercase}
  .brokhead{color:${GOLD};font-weight:800;text-transform:uppercase;text-align:center}
`;

// shared broker card (circular headshot stacked over text)
const circleCard = (b, u, circle, nm, ti, ct) => `
  <div class="bcard" style="text-align:center">
    <div class="ph" style="width:${circle}px;height:${circle}px;background-image:url('${PH(b)}')"></div>
    <div style="font-size:${nm}px;font-weight:800;line-height:1.05;margin-top:${Math.round(16*u)}px">${b.name}</div>
    <div style="font-size:${ti}px;font-weight:700;color:${GOLD};margin-top:${Math.round(6*u)}px">${b.title}</div>
    <div style="font-size:${ct}px;color:#d7dbe0;margin-top:${Math.round(7*u)}px;line-height:1.3">${b.phone}</div>
    <div style="font-size:${ct}px;color:#d7dbe0;line-height:1.3">${b.email}</div>
  </div>`;

const variants = {
  // 1 — full dark veil, everything centered
  centered: (W, H, u, pad) => {
    const circle = Math.round(210 * u);
    return { css: `
      .veil{position:absolute;inset:0;background:linear-gradient(to bottom,
          rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.82) 100%)}
      .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${pad}px}
      .brokhead{font-size:${Math.round(34*u)}px;letter-spacing:${0.16*u}em}
      .rule{width:${Math.round(74*u)}px;height:${Math.round(4*u)}px;background:${GOLD};margin:${Math.round(20*u)}px auto ${Math.round(16*u)}px}
      .sub{font-size:${Math.round(21*u)}px;font-weight:600;letter-spacing:${0.04*u}em;color:#e7eaee;margin-bottom:${Math.round(46*u)}px}
      .cards{display:flex;gap:${Math.round(64*u)}px;justify-content:center}
      .ph{border-radius:50%;background-size:115% auto;background-position:center top;background-color:#fff;
          border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 10px 26px rgba(0,0,0,0.5)}`,
      body: `<div class="veil"></div>
        <div class="wrap">
          <div class="brokhead">${DEAL.heading}</div><div class="rule"></div>
          <div class="sub">${DEAL.sub}</div>
          <div class="cards">${BROKERS.map(b => circleCard(b, u, circle, Math.round(30*u), Math.round(16.5*u), Math.round(16*u))).join('')}</div>
        </div>` };
  },

  // 2 — translucent carbon panel across the bottom; clean photo above
  panel: (W, H, u, pad) => {
    const circle = Math.round(170 * u), panelTop = Math.round(H * 0.46);
    return { css: `
      .scrim{position:absolute;inset:0;background:linear-gradient(to bottom,
          rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 100%)}
      .plabel{position:absolute;left:${pad}px;top:${Math.round(56*u)}px;font-size:${Math.round(22*u)}px;font-weight:700;
          letter-spacing:${0.04*u}em;text-shadow:0 2px 12px rgba(0,0,0,0.9)}
      .panel{position:absolute;left:0;right:0;bottom:0;top:${panelTop}px;background:rgba(30,34,40,0.93);
          border-top:${Math.round(4*u)}px solid ${GOLD};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${pad}px}
      .brokhead{font-size:${Math.round(26*u)}px;letter-spacing:${0.18*u}em;margin-bottom:${Math.round(36*u)}px}
      .brokhead::after{content:'';display:block;width:${Math.round(64*u)}px;height:${Math.round(4*u)}px;background:${GOLD};margin:${Math.round(15*u)}px auto 0}
      .cards{display:flex;gap:${Math.round(56*u)}px;justify-content:center}
      .ph{border-radius:50%;background-size:cover;background-position:center 26%;background-color:#fff;
          border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 8px 22px rgba(0,0,0,0.45)}`,
      body: `<div class="scrim"></div>
        <div class="plabel">${DEAL.sub}</div>
        <div class="panel">
          <div class="brokhead">${DEAL.heading}</div>
          <div class="cards">${BROKERS.map(b => circleCard(b, u, circle, Math.round(26*u), Math.round(14.5*u), Math.round(14.5*u))).join('')}</div>
        </div>` };
  },

  // 3 — frosted glass cards (headshot left, details right) centered over the photo
  cards: (W, H, u, pad) => {
    const circle = Math.round(132 * u);
    const glassCard = (b) => `
      <div class="gcard">
        <div class="ph" style="width:${circle}px;height:${circle}px;background-image:url('${PH(b)}')"></div>
        <div class="gtext">
          <div style="font-size:${Math.round(27*u)}px;font-weight:800;line-height:1.05">${b.name}</div>
          <div style="font-size:${Math.round(14.5*u)}px;font-weight:700;color:${GOLD};margin-top:${Math.round(5*u)}px">${b.title}</div>
          <div style="font-size:${Math.round(14.5*u)}px;color:#dfe3e8;margin-top:${Math.round(9*u)}px;line-height:1.4">${b.phone}<br>${b.email}</div>
        </div>
      </div>`;
    return { css: `
      .veil{position:absolute;inset:0;background:linear-gradient(to bottom,
          rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.7) 100%)}
      .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${pad}px}
      .brokhead{font-size:${Math.round(32*u)}px;letter-spacing:${0.16*u}em;text-shadow:0 2px 12px rgba(0,0,0,0.8)}
      .sub{font-size:${Math.round(21*u)}px;font-weight:600;color:#e7eaee;margin:${Math.round(14*u)}px 0 ${Math.round(34*u)}px;text-shadow:0 2px 10px rgba(0,0,0,0.85)}
      .cards{display:flex;flex-direction:column;gap:${Math.round(22*u)}px;width:100%;max-width:${Math.round(640*u)}px}
      .gcard{display:flex;align-items:center;gap:${Math.round(26*u)}px;background:rgba(20,23,28,0.62);
          border:1px solid rgba(255,255,255,0.14);border-radius:${Math.round(18*u)}px;padding:${Math.round(22*u)}px ${Math.round(28*u)}px;
          backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
      .ph{border-radius:50%;background-size:cover;background-position:center 26%;background-color:#fff;flex:0 0 auto;
          border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 6px 18px rgba(0,0,0,0.45)}
      .gtext{text-align:left}`,
      body: `<div class="veil"></div>
        <div class="wrap">
          <div class="brokhead">${DEAL.heading}</div>
          <div class="sub">${DEAL.sub}</div>
          <div class="cards">${BROKERS.map(glassCard).join('')}</div>
        </div>` };
  },

  // 4 — left vertical rail; brokers stacked as rows; photo breathes on the right
  rail: (W, H, u, pad) => {
    const circle = Math.round(120 * u), railW = Math.round(W * 0.56);
    const row = (b) => `
      <div class="brow">
        <div class="ph" style="width:${circle}px;height:${circle}px;background-image:url('${PH(b)}')"></div>
        <div>
          <div style="font-size:${Math.round(26*u)}px;font-weight:800;line-height:1.05">${b.name}</div>
          <div style="font-size:${Math.round(14.5*u)}px;font-weight:700;color:${GOLD};margin-top:${Math.round(5*u)}px">${b.title}</div>
          <div style="font-size:${Math.round(14.5*u)}px;color:#dfe3e8;margin-top:${Math.round(8*u)}px;line-height:1.35">${b.phone} &nbsp;·&nbsp; ${b.email}</div>
        </div>
      </div>`;
    return { css: `
      .rail{position:absolute;left:0;top:0;bottom:0;width:${railW}px;
          background:linear-gradient(to right, rgba(20,23,28,0.94) 0%, rgba(24,27,33,0.9) 70%, rgba(24,27,33,0) 100%);
          display:flex;flex-direction:column;justify-content:center;padding:${pad}px ${Math.round(48*u)}px ${pad}px ${pad}px}
      .brokhead{text-align:left;font-size:${Math.round(28*u)}px;letter-spacing:${0.14*u}em}
      .brokhead::after{content:'';display:block;width:${Math.round(64*u)}px;height:${Math.round(4*u)}px;background:${GOLD};margin:${Math.round(16*u)}px 0 0}
      .sub{font-size:${Math.round(20*u)}px;font-weight:600;color:#e7eaee;margin:${Math.round(14*u)}px 0 ${Math.round(34*u)}px}
      .rows{display:flex;flex-direction:column;gap:${Math.round(26*u)}px}
      .brow{display:flex;align-items:center;gap:${Math.round(22*u)}px}
      .ph{border-radius:50%;background-size:cover;background-position:center 26%;background-color:#fff;flex:0 0 auto;
          border:${Math.round(3*u)}px solid ${GOLD};box-shadow:0 6px 18px rgba(0,0,0,0.45)}`,
      body: `<div class="rail">
          <div class="brokhead">${DEAL.heading}</div>
          <div class="sub">${DEAL.sub}</div>
          <div class="rows">${BROKERS.map(row).join('')}</div>
        </div>` };
  },
};

const render = (name, W, H) => {
  const u = W / 1080, pad = Math.round(64 * u);
  const v = variants[name](W, H, u, pad);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W,H,u,pad)}${v.css}</style></head>
    <body><div class="card"><div class="bg"></div>${v.body}<img class="logo" src="${LOGO}"></div></body></html>`;
};

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const only = process.env.ONLY ? process.env.ONLY.split(',') : Object.keys(variants);
  for (const name of only) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 2 });
    await page.setContent(render(name, 1200, 1200), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(ROOT, `${DEAL.slug}-brokersV-${name}.png`);
    await page.screenshot({ path: file });
    console.log(`${path.basename(file)}  ${(fs.statSync(file).size/1024).toFixed(0)}KB`);
    await page.close();
  }
  await browser.close();
})();
