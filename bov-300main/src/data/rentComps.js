/* ═══════════════════ EDIT-ME · RENT COMPARABLES ═══════════════════
   Competing rentals supporting the pro-forma (market) rents (3–6 comps).
   Rent/SF is COMPUTED. The page also shows the subject's in-place vs
   pro-forma averages by unit type, derived from rentRoll.js.

   ⚠⚠ PLACEHOLDER DATA — NOT REAL COMPARABLES. ⚠⚠
   The $1,500 / $1,800 pro-forma rents in rentRoll.js came from the owner's
   I&E workbook, not from a surveyed comp set. This page must be populated
   with real West Haven one-bedroom listings before the deck is shown —
   the entire pro-forma NOI (and therefore the top of the trade range)
   rests on those two numbers. */

export const RENT_COMPS = {
  commentary:
    '⚠ AWAITING RENT SURVEY — the rows below are placeholders, not market data. The pro-forma rents of $1,500 (1BR) and $1,800 (1BR + dining) carried in the underwriting are ownership’s figures and require independent support from competing West Haven rentals.',
  comps: [ // PLACEHOLDER — replace every entry
    {
      address: '31 Sample Avenue', city: 'Anytown, CT', unitType: 'PLACEHOLDER',
      sqft: 675, rent: 1595, notes: 'Awaiting verified comparable',
    },
    {
      address: '210 Placeholder Street', city: 'Nearville, CT', unitType: 'PLACEHOLDER',
      sqft: 875, rent: 1950, notes: 'Awaiting verified comparable',
    },
    {
      address: '14 Specimen Court', city: 'Anytown, CT', unitType: 'PLACEHOLDER',
      sqft: 820, rent: 1875, notes: 'Awaiting verified comparable',
    },
    {
      address: '92 Example Road', city: 'Otherton, CT', unitType: 'PLACEHOLDER',
      sqft: 1080, rent: 2295, notes: 'Awaiting verified comparable',
    },
  ],
}
