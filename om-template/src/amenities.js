/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   TODO: area amenities — single source of truth for the Location & Amenities
   map page. Replace the placeholder property coordinates and POIs below with
   the real ones for this deal. Items with an `address` (and a matching entry
   in COORDS) are plotted on the map, color-coded by category; items without
   an address still appear in the printed directory.
*/

export const PROPERTY = {
  lat: 41.0000, // TODO: set property coordinates
  lng: -73.0000, // TODO: set property coordinates
  address: '000 Street Name, City, ST 00000',
}

/* Connectivity facts shown on the map page. TODO: fill in real values. */
export const CONNECTIVITY = [
  { label: 'TODO Transit', value: 'TODO (~0 mi)' },
  { label: 'TODO Anchor', value: 'TODO (~0 mi)' },
  { label: 'TODO University', value: '~0 miles' },
  { label: 'TODO Commute', value: '~0 min' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Retail', label: 'Dining & Retail', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Universities & Anchors', label: 'Universities', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Retail',
    items: [
      { name: 'TODO Nearby Amenity', note: 'TODO note · ~0 mi', address: 'TODO Nearby Amenity, City, ST 00000' },
    ],
  },
  {
    heading: 'Universities & Anchors',
    items: [
      { name: 'TODO Nearby Amenity', note: 'TODO note · ~0 mi', address: 'TODO Anchor, City, ST 00000' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'TODO Nearby Amenity', note: 'TODO note · ~0 mi', address: 'TODO Transit, City, ST 00000' },
    ],
  },
]

/* Geocoded coordinates per address. Markers are plotted by lat/lng.
   TODO: set real coordinates for each mapped address above. */
const COORDS = {
  'TODO Nearby Amenity, City, ST 00000': [41.0050, -73.0050],
  'TODO Anchor, City, ST 00000': [41.0100, -72.9950],
  'TODO Transit, City, ST 00000': [40.9950, -73.0100],
}

/* Flattened list of every mapped POI, tagged with category label + colors —
   consumed by the Location & Amenities map. */
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
      n: idx + 1, // per-category number (Static Maps labels are single-char)
    }))
})
