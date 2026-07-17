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
  { heading: 'Retail, Daily Needs & Healthcare', label: 'Retail & Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
]

export const DIRECTORY = [
  {
    heading: 'Dining — Bank Street & the Green',
    items: [
      { name: 'Sparrow Bar & Restaurant', note: '31 Bank St · Global small plates', lat: 41.5773683, lng: -73.4117965 },
      { name: 'Lucia Ristorante', note: '51 Bank St · Italian', lat: 41.5771958, lng: -73.4124737 },
      { name: 'La Piccolina', note: '27 Main St · Italian, on the Green', lat: 41.5779930, lng: -73.4114395 },
      { name: 'Cowboy Butter', note: '59 Bank St · American', lat: 41.5773745, lng: -73.4120694 },
      { name: 'Yokohama Japanese Restaurant', note: '131 Danbury Rd · Sushi', lat: 41.5559667, lng: -73.4164457 },
    ],
  },
  {
    heading: 'Village, Shops & Culture',
    items: [
      { name: 'New Milford Green', note: 'Historic town green & events', lat: 41.5783758, lng: -73.4114703 },
      { name: 'Bank Street Theater', note: '46 Bank St · Cinema & events', lat: 41.5777087, lng: -73.4123486 },
      { name: 'Bank Street Book Nook', note: '36 Bank St · Independent bookstore', lat: 41.5775000, lng: -73.4121000 },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Young’s Field & River Walk', note: 'Housatonic riverfront park', lat: 41.5769078, lng: -73.4145178 },
      { name: 'Lynn Deming Park', note: 'Candlewood Lake beach · ~10 min', lat: 41.5706500, lng: -73.4390108 },
      { name: 'Harrybrooke Park', note: 'Riverside park & trails', lat: 41.5369736, lng: -73.4148304 },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'New Milford Farmers’ Market', note: 'The Green · Seasonal', lat: 41.57810, lng: -73.41100 },
      { name: 'Big Y World Class Market', note: '1 Kent Rd · Supermarket', lat: 41.5739910, lng: -73.4197424 },
      { name: 'Stop & Shop', note: '180 Danbury Rd · Supermarket', lat: 41.5505503, lng: -73.4192926 },
      { name: 'Aldi', note: '125 Danbury Rd (Rte 7)', lat: 41.5565100, lng: -73.4171900 },
    ],
  },
  {
    heading: 'Retail, Daily Needs & Healthcare',
    items: [
      { name: 'Walmart Supercenter', note: '164 Danbury Rd (Rte 7)', lat: 41.5520315, lng: -73.4197505 },
      { name: 'The Home Depot', note: '104 Danbury Rd (Rte 7)', lat: 41.5594928, lng: -73.4176963 },
      { name: 'Litchfield Crossing & New Milford Plaza', note: 'Kohl’s, TJ Maxx, Petco & more', lat: 41.5513168, lng: -73.4149253 },
      { name: 'New Milford Hospital', note: 'Elm St · Nuvance Health', lat: 41.58181, lng: -73.40977 },
      { name: 'CVS Pharmacy', note: '40 East St · Pharmacy', lat: 41.5793367, lng: -73.4077013 },
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
