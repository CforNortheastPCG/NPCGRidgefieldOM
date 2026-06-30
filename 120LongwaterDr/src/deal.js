/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. The cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo pages). The page bodies (financials,
   narrative) live in src/App.jsx. */
export const DEAL = {
  name: 'Longwater Corporate Center',                            // marketing name (cover, footer)
  address: '120 Longwater Drive',                                // street line
  cityState: 'Norwell, MA 02061',                               // city, state ZIP
  cityLong: 'Norwell, Massachusetts',                            // long form for the cover subtitle
  status: 'For Sale',                                            // listing status chip
  type: '±51,035 SF Multi-Tenant Office · 100% Leased',         // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',                               // full-bleed cover photo
  pdfName: '120-Longwater-Drive-Norwell-OM.pdf',                 // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
