import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { PROCESS_INTRO, PROCESS_STEPS } from '../data/process.js'

/* ═══════════════════ THE PROCESS ═══════════════════
   Six-step marketing workflow with durations — the campaign at a glance.
   Content: src/data/process.js. */
export default function ProcessPage({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">How We Sell Your Property</div>
        <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Process</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>{PROCESS_INTRO}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: 12, flex: 1, minHeight: 0 }}>
          {PROCESS_STEPS.map(s => (
            <div key={s.num} style={{ display: 'flex', gap: 12, border: '1px solid var(--border)', borderRadius: 4, padding: '11px 14px', minHeight: 0 }}>
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--carbon)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{s.num}</div>
                <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--golden)', whiteSpace: 'nowrap' }}>{s.durationLabel}</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 8.8, lineHeight: 1.42, color: 'var(--graphite)' }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
