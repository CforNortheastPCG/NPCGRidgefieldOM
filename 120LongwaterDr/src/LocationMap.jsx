import { PROPERTY, MAP_POIS, MAP_CATEGORIES } from './amenities.js'

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

/* Spread markers that land on top of each other so every numbered pin stays
   legible at this zoom. Two radii: MIN keeps amenity pins apart from one another,
   and ANCHOR carves out a larger clearance ring around the subject-property photo
   bubble so nearby pins (e.g. South Shore Medical, in the same office park) never
   hide beneath it. Co-located pins fan out along a golden-angle spiral. Positions
   become approximate — the map disclaimer and the directory carry exact addresses. */
function declutter(pois, anchor) {
  const MIN = 0.0040    // ~445 m pin-to-pin spacing (degrees latitude)
  const ANCHOR = 0.0072 // ~800 m clearance around the subject-property bubble
  const placed = anchor ? [{ lat: anchor.lat, lng: anchor.lng, r: ANCHOR }] : []
  const hits = (lat, lng) => placed.some(q => {
    const dLat = lat - q.lat
    const dLng = (lng - q.lng) * Math.cos((lat * Math.PI) / 180)
    return Math.sqrt(dLat * dLat + dLng * dLng) < Math.max(q.r ?? MIN, MIN)
  })
  return pois.map(p => {
    let lat = p.lat, lng = p.lng, tries = 0
    while (hits(lat, lng) && tries < 40) {
      const ang = (tries * 137.5 * Math.PI) / 180 // golden-angle spiral
      const r = MIN * (1 + tries * 0.5)
      lat = p.lat + Math.sin(ang) * r
      lng = p.lng + (Math.cos(ang) * r) / Math.cos((p.lat * Math.PI) / 180)
      tries++
    }
    placed.push({ lat, lng, r: MIN })
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
    // Fixed frame on the property. zoom 12 pulls back to show the full South Shore
    // amenity spread — Queen Anne's Corner and the Rockland hotels next door, the
    // Route 53 retail in Hanover, and the Derby Street / Hingham cluster to the north.
    `center=${PROPERTY.lat},${PROPERTY.lng}`,
    'zoom=12',
    'size=593x640',
    'scale=2',
    'maptype=hybrid',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
    // The subject property sits at the map center — its marker is overlaid as a
    // circular property photo in the component (see LocationMap render), so no
    // Google "P" pin is drawn here. PROPERTY still anchors declutter() so
    // amenity pins steer clear of the center.
    ...categoryMarkers,
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

export default function LocationMap({ pageNum = 9 }) {
  const FULL_ADDR = '120 Longwater Drive, Norwell, MA 02061'

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
        <div style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          Set in Assinippi Park just off Route 3 at Queen Anne&rsquo;s Corner, the property is steps from South Shore
          Medical Center and minutes from the Queen Anne Plaza retail (Big Y, T.J.Maxx, HomeGoods), the Rockland hotel
          cluster, and the Route 53 corridor through Hanover &mdash; with the upscale Derby Street Shops in Hingham, the
          MBTA Greenbush Line, and the Hingham-to-Boston ferry all a short drive north.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* LEFT COLUMN — map fills the column height; disclaimer pinned below
              so it can never overflow into the page footer. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
          {/* MAP — contain-fit (whole map + Google attribution stay visible; the
              property sits at image center, so the centered marker stays exact). */}
          <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--linen)' }}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt={`Map of ${FULL_ADDR} and nearby amenities`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: 'var(--linen)' }}
              />
            ) : (
              <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local
                <br />and enable Maps Static API to render the map.
              </div>
            )}
            {/* Subject property marker — a gold "P" pin centered on the property
                (dead map center). The round P badge sits on a short downward tail,
                and the whole marker is vertically centered so its top can't clip
                against the map's edge. */}
            {mapUrl && (
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))' }}>
                <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 9.5, lineHeight: 1 }}>P</div>
                <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid #F8971D', marginTop: -1 }} />
              </div>
            )}
            {/* Greenbush Line stations & the Hingham ferry sit off-frame to the
                north — point to them. Top-right so it never covers Google's
                bottom attribution. */}
            {mapUrl && (
              <div style={{ position: 'absolute', right: 8, top: 8, background: 'rgba(44,62,80,0.94)', color: '#fff', padding: '5px 9px', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 8.5, fontWeight: 600, lineHeight: 1.2 }}>Greenbush Line &amp; Hingham Ferry<br />MBTA &rarr; Boston &middot; north</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="9 7 17 7 17 15" />
                </svg>
              </div>
            )}
          </div>
          {/* Spacing disclaimer — declutter() nudges co-located pins apart. */}
          <div style={{ fontSize: 7.5, color: 'var(--stone)', lineHeight: 1.35, flexShrink: 0 }}>
            Marker positions are approximate; co-located destinations may be spaced farther apart than their
            true locations to keep each numbered pin legible. See the directory for exact addresses.
          </div>
          </div>

          {/* SUBJECT PROPERTY + NUMBERED PIN LIST (two columns) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, marginLeft: 2, width: 13, height: 13, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)' }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--carbon)', whiteSpace: 'nowrap' }}>Subject Property &mdash; Longwater Corporate Center</span>
            </div>
            <div style={{ columns: 2, columnGap: 18, minHeight: 0, overflow: 'hidden' }}>
            {groups.map(g => (
              <div key={g.label} style={{ breakInside: 'avoid', marginBottom: 7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ flexShrink: 0, width: 9, height: 9, borderRadius: '50%', background: g.swatch, border: '1px solid rgba(0,0,0,0.15)' }} />
                  <span style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: g.swatch }}>{g.label}</span>
                </div>
                {g.items.map(p => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'baseline', gap: 7, padding: '1px 0' }}>
                    <span style={{ flexShrink: 0, fontSize: 9.5, fontWeight: 700, color: g.swatch, width: 13, textAlign: 'right' }}>{p.n}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.3, flex: 1 }}>{p.name}</span>
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
          <span className="conf">For Sale &middot; Longwater Corporate Center &middot; {FULL_ADDR}</span>
        </div>
        <span className="page-num">{pageNum}</span>
      </div>
    </div>
  )
}
