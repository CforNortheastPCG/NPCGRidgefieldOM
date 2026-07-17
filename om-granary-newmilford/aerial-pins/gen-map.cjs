/* ═══════════════════════════════════════════════════════════════════════════
   gen-map.cjs — address → auto-generated logo pin map (then human-tune it)

   Usage:
     node gen-map.cjs "29 West Street, New Milford, CT" [--name granary] [--zoom 14] [--radius 4000] [--maptype hybrid]

   What it does:
     1. Geocodes the address (Google Geocoding API)
     2. Downloads a satellite/hybrid Static Map centered on it (1280×960)
     3. Pulls nearby anchors via Places API (New) — grocery, big-box, pharmacy,
        fast food/coffee, parks, hospitals
     4. Projects every POI onto the image (Web Mercator), brands it with a logo
        from logos/ when we have one (text chip otherwise), aims a right-angle
        arrow at the exact spot, declutters overlaps
     5. Writes map-<name>.html — same template + drag tuner as south/north.html

   Then: open map-<name>.html#tune, drag things, "Copy layout", paste back.
   Render: node shot.cjs map-<name>.html out.png 1280 960 2   (→ 2560×1920)

   Key: VITE_GOOGLE_MAPS_API_KEY from ../.env.local (or GOOGLE_MAPS_API_KEY env).
   Needs Geocoding API, Places API (New), Maps Static API enabled.
   ═══════════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

/* ——— args ——— */
const argv = process.argv.slice(2);
const address = argv.find(a => !a.startsWith('--'));
const opt = (name, dflt) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : dflt; };
if (!address) { console.error('Usage: node gen-map.cjs "ADDRESS" [--name slug] [--zoom 14] [--radius 4000] [--maptype hybrid|satellite]'); process.exit(1); }
const NAME = opt('name', address.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40));
const ZOOM = parseInt(opt('zoom', '14'));
const RADIUS = parseFloat(opt('radius', '4000'));
const MAPTYPE = opt('maptype', 'hybrid');
const W = 640, H = 480, SCALE = 2; /* static-map logical px; image is 1280×960 */

/* ——— API key ——— */
function findKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) return process.env.GOOGLE_MAPS_API_KEY;
  for (const p of [path.join(__dirname, '..', '.env.local'), path.join(__dirname, '.env.local')]) {
    if (fs.existsSync(p)) {
      const m = fs.readFileSync(p, 'utf8').match(/VITE_GOOGLE_MAPS_API_KEY=(\S+)/);
      if (m) return m[1];
    }
  }
  console.error('No API key: set GOOGLE_MAPS_API_KEY or VITE_GOOGLE_MAPS_API_KEY in ../.env.local'); process.exit(1);
}
const KEY = findKey();

/* ——— brand name → logos/<slug> matching (add rows as the logo library grows) ——— */
const BRAND_LOGOS = [
  ['walmart', 'walmart'], ['stop & shop', 'stopandshop'], ['stop and shop', 'stopandshop'],
  ["kohl", 'kohls'], ['t.j. maxx', 'tjmaxx'], ['tj maxx', 'tjmaxx'], ['petco', 'petco'],
  ['homegoods', 'homegoods'], ['home goods', 'homegoods'], ['panera', 'panera'],
  ['jersey mike', 'jerseymikes'], ['taco bell', 'tacobell'], ['at&t', 'att'],
  ['dollar tree', 'dollartree'], ['tractor supply', 'tractorsupply'], ['starbucks', 'starbucks'],
  ["mcdonald", 'mcdonalds'], ['enterprise rent', 'enterprise'], ["o'reilly", 'oreilly'],
  ['carvel', 'carvel'], ['cvs', 'cvs'], ['home depot', 'homedepot'], ['autozone', 'autozone'],
  ['verizon', 'verizon'], ['goodwill', 'goodwill'], ['aldi', 'aldi'], ['mavis', 'mavis'],
  ["wendy", 'wendys'], ['kimberly', 'kimberlyclark'],
];
const logoFor = (name) => { const n = name.toLowerCase(); const hit = BRAND_LOGOS.find(([k]) => n.includes(k)); return hit ? hit[1] : null; };

