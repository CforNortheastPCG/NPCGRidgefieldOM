import type { RentCompsData } from '../lib/types.ts'
/* ═══════════════════ EDIT-ME · RENT COMPARABLES ═══════════════════
   Competing rentals supporting the pro-forma (market) rents (3–6 comps).
   Rent/SF is COMPUTED. The page also shows the subject's in-place vs
   pro-forma averages by unit type, derived from rentRoll.js. */

export const RENT_COMPS: RentCompsData = {
  commentary:
    'Achieved rents at competing properties support the pro-forma rents applied in the underwriting — the subject’s in-place rents sit measurably below what comparable units command today.', // SAMPLE — replace
  comps: [ // SAMPLE — replace every entry
    {
      address: '31 Sample Avenue', city: 'Anytown, CT', unitType: '1BR / 1BA',
      sqft: 675, rent: 1595, notes: 'Renovated kitchen; on-site laundry',
    },
    {
      address: '210 Placeholder Street', city: 'Nearville, CT', unitType: '2BR / 1BA',
      sqft: 875, rent: 1950, notes: 'Similar finish level; tenant-paid heat',
    },
    {
      address: '14 Specimen Court', city: 'Anytown, CT', unitType: '2BR / 1BA',
      sqft: 820, rent: 1875, notes: 'Older finishes; includes parking',
    },
    {
      address: '92 Example Road', city: 'Otherton, CT', unitType: '3BR / 1BA',
      sqft: 1080, rent: 2295, notes: 'Townhome-style; in-unit laundry',
    },
  ],
}
