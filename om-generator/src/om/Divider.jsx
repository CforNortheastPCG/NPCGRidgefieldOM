import { useDeal } from './Shell.jsx'

/* ═══════════════════ SECTION DIVIDER ═══════════════════
   Full-bleed image with a brand overlay (golden section chip, big title,
   address). Reuses the cover-hero treatment so dividers match the cover.
   Uses the deal's location map / cover photo (faded over carbon) since no
   property-specific drone shots are available at generation time. */
export default function Divider({ eyebrow, title, pageNum }) {
  const deal = useDeal()
  const image = deal.map || deal.cover
  const street = deal.street || deal.address || ''
  const city = deal.cityState || deal.cityLong || ''
  const fullAddr = [street, city].filter(Boolean).join(', ')
  return (
    <div className="page">
      <div className="cover-hero" style={{ background: 'var(--carbon)' }}>
        {/* Faded photo over a carbon base, with a dark scrim for contrast */}
        {image && <img className="cover-hero-img" src={image} alt="" style={{ opacity: 0.3 }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(24,28,34,0.45)' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 40, maxWidth: 200, objectFit: 'contain' }} />
        </div>
        {/* Centered title block */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          color: '#fff', padding: '0 48px',
        }}>
          {eyebrow && (
            <div style={{ marginBottom: 14, color: 'var(--golden)', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em' }}>
              {eyebrow}
            </div>
          )}
          <div className="cover-hero-title" style={{ fontSize: 56 }}>{title}</div>
          <div className="cover-hero-rule" style={{ margin: '16px auto 0' }} />
          {fullAddr && <div className="cover-hero-prep" style={{ marginTop: 14 }}>{fullAddr}</div>}
        </div>
        {pageNum != null && (
          <div style={{ position: 'absolute', right: 26, bottom: 18, color: '#fff', fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: '0.04em' }}>
            {pageNum}
          </div>
        )}
      </div>
    </div>
  )
}
