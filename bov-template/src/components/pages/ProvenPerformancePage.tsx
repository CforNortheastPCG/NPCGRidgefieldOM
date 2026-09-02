import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle, KpiStrip, SourceNote } from '../Blocks.tsx'
import { IconDisc } from '../Icons.tsx'
import { PROVEN_PERFORMANCE } from '../../data/firm.ts'

/* ═══════════════════ PROVEN PERFORMANCE ═══════════════════
   "Proven Performance. Trusted by Owners. Relied on by the Market." — the
   firm's six proof points, led by the hard numbers behind them. The stat
   strip reads FIRM_STATS through PROVEN_PERFORMANCE so the volume and
   transaction figures match the Why NPCG page. Copy: src/data/firm.js. */
export default function ProvenPerformancePage({ pageNum }: { pageNum?: number }) {
  const { subtitle, stats, points, note } = PROVEN_PERFORMANCE
  return (
    <div className="page">
      <PageHeader section="Why NPCG" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Proven Performance." accent="Trusted by Owners." subtitle={subtitle} />

        <KpiStrip items={stats.map(s => ({ label: s.l, value: s.v }))} style={{ margin: '4px 0 16px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: '8px 28px', flex: 1, minHeight: 0 }}>
          {points.map(p => (
            <div key={p.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', borderTop: '1px solid var(--border)', paddingTop: 12, minHeight: 0 }}>
              <IconDisc name={p.icon} size={38} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10.2, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.25, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 9, lineHeight: 1.48, color: 'var(--graphite)' }}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>

        <SourceNote>{note}</SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
