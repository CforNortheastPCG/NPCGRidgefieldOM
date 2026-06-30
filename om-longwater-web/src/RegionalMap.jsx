import { DEAL, FULL_ADDR as DEAL_FULL_ADDR, PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A metro-Boston / South Shore Static Maps view with highways emphasized in
   golden and category-colored pins (subject property, major cities, airport),
   plus a commute-facts panel. Renders live via the Maps Static API.
   Requires VITE_GOOGLE_MAPS_API_KEY. */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Subject property — Longwater Corporate Center, 120 Longwater Dr, Norwell MA.
const SUBJECT = { lat: 42.15679, lng: -70.879097 }

// Southern New England's three major metros — Boston, Worcester, Providence.
const CITIES = [
  { name: 'Boston', lat: 42.3601, lng: -71.0589 },
  { name: 'Worcester', lat: 42.2626, lng: -71.8023 },
  { name: 'Providence', lat: 41.8240, lng: -71.4128 },
]
// Local South Shore context cities — smaller pins.
const LOCAL = [
  { name: 'Quincy', lat: 42.2529, lng: -71.0023 },
  { name: 'Brockton', lat: 42.0834, lng: -71.0184 },
  { name: 'Plymouth', lat: 41.9584, lng: -70.6673 },
]

const AIRPORTS = [
  { name: 'Logan Intl (BOS)', lat: 42.3656, lng: -71.0096 },
]

const COMMUTE = [
  { label: 'Boston', value: '~20 mi · ~30 min' },
  { label: 'Logan Intl (BOS)', value: '~25 mi · ~35 min' },
  { label: 'Providence, RI', value: '~45 mi · ~55 min' },
  { label: 'Worcester', value: '~55 mi · ~1 hr 5 min' },
  { label: 'Quincy', value: '~12 mi · ~20 min' },
  { label: 'Cape Cod (Sagamore)', value: '~25 mi · ~30 min' },
]

const CARBON = '0x3F4753'
const BLUE = '0x2471A3'
const GOLDEN = '0xF8971D'
const LOCALGRAY = '0x8893A0'

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
  const localPins = `markers=${encodeURIComponent(`size:tiny|color:${LOCALGRAY}|${LOCAL.map(c => `${c.lat},${c.lng}`).join('|')}`)}`
  const airportPins = `markers=${encodeURIComponent(`size:mid|color:${BLUE}|${AIRPORTS.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const subjectPin = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|${SUBJECT.lat},${SUBJECT.lng}`)}`
  const params = [
    'size=640x520',
    'scale=2',
    'maptype=roadmap',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
    localPins,
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
  const mapUrl = API_KEY ? buildStaticMapUrl() : null

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Regional <span style={{ color: '#F8971D' }}>Positioning</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Central to Boston, Worcester, and Providence.</strong>{' '}
          Longwater Corporate Center sits in Norwell on metro Boston&rsquo;s affluent South Shore, within roughly an
          hour of southern New England&rsquo;s three major metros — Boston (~20 mi northwest), Providence (~45 mi
          southwest), and Worcester (~55 mi west). The building is about a mile from Route&nbsp;3 (Exit&nbsp;13), the
          expressway that runs from the Braintree split south to Plymouth and Cape Cod; downtown Boston and Logan
          International Airport are about 30&ndash;35 minutes north. The South Shore is a deep, supply-constrained
          suburban market anchored by professional, healthcare, and financial employers.
        </div>

        {/* Regional stat strip — golden-top boxes matching the Exec Summary house style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            ['~1 mi', 'To Route 3 · Exit 13'],
            ['~20 mi', 'To Boston (~30 min)'],
            ['~25 mi', 'To Logan Intl (BOS)'],
            ['~6 mi', 'To South Shore Hospital'],
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
              <LegendRow color="#3F4753" label="Boston · Worcester · Providence" />
              <LegendRow color="#8893A0" label="South Shore Cities" />
              <LegendRow color="#2471A3" label="Airport" />
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
                <strong>Route 3</strong> — Exit 13 about a mile away; north to the Braintree split, I-93, and Boston,
                south to Plymouth and the Sagamore Bridge. <strong>Route 53</strong> and <strong>Route 228</strong>
                {' '}carry the local South Shore corridor through Norwell, Hanover, and Hingham.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                The South Shore pairs affluent residential demand with a deep employment base —{' '}
                <strong>South Shore Health</strong> (South Shore Hospital, Weymouth), <strong>Talbots</strong>{' '}
                (headquartered in Hingham), and the retail and medical-office corridors of Norwell, Hanover, and
                Hingham. Greater <strong>Boston</strong> — financial services, healthcare, higher education, and tech —
                sits ~30 minutes north via Route 3.
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
