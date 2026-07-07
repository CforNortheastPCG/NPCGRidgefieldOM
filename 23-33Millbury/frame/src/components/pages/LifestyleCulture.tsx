/* ═══════════ THE CANAL DISTRICT & CULTURE ═══════════
   Combined page, two-column: editorial text (title + Canal District +
   WooSox / Polar Park paragraphs) on the left, the district's cultural and
   dining anchors as a boxless logo card grid on the right (all brand
   logos, led by Polar Park & the Worcester Red Sox). */

import { PageHeader, PageFooter, SectionTitle, Img } from '../Shell.tsx'
import { Logo, INVERT_SLUGS } from './market/Logo.tsx'
import { amenitiesByCategory } from '../../data/market/amenities.ts'

const AERIALS = ['/photos/canal-1.jpg', '/photos/canal-2.jpg']

const INTRO =
  "Worcester's cultural scene punches well above its weight, and the Canal District — the most-watched neighborhood in Central Massachusetts — is its creative heart: a walkable mix of restaurants, breweries, music venues, and galleries minutes from the property."

const WOOSOX =
  'Polar Park — the 9,508-seat home of the Worcester Red Sox, the Triple-A affiliate of the Boston Red Sox — opened in 2021 on a 35-year lease and draws more than 500,000 fans a season, among the top two minor-league clubs in the country by attendance. Its arrival reset the trajectory of every surrounding block, pulling The Revington, The Cove, and a wave of new restaurants and housing into the district steps from the property.'

const clamp2: React.CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
}

export function LifestyleCulture({ pageNum }: { pageNum?: number }) {
  // Keep every card that carries a brand logo (Polar Park leads the list).
  const cards = amenitiesByCategory('culture').filter((a) => a.logoUrl).slice(0, 12)
  return (
    <div className="page">
      <PageHeader section="The Canal District" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.4fr', gap: 22, flex: '0 0 auto', minHeight: 0 }}>
          {/* Left — editorial text */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <SectionTitle text="A City with Its Own" accent="Character" />
            <div className="title-rule" />
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>{INTRO}</div>
            <div style={{ fontSize: 12.6, lineHeight: 1.5, color: 'var(--graphite)' }}>{WOOSOX}</div>
          </div>

          {/* Right — logo card grid, packed to the top */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 'min-content', alignContent: 'start', gap: '10px 16px', minHeight: 0 }}>
            {cards.map((a) => (
              <div key={a.slug} style={{ borderTop: '2px solid var(--golden)', paddingTop: 6, paddingRight: 4, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {a.logoUrl && (
                  <div style={{ height: 21, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 4 }}>
                    <Logo src={a.logoUrl} alt={`${a.name} logo`} invert={INVERT_SLUGS.has(a.slug)} style={{ maxHeight: 21, maxWidth: 108 }} />
                  </div>
                )}
                <div style={{ fontSize: 11.8, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{a.name}</div>
                {a.stat && <div style={{ fontSize: 8.6, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--golden)', marginTop: 2 }}>{a.stat}</div>}
                <div style={{ fontSize: 9.8, lineHeight: 1.3, color: 'var(--graphite)', marginTop: 3, ...clamp2 }}>{a.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Canal District aerials fill out the page */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, minHeight: 0, marginTop: 14 }}>
          {AERIALS.map((src) => (
            <div key={src} style={{ minHeight: 0, overflow: 'hidden' }}>
              <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
