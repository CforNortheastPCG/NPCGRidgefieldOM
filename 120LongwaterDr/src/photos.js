/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's "NORWELL - 120 Longwater Dr/Photos" folder). Each page is a
   PhotoGallery: a `hero` fills the top with a row of `tiles` beneath.

   Available imagery is limited to four shots — an architectural rendering, the
   real front-entrance exterior, and two interior commons (lobby + atrium). When
   a full photo shoot is delivered, add gallery pages here. */
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Building &', accent: 'Interiors',
    subtitle: 'Two-story, ±51,035 SF multi-tenant office — front entrance, stone-and-glass commons, and the skylit central atrium.',
    hero: '/photos/rendering.jpg',
    tiles: ['/photos/exterior.jpg', '/photos/lobby.jpg', '/photos/atrium.jpg'],
  },
]
