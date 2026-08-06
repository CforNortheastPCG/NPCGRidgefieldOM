/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Native photo-gallery pages (web-sized exports in public/photos/). Most of the
   building / tenant / map imagery for Copps Hill is lifted from the original
   Canva deck (public/maps/, wired directly in App.jsx); this gallery showcases
   the renovated residential interiors that the building-overview pages only
   hint at. Each page is a PhotoGallery: a `hero` fills the top with a row of
   `tiles` beneath. */
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Residential', accent: 'Interiors',
    subtitle: 'Renovated apartments above the retail at 107 Danbury Road.',
    hero: '/photos/apt-1.jpg',
    tiles: ['/photos/apt-2.jpg', '/photos/apt-3.jpg'],
  },
]
