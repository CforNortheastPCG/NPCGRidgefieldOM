/* ═══════════ EMPLOYERS & EDUCATION ═══════════
   Print translation of the website's EmployersEducation section — two
   columns (Major Employers / Academic Anchors) drawn from the amenity set. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { Logo } from './market/Logo.tsx'
import { amenitiesByCategory, type Amenity } from '../../data/market/amenities.ts'
import { EMPLOYERS_COPY } from '../../data/market/copy.ts'

function AnchorColumn({ title, items }: { title: string; items: Amenity[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 5, marginBottom: 8, borderBottom: '2px solid var(--golden)' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, justifyContent: 'space-between' }}>
        {items.map((it) => (
          <div key={it.slug} style={{ display: 'flex', gap: 10, alignItems: 'center', borderLeft: '3px solid var(--golden)', paddingLeft: 9 }}>
            <div style={{ flexShrink: 0, width: 52, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {it.logoUrl && <Logo src={it.logoUrl} alt={`${it.name} logo`} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.15 }}>{it.name}</span>
                {it.stat && <span style={{ fontSize: 8.4, fontWeight: 700, color: 'var(--golden)', whiteSpace: 'nowrap' }}>{it.stat}</span>}
              </div>
              <div style={{ fontSize: 8.6, lineHeight: 1.32, color: 'var(--graphite)', marginTop: 2 }}>{it.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EmployersEducation({ pageNum }: { pageNum?: number }) {
  const employers = amenitiesByCategory('employer')
  const education = amenitiesByCategory('education')
  return (
    <div className="page">
      <PageHeader section="Employers & Education" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="A Thriving" accent="Institutional Base" />
        <div className="title-rule" />
        <div style={{ fontSize: 10.6, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>{EMPLOYERS_COPY.intro}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, flex: 1, minHeight: 0 }}>
          <AnchorColumn title="Major Employers" items={employers} />
          <AnchorColumn title="Academic Anchors" items={education} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
