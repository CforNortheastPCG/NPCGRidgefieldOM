import { StaticShell, Md } from '../components/Shell.jsx'
import { ADVISORS } from '../data/advisors.js'

/* ═══════════════════ YOUR ADVISORS ═══════════════════
   One column per advisor (1–4, from src/data/advisors.js): headshot, contact
   block, a short track-record bio, and three stat tiles. The full
   confidentiality & disclaimer text lives on its own page (DisclaimerPage)
   immediately after this one. */

function initials(name) {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('')
}

export default function AdvisorsPage({ pageNum }) {
  const n = ADVISORS.length
  return (
    <StaticShell section="Your Advisors" title="Your Advisors" pageNum={pageNum}>
      <p style={{ fontSize: 9.3, lineHeight: 1.55, color: 'var(--carbon)', margin: '0 0 16px', maxWidth: 760 }}>
        This opinion is presented by the advisors below. Production figures are drawn from NPCG
        transaction records and reflect closed business, not projections.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 20, flex: 1, minHeight: 0 }}>
        {ADVISORS.map(a => (
          <div key={a.name} style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 9 }}>
              {a.photo ? (
                <img
                  className="dc-avatar"
                  src={a.photo}
                  alt={a.name}
                  style={{ width: 74, height: 74, margin: 0, flex: '0 0 auto', border: '3px solid var(--golden)' }}
                />
              ) : (
                <div
                  className="dc-avatar"
                  style={{
                    width: 74, height: 74, margin: 0, flex: '0 0 auto', border: '3px solid var(--golden)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 14.4,
                  }}
                >{initials(a.name)}</div>
              )}
              <div style={{ minWidth: 0 }}>
                <div className="dc-name" style={{ fontSize: 12.8 }}>{a.name}</div>
                <div className="dc-title">{a.title}</div>
                <div className="dc-meta" style={{ fontWeight: 700 }}>{a.phone}</div>
                <div className="dc-meta" style={{ fontWeight: 700, wordBreak: 'break-word' }}>{a.email}</div>
              </div>
            </div>

            {/* stat tiles */}
            {a.stats?.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${a.stats.length}, 1fr)`, gap: 8, marginBottom: 9 }}>
                {a.stats.map(s => (
                  <div className="stat-tile" key={s.l} style={{ padding: '9px 4px' }}>
                    <div className="st-val" style={{ fontSize: 15.2 }}>{s.v}</div>
                    <div className="st-label" style={{ fontSize: 7.5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            )}

            {/* track-record bio */}
            {a.bio && (
              <div style={{ fontSize: 9.7, lineHeight: 1.55, color: 'var(--carbon)' }}>
                <Md text={a.bio} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 8.5, color: 'var(--stone)', margin: '12px 0 0', lineHeight: 1.45 }}>
        Production figures per NPCG transaction records as of August 2026. Career and year-to-date
        totals reflect aggregate consideration on closed transactions. The full confidentiality and
        disclaimer statement follows on the next page.
      </p>
    </StaticShell>
  )
}
