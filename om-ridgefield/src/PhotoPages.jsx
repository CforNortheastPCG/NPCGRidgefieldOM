import { PageHeader, PageFooter } from './Shell.jsx'

/* ═══════════════════ PHOTO & FLOOR PLAN PAGES ═══════════════════
   Real photography pages (RISE Media), grouped per building A → B → C.
   PhotoPage renders a 2×2 grid of captioned photos; FloorPlanPage renders a
   single full-page unit plan. Data lives in photos.js (PHOTO_PAGES). */

function PhotoTile({ src, caption }) {
  return (
    <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', minHeight: 0, height: '100%' }}>
      <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', left: 0, bottom: 0, background: 'rgba(63,71,83,0.82)', color: '#fff',
        fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '4px 10px', borderTopRightRadius: 4,
      }}>{caption}</div>
    </div>
  )
}

/* Split N tiles into balanced rows so any count (1–6) fills the page cleanly:
   3→[3], 4→[2,2], 5→[3,2], 6→[3,3], etc. */
function rowsFor(n) {
  switch (n) {
    case 1: return [1]
    case 2: return [2]
    case 3: return [3]
    case 4: return [2, 2]
    case 5: return [3, 2]
    case 6: return [3, 3]
    default: { // 7+ : rows of 3
      const r = []
      let left = n
      while (left > 0) { r.push(Math.min(3, left)); left -= 3 }
      return r
    }
  }
}

export function PhotoPage({ section, title, accent, subtitle, images, rows, note, pageNum }) {
  // Chunk images into rows — an explicit `rows` override (e.g. [1, 2] for a big
  // hero on top + two below) wins; otherwise fall back to the balanced default.
  const rowSizes = rows || rowsFor(images.length)
  const rowGroups = []
  let idx = 0
  for (const size of rowSizes) {
    rowGroups.push(images.slice(idx, idx + size))
    idx += size
  }
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} <span style={{ color: '#F8971D' }}>{accent}</span>
        </div>
        <div className="title-rule" />
        {subtitle && (
          <div style={{ fontSize: 9.5, color: 'var(--stone)', marginBottom: 10 }}>{subtitle}</div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
          {rowGroups.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
              {row.map(img => (
                <div key={img.src} style={{ flex: 1, minWidth: 0 }}>
                  <PhotoTile {...img} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {note && (
          <div style={{ fontSize: 7.5, fontStyle: 'italic', color: 'var(--stone)', marginTop: 6 }}>{note}</div>
        )}
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

export function FloorPlanPage({ section, title, accent, subtitle, plan, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} <span style={{ color: '#F8971D' }}>{accent}</span>
        </div>
        <div className="title-rule" />
        {subtitle && (
          <div style={{ fontSize: 9.5, color: 'var(--stone)', marginBottom: 8 }}>{subtitle}</div>
        )}
        <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--linen)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
          <img src={plan} alt={section} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
