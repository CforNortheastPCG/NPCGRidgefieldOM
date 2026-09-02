/* ═══════════════════ DERIVED FINANCIALS — DO NOT HAND-EDIT NUMBERS ═══════════════════
   Every computed figure in the BOV comes from here: rent-roll totals, unit
   mix, the income stack (GPR → NOI), valuation matrix, and debt metrics.
   Inputs live in src/data/rentRoll.js, financials.js, and valuation.js —
   edit those; this file just does arithmetic. */

import type { CommercialLease, RentRollUnit } from './types.ts'
import { RENT_ROLL, TYPE_COLORS } from '../data/rentRoll.ts'
import { COMMERCIAL_ROLL } from '../data/commercialRoll.ts'
import { IS_COMMERCIAL, IS_RESIDENTIAL, VOCAB } from './vocab.ts'
import {
  VACANCY_PCT, MGMT_PCT, OTHER_INCOME, EXPENSES,
  T12_EFFECTIVE_RENTAL_INCOME, T12_LABEL,
} from '../data/financials.ts'
import { VALUATION } from '../data/valuation.ts'
import { ASSESSOR } from '../data/assessor.ts'
import { TAXES } from '../data/taxes.ts'

/* ── formatters ── */
export const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
export const fmtMoneyShort = (n: number): string =>
  Math.abs(n) >= 1e6 ? `$${(n / 1e6).toFixed(2).replace(/\.?0+$/, '')}M`
  : Math.abs(n) >= 1e3 ? `$${Math.round(n / 1e3)}K`
  : fmtMoney(n)
export const fmtNum = (n: number) => Math.round(n).toLocaleString('en-US')
export const fmtPct = (n: number, d = 2) => {
  const s = n.toFixed(d)
  // Strip trailing zeros ONLY past a decimal point — otherwise a whole
  // number ending in zero loses digits ("100" would become "1").
  return `${s.includes('.') ? s.replace(/\.?0+$/, '') : s}%`
}
// Fixed-decimal percent — for laddered columns where 6% next to 6.25% reads
// as a typo. Always shows `d` decimals.
export const fmtPctFixed = (n: number, d = 2) => `${n.toFixed(d)}%`

/* ── rent roll rollups ── */
const units = RENT_ROLL.units
const sum = <T,>(arr: readonly T[], f: (x: T) => number): number => arr.reduce((s, x) => s + f(x), 0)

export const RR = (() => {
  const totSqft = sum(units, u => u.sqft)
  const totInPlace = sum(units, u => u.inPlace)
  const totProforma = sum(units, u => u.proforma)

  // Group by unit type in first-appearance order (drives the donuts).
  const typeOrder: string[] = []
  const byType: Record<string, RentRollUnit[]> = {}
  for (const u of units) {
    const group = byType[u.type] ?? (typeOrder.push(u.type), (byType[u.type] = []))
    group.push(u)
  }
  const mix = typeOrder.map((type, i) => {
    const g = byType[type] ?? []
    return {
      type,
      // TYPE_COLORS is never empty; the fallback keeps tsc honest.
      color: TYPE_COLORS[i % TYPE_COLORS.length] ?? TYPE_COLORS[0],
      count: g.length,
      avgSqft: sum(g, u => u.sqft) / g.length,
      avgInPlace: sum(g, u => u.inPlace) / g.length,
      avgProforma: sum(g, u => u.proforma) / g.length,
      monthlyInPlace: sum(g, u => u.inPlace),
    }
  })

  // A unit is vacant if its status says so — the rent roll's own word, not
  // an inference from a zero rent (vacant units carry an ASKING rent).
  const isVacant = (u: RentRollUnit) => /^vacant/i.test(u.status || '')
  const vacant = units.filter(isVacant).length

  return {
    unitCount: units.length,
    totSqft,
    totInPlace,                 // monthly
    totProforma,                // monthly
    annualInPlace: totInPlace * 12,
    annualProforma: totProforma * 12,
    avgInPlace: totInPlace / units.length,
    avgProforma: totProforma / units.length,
    avgSqft: totSqft / units.length,
    monthlyLift: totProforma - totInPlace,
    annualLift: (totProforma - totInPlace) * 12,
    liftPct: totInPlace ? ((totProforma / totInPlace) - 1) * 100 : 0,
    rentPerSf: totSqft ? totInPlace / totSqft : 0,
    vacant,
    occupied: units.length - vacant,
    occupancyPct: ((units.length - vacant) / units.length) * 100,
    // Optional columns render only when the roll actually carries them.
    hasStatus: units.some(u => u.status),
    hasLeaseDates: units.some(u => u.leaseFrom || u.leaseEnd),
    isVacant,
    mix,
  }
})()

