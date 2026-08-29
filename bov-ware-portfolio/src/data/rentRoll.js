/* ═══════════════════ RENT ROLL (AS GIVEN) ═══════════════════
   Source: "Ware Portfolio - Workbook 06.2026.xlsx" → Analysis tab rent-roll
   block (R13:Z33) and Rent Roll tab, as of June 10, 2026.

   `proforma` is the workbook's stabilized rent BY UNIT TYPE, not a
   unit-level projection — so several units currently rent ABOVE it (30-4 at
   $1,750 against a $1,450 one-bedroom pro forma). Those are left as the
   workbook has them rather than marked up to in-place: the portfolio total
   still moves from $25,855 to $33,420 a month, and pretending no unit is
   already over-market would overstate the upside.

   `highAchieved` per type is carried in the unit-mix block of the Analysis
   tab: Studio $1,670 · 1 bed $1,800 · 1 bed-L $1,225 · 2 bed $1,575 ·
   3 bed $1,375. Lease dates were "INSERT" throughout the workbook and are
   therefore omitted rather than invented. */

export const RENT_ROLL = {
  asOf: 'June 10, 2026',
  source: 'Ownership rent roll',
  units: [
    // ── 27 Parker Street · Parcel 60-0-130 ──
    { unit: 'P27-1', type: '1 Bed',     sqft: 625, inPlace: 1800, proforma: 1450, status: 'Occupied' },
    { unit: 'P27-2', type: '1 Bed',     sqft: 625, inPlace: 1375, proforma: 1450, status: 'Occupied' },
    { unit: 'P27-3', type: '2 Bed',     sqft: 700, inPlace: 1200, proforma: 1800, status: 'Occupied' },
    { unit: 'P27-4', type: '3 Bed',     sqft: 800, inPlace: 1375, proforma: 1950, status: 'Occupied' },
    // ── 28.5 North Street (second structure on Parcel 61-0-10) ──
    { unit: 'N28.5-1', type: '2 Bed',    sqft: 700, inPlace: 1225, proforma: 1800, status: 'Occupied' },
    { unit: 'N28.5-2', type: '1 Bed — L', sqft: 650, inPlace: 1225, proforma: 1500, status: 'Occupied' },
    { unit: 'N28.5-3', type: '1 Bed',    sqft: 625, inPlace: 1150, proforma: 1450, status: 'Occupied' },
    // ── 28-30 North Street · Parcel 61-0-10 ──
    { unit: 'N28-1',  type: '2 Bed',      sqft: 700, inPlace: 950,  proforma: 1800, status: 'Occupied' },
    { unit: 'N28-2',  type: '2 Bed',      sqft: 700, inPlace: 1125, proforma: 1800, status: 'Occupied' },
    { unit: 'N28-3',  type: '1 Bed — L',  sqft: 650, inPlace: 1200, proforma: 1500, status: 'Occupied' },
    { unit: 'N30-1',  type: 'Studio',     sqft: 500, inPlace: 1670, proforma: 1670, status: 'Occupied' },
    { unit: 'N30-2',  type: '2 Bed',      sqft: 700, inPlace: 1575, proforma: 1800, status: 'Occupied' },
    { unit: 'N30-3',  type: '1 Bed',      sqft: 625, inPlace: 1475, proforma: 1450, status: 'Occupied' },
    { unit: 'N30-4',  type: '1 Bed',      sqft: 625, inPlace: 1750, proforma: 1450, status: 'Occupied' },
    { unit: 'N30-5',  type: '2 Bed',      sqft: 700, inPlace: 1200, proforma: 1800, status: 'Occupied' },
    { unit: 'N30-6',  type: '3 Bed',      sqft: 800, inPlace: 1125, proforma: 1950, status: 'Occupied' },
    { unit: 'N30-7',  type: '3 Bed',      sqft: 800, inPlace: 950,  proforma: 1950, status: 'Occupied' },
    { unit: 'N30-8',  type: '3 Bed',      sqft: 800, inPlace: 1275, proforma: 1950, status: 'Occupied' },
    // ── 38 North Street · Parcel 61-0-11 ──
    { unit: 'N38-1',  type: '1 Bed',      sqft: 775, inPlace: 1160, proforma: 1450, status: 'Occupied' },
    { unit: 'N38-2',  type: '1 Bed',      sqft: 775, inPlace: 1050, proforma: 1450, status: 'Occupied' },
  ],
  footnotes: [
    'Monthly figures per the ownership rent roll as of June 10, 2026. All twenty units are occupied. Pro forma rent is the workbook’s stabilized rent by unit type; four units currently rent above the pro forma for their type and are shown unadjusted.',
    'Lease expirations were not populated in the source workbook and are omitted here. A complete rent roll with lease start and end dates, security deposit balances, and tenant ledgers should be obtained in diligence.',
  ],
}

export const TYPE_COLORS = ['#3F4753', '#F8971D', '#B55D37', '#B1A8A0', '#8d95a1']
