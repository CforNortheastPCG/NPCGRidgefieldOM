/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. To spin up a new
   deal from this template, this is the first file to edit — the cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'Black Rock Commons',                // marketing name (cover, footer)
  address: '2836 Fairfield Avenue',          // street line
  cityState: 'Bridgeport, CT 06605',         // city, state ZIP
  cityLong: 'Black Rock · Bridgeport, Connecticut', // long form for the cover subtitle
  status: 'For Sale',                        // listing status chip
  type: '16-Unit Mixed-Use Multifamily',     // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',           // full-bleed cover photo
  pdfName: '2836-Fairfield-Avenue-OM.pdf',   // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
