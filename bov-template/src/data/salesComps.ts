import type { SalesCompsData } from '../lib/types.ts'
/* ═══════════════════ EDIT-ME · SALES COMPARABLES ═══════════════════
   Recent submarket sales supporting the valuation (3–6 comps; 1–3 render
   full-width stacked, 4–6 in a two-column grid). Price/unit and price/SF
   are COMPUTED where units/gla are given. Pull candidates from CoStar or
   the NPCG Salesforce closed-deal pipeline and paste in. */

export const SALES_COMPS: SalesCompsData = {
  commentary:
    'The comparables above bracket the subject on price per unit and cap rate. Adjusted for unit mix and condition, they support the concluded trade range presented in the Valuation section.', // SAMPLE — replace
  comps: [ // SAMPLE — replace every entry
    {
      address: '45 Sample Avenue', city: 'Anytown, CT', type: '10-Unit Multifamily',
      date: 'May 2026', price: 1950000, units: 10, gla: 8100, capRate: '6.9%',
      notes: 'Similar vintage; tenant-paid utilities',
    },
    {
      address: '210 Placeholder Street', city: 'Nearville, CT', type: '16-Unit Multifamily',
      date: 'Feb 2026', price: 3350000, units: 16, gla: 13200, capRate: '6.6%',
      notes: 'Renovated units at market rents',
    },
    {
      address: '8 Specimen Lane', city: 'Anytown, CT', type: '8-Unit Multifamily',
      date: 'Nov 2025', price: 1480000, units: 8, gla: 6400, capRate: '7.1%',
      notes: 'Deferred maintenance; below-market rents',
    },
    {
      address: '77 Example Boulevard', city: 'Otherton, CT', type: '14-Unit Multifamily',
      date: 'Aug 2025', price: 2900000, units: 14, gla: 11500, capRate: '6.8%',
      notes: 'Stabilized; sold to 1031 buyer',
    },
  ],
}
