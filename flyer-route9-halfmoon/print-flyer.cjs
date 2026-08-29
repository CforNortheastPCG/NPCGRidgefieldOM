/* Self-contained Route 9 flyer exporter — no dev server.
   Builds the deck from src/data.js + the house style pack in src/styles/
   (tokens.css + index.css copied verbatim from om-hysil / AutoOM style pack
   v1, plus flyer.css for flyer-only vocabulary), writes out/preview.html
   (openable in any browser), screenshots each 960×742 .page at 2×, composes
   a 4-page landscape 11×8.5 PDF, then embeds AI-facing metadata.

   No node_modules here — borrow a sibling that has puppeteer and pdf-lib:
     NODE_PATH=../om-southend-plaza/node_modules node print-flyer.cjs
   (that is what `npm run print` does).
*/
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = __dirname;
const PUB = path.join(ROOT, 'public');
const OUTDIR = path.join(ROOT, 'out');
const SLUG = 'route9-halfmoon';
fs.mkdirSync(OUTDIR, { recursive: true });
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'r9flyer-'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => path.join(PUB, p.replace(/^\/+/, ''));
const has = (p) => fs.existsSync(abs(p));
const asset = (p) => 'file://' + abs(p);

const LOGO_WHITE = '/logos/npcg-white-hires.png';

/* A photo tile that degrades to the house .photo-missing placeholder when the
   file has not been dropped in yet, so the deck always composes. */
const photoItem = (src, cap, extra = '', style = '') => `
  <div class="photo-item ${extra}">
    ${has(src)
      ? `<img src="${asset(src)}" alt=""${style ? ` style="${style}"` : ''}>`
      : '<div class="photo-missing">Photo pending</div>'}
    ${cap ? `<div class="photo-caption">${esc(cap)}</div>` : ''}
  </div>`;

/* ── House page furniture (Shell.tsx equivalents) ── */
const pageHeader = (d, section) => `
  <div class="page-header">
    <img src="${asset(LOGO_WHITE)}" alt="NPCG">
    <div class="section-label">${esc(section)}<strong>${esc(d.name)}</strong></div>
  </div>`;

const pageFooter = (d, n) => `
  <div class="page-footer">
    <span class="conf">Northeast Private Client Group · ${esc(d.addresses)}</span>
    <span class="page-num">${n}</span>
  </div>`;

const titleBlock = (eyebrow, title, accent) => `
  <div class="eyebrow">${esc(eyebrow)}</div>
  <div class="section-title">${esc(title)} <span class="accent">${esc(accent)}</span></div>
  <div class="title-rule"></div>`;

const SECTION_FLEX = 'flex:1;display:flex;flex-direction:column;min-height:0';

/* ── PAGE 1 · COVER ── */
function pageCover(d) {
  const tiles = d.coverStats.map((s) =>
    `<div class="stat-tile"><div class="st-val">${esc(s.v)}</div><div class="st-label">${esc(s.l)}</div></div>`).join('');
  return `
  <div class="page">
    <div class="cover-hero">
      ${has(d.photos.hero)
        ? `<img class="cover-hero-img" src="${asset(d.photos.hero)}" alt="">`
        : '<div class="cover-hero-fallback"></div>'}
      <div class="cover-hero-shade"></div>
      <div class="cover-hero-header"><img src="${asset(LOGO_WHITE)}" alt="NPCG" style="height:38px;object-fit:contain"></div>
      <div class="cover-hero-overlay">
        <div class="cover-hero-status">${esc(d.eyebrow)}</div>
        <div class="cover-hero-name">${esc(d.name)}</div>
        <div class="cover-hero-rule"></div>
        <div class="cover-hero-sub">${esc(d.addresses)}</div>
        <div class="cover-hero-prep">Exclusively Listed by Northeast Private Client Group</div>
      </div>
      ${has(d.photos.hero) ? '' : '<div class="cover-hero-note">Cover image pending — drone shoot</div>'}
    </div>
    <div class="cover-statband">${tiles}</div>
  </div>`;
}

