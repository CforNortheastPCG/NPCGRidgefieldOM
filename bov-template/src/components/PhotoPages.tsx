import { PageHeader, PageFooter, assetUrl } from './Shell.tsx'
import type { FloorPlanData, PhotoImage, PhotoPageData } from '../lib/types.ts'

/* ═══════════════════ PHOTO & FLOOR PLAN PAGES ═══════════════════
   Real photography pages (RISE Media), grouped per building A → B → C.
   PhotoPage renders a 2×2 grid of captioned photos; FloorPlanPage renders a
   single full-page unit plan. Data lives in photos.js (PHOTO_PAGES). */

function PhotoTile({ src, caption, pos }: PhotoImage) {
  return (
    <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', minHeight: 0, height: '100%' }}>
      <img src={assetUrl(src)} alt={caption ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center', display: 'block' }} />
    </div>
  )
}

/* Split N tiles into balanced rows so any count (1–6) fills the page cleanly:
   3→[3], 4→[2,2], 5→[3,2], 6→[3,3], etc. */
function rowsFor(n: number): number[] {
  switch (n) {
    case 1: return [1]
    case 2: return [2]
    case 3: return [3]
    case 4: return [2, 2]
    case 5: return [3, 2]
    case 6: return [3, 3]
    default: { // 7+ : rows of 3
      const r: number[] = []
      let left = n
      while (left > 0) { r.push(Math.min(3, left)); left -= 3 }
      return r
    }
  }
}

export function PhotoPage({ section, title, accent, subtitle, images, rows, note, pageNum }: PhotoPageData & { pageNum?: number }) {
  // Chunk images into rows — an explicit `rows` override (e.g. [1, 2] for a big
  // hero on top + two below) wins; otherwise fall back to the balanced default.
  const rowSizes = rows || rowsFor(images.length)
  const rowGroups: PhotoImage[][] = []
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
          <div style={{ fontSize: 8.7, color: 'var(--stone)', marginBottom: 8 }}>{subtitle}</div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 0 }}>
          {rowGroups.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
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

/* Grid of representative unit floor plans (RISE / Cubicasa line drawings,
   bottom SF summary cropped off). Plans are line art on white, so tiles use a
   contained fit on a white card — never `cover` (would clip rooms). */
export function FloorPlansPage({ section, title, accent, subtitle, plans, note, pageNum }: {
  section: string
  title: string
  accent?: string
  subtitle?: string
  plans: FloorPlanData[]
  note?: string
  pageNum?: number
}) {
  const rowSizes = rowsFor(plans.length)
  const rowGroups: FloorPlanData[][] = []
  let idx = 0
  for (const size of rowSizes) {
    rowGroups.push(plans.slice(idx, idx + size))
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
          <div style={{ fontSize: 8.7, color: 'var(--stone)', marginBottom: 8 }}>{subtitle}</div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 0 }}>
          {rowGroups.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0 }}>
              {row.map(p => (
                <div key={p.src} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0, border: '1px solid var(--linen)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
                  <div style={{ flex: 1, minHeight: 0, padding: 8 }}>
                    <img src={assetUrl(p.src)} alt={p.unit} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <div style={{ borderTop: '1px solid var(--linen)', padding: '5px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 8.3, fontWeight: 800, color: 'var(--carbon)', letterSpacing: '0.04em' }}>{p.unit}</span>
                      <span style={{ fontSize: 8.5, color: 'var(--stone)' }}>{p.type}</span>
                    </div>
                    {p.sub && <div style={{ fontSize: 7.5, fontStyle: 'italic', color: 'var(--stone)', marginTop: 1 }}>{p.sub}</div>}
                  </div>
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

export function FloorPlanPage({ section, title, accent, subtitle, plan, pageNum }: {
  section: string
  title: string
  accent?: string
  subtitle?: string
  /** Path to a single full-page plan image. */
  plan: string
  pageNum?: number
}) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} <span style={{ color: '#F8971D' }}>{accent}</span>
        </div>
        <div className="title-rule" />
        {subtitle && (
          <div style={{ fontSize: 8.7, color: 'var(--stone)', marginBottom: 8 }}>{subtitle}</div>
        )}
        <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--linen)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
          <img src={assetUrl(plan)} alt={section} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
