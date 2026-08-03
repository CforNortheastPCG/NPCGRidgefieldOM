/* ═══════════════════ EDIT-ME · PHOTO PAGES ═══════════════════
   Optional photo pages after Property Information. Each entry renders as a
   balanced photo grid (PhotoPage handles 1–6 tiles per page). Delete all
   entries to ship a BOV with no photo pages — the TOC renumbers itself.

   PLACEHOLDER BUILD: every `src` points to a branded placeholder in
   public/photos. Drop real, web-sized JPEGs at the SAME filenames to swap
   them in — no code changes needed. */
export const PHOTO_PAGES = [
  {
    section: 'Property Photos', title: 'Exterior', accent: '& Grounds',
    subtitle: 'Front elevation, entries, streetscape & grounds', // SAMPLE — replace
    images: [
      { src: '/photos/exterior-1.jpg', caption: 'Building & Grounds' },
      { src: '/photos/exterior-2.jpg', caption: 'Streetscape' },
      { src: '/photos/exterior-3.jpg', caption: 'Residential Entry' },
      { src: '/photos/exterior-4.jpg', caption: 'On-Site Parking' },
    ],
  },
  {
    section: 'Property Photos', title: 'Unit', accent: 'Interiors',
    subtitle: 'Representative unit interiors — living, kitchen, bedroom & bath', // SAMPLE — replace
    images: [
      { src: '/photos/interior-1.jpg', caption: 'Living Area' },
      { src: '/photos/interior-2.jpg', caption: 'Kitchen' },
      { src: '/photos/interior-3.jpg', caption: 'Bedroom' },
      { src: '/photos/interior-4.jpg', caption: 'Full Bath' },
    ],
  },
]
