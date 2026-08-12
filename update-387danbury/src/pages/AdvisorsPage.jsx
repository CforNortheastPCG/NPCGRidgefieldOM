import { StaticShell, Md } from '../components/Shell.jsx'
import { ADVISORS, DISCLAIMER_PARAGRAPHS } from '../data/advisors.js'

/* ═══════════════════ YOUR ADVISORS ═══════════════════
   Deal-team cards (from src/data/advisors.js) beside the full
   confidentiality & disclaimer text. */

function initials(name) {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('')
}

export default function AdvisorsPage({ pageNum }) {
  return (
    <StaticShell section="Your Advisors" title="Your Advisors" pageNum={pageNum}>
      <div className="dc-layout" style={{ gridTemplateColumns: '310px 1fr', gap: 36 }}>
        <aside className="dc-contacts" style={{ gap: 22 }}>
          <h3 className="dc-disclaimer-title" style={{ fontSize: 12.5 }}>Presented By</h3>
          {ADVISORS.map(a => (
            <div key={a.name} className="dc-card" style={{ border: 'none', padding: 0, gap: 3 }}>
              {a.photo ? (
                <img className="dc-avatar" src={a.photo} alt={a.name} style={{ width: 88, height: 88, border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset', marginBottom: 9 }} />
              ) : (
                <div className="dc-avatar" style={{ width: 88, height: 88, border: '3px solid var(--golden)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 22, marginBottom: 9 }}>{initials(a.name)}</div>
              )}
              <div className="dc-name" style={{ fontSize: 17 }}>{a.name}</div>
              <div className="dc-title" style={{ fontSize: 10.5, marginBottom: 5 }}>{a.title}</div>
              <div className="dc-meta" style={{ fontSize: 12, fontWeight: 700 }}>Direct: {a.phone}</div>
              <div className="dc-meta" style={{ fontSize: 12, fontWeight: 700 }}>{a.email}</div>
              {a.office && (
                <div style={{ marginTop: 7, paddingTop: 7, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 2 }}>{a.office}</div>
                  <div className="dc-meta" style={{ fontSize: 10.5 }}>{a.officeAddress1}</div>
                  <div className="dc-meta" style={{ fontSize: 10.5 }}>{a.officeAddress2}</div>
                </div>
              )}
            </div>
          ))}
        </aside>
        <section className="dc-disclaimer">
          <h3 className="dc-disclaimer-title" style={{ fontSize: 12.5 }}>Confidentiality and Disclaimer</h3>
          {DISCLAIMER_PARAGRAPHS.map((p, i) => <Md key={i} text={p} style={{ fontSize: 10.4, lineHeight: 1.55 }} />)}
        </section>
      </div>
    </StaticShell>
  )
}
