import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle, Callout } from '../components/Blocks.jsx'
import { BulletList, CardHead } from '../components/Pitch.jsx'
import { BUYER_TRACKING } from '../data/process.js'

/* ═══════════════════ BUYER TRACKING & FOLLOW-UP ═══════════════════
   "Proactive buyer management. Relentless follow-up." — how every inquiry
   is logged, worked, reported, and re-engaged, in four quadrants.
   Copy: src/data/process.js. */
export default function BuyerTrackingPage({ pageNum }) {
  const { subtitle, lead, close, quadrants } = BUYER_TRACKING
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Buyer Tracking &" accent="Follow-Up" subtitle={subtitle} />
        <div style={{ fontSize: 9.8, lineHeight: 1.5, color: 'var(--graphite)', margin: '2px 0 9px', maxWidth: 860 }}>{lead}</div>
        <Callout>
          <span style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.45 }}>{close}</span>
        </Callout>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, flex: 1, minHeight: 0, marginTop: 14 }}>
          {quadrants.map(q => (
            <div key={q.title} className="bldg-card" style={{ minHeight: 0, padding: '15px 18px' }}>
              <CardHead icon={q.icon}>{q.title}</CardHead>
              <BulletList items={q.items} size={9.1} gap={7} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
