import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { MixCard, BarChartCard, type Slice } from '../Charts.tsx'
import { FINANCIALS } from '../../data/financials.ts'
import { fmtMoney, fmtInt } from '../../lib/fmt.ts'

const MIX_COLORS = ['#F8971D', '#9aa4b1', '#B55D37', '#3F4753', '#566573', '#7C8896', '#c4cad2']

/** Aggregated unit-mix table + charts — the roll itself is too deep for one
    page (53 rows) and lives on the Rent Roll detail page. */
export function UnitMixSummary({ pageNum }: { pageNum?: number }) {
  const roll = FINANCIALS.rentRoll!
  const computed = FINANCIALS.computed.rentRoll!
  const rows = roll.rows

  // Per-type aggregates derived from the row data itself.
  const agg = computed.unitMix.map((m) => {
    const rs = rows.filter((r) => r.use === m.use)
    const cur = rs.reduce((a, r) => a + (r.rents['current'] ?? 0), 0)
    const pf = rs.reduce((a, r) => a + (r.rents['proForma'] ?? 0), 0)
    return { ...m, curMonthly: cur, pfMonthly: pf }
  })
  const totalUnits = computed.unitCount
  const curTotal = computed.byColumn['current']!.monthly
  const pfTotal = computed.byColumn['proForma']!.monthly

  const mixSlices: Slice[] = agg.map((m, i) => ({
    label: m.use,
    value: m.count,
    color: MIX_COLORS[i % MIX_COLORS.length]!,
  }))
  const rentBars = [
    { label: 'In-Place', value: computed.byColumn['current']!.annual, color: '#3F4753' },
    { label: 'Pro Forma', value: computed.byColumn['proForma']!.annual, color: '#F8971D' },
  ]
  const upside = `+${fmtMoney(rentBars[1]!.value - rentBars[0]!.value)} · +${Math.round(
    ((rentBars[1]!.value - rentBars[0]!.value) / rentBars[0]!.value) * 100,
  )}% rental upside`

  return (
    <div className="page">
      <PageHeader section="Unit Mix" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Unit Mix" accent="Summary" />
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10.5 }}>
          <thead>
            <tr>
              <th>Unit Type</th>
              <th className="num">Count</th>
              <th className="num">% of Units</th>
              <th className="num">Unit SF</th>
              <th className="num">Total SF</th>
              <th className="num">In-Place / mo</th>
              <th className="num">Pro Forma / mo</th>
            </tr>
          </thead>
          <tbody>
            {agg.map((m) => (
              <tr key={m.use}>
                <td>
                  <strong>{m.use}</strong>
                </td>
                <td className="num">{m.count}</td>
                <td className="num">{Math.round((m.count / totalUnits) * 100)}%</td>
                <td className="num">{m.avgSf != null ? fmtInt(m.avgSf) : `${fmtInt(m.totalSf)} total`}</td>
                <td className="num">{fmtInt(m.totalSf)}</td>
                <td className="num">{fmtMoney(m.curMonthly)}</td>
                <td className="num">{fmtMoney(m.pfMonthly)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>
                <strong>Total</strong>
              </td>
              <td className="num">
                <strong>{totalUnits}</strong>
              </td>
              <td className="num">
                <strong>100%</strong>
              </td>
              <td className="num">—</td>
              <td className="num">
                <strong>{fmtInt(computed.totalSf)}</strong>
              </td>
              <td className="num">
                <strong>{fmtMoney(curTotal)}</strong>
              </td>
              <td className="num">
                <strong>{fmtMoney(pfTotal)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: 40,
            marginTop: 14,
            flex: 1,
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          <MixCard
            title="Units by Type"
            data={mixSlices}
            centerLabel={String(totalUnits)}
            centerSub="UNITS"
            fmt={(v) => String(v)}
          />
          <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={rentBars} note={upside} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
