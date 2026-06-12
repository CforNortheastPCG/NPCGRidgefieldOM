/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page and the
   Area Amenities directory page. Hand-curated for the 6 Elm Street
   offering (June 2026). Distances are approximate from the property.
*/

export const PROPERTY = {
  lat: 41.1143093,
  lng: -73.4167832,
  address: '6 Elm Street, Norwalk, CT 06854',
}

/* Connectivity facts shown on the map page. */
export const CONNECTIVITY = [
  { label: 'Metro-North', value: 'South Norwalk (5 min)' },
  { label: 'I-95', value: '5 minutes' },
  { label: 'Merritt Pkwy', value: '10 minutes' },
  { label: 'NYC Commute', value: '~60 min by train' },
]

/* Map category styling. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Restaurants', label: 'Dining', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Arts & Culture', label: 'Arts & Culture', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Shopping & Retail', label: 'Shopping', color: '0x117A65', swatch: '#117A65' },
  { heading: 'Pharmacy & Daily Needs', label: 'Pharmacy & Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Banking', label: 'Banking', color: '0x566573', swatch: '#566573' },
  { heading: 'NYC Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

export const DIRECTORY = [
  {
    heading: 'Dining & Restaurants',
    items: [
      { name: 'Barcelona Wine Bar', note: '63 N Main St · Tapas & wine', address: '63 N Main St, Norwalk, CT 06854' },
      { name: 'Match', note: '98 Washington St · New American', address: '98 Washington St, Norwalk, CT 06854' },
      { name: 'Tablao Wine Bar', note: '72 N Main St · Spanish tapas', address: '72 N Main St, Norwalk, CT 06854' },
      { name: 'Mecha Noodle Bar', note: '3 N Main St · Ramen & Asian', address: '3 N Main St, Norwalk, CT 06854' },
      { name: "Donovan's SoNo", note: '138 Washington St · Irish pub', address: '138 Washington St, Norwalk, CT 06854' },
      { name: 'Spread Bagelry', note: '66 Washington St · Breakfast', address: '66 Washington St, Norwalk, CT 06854' },
      { name: "O'Neill's Irish Pub", note: '93 N Main St · Pub fare', address: '93 N Main St, Norwalk, CT 06854' },
      { name: 'Kazu Japanese', note: '64 N Main St · Sushi & Japanese', address: '64 N Main St, Norwalk, CT 06854' },
    ],
  },
  {
    heading: 'Arts & Culture',
    items: [
      { name: 'The SoNo Collection', note: '100 N Water St · Upscale mall & events', address: '100 N Water St, Norwalk, CT 06854' },
      { name: 'Maritime Aquarium', note: '10 N Water St · Aquarium & IMAX', address: '10 N Water St, Norwalk, CT 06854' },
      { name: 'Lockwood-Mathews Mansion', note: '295 West Ave · Historic museum', address: '295 West Ave, Norwalk, CT 06850' },
      { name: 'Wall Street Theater', note: '71 Wall St · Live performances', address: '71 Wall St, Norwalk, CT 06850' },
      { name: 'Stepping Stones Museum', note: '303 West Ave · Children\'s museum', address: '303 West Ave, Norwalk, CT 06850' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Calf Pasture Beach', note: 'Calf Pasture Beach Rd · Beach & park', address: '1 Calf Pasture Beach Rd, Norwalk, CT 06855' },
      { name: 'Veteran\'s Memorial Park', note: 'Seaview Ave · Waterfront park' },
      { name: 'Cranbury Park', note: 'Grumman Ave · 85 acres, trails', address: '300 Grumman Ave, Norwalk, CT 06851' },
      { name: 'Oyster Shell Park', note: 'Meadow St · SoNo waterfront' },
    ],
  },
  {
    heading: 'NYC Connectivity',
    items: [
      { name: 'South Norwalk Station', note: 'Monroe St · Metro-North → GCT ~60 min', address: '1 Monroe St, Norwalk, CT 06854' },
      { name: 'East Norwalk Station', note: 'East Ave · Metro-North', address: '1 East Ave, Norwalk, CT 06855' },
      { name: 'I-95 / Merritt Parkway', note: 'Direct highway access' },
      { name: 'Drive to Midtown', note: '~1 hr off-peak via I-95' },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'Stew Leonard\'s', note: '100 Westport Ave · Specialty grocer', address: '100 Westport Ave, Norwalk, CT 06851' },
      { name: 'Trader Joe\'s', note: '436 Westport Ave', address: '436 Westport Ave, Norwalk, CT 06851' },
      { name: 'Stop & Shop', note: '290 Westport Ave', address: '290 Westport Ave, Norwalk, CT 06851' },
      { name: 'Whole Foods Market', note: '861 Post Rd E, Westport · ~5 mi' },
    ],
  },
  {
    heading: 'Shopping & Retail',
    items: [
      { name: 'The SoNo Collection', note: '100 N Water St · Nordstrom, Bloomingdale\'s', address: '100 N Water St, Norwalk, CT 06854' },
      { name: 'Walmart Supercenter', note: '650 Main Ave', address: '650 Main Ave, Norwalk, CT 06851' },
    ],
  },
  {
    heading: 'Pharmacy & Daily Needs',
    items: [
      { name: 'CVS', note: '62 Wall St', address: '62 Wall St, Norwalk, CT 06850' },
      { name: 'Walgreens', note: '1 Belden Ave', address: '1 Belden Ave, Norwalk, CT 06850' },
      { name: 'Rite Aid', note: '520 Westport Ave', address: '520 Westport Ave, Norwalk, CT 06851' },
    ],
  },
  {
    heading: 'Banking',
    items: [
      { name: 'Chase Bank', note: '400 Main Ave', address: '400 Main Ave, Norwalk, CT 06851' },
      { name: 'Wells Fargo', note: '37 Wall St', address: '37 Wall St, Norwalk, CT 06850' },
      { name: 'Bank of America', note: '270 Westport Ave', address: '270 Westport Ave, Norwalk, CT 06851' },
      { name: 'Webster Bank', note: '19 Wall St', address: '19 Wall St, Norwalk, CT 06850' },
    ],
  },
]

/* Geocoded coordinates per address (Google Geocoding API, June 2026). */
const COORDS = {
  '63 N Main St, Norwalk, CT 06854': [41.1008012, -73.4191989],
  '98 Washington St, Norwalk, CT 06854': [41.0987821, -73.4177341],
  '72 N Main St, Norwalk, CT 06854': [41.1011809, -73.420163],
  '3 N Main St, Norwalk, CT 06854': [41.0990733, -73.4188233],
  '138 Washington St, Norwalk, CT 06854': [41.0987619, -73.4163925],
  '66 Washington St, Norwalk, CT 06854': [41.0988628, -73.4186189],
  '93 N Main St, Norwalk, CT 06854': [41.1018516, -73.4196325],
  '64 N Main St, Norwalk, CT 06854': [41.1008441, -73.4197552],
  '100 N Water St, Norwalk, CT 06854': [41.1044388, -73.4186503],
  '10 N Water St, Norwalk, CT 06854': [41.1006864, -73.4163728],
  '295 West Ave, Norwalk, CT 06850': [41.1090605, -73.4158111],
  '71 Wall St, Norwalk, CT 06850': [41.1168795, -73.413883],
  '303 West Ave, Norwalk, CT 06850': [41.1099837, -73.4155809],
  '1 Calf Pasture Beach Rd, Norwalk, CT 06855': [41.0950421, -73.3975767],
  '300 Grumman Ave, Norwalk, CT 06851': [41.1643705, -73.4047608],
  '1 Monroe St, Norwalk, CT 06854': [41.0967342, -73.4201159],
  '1 East Ave, Norwalk, CT 06855': [41.1215024, -73.4063981],
  '100 Westport Ave, Norwalk, CT 06851': [41.1224327, -73.4016298],
  '436 Westport Ave, Norwalk, CT 06851': [41.1260593, -73.3884836],
  '290 Westport Ave, Norwalk, CT 06851': [41.1245196, -73.395721],
  '650 Main Ave, Norwalk, CT 06851': [41.1591076, -73.4175232],
  '62 Wall St, Norwalk, CT 06850': [41.1179636, -73.4137831],
  '1 Belden Ave, Norwalk, CT 06850': [41.1167514, -73.4156252],
  '520 Westport Ave, Norwalk, CT 06851': [41.1275119, -73.3847592],
  '400 Main Ave, Norwalk, CT 06851': [41.1442373, -73.4251565],
  '37 Wall St, Norwalk, CT 06850': [41.1179064, -73.4126963],
  '270 Westport Ave, Norwalk, CT 06851': [41.1247199, -73.3962531],
  '19 Wall St, Norwalk, CT 06850': [41.1183299, -73.4116938],
}

/* Flattened list of every mapped POI. */
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
