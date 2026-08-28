import { PageHeader, PageFooter, PlaceholderBanner, Img } from '../Shell.tsx'
import { COUNTY_PHOTOS } from '../../data/photos.ts'
import { COUNTY_OVERVIEW } from '../../content/index.ts'

export function CountyOverview({ pageNum }: { pageNum?: number }) {
  const c = COUNTY_OVERVIEW
  const [p1, p2] = COUNTY_PHOTOS
  return (
    <div className="page">
      {!c.generated && <PlaceholderBanner what="regional overview" />}
      <PageHeader section={`${c.heading} Overview`} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>
            {c.heading} <span className="accent">Overview</span>
          </div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>{c.intro}</p>
          </div>

          {(c.stats?.length ?? 0) > 0 && (
            <div style={{ marginBottom: 12 }}>
              {c.statsTitle && (
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  {c.statsTitle}
                </div>
              )}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9.6 }}>
                <thead>
                  <tr style={{ background: 'var(--carbon)', color: '#fff' }}>
                    <th style={{ textAlign: 'left', padding: '5px 10px', fontSize: 9.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Metric</th>
                    <th style={{ textAlign: 'right', padding: '5px 10px', fontSize: 9.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.localLabel ?? 'Local'}</th>
                    <th style={{ textAlign: 'right', padding: '5px 10px', fontSize: 9.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.regionLabel ?? 'Region'}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.stats!.map((row, i) => (
                    <tr key={row.metric} style={{ background: i % 2 ? 'var(--linen)' : '#fff' }}>
                      <td style={{ padding: '4px 10px', color: 'var(--carbon)', fontWeight: 600 }}>{row.metric}</td>
                      <td style={{ padding: '4px 10px', textAlign: 'right', color: 'var(--graphite)' }}>{row.local}</td>
                      <td style={{ padding: '4px 10px', textAlign: 'right', color: 'var(--graphite)' }}>{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {c.sources && <div style={{ fontSize: 8.4, color: 'var(--stone)', marginTop: 4 }}>{c.sources}</div>}
            </div>
          )}

          {c.employerGroups.length > 0 && (
            <>
              <div className="eyebrow" style={{ marginBottom: 6 }}>
                {c.employersTitle}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.employerGroups.map((g) => (
                  <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                    <div style={{ fontSize: 10.3, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{g.label}</div>
                    <div style={{ fontSize: 9.6, lineHeight: 1.45, color: 'var(--graphite)' }}>{g.items}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{p1 && <Img src={p1} />}</div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{p2 && <Img src={p2} />}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
