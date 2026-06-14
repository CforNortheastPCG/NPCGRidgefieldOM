import { PageHeader, PageFooter } from './Shell.jsx'

/* ═══════════════════ SITE MAP ═══════════════════
   Aerial view of the parcel and surrounding downtown Ridgefield neighborhood,
   with labeled A/B/C building pins and a matching legend. The image lives at
   public/photos/maps/site-aerial.jpeg — swap that file to update the map. */

/* Pin positions are percentages of the aerial image (left, top). */
const BUILDINGS = [
  { label: 'A', name: 'Victorian Main House', detail: '3 Apartments (2BR) · c. 1900', swatch: '#F8971D', pin: { x: 55.5, y: 56.8 } },
  { label: 'B', name: 'Townhouses w/ Garage', detail: '3 Units (2BR/1.5BA) · 2012', swatch: '#2C3E50', pin: { x: 34.8, y: 52.9 } },
  { label: 'C', name: 'Townhouses w/ Basement', detail: '3 Units (2BR/1.5BA) · 2012', swatch: '#6B7A8F', pin: { x: 20.5, y: 58.0 } },
]

export default function SiteMap({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Site Map" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Site <span style={{ color: '#F8971D' }}>Map</span>
        </div>
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          Three buildings on a single parcel at the corner of Main Street, with on-site surface parking and
          attached garages serving the Building B townhouses.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* AERIAL MAP */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0, background: 'var(--linen)' }}>
            <img
              src="/photos/maps/site-aerial.jpeg"
              alt="Aerial site map of 613-615 Main Street and the surrounding downtown Ridgefield neighborhood"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {BUILDINGS.map(b => (
              <div
                key={b.label}
                style={{
                  position: 'absolute', left: `${b.pin.x}%`, top: `${b.pin.y}%`,
                  transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%',
                  background: b.swatch, color: '#fff', fontSize: 14, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff', boxShadow: '0 1px 6px rgba(0,0,0,0.65)',
                }}
              >{b.label}</div>
            ))}
          </div>

          {/* BUILDING LEGEND */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0, overflow: 'hidden', justifyContent: 'center' }}>
            {BUILDINGS.map(b => (
              <div key={b.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: b.swatch,
                  color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', border: '2px solid #fff', boxShadow: `0 0 0 1px ${b.swatch}`,
                }}>{b.label}</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--carbon)' }}>Building {b.label} — {b.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--stone)', marginTop: 2 }}>{b.detail}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)' }}>
              The Victorian main house anchors the Main Street frontage, with the two townhouse buildings set
              behind it around the common drive and surface parking — giving every unit direct access while
              preserving the single-family streetscape of downtown Ridgefield.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
