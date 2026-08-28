import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { FINANCIALS } from '../../data/financials.ts'
import { fmtMoney, fmtInt } from '../../lib/fmt.ts'
import type { RentRowData } from '../../lib/types.ts'

/** Full 53-line roll as twin side-by-side tables — one page, no clipping. */
export function RentRollDetail({ pageNum }: { pageNum?: number }) {
  const roll = FINANCIALS.rentRoll!
  const computed = FINANCIALS.computed.rentRoll!
  const rows = roll.rows
  const half = Math.ceil(rows.length / 2)
  const left = rows.slice(0, half)
  const right = rows.slice(half)

  const th = { fontSize: 7.8, padding: '4px 6px', lineHeight: 1.1 } as const
  const td = { fontSize: 8.6, padding: '3.5px 6px', lineHeight: 1.2 } as const
  const table = (rs: RentRowData[]) => (
    <table className="data-table" style={{ fontSize: 8.4 }}>
      <thead>
        <tr>
          <th style={th}>Unit</th>
          <th style={th}>Type</th>
          <th style={th} className="num">
            SF
          </th>
          <th style={th} className="num">
            In-Place / mo
          </th>
          <th style={th} className="num">
            Pro Forma
          </th>
        </tr>
      </thead>
      <tbody>
        {rs.map((r, i) => (
          <tr key={i}>
            <td style={td}>{r.unit}</td>
            <td style={td}>{r.use}</td>
            <td style={td} className="num">
              {r.sf != null ? fmtInt(r.sf) : '—'}
            </td>
            <td style={td} className="num">
              {r.rents['current'] != null ? fmtMoney(r.rents['current']) : '—'}
            </td>
            <td style={td} className="num">
              {r.rents['proForma'] != null ? fmtMoney(r.rents['proForma']) : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Rent Roll" />
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start', flex: 1, minHeight: 0 }}>
          {table(left)}
          {table(right)}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 8,
            padding: '7px 12px',
            background: 'var(--carbon)',
            color: '#fff',
            fontSize: 10.5,
            fontWeight: 700,
          }}
        >
          <span>Total · {computed.unitCount} Units</span>
          <span>{fmtInt(computed.totalSf)} SF</span>
          <span>{fmtMoney(computed.byColumn['current']!.monthly)} / mo In-Place</span>
          <span style={{ color: 'var(--golden)' }}>{fmtMoney(computed.byColumn['proForma']!.monthly)} / mo Pro Forma</span>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
