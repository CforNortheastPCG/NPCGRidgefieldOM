import { PageHeader, PageFooter, PlaceholderBanner, SectionTitle, Img } from '../Shell.tsx'
import { HIGHLIGHT_PHOTOS } from '../../data/photos.ts'
import { HIGHLIGHTS } from '../../content/index.ts'
import type { HighlightsContent } from '../../content/types.ts'

function TextBox({ group, small }: { group: HighlightsContent['groups'][number]; small?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '2px 6px' }}>
      <div className="hl-group-title">{group.title}</div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          justifyContent: 'space-between',
          minHeight: 0,
        }}
      >
        {group.items.map((it, i) => (
          <div className={`hl-item${small ? ' hl-item--sm' : ''}`} key={i}>
            <div className="hl-head">{it.head}</div>
            <p className="hl-body">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function InvestmentHighlights({ pageNum }: { pageNum?: number }) {
  const [g1, g2] = HIGHLIGHTS.groups
  const [p1, p2] = HIGHLIGHT_PHOTOS
  return (
    <div className="page">
      {!HIGHLIGHTS.generated && <PlaceholderBanner what="investment highlights" />}
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Investment Highlights" />
        <div className="title-rule" />
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 12,
            minHeight: 0,
            paddingTop: 6,
          }}
        >
          {g1 && <TextBox group={g1} />}
          <div style={{ borderRadius: 8, overflow: 'hidden', minHeight: 0, background: 'var(--linen)', border: '1px solid var(--border)' }}>
            {p1 && <Img src={p1} />}
          </div>
          <div style={{ borderRadius: 8, overflow: 'hidden', minHeight: 0, background: 'var(--linen)', border: '1px solid var(--border)' }}>
            {p2 && <Img src={p2} />}
          </div>
          {g2 && <TextBox group={g2} />}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
