import type { CSSProperties } from 'react'
import { PageFooter, PlaceholderBanner, assetUrl } from '../Shell.tsx'
import { DEAL } from '../../data/deal.ts'
import { TWEAKS } from '../../data/tweaks.ts'
import { COVER } from '../../content/index.ts'

type Corner = 'tl' | 'tr' | 'bl' | 'br'
const OPPOSITE: Record<Corner, Corner> = { tl: 'br', tr: 'bl', bl: 'tr', br: 'tl' }

function cornerBox(corner: Corner, inset = 40): CSSProperties {
  return {
    position: 'absolute',
    ...(corner.includes('l')
      ? { left: inset, right: 'auto', textAlign: 'left' as const }
      : { right: inset, left: 'auto', textAlign: 'right' as const }),
    ...(corner.startsWith('t') ? { top: inset, bottom: 'auto' } : { bottom: inset, top: 'auto' }),
    maxWidth: '78%',
  }
}

export function CoverHero({ pageNum }: { pageNum?: number }) {
  const cover = TWEAKS.cover
  const titleCorner: Corner = cover.titleCorner ?? 'bl'
  const logoCorner: Corner =
    cover.logoCorner && cover.logoCorner !== 'auto' ? cover.logoCorner : OPPOSITE[titleCorner]
  const freeLogo = cover.logoX != null && cover.logoY != null
  const titleOnTop = titleCorner.startsWith('t')
  const alignRight = titleCorner.includes('r')

  const logoStyle: CSSProperties = freeLogo
    ? {
        position: 'absolute',
        left: `${cover.logoX}%`,
        top: `${cover.logoY}%`,
        transform: 'translate(-50%, -50%)',
      }
    : { ...cornerBox(logoCorner, 28), maxWidth: undefined }

  return (
    <div className="page">
      {!COVER.generated && <PlaceholderBanner what="cover subtitle" />}
      <div className="cover-hero">
        {DEAL.coverImage ? (
          <img className="cover-hero-img" src={assetUrl(DEAL.coverImage)} alt="" />
        ) : (
          <div className="cover-hero-fallback" />
        )}
        {/* Shade hugs whichever half holds the title so it reads on-photo. */}
        <div
          className="cover-scrim"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            ...(titleOnTop ? { top: 0 } : { bottom: 0 }),
            height: '52%',
            background: `linear-gradient(${titleOnTop ? 'to bottom' : 'to top'}, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)`,
            pointerEvents: 'none',
          }}
        />
        <div style={logoStyle}>
          <img
            src={assetUrl('/logos/npcg-white-hires.png')}
            alt="NPCG"
            style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }}
          />
        </div>
        <div className="cover-hero-overlay" style={{ ...cornerBox(titleCorner), position: 'absolute' }}>
          <div className="cover-hero-status">{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          {COVER.subtitle && <div className="cover-hero-title">{COVER.subtitle}</div>}
          <div className="cover-hero-sub">{DEAL.address}, {DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={alignRight ? { marginLeft: 'auto' } : undefined} />
          <div className="cover-hero-prep">{COVER.highlights ?? DEAL.docType}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
