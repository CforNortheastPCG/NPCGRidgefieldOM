/* ═══════════════════ PARCEL GEOMETRY ═══════════════════
   Real parcel boundary for 2836 Fairfield Avenue, pulled from the Connecticut
   State Parcel Layer 2023 (ArcGIS FeatureServer, point-intersect query), which
   aggregates Bridgeport's BEGIS parcels. Coordinates are WGS84 (lat, lng),
   ordered as a closed ring.

   Source: services3.arcgis.com/.../Connecticut_State_Parcel_Layer_2023
           Location "2836 FAIRFIELD AV", Town BRIDGEPORT, Parcel ID 08070-100-55.

   Used by SiteMap.jsx to draw the outline on a Google Static (hybrid) map. */

export const PARCEL = {
  id: '08070-100-55',
  geocode: { lat: 41.157532, lng: -73.226828 },
  // Bounding-box center — what the static map is framed on.
  center: { lat: 41.157669, lng: -73.227078 },
  // Closed ring as [lat, lng] pairs (Google path order).
  ring: [
    [41.1575226628234, -73.2265867909679],
    [41.1573488096424, -73.2268296738612],
    [41.1576563448440, -73.2271786019754],
    [41.1575214832789, -73.2273866598800],
    [41.1575929302244, -73.2274624184012],
    [41.1576931913197, -73.2275691086126],
    [41.1579886968850, -73.2271124006305],
    [41.1575226628234, -73.2265867909679],
  ],
}
