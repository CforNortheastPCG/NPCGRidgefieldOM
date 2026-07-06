import { StaticShell } from './Shell.jsx'
import { LEADERSHIP, SENIOR_INVESTMENT_SALES, INVESTMENT_SALES } from './firm.js'

/* ═══════════════════ OUR TEAM ═══════════════════
   Big avatar cards for Leadership + Senior Investment Sales, with the
   full Investment Sales roster in a compact grid below. On the standard
   white page shell. Headshots fall back to initials until member.photo
   is set in firm.js. */

function initials(name) {
  return name.split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}

function Avatar({ member }) {
  if (member.photo) return <img className="team__avatar" src={member.photo} alt={member.name} />
  return <div className="team__avatar team__avatar--ph">{initials(member.name)}</div>
}

// Wrap in a link to the member's agent page when one exists, else a plain div.
function CardLink({ member, className, children }) {
  if (member.url) {
    return (
      <a className={className} href={member.url} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return <div className={className}>{children}</div>
}

function BigCard({ member }) {
  return (
    <CardLink member={member} className="team__big">
      <Avatar member={member} />
      <div className="team__big-name">{member.name}</div>
      <div className="team__big-title">{member.title}</div>
      {member.phone && <div className="team__big-meta">{member.phone}</div>}
      {member.email && <div className="team__big-meta">{member.email}</div>}
    </CardLink>
  )
}

function CompactCard({ member }) {
  return (
    <CardLink member={member} className="team__compact">
      <div className="team__compact-name">{member.name}</div>
      <div className="team__compact-title">{member.title}</div>
      {member.phone && <div className="team__compact-meta">{member.phone}</div>}
      {member.email && <div className="team__compact-meta">{member.email}</div>}
    </CardLink>
  )
}

export default function TeamPage({ pageNum }) {
  return (
    <StaticShell section="Our Team" title="Our Team" pageNum={pageNum}>
      <div className="team">
        <section className="team__section">
          <h2 className="team__heading">Leadership Team</h2>
          <div className="team__row" style={{ '--cols': 5 }}>
            {LEADERSHIP.map((m) => <BigCard key={m.name} member={m} />)}
          </div>
        </section>

        <section className="team__section">
          <h2 className="team__heading">Senior Investment Sales</h2>
          <div className="team__row" style={{ '--cols': 6 }}>
            {SENIOR_INVESTMENT_SALES.map((m) => <BigCard key={m.name} member={m} />)}
          </div>
        </section>

        <section className="team__section">
          <h2 className="team__heading">Investment Sales</h2>
          <div className="team__compact-grid">
            {INVESTMENT_SALES.map((m) => <CompactCard key={m.name} member={m} />)}
          </div>
        </section>
      </div>
    </StaticShell>
  )
}
