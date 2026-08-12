import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { MARKET } from '../data/market.js'

/* ═══════════════════ MARKET ACTIVITY ═══════════════════
   What's happening in the market: announced development and the
   laws/regulations a buyer will underwrite. Data: src/data/market.js. */
export default function MarketActivity({ pageNum }) {
  const a = MARKET.activity
  return (
    <div className="page">
      <PageHeader section="Market Activity" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">In the Market</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Development &amp; <span style={{ color: '#F8971D' }}>Regulation</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>{a.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, flex: 1, minHeight: 0 }}>
          {/* New development */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>New &amp; Notable Development</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'flex-start' }}>
              {a.developments.map(d => (
                <div key={d.title} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--carbon)' }}>{d.title}</div>
                  <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--golden)', margin: '1px 0 2px' }}>{d.meta}</div>
                  <div style={{ fontSize: 8.8, lineHeight: 1.42, color: 'var(--graphite)' }}>{d.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Laws & regulations */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Laws &amp; Regulations to Know</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'flex-start' }}>
              {a.regulations.map(r => (
                <div key={r.title} style={{ borderLeft: '3px solid var(--carbon)', paddingLeft: 11 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--carbon)' }}>{r.title}</div>
                  <div style={{ fontSize: 8.8, lineHeight: 1.42, color: 'var(--graphite)', marginTop: 2 }}>{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>{a.sourceNote}</div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
