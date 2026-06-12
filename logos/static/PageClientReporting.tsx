import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

const COLUMNS = [
  { heading: 'Weekly Activity Reports', items: ['Summary of new inquiries, signed CAs, and buyer interest', 'Tour activity and feedback from prospective buyers', 'Marketing analytics and campaign performance', 'Real-time insights into market sentiment'] },
  { heading: 'Offer Summary Reports', items: ['Detailed breakdown of all submitted offers', 'Side-by-side comparisons of pricing, terms, and contingencies', 'Buyer qualification summaries (track record, capital, financing)', 'Strategic guidance on the recommended path forward'] },
  { heading: 'Ongoing Communication', items: ['Regular phone / video check-ins to keep alignment', 'Fast response to owner questions and updates', 'Clear next steps at each phase of the process'] },
];

export default function PageClientReporting({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Client Reporting" title="Client Reporting & Communication">
      <p className="reporting__lead">
        Transparent, consistent, proactive communication from launch to close — reporting designed to keep you informed,
        involved, and confident.
      </p>
      <div className="reporting__cols">
        {COLUMNS.map((col) => (
          <section key={col.heading} className="reporting__col">
            <h3 className="reporting__heading">{col.heading}</h3>
            <ul className="reporting__list">
              {col.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </StaticPageShell>
  );
}
