import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle } from '../Blocks.tsx'
import { BulletList } from '../Pitch.tsx'
import { SELLING_STAGES } from '../../data/process.ts'

/* ═══════════════════ SELLING PROCESS STAGES ═══════════════════
   The three stages of an NPCG disposition — Sales & Marketing, Negotiation
   & Contract, Transaction Management — as three full-width bands, bullets
   in two columns. The middle band bleeds linen to the page edge so the
   stages read as a sequence rather than a list. Copy: src/data/process.js. */
export default function SellingStagesPage({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="Selling Process"
          accent="Stages"
          subtitle="Sales & Marketing · Negotiation & Contract · Transaction Management"
          style={{ marginBottom: 4 }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, margin: '6px -34px 0' }}>
          {SELLING_STAGES.map((s, i) => (
            <div
              key={s.num}
              style={{
                flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '66px 1fr', gap: 6,
                padding: '14px 34px 10px',
                background: i % 2 === 1 ? 'var(--linen)' : 'transparent',
                borderTop: i ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 400, color: 'var(--golden)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10.6, fontWeight: 800, color: 'var(--golden)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>{s.title}</div>
                <BulletList
                  items={s.items}
                  size={8.9}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 26px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
