import { PageHeader, PageFooter } from './Shell.jsx'

/* ═══════════════════ PHOTO PAGES (COMING SOON) ═══════════════════
   Placeholder photo pages until professional photography is delivered.
   Sequence: Aerial → per building (Exterior, Interior, Mechanical).
   Swap a placeholder for real imagery by replacing its tile in PHOTO_PAGES
   (or by extending PhotoComingSoon to accept image src per tile).
*/

function CameraIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function PlaceholderTile({ caption }) {
  return (
    <div style={{
      position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 8, background: 'var(--linen)', border: '1px dashed var(--stone)',
      borderRadius: 4, minHeight: 0, overflow: 'hidden', padding: 16, textAlign: 'center',
    }}>
      <div style={{
        position: 'absolute', top: 10, right: 10, background: 'var(--golden)', color: '#fff',
        fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '3px 8px', borderRadius: 2,
      }}>Coming Soon</div>
      <div style={{ color: 'var(--stone)' }}><CameraIcon /></div>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>{caption}</div>
      <div style={{ fontSize: 8, color: 'var(--stone)', letterSpacing: '0.06em' }}>
        Professional photography in progress
      </div>
    </div>
  )
}

export function PhotoComingSoon({ section, title, accent, subtitle, tiles, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} <span style={{ color: '#F8971D' }}>{accent}</span>
        </div>
        <div className="title-rule" />
        {subtitle && (
          <div style={{ fontSize: 9.5, color: 'var(--stone)', marginBottom: 10 }}>{subtitle}</div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, flex: 1, minHeight: 0 }}>
          {tiles.map(t => <PlaceholderTile key={t} caption={t} />)}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PHOTO GALLERY (REAL IMAGERY) ═══════════════════
   Renders a page of actual photography. With a `hero` src, the hero fills the
   top and `tiles` form a row beneath it; otherwise `tiles` lay out as a grid. */
export function PhotoGallery({ section, title, accent, subtitle, hero, heroPosition, tiles = [], pageNum }) {
  const Img = ({ src, pos, rotate }) => (
    <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', minHeight: 0, minWidth: 0, height: '100%', width: '100%', background: 'var(--linen)', containerType: rotate ? 'size' : undefined }}>
      {rotate ? (
        // Quarter-turns (90°/270°) swap the tile's dimensions (cqh↔cqw) so the
        // rotated image still covers; 180° keeps the same dimensions.
        <img src={src} alt="" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: rotate % 180 === 0 ? '100%' : '100cqh',
          height: rotate % 180 === 0 ? '100%' : '100cqw',
          objectFit: 'cover', objectPosition: pos || 'center', display: 'block',
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        }} />
      ) : (
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center', display: 'block' }} />
      )}
    </div>
  )
  const tileObjs = tiles.map(t => (typeof t === 'string' ? { src: t } : t))
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {title} <span style={{ color: '#F8971D' }}>{accent}</span>
        </div>
        <div className="title-rule" />
        {subtitle && (
          <div style={{ fontSize: 9.5, color: 'var(--stone)', marginBottom: 10 }}>{subtitle}</div>
        )}
        {hero ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.7, minHeight: 0, display: 'flex' }}><Img src={hero} pos={heroPosition} /></div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${tileObjs.length || 1}, 1fr)`, gridAutoRows: '100%', gap: 10, minHeight: 0 }}>
              {tileObjs.map(t => <Img key={t.src} src={t.src} pos={t.pos} rotate={t.rotate} />)}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, flex: 1, minHeight: 0 }}>
            {tileObjs.map(t => <Img key={t.src} src={t.src} pos={t.pos} rotate={t.rotate} />)}
          </div>
        )}
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
