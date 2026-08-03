const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

/* ═══════════════════ D1 SNAPSHOT — npcg-sales-comps ═══════════════════
   Pulls every closed deal Francis Saenz appears on and writes a committed
   src/data/comps.json. The deck builds from that JSON, never from the network,
   so a rebuild is reproducible and works offline. Re-run to refresh.

   The selector is the deal_team JSON column, NOT lead_broker — lead_broker
   only credits 72 deals; deal_team catches all 194 (source broker + internal
   co-broker).

   Wrangler is invoked as `node node_modules/wrangler/bin/wrangler.js` rather
   than via npx or the .bin shim: on Windows spawnSync on a POSIX shim returns
   status null and the failure is silent (RENDER-PIPELINE stage 1). Passing the
   database UUID instead of its name means this folder needs no wrangler.toml.

   Usage:  npm run pull                                                    */

const DB_ID = '591c262a-1b0f-4f45-a40c-a8005f56d37c'; // npcg-sales-comps
const ACCOUNT_ID = 'fb496447ae8227cda0ed885897cc983c';
const BROKER = 'Francis Saenz';
const OUT = path.join(__dirname, 'src', 'data', 'comps.json');

// Expected headline figures as of the 2026-08-03 pull. The assertions below
// fail the run if a future sync moves these materially — better a loud failure
// than a flyer that quietly advertises the wrong number.
// cities counts distinct city|state pairs, so Franklin MA and Franklin NH count
// as the two separate towns they are. It also runs AFTER fixShouting, which
// merges Salesforce's "NEW BEDFORD" into "New Bedford" — counting raw strings
// gives 81 and double-counts that town.
const EXPECT = { count: 194, volume: 413104148, units: 2506, cities: 80 };

const SQL = `
WITH fs AS (
  SELECT DISTINCT sc.*
  FROM sales_comps sc, json_each(sc.deal_team) je
  WHERE json_extract(je.value, '$.name') = '${BROKER}'
)
SELECT sf_deal_id, deal_name, close_date, price_total, price_psf, price_per_unit,
       cap_rate, noi, lead_broker, property_name, address, city, state, zip, county,
       property_type, property_sub_type, gross_sf, total_units, commercial_units,
       residential_units, year_built, property_image_url, latitude, longitude, deal_team
FROM fs
ORDER BY close_date DESC`;

function queryD1(sql) {
  const bin = path.join(__dirname, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  if (!fs.existsSync(bin)) {
    throw new Error(`wrangler not found at ${bin} — run \`npm install\` first.\n` +
      `If the entry point moved, check: node -p "require('wrangler/package.json').bin"`);
  }
  const r = spawnSync(process.execPath,
    [bin, 'd1', 'execute', DB_ID, '--remote', '--json', '--command', sql], {
      cwd: __dirname,
      env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID },
      maxBuffer: 64 * 1024 * 1024, // 194 rows x 26 cols blows the 1 MB default
      encoding: 'utf8',
    });

  const blob = `${r.stdout || ''}\n${r.stderr || ''}`;
  if (r.status !== 0 || !r.stdout) {
    if (/auth|login|credential|token|10000/i.test(blob)) {
      throw new Error('Cloudflare auth failed or expired.\n  → run: npx wrangler login\n' +
        '(The committed comps.json still builds fine — you only need this to refresh.)');
    }
    throw new Error(`wrangler d1 execute failed (status ${r.status}):\n${blob.trim()}`);
  }
  // Wrangler prints a banner before the JSON payload.
  const start = r.stdout.indexOf('[');
  if (start < 0) throw new Error(`no JSON in wrangler output:\n${r.stdout.slice(0, 500)}`);
  const parsed = JSON.parse(r.stdout.slice(start));
  const results = parsed[0] && parsed[0].results;
  if (!Array.isArray(results)) throw new Error('unexpected wrangler payload shape');
  return results;
}

/* Eleven addresses come out of Salesforce SHOUTING ("22 CHATHAM ST"), which
   reads as a data-entry artifact next to 183 title-cased neighbours. Normalize
   here so it's fixed once at the source rather than in every component. Only
   touches strings with no lowercase at all — a correctly-cased address is never
   modified. Directionals and state codes stay uppercase. */
const KEEP_UPPER = new Set(['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW', 'US', 'MA', 'NH', 'RI', 'VT', 'CT', 'ME']);
function fixShouting(s) {
  if (!s || /[a-z]/.test(s)) return s;
  return s.replace(/[A-Za-z]+/g, w =>
    (KEEP_UPPER.has(w) ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()));
}

