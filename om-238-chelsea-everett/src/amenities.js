/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates are real Google locations (geocoded to ROOFTOP where
   available; stations and parks point at the feature itself).
*/

export const PROPERTY = {
  lat: 42.40329,
  lng: -71.04595,
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
  { heading: 'Transit — MBTA', label: 'Transit — MBTA', color: '0xD81B60', swatch: '#D81B60' },
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
      { name: 'Rivergreen Park', note: 'Riverfront path · near Encore', address: 'Rivergreen Drive, Everett, MA 02149' },
      { name: 'Gateway Park', note: 'Mystic riverfront open space', address: 'Mystic View Road, Everett, MA 02149' },
    ],
  },
]

/* Real lat/lng per address — geocoded via Google (ROOFTOP where available;
   stations/parks point at the feature itself). Markers are plotted by lat/lng. */
export const COORDS = {
  '87 Santilli Highway, Everett, MA 02149': [42.40596, -71.06789],         // Night Shift Brewing
  '414 Broadway, Everett, MA 02149': [42.40672, -71.05584],                // Dunkin'
  '1 Broadway, Everett, MA 02149': [42.39521, -71.06954],                  // Encore Boston Harbor
  'Lower Broadway, Everett, MA 02149': [42.40206, -71.05342],              // Anthem / Jade developments
  'Rivergreen Drive, Everett, MA 02149': [42.40965, -71.07166],            // Rivergreen Park
  '170 Everett Avenue, Chelsea, MA 02150': [42.39648, -71.04225],          // Market Basket
  '1 Mystic View Road, Everett, MA 02149': [42.39690, -71.07149],          // Costco Wholesale
  '36 Mystic View Road, Everett, MA 02149': [42.39873, -71.07230],         // Target / Gateway Center
  '1100 Revere Beach Parkway, Everett, MA 02149': [42.40412, -71.02545],   // The Home Depot
  '355 Artisan Way, Somerville, MA 02145': [42.39425, -71.07914],          // Assembly Row
  'Wellington Station, Medford, MA 02155': [42.40237, -71.07708],          // Wellington (Orange Line)
  'Assembly Station, Somerville, MA 02145': [42.39281, -71.07726],         // Assembly (Orange Line)
  'Chelsea Station, Chelsea, MA 02150': [42.39682, -71.04040],             // Chelsea (CR / SL3)
  'Malden Center Station, Malden, MA 02148': [42.42734, -71.07423],        // Malden Center (Orange Line)
  '103 Garland Street, Everett, MA 02149': [42.40942, -71.03968],          // CHA Everett Hospital
  '100 Elm Street, Everett, MA 02149': [42.41428, -71.04349],              // Everett High School
  '484 Broadway, Everett, MA 02149': [42.40844, -71.05451],                // Everett City Hall
  'Elm Street, Everett, MA 02149': [42.41374, -71.04504],                  // Glendale Park
  'Mystic View Road, Everett, MA 02149': [42.39991, -71.07075],            // Gateway Park
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
