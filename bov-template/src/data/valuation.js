/* ═══════════════════ EDIT-ME · VALUATION & TRADE RANGE ═══════════════════
   The value conclusion. NOI comes from financials.js/rentRoll.js via
   lib/calc.js — the scenario matrix (cap rate × NOI → value) is computed.
   You choose the cap-rate scenarios and the concluded trade range. */

export const VALUATION = {
  // Cap-rate scenarios for the sensitivity matrix. `highlight: true` marks
  // the market/most-likely row.
  capScenarios: [ // SAMPLE — replace with market-supported caps
    { label: 'Conservative', cap: 7.25 },
    { label: 'Market', cap: 6.75, highlight: true },
    { label: 'Aggressive', cap: 6.25 },
  ],

  // The headline conclusion — the range you'd quote the owner.
  concludedRange: { low: 2300000, high: 2550000 }, // SAMPLE — replace

  // Sales-comparison support (text, since comp adjustment is judgment).
  compRangeText: '$180K – $225K / unit',        // SAMPLE — raw comp range
  adjustedRangeText: '$192K – $212K / unit',    // SAMPLE — after adjustments
  adjustmentsNote:
    'Comparables adjusted for unit mix, condition, and utility structure. The subject’s tenant-paid heat and recent capital work support the upper half of the unadjusted range.', // SAMPLE — replace

  // Optional financing card on the Valuation page — set to null to hide it.
  loan: { ltvPct: 65, ratePct: 6.5, amortYears: 30 }, // SAMPLE — market debt terms

  // One-line takeaway under the trade-range band.
  conclusionNote:
    'The concluded range reflects where competing buyers would realistically underwrite the asset today — direct capitalization of in-place income at market cap rates, supported by the adjusted comparable range.', // SAMPLE — adjust
}
