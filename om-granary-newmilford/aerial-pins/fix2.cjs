const fs = require('fs'); const path = require('path');
const UA = 'NPCG-OM-builder/1.0 (propdata2@gmail.com)';
const OUT = path.join(__dirname, 'logos');
const capi = (params) => fetch('https://en.wikipedia.org/w/api.php?format=json&' + params, { headers: { 'User-Agent': UA } }).then(r => r.json());
const CANDS = {
  tacobell: ['File:Taco Bell 2016.svg', 'File:Taco Bell logo.svg', 'File:Taco bell logo 2016.svg'],
  starbucks: ['File:Starbucks Logo ab 2011.svg', 'File:Starbucks Corporation Logo 2011.svg', 'File:Starbucks logo 2011.svg'],
};
(async () => {
  for (const [slug, cands] of Object.entries(CANDS)) {
    for (const file of cands) {
      const j = await capi('action=query&prop=imageinfo&iiprop=url&iiurlwidth=600&titles=' + encodeURIComponent(file));
      const p = Object.values((j.query || {}).pages || {})[0];
      const src = p && p.imageinfo ? (p.imageinfo[0].thumburl || p.imageinfo[0].url) : null;
      if (!src) { console.log('no: ' + file); continue; }
      const r = await fetch(src, { headers: { 'User-Agent': UA } });
      fs.writeFileSync(path.join(OUT, slug + '.png'), Buffer.from(await r.arrayBuffer()));
      console.log('OK ' + slug + ' <= ' + file); break;
    }
  }
})();
