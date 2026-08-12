/* ═══════════════════ EDIT-ME · LISTING UPDATE CONTENT ═══════════════════
   All report content for the 387 Danbury Road client update, transcribed
   from "387 Client Update Outline revised.docx" (Aug 2026). Every page in
   src/pages/ that is specific to this update reads from here. */

/* ── 2. LISTING SNAPSHOT ── */
export const SNAPSHOT = {
  stats: [
    { v: '$3,250,000', l: 'Asking Price' },
    { v: '13,706 SF', l: 'Total Building Area' },
    { v: '1.83 AC', l: 'Route 7 Site' },
    { v: '131', l: 'Days on Market' },
    { v: '3/31/26', l: 'Listing Launch' },
  ],
  paragraphs: [
    '**387 Danbury Road** is a 13,706-square-foot multi-building commercial property on 1.83 acres along Route 7 in Wilton, Connecticut. The offering includes approximately 6,055 square feet of office space across six suites, complemented by two industrial/flex buildings totaling approximately 7,651 square feet — including a 6,451-square-foot structure with open warehouse and garage space.',
    'The property went to market on **March 31, 2026** at an asking price of **$3,250,000** and has now been actively marketed for 131 days. This report summarizes the campaign to date — where the listing has been marketed, the activity and feedback it has generated, the market forces shaping buyer behavior, and our recommended next steps.',
  ],
}

/* ── 3. CAMPAIGN OVERVIEW ── */
export const CAMPAIGN = {
  intro:
    'The property is being marketed through a layered campaign that pairs national listing platforms with NPCG’s proprietary database and direct outreach — putting 387 Danbury Road in front of owner-users, investors, and developers through every channel they use to find deals.',
  channels: [
    { title: 'NPCG Email Blast & Website', body: 'Featured across Northeast Private Client Group’s email campaigns to our proprietary buyer database and listed on northeastpcg.com with offering memorandum and deal room access.', stat: { v: '105,512', l: 'Deliveries' } },
    { title: 'CoStar / LoopNet', body: 'Premium placement on the largest commercial listing platform, reaching the national brokerage and investor community.', stat: { v: '27,998', l: 'Total Views' } },
    { title: 'Crexi', body: 'Active listing on Crexi with full marketing package, tracking impressions, page views, and confidentiality agreements.', stat: { v: '4,898', l: 'Impressions' } },
    { title: 'LinkedIn', body: 'Campaign visibility through our advisors’ professional networks and NPCG’s company page.', stat: null },
    { title: 'Broker Networking Events', body: 'The listing is actively promoted at commercial real estate broker networking events across Fairfield County and beyond.', stat: null },
    { title: 'Property Sign', body: 'On-site signage capturing drive-by interest along the heavily trafficked Route 7 corridor.', stat: null },
  ],
}

/* ── 4. CAMPAIGN METRICS ── */
export const METRICS_DIGITAL = {
  crexi: {
    title: 'Crexi',
    meta: 'Since 3/31/26 listing start · all-time',
    stats: [
      { v: '4,898', l: 'Impressions' },
      { v: '158', l: 'Page Views' },
      { v: '38', l: 'Visitors' },
      { v: '4', l: 'OMs Opened' },
      { v: '5', l: 'Executed CAs' },
      { v: '0', l: 'Offers to Date' },
    ],
  },
  costar: {
    title: 'CoStar / LoopNet',
    meta: 'All-time campaign totals',
    stats: [
      { v: '27,998', l: 'Total Views' },
      { v: '6,955', l: 'Unique Prospects' },
      { v: '627', l: 'Detail Page Views' },
      { v: '14', l: 'Leads' },
      { v: '10', l: 'Data Room Visits' },
      { v: '0', l: 'Executed CAs' },
    ],
    last30: 'Last 30 days: 993 people reached and 3,225 impressions — 12× more exposure than a typical basic listing.',
  },
}

export const METRICS_NPCG = {
  email: {
    title: 'NPCG Email Blast',
    meta: 'Proprietary database campaigns',
    stats: [
      { v: '105,512', l: 'Total Deliveries' },
      { v: '34,647', l: 'Total Opens' },
      { v: '32.8%', l: 'Average Open Rate' },
      { v: '1,208', l: 'Total Clicks' },
      { v: '3.3%', l: 'Average Click Rate' },
      { v: '9', l: 'Website Leads' },
    ],
    note: '9 website leads were contacted directly and provided with the offering memorandum and deal room access.',
  },
  direct: {
    title: 'NPCG Direct Outreach',
    meta: 'Proactive canvassing campaign',
    stats: [
      { v: '82', l: 'Outbound Cold Calls' },
      { v: '49', l: 'OMs Distributed' },
    ],
    note: '82 outbound cold calls were made to local property owners, and 49 offering memorandums were distributed to prospects reached through that campaign.',
  },
}

/* ── 5. PROSPECT ACTIVITY ── */
export const TOURS = {
  intro: 'Two prospects have completed on-site tours of the property to date.',
  items: [
    {
      name: 'Jeff Levene',
      meta: 'Owner-User Prospect · Toured',
      body: 'After several weeks following the tour, Jeff got back to us to let us know that after considering the site, they do not think the Wilton location would be as advantageous to their business as they originally thought. They are now considering properties in Stratford.',
    },
    {
      name: 'Paul Tortora, JLL',
      meta: 'Broker · Daycare Developer Client · Toured',
      body: 'Broker representing a client who develops daycares. He was drawn to the site for Wilton’s demographics, school system, and Route 7 frontage next to the high school, but after the site visit did not think the property was appropriate for a conversion.',
    },
  ],
}

