import { PageHeader, PageFooter } from '../components/Shell.jsx'

/* ═══════════════════ PROPERTY INFORMATION ═══════════════════
   Four-card overview of one property (site, utilities, unit composition,
   ancillary). Receives a `property` entry from src/data/properties.js —
   App renders one of these per property (portfolio decks get several). */

function Card({ title, rows, flex }) {
  return (
    <div className="bldg-card" style={{ padding: '7px 12px', flex, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <h3 style={{ fontSize: 11, marginBottom: 4, paddingBottom: 3 }}>{title}</h3>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {rows.map(r => (
          <div key={r.label} className="bldg-row">
            <span className="bldg-label">{r.label}</span>
            <span className="bldg-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PropertyPage({ property, showName = false, pageNum }) {
  const p = property
  return (
    <div className="page">
      <PageHeader section="Property Information" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>
          {showName ? <>{p.name} <span style={{ color: '#F8971D' }}>Overview</span></> : <>Property <span style={{ color: '#F8971D' }}>Information</span></>}
        </div>
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            <Card title="Site Summary" rows={p.siteRows} flex={3} />
            <Card title="Utilities & Mechanicals" rows={p.utilityRows} flex={1.6} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            {p.photo && (
              <div style={{ flex: 1.4, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
                <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            <Card title="Unit Composition" rows={p.unitCompositionRows} flex={1.2} />
            <Card title="Ancillary & Occupancy" rows={p.ancillaryRows} flex={1} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
