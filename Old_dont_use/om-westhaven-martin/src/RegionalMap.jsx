import { PageHeader } from './Shell.jsx'

/* ═══════════════════ REGIONAL POSITIONING ═══════════════════
   A tristate-scale Static Maps view with highways emphasized in golden and
   category-colored pins (subject property, major cities, airports), plus a
   commute-facts panel. Narrative in the "anchors, not bets" register.
   Requires VITE_GOOGLE_MAPS_API_KEY (Maps Static API). */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const SUBJECT = { lat: 41.273245, lng: -72.946281 }

// Major cities only — secondary cities that would stack on airports or the
// subject pin (New Haven, White Plains, Newark) are left to the basemap labels.
const CITIES = [
  { name: 'New York City', lat: 40.7128, lng: -74.0060 },
  { name: 'Stamford', lat: 41.0534, lng: -73.5387 },
  { name: 'Bridgeport', lat: 41.1792, lng: -73.1894 },
  { name: 'Danbury', lat: 41.3948, lng: -73.4540 },
  { name: 'Hartford', lat: 41.7658, lng: -72.6734 },
  { name: 'Springfield', lat: 42.1015, lng: -72.5898 },
  { name: 'Worcester', lat: 42.2626, lng: -71.8023 },
  { name: 'Providence', lat: 41.8240, lng: -71.4128 },
  { name: 'Boston', lat: 42.3601, lng: -71.0589 },
]

/* Metro-North New Haven Line: West Haven → Stamford → New Rochelle → Grand
   Central. Drawn as a polyline to make the rail link legible on the map. */
const RAIL = [
  [41.2712, -72.9633], // West Haven Station
  [41.2226, -73.0568], // Milford
  [41.1792, -73.1894], // Bridgeport
  [41.0966, -73.4212], // South Norwalk
  [41.0534, -73.5387], // Stamford
  [41.0262, -73.6282], // Greenwich
  [40.9115, -73.7824], // New Rochelle
  [40.8050, -73.9385], // Harlem – 125th St
  [40.7527, -73.9772], // Grand Central, NYC
]

const AIRPORTS = [
  { name: 'Westchester County (HPN)', lat: 41.0670, lng: -73.7076 },
  { name: 'JFK International', lat: 40.6413, lng: -73.7781 },
  { name: 'Newark (EWR)', lat: 40.6895, lng: -74.1745 },
  { name: 'Bradley International (BDL)', lat: 41.9389, lng: -72.6832 },
]

// Industry anchors ("I") and academic anchors ("A") — the regional employment
// and talent base.
const INDUSTRY = [
  { name: 'Sikorsky (Lockheed Martin)', lat: 41.1626, lng: -73.1262 }, // Stratford
  { name: 'Electric Boat (Gen. Dynamics)', lat: 41.3490, lng: -72.0840 }, // Groton
  { name: 'Pratt & Whitney', lat: 41.5560, lng: -72.6730 }, // Middletown
]
// Yale / UNH / SCSU sit right on top of the subject at regional scale, so the
// academic anchors here are the nearby New Haven-area campus (Quinnipiac, in
// Hamden) plus distant UConn; Yale and the rest are on the Location page.
const ACADEMIC = [
  { name: 'Quinnipiac University', lat: 41.4216, lng: -72.8967 }, // Hamden
  { name: 'UConn', lat: 41.8077, lng: -72.2540 }, // Storrs
]

const COMMUTE = [
  { label: 'Midtown Manhattan', value: '~75 mi · ~1 hr 50 min by train' },
  { label: 'Downtown New Haven', value: '~10 minutes' },
  { label: 'Tweed New Haven (HVN)', value: '~15 minutes' },
  { label: 'Hartford, CT', value: '~45 minutes via I-91' },
  { label: 'Bradley Intl (BDL)', value: '~50 minutes' },
  { label: 'Boston, MA', value: '~2 hr 15 min drive' },
  { label: 'Washington, D.C.', value: 'Direct Amtrak (NE Corridor)' },
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
  const subjectPin = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|label:W|${SUBJECT.lat},${SUBJECT.lng}`)}`
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
  const FULL_ADDR = '254 Main Street, West Haven, CT 06516'
  const mapUrl = API_KEY ? buildStaticMapUrl() : null

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Regional <span style={{ color: '#F8971D' }}>Positioning</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
          <strong>A New Haven County address on the Northeast Corridor.</strong> West Haven sits ~75 miles from
          Midtown Manhattan via the Metro-North New Haven Line and I-95, squarely on the Boston&ndash;New York&ndash;
          Washington corridor. Amtrak&rsquo;s Northeast Corridor and Shore Line East run through neighboring New
          Haven, with Tweed New Haven Airport ~15 minutes away and Bradley International ~50 minutes north. For
          long-hold capital, this is durable, institution-anchored demand from Yale, Yale New Haven Health, the
          University of New Haven, and a deep regional employment base.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0 }}>
            {mapUrl ? (
              <img src={mapUrl} alt="Regional map of West Haven, CT within the New York–Boston corridor" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API.
              </div>
            )}
            <div style={{ position: 'absolute', left: 10, top: 10, background: 'rgba(255,255,255,0.95)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 6px rgba(0,0,0,0.18)' }}>
              <LegendRow color="#F8971D" label="Subject Property — West Haven" />
              <LegendRow color="#3F4753" label="Major Cities" />
              <LegendRow color="#884EA0" label="Academic Anchors (A)" />
              <LegendRow color="#117A65" label="Industry Anchors (I)" />
              <LegendRow color="#2471A3" label="Airports" />
              <LegendRow color="#F8971D" label="Major Highways" line />
              <LegendRow color="#B55D37" label="Metro-North · New Haven Line → NYC" line />
            </div>
          </div>

          {/* FACTS PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0, overflow: 'hidden' }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Drive &amp; Commute Times</h3>
              {COMMUTE.map(c => (
                <div key={c.label} className="bldg-row" style={{ padding: '3px 0', fontSize: 11 }}><span className="bldg-label">{c.label}</span><span className="bldg-val">{c.value}</span></div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Highway Access</h3>
              <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)' }}>
                I-95 &middot; I-91 &middot; Merritt Parkway (Rte 15) &middot; Wilbur Cross Parkway &mdash; linking
                West Haven to New York City, New Haven, and the Hartford&ndash;Springfield corridor.
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>Economic Anchors</h3>
              <div style={{ fontSize: 9.5, lineHeight: 1.45, color: 'var(--graphite)' }}>
                West Haven sits at the center of <strong>Greater New Haven</strong>, anchored by <strong>Yale
                University</strong> and <strong>Yale New Haven Health</strong> &mdash; the region&rsquo;s largest
                employer &mdash; alongside a fast-growing <strong>life-sciences and biotech</strong> cluster
                (Alexion, Arvinas, BioHaven). The <strong>University of New Haven</strong> and the <strong>VA
                Connecticut</strong> medical campus sit minutes away, while aerospace &amp; defense (Sikorsky,
                Electric Boat) and the Hartford insurance corridor round out a deep, diversified regional economy
                &mdash; all on the Northeast Corridor between <strong>New York</strong> and <strong>Boston</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/compass.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
          <span className="conf">For Sale &middot; {FULL_ADDR}</span>
        </div>
        <span className="page-num">{pageNum}</span>
      </div>
    </div>
  )
}
