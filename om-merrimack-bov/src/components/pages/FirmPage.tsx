import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { OFFICES } from '../../data/firm.ts'

/** About-the-firm page for the BOV — culture copy supplied by the client
    team; stats trace to the firm's Salesforce closed-deal pipeline
    ("Closed Deal Pipeline 2014 - Present", pulled 2026-07-14). */
const STATS = [
  { val: '$2.4B+', label: 'Closed Volume Since 2014' },
  { val: '750+', label: 'Closed Transactions' },
  { val: '14', label: 'Greater Lowell Closings Since 2019' },
]

export function FirmPage({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="The Team" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Our" accent="Approach" />
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, margin: '14px 0 22px' }}>
          {STATS.map((s) => (
            <div className="stat-tile" key={s.label}>
              <div className="st-val">{s.val}</div>
              <div className="st-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 620, fontSize: 12, lineHeight: 1.75, color: 'var(--carbon)' }}>
          <p style={{ margin: '0 0 16px' }}>
            Ours is a culture that champions teamwork and celebrates each other. Our collaborative
            approach allows us to put your best interests first.
          </p>
          <p style={{ margin: '0 0 16px' }}>
            As we enter our second decade, we are even more committed to building long-term
            relationships by continuing to provide value-added advisory and transactional services
            to investment property owners and professional real estate investors.
          </p>
          <p
            style={{
              margin: '22px 0',
              paddingLeft: 16,
              borderLeft: '3px solid var(--golden)',
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.45,
            }}
          >
            But we don&rsquo;t want to just sell your building.
          </p>
          <p style={{ margin: '0 0 16px' }}>
            When you engage Northeast Private Client Group, you are not hiring a single broker
            &mdash; you are engaging the entire firm: an investment sales team working across
            seven offices from New England to Florida, an investor database built over 750+
            closed transactions, and in-house marketing, underwriting, and transaction
            coordination that carry a deal from valuation through closing.
          </p>
          <p style={{ margin: 0 }}>
            We aim to guide you with market knowledge that helps you make the right decision
            &mdash; at the right time &mdash; to maximize value and return on your investment.
          </p>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 18 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--golden)',
              marginBottom: 8,
            }}
          >
            Our Offices
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            {OFFICES.map((o) => (
              <div key={o.region} style={{ fontSize: 8.5, lineHeight: 1.45 }}>
                <div style={{ fontWeight: 700, color: 'var(--carbon)', whiteSpace: 'nowrap' }}>{o.region}</div>
                <div style={{ color: 'var(--graphite)', whiteSpace: 'nowrap' }}>
                  {o.address2.includes('·') ? o.address2.split('·')[1]!.trim() : o.address2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
