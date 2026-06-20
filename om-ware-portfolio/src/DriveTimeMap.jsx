import { PageHeader, PageFooter } from './Shell.jsx'
import { ISOCHRONES } from './isochrones.js'

/* ═══════════════════ DRIVE TIMES ═══════════════════
   Full-page drive-time map, layered so the rings truly sit BEHIND the map's
   labels and highways (z-order, not a blend hack):

     1. base image  — bold styled basemap, NO labels (Google Static Maps)
     2. rings       — raw wavy Valhalla isochrone polygons, SVG overlay
     3. labels image— white-background labels+highways layer, baked transparent
                      so only town names / highway shields / lines land on top
     4. subject     — the property marker, drawn last so it stays on top

   All four share one Web-Mercator frame (CENTER/ZOOM/size), and every layer
   stretch-fills the container, so they stay registered.

   Band geometry: `npm run isochrones`. Labels: `npm run map-labels`.
   Requires VITE_GOOGLE_MAPS_API_KEY. */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const SUBJECT = { lat: 42.2616, lng: -72.2420 } // downtown Ware portfolio
const CENTER = { lat: 42.18, lng: -72.25 }
const ZOOM = 8, W = 640, H = 460

const CITIES = [
  { name: 'Palmer', drive: '~9 mi · 17 min' },
  { name: 'Amherst', drive: '~20 mi · 26 min' },
  { name: 'Springfield', drive: '~28 mi · 40 min' },
  { name: 'Northampton', drive: '~28 mi · 38 min' },
  { name: 'Worcester', drive: '~28 mi · 42 min' },
  { name: 'Hartford', drive: '~53 mi · 62 min' },
]
const BAND_HEX = { 15: '#229954', 30: '#2471A3', 45: '#7D3C98', 60: '#C0392B' }

// Bold basemap geometry, no labels — the bottom layer.
const BASE_STYLE = [
  'feature:poi|visibility:off',
  'feature:landscape|color:0xe7dfcc',
  'feature:water|color:0x8fbcd6',
  'feature:road.arterial|element:geometry|color:0xffffff',
  'feature:road.highway|element:geometry.fill|color:0xF4A93C',
  'feature:road.highway|element:geometry.stroke|color:0xC9781A',
  'feature:road|element:labels|visibility:off',
  'feature:administrative|element:labels|visibility:off',
]
const LABELS_OVERLAY = '/photos/maps/drivetime-labels.png'

/* Web-Mercator projection (logical px) → frame pixels. */
function worldXY(lat, lng) {
  const world = 256 * 2 ** ZOOM
  const x = (lng + 180) / 360 * world
  const s = Math.sin(lat * Math.PI / 180)
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * world
  return [x, y]
}
const CX = worldXY(CENTER.lat, CENTER.lng)
const toPx = (lat, lng) => { const [x, y] = worldXY(lat, lng); return [x - CX[0] + W / 2, y - CX[1] + H / 2] }

function mapUrl(styleArr) {
  const params = [
    `size=${W}x${H}`, 'scale=2', 'maptype=roadmap', 'format=png',
    `center=${CENTER.lat},${CENTER.lng}`, `zoom=${ZOOM}`,
    ...styleArr.map(s => `style=${encodeURIComponent(s)}`),
    `key=${API_KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

const RING_PATHS = ISOCHRONES.map(b => ({
  min: b.min, color: b.color,
  points: b.coords.map(([lat, lng]) => toPx(lat, lng).map(v => v.toFixed(1)).join(',')).join(' '),
}))
const SUBJ_PX = toPx(SUBJECT.lat, SUBJECT.lng)

function LegendRow({ color, label, ring, pin }) {
  let icon
  if (ring) icon = <span style={{ width: 13, height: 13, borderRadius: '50%', border: `3px solid ${color}`, background: 'transparent', flexShrink: 0 }} />
  else if (pin) icon = <span style={{ width: 13, height: 13, borderRadius: '50% 50% 50% 0', transform: 'rotate(45deg)', background: color, flexShrink: 0 }} />
  else icon = <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9 }}>
      {icon}
      <span style={{ color: 'var(--carbon)', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

const fill = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

export default function DriveTimeMap({ pageNum }) {
  const ok = !!API_KEY
  const baseUrl = ok ? mapUrl(BASE_STYLE) : null

  return (
    <div className="page">
      <PageHeader section="Drive Times" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Drive <span style={{ color: '#F8971D' }}>Times</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Road-network drive-time reach from the portfolio.</strong> Sitting between Springfield and
          Worcester with I-90 (Mass Pike) access just south at Palmer, Ware puts Amherst, Springfield, and Worcester
          inside ~45 minutes and Hartford about an hour, drawing on the Pioneer Valley and Greater Worcester labor and
          tenant pool.
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 16px', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
          <LegendRow color="#F8971D" label="Ware Portfolio (subject)" pin />
          <LegendRow color={BAND_HEX[15]} label="15-min drive" ring />
          <LegendRow color={BAND_HEX[30]} label="30-min drive" ring />
          <LegendRow color={BAND_HEX[45]} label="45-min drive" ring />
          <LegendRow color={BAND_HEX[60]} label="60-min drive" ring />
        </div>

        {/* MAP — layered: base → rings → labels → subject marker */}
        <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', flex: 1, minHeight: 0 }}>
          {ok ? (
            <>
              <img src={baseUrl} alt="Drive-time map centered on Ware, MA" style={{ ...fill, objectFit: 'fill', display: 'block' }} />
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
                {/* Filled translucent bands (largest first → nested shading toward
                    the center), then the stroke outlines on top. */}
                {RING_PATHS.map(r => (
                  <polygon key={`f-${r.min}`} points={r.points} fill={r.color} fillOpacity={0.16} stroke="none" />
                ))}
                {RING_PATHS.map(r => (
                  <polygon key={`s-${r.min}`} points={r.points} fill="none" stroke={r.color} strokeWidth={2}
                    strokeOpacity={0.95} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
              <img src={LABELS_OVERLAY} alt="" aria-hidden="true" style={{ ...fill, objectFit: 'fill', pointerEvents: 'none' }} />
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
                {/* subject property marker — gold teardrop pin, tip at the site */}
                <g transform={`translate(${SUBJ_PX[0]} ${SUBJ_PX[1]})`}>
                  <ellipse cx="0" cy="1" rx="5" ry="2" fill="rgba(0,0,0,0.28)" />
                  <path d="M0 0 C -5 -8 -8 -11 -8 -15 A 8 8 0 1 1 8 -15 C 8 -11 5 -8 0 0 Z"
                    fill="#F8971D" stroke="#fff" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <circle cx="0" cy="-15" r="3.2" fill="#fff" />
                </g>
              </svg>
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
              Set VITE_GOOGLE_MAPS_API_KEY in .env.local and enable Maps Static API.
            </div>
          )}
        </div>

        {/* DRIVE-TIME STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginTop: 10 }}>
          {CITIES.map(c => (
            <div key={c.name} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{c.name}</div>
              <div style={{ fontSize: 9, color: 'var(--stone)', fontWeight: 600, marginTop: 2 }}>{c.drive}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 7.5, color: 'var(--stone)', marginTop: 6 }}>
          Drive-time bands reflect typical road-network travel times and are approximate; actual times vary with
          traffic and time of day.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
