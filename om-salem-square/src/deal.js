/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. The cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'Salem Square',                                              // marketing name (cover, footer)
  address: '628 New Haven Road',                                     // street line
  cityState: 'Naugatuck, CT 06770',                                  // city, state ZIP
  cityLong: 'Naugatuck, Connecticut',                                // long form for the cover subtitle
  status: 'For Sale',                                                // listing status chip
  type: 'Entitled 51-Unit Development Site · In-Place Retail Income', // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',                                   // full-bleed cover photo  TODO: drop OM Photos #44
  pdfName: 'Salem-Square-Naugatuck-OM.pdf',                          // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
