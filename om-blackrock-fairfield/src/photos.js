/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo sequence for 2836 Fairfield Avenue (Black Rock Commons).
   This is a single mixed-use building, so pages are grouped by content:
   exterior → residential interiors → ground-floor retail → common areas
   & systems. Each page renders as a balanced photo grid (PhotoPage handles
   1–6 tiles). Page numbers are assigned by App in render order.

   PLACEHOLDER BUILD: every `src` points to a branded placeholder in
   public/photos. Drop real, web-sized JPEGs at the SAME filenames to swap
   them in — no code changes needed. */
export const PHOTO_PAGES = [
  {
    section: 'Property Photos', title: 'Building', accent: 'Exterior',
    subtitle: '2836 Fairfield Avenue · Fairfield Avenue frontage & streetscape',
    images: [
      { src: '/photos/exterior-1.jpg', caption: 'Front Elevation — Fairfield Avenue' },
      { src: '/photos/exterior-2.jpg', caption: 'Corner & Retail Frontage' },
      { src: '/photos/exterior-3.jpg', caption: 'Side Elevation & Entry' },
      { src: '/photos/exterior-4.jpg', caption: 'Rear & On-Site Parking' },
    ],
  },
  {
    section: 'Property Photos', title: 'Residential', accent: 'Interiors',
    subtitle: 'Representative renovated apartments — living, kitchen, bedroom & bath',
    images: [
      { src: '/photos/apt-1.jpg', caption: 'Living Area' },
      { src: '/photos/apt-2.jpg', caption: 'Kitchen' },
      { src: '/photos/apt-3.jpg', caption: 'Bedroom' },
      { src: '/photos/apt-4.jpg', caption: 'Bath' },
    ],
  },
  {
    section: 'Property Photos', title: 'Ground-Floor', accent: 'Retail',
    subtitle: 'Unit 102 · Casa Buena Team, LLC · 1,500 SF · leased through Dec 2027',
    images: [
      { src: '/photos/comm-1.jpg', caption: 'Retail Storefront' },
      { src: '/photos/comm-2.jpg', caption: 'Interior Sales Floor' },
      { src: '/photos/comm-3.jpg', caption: 'Fairfield Avenue Visibility' },
    ],
  },
  {
    section: 'Property Photos', title: 'Common Areas', accent: '& Systems',
    subtitle: 'Lobby, elevator, laundry & building mechanicals',
    images: [
      { src: '/photos/common-1.jpg', caption: 'Lobby & Entry' },
      { src: '/photos/common-2.jpg', caption: 'Passenger Elevator' },
      { src: '/photos/common-3.jpg', caption: 'Common Laundry' },
      { src: '/photos/common-4.jpg', caption: 'Building Mechanicals' },
    ],
  },
]
