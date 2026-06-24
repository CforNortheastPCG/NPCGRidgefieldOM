/* Extra social-post design options for South End Plaza — 5 distinct looks, each
   rendered at LinkedIn (1200x1200) and Instagram (1080x1350). The base cover
   script (social.cjs) is unchanged; this one is additive.

   Variants:
     1 stats   — top title + a stats row across the bottom
     2 listed  — gold "JUST LISTED" ribbon, title at the bottom
     3 panel   — photo up top, solid carbon panel below with title + stats
     4 centered— centered status chip + title, address footer
     5 price   — offering price as the hero number

   Run: node social-variants.cjs   →   South-End-Plaza-social-<variant>-<size>.png */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer');
const ROOT = __dirname;
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(path.join(ROOT, p)).toString('base64');
const BG = b64('public/photos/cover.jpg', 'image/jpeg');
const LOGO = b64('public/logos/npcg-white-hires.png', 'image/png');
const GOLD = '#F8971D';
const CARBON = '#2b3038';

const DEAL = {
  eyebrow: '17-Unit Mixed-Use · Value-Add',
  title: 'South End<br>Plaza',
  addr: '310 South Main Street · Thomaston, CT 06787',
  stats: [
    { v: '$2,450,000', k: 'Offering Price' },
    { v: '17', k: 'Units' },
    { v: '6.47%→8.02%', k: 'Cap Rate' },
    { v: '±14,614 SF', k: 'Building' },
  ],
};

const baseCss = (W, H, u, pad) => `
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  .card{position:relative;width:${W}px;height:${H}px;font-family:'Helvetica Neue',Arial,sans-serif;background:${CARBON};color:#fff}
  .bg{position:absolute;inset:0;background:url('${BG}') center 44%/cover no-repeat}
  .logo{position:absolute;top:${pad}px;right:${pad}px;height:${Math.round(56*u)}px;z-index:5}
  .eyebrow{font-size:${Math.round(22*u)}px;font-weight:700;letter-spacing:${0.22*u}em;text-transform:uppercase;
      text-shadow:0 1px 10px rgba(0,0,0,0.9);margin-bottom:${Math.round(16*u)}px}
  .title{font-size:${Math.round(100*u)}px;font-weight:800;line-height:0.96;letter-spacing:-0.01em;
      text-shadow:0 3px 20px rgba(0,0,0,0.8)}
  .rule{width:${Math.round(86*u)}px;height:${Math.round(5*u)}px;background:${GOLD};margin:${Math.round(22*u)}px 0 0}
  .addr{font-size:${Math.round(21*u)}px;font-weight:600;letter-spacing:${0.04*u}em;text-shadow:0 1px 8px rgba(0,0,0,0.95)}
  .scrim-tb{position:absolute;inset:0;background:linear-gradient(to bottom,
      rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 22%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.9) 100%)}
  .scrim-bottom{position:absolute;inset:0;background:linear-gradient(to bottom,
      rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.92) 100%)}
  .scrim-soft{position:absolute;inset:0;background:linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.55) 100%)}
`;

const statRow = (u) => `
  <div class="stats">${DEAL.stats.map(s => `
    <div class="stat"><div class="v">${s.v}</div><div class="k">${s.k}</div></div>`).join('')}</div>`;

