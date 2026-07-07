import { FULL_ADDR } from './Shell.jsx'

/* ═══════════════════ SECTION DIVIDER ═══════════════════
   Full-bleed drone shot with a brand overlay (golden section chip, big
   title, address). Reuses the cover-hero treatment so dividers match the
   cover. Swap `image` per divider as more aerials are delivered.
*/
export default function Divider({
  eyebrow,
  title,
  image = '/photos/main/main-7.jpg',
  pageNum,
}) {
  return (
    <div className="page">
      <div className="cover-hero" style={{ background: 'var(--carbon)' }}>
        {/* Faded drone photo over a carbon base, with a dark scrim for contrast */}
        <img className="cover-hero-img" src={image} alt="" style={{ opacity: 0.3 }} />
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
          <div className="cover-hero-prep" style={{ marginTop: 14 }}>{FULL_ADDR}</div>
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
