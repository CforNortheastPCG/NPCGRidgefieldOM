/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them.
*/

export const PROPERTY = {
  lat: 41.6650,
  lng: -73.0730,
  address: '310 South Main Street, Thomaston, CT 06787',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Route 8 (Exits 38 & 39)', value: 'Less than 1 mile' },
  { label: 'U.S. Route 6', value: 'Through downtown Thomaston' },
  { label: 'Waterbury / Metro-North', value: '~10–15 min south on Rte 8' },
  { label: 'South Main Street', value: '12,800 VPD frontage' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend.
   Five local categories, all within the zoom-13 frame, so every pin in the
   directory also shows on the map (off-frame Waterbury anchors live on the
   County Overview and Drive Times pages instead). */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Pharmacy', label: 'Grocery & Pharmacy', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Banks, Retail & Employers', label: 'Banks, Retail & Employers', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Schools & Civic', label: 'Schools & Civic', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }.
   Every address below is verified and carries an approximate (block-level)
   entry in COORDS — see the note at the top of this file. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: 'Thomaston Family Diner', note: 'Classic American diner · S Main corridor', address: '381 South Main Street, Thomaston, CT 06787' },
      { name: 'Hometown Pizza III', note: 'Pizzeria / Italian · near the site', address: '299 South Main Street, Thomaston, CT 06787' },
      { name: 'Clocktown Brewing Co.', note: 'Brewery + wood-fired pizza · Seth Thomas clock factory', address: '135 South Main Street, Thomaston, CT 06787' },
      { name: 'Mona Lisa Ristorante', note: 'Italian / NY-style · downtown', address: '66 Main Street, Thomaston, CT 06787' },
      { name: "Dunkin'", note: 'Coffee · drive-thru · S Main corridor', address: '495 South Main Street, Thomaston, CT 06787' },
    ],
  },
  {
    heading: 'Grocery & Pharmacy',
    items: [
      { name: 'Stop & Shop', note: 'Supermarket + pharmacy · just south of the site', address: '33 South Main Street, Thomaston, CT 06787' },
      { name: 'Walgreens', note: 'Drugstore / pharmacy · S Main', address: '455 South Main Street, Thomaston, CT 06787' },
      { name: 'Adams Hometown Market', note: 'Community grocery · downtown', address: '92 Main Street, Thomaston, CT 06787' },
    ],
  },
  {
    heading: 'Banks, Retail & Employers',
    items: [
      { name: 'Thomaston Savings Bank (Main Office)', note: 'Local bank HQ · downtown', address: '203 Main Street, Thomaston, CT 06787' },
      { name: 'Webster Bank', note: 'Regional bank branch · downtown', address: '155 Main Street, Thomaston, CT 06787' },
      { name: 'NAPA Auto Parts', note: 'Auto parts · off the corridor', address: '31 River Street, Thomaston, CT 06787' },
      { name: 'Stewart EFI', note: 'Precision metal stamping · employer', address: '45 Old Waterbury Road, Thomaston, CT 06787' },
      { name: 'Ward Leonard (Fairbanks Morse Defense)', note: 'Defense manufacturing · employer', address: '401 Watertown Road, Thomaston, CT 06787' },
    ],
  },
  {
    heading: 'Schools & Civic',
    items: [
      { name: 'Thomaston High School (gr. 7–12)', note: "Town's secondary school", address: '185 Branch Road, Thomaston, CT 06787' },
      { name: 'Black Rock School', note: 'Elementary school', address: '57 Branch Road, Thomaston, CT 06787' },
      { name: 'Thomaston Public Library', note: 'Town library · downtown', address: '248 Main Street, Thomaston, CT 06787' },
      { name: 'Town Hall / Opera House', note: '1884 landmark · municipal offices', address: '158 Main Street, Thomaston, CT 06787' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Black Rock State Park', note: 'State park / campground · ~4 mi west', address: '2065 Thomaston Road, Watertown, CT 06795' },
      { name: 'Thomaston Dam Recreation Area', note: 'Flood-control dam · trails · ~1.5 mi north', address: 'CT-222 (Reynolds Bridge), Thomaston, CT 06787' },
      { name: "Nystrom's Park", note: 'Town recreation park · ballfields', address: 'Turner Road, Thomaston, CT 06787' },
    ],
  },
]

/* Geocoded coordinates per address. Markers are plotted by lat/lng.
   Approximate (block-level) — for the reference map only. */
const COORDS = {
  // Dining & Coffee
  '381 South Main Street, Thomaston, CT 06787': [41.6600, -73.0730],
  '299 South Main Street, Thomaston, CT 06787': [41.6630, -73.0730],
  '135 South Main Street, Thomaston, CT 06787': [41.6700, -73.0730],
  '66 Main Street, Thomaston, CT 06787': [41.6750, -73.0730],
  '495 South Main Street, Thomaston, CT 06787': [41.6585, -73.0732],
  // Grocery & Pharmacy
  '33 South Main Street, Thomaston, CT 06787': [41.6575, -73.0730],
  '455 South Main Street, Thomaston, CT 06787': [41.6595, -73.0731],
  '92 Main Street, Thomaston, CT 06787': [41.6740, -73.0730],
  // Banks, Retail & Employers
  '203 Main Street, Thomaston, CT 06787': [41.6770, -73.0730],
  '155 Main Street, Thomaston, CT 06787': [41.6750, -73.0728],
  '31 River Street, Thomaston, CT 06787': [41.6760, -73.0750],
  '45 Old Waterbury Road, Thomaston, CT 06787': [41.65184, -73.07750],
  '401 Watertown Road, Thomaston, CT 06787': [41.65435, -73.09216],
  // Schools & Civic
  '185 Branch Road, Thomaston, CT 06787': [41.6800, -73.0830],
  '57 Branch Road, Thomaston, CT 06787': [41.6790, -73.0810],
  '248 Main Street, Thomaston, CT 06787': [41.6790, -73.0730],
  '158 Main Street, Thomaston, CT 06787': [41.6748, -73.0732],
  // Parks & Recreation
  '2065 Thomaston Road, Watertown, CT 06795': [41.6590, -73.1170],
  'CT-222 (Reynolds Bridge), Thomaston, CT 06787': [41.6990, -73.0590],
  'Turner Road, Thomaston, CT 06787': [41.6680, -73.0900],
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
