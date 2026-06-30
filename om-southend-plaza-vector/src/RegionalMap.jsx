import { DEAL, FULL_ADDR as DEAL_FULL_ADDR, PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A tristate-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   commute-facts panel. Narrative in the "anchors, not bets" register.
   Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Subject property — South End Plaza, Thomaston CT.
const SUBJECT = { lat: 41.6650, lng: -73.0730 }

// Major cities on the regional (upper Naugatuck Valley / north-central CT) map.
const CITIES = [
  { name: 'Waterbury', lat: 41.5582, lng: -73.0515 },
  { name: 'Torrington', lat: 41.8007, lng: -73.1212 },
  { name: 'Hartford', lat: 41.7637, lng: -72.6851 },
  { name: 'New Haven', lat: 41.3083, lng: -72.9279 },
]

const AIRPORTS = [
  { name: 'Bradley Intl (BDL)', lat: 41.9389, lng: -72.6832 },
  { name: 'Tweed New Haven (HVN)', lat: 41.2637, lng: -72.8868 },
]

const COMMUTE = [
  { label: 'Waterbury', value: '~9 mi · ~15 min' },
  { label: 'Torrington', value: '~10 mi · ~15 min' },
  { label: 'Hartford', value: '~30 mi · ~40 min' },
  { label: 'New Haven', value: '~30 mi · ~40 min' },
  { label: 'Bradley Intl (BDL)', value: '~45 minutes' },
  { label: 'Tweed New Haven (HVN)', value: '~40 minutes' },
  { label: 'New York City', value: '~85 mi · ~1h50m' },
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
          <strong>On the US-6 corridor, less than a mile from Route 8 in the upper Naugatuck Valley.</strong>{' '}
          South End Plaza sits on South Main Street in Thomaston, under a mile from Route 8 (Exits 38 and 39) — the
          limited-access expressway running the length of the valley, with Waterbury and its Metro-North Waterbury
          Branch terminus 10 to 15 minutes south and Torrington to the north. U.S. Route 6 runs through downtown
          Thomaston, and South Main Street carries about 12,800 vehicles per day at the property&rsquo;s frontage.
        </div>

        {/* Regional stat strip — golden-top boxes matching the Exec Summary house style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            ['< 1 mi', 'To Route 8 · Exits 38 & 39'],
            ['12,800', 'VPD at South Main frontage'],
            ['~15 min', 'To Waterbury & Metro-North'],
            ['~45 min', 'To Bradley Intl (BDL)'],
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
              <LegendRow color="#3F4753" label="Major Cities" />
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
                <strong>Route 8</strong> — Exits 38 &amp; 39 less than a mile away; south to Waterbury (~10&ndash;15 min)
                and I-95, north to Torrington. <strong>U.S. Route 6</strong> — through downtown Thomaston, east to
                Bristol and southwest to Watertown. <strong>South Main Street</strong> — ~12,800 VPD at the frontage.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                Thomaston keeps a working base in metalworking, precision components, and defense —{' '}
                <strong>Thomaston Savings Bank</strong>, <strong>Stewart EFI</strong>, and{' '}
                <strong>Ward Leonard</strong> (Fairbanks Morse Defense). Greater Waterbury, ten minutes south, adds{' '}
                <strong>Waterbury Hospital</strong>, <strong>Saint Mary&rsquo;s Hospital</strong>,{' '}
                <strong>Post University</strong>, and <strong>UConn Waterbury</strong>.
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
