import { UpdateShell, StatGrid, BlockHead } from '../components/UpdateBlocks.jsx'
import { DonutChart } from '../components/Charts.jsx'
import { METRICS_DIGITAL, METRICS_NPCG } from '../data/update.js'

/* ═══════════════════════════════════════════════════════════════════════
   CAMPAIGN METRICS — ALL CHANNELS. One consolidated performance page: Crexi,
   CoStar/LoopNet, the NPCG email blast (with open-rate donut), and direct
   outreach. */

const Callout = ({ children }) => (
  <div style={{ marginTop: 10, fontSize: 10.3, lineHeight: 1.5, color: 'var(--carbon)', fontWeight: 600 }}>
    {children}
  </div>
)

export default function MetricsPage({ pageNum }) {
  const { crexi, costar } = METRICS_DIGITAL
  const { email, direct } = METRICS_NPCG
  const opened = 34647
  const delivered = 105512
  return (
    <UpdateShell section="Campaign Metrics" eyebrow="Performance to Date" title="Campaign" accent="Metrics" pageNum={pageNum}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minHeight: 0 }}>
        <div>
          <BlockHead title={crexi.title} meta={crexi.meta} />
          <StatGrid stats={crexi.stats} cols={3} bare />
        </div>

        <div>
          <BlockHead title={costar.title} meta={costar.meta} />
          <StatGrid stats={costar.stats} cols={3} bare />
          <Callout>{costar.last30}</Callout>
        </div>

        <div>
          <BlockHead title={email.title} meta={email.meta} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: 16, alignItems: 'stretch' }}>
            <StatGrid
              cols={2}
              bare
              stats={[
                { v: '105,512', l: 'Total Deliveries' },
                { v: '1,208', l: 'Total Clicks' },
                { v: '3.3%', l: 'Average Click Rate' },
                { v: '9', l: 'Website Leads' },
              ]}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '10px 12px' }}>
              <DonutChart
                size={96}
                thickness={17}
                centerLabel="32.8%"
                centerSub="OPEN RATE"
                centerFont={17}
                data={[
                  { label: 'Opened', value: opened, color: 'var(--golden)' },
                  { label: 'Unopened', value: delivered - opened, color: '#ece7e1' },
                ]}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.1 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--golden)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--carbon)', fontWeight: 700 }}>34,647 opened</span>
                </div>
                <div style={{ fontSize: 8.1, color: 'var(--stone)', fontWeight: 600, lineHeight: 1.4 }}>of 105,512 total deliveries</div>
              </div>
            </div>
          </div>
          <Callout>{email.note}</Callout>
        </div>

        <div>
          <BlockHead title={direct.title} meta={direct.meta} />
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 16, alignItems: 'center' }}>
            <StatGrid stats={direct.stats} cols={2} bare />
            <div style={{ fontSize: 10.3, lineHeight: 1.55, color: 'var(--graphite)' }}>{direct.note}</div>
          </div>
        </div>
      </div>
    </UpdateShell>
  )
}


