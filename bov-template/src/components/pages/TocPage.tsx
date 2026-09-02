import { PageHeader, PageFooter, Img } from '../Shell.tsx'
import { DISCLAIMER_CONDENSED } from '../../data/advisors.ts'
import { MANIFEST } from '../../data/manifest.ts'

/* ═══════════════════ TABLE OF CONTENTS + DISCLAIMER ═══════════════════
   Rows and page numbers DERIVE from src/data/manifest.ts — the same array
   App.tsx numbers pages by — so adding, removing, or reordering a page
   never needs a hand edit here. Dividers become section heads; photo pages
   (tocHidden) stay out. The side column carries the condensed
   confidentiality notice (full text lives on the Your Advisors page).

   Past ~28 entries the list splits into two columns, breaking at the
   section head nearest the midpoint so a section never straddles the gap. */
const TWO_COL_AT = 28

interface TocRow {
  n: number
  label: string
  section: boolean
}

/** The rows, in manifest order. Cover and the contents page itself are not
    listed; a divider is a section head. */
function tocRows(): TocRow[] {
  const rows: TocRow[] = []
  MANIFEST.forEach((entry, i) => {
    if (entry.type === 'cover' || entry.type === 'toc' || entry.tocHidden) return
    rows.push({ n: i + 1, label: entry.title, section: entry.type === 'divider' })
  })
  return rows
}

function splitEntries(entries: TocRow[]): TocRow[][] {
  if (entries.length <= TWO_COL_AT) return [entries]
  const mid = entries.length / 2
  let split = Math.ceil(mid)
  entries.forEach((e, i) => {
    if (e.section && i > 0 && Math.abs(i - mid) < Math.abs(split - mid)) split = i
  })
  return [entries.slice(0, split), entries.slice(split)]
}

export default function TocPage({ pageNum }: { pageNum?: number }) {
  const cols = splitEntries(tocRows())
  const dense = cols.length > 1
  return (
    <div className="page">
      <PageHeader section="Contents" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Table of <span style={{ color: '#F8971D' }}>Contents</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: dense ? '2fr 1fr' : '1.5fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
          {/* Contents list — one column, or two when the long format runs past the fold */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: 26, minHeight: 0 }}>
            {cols.map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', justifyContent: dense ? 'flex-start' : 'space-between', gap: dense ? 5 : 0, paddingTop: 4, minHeight: 0 }}>
                {col.map(item => (
                  <div
                    key={`${item.n}-${item.label}`}
                    style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: item.section ? 0 : (dense ? 12 : 16), marginTop: dense && item.section ? 6 : 0 }}
                  >
                    <span style={{
                      fontSize: item.section ? (dense ? 9.4 : 11) : (dense ? 8.8 : 10),
                      fontWeight: item.section ? 800 : 500,
                      color: item.section ? 'var(--carbon)' : 'var(--graphite)',
                      textTransform: item.section ? 'uppercase' : 'none',
                      letterSpacing: item.section ? '0.06em' : '0',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.label}
                    </span>
                    <span style={{ flex: 1, borderBottom: '1px dotted var(--stone)', transform: 'translateY(-3px)', opacity: 0.6 }} />
                    <span style={{ fontSize: dense ? 8.6 : 9.2, fontWeight: 700, color: item.section ? 'var(--golden)' : 'var(--carbon)' }}>{item.n}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Condensed disclaimer column */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', position: 'relative', minHeight: 0, marginBottom: 9 }}>
              <Img src="/photos/toc.jpg" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(63,71,83,0.55), rgba(63,71,83,0) 45%)' }} />
            </div>
            <div style={{ fontSize: 8.3, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 6 }}>
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
