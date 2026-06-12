import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const REASONS = [
  { title: 'Step Up in Tax Basis', body: 'Heirs may sell to take advantage of a higher tax basis, potentially reducing future capital gains liabilities.' },
  { title: '1031 Exchange', body: 'Trade into a more valuable or better-positioned asset while deferring taxes through a like-kind exchange.' },
  { title: 'Return Capital to Investors', body: 'Syndicators often sell after a 5–7 year hold to return capital and profits to their investor base.' },
  { title: 'Major Capital Expenditures', body: 'Significant repair needs or upcoming regulatory mandates can lead owners to sell rather than commit additional capital.' },
  { title: 'Increase Return on Equity', body: 'As equity builds, owners may sell and redeploy into higher-yield opportunities or diversify into other investments.' },
  { title: 'Retiring from the Business', body: 'Some owners are simply ready to step away — selling to simplify life and create retirement liquidity.' },
  { title: 'Heightened Government Regulation', body: 'Rising tenant protections, eviction controls, or rent caps can make ownership more difficult — and often trigger a sale.' },
  { title: 'Problematic Tenants', body: 'Persistent issues like late payments or property damage from difficult tenants may drive an exit.' },
  { title: 'Life Events', body: 'Death, divorce, or partnership dissolution often require liquidation to divide estates or redistribute wealth.' },
];

export default function PageWhyOwnersSell({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Why Owners Sell" title="Why Property Owners Decide to Sell">
      <p className="why-sell__lead">
        Every owner has a unique reason for selling — understanding that motivation lets us tailor the strategy to meet your goals.
      </p>
      <div className="why-sell__grid">
        {REASONS.map((r) => (
          <div key={r.title} className="why-sell__cell">
            <div className="why-sell__title">{r.title}</div>
            <div className="why-sell__body">{r.body}</div>
          </div>
        ))}
      </div>
      <div className="why-sell__footer">
        Our role is to align the sale strategy with your goals — whether that's maximizing price, simplifying life, or preparing for what's next.
      </div>
    </StaticPageShell>
  );
}
