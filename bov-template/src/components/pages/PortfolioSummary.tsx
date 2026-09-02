import { PageHeader, PageFooter } from '../Shell.tsx'
import { PROPERTIES } from '../../data/properties.ts'
import { fmtNum } from '../../lib/calc.ts'

/* ═══════════════════ PORTFOLIO SUMMARY ═══════════════════
   Rendered only when properties.js holds 2+ entries: one row per property
   with computed totals, ahead of the per-property detail pages. */
export default function PortfolioSummary({ pageNum }: { pageNum?: number }) {
  const totUnits = PROPERTIES.reduce((s, p) => s + (p.stats.units || 0), 0)
  const totGsf = PROPERTIES.reduce((s, p) => s + (p.stats.gsf || 0), 0)
  return (
    <div className="page">
      <PageHeader section="The Portfolio" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">The Properties</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Portfolio <span style={{ color: '#F8971D' }}>Summary</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 9.2 }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Address</th>
              <th style={{ textAlign: 'right' }}>Units</th>
              <th style={{ textAlign: 'right' }}>Gross SF</th>
              <th style={{ textAlign: 'right' }}>Year Built</th>
              <th style={{ textAlign: 'right' }}>Lot (Ac)</th>
            </tr>
          </thead>
          <tbody>
            {PROPERTIES.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td style={{ textAlign: 'right' }}>{p.stats.units ?? '—'}</td>
                <td style={{ textAlign: 'right' }}>{p.stats.gsf ? fmtNum(p.stats.gsf) : '—'}</td>
                <td style={{ textAlign: 'right' }}>{p.stats.yearBuilt ?? '—'}</td>
                <td style={{ textAlign: 'right' }}>{p.stats.lotAcres ?? '—'}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total — {PROPERTIES.length} Properties</strong></td>
              <td />
              <td style={{ textAlign: 'right' }}><strong>{totUnits}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{fmtNum(totGsf)}</strong></td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>

        {/* Photo strip — one tile per property */}
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 0, marginTop: 12 }}>
          {PROPERTIES.map(p => (
            <div key={p.id} style={{ flex: 1, position: 'relative', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(40,27,18,0.75))', color: '#fff', padding: '18px 12px 8px', fontSize: 8.7, fontWeight: 700, letterSpacing: '0.06em' }}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