/* ── PAGE 2 · INVESTMENT SUMMARY ── */
function pageSummary(d) {
  const rows = d.facts.map((f) =>
    `<tr><td>${esc(f.label)}</td><td class="num${f.accent ? ' accent' : ''}">${esc(f.value)}</td></tr>`).join('');
  const li = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join('');
  const ins = d.siteInset;
  const zoom = `transform:scale(${ins.scale});transform-origin:${ins.originX} ${ins.originY}`;

  return `
  <div class="page">
    ${pageHeader(d, 'Investment Summary')}
    <div class="section section--tight" style="${SECTION_FLEX}">
      ${titleBlock(d.addresses, 'Investment', 'Summary')}
      <p class="lead">${esc(d.lead)}</p>
      <div class="prose">${d.overview.map((p) => `<p>${esc(p)}</p>`).join('')}</div>

      <div class="two-col two-col--wide-left stack-gap">
        <div class="col">
          <div class="site-inset">${has(d.photos.retailAerial) ? `<img src="${asset(d.photos.retailAerial)}" alt="" style="${zoom}">` : ''}</div>
          <div class="inset-cap">${esc(d.siteCaption)}</div>
          <div class="hl-group-title stack-gap">Highlights</div>
          <ul class="highlights">${li(d.highlights)}</ul>
        </div>
        <div class="col">
          <table class="data-table data-table--compact">
            <thead><tr><th>Deal at a Glance</th><th class="num">Detail</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </div>
    ${pageFooter(d, 2)}
  </div>`;
}

/* ── PAGE 3 · TRADE AREA — full-page retail aerial ── */
function pageAerial(d) {
  return `
  <div class="page">
    ${pageHeader(d, 'Trade Area & Retail Context')}
    <div class="aerial-full">
      ${has(d.photos.retailAerial) ? `<img src="${asset(d.photos.retailAerial)}" alt="">` : '<div class="photo-missing">Aerial pending</div>'}
      <div class="aerial-cap">${esc(d.retailCaption)}</div>
    </div>
    ${pageFooter(d, 3)}
  </div>`;
}

/* ── PAGE 4 · POSITIONING & CONTACTS ── */
function pageClose(d, brokers, bio, office) {
  const photos = d.closingPhotos.map((p) => photoItem(p.src, p.cap)).join('');

  const paths = d.paths.map((p) => `
    <div class="hl-item hl-item--sm">
      <div class="hl-head">${esc(p.tag)}</div>
      <div class="hl-body">${esc(p.body)}</div>
    </div>`).join('');

  const team = brokers.map((b) => `
    <div class="dc-broker">
      ${has(b.photo)
        ? `<img class="dc-avatar" src="${asset(b.photo)}" alt="">`
        : `<div class="dc-avatar dc-avatar--ph">${esc(b.name.split(' ').map((w) => w[0]).join('').slice(0, 2))}</div>`}
      <div>
        <div class="dc-title">${esc(b.title)}</div>
        <div class="dc-name">${esc(b.name)}</div>
        <div class="dc-meta">Direct ${esc(b.phone)}${b.cell ? ` · Cell ${esc(b.cell)}` : ''}</div>
        <div class="dc-meta">${esc(b.email)}</div>
      </div>
    </div>`).join('');

  return `
  <div class="page">
    ${pageHeader(d, 'Positioning & Contacts')}
    <div class="section section--tight" style="${SECTION_FLEX}">
      ${titleBlock(d.addresses, 'Paths to', 'Value')}
      <div class="paths-grid">${paths}</div>

      <div class="photo-grid g-3up stack-gap">${photos}</div>

      <div class="dc-layout stack-gap" style="flex:0 0 auto">
        <div class="dc-contacts">
          <div class="dc-disclaimer-title">Exclusively Listed By</div>
          ${team}
          <div class="dc-office">${esc(office)}</div>
        </div>
        <div class="dc-disclaimer">
          <div class="dc-disclaimer-title">Diligence &amp; Watch Items</div>
          <ul class="highlights highlights--watch">${d.watch.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <p class="fine" style="margin-top:10px">${esc(bio)} All information is from sources deemed reliable but is not guaranteed. Parcel, assessment, tax, utility, and flood-zone figures are taken from the Courthouse Retrieval System property report for tax parcel 285.1-1-38.1 and public records. Zoning, permitted uses, access, and development potential are subject to Town of Halfmoon and NYSDOT review. Buyer to verify all information independently.</p>
        </div>
      </div>
    </div>
    ${pageFooter(d, 4)}
  </div>`;
}

