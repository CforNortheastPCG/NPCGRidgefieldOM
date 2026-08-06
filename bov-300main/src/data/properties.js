/* ═══════════════════ EDIT-ME · PROPERTY / PROPERTIES ═══════════════════
   One entry per property. ONE entry → single-property BOV (one Property
   Information page). TWO OR MORE entries → portfolio BOV: App automatically
   inserts a Portfolio Summary page followed by one Property Information page
   per entry, and the TOC renumbers itself.

   SOURCE: Vision Government Solutions field card, West Haven PID 11127
   (Mblu 43/487), plus the owner-provided rent roll and I&E workbook.
   300 Main Street and 491 Washington Avenue are two entrances to ONE
   building on ONE parcel — this is a single-property BOV, not a portfolio. */

export const PROPERTIES = [
  {
    id: '300-main-west-haven',
    name: 'Main Street Apartments',
    address: '300 Main Street & 491 Washington Avenue, West Haven, CT 06516',
    // Quick stats used on the Portfolio Summary row (portfolio decks only).
    stats: { units: 10, gsf: 8801, yearBuilt: 1940, lotAcres: 0.21 },
    // Four card groups on the Property Information page. Rows are free-form
    // label/value pairs — add or remove rows; the card flexes.
    siteRows: [
      { label: 'Address', value: '300 Main St & 491 Washington Ave, West Haven, CT' },
      { label: 'Property Type', value: 'Multifamily — Tudor Revival Walk-Up' },
      { label: 'Total Units', value: '10 Apartments + 1 Rooming Unit' },
      { label: 'Living Area', value: '±8,801 SF (14,980 SF Gross)' },
      { label: 'Lot Size', value: '0.21 Acres (~9,150 SF) — Corner' },
      { label: 'Year Built', value: '1940 · 2.25 Stories + Finished Attic' },
      { label: 'Zoning', value: 'CBD — Central Business District (PID 11127)' },
    ],
    utilityRows: [
      { label: 'Heating', value: 'Landlord-Paid · Gas Hot Water' },
      { label: 'Electric', value: 'Separately Metered · Tenant-Paid' },
      { label: 'Water / Sewer', value: 'Municipal · Landlord-Paid' },
      { label: 'Trash', value: 'Landlord-Paid · Private Hauler' },
      { label: 'Cooling', value: 'None Central · Window Units' },
    ],
    unitCompositionRows: [
      { label: '1 Bed + Dining Room', value: '8 Units · ~920 SF avg' },
      { label: '1 Bed', value: '2 Units · ~720 SF avg' },
      { label: 'Rooming Unit', value: '1 Room (5-M) · $310 / mo' },
      { label: 'Total', value: '10 Apartments · ~880 SF avg' },
    ],
    ancillaryRows: [
      { label: 'Construction', value: 'Wood frame · Stucco & half-timber' },
      { label: 'Occupancy', value: '100% — All 10 Apartments Leased' },
      { label: 'Parking', value: 'Street — lot rights to be confirmed' },
    ],
    photo: '/photos/property-1.jpg',
  },
  // { id: 'second-property', name: '…', … }   // ← add entries for a portfolio BOV
]

export const IS_PORTFOLIO = PROPERTIES.length > 1
