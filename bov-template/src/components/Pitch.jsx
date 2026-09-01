/* ═══════════════════ PITCH-PAGE VOCABULARY ═══════════════════
   The three blocks the firm-standard pitch pages (Selling Process Stages,
   Timeline, Visibility, Reporting, Buyer Tracking, Why Owners Sell, Tax
   Deferral) share, on top of Blocks.jsx: the » bullet list, the golden
   closing banner, and the card heading with its icon disc. Kept apart from
   Blocks.jsx so the analytical pages don't pull in the icon kit. */
import { IconDisc } from './Icons.jsx'

/* ── Chevron bullet list — the » marker from the firm deck. `size` is the
      body size; `gap` the spacing between items; `style` can turn the list
      into a grid for two-column bullets. ── */
export function BulletList({ items, size = 8.8, gap = 4, color = 'var(--graphite)', style }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap, ...style }}>
      {items.map(it => (
        <li key={it} style={{ position: 'relative', paddingLeft: 13, fontSize: size, lineHeight: 1.45, color, minWidth: 0 }}>
          <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--golden)', fontWeight: 800 }}>»</span>
          {it}
        </li>
      ))}
    </ul>
  )
}

/* ── Golden banner: one closing line, white on golden, full width. ── */
export function Banner({ children, style }) {
  return (
    <div style={{
      background: 'var(--golden)', color: 'var(--white)', padding: '10px 18px', textAlign: 'center',
      fontSize: 9.6, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.45,
      ...style,
    }}>{children}</div>
  )
}

/* ── Card heading: optional icon disc + caps title over a golden rule. ── */
export function CardHead({ icon, children, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 8, marginBottom: 10,
      borderBottom: '2px solid var(--golden)', ...style,
    }}>
      {icon && <IconDisc name={icon} size={28} />}
      <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.25 }}>{children}</div>
    </div>
  )
}
