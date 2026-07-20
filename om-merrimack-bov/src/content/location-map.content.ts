import type { LocationMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
// Curate REAL nearby anchors (research them): everyday retail, employment
// anchors (hospitals, universities, major employers), civic landmarks,
// transit. Items with an address get a numbered map pin automatically.
// Pin discipline: pinned items come FIRST in each category (numbers then
// dots), and downtown-core spots within a block or two of the subject or
// of another pin stay list-only so the pins never stack.
export const LOCATION_MAP: LocationMapContent = {
  generated: true,
  intro:
    'The Merrimack fronts Kearney Square at the corner of Merrimack and John Streets — the center of downtown Lowell, with a CoStar pedestrian rating of 100. Dunkin’ trades on the ground floor, Market Basket and Target are within a mile and a half, and Gallagher Terminal — MBTA Lowell Line service to Boston North Station — is 0.9 miles out, a two-minute drive or 16-minute walk. Roughly 12,900 vehicles a day pass the door on Merrimack Street.',
  categories: [
    {
      heading: 'Everyday Essentials',
      items: [
        { name: 'Market Basket', note: 'Full-size supermarket · ~1 mi', address: '331 Fletcher St, Lowell, MA' },
        { name: 'Target', note: 'With in-store CVS pharmacy · ~1.5 mi', address: '181 Plain St, Lowell, MA' },
        { name: 'Food Basket International', note: 'Downtown grocery · 0.3 mi', address: '123 Church St, Lowell, MA' },
        { name: 'El Bombazo Meat Market', note: 'Neighborhood grocer on Bridge St', address: '677 Bridge St, Lowell, MA' },
        { name: 'CVS Pharmacy', note: 'Jackson St · 0.3 mi' },
        { name: 'Dunkin’', note: 'On the ground floor of the building' },
      ],
    },
    {
      heading: 'Dining & Retail',
      items: [
        { name: 'Mill No. 5', note: 'Indie retail & food hall', address: '250 Jackson St, Lowell, MA' },
        { name: 'Life Alive Organic Cafe', note: 'One block away on Middle St' },
        { name: 'Tasty Dumplings', note: 'Downtown dining on Market St' },
        { name: 'Cobblestones of Lowell', note: 'Downtown dining · 0.2 mi' },
        { name: 'Worthen House Cafe', note: 'Historic downtown tavern' },
        { name: 'Merrimack Street retail corridor', note: 'Ground-floor storefronts at the door' },
      ],
    },
    {
      heading: 'Employment & Education',
      items: [
        { name: 'UMass Lowell — University Crossing', note: '18,000+ students · ~1 mi', address: '220 Pawtucket St, Lowell, MA' },
        { name: 'Lowell General Hospital', note: 'Tufts Medicine · ~2,300 employees', address: '295 Varnum Ave, Lowell, MA' },
        { name: 'Cross Point Towers', note: 'Lowell’s largest office complex · ~2 mi', address: '900 Chelmsford St, Lowell, MA' },
        { name: 'Middlesex Community College', note: 'Downtown campus · steps from the door' },
        { name: 'Lowell City Hall', note: 'Civic center · 0.3 mi' },
        { name: 'Lowell Justice Center', note: 'Regional courthouse · 0.4 mi' },
      ],
    },
    {
      heading: 'Transit & Culture',
      items: [
        { name: 'Gallagher Terminal — Lowell Station', note: 'MBTA Lowell Line to North Station · 0.9 mi', address: '101 Thorndike St, Lowell, MA' },
        { name: 'Boott Cotton Mills Museum', note: 'National Historical Park · 2 blocks', address: '115 John St, Lowell, MA' },
        { name: 'Tsongas Center at UMass Lowell', note: '6,500-seat arena', address: '300 Martin Luther King Jr Way, Lowell, MA' },
        { name: 'Lowell Connector', note: 'Direct link to I-495 and Route 3' },
        { name: 'Lowell National Historical Park Visitor Center', note: 'Market St · 2 blocks' },
        { name: 'Manchester–Boston Regional & Logan International', note: 'Each ~46 min by car' },
      ],
    },
  ],
}
