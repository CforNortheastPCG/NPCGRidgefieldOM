/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Items with an
   `address` (and a matching entry in COORDS) are plotted on the map,
   color-coded by category; items without an address still appear in the
   printed directory.

   NOTE: coordinates below are approximate (block-level) and intended for the
   reference map only — verify against the survey before relying on them.
*/

export const PROPERTY = {
  lat: 41.6650,
  lng: -73.0730,
  address: '310 South Main Street, Thomaston, CT 06787',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Route 8 (Exits 38 & 39)', value: 'Less than 1 mile' },
  { label: 'U.S. Route 6', value: 'Through downtown Thomaston' },
  { label: 'Waterbury / Metro-North', value: '~10–15 min south on Rte 8' },
  { label: 'South Main Street', value: '12,800 VPD frontage' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Retail', label: 'Dining & Retail', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Employment & Anchors', label: 'Employment & Anchors', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Retail',
    items: [
      { name: 'Downtown Thomaston / Opera House', note: '1884 landmark · town center', address: '158 Main Street, Thomaston, CT 06787' },
      { name: 'South End Plaza Retail', note: 'On-site retail & service tenants', address: '310 South Main Street, Thomaston, CT 06787' },
      { name: 'Seth Thomas Park / River Greenway', note: 'Downtown reinvestment', address: 'Seth Thomas Park, Thomaston, CT 06787' },
    ],
  },
  {
    heading: 'Employment & Anchors',
    items: [
      { name: 'Thomaston Savings Bank', note: 'Headquartered in town', address: '203 Main Street, Thomaston, CT 06787' },
      { name: 'Stewart EFI', note: 'Precision metal stamping', address: '45 Old Waterbury Road, Thomaston, CT 06787' },
      { name: 'Ward Leonard (Fairbanks Morse Defense)', note: 'Defense manufacturing', address: '401 Watertown Road, Thomaston, CT 06787' },
      { name: 'Waterbury Hospital', note: '~10 min south', address: '64 Robbins Street, Waterbury, CT 06708' },
      { name: "Saint Mary's Hospital (Trinity Health)", note: '~10 min south', address: '56 Franklin Street, Waterbury, CT 06706' },
      { name: 'Post University', note: 'Greater Waterbury', address: '800 Country Club Road, Waterbury, CT 06723' },
      { name: 'UConn Waterbury', note: 'Greater Waterbury', address: '99 East Main Street, Waterbury, CT 06702' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'Route 8 Interchange (Exits 38 & 39)', note: 'Limited-access expressway · <1 mi', address: 'Route 8, Thomaston, CT 06787' },
      { name: 'Metro-North · Waterbury Terminus', note: 'Nearest station ~9 mi south', address: '510 Meadow Street, Waterbury, CT 06702' },
    ],
  },
]

/* Geocoded coordinates per address. Markers are plotted by lat/lng.
   Approximate — for the reference map only. */
const COORDS = {
  '158 Main Street, Thomaston, CT 06787': [41.6742, -73.0735],
  '310 South Main Street, Thomaston, CT 06787': [41.6650, -73.0730],
  'Seth Thomas Park, Thomaston, CT 06787': [41.6720, -73.0760],
  '203 Main Street, Thomaston, CT 06787': [41.6730, -73.0740],
  '45 Old Waterbury Road, Thomaston, CT 06787': [41.65184, -73.07750],
  '401 Watertown Road, Thomaston, CT 06787': [41.65435, -73.09216],
  '64 Robbins Street, Waterbury, CT 06708': [41.5620, -73.0440],
  '56 Franklin Street, Waterbury, CT 06706': [41.5566, -73.0410],
  '800 Country Club Road, Waterbury, CT 06723': [41.5380, -73.0760],
  '99 East Main Street, Waterbury, CT 06702': [41.5570, -73.0380],
  'Route 8, Thomaston, CT 06787': [41.6600, -73.0760],
  '510 Meadow Street, Waterbury, CT 06702': [41.5520, -73.0400],
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
