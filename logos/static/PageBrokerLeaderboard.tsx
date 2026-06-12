import type { Bov } from '../../../schema/bov';
import { CT_BROKER_RANKING, RANKING_CAVEAT } from '../../../constants/firm';
import { StaticPageShell } from './StaticPageShell';

export default function PageBrokerLeaderboard({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  const max = Math.max(...CT_BROKER_RANKING.map((r) => r.volumeMM));
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Broker Leaderboard" title="#1 Investment Sales Brokers in Connecticut">
      <div className="leaderboard">
        {CT_BROKER_RANKING.map((row, i) => (
          <div key={row.firm} className="leaderboard__row">
            <div className="leaderboard__label">{row.firm}</div>
            <div className="leaderboard__track">
              <div
                className={`leaderboard__bar ${i === 0 ? 'leaderboard__bar--lead' : ''}`}
                style={{ width: `${(row.volumeMM / max) * 100}%` }}
              />
              <span className="leaderboard__value">${row.volumeMM}M</span>
            </div>
          </div>
        ))}
        <div className="leaderboard__caveat">*{RANKING_CAVEAT}</div>
      </div>
    </StaticPageShell>
  );
}
