/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them. To
   refine, run the Google Geocoding helper or replace the COORDS lat/lng pairs.
*/

export const PROPERTY = {
  lat: 42.38605,
  lng: -71.09175,
  address: '416-422 McGrath Highway, Somerville, MA 02143',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'McGrath Highway (Route 28)', value: 'Direct frontage' },
  { label: 'Sullivan Sq / Assembly (Orange Line)', value: '~5–10 min' },
  { label: 'Downtown Boston', value: '~10 min · ~2 mi' },
  { label: 'I-93 / Route 1', value: 'Minutes to on-ramps' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Retail', label: 'Grocery & Retail', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Shopping & Entertainment', label: 'Shopping & Entertainment', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Transit — MBTA', label: 'Transit — MBTA', color: '0xE67E22', swatch: '#E67E22' },
  { heading: 'Education & Civic', label: 'Education & Civic', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Parks & Landmarks', label: 'Parks & Landmarks', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: 'Sarma', note: 'Acclaimed Mediterranean meze · East Somerville', address: '249 Pearl Street, Somerville, MA 02145' },
      { name: "McDonald's", note: 'Quick-serve · Mystic Ave corridor', address: '280 Mystic Avenue, Somerville, MA 02145' },
      { name: "Dunkin'", note: 'Coffee · Broadway, East Somerville', address: '316 Broadway, Somerville, MA 02145' },
      { name: 'Texas Roadhouse', note: 'Steakhouse · near Assembly', address: '157 Santilli Highway, Everett, MA 02149' },
    ],
  },
  {
    heading: 'Grocery & Retail',
    items: [
      { name: 'Stop & Shop', note: 'Supermarket · Twin City Plaza', address: '779 McGrath Highway, Somerville, MA 02143' },
      { name: 'Market Basket', note: 'Value grocer · Chelsea / Everett line', address: '170 Everett Avenue, Chelsea, MA 02150' },
      { name: 'Target', note: 'Department store · Assembly Row', address: '411 Revolution Drive, Somerville, MA 02145' },
      { name: 'The Home Depot', note: 'Home improvement · Mystic Ave', address: '75 Mystic Avenue, Somerville, MA 02145' },
      { name: 'Costco Wholesale', note: 'Warehouse club · Everett', address: '1 Mystic View Road, Everett, MA 02149' },
    ],
  },
  {
    heading: 'Shopping & Entertainment',
    items: [
      { name: 'Assembly Row', note: 'Outlets, dining, cinema & waterfront', address: '355 Artisan Way, Somerville, MA 02145' },
      { name: 'Encore Boston Harbor', note: 'Resort & casino · Everett', address: '1 Broadway, Everett, MA 02149' },
      { name: 'Twin City Plaza', note: 'Neighborhood shopping center', address: '13 McGrath Highway, Somerville, MA 02143' },
    ],
  },
  {
    heading: 'Transit — MBTA',
    items: [
      { name: 'Sullivan Square (Orange Line)', note: 'Rapid transit to downtown Boston', address: 'Sullivan Square, Charlestown, MA 02129' },
      { name: 'Gilman Square (Green Line)', note: 'Green Line Extension', address: 'Gilman Square Station, Somerville, MA 02143' },
      { name: 'Washington Street (Green Line)', note: 'Green Line Extension', address: 'Washington Street Station, Somerville, MA 02143' },
      { name: 'Assembly (Orange Line)', note: 'Rapid transit · Assembly Row', address: 'Assembly Station, Somerville, MA 02145' },
    ],
  },
  {
    heading: 'Education & Civic',
    items: [
      { name: 'MIT', note: 'Massachusetts Institute of Technology · Cambridge', address: '77 Massachusetts Avenue, Cambridge, MA 02139' },
      { name: 'Tufts University', note: 'Medford / Somerville campus', address: '419 Boston Avenue, Medford, MA 02155' },
      { name: 'Bunker Hill Community College', note: 'Charlestown campus', address: '250 New Rutherford Avenue, Charlestown, MA 02129' },
    ],
  },
  {
    heading: 'Parks & Landmarks',
    items: [
      { name: 'Prospect Hill Park', note: 'Historic hilltop · Boston skyline views', address: 'Munroe Street, Somerville, MA 02143' },
      { name: 'Foss Park', note: 'Somerville recreation · ballfields & pool', address: 'Fellsway West, Somerville, MA 02145' },
      { name: 'Bunker Hill Monument', note: 'National landmark · Charlestown', address: 'Monument Square, Charlestown, MA 02129' },
      { name: 'USS Constitution', note: 'Charlestown Navy Yard', address: 'Charlestown Navy Yard, Boston, MA 02129' },
    ],
  },
]

/* Approximate (block-level) coordinates per address — see the note at the top.
   Markers are plotted by lat/lng so the Static Maps request stays under the
   address-geocode cap and every pin renders. */
export const COORDS = {
  '249 Pearl Street, Somerville, MA 02145': [42.38930, -71.09280],
  '280 Mystic Avenue, Somerville, MA 02145': [42.38680, -71.08950],
  '316 Broadway, Somerville, MA 02145': [42.38650, -71.08250],
  '157 Santilli Highway, Everett, MA 02149': [42.39520, -71.06950],
  '779 McGrath Highway, Somerville, MA 02143': [42.38120, -71.09380],
  '170 Everett Avenue, Chelsea, MA 02150': [42.39120, -71.06420],
  '411 Revolution Drive, Somerville, MA 02145': [42.39200, -71.07720],
  '75 Mystic Avenue, Somerville, MA 02145': [42.39350, -71.08400],
  '1 Mystic View Road, Everett, MA 02149': [42.40300, -71.07450],
  '355 Artisan Way, Somerville, MA 02145': [42.39250, -71.07750],
  '1 Broadway, Everett, MA 02149': [42.39580, -71.06680],
  '13 McGrath Highway, Somerville, MA 02143': [42.37850, -71.09080],
  'Sullivan Square, Charlestown, MA 02129': [42.38390, -71.07690],
  'Gilman Square Station, Somerville, MA 02143': [42.39380, -71.09720],
  'Washington Street Station, Somerville, MA 02143': [42.38050, -71.08580],
  'Assembly Station, Somerville, MA 02145': [42.39280, -71.07740],
  '77 Massachusetts Avenue, Cambridge, MA 02139': [42.36010, -71.09420],
  '419 Boston Avenue, Medford, MA 02155': [42.40750, -71.11900],
  '250 New Rutherford Avenue, Charlestown, MA 02129': [42.37420, -71.07000],
  'Munroe Street, Somerville, MA 02143': [42.38080, -71.09480],
  'Fellsway West, Somerville, MA 02145': [42.38780, -71.08580],
  'Monument Square, Charlestown, MA 02129': [42.37630, -71.06080],
  'Charlestown Navy Yard, Boston, MA 02129': [42.37240, -71.05670],
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
