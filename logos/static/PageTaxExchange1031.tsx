import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const PHASES: Array<{ week: string; label: string; body: string }> = [
  { week: 'Day 0',      label: 'Relinquished closing',   body: 'Closing on the property you\'re selling (the relinquished asset). The 45-day and 180-day exchange clocks start the moment funds transfer.' },
  { week: 'Day 0–45',   label: 'Identification window',  body: 'Identify up to 3 replacement candidates in writing. NPCG provides market-ready options matched to your price + timeline. Ambiguous IDs disqualify the exchange.' },
  { week: 'Day 45–120', label: 'Due diligence + PSA',    body: 'Execute PSA on the identified replacement. Buyer-side diligence + lender work run in parallel. Keep one identified option under contract as a backstop.' },
  { week: 'Day 120–180',label: 'Replacement close',      body: 'Close on the replacement property within the 180-day window. QI wires exchange funds directly to the closing table — never touches the seller.' },
  { week: 'Ongoing',    label: 'Safe-harbor reporting',  body: 'QI files Form 8824 with your tax return documenting the exchange. Gain is deferred; basis rolls forward into the new asset.' },
];

export default function PageTaxExchange1031({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="1031 Exchange Coordination">
      <div className="br-intro">
        Standard §1031 deferred-exchange timeline. NPCG coordinates with your Qualified Intermediary and replacement search so both clocks run in parallel — identification is the hard deadline that decides the rest.
      </div>
      <div className="br-timeline">
        {PHASES.map((p, i) => (
          <div key={p.label} className="br-tl-phase">
            <div className="br-tl-marker">
              <div className="br-tl-dot">{i + 1}</div>
              {i < PHASES.length - 1 && <div className="br-tl-line" aria-hidden />}
            </div>
            <div className="br-tl-body">
              <div className="br-tl-week">{p.week}</div>
              <div className="br-tl-label">{p.label}</div>
              <div className="br-tl-copy">{p.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="br-aside">
        <strong>The two clocks are unforgiving:</strong> miss the 45-day ID or 180-day close and the entire exchange collapses — tax deferral reverts to a straight-sale taxable event. Engage your QI before your listing goes live, not after.
      </div>
    </StaticPageShell>
  );
}
