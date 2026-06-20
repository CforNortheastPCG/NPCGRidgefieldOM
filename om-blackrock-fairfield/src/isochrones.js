/* Drive-time isochrones for the regional map.

   PLACEHOLDER BUILD: emptied out. The Ridgefield-derived polylines that shipped
   with this template were centered on Ridgefield and would render incorrectly
   over Black Rock. Regenerate road-network isochrones from 2836 Fairfield Ave
   (e.g. via the Valhalla /isochrone API, costing:auto) and paste the
   Google-encoded polylines below — largest contour first so inner bands paint
   on top. With the array empty, RegionalMap simply omits the drive-time rings. */

export const ISOCHRONES = []
