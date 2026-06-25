/* ═══════════════════ WEST END PORTFOLIO — CLOSING FLYER ═══════════════════
   One-page landscape "Just Sold" flyer for the 29-property West End Portfolio
   (Hartford, CT). Same NPCG closing-flyer system as flyers/src/Closing.jsx —
   full-bleed collage cover, stat ladder on a left scrim, deal-contact bar.
   Render: node print-portfolio.cjs
*/

export const PORTFOLIO = {
  name: 'West End Portfolio',
  subtitle: 'West End · Hartford, CT',
  status: 'Just Sold',
  hero: '/properties/cover-shot.png', // the curated 6-building collage cover
  heroPos: 'center',
  stats: [
    { l: 'Sale Price', v: '$14,281,500' },
    { l: 'Number of Properties', v: '23' },
    { l: 'Units', v: '167' },
    { l: 'Price / Unit', v: '$85,517' },
    { l: 'Cap Rate', v: '7.01%' },
  ],
  saleDate: 'TBD',
  propertyCount: 29, // allocation line items on the agreed schedule (5.27.2026)

  // 29 allocation line items from the agreed Sale Price Allocation (5.27.2026).
  // Kept for AI-facing PDF metadata so the file points at this exact portfolio.
  properties: [
    '28-30 Beacon St', '63-65 Evergreen Ave', '150 South Whitney St',
    '154 South Whitney St (condos)', '28-30 Kibbe St', '149-151 Sisson Ave',
    '178-188 South Whitney St', '240 South Whitney St', '245-251 South Whitney St',
    '250-252 South Whitney St', '1802-1804 Broad Street', '155-163 South Whitney St',
    '224 South Whitney St', '226 South Whitney St', '242-244 South Whitney St',
    '9-11 Warrenton Ave', '39-41 Oxford Street', '47 Oxford Street',
    '159-161 Sisson Ave', '159H Sisson Ave', '163-165 Sisson Ave',
    '167-169 Sisson Ave', '246-248 South Whitney St', '254-256 South Whitney St',
  ],

  contacts: [
    { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: '/photos/team/Brad-Balletto.jpg' },
    { name: 'Taylor Perun', title: 'Senior Vice President, Investments', phone: '(203) 307-1576', email: 'tperun@northeastpcg.com', photo: '/photos/team/Taylor-Perun.jpg' },
  ],
}
