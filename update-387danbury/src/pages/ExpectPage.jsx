import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { FaqBlock } from '../components/Blocks.jsx'
import { EXPECT } from '../data/process.js'

/* ═══════════════════ WHAT TO EXPECT ═══════════════════
   Seller milestone checkpoints (with the decision each one carries) plus
   the questions owners ask most. Content: src/data/process.js. */
export default function ExpectPage({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Your Checkpoints</div>
        <div className="section-title" style={{ marginBottom: 2 }}>What to <span style={{ color: '#F8971D' }}>Expect</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>{EXPECT.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, flex: 1, minHeight: 0 }}>
          {/* Milestones with connector line */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0 }}>
            {EXPECT.milestones.map((m, i) => (
              <div key={m.title} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 62, textAlign: 'right' }}>
                  <div style={{ fontSize: 8.6, fontWeight: 800, color: 'var(--golden)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{m.week}</div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--golden)', marginTop: 2 }} />
                  {i < EXPECT.milestones.length - 1 && <span style={{ flex: 1, width: 2, background: 'var(--border)', marginTop: 2 }} />}
                </div>
                <div style={{ paddingBottom: 7, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 10.3, fontWeight: 800, color: 'var(--carbon)' }}>{m.title}</span>
                    <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', background: 'var(--carbon)', padding: '1.5px 7px', borderRadius: 8, whiteSpace: 'nowrap' }}>{m.decision}</span>
                  </div>
                  <div style={{ fontSize: 8.6, lineHeight: 1.38, color: 'var(--graphite)', marginTop: 1 }}>{m.body}</div>
                </div>
              </div>
            ))}
          </div>

          <FaqBlock items={EXPECT.faq} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
