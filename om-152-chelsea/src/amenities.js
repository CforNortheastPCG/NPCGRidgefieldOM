/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates are real Google locations (street addresses geocode to
   ROOFTOP; stations/parks point at the feature itself).
*/

export const PROPERTY = {
  lat: 42.37366,
  lng: -71.03469,
  address: '152–154 Chelsea Street, East Boston, MA 02128',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Maverick Station (Blue Line)', value: '~0.5 mi · 2 stops to State St' },
  { label: 'Airport Station (Blue Line)', value: '~0.4 mi · free Logan shuttles' },
  { label: 'Downtown Boston', value: '~2 mi via Sumner Tunnel' },
  { label: 'Logan International Airport', value: '~1 mi · 5 min' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Services', label: 'Grocery & Services', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Education & Civic', label: 'Education & Civic', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Transit & Airport', label: 'Transit & Airport', color: '0xD81B60', swatch: '#D81B60' },
  { heading: 'Parks & Landmarks', label: 'Parks & Landmarks', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: 'Santarpio’s Pizza', note: 'Boston pizza institution · 2 blocks away', address: '111 Chelsea Street, East Boston, MA 02128' },
      { name: 'Rino’s Place', note: 'Acclaimed Italian · Eagle Hill', address: '258 Saratoga Street, East Boston, MA 02128' },
      { name: 'Angela’s Café', note: 'Renowned Mexican · Eagle Hill', address: '131 Lexington Street, East Boston, MA 02128' },
      { name: 'Kelley Square Pub', note: 'Neighborhood tavern · Bennington St', address: '84 Bennington Street, East Boston, MA 02128' },
      { name: 'Cunard Tavern', note: 'Gastropub · Jeffries Point', address: '24 Orleans Street, East Boston, MA 02128' },
      { name: 'ReelHouse', note: 'Waterfront dining · East Pier', address: '6 New Street, East Boston, MA 02128' },
      { name: 'Downeast Cider House', note: 'Cidery & taproom · waterfront', address: '256 Marginal Street, East Boston, MA 02128' },
      { name: 'La Sultana Bakery', note: 'Latin bakery · Maverick Square', address: '40 Maverick Square, East Boston, MA 02128' },
    ],
  },
  {
    heading: 'Grocery & Services',
    items: [
      { name: 'Shaw’s Supermarket', note: 'Full-service grocer · Liberty Plaza', address: '246 Border Street, East Boston, MA 02128' },
      { name: 'U.S. Post Office', note: 'USPS · Meridian St', address: '50 Meridian Street, East Boston, MA 02128' },
    ],
  },
  {
    heading: 'Education & Civic',
    items: [
      { name: 'East Boston Neighborhood Health Center', note: 'Among the largest community health centers in the U.S.', address: '10 Gove Street, East Boston, MA 02128' },
      { name: 'BPL — East Boston Branch', note: 'Public library · Bremen St', address: '365 Bremen Street, East Boston, MA 02128' },
      { name: 'East Boston High School', note: 'BPS high school · Eagle Hill', address: '86 White Street, East Boston, MA 02128' },
    ],
  },
  {
    heading: 'Transit & Airport',
    items: [
      { name: 'Maverick Station', note: 'Blue Line · 2 stops to State St', address: 'Maverick Station, East Boston, MA 02128' },
      { name: 'Airport Station', note: 'Blue Line · free shuttles to every Logan terminal', address: 'Airport Station, East Boston, MA 02128' },
      { name: 'Wood Island Station', note: 'Blue Line · Day Square side', address: 'Wood Island Station, East Boston, MA 02128' },
      { name: 'Logan International Airport', note: '~20,000 jobs · 43M passengers (2024)', address: 'Logan International Airport, East Boston, MA 02128' },
    ],
  },
  {
    heading: 'Parks & Landmarks',
    items: [
      { name: 'Piers Park', note: 'Harborfront park · skyline views', address: 'Piers Park, East Boston, MA 02128' },
      { name: 'LoPresti Park', note: 'Waterfront ballfields · Jeffries Point', address: '33 Sumner Street, East Boston, MA 02128' },
      { name: 'Bremen Street Community Park', note: '18-acre park on the Greenway', address: 'Bremen Street Community Park, East Boston, MA 02128' },
      { name: 'Constitution Beach', note: 'Public beach · Orient Heights', address: 'Constitution Beach, East Boston, MA 02128' },
    ],
  },
]

/* Real lat/lng per address (stations/parks point at the feature itself). Markers
   are plotted by lat/lng so the Static Maps request stays under the
   address-geocode cap and every pin renders. */
export const COORDS = {
  '111 Chelsea Street, East Boston, MA 02128': [42.37261, -71.03534],       // Santarpio's
  '258 Saratoga Street, East Boston, MA 02128': [42.37830, -71.03213],      // Rino's Place
  '131 Lexington Street, East Boston, MA 02128': [42.37857, -71.03502],     // Angela's Café
  '84 Bennington Street, East Boston, MA 02128': [42.37621, -71.03570],     // Kelley Square Pub
  '24 Orleans Street, East Boston, MA 02128': [42.36734, -71.03878],        // Cunard Tavern
  '6 New Street, East Boston, MA 02128': [42.37098, -71.04432],             // ReelHouse
  '256 Marginal Street, East Boston, MA 02128': [42.36346, -71.03321],      // Downeast Cider
  '40 Maverick Square, East Boston, MA 02128': [42.37009, -71.03921],       // La Sultana
  '246 Border Street, East Boston, MA 02128': [42.37664, -71.04041],        // Shaw's
  '50 Meridian Street, East Boston, MA 02128': [42.37126, -71.03943],       // Post Office
  '10 Gove Street, East Boston, MA 02128': [42.37235, -71.03835],           // EBNHC
  '365 Bremen Street, East Boston, MA 02128': [42.37785, -71.02788],        // BPL East Boston
  '86 White Street, East Boston, MA 02128': [42.38099, -71.03488],          // East Boston High
  'Maverick Station, East Boston, MA 02128': [42.36912, -71.03953],         // Maverick
  'Airport Station, East Boston, MA 02128': [42.37431, -71.03023],          // Airport
  'Wood Island Station, East Boston, MA 02128': [42.37963, -71.02287],      // Wood Island
  'Logan International Airport, East Boston, MA 02128': [42.36560, -71.01530], // Logan (west apron/terminal side)
  'Piers Park, East Boston, MA 02128': [42.36496, -71.03614],               // Piers Park
  '33 Sumner Street, East Boston, MA 02128': [42.37017, -71.04365],         // LoPresti Park
  'Bremen Street Community Park, East Boston, MA 02128': [42.37513, -71.03096], // Bremen St Park
  'Constitution Beach, East Boston, MA 02128': [42.38440, -71.00982],       // Constitution Beach
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
