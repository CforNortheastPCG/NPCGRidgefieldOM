/* ═══════════════════ EDIT-ME · PROPERTY RECORD CARD ═══════════════════
   Assessor data, transcribed from the municipal property record card.
   Feeds the "Property Record Card" page. Every total — assessed value,
   per-unit, per-SF, and the ratio to the asking price — is COMPUTED in
   lib/calc.js. Enter only the component values.

   ── ONE PARCEL OR MANY ──────────────────────────────────────────────
   `parcels` drives the layout. One entry renders the three-column card
   (parcel & ownership · building detail · assessment). Two or more render
   a comparison table with a portfolio-total column, and the per-parcel
   `assessment` values are summed.

   Transcribe what the card says, even where it is odd (a card reading
   "Apts >8" for a 7-unit building is the assessor's classification, not a
   typo). Where the card disagrees with the rent roll, say so in `note` —
   that discrepancy is diligence information, not an error to smooth over.

   Set the whole export to null if you have no card; the page drops out. */

export const ASSESSOR = {
  source: 'Town of Anytown Assessor',        // SAMPLE — replace
  printedDate: 'August 5, 2026',             // SAMPLE — replace: card print date

  parcels: [ // SAMPLE — replace
    {
      id: '52-0-75',                                    // Parcel ID / Map-Block-Lot
      location: '12 Example Street',
      owner: 'Example Holdings, LLC',
      mailingAddress: '100 Owner Road, Anytown, CT',
      visionId: '2222',
      mapLot: '52 / 0-75',
      useDescription: 'APTS >8',
      zoning: 'RM-2',
      landAcres: 0.52,
      bookPage: '14243 / 340',
      priorSaleDate: 'August 27, 2021',
      priorSalePrice: 1840000,
      units: 12,                                        // units per the RENT ROLL, for reconciliation
      // Assessed components — the page sums these; do not pre-total.
      assessment: { land: 333600, buildings: 1225500, outbuildings: 600, extraFeatures: 0 },
    },
  ],

  // Fiscal year the assessment above belongs to.
  assessmentFy: 'FY2026',                    // SAMPLE — replace

  // Construction / mechanical detail from the card.
  building: { // SAMPLE — replace
    style: 'Apartment — General',
    yearBuilt: '1968',
    stories: '3',
    livingArea: '9,400 SF',
    totalBaths: '12',
    foundation: 'Concrete',
    frame: 'Wood',
    exteriorWall: 'Vinyl',
    interiorWall: 'Drywall',
    roof: 'Asphalt Shingle / Gable',
    flooring: 'Hardwood & Carpet',
    heatType: 'Electric Baseboard / Electric',
    ac: 'None',
    kitchenBathStyle: 'Modern',
  },

  /* The one thing on this page a reader should take away — usually how far
     below the asking price the town carries the property, and what that
     means for a buyer's tax underwriting. */
  note:
    'The town carries the property well below the recommended asking price. A sale at that pricing would likely draw an assessment adjustment at the next revaluation; buyers should underwrite taxes accordingly rather than on the current assessment.', // SAMPLE — replace

  sourceNote:
    'Source: municipal property record card, printed on the date shown. Assessor data is believed correct but is not warranted by the municipality and should be confirmed with the Assessor’s office in diligence.', // SAMPLE — adjust
}
