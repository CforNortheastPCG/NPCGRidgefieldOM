import { PageHeader, PageFooter } from './Shell.jsx'
import { LEADERSHIP } from './firm.js'

/* ═══════════════════ YOUR ADVISOR (BROKER PROFILE) ═══════════════════
   Single-advisor profile page modeled on the northeastpcg.com agent page
   (taylor-perun). Headshot + contact on the left, bio / track record /
   recognition / education on the right. Contact data is pulled from
   firm.js so it stays in sync. */

const ADVISOR = LEADERSHIP.find(m => m.name === 'Taylor Perun')

const STATS = [
  { value: '150+', label: 'Transactions Closed' },
  { value: '$440.663M', label: 'Transaction Volume' },
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
              <div className="bldg-row"><span className="bldg-label">Direct</span><span className="bldg-val">(203) 307-1576</span></div>
              <div className="bldg-row"><span className="bldg-label">Email</span><span className="bldg-val">{ADVISOR.email}</span></div>
              <div className="bldg-row"><span className="bldg-label">Licensed</span><span className="bldg-val">CT &middot; MA &middot; NY</span></div>
            </div>
          </div>

          {/* RIGHT — overview, stats, recognition, education */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Professional Overview</div>
            <p style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 8 }}>
              Taylor Perun is a Senior Vice President of Investments at Northeast Private Client Group, where he
              has spent over a decade advising owners of multifamily and commercial real estate across central
              and eastern Connecticut and western and central Massachusetts.
            </p>
            <p style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 14 }}>
              Operating from the firm&rsquo;s Connecticut office, Taylor holds a senior leadership role and has
              built and trained multiple high-performing brokerage teams. His practice is grounded in rigorous
              underwriting, deep market knowledge, and a disciplined, client-first process that helps investors
              maximize value and execute with confidence at every stage of the transaction.
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
                <div className="eyebrow" style={{ marginBottom: 8 }}>Recognition</div>
                <ul className="highlights" style={{ fontSize: 10.5 }}>
                  <li><strong>CoStar Power Broker</strong> — 2024 &amp; 2025</li>
                  <li><strong>Connect Media Top Broker</strong> — 2022</li>
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Education</div>
                <ul className="highlights" style={{ fontSize: 10.5 }}>
                  <li><strong>B.S., Business</strong> — Western New England University</li>
                  <li><strong>M.B.A., Finance</strong> — Fairfield University</li>
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
