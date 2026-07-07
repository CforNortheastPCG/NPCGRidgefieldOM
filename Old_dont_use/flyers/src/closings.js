/* ═══════════════════ CLOSING FLYERS ═══════════════════
   One-page landscape "Just Sold" closing flyers. Full-bleed property photo,
   stat ladder on a left scrim, NPCG logo, and a deal-contact bar across the
   bottom. Same brand system as the marketing flyers (flyer.css vars + logo).
   Render: ?closing=<slug>  ·  node print-closing.cjs 5173 <slug>
*/

export const CLOSINGS = {
  '126-bowden': {
    name: '126 Bowden Street',
    address: '126 Bowden Street, Lowell, MA 01851',
    status: 'Just Sold',
    hero: '/closings/126-bowden.jpg',
    heroPos: 'center 40%', // tweak crop if the building drifts off-frame
    stats: [
      { l: 'Sale Price', v: '$2,100,000' },
      { l: 'Cap Rate', v: '5.75%' },
      { l: 'Price / Unit', v: '$262,500' },
      { l: 'Price / SF', v: '$248' },
      { l: 'Units', v: '8' },
      { l: 'Building Size', v: '8,468 SF' },
      { l: 'Sale Date', v: '6/23/2026' },
    ],
    contacts: [
      { name: 'Drew Kirkland', title: 'Vice President, Investments', phone: '(857) 990-6802', email: 'dkirkland@northeastpcg.com', photo: '/photos/team/Drew-Kirkland.png' },
      { name: 'Francis Saenz', title: 'Vice President, Investments', phone: '(857) 990-6803', email: 'fsaenz@northeastpcg.com', photo: '/photos/team/Francis-Saenz.png' },
      { name: 'Jim Casey', title: 'Senior Associate', phone: '(857) 990-6821', email: 'jcasey@northeastpcg.com', photo: '/photos/team/Jim-Casey.png' },
      { name: 'Patrick Wheeler', title: 'Investment Associate', phone: '(857) 990-6819', email: 'pwheeler@northeastpcg.com', photo: '/photos/team/Patrick-Wheeler.jpg' },
      { name: 'Anthony Rakauskas', title: 'Associate', phone: '(857) 990-6807', email: 'arakauskas@northeastpcg.com', photo: '/photos/team/Anthony-Rakauskas.png' },
    ],
  },
}
