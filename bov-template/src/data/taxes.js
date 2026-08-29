/* ═══════════════════ EDIT-ME · REAL ESTATE TAXES ═══════════════════
   Municipal tax detail. Feeds the "Real Estate Taxes" page. Tax per unit,
   per SF, as a percent of EGI, and the whole reassessment-sensitivity
   table are COMPUTED in lib/calc.js — enter only what the bill says.

   ── WHY THE SENSITIVITY TABLE MATTERS ───────────────────────────────
   Most municipalities revalue on a cycle rather than at each sale, so a
   long-held asset is often carried far below market. A buyer WILL model
   what happens when it is reassessed. Showing that math yourself — and
   showing the asset still clears an acceptable yield in the worst case —
   is what keeps a reassessment discount out of the offer. If the deal does
   NOT survive that scenario, that is worth knowing before you set the ask.

   Set the whole export to null if the deal has no useful tax detail; the
   page drops out of both formats. */

export const TAXES = {
  municipality: 'Town of Anytown',           // SAMPLE — replace
  asOfDate: 'August 5, 2026',                // SAMPLE — replace
  billRef: 'FY2027 — Bill 1766',             // SAMPLE — replace (bill year / number)

  /* Fiscal-year history. Two or three years is plenty — enough to show the
     direction of travel and whether increases are rate-driven or
     assessment-driven. `surcharge` covers CPA/CIP-style add-ons (0 if none). */
  fiscalYears: [ // SAMPLE — replace
    { fy: 'FY2025', assessedValue: 1495200, ratePer1000: 17.46, surcharge: 0 },
    { fy: 'FY2026', assessedValue: 1559700, ratePer1000: 17.43, surcharge: 0 },
  ],

  /* Per-parcel breakdown — only needed for multi-parcel deals. Leave as an
     empty array for a single parcel and the table drops out. */
  byParcel: [], // SAMPLE — e.g. { parcelId, location, units, priorAssessed, currentAssessed }

  /* Installment detail, if the town bills in installments and you have the
     bill. Leave empty to omit. Preliminary Massachusetts-style bills are
     customarily half the prior year's net tax — say so in `underwritingNote`
     rather than presenting them as evidence of an increase. */
  installments: [ // SAMPLE — replace or empty
    { label: 'Installment 1', payBy: '08/03/2026', amount: 13600.15, credits: 0, interest: 2.46 },
    { label: 'Installment 2', payBy: '11/02/2026', amount: 13600.15, credits: 0, interest: 0 },
  ],

  /* Are the installments above a PRELIMINARY billing (customarily half the
     prior year's net tax, as in Massachusetts), or the full-year bill?
     true  → the page annualizes them (×2) and labels it as an estimate.
     false → the installments already total the year; no annualization.
     Getting this wrong doubles the tax on the page, so it is explicit. */
  installmentsArePreliminary: false,   // SAMPLE — set true for MA-style preliminary bills

  // What ownership states they pay annually — reconciles against the bill.
  ownerStatedAnnual: 28000,                  // SAMPLE — replace (null to omit)

  underwritingNote:
    'The current-year increase is assessment-driven rather than rate-driven. Current and pro forma underwriting carries the current fiscal-year tax. A sale may trigger reassessment; a buyer should underwrite taxes on the purchase price rather than the current assessment.', // SAMPLE — replace

  /* Reassessment scenarios, as a fraction of the asking price. The page
     computes assessed value, the tax at the current rate, the adjusted NOI,
     and the resulting cap at the ask for each. 0.75 and 1.00 are the
     conventional pair — what a cautious buyer models, and the worst case. */
  reassessmentRatios: [0.75, 1.0],

  sourceNote:
    'Source: municipal real estate bill detail and property record card as of the date shown. Where an implied rate is used it is derived from the billing against total assessed value and is not a published mill rate.', // SAMPLE — adjust
}
