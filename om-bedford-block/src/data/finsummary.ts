// AUTO-GENERATED for Bedford Block — protected data tier.
// Financial Summary + Cash Flow Analysis figures, verbatim from the deal's
// underwriting (source OM pp. 18 & 20). Debt/returns are model outputs.
import type { StatTile } from '../lib/types.ts'

export const FINSUM_TILES: StatTile[] = [
  { v: '$14,500,000', l: 'Listing Price' },
  { v: '$1,000,597', l: 'Net Operating Income' },
  { v: '6.90%', l: 'Cap Rate' },
  { v: '62,550 SF', l: 'Gross Living Area' },
]

export interface FinsumCard {
  title: string
  rows: Array<[string, string]>
}

export const FINSUM_CARDS: FinsumCard[] = [
  {
    title: 'Investment Information',
    rows: [
      ['Price', '$14,500,000'],
      ['Capitalization Rate', '6.90%'],
      ['Pro Forma Cap Rate', '8.25%'],
      ['Apartments', '52'],
      ['Commercial Suites', '10'],
      ['Total Units', '62'],
      ['Price / Unit', '$233,871'],
      ['Gross Living Area', '62,550 SF'],
      ['Price / SF', '$232'],
    ],
  },
  {
    title: 'Income & Expense',
    rows: [
      ['GPR — Commercial', '$264,687'],
      ['GPR — Residential', '$1,165,344'],
      ['Additional Income', '$55,492'],
      ['Vacancy & Credits', '($59,848)'],
      ['Effective Gross Income', '$1,425,675'],
      ['Operating Expenses', '$425,078'],
      ['Net Operating Income', '$1,000,597'],
      ['Expense Ratio', '30%'],
      ['Avg Rent / SF / Yr (Comm.)', '$15'],
    ],
  },
  {
    title: 'Investment Review',
    rows: [
      ['Year 1 Levered CoC', '6.24%'],
      ['7-Year Average CoC', '10.72%'],
      ['Equity Multiple', '4.06x'],
      ['7-Year Levered IRR', '24.94%'],
      ['Exit', 'End of Year 7'],
      ['Exit Cap Rate', '6.00%'],
      ['Cost of Sale', '1.00%'],
      ['Outstanding Debt Balance', '$9,721,953'],
    ],
  },
  {
    title: 'Debt Information',
    rows: [
      ['Loan Amount', '$10,875,000'],
      ['Loan to Value', '75%'],
      ['Interest Rate', '5.85%'],
      ['Amortization', '30 Years'],
      ['Interest-Only Period', 'None'],
      ['Annual Debt Service', '$769,873'],
      ['Initial Equity', '$3,625,000'],
      ['Closing Cost', '$72,500'],
      ['Total Cash In', '$3,697,500'],
      ['Year 1 DCR', '1.30x'],
    ],
  },
]

export interface CashFlowRow {
  label: string
  values: number[]
  /** 'money' (default) | 'moneyNeg' (render in parens) | 'pct' | 'x' */
  fmt?: 'money' | 'moneyNeg' | 'pct' | 'x'
  kind?: 'sub' | 'total' | 'noi' | 'plain'
}

export const CASHFLOW_YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6']

export const CASHFLOW_ROWS: CashFlowRow[] = [
  { label: 'Gross Potential Rents — Commercial', values: [264687, 267334, 275354, 283615, 292123, 300887] },
  { label: 'Vacancy / Collections Loss', values: [13234, 13367, 13768, 14181, 14606, 15044], fmt: 'moneyNeg', kind: 'sub' },
  { label: 'Gross Potential Rents — Residential', values: [1165344, 1250000, 1350000, 1390500, 1432215, 1475181] },
  { label: 'Vacancy / Collections Loss', values: [46614, 62500, 67500, 69525, 71611, 73759], fmt: 'moneyNeg', kind: 'sub' },
  { label: 'Effective Rental Income', values: [1370183, 1441467, 1544086, 1590409, 1638121, 1687265] },
  { label: 'Total Additional Income', values: [55492, 56602, 57734, 58889, 60066, 61268] },
  { label: 'Effective Gross Income', values: [1425675, 1498069, 1601820, 1649298, 1698188, 1748533], kind: 'total' },
  { label: 'Total Operating Expense', values: [425078, 437830, 450965, 464494, 478429, 492782], kind: 'total' },
  { label: 'Net Operating Income', values: [1000597, 1060239, 1150855, 1184803, 1219759, 1255751], kind: 'noi' },
  { label: 'Debt Service', values: [769873, 769873, 769873, 769873, 769873, 769873], fmt: 'moneyNeg', kind: 'sub' },
  { label: 'Levered Cash Flow', values: [230724, 290366, 380982, 414930, 449886, 485878], kind: 'total' },
  { label: 'Levered Cash-on-Cash', values: [6.24, 7.85, 10.3, 11.22, 12.17, 13.14], fmt: 'pct' },
  { label: 'Debt Service Coverage Ratio', values: [1.3, 1.38, 1.49, 1.54, 1.58, 1.63], fmt: 'x' },
]

export const CASHFLOW_TILES: StatTile[] = [
  { v: '24.94%', l: '7-Year Levered IRR' },
  { v: '4.06x', l: 'Equity Multiple' },
  { v: '10.72%', l: '7-Yr Average CoC' },
  { v: '$3,697,500', l: 'Total Cash In' },
]
