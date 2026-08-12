/* ═══════════════════ THE MARKETING PROCESS (firm-standard) ═══════════════════
   Content for the four process pages: The Process, What to Expect, Contract,
   and Closing. This is firm-standard copy — durations and FAQ answers may be
   tuned per deal, but the structure rarely changes. */

/* ── Page: The Process — six-step numbered workflow ── */
export const PROCESS_INTRO =
  'Every NPCG assignment runs the same disciplined, deadline-driven process. From engagement to funded closing, a typical campaign spans twelve to fourteen weeks — each step below has a defined owner, deliverable, and decision point.'

export const PROCESS_STEPS = [
  { num: '01', title: 'Engage & Underwrite', durationLabel: 'Week 0–2', body: 'Evaluate the asset, underwrite in detail, align on pricing and strategy with the owner. Execute the engagement letter.' },
  { num: '02', title: 'Build the OM', durationLabel: 'Week 2–4', body: 'Professional photography, rent-roll scrubbing, financial modeling, and offering memorandum production.' },
  { num: '03', title: 'Launch to Market', durationLabel: 'Week 4–6', body: 'Targeted outreach to our proprietary investor network, syndication across CoStar / LoopNet / CREXi, weekly owner reporting.' },
  { num: '04', title: 'Call for Offers', durationLabel: 'Week 6', body: 'Structured hard deadline. All interested parties submit written offers. Best-and-final round if warranted.' },
  { num: '05', title: 'Negotiate & Contract', durationLabel: 'Week 7–9', body: 'Qualify buyers, negotiate economics and contingencies, execute the purchase-and-sale agreement with the winner.' },
  { num: '06', title: 'Close', durationLabel: 'Week 9–14', body: 'Manage due diligence, lender coordination, and title clearance through to funded closing.' },
]

/* ── Page: What to Expect — seller milestones + FAQ ── */
export const EXPECT = {
  intro:
    'You stay in control of every consequential decision. These are the checkpoints where we come to you — each with a clear recommendation and the data behind it.',
  milestones: [
    { week: 'Kickoff', title: 'Engagement Kickoff', body: 'Sign the engagement letter, align on pricing strategy and buyer universe. Agree on communication cadence.', decision: 'Go / no-go on listing' },
    { week: 'OM Review', title: 'OM Review', body: 'You review the draft OM — positioning, photo selection, underwriting assumptions. Sign-off required before release.', decision: 'Approve OM for market' },
    { week: 'Launch', title: 'Launch Decision', body: 'Confirm final pricing, launch date, and approved buyer list. Optional pre-launch outreach window.', decision: 'Launch-to-market approval' },
    { week: 'Offers', title: 'Call for Offers', body: 'Joint review of all written offers. We present a ranked summary by price, certainty, and buyer quality.', decision: 'Best & final or direct award' },
    { week: 'Award', title: 'Winner Selection', body: 'You select the bidder. NPCG confirms a backup bidder in writing as insurance against fallout.', decision: 'Award + PSA execution' },
    { week: 'Diligence', title: 'Diligence Check-In', body: 'Mid-diligence review — buyer’s open items, any re-trade signals, estoppel and lender progress.', decision: 'Proceed / hold-for-cure' },
    { week: 'Closing', title: 'Closing', body: 'Settlement statement review, wire confirmation, tenant notice, closing binder delivery.', decision: 'Funded & closed' },
  ],
  faq: [
    { q: 'How often will we hear from you?', a: 'A standing weekly report — showings, buyer feedback, and pipeline status — plus a call whenever something needs a decision.' },
    { q: 'Who sees our financials?', a: 'Only buyers who have executed a confidentiality agreement. The OM is watermarked per recipient and data-room access is logged.' },
    { q: 'Will tenants know the property is for sale?', a: 'No. Tours are scheduled as routine inspections, marketing never names tenants, and buyer contact with tenants is prohibited until closing.' },
  ],
}

/* ── Page: Contract — LOI → PSA → diligence + what we'll need ── */
export const CONTRACT = {
  intro:
    'Once offers are in, we qualify the field, negotiate economics and contingencies, and move the winner to a signed purchase-and-sale agreement. Buyers are vetted on proof of funds and track record before award — certainty of close weighs alongside price. During diligence, the checklist below is what the buyer’s team will ask for; gathering the seller items early is the single best way to protect the timeline.',
  checklist: [
    {
      category: 'Financials',
      items: [
        { doc: 'Rent roll (current) + collection history', owner: 'Seller' },
        { doc: 'Operating statements (T12, T24, YTD)', owner: 'Seller' },
        { doc: 'Real estate tax bills (3 years)', owner: 'Seller' },
        { doc: 'Insurance loss runs (5 years)', owner: 'Seller' },
      ],
    },
    {
      category: 'Leases & Tenant Files',
      items: [
        { doc: 'All current leases, amendments, guaranties', owner: 'Seller' },
        { doc: 'Estoppel certificates from each tenant', owner: 'Broker' },
        { doc: 'Security deposit schedule', owner: 'Seller' },
      ],
    },
    {
      category: 'Title & Survey',
      items: [
        { doc: 'Title commitment + exceptions', owner: 'Third-Party' },
        { doc: 'Existing survey, if available', owner: 'Seller' },
        { doc: 'Recorded easements + restrictions', owner: 'Third-Party' },
      ],
    },
    {
      category: 'Physical & Compliance',
      items: [
        { doc: 'Property condition / engineering report', owner: 'Buyer' },
        { doc: 'Certificate of occupancy', owner: 'Seller' },
        { doc: 'Open permits / code violations', owner: 'Seller' },
        { doc: 'Service contracts + capital history (5 years)', owner: 'Seller' },
      ],
    },
  ],
  faq: [
    { q: 'What if the buyer tries to re-trade?', a: 'The backup bidder confirmed in writing at award is our leverage — a re-trade without a documented diligence finding risks the deal going to the runner-up.' },
    { q: 'How long is diligence?', a: 'Typically 21–30 days, negotiated in the PSA alongside deposit hardening. We push for shorter periods backed by early document delivery.' },
  ],
}

/* ── Page: Closing — handoff checklist + FAQ ── */
export const CLOSING = {
  intro:
    'The last two weeks are process, not suspense. Each item below is coordinated by NPCG’s transaction team so funding day is a formality.',
  items: [
    { title: 'Settlement Statement Review', body: 'Final settlement statement reviewed line-by-line with you and your attorney 24–48 hours before close. Credits, prorations, and commission pre-reconciled.' },
    { title: 'Wire Coordination', body: 'Wire instructions verified by voice callback. Funding confirmed received before keys are released.' },
    { title: 'Tenant Notice', body: 'Joint new-owner notice drafted in advance — rent payment redirect and new management contacts, delivered day of close.' },
    { title: 'Security Deposit Transfer', body: 'Tenant deposits credited at close with a backup schedule, matched against estoppels to prevent disputed claims.' },
    { title: 'Utility & Service Transfer', body: 'Utility accounts, service contracts, and vendor relationships transferred or terminated; final meter reads captured for proration.' },
    { title: 'Document Handoff', body: 'Original leases, warranties, plans, and keys delivered to the buyer; a complete digital archive provided to you for records.' },
  ],
  faq: [
    { q: 'When do we get proceeds?', a: 'Same day as funding in most cases — your attorney confirms receipt of the buyer’s wire, and net proceeds disburse per the settlement statement.' },
    { q: 'What happens after closing?', a: 'A post-close debrief: transaction summary, any 30-day true-ups mediated by NPCG, and 1031 or next-asset planning if that’s the goal.' },
  ],
}
