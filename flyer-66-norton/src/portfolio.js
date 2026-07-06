/* ═══════════════════ 66 NORTON — CLOSING FLYER ═══════════════════
   One-page landscape "Just Sold" flyer for Norton Pointe Apartments,
   a 41-unit multifamily property at 66 Norton Street, New Haven, CT.
   Same NPCG closing-flyer system as flyers/src/Closing.jsx — full-bleed
   cover, stat ladder on a left scrim, deal-contact bar.
   Render: node print-portfolio.cjs
*/

export const PORTFOLIO = {
  name: 'Norton Pointe Apartments',
  subtitle: '66 Norton Street · New Haven, CT',
  status: 'Just Sold',
  hero: '/properties/66-norton-hero.jpg',
  heroPos: 'center',
  stats: [
    { l: 'Purchase Price', v: '$6,155,000' },
    { l: 'Units', v: '41' },
    { l: 'Price / Unit', v: '$150,122' },
    { l: 'Price / SF', v: '$148' },
    { l: 'Cap Rate', v: '7.44%' },
  ],
  saleDate: 'TBD',

  // Single asset — kept as an array so the AI-facing PDF metadata points at
  // this exact property.
  properties: [
    '66 Norton Street, New Haven, CT (Norton Pointe Apartments — 41 units)',
  ],

  contacts: [
    { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: '/photos/team/Brad-Balletto.jpg' },
    { name: 'Derek Mahabir', title: 'Investment Associate', phone: '(203) 751-1187', email: 'dmahabir@northeastpcg.com', photo: '/photos/team/Derek-Mahabir.jpg' },
  ],
}
