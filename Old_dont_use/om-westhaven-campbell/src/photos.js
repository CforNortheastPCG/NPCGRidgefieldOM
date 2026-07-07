/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo sequence for the OM. `kind: 'gallery'` pages render real
   imagery via PhotoGallery (a `hero` fills the top with `tiles` beneath it,
   or `tiles` form a 2×2 grid when there is no hero). Page numbers are
   assigned by App in render order.

   Building split is a best-read from the aerials (street/corner shots from
   the south = 590–598; close aerials favoring the north building = 600–608)
   — swap tiles here if a shot is attributed to the wrong building.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: 'Photography',
    subtitle: '590–608 Campbell Avenue — West Haven, CT',
    hero: '/photos/campbell/campbell-aerial-outlined.jpg',
    heroPosition: 'center bottom', // keep the rear garages in frame
    tiles: ['/photos/campbell/campbell-16.jpg', '/photos/campbell/campbell-10.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Property', accent: 'Exteriors',
    subtitle: 'Two courtyard apartment buildings on Campbell Avenue',
    tiles: ['/photos/campbell/campbell-11.jpg', '/photos/campbell/campbell-3.jpg', '/photos/campbell/campbell-15.jpg', '/photos/campbell/campbell-5.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Grounds &', accent: 'Garages',
    subtitle: 'Landscaped courtyards, rear grounds, and 12 private garages',
    hero: '/photos/campbell/campbell-6.jpg',
    tiles: ['/photos/campbell/campbell-7.jpg', '/photos/campbell/campbell-8.jpg'],
  },
]
