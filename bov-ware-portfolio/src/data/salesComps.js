/* ═══════════════════ SALES COMPARABLES ═══════════════════
   Source: NPCG closed-sale database (Cloudflare D1 `npcg-sales-comps`,
   table `sales_comps`), Central and Western Massachusetts multifamily,
   pulled 08.2026. Year built, unit count, gross SF and price per SF are the
   database's own recorded values; photography is the listing image on the
   closed record.

   ⚠ WHAT THIS SET IS, AND IS NOT. These are NPCG's OWN closings, not a full
   market survey — CoStar and the registry carry trades we did not broker.
   They are used because they are verified to the penny and because two are
   in Ware and Belchertown. A complete comparable-sales survey should still
   be run before this deck is presented.

   ⚠ AGE. The three nearest by geography (Ware, Belchertown, Southbridge)
   closed 2020–21 and are stale for a June 2026 opinion. The two most recent
   (Fitchburg 2026, Charlton 2024) are smaller assets in other submarkets.

   ⚠ PHOTOGRAPHY. Only two of the six carry a listing image on the closed
   record; the rest render without one rather than borrow a stand-in. */

export const SALES_COMPS = {
  commentary:
    'The set splits in two. The nearest trades — Ware, Belchertown and Southbridge — closed at $64,600 to $73,600 per unit, but all are five to six years old. The two most recent, Charlton in 2024 and Fitchburg in March 2026, closed at $153,100 and $185,000 per unit on smaller assets. The subject at $127,500 per unit sits between them: well above where this submarket traded in 2020, well below where small Central Massachusetts multifamily has traded since 2024. Cap rates run 7.25% to 9.29%, bracketing the 8.01% going-in yield at the recommended ask.',
  comps: [
    {
      address: '124 Pleasant Street & 156-158 High Street', city: 'Fitchburg, MA', type: '4-Unit Multifamily',
      date: 'March 2026', price: 740000, units: 4, gla: 10198, yearBuilt: 1920, capRate: '7.25%',
      photo: '/photos/comps/fitchburg-pleasant.jpg',
      notes: 'Most recent trade in the set; smaller asset, north-central submarket',
    },
    {
      address: '19 Carroll Hill Road', city: 'Charlton, MA', type: '8-Unit Multifamily',
      date: 'January 2024', price: 1225000, units: 8, gla: 5382, yearBuilt: 1969, capRate: '8.03%',
      photo: null,
      notes: 'Worcester County; cap rate closest to the subject’s going-in yield',
    },
    {
      address: '248 Cross Street', city: 'Gardner, MA', type: '6-Unit Multifamily',
      date: 'September 2021', price: 587000, units: 6, gla: 6804, yearBuilt: 1880, capRate: '9.76%',
      photo: '/photos/comps/gardner-cross.jpg',
      notes: 'Comparable vintage and building size to 27 Parker',
    },
    {
      address: '38 Worcester Street', city: 'Southbridge, MA', type: '12-Unit Multifamily',
      date: 'April 2021', price: 830000, units: 12, gla: 9800, yearBuilt: 1885, capRate: '9.29%',
      photo: null,
      notes: 'Quaboag corridor; same unit count as 28-30 North',
    },
    {
      address: '14-20 Otis Avenue & 48 Park Street', city: 'Ware, MA', type: '14-Unit Portfolio',
      date: 'January 2020', price: 1030000, units: 14, gla: 10656, yearBuilt: 1850, capRate: '—',
      photo: null,
      notes: 'Same town, same multi-parcel structure — but six years stale',
    },
    {
      address: '154 Amherst Road', city: 'Belchertown, MA', type: '12-Unit Multifamily',
      date: 'January 2020', price: 775000, units: 12, gla: 8736, yearBuilt: 1972, capRate: '8.13%',
      photo: null,
      notes: 'Adjacent town; comparable unit count, newer vintage',
    },
  ],
}
