import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle } from '../components/Blocks.jsx'
import { BulletList, Banner } from '../components/Pitch.jsx'
import { VISIBILITY } from '../data/process.js'

/* ═══════════════════ NATIONAL VISIBILITY ═══════════════════
   "National Visibility. Maximum Market Exposure." — where the listing is
   syndicated, as a logo wall, with the firm's mission line as the banner.
   Logos: public/logos/platforms/. Copy + roster: src/data/process.js. */
export default function VisibilityPage({ pageNum }) {
  const { subtitle, lead, bullets, platforms, banner } = VISIBILITY
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="National Visibility." accent="Maximum Market Exposure." subtitle={subtitle} />

        <div style={{ fontSize: 10.4, fontWeight: 700, lineHeight: 1.45, color: 'var(--carbon)', margin: '2px 0 10px', maxWidth: 840 }}>{lead}</div>
        <BulletList items={bullets} size={9.4} gap={6} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '1fr', gap: 12, flex: 1, minHeight: 0, margin: '18px 0 16px' }}>
          {platforms.map(p => (
            <div
              key={p.name}
              style={{
                gridColumn: p.span === 2 ? 'span 2' : undefined,
                border: '1px solid var(--border)', background: 'var(--white)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px 22px', minHeight: 0,
              }}
            >
              <img
                src={p.logo} alt={p.name}
                style={{ maxWidth: '100%', maxHeight: p.span === 2 ? 62 : 50, width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
          ))}
        </div>

        <Banner>{banner}</Banner>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
