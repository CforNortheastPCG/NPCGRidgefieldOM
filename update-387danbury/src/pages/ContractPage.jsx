import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { OwnerBadge } from '../components/Blocks.jsx'
import { CONTRACT } from '../data/process.js'

/* ═══════════════════ CONTRACT & DUE DILIGENCE ═══════════════════
   Offers → PSA narrative, the diligence checklist framed as "what we'll
   need from you" with owner badges, and FAQ. Content: src/data/process.js. */
export default function ContractPage({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Marketing Process" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Offers to Executed PSA</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Contract &amp; <span style={{ color: '#F8971D' }}>Due Diligence</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 9.6, lineHeight: 1.48, color: 'var(--graphite)', marginBottom: 10 }}>{CONTRACT.intro}</div>

        {/* Checklist — 2×2 category cards */}
        <div className="eyebrow" style={{ marginBottom: 5, fontSize: 9 }}>The Diligence Checklist — What We&rsquo;ll Need</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1, minHeight: 0, alignContent: 'stretch' }}>
          {CONTRACT.checklist.map(cat => (
            <div key={cat.category} style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 12px', minHeight: 0 }}>
              <div style={{ fontSize: 9.4, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.06em', paddingBottom: 4, marginBottom: 5, borderBottom: '2px solid var(--golden)' }}>{cat.category}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {cat.items.map(it => (
                  <div key={it.doc} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 8.4, color: 'var(--graphite)', flex: 1, lineHeight: 1.3 }}>{it.doc}</span>
                    <OwnerBadge owner={it.owner} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 10 }}>
          {CONTRACT.faq.map(f => (
            <div key={f.q}>
              <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.3 }}>{f.q}</div>
              <div style={{ fontSize: 8.6, lineHeight: 1.42, color: 'var(--graphite)', marginTop: 2 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