/* ── row → deal ── numbers stay numbers; all formatting lives in src/lib/fmt.js */
function toDeal(r) {
  let role = null;
  try {
    const team = JSON.parse(r.deal_team || '[]');
    role = (team.find(m => m.name === BROKER) || {}).role || null;
  } catch { /* malformed deal_team — leave role null */ }

  const num = v => (v === null || v === undefined || v === '' ? null : Number(v));
  const price = num(r.price_total);
  const units = num(r.total_units);

  return {
    id: r.sf_deal_id,
    name: fixShouting(r.deal_name || r.property_name || r.address || null),
    closeDate: r.close_date || null,
    year: r.close_date ? Number(r.close_date.slice(0, 4)) : null,
    price,
    pricePsf: num(r.price_psf),
    // Prefer SF's own per-unit figure; fall back to arithmetic when it's absent.
    pricePerUnit: num(r.price_per_unit) || (price && units ? Math.round(price / units) : null),
    capRate: num(r.cap_rate),      // carried but NOT rendered — see the plan
    noi: num(r.noi),               // carried but NOT rendered
    leadBroker: r.lead_broker || null,
    propertyName: fixShouting(r.property_name || null),
    address: fixShouting(r.address || null),
    city: fixShouting(r.city || null),
    state: r.state || null,
    zip: r.zip || null,
    county: r.county || null,
    type: r.property_type || null,
    subType: r.property_sub_type || null,
    grossSf: num(r.gross_sf),
    units,
    commercialUnits: num(r.commercial_units),
    residentialUnits: num(r.residential_units),
    yearBuilt: r.year_built || null,
    imageUrl: r.property_image_url || null,
    lat: num(r.latitude),
    lng: num(r.longitude),
    role,
  };
}

/* ── aggregates ── precomputed here so the page components stay dumb ── */
function rollup(deals) {
  const sum = (a, f) => a.reduce((s, x) => s + (f(x) || 0), 0);
  const groupBy = (a, key) => {
    const m = new Map();
    for (const d of a) {
      const k = key(d);
      if (k === null || k === undefined) continue;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(d);
    }
    return m;
  };

  const volume = sum(deals, d => d.price);
  const units = sum(deals, d => d.units);
  // city|state, not city alone — two Springfields in different states are two places.
  const cityKeys = new Set(deals.filter(d => d.city).map(d => `${d.city}|${d.state}`));
  const states = new Set(deals.filter(d => d.state).map(d => d.state));

  const prices = deals.map(d => d.price).filter(Boolean).sort((a, b) => a - b);
  const median = prices.length
    ? (prices.length % 2 ? prices[(prices.length - 1) / 2]
      : Math.round((prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2))
    : 0;
  const largest = deals.filter(d => d.price).sort((a, b) => b.price - a.price)[0] || null;

  const years = deals.map(d => d.year).filter(Boolean);
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);

  const byYear = [];
  for (let y = firstYear; y <= lastYear; y++) {
    const rows = deals.filter(d => d.year === y); // every year emitted, zero-count included
    byYear.push({ year: y, count: rows.length, volume: sum(rows, d => d.price), units: sum(rows, d => d.units) });
  }

  const byType = [...groupBy(deals, d => d.type || 'Other')]
    .map(([type, rows]) => ({
      type, count: rows.length, volume: sum(rows, d => d.price),
      units: sum(rows, d => d.units), share: rows.length / deals.length,
    }))
    .sort((a, b) => b.count - a.count);

  const byState = [...groupBy(deals, d => d.state)]
    .map(([state, rows]) => ({ state, count: rows.length, volume: sum(rows, d => d.price), units: sum(rows, d => d.units) }))
    .sort((a, b) => b.count - a.count);

  const byCity = [...groupBy(deals, d => (d.city ? `${d.city}|${d.state}` : null))]
    .map(([k, rows]) => {
      const [city, state] = k.split('|');
      return { city, state, count: rows.length, volume: sum(rows, d => d.price), units: sum(rows, d => d.units) };
    })
    .sort((a, b) => b.count - a.count || b.volume - a.volume);

  const byRole = [...groupBy(deals, d => d.role || 'Unspecified')]
    .map(([role, rows]) => ({ role, count: rows.length, volume: sum(rows, d => d.price) }))
    .sort((a, b) => b.count - a.count);

  // Deal-size distribution — shows the practice spans a small private sale to an
  // eight-figure assemblage, which an average alone hides.
  const BANDS = [
    { label: 'Under $1M', min: 0, max: 1e6 },
    { label: '$1M – $2M', min: 1e6, max: 2e6 },
    { label: '$2M – $5M', min: 2e6, max: 5e6 },
    { label: '$5M – $10M', min: 5e6, max: 1e7 },
    { label: '$10M+', min: 1e7, max: Infinity },
  ];
  const byPriceBand = BANDS.map(b => {
    const rows = deals.filter(d => d.price >= b.min && d.price < b.max);
    return { label: b.label, count: rows.length, volume: sum(rows, d => d.price) };
  });

  // Round the chart ceiling up to the next $10M so VolumeChart is pure geometry.
  const maxVolume = Math.max(...byYear.map(y => y.volume));
  const axisMax = Math.ceil(maxVolume / 1e7) * 1e7;

  return {
    totals: {
      count: deals.length, volume, units,
      cities: cityKeys.size, states: states.size,
      avgPrice: Math.round(volume / deals.length),
      medianPrice: median,
      largest: largest && { id: largest.id, price: largest.price, address: largest.address, city: largest.city, state: largest.state, units: largest.units, closeDate: largest.closeDate },
      firstYear, lastYear,
      unitsKnownFor: deals.filter(d => d.units).length,
      capKnownFor: deals.filter(d => d.capRate).length,
      imagesFor: deals.filter(d => d.imageUrl).length,
    },
    byYear, byType, byState, byCity, byRole, byPriceBand,
    chart: { years: byYear.map(y => y.year), axisMax, partialYear: lastYear },
  };
}

