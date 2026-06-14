/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   Ordered photo + floor plan sequence for the OM, grouped per building
   (A → B → C). Photography by RISE Media; the specific shots below are
   Taylor's selection (per his handwritten shot list, June 2026). Source
   masters live in /RISE MEDIA (gitignored); web-sized exports are in
   public/photos/buildings — filenames carry the RISE photo number
   (e.g. a-63.jpg = RISE "613 Main St-63" in folder A).

   Pages with `plan` render as a full-page floor plan (FloorPlanPage); pages
   with `images` render as a balanced photo grid (PhotoPage handles 3–6 tiles).
   Page numbers are assigned by App in render order. */
export const PHOTO_PAGES = [
  /* ── Building A — Victorian Main House (Unit A1 + systems) ── */
  {
    section: 'Building A — Interior', title: 'Building A —', accent: 'Living & Kitchen',
    subtitle: 'Victorian Main House · Unit A1 (2BR)',
    images: [
      { src: '/photos/buildings/a-8.jpg', caption: 'Living Area' },
      { src: '/photos/buildings/a-9.jpg', caption: 'Living Area' },
      { src: '/photos/buildings/a-13.jpg', caption: 'Kitchen' },
      { src: '/photos/buildings/a-15.jpg', caption: 'Mudroom & Entry' },
    ],
  },
  {
    section: 'Building A — Interior', title: 'Building A —', accent: 'Bedroom & Bath',
    subtitle: 'Victorian Main House · Unit A1 (2BR)',
    images: [
      { src: '/photos/buildings/a-2.jpg', caption: 'Bedroom' },
      { src: '/photos/buildings/a-7.jpg', caption: 'Bath' },
      { src: '/photos/buildings/a-11.jpg', caption: 'Bath' },
      { src: '/photos/buildings/a-19.jpg', caption: 'In-Unit Laundry' },
    ],
  },
  {
    section: 'Building A — Mechanicals', title: 'Building A —', accent: 'Systems',
    subtitle: 'Victorian Main House · Basement mechanicals',
    images: [
      { src: '/photos/buildings/a-20.jpg', caption: 'Individual Water Meters' },
      { src: '/photos/buildings/a-63.jpg', caption: 'Heating & Hot Water' },
      { src: '/photos/buildings/a-64.jpg', caption: 'Tankless Systems' },
      { src: '/photos/buildings/a-65.jpg', caption: 'Boiler' },
      { src: '/photos/buildings/a-66.jpg', caption: 'Utility Area' },
    ],
  },
  {
    section: 'Building A — Common & Exterior', title: 'Building A —', accent: 'Common Areas & Exterior',
    subtitle: 'Victorian Main House · Shared stairwell, grounds & frontage',
    images: [
      { src: '/photos/buildings/a-69.jpg', caption: 'Common Stairwell' },
      { src: '/photos/buildings/a-71.jpg', caption: 'Common Stairwell' },
      { src: '/photos/buildings/a-77.jpg', caption: 'Exterior' },
      { src: '/photos/buildings/a-73.jpg', caption: 'Patio & Grounds' },
      { src: '/photos/buildings/a-74.jpg', caption: 'Parking & Mail' },
    ],
  },
  {
    section: 'Building A — Floor Plan', title: 'Building A —', accent: 'Floor Plan',
    subtitle: 'Unit A1 · 911 SF · Representative unit',
    plan: '/photos/floorplans/unit-a1.jpg',
  },

  /* ── Building B — Townhouses w/ Garage ──
        NOTE: placeholder exterior imagery — dedicated Building B exterior
        photography is pending from RISE; swap in when delivered. */
  {
    section: 'Building B — Exterior', title: 'Building B —', accent: 'Exterior',
    subtitle: 'Townhouses w/ Garage · 3 Units (2BR/1.5BA)',
    images: [
      { src: '/photos/Exterior Edit 4.png', caption: 'Front Elevation' },
    ],
    note: 'Representative exterior imagery — final professional photography of Building B to follow.',
  },
  {
    section: 'Building B — Interior', title: 'Building B —', accent: 'Kitchen & Living',
    subtitle: 'Townhouses w/ Garage · 3 Units (2BR/1.5BA)',
    images: [
      { src: '/photos/buildings/b-21.jpg', caption: 'Kitchen' },
      { src: '/photos/buildings/b-25.jpg', caption: 'Living Area' },
      { src: '/photos/buildings/b-27.jpg', caption: 'Living & Stairs' },
      { src: '/photos/buildings/b-29.jpg', caption: 'Living Area' },
    ],
  },
  {
    section: 'Building B — Interior', title: 'Building B —', accent: 'Bedrooms, Bath & Systems',
    subtitle: 'Townhouses w/ Garage · Bedrooms, bath, garage & mechanicals',
    images: [
      { src: '/photos/buildings/b-32.jpg', caption: 'Bedroom' },
      { src: '/photos/buildings/b-34.jpg', caption: 'Primary Bedroom' },
      { src: '/photos/buildings/b-31.jpg', caption: 'Bath' },
      { src: '/photos/buildings/b-41.jpg', caption: 'Garage' },
      { src: '/photos/buildings/b-39.jpg', caption: 'Mechanicals & Laundry' },
      { src: '/photos/buildings/b-42.jpg', caption: 'Entry Foyer' },
    ],
  },
  {
    section: 'Building B — Floor Plan', title: 'Building B —', accent: 'Floor Plan',
    subtitle: 'Unit B3 · 984 SF + Garage & Utility · Representative unit',
    plan: '/photos/floorplans/unit-b3.jpg',
  },

  /* ── Building C — Townhouses w/ Basement ──
        NOTE: placeholder exterior imagery — dedicated Building C exterior
        photography is pending from RISE; swap in when delivered. */
  {
    section: 'Building C — Exterior', title: 'Building C —', accent: 'Exterior',
    subtitle: 'Townhouses w/ Basement · 3 Units (2BR/1.5BA)',
    images: [
      { src: '/photos/Exterior Edit 1.png', caption: 'Front Elevation' },
    ],
    note: 'Representative exterior imagery — final professional photography of Building C to follow.',
  },
  {
    section: 'Building C — Interior', title: 'Building C —', accent: 'Living & Kitchen',
    subtitle: 'Townhouses w/ Basement · 3 Units (2BR/1.5BA)',
    images: [
      { src: '/photos/buildings/c-55.jpg', caption: 'Living & Kitchen' },
      { src: '/photos/buildings/c-56.jpg', caption: 'Living & Stairs' },
      { src: '/photos/buildings/c-58.jpg', caption: 'Kitchen & Dining' },
      { src: '/photos/buildings/c-54.jpg', caption: 'Living Area' },
    ],
  },
  {
    section: 'Building C — Mechanicals', title: 'Building C —', accent: 'Basement & Systems',
    subtitle: 'Townhouses w/ Basement · Full basement + mechanicals',
    images: [
      { src: '/photos/buildings/c-50.jpg', caption: 'Forced Air System' },
      { src: '/photos/buildings/c-49.jpg', caption: 'Water Meter & Expansion Tank' },
      { src: '/photos/buildings/c-52.jpg', caption: 'Basement Laundry' },
      { src: '/photos/buildings/c-53.jpg', caption: 'Basement Storage' },
    ],
  },
  {
    section: 'Building C — Floor Plan', title: 'Building C —', accent: 'Floor Plan',
    subtitle: 'Unit C2 · Representative unit',
    plan: '/photos/floorplans/unit-c2.jpg',
  },
]
