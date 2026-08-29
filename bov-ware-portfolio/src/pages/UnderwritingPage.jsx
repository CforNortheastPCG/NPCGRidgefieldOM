import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle, BlockLabel, KpiRail, SourceNote } from '../components/Blocks.jsx'
import { Waterfall, DonutChart } from '../components/Charts.jsx'
import { T, zebra, DASH } from '../components/tableKit.js'
import { FIN_NOTES, T12_LABEL, VACANCY_PCT } from '../data/financials.js'
import { FIN, RR, fmtMoney, fmtMoneyShort, fmtPct } from '../lib/calc.js'

/* ═══════════════════ UNDERWRITING ═══════════════════
   Income and expenses across the three columns a buyer's lender will want:

     As Given   ownership's own figures — a record, not an underwriting.
                Usually no management at market, no reserve.
     Market     the anchor. In-place rents, fully loaded, vacancy applied,
                management normalized. This is the NOI the cap is struck on.
     Pro Forma  same expense structure, rents at the stabilized schedule.

   Showing all three is the honest version: a buyer's lender will underwrite
   the middle column, and the gap to the left one is exactly what gets
   negotiated in diligence. Hiding the given column does not make it go away.

   The As Given column drops out automatically when
   T12_EFFECTIVE_RENTAL_INCOME is null in financials.js.
   Data: src/data/financials.js · math: src/lib/calc.js */
/* Declared at module scope, not inside the page component: a component
   created during render is a brand-new type on every pass, so React
   remounts it instead of updating it. `hasT12` is passed rather than
   closed over. */
const m = n => (n == null ? DASH : fmtMoney(n))
// Parenthesised negatives — accounting convention, and it stops a reader
// mistaking a deduction for income at a glance.
const neg = n => (n == null ? DASH : `(${fmtMoney(Math.abs(n))})`)

const Cols = ({ hasT12 }) => {
  const colCount = hasT12 ? 6 : 4
  return (
    <colgroup>
      <col style={{ width: hasT12 ? '28%' : '36%' }} />
      {Array.from({ length: colCount }).map((_, i) => (
        <col key={i} style={{ width: `${(hasT12 ? 72 : 64) / colCount}%` }} />
      ))}
    </colgroup>
  )
}

const Head = ({ hasT12 }) => (
  <thead>
    <tr style={T.head}>
      <th style={T.thl} />
      {hasT12 && <><th style={T.thr}>As Given</th><th style={T.thr}>/ Unit</th></>}
      <th style={T.thr}>Market</th><th style={T.thr}>/ Unit</th>
      <th style={T.thr}>Pro Forma</th><th style={T.thr}>/ Unit</th>
    </tr>
  </thead>
)

/* One row across every scenario. `get` pulls the value; `fmt` renders it.
   `noPerUnit` blanks the /unit cells for rows where dividing by the unit
   count is meaningless — a ratio per unit is not a number. */
const Row = ({ label, get, fmt = m, style, i, noPerUnit = false, hasT12 }) => {
  const cell = (sc, isPu) => {
    if (!sc) return DASH
    const v = get(sc)
    // Use the SAME formatter for the /unit cell, so a parenthesised
    // negative stays parenthesised rather than turning into "$-2,200".
    if (isPu) return noPerUnit || v == null ? DASH : fmt(FIN.perUnit(v))
    return fmt(v)
  }
  const ls = style?.l || { ...T.tdl, ...zebra(i) }
  const rs = style?.r || { ...T.tdr, ...zebra(i) }
  return (
    <tr>
      <td style={ls}>{label}</td>
      {hasT12 && <><td style={rs}>{cell(FIN.t12)}</td><td style={rs}>{cell(FIN.t12, true)}</td></>}
      <td style={rs}>{cell(FIN.current)}</td><td style={rs}>{cell(FIN.current, true)}</td>
      <td style={rs}>{cell(FIN.proforma)}</td><td style={rs}>{cell(FIN.proforma, true)}</td>
    </tr>
  )
}

const SUB = { l: T.subl, r: T.subr }
const TOT = { l: T.totl, r: T.totr }

const SLICE_COLORS = ['var(--carbon)', 'var(--golden)', 'var(--terracotta)', 'var(--stone)', '#8d95a1', '#d8d2cb']

