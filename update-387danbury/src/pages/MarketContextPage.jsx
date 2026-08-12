import { Md } from '../components/Shell.jsx'
import { UpdateShell, StatGrid, BlockHead } from '../components/UpdateBlocks.jsx'
import { MARKET_CONTEXT } from '../data/update.js'

/* ═══════════════════ MARKET CONTEXT — COMP, RATES & SEWER ═══════════════════ */
export default function MarketContextPage({ pageNum }) {
  const { comp, treasury, sewer } = MARKET_CONTEXT
  return (
    <UpdateShell section="Market Context" eyebrow="What the Market Is Telling Us" title="Market" accent="Context" pageNum={pageNum}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div>
            <BlockHead title={comp.title} meta={comp.meta} bump={3} />
            <StatGrid stats={comp.stats} cols={3} bare bump={3} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 13.8, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>{comp.body}</div>
            <div>
              {[
                { label: '387 Danbury Rd · on market', value: '131 days' },
                { label: '27 Cannon Rd · time to sell', value: '462 days' },
              ].map((d, i) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11.6, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <BlockHead title={treasury.title} meta={<span style={{ whiteSpace: 'nowrap' }}>10-Year Treasury since rep agreement execution</span>} bump={3} />
            <StatGrid stats={treasury.stats} cols={3} bare bump={3} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 13.8, lineHeight: 1.55, color: 'var(--graphite)' }}>{treasury.body}</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10.6, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 5 }}>Why This Matters</div>
          <div style={{ fontSize: 14, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--carbon)' }}>&ldquo;{treasury.quote}&rdquo;</div>
        </div>

        <div>
          <BlockHead title={sewer.title} meta={sewer.meta} bump={3} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {sewer.paragraphs.map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 13.8, lineHeight: 1.58, color: 'var(--graphite)', margin: 0 }} />
            ))}
          </div>
          <div style={{ marginTop: 9, fontSize: 13.8, lineHeight: 1.5, color: 'var(--carbon)', fontWeight: 600 }}>
            Bottom line: buyers continuing the current use should be unaffected; buyers underwriting an expansion or change of use will need to confirm capacity with the town first.
          </div>
        </div>
      </div>
    </UpdateShell>
  )
}
