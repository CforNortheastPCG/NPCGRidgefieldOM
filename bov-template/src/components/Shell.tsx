/* ═══════════ SHARED PAGE SHELL (container) ═══════════
   Header / footer / static wrapper — the one consistent frame around every
   page. Deal strings come from src/data/deal.ts.

   This file is CONTAINER: it tracks npcgstudio/frame/src/components/Shell.tsx
   and `npm run container-check` diffs the two. Two deliberate product
   differences, both marked BOV below:
     · Md() takes an `as` tag + props (BOV pages render data-driven prose
       into headings and table cells, not just <p>)
     · FOOTER_DESCRIPTOR falls back to DEAL.type, not an authored cover
       subtitle — the BOV has no cover content module. */

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR } from '../data/deal.ts'

// Re-exported so `import { FULL_ADDR } from '../Shell.tsx'` keeps working.
export { DEAL, ADDR, CITY_STATE, FULL_ADDR }

/* Address-named deals ("613 Main Street") printed the address TWICE in the
   footer (name · fullAddress). When the name adds nothing over the address,
   the asset descriptor takes its slot. */
const FOOTER_DESCRIPTOR = DEAL.name === DEAL.address && DEAL.type ? DEAL.type : DEAL.name

/** Resolve a root-absolute public asset ("/photos/x.jpg") against the build
    base. A book served under a path prefix (a preview route) would have an
    absolute path escape the book and silently 404 — the "Photo pending" bug. */
export function assetUrl(p: string): string {
  return p.startsWith('/') && !p.startsWith('//') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p
}

/** Photo loading policy. Every VIEWER of a build is an iframe over a tall
    stack of pages, and a whole deck's photos at once is a slow first paint —
    so framed, images below the fold load lazily. The PDF exporters, shot.mjs
    and layout-check.mjs open the build TOP-LEVEL and wait for networkidle,
    which lazy loading would break — they stay eager, byte-identical to
    before. Pages are fixed 960×742 overflow-hidden boxes, so deferred images
    never shift layout. */
const FRAMED = typeof window !== 'undefined' && window.self !== window.top
export const IMG_LOADING: 'lazy' | 'eager' = FRAMED ? 'lazy' : 'eager'
export const IMG_DECODING: 'async' | 'auto' = FRAMED ? 'async' : 'auto'

export function PageHeader({ section }: { section: string }) {
  return (
    <div className="page-header">
      <img src={assetUrl('/logos/npcg-white-hires.png')} alt="NPCG" />
      <div className="section-label">
        <strong>{section}</strong>
        <span style={{ display: 'block', transform: 'translateY(0.3px)' }}>{FULL_ADDR}</span>
      </div>
    </div>
  )
}

export function PageFooter({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={assetUrl('/logos/compass.png')} alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
        <span className="conf">
          {DEAL.status} &middot; {FOOTER_DESCRIPTOR} &middot; {FULL_ADDR}
        </span>
      </div>
      <span className="page-num">{pageNum}</span>
    </div>
  )
}

export function PlaceholderBanner({ what }: { what: string }) {
  return <div className="placeholder-banner">Placeholder — {what} not yet supplied for this deal</div>
}

/* BOV: renders a string with **bold** markdown segments into any tag, so
   data-driven prose can land in a <p>, a heading, or a table cell. */
export function Md({
  text,
  as: Tag = 'p',
  ...rest
}: {
  text: string
  as?: ElementType
  [key: string]: unknown
}) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return <Tag {...rest}>{parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}</Tag>
}

export function StaticShell({
  section,
  title,
  children,
  pageNum,
}: {
  section: string
  title?: string
  children: ReactNode
  pageNum?: number
}) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div
        className="section"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, padding: '24px 32px 32px' }}
      >
        {title && (
          <div className="sp-title-block">
            <div className="sp-accent" />
            <h1 className="sp-title">{title}</h1>
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/** Photo with the container's loading policy and a diagnosable failure: a
    missing file names the path it tried, on the page, instead of a blank
    box ("sometimes pics disappear" → "photos/DJI_0043.jpg didn't load"). */
export function Img({ src, alt = '', style }: { src: string; alt?: string; style?: CSSProperties }) {
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      loading={IMG_LOADING}
      decoding={IMG_DECODING}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      onError={(e) => {
        const el = e.currentTarget
        el.style.display = 'none'
        const ph = document.createElement('div')
        ph.className = 'photo-missing'
        ph.textContent = `Photo missing — ${src.slice(-60)}`
        el.parentElement?.appendChild(ph)
      }}
    />
  )
}
