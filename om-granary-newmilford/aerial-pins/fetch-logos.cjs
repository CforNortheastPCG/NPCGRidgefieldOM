/* Fetch brand logos: scan each Wikipedia page's file list for the logo file, download a 600px thumb. */
const fs = require('fs');
const path = require('path');

const BRANDS = [
  ['homedepot', 'The Home Depot'],
  ['autozone', 'AutoZone'],
  ['verizon', 'Verizon'],
  ['goodwill', 'Goodwill Industries'],
  ['aldi', 'Aldi'],
  ['mavis', 'Mavis Discount Tire'],
  ['wendys', "Wendy's"],
  ['walmart', 'Walmart'],
  ['stopandshop', 'Stop & Shop'],
  ['kohls', "Kohl's"],
  ['tjmaxx', 'TJ Maxx'],
  ['petco', 'Petco'],
  ['homegoods', 'HomeGoods'],
  ['panera', 'Panera Bread'],
  ['jerseymikes', "Jersey Mike's"],
  ['tacobell', 'Taco Bell'],
  ['att', 'AT&T'],
  ['dollartree', 'Dollar Tree'],
  ['tractorsupply', 'Tractor Supply Company'],
  ['starbucks', 'Starbucks'],
  ['mcdonalds', "McDonald's"],
  ['enterprise', 'Enterprise Rent-A-Car'],
  ['oreilly', "O'Reilly Auto Parts"],
  ['carvel', 'Carvel (franchise)'],
  ['kimberlyclark', 'Kimberly-Clark'],
  ['cvs', 'CVS Pharmacy'],
];

const UA = 'NPCG-OM-builder/1.0 (propdata2@gmail.com)';
const OUT = path.join(__dirname, 'logos');
const api = (params) => fetch('https://en.wikipedia.org/w/api.php?format=json&' + params, { headers: { 'User-Agent': UA } }).then(r => r.json());

async function logoFileFor(title) {
  const j = await api('action=query&redirects=1&prop=images&imlimit=200&titles=' + encodeURIComponent(title));
  const p = Object.values((j.query || {}).pages || {})[0];
  if (!p || !p.images) return null;
  const names = p.images.map(i => i.title);
  const svgLogo = names.find(n => /logo/i.test(n) && /\.svg$/i.test(n) && !/wiki|commons|edit|question|symbol/i.test(n));
  const anyLogo = names.find(n => /logo/i.test(n) && !/wiki|commons|edit|question|symbol/i.test(n));
  return svgLogo || anyLogo || null;
}

async function thumbUrl(fileTitle) {
  const j = await api('action=query&prop=imageinfo&iiprop=url&iiurlwidth=600&titles=' + encodeURIComponent(fileTitle));
  const p = Object.values((j.query || {}).pages || {})[0];
  return p && p.imageinfo ? (p.imageinfo[0].thumburl || p.imageinfo[0].url) : null;
}

(async () => {
  for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));
  for (const [slug, title] of BRANDS) {
    try {
      const file = await logoFileFor(title);
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
