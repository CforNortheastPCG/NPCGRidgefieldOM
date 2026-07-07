/* ═══════════ SHARED STATIC SATELLITE MAP ═══════════
   Prints the website's interactive MapLibre maps as fixed images: a Google
   Static Maps base (auto-framed to fit its points) with an SVG overlay of
   parcel polygons, category dots, and pin markers — all sharing one
   Web-Mercator frame so the overlay stays registered (the DriveTimeMap
   technique). Static Maps caps `size` at 640; scale=2 doubles the DPI. */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

export interface LngLat {
  lng: number
  lat: number
}
export interface MapPolygon {
  ring: Array<[number, number]> // [lng, lat] pairs
  fill: string
  stroke: string
  fillOpacity?: number
  strokeWidth?: number
  label?: string | number
  labelColor?: string
}
export interface MapDot {
  lng: number
  lat: number
  color: string
  r?: number
  glyph?: string
}
export interface MapPin {
  lng: number
  lat: number
  color: string
  label?: string
}

interface Frame {
  centerLat: number
  centerLng: number
  zoom: number
}

const mercX = (lng: number) => (lng + 180) / 360
const mercY = (lat: number) => (1 - Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / Math.PI) / 2
const invMercY = (yy: number) => (2 * Math.atan(Math.exp((1 - 2 * yy) * Math.PI)) - Math.PI / 2) * (180 / Math.PI)

/** Largest integer zoom that fits every point in w×h with a padding margin. */
export function frameFor(points: Array<[number, number]>, w: number, h: number, padFrac = 0.12, maxZoom = 18): Frame {
  const lngs = points.map((p) => p[0])
  const lats = points.map((p) => p[1])
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const centerLng = (minLng + maxLng) / 2
  const centerLat = invMercY((mercY(minLat) + mercY(maxLat)) / 2)
  const dx = mercX(maxLng) - mercX(minLng) || 1e-6
  const dy = mercY(minLat) - mercY(maxLat) || 1e-6 // minLat has the larger mercY
  const fitW = w * (1 - 2 * padFrac)
  const fitH = h * (1 - 2 * padFrac)
  let zoom = 3
  for (let z = maxZoom; z >= 3; z--) {
    const world = 256 * 2 ** z
    if (dx * world <= fitW && dy * world <= fitH) {
      zoom = z
      break
    }
  }
  return { centerLat, centerLng, zoom }
}

export function SatMap({
  frame,
  w,
  h,
  maptype = 'hybrid',
  styleParams,
  polygons = [],
  dots = [],
  pins = [],
  alt = 'Map',
}: {
  frame: Frame
  w: number
  h: number
  maptype?: 'hybrid' | 'satellite' | 'roadmap'
  styleParams?: string[]
  polygons?: MapPolygon[]
  dots?: MapDot[]
  pins?: MapPin[]
  alt?: string
}) {
  const { centerLat, centerLng, zoom } = frame
  const world = 256 * 2 ** zoom
  const cx = mercX(centerLng) * world
  const cy = mercY(centerLat) * world
  const toPx = (lat: number, lng: number): [number, number] => [mercX(lng) * world - cx + w / 2, mercY(lat) * world - cy + h / 2]

  if (!API_KEY) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
        Set VITE_GOOGLE_MAPS_API_KEY to render the map.
      </div>
    )
  }

  const baseUrl =
    `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=${zoom}` +
    `&size=${w}x${h}&scale=2&maptype=${maptype}&format=png` +
    (styleParams && styleParams.length ? `&${styleParams.map((s) => 'style=' + encodeURIComponent(s)).join('&')}` : '') +
    `&key=${API_KEY}`

  const centroid = (ring: Array<[number, number]>): [number, number] => {
    const n = ring.length
    let sx = 0
    let sy = 0
    for (const [lng, lat] of ring) {
      const [x, y] = toPx(lat, lng)
      sx += x
      sy += y
    }
    return [sx / n, sy / n]
  }

  const fill: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

  return (
    <div style={{ position: 'relative', height: '100%', aspectRatio: `${w} / ${h}`, maxWidth: '100%', margin: '0 auto', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <img src={baseUrl} alt={alt} style={{ ...fill, objectFit: 'fill', display: 'block' }} />
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ ...fill, pointerEvents: 'none' }}>
        {polygons.map((p, i) => {
          const pts = p.ring.map(([lng, lat]) => toPx(lat, lng).map((v) => v.toFixed(1)).join(',')).join(' ')
          return (
            <g key={`poly-${i}`}>
              <polygon points={pts} fill={p.fill} fillOpacity={p.fillOpacity ?? 0.5} stroke={p.stroke} strokeWidth={p.strokeWidth ?? 2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>
          )
        })}
        {polygons.map((p, i) => {
          if (p.label == null) return null
          const [lx, ly] = centroid(p.ring)
          return (
            <g key={`polylabel-${i}`} transform={`translate(${lx} ${ly})`}>
              <circle r={8} fill="#fff" stroke={p.stroke} strokeWidth={1.4} />
              <text x={0} y={2.8} textAnchor="middle" fontSize={9} fontWeight={800} fill={p.labelColor ?? p.stroke}>
                {p.label}
              </text>
            </g>
          )
        })}
        {dots.map((d, i) => {
          const [x, y] = toPx(d.lat, d.lng)
          return (
            <g key={`dot-${i}`} transform={`translate(${x} ${y})`}>
              <circle r={d.r ?? 4.5} fill={d.color} stroke="#fff" strokeWidth={1.4} />
              {d.glyph && (
                <text x={0} y={2.6} textAnchor="middle" fontSize={7} fontWeight={700} fill="#fff">
                  {d.glyph}
                </text>
              )}
            </g>
          )
        })}
        {pins.map((p, i) => {
          const [x, y] = toPx(p.lat, p.lng)
          return (
            <g key={`pin-${i}`} transform={`translate(${x} ${y})`}>
              <ellipse cx="0" cy="1" rx="5" ry="2" fill="rgba(0,0,0,0.28)" />
              <path d="M0 0 C -5 -8 -8 -11 -8 -15 A 8 8 0 1 1 8 -15 C 8 -11 5 -8 0 0 Z" fill={p.color} stroke="#fff" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {p.label ? (
                <text x={0} y={-11.5} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff">
                  {p.label}
                </text>
              ) : (
                <circle cx={0} cy={-15} r={3.2} fill="#fff" />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
