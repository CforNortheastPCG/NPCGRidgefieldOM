/* ═══════════════════ EDIT-ME · VALUATION & TRADE RANGE ═══════════════════
   The value conclusion. NOI comes from financials.js/rentRoll.js via
   lib/calc.js — the scenario matrix (cap rate × NOI → value) is computed.
   You choose the cap-rate scenarios and the concluded trade range.

   ⚠ FIRST DRAFT — the concluded range below is bracketed by the income
   approach only. It must be re-tested once the sales comparables land
   (salesComps.js is still carrying template placeholders). */

export const VALUATION = {
  // Cap-rate scenarios for the sensitivity matrix. `highlight: true` marks
  // the market/most-likely row.
  capScenarios: [
    { label: 'Conservative', cap: 6.75 },
    { label: 'Market', cap: 6.25, highlight: true },
    { label: 'Aggressive', cap: 5.75 },
  ],

  // The headline conclusion — the range you'd quote the owner.
  concludedRange: { low: 1300000, high: 1450000 },

  // Sales-comparison support (text, since comp adjustment is judgment).
  compRangeText: 'Pending comp set',
  adjustedRangeText: '$130K – $145K / unit',
  adjustmentsNote:
    'The concluded range is presently supported by the income approach alone. Sales comparables are being assembled and will be adjusted for unit mix, condition, and utility structure — the subject’s landlord-paid heat and hot water are a downward adjustment against buildings with tenant-paid utilities, while its 31% loss to lease is an upward one.',

  // Optional financing card on the Valuation page — set to null to hide it.
  loan: { ltvPct: 60, ratePct: 6.5, amortYears: 30 },

  // One-line takeaway under the trade-range band.
  conclusionNote:
    'The range brackets the point where competing buyers land: above a straight capitalization of today’s in-place income, but well short of a stabilized pro-forma value they have not yet earned. Debt sizing — not the cap rate — is the binding constraint at in-place income, which is why the going-in yield reads low and the pro-forma yield reads high.',
}
