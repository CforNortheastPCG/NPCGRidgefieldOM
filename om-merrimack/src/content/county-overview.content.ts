import type { CountyOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COUNTY_OVERVIEW: CountyOverviewContent = {
  generated: true,
  heading: 'Greater Boston',
  intro:
    'Lowell anchors the northern edge of Greater Boston, a metro of roughly 5.0 million people whose economy — about $571 billion, among the nation’s twelve largest — runs on health care, higher education, and biotech. Metro asking rents average $3,011 per unit against $2,234 in Lowell’s 3–5 star submarket and $1,914 at the subject, the affordability gap that keeps workforce demand pointed at cities like Lowell.',
  statsTitle: 'Lowell vs. Greater Boston',
  localLabel: 'Lowell',
  regionLabel: 'Greater Boston',
  stats: [
    { metric: 'Population', local: '~118,000', region: '~5.0 million' },
    { metric: 'Median household income', local: '~$78,700', region: '~$118,000' },
    { metric: 'Avg apartment asking rent', local: '$2,234 (3–5★ submarket)', region: '$3,011' },
    { metric: 'Apartment vacancy', local: '4.8% (3–5★ submarket)', region: '5.7%' },
  ],
  sources: 'Sources: U.S. Census Bureau (ACS 2024); CoStar (Jul 2026). Figures rounded.',
  employersTitle: 'Major Area Employers',
  employerGroups: [
    {
      label: 'Education',
      items:
        'UMass Lowell enrolls more than 18,000 students — the second-largest public university in Massachusetts — and Middlesex Community College’s Lowell campus sits blocks from the property at Kearney Square.',
    },
    {
      label: 'Health Care',
      items:
        'Tufts Medicine’s Lowell General Hospital employs roughly 2,300 locally, while Mass General Brigham — the state’s largest private employer at about 82,000 — anchors the metro’s medical economy.',
    },
    {
      label: 'Regional Economy',
      items:
        'Greater Boston’s biotech, higher-education, and health-care base drives housing demand across the metro; Lowell’s 12-month submarket sales volume ran $38.87 million at $245,320 per unit market-wide.',
    },
  ],
}
