import type { CountyOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COUNTY_OVERVIEW: CountyOverviewContent = {
  generated: true,
  heading: 'Greater Worcester',
  intro:
    "Worcester County is the second-most populous county in Massachusetts, with roughly 881,000 residents (2024) and a median household income near $95,900. Anchored by the city of Worcester, the region runs on an 'eds and meds' economy — health care and higher education — supported by manufacturing and distribution employers spread along its highway corridors.",
  statsTitle: 'Worcester vs. Worcester County',
  localLabel: 'Worcester',
  regionLabel: 'Worcester County',
  stats: [
    { metric: 'Population (2024)', local: '~211,000', region: '~881,000' },
    { metric: 'Median household income', local: '~$70,100', region: '~$95,900' },
    { metric: 'Per capita income', local: '~$33,600', region: '~$61,800' },
    { metric: 'Renter-occupied share', local: '~57%', region: '~36%' },
  ],
  sources: 'Sources: U.S. Census Bureau QuickFacts and ACS (2024); Point2Homes (2024). Figures rounded.',
  employersTitle: 'Major Employers',
  employerGroups: [
    {
      label: 'Health Care',
      items:
        'UMass Memorial Health is the region\'s largest employer with more than 10,000 workers, joined by UMass Chan Medical School, Saint Vincent Hospital, and Fallon Health.',
    },
    {
      label: 'Higher Education',
      items:
        'Worcester Polytechnic Institute, the College of the Holy Cross, and Clark University draw thousands of students, faculty, and staff to the city each year.',
    },
    {
      label: 'Industry & Distribution',
      items:
        'MSC Industrial Supply anchors a diversified base of manufacturing and distribution employers spread across the county\'s highway corridors.',
    },
  ],
}
