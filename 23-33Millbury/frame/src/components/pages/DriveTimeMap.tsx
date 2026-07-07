/* ═══════════ DRIVE TIMES (protected) ═══════════
   Layered per DRIVE_TIMES_MAP_FINAL.md: bold no-label basemap → filled
   shaded Valhalla bands (SVG) → pre-baked transparent labels overlay →
   subject pin + on-map band chips. All layers share one Web-Mercator
   frame and stretch-fill an aspect-locked box, so they stay registered.
   Ring legend lives in the side column with the city cards, keeping the
   area above the map clean. Data: gen-maps.mjs. */

import { PageHeader, PageFooter, SectionTitle, assetUrl } from '../Shell.tsx'
import { DEAL } from '../../data/deal.ts'
import { MAPDATA } from '../../data/mapdata.ts'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

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

const fill: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

function LegendRow({ color, label, ring, pin }: { color: string; label: string; ring?: boolean; pin?: boolean }) {
  const icon = ring ? (
    <span style={{ width: 12, height: 12, borderRadius: '50%', border: `3px solid ${color}`, flexShrink: 0 }} />
  ) : pin ? (
    // The exact marker drawn on the map, scaled down — same path, same white
    // outline and dot, so the legend unambiguously matches the pin.
    <svg width={13} height={17} viewBox="-11 -26 22 28" style={{ flexShrink: 0, display: 'block' }} aria-hidden="true">
      <path
        d="M0 0 C -5 -8 -8 -11 -8 -15 A 8 8 0 1 1 8 -15 C 8 -11 5 -8 0 0 Z"
        fill={color}
        stroke="#fff"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={0} cy={-15} r={3.2} fill="#fff" />
    </svg>
  ) : (
    <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9 }}>
      {icon}
      <span style={{ color: 'var(--carbon)', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

export function DriveTimeMap({ pageNum }: { pageNum?: number }) {
  const m = MAPDATA
  const ready = m.generated && m.subject && m.frame && API_KEY

  let body: React.ReactNode
  if (!ready) {
    body = (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 11, textAlign: 'center', padding: 24, borderRadius: 4 }}>
        {m.generated ? 'Set VITE_GOOGLE_MAPS_API_KEY to render the map.' : 'Drive-time data not generated yet — run scripts/gen-maps.mjs.'}
      </div>
    )
  } else {
    const { centerLat, centerLng, zoom, w: W, h: H } = m.frame!
    const world = 256 * 2 ** zoom
    const worldXY = (lat: number, lng: number): [number, number] => {
      const x = ((lng + 180) / 360) * world
      const s = Math.sin((lat * Math.PI) / 180)
      const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * world
      return [x, y]
    }
    const [cx, cy] = worldXY(centerLat, centerLng)
    const toPx = (lat: number, lng: number): [number, number] => {
      const [x, y] = worldXY(lat, lng)
      return [x - cx + W / 2, y - cy + H / 2]
    }
    const ringPaths = m.isochrones.map((b) => ({
      min: b.min,
      color: b.color,
      points: b.coords.map(([lat, lng]) => toPx(lat, lng).map((v) => v.toFixed(1)).join(',')).join(' '),
    }))
    const [sx, sy] = toPx(m.subject!.lat, m.subject!.lng)

    // Band labels ON the map: pin each ring's "N MIN" chip where the ring
    // crosses the due-west corridor from the subject (the inland side for
    // coastal deals; rings nest, so the chips fan out in a readable line).
    const bandChips = m.isochrones
      .map((b) => {
        const candidates = b.coords
          .map(([lat, lng]) => toPx(lat, lng))
          .filter(([x, y]) => x < sx && Math.abs(y - sy) < H * 0.09)
        if (candidates.length === 0) return null
        const [bx, by] = candidates.reduce((a, c) => (c[0] < a[0] ? c : a))
        return { min: b.min, color: b.color, x: Math.min(Math.max(bx + 6, 28), W - 28), y: Math.min(Math.max(by + 14, 14), H - 14) }
      })
      .filter((c): c is NonNullable<typeof c> => c !== null)

    const baseUrl =
      `https://maps.googleapis.com/maps/api/staticmap?size=${W}x${H}&scale=2&maptype=roadmap&format=png` +
      `&center=${centerLat},${centerLng}&zoom=${zoom}` +
      `&${BASE_STYLE.map((s) => 'style=' + encodeURIComponent(s)).join('&')}&key=${API_KEY}`

    body = (
      <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', height: '100%', aspectRatio: `${W} / ${H}`, maxWidth: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img src={baseUrl} alt={`Drive-time map centered on ${DEAL.fullAddress}`} style={{ ...fill, objectFit: 'fill', display: 'block' }} />
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
              {ringPaths.map((r) => (
                <polygon key={`f-${r.min}`} points={r.points} fill={r.color} fillOpacity={0.16} stroke="none" />
              ))}
              {ringPaths.map((r) => (
                <polygon key={`s-${r.min}`} points={r.points} fill="none" stroke={r.color} strokeWidth={2} strokeOpacity={0.95} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {m.hasLabelsOverlay && (
              <img src={assetUrl('/photos/maps/drivetime-labels.png')} alt="" aria-hidden="true" style={{ ...fill, objectFit: 'fill', pointerEvents: 'none' }} />
            )}
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
              {bandChips.map((c) => (
                <g key={`chip-${c.min}`} transform={`translate(${c.x} ${c.y})`}>
                  <rect x={-23} y={-9} width={46} height={18} rx={9} fill="rgba(255,255,255,0.94)" stroke={c.color} strokeWidth={1.6} />
                  <text x={0} y={3.5} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={c.color} style={{ letterSpacing: '0.04em' }}>
                    {c.min} MIN
                  </text>
                </g>
              ))}
              <g transform={`translate(${sx} ${sy})`}>
                <ellipse cx="0" cy="1" rx="5" ry="2" fill="rgba(0,0,0,0.28)" />
                <path d="M0 0 C -5 -8 -8 -11 -8 -15 A 8 8 0 1 1 8 -15 C 8 -11 5 -8 0 0 Z" fill="#F8971D" stroke="#fff" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <circle cx="0" cy="-15" r="3.2" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>

        <div style={{ flex: '0 0 180px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
          {/* Ring legend lives beside the map — keeps the header area clean. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--linen)' }}>
            <LegendRow color="#F8971D" label="Subject property" pin />
            <LegendRow color="#229954" label="15-min drive" ring />
            <LegendRow color="#2471A3" label="30-min drive" ring />
            <LegendRow color="#7D3C98" label="45-min drive" ring />
            <LegendRow color="#C0392B" label="60-min drive" ring />
          </div>

          {m.cities.length > 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
              {m.cities.map((c) => (
                <div key={c.name} style={{ padding: '6px 10px', borderTop: '3px solid var(--golden)', textAlign: 'center' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.15 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--stone)', fontWeight: 600, marginTop: 2 }}>{c.drive}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <PageHeader section="Drive Times" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Drive Times" />
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          <strong>Road-network reach from the property.</strong> Drive-time bands at 15, 30, 45, and 60 minutes;
          city times are routed on the same engine as the bands.
        </div>

        {body}

        <div style={{ fontSize: 7.5, color: 'var(--stone)', marginTop: 6 }}>
          Drive-time bands reflect typical road-network travel times and are approximate; actual times vary with traffic and time of day.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