export const FEEDBACK = {
  intro: 'Feedback from the three buyer profiles the campaign is reaching:',
  profiles: [
    {
      title: 'Owner-Users',
      body: 'Feedback was largely a case of fit. The way the property is oriented does not support their business needs, and for that reason they passed on it.',
    },
    {
      title: 'Investors',
      body: 'Have not shown a tremendous amount of interest, as our list price is targeting owner-users, while investors are conceptually closer to the $2 million mark.',
    },
    {
      title: 'Developers',
      body: 'Have taken a look but are signaling they would need a price discount and a long contingency period under contract to secure approvals.',
    },
  ],
  leads: {
    title: 'Leads We Are Still Working',
    items: [
      {
        name: 'Workforce Partners',
        meta: 'Multifamily Owner · Norwalk, Wilton & Danbury',
        body: 'Owns multifamily properties throughout Norwalk, Wilton, and Danbury. They were initially interested in the site for the industrial space, with plans to place a tenant from one of their properties at 387 Danbury Road and evaluate developing the site years down the road. They have since concluded they would rather purchase the property as an investment and hold it for several years before redeveloping the parcel. They have not given firm numbers but indicated a valuation around the $2 million mark, and asked us to circle back if pricing expectations change in the future.',
      },
    ],
  },
}

/* ── 6. MARKET CONTEXT ── */
export const MARKET_CONTEXT = {
  comp: {
    title: '27 Cannon Road, Wilton',
    meta: 'Sale Comparable · Closed May 2026',
    stats: [
      { v: '$1.85M', l: 'Sale Price' },
      { v: '$293.65', l: 'Price / SF' },
      { v: '462', l: 'Days on Market' },
    ],
    body: 'One of the sale comps / on-market comps we used to value 387 Danbury Road. The property sold in May for $1.85M, representing $293.65 per square foot, after 462 days on market. It was fully renovated in 2004 and 100% occupied at sale.',
  },
  treasury: {
    title: 'Interest Rates',
    stats: [
      { v: '4.09%', l: '10-Yr Treasury · 3/5/26' },
      { v: '4.70%', l: '10-Yr Treasury · 8/10/26' },
      { v: '+60 bps', l: 'Since Going to Market' },
    ],
    body: 'The 10-year Treasury has climbed 60 basis points since we went to market — from 4.09% on the day the representation agreement was executed (3/5/26) to 4.70% today — tightening buyer underwriting and adding headwinds to pricing.',
    quote:
      'Rising rates raise the bar for all three buyer types: owner-users see higher debt service and reduced purchasing power, investors face wider required yields that compress achievable pricing, and developers absorb higher financing costs on top of both. None of this reflects the asset itself — it reflects the cost of capital across the market.',
  },
  sewer: {
    title: 'Sewer Capacity Update',
    meta: 'Town of Wilton · 6/11/26',
    paragraphs: [
      'Wilton has reached **99% of its sewer allocation from Norwalk**, and the town has confirmed no additional capacity is currently available.',
      'For 387 Danbury Road, this is relevant primarily for buyers considering an expansion or a change in use that would increase sewer demand beyond the property’s existing allocation — that capacity would need to be confirmed before underwriting such plans.',
      'For buyers intending to continue the property’s current use, this development is **not expected to be an issue**, as Wilton’s stated policy is that a property’s existing sewer allocation remains reserved for it through a sale as long as the use doesn’t materially change.',
    ],
  },
}

/* ── 7. RECOMMENDED NEXT STEPS ── */
export const NEXT_STEPS = {
  intro:
    'Our goal going forward is to increase activity that leads to tours and offers. There are two levers available to us: **marketing and price**.',
  framing:
    'We have marketed the property thoroughly across multiple channels to date, but activity has not yet produced the results we are looking for. Price is certainly a factor, but we have not received enough direct feedback from owner-user buyers to justify a reduction at this time. That said, if you would like to accelerate the timeline to a sale, a price adjustment is something we can discuss.',
  recsLabel: 'In the meantime, we recommend two additional marketing strategies to increase activity:',
  recommendations: [
    {
      num: '1',
      title: 'List on the MLS',
      body: 'This will expand exposure and put the listing in front of the broader brokerage community.',
    },
    {
      num: '2',
      title: 'OM Review Video on LinkedIn',
      body: 'We will produce a video walking through the offering memorandum, reviewing the property, and pitching the deal. It will be posted on our personal LinkedIn pages, with NPCG’s page reposting to extend its reach.',
    },
  ],
}

/* ── 8. QUESTIONS / DISCUSSION ── */
export const DISCUSSION = {
  intro: 'We’d like to hear your thoughts on the process so far — any questions, comments, or concerns.',
  questions: [
    'Are there any deadlines or timing considerations on your end that we should factor into our strategy?',
    'Have you had any direct contact with Santa Energy? Have you learned anything new about their future plans? Does the assumption that they will vacate the space at the end of the lease term — and possibly negotiate an early termination — still hold true?',
    'Any luck leasing the second-floor office space?',
    'Do you have any market intelligence regarding Wilton that we should be aware of?',
  ],
}
