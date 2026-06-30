import EastCoastMap from './EastCoastMap.jsx'
import { StaticShell } from './Shell.jsx'
import { OFFICES, OFFICE_MARKERS } from './firm.js'

/* ═══════════════════ OUR LOCATIONS ═══════════════════
   Halftone East-Coast map alongside the firm's office directory,
   on the standard white page shell. */
export default function LocationsPage({ pageNum }) {
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
