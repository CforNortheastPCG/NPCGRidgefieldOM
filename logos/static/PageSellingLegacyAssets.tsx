import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const CONSIDERATIONS: Array<{ label: string; body: string }> = [
  { label: 'Tenant relationships',     body: 'Many legacy assets carry long-tenured tenants with handshake-era arrangements. Before marketing, formalize every lease in writing — sloppy paper is the #1 item that kills institutional bids.' },
  { label: 'Depreciation recapture',   body: 'Decades of depreciation means recapture tax is often the largest single check at close. Coordinate with your CPA on exchange eligibility, installment-sale structures, or opportunity-zone deferral.' },
  { label: 'Deferred capex',           body: 'Buyers discount 2× for every deferred-maintenance dollar. Pre-sale capex (roof, HVAC, parking) routinely returns 2–3× the spend. We\'ll walk the property and prioritize ROI-positive items.' },
  { label: 'Family + partner alignment',body: 'Multi-generation owners, LP structures, and sibling partnerships each need aligned expectations before go-to-market. Decide price, timeline, and split before the first buyer sees the OM.' },
  { label: 'Market-rate reset',        body: 'Legacy rents often trail market by 20–40%. Decide whether to push rents pre-sale (slower, more value capture) or sell at below-market rents (faster, lets the buyer underwrite the upside).' },
  { label: 'Legacy narrative',         body: 'The property\'s story is a marketing asset. Original ownership, historical tenants, neighborhood role — the right buyer pays more for a clean story. We document and weave this into the OM.' },
];

export default function PageSellingLegacyAssets({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="Selling Legacy / Family Assets">
      <div className="br-intro">
        Long-held assets sell differently. Years of deferred paperwork, below-market rents, deferred maintenance, and family dynamics all become pricing inputs. NPCG\'s approach on legacy dispositions:
      </div>
      <div className="br-gates br-gates--fill">
        {CONSIDERATIONS.map((c, i) => (
          <div key={c.label} className="br-gate">
            <div className="br-gate-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="br-gate-body">
              <div className="br-gate-label">{c.label}</div>
              <div className="br-gate-req">{c.body}</div>
            </div>
          </div>
        ))}
      </div>
    </StaticPageShell>
  );
}
