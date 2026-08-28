import type { CountyOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COUNTY_OVERVIEW: CountyOverviewContent = {
  generated: true,
  heading: 'Southern New Hampshire',
  intro:
    'Manchester anchors Hillsborough County — at roughly 425,000 residents, New Hampshire\'s most populous county — and shares its southern tier with Nashua on the Massachusetts line. The region works as Boston\'s no-income-tax flank: New Hampshire levies no tax on wages, Boston is about an hour from downtown Manchester by car, and the state\'s median household income of roughly $96,000 ranks among the highest in the country.',
  statsTitle: 'The Property\'s One-Mile Ring vs. New Hampshire',
  localLabel: 'Within 1 Mile',
  regionLabel: 'New Hampshire',
  stats: [
    { metric: 'Population', local: '25,844', region: '~1.4 million' },
    { metric: 'Average household income', local: '$62,584', region: '~$96,000 (median)' },
    { metric: 'Average age', local: '36.1', region: '~43 (median)' },
    { metric: 'Persons per household', local: '2.1', region: '~2.4' },
  ],
  sources:
    'Sources: offering demographics (0.25–1.0 mi radii); U.S. Census Bureau QuickFacts / ACS (2020–2024). Figures rounded.',
  employersTitle: 'Major Area Employers',
  employerGroups: [
    {
      label: 'Health Care',
      items:
        'Elliot Health System — Manchester\'s largest employer — and Catholic Medical Center run the city\'s two hospital campuses, with CMC and the Dartmouth Health clinics directly across the river from the property.',
    },
    {
      label: 'Education & Technology',
      items:
        'Southern New Hampshire University, one of the country\'s largest universities by enrollment, is headquartered in Manchester; DEKA Research and the ARMI BioFabUSA institute fill the converted Amoskeag Millyard a few blocks south.',
    },
    {
      label: 'Defense & Logistics',
      items:
        'BAE Systems, New Hampshire\'s largest manufacturer, employs thousands across its southern-NH campuses, and Manchester-Boston Regional Airport gives the city its own commercial air service.',
    },
  ],
}
