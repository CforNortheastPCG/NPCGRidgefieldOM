import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const QUADRANTS = [
  { heading: 'Centralized Buyer Tracking System', items: ['Every buyer inquiry is logged, tracked, and categorized', 'CRM-integrated tracking for contact history, tour status, and follow-up cadence', 'Instant access to engagement history and notes — no one falls through the cracks'] },
  { heading: 'Structured Follow-Up Process', items: ['Systematic outreach to all interested parties post-launch, post-tour, and post-OM delivery', 'Personalized follow-up based on buyer profile and interest level', 'Deadlines and key milestones clearly communicated to drive urgency'] },
  { heading: 'Buyer Engagement Reports', items: ['Weekly updates on active buyer conversations', 'Heat mapping of top prospects based on timing, capital, and fit', 'Early identification of likely bidders and potential pricing feedback'] },
  { heading: 'Continuous Re-Engagement', items: ['If a buyer slows down, we re-engage with new insights or angles', 'If they pass, we ask why — and use that data to adjust positioning', "If they're active elsewhere, we track timing and stay on their radar"] },
];

export default function PageBuyerTracking({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Buyer Tracking" title="Buyer Tracking & Follow-Up">
      <p className="buyer-tracking__lead">
        Proactive buyer management and relentless follow-up. Our job isn't just to list your property — it's to sell it.
      </p>
      <div className="buyer-tracking__grid">
        {QUADRANTS.map((q) => (
          <section key={q.heading} className="buyer-tracking__quadrant">
            <h3 className="buyer-tracking__heading">{q.heading}</h3>
            <ul className="buyer-tracking__list">
              {q.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </StaticPageShell>
  );
}
