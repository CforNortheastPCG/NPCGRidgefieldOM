import './portfolio.css'

export function PortfolioFlyer({ d }) {
  const stats = d.saleDate && d.saleDate !== 'TBD'
    ? [...d.stats, { l: 'Sale Date', v: d.saleDate }]
    : d.stats

  return (
    <div className="flyer-page cl-page">
      {/* full-bleed collage cover */}
      <img className="cl-hero" src={d.hero} alt="" style={{ objectPosition: d.heroPos || 'center' }} />
      <div className="cl-scrim" />

      <div className="cl-panel">
        <div className="cl-address">{d.subtitle}</div>
        <div className="cl-dash" />
        <div className="cl-status">{d.status}</div>
        <div className="cl-name">{d.name}</div>

        <div className="cl-stats">
          {stats.map((s) => (
            <div className="cl-stat" key={s.l}>
              <div className="cl-stat-l">{s.l}</div>
              <div className="cl-stat-v">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="cl-pc-block">
          <div className="cl-pc-tag">Transaction Brokered By</div>
          {d.contacts.map((c) => (
            <div className="cl-pc" key={c.name}>
              <img src={c.photo} alt={c.name} />
              <div>
                <div className="cl-pc-name">{c.name}</div>
                <div className="cl-pc-title">{c.title}</div>
                <div className="cl-pc-meta">{c.phone} · {c.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
