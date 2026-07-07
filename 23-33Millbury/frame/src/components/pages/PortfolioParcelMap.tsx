/* ═══════════ PORTFOLIO PARCEL MAP ═══════════
   Print translation of the website's interactive PortfolioMap: a hybrid
   satellite base with all fifteen parcel polygons outlined and collapsed
   into ten offering packages, the subject offering (23-33 Millbury)
   highlighted, numbered to a facing package list, and the availability
   note beneath. Grouped parcels (Kelley Square, Water Street, Lamartine)
   share one package number; every ungrouped parcel is its own package. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { SatMap, frameFor, type MapPolygon } from './market/SatMap.tsx'
import { portfolioProperties, USE_LABEL, SUBJECT_PARCEL_IDS, type PortfolioProperty } from '../../data/market/portfolio.ts'
import { PORTFOLIO_COPY } from '../../data/market/copy.ts'
import parcelsJson from '../../data/market/parcels.json'

const ORANGE = '#F8971D'
const SUBJECT_STROKE = '#7A3E00'

interface ParcelFeature {
  properties: { slug: string }
  geometry: { coordinates: number[][][] }
}

const FEATURES = (parcelsJson as { features: ParcelFeature[] }).features
const ringById = new Map<string, Array<[number, number]>>()
for (const f of FEATURES) {
  const ring = f.geometry.coordinates[0]
  if (ring) ringById.set(f.properties.slug, ring as Array<[number, number]>)
}

// Collapse the fifteen parcels into ten offering packages (1..10), grouped
// parcels sharing one number. List and map numbering follow this order.
interface Package {
  key: string
  n: number
  title: string
  subtitle: string
  subject: boolean
  members: PortfolioProperty[]
}
const pkgOrder: string[] = []
const pkgMembers = new Map<string, PortfolioProperty[]>()
for (const p of portfolioProperties) {
  const key = p.groupId ?? p.id
  if (!pkgMembers.has(key)) {
    pkgMembers.set(key, [])
    pkgOrder.push(key)
  }
  pkgMembers.get(key)!.push(p)
}
const packages: Package[] = pkgOrder.map((key, i) => {
  const members = pkgMembers.get(key)!
  const anchor = members.find((m) => m.name) ?? members[0]!
  const grouped = members.length > 1
  return {
    key,
    n: i + 1,
    title: grouped ? anchor.name ?? anchor.address : anchor.address,
    subtitle: grouped ? `${members.length}-parcel package` : anchor.useLabelOverride ?? USE_LABEL[anchor.currentUse],
    subject: members.some((m) => SUBJECT_PARCEL_IDS.has(m.id)),
    members,
  }
})
const pkgNoById = new Map<string, number>()
for (const pk of packages) for (const m of pk.members) pkgNoById.set(m.id, pk.n)

const allPoints: Array<[number, number]> = portfolioProperties.flatMap((p) => ringById.get(p.id) ?? [])

const W = 596
const H = 636

export function PortfolioParcelMap({ pageNum }: { pageNum?: number }) {
  const frame = frameFor(allPoints, W, H, 0.06, 18)

  const polygons: MapPolygon[] = portfolioProperties
    .map((p) => ({ p, ring: ringById.get(p.id) }))
    .filter((x) => x.ring)
    .map((x) => {
      const subject = SUBJECT_PARCEL_IDS.has(x.p.id)
      return {
        ring: x.ring!,
        fill: ORANGE,
        fillOpacity: subject ? 0.72 : 0.28,
        stroke: subject ? SUBJECT_STROKE : ORANGE,
        strokeWidth: subject ? 3 : 1.6,
        label: pkgNoById.get(x.p.id),
        labelColor: subject ? SUBJECT_STROKE : '#B45309',
      }
    })

  const Row = ({ pk }: { pk: Package }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, padding: '1.5px 0', breakInside: 'avoid' }}>
      <span
        style={{
          flexShrink: 0,
          width: 15,
          height: 15,
          borderRadius: '50%',
          background: pk.subject ? ORANGE : '#fff',
          border: `1.5px solid ${pk.subject ? SUBJECT_STROKE : ORANGE}`,
          color: pk.subject ? '#fff' : '#B45309',
          fontSize: 12.5,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        {pk.n}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 13.8, fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.2 }}>{pk.title}</span>
          {pk.subject && (
            <span style={{ fontSize: 10.6, fontWeight: 800, letterSpacing: '0.08em', color: '#fff', background: ORANGE, borderRadius: 2, padding: '0.5px 4px' }}>SUBJECT</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--stone)', lineHeight: 1.2 }}>{pk.subtitle}</div>
      </div>
    </div>
  )

  return (
    <div className="page">
      <PageHeader section="The Portfolio" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Also Available Alongside the" accent="Kelley Square Portfolio" />
        <div className="title-rule" />
        <div style={{ fontSize: 12.4, lineHeight: 1.45, color: 'var(--graphite)', marginBottom: 8 }}>{PORTFOLIO_COPY.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 4 }}>
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <SatMap frame={frame} w={W} h={H} maptype="hybrid" polygons={polygons} alt="Kelley Square Portfolio parcel map" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 14, paddingBottom: 6, marginBottom: 6, borderBottom: '2px solid var(--golden)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.4, fontWeight: 700, color: 'var(--carbon)' }}>
                <span style={{ width: 11, height: 11, borderRadius: 2, background: ORANGE, border: `1.5px solid ${SUBJECT_STROKE}` }} /> Subject offering
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.4, fontWeight: 700, color: 'var(--carbon)' }}>
                <span style={{ width: 11, height: 11, borderRadius: 2, background: 'rgba(248,151,29,0.28)', border: `1.5px solid ${ORANGE}` }} /> Portfolio parcel
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }}>
              {packages.map((pk) => (
                <Row key={pk.key} pk={pk} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 10.4, lineHeight: 1.4, color: 'var(--graphite)', fontStyle: 'italic', marginTop: 8, paddingTop: 7, borderTop: '1px solid var(--border)' }}>
          {PORTFOLIO_COPY.availability}{' '}
          <span style={{ fontStyle: 'normal', fontWeight: 800, color: 'var(--golden)' }}>Explore the full portfolio at kelleysquareportfolio.com.</span>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
