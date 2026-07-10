import { PageHeader, PageFooter } from './Shell.jsx'
import { PARCEL } from './parcel.js'

/* ═══════════════════ SITE MAP ═══════════════════
   Google Static (hybrid satellite) map of the parcel at 29 West Street, New
   Milford, CT, with an approximate parcel outline drawn as a golden polygon
   over the aerial. Center is the verified rooftop geocode (see parcel.js).
   Falls back to a notice if no Maps key is set. Requires
   VITE_GOOGLE_MAPS_API_KEY (enable Maps Static API). */

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
  { k: 'Parcel ID', v: 'PID 4961 · Mblu 28/4 / 160 (New Milford)' },
  { k: 'Parcel', v: '0.33 Acres (~14,375 SF) on West Street' },
  { k: 'Building', v: '±17,056 SF gross · 2.5 stories + basement · fully sprinklered' },
  { k: 'Units', v: '14 apartments — seven 1BR, five 2BR, two 2BR townhomes' },
  { k: 'Frontage', v: 'West Street, steps from the New Milford Green' },
  { k: 'Zoning', v: 'TLD — Town Center (Village)' },
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
          A single adaptive-reuse apartment building on a 0.33-acre parcel fronting West Street in the heart of
          New Milford&rsquo;s village center, with an on-site paved parking lot and a short walk to the Green.
          The outline below is an approximate parcel boundary pending the recorded survey.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* AERIAL MAP WITH PARCEL OUTLINE */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0, background: 'var(--linen)' }}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt="Aerial site map of 29 West Street, New Milford, with the approximate parcel outline"
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
              The building holds 14 apartments across 2.5 stories plus a basement — a mix of seven one-bedrooms,
              five two-bedrooms, and two two-bedroom townhomes — with an on-site paved lot and full wet-sprinkler
              fire protection.
            </div>
            <div style={{ fontSize: 7.8, color: 'var(--stone)', lineHeight: 1.4 }}>
              Parcel boundary: approximate placeholder pending the Connecticut State Parcel Layer (New Milford,
              PID 4961). Aerial: Google. Outline approximate — verify against survey.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
