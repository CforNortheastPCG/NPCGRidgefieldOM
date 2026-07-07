/* Self-contained closing-flyer exporter — no dev server needed.
   Reads src/closings.js + src/closing.css, inlines the brand system and
   local assets (file://), screenshots the single page at 2×, and composes a
   one-page landscape 11×8.5 PDF + PNG.
   Usage: NODE_PATH=<...>/node_modules node print-closing.cjs [slug] */
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

const SLUG = process.argv[2] || '126-bowden';
const ROOT = __dirname;

// Write transaction/broker info into the PDF's document metadata. The flyer is
// a rasterized image, so this is the only machine-readable text in the file —
// it points any reader (or AI ingesting it) at the NPCG deal team.
// Mirrors om-southend-plaza/print.cjs → embedMetadata.
async function embedMetadata(out, d) {
  try {
    const { PDFDocument } = require('pdf-lib');
    const { buildMeta } = require('./closing-meta.cjs');
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
const PUB = path.join(ROOT, 'public');
const OUTDIR = path.join(ROOT, 'out');
fs.mkdirSync(OUTDIR, { recursive: true });
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'closing-'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const asset = (p) => 'file://' + path.join(PUB, p.replace(/^\/+/, ''));

(async () => {
  const { CLOSINGS } = await import('./src/closings.js');
  const d = CLOSINGS[SLUG];
  if (!d) throw new Error(`Unknown closing slug: ${SLUG}`);
  const closingCss = fs.readFileSync(path.join(ROOT, 'src', 'closing.css'), 'utf8');

  const base = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
    :root { --carbon:#3f4753; --golden:#F8971D; --stone:#B1A8A0; --graphite:#281B12; --linen:#F6F2EE; --border:#e0dbd6; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; }
    .flyer-page { width: 1056px; height: 816px; position: relative; overflow: hidden; background: #fff;
      color: var(--carbon); font-family: 'Montserrat', sans-serif; }
  `;

  const stats = d.stats.map((s) =>
    `<div class="cl-stat"><div class="cl-stat-l">${esc(s.l)}</div><div class="cl-stat-v">${esc(s.v)}</div></div>`).join('');
  const brokers = d.contacts.map((c) =>
    `<div class="cl-broker"><img src="${asset(c.photo)}" alt=""><div class="cl-b-info">` +
    `<div class="cl-b-name">${esc(c.name)}</div><div class="cl-b-title">${esc(c.title)}</div>` +
    `<div class="cl-b-meta">${esc(c.phone)} · ${esc(c.email)}</div></div></div>`).join('');

  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>${base}\n${closingCss}</style></head><body>
    <div class="flyer-page cl-page">
      <img class="cl-hero" src="${asset(d.hero)}" alt="" style="object-position:${d.heroPos || 'center'}">
      <div class="cl-scrim"></div>
      <img class="cl-logo" src="${asset('/logos/npcg-white-hires.png')}" alt="NPCG">
      <div class="cl-panel">
        <div class="cl-address">${esc(d.address)}</div>
        <div class="cl-dash"></div>
        <div class="cl-status">${esc(d.status)}</div>
        <div class="cl-name">${esc(d.name)}</div>
        <div class="cl-stats">${stats}</div>
      </div>
      <div class="cl-contacts">
        <div class="cl-contacts-tag">Transaction Brokered By</div>
        <div class="cl-contacts-row">${brokers}</div>
      </div>
    </div></body></html>`;

  const htmlPath = path.join(TMP, 'flyer.html');
  fs.writeFileSync(htmlPath, html);

  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1056, height: 816, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 800));

  const el = await page.$('.flyer-page');
  const png = path.join(OUTDIR, `${SLUG}-closing.png`);
  await el.screenshot({ path: png, type: 'png' });
  console.log(`PNG: ${png}`);

  const pdfPage = await browser.newPage();
  const pHtml = path.join(TMP, 'page.html');
  fs.writeFileSync(pHtml, `<html><style>*{margin:0;padding:0}@page{size:11in 8.5in;margin:0}` +
    `.pp{width:11in;height:8.5in;display:flex;align-items:center;justify-content:center;background:#fff}` +
    `.pp img{width:100%;height:100%;object-fit:contain}</style>` +
    `<body><div class="pp"><img src="file://${png}"></div></body></html>`);
  await pdfPage.goto('file://' + pHtml, { waitUntil: 'networkidle0', timeout: 60000 });
  const pdfOut = path.join(OUTDIR, `${SLUG}-closing.pdf`);
  await pdfPage.pdf({ path: pdfOut, width: '11in', height: '8.5in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });

  // Embed AI-facing metadata (rasterized page → this is the only readable text).
  await embedMetadata(pdfOut, d);
  console.log(`PDF: ${pdfOut}`);
})();