/* ——— POI buckets: Places API (New) types ——— */
const BUCKETS = [
  { label: 'grocery', types: ['supermarket', 'grocery_store'], max: 10, keepUnbranded: 3 },
  { label: 'bigbox', types: ['department_store', 'home_improvement_store', 'shopping_mall'], max: 15, keepUnbranded: 2 },
  { label: 'pharmacy', types: ['pharmacy', 'drugstore'], max: 5, keepUnbranded: 1 },
  { label: 'food', types: ['fast_food_restaurant', 'coffee_shop'], max: 15, keepUnbranded: 2 },
  { label: 'parks', types: ['park'], max: 8, keepUnbranded: 3 },
  { label: 'health', types: ['hospital'], max: 5, keepUnbranded: 2 },
];

/* ——— Web Mercator projection ——— */
function project(lat, lng) {
  const world = 256 * Math.pow(2, ZOOM);
  const x = (lng + 180) / 360 * world;
  const siny = Math.min(Math.max(Math.sin(lat * Math.PI / 180), -0.9999), 0.9999);
  const y = (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)) * world;
  return { x, y };
}

(async () => {
  /* 1 — geocode */
  const g = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${KEY}`).then(r => r.json());
  if (g.status !== 'OK') { console.error('Geocode failed: ' + g.status); process.exit(1); }
  const subj = g.results[0].geometry.location;
  const formatted = g.results[0].formatted_address;
  console.log('Subject: ' + formatted + '  (' + subj.lat + ', ' + subj.lng + ')');
  const c0 = project(subj.lat, subj.lng);

  /* 2 — static map (hybrid = satellite + road labels) */
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${subj.lat},${subj.lng}&zoom=${ZOOM}&size=${W}x${H}&scale=${SCALE}&maptype=${MAPTYPE}&format=png&key=${KEY}`;
  const img = await fetch(mapUrl).then(r => r.arrayBuffer());
  const baseFile = `map-${NAME}-base.png`;
  fs.writeFileSync(path.join(__dirname, baseFile), Buffer.from(img));
  console.log('Base image: ' + baseFile + '  (zoom ' + ZOOM + ', ' + MAPTYPE + ')');

  /* 3 — places */
  const pois = [];
  const seen = new Set();
  for (const b of BUCKETS) {
    const body = { includedTypes: b.types, maxResultCount: b.max, rankPreference: 'DISTANCE',
      locationRestriction: { circle: { center: { latitude: subj.lat, longitude: subj.lng }, radius: RADIUS } } };
    const r = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'places.displayName,places.location,places.primaryType', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(r => r.json());
    let unbranded = 0;
    for (const p of (r.places || [])) {
      const name = p.displayName.text;
      const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(key)) continue;
      const logo = logoFor(name);
      if (!logo && ++unbranded > b.keepUnbranded) continue;
      seen.add(key);
      pois.push({ name, logo, lat: p.location.latitude, lng: p.location.longitude, bucket: b.label });
    }
  }

  /* 4 — project into % of the image, drop off-frame, declutter */
  const placed = [];
  const items = [];
  for (const p of pois) {
    const pt = project(p.lat, p.lng);
    let x = 50 + (pt.x - c0.x) / W * 100;
    let y = 50 + (pt.y - c0.y) / H * 100;
    if (x < 4 || x > 96 || y < 5 || y > 96) continue;
    /* tile floats above the true point; nudge on collision (golden-angle spiral) */
    let tx = x, ty = y - 6, tries = 0;
    const collide = (ax, ay) => placed.some(q => Math.abs(ax - q.x) < 11 && Math.abs(ay - q.y) < 7.5);
    while (collide(tx, ty) && tries < 30) {
      const ang = tries * 137.5 * Math.PI / 180, r = 4 + tries * 1.3;
      tx = x + Math.cos(ang) * r; ty = y - 6 + Math.sin(ang) * r * 0.7;
      tx = Math.min(94, Math.max(6, tx)); ty = Math.min(92, Math.max(4, ty));
      tries++;
    }
    placed.push({ x: tx, y: ty });
    items.push({ ...p, px: +x.toFixed(1), py: +y.toFixed(1), tx: +tx.toFixed(1), ty: +ty.toFixed(1) });
  }
  console.log('POIs on frame: ' + items.length + ' (' + items.filter(i => i.logo).length + ' with logos)');
  for (const i of items) console.log('  ' + (i.logo ? '[' + i.logo + ']' : '"' + i.name + '"') + '  @ ' + i.px + ',' + i.py + '  (' + i.bucket + ')');

  /* 5 — build data arrays for the template */
  const tiles = items.filter(i => i.logo).map(i => ({ x: i.tx, y: i.ty, logo: i.logo }));
  const chips = items.filter(i => !i.logo).map(i => ({ x: i.tx, y: i.ty, label: i.name }));
  const arrows = items.map(i => {
    const bottom = +(i.ty + 3.2).toFixed(1);
    return Math.abs(i.tx - i.px) < 1
      ? { x1: i.px, y1: bottom, x2: i.px, y2: i.py, mode: 'v' }
      : { x1: i.tx, y1: bottom, x2: i.px, y2: i.py, mode: 'vh' };
  }).filter(a => (a.mode === 'v' ? a.y2 - a.y1 : Math.abs(a.y2 - a.y1) + Math.abs(a.x2 - a.x1)) > 1.2);
  const subject = { x: 50, y: 42 };
  const subjectArrow = { x1: 50, y1: 45, x2: 50, y2: 49.3, mode: 'v' };

  const DATA = {
    panels: [], chips, tiles, streets: [], shields: [], rivers: [],
    arrows, subject, subjectArrow,
    subjectLabel: formatted.replace(/, USA$/, ''),
  };

  /* 6 — emit the HTML (same look + tuner as south/north.html, stage 1280×960) */
  const html = TEMPLATE
    .replace('__TITLE__', 'Pin map — ' + formatted)
    .replace('__BG__', baseFile)
    .replace('__DATA__', JSON.stringify(DATA, null, 2));
  const outFile = 'map-' + NAME + '.html';
  fs.writeFileSync(path.join(__dirname, outFile), html);
  console.log('\nWrote ' + outFile);
  console.log('Tune:   start "" "file:///' + path.join(__dirname, outFile).replace(/\\/g, '/') + '#tune"');
  console.log('Render: node shot.cjs ' + outFile + ' map-' + NAME + '.png 1280 960 2');
})();

