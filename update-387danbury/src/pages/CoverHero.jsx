import { DEAL, ADDR, PageFooter } from '../components/Shell.jsx'

/* ═══════════════════ COVER ═══════════════════
   Full-bleed photo cover — title block top-LEFT, NPCG logo top-RIGHT,
   with a top scrim so the white text reads over the sky. All strings
   come from src/data/deal.js. */
export default function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: '58%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 36, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ color: '#fff', minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>
              {DEAL.status}
            </div>
            <div className="cover-hero-name" style={{ fontSize: 50 }}>{DEAL.name}</div>
            {ADDR !== DEAL.name && <div className="cover-hero-title">{ADDR}</div>}
            <div className="cover-hero-sub">{DEAL.cityLong}</div>
            <div className="cover-hero-rule" />
            <div className="cover-hero-prep">{DEAL.type}</div>
            <div className="cover-hero-prep" style={{ marginTop: 8, opacity: 0.9 }}>
              Prepared for {DEAL.preparedFor} &middot; {DEAL.preparedDate}
            </div>
          </div>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 200, objectFit: 'contain', flexShrink: 0 }} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
