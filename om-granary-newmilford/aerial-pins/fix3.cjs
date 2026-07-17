const fs = require('fs'); const path = require('path');
const UA = 'NPCG-OM-builder/1.0 (propdata2@gmail.com)';
const OUT = path.join(__dirname, 'logos');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const api = (host, params) => fetch('https://' + host + '/w/api.php?format=json&' + params, { headers: { 'User-Agent': UA } }).then(r => r.json());

const WANT = [
  ['homegoods', 'HomeGoods'],
  ['att', 'AT&T'],
  ['dollartree', 'Dollar Tree'],
  ['tractorsupply', 'Tractor Supply Company'],
  ['enterprise', 'Enterprise Rent-A-Car'],
  ['oreilly', "O'Reilly Auto Parts"],
  ['carvel', 'Carvel (franchise)'],
  ['kimberlyclark', 'Kimberly-Clark'],
  ['cvs', 'CVS Pharmacy'],
];

(async () => {
  for (const [slug, title] of WANT) {
    try {
      fs.rmSync(path.join(OUT, slug + '.png'), { force: true });
      const j = await api('en.wikipedia.org', 'action=query&redirects=1&prop=images&imlimit=200&titles=' + encodeURIComponent(title));
      const p = Object.values(j.query.pages)[0];
      const names = (p.images || []).map(i => i.title);
      const file = names.find(n => /logo/i.test(n) && /\.svg$/i.test(n) && !/wiki|commons|edit|question|symbol|food/i.test(n))
                || names.find(n => /logo/i.test(n) && !/wiki|commons|edit|question|symbol|food/i.test(n));
      if (!file) { console.log('MISS ' + slug + '  candidates: ' + names.filter(n => !/OOjs|Wiki|Commons|Increase|Symbol|Semi|Edit/i.test(n)).join(' | ')); continue; }
      await sleep(700);
      const j2 = await api('en.wikipedia.org', 'action=query&prop=imageinfo&iiprop=url&titles=' + encodeURIComponent(file));
      const p2 = Object.values(j2.query.pages)[0];
      const src = p2.imageinfo[0].url;
      await sleep(700);
      const r = await fetch(src, { headers: { 'User-Agent': UA } });
      if (!r.ok) { console.log('HTTP' + r.status + ' ' + slug + ' ' + src); continue; }
      const ext = src.split('.').pop().toLowerCase();
      fs.writeFileSync(path.join(OUT, slug + '.' + ext), Buffer.from(await r.arrayBuffer()));
      console.log('OK   ' + slug + '.' + ext + '  <= ' + file);
      await sleep(700);
    } catch (e) { console.log('ERR  ' + slug + '  ' + e.message); }
  }
})();
