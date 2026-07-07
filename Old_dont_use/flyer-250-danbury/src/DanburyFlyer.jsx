import { DANBURY, BROKERS, FIRM_BIO } from './data.js'

/* ═══════════════════ 250 DANBURY ROAD — 4-PAGE FLYER ═══════════════════
   A long-form investment brief in the NPCG flyer style. Four landscape
   .flyer-page sides (1056×816); print-flyer.cjs screenshots each and
   composes a 4-page landscape PDF. All styling lives in index.css. */

const LOGO_WHITE = '/logos/npcg-white-hires.png'

function Header({ d, label }) {
  return (
    <div className="fl-back-header">
      <img src={LOGO_WHITE} alt="NPCG" />
      <div className="fl-bh-r">
        <div className="fl-bh-name">{d.name}</div>
        <div className="fl-bh-sub">{label} · {d.cityState}</div>
      </div>
    </div>
  )
}

function Footer({ d, n }) {
  return (
    <div className="fl-back-footer">
      <span>NortheastPCG, Inc.&nbsp;&nbsp;·&nbsp;&nbsp;{d.name} · {d.cityState}</span>
      <span><span className="u">{d.url}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{n}</span>
    </div>
  )
}

/* ── PAGE 1 · COVER ── */
function PageCover({ d }) {
  return (
    <div className="flyer-page db-cover">
      <div className="fl-hero">
        <img className="fl-hero-bg" src={d.photos.hero} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <div className="db-cover-fallback" />
        <div className="fl-hero-scrim" />
        <img className="fl-hero-logo" src={LOGO_WHITE} alt="NPCG" />
        <div className="fl-hero-copy">
          <div className="fl-eyebrow">{d.eyebrow}</div>
          <div className="fl-title">{d.name}</div>
          <div className="fl-addresses">{d.addresses} · {d.cityState}</div>
        </div>
      </div>
    </div>
  )
}

/* ── PAGE 2 · INVESTMENT OVERVIEW ── */
function PageOverview({ d }) {
  return (
    <div className="flyer-page">
      <Header d={d} label="Investment Summary" />
      <div className="db-body">
        <p className="fl-lead db-sum-lead">{d.lead}</p>

        <div className="db-sum-2col">
          {/* LEFT — big GIS map (full height) */}
          <div className="db-sum-mapcol">
            <div className="db-map db-map--sum">
              <img src={d.photos.gisMap} alt="GIS site map with parcel outline" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <div className="db-map-ph">GIS Site Map</div>
            </div>
            <div className="db-photo-cap">{d.gisCaption}</div>
          </div>

          {/* RIGHT — Deal at a Glance · Paths · Highlights / Watch */}
          <div className="db-sum-rightcol">
            <div className="fl-h3">Deal at a Glance</div>
            <div className="db-facts">
              {d.facts.map((f) => (
                <div className="db-fact" key={f.label}>
                  <span className="db-fact-l">{f.label}</span>
                  <span className={`db-fact-v${f.accent ? ' accent' : ''}`}>{f.value}</span>
                </div>
              ))}
            </div>

            <div className="fl-h3 db-sum-h3">Paths to Value</div>
            <ul className="fl-hi db-sum-hi">
              {d.paths.map((p, i) => <li key={i}><b>{p.tag}</b> — {p.body}</li>)}
            </ul>

            <div className="db-sum-hw">
              <div className="fl-h3 db-sum-h3">Highlights</div>
              <ul className="fl-hi db-sum-hi">
                {d.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              <div className="fl-h3 db-h3-watch db-sum-h3">Watch Items</div>
              <ul className="fl-hi db-hi-watch db-sum-hi">
                {d.watch.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer d={d} n={2} />
    </div>
  )
}

/* ── PAGE 3 · OL-1 DANBURY ROAD EAST OVERLAY ── */
function PageOverlay({ d }) {
  const o = d.overlay
  return (
    <div className="flyer-page">
      <Header d={d} label="Zoning Overlay" />
      <div className="db-body">
        <div className="db-ol-titlerow">
          <div>
            <div className="db-ol-title">{o.title}</div>
            <div className="db-ol-sub">{o.subtitle}</div>
          </div>
        </div>
        <div className="db-ol-grid">
          <div className="db-ol-mapcol">
            <div className="db-ol-map">
              <img src={o.map} alt="OL-1 overlay district location map" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="db-photo-cap">{o.mapCap}</div>
          </div>
          <div className="db-ol-textcol">
            <div className="fl-h3">Purpose</div>
            <div className="db-ol-purpose">
              {o.purpose.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="fl-h3">Key Standards</div>
            <div className="db-ol-standards">
              {o.standards.map((s) => (
                <div className="db-ol-std" key={s.label}>
                  <span className="db-ol-std-l">{s.label}</span>
                  <span className="db-ol-std-v">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="fl-h3">What It Means for 250 Danbury</div>
            <ul className="fl-hi db-ol-means">
              {o.whatItMeans.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <Footer d={d} n={3} />
    </div>
  )
}

/* ── PAGE 4 · BOTTOM LINE + CONTACTS ── */
function PageClose({ d }) {
  return (
    <div className="flyer-page">
      <Header d={d} label="Property & Contacts" />
      <div className="db-body">
        <div className="db-close-grid">
          {d.closingPhotos.map((p) => (
            <div className="db-cphoto" key={p.src}>
              <img src={p.src} alt={p.cap} onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <div className="db-cphoto-cap">{p.cap}</div>
            </div>
          ))}

          <div className="db-listed-card">
            <div className="db-listed-h">Exclusively Listed By</div>
            <p className="db-listed-bio">{FIRM_BIO}</p>
            <div className="db-listed-brokers">
              {BROKERS.map((b) => (
                <div className="db-listed-broker" key={b.name}>
                  <img src={b.photo} alt={b.name} />
                  <div>
                    <div className="db-lb-name">{b.name}</div>
                    <div className="db-lb-title">{b.title}</div>
                    <div className="db-lb-meta"><b>{b.phone}</b> · {b.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer d={d} n={4} />
    </div>
  )
}

export default function DanburyFlyer() {
  const d = DANBURY
  return (
    <>
      <PageCover d={d} />
      <PageOverview d={d} />
      <PageOverlay d={d} />
      <PageClose d={d} />
    </>
  )
}
