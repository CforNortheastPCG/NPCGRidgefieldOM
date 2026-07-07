/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo sequence for the OM. `kind: 'gallery'` pages render real
   imagery via PhotoGallery (a `hero` fills the top with `tiles` beneath it,
   or `tiles` form a 2×2 grid when there is no hero). `kind: 'comingsoon'`
   pages render PhotoComingSoon placeholder tiles (captions, not image srcs)
   until professional photography is delivered. Page numbers are assigned by
   App in render order.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: 'Photography',
    subtitle: '300 Main Street & 491 Washington Avenue — West Haven, CT',
    hero: '/photos/main/main-aerial-outlined.jpg',
    tiles: ['/photos/main/main-7.jpg', '/photos/main/main-5.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Property', accent: 'Exterior',
    subtitle: 'Tudor-style multifamily on a prominent Allingtown corner',
    tiles: ['/photos/main/main-1.jpg', '/photos/main/main-2.jpg', '/photos/main/main-3.jpg', '/photos/main/main-6.jpg'],
  },
]
