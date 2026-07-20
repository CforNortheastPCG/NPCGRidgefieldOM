import { StaticShell, assetUrl } from '../Shell.tsx'
import { BROKERS } from '../../data/contacts.ts'

const DISCLAIMER = [
  "All materials and information received or derived from NortheastPCG, Inc. its directors, officers, agents, advisors, affiliates and/or any third party sources are provided without representation or warranty as to completeness, veracity, or accuracy, condition of the property, compliance or lack of compliance with applicable governmental requirements, developability or suitability, financial performance of the property, projected financial performance of the property for any party's intended use or any and all other matters.",
  "Neither NortheastPCG, Inc. its directors, officers, agents, advisors, or affiliates makes any representation or warranty, express or implied, as to accuracy or completeness of the any materials or information provided, derived, or received. Materials and information from any source, whether written or verbal, that may be furnished for review are not a substitute for a party's active conduct of its own due diligence to determine these and other matters of significance to such party. NortheastPCG, Inc. will not investigate or verify any such matters or conduct due diligence for a party unless otherwise agreed in writing.",
  '**Each party shall conduct its own independent investigation and due diligence.**',
  "Any party contemplating or under contract or in escrow for a transaction is urged to verify all information and to conduct their own inspections and investigations including through appropriate third party independent professionals selected by such party. All financial data should be verified by the party including by obtaining and reading applicable documents and reports and consulting appropriate independent professionals. NortheastPCG, Inc. makes no warranties and/or representations regarding the veracity, completeness, or relevance of any financial data or assumptions. NortheastPCG, Inc. does not serve as a financial advisor to any party regarding any proposed transaction. All data and assumptions regarding financial performance, including that used for financial modeling purposes, may differ from actual data or performance. Any estimates of market rents and/or projected rents that may be provided to a party do not necessarily mean that rents can be established at or increased to that level. Parties must evaluate any applicable contractual and governmental limitations as well as market conditions, vacancy factors and other issues in order to determine rents from or for the property.",
  'Legal questions should be discussed by the party with an attorney. Tax questions should be discussed by the party with a certified public accountant or tax attorney. Title questions should be discussed by the party with a title officer or attorney. Questions regarding the condition of the property and whether the property complies with applicable governmental requirements should be discussed by the party with appropriate engineers, architects, contractors, other consultants and governmental agencies. All properties and services are marketed by NortheastPCG, Inc. in compliance with all applicable fair housing and equal opportunity laws.',
]

/** Condensed from each broker's public profile at northeastpcg.com/our-team. */
const BIOS: Record<string, string> = {
  'Francis Saenz':
    'Co-leader of the Boston-North team. Nearly 200 closed transactions and $400M+ in sales, specializing in apartment buildings throughout Greater Boston.',
  'Drew Kirkland':
    'Co-leader of the Boston-North team and member of the firm’s senior leadership; $344M in sales across 155 transactions in multifamily, retail, and mixed-use across MA and CT.',
  'Jim Casey':
    'Villanova finance and real estate graduate; his team has closed $238M across 101 transactions since 2018, specializing in multifamily with a focus on flex and light industrial.',
  'Patrick Wheeler':
    'Drives new business development and transaction execution with $58M in closed sales; multifamily background in secondary markets.',
  'Anthony Rakauskas':
    'Isenberg School of Management (UMass Amherst); provides business development and transactional support across the Boston-North book.',
}

/** Team-first contacts page: the advisory team leads with photo cards
    across the top; the confidentiality disclaimer compresses into small
    print below rather than dominating the page. */
export function DealContacts({ pageNum }: { pageNum?: number }) {
  return (
    <StaticShell section="Your Advisory Team" title="Your Advisory Team" pageNum={pageNum}>
      <div className="dc-layout" style={{ gridTemplateColumns: '330px 1fr' }}>
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Presented By</h3>
          {BROKERS.map((b) => (
            <div key={b.name} style={{ padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {b.photo ? (
                  <img className="dc-avatar" src={assetUrl(b.photo)} alt={b.name} style={{ width: 40, height: 40 }} />
                ) : (
                  <div className="dc-avatar dc-avatar--ph" style={{ width: 40, height: 40 }}>
                    {b.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                  <div className="dc-name" style={{ fontSize: 9.5 }}>{b.name}</div>
                  <div className="dc-title" style={{ fontSize: 6 }}>{b.title}</div>
                  {b.phone && <div className="dc-meta" style={{ fontSize: 6.5 }}>{b.phone}</div>}
                  {b.email && <div className="dc-meta" style={{ fontSize: 6.5 }}>{b.email}</div>}
                </div>
              </div>
              {BIOS[b.name] && (
                <p style={{ margin: '4px 0 0', fontSize: 8.5, lineHeight: 1.4, color: 'var(--graphite)' }}>
                  {BIOS[b.name]}
                </p>
              )}
            </div>
          ))}
        </aside>
        <section className="dc-disclaimer">
          <h3 className="dc-disclaimer-title">Confidentiality and Disclaimer</h3>
          {DISCLAIMER.map((p, i) =>
            p.startsWith('**') ? (
              <p key={i}>
                <strong>{p.replaceAll('**', '')}</strong>
              </p>
            ) : (
              <p key={i}>{p}</p>
            )
          )}
        </section>
      </div>
    </StaticShell>
  )
}
