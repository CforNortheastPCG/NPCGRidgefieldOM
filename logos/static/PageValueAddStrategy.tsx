import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const CRITERIA: Array<{ weight: string; label: string; body: string }> = [
  { weight: '1', label: 'Reposition before sale',     body: 'Execute a 12–24 month value-add plan (unit renovations, rent resets, re-tenant) and sell into the stabilized comp set. Highest outcome, highest execution risk, biggest time investment. Right when the upside math clearly clears 2× the spend after tax.' },
  { weight: '2', label: 'Pre-sale capex sprint',      body: 'A 60–120 day surgical refresh — roof, HVAC, lobby, paint, landscaping. Doesn\'t reset rents but removes the buyer\'s due-diligence objections. Costs $50–200k, typically returns 3–5×.' },
  { weight: '3', label: 'Sell the upside narrative',  body: 'List at current NOI with a documented, budgeted value-add plan attached. Let the buyer underwrite the lift and pay for it. Best when the seller doesn\'t have the time, appetite, or balance sheet for execution.' },
  { weight: '4', label: 'Sell as-is',                 body: 'Skip all the above. List at current NOI with no pretense of upside. Fastest to close; lowest price. Right when tax timing, estate pressure, or partnership dynamics outweigh maximum-dollar considerations.' },
];

export default function PageValueAddStrategy({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="Value-Add / Reposition Strategy">
      <div className="br-intro">
        Four distinct pre-sale paths. The right one depends on your timeline, capital appetite, and where the comp set is trading. We\'ll model the after-tax proceeds under each before you commit.
      </div>
      <div className="br-scorecard">
        {CRITERIA.map((c) => (
          <div key={c.label} className="br-score-row">
            <div className="br-score-weight">{c.weight}</div>
            <div className="br-score-body">
              <div className="br-score-label">{c.label}</div>
              <div className="br-score-copy">{c.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="br-aside">
        <strong>Most owners over-index on #1 and under-index on #2.</strong> A surgical pre-sale capex sprint is almost always NPV-positive and rarely considered because it feels like work on an asset you\'re about to sell. Run the math — you\'ll find 80% of the returns for 20% of the effort.
      </div>
    </StaticPageShell>
  );
}