/* ═══════════════ HTML template (kept in sync with south/north.html styles) ═══════════════ */
const TEMPLATE = `<!doctype html>
<html><head><meta charset="utf-8"><title>__TITLE__</title><style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
  #stage { position: relative; width: 1280px; height: 960px; overflow: hidden; }
  #stage > img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  svg.overlay { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  .el { position: absolute; transform: translate(-50%, -50%); }
  .panel { background: rgba(255,255,255,0.96); border-radius: 8px; box-shadow: 0 3px 14px rgba(0,0,0,0.5); padding: 8px 10px 9px; }
  .panel .ptitle { font-size: 12.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #14181E; border-bottom: 2px solid #F8971D; padding: 0 2px 4px; margin-bottom: 7px; white-space: nowrap; text-align: center; }
  .panel .lgrid { display: grid; gap: 6px; }
  .panel .lcell { background: #fff; border: 1px solid #e3e3e3; border-radius: 5px; height: 34px; display: flex; align-items: center; justify-content: center; padding: 3px 6px; }
  .panel .lcell img { max-width: 100%; max-height: 26px; object-fit: contain; }
  .panel .lcell.txt { font-size: 10px; font-weight: 800; color: #14181E; text-align: center; line-height: 1.1; }
  .tile { background: #fff; border-radius: 6px; box-shadow: 0 3px 12px rgba(0,0,0,0.5); padding: 6px 9px; display: flex; align-items: center; justify-content: center; }
  .tile img { height: 24px; max-width: 92px; object-fit: contain; display: block; }
  .chip { background: rgba(20,24,30,0.82); color: #fff; padding: 5px 10px; border-radius: 5px; font-size: 11.5px; font-weight: 700; white-space: pre-line; text-align: center; line-height: 1.4; box-shadow: 0 2px 10px rgba(0,0,0,0.5); max-width: 160px; }
  .chip.big { background: rgba(20,24,30,0.9); border: 2px solid #F8971D; border-radius: 6px; padding: 7px 14px; font-size: 14px; font-weight: 800; box-shadow: 0 3px 14px rgba(0,0,0,0.6); }
  .street { background: rgba(20,24,30,0.68); color: #fff; text-transform: uppercase; letter-spacing: 0.16em; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 4px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.35); box-shadow: 0 1px 8px rgba(0,0,0,0.5); }
  .river { color: #EAF4FF; font-style: italic; font-size: 17px; font-weight: 600; letter-spacing: 0.14em; text-shadow: 0 1px 6px rgba(0,10,25,0.9), 0 0 2px rgba(0,10,25,0.9); white-space: nowrap; }
  .subject { background: rgba(20,24,30,0.9); border: 2px solid #F8971D; color: #fff; padding: 6px 12px; border-radius: 6px; text-align: center; box-shadow: 0 3px 14px rgba(0,0,0,0.6); }
  .subject .eyebrow { color: #F8971D; text-transform: uppercase; letter-spacing: 0.12em; font-size: 9px; font-weight: 800; display: block; }
  .subject .name { font-size: 13px; font-weight: 800; display: block; margin-top: 1px; }
  .shieldrow { display: flex; gap: 7px; align-items: center; }
  .shieldrow img { height: 42px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.65)); }
</style></head><body>
<div id="stage">
  <img class="bg" src="__BG__">
  <svg class="overlay" viewBox="0 0 1280 960">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff"/>
      </marker>
      <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#000" flood-opacity="0.65"/>
      </filter>
    </defs>
    <g id="arrows" filter="url(#sh)"></g>
    <g id="subjectpoly" filter="url(#sh)"></g>
  </svg>
  <div id="els"></div>
</div>
<script>
  const W = 1280, H = 960;
  const pct = (x, y) => ({ left: (x / 100 * W) + 'px', top: (y / 100 * H) + 'px' });
  const DATA = __DATA__;
  const { panels, chips, tiles, streets, shields, rivers, arrows, subject, subjectArrow } = DATA;

  const els = document.getElementById('els');
  const add = (html, x, y) => { const d = document.createElement('div'); d.className = 'el'; d.innerHTML = html; Object.assign(d.style, pct(x, y)); els.appendChild(d); return d; };
  const tagged = (el, obj) => { el.__data = obj; return el; };
  const logoImg = (s) => '<img src="logos/' + s + '.png" onerror="this.onerror=null;this.src=\\'logos/' + s + '.svg\\'">';

  for (const p of panels) {
    const cells = p.items.map(it => it.startsWith('txt:') ? '<div class="lcell txt">' + it.slice(4) + '</div>' : '<div class="lcell">' + logoImg(it) + '</div>').join('');
    tagged(add('<div class="panel" style="width:' + p.w + 'px">' + (p.title ? '<div class="ptitle">' + p.title + '</div>' : '') + '<div class="lgrid" style="grid-template-columns:repeat(' + p.cols + ',1fr)">' + cells + '</div></div>', p.x, p.y), p);
  }
  for (const t of tiles) tagged(add('<div class="tile">' + logoImg(t.logo) + '</div>', t.x, t.y), t);
  for (const c of chips) tagged(add('<div class="chip' + (c.big ? ' big' : '') + '">' + c.label.replace(/\\n/g, '<br>') + '</div>', c.x, c.y), c);
  for (const s of shields) tagged(add('<div class="shieldrow">' + s.items.map(i => '<img src="logos/' + i + '.svg">').join('') + '</div>', s.x, s.y), s);
  for (const s of streets) { const d = add('<div class="street">' + s.label + '</div>', s.x, s.y); d.style.transform = 'translate(-50%,-50%) rotate(' + (s.angle || 0) + 'deg)'; tagged(d, s); }
  for (const r of rivers) { const d = add('<div class="river">' + r.label + '</div>', r.x, r.y); d.style.transform = 'translate(-50%,-50%) rotate(' + (r.angle || 0) + 'deg)'; tagged(d, r); }
  tagged(add('<div class="subject"><span class="eyebrow">Subject Property</span><span class="name">' + DATA.subjectLabel + '</span></div>', subject.x, subject.y), subject);

  const NS = 'http://www.w3.org/2000/svg';
  function drawOverlay() {
    const ag = document.getElementById('arrows'); ag.innerHTML = '';
    for (const a of arrows.concat([subjectArrow])) {
      const x1 = a.x1 / 100 * W, y1 = a.y1 / 100 * H, x2 = a.x2 / 100 * W, y2 = a.y2 / 100 * H;
      let d;
      if (a.mode === 'h') d = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y1;
      else if (a.mode === 'v') d = 'M ' + x1 + ' ' + y1 + ' L ' + x1 + ' ' + y2;
      else if (a.mode === 'hv') d = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
      else d = 'M ' + x1 + ' ' + y1 + ' L ' + x1 + ' ' + y2 + ' L ' + x2 + ' ' + y2;
      const P = document.createElementNS(NS, 'path');
      P.setAttribute('d', d); P.setAttribute('fill', 'none');
      P.setAttribute('stroke', '#fff'); P.setAttribute('stroke-width', '3');
      P.setAttribute('stroke-linejoin', 'miter'); P.setAttribute('marker-end', 'url(#ah)');
      ag.appendChild(P);
    }
  }
  drawOverlay();

  /* ═══ TUNER — open with #tune; absent from shot.cjs renders ═══ */
  if (location.hash.indexOf('tune') >= 0 || location.search.indexOf('tune') >= 0) {
    const stage = document.getElementById('stage');
    const hud = document.createElement('div');
    hud.style.cssText = 'position:fixed;top:8px;left:8px;z-index:99;background:rgba(0,0,0,0.88);color:#6cf;font:12px/1.5 monospace;padding:10px;border-radius:6px;';
    hud.innerHTML = '<div id="tcur" style="font-size:14px">move mouse over image&hellip;</div>' +
      '<button id="tcopy" style="margin:6px 0;cursor:pointer;padding:4px 10px">Copy layout</button>' +
      '<textarea id="tout" style="width:330px;height:170px;font:10px monospace;display:block"></textarea>' +
      '<div style="color:#bbb;max-width:330px">Drag any box to move it. <span style="color:#2c5">&#9679;</span> arrow start &middot; <span style="color:#e33">&#9679;</span> arrow tip. Click <b>Copy layout</b> and paste it back to Claude.</div>';
    document.body.appendChild(hud);
    const P1 = v => Math.round(v * 10) / 10;
    const dump = () => { document.getElementById('tout').value = JSON.stringify(DATA, null, 1); };
    dump();
    document.getElementById('tcopy').onclick = () => { const t = document.getElementById('tout'); t.select(); document.execCommand('copy'); };
    const toPct = (e) => { const r = stage.getBoundingClientRect(); return [P1((e.clientX - r.left) / r.width * 100), P1((e.clientY - r.top) / r.height * 100)]; };
    stage.addEventListener('mousemove', e => { const [x, y] = toPct(e); document.getElementById('tcur').textContent = 'x: ' + x + '   y: ' + y; });
    let drag = null;
    for (const el of els.children) {
      if (!el.__data) continue;
      el.style.cursor = 'grab';
      el.addEventListener('mousedown', e => { drag = { el, obj: el.__data }; e.preventDefault(); });
    }
    const mkHandle = (color, get, set) => {
      const h = document.createElement('div');
      h.style.cssText = 'position:absolute;width:14px;height:14px;margin:-7px;z-index:60;cursor:crosshair;background:' + color + ';border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px #000;';
      const place = () => { const [x, y] = get(); h.style.left = (x / 100 * W) + 'px'; h.style.top = (y / 100 * H) + 'px'; };
      place();
      h.addEventListener('mousedown', e => { drag = { set, place }; e.preventDefault(); e.stopPropagation(); });
      stage.appendChild(h);
    };
    for (const a of arrows.concat([subjectArrow])) {
      mkHandle('#2c5', () => [a.x1, a.y1], (x, y) => { a.x1 = x; a.y1 = y; });
      mkHandle('#e33', () => [a.x2, a.y2], (x, y) => { a.x2 = x; a.y2 = y; });
    }
    window.addEventListener('mousemove', e => {
      if (!drag) return;
      const [x, y] = toPct(e);
      if (drag.el) { drag.obj.x = x; drag.obj.y = y; Object.assign(drag.el.style, pct(x, y)); }
      else { drag.set(x, y); drag.place(); }
      drawOverlay(); dump();
    });
    window.addEventListener('mouseup', () => drag = null);
  }
</script>
</body></html>`;
