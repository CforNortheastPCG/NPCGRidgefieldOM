/* ═══════════════════ DEAL CONFIG ═══════════════════
   Single source of truth for this OM's property identity. To spin up a new
   deal from this template, THIS is the first file to edit — the cover, page
   headers/footers, and document title all read from here.

   Companion data files (also per-deal): firm.js (deal team), amenities.js
   (location & POIs), photos.js (photo + floor-plan pages). The page bodies
   (financials, narrative) live in src/App.jsx — search for `TODO` to find the
   spots that need real numbers. */
export const DEAL = {
  name: 'Property Name',                     // marketing name (cover, footer)   TODO
  address: '000 Street Name',                // street line                      TODO
  cityState: 'City, ST 00000',               // city, state ZIP                  TODO
  cityLong: 'City, State',                   // long form for the cover subtitle TODO
  status: 'For Sale',                        // listing status chip
  type: '00-Unit Multifamily Property',      // asset descriptor (cover)         TODO
  coverImage: '/photos/cover.jpg',           // full-bleed cover photo           TODO
  pdfName: 'offering-memorandum.pdf',        // output filename for the exporter TODO
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`
