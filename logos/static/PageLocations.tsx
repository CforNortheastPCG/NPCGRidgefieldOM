import type { Bov } from '../../../schema/bov';
import { OFFICES } from '../../../constants/firm';
import { StaticPageShell } from './StaticPageShell';
import EastCoastMap, { type MapMarker } from './eastCoastMap';

// Real lat/lng for each firm office. Projected onto the East Coast map via
// d3-geo so the markers land on actual geography, not eyeballed percentages.
const OFFICE_MARKERS: MapMarker[] = [
  { key: 'portsmouth',   lat: 43.0718, lng: -70.7626 }, // Portsmouth, NH
  { key: 'boston',       lat: 42.3601, lng: -71.0589 }, // Boston, MA
  { key: 'windsor',      lat: 41.8526, lng: -72.6437 }, // Windsor, CT
  { key: 'shelton',      lat: 41.3165, lng: -73.0932 }, // Shelton, CT
  { key: 'providence',   lat: 41.8240, lng: -71.4128 }, // Providence, RI
  { key: 'whiteplains',  lat: 41.0340, lng: -73.7629 }, // White Plains, NY
  { key: 'jacksonville', lat: 30.3322, lng: -81.6557 }, // Jacksonville, FL
];

export default function PageLocations({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Our Locations" hideTitle>
      <div className="locations">
        <div className="locations__map" aria-hidden>
          <EastCoastMap markers={OFFICE_MARKERS} />
        </div>
        <aside className="locations__list">
          <div className="locations__heading">Our Locations</div>
          {OFFICES.map((office) => (
            <div key={office.region} className="locations__office">
              <div className="locations__region">{office.region}</div>
              <div className="locations__addr">{office.address1}</div>
              <div className="locations__addr">{office.address2}</div>
              <div className="locations__phone">{office.phone}</div>
            </div>
          ))}
        </aside>
      </div>
    </StaticPageShell>
  );
}
