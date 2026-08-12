/* ═══════════════════ EDIT-ME · THE PROJECT ═══════════════════
   "The Project" page — what this assignment is: who engaged NPCG, the scope
   of the opinion, and how the value conclusion was reached. Feeds
   src/pages/ProjectPage.jsx. */

export const PROJECT = {
  eyebrow: 'The Assignment',
  // Headline stats strip (2–4 tiles). Keep values short.
  stats: [
    { v: '12', l: 'Apartments' },              // SAMPLE — replace
    { v: '9,400 SF', l: 'Gross Building SF' }, // SAMPLE — replace
    { v: 'Aug 2026', l: 'Opinion Date' },      // SAMPLE — replace
  ],
  // 2–3 paragraphs: who engaged us, what the property is, what this document
  // concludes. Written to the owner, not to a buyer.
  paragraphs: [ // SAMPLE — replace
    'Northeast Private Client Group is pleased to present this Broker Opinion of Value for **Maple Court Apartments**, a 12-unit apartment building at 12 Example Street in Anytown, Connecticut. This analysis was prepared at the request of ownership to establish the property’s probable market value and to outline how NPCG would position, market, and sell the asset if engaged.',
    'Our conclusions draw on the property’s in-place rent roll and owner-reported operating figures, current market rents for comparable units, recent comparable sales in the submarket, and our direct experience closing similar assets in this market. The result is a supportable trade range — not a single number — reflecting how competing buyers would realistically underwrite the property today.',
  ],
  // How the opinion was built — methodology bullets.
  methodology: [
    { head: 'Property Review', body: 'Site and improvements reviewed; unit mix, condition, and utility structure confirmed with ownership.' },
    { head: 'Income Analysis', body: 'In-place rent roll and owner-reported expenses normalized to a stabilized operating profile.' },
    { head: 'Market Survey', body: 'Current asking and achieved rents surveyed across competing properties to establish market rent.' },
    { head: 'Comparable Sales', body: 'Recent submarket sales analyzed on price per unit, price per SF, and capitalization rate.' },
  ],
  // Always shown — the "this is not an appraisal" note.
  note: 'This Broker Opinion of Value is an opinion of probable market value prepared by a licensed real estate broker. It is not an appraisal and has not been prepared in accordance with the Uniform Standards of Professional Appraisal Practice (USPAP).',
  photo: '/photos/project-1.jpg',
}
