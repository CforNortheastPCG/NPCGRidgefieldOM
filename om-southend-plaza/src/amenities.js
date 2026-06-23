/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them.
*/

export const PROPERTY = {
  lat: 41.66636,
  lng: -73.08035,
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

/* Precise coordinates per address, geocoded once via the Google Geocoding API
   (not block-level guesses). Markers are plotted by lat/lng so the Static Maps
   request does NOT geocode at render time — that matters because Static Maps
   caps the number of address-geocoded markers per request (~15) and silently
   returns a blank/error image when exceeded. lat/lng markers have no such cap. */
const COORDS = {
  '381 South Main Street, Thomaston, CT 06787': [41.66474, -73.07917],
  '299 South Main Street, Thomaston, CT 06787': [41.66636, -73.07938],
  '135 South Main Street, Thomaston, CT 06787': [41.66922, -73.07665],
  '66 Main Street, Thomaston, CT 06787': [41.67423, -73.07343],
  '495 South Main Street, Thomaston, CT 06787': [41.66166, -73.07947],
  '33 South Main Street, Thomaston, CT 06787': [41.67124, -73.07597],
  '455 South Main Street, Thomaston, CT 06787': [41.66261, -73.07908],
  '92 Main Street, Thomaston, CT 06787': [41.67399, -73.07396],
  '203 Main Street, Thomaston, CT 06787': [41.67246, -73.07475],
  '155 Main Street, Thomaston, CT 06787': [41.67297, -73.07417],
  '31 River Street, Thomaston, CT 06787': [41.67229, -73.07039],
  '45 Old Waterbury Road, Thomaston, CT 06787': [41.65170, -73.07751],
  '401 Watertown Road, Thomaston, CT 06787': [41.65436, -73.09210],
  '185 Branch Road, Thomaston, CT 06787': [41.65716, -73.09491],
  '57 Branch Road, Thomaston, CT 06787': [41.65678, -73.09172],
  '248 Main Street, Thomaston, CT 06787': [41.67231, -73.07590],
  '158 Main Street, Thomaston, CT 06787': [41.67295, -73.07574],
  '2065 Thomaston Road, Watertown, CT 06795': [41.65318, -73.09586],
  'CT-222 (Reynolds Bridge), Thomaston, CT 06787': [41.64991, -73.08647],
  'Turner Road, Thomaston, CT 06787': [41.68109, -73.11541],
}

/* Flattened list of every mapped POI, tagged with category label + colors —
   consumed by the Location & Amenities map. Every item with an `address` that
   has a COORDS entry is plotted by lat/lng. */
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
