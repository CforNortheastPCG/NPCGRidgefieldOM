/* ═══════════════════ EDIT-ME · PHOTO PAGES ═══════════════════
   Optional photo pages after Property Information. Each entry renders as a
   balanced photo grid (PhotoPage handles 1–6 tiles per page). Delete all
   entries to ship a BOV with no photo pages — the TOC renumbers itself.

   PHOTOS: sourced from the Hadley Portfolio Day 2 shoot, resized to 1600px.
   ⚠ NO UNIT INTERIORS WERE SUPPLIED — the template's "Unit Interiors" page
   has been replaced with an aerial/site page. Add an interiors page back
   once interior photography is available. */
export const PHOTO_PAGES = [
  {
    section: 'Property Photos', title: 'Exterior', accent: '& Streetscape',
    subtitle: 'Tudor Revival elevations along Main Street & Washington Avenue',
    images: [
      { src: '/photos/exterior-1.jpg', caption: 'Front Elevation — Main Street' },
      { src: '/photos/exterior-2.jpg', caption: 'Corner Elevation & Entry' },
      { src: '/photos/exterior-3.jpg', caption: 'Washington Avenue Streetscape' },
      { src: '/photos/exterior-4.jpg', caption: 'Roof & Building Footprint' },
    ],
  },
  {
    section: 'Property Photos', title: 'Site', accent: '& Aerials',
    subtitle: 'Parcel boundary, corner position & surrounding West Haven context',
    images: [
      { src: '/photos/aerial-1.jpg', caption: 'Approximate Parcel Boundary' },
      { src: '/photos/aerial-2.jpg', caption: 'Main & Washington Corner' },
      { src: '/photos/aerial-3.jpg', caption: 'Rear Wing & Neighborhood' },
      { src: '/photos/aerial-4.jpg', caption: 'Adjacent Parking Field' },
    ],
  },
]
