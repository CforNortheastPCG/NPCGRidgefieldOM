/* ═══════════════════ DERIVED FINANCIALS — DO NOT HAND-EDIT NUMBERS ═══════════════════
   Every computed figure in the BOV comes from here: rent-roll totals, unit
   mix, the income stack (GPR → NOI), valuation matrix, and debt metrics.
   Inputs live in src/data/rentRoll.js, financials.js, and valuation.js —
   edit those; this file just does arithmetic. */

import { RENT_ROLL, TYPE_COLORS } from '../data/rentRoll.js'
import { VACANCY_PCT, MGMT_PCT, OTHER_INCOME, EXPENSES } from '../data/financials.js'
import { VALUATION } from '../data/valuation.js'

/* ── formatters ── */
export const fmtMoney = n => `$${Math.round(n).toLocaleString('en-US')}`
export const fmtMoneyShort = n =>
  Math.abs(n) >= 1e6 ? `$${(n / 1e6).toFixed(2).replace(/\.?0+$/, '')}M`
  : Math.abs(n) >= 1e3 ? `$${Math.round(n / 1e3)}K`
  : fmtMoney(n)
export const fmtNum = n => Math.round(n).toLocaleString('en-US')
export const fmtPct = (n, d = 2) => `${n.toFixed(d).replace(/\.?0+$/, '')}%`

/* ── rent roll rollups ── */
const units = RENT_ROLL.units
const sum = (arr, f) => arr.reduce((s, x) => s + f(x), 0)

export const RR = (() => {
  const totSqft = sum(units, u => u.sqft)
  const totInPlace = sum(units, u => u.inPlace)
  const totProforma = sum(units, u => u.proforma)

  // Group by unit type in first-appearance order (drives the donuts).
  const typeOrder = []
  const byType = {}
  for (const u of units) {
    if (!byType[u.type]) { byType[u.type] = []; typeOrder.push(u.type) }
    byType[u.type].push(u)
  }
  const mix = typeOrder.map((type, i) => {
    const g = byType[type]
    return {
      type,
      color: TYPE_COLORS[i % TYPE_COLORS.length],
      count: g.length,
      avgSqft: sum(g, u => u.sqft) / g.length,
      avgInPlace: sum(g, u => u.inPlace) / g.length,
      avgProforma: sum(g, u => u.proforma) / g.length,
      monthlyInPlace: sum(g, u => u.inPlace),
    }
  })

  return {
    unitCount: units.length,
    totSqft,
    totInPlace,                 // monthly
    totProforma,                // monthly
    annualInPlace: totInPlace * 12,
    annualProforma: totProforma * 12,
    avgInPlace: totInPlace / units.length,
    avgProforma: totProforma / units.length,
    mix,
  }
})()

/* ── income stack, per scenario (annual) ── */
function scenario(gsr) {
  const gpr = RR.annualProforma                      // market rent = potential
  const lossToLease = gsr - gpr                      // ≤ 0 for current, 0 for pro forma
  const vacancy = -(VACANCY_PCT / 100) * gsr
  const eri = gsr + vacancy
  const otherKey = gsr === RR.annualInPlace ? 'current' : 'proforma'
  const other = sum(OTHER_INCOME, l => l[otherKey])
  const egi = eri + other
  const mgmt = (MGMT_PCT / 100) * egi
  const expenses = EXPENSES.map(e => ({ ...e, val: e.mgmt ? mgmt : e[otherKey] }))
  const totExp = sum(expenses, e => e.val)
  const noi = egi - totExp
  return { gpr, gsr, lossToLease, vacancy, eri, other, egi, mgmt, expenses, totExp, noi, expenseRatio: (totExp / egi) * 100 }
}

export const FIN = (() => {
  const current = scenario(RR.annualInPlace)
  const proforma = scenario(RR.annualProforma)
  return { current, proforma, perUnit: n => n / RR.unitCount }
})()

/* ── valuation ── */
export const VAL = (() => {
  const { capScenarios, concludedRange, loan } = VALUATION
  const mid = (concludedRange.low + concludedRange.high) / 2
  // cap-rate scenario × NOI value matrix
  const matrix = capScenarios.map(s => ({
    ...s,
    valueCurrent: FIN.current.noi / (s.cap / 100),
    valueProforma: FIN.proforma.noi / (s.cap / 100),
  }))
  const out = {
    mid,
    low: concludedRange.low,
    high: concludedRange.high,
    matrix,
    goingInCap: (FIN.current.noi / mid) * 100,
    proformaCap: (FIN.proforma.noi / mid) * 100,
    perUnit: mid / RR.unitCount,
    perSf: mid / RR.totSqft,
    grm: mid / RR.annualInPlace,
  }
  if (loan) {
    const amount = mid * (loan.ltvPct / 100)
    const r = loan.ratePct / 100 / 12
    const n = loan.amortYears * 12
    const monthly = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const ads = monthly * 12
    out.debt = {
      ...loan,
      amount,
      down: mid - amount,
      ads,
      dscrCurrent: FIN.current.noi / ads,
      dscrProforma: FIN.proforma.noi / ads,
      cocCurrent: ((FIN.current.noi - ads) / (mid - amount)) * 100,
      cocProforma: ((FIN.proforma.noi - ads) / (mid - amount)) * 100,
    }
  }
  return out
})()
