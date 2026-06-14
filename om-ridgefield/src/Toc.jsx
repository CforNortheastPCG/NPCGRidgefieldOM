import { PageHeader, PageFooter } from './Shell.jsx'

/* ═══════════════════ TABLE OF CONTENTS ═══════════════════
   Page numbers here are derived from App's page order (auto-numbered). If you
   add/remove/reorder pages, update the `n` values below to match. */

const TOC = [
  { n: 3, label: 'Deal Contacts' },
  { n: 4, label: 'Executive Summary' },
  { n: 5, label: 'The Property', section: true },
  { n: 6, label: 'Building Overview', sub: true },
  { n: 7, label: 'Site Map', sub: true },
  { n: 8, label: 'Affordability Analysis', sub: true },
  { n: 9, label: 'Property Exterior', sub: true },
  { n: 10, label: 'Building A — Photos & Floor Plan', sub: true },
  { n: 15, label: 'Building B — Exterior, Photos & Floor Plan', sub: true },
  { n: 19, label: 'Building C — Exterior, Photos & Floor Plan', sub: true },
  { n: 23, label: 'Financial Analysis', section: true },
  { n: 24, label: 'Unit Mix & Rent Roll', sub: true },
  { n: 25, label: 'Income & Expense', sub: true },
  { n: 26, label: 'Location & Market', section: true },
  { n: 27, label: 'Ridgefield', sub: true },
  { n: 28, label: 'Location & Amenities', sub: true },
  { n: 29, label: 'Fairfield County', sub: true },
  { n: 30, label: 'Regional Positioning', sub: true },
  { n: 31, label: 'The Team', section: true },
  { n: 32, label: 'Your Advisor', sub: true },
  { n: 33, label: 'Team', sub: true },
  { n: 34, label: 'Our Locations', sub: true },
]

export default function Toc({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Contents" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Table of <span style={{ color: '#F8971D' }}>Contents</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          {/* Contents list */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 4 }}>
            {TOC.map(item => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: item.sub ? 16 : 0 }}
              >
                <span style={{
                  fontSize: item.section ? 11.5 : 10.5,
                  fontWeight: item.section ? 800 : 500,
                  color: item.section ? 'var(--carbon)' : 'var(--graphite)',
                  textTransform: item.section ? 'uppercase' : 'none',
                  letterSpacing: item.section ? '0.06em' : '0',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--stone)', transform: 'translateY(-3px)', opacity: 0.6 }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: item.section ? 'var(--golden)' : 'var(--carbon)' }}>{item.n}</span>
              </div>
            ))}
          </div>

          {/* Accent photo */}
          <div style={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <img src="/photos/Exterior Edit 2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(63,71,83,0.55), rgba(63,71,83,0) 45%)' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
