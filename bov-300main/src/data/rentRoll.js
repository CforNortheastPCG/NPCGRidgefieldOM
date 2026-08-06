/* ═══════════════════ EDIT-ME · RENT ROLL (AS GIVEN) ═══════════════════
   The rent roll exactly as provided by ownership. Monthly figures.
   In-Place = current contract rent; Pro Forma = market / stabilized target.
   Totals, unit mix, and averages are COMPUTED — never hand-total.
   Feeds RentRollPage, UnitMixIePage (donuts), and RentCompsPage (subject
   strip). Keep `type` labels consistent — the unit-mix chart groups by them.

   SOURCE: NPCG_I&E_Main_7.31.2026_BJB.xlsx — "Rent Roll" tab (07.29.2026).
   Unit numbering: "-M" = 300 Main Street entrance, "-W" = 491 Washington Ave
   entrance. Both are the same building on one parcel (PID 11127). */

export const RENT_ROLL = {
  asOf: 'July 29, 2026',
  source: 'Owner-provided rent roll & leases',
  units: [
    { unit: '1-M', type: '1BR + Dining', sqft: 920, inPlace: 1245, proforma: 1800 },
    { unit: '2-M', type: '1BR + Dining', sqft: 920, inPlace: 1205, proforma: 1800 },
    { unit: '3-M', type: '1BR + Dining', sqft: 920, inPlace: 1270, proforma: 1800 },
    { unit: '4-M', type: '1BR + Dining', sqft: 920, inPlace: 1270, proforma: 1800 },
    { unit: '6-M', type: '1BR',          sqft: 720, inPlace: 1045, proforma: 1500 },
    { unit: '1-W', type: '1BR + Dining', sqft: 920, inPlace: 1320, proforma: 1800 },
    { unit: '2-W', type: '1BR + Dining', sqft: 920, inPlace: 1240, proforma: 1800 },
    { unit: '3-W', type: '1BR + Dining', sqft: 920, inPlace: 1245, proforma: 1800 },
    { unit: '4-W', type: '1BR + Dining', sqft: 920, inPlace: 1180, proforma: 1800 },
    { unit: '5-W', type: '1BR',          sqft: 720, inPlace:  990, proforma: 1500 },
  ],
  // Footnotes under the table (vacant units, notes on specific rows, etc.)
  footnotes: [
    'Monthly figures per the owner-provided rent roll dated 07.29.2026. In-Place = current contract rent; Pro Forma = market rent supported by the rent comparables herein. All ten apartments are occupied.',
    'Unit 1-M is leased to a West Haven Housing Authority (Section 8) voucher holder; units 2-M and 1-W carry co-signers. Security deposits on file total $12,185.',
    'Unit 5-M is a single rooming unit let at $310/month. It is excluded from the apartment count above and carried as Room Income in the operating statement.',
    'Unit square footages are approximate, allocated from the assessor’s 8,801 SF living area (Vision Government Solutions, PID 11127). Units have not been measured — verify independently.',
  ],
}

// Colors for the unit-mix / rent-by-type donuts, assigned to unit types in
// first-appearance order. Brand palette — extend only if 5+ unit types.
export const TYPE_COLORS = ['#3F4753', '#F8971D', '#B55D37', '#B1A8A0']
