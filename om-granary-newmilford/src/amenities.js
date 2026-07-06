/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Hand-curated
   for the 29 West Street (The Granary) offering, New Milford, CT — July 2026.
   Distances are approximate from the property.

   Coordinates are APPROXIMATE (New Milford village center) — refine against a
   geocoder before relying on pin placement. Items with an address + coords
   plot on the Google Static Map (requires VITE_GOOGLE_MAPS_API_KEY). */

export const PROPERTY = {
  lat: 41.577200,
  lng: -73.409000,
  address: '29 West Street, New Milford, CT 06776',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Village Green', value: 'Walk to the Green' },
  { label: 'Route 7', value: 'Danbury Rd — direct' },
  { label: 'I-84', value: 'Danbury (~20 min)' },
  { label: 'NYC Commute', value: 'via Metro-North (Danbury/Southeast)' },
]

export const MAP_CATEGORIES = [
  { heading: 'Dining — Bank Street & the Green', label: 'Dining', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Village, Shops & Culture', label: 'Village & Culture', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Daily Needs & Healthcare', label: 'Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

export const DIRECTORY = [
  {
    heading: 'Dining — Bank Street & the Green',
    items: [
      { name: 'Bank Street Tavern', note: 'Bank St · Neighborhood pub', address: 'Bank St, New Milford, CT 06776' },
      { name: 'Salsa Restaurant', note: 'Railroad St · Latin American', address: 'Railroad St, New Milford, CT 06776' },
      { name: 'The Cookhouse', note: 'Danbury Rd (Rte 7) · BBQ' },
      { name: '59 Bank', note: 'Bank St · American bistro' },
    ],
  },
  {
    heading: 'Village, Shops & Culture',
    items: [
      { name: 'New Milford Green', note: 'Historic town green & events', address: 'Main St, New Milford, CT 06776' },
      { name: 'Bank Street Theater', note: 'Bank St · Cinema & events', address: 'Bank St, New Milford, CT 06776' },
      { name: 'Bank Street Book Nook', note: 'Bank St · Independent bookstore' },
      { name: 'Village boutiques & cafés', note: 'Bank Street & the Green' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Young’s Field & River Walk', note: 'Housatonic riverfront park', address: 'Young’s Field Rd, New Milford, CT 06776' },
      { name: 'Harrybrooke Park', note: 'Riverside park & trails' },
      { name: 'Lynn Deming Park', note: 'Candlewood Lake beach · ~10 min' },
      { name: 'Litchfield Hills', note: 'Hiking, wineries & weekend trips' },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'Stop & Shop', note: 'Route 7 · Supermarket' },
      { name: 'Big Y World Class Market', note: 'Danbury Rd · Supermarket' },
      { name: 'New Milford Farmers’ Market', note: 'The Green · Seasonal', address: 'Main St, New Milford, CT 06776' },
      { name: 'Marbledale / local farms', note: 'Farm stands nearby' },
    ],
  },
  {
    heading: 'Daily Needs & Healthcare',
    items: [
      { name: 'New Milford Hospital', note: 'Elm St · Nuvance Health', address: 'Elm St, New Milford, CT 06776' },
      { name: 'CVS Pharmacy', note: 'Route 7 corridor' },
      { name: 'Banks & services', note: 'Bank Street & Route 7' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'Route 7 (Danbury Rd)', note: 'Direct corridor to Danbury & I-84' },
      { name: 'Danbury Metro-North Station', note: 'Danbury branch → NYC · ~15 mi' },
      { name: 'Southeast Station (Brewster, NY)', note: 'Harlem line → Grand Central · ~25 mi' },
      { name: 'Interstate 84', note: 'Danbury interchange · ~20 min' },
    ],
  },
]

/* Approximate geocoded coordinates per address (New Milford village center).
   Markers are plotted by lat/lng on the Static Maps API. Refine before use. */
const COORDS = {
  'Bank St, New Milford, CT 06776': [41.57680, -73.40760],
  'Railroad St, New Milford, CT 06776': [41.57620, -73.40680],
  'Main St, New Milford, CT 06776': [41.57720, -73.40850],
  'Young’s Field Rd, New Milford, CT 06776': [41.57350, -73.41100],
  'Elm St, New Milford, CT 06776': [41.58100, -73.40900],
}

/* Flattened list of every mapped POI, tagged with category label + colors. */
export const MAP_POIS = MAP_CATEGORIES.flatMap(cat => {
  const group = DIRECTORY.find(d => d.heading === cat.heading)
  if (!group) return []
  return group.items
    .filter(it => it.address && COORDS[it.address])
    .map((it, idx) => ({
      name: it.name,
      address: it.address,
      lat: COORDS[it.address][0],
      lng: COORDS[it.address][1],
      category: cat.label,
      color: cat.color,
      swatch: cat.swatch,
      n: idx + 1,
    }))
})
