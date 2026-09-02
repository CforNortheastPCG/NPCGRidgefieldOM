import EastCoastMap from '../EastCoastMap.tsx'
import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle, BlockLabel } from '../Blocks.tsx'
import { IconDisc } from '../Icons.tsx'
import { OFFICES, OFFICE_MARKERS, LOCATIONS_NARRATIVE } from '../../data/firm.ts'

/* ═══════════════════ OUR LOCATIONS ═══════════════════
   "Local Presence. Regional Collaboration." — the halftone East-Coast map
   beside the argument for a multi-office firm, with the office directory
   pinned to the foot of the page. Narrative + directory: src/data/firm.js. */
export default function LocationsPage({ pageNum }: { pageNum?: number }) {
  const { lead, items, close } = LOCATIONS_NARRATIVE
  return (
    <div className="page">
      <PageHeader section="Our Locations" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle title="Our" accent="Locations" subtitle="Local Presence. Regional Collaboration." />

        <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: 28, flex: 1, minHeight: 0, marginTop: 4 }}>
          <div style={{ minHeight: 0, display: 'flex' }} aria-hidden="true">
            <EastCoastMap markers={OFFICE_MARKERS} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
            <div style={{ fontSize: 10.6, fontWeight: 700, lineHeight: 1.45, color: 'var(--carbon)', marginBottom: 12 }}>{lead}</div>

            {items.map(it => (
              <div key={it.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                <IconDisc name={it.icon} size={34} />
                <div style={{ fontSize: 9.2, lineHeight: 1.5, color: 'var(--graphite)', minWidth: 0 }}>
                  <span style={{ fontWeight: 800, color: 'var(--golden)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 8.8 }}>{it.label}: </span>
                  {it.body}
                </div>
              </div>
            ))}

            <div style={{ fontSize: 9.8, fontWeight: 700, lineHeight: 1.45, color: 'var(--carbon)', margin: '2px 0 14px' }}>{close}</div>

            {/* Directory — pinned to the foot so the page ends on how to reach us. */}
            <BlockLabel accent="var(--golden)" style={{ borderTop: '2px solid var(--golden)', paddingTop: 9, marginTop: 'auto', marginBottom: 7 }}>
              Our Locations
            </BlockLabel>
            <div style={{ columnCount: 3, columnGap: 20 }}>
              {OFFICES.map(o => (
                <div key={o.region} style={{ breakInside: 'avoid', marginBottom: 9 }}>
                  <div style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--golden)', lineHeight: 1.3 }}>{o.region}</div>
                  <div style={{ fontSize: 8.2, lineHeight: 1.4, color: 'var(--graphite)' }}>{o.address1}</div>
                  {o.address2.split('·').map(line => (
                    <div key={line} style={{ fontSize: 8.2, lineHeight: 1.4, color: 'var(--graphite)' }}>{line.trim()}</div>
                  ))}
                  <div style={{ fontSize: 8.2, lineHeight: 1.4, fontWeight: 700, color: 'var(--carbon)' }}>{o.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
