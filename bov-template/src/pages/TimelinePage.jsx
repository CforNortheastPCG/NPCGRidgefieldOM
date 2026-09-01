import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle } from '../components/Blocks.jsx'
import { BulletList } from '../components/Pitch.jsx'
import { TIMELINE } from '../data/process.js'

/* ═══════════════════ MARKETING TIMELINE ═══════════════════
   Four phases — Prepare, Launch, Offers, Escrow — on a dotted rail, each
   with its week range in a carbon bubble and the work under it. Twelve
   weeks engagement to close. Copy: src/data/process.js. */
export default function TimelinePage({ pageNum }) {
  const { subtitle, lead, phases } = TIMELINE
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Marketing" accent="Timeline" subtitle={subtitle} />
        <div style={{ fontSize: 9.8, lineHeight: 1.5, color: 'var(--graphite)', margin: '2px 0 0', maxWidth: 860 }}>{lead}</div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1, minHeight: 0, marginTop: 52, marginBottom: 6 }}>
          {/* The rail runs bubble-centre to bubble-centre, behind the bubbles. */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '12.5%', right: '12.5%', top: -1, borderTop: '2px dotted var(--golden)', zIndex: 0 }} />

          {phases.map(p => (
            <div
              key={p.label}
              className="bldg-card"
              style={{ position: 'relative', zIndex: 1, padding: '48px 16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}
            >
              <div style={{
                position: 'absolute', top: -37, left: '50%', transform: 'translateX(-50%)',
                width: 74, height: 74, borderRadius: '50%', background: 'var(--carbon)',
                border: '4px solid var(--white)', color: 'var(--white)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 7.2, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85, lineHeight: 1 }}>Weeks</div>
                <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.05, marginTop: 3 }}>{p.weeks}</div>
              </div>

              <div style={{ fontSize: 11.2, fontWeight: 800, color: 'var(--golden)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 11 }}>{p.label}</div>
              <BulletList items={p.items} size={9.1} gap={8} style={{ width: '100%' }} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
