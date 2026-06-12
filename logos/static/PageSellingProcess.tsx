import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const STAGES = [
  {
    label: 'Sales and Marketing',
    items: [
      'Evaluate, underwrite, and position the property with extensive rent and sales comp research',
      'Develop the offering memorandum that articulates the investment thesis to qualified buyers',
      'Advocate and educate prospects on deal strengths while mitigating concerns',
      'Execute broad and targeted marketing across direct, digital, and email channels',
      'Coordinate tours with seller, property manager, and qualified buyers',
      'Engineer a competitive environment designed to drive pricing tension',
      'Track and report offers, tours, and activity in real time',
      'Build and maintain the secure data room for due diligence readiness',
    ],
  },
  {
    label: 'Negotiation & Contract',
    items: [
      'Facilitate and negotiate offers from prospective buyers',
      'Screen and qualify buyer financial capacity and track record',
      'Negotiate best possible price and terms for the seller',
      'Help identify the buyer with the highest probability of closing',
      'Maintain deal momentum and buyer engagement through contract',
      'Confirm offer terms are accurately reflected in the PSA',
      'Compile and reconcile due diligence documentation to head off surprises',
    ],
  },
  {
    label: 'Transaction Management',
    items: [
      'Facilitate transmission of due diligence items — taxes, insurance, water, utilities',
      'Coordinate with buyer, seller, lender, and attorneys on all diligence workstreams',
      'Confirm receipt of third-party reports and lender commitment letters',
      'Track key contract dates and manage open contingencies',
      'Mitigate unforeseen issues and respond to buyer re-trade attempts',
      'Track amendments and any negotiated changes through to closing',
    ],
  },
];

export default function PageSellingProcess({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Selling Process" title="Selling Process Stages">
      <div className="stages">
        {STAGES.map((stage, i) => (
          <section key={stage.label} className={`stages__stage ${i % 2 === 1 ? 'stages__stage--alt' : ''}`}>
            <h3 className="stages__label">{stage.label}</h3>
            <ul className="stages__list">
              {stage.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </StaticPageShell>
  );
}
