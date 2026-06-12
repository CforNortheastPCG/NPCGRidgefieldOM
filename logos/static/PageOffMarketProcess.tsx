import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const STEPS: Array<{ label: string; body: string }> = [
  { label: 'Whisper list approval',       body: 'You pre-approve the specific buyers who\'ll see the opportunity. No broad marketing, no listing site, no teaser going to the general buyer pool. The seller controls who knows this property is available.' },
  { label: 'One-on-one outreach',         body: 'Each approved buyer is contacted individually — not via group email. We calibrate messaging per relationship: institutional buyers, 1031 buyers, neighborhood owner-operators all get different framings.' },
  { label: 'Controlled CA execution',     body: 'Strict CA before any data shared. The CA carries non-circumvent + non-disclosure terms so the buyer can\'t shop the deal or disclose the sale intent. Violations void access and pursue damages.' },
  { label: 'Private diligence access',    body: 'Access to the data room is per-buyer and logged. No shared folder; no portal URL that can get forwarded. Tours are escorted and scheduled individually, never overlapping.' },
  { label: 'Negotiated offer — not bid',  body: 'No call-for-offers deadline. Each buyer submits when ready; we negotiate one offer at a time rather than running a competitive process. Right for sellers who value discretion over maximum-price discovery.' },
  { label: 'Quiet close',                 body: 'PSA, closing, and transfer execute without public filings beyond the statutory minimum. Deal info stays off CoStar, Real Capital, and brokerage quarterly releases unless the seller affirmatively consents.' },
];

export default function PageOffMarketProcess({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Process & Strategy" title="Off-Market / Confidential Sales">
      <div className="off-market">
        <div className="br-intro">
          A private, seller-controlled disposition. Right for owners where confidentiality matters more than maximum-dollar price discovery — estate sensitivity, tenant relationships, landlord anonymity, or strategic positioning with partners.
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
        <div className="br-aside">
          <strong>The price tradeoff:</strong> an off-market sale typically prices 3–8% below a broad-marketed disposition. For sellers where discretion matters, the discount is the cost of control. For sellers where price is everything, we recommend going broad.
        </div>
      </div>
    </StaticPageShell>
  );
}
