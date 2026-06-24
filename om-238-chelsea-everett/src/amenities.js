/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them.
*/

export const PROPERTY = {
  lat: 42.40150,
  lng: -71.05250,
  address: '238 Chelsea Street, Everett, MA 02149',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Encore Boston Harbor', value: '< 2 miles' },
  { label: 'Route 1 / Tobin Bridge', value: 'Minutes to on-ramps' },
  { label: 'MBTA Orange Line (Wellington)', value: '~5 min' },
  { label: 'Downtown Boston', value: '~10 min · ~4 mi' },
]

/* Map category styling, keyed by directory heading. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Retail', label: 'Grocery & Retail', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Shopping & Entertainment', label: 'Shopping & Entertainment', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Transit — MBTA', label: 'Transit — MBTA', color: '0xE67E22', swatch: '#E67E22' },
  { heading: 'Civic & Healthcare', label: 'Civic & Healthcare', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: 'Night Shift Brewing', note: 'Brewery & taproom · Everett', address: '87 Santilli Highway, Everett, MA 02149' },
      { name: "Dunkin'", note: 'Coffee · Broadway corridor', address: '414 Broadway, Everett, MA 02149' },
      { name: 'Encore Dining & Bars', note: 'Restaurants & lounges at Encore', address: '1 Broadway, Everett, MA 02149' },
      { name: 'Anthem / Jade (new developments)', note: 'New mixed-use dining nearby', address: 'Lower Broadway, Everett, MA 02149' },
    ],
  },
  {
    heading: 'Grocery & Retail',
    items: [
      { name: 'Market Basket', note: 'Value grocer · Chelsea / Everett line', address: '170 Everett Avenue, Chelsea, MA 02150' },
      { name: 'Costco Wholesale', note: 'Warehouse club · Everett', address: '1 Mystic View Road, Everett, MA 02149' },
      { name: 'Target', note: 'Department store · Gateway Center', address: '36 Mystic View Road, Everett, MA 02149' },
      { name: 'The Home Depot', note: 'Home improvement · Revere Beach Pkwy', address: '1100 Revere Beach Parkway, Everett, MA 02149' },
    ],
  },
  {
    heading: 'Shopping & Entertainment',
    items: [
      { name: 'Encore Boston Harbor', note: 'Resort & casino · < 2 miles', address: '1 Broadway, Everett, MA 02149' },
      { name: 'Gateway Center', note: 'Big-box shopping · Everett', address: '36 Mystic View Road, Everett, MA 02149' },
      { name: 'Assembly Row', note: 'Outlets, dining & cinema · Somerville', address: '355 Artisan Way, Somerville, MA 02145' },
    ],
  },
  {
    heading: 'Transit — MBTA',
    items: [
      { name: 'Wellington (Orange Line)', note: 'Rapid transit to downtown Boston', address: 'Wellington Station, Medford, MA 02155' },
      { name: 'Assembly (Orange Line)', note: 'Rapid transit · Assembly Row', address: 'Assembly Station, Somerville, MA 02145' },
      { name: 'Chelsea (Commuter Rail / SL3)', note: 'Rail & Silver Line to Boston', address: 'Chelsea Station, Chelsea, MA 02150' },
      { name: 'Malden Center (Orange Line)', note: 'Rapid transit & commuter rail', address: 'Malden Center Station, Malden, MA 02148' },
    ],
  },
  {
    heading: 'Civic & Healthcare',
    items: [
      { name: 'CHA Everett Hospital', note: 'Cambridge Health Alliance', address: '103 Garland Street, Everett, MA 02149' },
      { name: 'Everett High School', note: 'Public high school', address: '100 Elm Street, Everett, MA 02149' },
      { name: 'Everett City Hall', note: 'Municipal offices · Broadway', address: '484 Broadway, Everett, MA 02149' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Glendale Park', note: 'Everett recreation · ballfields', address: 'Elm Street, Everett, MA 02149' },
      { name: 'Rivergreen Park', note: 'Riverfront path · near Encore', address: 'Lower Broadway, Everett, MA 02149' },
      { name: 'Gateway Park', note: 'Mystic riverfront open space', address: 'Mystic View Road, Everett, MA 02149' },
    ],
  },
]

/* Approximate (block-level) coordinates per address — see the note at the top. */
export const COORDS = {
  '87 Santilli Highway, Everett, MA 02149': [42.39650, -71.06650],
  '414 Broadway, Everett, MA 02149': [42.40550, -71.05700],
  '1 Broadway, Everett, MA 02149': [42.39580, -71.06680],
  'Lower Broadway, Everett, MA 02149': [42.39900, -71.06400],
  '170 Everett Avenue, Chelsea, MA 02150': [42.39120, -71.06420],
  '1 Mystic View Road, Everett, MA 02149': [42.40300, -71.07450],
  '36 Mystic View Road, Everett, MA 02149': [42.40450, -71.07600],
  '1100 Revere Beach Parkway, Everett, MA 02149': [42.40150, -71.06850],
  '355 Artisan Way, Somerville, MA 02145': [42.39250, -71.07750],
  'Wellington Station, Medford, MA 02155': [42.40230, -71.07730],
  'Assembly Station, Somerville, MA 02145': [42.39280, -71.07740],
  'Chelsea Station, Chelsea, MA 02150': [42.39500, -71.03400],
  'Malden Center Station, Malden, MA 02148': [42.42670, -71.07420],
  '103 Garland Street, Everett, MA 02149': [42.40800, -71.05600],
  '100 Elm Street, Everett, MA 02149': [42.41100, -71.05300],
  '484 Broadway, Everett, MA 02149': [42.40820, -71.05480],
  'Elm Street, Everett, MA 02149': [42.41000, -71.04900],
  'Mystic View Road, Everett, MA 02149': [42.40500, -71.07300],
}

/* Flattened list of every mapped POI, tagged with category label + colors. */
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
      n: idx + 1,
    }))
})
