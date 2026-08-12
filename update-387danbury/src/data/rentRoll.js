/* ═══════════════════ EDIT-ME · RENT ROLL (AS GIVEN) ═══════════════════
   The rent roll exactly as provided by ownership. Monthly figures.
   In-Place = current contract rent; Pro Forma = market / stabilized target.
   Totals, unit mix, and averages are COMPUTED — never hand-total.
   Feeds RentRollPage, UnitMixIePage (donuts), and RentCompsPage (subject
   strip). Keep `type` labels consistent — the unit-mix chart groups by them. */

export const RENT_ROLL = {
  asOf: 'July 2026',                          // SAMPLE — replace
  source: 'Owner-provided rent roll',          // SAMPLE — replace (e.g. "Owner rent roll + leases")
  units: [ // SAMPLE — replace every row
    { unit: '1A', type: '1BR / 1BA', sqft: 640, inPlace: 1385, proforma: 1550 },
    { unit: '1B', type: '1BR / 1BA', sqft: 660, inPlace: 1400, proforma: 1550 },
    { unit: '1C', type: '2BR / 1BA', sqft: 840, inPlace: 1675, proforma: 1900 },
    { unit: '1D', type: '3BR / 1BA', sqft: 1050, inPlace: 1995, proforma: 2250 },
    { unit: '2A', type: '1BR / 1BA', sqft: 650, inPlace: 1410, proforma: 1550 },
    { unit: '2B', type: '1BR / 1BA', sqft: 650, inPlace: 1390, proforma: 1550 },
    { unit: '2C', type: '2BR / 1BA', sqft: 860, inPlace: 1710, proforma: 1900 },
    { unit: '2D', type: '2BR / 1BA', sqft: 850, inPlace: 1690, proforma: 1900 },
    { unit: '3A', type: '1BR / 1BA', sqft: 650, inPlace: 1415, proforma: 1550 },
    { unit: '3B', type: '1BR / 1BA', sqft: 650, inPlace: 1400, proforma: 1550 },
    { unit: '3C', type: '2BR / 1BA', sqft: 850, inPlace: 1725, proforma: 1900 },
    { unit: '3D', type: '3BR / 1BA', sqft: 1050, inPlace: 2005, proforma: 2250 },
  ],
  // Footnotes under the table (vacant units, notes on specific rows, etc.)
  footnotes: [
    'Monthly figures as provided by ownership. In-Place = current contract rent; Pro Forma = market rent supported by the rent comparables herein.', // SAMPLE — adjust
  ],
}

// Colors for the unit-mix / rent-by-type donuts, assigned to unit types in
// first-appearance order. Brand palette — extend only if 5+ unit types.
export const TYPE_COLORS = ['#3F4753', '#F8971D', '#B55D37', '#B1A8A0']
