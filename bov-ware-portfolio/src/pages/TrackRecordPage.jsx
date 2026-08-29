import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { TRACK_RECORD } from '../data/trackRecord.js'
import { fmtMoney } from '../lib/calc.js'

/* ═══════════════════ OUR TRACK RECORD ═══════════════════
   NPCG closed transactions in this deal's market — the proof-of-execution
   page. Rows: src/data/trackRecord.js (hand-authored from Salesforce).
   Totals and price/unit are computed. */
export default function TrackRecordPage({ pageNum }) {
  const { marketLabel, sinceYear, proximity, deals, sourceNote } = TRACK_RECORD
  const totalVolume = deals.reduce((s, d) => s + d.price, 0)
  return (
    <div className="page">
      <PageHeader section="Track Record" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Proof of Execution</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Recent Closings — <span style={{ color: '#F8971D' }}>{marketLabel}</span></div>
        <div className="title-rule" />
        <p style={{ fontSize: 9.7, lineHeight: 1.45, margin: '2px 0 10px', color: 'var(--graphite)' }}>
          Northeast Private Client Group has closed <strong>{deals.length} investment sales</strong> in the {marketLabel} market
          since {sinceYear} — <strong>{fmtMoney(totalVolume)}</strong> in aggregate consideration, {proximity}.
        </p>
        <table className="data-table" style={{ fontSize: 9 }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>City</th>
              <th style={{ textAlign: 'right' }}>Units</th>
              <th style={{ textAlign: 'right' }}>Sale Price</th>
              <th style={{ textAlign: 'right' }}>Price / Unit</th>
              <th style={{ textAlign: 'center' }}>Closed</th>
              <th>Lead Broker</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d, i) => (
              <tr key={i}>
                <td>{d.address}</td>
                <td>{d.city}</td>
                <td style={{ textAlign: 'right' }}>{d.units ?? '—'}</td>
                <td style={{ textAlign: 'right' }}>{fmtMoney(d.price)}</td>
                <td style={{ textAlign: 'right' }}>{d.units ? fmtMoney(d.price / d.units) : '—'}</td>
                <td style={{ textAlign: 'center' }}>{d.closed}</td>
                <td>{d.broker}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total — {deals.length} Closings</strong></td>
              <td />
              <td />
              <td style={{ textAlign: 'right' }}><strong>{fmtMoney(totalVolume)}</strong></td>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>{sourceNote}</p>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
