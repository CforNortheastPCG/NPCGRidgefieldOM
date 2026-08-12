/* ═══════════════════ EDIT-ME · DEAL CONFIG ═══════════════════
   Single source of truth for this book's property identity. The cover,
   page headers/footers, and output filename all read from here.

   This deck is a CLIENT LISTING UPDATE (not a BOV/OM) — all report
   content lives in src/data/update.js. */
export const DEAL = {
  name: '387 Danbury Road',
  address: '387 Danbury Road',
  cityState: 'Wilton, CT 06897',
  cityLong: 'Wilton, Connecticut',
  status: 'Listing Update',                   // document chip (cover + footer)
  type: '13,706 SF Multi-Building Commercial Property',
  preparedFor: 'Andy Morin',
  preparedDate: 'August 2026',
  coverImage: '/photos/cover.jpg',
  pdfName: '387-Danbury-Listing-Update.pdf',
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

// Diagonal DRAFT watermark on every page. Flip to false for the final render.
export const DRAFT = false
