/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. The cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), photos.js (photo
   pages). The page bodies (offering, narrative) live in src/App.jsx; the
   bespoke map / aerial / building / tenant pages are lifted from the original
   Canva deck as branded images in public/maps/. */
export const DEAL = {
  name: 'Copps Hill Commons',                                    // marketing name (cover, footer)
  address: '103, 105, 107 & 109 Danbury Road',                   // street line
  cityState: 'Ridgefield, CT 06877',                             // city, state ZIP
  cityLong: 'Ridgefield, Connecticut',                           // long form for the cover subtitle
  status: 'For Sale',                                            // listing status chip
  type: '±47,025 SF Mixed-Use · Retail · Office · Residential',  // asset descriptor (cover)
  coverImage: '/photos/cover.jpg',                               // full-bleed cover photo
  pdfName: 'Copps-Hill-Commons-Ridgefield-OM.pdf',               // output filename for the exporter
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
