import { UpdateShell } from '../components/UpdateBlocks.jsx'
import { CAMPAIGN } from '../data/update.js'

/* ═══════════════════ CAMPAIGN OVERVIEW ═══════════════════
   How the asset is being marketed — six channels as clean rows (no card
   boxes) with two property photos across the bottom. */
export default function CampaignOverviewPage({ pageNum }) {
  return (
    <UpdateShell section="Campaign Overview" eyebrow="How We Are Marketing the Asset" title="Campaign" accent="Overview" pageNum={pageNum}>
      <div style={{ fontSize: 12.2, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>{CAMPAIGN.intro}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, marginBottom: 16 }}>
        {CAMPAIGN.channels.map((c, i) => (
          <div key={c.title} style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < CAMPAIGN.channels.length - 2 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--carbon)' }}>{c.title}</div>
                {c.stat && (
                  <div style={{ marginLeft: 'auto', whiteSpace: 'nowrap', fontSize: 15.5, fontWeight: 800, color: 'var(--golden)' }}>
                    {c.stat.v}
                    <span style={{ fontSize: 9.6, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginLeft: 5 }}>{c.stat.l}</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: 12.2, lineHeight: 1.55, color: 'var(--graphite)' }}>{c.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, minHeight: 0, maxHeight: 400 }}>
        <div style={{ minHeight: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/campaign-1.jpg" alt="387 Danbury Road aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ minHeight: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/campaign-2.jpg" alt="387 Danbury Road site overhead" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </UpdateShell>
  )
}
