import type { CSSProperties } from 'react'
import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import {
  T12_PERIOD,
  T12_INCOME,
  T12_TOTAL_INCOME,
  T12_EXPENSES,
  T12_TOTAL_EXPENSES,
  T12_NOI,
  VALUATION_ROWS,
} from '../../data/bov.ts'
import { fmtMoney, fmtMoney2 } from '../../lib/fmt.ts'

const td: CSSProperties = { fontSize: 9.6, padding: '3.5px 8px', textAlign: 'right' }
const tdl: CSSProperties = { ...td, textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
const grp: CSSProperties = { ...td, textAlign: 'left', fontWeight: 800, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', paddingTop: 7 }
const th: CSSProperties = { ...td, color: '#fff', fontSize: 8.5, fontWeight: 700, padding: '5px 8px' }
const totBg: CSSProperties = { ...td, background: 'var(--carbon)', color: '#fff', fontWeight: 700 }
const noiBg: CSSProperties = { ...td, background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 10.5 }

/** BOV money page: the owner's trailing-12 statement beside the cap-rate
    valuation matrix its NOI drives. One page, no pro forma adjustments. */
export function T12Valuation({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="Trailing 12 & Valuation" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Trailing 12 &" accent="Valuation" />
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, flex: 1, minHeight: 0, alignItems: 'start' }}>
          {/* ── Left: the T12 statement, as provided ── */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 5, fontSize: 8.5 }}>
              Owner's income statement · {T12_PERIOD}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
              <thead>
                <tr style={{ background: 'var(--carbon)' }}>
                  <th style={{ ...th, textAlign: 'left' }}>Income</th>
                  <th style={th}>T-12</th>
                </tr>
              </thead>
              <tbody>
                {T12_INCOME.map((g) => [
                  <tr key={g.group}>
                    <td style={grp} colSpan={2}>
                      {g.group}
                    </td>
                  </tr>,
                  ...g.lines.map((l, i) => (
                    <tr key={l.label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                      <td style={{ ...tdl, paddingLeft: 18 }}>{l.label}</td>
                      <td style={td}>{fmtMoney2(l.amount)}</td>
                    </tr>
                  )),
                ])}
                <tr>
                  <td style={{ ...totBg, textAlign: 'left' }}>Total Income</td>
                  <td style={totBg}>{fmtMoney2(T12_TOTAL_INCOME)}</td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--carbon)' }}>
                  <th style={{ ...th, textAlign: 'left' }}>Expenses</th>
                  <th style={th}>T-12</th>
                </tr>
              </thead>
              <tbody>
                {T12_EXPENSES.map((l, i) => (
                  <tr key={l.label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                    <td style={tdl}>{l.label}</td>
                    <td style={td}>({fmtMoney2(l.amount)})</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td>
                  <td style={totBg}>({fmtMoney2(T12_TOTAL_EXPENSES)})</td>
                </tr>
                <tr>
                  <td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td>
                  <td style={noiBg}>{fmtMoney2(T12_NOI)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ── Right: the value that NOI drives across the cap range ── */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
            <div className="eyebrow" style={{ marginBottom: 5, fontSize: 8.5 }}>
              Indicated value · T-12 NOI ÷ cap rate
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div className="stat-tile">
                <div className="st-val">{fmtMoney(T12_NOI)}</div>
                <div className="st-label">Trailing-12 NOI</div>
              </div>
              <div className="stat-tile">
                <div className="st-val">31.8%</div>
                <div className="st-label">Expense Ratio</div>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '17%' }} />
                <col style={{ width: '33%' }} />
                <col style={{ width: '26%' }} />
                <col style={{ width: '24%' }} />
              </colgroup>
              <thead>
                <tr style={{ background: 'var(--carbon)' }}>
                  <th style={{ ...th, textAlign: 'left' }}>Cap</th>
                  <th style={th}>Value</th>
                  <th style={th}>Per Unit</th>
                  <th style={th}>Per SF</th>
                </tr>
              </thead>
              <tbody>
                {VALUATION_ROWS.map((r, i) => {
                  const vtd = { ...td, fontSize: 10.2, padding: '8.5px 8px' }
                  return (
                    <tr key={r.cap} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                      <td style={{ ...vtd, textAlign: 'left', fontWeight: 700, color: 'var(--carbon)' }}>{r.cap}</td>
                      <td style={{ ...vtd, fontWeight: 700 }}>{fmtMoney(r.value)}</td>
                      <td style={vtd}>{fmtMoney(r.perUnit)}</td>
                      <td style={vtd}>{fmtMoney2(r.perSf)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
