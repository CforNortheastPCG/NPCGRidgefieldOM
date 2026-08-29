/* ═══════════════════ PROPERTY RECORD CARDS ═══════════════════
   Source: Town of Ware, MA assessor property cards (CAI Technologies),
   printed 6/11/2026 — one card per parcel.

   ⚠ COMPONENT RECONCILIATION: each card prints Land, Buildings, Extra
   Building Features and Outbuildings in a two-column layout that does not
   extract cleanly — the parsed sub-values do not sum to the card's own
   stated total. Land and Buildings are transcribed as printed; the
   remainder to the card's stated TOTAL is carried on one combined
   "Extra Features & Outbuildings" line. The totals below therefore match
   the cards exactly ($275,400 · $591,100 · $228,300), which is what the tax
   bills are struck on. The split between extra features and outbuildings
   should be confirmed with the Assessor if it matters to a buyer. */

export const ASSESSOR = {
  source: 'Town of Ware, MA Assessor (CAI Technologies)',
  printedDate: 'June 11, 2026',
  assessmentFy: 'FY2026',

  parcels: [
    {
      id: '60-0-130',
      location: '27 Parker St',
      owner: 'CV Ware Opportunity Zone Fund, LLC',
      mailingAddress: '1009 W Boston Post Rd, Mamaroneck, NY 10543',
      visionId: '3106',
      mapLot: '60 / 0-130',
      useDescription: 'APT 4-8',
      zoning: 'DTC',
      landAcres: 0.11,
      bookPage: '13920/49',
      priorSaleDate: 'December 30, 2020',
      priorSalePrice: null,
      units: 4,
      assessment: { land: 26800, buildings: 248000, extraFeatures: 600, outbuildings: 0 },
      building: {
        yearBuilt: '1890', style: 'APRTMT 4-8', livingArea: '2,822 SF', stories: '2H',
        totalRooms: '22', bedrooms: '11', baths: '4',
        exteriorWall: 'Vinyl', roof: 'Asphalt Shingle / Gable',
        heatType: 'Forced H/W · Oil', ac: 'None',
      },
    },
    {
      id: '61-0-10',
      location: '28-30 North St',
      owner: 'CV Ware Opportunity Zone Fund, LLC',
      mailingAddress: '1009 W Boston Post Rd, Mamaroneck, NY 10543',
      visionId: '3308',
      mapLot: '61 / 0-10',
      useDescription: 'APT 4-8',
      zoning: 'DTC',
      landAcres: 0.55,
      bookPage: '13920/49',
      priorSaleDate: 'December 30, 2020',
      priorSalePrice: null,
      units: 14,
      assessment: { land: 30100, buildings: 542900, extraFeatures: 18100, outbuildings: 0 },
      building: {
        yearBuilt: '1932', style: 'APRTMT 4-8', livingArea: '6,800 SF', stories: '2',
        totalRooms: '24', bedrooms: '8', baths: '8',
        exteriorWall: 'Asbestos', roof: 'Asphalt Shingle / Gable',
        heatType: 'Forced H/A · Oil', ac: 'None',
      },
    },
    {
      id: '61-0-11',
      location: '38 North St',
      owner: 'CV Ware Opportunity Zone Fund, LLC',
      mailingAddress: '1009 W Boston Post Rd, Mamaroneck, NY 10543',
      visionId: '3319',
      mapLot: '61 / 0-11',
      useDescription: 'TWO FAM',
      zoning: 'DTC',
      landAcres: 0.17,
      bookPage: '13920/49',
      priorSaleDate: 'December 30, 2020',
      priorSalePrice: null,
      units: 2,
      assessment: { land: 27500, buildings: 178600, extraFeatures: 22200, outbuildings: 0 },
      building: {
        yearBuilt: '1880', style: 'MULTI 2FAM', livingArea: '1,576 SF', stories: '2A',
        totalRooms: '8', bedrooms: '4', baths: '2',
        exteriorWall: 'Vinyl', roof: 'Asphalt Shingle / Gable',
        heatType: 'Forced H/W · Oil', ac: 'None',
      },
    },
  ],

  // Portfolio-level fallback (single-parcel layout only).
  building: {
    style: 'Apartment / Two-Family', yearBuilt: '1880 – 1932', stories: '2 – 2.5',
    livingArea: '11,198 SF (assessor)', exteriorWall: 'Vinyl & Asbestos',
    roof: 'Asphalt Shingle / Gable', heatType: 'Forced Hot Water & Hot Air · Oil', ac: 'None',
  },

  note:
    'All three parcels were acquired together on December 30, 2020 for $1,025,000 and are carried by the Town at a combined $1,094,800 — roughly 43% of the recommended asking price. A sale would very likely draw an assessment adjustment at the next revaluation; a buyer should underwrite taxes on the purchase price rather than the current assessment. See the Real Estate Taxes page for that scenario.',

  sourceNote:
    'Source: Town of Ware assessor property cards printed June 11, 2026 (CAI Technologies). Assessor data is believed correct but is not warranted by the municipality. The cards record 11,198 SF of living area against 13,875 rentable SF on the rent roll, and their unit classifications (APT 4-8, TWO FAM) predate the current configuration — both should be confirmed with the Assessor and the Building Department in diligence.',
}
