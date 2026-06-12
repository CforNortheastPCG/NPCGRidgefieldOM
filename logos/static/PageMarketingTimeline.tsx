import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const PHASES = [
  { weeks: '1–2', label: 'Prepare', items: ['Finalize pricing and listing agreement', 'Collect property financials and diligence', 'Schedule photography / video', 'Build marketing materials (OM, flyers, email)', 'Begin quiet marketing to qualified buyers'] },
  { weeks: '3–6', label: 'Launch', items: ['Go live on CoStar, LoopNet, CREXi, and peer platforms', 'Launch email and call campaigns', 'Conduct property tours', 'Provide weekly activity and market feedback', 'Call for Offers typically set at end of Week 6'] },
  { weeks: '7–8', label: 'Offers', items: ['Receive and underwrite offers', 'Conduct best-and-final round if needed', 'Qualify buyers and negotiate LOI'] },
  { weeks: '9–12', label: 'Escrow', items: ['Execute PSA', 'Manage due diligence and buyer financing', 'Coordinate closing process', 'Proactive involvement through close'] },
];

export default function PageMarketingTimeline({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Marketing Timeline" title="Marketing Timeline">
      <div className="timeline">
        <p className="timeline__lead">
          A proven process designed to generate urgency, drive competition, and produce the highest price the market will bear.
        </p>
        <div className="timeline__track">
          {PHASES.map((phase, i) => (
            <div key={phase.label} className="timeline__phase">
              <div className="timeline__bubble">
                <div className="timeline__bubble-weeks">Weeks</div>
                <div className="timeline__bubble-range">{phase.weeks}</div>
              </div>
              {i < PHASES.length - 1 && <div className="timeline__connector" aria-hidden />}
              <div className="timeline__label">{phase.label}</div>
              <ul className="timeline__items">
                {phase.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </StaticPageShell>
  );
}
