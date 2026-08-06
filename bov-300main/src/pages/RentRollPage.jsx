import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { RENT_ROLL } from '../data/rentRoll.js'
import { RR, fmtMoney, fmtNum } from '../lib/calc.js'

/* ═══════════════════ RENT ROLL (AS GIVEN) ═══════════════════
   The owner-provided rent roll, rendered as given, with computed totals and
   a summary strip. Data: src/data/rentRoll.js. */
export default function RentRollPage({ pageNum }) {
  const td = { fontSize: 8.3, padding: '1.6px 7px' }
  const tdr = { ...td, textAlign: 'right' }
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent Roll <span style={{ color: '#F8971D' }}>As Provided</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 8.6, color: 'var(--stone)', fontWeight: 600, marginBottom: 5 }}>
          As of {RENT_ROLL.asOf} &middot; {RENT_ROLL.source}
        </div>
        <table className="data-table" style={{ fontSize: 8.3 }}>
          <thead><tr>
            <th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th>
            <th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Pro Forma</th>
          </tr></thead>
          <tbody>
            {RENT_ROLL.units.map(u => (
              <tr key={u.unit}>
                <td style={td}>{u.unit}{u.note ? ' *' : ''}</td>
                <td style={td}>{u.type}</td>
                <td style={tdr}>{fmtNum(u.sqft)}</td>
                <td style={tdr}>{fmtMoney(u.inPlace)}</td>
                <td style={tdr}>{fmtMoney(u.proforma)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>{RR.unitCount} Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{fmtNum(RR.totSqft)}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{fmtMoney(RR.totInPlace)}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{fmtMoney(RR.totProforma)}</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 4, lineHeight: 1.4 }}>
          {RENT_ROLL.footnotes.join(' ')}
          {RENT_ROLL.units.some(u => u.note) && ' ' + RENT_ROLL.units.filter(u => u.note).map(u => `* Unit ${u.unit}: ${u.note}.`).join(' ')}
          {' '}Total In-Place {fmtMoney(RR.annualInPlace)}/yr; Pro Forma {fmtMoney(RR.annualProforma)}/yr.
        </div>

        {/* Summary strip */}
        <div style={{ display: 'flex', gap: 14, marginTop: 10, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>In-Place</h3>
            <div style={{ borderLeft: '3px solid #3F4753', paddingLeft: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{fmtMoney(RR.totInPlace)}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
              <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{fmtMoney(RR.avgInPlace)} avg / unit</div>
            </div>
          </div>
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Pro Forma</h3>
            <div style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{fmtMoney(RR.totProforma)}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
              <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{fmtMoney(RR.avgProforma)} avg / unit</div>
            </div>
          </div>
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Mark-to-Market</h3>
            <div style={{ borderLeft: '3px solid var(--terracotta)', paddingLeft: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{fmtMoney(RR.annualProforma - RR.annualInPlace)}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /yr</span></div>
              <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>upside as leases turn to market</div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
