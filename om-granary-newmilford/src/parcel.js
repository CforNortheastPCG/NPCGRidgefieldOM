/* ═══════════════════ PARCEL GEOMETRY ═══════════════════
   APPROXIMATE placeholder parcel boundary for 29 West Street, New Milford, CT.
   The precise ring should be pulled from the Connecticut State Parcel Layer
   (ArcGIS FeatureServer, point-intersect query) for New Milford — PID 4961,
   Mblu 28/4 / 160 — and dropped in here. Coordinates are WGS84 (lat, lng),
   ordered as a closed ring.

   TODO: replace `ring` with the recorded New Milford parcel outline (0.33 ac).
   The box below is a rough rectangle centered on the property so the SiteMap
   renders a correctly-centered aerial in the meantime.

   Used by SiteMap.jsx to draw the outline on a Google Static (hybrid) map. */

export const PARCEL = {
  id: 'NEW-MILFORD-PID-4961',
  // Rooftop geocode for 29 West Street, New Milford, CT 06776 (Google, verified
  // by reverse-geocode to "29 West St"). The rooftop point sits on the West
  // Street frontage; the parcel/building extends south-east of it.
  geocode: { lat: 41.5743564, lng: -73.4116566 },
  // Bounding-box center — what the static map is framed on. Centered on the
  // parcel (building + rear yard/parking), not the frontage geocode.
  center: { lat: 41.574210, lng: -73.411500 },
  // APPROXIMATE parcel rectangle (~0.33 ac, ~50m N-S × ~26m E-W) traced over the
  // building footprint and paved lot from the aerial, as [lat, lng] pairs.
  // Replace with the recorded outline when the survey is available.
  ring: [
    [41.574435, -73.411656],
    [41.574435, -73.411344],
    [41.573985, -73.411344],
    [41.573985, -73.411656],
    [41.574435, -73.411656],
  ],
}
