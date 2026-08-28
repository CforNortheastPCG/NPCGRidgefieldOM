import { PageHeader, PageFooter, PlaceholderBanner, Md, Img } from '../Shell.tsx'
import { EXEC_TILES, SUMMARY_ROWS } from '../../data/financials-display.ts'
import { EXEC_PHOTO } from '../../data/photos.ts'
import { EXEC_SUMMARY } from '../../content/index.ts'

export function ExecutiveSummary({ pageNum }: { pageNum?: number }) {
  return (
    <div className="page">
      {!EXEC_SUMMARY.generated && <PlaceholderBanner what="executive summary" />}
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(EXEC_TILES.length, 2)}, 1fr)`,
                gap: 10,
                marginBottom: 12,
              }}
            >
              {EXEC_TILES.slice(0, 4).map((t) => (
                <div className="stat-tile" key={t.l}>
                  <div className="st-val">{t.v}</div>
                  <div className="st-label">{t.l}</div>
                </div>
              ))}
            </div>
            <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>
              Property Overview
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {EXEC_SUMMARY.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                  <Md text={p} />
                </p>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            {EXEC_PHOTO && (
              <div style={{ flex: '0 0 44%', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
                <Img src={EXEC_PHOTO} />
              </div>
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>
                Offering Summary
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {SUMMARY_ROWS.map(([l, v], i) => (
                  <div
                    key={l}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '4px 2px',
                      borderBottom: i < SUMMARY_ROWS.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 10.5, color: 'var(--graphite)' }}>{l}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
