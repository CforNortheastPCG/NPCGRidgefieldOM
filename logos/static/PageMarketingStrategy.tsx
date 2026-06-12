import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const STRATEGY = [
  { tag: 'Professional Marketing Materials', body: "High-quality exterior, aerial, and interior photography that showcases the asset's scale and setting." },
  { tag: 'Comprehensive Offering Memorandum', body: 'Full investor package detailing financials, market overview, and the value-add thesis.' },
  { tag: 'Broad Market Exposure', body: 'Robust digital campaign across CoStar, LoopNet, CREXi, and peer platforms, paired with targeted email outreach.' },
  { tag: 'Relationship-Driven Outreach', body: 'Leverage established relationships with active multifamily investors already deployed in the market.' },
  { tag: 'Organized Tour Process', body: 'Scheduled tour days with multiple time slots to build momentum and competitive tension.' },
  { tag: 'Competitive Bidding Process', body: 'Structured Call for Offers followed by a best-and-final round to maximize price discovery.' },
  { tag: 'Data Room & Due Diligence', body: 'Secure online deal room under NDA with utility bills, service contracts, sample lease, rent roll, insurance, and loss runs.' },
  { tag: 'Buyer Support', body: 'Introductions to preferred lenders, property managers, attorneys, and insurance providers to streamline buyer execution.' },
];

const BUYER_PROFILE = [
  { tag: 'Smaller Institutional Investors', body: 'Groups with an existing or expanding presence in the local market.' },
  { tag: '1031 Exchange Buyers', body: 'Seeking a turnkey or easily third-party-managed multifamily asset with established rent roll and scalability.' },
  { tag: 'High-Net-Worth Investors', body: 'Individuals or family offices pursuing stable multifamily exposure with value-add upside.' },
  { tag: 'Trade-Up Operators', body: 'Experienced regional owners moving from smaller Class B/C assets into properties that support on-site staffing.' },
];

export default function PageMarketingStrategy({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Marketing Strategy" title="Marketing Strategy & Buyer Profile">
      <div className="mkt-strategy">
        <section className="mkt-strategy__col">
          <h3 className="mkt-strategy__heading">Marketing Strategy</h3>
          <ul className="mkt-strategy__list">
            {STRATEGY.map((item) => (
              <li key={item.tag}><span className="mkt-strategy__tag">{item.tag}</span> — {item.body}</li>
            ))}
          </ul>
        </section>
        <section className="mkt-strategy__col">
          <h3 className="mkt-strategy__heading">Target Buyer Profile</h3>
          <ul className="mkt-strategy__list">
            {BUYER_PROFILE.map((item) => (
              <li key={item.tag}><span className="mkt-strategy__tag">{item.tag}</span> — {item.body}</li>
            ))}
          </ul>
          <div className="mkt-strategy__note">
            <strong>Value Optimization:</strong> Prior to launch, execute low-cost, high-impact cosmetic improvements — refreshed
            landscaping, selective exterior painting, general cleanup — to ensure the property shows at its best during
            photography and tours.
          </div>
        </section>
      </div>
    </StaticPageShell>
  );
}
