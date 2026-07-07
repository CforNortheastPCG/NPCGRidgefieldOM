/* ═══════════════════ AERIAL MARKERS ═══════════════════
   Curated, numbered, category-colored markers for the full-bleed aerial pages.
   Categories + colors match the Location & Amenities legend (amenities.js).

   These seed BOTH aerials. In `npm run dev` you can drag each marker onto the
   building it points to, delete (✕) the ones not visible in a given shot, then
   hit the page's "Copy markers" button to dump the kept set (with final x/y) —
   paste it back here or into that page's `markers` prop to bake it in.

   Markers with no x/y stack in a tray down the left edge until you drag them. */

const C = {
  dining: '#C0392B',   // Dining & Coffee
  grocery: '#1E8449',  // Grocery & Pharmacy
  banks: '#884EA0',    // Banks, Retail & Employers
  civic: '#2471A3',    // Schools & Civic
  transit: '#E67E22',  // Transit (bus stops)
}

export const AERIAL_MARKERS = [
  // Dining & Coffee
  { cat: 'Dining & Coffee', color: C.dining, n: 1, name: 'Thomaston Family Diner', note: 'Classic American diner · S Main corridor' },
  { cat: 'Dining & Coffee', color: C.dining, n: 2, name: 'Hometown Pizza III', note: 'Pizzeria / Italian · near the site' },
  { cat: 'Dining & Coffee', color: C.dining, n: 3, name: 'Clocktown Brewing Co.', note: 'Brewery + wood-fired pizza · Seth Thomas clock factory' },
  { cat: 'Dining & Coffee', color: C.dining, n: 4, name: 'Mona Lisa Ristorante', note: 'Italian / NY-style · downtown' },
  { cat: 'Dining & Coffee', color: C.dining, n: 5, name: "Dunkin'", note: 'Coffee · drive-thru · S Main corridor' },

  // Grocery & Pharmacy
  { cat: 'Grocery & Pharmacy', color: C.grocery, n: 1, name: 'Stop & Shop', note: 'Supermarket + pharmacy · just south of the site' },
  { cat: 'Grocery & Pharmacy', color: C.grocery, n: 2, name: 'Walgreens', note: 'Drugstore / pharmacy · S Main' },
  { cat: 'Grocery & Pharmacy', color: C.grocery, n: 3, name: 'Adams Hometown Market', note: 'Community grocery · downtown' },

  // Banks, Retail & Employers
  { cat: 'Banks, Retail & Employers', color: C.banks, n: 1, name: 'Thomaston Savings Bank (Main Office)', note: 'Local bank HQ · downtown' },
  { cat: 'Banks, Retail & Employers', color: C.banks, n: 2, name: 'Webster Bank', note: 'Regional bank branch · downtown' },
  { cat: 'Banks, Retail & Employers', color: C.banks, n: 3, name: 'NAPA Auto Parts', note: 'Auto parts · off the corridor' },
  { cat: 'Banks, Retail & Employers', color: C.banks, n: 4, name: 'Stewart EFI', note: 'Precision metal stamping · employer' },
  { cat: 'Banks, Retail & Employers', color: C.banks, n: 5, name: 'Ward Leonard (Fairbanks Morse Defense)', note: 'Defense manufacturing · employer' },

  // Schools & Civic
  { cat: 'Schools & Civic', color: C.civic, n: 1, name: 'Thomaston High School (gr. 7–12)', note: "Town's secondary school" },
  { cat: 'Schools & Civic', color: C.civic, n: 2, name: 'Black Rock School', note: 'Elementary school' },
  { cat: 'Schools & Civic', color: C.civic, n: 3, name: 'Thomaston Public Library', note: 'Town library · downtown' },
  { cat: 'Schools & Civic', color: C.civic, n: 4, name: 'Town Hall / Opera House', note: '1884 landmark · municipal offices' },

  // Transit — combined NB/SB bus stop on the S Main corridor (one pin; use the
  // right-click arrow to point at the curb where the stops sit).
  { cat: 'Transit', color: C.transit, n: 1, name: 'Bus Stop — South Main St', note: 'CTtransit · NB & SB stops' },
]
