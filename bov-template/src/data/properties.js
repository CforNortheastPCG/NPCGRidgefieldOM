/* ═══════════════════ EDIT-ME · PROPERTY / PROPERTIES ═══════════════════
   One entry per property. ONE entry → single-property BOV (one Property
   Information page). TWO OR MORE entries → portfolio BOV: App automatically
   inserts a Portfolio Summary page followed by one Property Information page
   per entry, and the TOC renumbers itself. */

export const PROPERTIES = [
  {
    id: 'maple-court',                      // SAMPLE — replace (unique slug)
    name: 'Maple Court Apartments',         // SAMPLE — replace
    address: '12 Example Street, Anytown, CT 06000',
    // Quick stats used on the Portfolio Summary row (portfolio decks only).
    stats: { units: 12, gsf: 9400, yearBuilt: 1968, lotAcres: 0.52 },
    // Four card groups on the Property Information page. Rows are free-form
    // label/value pairs — add or remove rows; the card flexes.
    siteRows: [ // SAMPLE — replace
      { label: 'Address', value: '12 Example Street, Anytown, CT 06000' },
      { label: 'Property Type', value: 'Multifamily — Garden Style' },
      { label: 'Total Units', value: '12 Apartments' },
      { label: 'Gross Building SF', value: '±9,400 SF' },
      { label: 'Lot Size', value: '0.52 Acres (~22,650 SF)' },
      { label: 'Year Built', value: '1968 · Renovated 2015' },
      { label: 'Stories', value: '3 Stories' },
      { label: 'Parking', value: 'On-Site Paved Lot (16 Spaces)' },
      { label: 'Zoning', value: 'R-3 Multifamily' },
    ],
    utilityRows: [ // SAMPLE — replace
      { label: 'Heating', value: 'Tenant-Paid · Electric Baseboard' },
      { label: 'Electric', value: 'Separately Metered · Tenant-Paid' },
      { label: 'Water / Sewer', value: 'Municipal · Landlord-Paid' },
      { label: 'Trash', value: 'Landlord-Paid · Private Hauler' },
      { label: 'Roof / Mechanicals', value: 'Roof 2018 · Water Heaters 2020' },
    ],
    unitCompositionRows: [ // SAMPLE — replace (keep in sync with rentRoll.js)
      { label: '1 Bed / 1 Bath', value: '6 Units · ~650 SF avg' },
      { label: '2 Bed / 1 Bath', value: '4 Units · ~850 SF avg' },
      { label: '3 Bed / 1 Bath', value: '2 Units · ~1,050 SF avg' },
      { label: 'Total', value: '12 Apartments · ~783 SF avg' },
    ],
    ancillaryRows: [ // SAMPLE — replace
      { label: 'On-Site Laundry', value: 'Coin-op laundry in basement' },
      { label: 'Storage', value: 'Tenant storage lockers' },
      { label: 'Occupancy', value: '100% Occupied' },
    ],
    photo: '/photos/property-1.jpg',
  },
  // { id: 'second-property', name: '…', … }   // ← add entries for a portfolio BOV
]

export const IS_PORTFOLIO = PROPERTIES.length > 1

/* ── PORTFOLIO PROFILE (portfolio decks only) ──────────────────────────
   With 2+ properties the Executive Summary should describe the PORTFOLIO,
   not building one. Fill this in and the short format uses it; leave it
   null and the summary falls back to PROPERTIES[0]. Same row shape as
   `siteRows` / `utilityRows`. */
export const PORTFOLIO_PROFILE = null
