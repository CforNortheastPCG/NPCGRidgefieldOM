/* ═══════════════════ SHARED PAGE SHELL ═══════════════════
   Header / footer / static-page wrapper used by every page so the
   OM keeps one consistent frame (dark header bar, linen footer). */

export const ADDR = '711 Savin Avenue'
export const CITY_STATE = 'West Haven, CT 06516'
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

export function PageHeader({ section }) {
  return (
    <div className="page-header">
      <img src="/logos/npcg-white-hires.png" alt="NPCG" />
      <div className="section-label">
        <strong>{section}</strong>
        {FULL_ADDR}
      </div>
    </div>
  )
}

export function PageFooter({ pageNum }) {
  return (
    <div className="page-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logos/compass.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
        <span className="conf">For Sale &middot; The Williston &middot; 711 Savin Avenue, West Haven, CT 06516</span>
      </div>
      <span className="page-num">{pageNum}</span>
    </div>
  )
}

export function StaticShell({ section, title, children, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, padding: '24px 32px 32px' }}>
        {title && (
          <div className="sp-title-block">
            <div className="sp-accent" />
            <h1 className="sp-title">{title}</h1>
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
