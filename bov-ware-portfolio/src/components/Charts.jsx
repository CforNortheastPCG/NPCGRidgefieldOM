/* ═══════════════════ CHART KIT ═══════════════════
   Pure inline SVG — no chart library, and deliberately no `filter`,
   `box-shadow` or blend modes: those have no PDF primitive and Skia
   rasterizes them into soft masks that Preview renders as pink or black
   boxes (PDF-ARTIFACTS.md). Colors come from the :root tokens.

   These exist so the financial pages can SHOW a number instead of asking
   the reader to derive it from a table. Every chart takes already-computed
   values from lib/calc.js — none of them do arithmetic. */

const CARBON = 'var(--carbon)'
const GOLDEN = 'var(--golden)'
const TERRA = 'var(--terracotta)'
const STONE = 'var(--stone)'
const TRACK = '#ece7e1'

/* ── DONUT ── composition at a glance (unit mix, expense split). ── */
export function DonutChart({ data, size = 88, thickness = 16, centerLabel, centerSub, centerFont = 21 }) {
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TRACK} strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.value / total) * C
          const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * C, 0)
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color}
              strokeWidth={thickness} strokeDasharray={`${len + 0.8} ${C - len}`} strokeDashoffset={-offset} />
          )
        })}
      </g>
      {centerLabel && (
        <text x="50%" y={centerSub ? '46%' : '50%'} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: centerFont, fontWeight: 800, fill: CARBON }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="64%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 6.6, fontWeight: 700, letterSpacing: '0.1em', fill: STONE }}>{centerSub}</text>
      )}
    </svg>
  )
}

export function ChartCard({ title, data, centerLabel, centerSub, centerFont, fmt = v => v, note }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {title && (
        <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{title}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} centerFont={centerFont} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-note)' }}>
              <span style={{ width: 8, height: 8, background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: CARBON, fontWeight: 600, minWidth: 0 }}>{d.label}</span>
              <span style={{ color: STONE, fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(d.value)} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
      {note && <div style={{ fontSize: 'var(--fs-note)', color: STONE, marginTop: 6 }}>{note}</div>}
    </div>
  )
}

/* ── PAIRED BARS ── in-place vs pro forma, per category. The mark-to-market
      gap is the whole argument of a value-add BOV; this is it as a picture.
      rows: [{ label, a, b, sub }] — a = in-place, b = pro forma. ── */
