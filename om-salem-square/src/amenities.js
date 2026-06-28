/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them.
*/

export const PROPERTY = {
  lat: 41.4776,
  lng: -73.0466,
  address: '628 New Haven Road, Naugatuck, CT 06770',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Route 8 (limited access)', value: 'Direct access · valley spine' },
  { label: 'Metro-North · Waterbury Branch', value: 'New Naugatuck station 2027' },
  { label: 'Greater Waterbury', value: '~10 min north on Rte 8' },
  { label: 'New Haven Road (Rte 63)', value: '16,200 VPD frontage' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Retail', label: 'Dining & Retail', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Employment & Anchors', label: 'Employment & Anchors', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Civic & Lifestyle', label: 'Civic & Lifestyle', color: '0x117A65', swatch: '#117A65' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Retail',
    items: [
      { name: 'Salem Square Retail Center', note: 'On-site retail & service tenants', address: '628 New Haven Road, Naugatuck, CT 06770' },
      { name: 'Walmart Supercenter', note: 'Big-box anchor · New Haven Rd · ~1.5 mi', address: '1100 New Haven Road, Naugatuck, CT 06770' },
      { name: 'Stop & Shop', note: 'Grocery anchor · ~2 mi', address: '727 Rubber Avenue, Naugatuck, CT 06770' },
      { name: 'Brass Mill Center', note: 'Regional mall · ~10 min north', address: '495 Union Street, Waterbury, CT 06706' },
      { name: 'The Home Depot', note: 'Home improvement · ~10 min north', address: '575 Bank Street, Waterbury, CT 06708' },
      { name: 'Downtown Naugatuck / Naugatuck Green', note: 'Walkable historic center · ~2 mi', address: 'Naugatuck Green, Naugatuck, CT 06770' },
      { name: 'La Casita Mexican Restaurant', note: 'Downtown Green dining', address: '9 Church Street, Naugatuck, CT 06770' },
      { name: 'The Loaded Goat Coffee Co.', note: 'Downtown Green café', address: '64 Church Street, Naugatuck, CT 06770' },
      { name: "McDonald's", note: 'New Haven Rd · ~0.7 mi', address: '571 New Haven Road, Naugatuck, CT 06770' },
    ],
  },
  {
    heading: 'Employment & Anchors',
    items: [
      { name: 'Naugatuck Industrial Park', note: 'Borough manufacturing base', address: 'Cherry Street Extension, Naugatuck, CT 06770' },
      { name: 'Naugatuck Town Hall (Borough)', note: 'Major local employer', address: '229 Church Street, Naugatuck, CT 06770' },
      { name: 'Naugatuck High School', note: 'Naugatuck Public Schools', address: '543 Rubber Avenue, Naugatuck, CT 06770' },
      { name: 'Waterbury Hospital', note: '~10 min north', address: '64 Robbins Street, Waterbury, CT 06708' },
      { name: "Saint Mary's Hospital (Trinity Health)", note: '~10 min north', address: '56 Franklin Street, Waterbury, CT 06706' },
      { name: 'Post University', note: 'Greater Waterbury', address: '800 Country Club Road, Waterbury, CT 06723' },
      { name: 'UConn Waterbury', note: 'Greater Waterbury', address: '99 East Main Street, Waterbury, CT 06702' },
    ],
  },
  {
    heading: 'Civic & Lifestyle',
    items: [
      { name: 'Howard Whittemore Memorial Library', note: 'Downtown landmark', address: '243 Church Street, Naugatuck, CT 06770' },
      { name: 'Naugatuck YMCA', note: 'Recreation · downtown', address: '284 Church Street, Naugatuck, CT 06770' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'Metro-North · Naugatuck Station', note: 'New $33.2M station · opens 2027', address: 'Water Street, Naugatuck, CT 06770' },
      { name: 'Platform at Naugatuck (TOD)', note: '7-acre, 180-unit mixed-use TOD at new station', address: '20 Old Firehouse Road, Naugatuck, CT 06770' },
      { name: 'Metro-North · Waterbury Terminus', note: 'Waterbury Branch → New Haven Line', address: '510 Meadow Street, Waterbury, CT 06702' },
      { name: 'Route 8 Interchange', note: 'Limited-access expressway', address: 'Route 8, Naugatuck, CT 06770' },
    ],
  },
]

/* Geocoded coordinates per address. Markers are plotted by lat/lng.
   Approximate — for the reference map only. */
const COORDS = {
  'Naugatuck Green, Naugatuck, CT 06770': [41.4859, -73.0517],
  '628 New Haven Road, Naugatuck, CT 06770': [41.478096, -73.046652], // Google rooftop geocode (matches parcel.js)
  '1100 New Haven Road, Naugatuck, CT 06770': [41.47065, -73.02799],
  '727 Rubber Avenue, Naugatuck, CT 06770': [41.49387, -73.07787],
  '495 Union Street, Waterbury, CT 06706': [41.54932, -73.02526],
  '575 Bank Street, Waterbury, CT 06708': [41.54820, -73.04181],
  '571 New Haven Road, Naugatuck, CT 06770': [41.47434, -73.04318],
  'Cherry Street Extension, Naugatuck, CT 06770': [41.4760, -73.0560],
  '229 Church Street, Naugatuck, CT 06770': [41.49069, -73.05500],
  '9 Church Street, Naugatuck, CT 06770': [41.48747, -73.05602],
  '64 Church Street, Naugatuck, CT 06770': [41.48820, -73.05617],
  '20 Old Firehouse Road, Naugatuck, CT 06770': [41.48330, -73.05250],
  '543 Rubber Avenue, Naugatuck, CT 06770': [41.49127, -73.07224],
  '243 Church Street, Naugatuck, CT 06770': [41.49094, -73.05473],
  '284 Church Street, Naugatuck, CT 06770': [41.49216, -73.05502],
  '64 Robbins Street, Waterbury, CT 06708': [41.5620, -73.0440],
  '56 Franklin Street, Waterbury, CT 06706': [41.5566, -73.0410],
  '800 Country Club Road, Waterbury, CT 06723': [41.5380, -73.0760],
  '99 East Main Street, Waterbury, CT 06702': [41.5570, -73.0380],
  'Water Street, Naugatuck, CT 06770': [41.4866, -73.0507],
  '510 Meadow Street, Waterbury, CT 06702': [41.5520, -73.0400],
  'Route 8, Naugatuck, CT 06770': [41.4750, -73.0470],
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
