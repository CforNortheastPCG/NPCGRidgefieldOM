const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const meta = require('./pdf-meta.cjs');
(async () => {
  const src = '387-Danbury-Listing-Update.pdf';
  const doc = await PDFDocument.load(fs.readFileSync(src));
  doc.setTitle(meta.title);
  doc.setAuthor(meta.author);
  doc.setSubject(meta.subject);
  doc.setKeywords(meta.keywords);
  doc.setCreator(meta.creator);
  doc.setProducer(meta.producer);
  fs.writeFileSync(src, await doc.save());
  console.log('metadata stamped:', meta.title);
})();