export function PairedBars({ rows, fmt = v => v, aLabel = 'In-Place', bLabel = 'Pro Forma', barH = 8, gap = 3, rowGap = 9, labelW = 86, valueW = 46 }) {
  const max = Math.max(...rows.flatMap(r => [r.a, r.b])) || 1
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 7, fontSize: 'var(--fs-note)', fontWeight: 700, color: STONE, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 8, background: CARBON }} />{aLabel}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 9, height: 8, background: GOLDEN }} />{bLabel}
        </span>
      </div>
      {/* Rows stay at a constant pitch. Spreading them to fill a tall slot
          made one chart read as several — leftover height belongs to the
          page, not between two bars. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: rowGap }}>
        {rows.map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: labelW, flexShrink: 0, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--fs-note)', fontWeight: 700, color: CARBON, lineHeight: 1.2 }}>{r.label}</div>
              {r.sub && <div style={{ fontSize: 6.6, color: STONE, fontWeight: 600 }}>{r.sub}</div>}
            </div>
            {/* The bar track stops short of the row end so the value label
                always has room — a full-width bar otherwise pushes its own
                label out of the column and into whatever sits beside it. */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: gap }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ height: barH, width: `${(r.a / max) * 100}%`, background: CARBON }} />
                </div>
                <span style={{ width: valueW, flexShrink: 0, fontSize: 'var(--fs-note)', color: CARBON, fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(r.a)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ height: barH, width: `${(r.b / max) * 100}%`, background: GOLDEN }} />
                </div>
                <span style={{ width: valueW, flexShrink: 0, fontSize: 'var(--fs-note)', color: GOLDEN, fontWeight: 800, whiteSpace: 'nowrap' }}>{fmt(r.b)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── RANGE BAR ── a value range with the recommendation marked inside it.
      Shows at a glance that the ask sits INSIDE a defensible band rather
      than being a number pulled from the air.

      Built in HTML, not SVG, on purpose: a full-width SVG needs
      preserveAspectRatio="none" to stretch its track, and that scales any
      text inside it horizontally into distortion. HTML text never stretches. ── */
export function RangeBar({ low, high, mark, fmt = v => v, lowLabel = 'Low', highLabel = 'High', markLabel = 'Ask', height = 54 }) {
  const span = high - low || 1
  const pct = Math.min(100, Math.max(0, ((mark - low) / span) * 100))
  // Keep the marker's label inside the box at the extremes.
  const align = pct > 78 ? 'flex-end' : pct < 22 ? 'flex-start' : 'center'
  const shift = pct > 78 ? '0%' : pct < 22 ? '0%' : '-50%'
  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative', height: height - 26, minHeight: 20 }}>
        <div style={{
          position: 'absolute', left: `${pct}%`, transform: `translateX(${shift})`,
          bottom: 4, display: 'flex', flexDirection: 'column', alignItems: align, whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: 10.5, fontWeight: 800, color: CARBON, letterSpacing: '0.02em' }}>
            {markLabel} {fmt(mark)}
          </span>
        </div>
        <div style={{
          position: 'absolute', left: `${pct}%`, bottom: 0,
          width: 0, height: 0, marginLeft: -5,
          borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
          borderTop: `6px solid ${CARBON}`,
        }} />
      </div>
      <div style={{ position: 'relative', height: 10, background: TRACK }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: GOLDEN }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: -2, bottom: -2, width: 3, marginLeft: -1.5, background: CARBON }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 7, fontWeight: 700, color: STONE, letterSpacing: '0.06em' }}>{lowLabel} {fmt(low)}</span>
        <span style={{ fontSize: 7, fontWeight: 700, color: STONE, letterSpacing: '0.06em' }}>{highLabel} {fmt(high)}</span>
      </div>
    </div>
  )
}

/* ── WATERFALL ── how one number becomes another. Used for the NOI bridge:
      a reader sees the size of the step, not just two totals to subtract.
      steps: [{ label, value, type: 'base' | 'delta' | 'total' }] ── */
