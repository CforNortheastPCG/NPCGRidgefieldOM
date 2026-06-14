/* ═══════════════════ PHOTO PAGES DATA ═══════════════════
   TODO: photo pages — drop professional photography in and switch a page to
   `kind: 'gallery'`. Until imagery is delivered, every page is a "coming soon"
   placeholder (rendered by PhotoComingSoon). Page numbers are assigned by App
   in render order.

   To go live: set a page `kind: 'gallery'`, add a `hero` and/or `tiles` array
   of image paths (e.g. '/photos/property/exterior-1.jpg'), and PhotoGallery
   will render the real imagery.
*/
export const PHOTO_PAGES = [
  {
    kind: 'comingsoon',
    section: 'Property Photography', title: 'Aerial', accent: 'Photography',
    subtitle: 'TODO: aerial / drone photography',
    tiles: ['Aerial', 'Site Context', 'Street View', 'Rooftop'],
  },
  {
    kind: 'comingsoon',
    section: 'Property Photography', title: 'Property', accent: 'Exteriors',
    subtitle: 'TODO: exterior photography',
    tiles: ['Front Elevation', 'Entry', 'Courtyard', 'Rear'],
  },
  {
    kind: 'comingsoon',
    section: 'Property Photography', title: 'Interiors', accent: '& Amenities',
    subtitle: 'TODO: interior & amenity photography',
    tiles: ['Living', 'Kitchen', 'Bath', 'Common Area'],
  },
  {
    kind: 'comingsoon',
    section: 'Property Photography', title: 'Grounds &', accent: 'Parking',
    subtitle: 'TODO: grounds, parking & floor-plan imagery',
    tiles: ['Grounds', 'Parking', 'Mechanical', 'Floor Plans'],
  },
]
