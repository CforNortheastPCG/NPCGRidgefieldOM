/* ═══════════════════ EDIT-ME · YOUR ADVISORS ═══════════════════
   The deal team presenting this BOV (1–4 people). Feeds the "Your Advisors"
   page — headshot, contact, a short track-record bio, and three stat tiles
   per advisor. Headshots: drop files in public/photos/team/ — a missing
   photo renders an initials placeholder.

   `stats` is 3 tiles per advisor ({ v: value, l: label }). Keep values short
   — they render at 22px. Pull them from the NPCG Salesforce MCP
   (`broker_stats`, which returns career + YTD volume, transactions, units,
   and active listings) and note the pull date below so they can be refreshed.

   STATS PULLED: 08.03.2026 via broker_stats. */

export const ADVISORS = [
  {
    name: 'Brad Balletto',
    title: 'Managing Director, Investments',
    phone: '(203) 307-1574',
    email: 'bballetto@northeastpcg.com',
    photo: '/photos/team/brad-balletto.jpg',
    bio: 'Brad leads NPCG’s Connecticut investment sales practice and is the firm’s top-ranked producer by commission, career and year-to-date. His transaction history runs to **341 closings** and **$1.45 billion** in aggregate consideration, concentrated in the private-client multifamily segment this property sits in. In 2026 alone he has closed **24 transactions** totalling **$98.6 million** and **905 units**, and currently carries **18 active listings**.',
    stats: [
      { v: '$1.45B', l: 'Career Volume' },
      { v: '341', l: 'Career Closings' },
      { v: '905', l: 'Units Sold YTD' },
    ],
  },
  {
    name: 'Derek Mahabir',
    title: 'Investment Associate',
    phone: '(203) 751-1187',
    email: 'dmahabir@northeastpcg.com',
    photo: '/photos/team/derek-mahabir.jpg',
    bio: 'Derek handles underwriting, market research, and buyer coverage for the New Haven County assignments on Brad’s team — including the rent and sales comparable work behind this opinion. He has closed **$22.3 million** across **7 transactions** to date, **$14.9 million** and **58 units** of it in 2026, and is the day-to-day point of contact through marketing and diligence.',
    stats: [
      { v: '$22.3M', l: 'Career Volume' },
      { v: '58', l: 'Units Sold YTD' },
      { v: '4', l: 'Active Listings' },
    ],
  },
]

/* Full confidentiality & disclaimer text — its own page, immediately after
   Your Advisors. Firm-standard NPCG language — edit only if legal copy
   changes. */
export const DISCLAIMER_PARAGRAPHS = [
  "All materials and information received or derived from NortheastPCG, Inc. its directors, officers, agents, advisors, affiliates and/or any third party sources are provided without representation or warranty as to completeness, veracity, or accuracy, condition of the property, compliance or lack of compliance with applicable governmental requirements, developability or suitability, financial performance of the property, projected financial performance of the property for any party's intended use or any and all other matters.",
  "Neither NortheastPCG, Inc. its directors, officers, agents, advisors, or affiliates makes any representation or warranty, express or implied, as to accuracy or completeness of the any materials or information provided, derived, or received. Materials and information from any source, whether written or verbal, that may be furnished for review are not a substitute for a party's active conduct of its own due diligence to determine these and other matters of significance to such party. NortheastPCG, Inc. will not investigate or verify any such matters or conduct due diligence for a party unless otherwise agreed in writing.",
  "**Each party shall conduct its own independent investigation and due diligence.**",
  "Any party contemplating or under contract or in escrow for a transaction is urged to verify all information and to conduct their own inspections and investigations including through appropriate third party independent professionals selected by such party. All financial data should be verified by the party including by obtaining and reading applicable documents and reports and consulting appropriate independent professionals. NortheastPCG, Inc. makes no warranties and/or representations regarding the veracity, completeness, or relevance of any financial data or assumptions. NortheastPCG, Inc. does not serve as a financial advisor to any party regarding any proposed transaction. All data and assumptions regarding financial performance, including that used for financial modeling purposes, may differ from actual data or performance. Any estimates of market rents and/or projected rents that may be provided to a party do not necessarily mean that rents can be established at or increased to that level. Parties must evaluate any applicable contractual and governmental limitations as well as market conditions, vacancy factors and other issues in order to determine rents from or for the property.",
  "Legal questions should be discussed by the party with an attorney. Tax questions should be discussed by the party with a certified public accountant or tax attorney. Title questions should be discussed by the party with a title officer or attorney. Questions regarding the condition of the property and whether the property complies with applicable governmental requirements should be discussed by the party with appropriate engineers, architects, contractors, other consultants and governmental agencies. All properties and services are marketed by NortheastPCG, Inc. in compliance with all applicable fair housing and equal opportunity laws.",
]

/* Condensed version for the TOC page's side column (~3 short paragraphs). */
export const DISCLAIMER_CONDENSED = [
  'This Broker Opinion of Value has been prepared by NortheastPCG, Inc. solely for the use of the party to whom it is addressed. It is an opinion of probable market value — it is not an appraisal and has not been prepared in accordance with USPAP.',
  'All materials and information are provided without representation or warranty as to completeness or accuracy. Figures are drawn from owner-provided information and market sources deemed reliable but not verified.',
  'Each party should conduct its own independent investigation and consult its own legal, tax, and financial advisors before acting on any conclusion presented herein.',
]