export function Waterfall({ steps, fmt = v => v, height = 96, barW = 34 }) {
  const totals = []
  let run = 0
  for (const s of steps) {
    if (s.type === 'delta') { totals.push({ ...s, from: run, to: run + s.value }); run += s.value }
    else { totals.push({ ...s, from: 0, to: s.value }); run = s.value }
  }
  const max = Math.max(...totals.map(t => Math.max(t.from, t.to))) || 1
  const y = v => height - (v / max) * height
  const slot = 100 / steps.length
  return (
    <div>
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        {totals.map((t, i) => {
          const cx = slot * i + slot / 2
          const w = (barW / 100) * slot
          const top = y(Math.max(t.from, t.to))
          const h = Math.abs(y(t.from) - y(t.to)) || 1.5
          const fill = t.type === 'delta' ? (t.value >= 0 ? GOLDEN : TERRA) : t.type === 'total' ? CARBON : STONE
          return (
            <g key={t.label}>
              <rect x={cx - w / 2} y={top} width={w} height={h} fill={fill} />
              {i < totals.length - 1 && (
                <line x1={cx + w / 2} y1={y(t.to)} x2={slot * (i + 1) + slot / 2 - w / 2} y2={y(t.to)}
                  stroke={STONE} strokeWidth="0.4" strokeDasharray="1.5 1.5" />
              )}
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', marginTop: 5 }}>
        {totals.map(t => (
          <div key={t.label} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
            <div style={{
              fontSize: 'var(--fs-note)', fontWeight: 800, lineHeight: 1.1,
              color: t.type === 'delta' ? (t.value >= 0 ? GOLDEN : TERRA) : CARBON,
            }}>{t.type === 'delta' && t.value >= 0 ? '+' : ''}{fmt(t.value)}</div>
            <div style={{ fontSize: 6.4, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: STONE, marginTop: 2, lineHeight: 1.2 }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── RANKED BARS ── one series, sorted. Expense composition, tax scenarios.
      rows: [{ label, value, note, color, highlight }] ── */
export function RankedBars({ rows, fmt = v => v, barH = 9, rowGap = 6, labelW = 116, valueW = 46 }) {
  const max = Math.max(...rows.map(r => r.value)) || 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: rowGap }}>
      {rows.map(r => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: labelW, flexShrink: 0, fontSize: 'var(--fs-note)', lineHeight: 1.2,
            fontWeight: r.highlight ? 800 : 600, color: r.highlight ? CARBON : 'var(--graphite)',
          }}>{r.label}</div>
          {/* The bar track stops short of the row end so the value label
              always has room — otherwise the longest bar clips it. */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                height: barH, width: `${(r.value / max) * 100}%`,
                background: r.color || (r.highlight ? GOLDEN : CARBON),
              }} />
            </div>
            <span style={{
              width: valueW, flexShrink: 0, textAlign: 'right',
              fontSize: 'var(--fs-note)', fontWeight: r.highlight ? 800 : 700, color: CARBON, whiteSpace: 'nowrap',
            }}>{fmt(r.value)}</span>
            {r.note && <span style={{ fontSize: 6.6, color: STONE, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{r.note}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── GAUGE ROW ── a single proportion as a filled track (assessed vs ask,
      occupancy, expense ratio). Cheap, and reads instantly. ── */
export function Gauge({ pct, label, value, sub, color = GOLDEN, height = 10 }) {
  const p = Math.min(100, Math.max(0, pct))
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: STONE }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: CARBON }}>{value}</span>
      </div>
      <div style={{ height, background: TRACK, width: '100%' }}>
        <div style={{ height, width: `${p}%`, background: color }} />
      </div>
      {sub && <div style={{ fontSize: 6.8, color: STONE, fontWeight: 600, marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

/* ── LADDER CURVE ── price as a function of cap rate, with the expected
      trade band shaded and the ask marked. Pairs with the ladder table:
      the table is the numbers, this is the shape. ── */
export function LadderCurve({ rows, fmt = v => v, height = 104 }) {
  if (!rows?.length) return null
  const caps = rows.map(r => r.cap)
  const prices = rows.map(r => r.price)
  const minC = Math.min(...caps), maxC = Math.max(...caps)
  const minP = Math.min(...prices), maxP = Math.max(...prices)
  const x = c => ((c - minC) / (maxC - minC || 1)) * 100
  const y = p => height - ((p - minP) / (maxP - minP || 1)) * (height - 14) - 7
  const band = rows.filter(r => r.inBand)
  const ask = rows.find(r => r.isAsk)
  const pts = rows.map(r => `${x(r.cap)},${y(r.price)}`).join(' ')
  return (
    <div>
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
        {band.length > 0 && (
          <rect x={x(Math.min(...band.map(b => b.cap)))} y="0"
            width={x(Math.max(...band.map(b => b.cap))) - x(Math.min(...band.map(b => b.cap)))}
            height={height} fill="var(--linen)" />
        )}
        <polyline points={pts} fill="none" stroke={CARBON} strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        {/* Vertical rule only — a circle would render as an ellipse in a
            preserveAspectRatio="none" viewBox. */}
        {ask && (
          <line x1={x(ask.cap)} y1="0" x2={x(ask.cap)} y2={height} stroke={GOLDEN} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontSize: 6.8, fontWeight: 700, color: STONE, letterSpacing: '0.06em' }}>
        <span>{caps[0].toFixed(2)}% · {fmt(prices[0])}</span>
        {ask && <span style={{ color: GOLDEN, fontWeight: 800 }}>ASK {ask.cap.toFixed(2)}% · {fmt(ask.price)}</span>}
        <span>{caps[caps.length - 1].toFixed(2)}% · {fmt(prices[prices.length - 1])}</span>
      </div>
    </div>
  )
}
