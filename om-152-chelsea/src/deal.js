/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. The cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: '152–154 Chelsea Street',                          // marketing name (cover, footer)
  address: '152–154 Chelsea Street',                       // street line
  cityState: 'East Boston, MA 02128',                      // city, state ZIP
  cityLong: 'East Boston, Massachusetts',                  // long form for the cover subtitle
  status: 'For Sale',                                      // listing status chip
  type: '6-Unit Mixed-Use · Plus Parking Lot',             // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',                         // full-bleed cover photo
  pdfName: '152-154-Chelsea-East-Boston-OM.pdf',           // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
