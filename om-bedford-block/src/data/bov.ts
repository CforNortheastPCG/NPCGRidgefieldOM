// AUTO-GENERATED for Bedford Block BOV — protected data tier.
// Trailing-12 operating statement, verbatim from the owner's income
// statement ("1361 Elm Street", period Jun 2025 – May 2026), and the
// cap-rate valuation matrix derived from its NOI (value = NOI / cap).

export const T12_PERIOD = 'June 2025 – May 2026'

export interface T12Line {
  label: string
  amount: number
  note?: string
}

export const T12_INCOME: Array<{ group: string; lines: T12Line[] }> = [
  {
    group: 'Commercial Rent Income',
    lines: [
      { label: 'Rent — Commercial', amount: 262438.52 },
      { label: 'HVAC Reimbursement', amount: 1800.0 },
    ],
  },
  {
    group: 'Residential Rent & Other Income',
    lines: [
      { label: 'Rent — Residential', amount: 1243649.72 },
      { label: 'Detailing Fee', amount: 3947.0 },
      { label: 'Laundry Income', amount: 16355.0 },
    ],
  },
]

export const T12_TOTAL_INCOME = 1528190.24

export const T12_EXPENSES: T12Line[] = [
  { label: 'Property Tax', amount: 151461.99 },
  { label: 'Utilities — Electricity', amount: 106445.14 },
  { label: 'Payroll', amount: 82332.0 },
  { label: 'Maintenance & Repair', amount: 51643.37 },
  { label: 'Insurance', amount: 32139.7 },
  { label: 'Utilities — WiFi & Phone', amount: 18824.04 },
  { label: 'Utilities — Gas', amount: 13853.69 },
  { label: 'Utilities — Water & Sewer', amount: 12329.42 },
  { label: 'Utilities — Disposal', amount: 10577.78 },
  { label: 'Permits, Subscriptions & Misc.', amount: 4011.78 },
  { label: 'Supplies', amount: 2082.48 },
]

export const T12_TOTAL_EXPENSES = 485701.39
export const T12_NOI = 1042488.85

// Valuation matrix: T12 NOI capped from 6.00% to 8.00%.
// value = round(NOI / cap); perUnit = value / 62; perSf = value / 62,550.
export interface ValuationRow {
  cap: string
  value: number
  perUnit: number
  perSf: number
}

export const VALUATION_ROWS: ValuationRow[] = [
  { cap: '6.00%', value: 17374814, perUnit: 280239, perSf: 277.78 },
  { cap: '6.25%', value: 16679822, perUnit: 269029, perSf: 266.66 },
  { cap: '6.50%', value: 16038290, perUnit: 258682, perSf: 256.41 },
  { cap: '6.75%', value: 15444279, perUnit: 249101, perSf: 246.91 },
  { cap: '7.00%', value: 14892698, perUnit: 240205, perSf: 238.09 },
  { cap: '7.25%', value: 14379157, perUnit: 231922, perSf: 229.88 },
  { cap: '7.50%', value: 13899851, perUnit: 224191, perSf: 222.22 },
  { cap: '7.75%', value: 13451469, perUnit: 216959, perSf: 215.06 },
  { cap: '8.00%', value: 13031111, perUnit: 210179, perSf: 208.33 },
]
