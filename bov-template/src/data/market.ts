/* ═══════════════════ EDIT-ME · MARKET SECTION ═══════════════════
   Two pages: Market Overview (narrative + demographics vs state averages +
   employers) and Market Activity (new developments + laws/regulations).
   Demographics: cite ACS 5-Year Estimates and mark values approximate. */

export const MARKET = {
  overview: {
    town: 'Anytown',                 // SAMPLE — replace (column header)
    state: 'Connecticut',            // SAMPLE — replace (comparison column header)
    titleAccent: 'Anytown',          // SAMPLE — the highlighted word in the title
    subtitle: 'A Stable, Supply-Constrained Rental Market', // SAMPLE — replace
    paragraphs: [ // SAMPLE — replace
      'Anytown is a established Connecticut community whose rental demand is anchored by a walkable town center, commuter access to the regional employment core, and a durable base of local employers. Vacancy across the submarket’s small-to-mid-size apartment stock has held below the state average for a decade.',
      'For an owner, the takeaway is simple: household incomes in Anytown run ahead of the state average while the rental stock stays effectively fixed — new multifamily supply is limited by zoning and land cost, so well-kept existing buildings capture rent growth as leases turn.',
    ],
    // Local vs state comparison — the "incomes vs state averages" table.
    demographics: [ // SAMPLE — replace with ACS figures for the actual market
      { metric: 'Population', local: '~29,500', state: '~3.6M' },
      { metric: 'Households', local: '~11,400', state: '~1.4M' },
      { metric: 'Median Household Income', local: '~$98,000', state: '~$90,000' },
      { metric: 'Median Home Value', local: '~$385,000', state: '~$340,000' },
      { metric: 'Renter-Occupied Housing', local: '~31%', state: '~34%' },
      { metric: 'Median Age', local: '~42', state: '~41' },
    ],
    sourceNote: 'Source: U.S. Census ACS 5-Year Estimates (approximate; verify independently).',
    employers: [ // SAMPLE — replace
      { label: 'Local', items: 'Regional medical center, the public school district and town government, and town-center retail and services anchor the local job base.' },
      { label: 'Regional (~25 min)', items: 'The metro employment core — hospital systems, corporate campuses, and a state university — is a direct commute via the interstate.' },
      { label: 'Statewide reach', items: 'Rail and highway access put the state’s major employment centers within commuting range, broadening the tenant pool.' },
    ],
    photos: ['/photos/market-1.jpg', '/photos/market-2.jpg'],
  },

  activity: {
    intro:
      'What’s happening around the property shapes what a buyer will pay for it. Two forces matter here: announced development that signals institutional confidence in the submarket, and the regulatory calendar every underwriter prices in.', // SAMPLE — adjust
    developments: [ // SAMPLE — replace with real projects
      { title: 'Town Center Streetscape Project', meta: 'Public · Under construction · Est. 2027', body: 'A municipally funded streetscape and parking improvement program along the Main Street corridor — directly supporting walkability, the submarket’s core rental amenity.' },
      { title: 'Riverside Mixed-Use Redevelopment', meta: 'Private · Approved · 48 units + retail', body: 'The first new multifamily approval in the town center in a decade. New Class A supply at premium rents establishes a visible rent ceiling well above the subject’s pro forma.' },
      { title: 'Route 1 Medical Office Expansion', meta: 'Private · Announced', body: 'A regional health system’s outpatient expansion adds daytime employment within two miles — a durable demand driver for nearby workforce rentals.' },
    ],
    regulations: [ // SAMPLE — replace with the actual jurisdiction's items
      { title: 'Property Revaluation Cycle', body: 'The town’s next state-mandated revaluation is scheduled for 2028, effective the following grand list. Buyers will underwrite the current assessment through that date — tax certainty a broker can market.' },
      { title: 'Rental Licensing & Inspections', body: 'The town requires periodic rental housing registration and life-safety inspection. The subject’s current compliance is a diligence asset — files transfer at closing.' },
      { title: 'State Landlord-Tenant Updates', body: 'Recent state legislation adjusted notice periods and late-fee caps. No material impact on the subject’s underwriting; buyers will confirm lease forms are current.' },
    ],
    sourceNote: 'Development and regulatory items per municipal records and public reporting; verify status independently.',
  },
}
