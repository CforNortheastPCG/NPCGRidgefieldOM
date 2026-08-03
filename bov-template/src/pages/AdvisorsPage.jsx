import { StaticShell, Md } from '../components/Shell.jsx'
import { ADVISORS, DISCLAIMER_PARAGRAPHS } from '../data/advisors.js'

/* ═══════════════════ YOUR ADVISORS ═══════════════════
   Deal-team cards (1–4, from src/data/advisors.js) beside the full
   confidentiality & disclaimer text. Card sizing adapts to the count. */

function initials(name) {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('')
}

export default function AdvisorsPage({ pageNum }) {
  const solo = ADVISORS.length === 1
  return (
    <StaticShell section="Your Advisors" title="Your Advisors" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className={`dc-contacts${solo ? ' dc-contacts--1' : ''}`}>
          <h3 className="dc-disclaimer-title">Presented By</h3>
          {ADVISORS.map(a => (
            <div key={a.name} className="dc-card" style={{ border: 'none', padding: 0 }}>
              {a.photo ? (
                <img className="dc-avatar" src={a.photo} alt={a.name} style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
              ) : (
                <div className="dc-avatar" style={{ border: '3px solid var(--golden)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 16 }}>{initials(a.name)}</div>
              )}
              <div className="dc-name">{a.name}</div>
              <div className="dc-title">{a.title}</div>
              <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: {a.phone}</div>
              <div className="dc-meta" style={{ fontWeight: 700 }}>{a.email}</div>
            </div>
          ))}
        </aside>
        <section className="dc-disclaimer">
          <h3 className="dc-disclaimer-title">Confidentiality and Disclaimer</h3>
          {DISCLAIMER_PARAGRAPHS.map((p, i) => <Md key={i} text={p} />)}
        </section>
      </div>
    </StaticShell>
  )
}
