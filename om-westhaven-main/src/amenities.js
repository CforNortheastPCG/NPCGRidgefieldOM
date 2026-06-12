/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page and the
   Area Amenities directory page. Hand-curated for the 300 Main Street
   (West Haven) offering. Distances are approximate from the property.

   Each directory item carries an optional `address`. Items with an address
   are plotted on the map (by baked lat/lng below), color-coded by category.
   Items without an address still appear in the printed directory.
*/

export const PROPERTY = {
  lat: 41.272764,
  lng: -72.947864,
  address: '300 Main Street, West Haven, CT 06516',
}

/* Connectivity facts shown on the map page (consistent with the OM body). */
export const CONNECTIVITY = [
  { label: 'Metro-North', value: 'West Haven Station (~0.9 mi)' },
  { label: 'I-95', value: '~5 minutes' },
  { label: 'Univ. of New Haven', value: '~1.5 miles' },
  { label: 'NYC Commute', value: '~1 hr 50 min by train' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining & Shoreline', label: 'Dining & Shoreline', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Universities & Anchors', label: 'Universities', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Healthcare', label: 'Healthcare', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Pharmacy & Daily Needs', label: 'Pharmacy & Daily Needs', color: '0x566573', swatch: '#566573' },
  { heading: 'Transit & Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

/* Full categorized directory. Each entry: { name, note, address? }. */
export const DIRECTORY = [
  {
    heading: 'Dining & Shoreline',
    items: [
      { name: "Zuppardi's Apizza", note: '179 Union Ave · Famous New Haven apizza · ~0.2 mi', address: "Zuppardi's Apizza, 179 Union Ave, West Haven, CT 06516" },
      { name: "Stowe's Seafood", note: '347 Beach St · Waterfront seafood', address: "Stowe's Seafood, 347 Beach St, West Haven, CT 06516" },
      { name: 'The Beach House', note: '489 Captain Thomas Blvd · Shoreline dining', address: 'The Beach House Restaurant, 489 Captain Thomas Blvd, West Haven, CT 06516' },
      { name: 'The Breakwall', note: '305 Captain Thomas Blvd · Shoreline dining & live music · ~1 mi', address: 'The Breakwall, 305 Captain Thomas Blvd, West Haven, CT 06516' },
      { name: 'Saray Turkish Restaurant', note: '770 Campbell Ave · Acclaimed Turkish kitchen · ~0.6 mi', address: 'Saray Turkish Restaurant, 770 Campbell Ave, West Haven, CT 06516' },
      { name: "Georgie's Diner", note: '427 Elm St · Classic diner · ~0.5 mi', address: "Georgie's Diner, 427 Elm St, West Haven, CT 06516" },
    ],
  },
  {
    heading: 'Universities & Anchors',
    items: [
      { name: 'University of New Haven', note: '300 Boston Post Rd · ~7,500 students · ~1.5 mi', address: 'University of New Haven, 300 Boston Post Rd, West Haven, CT 06516' },
      { name: 'Yale University', note: 'New Haven · ~3 mi NE', address: 'Yale University, New Haven, CT 06520' },
      { name: 'Southern Connecticut State', note: '501 Crescent St · ~11,500 students', address: 'Southern Connecticut State University, 501 Crescent St, New Haven, CT 06515' },
      { name: 'Gateway Community College', note: 'Downtown New Haven · ~12,000 students' },
      { name: 'Albertus Magnus College', note: 'Prospect Hill, New Haven' },
    ],
  },
  {
    heading: 'Healthcare',
    items: [
      { name: 'VA Connecticut Healthcare', note: '950 Campbell Ave · Major medical campus · ~1 mi', address: 'VA Connecticut Healthcare System, 950 Campbell Ave, West Haven, CT 06516' },
      { name: 'Yale New Haven Hospital', note: '20 York St · 1,541 beds · ~2 mi', address: 'Yale New Haven Hospital, 20 York St, New Haven, CT 06510' },
      { name: 'YNHH — Saint Raphael Campus', note: '1450 Chapel St · ~2.8 mi', address: 'Yale New Haven Health Saint Raphael Campus, 1450 Chapel St, New Haven, CT 06511' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Savin Rock', note: 'Captain Thomas Blvd · Shoreline promenade', address: 'Savin Rock, Captain Thomas Blvd, West Haven, CT 06516' },
      { name: 'Bradley Point Park', note: 'West Haven · Beach & Long Island Sound views', address: 'Bradley Point Park, West Haven, CT 06516' },
      { name: 'Old Grove Park', note: 'West Haven · Waterfront green', address: 'Old Grove Park, West Haven, CT 06516' },
      { name: 'Painter Park', note: 'West Haven · Fields & courts', address: 'Painter Park, West Haven, CT 06516' },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'Stop & Shop', note: '871 Boston Post Rd · ~1.7 mi', address: 'Stop & Shop, 871 Boston Post Rd, West Haven, CT 06516' },
      { name: 'ShopRite of West Haven', note: '510 Saw Mill Rd · ~1.9 mi', address: 'ShopRite, 510 Saw Mill Rd, West Haven, CT 06516' },
    ],
  },
  {
    heading: 'Pharmacy & Daily Needs',
    items: [
      { name: 'CVS Pharmacy', note: '256 Boston Post Rd · Allingtown', address: 'CVS, 256 Boston Post Rd, West Haven, CT 06516' },
      { name: 'Walgreens', note: '235 Boston Post Rd · Allingtown', address: 'Walgreens, 235 Boston Post Rd, West Haven, CT 06516' },
    ],
  },
  {
    heading: 'Transit & Connectivity',
    items: [
      { name: 'West Haven Station', note: '20 Railroad Ave · Metro-North New Haven Line → GCT · ~0.9 mi', address: 'West Haven Station, 20 Railroad Ave, West Haven, CT 06516' },
      { name: 'New Haven Union Station', note: '50 Union Ave · Amtrak · Metro-North · Shore Line East · ~2.3 mi', address: 'New Haven Union Station, 50 Union Ave, New Haven, CT 06519' },
      { name: 'I-95 / I-91', note: 'Interstate access within ~5 minutes' },
      { name: 'Downtown New Haven', note: '~2.5 mi · Yale, dining, culture' },
    ],
  },
]

/* Geocoded coordinates per address (Google Geocoding API). Markers are plotted
   by lat/lng — this Static Maps key renders coordinate markers reliably. */
const COORDS = {
  "Zuppardi's Apizza, 179 Union Ave, West Haven, CT 06516": [41.27355, -72.944567],
  "Stowe's Seafood, 347 Beach St, West Haven, CT 06516": [41.258885, -72.941938],
  'The Beach House Restaurant, 489 Captain Thomas Blvd, West Haven, CT 06516': [41.254414, -72.957972],
  'The Breakwall, 305 Captain Thomas Blvd, West Haven, CT 06516': [41.259692, -72.948863],
  'Saray Turkish Restaurant, 770 Campbell Ave, West Haven, CT 06516': [41.279716, -72.955622],
  "Georgie's Diner, 427 Elm St, West Haven, CT 06516": [41.273339, -72.957465],
  'University of New Haven, 300 Boston Post Rd, West Haven, CT 06516': [41.291297, -72.961787],
  'Yale University, New Haven, CT 06520': [41.316324, -72.922343],
  'Southern Connecticut State University, 501 Crescent St, New Haven, CT 06515': [41.3262, -72.948342],
  'VA Connecticut Healthcare System, 950 Campbell Ave, West Haven, CT 06516': [41.282377, -72.960775],
  'Yale New Haven Hospital, 20 York St, New Haven, CT 06510': [41.303793, -72.935676],
  'Yale New Haven Health Saint Raphael Campus, 1450 Chapel St, New Haven, CT 06511': [41.310655, -72.943324],
  'Savin Rock, Captain Thomas Blvd, West Haven, CT 06516': [41.256138, -72.954051],
  'Bradley Point Park, West Haven, CT 06516': [41.253591, -72.958237],
  'Old Grove Park, West Haven, CT 06516': [41.257247, -72.949253],
  'Painter Park, West Haven, CT 06516': [41.263103, -72.958606],
  'Stop & Shop, 871 Boston Post Rd, West Haven, CT 06516': [41.286372, -72.975734],
  'ShopRite, 510 Saw Mill Rd, West Haven, CT 06516': [41.268759, -72.975763],
  'CVS, 256 Boston Post Rd, West Haven, CT 06516': [41.294006, -72.959127],
  'Walgreens, 235 Boston Post Rd, West Haven, CT 06516': [41.2951, -72.958626],
  'West Haven Station, 20 Railroad Ave, West Haven, CT 06516': [41.271151, -72.963298],
  'New Haven Union Station, 50 Union Ave, New Haven, CT 06519': [41.297551, -72.926619],
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
