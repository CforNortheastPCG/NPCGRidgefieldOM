import './closing.css'

export function ClosingFlyer({ d }) {
  return (
    <div className="flyer-page cl-page">
      {/* full-bleed property photo */}
      <img className="cl-hero" src={d.hero} alt="" style={{ objectPosition: d.heroPos || 'center' }} />
      <div className="cl-scrim" />

      <img className="cl-logo" src="/logos/npcg-white-hires.png" alt="NPCG" />

      <div className="cl-panel">
        <div className="cl-address">{d.address}</div>
        <div className="cl-dash" />
        <div className="cl-status">{d.status}</div>
        <div className="cl-name">{d.name}</div>

        <div className="cl-stats">
          {d.stats.map((s) => (
            <div className="cl-stat" key={s.l}>
              <div className="cl-stat-l">{s.l}</div>
              <div className="cl-stat-v">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* deal-contact bar */}
      <div className="cl-contacts">
        <div className="cl-contacts-tag">Transaction Brokered By</div>
        <div className="cl-contacts-row">
          {d.contacts.map((c) => (
            <div className="cl-broker" key={c.name}>
              <img src={c.photo} alt={c.name} />
              <div className="cl-b-info">
                <div className="cl-b-name">{c.name}</div>
                <div className="cl-b-title">{c.title}</div>
                <div className="cl-b-meta">{c.phone} · {c.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
