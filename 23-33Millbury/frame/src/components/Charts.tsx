/* ═══════════ SVG CHARTS (protected) ═══════════ */

export interface Slice {
  label: string
  value: number
  color: string
}

export function DonutChart({
  data,
  size = 140,
  thickness = 24,
  centerLabel,
  centerSub,
}: {
  data: Slice[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerSub?: string
}) {
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ece7e1" strokeWidth={thickness} />
        {data.map((d, i) => {
          // Tiny overlap so adjacent slices meet without an anti-alias seam.
          const len = (d.value / total) * C + 1.4
          const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * C, 0)
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${Math.max(0, C - len)}`}
              strokeDashoffset={-offset}
            />
          )
        })}
      </g>
      {centerLabel && (
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: size > 120 ? 24 : 20, fontWeight: 800, fill: 'var(--carbon)' }}
        >
          {centerLabel}
        </text>
      )}
      {centerSub && (
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}
        >
          {centerSub}
        </text>
      )}
    </svg>
  )
}

export function MixCard({
  title,
  data,
  centerLabel,
  centerSub,
  fmt,
  size = 140,
}: {
  title: string
  data: Slice[]
  centerLabel?: string
  centerSub?: string
  fmt: (v: number) => string
  size?: number
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flex: 1, minHeight: 0 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} size={size} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, maxWidth: 230 }}>
          {data.map((d) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10 }}>
              <span style={{ width: 11, height: 11, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span
                style={{
                  flex: 1,
                  color: 'var(--carbon)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {d.label}
              </span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                {fmt(d.value)} &middot; {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BarChartCard({
  title,
  data,
  note,
  barHeight = 34,
  gap = 22,
}: {
  title: string
  data: Array<{ label: string; value: number; color: string }>
  note?: string
  barHeight?: number
  gap?: number
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap,
          minHeight: 0,
          padding: '0 8px',
        }}
      >
        {data.map((d) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ flex: '0 0 84px', textAlign: 'right', fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>
              {d.label}
            </span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: barHeight, background: d.color, borderRadius: 4 }} />
            </div>
            <span style={{ flex: '0 0 84px', fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>
              ${Math.round(d.value).toLocaleString()}
            </span>
          </div>
        ))}
        {note && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--golden)', marginTop: 2 }}>
            {note}
          </div>
        )}
      </div>
    </div>
  )
}
