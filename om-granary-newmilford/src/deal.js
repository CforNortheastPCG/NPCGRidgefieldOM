/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. To spin up a new
   deal from this template, this is the first file to edit — the cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'The Granary',                       // marketing name (cover, footer)
  address: '29 West Street',                 // street line
  cityState: 'New Milford, CT 06776',        // city, state ZIP
  cityLong: 'On the Green · New Milford, Connecticut', // long form for the cover subtitle
  status: 'For Sale',                        // listing status chip
  type: '14-Unit Adaptive-Reuse Apartment Building', // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',           // full-bleed cover photo
  pdfName: '29-West-Street-OM.pdf',          // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

// Toggle the diagonal DRAFT watermark on every page. Set to true to mark the
// deck as a draft before final, distribution-ready export.
export const DRAFT = false
