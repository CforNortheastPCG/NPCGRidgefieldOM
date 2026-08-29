import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { MARKET } from '../data/market.js'

/* ═══════════════════ MARKET OVERVIEW ═══════════════════
   Narrative + demographics (market vs state averages) + employers, with a
   photo column. Data: src/data/market.js (overview). */
export default function MarketOverview({ pageNum }) {
  const o = MARKET.overview
  return (
    <div className="page">
      <PageHeader section="Market Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Market <span style={{ color: '#F8971D' }}>Overview — {o.titleAccent}</span></div>
          <div style={{ fontSize: 10.2, fontWeight: 600, color: 'var(--carbon)', marginBottom: 6 }}>{o.subtitle}</div>
          <div className="title-rule" />
          <div style={{ fontSize: 8.6, lineHeight: 1.42, color: 'var(--graphite)', marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {o.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="eyebrow" style={{ marginBottom: 5 }}>Demographics — {o.town} vs. {o.state}</div>
          <table className="data-table" style={{ fontSize: 8.6, marginBottom: 5 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>{o.town}</th>
                <th style={{ textAlign: 'right' }}>{o.state} Average</th>
              </tr>
            </thead>
            <tbody>
              {o.demographics.map(d => (
                <tr key={d.metric}>
                  <td>{d.metric}</td>
                  <td style={{ textAlign: 'right' }}>{d.local}</td>
                  <td style={{ textAlign: 'right' }}>{d.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 7.4, color: 'var(--stone)', marginBottom: 6, lineHeight: 1.35 }}>{o.sourceNote}</div>

          <div className="eyebrow" style={{ marginBottom: 5 }}>Major Area Employers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, justifyContent: 'space-between', minHeight: 0 }}>
            {o.employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 8.6, fontWeight: 800, color: 'var(--carbon)', marginBottom: 1 }}>{g.label}</div>
                <div style={{ fontSize: 8.4, lineHeight: 1.35, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          {o.photos.map(src => (
            <div key={src} style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
