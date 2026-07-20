import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { TRACK_RECORD } from '../../data/track-record.ts'
import { fmtMoney } from '../../lib/fmt.ts'

/** NPCG closed transactions in the Greater Lowell market — the BOV's
    proof-of-execution page. Rows come from src/data/track-record.ts
    (sourced from the firm's Salesforce closed-deal pipeline). */
export function TrackRecord({ pageNum }: { pageNum?: number }) {
  const totalVolume = TRACK_RECORD.reduce((s, d) => s + d.price, 0)

  return (
    <div className="page">
      <PageHeader section="Track Record" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Recent Closings —" accent="Greater Lowell" />
        <div className="title-rule" />
        <p style={{ fontSize: 10.5, margin: '6px 0 10px' }}>
          Northeast Private Client Group has closed {TRACK_RECORD.length} investment sales in the
          Lowell&ndash;Lawrence&ndash;Methuen market since 2019 — {fmtMoney(totalVolume)} in aggregate
          consideration within a ten-minute drive of 24 Merrimack Street.
        </p>
        <table className="data-table" style={{ fontSize: 10.5 }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>City</th>
              <th className="num">Units</th>
              <th className="num">Sale Price</th>
              <th className="num">Price / Unit</th>
              <th className="ctr">Closed</th>
              <th>Lead Broker</th>
            </tr>
          </thead>
          <tbody>
            {TRACK_RECORD.map((d, i) => (
              <tr key={i}>
                <td>{d.address}</td>
                <td>{d.city}</td>
                <td className="num">{d.units ?? '—'}</td>
                <td className="num">{fmtMoney(d.price)}</td>
                <td className="num">{d.units ? fmtMoney(Math.round(d.price / d.units)) : '—'}</td>
                <td className="ctr">{d.closed}</td>
                <td>{d.broker}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>Total &mdash; {TRACK_RECORD.length} Closings</td>
              <td />
              <td />
              <td className="num">
                <strong>{fmtMoney(totalVolume)}</strong>
              </td>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 8.5, color: 'var(--graphite)', marginTop: 8 }}>
          Source: NPCG closed-transaction records, July 2026. Unit counts per firm CRM property records.
        </p>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
