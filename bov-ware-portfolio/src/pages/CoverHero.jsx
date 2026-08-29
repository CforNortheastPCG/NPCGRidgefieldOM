import { DEAL, ADDR, PageFooter } from '../components/Shell.jsx'
import { COVER_STATS } from '../data/deal.js'

/* ═══════════════════ COVER ═══════════════════
   Full-bleed photo cover: the BOV chip, the name and address, a rule of
   headline stats, and who this was prepared for. The stat row is the thing
   an owner's eye lands on second — keep it to 4–5 facts that need no
   explanation (units, SF, acres, year, occupancy).

   All strings come from src/data/deal.js (DEAL + COVER_STATS). */
export default function CoverHero({ pageNum }) {
  const stats = COVER_STATS || []
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* ⚠ THIS MUST STAY A PNG. It was a CSS radial-gradient fading to
            rgba(0,0,0,0), which Skia turns into a luminosity soft-mask group
            — PDF.js (Firefox, Chrome's built-in viewer) paints that as a
            PINK BLOCK over the cover. Alpha inside an image embeds as an
            image + SMask and composites correctly everywhere.
            Regenerate with scripts/gen-scrim.cjs. See PDF-ARTIFACTS.md. */}
        <img
          src="/scrim-feather.png"
          alt=""
          style={{ position: 'absolute', left: 0, bottom: 0, width: '78%', height: '78%', pointerEvents: 'none', display: 'block' }}
        />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 11 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title">{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>

          {stats.length > 0 && (
            <div style={{
              display: 'flex', gap: 30, alignItems: 'flex-end',
              borderTop: '1px solid rgba(255,255,255,0.28)',
              borderBottom: '1px solid rgba(255,255,255,0.28)',
              padding: '11px 0', margin: '4px 0 14px',
            }}>
              {stats.map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}

          {stats.length === 0 && <div className="cover-hero-rule" />}
          <div className="cover-hero-prep">{DEAL.type}</div>
          <div className="cover-hero-prep" style={{ marginTop: 8, opacity: 0.9 }}>
            Prepared for {DEAL.preparedFor} &middot; {DEAL.preparedDate}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
