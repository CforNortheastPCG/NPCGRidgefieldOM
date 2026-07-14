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

  // When the NPCG logo shares the title's corner, it joins the title stack
  // instead of rendering as a separate absolutely-positioned box.
  const logoInTitleStack = !freeLogo && logoCorner === titleCorner

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
        {/* Shade hugs whichever half holds the title so it reads on-photo.
            Pre-baked RGBA PNG, NOT a CSS gradient: Skia prints gradient alpha
            as a luminosity soft-mask group that Acrobat/CoreGraphics composite
            as nothing (title unreadable). PNG alpha embeds as a plain image
            SMask, which every viewer honors. Dark edge is at the top of the
            asset; flip when the title sits in a bottom corner. */}
        <img
          className="cover-scrim"
          src={assetUrl('/scrim-feather.png')}
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            ...(titleOnTop ? { top: 0 } : { bottom: 0, transform: 'scaleY(-1)' }),
            height: '52%',
            pointerEvents: 'none',
          }}
        />
        {!logoInTitleStack && (
          <div style={{ ...logoStyle, textAlign: logoCorner.includes('r') ? 'right' : 'left' }}>
            <img
              src={assetUrl('/logos/npcg-white-hires.png')}
              alt="NPCG"
              style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }}
            />
            {COVER.buildingLogo && (
              <img
                src={assetUrl(COVER.buildingLogo)}
                alt=""
                style={{
                  maxHeight: 72,
                  maxWidth: 160,
                  objectFit: 'contain',
                  display: 'block',
                  marginTop: 16,
                  ...(logoCorner.includes('r') ? { marginLeft: 'auto' } : {}),
                }}
              />
            )}
          </div>
        )}
        <div className="cover-hero-overlay" style={{ ...cornerBox(titleCorner), position: 'absolute' }}>
          {logoInTitleStack && (
            <img
              src={assetUrl('/logos/npcg-white-hires.png')}
              alt="NPCG"
              style={{
                maxHeight: 40,
                maxWidth: 200,
                objectFit: 'contain',
                marginBottom: 14,
                display: 'block',
                ...(alignRight ? { marginLeft: 'auto' } : {}),
              }}
            />
          )}
          {logoInTitleStack && COVER.buildingLogo && (
            <img
              src={assetUrl(COVER.buildingLogo)}
              alt=""
              style={{
                maxHeight: 72,
                maxWidth: 160,
                objectFit: 'contain',
                marginBottom: 10,
                ...(alignRight ? { marginLeft: 'auto', display: 'block' } : { display: 'block' }),
              }}
            />
          )}
          <div className="cover-hero-status">{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          {COVER.subtitle && <div className="cover-hero-title">{COVER.subtitle}</div>}
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={alignRight ? { marginLeft: 'auto' } : undefined} />
          <div className="cover-hero-prep">{COVER.highlights ?? DEAL.docType}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
