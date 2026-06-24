/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's "OM Photos" folder). Each page is a PhotoGallery: a `hero` fills the
   top with a row of `tiles` beneath, or (no hero) `tiles` lay out as a 2×2 grid.

   Every photo selected in the OM outline is shown across these pages:
     Cover #18 (deal.js) · Aerial #19,#9 · Location/Area #3,#7
     Exterior #21,#14,#52,#26 · Commercial Interiors #46,#29,#30,#51,#48,#49,#45
     Apartments #42,#37,#40,#39,#31
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: '& Site',
    hero: '/photos/aerial-4.jpg',
    // Anchor lower in the frame so the building at the bottom isn't cropped.
    heroPosition: 'center bottom',
    tiles: ['/photos/aerial-2.jpg', '/photos/area-1.jpg', '/photos/area-2.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Retail', accent: 'Exteriors',
    hero: '/photos/ext-1.jpg',
    tiles: ['/photos/ext-2.jpg', '/photos/ext-3.jpg', '/photos/ext-4.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Commercial', accent: 'Interiors',
    subtitle: 'Smoke & vape, package store, nail salon, laundromat, and service suites.',
    hero: '/photos/comm-1.jpg',
    tiles: ['/photos/comm-2.jpg', '/photos/comm-3.jpg', '/photos/comm-4.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Commercial Interiors', accent: '(cont.)',
    hero: '/photos/comm-5.jpg',
    tiles: ['/photos/comm-6.jpg', '/photos/comm-7.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Apartments', accent: '& Units',
    subtitle: 'Ten second-floor apartments with private rear ground-level access.',
    hero: '/photos/apt-2.jpg',
    tiles: ['/photos/apt-1.jpg', '/photos/apt-3.jpg', '/photos/apt-4.jpg', '/photos/apt-5.jpg'],
  },
]
