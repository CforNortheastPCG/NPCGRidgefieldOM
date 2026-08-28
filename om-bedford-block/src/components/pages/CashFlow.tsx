import type { CSSProperties } from 'react'
import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { CASHFLOW_YEARS, CASHFLOW_ROWS, CASHFLOW_TILES } from '../../data/finsummary.ts'
import { fmtMoney } from '../../lib/fmt.ts'
import type { CashFlowRow } from '../../data/finsummary.ts'

const cell: CSSProperties = { fontSize: 10.3, padding: '8px 8px', textAlign: 'right' }
const cellL: CSSProperties = { ...cell, textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
const totBg: CSSProperties = { ...cell, background: 'var(--carbon)', color: '#fff', fontWeight: 700 }
const noiBg: CSSProperties = { ...cell, background: 'var(--golden)', color: '#fff', fontWeight: 800 }

function fmt(v: number, kind: CashFlowRow['fmt']) {
  switch (kind) {
    case 'moneyNeg':
      return `(${fmtMoney(v)})`
    case 'pct':
      return `${v.toFixed(2)}%`
    case 'x':
      return `${v.toFixed(2)}x`
    default:
      return fmtMoney(v)
  }
}

/** Six-year operating projection with debt service and levered returns. */
export function CashFlow({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="Cash Flow Analysis" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Cash Flow" accent="Analysis" />
        <div className="title-rule" />
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '26%' }} />
            {CASHFLOW_YEARS.map((y) => (
              <col key={y} style={{ width: `${74 / CASHFLOW_YEARS.length}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...cellL, color: '#fff', fontSize: 9, fontWeight: 700 }}>Projection</th>
              {CASHFLOW_YEARS.map((y) => (
                <th key={y} style={{ ...cell, color: '#fff', fontSize: 9, fontWeight: 700 }}>
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CASHFLOW_ROWS.map((r, ri) => {
              const isTotal = r.kind === 'total'
              const isNoi = r.kind === 'noi'
              const base = isNoi ? noiBg : isTotal ? totBg : cell
              const labelStyle = isNoi
                ? { ...noiBg, textAlign: 'left' as const }
                : isTotal
                  ? { ...totBg, textAlign: 'left' as const }
                  : r.kind === 'sub'
                    ? { ...cellL, fontWeight: 400, color: 'var(--stone)', paddingLeft: 16 }
                    : cellL
              return (
                <tr key={ri} style={!isTotal && !isNoi && ri % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                  <td style={labelStyle}>{r.label}</td>
                  {r.values.map((v, i) => (
                    <td key={i} style={base}>
                      {fmt(v, r.fmt)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 'auto', paddingTop: 12 }}>
          {CASHFLOW_TILES.map((t) => (
            <div className="stat-tile" key={t.l}>
              <div className="st-val">{t.v}</div>
              <div className="st-label">{t.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 8.5, color: 'var(--stone)', marginTop: 6 }}>
          Projection assumes $10,875,000 financing at 5.85% over 30 years ($769,873 annual debt service) against
          $3,697,500 total cash in; exit modeled at the end of Year 7 at a 6.00% cap rate.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
