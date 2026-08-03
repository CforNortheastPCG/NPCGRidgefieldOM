import { fmtMoneyShort } from '../lib/fmt.js'

/* ═══════════════════ VOLUME BY YEAR ═══════════════════
   Hand-rolled inline SVG — deliberately no chart library.

   · Chart.js draws to <canvas>, which would drop a bitmap into an otherwise
     fully-vector page.
   · Recharts/nivo/visx measure via ResizeObserver AFTER mount and animate bars
     in on a timer. print-vector.cjs waits on fonts + image decode + 2 RAFs +
     settle — enough for images, no guarantee against an animating chart. The
     failure mode is a half-drawn chart, intermittently, in the delivered PDF.
   · The repo has no chart dependency anywhere; Charts.jsx hand-rolls its donut
     with strokeDasharray math. Ten bars is forty lines.

   Fixed viewBox, no responsive measurement, flat fills only — no filter, no
   gradient, no blend. Skia turns those into soft-mask groups that Acrobat and
   Preview composite as pink or black boxes. page.pdf() emits this as true
   vector paths that stay crisp at any zoom. */

const W = 700, H = 400
const X0 = 44, X1 = 690      // plot area
const Y0 = 14, BASE = 364    // top of plot, baseline
const PLOT_H = BASE - Y0     // 350

export default function VolumeChart({ byYear, axisMax, partialYear }) {
  const slot = (X1 - X0) / byYear.length
  const barW = Math.min(42, slot - 20)

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* gridlines at 25/50/75/100% of the axis */}
      {[0.25, 0.5, 0.75, 1].map(f => {
        const y = BASE - f * PLOT_H
        return (
          <g key={f}>
            <line x1={X0} y1={y} x2={X1} y2={y} stroke="var(--border)" strokeWidth="1" />
            <text x={X0 - 6} y={y + 2.5} textAnchor="end"
              style={{ fontSize: 7.4, fontWeight: 700, fill: 'var(--stone)' }}>
              {fmtMoneyShort(axisMax * f)}
            </text>
          </g>
        )
      })}

      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke="var(--carbon)" strokeWidth="1.5" />

      {byYear.map((y, i) => {
        const h = axisMax ? (y.volume / axisMax) * PLOT_H : 0
        const x = X0 + i * slot + (slot - barW) / 2
        const partial = y.year === partialYear
        return (
          <g key={y.year}>
            <rect x={x} y={BASE - h} width={barW} height={h}
              fill="var(--golden)" opacity={partial ? 0.55 : 1} />
            <text x={x + barW / 2} y={BASE - h - 6} textAnchor="middle"
              style={{ fontSize: 8.4, fontWeight: 800, fill: 'var(--carbon)' }}>
              {fmtMoneyShort(y.volume)}
            </text>
            {/* deal count sits inside the bar top where there's room for it */}
            {h > 26 && (
              <text x={x + barW / 2} y={BASE - h + 14} textAnchor="middle"
                style={{ fontSize: 8, fontWeight: 800, fill: '#fff' }}>
                {y.count}
              </text>
            )}
            <text x={x + barW / 2} y={BASE + 15} textAnchor="middle"
              style={{ fontSize: 8.6, fontWeight: 700, fill: 'var(--stone)' }}>
              {partial ? `${y.year} YTD` : y.year}
            </text>
          </g>
        )
      })}

      <text x={X0} y={H - 4} style={{ fontSize: 7.4, fontWeight: 600, fill: 'var(--stone)' }}>
        Bar height = closed volume · number inside each bar = transactions closed that year
      </text>
    </svg>
  )
}
