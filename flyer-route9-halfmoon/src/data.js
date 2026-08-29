/* ═══════════════════ ROUTE 9, HALFMOON — FLYER DATA ═══════════════════
   Four-page investment brief for the ±1.32-acre commercial development site
   on Route 9 in Halfmoon (Clifton Park mailing), Saratoga County, NY.

   Parcel facts are transcribed from the CRS Property Report (RR 9, pulled
   07/10/2026) kept alongside this file as CRS-Property-Report-RR9.pdf.
   Anything not in that report is marked TBD rather than estimated.

   Photos: drop files in public/photos/ (see `photos` below). Missing files
   fall back to a neutral placeholder tile, so the deck renders complete
   before the drone shoot lands.                                            */

export const FIRM_BIO =
  'Northeast Private Client Group is a relationship-driven investment real estate firm delivering institutional-level expertise, service, and value to private investors of multifamily, mixed-use, retail, and land assets across the Northeast.'

export const BROKERS = [
  {
    name: 'James Morrissey',
    title: 'Vice President, Investment Sales — Capital Region, NY',
    phone: '518.982.2021 x143',
    cell: '315.569.6585',
    email: 'jmorrissey@northeastpcg.com',
    photo: '/photos/team/James-Morrissey.jpg',
  },
]

export const OFFICE = '401 New Karner Road, 3rd Floor · Albany, NY 12205'

export const ROUTE9 = {
  name: '±1.32 Acres on Route 9',
  cityState: 'Halfmoon, New York',
  addresses: 'Route 9 (US-9) · Town of Halfmoon · Saratoga County',
  eyebrow: 'For Sale · Commercial Development Site',
  url: 'northeastpcg.com',

  photos: {
    hero: '/photos/hero.jpg',                  // Page 1 cover — drone, Route 9 frontage
    retailAerial: '/photos/retail-aerial.png', // Page 3 — trade-area retail aerial (in hand)
  },

  // Page 3 aerial framing — CSS zoom into the subject pin for the page-2 inset.
  siteInset: { scale: 2.5, originX: '96%', originY: '100%' },
  siteCaption:
    'Subject site pinned on Route 9 south of the Route 146 interchange · ±1.32 acres · Imagery © 2026 Airbus / CNES / Maxar',
  retailCaption:
    'Route 9 retail corridor — Clifton Park Center, Village Plaza, Walmart, and the I-87 Exit 9 node north of the subject site.',

  // Page 2 lead
  lead:
    '±1.32 acres of commercially zoned vacant land with ±312 feet of frontage on Route 9 in the Town of Halfmoon — municipal water and sewer at the site, FEMA Zone X, and a clear, unimproved lot ready for a build-to-suit or owner-user facility on one of Saratoga County’s busiest commercial corridors.',

  coverStats: [
    { v: 'TBD', l: 'Asking Price' },
    { v: '±1.32 AC', l: 'Land Area' },
    { v: '±312 FT', l: 'Route 9 Frontage' },
    { v: '57,499 SF', l: 'Lot Size' },
    { v: 'Commercial', l: 'Zoning' },
    { v: 'Municipal', l: 'Water & Sewer' },
  ],

  overview: [
    'The site is a clean, unimproved commercial parcel roughly three miles south of the Route 146 / I-87 Exit 9 interchange that anchors the Capital Region’s strongest suburban retail node. There are no buildings and nothing to demolish — a buyer starts with a level lot, ±312 feet of highway frontage, municipal water and sewer already at the property, and a FEMA Zone X designation. Zoning is commercial under the Town of Halfmoon code; permitted uses and site-plan requirements should be confirmed directly with the Town.',
  ],

  facts: [
    { label: 'Asking Price', value: 'TBD', accent: true },
    { label: 'Location', value: 'Route 9 (US-9), Halfmoon, NY 12065' },
    { label: 'County', value: 'Saratoga County · Town of Halfmoon' },
    { label: 'Land Area', value: '±1.32 ac (57,499 SF)' },
    { label: 'Frontage', value: '±312.4 ft on Route 9' },
    { label: 'Zoning', value: 'Commercial (assessor use code 05)' },
    { label: 'Utilities', value: 'Municipal water & municipal sewer' },
    { label: 'Flood Zone', value: 'Zone X — minimal hazard' },
    { label: 'Parcel ID', value: '285.1-1-38.1 (SWIS 413800)' },
    { label: 'Assessment (2025)', value: '$105,700' },
    { label: 'Taxes (2025)', value: '$4,438.75' },
    { label: 'School District', value: 'Shenendehowa CSD' },
    { label: 'Traffic Count', value: 'TBD — NYSDOT' },
  ],

  // Page 2 — how the site is being positioned
  paths: [
    {
      tag: 'Build-to-Suit',
      body: 'A serviced, level lot with highway frontage — sized for a single-tenant build-to-suit delivered on a compressed timeline.',
    },
    {
      tag: 'Owner-User Facility',
      body: 'A business already operating on the Route 9 corridor can own its own building instead of leasing, with visibility and direct highway access.',
    },
    {
      tag: 'Auto / Service / Contractor',
      body: 'Kenworth Northeast sits immediately south, and the stretch of Route 9 toward the Mohawk River carries the corridor’s auto, service, and light-industrial users.',
    },
    {
      tag: 'Land Bank',
      body: 'Low carrying cost — $4,439 in 2025 taxes on a $105,700 assessment — while Halfmoon and Clifton Park continue to absorb commercial demand.',
    },
  ],

  highlights: [
    '±312 feet of frontage on Route 9, one of Saratoga County’s primary commercial corridors.',
    'Municipal water and municipal sewer already serving the site — no septic or well.',
    'Vacant and unimproved: no demolition, no existing structures, no tenants to relocate.',
    'FEMA Zone X (minimal flood hazard) despite proximity to the Mohawk River.',
    'Low carrying cost — $4,439 of 2025 taxes on a $105,700 assessed value.',
  ],

  watch: [
    'Confirm permitted uses, setbacks, and site-plan review with the Town of Halfmoon before pricing a deal.',
    'Route 9 traffic counts to be pulled from NYSDOT — not yet verified.',
    'Curb-cut and access approvals on a state highway run through NYSDOT Region 1.',
    'No survey, wetlands delineation, or Phase I has been provided; buyer to confirm.',
  ],

  forDiscussion: [
    'Target use — build-to-suit, owner-occupied facility, or land bank?',
    'Timeline to entitlement, and appetite for carrying the site through Town approvals?',
    'Value with a curb cut and site plan in hand versus as raw, unentitled land?',
  ],

  // Page 4 — drone shots (pending)
  closingPhotos: [
    { src: '/photos/close-1.jpg', cap: 'Route 9 frontage' },
    { src: '/photos/close-2.jpg', cap: 'Overhead — site & frontage' },
    { src: '/photos/close-3.jpg', cap: 'Aerial — Mohawk River context' },
  ],
}
