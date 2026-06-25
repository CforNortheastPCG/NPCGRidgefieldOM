/* ═══════════════════ COURTHOUSE SQUARE — CLOSING FLYER ═══════════════════
   One-page landscape "Just Sold" flyer for Courthouse Square Apartments
   (Westfield, MA). Same NPCG closing-flyer system as flyers/src/Closing.jsx —
   full-bleed cover, stat ladder on a left scrim, deal-contact bar.
   Render: node print-portfolio.cjs
*/

export const PORTFOLIO = {
  name: 'Courthouse Square Apartments',
  subtitle: '27 Washington Street · Westfield, MA 01085',
  status: 'Just Sold',
  hero: '/properties/cover-shot.png',
  heroPos: '54% center',
  stats: [
    { l: 'Sale Price', v: '$3,325,000' },
    { l: 'Units', v: '22' },
    { l: 'Price / Unit', v: '$151,136' },
    { l: 'Year Renovated', v: '2012' },
  ],
  saleDate: 'TBD',
  propertyCount: 1,
  // Single property — kept for AI-facing PDF metadata so the file points here.
  properties: ['27 Washington Street, Westfield, MA 01085'],

  contacts: [
    { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: '/photos/team/Brad-Balletto.jpg' },
    { name: 'Taylor Perun', title: 'Senior Vice President, Investments', phone: '(203) 307-1576', email: 'tperun@northeastpcg.com', photo: '/photos/team/Taylor-Perun.jpg' },
  ],
}