/* ── commercial rent roll (retail · office · industrial · mixed-use) ──
   Null on a residential deck. Everything a lease-driven page needs: area,
   occupancy BY SF (a 200 SF kiosk and a 5,000 SF anchor are not each "one
   unit" of occupancy), base rent, recoveries, WALT, and the rollover
   schedule a buyer reads before anything else. */

/** MM/DD/YYYY → Date. 'MTM', blank and unparseable all mean "no term
    remaining", which is the honest treatment: month-to-month space is
    rollover exposure, not a lease. */
function leaseEndDate(v: string | undefined): Date | null {
  if (!v) return null
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v.trim())
  if (!m) return null
  const [, mm, dd, yyyy] = m
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  return Number.isNaN(d.getTime()) ? null : d
}

export const CRE = (() => {
  if (!IS_COMMERCIAL) return null
  const leases = COMMERCIAL_ROLL.leases
  const occupiedLeases = leases.filter(l => !l.vacant)
  const vacantLeases = leases.filter(l => l.vacant)

  const leasedSf = sum(occupiedLeases, l => l.sf)
  const vacantSf = sum(vacantLeases, l => l.sf)
  // A stated NRA wins over the sum: a survey and a rent roll disagree more
  // often than either admits, and the survey is the one a lender uses.
  const nra = COMMERCIAL_ROLL.nraSf ?? leasedSf + vacantSf

  const baseRent = sum(occupiedLeases, l => l.sf * l.rentPsf)
  // Pro forma leases the whole building, vacancy included, at market.
  const marketRent = sum(leases, l => l.sf * (l.marketPsf ?? l.rentPsf))
  const recoveries = sum(occupiedLeases, l => l.camAnnual ?? 0)

  /* WALT — weighted average lease term remaining, in years, weighted two
     ways because they answer different questions: by SF ("how much of the
     building rolls"), by rent ("how much of the income does"). */
  const asOf = COMMERCIAL_ROLL.asOfDate ? new Date(COMMERCIAL_ROLL.asOfDate) : new Date()
  const yearsLeft = (l: CommercialLease) => {
    const end = leaseEndDate(l.leaseEnd)
    if (!end) return 0
    return Math.max(0, (end.getTime() - asOf.getTime()) / (365.25 * 24 * 3600 * 1000))
  }
  const termSf = sum(occupiedLeases, l => yearsLeft(l) * l.sf)
  const termRent = sum(occupiedLeases, l => yearsLeft(l) * l.sf * l.rentPsf)
  const waltBySf = leasedSf ? termSf / leasedSf : 0
  const waltByRent = baseRent ? termRent / baseRent : 0

  /* Rollover schedule. Month-to-month and already-expired space is its own
     bucket at the top — it is exposure today, not in some future year. */
  type RollYear = { key: string; label: string; sf: number; rent: number; marketRent: number; tenants: string[]; pctOfNra: number }
  const buckets = new Map<string, RollYear>()
  const bucketFor = (key: string, label: string) => {
    const found = buckets.get(key)
    if (found) return found
    const made: RollYear = { key, label, sf: 0, rent: 0, marketRent: 0, tenants: [], pctOfNra: 0 }
    buckets.set(key, made)
    return made
  }
  for (const l of occupiedLeases) {
    const end = leaseEndDate(l.leaseEnd)
    const rolling = !end || end.getTime() <= asOf.getTime()
    const b = rolling
      ? bucketFor('0000', 'Month-to-month / expired')
      : bucketFor(String(end.getFullYear()), String(end.getFullYear()))
    b.sf += l.sf
    b.rent += l.sf * l.rentPsf
    // What the same space would fetch at market on renewal — the gap a
    // buyer prices, bucket by bucket.
    b.marketRent += l.sf * (l.marketPsf ?? l.rentPsf)
    b.tenants.push(l.tenant)
  }
  const rollover = [...buckets.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(b => ({ ...b, pctOfNra: nra ? (b.sf / nra) * 100 : 0 }))

  /* Tenancy mix by SF — the donut on the rent-roll page. Vacancy is a slice
     of its own; a mix chart that hides it is a marketing chart. */
  const mix = [
    ...occupiedLeases.map((l, i) => ({
      label: l.tenant,
      sf: l.sf,
      rent: l.sf * l.rentPsf,
      color: TYPE_COLORS[i % TYPE_COLORS.length] ?? TYPE_COLORS[0],
    })),
    ...(vacantSf > 0 ? [{ label: 'Vacant', sf: vacantSf, rent: 0, color: 'var(--terracotta)' }] : []),
  ]

  return {
    leases,
    leaseCount: leases.length,
    occupiedCount: occupiedLeases.length,
    vacantCount: vacantLeases.length,
    nra,
    leasedSf,
    vacantSf,
    occupancyPct: nra ? (leasedSf / nra) * 100 : 0,
    baseRent,
    marketRent,
    recoveries,
    avgInPlacePsf: leasedSf ? baseRent / leasedSf : 0,
    avgMarketPsf: nra ? marketRent / nra : 0,
    waltBySf,
    waltByRent,
    rollover,
    mix,
    // Optional columns render only when the roll actually carries them.
    hasRecovery: leases.some(l => l.recovery),
    hasOptions: leases.some(l => l.options),
    hasEscalation: leases.some(l => l.escalation),
    hasCam: leases.some(l => l.camAnnual != null),
  }
})()

/* ── the income basis ──
   The one place the deck decides WHERE income comes from. A residential
   deck reads the unit roll; a commercial deck reads the leases; mixed-use
   reads both and adds them. Every downstream number — the income stack,
   the per-unit and per-SF metrics, the cap ladder — divides by THIS, so a
   retail BOV can never quietly price itself per apartment. */
export const BASIS = (() => {
  const resInPlace = IS_RESIDENTIAL ? RR.annualInPlace : 0
  const resProforma = IS_RESIDENTIAL ? RR.annualProforma : 0
  const creInPlace = CRE?.baseRent ?? 0
  const creProforma = CRE?.marketRent ?? 0
  return {
    /** Spaces — units, rooms or suites, per VOCAB. */
    spaceCount: (IS_RESIDENTIAL ? RR.unitCount : 0) + (CRE?.leaseCount ?? 0),
    totSqft: (IS_RESIDENTIAL ? RR.totSqft : 0) + (CRE?.nra ?? 0),
    annualInPlace: resInPlace + creInPlace,
    annualProforma: resProforma + creProforma,
    /** Recovery income rides with the leases, not the base rent. */
    recoveries: CRE?.recoveries ?? 0,
  }
})()

/* ── income stack, per scenario (annual) ──
   `col` names the financials.js column explicitly ('current' | 'proforma').
   It is NOT inferred from the gsr value: if in-place ever equalled pro-forma
   rent — a fully marked-to-market building — a value comparison would
   silently read both scenarios off the same column. */
function scenario(gsr: number, col: 'current' | 'proforma') {
  const gpr = BASIS.annualProforma                   // market rent = potential
  const lossToLease = gsr - gpr                      // ≤ 0 for current, 0 for pro forma
  const vacancy = -(VACANCY_PCT / 100) * gsr
  const eri = gsr + vacancy
  /* Recovery income (CAM + tax + insurance) is real income and belongs in
     the stack — but only on a commercial deck, and never in the T-12
     column, where the owner's own statement already contains it. */
  const other = sum(OTHER_INCOME, l => l[col] || 0) + BASIS.recoveries
  const egi = eri + other
  const mgmt = (MGMT_PCT / 100) * egi
  const expenses = EXPENSES.map(e => ({ ...e, val: e.mgmt ? mgmt : (e[col] || 0) }))
  const totExp = sum(expenses, e => e.val)
  const noi = egi - totExp
  return { gpr, gsr, lossToLease, vacancy, eri, other, egi, mgmt, expenses, totExp, noi, expenseRatio: (totExp / egi) * 100 }
}

/* ── trailing twelve ──
   A T-12 is a record of what happened, not an underwriting. It has no gross
   potential rent and no loss-to-lease line, and no vacancy factor is applied
   (the collections shortfall is already inside the reported income). Lines
   the owner's statement does not report stay null so the page prints "—"
   rather than an invented zero. Returns null when no T-12 was supplied,
   which drops the column from the Operating Statement page. */
function t12Scenario() {
  if (T12_EFFECTIVE_RENTAL_INCOME == null) return null
  const eri = T12_EFFECTIVE_RENTAL_INCOME
  const other = sum(OTHER_INCOME, l => l.t12 || 0)
  const egi = eri + other
  const expenses = EXPENSES.map(e => ({ ...e, val: e.t12 }))   // null stays null
  const totExp = sum(expenses, e => e.val || 0)
  const noi = egi - totExp
  return {
    label: T12_LABEL, isT12: true,
    gpr: null, gsr: null, lossToLease: null, vacancy: null,
    eri, other, egi, mgmt: null, expenses, totExp, noi,
    expenseRatio: (totExp / egi) * 100,
  }
}

export const FIN = (() => {
  const current = scenario(BASIS.annualInPlace, 'current')
  const proforma = scenario(BASIS.annualProforma, 'proforma')
  const t12 = t12Scenario()
  return {
    current,
    proforma,
    t12,
    hasT12: !!t12,
    /** Per leasable space — unit, room or suite, per VOCAB. */
    perUnit: (n: number) => (BASIS.spaceCount ? n / BASIS.spaceCount : 0),
    /** Per square foot — the metric retail and office actually trade on. */
    perSf: (n: number) => (BASIS.totSqft ? n / BASIS.totSqft : 0),
  }
})()

/* ── valuation ──
   `mid` is the midpoint of the concluded range; `ask` is the number you'd
   actually put on the sign. Debt and return metrics are struck on the ASK,
   not the midpoint — a buyer finances the price they pay. */
export const VAL = (() => {
  const { capScenarios, capLadder, concludedRange, loan, askingPrice } = VALUATION
  const mid = (concludedRange.low + concludedRange.high) / 2
  const ask = askingPrice || mid

  // Named cap-rate scenarios × NOI (drives the Conclusion page endpoints).
  const matrix = capScenarios.map(s => ({
    ...s,
    valueCurrent: FIN.current.noi / (s.cap / 100),
    valueProforma: FIN.proforma.noi / (s.cap / 100),
  }))

  /* Cap-rate sensitivity ladder: fixed steps across a span, each row priced
     off CURRENT NOI. `inBand` shades the expected trade band; `isAsk` marks
     the single row closest to the asking price's implied cap, so the ask is
     visibly located on the ladder rather than asserted beside it. */
  const askCap = (FIN.current.noi / ask) * 100
  let ladder = []
  if (capLadder) {
    const { from, to, step, bandFrom, bandTo } = capLadder
    const steps = Math.round((to - from) / step)
    for (let i = 0; i <= steps; i++) {
      const cap = +(from + i * step).toFixed(4)
      const price = FIN.current.noi / (cap / 100)
      ladder.push({
        cap,
        price,
        perUnit: price / BASIS.spaceCount,
        perSf: price / BASIS.totSqft,
        inBand: bandFrom != null && cap >= bandFrom - 1e-9 && cap <= bandTo + 1e-9,
        isAsk: false,
      })
    }
    // Mark the row nearest the ask's implied cap (ladder is never empty here).
    let best = 0
    ladder.forEach((r, i) => {
      const cur = ladder[best]
      if (cur && Math.abs(r.cap - askCap) < Math.abs(cur.cap - askCap)) best = i
    })
    const askRow = ladder[best]
    if (askRow) askRow.isAsk = true
  }

  /* Debt is struck on the ASK, not the midpoint — a buyer finances the
     price they pay. Null when no loan terms were supplied; the pages test
     `VAL.debt &&` either way. */
  const debt = loan
    ? (() => {
        const amount = ask * (loan.ltvPct / 100)
        const down = ask - amount
        const r = loan.ratePct / 100 / 12
        const n = loan.amortYears * 12
        const monthly = (amount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
        const ads = monthly * 12
        return {
          ...loan,
          basis: ask,
          amount,
          down,
          ads,
          dscrCurrent: FIN.current.noi / ads,
          dscrProforma: FIN.proforma.noi / ads,
          cocCurrent: ((FIN.current.noi - ads) / down) * 100,
          cocProforma: ((FIN.proforma.noi - ads) / down) * 100,
        }
      })()
    : null

  return {
    debt,
    mid,
    ask,
    low: concludedRange.low,
    high: concludedRange.high,
    matrix,
    ladder,
    goingInCap: (FIN.current.noi / mid) * 100,
    proformaCap: (FIN.proforma.noi / mid) * 100,
    perUnit: mid / BASIS.spaceCount,
    perSf: mid / BASIS.totSqft,
    grm: mid / BASIS.annualInPlace,
    // Metrics at the asking price — the headline band and Conclusion page.
    askMetrics: {
      price: ask,
      perUnit: ask / BASIS.spaceCount,
      perSf: ask / BASIS.totSqft,
      capCurrent: askCap,
      capProforma: (FIN.proforma.noi / ask) * 100,
      capT12: FIN.t12 ? (FIN.t12.noi / ask) * 100 : null,
      grm: ask / BASIS.annualInPlace,
    },
  }

})()

/* ── assessment (Property Record Card page) ──
   Sums the per-parcel components so a multi-parcel deal totals itself.
   Null when no assessor card was supplied — the page drops out. */
export const ASSESS = (() => {
  if (!ASSESSOR || !ASSESSOR.parcels?.length) return null
  const parcels = ASSESSOR.parcels.map(p => {
    const a = p.assessment || {}
    const total = (a.land || 0) + (a.buildings || 0) + (a.outbuildings || 0) + (a.extraFeatures || 0)
    return { ...p, assessment: { ...a, total } }
  })
  type Component = 'total' | 'land' | 'buildings' | 'outbuildings' | 'extraFeatures'
  const comp = (k: Component) => sum(parcels, p => p.assessment[k] || 0)
  const total = comp('total')
  return {
    parcels,
    isMultiParcel: parcels.length > 1,
    land: comp('land'),
    buildings: comp('buildings'),
    outbuildings: comp('outbuildings'),
    extraFeatures: comp('extraFeatures'),
    total,
    perUnit: total / BASIS.spaceCount,
    perSf: total / BASIS.totSqft,
    pctOfAsk: (total / VAL.ask) * 100,
    landAcres: sum(parcels, p => p.landAcres || 0),
    unitsOnCard: sum(parcels, p => p.units || 0),
  }
})()

/* ── real estate taxes (Real Estate Taxes page) ──
   Fiscal-year rows are priced from assessed value × rate; the reassessment
   scenarios re-strike the tax at each ratio of the ASK, flow the delta
   through current NOI, and report the resulting cap at the ask. That last
   column is the point of the page: it shows what a buyer's own model does
   to the yield, before they do it. Null when no tax data was supplied. */
export const TAX = (() => {
  if (!TAXES || !TAXES.fiscalYears?.length) return null
  const years = TAXES.fiscalYears.map(y => {
    const tax = (y.assessedValue / 1000) * y.ratePer1000
    return { ...y, tax, totalTax: tax + (y.surcharge || 0) }
  })
  const currentYear = years[years.length - 1]
  if (!currentYear) return null
  const priorYear = years[years.length - 2] ?? null
  const rate = currentYear.ratePer1000
  const currentTax = currentYear.totalTax

  const installmentTotal = TAXES.installments?.length
    ? sum(TAXES.installments, i => (i.amount || 0) - (i.credits || 0))
    : null

  const reassessment = (TAXES.reassessmentRatios || []).map(ratio => {
    const assessedValue = VAL.ask * ratio
    const tax = (assessedValue / 1000) * rate
    const noi = FIN.current.noi - (tax - currentTax)
    return {
      ratio,
      label: ratio >= 1 ? 'Reassessed to full sale price' : `Reassessed to ${Math.round(ratio * 100)}% of sale price`,
      assessedValue,
      tax,
      change: tax - currentTax,
      noi,
      cap: (noi / VAL.ask) * 100,
    }
  })

  return {
    years,
    currentYear,
    priorYear,
    rate,
    currentTax,
    installmentTotal,
    /* Annualize ONLY when the bill is flagged preliminary. A preliminary
       billing is customarily half the prior year's net tax, so doubling it
       approximates the year; doubling a full-year bill just states the tax
       at twice its real level. */
    annualizedFromInstallments:
      installmentTotal != null && TAXES.installmentsArePreliminary ? installmentTotal * 2 : null,
    installmentsArePreliminary: !!TAXES.installmentsArePreliminary,
    ownerStatedAnnual: TAXES.ownerStatedAnnual ?? null,
    perUnit: currentTax / BASIS.spaceCount,
    perSf: currentTax / BASIS.totSqft,
    pctOfEgi: (currentTax / FIN.current.egi) * 100,
    yoyChange: priorYear ? currentTax - priorYear.totalTax : null,
    yoyPct: priorYear ? ((currentTax - priorYear.totalTax) / priorYear.totalTax) * 100 : null,
    // Baseline row + scenarios, so the page can render one table.
    reassessment: [
      {
        ratio: null,
        label: `Current ${currentYear.fy} assessment (as billed)`,
        assessedValue: currentYear.assessedValue,
        tax: currentTax,
        change: 0,
        noi: FIN.current.noi,
        cap: (FIN.current.noi / VAL.ask) * 100,
      },
      ...reassessment,
    ],
  }
})()
