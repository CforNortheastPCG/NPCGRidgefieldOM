/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo sequence for 29 West Street (The Granary), a single
   adaptive-reuse apartment building. Flow: aerial → exterior/grounds →
   townhomes → unit interiors (×2) → common areas → basement/storage. Each
   page renders as a balanced photo grid (PhotoPage handles 1–6 tiles). Page
   numbers are assigned by App in render order.

   PLACEHOLDER BUILD: every `src` points to a branded placeholder in
   public/photos. Drop real, web-sized JPEGs at the SAME filenames to swap
   them in — no code changes needed. */
export const PHOTO_PAGES = [
  {
    section: 'Property Photos', title: 'Aerial', accent: 'Views',
    subtitle: 'The Granary from above — West Street, steps from the New Milford Green',
    images: [
      { src: '/photos/drone-1.jpg', caption: 'West Street Frontage' },
      { src: '/photos/drone-2.jpg', caption: 'Rooftop & On-Site Parking' },
      { src: '/photos/drone-3.jpg', caption: 'The Village Center Beyond' },
      { src: '/photos/drone-4.jpg', caption: 'Site — West Street, New Milford' },
    ],
  },
  {
    section: 'Property Photos', title: 'Exterior', accent: '& Grounds',
    subtitle: 'Front elevation, entries, streetscape & grounds',
    images: [
      { src: '/photos/exterior-1.jpg', caption: 'Front Elevation — West Street' },
      { src: '/photos/exterior-2.jpg', caption: 'Building & Streetscape' },
      { src: '/photos/exterior-3.jpg', caption: 'Residential Entry' },
      { src: '/photos/exterior-4.jpg', caption: 'Grounds & On-Site Parking' },
    ],
  },
  {
    section: 'Property Photos', title: 'Townhome', accent: 'Units',
    subtitle: 'Units 105 & 106 · two-bedroom townhomes · ~1,060 SF each',
    rows: [1, 2], // one wide photo on top, two below
    images: [
      { src: '/photos/comm-1.jpg', caption: 'Townhome Living Area' },
      { src: '/photos/comm-2.jpg', caption: 'Two-Story Layout' },
      { src: '/photos/comm-3.jpg', caption: 'Townhome Kitchen' },
    ],
  },
  {
    section: 'Property Photos', title: 'Unit', accent: 'Interiors',
    subtitle: 'Representative renovated apartments — living & kitchens',
    images: [
      { src: '/photos/apt-1.jpg', caption: 'Living Area' },
      { src: '/photos/apt-2.jpg', caption: 'Kitchen' },
      { src: '/photos/apt-3.jpg', caption: 'Open-Concept Living' },
      { src: '/photos/apt-4.jpg', caption: 'Updated Kitchen' },
    ],
  },
  {
    section: 'Property Photos', title: 'Unit', accent: 'Interiors',
    subtitle: 'Representative renovated apartments — bedrooms & baths',
    images: [
      { src: '/photos/apt-5.jpg', caption: 'Bedroom' },
      { src: '/photos/apt-6.jpg', caption: 'Primary Bedroom' },
      { src: '/photos/apt-7.jpg', caption: 'Full Bath' },
      { src: '/photos/apt-8.jpg', caption: 'Renovated Interior' },
    ],
  },
  {
    section: 'Property Photos', title: 'Common', accent: 'Areas',
    subtitle: 'Lobby, corridors, stairs & shared laundry',
    images: [
      { src: '/photos/common-1.jpg', caption: 'Lobby & Entry' },
      { src: '/photos/common-2.jpg', caption: 'Stairwell' },
      { src: '/photos/common-3.jpg', caption: 'Corridors' },
      { src: '/photos/common-4.jpg', caption: 'Common Laundry' },
    ],
  },
  {
    section: 'Property Photos', title: 'Basement, Storage', accent: '& Systems',
    subtitle: 'Building systems, tenant storage & extra usable space',
    images: [
      { src: '/photos/vault-1.jpg', caption: 'Storage Area' },
      { src: '/photos/basement-1.jpg', caption: 'Basement Mechanicals' },
      { src: '/photos/storage-1.jpg', caption: 'Tenant Storage' },
      { src: '/photos/basement-2.jpg', caption: 'Building Systems' },
    ],
    note: 'The building is fully sprinklered (wet system) with oil-fired forced-air heat and central AC.',
  },
]
