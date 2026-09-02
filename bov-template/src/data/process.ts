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

/* ═══════════════════ FIRM-STANDARD PITCH PAGES ═══════════════════
   The five marketing pages carried over from the firm's standard BOV deck:
   Selling Process Stages, Marketing Timeline, National Visibility, Buyer
   Tracking, and Client Reporting. Firm copy — leave alone per deal. */

/* ── Page: Selling Process Stages — three numbered stages, bullets ── */
export const SELLING_STAGES = [
  {
    num: '01', title: 'Sales and Marketing',
    items: [
      'Evaluate, underwrite, and position the property to achieve maximum value',
      'Conduct extensive market research including rent and sales comps to support our valuations',
      'Create offering memorandum to articulate the investment and its potential to investors',
      'Enforce, advocate, and educate buyers on the strengths of the deal and mitigate any possible concerns',
      'Conduct broad and/or targeted marketing via direct and digital campaigns',
      'Constantly follow up with interested parties',
      'Coordinate property tours with seller / property manager & buyers',
      'Generate a competitive environment to further drive value',
      'Communicate with seller — marketing process updates',
      'Track offers, tours and activity — share with seller as needed',
      'Request and update financials as process moves — rents may have increased, etc.',
      'Create “deal room” with relevant info (precursor to due diligence)',
    ],
  },
  {
    num: '02', title: 'Negotiation & Contract',
    items: [
      'Facilitate and negotiate offers from potential buyers',
      'Screen and qualify buyers',
      'Negotiate best possible price and terms for the seller',
      'Assist in selecting a buyer with the highest probability of closing',
      'Maintain deal momentum and buyer interest through contract negotiations',
      'Confirm offer terms are included in purchase and sale agreement',
      'Compile and reconcile all requested due diligence documentation to ensure that there are no unexpected issues',
    ],
  },
  {
    num: '03', title: 'Transaction Management',
    items: [
      'Facilitate transmission of due diligence documentation including taxes, insurance, water, utilities, etc.',
      'Coordinate with buyer, seller, lender, and attorneys on all due diligence activities including appraisal, inspection, environmental, and financing (if applicable)',
      'Confirm receipt of any 3rd party reports and/or lender’s commitment letter',
      'Track key contract dates and manage process through all open contingencies',
      'Manage and mitigate any possible unforeseen issues and/or buyer re-trade requests',
      'Track any contract amendments and other negotiated changes including closing date',
    ],
  },
]

/* ── Page: Marketing Timeline — four phases by week ── */
export const TIMELINE = {
  subtitle: 'A proven process to maximize value and drive certainty of close',
  lead: 'We execute a well-defined marketing process designed to generate urgency, drive competition, and produce the highest price the market will bear.',
  phases: [
    { weeks: '1–2', label: 'Prepare', items: ['Finalize pricing and listing agreement', 'Collect property financials and due diligence', 'Schedule photography / video', 'Build marketing materials (OM, flyers, email campaigns)', 'Begin quiet marketing to qualified buyers'] },
    { weeks: '3–6', label: 'Launch', items: ['Go live on CoStar, LoopNet, CREXi, and other CRE platforms', 'Launch email and call campaigns', 'Conduct property tours', 'Provide weekly activity and market feedback', 'Call for Offers typically set at end of Week 6'] },
    { weeks: '7–8', label: 'Offers', items: ['Receive and underwrite offers', 'Conduct best-and-final round (if needed)', 'Qualify buyers and negotiate LOI'] },
    { weeks: '9–12', label: 'Escrow', items: ['Execute PSA', 'Manage due diligence and buyer financing', 'Coordinate closing process', 'Proactive involvement through close'] },
  ],
}

/* ── Page: National Visibility — syndication platforms ──
   Logos live in public/logos/platforms/. `span: 2` gives a tile double
   width in the four-column grid (CoStar + LoopNet share one artwork). */
export const VISIBILITY = {
  subtitle: 'Syndication & Digital Reach',
  lead: 'Beyond our private database, we leverage the most powerful digital tools in commercial real estate to broadcast your property nationwide.',
  bullets: [
    'Featured on CoStar, LoopNet, CREXi, and top national CRE networks',
    'Enhanced exposure through our website, email campaigns, and listing syndication',
    'Designed to reach institutional, private, and 1031 exchange buyers coast-to-coast',
  ],
  platforms: [
    { name: 'CoStar & LoopNet', logo: '/logos/platforms/costar-loopnet.png', span: 2 },
    { name: 'CREXi', logo: '/logos/platforms/crexi.png' },
    { name: 'Brevitas', logo: '/logos/platforms/brevitas.png' },
    { name: 'RealNex Marketplace', logo: '/logos/platforms/marketplace.png' },
    { name: 'theBrokerList', logo: '/logos/platforms/thebrokerlist.png' },
    { name: 'CommercialEdge', logo: '/logos/platforms/commercialedge.png', span: 2 },
  ],
  banner: 'Our mission is to create a market for your asset — not wait for one.',
}

/* ── Page: Buyer Tracking & Follow-Up — four quadrants ── */
export const BUYER_TRACKING = {
  subtitle: 'Proactive Buyer Management. Relentless Follow-Up.',
  lead: 'Our job isn’t just to “list” your property — it’s to sell it. That means making sure every serious buyer is identified, engaged, and followed up with consistently.',
  close: 'We don’t wait for buyers to come to us — we go to them, stay with them, and bring them to the finish line.',
  quadrants: [
    { icon: 'target', title: 'Centralized Buyer Tracking System', items: ['Every buyer inquiry is logged, tracked, and categorized', 'CRM-integrated tracking for contact history, tour status, and follow-up cadence', 'Instant access to engagement history and notes — no one falls through the cracks'] },
    { icon: 'repeat', title: 'Structured Follow-Up Process', items: ['Systematic outreach to all interested parties post-launch, post-tour, and post-OM delivery', 'Personalized follow-up based on buyer profile and interest level', 'Deadlines and key milestones clearly communicated to drive urgency'] },
    { icon: 'trending-up', title: 'Buyer Engagement Reports', items: ['Weekly updates on active buyer conversations', 'Heat mapping of top prospects based on timing, capital, and fit', 'Early identification of likely bidders and potential pricing feedback'] },
    { icon: 'users', title: 'Continuous Re-Engagement', items: ['If a buyer slows down, we re-engage them with new insights or angles', 'If they pass, we ask why — and use that data to adjust positioning if needed', 'If they’re active elsewhere, we track timing and stay on their radar'] },
  ],
}

/* ── Page: Client Reporting & Communication — three columns ── */
export const REPORTING = {
  subtitle: 'Transparent. Consistent. Proactive.',
  lead: 'We believe in full transparency and proactive communication throughout the entire sales process. Our reporting keeps you informed, involved, and confident — from launch to close.',
  columns: [
    { icon: 'bar-chart-2', title: 'Weekly Activity Reports', items: ['Summary of new inquiries, signed CAs, and buyer interest', 'Tour activity and feedback from prospective buyers', 'Marketing analytics and campaign performance', 'Real-time insights into market sentiment'] },
    { icon: 'file-text', title: 'Offer Summary Reports', items: ['Detailed breakdown of all submitted offers', 'Side-by-side comparisons of pricing, terms, and contingencies', 'Buyer qualification summaries (track record, capital, financing)', 'Strategic guidance on recommended path forward'] },
    { icon: 'phone', title: 'Ongoing Communication', items: ['Regular phone / video check-ins to keep alignment', 'Fast response to all owner questions and updates', 'Clear next steps at each phase of the process'] },
  ],
}
