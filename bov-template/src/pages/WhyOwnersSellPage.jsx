import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle } from '../components/Blocks.jsx'
import { Banner } from '../components/Pitch.jsx'
import { WHY_OWNERS_SELL } from '../data/advisory.js'

/* ═══════════════════ WHY PROPERTY OWNERS DECIDE TO SELL ═══════════════════
   Nine motivations in a 3×3 grid, closed by the line that says what NPCG
   does with that knowledge. Copy: src/data/advisory.js. */
export default function WhyOwnersSellPage({ pageNum }) {
  const { subtitle, lead, reasons, banner } = WHY_OWNERS_SELL
  return (
    <div className="page">
      <PageHeader section="Beyond the Sale" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Why Property Owners" accent="Decide to Sell" subtitle={subtitle} />
        <div style={{ fontSize: 10.4, fontWeight: 700, lineHeight: 1.45, color: 'var(--carbon)', margin: '2px 0 0', maxWidth: 860 }}>{lead}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '0 30px', flex: 1, minHeight: 0, margin: '10px 0 16px' }}>
          {reasons.map(r => (
            <div key={r.title} style={{ borderTop: '1px solid var(--border)', padding: '12px 0 8px', minHeight: 0 }}>
              <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--golden)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3, marginBottom: 5 }}>{r.title}</div>
              <div style={{ fontSize: 9, lineHeight: 1.48, color: 'var(--graphite)' }}>{r.body}</div>
            </div>
          ))}
        </div>

        <Banner>{banner}</Banner>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
