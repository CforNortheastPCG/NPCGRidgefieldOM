/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. The cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'South End Plaza',                                  // marketing name (cover, footer)
  address: '310 South Main Street',                         // street line
  cityState: 'Thomaston, CT 06787',                         // city, state ZIP
  cityLong: 'Thomaston, Connecticut',                       // long form for the cover subtitle
  status: 'For Sale',                                       // listing status chip
  type: '19-Unit Mixed-Use Retail & Apartment · Value-Add', // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',                          // full-bleed cover photo (OM Photos #18)
  pdfName: 'South-End-Plaza-Thomaston-OM.pdf',              // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
