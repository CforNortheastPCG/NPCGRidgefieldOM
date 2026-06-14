import { PROPERTY, MAP_POIS, MAP_CATEGORIES } from './amenities.js'
import { DEAL, FULL_ADDR as DEAL_FULL_ADDR } from './Shell.jsx'

/* ═══════════════════ LOCATION & AMENITIES MAP ═══════════════════
   Google Static Maps image (renders reliably in the PDF screenshot) plotting
   the full Area Amenities directory, color-coded by category. Markers are
   placed by address — Static Maps geocodes them server-side, so no separate
   geocoding step is needed. A color legend replaces numbered pins (there are
   far more POIs than single-digit labels allow).

   Requires a Google Maps key in .env.local:
     VITE_GOOGLE_MAPS_API_KEY=your_key_here
   Enable "Maps Static API" on the key.
*/

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const GOLDEN = '0xF8971D'

/* Nudge any marker that lands on top of an already-placed one (or the property
   pin) just enough that its number is readable. Google draws southern markers
   on top, so co-located pins otherwise hide each other. Offsets are tiny
   (~50–90 m) — acceptable for a "nearby amenities" reference map. */
function declutter(pois, anchor) {
  const MIN = 0.0022 // ~245 m collision radius — sized so mid pins separate at zoom 13
  const placed = anchor ? [{ lat: anchor.lat, lng: anchor.lng }] : []
  const near = (aLat, aLng, bLat, bLng) => {
    const dLat = aLat - bLat
    const dLng = (aLng - bLng) * Math.cos((aLat * Math.PI) / 180)
    return Math.sqrt(dLat * dLat + dLng * dLng) < MIN
  }
  return pois.map(p => {
    let lat = p.lat, lng = p.lng, tries = 0
    while (placed.some(q => near(lat, lng, q.lat, q.lng)) && tries < 20) {
      const ang = (tries * 137.5 * Math.PI) / 180 // golden-angle spiral
      const r = MIN * (1 + tries * 0.45)
      lat = p.lat + Math.sin(ang) * r
      lng = p.lng + (Math.cos(ang) * r) / Math.cos((p.lat * Math.PI) / 180)
      tries++
    }
    placed.push({ lat, lng })
    return { ...p, lat, lng }
  })
}

function buildStaticMapUrl() {
  const style = [
    'feature:poi|visibility:off',
    'feature:transit|visibility:off',
    'feature:administrative|element:labels|visibility:on',
    'feature:road|element:geometry|color:0xffffff',
    'feature:road.arterial|element:geometry|color:0xf3efe9',
    'feature:landscape|color:0xf6f2ee',
    'feature:water|color:0xc9d4d9',
  ]

  // One markers param per POI — a numbered, color-coded pin. Labels render only
  // on mid/large markers and must be a single character, so pins are numbered
  // within their category (1-9) and the color identifies the category.
  const categoryMarkers = declutter(MAP_POIS, PROPERTY).map(p =>
    `markers=${encodeURIComponent(`size:mid|color:${p.color}|label:${p.n}|${p.lat},${p.lng}`)}`
  )

  const params = [
    // TODO: set map center near the property (lat,lng) and adjust zoom to frame
    // the surrounding amenities. zoom 13 spans roughly 5 mi vertically.
    `center=${PROPERTY.lat},${PROPERTY.lng}`,
    'zoom=13',
    'size=593x640',
    'scale=2',
    'maptype=hybrid',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
    `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|label:P|${PROPERTY.lat},${PROPERTY.lng}`)}`,
    ...categoryMarkers,
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

export default function LocationMap({ pageNum = 9 }) {
  const FULL_ADDR = DEAL_FULL_ADDR

  // Groups for the right-hand directory list. Each item's `n` (set in
  // amenities.js) is its per-category number, matching its map pin label.
  const groups = MAP_CATEGORIES
    .map(cat => ({ ...cat, items: MAP_POIS.filter(p => p.color === cat.color) }))
    .filter(g => g.items.length)

  const mapUrl = API_KEY ? buildStaticMapUrl() : null

  return (
    <div className="page">
      <div className="page-header">
        <img src="/logos/npcg-white-hires.png" alt="NPCG" />
        <div className="section-label">
          <strong>Location &amp; Amenities</strong>
          {FULL_ADDR}
        </div>
      </div>

      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Location &amp; <span style={{ color: '#F8971D' }}>Amenities</span>
        </div>
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          TODO: location summary — describe the property's setting and its proximity to nearby transit,
          employment anchors, retail, and lifestyle amenities.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP — natural aspect (no crop) keeps Google attribution visible */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', alignSelf: 'start' }}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt={`Map of ${FULL_ADDR} and nearby amenities`}
                style={{ width: '100%', height: 'auto', display: 'block', background: 'var(--linen)' }}
              />
            ) : (
              <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local
                <br />and enable Maps Static API to render the map.
              </div>
            )}
          </div>

          {/* SUBJECT PROPERTY + NUMBERED PIN LIST (two columns) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--carbon)' }}>Subject Property &mdash; {DEAL.address}</span>
            </div>
            <div style={{ columns: 2, columnGap: 22, minHeight: 0, overflow: 'hidden' }}>
            {groups.map(g => (
              <div key={g.label} style={{ breakInside: 'avoid', marginBottom: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                  <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', background: g.swatch, border: '1px solid rgba(0,0,0,0.15)' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: g.swatch }}>{g.label}</span>
                </div>
                {g.items.map(p => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '2.5px 0' }}>
                    <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: g.swatch, width: 15, textAlign: 'right' }}>{p.n}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.35, flex: 1 }}>{p.name}</span>
                  </div>
                ))}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/compass.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
          <span className="conf">{DEAL.status} &middot; {DEAL.name} &middot; {DEAL_FULL_ADDR}</span>
        </div>
        <span className="page-num">{pageNum}</span>
      </div>
    </div>
  )
}