async function embedMetadata(out, d) {
  try {
    const { PDFDocument } = require('pdf-lib');
    const { buildMeta } = require('./flyer-meta.cjs');
    const meta = buildMeta(d);
    const doc = await PDFDocument.load(fs.readFileSync(out));
    doc.setTitle(meta.title);
    doc.setAuthor(meta.author);
    doc.setSubject(meta.subject);
    doc.setKeywords(meta.keywords);
    doc.setCreator(meta.creator);
    doc.setProducer(meta.producer);
    fs.writeFileSync(out, await doc.save());
    console.log('Embedded broker metadata (Title/Author/Subject/Keywords).');
  } catch (err) {
    console.warn('  ↳ metadata embed skipped:', err.message);
  }
}

/* tokens.css → index.css → flyer.css, with the local @imports flattened and
   the Google Fonts @import hoisted (an @import must lead the stylesheet). */
function buildCss() {
  const read = (f) => fs.readFileSync(path.join(ROOT, 'src', 'styles', f), 'utf8');
  const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');";
  const strip = (s) => s.replace(/^\s*@import\s+[^;]+;\s*$/gm, '');
  return [fontImport, strip(read('tokens.css')), strip(read('index.css')), strip(read('flyer.css'))].join('\n');
}

(async () => {
  const { ROUTE9: d, BROKERS, FIRM_BIO, OFFICE } = await import('./src/data.js');

  const html = `<!doctype html><html><head><meta charset="utf-8">
    <title>${esc(d.name)} — ${esc(d.cityState)} · For Sale</title>
    <style>${buildCss()}</style></head><body>
    <div class="om-container">
      ${pageCover(d)}
      ${pageSummary(d)}
      ${pageAerial(d)}
      ${pageClose(d, BROKERS, FIRM_BIO, OFFICE)}
    </div></body></html>`;

  const previewPath = path.join(OUTDIR, 'preview.html');
  fs.writeFileSync(previewPath, html);
  console.log(`Preview: ${previewPath}`);

  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1040, height: 900, deviceScaleFactor: 2 });
  await page.goto('file://' + previewPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1200));

  const sides = await page.$$('.page');
  console.log(`Found ${sides.length} flyer pages`);
  const files = [];
  for (let i = 0; i < sides.length; i++) {
    const png = path.join(OUTDIR, `${SLUG}-p${i + 1}.png`);
    await sides[i].screenshot({ path: png, type: 'png' });
    files.push(png);
    console.log(`Captured page ${i + 1}`);
  }
  await page.close();

  const pdfPage = await browser.newPage();
  const imgTags = files.map((f) => `<div class="pp"><img src="file://${f}"></div>`).join('\n');
  const pHtml = path.join(TMP, 'pages.html');
  fs.writeFileSync(pHtml, `<html><style>
      * { margin: 0; padding: 0; }
      @page { size: 11in 8.5in; margin: 0; }
      .pp { width: 11in; height: 8.5in; page-break-after: always; display: flex; align-items: center; justify-content: center; background: #fff; }
      .pp:last-child { page-break-after: auto; }
      .pp img { width: 100%; height: 100%; object-fit: contain; }
    </style><body>${imgTags}</body></html>`);
  await pdfPage.goto('file://' + pHtml, { waitUntil: 'networkidle0', timeout: 60000 });
  const pdfOut = path.join(OUTDIR, `${SLUG}-flyer.pdf`);
  await pdfPage.pdf({ path: pdfOut, width: '11in', height: '8.5in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });

  await embedMetadata(pdfOut, { ...d, contacts: BROKERS });
  console.log(`PDF: ${pdfOut}`);
})();
