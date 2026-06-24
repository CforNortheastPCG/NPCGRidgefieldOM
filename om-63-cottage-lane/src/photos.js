/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's photo set). Each page is a PhotoGallery: a `hero` fills the top with a
   row of `tiles` beneath, or (no hero) `tiles` lay out as a 2×2 grid.

   Cottage Lane Multifamily — 63 Cottage Lane, Concord MA. Drone exteriors and a
   mix of updated and value-add studio / one-bedroom interiors.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: '& Site',
    subtitle: 'A short walk from Concord Center and the MBTA Fitchburg Line station, framed by conservation land and historic downtown.',
    hero: '/photos/aerial-1.jpg',
    tiles: ['/photos/aerial-2.jpg', '/photos/aerial-3.jpg', '/photos/aerial-4.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Interiors —', accent: 'Kitchens, Baths & Bedrooms',
    subtitle: 'A mix of updated and value-add studio and one-bedroom layouts with eat-in kitchens, full baths, and bright bedrooms.',
    hero: '/photos/apt-1.jpg',
    tiles: ['/photos/apt-3.jpg', '/photos/apt-5.jpg', '/photos/apt-7.jpg'],
  },
]
