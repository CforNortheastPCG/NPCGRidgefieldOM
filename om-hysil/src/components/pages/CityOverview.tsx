import { PageHeader, PageFooter, PlaceholderBanner, Img } from '../Shell.tsx'
import { CITY_PHOTOS } from '../../data/photos.ts'
import { CITY_OVERVIEW } from '../../content/index.ts'

export function CityOverview({ pageNum }: { pageNum?: number }) {
  const c = CITY_OVERVIEW
  const [p1, p2] = CITY_PHOTOS
  return (
    <div className="page">
      {!c.generated && <PlaceholderBanner what="city overview" />}
      <PageHeader section={`${c.heading} Overview`} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>
            {c.heading} <span className="accent">Overview</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>
            {c.dek}
          </div>
          <div className="title-rule" />

          <div style={{ fontSize: 12.5, lineHeight: 1.65, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {c.bullets.length > 0 && (
            <>
              <div className="eyebrow" style={{ paddingTop: 16, marginBottom: 10 }}>
                {c.bulletsTitle}
              </div>
              <ul className="highlights" style={{ fontSize: 12, lineHeight: 2.05 }}>
                {c.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{p1 && <Img src={p1} />}</div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{p2 && <Img src={p2} />}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
