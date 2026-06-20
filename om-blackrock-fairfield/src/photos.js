/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo sequence for 2836 Fairfield Avenue (Black Rock Commons), a
   single mixed-use building. Flow: aerial → exterior/grounds → commercial →
   unit interiors (×2) → common areas → basement/storage (incl. the original
   1933 bank vault). Each page renders as a balanced photo grid (PhotoPage
   handles 1–6 tiles). Page numbers are assigned by App in render order.

   PLACEHOLDER BUILD: every `src` points to a branded placeholder in
   public/photos. Drop real, web-sized JPEGs at the SAME filenames to swap
   them in — no code changes needed. */
export const PHOTO_PAGES = [
  {
    section: 'Property Photos', title: 'Aerial', accent: 'Views',
    subtitle: 'Black Rock Commons from above — Fairfield Avenue & Brewster Street',
    images: [
      { src: '/photos/drone-1.jpg', caption: 'Fairfield Avenue Frontage' },
      { src: '/photos/drone-2.jpg', caption: 'Rooftop & On-Site Parking' },
      { src: '/photos/drone-3.jpg', caption: 'Black Rock & the Harbor Beyond' },
      { src: '/photos/drone-4.jpg', caption: 'Corner Site — Fairfield Ave & Brewster St' },
    ],
  },
  {
    section: 'Property Photos', title: 'Exterior', accent: '& Grounds',
    subtitle: 'Front elevation, retail frontage, entries & grounds',
    images: [
      { src: '/photos/exterior-1.jpg', caption: 'Front Elevation — Fairfield Avenue' },
      { src: '/photos/exterior-2.jpg', caption: 'Corner & Retail Frontage' },
      { src: '/photos/exterior-3.jpg', caption: 'Residential Entry & Streetscape' },
      { src: '/photos/exterior-4.jpg', caption: 'Grounds & On-Site Parking' },
    ],
  },
  {
    section: 'Property Photos', title: 'Commercial', accent: 'Space',
    subtitle: 'Unit 102 · Casa Buena Team, LLC · 1,500 SF · leased through Dec 2027',
    images: [
      { src: '/photos/comm-1.jpg', caption: 'Retail Storefront' },
      { src: '/photos/comm-2.jpg', caption: 'Interior Sales Floor' },
      { src: '/photos/comm-3.jpg', caption: 'Fairfield Avenue Visibility' },
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
    subtitle: 'Representative renovated apartments — bedrooms, baths & laundry',
    images: [
      { src: '/photos/apt-5.jpg', caption: 'Bedroom' },
      { src: '/photos/apt-6.jpg', caption: 'Primary Bedroom' },
      { src: '/photos/apt-7.jpg', caption: 'Full Bath' },
      { src: '/photos/apt-8.jpg', caption: 'In-Unit Laundry' },
    ],
  },
  {
    section: 'Property Photos', title: 'Common', accent: 'Areas',
    subtitle: 'Lobby, elevator, corridors & shared laundry',
    images: [
      { src: '/photos/common-1.jpg', caption: 'Lobby & Entry' },
      { src: '/photos/common-2.jpg', caption: 'Passenger Elevator' },
      { src: '/photos/common-3.jpg', caption: 'Corridors' },
      { src: '/photos/common-4.jpg', caption: 'Common Laundry' },
    ],
  },
  {
    section: 'Property Photos', title: 'Basement, Storage', accent: '& Historic Vault',
    subtitle: 'Building systems, tenant storage & the original bank vault',
    images: [
      { src: '/photos/vault-1.jpg', caption: 'Original Bank Vault' },
      { src: '/photos/basement-1.jpg', caption: 'Basement Mechanicals' },
      { src: '/photos/storage-1.jpg', caption: 'Tenant Storage' },
      { src: '/photos/basement-2.jpg', caption: 'Building Systems' },
    ],
    note: 'The original Black Rock Bank & Trust vault remains in the basement — a surviving piece of the building’s 1933 banking history.',
  },
]
