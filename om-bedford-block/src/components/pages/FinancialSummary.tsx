import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { FINSUM_TILES, FINSUM_CARDS } from '../../data/finsummary.ts'
import type { FinsumCard } from '../../data/finsummary.ts'

function Card({ card }: { card: FinsumCard }) {
  return (
    <div className="bldg-card" style={{ minHeight: 0 }}>
      <h3>{card.title}</h3>
      <div className="bldg-rows">
        {card.rows.map(([l, v]) => (
          <div className="bldg-row" key={l} style={{ fontSize: 9.6, gap: 8 }}>
            <span className="bldg-label" style={{ whiteSpace: 'normal' }}>
              {l}
            </span>
            <span className="bldg-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Deal snapshot — pricing, Year 1 operations, levered returns, and debt
    assumptions in four columns under the headline tiles. */
export function FinancialSummary({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="Financial Summary" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Financial" accent="Summary" />
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
          {FINSUM_TILES.map((t) => (
            <div className="stat-tile" key={t.l}>
              <div className="st-val">{t.v}</div>
              <div className="st-label">{t.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, flex: 1, minHeight: 0 }}>
          {FINSUM_CARDS.map((c) => (
            <Card card={c} key={c.title} />
          ))}
        </div>
        <div style={{ fontSize: 8.5, color: 'var(--stone)', marginTop: 8 }}>
          Investment review and debt figures are model outputs from the deal's underwriting; see Cash Flow Analysis
          for year-by-year detail.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
