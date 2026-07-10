import { PageHeader } from './Shell.jsx'
import { DEAL, FULL_ADDR } from './deal.js'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A regional-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   stat strip and commute-facts panel. Narrative in the "anchors, not bets"
   register. Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Subject property — 29 West Street, New Milford CT.
const SUBJECT = { lat: 41.5743564, lng: -73.4116566 }

// Regional anchors across the tristate. With no center/zoom set, Static Maps
// auto-frames to fit every marker — so these (Hartford → NYC) pull the view out
// to a true regional scale with the property near the hub.
const CITIES = [
  { name: 'Danbury', lat: 41.3948, lng: -73.4540 },
  { name: 'Waterbury', lat: 41.5582, lng: -73.0515 },
  { name: 'Hartford', lat: 41.7658, lng: -72.6734 },
  { name: 'Stamford', lat: 41.0534, lng: -73.5387 },
  { name: 'New York City', lat: 40.7128, lng: -74.0060 },
]

const AIRPORTS = [
  { name: 'Westchester County (HPN)', lat: 41.0670, lng: -73.7076 },
  { name: 'Bradley Intl (BDL)', lat: 41.9389, lng: -72.6832 },
  { name: 'LaGuardia (LGA)', lat: 40.7769, lng: -73.8740 },
]

const COMMUTE = [
  { label: 'Danbury / I-84', value: '~16 mi · ~20 min' },
  { label: 'Waterbury', value: '~24 mi · ~35 min' },
  { label: 'Westchester (HPN)', value: '~40 mi · ~50 min' },
  { label: 'Stamford', value: '~38 mi · ~55 min' },
  { label: 'Hartford', value: '~40 mi · ~55 min' },
  { label: 'New York City', value: '~68 mi · ~90 min' },
  { label: 'Bradley Intl (BDL)', value: '~55 mi · ~70 min' },
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
  const mapUrl = API_KEY ? buildStaticMapUrl() : null

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Regional <span style={{ color: '#F8971D' }}>Positioning</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Litchfield County character with tristate reach.</strong>{' '}
          29 West Street sits on the <strong>Route 7 / US-202</strong> spine in northwestern Connecticut, tying into
          <strong> I-84 at Danbury</strong> in about 20 minutes &mdash; opening the Waterbury and Hartford corridor to
          the east and the Stamford and New York metro to the southwest. Metro-North&rsquo;s Danbury Branch and express
          bus add a rail link toward Manhattan, drawing on a deep NYC-commuter and Litchfield County tenant base.
        </div>

        {/* Regional stat strip — golden-top boxes matching the Exec Summary house style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            ['~20 min', 'To I-84 at Danbury'],
            ['~90 min', 'To Midtown Manhattan'],
            ['~50 min', 'To Westchester (HPN)'],
            ['Metro-North', 'Danbury Branch rail'],
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
              <img src={mapUrl} alt="Regional positioning map of New Milford, CT within the tristate region" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <strong>US-7 &amp; US-202</strong> — the north–south spine through the village center, linking to
                <strong> I-84 at Danbury</strong> (~20 min) for the east–west run to Waterbury, Hartford, and the NYC
                metro. <strong>Route 67</strong> ties in toward the Naugatuck Valley, and Metro-North&rsquo;s
                <strong> Danbury Branch</strong> plus express bus add a commuter-rail link toward Grand Central.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 9.4, lineHeight: 1.42, color: 'var(--graphite)' }}>
                New Milford anchors the <strong>Route 7 corridor</strong> in northwestern Connecticut. <strong>New
                Milford Hospital</strong> (Nuvance Health), the school district, and town government anchor local jobs,
                while <strong>Danbury</strong> — ~20 min south — adds a deep metro market in health care, finance, and
                corporate offices. The <strong>Litchfield Hills</strong> tourism economy and Metro-North / I-84 access
                to Stamford and New York round out the base.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/compass.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
          <span className="conf">{DEAL.status} &middot; {DEAL.name} &middot; {FULL_ADDR}</span>
        </div>
        <span className="page-num">{pageNum}</span>
      </div>
    </div>
  )
}
