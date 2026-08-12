import { PageHeader, PageFooter } from './Shell.jsx'

/* ═══════════════════ LISTING-UPDATE SHARED BLOCKS ═══════════════════
   Small layout primitives shared by the update pages so every page keeps
   the same eyebrow / title / rule rhythm as the rest of the deck. */

export function UpdateShell({ section, eyebrow, title, accent, children, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">{eyebrow}</div>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} {accent && <span style={{ color: 'var(--golden)' }}>{accent}</span>}
        </div>
        <div className="title-rule" />
        {children}
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* Bordered stat-tile strip; column count follows the data (or pass cols to
   wrap onto multiple rows — portrait pages want 3-up). `bare` drops every
   border for an open, box-free strip. `bump` adds px to both font sizes. */
export function StatGrid({ stats, cols, style, bare, bump = 0 }) {
  return (
    <div
      className="exec-stats-grid"
      style={{ gridTemplateColumns: `repeat(${cols || stats.length}, 1fr)`, marginBottom: 0, ...(bare && { border: 'none' }), ...style }}
    >
      {stats.map(s => (
        <div key={s.l} className="exec-stat" style={bare ? { borderRight: 'none' } : { borderBottom: '1px solid var(--border)', marginBottom: -1 }}>
          <div className="exec-stat-value" style={bump ? { fontSize: 20 + bump } : undefined}>{s.v}</div>
          <div className="exec-stat-label" style={bump ? { fontSize: 8.5 + bump } : undefined}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}

/* Horizontal comparison bars — zero-baseline, direct-labeled (value text lives
   in ink, never inside the fill). data: [{label, value, color, sub?}] */
export function HBarChart({ data, fmt = v => v, max }) {
  const top = max || Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {data.map(d => (
        <div key={d.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
            <span style={{ fontSize: 11.6, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.label}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 12, background: '#f1ede9', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(1.5, (d.value / top) * 100)}%`, height: '100%', background: d.color, borderRadius: 3 }} />
          </div>
          {d.sub && <div style={{ fontSize: 10.6, color: 'var(--stone)', fontWeight: 600, marginTop: 2 }}>{d.sub}</div>}
        </div>
      ))}
    </div>
  )
}

/* Golden-underlined block heading with an optional uppercase meta line.
   `bump` adds that many px to both font sizes (page-level size overrides). */
export function BlockHead({ title, meta, bump = 0 }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h3 style={{ fontSize: 11.5 + bump, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 5, borderBottom: '2px solid var(--golden)', margin: 0 }}>
        {title}
      </h3>
      {meta && <div style={{ fontSize: 7.8 + bump, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 5 }}>{meta}</div>}
    </div>
  )
}

/* Narrative block — tours, leads, comp stories. `bare` drops the card box
   for an open row (matching the unboxed campaign/metrics pages). */
export function StoryCard({ name, meta, body, size = 'md', bare }) {
  const lg = size === 'lg'
  return (
    <div style={bare ? {} : { border: '1px solid var(--border)', borderLeft: '3px solid var(--golden)', borderRadius: 4, padding: lg ? '16px 20px' : '12px 16px' }}>
      <div style={{ fontSize: lg ? 16 : 14.5, fontWeight: 800, color: 'var(--carbon)' }}>{name}</div>
      {meta && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--golden)', margin: '2px 0 5px' }}>{meta}</div>}
      <div style={{ fontSize: lg ? 13.3 : 12.4, lineHeight: 1.55, color: 'var(--graphite)' }}>{body}</div>
    </div>
  )
}
