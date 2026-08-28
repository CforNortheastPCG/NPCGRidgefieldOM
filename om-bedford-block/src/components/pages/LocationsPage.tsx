import { StaticShell } from '../Shell.tsx'
import { EastCoastMap } from '../EastCoastMap.tsx'
import { OFFICES, OFFICE_MARKERS } from '../../data/firm.ts'

/* ═══════════ OUR LOCATIONS (protected, firm-static) ═══════════ */

export function LocationsPage({ pageNum }: { pageNum?: number }) {
  return (
    <StaticShell section="Our Locations" title="Our Locations" pageNum={pageNum}>
      <div className="loc">
        <div className="loc__map" aria-hidden="true">
          <EastCoastMap markers={OFFICE_MARKERS} />
        </div>

        <div className="loc__rule" />

        <aside className="loc__list">
          {OFFICES.map((office) => (
            <div key={office.region} className="loc__office">
              <div className="loc__region">{office.region}</div>
              <div className="loc__addr">{office.address1}</div>
              <div className="loc__addr">{office.address2}</div>
              <div className="loc__phone">{office.phone}</div>
            </div>
          ))}
        </aside>
      </div>
    </StaticShell>
  )
}
