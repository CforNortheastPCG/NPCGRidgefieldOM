/* ═══════════════════ EDIT-ME · DEAL CONFIG ═══════════════════
   Single source of truth for this BOV's property identity. To spin up a new
   BOV from this template, this is the FIRST file to edit — the cover, page
   headers/footers, and output filename all read from here.

   Companion data files (edit in this order for a new BOV):
     deal.js → advisors.js → project.js → properties.js → rentRoll.js →
     financials.js → valuation.js → salesComps.js → rentComps.js →
     trackRecord.js → market.js → photos.js
   process.js and firm.js are firm-standard copy — usually left alone. */
export const DEAL = {
  name: 'Main Street Apartments',
  address: '300 Main Street & 491 Washington Avenue',
  cityState: 'West Haven, CT 06516',
  cityLong: 'West Haven, Connecticut',
  status: 'Broker Opinion of Value',
  type: '10-Unit Apartment Building',
  preparedFor: 'Bishop Enterprises',
  preparedDate: 'August 2026',
  coverImage: '/photos/cover.jpg',
  pdfName: '300-Main-Street-West-Haven-BOV.pdf',
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

// Diagonal DRAFT watermark on every page. Ships TRUE in the template —
// flip to false only when the numbers are final and ready to present.
// NOTE: turned off at the user's request 08.03.2026. The sales and rent
// comparable pages are still carrying placeholder rows — see salesComps.js
// and rentComps.js — so this deck is not yet client-ready.
export const DRAFT = false
