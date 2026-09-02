import type { CSSProperties, ReactNode } from 'react'

/* ═══════════════════ SHARED CONTENT BLOCKS ═══════════════════
   The repeating visual vocabulary of an NPCG BOV. Use these instead of
   re-inlining the same styles per page — and use the :root tokens
   (var(--golden), var(--carbon), …), never a fresh hex literal. */

/* ── Page title: "Executive **Summary**" two-tone head + caps subtitle.
      `accent` is the trailing word(s) rendered in golden. ── */
export function SectionTitle({ title, accent, subtitle, style }: {
  title: ReactNode
  accent?: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
}) {
  return (
    <div style={{ marginBottom: 8, ...style }}>
      <div className="section-title" style={{ marginBottom: subtitle ? 1 : 4 }}>
        {title}{accent ? <> <span style={{ color: 'var(--golden)' }}>{accent}</span></> : null}
      </div>
      {subtitle && (
        <div style={{
          fontSize: 'var(--fs-sub)', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--stone)', fontWeight: 600,
        }}>{subtitle}</div>
      )}
    </div>
  )
}

/* ── KPI: a number and its label. NO box — no fill, no border, no chip.
      The house style is unboxed stats (matching the 387 Danbury deck the
      user signed off on); emphasis comes from type weight and the golden
      accent, not from a container. `invert` no longer inverts a fill — it
      just promotes the value to golden so one number in a row can lead. ── */
export interface KpiItem {
  label: string
  value: ReactNode
  sub?: ReactNode
  /** Promote the value to golden so one number in a row leads. */
  invert?: boolean
  style?: CSSProperties
}

export function KpiTile({ label, value, sub, invert = false, style }: KpiItem) {
  return (
    <div style={{ minWidth: 0, ...style }}>
      <div style={{
        fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--stone)', marginBottom: 3, lineHeight: 1.25,
      }}>{label}</div>
      <div style={{
        fontSize: 'var(--fs-kpi)', fontWeight: 800, lineHeight: 1.05,
        color: invert ? 'var(--golden)' : 'var(--carbon)',
      }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', marginTop: 3, lineHeight: 1.3 }}>{sub}</div>
      )}
    </div>
  )
}

/* ── Horizontal KPI strip. One hairline rule above the row carries the
      structure the boxes used to. ── */
export function KpiStrip({ items, style }: { items: KpiItem[]; style?: CSSProperties }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 22,
      borderTop: '2px solid var(--golden)', paddingTop: 10, ...style,
    }}>
      {items.map((k, i) => <KpiTile key={k.label ?? i} {...k} />)}
    </div>
  )
}

/* ── Vertical KPI rail. Hairline separators between items, not boxes. ── */
export function KpiRail({ items, gap = 11, style }: { items: KpiItem[]; gap?: number; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, minWidth: 0, ...style }}>
      {items.map((k, i) => (
        <KpiTile
          key={k.label ?? i}
          {...k}
          style={i === 0
            ? { borderTop: '2px solid var(--golden)', paddingTop: 8 }
            : { borderTop: '1px solid var(--border)', paddingTop: 8 }}
        />
      ))}
    </div>
  )
}

/* ── Callout: linen fill, golden left border. For the one paragraph on the
      page that carries an argument rather than a number. ── */
export function Callout({ title, children, style }: {
  title?: ReactNode
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <div style={{
      borderLeft: '3px solid var(--golden)',
      padding: '1px 0 1px 10px',
      ...style,
    }}>
      {title && (
        <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', marginBottom: 2 }}>{title}</div>
      )}
      <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.45, color: 'var(--graphite)' }}>{children}</div>
    </div>
  )
}

/* ── Numbered investment highlights: golden square chip + bold head + body
      (Homecrest p2). `items` = [{ title, body }]. ── */
export interface NumberedItem {
  title: string
  body: ReactNode
}

export function NumberedList({ items, gap = 7, style }: {
  items: NumberedItem[]
  gap?: number
  style?: CSSProperties
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {items.map((h, i) => (
        <div key={h.title} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{
            flex: '0 0 auto', width: 11, color: 'var(--golden)',
            fontSize: 10.5, fontWeight: 800, lineHeight: 1.25,
          }}>{i + 1}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.3 }}>{h.title}</div>
            <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.42, color: 'var(--graphite)', marginTop: 1 }}>{h.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Source / methodology note. Sits above the footer; `mt: 'auto'` pushes it
      to the bottom of a flex column so pages end on their sourcing. ── */
export function SourceNote({ children, top = false, style }: {
  children?: ReactNode
  /** Push the note to the bottom of a flex column. */
  top?: boolean
  style?: CSSProperties
}) {
  return (
    <div style={{
      fontSize: 'var(--fs-note)', lineHeight: 1.4, color: 'var(--stone)',
      marginTop: top ? 'auto' : 8, paddingTop: 6, ...style,
    }}>{children}</div>
  )
}

/* ── Small caps column heading above a table or list. ── */
export function BlockLabel({ children, accent = 'var(--terracotta)', style }: {
  children?: ReactNode
  accent?: string
  style?: CSSProperties
}) {
  return (
    <div style={{
      fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: accent, marginBottom: 4, ...style,
    }}>{children}</div>
  )
}

export interface FaqItem {
  q: string
  a: ReactNode
}

export function FaqBlock({ items, title = 'Common Questions' }: { items: FaqItem[]; title?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <h3 style={{ fontSize: 8.3, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(f => (
          <div key={f.q}>
            <div style={{ fontSize: 8.4, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.3 }}>{f.q}</div>
            <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.42, color: 'var(--graphite)', marginTop: 2 }}>{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Owner badge for the due-diligence checklist (Seller / Broker / Buyer / Third-Party). */
const OWNER_COLORS = {
  Seller: 'var(--golden)',
  Broker: 'var(--carbon)',
  Buyer: 'var(--terracotta)',
  'Third-Party': 'var(--stone)',
}
export function OwnerBadge({ owner }: { owner: string }) {
  return (
    <span style={{
      fontSize: 6.4, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: OWNER_COLORS[owner as keyof typeof OWNER_COLORS] ?? 'var(--stone)', whiteSpace: 'nowrap', flexShrink: 0,
    }}>{owner}</span>
  )
}