// ── variant builders ───────────────────────────────────────────────────────
const variants = {
  // 1 — top title, stats strip across the bottom
  stats: (W, H, u, pad) => ({
    css: `
      .head{position:absolute;top:${pad}px;left:${pad}px;right:${pad}px}
      .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px}
      .stats{display:flex;justify-content:space-between;align-items:flex-end;gap:${Math.round(24*u)}px;
          border-top:1px solid rgba(255,255,255,0.4);padding-top:${Math.round(20*u)}px}
      .stat .v{font-size:${Math.round(32*u)}px;font-weight:800;color:${GOLD};line-height:1;text-shadow:0 2px 10px rgba(0,0,0,0.8)}
      .stat .k{font-size:${Math.round(13*u)}px;font-weight:700;letter-spacing:${0.08*u}em;text-transform:uppercase;
          opacity:0.92;margin-top:${Math.round(7*u)}px;text-shadow:0 1px 6px rgba(0,0,0,0.9)}`,
    scrim: 'scrim-tb',
    body: `<img class="logo" src="${LOGO}">
      <div class="head"><div class="eyebrow">${DEAL.eyebrow}</div><div class="title">${DEAL.title}</div><div class="rule"></div></div>
      <div class="foot">${statRow(u)}</div>`,
  }),

  // 2 — gold "JUST LISTED" ribbon, title at bottom
  listed: (W, H, u, pad) => ({
    css: `
      .ribbon{position:absolute;top:${Math.round(54*u)}px;left:0;background:${GOLD};color:#1b1e23;
          font-size:${Math.round(20*u)}px;font-weight:800;letter-spacing:${0.18*u}em;text-transform:uppercase;
          padding:${Math.round(12*u)}px ${Math.round(34*u)}px ${Math.round(12*u)}px ${pad}px;
          box-shadow:0 6px 18px rgba(0,0,0,0.4)}
      .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px}
      .foot .eyebrow{color:${GOLD}}
      .foot .addr{margin-top:${Math.round(18*u)}px}`,
    scrim: 'scrim-bottom',
    body: `<img class="logo" src="${LOGO}">
      <div class="ribbon">Just Listed</div>
      <div class="foot"><div class="eyebrow">${DEAL.eyebrow}</div><div class="title">${DEAL.title}</div><div class="rule"></div>
        <div class="addr">${DEAL.addr}</div></div>`,
  }),

  // 3 — photo on top, solid carbon panel below with title + stats
  panel: (W, H, u, pad) => {
    const panelH = Math.round(H * 0.40);
    return {
      css: `
        .bg{background-position:center 38%}
        .panel{position:absolute;left:0;right:0;bottom:0;height:${panelH}px;background:${CARBON};
            padding:${Math.round(40*u)}px ${pad}px;display:flex;flex-direction:column;justify-content:center}
        .panel .title{font-size:${Math.round(76*u)}px}
        .panel .eyebrow{color:${GOLD}}
        .panel .addr{margin:${Math.round(14*u)}px 0 ${Math.round(22*u)}px;opacity:0.85}
        .stats{display:flex;gap:${Math.round(40*u)}px}
        .stat .v{font-size:${Math.round(30*u)}px;font-weight:800;color:#fff;line-height:1}
        .stat .k{font-size:${Math.round(12.5*u)}px;font-weight:700;letter-spacing:${0.08*u}em;text-transform:uppercase;
            color:${GOLD};margin-top:${Math.round(6*u)}px}`,
      scrim: 'scrim-soft',
      body: `<img class="logo" src="${LOGO}">
        <div class="panel">
          <div class="eyebrow">${DEAL.eyebrow}</div><div class="title">${DEAL.title}</div>
          <div class="addr">${DEAL.addr}</div>${statRow(u)}
        </div>`,
    };
  },

  // 4 — centered status chip + title
  centered: (W, H, u, pad) => ({
    css: `
      .center{position:absolute;top:42%;left:${pad}px;right:${pad}px;transform:translateY(-50%);text-align:center}
      .chip{display:inline-block;border:${Math.round(2*u)}px solid ${GOLD};color:${GOLD};
          font-size:${Math.round(18*u)}px;font-weight:800;letter-spacing:${0.24*u}em;text-transform:uppercase;
          padding:${Math.round(9*u)}px ${Math.round(22*u)}px;margin-bottom:${Math.round(26*u)}px}
      .center .title{font-size:${Math.round(96*u)}px}
      .center .rule{margin:${Math.round(24*u)}px auto 0}
      .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px;text-align:center}`,
    scrim: 'scrim-soft',
    body: `<img class="logo" src="${LOGO}">
      <div class="center"><div class="chip">For Sale</div><div class="title">${DEAL.title}</div><div class="rule"></div></div>
      <div class="foot"><div class="addr">${DEAL.addr}</div></div>`,
  }),

  // 5 — offering price as the hero number
  price: (W, H, u, pad) => ({
    css: `
      .head{position:absolute;top:${pad}px;left:${pad}px;right:${pad}px}
      .head .title{font-size:${Math.round(68*u)}px}
      .foot{position:absolute;left:${pad}px;right:${pad}px;bottom:${pad}px}
      .pricelab{font-size:${Math.round(20*u)}px;font-weight:700;letter-spacing:${0.16*u}em;text-transform:uppercase;
          opacity:0.9;margin-bottom:${Math.round(8*u)}px;text-shadow:0 1px 8px rgba(0,0,0,0.9)}
      .price{font-size:${Math.round(108*u)}px;font-weight:800;color:${GOLD};line-height:0.95;
          text-shadow:0 3px 20px rgba(0,0,0,0.8)}
      .foot .addr{margin-top:${Math.round(18*u)}px;border-top:1px solid rgba(255,255,255,0.35);padding-top:${Math.round(16*u)}px}`,
    scrim: 'scrim-tb',
    body: `<img class="logo" src="${LOGO}">
      <div class="head"><div class="eyebrow">${DEAL.eyebrow}</div><div class="title">${DEAL.title}</div><div class="rule"></div></div>
      <div class="foot"><div class="pricelab">Offered At</div><div class="price">$2,450,000</div>
        <div class="addr">${DEAL.addr}</div></div>`,
  }),
};

const render = (name, W, H) => {
  const u = W / 1080, pad = Math.round(64 * u);
  const v = variants[name](W, H, u, pad);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W, H, u, pad)}${v.css}</style></head>
    <body><div class="card"><div class="bg"></div><div class="${v.scrim}"></div>${v.body}</div></body></html>`;
};

const sizes = [
  { name: 'linkedin', w: 1200, h: 1200 },
  { name: 'instagram', w: 1080, h: 1350 },
];
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (const name of Object.keys(variants)) {
    for (const s of sizes) {
      const page = await browser.newPage();
      await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
      await page.setContent(render(name, s.w, s.h), { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const out = path.join(ROOT, `South-End-Plaza-social-${name}-${s.name}.png`);
      await page.screenshot({ path: out });
      console.log(`${path.basename(out)}  ${s.w}x${s.h}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
      await page.close();
    }
  }
  await browser.close();
})();
