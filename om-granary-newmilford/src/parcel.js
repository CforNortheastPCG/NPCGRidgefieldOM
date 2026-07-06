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
  geocode: { lat: 41.577200, lng: -73.409000 },
  // Bounding-box center — what the static map is framed on.
  center: { lat: 41.577200, lng: -73.409000 },
  // APPROXIMATE placeholder rectangle (~0.33 ac) as [lat, lng] pairs.
  ring: [
    [41.577360, -73.409220],
    [41.577360, -73.408780],
    [41.577040, -73.408780],
    [41.577040, -73.409220],
    [41.577360, -73.409220],
  ],
}
