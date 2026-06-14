import { DEAL, FULL_ADDR as DEAL_FULL_ADDR, PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A tristate-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   commute-facts panel. Narrative in the "anchors, not bets" register.
   Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// TODO: set the property coordinates. Placeholder below is a valid point.
const SUBJECT = { lat: 41.0000, lng: -73.0000 }

// TODO: major cities to plot on the regional map. Replace names + coordinates.
const CITIES = [
  { name: 'TODO City', lat: 40.7128, lng: -74.0060 }, // TODO: set coordinates
  { name: 'TODO City', lat: 41.0534, lng: -73.5387 }, // TODO: set coordinates
  { name: 'TODO City', lat: 42.3601, lng: -71.0589 }, // TODO: set coordinates
]

// TODO: transit line polyline (e.g. commuter rail) — set the real stop
// coordinates so the link renders on the map.
const RAIL = [
  [41.0000, -73.0000], // TODO: set rail stop coordinates
  [40.8050, -73.9385], // TODO: set rail stop coordinates
  [40.7527, -73.9772], // TODO: set rail stop coordinates
]

const AIRPORTS = [
  { name: 'TODO Airport', lat: 41.0670, lng: -73.7076 }, // TODO: set coordinates
  { name: 'TODO Airport', lat: 40.6413, lng: -73.7781 }, // TODO: set coordinates
]

// Industry anchors ("I") and academic anchors ("A") — the regional employment
// and talent base. TODO: replace with the deal's regional anchors.
const INDUSTRY = [
  { name: 'TODO Industry Anchor', lat: 41.1626, lng: -73.1262 }, // TODO: set coordinates
  { name: 'TODO Industry Anchor', lat: 41.3490, lng: -72.0840 }, // TODO: set coordinates
]
const ACADEMIC = [
  { name: 'TODO University', lat: 41.4216, lng: -72.8967 }, // TODO: set coordinates
  { name: 'TODO University', lat: 41.8077, lng: -72.2540 }, // TODO: set coordinates
]

const COMMUTE = [
  { label: 'TODO Destination', value: '~0 mi · ~0 min' },
  { label: 'TODO Destination', value: '~0 minutes' },
  { label: 'TODO Airport', value: '~0 minutes' },
  { label: 'TODO Destination', value: '~0 minutes' },
  { label: 'TODO Airport', value: '~0 minutes' },
  { label: 'TODO Destination', value: '~0 min drive' },
  { label: 'TODO Destination', value: 'TODO' },
]

const CARBON = '0x3F4753'
const BLUE = '0x2471A3'
const GOLDEN = '0xF8971D'
const PURPLE = '0x884EA0'
const TEAL = '0x117A65'

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
  const academicPins = `markers=${encodeURIComponent(`size:mid|color:${PURPLE}|label:A|${ACADEMIC.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const industryPins = `markers=${encodeURIComponent(`size:mid|color:${TEAL}|label:I|${INDUSTRY.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const subjectPin = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|label:C|${SUBJECT.lat},${SUBJECT.lng}`)}`
  const railPath = `path=${encodeURIComponent(`color:0xB55D37|weight:5|${RAIL.map(p => `${p[0]},${p[1]}`).join('|')}`)}`
  const params = [
    'size=640x520',
    'scale=2',
    'maptype=roadmap',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
    railPath,
    cityPins,
    airportPins,
    academicPins,
    industryPins,
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
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          <strong>TODO: regional positioning headline.</strong> TODO: regional positioning narrative — the
          property's place within the broader metro/corridor, key transit and highway links, and the regional
          demand drivers that anchor long-term value.
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
              <LegendRow color="#3F4753" label="Major Cities" />
              <LegendRow color="#884EA0" label="Academic Anchors (A)" />
              <LegendRow color="#117A65" label="Industry Anchors (I)" />
              <LegendRow color="#2471A3" label="Airports" />
              <LegendRow color="#F8971D" label="Major Highways" line />
              <LegendRow color="#B55D37" label="Transit Line" line />
            </div>
          </div>

          {/* FACTS PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0, overflow: 'hidden' }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Drive &amp; Commute Times</h3>
              {COMMUTE.map(c => (
                <div key={c.label} className="bldg-row" style={{ padding: '2px 0', fontSize: 10.5 }}><span className="bldg-label">{c.label}</span><span className="bldg-val">{c.value}</span></div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Highway Access</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                TODO: highway access — list the major highways and parkways serving the property and where they
                lead.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                TODO: economic anchors — the major employers, institutions, and industry clusters that drive
                regional demand.
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
