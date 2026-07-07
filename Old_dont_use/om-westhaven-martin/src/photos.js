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
    subtitle: '254 Main Street & 106–108 Martin Street — West Haven, CT',
    hero: '/photos/martin/martin-aerial-outlined.jpg',
    tiles: ['/photos/martin/martin-4.jpg', '/photos/martin/martin-7.jpg'],
    // Anchor to the bottom of each photo so the outlined buildings stay in
    // frame — crops the sky instead of the property.
    pos: 'center bottom',
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Property', accent: 'Exterior',
    subtitle: 'Three brick masonry buildings on a prominent Allingtown corner',
    tiles: ['/photos/martin/martin-1.jpg', '/photos/martin/martin-2.jpg', '/photos/martin/martin-3.jpg', '/photos/martin/martin-5.jpg'],
  },
]
