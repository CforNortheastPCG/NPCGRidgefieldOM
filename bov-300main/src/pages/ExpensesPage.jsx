import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { OTHER_INCOME, FIN_NOTES } from '../data/financials.js'
import { FIN, RR, fmtMoney, fmtPct } from '../lib/calc.js'

const Cols = () => (
  <colgroup>
    <col style={{ width: '34%' }} />
    {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
  </colgroup>
)

/* ═══════════════════ OPERATING EXPENSES (AS GIVEN) ═══════════════════
   Owner-reported expenses (normalized), other income, and expense-ratio
   tiles. All totals and $/unit computed. Data: src/data/financials.js. */
export default function ExpensesPage({ pageNum }) {
  const tds = { fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.5, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'right', color: '#fff' }
  const thl = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'left', color: '#fff' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const pu = n => fmtMoney(FIN.perUnit(n))

  return (
    <div className="page">
      <PageHeader section="Operating Expenses" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Operating <span style={{ color: '#F8971D' }}>Expenses</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        {/* Expense ratio tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid var(--border)' }}>
          {[
            { v: fmtMoney(FIN.current.totExp), l: 'Total Expenses — Current' },
            { v: pu(FIN.current.totExp), l: 'Per Unit — Current' },
            { v: fmtPct(FIN.current.expenseRatio, 1), l: 'Expense Ratio — Current' },
            { v: fmtPct(FIN.proforma.expenseRatio, 1), l: 'Expense Ratio — Pro Forma' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{s.v}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses — As Provided, Normalized</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={thl}>Expense</th>
              <th style={thr}>Current</th><th style={thr}>$/Unit</th>
              <th style={thr}>Pro Forma</th><th style={thr}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {FIN.current.expenses.map((e, i) => {
              const pf = FIN.proforma.expenses[i]
              return (
                <tr key={e.label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                  <td style={tdl}>{e.label}</td>
                  <td style={tds}>{fmtMoney(e.val)}</td><td style={tds}>{pu(e.val)}</td>
                  <td style={tds}>{fmtMoney(pf.val)}</td><td style={tds}>{pu(pf.val)}</td>
                </tr>
              )
            })}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td>
              <td style={totBg}>{fmtMoney(FIN.current.totExp)}</td><td style={totBg}>{pu(FIN.current.totExp)}</td>
              <td style={totBg}>{fmtMoney(FIN.proforma.totExp)}</td><td style={totBg}>{pu(FIN.proforma.totExp)}</td>
            </tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Other Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={thl}>Income</th>
              <th style={thr}>Current</th><th style={thr}>$/Unit</th>
              <th style={thr}>Pro Forma</th><th style={thr}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {OTHER_INCOME.map((l, i) => (
              <tr key={l.label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{l.label}</td>
                <td style={tds}>{fmtMoney(l.current)}</td><td style={tds}>{pu(l.current)}</td>
                <td style={tds}>{fmtMoney(l.proforma)}</td><td style={tds}>{pu(l.proforma)}</td>
              </tr>
            ))}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Total Other Income</td>
              <td style={totBg}>{fmtMoney(FIN.current.other)}</td><td style={totBg}>{pu(FIN.current.other)}</td>
              <td style={totBg}>{fmtMoney(FIN.proforma.other)}</td><td style={totBg}>{pu(FIN.proforma.other)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
          {FIN_NOTES.join(' ')} {RR.unitCount}-unit basis.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
