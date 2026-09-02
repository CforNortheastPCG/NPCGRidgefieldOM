/* ═══════════════════ BEYOND THE SALE (firm-standard) ═══════════════════
   Content for the three owner-advisory pages that close the long-format
   pitch: Why Property Owners Decide to Sell, Strategies to Defer Capital
   Gains Taxes, and The Strategic Advisory Flywheel. Firm copy carried over
   from the standard BOV deck — rarely edited per deal.

   None of this is tax advice and the Tax Deferral page says so in its own
   words; keep that disclaimer line if you edit the copy. */

/* ── Page: Why Property Owners Decide to Sell — nine motivations ── */
export const WHY_OWNERS_SELL = {
  subtitle: 'Understanding the Motivation Behind the Sale',
  lead: 'Every owner has a unique reason for selling — and understanding their motivation helps us tailor the strategy to meet their goals.',
  reasons: [
    { title: 'Step Up in Tax Basis', body: 'Heirs may sell to take advantage of a higher tax basis, potentially reducing future capital gains liabilities.' },
    { title: '1031 Exchange', body: 'Owners may sell to trade into a more valuable or better-positioned asset while deferring taxes through a 1031 exchange.' },
    { title: 'Return Capital to Investors', body: 'Syndicators often sell after a typical 5–7 year hold to return capital and profits to investors.' },
    { title: 'Major Capital Expenditures', body: 'Significant repair needs or upcoming mandates (e.g. seismic retrofits) can lead owners to sell rather than invest additional capital.' },
    { title: 'Increase Return on Equity', body: 'As equity builds, some owners choose to sell and reinvest proceeds into higher-yield opportunities or diversify into other investments.' },
    { title: 'Retiring from the Business', body: 'Some owners are simply ready to step away — selling properties to simplify life and create retirement liquidity.' },
    { title: 'Heightened Government Regulation', body: 'Increasing tenant protections, eviction controls, or rent caps make ownership more difficult — and often trigger a sale.' },
    { title: 'Problematic Tenants', body: 'Persistent issues like late payments or property damage from difficult tenants may drive an owner to exit.' },
    { title: 'Life Events: Death, Divorce, Partnership Dissolution', body: 'Transitions such as death, divorce, or partnership changes often require the liquidation of assets to divide estates or redistribute wealth.' },
  ],
  banner: 'Our role is to align the sale strategy with your goals — whether it’s maximizing price, simplifying life, or preparing for what’s next.',
}

/* ── Page: Strategies to Defer Capital Gains Taxes — three structures ── */
export const TAX_DEFERRAL = {
  subtitle: 'After a Sale — 1031 Exchange · 721 UPREIT · Delaware Statutory Trust',
  intro: 'Selling a property often comes with a significant tax bill — but it doesn’t have to. Through a properly structured 1031 Exchange, sellers can defer capital gains taxes and reinvest their proceeds into another investment property or a passive alternative like a DST.',
  disclaimer: 'We are not tax advisors — but we can introduce you to trusted 1031 exchange facilitators and DST specialists to help you explore the best options post-sale.',
  strategies: [
    {
      title: '1031 Exchange: Like-Kind Reinvestment',
      summary: 'A tax-deferred exchange under IRS Section 1031 that allows you to roll sale proceeds into another qualifying “like-kind” property.',
      benefitsLabel: 'Key Benefits',
      benefits: ['Defer 100% of capital gains tax', 'Maintain equity and grow your portfolio', 'Reinvest into larger or better-positioned assets', 'Great tool for generational wealth-building'],
      extraLabel: 'Requirements',
      extra: ['Must identify new property within 45 days', 'Must close on replacement property within 180 days', 'Exchange must be facilitated by a Qualified Intermediary (QI)'],
    },
    {
      title: '721 Exchange: UPREIT Structure',
      summary: 'A 721 exchange allows you to contribute property into a Real Estate Investment Trust (REIT) in exchange for operating partnership units — deferring taxes while gaining exposure to a diversified, institutionally managed portfolio.',
      benefitsLabel: 'Benefits',
      benefits: ['Defer capital gains tax upon contribution', 'Convert illiquid real estate into REIT-backed units', 'Gain diversification across geographies and property types', 'Participate in REIT distributions and potential liquidity events'],
      extraLabel: 'Ideal For',
      extra: ['Owners seeking long-term diversification', 'Investors looking to exit active management over time', 'Sellers interested in transitioning into a REIT structure post-1031'],
    },
    {
      title: 'Delaware Statutory Trust (DST): Passive 1031 Alternative',
      summary: 'A DST is an institutional-grade, fractional ownership structure that qualifies for 1031 exchange. It allows you to own a share of a professionally managed, income-producing property — without active management.',
      benefitsLabel: 'Benefits',
      benefits: ['No landlord duties (truly passive)', 'Monthly income distributions', 'Diversification across property types and markets', 'Fully managed by experienced operators'],
      extraLabel: 'Ideal For',
      extra: ['Sellers nearing retirement', 'Out-of-state owners seeking passive income', 'Owners looking to diversify with stabilized assets'],
    },
  ],
}

/* ── Page: The Strategic Advisory Flywheel — six stages around a hub ──
   `stages` run clockwise from the top of the wheel. Each carries the stage
   body and a one-line `tagline` that lands the point. */
export const FLYWHEEL = {
  subtitle: 'Momentum Builds. Trust Compounds. Value Never Stops.',
  hub: {
    title: 'Trusted Advisor Relationship',
    body: 'Our ongoing role is to help you think strategically about your real estate — across assets, across markets, across cycles. We’re not driven by transactions. We’re driven by your success.',
  },
  stages: [
    { title: 'Discovery & Goal Alignment', body: 'Understand your investment thesis, priorities, risk appetite, and portfolio strategy.', tagline: 'Every conversation starts with understanding where you’re headed.' },
    { title: 'Asset & Market Insight', body: 'Deliver regular evaluations — from value and rent comps to performance benchmarks — even for assets not for sale.', tagline: 'Insight isn’t reserved for listings — it’s how we stay relevant year-round.' },
    { title: 'Strategic Scenario Planning', body: 'Hold, refinance, reposition, or sell — we map the risks and rewards of each path.', tagline: 'We’re not here to push listings — we’re here to help you choose wisely.' },
    { title: 'Execution Support (When Aligned)', body: 'If a transaction is warranted, we activate a disciplined, market-driven process that drives price and outcome.', tagline: 'When you’re ready to act, we already know the playbook.' },
    { title: 'Post-Transaction Advisory', body: 'Help navigate reinvestment, 1031s, DSTs, or passive income strategies.', tagline: 'Our relationship continues beyond the close.' },
    { title: 'Ongoing Market Intelligence', body: 'Stay top-of-mind with regular updates, check-ins, and insights across your portfolio.', tagline: 'We’re always on — even when you’re not in market.' },
  ],
}
