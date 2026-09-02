import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle } from '../Blocks.tsx'
import { FLYWHEEL } from '../../data/advisory.ts'

/* ═══════════════════ THE STRATEGIC ADVISORY FLYWHEEL ═══════════════════
   Six stages of an ongoing advisory relationship around a hub, drawn as an
   SVG ring at a fixed pixel size (no stretching — the labels are HTML laid
   over each segment's centroid, so glyphs are never distorted). Fills are
   brand tokens at constant alpha: no gradients, nothing that becomes a PDF
   soft mask. The right column carries each stage's body and tagline.
   Copy: src/data/advisory.js. */

const SIZE = 440
const C = SIZE / 2
const R_OUT = 216
const R_IN = 100
const R_LABEL = 158
const N = FLYWHEEL.stages.length
const SEG = (2 * Math.PI) / N
const START = -Math.PI / 2 - SEG / 2       // first segment centred at 12 o'clock

const pt = (r: number, a: number): [number, number] => [C + r * Math.cos(a), C + r * Math.sin(a)]

function sectorPath(i: number) {
  const a0 = START + i * SEG
  const a1 = a0 + SEG
  const [x0, y0] = pt(R_OUT, a0)
  const [x1, y1] = pt(R_OUT, a1)
  const [x2, y2] = pt(R_IN, a1)
  const [x3, y3] = pt(R_IN, a0)
  return `M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3} Z`
}

// Segment fills clockwise from the top, with the ink that reads on each.
const FILLS = [
  { fill: 'var(--terracotta)', opacity: 0.42, ink: 'var(--carbon)' },
  { fill: 'var(--golden)',     opacity: 1,    ink: 'var(--white)' },
  { fill: 'var(--golden)',     opacity: 0.5,  ink: 'var(--carbon)' },
  { fill: 'var(--carbon)',     opacity: 0.72, ink: 'var(--white)' },
  { fill: 'var(--stone)',      opacity: 0.6,  ink: 'var(--carbon)' },
  { fill: 'var(--terracotta)', opacity: 1,    ink: 'var(--white)' },
] as const

export default function FlywheelPage({ pageNum }: { pageNum?: number }) {
  const { subtitle, hub, stages } = FLYWHEEL
  return (
    <div className="page">
      <PageHeader section="Beyond the Sale" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="The Strategic Advisory" accent="Flywheel" subtitle={subtitle} />

        <div style={{ display: 'grid', gridTemplateColumns: `${SIZE}px 1fr`, gap: 30, flex: 1, minHeight: 0, marginTop: 4 }}>

          {/* ── the wheel ── */}
          <div style={{ position: 'relative', width: SIZE, height: SIZE, flex: '0 0 auto', alignSelf: 'center' }}>
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true">
              {stages.map((s, i) => (
                <path
                  key={s.title}
                  d={sectorPath(i)}
                  style={{ fill: (FILLS[i % FILLS.length] ?? FILLS[0]).fill, fillOpacity: (FILLS[i % FILLS.length] ?? FILLS[0]).opacity, stroke: 'var(--white)', strokeWidth: 3 }}
                />
              ))}
              <circle cx={C} cy={C} r={R_IN - 6} style={{ fill: 'var(--carbon)' }} />
            </svg>

            {stages.map((s, i) => {
              const [x, y] = pt(R_LABEL, START + (i + 0.5) * SEG)
              return (
                <div key={s.title} style={{ position: 'absolute', left: x - 60, top: y - 26, width: 120, textAlign: 'center', color: (FILLS[i % FILLS.length] ?? FILLS[0]).ink }}>
                  <div style={{ fontSize: 11, fontWeight: 800, lineHeight: 1 }}>{i + 1}</div>
                  <div style={{ fontSize: 8.4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3, marginTop: 3 }}>{s.title}</div>
                </div>
              )
            })}

            <div style={{
              position: 'absolute', left: C - 75, top: C - 75, width: 150, height: 150,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', color: 'var(--white)',
            }}>
              <div style={{ fontSize: 9.2, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--golden)', lineHeight: 1.25, marginBottom: 5 }}>{hub.title}</div>
              <div style={{ fontSize: 7.2, lineHeight: 1.4, fontWeight: 600 }}>{hub.body}</div>
            </div>
          </div>

          {/* ── the stages, in wheel order ── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, minHeight: 0 }}>
            {stages.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', borderTop: i ? '1px solid var(--border)' : '2px solid var(--golden)', paddingTop: 8 }}>
                <span style={{ flex: '0 0 auto', width: 14, color: 'var(--golden)', fontSize: 12, fontWeight: 800, lineHeight: 1.2 }}>{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.25 }}>{s.title}</div>
                  <div style={{ fontSize: 8.7, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 2 }}>{s.body}</div>
                  <div style={{ fontSize: 8.3, lineHeight: 1.4, color: 'var(--terracotta)', fontWeight: 700, marginTop: 3 }}>{s.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
