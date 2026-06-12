import { useMemo } from 'react';
import { feature } from 'topojson-client';
import { geoAlbers, geoPath } from 'd3-geo';
import statesTopo from 'us-atlas/states-10m.json';

// Coastal + PA shown on the firm locations map. FIPS codes, zero-padded.
// PA included because NJ/NY have a ragged empty western edge without it.
const EAST_COAST_FIPS = new Set([
  '09', // CT
  '10', // DE
  '11', // DC
  '12', // FL
  '13', // GA
  '23', // ME
  '24', // MD
  '25', // MA
  '33', // NH
  '34', // NJ
  '36', // NY
  '37', // NC
  '42', // PA
  '44', // RI
  '45', // SC
  '50', // VT
  '51', // VA
]);

export interface MapMarker {
  key: string;
  lat: number;
  lng: number;
}

// viewBox aspect (~0.72) matches the map grid cell on the Our Locations page,
// so `preserveAspectRatio=meet` barely letterboxes. MAP_PADDING is small so
// Maine's coast hugs the viewBox top — that's the line the office list's
// border-top aligns against.
const VIEW_W = 520;
const VIEW_H = 720;
const MAP_PADDING = 4;

export default function EastCoastMap({ markers }: { markers: MapMarker[] }) {
  const { statePaths, projectedMarkers } = useMemo(() => {
    const topo = statesTopo as any;
    const all = feature(topo, topo.objects.states) as any;
    const eastCoast = {
      type: 'FeatureCollection' as const,
      features: all.features.filter((f: any) => EAST_COAST_FIPS.has(String(f.id).padStart(2, '0'))),
    };
    // Albers rotated/centered on the mid-Atlantic. fitExtent (vs fitSize) adds
    // a padding inset so the Florida tip and Maine top don't hug the edges.
    const projection = geoAlbers().rotate([76, 0]).center([0, 36]).parallels([29, 45]);
    projection.fitExtent(
      [[MAP_PADDING, MAP_PADDING], [VIEW_W - MAP_PADDING, VIEW_H - MAP_PADDING]],
      eastCoast as any,
    );
    const pathGen = geoPath(projection);
    const paths = eastCoast.features.map((f: any) => ({ id: f.id as string, d: pathGen(f) || '' }));
    const pts = markers
      .map((m) => {
        const p = projection([m.lng, m.lat]);
        return p ? { ...m, x: p[0], y: p[1] } : null;
      })
      .filter(Boolean) as Array<MapMarker & { x: number; y: number }>;
    return { statePaths: paths, projectedMarkers: pts };
  }, [markers]);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="locations__map-svg"
    >
      <g>
        {statePaths.map((p: { id: string; d: string }) => (
          <path key={p.id} d={p.d} className="locations__map-landmass" />
        ))}
      </g>
      <g>
        {projectedMarkers.map((m) => (
          <g key={m.key}>
            <circle cx={m.x} cy={m.y} r={8} className="locations__marker-halo" />
            <circle cx={m.x} cy={m.y} r={4} className="locations__marker-dot" />
          </g>
        ))}
      </g>
    </svg>
  );
}
