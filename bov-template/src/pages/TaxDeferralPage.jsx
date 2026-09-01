import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { SectionTitle, BlockLabel, Callout } from '../components/Blocks.jsx'
import { BulletList } from '../components/Pitch.jsx'
import { TAX_DEFERRAL } from '../data/advisory.js'

/* ═══════════════════ STRATEGIES TO DEFER CAPITAL GAINS TAXES ═══════════════════
   The three post-sale structures an owner should know exist — 1031, 721
   UPREIT, DST — each with its summary, benefits, and requirements or fit.
   The "we are not tax advisors" line is part of the copy and stays.
   Copy: src/data/advisory.js. */
export default function TaxDeferralPage({ pageNum }) {
  const { subtitle, intro, disclaimer, strategies } = TAX_DEFERRAL
  return (
    <div className="page">
      <PageHeader section="Beyond the Sale" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Strategies to Defer" accent="Capital Gains Taxes" subtitle={subtitle} />
        <div style={{ fontSize: 9.4, lineHeight: 1.5, color: 'var(--graphite)', margin: '2px 0 8px' }}>{intro}</div>
        <Callout>
          <span style={{ fontSize: 9.2, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.45 }}>{disclaimer}</span>
        </Callout>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, flex: 1, minHeight: 0, marginTop: 12 }}>
          {strategies.map(s => (
            <div key={s.title} style={{ border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{
                background: 'var(--carbon)', color: 'var(--white)', padding: '9px 12px', textAlign: 'center',
                fontSize: 9.2, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.35,
              }}>{s.title}</div>
              <div style={{ padding: '12px 14px 10px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div style={{ fontSize: 8.9, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 11 }}>{s.summary}</div>
                <BlockLabel accent="var(--golden)">{s.benefitsLabel}</BlockLabel>
                <BulletList items={s.benefits} size={8.8} gap={4} style={{ marginBottom: 11 }} />
                <BlockLabel accent="var(--golden)">{s.extraLabel}</BlockLabel>
                <BulletList items={s.extra} size={8.8} gap={4} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
