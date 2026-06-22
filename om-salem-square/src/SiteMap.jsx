import { PageHeader, PageFooter } from './Shell.jsx'
import { PARCEL } from './parcel.js'

/* ═══════════════════ SITE MAP ═══════════════════
   Google Static (hybrid satellite) map of the Salem Square parcel at 668 New
   Haven Road, Naugatuck, with the real parcel outline — traced from the Borough
   of Naugatuck GIS — drawn as a golden polygon over the aerial. Falls back to a
   notice if no Maps key is set. Requires VITE_GOOGLE_MAPS_API_KEY (enable Maps
   Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function buildStaticMapUrl() {
  // Parcel outline: golden stroke + translucent golden fill.
  const ring = PARCEL.ring.map(([lat, lng]) => `${lat},${lng}`).join('|')
  const path = `path=${encodeURIComponent(`color:0xF8971Dff|weight:4|fillcolor:0xF8971D33|${ring}`)}`
  const params = [
    `center=${PARCEL.center.lat},${PARCEL.center.lng}`,
    'zoom=18',
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
  { k: 'Parcel ID', v: 'MBL N-5E211 · VisionPID 7366 (048-3303)' },
  { k: 'Parcel', v: '2.69 acres — ±1.00 ac improved + ±1.69 ac excess land' },
  { k: 'Building', v: '19,266 SF gross (18,770 rentable) · 2 stories + full basement · 1960' },
  { k: 'In-Place Units', v: '13 — 10 commercial · 2 residential · 1 storage' },
  { k: 'Entitlement', v: '51-unit multifamily approved on the ±1.69-ac excess land (Sept 2025)' },
  { k: 'Frontage / Access', v: 'New Haven Road (Route 63) · direct Route 8 access' },
  { k: 'Parking · Zoning', v: '±26,000 SF paved asphalt · R8' },
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
          A 2.69-acre mixed-use parcel on New Haven Road (Route 63) in Naugatuck &mdash; an income-producing retail
          center on roughly the front acre, plus about 1.69 acres of excess land behind it entitled for a 51-unit
          multifamily building. The boundary below is the recorded parcel outline from the Borough of Naugatuck&rsquo;s GIS.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* AERIAL MAP WITH PARCEL OUTLINE */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0, background: 'var(--linen)' }}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt="Aerial site map of 668 New Haven Road, Naugatuck with the parcel outline"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API to render the parcel map.
              </div>
            )}
          </div>

          {/* SITE FACTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0, overflow: 'hidden', justifyContent: 'center' }}>
            {FACTS.map(f => (
              <div key={f.k} style={{ paddingBottom: 9, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--golden)' }}>{f.k}</div>
                <div style={{ fontSize: 11.5, color: 'var(--carbon)', marginTop: 2, lineHeight: 1.4 }}>{f.v}</div>
              </div>
            ))}
            <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)' }}>
              A buyer acquires an income-producing center and a shovel-ready second phase on a single lot &mdash; running
              and improving the retail while permitting the 51-unit building on the excess land.
            </div>
            <div style={{ fontSize: 7.8, color: 'var(--stone)', lineHeight: 1.4 }}>
              Parcel boundary: Borough of Naugatuck GIS (mapxpress). Aerial: Google. Outline approximate &mdash; verify
              against survey.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
