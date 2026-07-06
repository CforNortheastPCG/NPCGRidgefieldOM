import { StaticShell, assetUrl } from '../Shell.tsx'
import { BROKERS } from '../../data/contacts.ts'

const DISCLAIMER = [
  "All materials and information received or derived from NortheastPCG, Inc. its directors, officers, agents, advisors, affiliates and/or any third party sources are provided without representation or warranty as to completeness, veracity, or accuracy, condition of the property, compliance or lack of compliance with applicable governmental requirements, developability or suitability, financial performance of the property, projected financial performance of the property for any party's intended use or any and all other matters.",
  "Neither NortheastPCG, Inc. its directors, officers, agents, advisors, or affiliates makes any representation or warranty, express or implied, as to accuracy or completeness of the any materials or information provided, derived, or received. Materials and information from any source, whether written or verbal, that may be furnished for review are not a substitute for a party's active conduct of its own due diligence to determine these and other matters of significance to such party. NortheastPCG, Inc. will not investigate or verify any such matters or conduct due diligence for a party unless otherwise agreed in writing.",
  '**Each party shall conduct its own independent investigation and due diligence.**',
  "Any party contemplating or under contract or in escrow for a transaction is urged to verify all information and to conduct their own inspections and investigations including through appropriate third party independent professionals selected by such party. All financial data should be verified by the party including by obtaining and reading applicable documents and reports and consulting appropriate independent professionals. NortheastPCG, Inc. makes no warranties and/or representations regarding the veracity, completeness, or relevance of any financial data or assumptions. NortheastPCG, Inc. does not serve as a financial advisor to any party regarding any proposed transaction. All data and assumptions regarding financial performance, including that used for financial modeling purposes, may differ from actual data or performance. Any estimates of market rents and/or projected rents that may be provided to a party do not necessarily mean that rents can be established at or increased to that level. Parties must evaluate any applicable contractual and governmental limitations as well as market conditions, vacancy factors and other issues in order to determine rents from or for the property.",
  'Legal questions should be discussed by the party with an attorney. Tax questions should be discussed by the party with a certified public accountant or tax attorney. Title questions should be discussed by the party with a title officer or attorney. Questions regarding the condition of the property and whether the property complies with applicable governmental requirements should be discussed by the party with appropriate engineers, architects, contractors, other consultants and governmental agencies. All properties and services are marketed by NortheastPCG, Inc. in compliance with all applicable fair housing and equal opportunity laws.',
]

export function DealContacts({ pageNum }: { pageNum?: number }) {
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          {BROKERS.map((b) => (
            <div className="dc-broker" key={b.name}>
              {b.photo ? (
                <img className="dc-avatar" src={assetUrl(b.photo)} alt={b.name} />
              ) : (
                <div className="dc-avatar dc-avatar--ph">
                  {b.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <div className="dc-name">{b.name}</div>
                <div className="dc-title">{b.title}</div>
                {b.phone && <div className="dc-meta">{b.phone}</div>}
                {b.email && <div className="dc-meta">{b.email}</div>}
              </div>
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
