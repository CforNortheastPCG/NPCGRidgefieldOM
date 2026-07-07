/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page. Hand-curated
   for the 2836 Fairfield Avenue (Black Rock Commons) offering, June 2026.
   Distances are approximate from the property.

   Coordinates are approximate (Black Rock, Bridgeport) — refine against a
   geocoder before relying on pin placement. Items with an address + coords
   plot on the Google Static Map (requires VITE_GOOGLE_MAPS_API_KEY). */

export const PROPERTY = {
  lat: 41.157532,
  lng: -73.226828,
  address: '2836 Fairfield Avenue, Bridgeport, CT 06605',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Metro-North', value: 'Fairfield Metro (~1.5 mi)' },
  { label: 'I-95', value: 'Exits 24 / 25 (~5 min)' },
  { label: 'Route 1', value: 'Fairfield Avenue' },
  { label: 'NYC Commute', value: '~80 min by train' },
]

export const MAP_CATEGORIES = [
  { heading: 'Dining — Fairfield Avenue', label: 'Dining', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Arts & Nightlife', label: 'Arts & Nightlife', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Waterfront & Recreation', label: 'Waterfront & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Pharmacy & Daily Needs', label: 'Pharmacy & Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

export const DIRECTORY = [
  {
    heading: 'Dining — Fairfield Avenue',
    items: [
      { name: 'Taco Loco', note: '3170 Fairfield Ave · Black Rock institution', address: '3170 Fairfield Ave, Bridgeport, CT 06605' },
      { name: 'The Sitting Room', note: '2965 Fairfield Ave · Cafe & wine bar', address: '2965 Fairfield Ave, Bridgeport, CT 06605' },
      { name: 'Harborview Market', note: '942 Brewster St · Cafe & market', address: '942 Brewster St, Bridgeport, CT 06605' },
      { name: "Vazzy's Restaurant", note: '513 Brewster St · Italian', address: '513 Brewster St, Bridgeport, CT 06605' },
      { name: 'Brewport Brewing', note: 'Downtown · Brewpub & pizza' },
    ],
  },
  {
    heading: 'Arts & Nightlife',
    items: [
      { name: 'Park City Music Hall', note: '2926 Fairfield Ave · Live music', address: '2926 Fairfield Ave, Bridgeport, CT 06605' },
      { name: 'Bijou Theatre', note: 'Downtown Bridgeport · Cinema & events' },
      { name: 'Total Mortgage Arena', note: 'Downtown · Concerts & sports' },
      { name: 'Hartford HealthCare Amphitheater', note: 'Seaside · Outdoor concerts' },
    ],
  },
  {
    heading: 'Waterfront & Recreation',
    items: [
      { name: "St. Mary's-By-The-Sea", note: 'Grovers Ave · Waterfront promenade', address: 'Grovers Ave, Bridgeport, CT 06605' },
      { name: "Captain's Cove Seaport", note: '1 Bostwick Ave · Marina & boardwalk', address: '1 Bostwick Ave, Bridgeport, CT 06605' },
      { name: 'Ash Creek Open Space', note: 'Fairfield line · Tidal estuary & trails', address: 'Ellsworth St, Bridgeport, CT 06605' },
      { name: 'Seaside Park', note: 'Olmsted-designed waterfront park · ~2 mi' },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'Harborview Market', note: '942 Brewster St · Neighborhood market', address: '942 Brewster St, Bridgeport, CT 06605' },
      { name: 'Stop & Shop', note: 'Black Rock Tpke, Fairfield · ~3 mi' },
      { name: 'Whole Foods Market', note: 'Black Rock Tpke, Fairfield · ~4 mi' },
      { name: "Trader Joe's", note: 'Post Rd, Fairfield · ~4 mi' },
    ],
  },
  {
    heading: 'Pharmacy & Daily Needs',
    items: [
      { name: 'CVS Pharmacy', note: 'Fairfield Ave · Daily needs', address: '2871 Fairfield Ave, Bridgeport, CT 06605' },
      { name: 'Walgreens', note: 'Fairfield Ave corridor' },
      { name: 'People’s United / M&T Bank', note: 'Fairfield Ave branches' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'Fairfield Metro Station', note: 'Metro-North New Haven Line → GCT · ~1.5 mi', address: '90 Black Rock Tpke, Fairfield, CT 06825' },
      { name: 'Bridgeport Station', note: 'Metro-North + Amtrak · ~2.5 mi', address: '710 Water St, Bridgeport, CT 06604' },
      { name: 'I-95 Exits 24 / 25', note: 'Highway access · ~5 min' },
      { name: 'Route 1 (Fairfield Ave)', note: 'Direct frontage' },
    ],
  },
]

/* Approximate geocoded coordinates per address (Black Rock, Bridgeport).
   Markers are plotted by lat/lng on the Static Maps API. Refine before use. */
const COORDS = {
  '3170 Fairfield Ave, Bridgeport, CT 06605': [41.16680, -73.23260],
  '2965 Fairfield Ave, Bridgeport, CT 06605': [41.16410, -73.22910],
  '942 Brewster St, Bridgeport, CT 06605': [41.15870, -73.22420],
  '513 Brewster St, Bridgeport, CT 06605': [41.16030, -73.22120],
  '2926 Fairfield Ave, Bridgeport, CT 06605': [41.16380, -73.22850],
  'Grovers Ave, Bridgeport, CT 06605': [41.15620, -73.22330],
  '1 Bostwick Ave, Bridgeport, CT 06605': [41.16390, -73.21560],
  'Ellsworth St, Bridgeport, CT 06605': [41.16240, -73.24010],
  '2871 Fairfield Ave, Bridgeport, CT 06605': [41.16330, -73.22720],
  '90 Black Rock Tpke, Fairfield, CT 06825': [41.14130, -73.26550],
  '710 Water St, Bridgeport, CT 06604': [41.17860, -73.18700],
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
