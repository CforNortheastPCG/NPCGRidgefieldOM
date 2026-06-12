/* ═══════════════════ AREA AMENITIES DATA ═══════════════════
   Single source of truth for the Location & Amenities map page and the
   Area Amenities directory page. Hand-curated for the 613-615 Main Street
   offering (June 2026). Distances are approximate from the property.

   Each directory item carries an optional `address`. Items with an address
   are plotted on the map (geocoded server-side by the Static Maps API),
   color-coded by category. Far-out items (Danbury / Bethel / Katonah) are
   intentionally left without an address so the map stays zoomed on
   Ridgefield, while still appearing in the printed directory.
*/

export const PROPERTY = {
  lat: 41.28893,
  lng: -73.500496,
  address: '613 Main Street, Ridgefield, CT 06877',
}

/* Connectivity facts shown on the map page (consistent with the OM body). */
export const CONNECTIVITY = [
  { label: 'Metro-North', value: 'Branchville (5 min)' },
  { label: 'Route 7', value: '5 minutes' },
  { label: 'I-84', value: '10 minutes' },
  { label: 'NYC Commute', value: '~75 min by train' },
]

/* Map category styling, keyed by directory heading. `color` is the Static
   Maps marker color (0xRRGGBB); `swatch` is the CSS hex for the legend. */
export const MAP_CATEGORIES = [
  { heading: 'Dining — Walkable Main Street', label: 'Dining', color: '0xC0392B', swatch: '#C0392B' },
  { heading: 'Arts & Culture', label: 'Arts & Culture', color: '0x884EA0', swatch: '#884EA0' },
  { heading: 'Parks & Recreation', label: 'Parks & Recreation', color: '0x1E8449', swatch: '#1E8449' },
  { heading: 'Grocery & Markets', label: 'Grocery & Markets', color: '0x2471A3', swatch: '#2471A3' },
  { heading: 'Regional Shopping', label: 'Shopping', color: '0x117A65', swatch: '#117A65' },
  { heading: 'Pharmacy & Daily Needs', label: 'Pharmacy & Daily Needs', color: '0xB55D37', swatch: '#B55D37' },
  { heading: 'Banking', label: 'Banking', color: '0x566573', swatch: '#566573' },
  { heading: 'NYC Connectivity', label: 'Transit', color: '0x2C3E50', swatch: '#2C3E50' },
]

/* Full categorized directory. Each entry: { name, note, address? }. `note` is a
   short descriptor for the directory layout; `address` (when present) plots the
   item on the map. */
