/* ═══════════════════ EDIT-ME · DEAL CONFIG ═══════════════════
   Single source of truth for this BOV's property identity. To spin up a new
   BOV from this template, this is the FIRST file to edit — the cover, page
   headers/footers, and output filename all read from here.

   Companion data files (edit in this order for a new BOV):
     deal.js → advisors.js → project.js → properties.js → rentRoll.js →
     financials.js → assessor.js → taxes.js → valuation.js →
     salesComps.js → rentComps.js → trackRecord.js → market.js → photos.js
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

/* ── DECK FORMAT ────────────────────────────────────────────────────────
   'short' → the 9-page analytical BOV. Cover, Executive Summary, Valuation
     & Pricing, Property Record Card, Rent Roll & Unit Mix, Operating
     Statement, Real Estate Taxes, Photography, Conclusion & Contact. This
     is the default and the right answer for most owner conversations: it is
     the document, with nothing to skim past.

   'full' → the same nine analytical pages plus the pitch deck around them
     (TOC, advisors, Why NPCG, track record, comps, the marketing-process
     section, market, team). Use it when the BOV doubles as the listing
     pitch, or when the owner is deciding between brokers.

   The page list lives in src/App.jsx; both formats are built from the same
   pageDefs array, so page numbers and the TOC follow automatically. */
export const FORMAT = 'short'                // 'short' | 'full'

/* Cover stat row — 4–5 headline facts, shown under the address on the cover.
   Keep values short; they render large. */
export const COVER_STATS = [ // SAMPLE — replace
  { v: '12',    l: 'Units' },
  { v: '9,400', l: 'Rentable SF' },
  { v: '0.52',  l: 'Acres' },
  { v: '1968',  l: 'Year Built' },
  { v: '100%',  l: 'Occupied' },
]

// Convenience derived exports (kept stable so page components can import them
// directly). FULL_ADDR is the "street, city ST ZIP" line used in headers.
export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

/* Diagonal DRAFT watermark. Ships TRUE in the template — flip to false only
   when the numbers are final and ready to present.

   It DOES carry into both exports (verified on the raster and vector PDFs),
   so a draft you hand out is visibly a draft. Don't rely on that as your
   only check — flipping this flag is the last step of the checklist, not a
   substitute for reading the numbers. */
export const DRAFT = true
