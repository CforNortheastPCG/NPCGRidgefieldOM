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
    subtitle: '711 Savin Avenue — West Haven, CT',
    hero: '/photos/williston/williston-aerial-outlined.jpg',
    // Bottom-right tile is anchored to the photo's bottom so the building
    // stays in frame (crops sky instead); the others keep the default crop.
    tiles: ['/photos/williston/williston-4.jpg', { src: '/photos/williston/williston-6.jpg', pos: 'center bottom' }],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Property', accent: 'Exterior',
    subtitle: 'Four-story brick elevator building on Savin Avenue',
    tiles: ['/photos/williston/williston-1.jpg', '/photos/williston/williston-3.jpg', '/photos/williston/williston-5.jpg', '/photos/williston/williston-2.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Unit', accent: 'Interiors',
    subtitle: 'Representative in-unit conditions — spacious layouts with through-wall AC',
    tiles: ['/photos/williston/williston-9.jpg', '/photos/williston/williston-12.jpg', '/photos/williston/williston-10.jpg', '/photos/williston/williston-13.jpg'],
  },
]
