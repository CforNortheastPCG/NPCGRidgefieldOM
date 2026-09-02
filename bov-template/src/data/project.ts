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

  /* ── EXECUTIVE SUMMARY ──────────────────────────────────────────────
     One-paragraph orientation, then the numbered investment highlights.
     These are the first substantive page of the deck and, in the short
     format, the only place the thesis is argued in prose.

     Rules that keep them credible AND keep the page from filling with
     grey text — the charts beside them are doing the arguing:
       · 4 highlights. Five is already padding.
       · `title` ≤ 5 words, `body` ≤ 18 words. Hard caps.
       · Every `body` carries a hard number — a rent gap, a ratio, a count.
         A highlight with no number is an adjective.
       · Lead with the strongest. A reader takes two and skims the rest.
       · No "nestled", "boasts", "prime location", "turnkey", "rare
         opportunity". Say the number instead. */


}
