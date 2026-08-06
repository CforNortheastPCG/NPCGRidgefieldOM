/* ═══════════════════ EDIT-ME · MARKET SECTION ═══════════════════
   Two pages: Market Overview (narrative + demographics vs state averages +
   employers) and Market Activity (new developments + laws/regulations).
   Demographics: cite ACS 5-Year Estimates and mark values approximate.

   ⚠ FIRST DRAFT — demographics are ACS-order-of-magnitude figures for West
   Haven and should be refreshed against the current ACS table before this
   goes out. Development items need confirmation against City of West Haven
   P&Z records. */

export const MARKET = {
  overview: {
    town: 'West Haven',
    state: 'Connecticut',
    titleAccent: 'West Haven',
    subtitle: 'A Dense, Transit-Served Rental Market on New Haven’s Doorstep',
    paragraphs: [
      'West Haven is a coastal city of roughly 55,000 immediately west of New Haven, and its rental market is defined by two things: proximity and price. The subject sits in the Central Business District at Main Street and Washington Avenue, a mile and a half from the West Haven Metro-North station on the New Haven Line and within a ten-minute drive of Yale University, Yale New Haven Hospital, and the New Haven central business district. Renters priced out of New Haven proper have consistently absorbed West Haven’s older walk-up stock.',
      'For an owner, the takeaway is that demand is not the constraint — pricing is. Incomes and home values run below the Connecticut average, capping the top of the rent band, but the city’s renter-occupied share is well above the state’s and virtually no new market-rate supply has reached the CBD. Well-located existing buildings capture rent growth as leases turn — precisely the mechanism this property has not yet been run through.',
    ],
    // Local vs state comparison — the "incomes vs state averages" table.
    demographics: [
      { metric: 'Population', local: '~55,000', state: '~3.6M' },
      { metric: 'Households', local: '~21,000', state: '~1.4M' },
      { metric: 'Median Household Income', local: '~$68,000', state: '~$91,000' },
      { metric: 'Median Home Value', local: '~$255,000', state: '~$343,000' },
      { metric: 'Renter-Occupied Housing', local: '~44%', state: '~34%' },
      { metric: 'Median Age', local: '~39', state: '~41' },
    ],
    sourceNote: 'Source: U.S. Census ACS 5-Year Estimates (approximate; verify independently before distribution).',
    employers: [
      { label: 'Local', items: 'The University of New Haven, the West Haven VA Medical Center, the city school district, and the Campbell Avenue retail corridor anchor the local job base.' },
      { label: 'New Haven (~10 min)', items: 'Yale University and Yale New Haven Hospital — the region’s two largest employers — plus the New Haven CBD, minutes away.' },
      { label: 'Regional reach', items: 'Metro-North puts Stamford and Manhattan on a one-seat ride; I-95 widens the pool further.' },
    ],
    photos: ['/photos/market-1.jpg', '/photos/market-2.jpg'],
  },

  activity: {
    intro:
      'What’s happening around the property shapes what a buyer will pay for it. Two forces matter here: announced development that signals confidence in the submarket, and the regulatory calendar every underwriter prices in. Items below are drawn from public reporting and municipal records and should be re-confirmed before distribution.',
    developments: [
      { title: 'The Haven / Sawmill Road Waterfront Site', meta: 'Private · Long-stalled · Redevelopment pending', body: 'The city’s largest waterfront redevelopment parcel. Any resolution here would be the single biggest signal to institutional capital that West Haven is investable — and would reset land pricing citywide.' },
      { title: 'West Haven Station TOD Corridor', meta: 'Public / Private · Ongoing', body: 'Transit-oriented development around the Metro-North station continues to attract proposals. New Class A supply at premium rents establishes a visible rent ceiling well above the subject’s pro forma.' },
      { title: 'University of New Haven Enrollment', meta: 'Institutional · Ongoing', body: 'Sustained enrollment keeps a floor under demand for small-unit rental stock across the city — directly relevant to a building that is entirely one-bedroom.' },
    ],
    regulations: [
      { title: 'Assessment & Revaluation', body: 'The subject’s 2024 appraised value is $1,087,300 ($761,110 assessed), a substantial increase over the $619,500 carried in 2021–2023. Taxes are underwritten at the current assessment; a buyer will price the next revaluation cycle, not the last one.' },
      { title: 'Landlord-Paid Utilities', body: 'Heat, hot water, water/sewer and trash are all landlord-paid — roughly $23,900 a year. Any conversion to tenant-paid heat requires separate metering and turns at lease renewal; buyers will underwrite this as upside, not as in-place.' },
      { title: 'State Landlord-Tenant Updates', body: 'Recent Connecticut legislation adjusted notice periods and late-fee caps. No material impact on the subject’s underwriting; buyers will confirm lease forms are current, including the Section 8 HAP contract on unit 1-M.' },
    ],
    sourceNote: 'Development and regulatory items per municipal records and public reporting; assessment figures per Vision Government Solutions (PID 11127). Verify status independently.',
  },
}
