/* ═══════════ THE CANAL DISTRICT ═══════════
   Print translation of the website's Canal District / opportunity story:
   the neighborhood narrative and a submarket callout beside a tight Kelley
   Square aerial (the subject parcels highlighted), with three pillars. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { SatMap, frameFor, type MapPolygon, type MapPin } from './market/SatMap.tsx'
import { portfolioProperties, SUBJECT_PARCEL_IDS } from '../../data/market/portfolio.ts'
import { CANAL_COPY } from '../../data/market/copy.ts'
import parcelsJson from '../../data/market/parcels.json'

const W = 470
const H = 548

interface ParcelFeature {
  properties: { slug: string }
  geometry: { coordinates: number[][][] }
}
const FEATURES = (parcelsJson as { features: ParcelFeature[] }).features
const subjectRings: Array<[number, number]>[] = FEATURES.filter((f) => SUBJECT_PARCEL_IDS.has(f.properties.slug))
  .map((f) => f.geometry.coordinates[0])
  .filter((r): r is Array<[number, number]> => Array.isArray(r))

// Frame to the subject parcels plus Kelley Square so the "front door" reads.
const kelley = portfolioProperties.find((p) => p.id === 'kelley-1')
const framePts: Array<[number, number]> = [...subjectRings.flat(), ...(kelley ? [kelley.coords] : [])]

export function CanalDistrict({ pageNum }: { pageNum?: number }) {
  const c = CANAL_COPY
  const frame = frameFor(framePts, W, H, 0.28, 17)
  const polygons: MapPolygon[] = subjectRings.map((ring) => ({ ring, fill: '#F8971D', fillOpacity: 0.6, stroke: '#7A3E00', strokeWidth: 2.5 }))
  const subj = subjectRings[0]
  const pins: MapPin[] = subj
    ? [{ lng: subj.reduce((s, p) => s + p[0], 0) / subj.length, lat: subj.reduce((s, p) => s + p[1], 0) / subj.length, color: '#F8971D', label: 'P' }]
    : []

  return (
    <div className="page">
      <PageHeader section="The Canal District" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="The Most-Watched Neighborhood in" accent="Central Massachusetts" />
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.12fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, justifyContent: 'space-between', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 11.5, lineHeight: 1.62, color: 'var(--graphite)' }}>
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div style={{ background: 'var(--carbon)', color: '#fff', padding: '14px 16px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--golden)', lineHeight: 1.2, marginBottom: 7 }}>{c.statHead}</div>
              <div style={{ fontSize: 10, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>{c.statBody}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 4 }}>
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <SatMap frame={frame} w={W} h={H} maptype="hybrid" polygons={polygons} pins={pins} alt="Kelley Square aerial with subject parcels" />
            </div>
            <div style={{ fontSize: 7.4, color: 'var(--stone)', fontStyle: 'italic', flexShrink: 0 }}>
              Kelley Square — the subject parcels (P) at the convergence of Millbury, Water, and Harding.
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flexShrink: 0, marginTop: 12, paddingTop: 11, borderTop: '1px solid var(--border)' }}>
          {c.pillars.map((p) => (
            <div key={p.title} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
              <div style={{ fontSize: 10.6, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 8.8, lineHeight: 1.42, color: 'var(--graphite)' }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
