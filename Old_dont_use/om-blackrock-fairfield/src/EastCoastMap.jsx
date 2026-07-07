import { useMemo } from 'react'
import { feature } from 'topojson-client'
import { geoAlbers, geoPath, geoContains } from 'd3-geo'
import statesTopo from 'us-atlas/states-10m.json'

/* ═══════════════════ EAST COAST DOTTED MAP ═══════════════════
   Recreates the halftone dot-grid map from the firm's "Our Locations"
   page. States are projected with d3-geo (Albers), then a regular grid
   of dots is drawn wherever it falls inside the landmass. Office markers
   are projected from real lat/lng so they land on true geography.
*/

// Coastal states + PA shown on the map. FIPS codes, zero-padded.
const EAST_COAST_FIPS = new Set([
  '09', '10', '11', '12', '13', '23', '24', '25',
  '33', '34', '36', '37', '42', '44', '45', '50', '51',
])

const VIEW_W = 560
const VIEW_H = 760
const PAD = 8
const DOT_SPACING = 11 // px between dot-grid points
const DOT_R = 2.1

export default function EastCoastMap({ markers = [] }) {
  const { dots, projectedMarkers } = useMemo(() => {
    const topo = statesTopo
    const all = feature(topo, topo.objects.states)
    const eastCoast = {
      type: 'FeatureCollection',
      features: all.features.filter((f) => EAST_COAST_FIPS.has(String(f.id).padStart(2, '0'))),
    }

    const projection = geoAlbers().rotate([76, 0]).center([0, 36]).parallels([29, 45])
    projection.fitExtent([[PAD, PAD], [VIEW_W - PAD, VIEW_H - PAD]], eastCoast)

    // Walk a screen-space grid; keep points whose inverse projection falls
    // inside the landmass. geoContains works in lng/lat, so invert first.
    const gridDots = []
    for (let y = PAD; y <= VIEW_H - PAD; y += DOT_SPACING) {
      for (let x = PAD; x <= VIEW_W - PAD; x += DOT_SPACING) {
        const lnglat = projection.invert([x, y])
        if (lnglat && geoContains(eastCoast, lnglat)) gridDots.push({ x, y })
      }
    }

    const pts = markers
      .map((m) => {
        const p = projection([m.lng, m.lat])
        return p ? { ...m, x: p[0], y: p[1] } : null
      })
      .filter(Boolean)

    return { dots: gridDots, projectedMarkers: pts }
  }, [markers])

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="locmap-svg"
    >
      <g className="locmap-land">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={DOT_R} />
        ))}
      </g>
      <g className="locmap-markers">
        {projectedMarkers.map((m) => (
          <g key={m.key}>
            <circle cx={m.x} cy={m.y} r={9} className="locmap-halo" />
            <circle cx={m.x} cy={m.y} r={5} className="locmap-dot" />
          </g>
        ))}
      </g>
    </svg>
  )
}
