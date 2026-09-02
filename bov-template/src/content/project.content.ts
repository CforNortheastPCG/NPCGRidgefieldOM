import type { ProjectContent } from './types.ts'

/* AUTHORED PROSE for The Project page. Set generated: true once written for
   this deal. Numbers on the page come from src/data/ and src/lib/calc.ts —
   never restate one here that the page already computes. */
export const PROJECT_CONTENT: ProjectContent = {
  generated: false, // SAMPLE COPY — flip to true once authored for this deal
  paragraphs: [ // SAMPLE — replace
    'Northeast Private Client Group is pleased to present this Broker Opinion of Value for **Maple Court Apartments**, a 12-unit apartment building at 12 Example Street in Anytown, Connecticut. This analysis was prepared at the request of ownership to establish the property’s probable market value and to outline how NPCG would position, market, and sell the asset if engaged.',
    'Our conclusions draw on the property’s in-place rent roll and owner-reported operating figures, current market rents for comparable units, recent comparable sales in the submarket, and our direct experience closing similar assets in this market. The result is a supportable trade range — not a single number — reflecting how competing buyers would realistically underwrite the property today.',
  ],
  summary:
    '12 units on 0.52 acres, fully occupied, separately metered with tenant-paid heat — and rents below what the same floor plans already achieve.', // SAMPLE — replace
  highlights: [ // SAMPLE — replace
    { title: 'Mark-to-market on turnover', body: '$26,400 of annual upside at rents already achieved in-house. Leasing, not capital.' },
    { title: 'Tenants pay their own utilities', body: 'Separately metered, tenant-paid heat and power. Expense load holds near 31% of EGI.' },
    { title: 'Stabilized physical plant', body: 'Roof 2018, water heaters 2020. Near-term capital is elective, not deferred.' },
    { title: 'Financeable in place', body: '1.28x DSCR at 65% leverage, 3.9% cash-on-cash today rising to 6.7% stabilized.' },
  ],
}
