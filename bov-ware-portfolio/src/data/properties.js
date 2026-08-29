/* ═══════════════════ PROPERTIES ═══════════════════
   Three parcels → portfolio mode: the long format inserts a Portfolio
   Summary page plus one page per property. The short format uses
   PORTFOLIO_PROFILE below for the Executive Summary profile table, since a
   three-building portfolio should not be described by building one. */

export const PROPERTIES = [
  {
    id: '27-parker',
    name: '27 Parker Street',
    address: '27 Parker Street, Ware, MA 01082',
    stats: { units: 4, gsf: 2822, yearBuilt: 1890, lotAcres: 0.11 },
    siteRows: [
      { label: 'Parcel ID', value: '60-0-130' },
      { label: 'Units', value: '4 Apartments' },
      { label: 'Assessor Living Area', value: '2,822 SF' },
      { label: 'Rentable SF (Rent Roll)', value: '2,750 SF' },
      { label: 'Lot Size', value: '0.11 Acres' },
      { label: 'Year Built', value: '1890' },
      { label: 'Zoning', value: 'DTC — Downtown Commercial' },
      { label: 'Use Description', value: 'APT 4-8' },
    ],
    utilityRows: [
      { label: 'Heating', value: 'Forced Hot Water · Oil' },
      { label: 'A/C', value: 'None' },
      { label: 'Exterior Wall', value: 'Vinyl' },
      { label: 'Roof', value: 'Asphalt Shingle · Gable' },
      { label: 'Stories', value: '2.5' },
    ],
    unitCompositionRows: [
      { label: '1 Bed', value: '2 Units · 625 SF' },
      { label: '2 Bed', value: '1 Unit · 700 SF' },
      { label: '3 Bed', value: '1 Unit · 800 SF' },
      { label: 'Total', value: '4 Units · $5,750 / mo' },
    ],
    ancillaryRows: [
      { label: 'Occupancy', value: '100% — 4 of 4' },
      { label: 'FY2026 Assessment', value: '$275,400' },
      { label: 'FY2026 Tax', value: '$3,990.55' },
    ],
    photo: '/photos/exterior-2.jpg',
  },
  {
    id: '28-30-north',
    name: '28-30 North Street',
    address: '28-30 North Street, Ware, MA 01082',
    stats: { units: 14, gsf: 6800, yearBuilt: 1932, lotAcres: 0.55 },
    siteRows: [
      { label: 'Parcel ID', value: '61-0-10' },
      { label: 'Units', value: '14 Apartments (incl. 28.5 North)' },
      { label: 'Assessor Living Area', value: '6,800 SF' },
      { label: 'Rentable SF (Rent Roll)', value: '9,350 SF' },
      { label: 'Lot Size', value: '0.55 Acres' },
      { label: 'Year Built', value: '1932' },
      { label: 'Zoning', value: 'DTC — Downtown Commercial' },
      { label: 'Use Description', value: 'APT 4-8' },
    ],
    utilityRows: [
      { label: 'Heating', value: 'Forced Hot Air · Oil' },
      { label: 'A/C', value: 'None' },
      { label: 'Exterior Wall', value: 'Asbestos' },
      { label: 'Roof', value: 'Asphalt Shingle · Gable' },
      { label: 'Stories', value: '2' },
    ],
    unitCompositionRows: [
      { label: 'Studio', value: '1 Unit · 500 SF' },
      { label: '1 Bed', value: '4 Units · 625–650 SF' },
      { label: '2 Bed', value: '5 Units · 700 SF' },
      { label: '3 Bed', value: '3 Units · 800 SF' },
      { label: 'Total', value: '14 Units · $17,895 / mo' },
    ],
    ancillaryRows: [
      { label: 'Occupancy', value: '100% — 14 of 14' },
      { label: 'FY2026 Assessment', value: '$591,100' },
      { label: 'FY2026 Tax', value: '$8,565.04' },
    ],
    photo: '/photos/exterior-1.jpg',
  },
  {
    id: '38-north',
    name: '38 North Street',
    address: '38 North Street, Ware, MA 01082',
    stats: { units: 2, gsf: 1576, yearBuilt: 1880, lotAcres: 0.17 },
    siteRows: [
      { label: 'Parcel ID', value: '61-0-11' },
      { label: 'Units', value: '2 Apartments' },
      { label: 'Assessor Living Area', value: '1,576 SF' },
      { label: 'Rentable SF (Rent Roll)', value: '1,550 SF' },
      { label: 'Lot Size', value: '0.17 Acres' },
      { label: 'Year Built', value: '1880' },
      { label: 'Zoning', value: 'DTC — Downtown Commercial' },
      { label: 'Use Description', value: 'TWO FAM' },
    ],
    utilityRows: [
      { label: 'Heating', value: 'Forced Hot Water · Oil' },
      { label: 'A/C', value: 'None' },
      { label: 'Exterior Wall', value: 'Vinyl' },
      { label: 'Roof', value: 'Asphalt Shingle · Gable' },
      { label: 'Stories', value: '2' },
    ],
    unitCompositionRows: [
      { label: '1 Bed', value: '2 Units · 775 SF' },
      { label: 'Total', value: '2 Units · $2,210 / mo' },
    ],
    ancillaryRows: [
      { label: 'Occupancy', value: '100% — 2 of 2' },
      { label: 'FY2026 Assessment', value: '$228,300' },
      { label: 'FY2026 Tax', value: '$3,308.07' },
    ],
    photo: '/photos/exterior-3.jpg',
  },
]

export const IS_PORTFOLIO = PROPERTIES.length > 1

/* Portfolio-level profile for the Executive Summary (short format). */
export const PORTFOLIO_PROFILE = {
  photo: '/photos/property-1.jpg',
  siteRows: [
    { label: 'Address', value: '27 Parker St · 28-30 & 38 North St' },
    { label: 'City / State', value: 'Ware, MA 01082' },
    { label: 'Parcels', value: '3 — 60-0-130, 61-0-10, 61-0-11' },
    { label: 'Total Units', value: '20 Apartments' },
    { label: 'Rentable SF', value: '13,875 SF' },
    { label: 'Lot Size', value: '0.83 Acres' },
    { label: 'Year Built', value: '1880 · 1890 · 1932' },
    { label: 'Zoning', value: 'DTC — Downtown Commercial' },
  ],
  utilityRows: [
    { label: 'Heating', value: 'Oil — Forced Hot Water / Hot Air' },
    { label: 'A/C', value: 'None' },
    { label: 'Occupancy', value: '100% — 20 of 20' },
    { label: 'Owner of Record', value: 'CV Ware Opportunity Zone Fund, LLC' },
    { label: 'Acquired', value: 'December 2020 · $1,025,000' },
  ],
}