export const DIRECTORY = [
  {
    heading: 'Dining — Walkable Main Street',
    items: [
      { name: 'Tequila Escape', note: '439 Main St · Mexican/American · 4.5★', address: '439 Main St, Ridgefield, CT 06877' },
      { name: 'Brasserie Saint Germain', note: '470 Main St · French brasserie', address: '470 Main St, Ridgefield, CT 06877' },
      { name: 'Tablao Wine Bar', note: '426 Main St · Spanish tapas', address: '426 Main St, Ridgefield, CT 06877' },
      { name: "Bailey's Backyard", note: '23 Bailey Ave · Farm-to-table', address: '23 Bailey Ave, Ridgefield, CT 06877' },
      { name: 'R House', note: '20 West Ln · Upscale steakhouse', address: '20 West Ln, Ridgefield, CT 06877' },
      { name: 'The Lantern', note: '378 Main St · Casual American', address: '378 Main St, Ridgefield, CT 06877' },
      { name: 'Tazza Cafe', note: '408 Main St · Coffee & lunch', address: '408 Main St, Ridgefield, CT 06877' },
      { name: 'Queen B Coffee Co.', note: '417 Main St · Roaster + cafe', address: '417 Main St, Ridgefield, CT 06877' },
      { name: 'Corner Cafe', note: '622 Main St · Breakfast/lunch', address: '622 Main St, Ridgefield, CT 06877' },
    ],
  },
  {
    heading: 'Arts & Culture',
    items: [
      { name: 'The Prospector Theater', note: '25 Prospect St · Cinema · 4.9★', address: '25 Prospect St, Ridgefield, CT 06877' },
      { name: 'The Ridgefield Playhouse', note: '80 E Ridge Rd · 500-seat venue', address: '80 East Ridge Rd, Ridgefield, CT 06877' },
      { name: 'A.C.T. of Connecticut', note: '36 Old Quarry Rd · Regional theater', address: '36 Old Quarry Rd, Ridgefield, CT 06877' },
      { name: 'Ridgefield Theater Barn', note: '37 Halpin Ln · Community theater', address: '37 Halpin Ln, Ridgefield, CT 06877' },
      { name: 'Aldrich Contemporary Art Museum', note: '258 Main St · Contemporary art', address: '258 Main St, Ridgefield, CT 06877' },
    ],
  },
  {
    heading: 'Parks & Recreation',
    items: [
      { name: 'Ballard Park', note: '485 Main St · Green + CHIRP concerts', address: '485 Main St, Ridgefield, CT 06877' },
      { name: 'Ridgefield Recreation Center', note: '195 Danbury Rd · Pool, fitness, courts', address: '195 Danbury Rd, Ridgefield, CT 06877' },
      { name: 'Martin Park Beach', note: '19 Great Pond Rd · Lake beach, kayaking', address: '19 Great Pond Rd, Ridgefield, CT 06877' },
      { name: 'Seth Low Pierrepont State Park', note: '139 Knollwood Dr · Hiking, MTB', address: '139 Knollwood Dr, Ridgefield, CT 06877' },
      { name: 'Hemlock Hills / Pine Mtn', note: 'North Ridgefield · Trail network' },
      { name: 'Sturges Park', note: '217 Rippowam Rd · Open space, camping', address: '217 Rippowam Rd, Ridgefield, CT 06877' },
    ],
  },
  {
    heading: 'NYC Connectivity',
    items: [
      { name: 'Branchville Station', note: '787 Branchville Rd · Metro-North → GCT', address: '787 Branchville Rd, Ridgefield, CT 06877' },
      { name: 'Katonah Station', note: '~20 min W · Harlem Line, ~1 hr express' },
      { name: 'Route 7 / I-84 / I-684', note: 'All within ~15 min' },
      { name: 'Drive to Midtown', note: '~1 hr 15 min off-peak' },
    ],
  },
  {
    heading: 'Grocery & Markets',
    items: [
      { name: 'Stop & Shop', note: 'Copps Hill Plaza, 125 Danbury Rd · ~1 mi', address: '125 Danbury Rd, Ridgefield, CT 06877' },
      { name: 'Ridgefield Organics & Specialty', note: '109 Danbury Rd · ~1 mi', address: '109 Danbury Rd, Ridgefield, CT 06877' },
      { name: 'Whole Foods Market', note: 'Sugar Hollow Rd, Danbury · ~8 mi' },
      { name: "Trader Joe's", note: '113 Mill Plain Rd, Danbury · ~9 mi' },
      { name: "Caraluzzi's Market", note: '102 Mill Plain Rd, Danbury · ~9 mi' },
      { name: 'Big Y', note: '83 Stony Hill Rd, Bethel · ~10 mi' },
    ],
  },
  {
    heading: 'Regional Shopping',
    items: [
      { name: 'Copps Hill Plaza', note: '125 Danbury Rd · Marshalls, HomeGoods · ~1 mi', address: '113 Danbury Rd, Ridgefield, CT 06877' },
      { name: 'Danbury Fair Mall', note: '7 Backus Ave, Danbury · ~200 stores · ~8 mi' },
    ],
  },
  {
    heading: 'Pharmacy & Daily Needs',
    items: [
      { name: 'CVS', note: '467 Main St · Village center', address: '467 Main St, Ridgefield, CT 06877' },
      { name: 'Walgreens', note: '46A Danbury Rd · Pharmacy', address: '46A Danbury Rd, Ridgefield, CT 06877' },
      { name: 'Ridgefield Hardware (Ace)', note: '385 Main St', address: '385 Main St, Ridgefield, CT 06877' },
    ],
  },
  {
    heading: 'Banking',
    items: [
      { name: 'Fairfield County Bank', note: '374 Main St · Local, HQ in Ridgefield', address: '374 Main St, Ridgefield, CT 06877' },
      { name: 'Wells Fargo', note: '368 Main St · In village', address: '368 Main St, Ridgefield, CT 06877' },
      { name: 'M&T Bank', note: '2 Prospect St · Village center', address: '2 Prospect St, Ridgefield, CT 06877' },
      { name: 'Citibank', note: '621 Main St · North end of Main', address: '621 Main St, Ridgefield, CT 06877' },
      { name: 'Chase Bank', note: '108 Danbury Rd · Branch + ATM · ~1 mi', address: '108 Danbury Rd, Ridgefield, CT 06877' },
    ],
  },
]

