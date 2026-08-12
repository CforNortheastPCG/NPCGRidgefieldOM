import { PageHeader, PageFooter, Md } from '../components/Shell.jsx'
import { PROJECT } from '../data/project.js'

/* ═══════════════════ THE PROJECT ═══════════════════
   The assignment page — who engaged NPCG, what this document concludes,
   and the methodology behind it. Data: src/data/project.js. */
export default function ProjectPage({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Project" />
      <div className="section--tight" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div className="eyebrow">{PROJECT.eyebrow}</div>
        <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Project</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 26, flex: 1, minHeight: 0 }}>
          {/* Left: stats + narrative + methodology */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PROJECT.stats.length}, 1fr)`, gap: 10, marginBottom: 12 }}>
              {PROJECT.stats.map(s => (
                <div key={s.l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            {PROJECT.paragraphs.map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 10.8, lineHeight: 1.45, marginBottom: 8, color: 'var(--graphite)' }} />
            ))}
            <div className="eyebrow" style={{ marginTop: 6, marginBottom: 6 }}>How This Opinion Was Built</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, justifyContent: 'flex-start' }}>
              {PROJECT.methodology.map(m => (
                <div key={m.head} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--carbon)' }}>{m.head}</div>
                  <div style={{ fontSize: 8.8, lineHeight: 1.4, color: 'var(--graphite)', marginTop: 1 }}>{m.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo + not-an-appraisal note */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src={PROJECT.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ background: 'var(--linen)', borderLeft: '4px solid var(--golden)', padding: '10px 13px' }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 3 }}>Please Note</div>
              <div style={{ fontSize: 8.8, lineHeight: 1.45, color: 'var(--graphite)' }}>{PROJECT.note}</div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
