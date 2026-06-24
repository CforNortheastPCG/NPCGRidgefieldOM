/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates are real Google locations (downtown addresses geocode to
   ROOFTOP; landmarks point at the feature itself, e.g. the North Bridge).
*/

export const PROPERTY = {
  lat: 42.45734,
  lng: -71.35885,
  address: '63 Cottage Lane, Concord, MA 01742',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Concord Center', value: 'Walkable · steps away' },
  { label: 'Concord MBTA (Fitchburg Line)', value: '~0.3 mi to depot' },
  { label: 'Cambridge / Boston by rail', value: 'Direct service' },
  { label: 'Route 2 / I-95 (Rte 128)', value: 'Minutes to on-ramps' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Coffee', label: 'Dining & Coffee', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Grocery & Services', label: 'Grocery & Services', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Education & Civic', label: 'Education & Civic', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Transit — MBTA', label: 'Transit — MBTA', color: '0xD81B60', swatch: '#D81B60' },
  { heading: 'Parks & Landmarks', label: 'Parks & Landmarks', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: '80 Thoreau', note: 'Acclaimed New American · at Concord Depot', address: '80 Thoreau Street, Concord, MA 01742' },
      { name: 'Caffè Nero', note: 'European-style café · Main St', address: '46 Main Street, Concord, MA 01742' },
      { name: 'Haute Coffee', note: 'Café & bakery · Walden St', address: '12 Walden Street, Concord, MA 01742' },
      { name: "Sally Ann Food Shop", note: 'Bakery & sandwiches · Main St', address: '73 Main Street, Concord, MA 01742' },
      { name: 'Fiorella’s Cucina', note: 'Italian · downtown', address: '24 Walden Street, Concord, MA 01742' },
      { name: "Sorrento's Brick Oven", note: 'Pizza · Sudbury Rd', address: '1 Sudbury Road, Concord, MA 01742' },
      { name: 'Starbucks', note: 'Coffee · Concord Center', address: '40 Main Street, Concord, MA 01742' },
      { name: 'Karma Concord', note: 'Asian fusion · downtown', address: '15 Walden Street, Concord, MA 01742' },
    ],
  },
  {
    heading: 'Grocery & Services',
    items: [
      { name: 'Main Streets Market & Café', note: 'Grocer, café & catering · Main St', address: '42 Main Street, Concord, MA 01742' },
      { name: 'CVS Pharmacy', note: 'Drugstore / pharmacy', address: '23 Walden Street, Concord, MA 01742' },
      { name: 'U.S. Post Office', note: 'USPS · Concord branch', address: '148 Walden Street, Concord, MA 01742' },
      { name: 'The UPS Store', note: 'Shipping & business services', address: '152 Commonwealth Avenue, Concord, MA 01742' },
      { name: 'Mobil', note: 'Fuel & convenience', address: '57 Sudbury Road, Concord, MA 01742' },
    ],
  },
  {
    heading: 'Education & Civic',
    items: [
      { name: 'Concord Academy', note: 'Private secondary school', address: '166 Main Street, Concord, MA 01742' },
      { name: 'Concord-Carlisle High School', note: 'Top-ranked public high school', address: '500 Walden Street, Concord, MA 01742' },
      { name: 'Concord Free Public Library', note: 'Town library · Main St', address: '129 Main Street, Concord, MA 01742' },
      { name: 'Emerson Hospital', note: 'Regional hospital', address: '133 Old Road to Nine Acre Corner, Concord, MA 01742' },
    ],
  },
  {
    heading: 'Transit — MBTA',
    items: [
      { name: 'Concord Station (Fitchburg Line)', note: 'Commuter rail to Cambridge & Boston', address: '90 Thoreau Street, Concord, MA 01742' },
      { name: 'West Concord Station', note: 'Fitchburg Line · West Concord', address: '1212 Main Street, Concord, MA 01742' },
    ],
  },
  {
    heading: 'Parks & Landmarks',
    items: [
      { name: 'Walden Pond State Reservation', note: 'Historic pond & trails', address: '915 Walden Street, Concord, MA 01742' },
      { name: 'Old North Bridge (Minute Man NHP)', note: 'Revolutionary War landmark', address: '174 Liberty Street, Concord, MA 01742' },
      { name: 'Concord Museum', note: 'History & decorative arts', address: '53 Cambridge Turnpike, Concord, MA 01742' },
      { name: 'Emerson Playground / Town Fields', note: 'Recreation · ballfields', address: '90 Stow Street, Concord, MA 01742' },
    ],
  },
]

/* Real lat/lng per address (landmarks point at the feature itself). Markers are
   plotted by lat/lng so the Static Maps request stays under the address-geocode
   cap and every pin renders. */
export const COORDS = {
  '80 Thoreau Street, Concord, MA 01742': [42.45665, -71.35758],            // 80 Thoreau
  '46 Main Street, Concord, MA 01742': [42.46004, -71.35034],               // Caffè Nero
  '12 Walden Street, Concord, MA 01742': [42.45953, -71.35036],             // Haute Coffee
  '73 Main Street, Concord, MA 01742': [42.45950, -71.35101],               // Sally Ann
  '24 Walden Street, Concord, MA 01742': [42.45917, -71.35014],             // Fiorella's
  '1 Sudbury Road, Concord, MA 01742': [42.45894, -71.35208],               // Sorrento's
  '40 Main Street, Concord, MA 01742': [42.46007, -71.35012],               // Starbucks
  '15 Walden Street, Concord, MA 01742': [42.45960, -71.34988],             // Karma
  '42 Main Street, Concord, MA 01742': [42.46008, -71.35025],               // Main Streets Market
  '23 Walden Street, Concord, MA 01742': [42.45945, -71.34974],             // CVS
  '148 Walden Street, Concord, MA 01742': [42.45701, -71.34649],            // Post Office
  '152 Commonwealth Avenue, Concord, MA 01742': [42.45853, -71.39647],      // The UPS Store
  '57 Sudbury Road, Concord, MA 01742': [42.45767, -71.35320],              // Mobil
  '166 Main Street, Concord, MA 01742': [42.45929, -71.35464],              // Concord Academy
  '500 Walden Street, Concord, MA 01742': [42.44773, -71.34787],            // Concord-Carlisle HS
  '129 Main Street, Concord, MA 01742': [42.45886, -71.35338],              // Free Public Library
  '133 Old Road to Nine Acre Corner, Concord, MA 01742': [42.45210, -71.37627],// Emerson Hospital
  '90 Thoreau Street, Concord, MA 01742': [42.45645, -71.35763],            // Concord Station
  '1212 Main Street, Concord, MA 01742': [42.45701, -71.39183],             // West Concord Station
  '915 Walden Street, Concord, MA 01742': [42.44120, -71.33490],            // Walden Pond
  '174 Liberty Street, Concord, MA 01742': [42.46904, -71.35062],           // Old North Bridge
  '53 Cambridge Turnpike, Concord, MA 01742': [42.45765, -71.34208],        // Concord Museum
  '90 Stow Street, Concord, MA 01742': [42.45676, -71.35089],               // Emerson Playground
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
