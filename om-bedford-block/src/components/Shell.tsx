/* ═══════════ SHARED PAGE SHELL (protected) ═══════════
   Header / footer / static wrapper — the one consistent frame around
   every page. Deal strings come from src/data/deal.ts (injected). */

import type { ReactNode } from 'react'
import { DEAL } from '../data/deal.ts'

/** Resolve a root-absolute public asset ("/photos/x.jpg") against the build
    base. Previews serve under /api/books/<id>/preview/ — an absolute path
    escapes the book there and silently 404s (the "Photo pending" bug). */
export function assetUrl(p: string): string {
  return p.startsWith('/') && !p.startsWith('//') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p
}

export function PageHeader({ section }: { section: string }) {
  return (
    <div className="page-header">
      <img src={assetUrl('/logos/npcg-white-hires.png')} alt="NPCG" />
      <div className="section-label">
        <strong>{section}</strong>
        {DEAL.fullAddress}
      </div>
    </div>
  )
}

export function PageFooter({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={assetUrl('/logos/compass.png')} alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
        <span className="conf">
          {DEAL.status} &middot; {DEAL.name} &middot; {DEAL.fullAddress}
        </span>
      </div>
      <span className="page-num">{pageNum}</span>
    </div>
  )
}

export function PlaceholderBanner({ what }: { what: string }) {
  return <div className="placeholder-banner">Placeholder — {what} not yet generated for this deal</div>
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

/** Two-tone section title: last word (or given accent) rendered golden. */
export function SectionTitle({ text, accent }: { text: string; accent?: string }) {
  if (accent) {
    return (
      <div className="section-title" style={{ marginBottom: 2 }}>
        {text} <span className="accent">{accent}</span>
      </div>
    )
  }
  const words = text.split(' ')
  if (words.length === 1) {
    return (
      <div className="section-title" style={{ marginBottom: 2 }}>
        {text}
      </div>
    )
  }
  const head = words.slice(0, -1).join(' ')
  const tail = words[words.length - 1]
  return (
    <div className="section-title" style={{ marginBottom: 2 }}>
      {head} <span className="accent">{tail}</span>
    </div>
  )
}

/** Renders **bold** markdown spans in agent prose. */
export function Md({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
      )}
    </>
  )
}

export function Img({ src, alt = '', style }: { src: string; alt?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      onError={(e) => {
        const el = e.currentTarget
        el.style.display = 'none'
        const ph = document.createElement('div')
        ph.className = 'photo-missing'
        ph.textContent = 'Photo pending'
        el.parentElement?.appendChild(ph)
      }}
    />
  )
}
