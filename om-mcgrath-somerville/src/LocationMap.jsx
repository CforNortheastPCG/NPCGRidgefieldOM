import { PROPERTY, MAP_CENTER, MAP_POIS, MAP_CATEGORIES } from './amenities.js'
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
   pin) just enough that its number stays readable. Google draws southern markers
   on top, so co-located pins otherwise hide each other. Offsets are tiny — only
   applied to break collisions — so pins stay essentially on-location. Real
   geocoded coords feed in; only overlapping ones get spread along a spiral. */
function declutter(pois, anchor) {
  const MIN = 0.0024 // ~265 m collision radius — sized so mid pins separate at zoom 13
  const placed = anchor ? [{ lat: anchor.lat, lng: anchor.lng }] : []
  const near = (aLat, aLng, bLat, bLng) => {
    const dLat = aLat - bLat
    const dLng = (aLng - bLng) * Math.cos((aLat * Math.PI) / 180)
    return Math.sqrt(dLat * dLat + dLng * dLng) < MIN
  }
  return pois.map(p => {
    let lat = p.lat, lng = p.lng, tries = 0
    while (placed.some(q => near(lat, lng, q.lat, q.lng)) && tries < 24) {
      const ang = (tries * 137.5 * Math.PI) / 180 // golden-angle spiral
      const r = MIN * (1 + tries * 0.5)
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

  // One markers param per POI — a numbered, color-coded pin, placed by lat/lng
  // (coords were geocoded once into amenities.js). Plotting by lat/lng instead
  // of address keeps the request under Static Maps' ~15 address-geocode cap, so
  // all pins render. Labels show only on mid/large markers and must be a single
  // character, so pins are numbered within their category (1-9) and the color
  // identifies the category.
  const categoryMarkers = declutter(MAP_POIS, PROPERTY).map(p =>
    `markers=${encodeURIComponent(`size:mid|color:${p.color}|label:${p.n}|${p.lat},${p.lng}`)}`
  )

  const params = [
    // Frame center (MAP_CENTER) is nudged east of the property so the far-east
    // and far-west outlier pins both clear the frame edges; the golden "P" pin
    // still plots on the property's real coords. Zoom 13 (~3 mi vertical)
    // tightens the frame on the core East Somerville → Assembly amenities.
    `center=${MAP_CENTER.lat},${MAP_CENTER.lng}`,
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
        <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 8 }}>
          McGrath Apartments fronts McGrath Highway (Route 28) in East Somerville, two miles from downtown Boston
          and minutes from Cambridge. The surrounding blocks pair everyday retail (Stop &amp; Shop, Target, The Home
          Depot, Costco) with destination shopping and dining at Assembly Row and Encore Boston Harbor, while MIT and
          Tufts anchor the region&rsquo;s employment and student base. Four MBTA rapid-transit stations &mdash;
          Sullivan Square and Assembly on the Orange Line and the new Green Line Extension at Gilman Square and
          Washington Street &mdash; put downtown Boston within a short ride.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP — scaled to fit the row (contain, no crop) so Google attribution
              stays visible and the image never spills onto the footer. A small
              caption notes that pins may be nudged to avoid overlap. */}
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', minHeight: 0, gap: 4 }}>
            <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', flex: 1, minHeight: 0, display: 'flex' }}>
              {mapUrl ? (
                <img
                  src={mapUrl}
                  alt={`Map of ${FULL_ADDR} and nearby amenities`}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', margin: 'auto', display: 'block', background: 'var(--linen)' }}
                />
              ) : (
                <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                  Set VITE_GOOGLE_MAPS_API_KEY in .env.local
                  <br />and enable Maps Static API to render the map.
                </div>
              )}
            </div>
            <div style={{ flexShrink: 0, fontSize: 7.5, lineHeight: 1.3, color: 'var(--stone)', fontStyle: 'italic' }}>
              Map locations are approximate; nearby pins may be offset slightly to prevent overlap.
            </div>
          </div>

          {/* SUBJECT PROPERTY + NUMBERED PIN LIST (two columns) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 7, borderBottom: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--carbon)' }}>Subject Property &mdash; {DEAL.address}</span>
            </div>
            <div style={{ columns: 2, columnGap: 16, flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {groups.map(g => (
              <div key={g.label} style={{ breakInside: 'avoid', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ flexShrink: 0, width: 9, height: 9, borderRadius: '50%', background: g.swatch, border: '1px solid rgba(0,0,0,0.15)' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: g.swatch }}>{g.label}</span>
                </div>
                {g.items.map(p => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '1px 0' }}>
                    <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: g.swatch, width: 13, textAlign: 'right' }}>{p.n}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.2 }}>{p.name}</div>
                      {p.note && <div style={{ fontSize: 8.2, color: 'var(--stone)', lineHeight: 1.25, marginTop: 0.5 }}>{p.note}</div>}
                    </div>
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
