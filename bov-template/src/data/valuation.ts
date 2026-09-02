import type { ValuationData } from '../lib/types.ts'
/* ═══════════════════ EDIT-ME · VALUATION & PRICING ═══════════════════
   The value conclusion. NOI comes from financials.js/rentRoll.js via
   lib/calc.js — every price, per-unit, per-SF and cap figure on the
   Valuation and Conclusion pages is COMPUTED. You choose the asking price,
   the cap-rate ladder bounds, and the concluded range. */

export const VALUATION = {
  /* ── The number you would put on the sign. Drives the headline band on
        the Valuation page, the price band on the Conclusion page, and the
        assessed-value ratio on the Record Card page. ── */
  askingPrice: 2425000, // SAMPLE — replace

  /* ── Cap-rate sensitivity ladder (Valuation page, left column).
        Generated in 25bp steps from `from` to `to`. Rows between `bandFrom`
        and `bandTo` are shaded as the expected trade band; the row nearest
        the asking price's implied cap is marked as the ask.
        Keep the span to ~10–13 rows so it fills the column without
        overflowing — the page is a fixed 742px box. ── */
  capLadder: { from: 5.75, to: 8.25, step: 0.25, bandFrom: 6.25, bandTo: 6.75 }, // SAMPLE — replace

  /* Named scenarios still drive the Conclusion page's low/high endpoints. */
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

  // Optional financing card on the Valuation page — set to null to hide it.
  loan: { ltvPct: 65, ratePct: 6.5, amortYears: 30 }, // SAMPLE — market debt terms

  /* ── The three argument cards along the bottom of the Valuation page.
        Where the opinion stops being arithmetic. **≤ 26 words each** — the
        ladder, the curve and the returns table are already carrying the
        quantitative load; these only have to say the part a chart can't. ── */

  // One-line takeaway under the trade-range band.

  /* ── Conclusion page narrative. First paragraph states the basis and the
        opinion; the rest make the case to a buyer. 2–3 paragraphs, ~60
        words each. **bold** markdown is supported. ── */


  // Footnote under the value-conclusion table.
} satisfies ValuationData
