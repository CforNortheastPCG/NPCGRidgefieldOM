import { createContext, useContext } from 'react'

/* ═══════════════════ SHARED PAGE SHELL ═══════════════════
   Header / footer / static-page wrapper used by every page so the
   OM keeps one consistent frame (dark header bar, linen footer).

   Address/identity now come from the runtime deal model via DealContext
   (provided by OmDeck), so the static pages render the right property
   without per-page edits. Sensible fallbacks keep the frame intact if the
   context is ever empty. */

export const DealContext = createContext(null)
export const DealProvider = DealContext.Provider
export const useDeal = () => useContext(DealContext) || {}

const fullAddr = (d) => {
  const street = d.street || d.address || ''
  const city = d.cityState || d.cityLong || ''
  return [street, city].filter(Boolean).join(', ') || 'Property Address'
}
const dealName = (d) => d.name || 'Offering'

export function PageHeader({ section }) {
  const deal = useDeal()
  return (
    <div className="page-header">
      <img src="/logos/npcg-white-hires.png" alt="NPCG" />
      <div className="section-label">
        <strong>{section}</strong>
        {fullAddr(deal)}
      </div>
    </div>
  )
}

export function PageFooter({ pageNum }) {
  const deal = useDeal()
  return (
    <div className="page-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logos/compass.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
        <span className="conf">For Sale &middot; {dealName(deal)} &middot; {fullAddr(deal)}</span>
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
