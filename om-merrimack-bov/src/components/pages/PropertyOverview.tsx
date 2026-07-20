import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { OVERVIEW } from '../../data/overview.ts'
import type { OverviewCard } from '../../lib/types.ts'

function Card({ card }: { card: OverviewCard }) {
  // Flex weight tracks row count so a 2-row card doesn't stretch as tall
  // as a 9-row one — rows stay evenly spaced within each card.
  return (
    <div className="bldg-card" style={{ flex: Math.max(card.rows.length, 2) }}>
      <h3>{card.title}</h3>
      <div className="bldg-rows">
        {card.rows.map((r) => (
          <div className="bldg-row" key={r.label}>
            <span className="bldg-label">{r.label}</span>
            <span className="bldg-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PropertyOverview({ pageNum }: { pageNum?: number }) {
  const half = Math.ceil(OVERVIEW.cards.length / 2)
  const left = OVERVIEW.cards.slice(0, half)
  const right = OVERVIEW.cards.slice(half)
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SectionTitle text="Property Overview" />
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            {left.map((c) => (
              <Card card={c} key={c.title} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            {right.map((c) => (
              <Card card={c} key={c.title} />
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
