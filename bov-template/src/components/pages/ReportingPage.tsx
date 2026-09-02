import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle } from '../Blocks.tsx'
import { BulletList, CardHead } from '../Pitch.tsx'
import { REPORTING } from '../../data/process.ts'

/* ═══════════════════ CLIENT REPORTING & COMMUNICATION ═══════════════════
   "Transparent. Consistent. Proactive." — the three things an owner
   receives from launch to close: the weekly activity report, the offer
   summary, and the standing conversation. Copy: src/data/process.js. */
export default function ReportingPage({ pageNum }: { pageNum?: number }) {
  const { subtitle, lead, columns } = REPORTING
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Client Reporting &" accent="Communication" subtitle={subtitle} />
        <div style={{ fontSize: 9.8, lineHeight: 1.5, color: 'var(--graphite)', margin: '2px 0 0', maxWidth: 860 }}>{lead}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1, minHeight: 0, marginTop: 16 }}>
          {columns.map(c => (
            <div key={c.title} className="bldg-card" style={{ minHeight: 0, padding: '16px 18px' }}>
              <CardHead icon={c.icon}>{c.title}</CardHead>
              <BulletList items={c.items} size={9.3} gap={9} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
