import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const CADENCE: Array<{ item: string; note: string }> = [
  { item: 'Weekly pipeline email',    note: 'Every Friday 5 PM ET. CA count, tour count, active bidders, top questions from the buyer pool, and what\'s on deck next week.' },
  { item: 'Tour log',                 note: 'Running list of every showing — date, bidder, attendees, feedback captured. Tells you what the market is actually saying, not what we think they\'re saying.' },
  { item: 'Price-discovery reads',    note: 'Every 2 weeks until first-round LOIs. Where buyers are signaling on price vs. our ask, and whether we should push or hold.' },
  { item: 'LOI summary pack',         note: 'At first-round deadline. Every offer side-by-side on price, terms, certainty, buyer quality. Recommended shortlist attached with rationale.' },
  { item: 'Best-and-final briefing',  note: 'Before we invite the shortlist. What we\'re asking each bidder to sharpen (price, terms, certainty) and the strategy per-bidder.' },
  { item: 'Award recommendation',     note: 'After best-and-final. Ranked recommendation with full offer comparison and seller-decision criteria documented.' },
  { item: 'Closing dashboard',        note: 'Post-PSA through close. Weekly status on diligence items, lender progress, and any buyer-side issues — so there are no closing-day surprises.' },
];

export default function PageSellerReporting({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="Seller Reporting Cadence">
      <div className="br-intro">
        You\'ll know what\'s happening in your deal every week — from go-to-market through closing day. No mystery, no "let me check and get back to you" on questions that should already have answers.
      </div>
      <div className="br-checklist">
        <div className="br-checklist-head">What you receive, when</div>
        <ul className="br-checklist-list">
          {CADENCE.map((r) => (
            <li key={r.item} className="br-check">
              <div className="br-check-mark" aria-hidden>✓</div>
              <div className="br-check-body">
                <div className="br-check-item">{r.item}</div>
                <div className="br-check-note">{r.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StaticPageShell>
  );
}
