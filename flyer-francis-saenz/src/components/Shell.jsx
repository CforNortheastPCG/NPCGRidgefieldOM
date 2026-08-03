/* ═══════════════════ SHARED PAGE SHELL ═══════════════════
   Header / footer / title block used by pages 2-9 so the deck keeps one frame.
   Page 1 is full-bleed and uses none of this. */

import { BROKER } from '../data/deck.js'

export function PageHeader({ section }) {
  return (
    <div className="page-header">
      <img src="/logos/npcg-white-hires.png" alt="NPCG" />
      <div className="section-label">
        <strong>{section}</strong>
        <span>{BROKER.name} &middot; {BROKER.title}</span>
      </div>
    </div>
  )
}

export function PageFooter({ pageNum }) {
  return (
    <div className="page-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <img src="/logos/compass.png" alt="" style={{ height: 15, width: 15, objectFit: 'contain' }} />
        <span className="conf">
          {BROKER.name} &middot; {BROKER.phone} &middot; {BROKER.email}
        </span>
      </div>
      <span className="page-num">{pageNum}</span>
    </div>
  )
}

/* Full title block — eyebrow, two-tone headline, golden rule, optional sub. */
export function TitleBlock({ eyebrow, title, accent, sub }) {
  return (
    <>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <div className="section-title">{title} {accent && <span>{accent}</span>}</div>
      <div className="title-rule" />
      {sub && <div className="title-sub">{sub}</div>}
    </>
  )
}

/* Renders a string with **bold** segments so emphasis can live in the data. */
export function Md({ text, as: Tag = 'p', ...rest }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return <Tag {...rest}>{parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}</Tag>
}

export function Metric({ label, value }) {
  return (
    <div className="metric">
      <div className="metric-l">{label}</div>
      <div className="metric-v">{value}</div>
    </div>
  )
}

export function Page({ section, pageNum, children }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section">{children}</div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
