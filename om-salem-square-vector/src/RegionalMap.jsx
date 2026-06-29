import { DEAL, FULL_ADDR as DEAL_FULL_ADDR, PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A tristate-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   commute-facts panel. Narrative in the "anchors, not bets" register.
   Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Subject property — Salem Square, Naugatuck CT.
const SUBJECT = { lat: 41.4705, lng: -73.0490 }

// Major cities on the regional (Naugatuck Valley / south-central CT) map.
const CITIES = [
  { name: 'Waterbury', lat: 41.5582, lng: -73.0515 },
  { name: 'New Haven', lat: 41.3083, lng: -72.9279 },
  { name: 'Bridgeport', lat: 41.1792, lng: -73.1894 },
  { name: 'Hartford', lat: 41.7637, lng: -72.6851 },
  { name: 'Danbury', lat: 41.3948, lng: -73.4540 },
  { name: 'Stamford', lat: 41.0534, lng: -73.5387 },
  { name: 'Norwalk', lat: 41.1177, lng: -73.4079 },
  { name: 'Meriden', lat: 41.5382, lng: -72.8070 },
]

const AIRPORTS = [
  { name: 'Tweed New Haven (HVN)', lat: 41.2637, lng: -72.8868 },
  { name: 'Bradley Intl (BDL)', lat: 41.9389, lng: -72.6832 },
]

// Industry anchors ("I") and academic anchors ("A") — the regional employment
// and talent base.
const INDUSTRY = [
  { name: 'The Eastern Company (Shelton HQ)', lat: 41.3165, lng: -73.0932 },
  { name: 'Webster Bank (Waterbury)', lat: 41.5560, lng: -73.0410 },
]
const ACADEMIC = [
  { name: 'Post University', lat: 41.5380, lng: -73.0760 },
  { name: 'UConn Waterbury', lat: 41.5570, lng: -73.0380 },
]

const COMMUTE = [
  { label: 'Waterbury', value: '~8 mi · ~12 min' },
  { label: 'New Haven', value: '~25 mi · ~30 min' },
  { label: 'Bridgeport', value: '~28 mi · ~35 min' },
  { label: 'Hartford', value: '~32 mi · ~40 min' },
  { label: 'Danbury', value: '~22 mi · ~35 min' },
  { label: 'Tweed New Haven (HVN)', value: '~30 minutes' },
  { label: 'Bradley Intl (BDL)', value: '~40 minutes' },
  { label: 'New York City', value: '~80 mi · ~1h40m' },
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
  // De-overlap markers at the regional zoom. The subject is the fixed anchor
  // (placed first, never nudged); other pins spiral off any already-placed pin.
  const MIN = 0.016
  const placed = []
  const near = (a, b) => {
    const dLat = a.lat - b.lat
    const dLng = (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180)
    return Math.sqrt(dLat * dLat + dLng * dLng) < MIN
  }
  const place = (p) => {
    let lat = p.lat, lng = p.lng, t = 0
    while (placed.some(q => near({ lat, lng }, q)) && t < 24) {
      const ang = (t * 137.5 * Math.PI) / 180
      const r = MIN * (1 + t * 0.4)
      lat = p.lat + Math.sin(ang) * r
      lng = p.lng + (Math.cos(ang) * r) / Math.cos((p.lat * Math.PI) / 180)
      t++
    }
    placed.push({ lat, lng })
    return { lat, lng }
  }
  const subj = place({ lat: SUBJECT.lat, lng: SUBJECT.lng })
  const cities = CITIES.map(place)
  const academic = ACADEMIC.map(place)
  const industry = INDUSTRY.map(place)
  const airports = AIRPORTS.map(place)

  // Cities use small dots (not mid pins) so the marker sits on the point without
  // covering the locality name label that Google renders at the city center.
  const cityPins = `markers=${encodeURIComponent(`size:small|color:${CARBON}|${cities.map(c => `${c.lat},${c.lng}`).join('|')}`)}`
  const airportPins = `markers=${encodeURIComponent(`size:mid|color:${BLUE}|${airports.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const academicPins = `markers=${encodeURIComponent(`size:mid|color:${PURPLE}|label:A|${academic.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const industryPins = `markers=${encodeURIComponent(`size:mid|color:${TEAL}|label:I|${industry.map(a => `${a.lat},${a.lng}`).join('|')}`)}`
  const subjectPin = `markers=${encodeURIComponent(`color:${GOLDEN}|${subj.lat},${subj.lng}`)}`
  const params = [
    'size=640x520',
    'scale=2',
    'maptype=roadmap',
    'format=png',
    ...style.map(s => `style=${encodeURIComponent(s)}`),
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
          <strong>The Naugatuck Valley spine, on the Route 8 and Metro-North corridors.</strong> Salem Square
          sits on New Haven Road (Route 63) with direct Route 8 access — the limited-access expressway that runs
          the length of the valley, connecting Waterbury ten minutes north and Bridgeport and the shoreline to
          the south. Naugatuck is one of the few valley towns directly on Metro-North&rsquo;s Waterbury Branch,
          where a new $33.2 million station opening in summer 2027 is being built to anchor transit-oriented
          development — a direct demand driver for the entitled 51-unit project.
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
                <strong>Route 8</strong> — direct access; the valley&rsquo;s limited-access spine, north to
                Waterbury (~10 min) and I-84, south to Bridgeport and I-95. <strong>Route 63 (New Haven Road)</strong>
                — 16,200 VPD at the property&rsquo;s frontage. I-84 and the Merritt Parkway are within reach via
                Route 8.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                Naugatuck anchors the southern valley with a working manufacturing base — the{' '}
                <strong>Naugatuck Industrial Park</strong> and the longtime home of{' '}
                <strong>The Eastern Company</strong> (Nasdaq: EML), the 165-year-old manufacturer now
                headquartered down Route 8 in Shelton. Greater Waterbury — ten minutes north — adds{' '}
                <strong>Waterbury Hospital</strong>, <strong>Saint Mary&rsquo;s Hospital</strong>,{' '}
                <strong>Webster Bank</strong>, <strong>Post University</strong>, and{' '}
                <strong>UConn Waterbury</strong>, with the Hartford and New Haven job markets beyond.
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
