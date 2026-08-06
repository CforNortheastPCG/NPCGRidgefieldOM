/* ═══════════════════ EDIT-ME · THE PROJECT ═══════════════════
   "The Project" page — what this assignment is: who engaged NPCG, the scope
   of the opinion, and how the value conclusion was reached. Feeds
   src/pages/ProjectPage.jsx. */

export const PROJECT = {
  eyebrow: 'The Assignment',
  // Headline stats strip (2–4 tiles). Keep values short.
  stats: [
    { v: '10', l: 'Apartments' },
    { v: '8,801 SF', l: 'Living Area' },
    { v: '1940', l: 'Year Built' },
    { v: 'Aug 2026', l: 'Opinion Date' },
  ],
  // 2–3 paragraphs: who engaged us, what the property is, what this document
  // concludes. Written to the owner, not to a buyer.
  paragraphs: [
    'Northeast Private Client Group is pleased to present this Broker Opinion of Value for **Main Street Apartments**, a ten-unit Tudor Revival apartment building at the corner of Main Street and Washington Avenue in West Haven, Connecticut. The property carries two street addresses — 300 Main Street and 491 Washington Avenue — but is a single 1940-vintage building on one 0.21-acre parcel, with a rooming unit alongside the ten apartments. This analysis was prepared at the request of ownership to establish the property’s probable market value and to outline how NPCG would position, market, and sell the asset if engaged.',
    'The defining characteristic of this asset is the gap between what it earns and what it should earn. All ten apartments are leased, but in-place rents average **$1,201 per month** against market rents we support at **$1,740** — a spread of roughly **31%**, or **$64,680** of annual income sitting outside the rent roll. A buyer is therefore pricing two very different income streams: what the building produces today, and what it produces once leases turn at market.',
    'Our conclusions draw on the rent roll dated 07.29.2026, the 2025 operating statement as corrected, the assessor’s field card, market rents for comparable units, and recent sales in the New Haven submarket. The result is a supportable trade range — not a single number.',
  ],
  // How the opinion was built — methodology bullets.
  methodology: [
    { head: 'Property Review', body: 'Site, improvements, and unit mix reviewed against the assessor’s field card (PID 11127) and ownership’s rent roll; utilities confirmed as landlord-paid heat, hot water, water/sewer and trash.' },
    { head: 'Income Analysis', body: 'Actual in-place contract rent capitalized as the Current case. 2025 expenses normalized — taxes reset to the current assessment, non-recurring and capital work excluded, management at market.' },
    { head: 'Market Survey', body: 'Asking and achieved rents surveyed across competing West Haven and New Haven properties to establish the pro-forma rents applied to the one-bedroom stock.' },
    { head: 'Comparable Sales', body: 'Recent submarket sales analyzed on price per unit, price per SF, and going-in cap rate, weighted toward buildings with similar loss-to-lease.' },
  ],
  // Always shown — the "this is not an appraisal" note.
  note: 'This Broker Opinion of Value is an opinion of probable market value prepared by a licensed real estate broker. It is not an appraisal and has not been prepared in accordance with the Uniform Standards of Professional Appraisal Practice (USPAP).',
  photo: '/photos/project-1.jpg',
}
