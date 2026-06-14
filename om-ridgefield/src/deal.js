/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. To spin up a new
   deal from this template, this is the first file to edit — the cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo + floor-plan pages). The page bodies
   (financials, narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'Main Street Apartments',           // marketing name (cover, footer)
  address: '613-615 Main Street',            // street line
  cityState: 'Ridgefield, CT 06877',         // city, state ZIP
  cityLong: 'Ridgefield, Connecticut',       // long form for the cover subtitle
  status: 'For Sale',                        // listing status chip
  type: '9-Unit Multifamily Property',       // asset descriptor (cover)
  coverImage: '/photos/Exterior Edit 2.png', // full-bleed cover photo
  pdfName: '613-Main-Street-OM.pdf',         // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
