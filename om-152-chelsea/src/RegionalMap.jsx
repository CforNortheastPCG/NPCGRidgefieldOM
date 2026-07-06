import { DEAL, FULL_ADDR as DEAL_FULL_ADDR, PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A tristate-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   commute-facts panel. Narrative in the "anchors, not bets" register.
   Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Subject property — 152–154 Chelsea Street, East Boston MA.
const SUBJECT = { lat: 42.37366, lng: -71.03469 }

// Regional anchors across southern New England. With no center/zoom set, Static
// Maps auto-frames to fit every marker — so these (Worcester → Cape → Manchester)
// pull the view out to a true regional scale with the property at the hub. The
// subject (gold) pin sits in metro Boston; no "Boston" marker is needed.
const CITIES = [
  { name: 'Springfield', lat: 42.1015, lng: -72.5898 },
  { name: 'Hartford', lat: 41.7658, lng: -72.6734 },
  { name: 'Worcester', lat: 42.2626, lng: -71.8023 },
]

const AIRPORTS = [
  { name: 'Logan Intl (BOS)', lat: 42.3656, lng: -71.0096 },
  { name: 'Manchester-Boston (MHT)', lat: 42.9326, lng: -71.4357 },
  { name: 'T.F. Green (PVD)', lat: 41.7240, lng: -71.4282 },
]

const COMMUTE = [
  { label: 'Logan Intl (BOS)', value: '~2 mi · ~5 min' },
  { label: 'Downtown Boston', value: '~2 mi · ~6 min' },
  { label: 'Cambridge / Kendall Sq', value: '~4 mi · ~10 min' },
  { label: 'Encore Boston Harbor', value: '~4 mi · ~10 min' },
  { label: 'Worcester', value: '~48 mi · ~50 min' },
  { label: 'Providence, RI', value: '~52 mi · ~1 hr' },
  { label: 'New York City', value: '~215 mi · ~3.5 hr' },
]

const CARBON = '0x3F4753'
const BLUE = '0x2471A3'
const GOLDEN = '0xF8971D'

function buildStaticMapUrl() {
  const style = [
    'feature:poi|visibility:off',
    'feature:landscape|color:0xf3efe9',
    'feature:water|color:0xc4d2d8',
    'feature:road.arterial|element:geometry|color:0xffffff',
    'feature:road.highway|element:geometry.fill|color:0xF8971D',
    'feature:road.highway|element:geometry.stroke|color:0xCE7C12',
    'feature:road.highway|element:labels|visibility:on',
    'feature:administrative.locality|element:labels|visibility:on',
  ]
  const cityPins = `markers=${encodeURIComponent(`size:mid|color:${CARBON}|${CITIES.map(c => `${c.lat},${c.lng}`).join('|')}`)}`
  const airportPins = `markers=${encodeURIComponent(`size:mid|color:${BLUE}|${AIRPORTS.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const subjectPin = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|${SUBJECT.lat},${SUBJECT.lng}`)}`
  const params = [
    'size=640x520',
    'scale=2',
    'maptype=roadmap',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
    cityPins,
    airportPins,
    subjectPin,
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

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
  const FULL_ADDR = DEAL_FULL_ADDR
  const mapUrl = API_KEY ? buildStaticMapUrl() : null

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Regional <span style={{ color: '#F8971D' }}>Positioning</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Inside the city, two miles from downtown Boston.</strong>{' '}
          152&ndash;154 Chelsea Street sits in East Boston between Maverick Square and Day Square, with the Sumner and
          Callahan tunnels, Route 1A, and the MBTA Blue Line putting the Financial District, Logan Airport, and
          Cambridge minutes away. East Boston pairs true urban-core access with rents that remain well below Boston&rsquo;s
          downtown neighborhoods &mdash; the region&rsquo;s workforce housing at the center of its job market.
        </div>

        {/* Regional stat strip — golden-top boxes matching the Exec Summary house style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            ['~2 mi', 'To downtown Boston'],
            ['Blue Line', '2 stops to State St'],
            ['~5 min', 'To Logan Intl (BOS)'],
            ['43M', 'Logan passengers (2024)'],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0 }}>
            {mapUrl ? (
              <img src={mapUrl} alt="Regional positioning map" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API.
              </div>
            )}
            <div style={{ position: 'absolute', left: 10, top: 10, background: 'rgba(255,255,255,0.95)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 6px rgba(0,0,0,0.18)' }}>
              <LegendRow color="#F8971D" label="Subject Property" />
              <LegendRow color="#3F4753" label="Regional Cities" />
              <LegendRow color="#2471A3" label="Airports" />
              <LegendRow color="#F8971D" label="Major Highways" line />
            </div>
          </div>

          {/* FACTS PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0, overflow: 'hidden' }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Drive &amp; Commute Times</h3>
              {COMMUTE.map((c, i) => (
                <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2.5px 6px', fontSize: 10.5, background: i % 2 === 1 ? 'var(--linen)' : 'transparent', borderRadius: 2 }}>
                  <span style={{ color: 'var(--carbon)', fontWeight: 600 }}>{c.label}</span>
                  <span style={{ color: 'var(--carbon)', fontWeight: 700, whiteSpace: 'nowrap' }}>{c.value}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Highway Access</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                <strong>Sumner / Callahan Tunnels</strong> — Route 1A straight into downtown, ~2 miles door to
                door. <strong>Ted Williams Tunnel (I-90)</strong> — the Mass Pike and I-93 interchange, linking the
                Seaport and points west. <strong>MBTA Blue Line</strong> — Maverick and Airport stations, two stops
                to State Street; free Massport shuttles serve every Logan terminal.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 9.4, lineHeight: 1.42, color: 'var(--graphite)' }}>
                East Boston sits at the center of the region&rsquo;s job market. <strong>Logan International
                Airport</strong> — next door — supports ~20,000 jobs and moved a record 43 million passengers in
                2024; <strong>Encore Boston Harbor</strong> employs thousands more across the creek in Everett;
                and downtown&rsquo;s <strong>financial, healthcare, and education core</strong> — roughly 684,000
                city jobs, MGH, and 250,000 college students region-wide — is one tunnel or two Blue Line stops
                away.
              </div>
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
