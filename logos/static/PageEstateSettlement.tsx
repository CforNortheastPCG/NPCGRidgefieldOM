import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const STEPS: Array<{ label: string; body: string }> = [
  { label: 'Authority + fiduciary review',   body: 'Confirm executor / trustee authority in writing. Review the governing document (will, trust, court order) to understand the fiduciary duty, beneficiary class, and any restrictions on sale.' },
  { label: 'Beneficiary communication',      body: 'Establish a single point of contact for fiduciary decisions. Communicate process + timeline to beneficiaries so expectations align with a market-timed disposition.' },
  { label: 'Court + legal coordination',     body: 'Coordinate with estate counsel, probate court (if applicable), and any referee or appraiser. File valuation documentation and obtain sign-offs before going to market.' },
  { label: 'Market-ready pricing',           body: 'Price against current market — not stepped-up basis. A sale below FMV can create fiduciary liability; a sale above carries no such risk. Anchor pricing with two independent opinions of value.' },
  { label: 'Confidential marketing',         body: 'Estate sales are family-sensitive. We run controlled buyer outreach — off-market where the family prefers, full broad marketing where maximum price matters more than discretion.' },
  { label: 'Offer review + fiduciary vote',  body: 'Present all qualifying offers with scoring rubric. Fiduciary approves award with documented rationale — protects trustee / executor from later beneficiary challenge.' },
  { label: 'Closing + distribution',         body: 'Close at the price and terms approved by the fiduciary. Proceeds flow to the estate account; distribution per trust / will terms handled by the estate\'s legal counsel.' },
];

export default function PageEstateSettlement({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="Estate & Trust Dispositions">
      <div className="br-intro">
        A fiduciary-grade sale protocol. Every step is documented and defensible — because estate sales get reviewed years later by beneficiaries, auditors, and occasionally courts.
      </div>
      <ol className="br-steps">
        {STEPS.map((s, i) => (
          <li key={s.label} className="br-step">
            <div className="br-step-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="br-step-body">
              <div className="br-step-label">{s.label}</div>
              <div className="br-step-copy">{s.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </StaticPageShell>
  );
}