/* Geocoded coordinates per address (Google Geocoding API, June 2026). Markers
   are plotted by lat/lng — this Static Maps key renders coordinate markers
   reliably, whereas address-geocoded markers trip g.co/staticmaperror. */
const COORDS = {
  '439 Main St, Ridgefield, CT 06877': [41.282337, -73.499391],
  '470 Main St, Ridgefield, CT 06877': [41.283017, -73.49818],
  '426 Main St, Ridgefield, CT 06877': [41.282218, -73.498131],
  '23 Bailey Ave, Ridgefield, CT 06877': [41.281864, -73.497361],
  '20 West Ln, Ridgefield, CT 06877': [41.272238, -73.498834],
  '378 Main St, Ridgefield, CT 06877': [41.280843, -73.498058],
  '408 Main St, Ridgefield, CT 06877': [41.281853, -73.498198],
  '417 Main St, Ridgefield, CT 06877': [41.282098, -73.498785],
  '622 Main St, Ridgefield, CT 06877': [41.289465, -73.499797],
  '25 Prospect St, Ridgefield, CT 06877': [41.283773, -73.497376],
  '80 East Ridge Rd, Ridgefield, CT 06877': [41.282734, -73.493184],
  '36 Old Quarry Rd, Ridgefield, CT 06877': [41.286247, -73.490888],
  '37 Halpin Ln, Ridgefield, CT 06877': [41.282466, -73.487226],
  '258 Main St, Ridgefield, CT 06877': [41.277056, -73.496816],
  '485 Main St, Ridgefield, CT 06877': [41.283752, -73.498644],
  '195 Danbury Rd, Ridgefield, CT 06877': [41.300616, -73.495301],
  '19 Great Pond Rd, Ridgefield, CT 06877': [41.31492, -73.470233],
  '139 Knollwood Dr, Ridgefield, CT 06877': [41.331083, -73.501318],
  '217 Rippowam Rd, Ridgefield, CT 06877': [41.313322, -73.547818],
  '787 Branchville Rd, Ridgefield, CT 06877': [41.26795, -73.442285],
  '125 Danbury Rd, Ridgefield, CT 06877': [41.295007, -73.49354],
  '109 Danbury Rd, Ridgefield, CT 06877': [41.293289, -73.494265],
  '113 Danbury Rd, Ridgefield, CT 06877': [41.292793, -73.494252],
  '467 Main St, Ridgefield, CT 06877': [41.282853, -73.499867],
  '46A Danbury Rd, Ridgefield, CT 06877': [41.290127, -73.496369],
  '385 Main St, Ridgefield, CT 06877': [41.281003, -73.499034],
  '374 Main St, Ridgefield, CT 06877': [41.2807, -73.498037],
  '368 Main St, Ridgefield, CT 06877': [41.280536, -73.498003],
  '2 Prospect St, Ridgefield, CT 06877': [41.283294, -73.497543],
  '621 Main St, Ridgefield, CT 06877': [41.289201, -73.50033],
  '108 Danbury Rd, Ridgefield, CT 06877': [41.294085, -73.492561],
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
