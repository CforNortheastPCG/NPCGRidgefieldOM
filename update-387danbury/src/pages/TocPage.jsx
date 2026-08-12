import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { DISCLAIMER_CONDENSED } from '../data/advisors.js'

/* ═══════════════════ TABLE OF CONTENTS + DISCLAIMER ═══════════════════
   Entries are DERIVED from App.jsx's pageDefs — labels and numbers stay in
   sync automatically when pages are added, removed, or reordered. The side
   column carries the condensed confidentiality notice (full text lives on
   the Your Advisors page). */
export default function TocPage({ entries = [], pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Contents" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Table of <span style={{ color: '#F8971D' }}>Contents</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          {/* Contents list */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 4, minHeight: 0 }}>
            {entries.map(item => (
              <div
                key={`${item.n}-${item.label}`}
                style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: item.section ? 0 : 16 }}
              >
                <span style={{
                  fontSize: item.section ? 11 : 10,
                  fontWeight: item.section ? 800 : 500,
                  color: item.section ? 'var(--carbon)' : 'var(--graphite)',
                  textTransform: item.section ? 'uppercase' : 'none',
                  letterSpacing: item.section ? '0.06em' : '0',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--stone)', transform: 'translateY(-3px)', opacity: 0.6 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: item.section ? 'var(--golden)' : 'var(--carbon)' }}>{item.n}</span>
              </div>
            ))}
          </div>

          {/* Condensed disclaimer column */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', position: 'relative', minHeight: 0, marginBottom: 12 }}>
              <img src="/photos/toc.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(63,71,83,0.55), rgba(63,71,83,0) 45%)' }} />
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 6 }}>
              Confidentiality &amp; Disclaimer
            </div>
            {DISCLAIMER_CONDENSED.map((p, i) => (
              <p key={i} style={{ fontSize: 7.8, lineHeight: 1.45, color: 'var(--graphite)', marginBottom: 6 }}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
