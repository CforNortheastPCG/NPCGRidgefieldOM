/* Re-fetch the brands whose logo pick was wrong, via known Commons titles or Commons search. */
const fs = require('fs');
const path = require('path');

const UA = 'NPCG-OM-builder/1.0 (propdata2@gmail.com)';
const OUT = path.join(__dirname, 'logos');

const FIXES = [
  ['homedepot', 'File:TheHomeDepot.svg', null],
  ['mcdonalds', "File:McDonald's Golden Arches.svg", null],
  ['walmart', null, 'Walmart logo 2025 svg'],
  ['wendys', null, "Wendy's logo 2012 svg"],
  ['tacobell', null, 'Taco Bell logo 2016 svg'],
  ['starbucks', null, 'Starbucks Corporation logo 2011 svg'],
  ['kohls', null, "Kohl's logo svg"],
  ['tjmaxx', null, 'TJ Maxx logo svg'],
  ['panera', null, 'Panera Bread logo svg'],
  ['aldi', null, 'Aldi Sud logo svg'],
];

const capi = (params) => fetch('https://commons.wikimedia.org/w/api.php?format=json&' + params, { headers: { 'User-Agent': UA } }).then(r => r.json());

async function searchFile(q) {
  const j = await capi('action=query&list=search&srnamespace=6&srlimit=8&srsearch=' + encodeURIComponent(q));
  const hits = ((j.query || {}).search || []).map(h => h.title);
  const svg = hits.find(h => /\.svg$/i.test(h));
  return svg || hits[0] || null;
}

async function thumbUrl(fileTitle) {
  const j = await capi('action=query&prop=imageinfo&iiprop=url&iiurlwidth=600&titles=' + encodeURIComponent(fileTitle));
  const p = Object.values((j.query || {}).pages || {})[0];
  return p && p.imageinfo ? (p.imageinfo[0].thumburl || p.imageinfo[0].url) : null;
}

(async () => {
  for (const [slug, title, query] of FIXES) {
    try {
      const file = title || await searchFile(query);
      if (!file) { console.log('MISS  ' + slug); continue; }
      const src = await thumbUrl(file);
      if (!src) { console.log('NOURL ' + slug + '  ' + file); continue; }
      const r = await fetch(src, { headers: { 'User-Agent': UA } });
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(path.join(OUT, slug + '.png'), buf);
      console.log('OK    ' + slug + '  <= ' + file);
    } catch (e) {
      console.log('ERR   ' + slug + '  ' + e.message);
    }
  }
})();
