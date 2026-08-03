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
  name: 'Maple Court Apartments',            // SAMPLE — replace: marketing name (cover, footer)
  address: '12 Example Street',              // SAMPLE — replace: street line
  cityState: 'Anytown, CT 06000',            // SAMPLE — replace: city, state ZIP
  cityLong: 'Anytown, Connecticut',          // SAMPLE — replace: long form for the cover subtitle
  status: 'Broker Opinion of Value',         // document chip (cover + footer) — leave as-is for a BOV
  type: '12-Unit Apartment Building',        // SAMPLE — replace: asset descriptor (cover)
  preparedFor: 'Mr. & Mrs. Sample Owner',    // SAMPLE — replace: who this BOV is addressed to
  preparedDate: 'August 2026',               // SAMPLE — replace: presentation month/year
  coverImage: '/photos/cover.jpg',           // full-bleed cover photo
  pdfName: 'Maple-Court-BOV.pdf',            // output filename for the exporters (keep single-quoted, one line)
}

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

// Diagonal DRAFT watermark on every page. Ships TRUE in the template —
// flip to false only when the numbers are final and ready to present.
export const DRAFT = true
