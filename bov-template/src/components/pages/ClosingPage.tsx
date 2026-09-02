import { PageHeader, PageFooter } from '../Shell.tsx'
import { CLOSING } from '../../data/process.ts'

/* ═══════════════════ CLOSING ═══════════════════
   The closing handoff — what NPCG's transaction team coordinates in the
   final weeks — plus FAQ. Content: src/data/process.js. */
export default function ClosingPage({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Funding Day, Managed</div>
        <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Closing</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 9 }}>{CLOSING.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: 9, flex: 1, minHeight: 0 }}>
          {CLOSING.items.map(it => (
            <div key={it.title} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
              <div style={{ fontSize: 9.3, fontWeight: 800, color: 'var(--carbon)', marginBottom: 2 }}>{it.title}</div>
              <div style={{ fontSize: 8.8, lineHeight: 1.42, color: 'var(--graphite)' }}>{it.body}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 19, marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          {CLOSING.faq.map(f => (
            <div key={f.q}>
              <div style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.3 }}>{f.q}</div>
              <div style={{ fontSize: 8.6, lineHeight: 1.42, color: 'var(--graphite)', marginTop: 2 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
