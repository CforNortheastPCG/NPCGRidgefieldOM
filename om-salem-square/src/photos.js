/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's "OM Photos" folder). Each page is a PhotoGallery: a `hero` fills the
   top with a row of `tiles` beneath, or (no hero) `tiles` lay out as a 2×2 grid.

   Every photo selected in the OM outline is shown across these pages:
     Cover #28 (deal.js) · Aerial #1 · Location/Area #7,#6 · Parcel #11,#20,#21
     Exterior #27,#37,#29,#38,#56,#57,#58,#63,#53,#65
     Commercial Interiors #70,#72,#59,#60,#67,#68 · Apartments #51
   NOTE: outline also lists apartments #46–#50, which were not in the supplied
   OM Photos folder — add those files and a tile when available.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: '& Site',
    hero: '/photos/aerial-1.jpg', heroPosition: '50% 80%',
    tiles: ['/photos/area-1.jpg', '/photos/area-2.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Development', accent: 'Parcel',
    subtitle: '±1.69 acres of entitled land on the same lot — approved for 51 units.',
    hero: '/photos/parcel-1.jpg',
    tiles: [{ src: '/photos/parcel-2.jpg', pos: '50% 80%' }, '/photos/parcel-3.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Retail', accent: 'Exteriors',
    hero: '/photos/ext-1.jpg',
    tiles: ['/photos/ext-2.jpg', '/photos/ext-3.jpg', '/photos/ext-4.jpg', '/photos/ext-5.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Retail Exteriors', accent: '(cont.)',
    hero: '/photos/ext-6.jpg',
    tiles: ['/photos/ext-7.jpg', '/photos/ext-8.jpg', '/photos/ext-9.jpg', '/photos/ext-10.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Commercial', accent: 'Interiors',
    hero: '/photos/comm-1.jpg',
    tiles: ['/photos/comm-2.jpg', '/photos/comm-3.jpg', '/photos/comm-4.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Commercial', accent: 'Space',
    subtitle: 'Ground-floor retail and service suites fronting New Haven Road.',
    hero: '/photos/comm-5.jpg',
    tiles: ['/photos/comm-6.jpg'],
  },
  {
    kind: 'comingsoon',
    section: 'Property Photography', title: 'Apartment', accent: 'Interiors',
    subtitle: 'Interior photography of the in-building apartments to follow.',
    tiles: ['Living', 'Kitchen', 'Bedroom', 'Bath'],
  },
]
