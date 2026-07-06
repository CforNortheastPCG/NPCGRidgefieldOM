const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFName, PDFArray, PDFDict, PDFRef, PDFStream, PDFNumber } = require('pdf-lib');
const meta = require('./pdf-meta.cjs');

/* ═══════════════════ VECTOR-PDF POST-PROCESS ═══════════════════
   Two fixes applied to the freshly rendered page.pdf() output:

   1. COLORSPACE NORMALIZE — Skia/PDF tags every image (and some fills) with a
      compact ICC v4 profile via [/ICCBased n 0 R]. Chromium's own viewer reads
      it fine, but Adobe Acrobat / macOS Preview / print RIPs can fail to parse
      the v4 profile and render those photos with a PINK/MAGENTA cast. The image
      data is plain sRGB, so we swap every 3-channel ICCBased colorspace to
      /DeviceRGB (1-ch → /DeviceGray, 4-ch → /DeviceCMYK) — universally
      supported, visually identical.

   2. METADATA — embed the broker/listing metadata from pdf-meta.cjs
      (Title/Author/Subject/Keywords), same convention as the raster decks.

   Used two ways:
     • node fix-pdf.cjs [file.pdf]            — fix a PDF in place
     • require('./fix-pdf.cjs').fixPdf(file)  — from export.cjs */

const DEVICE = { 1: PDFName.of('DeviceGray'), 3: PDFName.of('DeviceRGB'), 4: PDFName.of('DeviceCMYK') };
const ICCBASED = PDFName.of('ICCBased');

async function fixPdf(file) {
  const doc = await PDFDocument.load(fs.readFileSync(file), { updateMetadata: false });
  const ctx = doc.context;

  // Map every ICC profile stream ref -> its channel count (/N in the stream dict).
  const iccN = new Map();
  for (const [ref, obj] of ctx.enumerateIndirectObjects()) {
    if (obj instanceof PDFStream) {
      const n = obj.dict.get(PDFName.of('N'));
      if (n instanceof PDFNumber && !obj.dict.has(PDFName.of('Type'))) iccN.set(ref.toString(), n.asNumber());
    }
  }

  // An [/ICCBased n 0 R] array -> the /Device* name to replace it with.
  const replacementFor = (obj) => {
    if (!(obj instanceof PDFArray) || obj.size() !== 2) return null;
    const [tag, ref] = [obj.get(0), obj.get(1)];
    if (!(tag === ICCBASED || (tag instanceof PDFName && tag.asString() === '/ICCBased'))) return null;
    if (!(ref instanceof PDFRef)) return null;
    return DEVICE[iccN.get(ref.toString())] || DEVICE[3];
  };

  // Walk every object graph; swap ICCBased arrays wherever they sit (image
  // /ColorSpace, resource /ColorSpace dicts, shading dicts, nested arrays).
  let swapped = 0;
  const seen = new Set();
  const walk = (obj) => {
    if (obj instanceof PDFRef) {
      if (seen.has(obj.toString())) return;
      seen.add(obj.toString());
      const target = ctx.lookup(obj);
      const rep = replacementFor(target);
      if (rep) { ctx.assign(obj, rep); swapped++; return; }
      return walk(target);
    }
    // Streams (image XObjects, shadings) keep their dict in .dict — walk it;
    // the raw bytes themselves are never touched.
    if (obj instanceof PDFStream) return walk(obj.dict);
    if (obj instanceof PDFDict) {
      for (const key of obj.keys()) {
        const val = obj.get(key);
        const rep = replacementFor(val);
        if (rep) { obj.set(key, rep); swapped++; }
        else walk(val);
      }
    }
    if (obj instanceof PDFArray) {
      for (let i = 0; i < obj.size(); i++) {
        const val = obj.get(i);
        const rep = replacementFor(val);
        if (rep) { obj.set(i, rep); swapped++; }
        else walk(val);
      }
    }
  };
  for (const [ref] of ctx.enumerateIndirectObjects()) walk(ref);

  doc.setTitle(meta.title);
  doc.setAuthor(meta.author);
  doc.setSubject(meta.subject);
  doc.setKeywords(meta.keywords);
  doc.setCreator(meta.creator);
  doc.setProducer(meta.producer);

  const bytes = await doc.save({ useObjectStreams: false });
  fs.writeFileSync(file, bytes);
  const mb = (bytes.length / 1024 / 1024).toFixed(1);
  console.log(`▸ fix-pdf: ${swapped} ICCBased colorspaces → Device*, metadata embedded · ${mb} MB`);
  return { swapped, mb };
}

module.exports = { fixPdf };

if (require.main === module) {
  const file = path.resolve(process.argv[2] || require('./print.cjs').dealPdfName());
  fixPdf(file).catch(err => { console.error(err); process.exit(1); });
}
