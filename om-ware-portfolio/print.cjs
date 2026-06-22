const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

// Document metadata stamped into the final PDF (Chrome only embeds <title>;
// everything else — Author, Subject, Keywords, Creator/Producer — is set here).
const META = {
  title: 'Ware Portfolio, 20-Unit Multifamily — Ware, MA · Offering Memorandum',
  author: 'Northeast Private Client Group',
  subject: '20-unit, multi-building apartment portfolio across 27 Parker St, 28-30 & 28.5 North St, and 38 North St in downtown Ware, MA — a value-add offering from Northeast Private Client Group.',
  keywords: ['Ware Portfolio', 'Ware MA multifamily', 'apartment portfolio for sale', 'value-add multifamily', '20-unit portfolio', 'Northeast Private Client Group', 'offering memorandum'],
  creator: 'Northeast Private Client Group',
  producer: 'Northeast Private Client Group — OM Engine',
};

// Usage: node print.cjs [port] [outfile]
const PORT = process.argv[2] || process.env.PORT || '5173';
const OUT = process.argv[3] || path.join(__dirname, 'Ware-Portfolio-Ware-MA-OM.pdf');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ompdf-'));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });

  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });
  // Capture under print media so the @media print rules in index.css apply
  // (background color-adjust + print-only photo brightness lift).
  await page.emulateMediaType('print');
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 3000));

  const pages = await page.$$('.page');
  console.log(`Found ${pages.length} pages`);

  const files = [];
  for (let i = 0; i < pages.length; i++) {
    const f = path.join(TMP, `page-${String(i).padStart(2, '0')}.jpg`);
    await pages[i].screenshot({ path: f, type: 'jpeg', quality: Number(process.env.QUALITY || 60) });
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
    <html><head><meta charset="utf-8" />
    <title>Ware Portfolio, 20-Unit Multifamily — Ware, MA · Offering Memorandum</title>
    <meta name="author" content="Northeast Private Client Group" />
    </head><style>
      * { margin: 0; padding: 0; }
      @page { size: 11in 8.5in; margin: 0; }
      html, body { margin: 0; padding: 0; }
      .pdf-page { width: 11in; height: 8.5in; page-break-after: always; display: flex; align-items: center; justify-content: center; background: white; overflow: hidden; }
      .pdf-page:last-child { page-break-after: auto; }
      /* cover (not contain): the 960x742 screenshot ratio is a hair off 11x8.5,
         so contain leaves a hairline white frame — overshoot the edges instead. */
      .pdf-page img { width: 100%; height: 100%; object-fit: cover; }
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
    preferCSSPageSize: true,
  });

  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });

  // Stamp full document metadata into the PDF (Chrome only carries <title>).
  const pdfDoc = await PDFDocument.load(fs.readFileSync(OUT), { updateMetadata: false });
  const now = new Date();
  pdfDoc.setTitle(META.title);
  pdfDoc.setAuthor(META.author);
  pdfDoc.setSubject(META.subject);
  pdfDoc.setKeywords(META.keywords);
  pdfDoc.setCreator(META.creator);
  pdfDoc.setProducer(META.producer);
  pdfDoc.setCreationDate(now);
  pdfDoc.setModificationDate(now);
  fs.writeFileSync(OUT, await pdfDoc.save());

  console.log(`PDF saved to ${OUT}`);
})();
