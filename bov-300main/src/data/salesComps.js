/* ═══════════════════ EDIT-ME · SALES COMPARABLES ═══════════════════
   Recent submarket sales supporting the valuation (3–6 comps; 1–3 render
   full-width stacked, 4–6 in a two-column grid). Price/unit and price/SF
   are COMPUTED where units/gla are given. Pull candidates from CoStar or
   the NPCG Salesforce closed-deal pipeline and paste in.

   ⚠⚠ PLACEHOLDER DATA — NOT REAL COMPARABLES. ⚠⚠
   Nothing on this page has been verified. It is deliberately left as
   obviously-fictional "Sample / Placeholder / Anytown" rows so it cannot be
   mistaken for market evidence. Replace every entry before this deck is
   shown to anyone, and re-test valuation.js `concludedRange` against the
   real set. NPCG's own West Haven closings (see trackRecord.js) are the
   natural starting point: they traded $125K–$131K per unit. */

export const SALES_COMPS = {
  commentary:
    '⚠ AWAITING COMPARABLE SET — the rows below are placeholders, not market data. The concluded trade range in the Valuation section is presently supported by the income approach alone and will be re-tested once verified sales are inserted here.',
  comps: [ // PLACEHOLDER — replace every entry
    {
      address: '45 Sample Avenue', city: 'Anytown, CT', type: 'PLACEHOLDER — not a real sale',
      date: '—', price: 1950000, units: 10, gla: 8100, capRate: '—',
      notes: 'Awaiting verified comparable',
    },
    {
      address: '210 Placeholder Street', city: 'Nearville, CT', type: 'PLACEHOLDER — not a real sale',
      date: '—', price: 3350000, units: 16, gla: 13200, capRate: '—',
      notes: 'Awaiting verified comparable',
    },
    {
      address: '8 Specimen Lane', city: 'Anytown, CT', type: 'PLACEHOLDER — not a real sale',
      date: '—', price: 1480000, units: 8, gla: 6400, capRate: '—',
      notes: 'Awaiting verified comparable',
    },
    {
      address: '77 Example Boulevard', city: 'Otherton, CT', type: 'PLACEHOLDER — not a real sale',
      date: '—', price: 2900000, units: 14, gla: 11500, capRate: '—',
      notes: 'Awaiting verified comparable',
    },
  ],
}
