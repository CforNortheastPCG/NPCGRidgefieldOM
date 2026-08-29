/* ═══════════════════ INCOME & EXPENSES ═══════════════════
   Source: "Ware Portfolio - Workbook 06.2026.xlsx" → Analysis tab operating
   block (G2:P27), which carries all three columns. Annual dollars.

   The three columns, as the workbook has them:
     T-12       $293,037 of effective rental income with no gross potential
                rent or loss-to-lease stated. Management runs at 3% and
                payroll at $9,000.
     Current    In-place rents, 5% vacancy, management normalized to 5% of
                EGI, payroll trimmed to $5,000.
     Pro Forma  Type-level stabilized rents, same expense structure, plus
                $3,000 of laundry income.

   Every non-management expense line is held flat across all three columns
   in the source — these are the analyst's stabilized estimates, not three
   separate observations. Only real estate tax is corroborated by a
   third-party document (the FY2026 bills); see taxes.js. */

export const VACANCY_PCT = 5
export const MGMT_PCT = 5

export const T12_EFFECTIVE_RENTAL_INCOME = 293037
export const T12_LABEL = 'Per Ownership Workbook'

export const OTHER_INCOME = [
  { label: 'Laundry Income', t12: 0, current: 0, proforma: 3000 },
]

export const EXPENSES = [
  { label: `Property Management (${MGMT_PCT}%)`, t12: 9073, current: 0, proforma: 0, mgmt: true },
  { label: 'Real Estate Taxes',        t12: 15460.69, current: 15460.69, proforma: 15460.69 },
  { label: 'Property Insurance',       t12: 12283,    current: 12283,    proforma: 12283 },
  { label: 'Water & Sewer',            t12: 11613.95, current: 11613.95, proforma: 11613.95 },
  { label: 'Electric & Gas',           t12: 3812.30,  current: 3812.30,  proforma: 3812.30 },
  { label: 'Trash Removal',            t12: 8561,     current: 8561,     proforma: 8561 },
  { label: 'Repairs & Maintenance',    t12: 10000,    current: 10000,    proforma: 10000 },
  { label: 'Landscaping / Snow',       t12: 9073,     current: 9073,     proforma: 9073 },
  { label: 'Payroll / Part-Time Super', t12: 9000,    current: 5000,     proforma: 5000 },
]

export const FIN_NOTES = [
  'Source: ownership operating workbook dated June 2026. The trailing-twelve column reflects effective rental income only — the workbook states no gross potential rent or loss-to-lease for that period — and carries management at 3% with $9,000 of payroll.',
  'Current and pro forma normalize management to 5% of effective gross income, apply a 5% vacancy factor, and trim payroll to $5,000. Every other expense line is held flat across all three columns as an ownership estimate; only real estate tax is corroborated by a third-party document.',
  '⚠ NO HEATING FUEL LINE. The assessor cards record oil-fired central heat at all three buildings (forced hot water at 27 Parker and 38 North, forced hot air at 28-30 North), and the operating statement carries no fuel expense — electric and gas of $3,812 covers common areas only. If ownership pays the oil, this NOI is overstated. At $18,000 a year the going-in yield falls from 8.01% to 7.30% and value at an 8.00% cap falls about $225,000. Confirm the fuel structure and obtain twelve months of delivery invoices before this figure is relied on.',
]
