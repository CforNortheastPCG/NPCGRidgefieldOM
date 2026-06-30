/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without coordinates still appear in the
   printed directory.

   Coordinates below are Google-geocoded (Geocoding API, June 2026) — most are
   ROOFTOP precision; a few far/edge POIs (World's End, Widow's Walk, Greenbush,
   Hingham ferry) sit beyond the visible frame but still list in the directory,
   with the off-frame pointer on the map referencing the transit anchors. */

export const PROPERTY = {
  lat: 42.15679,
  lng: -70.879097, // Google + OSM geocode — 120 Longwater Dr sits right on the Route 3 corridor
  address: '120 Longwater Drive, Norwell, MA 02061',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Route 3 (Exit 14)', value: '~1 mile' },
  { label: 'Boston', value: '~24 mi · ~35 min north' },
  { label: 'Logan Airport (BOS)', value: '~26 mi · ~40 min' },
  { label: 'South Shore Hospital', value: '~4 mi · ~10 min' },
]

/* Map category styling, keyed by directory heading. `color` is the Static Maps
   marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Pharmacy', label: 'Grocery & Pharmacy', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Shopping & Retail', label: 'Shopping & Retail', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Healthcare & Civic', label: 'Healthcare & Civic', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x0E6655', swatch: '#0E6655' },
  { heading: 'Hotels & Lodging', label: 'Hotels & Lodging', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Transit & Access', label: 'Transit & Access', color: '0x566573', swatch: '#566573' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: "The Tinker's Son", note: 'Irish gastropub · Norwell Center · ~4.5 mi', address: 'TinkersSon' },
      { name: 'Scarlet Oak Tavern', note: 'Upscale American · Hingham (Rte 228) · ~1.5 mi', address: 'ScarletOak' },
      { name: 'Alba on 53', note: 'Mediterranean steakhouse · Hanover · ~2.5 mi', address: 'Alba' },
      { name: 'Burtons Grill & Bar', note: 'Derby Street Shops · Hingham · ~2.5 mi', address: 'Burtons' },
      { name: 'Panera Bread', note: 'Cafe / bakery · Hanover Crossing · ~3 mi', address: 'Panera' },
      { name: "Dunkin'", note: 'Coffee · drive-thru · Washington St, Norwell · ~1 mi', address: 'Dunkin' },
      { name: 'The British Beer Company', note: 'Pub / American · Pembroke (Rte 53) · ~5 mi', address: 'BBC' },
    ],
  },
  {
    heading: 'Grocery & Pharmacy',
    items: [
      { name: 'Big Y World Class Market', note: 'Queen Anne Plaza · Norwell · ~1 mi', address: 'BigY' },
      { name: 'Stop & Shop', note: 'Supermarket + pharmacy · Norwell · ~2 mi', address: 'StopShop' },
      { name: 'CVS Pharmacy', note: 'Washington St (Rte 53) · Hanover · ~3 mi', address: 'CVS' },
      { name: 'Whole Foods Market', note: 'Derby Street Shops · Hingham · ~2.5 mi', address: 'WholeFoods' },
      { name: "Trader Joe's", note: 'Derby Street · Hingham · ~2.5 mi', address: 'TraderJoes' },
    ],
  },
  {
    heading: 'Shopping & Retail',
    items: [
      { name: "Queen Anne's Plaza", note: 'Big Y · T.J.Maxx · HomeGoods · Norwell · ~1 mi', address: 'QueenAnnes' },
      { name: 'Derby Street Shops', note: 'Open-air lifestyle center · Hingham · ~2.5 mi', address: 'DerbyStreet' },
      { name: 'Hanover Crossing', note: 'Market Basket · Macy’s · Showcase Cinema · Hanover · ~3 mi', address: 'HanoverCrossing' },
      { name: 'Market Basket', note: 'Hanover Crossing · Hanover · ~3 mi', address: 'MarketBasket' },
      { name: 'Target', note: '1167 Washington St · Hanover · ~3.5 mi', address: 'Target' },
    ],
  },
  {
    heading: 'Healthcare & Civic',
    items: [
      { name: 'South Shore Health — Norwell', note: '143 Longwater Dr · medical offices · same park', address: 'SSHNorwell' },
      { name: 'South Shore Health Urgent Care', note: '1399 Washington St · Hanover · ~3 mi', address: 'HanoverUrgent' },
      { name: 'South Shore Hospital', note: "Region's largest hospital · Weymouth · ~4 mi", address: 'SSHospital' },
      { name: 'Norwell Town Hall', note: '345 Main St · Norwell Center · ~3 mi', address: 'TownHall' },
      { name: 'Norwell Public Library', note: '64 South St · Norwell · ~3 mi', address: 'Library' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'South Shore Natural Science Center', note: 'Nature museum + trails · Norwell · ~2.5 mi', address: 'ScienceCenter' },
      { name: 'Norris Reservation', note: 'North River trails (Trustees) · Norwell · ~4 mi', address: 'Norris' },
      { name: 'Wompatuck State Park', note: '3,500-acre DCR park · Hingham · ~3 mi', address: 'Wompatuck' },
      { name: "World's End", note: 'Trustees coastal reservation · Hingham · ~7 mi', address: 'WorldsEnd' },
      { name: "Widow's Walk Golf Course", note: 'Municipal 18-hole · Scituate · ~8 mi', address: 'WidowsWalk' },
    ],
  },
  {
    heading: 'Hotels & Lodging',
    items: [
      { name: 'DoubleTree by Hilton Boston–Rockland', note: '929 Hingham St · full-service · ~1.5 mi', address: 'DoubleTree' },
      { name: 'Best Western Rockland', note: '909 Hingham St · Rockland · ~1.5 mi', address: 'BestWestern' },
      { name: 'Comfort Inn Rockland–Boston', note: '850 Hingham St · Rockland · ~1.5 mi', address: 'ComfortInn' },
    ],
  },
  {
    heading: 'Transit & Access',
    items: [
      { name: 'Route 3 — Exit 14', note: 'Rte 228/53 · Boston N / Cape Cod S · ~1 mi', address: 'Rte3Exit' },
      { name: 'Nantasket Junction Station', note: 'MBTA Greenbush Line → South Station · ~6 mi', address: 'NantasketJct' },
      { name: 'West Hingham Station', note: 'MBTA Greenbush Line · ~6.5 mi', address: 'WestHingham' },
      { name: 'Hingham Ferry', note: 'Hingham Shipyard · ~35 min to Boston by boat · ~7 mi', address: 'HinghamFerry' },
      { name: 'Greenbush Station', note: 'MBTA Greenbush terminus · Scituate · ~8 mi', address: 'Greenbush' },
    ],
  },
]

/* Google-geocoded coordinates per keyed location (Geocoding API, June 2026).
   Plotted by lat/lng so the Static Maps request does not geocode at render time. */
