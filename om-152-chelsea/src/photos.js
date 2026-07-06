/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Real photography (web-sized exports in public/photos/, sourced from the
   deal's photo set). Each page is a PhotoGallery: a `hero` fills the top with a
   row of `tiles` beneath, or (no hero) `tiles` lay out as a 2×2 grid.

   152–154 Chelsea Street, East Boston MA. Drone photography (front elevations,
   rear/yard shots, and Chelsea Street corridor views with the downtown Boston
   skyline) plus in-unit interior shots.
*/
export const PHOTO_PAGES = [
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'The', accent: 'Property',
    subtitle: 'Five apartments over a brick storefront base on Chelsea Street — plus an adjoining parking lot — between Maverick Square and Day Square.',
    hero: '/photos/front-1.jpg',
    tiles: ['/photos/front-2.jpg', '/photos/front-3.jpg', '/photos/east-1.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Skyline', accent: '& Setting',
    subtitle: 'Downtown Boston reads from the block — the Financial District sits about two miles away through the Sumner Tunnel or two Blue Line stops from Maverick.',
    hero: '/photos/skyline-2.jpg',
    // Bias the crop to the TOP of the frame — the downtown skyline lives in the
    // upper band of these 4:3 drone shots and a centered cover-crop cuts it off.
    heroPosition: 'center top',
    tiles: ['/photos/skyline-1.jpg', '/photos/skyline-3.jpg', '/photos/rear-1.jpg'],
  },
  {
    kind: 'gallery',
    section: 'Property Photography', title: 'Unit', accent: 'Interiors',
    subtitle: 'Functional, well-kept apartments — one-bedrooms at 650 SF and two-bedrooms at 900 SF — with hardwood floors, tiled baths, and full appliance packages.',
    hero: '/photos/interior-kitchen.jpg',
    tiles: ['/photos/interior-living.jpg', '/photos/interior-bed.jpg', '/photos/interior-bath.jpg'],
  },
]
