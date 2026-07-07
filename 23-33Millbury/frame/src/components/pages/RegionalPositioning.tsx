/* ═══════════ REGIONAL POSITIONING ═══════════
   Print translation of the website's Region section. A light roadmap of
   the Northeast with anchor markers, the Worcester + regional stat strip,
   travel times, and the "anchors, not bets" narrative blocks. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { SatMap, frameFor, type MapDot } from './market/SatMap.tsx'
import { ANCHORS, ANCHOR_COLOR, WORCESTER_STATS, REGIONAL_STATS, NARRATIVE_BLOCKS, DRIVE_TIMES } from '../../data/market/region.ts'
import { REGION_COPY } from '../../data/market/copy.ts'

const W = 560
const H = 452

const ROADMAP_STYLE = [
  'feature:poi|visibility:off',
  'feature:landscape|color:0xf3efe9',
  'feature:water|color:0xc4d2d8',
  'feature:road.arterial|element:geometry|color:0xffffff',
  'feature:road.highway|element:geometry.fill|color:0xF8971D',
  'feature:road.highway|element:geometry.stroke|color:0xCE7C12',
  'feature:administrative.locality|element:labels|visibility:on',
]

const GLYPH: Record<string, string | undefined> = { academic: 'A', industry: 'I', airport: '✈' }

function LegendItem({ color, label, glyph }: { color: string; label: string; glyph?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, color: 'var(--carbon)', fontWeight: 600 }}>
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{glyph}</span>
      {label}
    </span>
  )
}

export function RegionalPositioning({ pageNum }: { pageNum?: number }) {
  const frame = frameFor(ANCHORS.map((a) => a.coords), W, H, 0.07, 9)
  const dots: MapDot[] = ANCHORS.map((a) => ({
    lng: a.coords[0],
    lat: a.coords[1],
    color: ANCHOR_COLOR[a.type],
    r: a.type === 'subject' ? 7 : a.type === 'city' ? 3 : 5,
    glyph: GLYPH[a.type],
  }))
  const stats = [...WORCESTER_STATS, ...REGIONAL_STATS]
  const travel = DRIVE_TIMES.slice(0, 6)

  return (
    <div className="page">
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="At the Heart of" accent="New England" />
        <div className="title-rule" />
        <div style={{ fontSize: 11.4, lineHeight: 1.45, color: 'var(--graphite)', marginBottom: 8 }}>{REGION_COPY.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 5 }}>
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <SatMap frame={frame} w={W} h={H} maptype="roadmap" styleParams={ROADMAP_STYLE} dots={dots} alt="Northeast regional context map" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', flexShrink: 0 }}>
              <LegendItem color={ANCHOR_COLOR.subject} label="Worcester" />
              <LegendItem color={ANCHOR_COLOR.city} label="Major cities" />
              <LegendItem color={ANCHOR_COLOR.academic} label="Academic" glyph="A" />
              <LegendItem color={ANCHOR_COLOR.industry} label="Industry" glyph="I" />
              <LegendItem color={ANCHOR_COLOR.airport} label="Airports" glyph="✈" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 7 }}>
              {stats.map((s) => (
                <div key={s.label} className="stat-tile" style={{ padding: '4px 3px' }}>
                  <div className="st-val" style={{ fontSize: 16 }}>{s.value}</div>
                  <div className="st-label" style={{ fontSize: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>
                Travel Times from Worcester
              </div>
              {travel.map((c) => (
                <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2px 0' }}>
                  <span style={{ fontSize: 11.6, fontWeight: 600, color: 'var(--carbon)' }}>{c.name}</span>
                  <span style={{ fontSize: 11.4, color: 'var(--stone)' }}>
                    <span style={{ fontWeight: 800, color: 'var(--golden)' }}>{c.drive}</span> car{c.train ? ` · ${c.train} rail` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flexShrink: 0, marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
          {NARRATIVE_BLOCKS.map((b) => (
            <div key={b.title}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{b.title}</div>
              <div style={{ fontSize: 9.2, lineHeight: 1.38, color: 'var(--graphite)' }}>{b.body}</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
