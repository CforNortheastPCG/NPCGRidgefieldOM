import { DEAL, ADDR, PageFooter } from '../components/Shell.jsx'

/* ═══════════════════ COVER ═══════════════════
   Full-bleed photo cover with the BOV chip and "Prepared for" line.
   All strings come from src/data/deal.js. */
export default function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '78%', height: '72%', background: 'radial-gradient(130% 110% at 0% 100%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0) 82%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title">{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" />
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
