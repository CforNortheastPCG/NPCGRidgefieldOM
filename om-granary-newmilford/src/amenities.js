/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Hand-curated
   for the 29 West Street (The Granary) offering, New Milford, CT — July 2026.
   Distances are approximate from the property.

   Coordinates are geocoded (Google, July 2026) — most rooftop/interpolated on
   the village center; regional/vague destinations (Litchfield Hills, corridor
   transit) are covered on the Drive Times & Regional Positioning pages instead.
   Markers plot by lat/lng on the Google Static Map (VITE_GOOGLE_MAPS_API_KEY). */

export const PROPERTY = {
  lat: 41.5743564,
  lng: -73.4116566,
  address: '29 West Street, New Milford, CT 06776',
}

/* Connectivity facts (also surfaced on the Drive Times & Regional pages). */
export const CONNECTIVITY = [
  { label: 'Village Green', value: 'Walk to the Green' },
  { label: 'Route 7', value: 'Danbury Rd — direct' },
  { label: 'I-84', value: 'Danbury (~20 min)' },
  { label: 'NYC Commute', value: 'via Metro-North (Danbury Branch)' },
]

export const MAP_CATEGORIES = [
  { heading: 'Dining — Bank Street & the Green', label: 'Dining', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Village, Shops & Culture', label: 'Village & Culture', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Daily Needs & Healthcare', label: 'Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
]

export const DIRECTORY = [
  {
    heading: 'Dining — Bank Street & the Green',
    items: [
      { name: 'Bank Street Tavern', note: 'Bank St · Neighborhood pub', lat: 41.57746, lng: -73.41181 },
      { name: 'Salsa Restaurant', note: 'Railroad St · Latin American', lat: 41.57692, lng: -73.41264 },
      { name: '59 Bank', note: 'Bank St · American bistro', lat: 41.57719, lng: -73.41248 },
      { name: 'The Cookhouse', note: 'Danbury Rd (Rte 7) · BBQ', lat: 41.57033, lng: -73.41438 },
    ],
  },
  {
    heading: 'Village, Shops & Culture',
    items: [
      { name: 'New Milford Green', note: 'Historic town green & events', lat: 41.57792, lng: -73.41084 },
      { name: 'Bank Street Theater', note: 'Bank St · Cinema & events', lat: 41.57752, lng: -73.41229 },
      { name: 'Bank Street Book Nook', note: 'Bank St · Independent bookstore', lat: 41.57752, lng: -73.41194 },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Young’s Field & River Walk', note: 'Housatonic riverfront park', lat: 41.57898, lng: -73.41615 },
      { name: 'Lynn Deming Park', note: 'Candlewood Lake beach · ~10 min', lat: 41.56996, lng: -73.44031 },
      { name: 'Harrybrooke Park', note: 'Riverside park & trails', lat: 41.54064, lng: -73.41201 },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'New Milford Farmers’ Market', note: 'The Green · Seasonal', lat: 41.57810, lng: -73.41100 },
      { name: 'Big Y World Class Market', note: 'Danbury Rd · Supermarket', lat: 41.56827, lng: -73.41443 },
      { name: 'Stop & Shop', note: 'Danbury Rd · Supermarket', lat: 41.55037, lng: -73.41920 },
    ],
  },
  {
    heading: 'Daily Needs & Healthcare',
    items: [
      { name: 'New Milford Hospital', note: 'Elm St · Nuvance Health', lat: 41.58181, lng: -73.40977 },
      { name: 'CVS Pharmacy', note: 'Danbury Rd (Rte 7)', lat: 41.55286, lng: -73.41938 },
    ],
  },
]

/* Flattened list of every mapped POI, tagged with category label + colors and
   numbered within its category (the `n` matches the pin label on the map). */
export const MAP_POIS = MAP_CATEGORIES.flatMap(cat => {
  const group = DIRECTORY.find(d => d.heading === cat.heading)
  if (!group) return []
  return group.items
    .filter(it => typeof it.lat === 'number' && typeof it.lng === 'number')
    .map((it, idx) => ({
      name: it.name,
      note: it.note,
      lat: it.lat,
      lng: it.lng,
      category: cat.label,
      color: cat.color,
      swatch: cat.swatch,
      n: idx + 1,
    }))
})
