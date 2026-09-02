import type { RentRollData } from '../lib/types.ts'
/* ═══════════════════ EDIT-ME · RENT ROLL (AS GIVEN) ═══════════════════
   The rent roll exactly as provided by ownership. Monthly figures.
   In-Place = current contract rent; Pro Forma = market / stabilized target.
   Totals, unit mix, and averages are COMPUTED — never hand-total.
   Feeds RentRollPage, UnitMixIePage (donuts), and RentCompsPage (subject
   strip). Keep `type` labels consistent — the unit-mix chart groups by them.

   ── PER-UNIT FIELDS ─────────────────────────────────────────────────
   Required : unit · type · sqft · inPlace · proforma
   Optional : status ('Occupied' | 'Vacant — Asking' | anything you like)
              leaseFrom · leaseEnd  ('Month-to-Month' is fine)
   The optional columns appear only if at least one unit carries them, so a
   thin rent roll stays clean and a full one shows lease exposure. A unit
   whose `status` starts with "Vacant" is counted as vacant and rendered in
   terracotta; its `inPlace` should be the ASKING rent, and the footnote
   should say so — a vacant unit produced no revenue in the period.

   The roll prints in two columns above ~16 units, so 40+ units still fit on
   one page. Past ~48 the page will overflow — qa-shots.cjs will catch it. */

export const RENT_ROLL = {
  asOf: 'July 2026',                          // SAMPLE — replace
  source: 'Owner-provided rent roll',          // SAMPLE — replace (e.g. "Owner rent roll + leases")
  units: [ // SAMPLE — replace every row
    { unit: '1A', type: '1BR / 1BA', sqft: 640, inPlace: 1385, proforma: 1550, status: 'Occupied', leaseFrom: '04/01/2024', leaseEnd: '03/31/2027' },
    { unit: '1B', type: '1BR / 1BA', sqft: 660, inPlace: 1400, proforma: 1550, status: 'Occupied', leaseFrom: '11/01/2023', leaseEnd: 'Month-to-Month' },
    { unit: '1C', type: '2BR / 1BA', sqft: 840, inPlace: 1675, proforma: 1900, status: 'Occupied', leaseFrom: '09/01/2025', leaseEnd: '08/31/2027' },
    { unit: '1D', type: '3BR / 1BA', sqft: 1050, inPlace: 1995, proforma: 2250, status: 'Occupied', leaseFrom: '06/01/2024', leaseEnd: '05/31/2027' },
    { unit: '2A', type: '1BR / 1BA', sqft: 650, inPlace: 1410, proforma: 1550, status: 'Occupied', leaseFrom: '02/01/2026', leaseEnd: '01/31/2027' },
    { unit: '2B', type: '1BR / 1BA', sqft: 650, inPlace: 1390, proforma: 1550, status: 'Occupied', leaseFrom: '08/15/2023', leaseEnd: 'Month-to-Month' },
    { unit: '2C', type: '2BR / 1BA', sqft: 860, inPlace: 1710, proforma: 1900, status: 'Occupied', leaseFrom: '03/01/2026', leaseEnd: '02/28/2027' },
    { unit: '2D', type: '2BR / 1BA', sqft: 850, inPlace: 1690, proforma: 1900, status: 'Occupied', leaseFrom: '01/01/2025', leaseEnd: '12/31/2026' },
    { unit: '3A', type: '1BR / 1BA', sqft: 650, inPlace: 1415, proforma: 1550, status: 'Occupied', leaseFrom: '07/01/2025', leaseEnd: '06/30/2027' },
    { unit: '3B', type: '1BR / 1BA', sqft: 650, inPlace: 1400, proforma: 1550, status: 'Occupied', leaseFrom: '10/01/2024', leaseEnd: '09/30/2026' },
    { unit: '3C', type: '2BR / 1BA', sqft: 850, inPlace: 1725, proforma: 1900, status: 'Occupied', leaseFrom: '05/01/2025', leaseEnd: '04/30/2027' },
    { unit: '3D', type: '3BR / 1BA', sqft: 1050, inPlace: 2005, proforma: 2250, status: 'Occupied', leaseFrom: '12/01/2024', leaseEnd: '11/30/2026' },
  ],
  // Footnotes under the table (vacant units, notes on specific rows, etc.)
  footnotes: [
    'Monthly figures as provided by ownership. In-Place = current contract rent; Pro Forma = market rent supported by the rent comparables herein.', // SAMPLE — adjust
    // If any unit is vacant, say what its In-Place figure represents:
    // 'In-Place rent for vacant units reflects the asking rent at which they are being marketed; those units produced no revenue as of the rent roll date.',
  ],
} satisfies RentRollData

// Colors for the unit-mix / rent-by-type donuts, assigned to unit types in
// first-appearance order. Brand palette — extend only if 5+ unit types.
export const TYPE_COLORS = ['#3F4753', '#F8971D', '#B55D37', '#B1A8A0'] as const