(function main() {
  console.log(`▸ Querying npcg-sales-comps for "${BROKER}"…`);
  const rows = queryD1(SQL);
  const deals = rows.map(toDeal);
  const agg = rollup(deals);
  const t = agg.totals;

  const money = n => `$${Math.round(n).toLocaleString('en-US')}`;
  console.log('\n  ── headline ──');
  console.log(`  transactions   ${t.count}`);
  console.log(`  volume         ${money(t.volume)}`);
  console.log(`  units          ${t.units.toLocaleString('en-US')}`);
  console.log(`  cities/towns   ${t.cities} across ${t.states} states`);
  console.log(`  average price  ${money(t.avgPrice)}`);
  console.log(`  span           ${t.firstYear}–${t.lastYear}`);
  console.log(`  completeness   ${t.imagesFor} with photos · ${t.unitsKnownFor} with unit counts\n`);

  // Deals dated in the current year get printed for eyeball review: a
  // forward-dated close (under agreement, not yet closed) can't sit inside a
  // "closed volume" total unqualified.
  const thisYear = new Date().getFullYear();
  const current = deals.filter(d => d.year === thisYear).sort((a, b) => a.closeDate.localeCompare(b.closeDate));
  if (current.length) {
    console.log(`  ── ${current.length} deals dated ${thisYear} — confirm each has actually closed ──`);
    current.forEach(d => console.log(`  ${d.closeDate}  ${money(d.price || 0).padStart(12)}  ${d.address || d.name}, ${d.city}`));
    console.log('');
  }

  const problems = [];
  if (t.count !== EXPECT.count) problems.push(`count ${t.count} != ${EXPECT.count}`);
  if (Math.abs(t.volume - EXPECT.volume) > 5e6) problems.push(`volume ${money(t.volume)} drifted >$5M from ${money(EXPECT.volume)}`);
  if (t.units !== EXPECT.units) problems.push(`units ${t.units} != ${EXPECT.units}`);
  if (t.cities !== EXPECT.cities) problems.push(`cities ${t.cities} != ${EXPECT.cities}`);
  if (problems.length) {
    console.error('✗ Snapshot drifted from the expected profile:');
    problems.forEach(p => console.error(`    ${p}`));
    console.error('\n  If the drift is real (new closings synced from Salesforce), update EXPECT');
    console.error('  at the top of pull-comps.cjs — and re-check the bio copy in src/data/deck.js,');
    console.error('  which quotes these figures in prose.');
    process.exit(3);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: { db: 'npcg-sales-comps', databaseId: DB_ID, table: 'sales_comps', broker: BROKER, rowCount: deals.length },
    ...agg,
    deals,
    // The log renders close_date DESC — same order the query returned.
    log: deals.map(d => d.id),
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`✓ ${OUT} · ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
})();
