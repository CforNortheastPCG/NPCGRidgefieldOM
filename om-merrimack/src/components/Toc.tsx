import { PageHeader, PageFooter, Img } from './Shell.tsx'
import { MANIFEST } from '../data/manifest.ts'
import { CITY_PHOTOS, COUNTY_PHOTOS, EXEC_PHOTO } from '../data/photos.ts'

/**
 * Table of contents in the book's editorial style: dotted leaders, section
 * rows in caps with their page number in golden, sub-pages indented — plus
 * an accent photo column. Rows and page numbers derive from the manifest
 * (1-based position, the same rule App.tsx numbers pages by), so structure
 * changes never need a hand edit here.
 */
interface TocRow {
  label: string
  page: number
  section?: boolean
  sub?: boolean
}

export function Toc({ pageNum }: { pageNum?: number }) {
  const rows: TocRow[] = []
  let inSection = false
  MANIFEST.forEach((entry, i) => {
    if (entry.type === 'cover' || entry.type === 'toc') return
    if (entry.type === 'divider') {
      rows.push({ label: entry.title, page: i + 1, section: true })
      inSection = true
      return
    }
    // Consecutive photo pages collapse to one row (first page wins).
    if (entry.type === 'photos' && rows[rows.length - 1]?.label === entry.title) return
    rows.push({ label: entry.title, page: i + 1, sub: inSection })
  })

  // Accent photo — a clean exterior establishing shot of the building. For
  // this deal the CITY/COUNTY photo arrays are interiors, so prefer the
  // front-facade EXEC_PHOTO and fall back gracefully.
  const accent = EXEC_PHOTO ?? CITY_PHOTOS[0] ?? COUNTY_PHOTOS[0] ?? CITY_PHOTOS[1] ?? COUNTY_PHOTOS[1]

  return (
    <div className="page">
      <PageHeader section="Contents" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '24px 32px 18px 40px' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Table of <span className="accent">Contents</span>
        </div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: accent ? '1.5fr 1fr' : '1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 4 }}>
            {rows.map((item) => (
              <div key={`${item.label}-${item.page}`} style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: item.sub ? 16 : 0 }}>
                <span
                  style={{
                    fontSize: item.section ? 11.5 : 10.5,
                    fontWeight: item.section ? 800 : 500,
                    color: item.section ? 'var(--carbon)' : 'var(--graphite)',
                    textTransform: item.section ? 'uppercase' : 'none',
                    letterSpacing: item.section ? '0.06em' : '0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--stone)', transform: 'translateY(-3px)', opacity: 0.6 }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: item.section ? 'var(--golden)' : 'var(--carbon)' }}>{item.page}</span>
              </div>
            ))}
          </div>

          {accent && (
            <div style={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <Img src={accent} />
            </div>
          )}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
