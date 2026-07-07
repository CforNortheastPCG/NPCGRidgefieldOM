import type { CSSProperties } from 'react'
import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { FINANCIALS } from '../../data/financials.ts'
import { fmtMoney, fmtMoney2 } from '../../lib/fmt.ts'

const tds: CSSProperties = { fontSize: 10.5, padding: '5.5px 8px', textAlign: 'right' }
const tdl: CSSProperties = { fontSize: 10.5, padding: '5.5px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
const thr: CSSProperties = { fontSize: 9, padding: '6px 8px', textAlign: 'right', color: '#fff' }
const thl: CSSProperties = { fontSize: 9, padding: '6px 8px', textAlign: 'left', color: '#fff' }
const totBg: CSSProperties = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 10.5, padding: '5.5px 8px', textAlign: 'right' }
const noiBg: CSSProperties = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 11, padding: '6.5px 8px', textAlign: 'right' }

export function IncomeExpense({ pageNum }: { pageNum?: number }) {
  const ie = FINANCIALS.ie
  const computed = FINANCIALS.computed.incomeExpense
  if (!ie || !computed) return null

  const cols = ie.columns
  // Secondary metric: $/Unit for unit deals, $/SF for SF deals.
  const perUnit = FINANCIALS.unitCount != null && FINANCIALS.unitCount > 0
  const denom = perUnit ? FINANCIALS.unitCount! : (FINANCIALS.buildingSf ?? 0)
  const perLabel = perUnit ? '$/Unit' : '$/SF'
  const per = (v: number) => (denom > 0 ? (perUnit ? fmtMoney(v / denom) : fmtMoney2(v / denom)) : '—')

  const colGroup = (
    <colgroup>
      <col style={{ width: '34%' }} />
      {cols.flatMap((c) => [
        <col key={`${c.key}-a`} style={{ width: `${66 / (cols.length * 2)}%` }} />,
        <col key={`${c.key}-b`} style={{ width: `${66 / (cols.length * 2)}%` }} />,
      ])}
    </colgroup>
  )

  const headRow = (first: string) => (
    <tr style={{ background: 'var(--carbon)' }}>
      <th style={thl}>{first}</th>
      {cols.flatMap((c) => [
        <th style={thr} key={`${c.key}-a`}>
          {c.label}
        </th>,
        <th style={thr} key={`${c.key}-b`}>
          {perLabel}
        </th>,
      ])}
    </tr>
  )

  const valueCells = (amounts: Record<string, number | undefined>, bold = false, negate = false) =>
    cols.flatMap((c) => {
      const v = amounts[c.key]
      const style = bold ? { ...tds, fontWeight: 700 as const } : tds
      if (v == null) return [<td style={style} key={`${c.key}-a`}>—</td>, <td style={style} key={`${c.key}-b`}>—</td>]
      const shown = negate ? -v : v
      return [
        <td style={style} key={`${c.key}-a`}>
          {fmtMoney(shown)}
        </td>,
        <td style={style} key={`${c.key}-b`}>
          {negate ? `-${per(v)}`.replace('-$-', '-$') : per(v)}
        </td>,
      ]
    })

  const byCol = (f: (k: string) => number | undefined) =>
    Object.fromEntries(cols.map((c) => [c.key, f(c.key)])) as Record<string, number | undefined>

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SectionTitle text="Income &" accent="Expense Analysis" />
        <div className="title-rule" style={{ marginBottom: 8 }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
            gap: 24,
            paddingBottom: 9,
            marginBottom: 9,
            borderBottom: '1px solid var(--border)',
          }}
        >
          {cols.map((c) => (
            <div key={c.key} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 21, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>
                {fmtMoney(computed.byColumn[c.key]?.noi ?? 0)}
              </div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>
                NOI — {c.label}
              </div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>
          Operating Income
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8, tableLayout: 'fixed' }}>
          {colGroup}
          <thead>{headRow('Income')}</thead>
          <tbody>
            <tr style={{ background: 'var(--linen)' }}>
              <td style={{ ...tdl, fontWeight: 700 }}>Gross Scheduled Rent</td>
              {valueCells(byCol((k) => computed.byColumn[k]?.grossScheduledRent), true)}
            </tr>
            <tr>
              <td style={tdl}>Vacancy &amp; Credit Loss ({(ie.vacancyPct * 100).toFixed(1).replace(/\.0$/, '')}%)</td>
              {valueCells(byCol((k) => computed.byColumn[k]?.vacancyLoss), false, true)}
            </tr>
            {ie.otherIncomeLines.map((l) => (
              <tr key={l.label}>
                <td style={tdl}>{l.label}</td>
                {valueCells(byCol((k) => l.amounts?.[k]))}
              </tr>
            ))}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td>
              {cols.flatMap((c) => {
                const v = computed.byColumn[c.key]?.egi ?? 0
                return [
                  <td style={totBg} key={`${c.key}-a`}>
                    {fmtMoney(v)}
                  </td>,
                  <td style={totBg} key={`${c.key}-b`}>
                    {per(v)}
                  </td>,
                ]
              })}
            </tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>
          Operating Expenses
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          {colGroup}
          <thead>{headRow('Expense')}</thead>
          <tbody>
            {ie.mgmtPct != null && ie.mgmtPct > 0 && (
              <tr>
                <td style={tdl}>Property Management ({(ie.mgmtPct * 100).toFixed(0)}%)</td>
                {valueCells(byCol((k) => computed.byColumn[k]?.mgmtFee))}
              </tr>
            )}
            {ie.expenseLines
              .filter((l) => l.amounts)
              .map((l, i) => (
                <tr key={l.label} style={i % 2 === 0 ? { background: 'var(--linen)' } : undefined}>
                  <td style={tdl}>{l.label}</td>
                  {valueCells(byCol((k) => l.amounts?.[k]))}
                </tr>
              ))}
            {ie.expenseLines
              .filter((l) => !l.amounts && l.note)
              .map((l) => (
                <tr key={l.label}>
                  <td style={tdl}>{l.label}</td>
                  {cols.flatMap((c) => [
                    <td style={tds} key={`${c.key}-a`}>
                      {l.note}
                    </td>,
                    <td style={tds} key={`${c.key}-b`}>
                      —
                    </td>,
                  ])}
                </tr>
              ))}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td>
              {cols.flatMap((c) => {
                const v = computed.byColumn[c.key]?.totalExpenses ?? 0
                return [
                  <td style={totBg} key={`${c.key}-a`}>
                    {fmtMoney(v)}
                  </td>,
                  <td style={totBg} key={`${c.key}-b`}>
                    {per(v)}
                  </td>,
                ]
              })}
            </tr>
            <tr>
              <td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td>
              {cols.flatMap((c) => {
                const v = computed.byColumn[c.key]?.noi ?? 0
                return [
                  <td style={noiBg} key={`${c.key}-a`}>
                    {fmtMoney(v)}
                  </td>,
                  <td style={noiBg} key={`${c.key}-b`}>
                    {per(v)}
                  </td>,
                ]
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
