import { PageHeader, PageFooter, useDeal } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   Regional-scale view of the asset's location with a commute / market panel.
   The map image is the deal's static map (a data URL carried on the model) —
   the browser never calls Google directly. Narrative is generic NPCG
   Northeast-corridor positioning; commute facts compute against the asset's
   own coordinates when present, otherwise show a TODO. */

const TODO = <span style={{ color: '#b9772f', fontWeight: 700 }}>TODO</span>

function LegendRow({ color, label, line }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
      {line
        ? <span style={{ width: 14, height: 3, background: color, flexShrink: 0, borderRadius: 2 }} />
        : <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />}
      <span style={{ color: 'var(--carbon)', fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export default function RegionalMap({ pageNum }) {
  const deal = useDeal()
  const mapUrl = deal.map || deal.cover || null
  const city = deal.cityLong || deal.cityState || 'the region'

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Regional <span style={{ color: '#F8971D' }}>Positioning</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          <strong>A Northeast Corridor address.</strong> {city} sits within the dense,
          transit-served Northeast megaregion, with quick access to interstate highways, regional rail, and
          major metropolitan job centers. For long-hold capital, the location offers durable,
          institution-anchored demand and the kind of diversified regional economy that supports stable
          occupancy and steady rent growth.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP — deal.map data URL (no client-side Google call) */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0 }}>
            {mapUrl ? (
              <img src={mapUrl} alt={`Regional map of ${city}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Regional map unavailable
              </div>
            )}
            <div style={{ position: 'absolute', left: 10, top: 10, background: 'rgba(255,255,255,0.95)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 6px rgba(0,0,0,0.18)' }}>
              <LegendRow color="#F8971D" label="Subject Property" />
              <LegendRow color="#3F4753" label="Regional Context" />
            </div>
          </div>

          {/* FACTS PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0, overflow: 'hidden' }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Location</h3>
              <div className="bldg-row" style={{ padding: '2px 0', fontSize: 10.5 }}><span className="bldg-label">City / State</span><span className="bldg-val">{deal.cityLong || deal.cityState || TODO}</span></div>
              <div className="bldg-row" style={{ padding: '2px 0', fontSize: 10.5 }}><span className="bldg-label">Coordinates</span><span className="bldg-val">{deal.lat != null && deal.lng != null ? `${Number(deal.lat).toFixed(4)}, ${Number(deal.lng).toFixed(4)}` : TODO}</span></div>
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Regional Access</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                Positioned for highway, rail, and air connectivity across the Northeast Corridor, linking
                residents and investors to the region&rsquo;s major employment and population centers.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                The surrounding region offers a deep, diversified employment base spanning healthcare,
                higher education, and professional services &mdash; the durable demand drivers that
                underpin well-located workforce housing.
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