const COORDS = {
  // Dining & Coffee
  'TinkersSon': [42.161666, -70.791013],
  'ScarletOak': [42.175777, -70.885763],
  'Alba': [42.155821, -70.848155],
  'Burtons': [42.175906, -70.910027],
  'Panera': [42.147067, -70.845851],
  'Dunkin': [42.172085, -70.878809],
  'BBC': [42.106117, -70.807411],
  // Grocery & Pharmacy
  'BigY': [42.172341, -70.884064],
  'StopShop': [42.157917, -70.853641],
  'CVS': [42.143507, -70.844213],
  'WholeFoods': [42.178796, -70.907774],
  'TraderJoes': [42.181112, -70.901494],
  // Shopping & Retail
  'QueenAnnes': [42.172789, -70.883715],
  'DerbyStreet': [42.177469, -70.909220],
  'HanoverCrossing': [42.146516, -70.842100],
  'MarketBasket': [42.148058, -70.844709],
  'Target': [42.136870, -70.838963],
  // Healthcare & Civic
  'SSHNorwell': [42.156762, -70.876686],
  'HanoverUrgent': [42.144135, -70.844083],
  'SSHospital': [42.176104, -70.953945],
  'TownHall': [42.158035, -70.817742],
  'Library': [42.152638, -70.837438],
  // Parks & Recreation
  'ScienceCenter': [42.162283, -70.842744],
  'Norris': [42.154528, -70.786723],
  'Wompatuck': [42.204080, -70.847388],
  'WorldsEnd': [42.258441, -70.873988],
  'WidowsWalk': [42.177381, -70.736599],
  // Hotels & Lodging
  'DoubleTree': [42.161773, -70.898970],
  'BestWestern': [42.160973, -70.901041],
  'ComfortInn': [42.160396, -70.903566],
  // Transit & Access
  'Rte3Exit': [42.161000, -70.887000], // Route 3 / Rte 228 interchange just NW of the park (approx)
  'NantasketJct': [42.244983, -70.868357],
  'WestHingham': [42.245920, -70.914219],
  'HinghamFerry': [42.252837, -70.920093],
  'Greenbush': [42.178780, -70.746640],
}

/* Flattened list of every mapped POI, tagged with category label + colors —
   consumed by the Location & Amenities map. */
export const MAP_POIS = MAP_CATEGORIES.flatMap(cat => {
  const group = DIRECTORY.find(d => d.heading === cat.heading)
  if (!group) return []
  return group.items
    .filter(it => it.address && COORDS[it.address])
    .map((it, idx) => ({
      name: it.name,
      note: it.note,
      address: it.address,
      lat: COORDS[it.address][0],
      lng: COORDS[it.address][1],
      category: cat.label,
      color: cat.color,
      swatch: cat.swatch,
      n: idx + 1, // per-category number (Static Maps labels are single-char)
    }))
})
