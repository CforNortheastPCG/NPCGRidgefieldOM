import type { ConclusionContent } from './types.ts'

/* AUTHORED PROSE for Conclusion & Recommendation — the stated opinion and
   the last thing an owner reads. */
export const CONCLUSION_CONTENT: ConclusionContent = {
  generated: false, // SAMPLE COPY — flip to true once authored for this deal
  opinionParagraphs: [ // SAMPLE — replace
    'Based on the in-place rent roll, the operating figures provided by ownership, the current assessment record, and investor demand for stabilized multifamily in this submarket, it is our opinion that the property would trade in the range below.',
    'Twelve units, tenant-paid heat, an expense load near a third of EGI. The path from in-place to pro forma is leasing and turnover, not capital. Expect a marketing period of **60 to 90 days**.',
  ],
  conclusionNote:
    'The concluded range reflects where competing buyers would realistically underwrite the asset today — direct capitalization of in-place income at market cap rates, supported by the adjusted comparable range.', // SAMPLE — adjust
  disclaimerNote:
    'This Broker Opinion of Value has been prepared at the request of ownership and is not an appraisal. It relies on information supplied by ownership and on public records believed reliable but not independently verified. Projections represent estimates of future performance and are not guarantees.', // SAMPLE — adjust
}
