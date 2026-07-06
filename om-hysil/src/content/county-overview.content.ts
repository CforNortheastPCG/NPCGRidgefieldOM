import type { CountyOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COUNTY_OVERVIEW: CountyOverviewContent = {
  generated: true,
  heading: "Greater Boston",
  intro:
    'Chelsea sits inside Greater Boston, a metro area of roughly 5.0 million people and one of the nation’s twelve largest. Its economy — about $571 billion — is driven by health care, higher education, and biotech, giving it deep, diversified demand for workforce housing. Median household income across the metro is about $118,000, well above Chelsea’s, underscoring the affordability role cities like Chelsea play in the region.',
  statsTitle: 'Chelsea vs. Greater Boston',
  localLabel: 'Chelsea',
  regionLabel: 'Greater Boston',
  stats: [
    { metric: 'Population', local: '~38,000', region: '~5.0 million' },
    { metric: 'Median household income', local: '~$72,000', region: '~$118,000' },
    { metric: 'Median age', local: '~34', region: '~40' },
    { metric: 'Median gross rent', local: '~$1,960', region: '~$2,020' },
  ],
  sources: 'Sources: U.S. Census Bureau (QuickFacts; ACS 2020–2024); RentCafe (2026). Figures rounded.',
  employersTitle: 'Major Area Employers',
  employerGroups: [
    {
      label: 'Health Care',
      items:
        'Mass General Brigham, the state’s largest private employer at roughly 82,000 workers, runs a Massachusetts General Hospital satellite in Chelsea; Brigham and Women’s and Boston Children’s further anchor metro employment.',
    },
    {
      label: 'Education & Biotech',
      items:
        'Harvard, MIT, Boston University, Northeastern, and Tufts draw students and research funding, feeding a life-sciences cluster that has made Greater Boston a global biotech hub.',
    },
    {
      label: 'Food & Logistics',
      items:
        'The New England Produce Center in Chelsea, one of the country’s largest wholesale terminal markets, distributes fresh food across New England and employs over a thousand people.',
    },
  ],
}
