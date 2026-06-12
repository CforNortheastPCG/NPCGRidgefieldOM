import { PageHeader, PageFooter } from './Shell.jsx'
import { SENIOR_INVESTMENT_SALES } from './firm.js'

/* ═══════════════════ YOUR ADVISOR (BROKER PROFILE) ═══════════════════ */

const ADVISOR = SENIOR_INVESTMENT_SALES.find(m => m.name === 'Rich Edwards Jr.')

const STATS = [
  { value: '225+', label: 'Transactions Closed' },
  { value: '$1.084B', label: 'Transaction Volume' },
  { value: '10+', label: 'Years of Experience' },
]

export default function BrokerProfile({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Your Advisor" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Your <span style={{ color: '#F8971D' }}>Advisor</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          {/* LEFT — headshot + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', minHeight: 0, border: '3px solid var(--golden)' }}>
              <img src={ADVISOR.photo} alt={ADVISOR.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{ADVISOR.name}</div>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--golden)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{ADVISOR.title}</div>
              <div className="bldg-row"><span className="bldg-label">Direct</span><span className="bldg-val">(203) 307-1577</span></div>
              <div className="bldg-row"><span className="bldg-label">Email</span><span className="bldg-val">{ADVISOR.email}</span></div>
              <div className="bldg-row"><span className="bldg-label">Licensed</span><span className="bldg-val">CT</span></div>
            </div>
          </div>

          {/* RIGHT — overview, stats, education */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Professional Overview</div>
            <p style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 8 }}>
              Rich Edwards Jr. is a Vice President of Investments at Northeast Private Client Group, where he
              has been a key member of the Metro North Team since joining the firm in 2015. Rich focuses on
              establishing and maintaining client relationships, advising clients on market conditions, and
              managing the investment sales process from listing through closing.
            </p>
            <p style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 14 }}>
              Operating from the firm&rsquo;s Connecticut office, Rich has closed over 225 transactions
              totaling more than $1 billion in sales volume. His practice is grounded in deep local market
              knowledge, strong client relationships, and a disciplined process that helps investors
              maximize value and execute with confidence.
            </p>

            <div className="metric-cards" style={{ marginBottom: 16 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '8px 6px', borderTop: '3px solid var(--golden)' }}>
                  <div className="m-val" style={{ fontSize: 19 }}>{s.value}</div>
                  <div className="m-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Education</div>
                <ul className="highlights" style={{ fontSize: 10.5 }}>
                  <li><strong>B.S., Business Administration</strong> — Salve Regina University</li>
                  <li>Captain, College Football Team</li>
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Focus Areas</div>
                <ul className="highlights" style={{ fontSize: 10.5 }}>
                  <li><strong>Multifamily Investment Sales</strong> — Fairfield County &amp; Metro North</li>
                  <li><strong>Client Advisory</strong> — Market positioning &amp; transaction management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
