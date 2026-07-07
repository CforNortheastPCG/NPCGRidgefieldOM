/* ═══════════ LOCATION & AMENITIES ═══════════
   Modeled on the om-hysil LocationMap: a satellite map with numbered pins
   colored by category, keyed to a right-hand directory grouped by category
   (colored headings, item numbers matching the pins), and a subject-property
   header row. Numbers run 1..N across the directory in reading order. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { SatMap, frameFor, type MapPolygon, type MapPin } from './market/SatMap.tsx'
import { amenities, AMENITY_CATEGORIES, type AmenityCategory } from '../../data/market/amenities.ts'
import { SUBJECT_PARCEL_IDS } from '../../data/market/portfolio.ts'
import { DEAL } from '../../data/deal.ts'
import parcelsJson from '../../data/market/parcels.json'

const W = 604
const H = 560

// Curated anchor directory — the marquee names in each category, numbered to
// the map pins. Slugs resolve against amenities.ts (name + coords + stat).
const DIRECTORY: { category: AmenityCategory; heading: string; slugs: string[] }[] = [
  { category: 'employer', heading: 'Major Employers', slugs: ['umass-memorial', 'saint-vincent', 'hanover-insurance', 'abbvie'] },
  { category: 'education', heading: 'Academic Anchors', slugs: ['wpi', 'holy-cross', 'clark-university', 'quinsigamond-cc'] },
  { category: 'culture', heading: 'Culture & Entertainment', slugs: ['polar-park', 'dcu-center', 'hanover-theatre', 'worcester-public-market'] },
  { category: 'dining', heading: 'Dining & Drinks', slugs: ['lock-50', 'birchtree-bread', 'armsby-abbey'] },
  { category: 'transit', heading: 'Transit & Highways', slugs: ['union-station', 'wrta-central-hub', 'i290-kelley-ramp'] },
  { category: 'attraction', heading: 'Parks & Attractions', slugs: ['worcester-common', 'elm-park'] },
]

interface ParcelFeature {
  properties: { slug: string }
  geometry: { coordinates: number[][][] }
}
const FEATURES = (parcelsJson as { features: ParcelFeature[] }).features
const subjectRings: Array<[number, number]>[] = FEATURES.filter((f) => SUBJECT_PARCEL_IDS.has(f.properties.slug))
  .map((f) => f.geometry.coordinates[0])
  .filter((r): r is Array<[number, number]> => Array.isArray(r))

const bySlug = new Map(amenities.map((a) => [a.slug, a]))

interface DirItem { n: number; name: string; note?: string; coords: [number, number]; color: string }
interface DirGroup { heading: string; color: string; items: DirItem[] }

let counter = 0
const GROUPS: DirGroup[] = DIRECTORY.map((g) => {
  const color = AMENITY_CATEGORIES[g.category].color
  return {
    heading: g.heading,
    color,
    items: g.slugs
      .map((slug) => bySlug.get(slug))
      .filter((a): a is (typeof amenities)[number] => !!a)
      .map((a) => ({ n: ++counter, name: a.name, note: a.stat, coords: a.coords, color })),
  }
})
const ALL_ITEMS: DirItem[] = GROUPS.flatMap((g) => g.items)

export function LocationAmenitiesMap({ pageNum }: { pageNum?: number }) {
  const subj = subjectRings[0]
  const subjCentroid: [number, number] | null = subj
    ? [subj.reduce((s, p) => s + p[0], 0) / subj.length, subj.reduce((s, p) => s + p[1], 0) / subj.length]
    : null

  // Fit once to learn the zoom, then nudge overlapping pins apart (a spiral
  // offset ~22px wide in map degrees) so the dense downtown cluster stays
  // legible. The subject P is seeded first so pins spread away from it.
  const rawPts = ALL_ITEMS.map((it) => it.coords)
  const zoom0 = frameFor([...rawPts, ...subjectRings.flat()], W, H, 0.08, 15).zoom
  const minDeg = (22 * 360) / (256 * 2 ** zoom0)
  const placed: Array<[number, number]> = subjCentroid ? [subjCentroid] : []
  const near = (a: [number, number], b: [number, number]) => {
    const dLat = a[1] - b[1]
    const dLng = (a[0] - b[0]) * Math.cos((a[1] * Math.PI) / 180)
    return Math.hypot(dLat, dLng) < minDeg
  }
  const spread: Array<[number, number]> = rawPts.map((p) => {
    let lng = p[0]
    let lat = p[1]
    let tries = 0
    while (placed.some((q) => near([lng, lat], q)) && tries < 24) {
      const ang = (tries * 137.5 * Math.PI) / 180
      const r = minDeg * (1 + tries * 0.5)
      lng = p[0] + (Math.cos(ang) * r) / Math.cos((p[1] * Math.PI) / 180)
      lat = p[1] + Math.sin(ang) * r
      tries++
    }
    placed.push([lng, lat])
    return [lng, lat]
  })

  const framePts: Array<[number, number]> = [...spread, ...subjectRings.flat()]
  const frame = frameFor(framePts, W, H, 0.08, 15)

  const polygons: MapPolygon[] = subjectRings.map((ring) => ({ ring, fill: '#F8971D', fillOpacity: 0.55, stroke: '#7A3E00', strokeWidth: 2.5 }))
  const pins: MapPin[] = [
    ...spread.map((c, i) => ({ lng: c[0], lat: c[1], color: ALL_ITEMS[i]!.color, label: String(ALL_ITEMS[i]!.n) })),
    ...(subjCentroid ? [{ lng: subjCentroid[0], lat: subjCentroid[1], color: '#F8971D', label: 'P' } as MapPin] : []),
  ]

  return (
    <div className="page">
      <PageHeader section="Location & Amenities" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Location &" accent="Amenities" />
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, flex: 1, minHeight: 0, marginTop: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 4 }}>
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <SatMap frame={frame} w={W} h={H} maptype="satellite" polygons={polygons} pins={pins} alt="Worcester-area anchors near the portfolio" />
            </div>
            <div style={{ flexShrink: 0, fontSize: 7.5, color: 'var(--stone)', fontStyle: 'italic' }}>Pin locations are approximate.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, marginBottom: 8, borderBottom: '2px solid var(--golden)' }}>
              <span style={{ flexShrink: 0, width: 17, height: 17, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', lineHeight: 1 }}>P</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--carbon)' }}>Subject Property — {DEAL.address}</span>
            </div>
            <div style={{ columns: 2, columnGap: 18, flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {GROUPS.map((g) => (
                <div key={g.heading} style={{ breakInside: 'avoid', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ flexShrink: 0, width: 9, height: 9, borderRadius: '50%', background: g.color, border: '1px solid rgba(0,0,0,0.15)' }} />
                    <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: g.color }}>{g.heading}</span>
                  </div>
                  {g.items.map((it) => (
                    <div key={it.n} style={{ display: 'flex', alignItems: 'baseline', gap: 7, padding: '1.5px 0' }}>
                      <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 800, color: it.color, width: 14, textAlign: 'right' }}>{it.n}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.2 }}>{it.name}</div>
                        {it.note && <div style={{ fontSize: 10, color: 'var(--stone)', lineHeight: 1.2 }}>{it.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
