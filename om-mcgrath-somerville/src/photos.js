/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's photo set). Each page is a PhotoGallery: a `hero` fills the top with a
   row of `tiles` beneath, or (no hero) `tiles` lay out as a 2×2 grid.

   McGrath Apartments — 416-422 McGrath Highway, Somerville MA. Drone exteriors,
   gut-renovated kitchens/baths/bedrooms, and the East Somerville site context.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Aerial', accent: '& Site',
    subtitle: 'Direct frontage on McGrath Highway (Route 28), minutes from downtown Boston, Cambridge, and Assembly Row.',
    hero: '/photos/aerial-1.jpg',
    tiles: ['/photos/aerial-2.jpg', '/photos/aerial-3.jpg', '/photos/ext-1.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Interiors —', accent: 'Kitchens, Baths & Bedrooms',
    subtitle: 'Open kitchens with stainless appliances and granite counters, two full baths per unit, and bright bedrooms across spacious 3–4 BR layouts with refinished hardwood.',
    hero: '/photos/apt-1.jpg',
    tiles: ['/photos/apt-3.jpg', '/photos/apt-5.jpg', { src: '/photos/apt-7.jpg', rotate: -90 }],
  },
]
