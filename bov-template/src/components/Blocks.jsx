/* ═══════════════════ SHARED CONTENT BLOCKS ═══════════════════
   Small layout primitives used across the marketing-process pages. */

export function FaqBlock({ items, title = 'Common Questions' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map(f => (
          <div key={f.q}>
            <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.3 }}>{f.q}</div>
            <div style={{ fontSize: 8.6, lineHeight: 1.42, color: 'var(--graphite)', marginTop: 2 }}>{f.a}</div>
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
export function OwnerBadge({ owner }) {
  return (
    <span style={{
      fontSize: 6.6, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
      color: '#fff', background: OWNER_COLORS[owner] || 'var(--stone)',
      padding: '1.5px 6px', borderRadius: 8, whiteSpace: 'nowrap', flexShrink: 0,
    }}>{owner}</span>
  )
}
