const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

// Usage: node print.cjs [port] [outfile]
const PORT = process.argv[2] || process.env.PORT || '5173';
const OUT = process.argv[3] || path.join(__dirname, '711-Savin-Ave-Williston-West-Haven-OM.pdf');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ompdf-'));

// Document metadata — stamped into the PDF so viewers show a real title
// instead of the temp compositor filename ("index").
const META = {
  title: 'The Williston, 711 Savin Avenue, West Haven, CT — 69-Unit Multifamily Offering Memorandum',
  author: 'Northeast Private Client Group',
  subject: 'For Sale · The Williston — 711 Savin Avenue, West Haven, CT 06516 — 69-unit value-add elevator multifamily offering',
  keywords: ['offering memorandum', 'multifamily', 'investment property', 'value-add', 'West Haven CT', 'New Haven County', '711 Savin Avenue', 'The Williston', 'Northeast Private Client Group'],
  creator: 'Northeast Private Client Group',
};

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 3 });

  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 3000));

  const pages = await page.$$('.page');
  console.log(`Found ${pages.length} pages`);

  const files = [];
  for (let i = 0; i < pages.length; i++) {
    // JPEG (not PNG) keeps the finished PDF near the ~10MB email-friendly mark.
    const f = path.join(TMP, `page-${String(i).padStart(2, '0')}.jpg`);
    await pages[i].screenshot({ path: f, type: 'jpeg', quality: 77 });
    files.push(f);
    console.log(`Captured page ${i + 1}/${pages.length}`);
  }
  await page.close();

  // Compose: one landscape 11x8.5 page per screenshot, referenced by file:// so
  // the HTML stays tiny (embedding 29 base64 PNGs crashes the compositor).
  const pdfPage = await browser.newPage();
  const imgTags = files.map(f => `<div class="pdf-page"><img src="file://${f}" /></div>`).join('\n');
  const htmlPath = path.join(TMP, 'index.html');
  fs.writeFileSync(htmlPath, `
    <html><head><title>${META.title}</title></head><style>
      * { margin: 0; padding: 0; }
      @page { size: 11in 8.5in; margin: 0; }
      .pdf-page { width: 11in; height: 8.5in; page-break-after: always; display: flex; align-items: center; justify-content: center; background: white; }
      .pdf-page:last-child { page-break-after: auto; }
      .pdf-page img { width: 100%; height: 100%; object-fit: contain; }
    </style><body>${imgTags}</body></html>
  `);
  // Open as a file:// page so the file:// images load same-origin.
  await pdfPage.goto('file://' + htmlPath, { waitUntil: 'networkidle0', timeout: 60000 });

  await pdfPage.pdf({
    path: OUT,
    width: '11in',
    height: '8.5in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });

  // Rewrite the PDF info dictionary (Chrome only sets Title/Producer itself).
  const doc = await PDFDocument.load(fs.readFileSync(OUT));
  doc.setTitle(META.title);
  doc.setAuthor(META.author);
  doc.setSubject(META.subject);
  doc.setKeywords(META.keywords);
  doc.setCreator(META.creator);
  doc.setProducer(META.creator);
  const now = new Date();
  doc.setCreationDate(now);
  doc.setModificationDate(now);
  fs.writeFileSync(OUT, await doc.save());

  console.log(`PDF saved to ${OUT}`);
})();
