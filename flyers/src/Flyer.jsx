import { BROKERS, FIRM_BIO } from './flyerData.js'

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function parcelMapUrl(map) {
  const style = [
    'feature:poi|visibility:off',
    'feature:transit|visibility:off',
    'feature:road|element:labels|visibility:on',
  ]
  const paths = map.parcels.map(
    (pts) => `path=${encodeURIComponent(`fillcolor:0xF8971D55|color:0xF8971D|weight:3|${pts}`)}`,
  )
  const params = [
    `center=${map.center}`,
    `zoom=${map.zoom}`,
    'size=640x500',
    'scale=2',
    'maptype=hybrid',
    'format=jpg',
    ...style.map((s) => `style=${encodeURIComponent(s)}`),
    ...paths,
    `key=${KEY}`,
  ]
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
}

export function FlyerFront({ d }) {
  return (
    <div className="flyer-page">
      <div className={`fl-hero${d.titleTop ? ' fl-hero--top' : ''}`}>
        <img className="fl-hero-bg" src={d.hero} alt="" />
        <div className="fl-hero-scrim" />
        <img className="fl-hero-logo" src="/logos/npcg-white-hires.png" alt="NPCG" />
        <div className="fl-hero-copy">
          <div className="fl-eyebrow">For Sale</div>
          <div className="fl-title">{d.name}</div>
          <div className="fl-addresses">{d.addresses ? `${d.addresses} · ${d.cityState}` : d.cityState}</div>
        </div>
      </div>
    </div>
  )
}

export function FlyerBack({ d }) {
  return (
    <div className="flyer-page">
      <div className="fl-back-header">
        <img src="/logos/npcg-white-hires.png" alt="NPCG" />
        <div className="fl-bh-r">
          <div className="fl-bh-name">{d.name}</div>
          <div className="fl-bh-sub">Offering Summary · {d.cityState}</div>
        </div>
      </div>

      <div className="fl-back-body">
        <div className="fl-back-left">
          <div className="fl-h3">Executive Summary</div>
          <div className="fl-exec">
            {d.executiveSummary.map((p, i) => <p key={i}>{p}</p>)}
            <p className="fl-exec-cta">For more information, or to view the full portfolio, visit <span className="fl-link">{d.url}</span>.</p>
          </div>
          <div className="fl-h3" style={{ marginTop: 6 }}>Investment Highlights</div>
          <ul className="fl-hi">
            {d.highlights.map((h, i) => (
              <li key={i}>{h.title ? <><b>{h.title}</b> — {h.body}</> : h.body}</li>
            ))}
          </ul>
        </div>

        <div className="fl-back-right">
          <div className="fl-h3">Location &amp; Parcels</div>
          <div className="fl-map"><img src={parcelMapUrl(d.map)} alt="Parcel outline map" /></div>
          <div className="fl-map-cap">Subject parcels outlined · Worcester Canal District · Imagery © Google</div>

          <div className="fl-h3" style={{ marginTop: 16 }}>The Offering</div>
          <p className="fl-overview">{d.tagline}</p>

          <div className="fl-listed">
            <div className="fl-h3">Exclusively Listed By</div>
            <p className="fl-bio">{FIRM_BIO}</p>
            <div className="fl-contact">
              {BROKERS.map((b) => (
                <div className="fl-broker" key={b.name}>
                  <img src={b.photo} alt={b.name} />
                  <div>
                    <div className="fl-b-name">{b.name}</div>
                    <div className="fl-b-title">{b.title}</div>
                    <div className="fl-b-meta"><b>{b.phone}</b><br />{b.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fl-back-footer">
        <span>NortheastPCG, Inc.&nbsp;&nbsp;·&nbsp;&nbsp;{d.name}</span>
        <span>FOR MORE INFORMATION&nbsp;&nbsp;·&nbsp;&nbsp;<span className="u">{d.url}</span></span>
      </div>
    </div>
  )
}
