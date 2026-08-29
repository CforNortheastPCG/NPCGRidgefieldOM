/* ═══════════════════ VALUATION & PRICING ═══════════════════
   Source: "Ware Portfolio - Workbook 06.2026.xlsx" → Analysis tab.
   Purchase price $2,550,000 (E14), which prices to an 8.00% cap on the
   workbook's current NOI of $204,205.71 — reproduced exactly by calc.js.

   ⚠ DEBT RATE: the workbook's Debt Assumptions cell states 7.00%, but its
   own annual debt service of $145,059.61 on a $1,912,500 loan over 30 years
   is a 6.50% payment, and every downstream metric it publishes (DSCR 1.41,
   cash-on-cash 9% current / 23% pro forma) keys off that figure. 7.00%
   would produce $152,687 and a 1.34x DSCR. We carry 6.50% — it matches the
   workbook's published returns and the house assumption used on the other
   2026 BOVs — but the rate cell should be confirmed before this goes out. */

export const VALUATION = {
  askingPrice: 2550000,

  capLadder: { from: 7.0, to: 10.0, step: 0.25, bandFrom: 7.75, bandTo: 8.25 },

  capScenarios: [
    { label: 'Conservative', cap: 8.5 },
    { label: 'Market', cap: 8.0, highlight: true },
    { label: 'Aggressive', cap: 7.75 },
  ],

  concludedRange: { low: 2402420, high: 2634912 },

  compRangeText: '—  see note',
  adjustedRangeText: '—  see note',
  adjustmentsNote:
    'No sales comparables were supplied with the source workbook. This opinion rests on direct capitalization of in-place income; a comparable-sales cross-check should be added before the deck is presented.',

  loan: { ltvPct: 75, ratePct: 6.5, amortYears: 30 },

  pricingRationale:
    'Anchored to current NOI of $204,206, not the pro forma — in-place rents, 5% vacancy, management at 5%. The trailing twelve lands within $50 of it. The ask does not depend on the unproven half of the rent upside.',
  buyerProfile:
    'Regional private capital and 1031 buyers working the Quaboag corridor, plus local operators. A $637,500 down payment at 75% leverage keeps three buildings inside one buyer’s reach.',
  whatMovesPrice:
    'Who pays the heating oil — no fuel line against oil-fired central heat, roughly $225,000 of value at $18,000 a year. Then a Ware rent survey: 56% of the pro forma upside is above any rent collected here.',

  conclusionNote:
    'The range brackets direct capitalization of in-place income between a 7.75% and an 8.50% cap, which is where stabilized small-portfolio product has been trading in this submarket.',

  opinionParagraphs: [
    'Based on the June 2026 rent roll, the ownership operating workbook, the FY2026 tax bills for all three parcels, and the assessor record cards, it is our opinion that the Ware Portfolio would trade in the range shown below.',
    'Twenty units across three contiguous parcels, fully occupied, on one management platform. In-place rent runs **$7,565 a month below** the stabilized schedule, of which **$3,365 is a level this portfolio has already collected** and the balance depends on the market. Neither requires capital. The Town carries the portfolio at **43% of the recommended price**, which limits reassessment exposure.',
    'Two caveats, both stated plainly. The operating statement carries **no heating fuel expense** against oil-fired central heat at all three buildings; if ownership pays that cost the going-in yield is nearer 7.3% than 8.0%. And **56% of the pro forma rent upside — $50,400 a year — is above any rent this portfolio has collected**, so the 11.33% pro forma cap should be read as an upside case, not an underwriting. The recommended ask rests on current income and is insulated from both.',
  ],

  disclaimerNote:
    'This Broker Opinion of Value has been prepared at the request of ownership and is not an appraisal. It relies on the ownership rent roll and operating workbook and on Town of Ware public records believed reliable but not independently verified. Expense lines other than real estate tax are ownership estimates. Projections represent estimates of future performance and are not guarantees.',
}
