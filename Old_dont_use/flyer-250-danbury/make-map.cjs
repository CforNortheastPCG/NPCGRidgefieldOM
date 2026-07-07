/* GIS site map generator — renders the 250 Danbury Rd parcel outline over
   Esri World Imagery (satellite) with Leaflet and screenshots it to a PNG
   for the flyer. No API key required. Run: node make-map.cjs
   Parcel geometry: CTECO statewide parcels (Wilton layer), lot 57-22. */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const geo = JSON.parse(fs.readFileSync(path.join(__dirname, 'parcel-57-22.geojson'), 'utf8'));
const OUT = path.join(__dirname, 'public', 'photos', 'gis-map.png');
const W = 680, H = 900; // portrait — fills the full-height left panel on page 2

const html = `<!doctype html><html><head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>html,body,#map{margin:0;height:${H}px;width:${W}px;background:#1b1f25}
 .leaflet-control-attribution{font-size:9px;background:rgba(255,255,255,0.7)}
 .lbl{background:#F8971D;color:#fff;font:700 12px/1.2 Montserrat,Arial,sans-serif;
   padding:3px 8px;border-radius:3px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.5);text-align:center}
</style></head><body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
 const geo = ${JSON.stringify(geo)};
 const map = L.map('map',{zoomControl:false,attributionControl:true});
 L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
   {maxZoom:20, attribution:'Imagery © Esri · Parcel: CT OPM / Wilton GIS'}).addTo(map);
 const layer = L.geoJSON(geo,{style:{color:'#F8971D',weight:4,fillColor:'#F8971D',fillOpacity:0.12}}).addTo(map);
 map.fitBounds(layer.getBounds(),{padding:[120,120]});
 const c = layer.getBounds().getCenter();
 L.marker(c,{icon:L.divIcon({className:'',html:'<div class="lbl">250 DANBURY RD<br>0.90 AC CORNER</div>',iconSize:[120,32],iconAnchor:[60,16]})}).addTo(map);
 window.__ready = false;
 map.whenReady(()=>{ setTimeout(()=>{ window.__ready = true; }, 1800); });
</script></body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction('window.__ready === true', { timeout: 30000 });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await page.screenshot({ path: OUT, type: 'png' });
  await browser.close();
  console.log('Wrote', OUT);
})();