export default function UnderwritingPage({ pageNum }) {
  const hasT12 = FIN.hasT12

  /* Top five expense lines plus a rolled-up remainder — six slices is the
     most a donut this size can label without turning into confetti. */
  const expenseSlices = (() => {
    const lines = FIN.current.expenses
      .map(e => ({ label: e.label.replace(/\s*\(\d+%\)$/, ''), value: e.val || 0 }))
      .filter(e => e.value > 0)
      .sort((a, b) => b.value - a.value)
    const top = lines.slice(0, 5)
    const rest = lines.slice(5).reduce((s, e) => s + e.value, 0)
    const out = rest > 0 ? [...top, { label: 'Other', value: rest }] : top
    return out.map((e, i) => ({ ...e, color: SLICE_COLORS[i % SLICE_COLORS.length] }))
  })()

  return (
    <div className="page">
      <PageHeader section="Underwriting" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="Underwriting"
          accent="Summary"
          subtitle={hasT12 ? `As Given (${T12_LABEL}) — Market — Pro Forma` : 'Market — Pro Forma'}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 218px', gap: 16, flex: 1, minHeight: 0 }}>

          {/* ── the statement ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>Income</BlockLabel>
            <table style={{ ...T.table, marginBottom: 10 }}>
              <Cols hasT12={hasT12} /><Head hasT12={hasT12} />
              <tbody>
                <Row hasT12={hasT12} i={0} label="Gross Potential Rent" get={s => s.gpr} />
                <Row hasT12={hasT12} i={1} label="Below Market Rent / Loss to Lease" get={s => (s.lossToLease ? s.lossToLease : null)} fmt={neg} />
                <Row hasT12={hasT12} label="Gross Scheduled Rent" get={s => s.gsr} style={SUB} />
                <Row hasT12={hasT12} i={1} label={`Vacancy & Collections Loss (${VACANCY_PCT}%)`} get={s => (s.vacancy ? s.vacancy : null)} fmt={neg} />
                <Row hasT12={hasT12} label="Effective Rental Income" get={s => s.eri} style={SUB} />
                <Row hasT12={hasT12} i={1} label="Additional Income" get={s => (s.other || null)} />
                <Row hasT12={hasT12} label="Effective Gross Income" get={s => s.egi} style={TOT} />
              </tbody>
            </table>

            <BlockLabel>Operating Expenses</BlockLabel>
            <table style={{ ...T.table, height: '100%' }}>
              <Cols hasT12={hasT12} /><Head hasT12={hasT12} />
              <tbody>
                {FIN.current.expenses.map((e, i) => (
                  <Row hasT12={hasT12}
                    key={e.label}
                    i={i}
                    label={e.label}
                    get={s => {
                      const line = s.expenses.find(x => x.label === e.label)
                      return line ? line.val : null
                    }}
                  />
                ))}
                <Row hasT12={hasT12} label="Total Operating Expenses" get={s => s.totExp} style={SUB} />
                <Row hasT12={hasT12} label="Operating Expense Ratio" get={s => s.expenseRatio} fmt={v => (v == null ? DASH : fmtPct(v, 1))} style={SUB} noPerUnit />
                <Row hasT12={hasT12} label="Net Operating Income" get={s => s.noi} style={TOT} />
              </tbody>
            </table>
          </div>

          {/* ── the rail: what the table says, drawn ── */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, gap: 12 }}>
            <div>
              <BlockLabel>NOI Bridge</BlockLabel>
              <Waterfall
                steps={[
                  ...(hasT12 ? [{ label: 'As Given', value: FIN.t12.noi, type: 'base' }] : []),
                  { label: 'Market', value: FIN.current.noi, type: hasT12 ? 'total' : 'base' },
                  { label: 'Rent Lift', value: FIN.proforma.noi - FIN.current.noi, type: 'delta' },
                  { label: 'Pro Forma', value: FIN.proforma.noi, type: 'total' },
                ]}
                fmt={fmtMoneyShort}
                height={78}
              />
            </div>

            <div>
              <BlockLabel>Expense Composition — Market</BlockLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <DonutChart
                  data={expenseSlices}
                  size={78} thickness={15}
                  centerLabel={fmtPct(FIN.current.expenseRatio, 0)}
                  centerSub="OF EGI"
                  centerFont={17}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, flex: 1, minWidth: 0 }}>
                  {expenseSlices.map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 6.9 }}>
                      <span style={{ width: 7, height: 7, background: d.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.label}</span>
                      <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{fmtMoneyShort(d.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <KpiRail
                items={[{
                  label: 'NOI Growth Opportunity',
                  value: `+${fmtMoney(FIN.proforma.noi - FIN.current.noi)}`,
                  sub: `${fmtPct(((FIN.proforma.noi / FIN.current.noi) - 1) * 100, 1)} above market`,
                  invert: true,
                }]}
              />
            </div>
          </div>
        </div>

        <SourceNote top>{FIN_NOTES.join(' ')} Per-unit figures are struck on {RR.unitCount} units.</SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
