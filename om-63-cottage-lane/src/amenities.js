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
  lat: 42.45835,
  lng: -71.35350,
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
  { heading: 'Transit — MBTA', label: 'Transit — MBTA', color: '0xE67E22', swatch: '#E67E22' },
  { heading: 'Parks & Landmarks', label: 'Parks & Landmarks', color: '0x0E6655', swatch: '#0E6655' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Coffee',
    items: [
      { name: '80 Thoreau', note: 'Acclaimed New American · at Concord Depot', address: '80 Thoreau Street, Concord, MA 01742' },
      { name: 'Caffè Nero', note: 'European-style café · Main St', address: '46 Main Street, Concord, MA 01742' },
      { name: 'Haute Coffee', note: 'Café & bakery · Thoreau St', address: '12 Walden Street, Concord, MA 01742' },
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

/* Approximate (block-level) coordinates per address — see the note at the top.
   Markers are plotted by lat/lng so the Static Maps request stays under the
   address-geocode cap and every pin renders. */
export const COORDS = {
  '80 Thoreau Street, Concord, MA 01742': [42.45760, -71.35690],
  '46 Main Street, Concord, MA 01742': [42.46050, -71.34880],
  '12 Walden Street, Concord, MA 01742': [42.45960, -71.34870],
  '73 Main Street, Concord, MA 01742': [42.46070, -71.34950],
  '24 Walden Street, Concord, MA 01742': [42.46000, -71.34890],
  '1 Sudbury Road, Concord, MA 01742': [42.45920, -71.35040],
  '40 Main Street, Concord, MA 01742': [42.46040, -71.34860],
  '15 Walden Street, Concord, MA 01742': [42.45980, -71.34880],
  '42 Main Street, Concord, MA 01742': [42.46045, -71.34870],
  '23 Walden Street, Concord, MA 01742': [42.45990, -71.34900],
  '148 Walden Street, Concord, MA 01742': [42.45720, -71.34620],
  '152 Commonwealth Avenue, Concord, MA 01742': [42.46500, -71.39200],
  '57 Sudbury Road, Concord, MA 01742': [42.45850, -71.35200],
  '166 Main Street, Concord, MA 01742': [42.46170, -71.35230],
  '500 Walden Street, Concord, MA 01742': [42.44600, -71.34160],
  '129 Main Street, Concord, MA 01742': [42.46110, -71.35060],
  '133 Old Road to Nine Acre Corner, Concord, MA 01742': [42.44280, -71.38470],
  '90 Thoreau Street, Concord, MA 01742': [42.45730, -71.35730],
  '1212 Main Street, Concord, MA 01742': [42.45740, -71.39260],
  '915 Walden Street, Concord, MA 01742': [42.43960, -71.33890],
  '174 Liberty Street, Concord, MA 01742': [42.46970, -71.35190],
  '53 Cambridge Turnpike, Concord, MA 01742': [42.46160, -71.34480],
  '90 Stow Street, Concord, MA 01742': [42.45870, -71.35470],
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
