/* ═══════════════════ RENT COMPARABLES ═══════════════════
   ⚠ NO EXTERNAL RENT SURVEY EXISTS FOR THIS DEAL. Nothing in the source
   material surveys competing Ware rentals, and none has been invented
   here. What follows is the next-best evidence and is labelled as such:
   the highest rent ALREADY ACHIEVED in each floor plan within the
   portfolio itself, per the unit-mix block of the ownership workbook
   (Analysis tab, columns R–W).

   This is the same test the Echo Hill and Homecrest BOVs applied — a pro
   forma set at or below a rent the building has already collected is far
   harder to argue with than one set off a market survey. But it is a floor,
   not a market: a proper survey of competing Ware product should be run
   before this deck is presented, and may support higher rents than these. */

export const RENT_COMPS = {
  commentary:
    'These are not market comparables — they are the highest rents the portfolio has itself achieved in each floor plan, per the ownership workbook. Measured against them the pro forma splits in two. The one-bedroom pro forma of $1,450 sits well below the $1,800 already collected, and the studio holds at its in-place rent; that portion is demonstrably achievable. But the two-bedroom, three-bedroom and one-bedroom-loft pro formas all sit ABOVE anything this portfolio has ever collected — the $1,950 three-bedroom is 42% above the best three-bedroom on record at $1,375. On that split, $40,380 of the $90,780 annual upside is supported by in-house achievement and $50,400, or 56%, is not. An external survey of competing Ware rentals is not optional here; it is what the larger half of the upside rests on.',
  comps: [
    { address: '30 North Street · Unit 4', photo: '/photos/thumbs/exterior-1.jpg', yearBuilt: 1932, buildingUnits: 14, city: 'In-house — same portfolio', unitType: '1 Bed', sqft: 625, rent: 1800, notes: 'Highest 1-bed achieved; pro forma set at $1,450' },
    { address: '30 North Street · Unit 2', photo: '/photos/thumbs/interior-1.jpg', yearBuilt: 1932, buildingUnits: 14, city: 'In-house — same portfolio', unitType: '2 Bed', sqft: 700, rent: 1575, notes: 'Highest 2-bed achieved; pro forma set at $1,800' },
    { address: '27 Parker Street · Unit 4', photo: '/photos/thumbs/exterior-2.jpg', yearBuilt: 1890, buildingUnits: 4, city: 'In-house — same portfolio', unitType: '3 Bed', sqft: 800, rent: 1375, notes: 'Highest 3-bed achieved; pro forma set at $1,950' },
    { address: '28 North Street · Unit 3', photo: '/photos/thumbs/interior-4.jpg', yearBuilt: 1932, buildingUnits: 14, city: 'In-house — same portfolio', unitType: '1 Bed — L', sqft: 650, rent: 1225, notes: 'Highest achieved; pro forma set at $1,500' },
    { address: '30 North Street · Unit 1', photo: '/photos/thumbs/interior-3.jpg', yearBuilt: 1932, buildingUnits: 14, city: 'In-house — same portfolio', unitType: 'Studio', sqft: 500, rent: 1670, notes: 'Sole studio; pro forma holds at the in-place $1,670' },
  ],
}
