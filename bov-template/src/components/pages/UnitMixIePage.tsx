import type { CSSProperties } from 'react'
import { PageHeader, PageFooter } from '../Shell.tsx'
import { ChartCard } from '../Charts.tsx'
import { VACANCY_PCT } from '../../data/financials.ts'
import { FIN, RR, fmtMoney, fmtNum } from '../../lib/calc.ts'
import { VOCAB } from '../../lib/vocab.ts'

/* ═══════════════════ UNIT MIX & I&E SUMMARY ═══════════════════
   Unit-mix + rent-by-type donuts (derived from the rent roll) above the
   underwritten income stack: GPR → loss to lease → vacancy → EGI →
   expenses → NOI, Current vs Pro Forma. Everything computed. */
export default function UnitMixIePage({ pageNum }: { pageNum?: number }) {
  const tds = { fontSize: 8.5, padding: '3px 7px', textAlign: 'right' } satisfies CSSProperties
  const tdl = { fontSize: 8.5, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' } satisfies CSSProperties
  const thr = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'right', color: '#fff' } satisfies CSSProperties
  const thl = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'left', color: '#fff' } satisfies CSSProperties
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '3px 7px', textAlign: 'right' } satisfies CSSProperties
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 8.3, padding: '4px 7px', textAlign: 'right' } satisfies CSSProperties
  const pu = (n: number) => fmtMoney(FIN.perUnit(n))

  const unitMix = RR.mix.map(m => ({ label: m.type, value: m.count, color: m.color }))
  const rentByType = RR.mix.map(m => ({ label: `${m.type} (${m.count})`, value: m.monthlyInPlace, color: m.color }))

  /* [label, accessor, isSubtotal] — the accessor reads the same field off
     whichever scenario column the row is rendered against. */
  type Column = typeof FIN.current
  const rows: Array<[string, (c: Column) => number, boolean]> = [
    ['Gross Potential Rent (Market)', c => c.gpr, false],
    ['Loss to Lease (below market)', c => c.lossToLease, false],
    ['Gross Scheduled Rent', c => c.gsr, true],
    [`Vacancy & Collections Loss (${VACANCY_PCT}%)`, c => c.vacancy, false],
    ['Effective Rental Income', c => c.eri, true],
    ['Other Income', c => c.other, false],
  ]

  return (
    <div className="page">
      <PageHeader section={`${VOCAB.mixTitle} & I&E`} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 15.8 }}>{VOCAB.mixTitle} &amp; <span style={{ color: '#F8971D' }}>Income Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 6 }} />

        {/* Donuts */}
        <div style={{ display: 'flex', gap: 11, marginBottom: 8, alignItems: 'stretch' }}>
          <ChartCard title={VOCAB.mixTitle} data={unitMix} centerLabel={`${RR.unitCount}`} centerSub={VOCAB.units.toUpperCase()} />
          <ChartCard title="In-Place Rent by Type" data={rentByType} fmt={v => `${fmtMoney(v)}/mo`} />
          <div style={{ padding: '2px 6px', flex: 0.8, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 9.2, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Avg SF / Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center', flex: 1 }}>
              {RR.mix.map(m => (
                <div key={m.type} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 8.8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600 }}>{m.type}</span>
                  <span style={{ color: 'var(--stone)', fontWeight: 700 }}>~{fmtNum(m.avgSqft)} SF</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Income stack */}
        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 8.3 }}>Underwritten Income &amp; NOI</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '34%' }} />
            {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={thl}>Line Item</th>
              <th style={thr}>Current</th><th style={thr}>$/Unit</th>
              <th style={thr}>Pro Forma</th><th style={thr}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, get, bold], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                <td style={bold ? { ...tds, fontWeight: 700 } : tds}>{fmtMoney(get(FIN.current))}</td>
                <td style={bold ? { ...tds, fontWeight: 700 } : tds}>{pu(get(FIN.current))}</td>
                <td style={bold ? { ...tds, fontWeight: 700 } : tds}>{fmtMoney(get(FIN.proforma))}</td>
                <td style={bold ? { ...tds, fontWeight: 700 } : tds}>{pu(get(FIN.proforma))}</td>
              </tr>
            ))}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td>
              <td style={totBg}>{fmtMoney(FIN.current.egi)}</td><td style={totBg}>{pu(FIN.current.egi)}</td>
              <td style={totBg}>{fmtMoney(FIN.proforma.egi)}</td><td style={totBg}>{pu(FIN.proforma.egi)}</td>
            </tr>
            <tr>
              <td style={{ ...tdl }}>Total Operating Expenses</td>
              <td style={tds}>-{fmtMoney(FIN.current.totExp)}</td><td style={tds}>-{pu(FIN.current.totExp)}</td>
              <td style={tds}>-{fmtMoney(FIN.proforma.totExp)}</td><td style={tds}>-{pu(FIN.proforma.totExp)}</td>
            </tr>
            <tr>
              <td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td>
              <td style={noiBg}>{fmtMoney(FIN.current.noi)}</td><td style={noiBg}>{pu(FIN.current.noi)}</td>
              <td style={noiBg}>{fmtMoney(FIN.proforma.noi)}</td><td style={noiBg}>{pu(FIN.proforma.noi)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
          Gross Potential Rent reflects the pro-forma (market) rent roll; Loss to Lease is the gap to in-place
          contract rents. Detailed expenses on the preceding page. Underwriting assumptions may differ from actual
          operations — verify independently.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
