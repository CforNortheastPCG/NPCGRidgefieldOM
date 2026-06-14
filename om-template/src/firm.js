/* ═══════════════════ FIRM DATA ═══════════════════
   TODO: firm data — single source of truth for the Our Locations + Our Team
   pages. Replace the placeholder advisors and office below with the real
   roster. Keep the export SHAPE (arrays of objects with these keys) so the
   page components keep rendering.

   Headshots: drop files in public/photos/team/ and set `photo` to
   e.g. '/photos/team/advisor-name.png'. Until then, members render with an
   initials placeholder avatar, so the page is complete now.
*/

export const OFFICES = [
  { region: 'Office Region', address1: '000 Street Name, Suite 000', address2: 'City, ST 00000', phone: '000.000.0000' },
]

// TODO: set real lat/lng per office — markers are projected onto the East
// Coast map via d3-geo. Placeholder coordinate below is a valid point.
export const OFFICE_MARKERS = [
  { key: 'office-1', lat: 41.0000, lng: -73.0000 }, // TODO: set office coordinates
]

// TODO: replace with real advisors. `photo` may be a URL or '' (empty string
// renders an initials avatar). `url` may be '' to render a non-linked card.
export const LEADERSHIP = [
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
]

export const SENIOR_INVESTMENT_SALES = [
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
]

export const INVESTMENT_SALES = [
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
  { name: 'Advisor Name', title: 'Title, Investments', phone: '000.000.0000', email: 'name@northeastpcg.com', photo: '', url: '' },
]

export const SUPPORT_STAFF = [
  { name: 'Advisor Name', title: 'Title', phone: '000.000.0000', email: 'name@northeastpcg.com' },
]
