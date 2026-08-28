import type { LocationMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
// Curate REAL nearby anchors (research them): everyday retail, employment
// anchors (hospitals, universities, major employers), civic landmarks,
// transit. Items with an address get a numbered map pin automatically.
export const LOCATION_MAP: LocationMapContent = {
  generated: true,
  intro:
    'The Bedford Block fronts Elm Street at the north end of downtown Manchester, with the corridor\'s retail and dining within a walk: Market Basket a mile down Elm, the Red Arrow Diner and the Hanover Street restaurant row under a mile south, and Veterans Memorial Park and SNHU Arena along the same spine. Catholic Medical Center and the Dartmouth Health clinics sit directly across the Merrimack, and the Amoskeag Millyard employment district is a few blocks southwest. I-293 interchanges about a half mile away tie the address to the regional network.',
  categories: [
    {
      heading: 'Dining & Retail',
      items: [
        { name: 'Market Basket', note: 'Full grocery anchor · ~1 mi down Elm St', address: '460 Elm St, Manchester, NH' },
        { name: 'Red Arrow Diner', note: 'Manchester institution, open since 1922', address: '61 Lowell St, Manchester, NH' },
        { name: 'The Foundry', note: 'Millyard riverside dining', address: '50 Commercial St, Manchester, NH' },
        { name: 'Firefly Bistro & Bar', note: 'Downtown dining off Elm', address: '22 Concord St, Manchester, NH' },
        { name: 'Puritan Backroom', note: 'North-side landmark restaurant', address: '245 Hooksett Rd, Manchester, NH' },
      ],
    },
    {
      heading: 'Employment & Health',
      items: [
        { name: 'Catholic Medical Center', note: 'Hospital campus across the river', address: '100 McGregor St, Manchester, NH' },
        { name: 'Elliot Hospital', note: 'Manchester\'s largest employer', address: '1 Elliot Way, Manchester, NH' },
        { name: 'Dartmouth Health Clinics', note: 'Outpatient pavilion, west bank', address: '87 McGregor St, Manchester, NH' },
        { name: 'UNH Manchester / Millyard', note: 'University + tech district in the Amoskeag mills', address: '88 Commercial St, Manchester, NH' },
      ],
    },
    {
      heading: 'Civic & Lifestyle',
      items: [
        { name: 'SNHU Arena', note: '10,000-seat downtown arena', address: '555 Elm St, Manchester, NH' },
        { name: 'Palace Theatre', note: 'Historic performing-arts house', address: '80 Hanover St, Manchester, NH' },
        { name: 'Currier Museum of Art', note: 'Nationally noted collection', address: '150 Ash St, Manchester, NH' },
        { name: 'Veterans Memorial Park', note: 'Downtown green + event lawn', address: '723 Elm St, Manchester, NH' },
        { name: 'Arms Park', note: 'Riverfront walk below the mills', address: '10 Arms St, Manchester, NH' },
      ],
    },
    {
      heading: 'Transit & Access',
      items: [
        { name: 'Manchester Transit Authority', note: 'City bus hub, Canal Street', address: '119 Canal St, Manchester, NH' },
        { name: 'Manchester-Boston Regional Airport', note: 'Commercial air service, south side', address: '1 Airport Rd, Manchester, NH' },
        { name: 'I-293 / I-93 interchanges', note: '~0.5 mi to the highway network' },
      ],
    },
  ],
}
