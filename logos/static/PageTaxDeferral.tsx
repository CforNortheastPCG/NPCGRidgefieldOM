import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const STRATEGIES = [
  {
    heading: '1031 Exchange: Like-Kind Reinvestment',
    summary: 'A tax-deferred exchange under IRS Section 1031 that lets you roll sale proceeds into another qualifying like-kind property.',
    benefitsLabel: 'Key Benefits',
    benefits: ['Defer 100% of capital gains tax', 'Maintain equity and grow the portfolio', 'Reinvest into larger or better-positioned assets', 'Powerful generational wealth-building tool'],
    extraLabel: 'Requirements',
    extra: ['Identify the replacement property within 45 days', 'Close on the replacement within 180 days', 'Exchange must be facilitated by a Qualified Intermediary (QI)'],
  },
  {
    heading: '721 Exchange: UPREIT Structure',
    summary: 'Contribute property into a REIT in exchange for operating-partnership units — deferring taxes while gaining exposure to a diversified, institutionally managed portfolio.',
    benefitsLabel: 'Benefits',
    benefits: ['Defer capital gains tax upon contribution', 'Convert illiquid real estate into REIT-backed units', 'Gain diversification across geographies and asset types', 'Participate in REIT distributions and potential liquidity events'],
    extraLabel: 'Ideal For',
    extra: ['Owners seeking long-term diversification', 'Investors looking to exit active management over time', 'Sellers interested in transitioning into a REIT structure post-1031'],
  },
  {
    heading: 'Delaware Statutory Trust (DST)',
    summary: 'An institutional-grade, fractional ownership structure that qualifies for 1031 exchange — own a share of a professionally managed, income-producing property without active management.',
    benefitsLabel: 'Benefits',
    benefits: ['No landlord duties (truly passive)', 'Monthly income distributions', 'Diversification across property types and markets', 'Fully managed by experienced operators'],
    extraLabel: 'Ideal For',
    extra: ['Sellers nearing retirement', 'Out-of-state owners seeking passive income', 'Owners looking to diversify with stabilized assets'],
  },
];

export default function PageTaxDeferral({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Tax Deferral" title="Strategies to Defer Capital Gains Taxes">
      <div className="tax-strategies">
        {STRATEGIES.map((s) => (
          <section key={s.heading} className="tax-strategies__col">
            <h3 className="tax-strategies__heading">{s.heading}</h3>
            <p className="tax-strategies__summary">{s.summary}</p>
            <div className="tax-strategies__sub">{s.benefitsLabel}</div>
            <ul>
              {s.benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="tax-strategies__sub">{s.extraLabel}</div>
            <ul>
              {s.extra.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </StaticPageShell>
  );
}
