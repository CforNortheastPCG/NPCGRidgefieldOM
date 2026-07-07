/* ═══════════ NEIGHBORHOOD DEVELOPMENT ═══════════
   Print translation of the website's NearbyProjectsMap: a hybrid satellite
   map of the district with projects dotted by status and the subject
   parcels outlined, a stat strip, and a status-grouped project list. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { SatMap, frameFor, type MapPolygon, type MapPin } from './market/SatMap.tsx'
import { nearbyProjects, PROJECT_STATUS_META, PROJECT_STATUS_ORDER, type ProjectStatus } from '../../data/market/projects.ts'
import { SUBJECT_PARCEL_IDS } from '../../data/market/portfolio.ts'
import { PROJECTS_COPY } from '../../data/market/copy.ts'
import parcelsJson from '../../data/market/parcels.json'

const W = 560
const H = 556

// Print-friendly status swatches (the website's neon reads poorly on paper).
const STATUS_COLOR: Record<ProjectStatus, string> = {
  completed: '#1E7A52',
  construction: '#F8971D',
  proposed: '#5B6472',
}

const STAT_TILES = [
  { v: '$500M+', l: 'Private Investment, 5 Yrs' },
  { v: '1,300+', l: 'Units Delivered' },
  { v: '700+', l: 'Units Under Way / Planned' },
  { v: '23', l: 'Projects in the District' },
]

const MARQUEE = new Set([
  'alta-on-the-row', 'front-145', 'revington-soma', 'the-cove', 'table-talk-affordable', 'kelley-square-lofts', 'ac-hotel',
  'benjamin-franklin', 'lamartine-90',
  'madison-phase-2', 'madison-5', 'madison-lab', 'beacon-98', 'lamartine-39',
])

interface ParcelFeature {
  properties: { slug: string }
  geometry: { coordinates: number[][][] }
}
const FEATURES = (parcelsJson as { features: ParcelFeature[] }).features
const subjectRings: Array<[number, number]>[] = FEATURES.filter((f) => SUBJECT_PARCEL_IDS.has(f.properties.slug))
  .map((f) => f.geometry.coordinates[0])
  .filter((r): r is Array<[number, number]> => Array.isArray(r))

export function DevelopmentPipeline({ pageNum }: { pageNum?: number }) {
  const framePts: Array<[number, number]> = [...nearbyProjects.map((p) => p.coords), ...subjectRings.flat()]
  const frame = frameFor(framePts, W, H, 0.04, 17)

  const polygons: MapPolygon[] = subjectRings.map((ring) => ({ ring, fill: '#F8971D', fillOpacity: 0.6, stroke: '#7A3E00', strokeWidth: 2.5 }))
  const subj = subjectRings[0]
  // Render projects as pins (not dots) — teardrop markers stay legible on the satellite base.
  const projectPins: MapPin[] = nearbyProjects.map((p) => ({ lng: p.coords[0], lat: p.coords[1], color: STATUS_COLOR[p.status] }))
  const pins: MapPin[] = [
    ...projectPins,
    ...(subj ? [{ lng: subj.reduce((s, p) => s + p[0], 0) / subj.length, lat: subj.reduce((s, p) => s + p[1], 0) / subj.length, color: '#F8971D', label: 'P' } as MapPin] : []),
  ]

  const counts = (s: ProjectStatus) => nearbyProjects.filter((p) => p.status === s).length

  return (
    <div className="page">
      <PageHeader section="Neighborhood Development" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="A Wave of New Development" accent="Surrounds the Portfolio" />
        <div className="title-rule" />
        <div style={{ fontSize: 10.2, lineHeight: 1.45, color: 'var(--graphite)', marginBottom: 8 }}>{PROJECTS_COPY.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
          {STAT_TILES.map((t) => (
            <div key={t.l} className="stat-tile" style={{ padding: '5px 3px' }}>
              <div className="st-val" style={{ fontSize: 16 }}>{t.v}</div>
              <div className="st-label" style={{ fontSize: 7 }}>{t.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ minHeight: 0, display: 'flex' }}>
            <SatMap frame={frame} w={W} h={H} maptype="satellite" polygons={polygons} pins={pins} alt="Nearby development projects map" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 7, overflow: 'hidden' }}>
            {PROJECT_STATUS_ORDER.map((s) => {
              const items = nearbyProjects.filter((p) => p.status === s && MARQUEE.has(p.slug))
              return (
                <div key={s}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 3, marginBottom: 4, borderBottom: `2px solid ${STATUS_COLOR[s]}` }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: STATUS_COLOR[s] }} />
                    <span style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--carbon)' }}>{PROJECT_STATUS_META[s].plural}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 13.4, fontWeight: 700, color: STATUS_COLOR[s] }}>{counts(s)}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {items.map((p) => (
                      <div key={p.slug} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontSize: 13.8, fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.15 }}>{p.name}</span>
                        {p.stat && <span style={{ fontSize: 12.8, color: 'var(--stone)', whiteSpace: 'nowrap' }}>{p.stat}{p.stat2 ? ` · ${p.stat2}` : ''}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
