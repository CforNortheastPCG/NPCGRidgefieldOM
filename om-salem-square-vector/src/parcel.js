/* ═══════════════════ PARCEL GEOMETRY ═══════════════════
   Real parcel boundary for Salem Square (marketed 628 New Haven Road; assessor
   668 New Haven Road), Naugatuck CT, pulled from the Borough of Naugatuck GIS
   (mapxpress ArcGIS MapServer), point-intersected at the Google rooftop geocode.
   Coordinates are WGS84 (lat, lng), ordered as a closed ring.

   Why the local layer and not the statewide one: the CT State Parcel Layer 2023
   is stale here (it shows ~1.53 ac for 668 New Haven Rd). The local Naugatuck
   layer returns the current ~2.69-ac footprint that contains the rooftop point —
   independently verified at 2.715 ac / 118,269 SF (shoelace), matching the deal.

   Source: cloud1.mapxpress.net/.../Naugatuck_CT_First_Due/MapServer/14,
           OBJECTID 9753 (local MBL 49-115). Assessor: MBL N-5E211 ·
           VisionPID 7366 · Parcel ID 048-3303 · owner IOSA John J + Ann.

   Used by SiteMap.jsx to draw the outline on a Google Static (hybrid) map. */

export const PARCEL = {
  id: 'N-5E211 (VisionPID 7366 · 048-3303)',
  geocode: { lat: 41.478096, lng: -73.046652 }, // Google rooftop, 628 New Haven Rd
  // Bounding-box center — what the static map is framed on.
  center: { lat: 41.4782735, lng: -73.0468333 },
  // Closed ring as [lat, lng] pairs (Google path order).
  ring: [
    [41.47899671, -73.04680865],
    [41.47885253, -73.04687945],
    [41.47824102, -73.04645513],
    [41.47800050, -73.04595906],
    [41.47748592, -73.04635490],
    [41.47761754, -73.04658675],
    [41.47776766, -73.04680681],
    [41.47793091, -73.04701425],
    [41.47808060, -73.04716778],
    [41.47813345, -73.04722773],
    [41.47819130, -73.04728288],
    [41.47825370, -73.04733282],
    [41.47832020, -73.04737716],
    [41.47838377, -73.04742789],
    [41.47845020, -73.04747481],
    [41.47851926, -73.04751776],
    [41.47859072, -73.04755659],
    [41.47865410, -73.04759428],
    [41.47871961, -73.04762815],
    [41.47878700, -73.04765807],
    [41.47887195, -73.04769187],
    [41.47891129, -73.04770762],
    [41.47906110, -73.04678948],
    [41.47899671, -73.04680865],
  ],
}
