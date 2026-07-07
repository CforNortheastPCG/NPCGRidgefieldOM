import { PageHeader, PageFooter } from './Shell.jsx'
import { PARCEL } from './parcel.js'

/* ═══════════════════ SITE MAP ═══════════════════
   Google Static (hybrid satellite) map of the parcel at 2836 Fairfield Avenue,
   with the real parcel outline — traced from the Connecticut State Parcel Layer
   2023 (Bridgeport BEGIS) — drawn as a golden polygon over the aerial. Falls
   back to a notice if no Maps key is set. Requires VITE_GOOGLE_MAPS_API_KEY
   (enable Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function buildStaticMapUrl() {
  // Parcel outline: golden stroke + translucent golden fill.
  const ring = PARCEL.ring.map(([lat, lng]) => `${lat},${lng}`).join('|')
  const path = `path=${encodeURIComponent(`color:0xF8971Dff|weight:4|fillcolor:0xF8971D33|${ring}`)}`
  const params = [
    `center=${PARCEL.center.lat},${PARCEL.center.lng}`,
    'zoom=17',
    'size=620x540',
    'scale=2',
    'maptype=hybrid',
    'format=png',
    path,
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

const FACTS = [
  { k: 'Parcel ID', v: '08070-100-55 (Bridgeport)' },
  { k: 'Parcel', v: '0.61 Acres (~26,572 SF) on Fairfield Avenue' },
  { k: 'Building', v: '21,048 SF gross · 3 stories + basement · elevator' },
  { k: 'Units', v: '16 total — 8 units per floor (×2 floors); 15 apartments + 1 retail' },
  { k: 'Frontage', v: 'Fairfield Avenue retail corridor, Black Rock' },
  { k: 'Parking', v: 'Gated off-street lot' },
]

export default function SiteMap({ pageNum }) {
  const mapUrl = API_KEY ? buildStaticMapUrl() : null
  return (
    <div className="page">
      <PageHeader section="Site Map" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Site <span style={{ color: '#F8971D' }}>Map</span>
        </div>
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          A single mixed-use building on a 0.61-acre parcel fronting Fairfield Avenue in the heart of Black Rock,
          with a gated off-street parking lot and direct exposure to the neighborhood&rsquo;s dining and retail corridor.
          The boundary below is the recorded parcel outline from Bridgeport&rsquo;s GIS.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* AERIAL MAP WITH PARCEL OUTLINE */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0, background: 'var(--linen)' }}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt="Aerial site map of 2836 Fairfield Avenue with the Bridgeport GIS parcel outline"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API to render the parcel map.
              </div>
            )}
          </div>

          {/* SITE FACTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13, minHeight: 0, overflow: 'hidden', justifyContent: 'center' }}>
            {FACTS.map(f => (
              <div key={f.k} style={{ paddingBottom: 11, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--golden)' }}>{f.k}</div>
                <div style={{ fontSize: 12, color: 'var(--carbon)', marginTop: 2, lineHeight: 1.4 }}>{f.v}</div>
              </div>
            ))}
            <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)' }}>
              The building runs eight units per floor across two floors. The retail tenant occupies one of the eight
              first-floor units — about the footprint of one of the building&rsquo;s larger apartments (~1,500 SF),
              fronting Fairfield Avenue — with the other seven first-floor units and all eight second-floor units
              residential.
            </div>
            <div style={{ fontSize: 7.8, color: 'var(--stone)', lineHeight: 1.4 }}>
              Parcel boundary: Connecticut State Parcel Layer 2023 (Bridgeport BEGIS). Aerial: Google. Outline
              approximate — verify against survey.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
