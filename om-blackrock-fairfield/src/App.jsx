import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import SiteMap from './SiteMap.jsx'
import { PhotoPage } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        <div className="cover-hero-shade" />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title">{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" />
          <div className="cover-hero-prep">{DEAL.type}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 2 — EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ pageNum }) {
  const stats = [
    { v: '$4,300,000', l: 'Asking Price' },
    { v: '16', l: 'Units (15 Res + Retail)' },
    { v: '6.05%', l: 'Current Cap Rate' },
    { v: '$268,750', l: 'Price / Unit' },
  ]
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {stats.map(s => (
                <div key={s.l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              Northeast Private Client Group is pleased to present <strong>Black Rock Commons</strong>, a 16-unit
              mixed-use multifamily property at 2836 Fairfield Avenue in the heart of Bridgeport&rsquo;s Black Rock
              neighborhood &mdash; the city&rsquo;s most desirable, walkable district, sitting directly on the
              Fairfield town line.
            </p>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              The property comprises <strong>15 renovated apartments</strong> &mdash; a deep, rentable mix of one-,
              two-, and three-bedroom homes &mdash; over a <strong>ground-floor retail unit</strong> leased to an
              established neighborhood tenant. Originally built in 1933 and substantially renovated in 2015, the
              elevator-served building is <strong>100% occupied</strong> and produces durable, diversified income
              along Fairfield Avenue&rsquo;s thriving dining and retail corridor.
            </p>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              The investment thesis is straightforward mark-to-market. In-place residential rents sit roughly{' '}
              <strong>$57,300 per year below market</strong>; as units turn to prevailing Black Rock rents,
              pro-forma NOI grows about <strong>21%</strong> from $259,985 to $313,322 &mdash; lifting the going-in
              yield from a <strong>6.05% cap to 7.29%</strong> without speculative assumptions. Black Rock&rsquo;s
              walkability, waterfront, and relative value versus neighboring Fairfield keep renter demand deep and
              occupancy tight through every cycle.
            </p>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights ridge-highlights" style={{ flex: 1, justifyContent: 'space-between' }}>
              <li><strong>Embedded Mark-to-Market Upside</strong> — In-place residential rents ~$57,300/yr below market; pro-forma NOI grows ~21% to $313,322</li>
              <li><strong>Diversified Mixed-Use Income</strong> — 15 apartments over ground-floor retail leased through 2027, adding commercial diversification</li>
              <li><strong>Stabilized &amp; 100% Occupied</strong> — All 16 units leased; elevator-served, renovated 2015, efficient ~34% expense ratio</li>
              <li><strong>Black Rock Location</strong> — Bridgeport&rsquo;s premier walkable neighborhood on the Fairfield line — Fairfield Ave corridor, harbor &amp; Metro-North</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/exec-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/exec-2.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PROPERTY OVERVIEW ═══════════════════ */
function PropertyOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Property <span style={{ color: '#F8971D' }}>Overview</span></div>
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Site Summary</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Address</span><span className="bldg-val">{FULL_ADDR}</span></div>
                <div className="bldg-row"><span className="bldg-label">Neighborhood</span><span className="bldg-val">Black Rock (on the Fairfield line)</span></div>
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use Multifamily</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">16 (15 Residential + 1 Retail)</span></div>
                <div className="bldg-row"><span className="bldg-label">Gross Building SF</span><span className="bldg-val">21,048 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Net Rentable SF</span><span className="bldg-val">14,620 SF (13,120 Res + 1,500 Retail)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.61 Acres (~26,572 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built / Renovated</span><span className="bldg-val">1933 / 2015</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories / Access</span><span className="bldg-val">3 Stories + Basement · Elevator-Served</span></div>
                <div className="bldg-row"><span className="bldg-label">Occupancy</span><span className="bldg-val">100% (16 of 16)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">On-Site Surface</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities &amp; Mechanicals</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant-metered units · house meter common areas</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Owner-paid (sub-metering = upside)</span></div>
                <div className="bldg-row"><span className="bldg-label">Vertical Transport</span><span className="bldg-val">Passenger elevator</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1.3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Composition</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">1 Bed / 1 Bath</span><span className="bldg-val">7 Units · ~743 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">2 Bed / 1 Bath</span><span className="bldg-val">4 Units · ~913 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">2 Bed / 2 Bath</span><span className="bldg-val">3 Units · ~1,040 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">3 Bed / 2 Bath</span><span className="bldg-val">1 Unit · ~1,150 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Ground-Floor Retail</span><span className="bldg-val">1 Unit · 1,500 SF</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Commercial Tenant</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Tenant (Unit 102)</span><span className="bldg-val">Casa Buena Team, LLC</span></div>
                <div className="bldg-row"><span className="bldg-label">Size / Rent</span><span className="bldg-val">1,500 SF · $2,600/mo ($20.80/SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lease Term</span><span className="bldg-val">Dec 2024 – Dec 2027</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Taxes &amp; Assessment</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Current Taxes</span><span className="bldg-val">$62,906</span></div>
                <div className="bldg-row"><span className="bldg-label">Assessment</span><span className="bldg-val">$2,250,670</span></div>
                <div className="bldg-row"><span className="bldg-label">Mill Rate / Next Reval</span><span className="bldg-val">27.95 · 2030</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  const cards = [
    { t: 'Mark-to-Market Rent Upside', b: 'In-place residential rents run roughly $57,300/yr below market. Marking the 15 apartments to prevailing Black Rock rents grows pro-forma NOI ~21% — from $259,985 to $313,322 — and lifts the going-in yield from 6.05% to 7.29% with no renovation or repositioning required.' },
    { t: 'Diversified Mixed-Use Income', b: 'A ground-floor retail unit (Casa Buena Team, LLC) leased through December 2027 at $2,600/mo contributes ~$31,200/yr of commercial income that diversifies the rent roll and steps to $2,750/mo on its contractual schedule.' },
    { t: 'Stabilized, 100% Occupied', b: 'All 16 units are currently leased. The asset was renovated in 2015, is elevator-served, and operates at an efficient ~34% expense ratio — a true turnkey acquisition with day-one cash flow.' },
    { t: 'Premier Black Rock Location', b: "On the Fairfield town line in Bridgeport's most walkable, sought-after neighborhood — steps from the Fairfield Avenue dining and retail corridor, St. Mary's-By-The-Sea, Black Rock Harbor, and Metro-North access to Manhattan." },
    { t: 'Deep, Rentable Unit Mix', b: 'A practical spread of seven 1-bedrooms, seven 2-bedrooms, and a 3-bedroom appeals to the broadest pool of Black Rock renters, supporting consistent occupancy and pricing power across cycles.' },
    { t: 'Operational Upside', b: 'Owner currently carries water, sewer, and trash; sub-metering and expense recapture present a clear path to further margin expansion beyond the in-place pro forma.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: 12, flex: 1, minHeight: 0 }}>
          {cards.map((c, i) => (
            <div key={c.t} className="bldg-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--golden)', color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <h3 style={{ fontSize: 12, fontWeight: 800, color: 'var(--carbon)', margin: 0 }}>{c.t}</h3>
              </div>
              <p style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', margin: 0 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ FULL BLEED PHOTO ═══════════════════ */
function PhotoFullBleed() {
  return (
    <div className="page">
      <div className="photo-full-bleed">
        <img src="/photos/full-1.jpg" alt="Building Overview" />
      </div>
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
function DonutChart({ data, size = 104, thickness = 19, centerLabel, centerSub }) {
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ece7e1" strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.value / total) * C
          const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * C, 0)
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color}
              strokeWidth={thickness} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
          )
        })}
      </g>
      {centerLabel && (
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 21, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>
      )}
    </svg>
  )
}

function ChartCard({ title, data, centerLabel, centerSub }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 8.8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600 }}>{d.label}</span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.value} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RentRoll({ pageNum }) {
  // In-Place = current contract rent; Market = highest achieved on a comparable
  // unit today; Pro Forma = stabilized mark-to-market target. Transcribed from
  // the 2836 Fairfield I&E workbook (Rent Roll tab), as of 06/08/2026.
  const units = [
    { unit: '101', type: '2BR / 1BA', sqft: 900, inPlace: 2150, market: 2225, proforma: 2500 },
    { unit: '103', type: '1BR / 1BA', sqft: 750, inPlace: 1950, market: 2050, proforma: 2250 },
    { unit: '104', type: '1BR / 1BA', sqft: 500, inPlace: 1800, market: 2050, proforma: 2250 },
    { unit: '105', type: '1BR / 1BA', sqft: 750, inPlace: 1800, market: 2050, proforma: 2250 },
    { unit: '106', type: '2BR / 1BA', sqft: 950, inPlace: 2125, market: 2225, proforma: 2500 },
    { unit: '107', type: '2BR / 2BA', sqft: 960, inPlace: 2300, market: 2350, proforma: 2600 },
    { unit: '108', type: '1BR / 1BA', sqft: 850, inPlace: 2000, market: 2050, proforma: 2250 },
    { unit: '201', type: '2BR / 1BA', sqft: 900, inPlace: 2225, market: 2225, proforma: 2500 },
    { unit: '202', type: '3BR / 2BA', sqft: 1150, inPlace: 2400, market: 2400, proforma: 2800 },
    { unit: '203', type: '1BR / 1BA', sqft: 750, inPlace: 2050, market: 2050, proforma: 2250 },
    { unit: '204', type: '2BR / 2BA', sqft: 1200, inPlace: 2350, market: 2350, proforma: 2600 },
    { unit: '205', type: '1BR / 1BA', sqft: 750, inPlace: 1900, market: 2050, proforma: 2250 },
    { unit: '206', type: '2BR / 1BA', sqft: 900, inPlace: 2225, market: 2225, proforma: 2500 },
    { unit: '207', type: '2BR / 2BA', sqft: 960, inPlace: 2300, market: 2350, proforma: 2600 },
    { unit: '208', type: '1BR / 1BA', sqft: 850, inPlace: 2000, market: 2050, proforma: 2250 },
  ]
  const commercial = { unit: '102', type: 'Ground-Floor Retail', sqft: 1500, inPlace: 2600, market: 2600, proforma: 2750 }
  const resSqft = units.reduce((s, u) => s + u.sqft, 0)
  const resIn = units.reduce((s, u) => s + u.inPlace, 0)
  const resMkt = units.reduce((s, u) => s + u.market, 0)
  const resPf = units.reduce((s, u) => s + u.proforma, 0)
  const totSqft = resSqft + commercial.sqft
  const totIn = resIn + commercial.inPlace
  const totMkt = resMkt + commercial.market
  const totPf = resPf + commercial.proforma

  const unitMix = [
    { label: '1 Bedroom', value: 7, color: '#3F4753' },
    { label: '2 Bedroom', value: 7, color: '#F8971D' },
    { label: '3 Bedroom', value: 1, color: '#B55D37' },
    { label: 'Retail', value: 1, color: '#6B7A8F' },
  ]
  const useMix = [
    { label: 'Residential', value: 15, color: '#3F4753' },
    { label: 'Commercial', value: 1, color: '#F8971D' },
  ]
  const td = { fontSize: 8.3, padding: '1.6px 7px' }
  const tdr = { ...td, textAlign: 'right' }
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix &amp; <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 8.3 }}>
          <thead><tr>
            <th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th>
            <th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Market</th><th style={{ textAlign: 'right' }}>Pro Forma</th>
          </tr></thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={u.unit} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={td}>{u.unit}</td>
                <td style={td}>{u.type}</td>
                <td style={tdr}>{u.sqft.toLocaleString()}</td>
                <td style={tdr}>${u.inPlace.toLocaleString()}</td>
                <td style={tdr}>${u.market.toLocaleString()}</td>
                <td style={tdr}>${u.proforma.toLocaleString()}</td>
              </tr>
            ))}
            <tr style={{ background: '#f3ece2' }}>
              <td style={{ ...td, fontWeight: 700 }}>{commercial.unit}</td>
              <td style={{ ...td, fontWeight: 700 }}>{commercial.type} · Casa Buena</td>
              <td style={{ ...tdr, fontWeight: 700 }}>{commercial.sqft.toLocaleString()}</td>
              <td style={{ ...tdr, fontWeight: 700 }}>${commercial.inPlace.toLocaleString()}</td>
              <td style={{ ...tdr, fontWeight: 700 }}>${commercial.market.toLocaleString()}</td>
              <td style={{ ...tdr, fontWeight: 700 }}>${commercial.proforma.toLocaleString()}</td>
            </tr>
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>16 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{totSqft.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totIn.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totMkt.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totPf.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 4, lineHeight: 1.4 }}>
          Monthly figures. In-Place = current contract rent; Market = highest achieved on a comparable unit;
          Pro Forma = stabilized mark-to-market target. Residential In-Place $410,100/yr incl. retail; Pro Forma $469,200/yr.
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 12, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Mix" data={unitMix} centerLabel="16" centerSub="UNITS" />
          <ChartCard title="Use" data={useMix} centerLabel="16" centerSub="UNITS" />
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Income by Component</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, justifyContent: 'center' }}>
              {[
                { label: 'Residential (15)', monthly: '$31,575', avg: '$2,105 avg / unit', color: '#3F4753' },
                { label: 'Commercial (1)', monthly: '$2,600', avg: '$20.80 / SF', color: '#F8971D' },
              ].map(r => (
                <div key={r.label} style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: 10 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--stone)' }}>{r.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{r.monthly}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                  <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{r.avg}</div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 9, marginTop: 1 }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--golden)' }}>Total &mdash; In-Place</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>$34,175<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>$410,100 / yr &middot; 100% occupied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.5, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'right' }
  const thl = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Year 1 (In-Place)', val: '$259,985' },
    { label: 'NOI — Pro Forma', val: '$313,322' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income &amp; <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 21, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.val}</div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Residential Scheduled Rent', '$378,900', '$25,260', '$436,200', '$29,080', false],
              ['Commercial Scheduled Rent', '$31,200', '$2,080', '$33,000', '$2,200', false],
              ['Gross Scheduled Rent', '$410,100', '$27,340', '$469,200', '$31,280', true],
              ['Vacancy & Collections Loss (5%)', '-$20,505', '-$1,367', '-$23,460', '-$1,564', false],
              ['Effective Rental Income', '$389,595', '$25,973', '$445,740', '$29,716', true],
              ['Other Income (fees, pet, etc.)', '$6,017', '$401', '$6,017', '$401', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$395,612</td><td style={totBg}>$24,726</td><td style={totBg}>$451,757</td><td style={totBg}>$28,235</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Real Estate Taxes', '$62,906', '$3,932', '$62,906', '$3,932'],
              ['Property Management (5%)', '$19,781', '$1,236', '$22,588', '$1,412'],
              ['Property Insurance', '$16,000', '$1,000', '$16,000', '$1,000'],
              ['Water & Sewer', '$7,610', '$476', '$7,610', '$476'],
              ['Electric (Common)', '$6,929', '$433', '$6,929', '$433'],
              ['Trash Removal', '$6,794', '$425', '$6,794', '$425'],
              ['Repairs & Maintenance', '$8,000', '$500', '$8,000', '$500'],
              ['Landscaping / Snow', '$6,000', '$375', '$6,000', '$375'],
              ['Elevator', '$1,607', '$100', '$1,607', '$100'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$135,627</td><td style={totBg}>$8,477</td><td style={totBg}>$138,434</td><td style={totBg}>$8,652</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$259,985</td><td style={noiBg}>6.05% Cap</td><td style={noiBg}>$313,322</td><td style={noiBg}>7.29% Cap</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 2, lineHeight: 1.4 }}>
          Year 1 reflects in-place rents; Pro Forma marks the 15 apartments to market (+$57,300/yr). Expense ratio
          34.3% (Year 1) / 30.6% (Pro Forma). Caps on the $4,300,000 asking price. Property management and a 5%
          vacancy factor are underwriting assumptions and may differ from current owner operations.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ TRAILING 12-MONTH CASH FLOW ═══════════════════ */
function TrailingCashFlow({ pageNum }) {
  const tds = { fontSize: 9, padding: '4px 9px', textAlign: 'right' }
  const tdl = { fontSize: 9, padding: '4px 9px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const expenses = [
    ['Repairs, Maintenance & Turnover', '$32,545'],
    ['Management, Asset & Leasing Fees', '$28,888'],
    ['Utilities — Electric, Water, Sewer, Trash', '$20,829'],
    ['Administrative & Professional', '$7,591'],
    ['Interest & Miscellaneous', '$136'],
  ]
  return (
    <div className="page">
      <PageHeader section="Trailing 12-Month" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Trailing 12-Month <span style={{ color: '#F8971D' }}>Operating Statement</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>
          Actual owner-reported cash flow for the twelve months ending June 2026 (cash basis). Sourced from
          All-Star Property Management (Jul 2025 – Mar 2026) and LYP Management (Apr 2026 – Jun 2026), reflecting
          the spring 2026 management transition.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <table className="data-table" style={{ fontSize: 9 }}>
              <thead><tr><th>T-12 Actual (Jul &rsquo;25 – Jun &rsquo;26)</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
              <tbody>
                <tr><td style={{ ...tdl, fontWeight: 700 }}>Total Income</td><td style={{ ...tds, fontWeight: 700 }}>$377,102</td></tr>
                {expenses.map((e, i) => (
                  <tr key={e[0]} style={i % 2 === 0 ? { background: 'var(--linen)' } : undefined}>
                    <td style={tdl}>{e[0]}</td><td style={tds}>{e[1]}</td>
                  </tr>
                ))}
                <tr><td style={{ background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '4px 9px' }}>Total Operating Expenses</td><td style={{ background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '4px 9px', textAlign: 'right' }}>$89,989</td></tr>
                <tr><td style={{ background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '5px 9px' }}>Net Operating Income (Cash)</td><td style={{ background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '5px 9px', textAlign: 'right' }}>$287,113</td></tr>
              </tbody>
            </table>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 6, lineHeight: 1.4 }}>
              T-12 actuals exclude real estate taxes and property insurance, which the stabilized underwriting on the
              prior page adds back &mdash; the reason the conservative Year-1 underwritten NOI ($259,985) sits below
              the trailing cash NOI ($287,113).
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
            {[
              { v: '$377,102', l: 'T-12 Total Income' },
              { v: '$89,989', l: 'T-12 Operating Expenses' },
              { v: '$287,113', l: 'T-12 Net Operating Income (cash)' },
              { v: '100%', l: 'Occupancy (16 of 16 units)' },
            ].map(s => (
              <div key={s.l} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ DEAL CONTACTS ═══════════════════ */
function DealContacts({ pageNum }) {
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Taylor-Perun-430x488.png" alt="Taylor Perun" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Taylor Perun</div>
            <div className="dc-title">Senior Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1576</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>tperun@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Brad-B-2-430x488.jpg" alt="Brad Balletto" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Brad Balletto</div>
            <div className="dc-title">Managing Director, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1574</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>bballetto@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Jeff-Wright-430x488.png" alt="Jeff Wright" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Jeff Wright</div>
            <div className="dc-title">Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1581</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>jwright@northeastpcg.com</div>
          </div>
        </aside>
        <section className="dc-disclaimer">
          <h3 className="dc-disclaimer-title">Confidentiality and Disclaimer</h3>
          <p>All materials and information received or derived from NortheastPCG, Inc. its directors, officers, agents, advisors, affiliates and/or any third party sources are provided without representation or warranty as to completeness, veracity, or accuracy, condition of the property, compliance or lack of compliance with applicable governmental requirements, developability or suitability, financial performance of the property, projected financial performance of the property for any party's intended use or any and all other matters.</p>
          <p>Neither NortheastPCG, Inc. its directors, officers, agents, advisors, or affiliates makes any representation or warranty, express or implied, as to accuracy or completeness of the any materials or information provided, derived, or received. Materials and information from any source, whether written or verbal, that may be furnished for review are not a substitute for a party's active conduct of its own due diligence to determine these and other matters of significance to such party. NortheastPCG, Inc. will not investigate or verify any such matters or conduct due diligence for a party unless otherwise agreed in writing.</p>
          <p><strong>Each party shall conduct its own independent investigation and due diligence.</strong></p>
          <p>Any party contemplating or under contract or in escrow for a transaction is urged to verify all information and to conduct their own inspections and investigations including through appropriate third party independent professionals selected by such party. All financial data should be verified by the party including by obtaining and reading applicable documents and reports and consulting appropriate independent professionals. NortheastPCG, Inc. makes no warranties and/or representations regarding the veracity, completeness, or relevance of any financial data or assumptions. NortheastPCG, Inc. does not serve as a financial advisor to any party regarding any proposed transaction. All data and assumptions regarding financial performance, including that used for financial modeling purposes, may differ from actual data or performance. Any estimates of market rents and/or projected rents that may be provided to a party do not necessarily mean that rents can be established at or increased to that level. Parties must evaluate any applicable contractual and governmental limitations as well as market conditions, vacancy factors and other issues in order to determine rents from or for the property.</p>
          <p>Legal questions should be discussed by the party with an attorney. Tax questions should be discussed by the party with a certified public accountant or tax attorney. Title questions should be discussed by the party with a title officer or attorney. Questions regarding the condition of the property and whether the property complies with applicable governmental requirements should be discussed by the party with appropriate engineers, architects, contractors, other consultants and governmental agencies. All properties and services are marketed by NortheastPCG, Inc. in compliance with all applicable fair housing and equal opportunity laws.</p>
        </section>
      </div>
    </StaticShell>
  )
}

/* ═══════════════════ BLACK ROCK — LIVE WHERE YOU INVEST ═══════════════════ */
function BlackRockOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Black Rock, <span style={{ color: '#F8971D' }}>Bridgeport</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Live Where You Invest</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Black Rock is Bridgeport&rsquo;s most coveted neighborhood &mdash; a historic, harbor-front enclave on
              the city&rsquo;s far west side that runs right up to the Fairfield town line. Built around sea-captains&rsquo;
              homes and a genuine walkable Main Street, its spine is <strong>Fairfield Avenue</strong>: a dense,
              lively corridor of independent restaurants, bars, coffee shops, galleries, and music venues anchored by
              neighborhood institutions like Taco Loco, The Sitting Room, and Park City Music Hall. Residents stroll
              to dinner, walk the half-mile waterfront promenade at <strong>St. Mary&rsquo;s-By-The-Sea</strong>, and
              keep boats at Captain&rsquo;s Cove Seaport on Black Rock Harbor.
            </p>
            <p>
              For an investor, that lifestyle converts directly into rent-roll durability. Black Rock offers the
              walkability and waterfront of neighboring Fairfield and Westport at a meaningful discount, drawing a
              deep, year-round pool of young professionals, commuters, and downsizers. Demand is consistent,
              turnover re-prices quickly to market, and quality multifamily on Fairfield Avenue rarely trades. The
              thesis is simple: people want to live in Black Rock &mdash; and there are very few well-located doors
              available to them.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Black Rock</div>
          <ul className="highlights ridge-highlights">
            <li>Bridgeport&rsquo;s most desirable neighborhood — historic waterfront enclave directly on the Fairfield town line</li>
            <li>Fairfield Avenue corridor — walkable dining, nightlife, coffee, galleries, and live music</li>
            <li>St. Mary&rsquo;s-By-The-Sea waterfront promenade, Black Rock Harbor &amp; Captain&rsquo;s Cove Seaport</li>
            <li>Strong renter demand — walkability and waterfront at a discount to neighboring Fairfield &amp; Westport</li>
            <li>Metro-North New Haven Line (Fairfield Metro &amp; Bridgeport stations) — direct service to Grand Central</li>
            <li>Quick access to I-95 (Exits 24/25) and Route 1; minutes to downtown Fairfield and Sacred Heart University</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="Black Rock waterfront and Fairfield Avenue" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-3.jpg" alt="2836 Fairfield Avenue, Black Rock" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ WHY BLACK ROCK (lifestyle / the scene) ═══════════════════ */
function WhyBlackRock({ pageNum }) {
  const themes = [
    { t: 'The Scene', b: 'Fairfield Avenue is the spine — a dense, independent strip of restaurants, cocktail bars, coffee roasters, galleries, and live music. Taco Loco, The Sitting Room, Harborview Market, and Park City Music Hall draw a crowd from across the region. It feels like a real neighborhood, not a strip mall.' },
    { t: 'The Waterfront', b: "Black Rock is a peninsula. Residents walk or bike the half-mile shoreline promenade at St. Mary's-By-The-Sea at sunset, keep boats at Captain's Cove Seaport, and live minutes from Long Island Sound. Water is the whole point — and it never gets old." },
    { t: 'The Walk', b: 'Sea-captain Victorians, tree-lined side streets, and a genuinely walkable core. You can get coffee, dinner, drinks, and groceries on foot — the kind of car-optional lifestyle that renters now pay a premium for and rarely find in coastal Connecticut.' },
  ]
  const stats = [
    { v: '~17,000', l: 'University students within ~10 min (SHU + Fairfield U)' },
    { v: '½ mile', l: 'Shoreline promenade at St. Mary’s-By-The-Sea' },
    { v: '30+', l: 'Independent eateries & bars on Fairfield Ave' },
    { v: '~80 min', l: 'Metro-North to Grand Central' },
  ]
  return (
    <div className="page">
      <PageHeader section="The Neighborhood" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">The Neighborhood</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Why <span style={{ color: '#F8971D' }}>Black Rock</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--carbon)', fontWeight: 600, marginBottom: 14, borderLeft: '4px solid var(--golden)', paddingLeft: 14 }}>
          The coolest neighborhood on Connecticut&rsquo;s Gold Coast — a walkable, harbor-front village with the
          food, the water, and the vibe of Fairfield, at a fraction of the cost. People don&rsquo;t settle for Black
          Rock. They choose it.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {themes.map(t => (
              <div key={t.t} className="bldg-card" style={{ padding: '12px 15px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', margin: 0 }}>{t.t}</h3>
                <p style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)', margin: 0 }}>{t.b}</p>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 'auto' }}>
              {stats.map(s => (
                <div key={s.l} style={{ borderTop: '3px solid var(--golden)', padding: '5px 2px' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8.2, fontWeight: 600, color: 'var(--stone)', marginTop: 3, lineHeight: 1.3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: 3 }}>
              <img src="/photos/area-2.jpg" alt="Black Rock waterfront" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: 3 }}>
              <img src="/photos/area-3.jpg" alt="Fairfield Avenue corridor" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ FAIRFIELD LIVING, WITHOUT THE FAIRFIELD TAX ═══════════════════ */
function FairfieldTax({ pageNum }) {
  const personas = [
    { t: 'New Grads & Young Professionals', b: 'Sacred Heart and Fairfield University turn out ~17,000 students next door; many want to stay on the coast after graduation but can’t — and don’t want to — buy in Fairfield. Black Rock is where they land.' },
    { t: 'Priced-Out-of-Fairfield Renters', b: 'Households that want beaches, walkable dining, and a Metro-North commute, but balk at Fairfield/Westport rents and home prices. Black Rock delivers the same coastal lifestyle for materially less.' },
    { t: 'Downsizers & Right-Sizers', b: 'Empty-nesters and remote workers trading a big-house mortgage for a lock-and-leave apartment steps from the water and the avenue.' },
  ]
  const td = { fontSize: 10.5, padding: '6px 10px' }
  return (
    <div className="page">
      <PageHeader section="Renter Demand" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Renter Demand</div>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 25 }}>Fairfield Living, <span style={{ color: '#F8971D' }}>Without the Fairfield Tax</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 14 }}>
          Black Rock&rsquo;s entire investment story is captured in one idea: it offers the Fairfield County coastal
          lifestyle &mdash; the water, the walkability, the restaurants, the train to Manhattan &mdash; without the
          Fairfield County price tag. That gap is the engine of durable renter demand. Tenants get the life they
          want; owners get a deep, motivated pool of renters and rents that re-price upward as units turn.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>The &ldquo;Fairfield Tax&rdquo; &mdash; Same Coast, Different Price</h3>
            <table className="data-table" style={{ fontSize: 10.5 }}>
              <thead><tr><th>Metric</th><th style={{ textAlign: 'right' }}>Town of Fairfield</th><th style={{ textAlign: 'right' }}>Black Rock</th></tr></thead>
              <tbody>
                <tr><td style={td}>Median Home Price</td><td style={{ ...td, textAlign: 'right' }}>$865,000</td><td style={{ ...td, textAlign: 'right' }}>$335,000</td></tr>
                <tr><td style={td}>Avg Apartment Rent</td><td style={{ ...td, textAlign: 'right' }}>$3,120/mo</td><td style={{ ...td, textAlign: 'right' }}>~$2,100/mo</td></tr>
                <tr><td style={td}>Coastal &amp; Walkable</td><td style={{ ...td, textAlign: 'right' }}>Yes</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
                <tr><td style={td}>Metro-North to NYC</td><td style={{ ...td, textAlign: 'right' }}>Yes</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
              </tbody>
            </table>
            <div style={{ marginTop: 12, background: 'var(--carbon)', color: '#fff', borderRadius: 4, padding: '12px 14px' }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--golden)' }}>The Fairfield Tax</div>
              <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.15, marginTop: 4 }}>~$1,000 / mo less to rent</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.82)', marginTop: 3, lineHeight: 1.4 }}>
                &mdash; and ~$530,000 less to own &mdash; for the same Gold Coast lifestyle, one town over.
              </div>
            </div>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 'auto', paddingTop: 8, lineHeight: 1.4 }}>
              Sources: Fairfield median home price (Raveis, 2026); Bridgeport median home price; Fairfield average
              apartment rent (RentCafe, 2025); Black Rock figure reflects in-place rents at the subject. Illustrative
              and approximate &mdash; verify independently.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Who Rents Black Rock</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {personas.map(p => (
                <div key={p.t} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)' }}>{p.t}</div>
                  <div style={{ fontSize: 9.5, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 2 }}>{p.b}</div>
                </div>
              ))}
              <div className="bldg-card" style={{ padding: '11px 13px', marginTop: 'auto' }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 4 }}>Why it matters to ownership</div>
                <div style={{ fontSize: 9.3, lineHeight: 1.45, color: 'var(--graphite)' }}>
                  A wide, value-driven renter base keeps Black Rock occupancy tight and turnover fast to re-lease &mdash;
                  exactly the conditions that let in-place rents at 2836 Fairfield Avenue march toward the
                  $57,300/yr mark-to-market upside underwritten in the pro forma.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ BRIDGEPORT / FAIRFIELD COUNTY ═══════════════════ */
function FairfieldCounty({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Bridgeport in <span style={{ color: '#F8971D' }}>Fairfield County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.3, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>Black Rock sits inside Fairfield County — Connecticut&rsquo;s largest and wealthiest county, with roughly 957,000 residents and four of the state&rsquo;s biggest cities in Bridgeport, Stamford, Norwalk, and Danbury. It anchors one of the Northeast&rsquo;s deepest, most diversified economies — financial and professional services, healthcare, advanced manufacturing, and education — and is home to nineteen Fortune 1000 headquarters.</p>
            <p>Bridgeport is the county&rsquo;s economic engine and Connecticut&rsquo;s most populous city — home to Bridgeport Hospital, Sacred Heart University, the University of Bridgeport, and major employers anchored by nearby Sikorsky. As a majority-renter city, it generates deep, sustained rental demand, and Black Rock captures the top of that demand with its walkability, waterfront, and Fairfield-line location.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — City of Bridgeport vs. Fairfield County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>City of Bridgeport</th>
                  <th style={{ textAlign: 'right' }}>Fairfield County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>148,654</td><td style={{ textAlign: 'right' }}>957,419</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>52,608</td><td style={{ textAlign: 'right' }}>360,159</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$56,407</td><td style={{ textAlign: 'right' }}>$110,000</td></tr>
                <tr><td>Renter-Occupied</td><td style={{ textAlign: 'right' }}>~58%</td><td style={{ textAlign: 'right' }}>~32%</td></tr>
                <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>34.6</td><td style={{ textAlign: 'right' }}>40.8</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>
            Bridgeport&rsquo;s majority-renter base drives durable apartment demand; Black Rock&rsquo;s incomes and rents
            index well above the city average given its waterfront, walkability, and Fairfield-line location. Source:
            U.S. Census ACS 5-Year Estimates (approximate; verify independently).
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/area-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ AERIAL CONTEXT (full-bleed drone + labeled points) ═══════════════════
   Edge-to-edge Black Rock drone shots with the NPCG mark and labeled map points.
   Each point is { x, y, label, primary? } where x/y are % of the page box
   (object-fit: cover) — tune them with aerial-pin-tuner.html once real aerials
   are dropped in. The `primary` point (the subject property) renders larger in
   golden; others are white POI markers. */
function AerialPoint({ x, y, label, title, primary }) {
  const chipBg = primary ? 'rgba(20,24,30,0.86)' : 'rgba(20,24,30,0.74)'
  const box = !!title || (typeof label === 'string' && label.includes('\n'))
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
      <div style={{ background: chipBg, color: '#fff', padding: primary ? '5px 12px' : '5px 10px', borderRadius: 4, textAlign: box ? 'left' : 'center', whiteSpace: box ? 'pre-line' : 'nowrap', maxWidth: box ? 240 : 'none', lineHeight: box ? 1.5 : 1.2, boxShadow: '0 2px 10px rgba(0,0,0,0.55)' }}>
        {primary && <span style={{ display: 'block', color: '#F8971D', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 8.5, fontWeight: 700 }}>Subject Property</span>}
        {title && <span style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#F8971D', borderBottom: '1px solid rgba(255,255,255,0.28)', paddingBottom: 3, marginBottom: 4 }}>{title}</span>}
        <span style={{ fontSize: primary ? 12 : title ? 10 : 10.5, fontWeight: title ? 600 : 700 }}>{label}</span>
      </div>
      <div style={{ width: 2, height: 16, background: '#F8971D', boxShadow: '0 1px 3px rgba(0,0,0,0.55)' }} />
      <div style={{ width: primary ? 10 : 7, height: primary ? 10 : 7, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
    </div>
  )
}

function AerialStreet({ x, y, label, angle = 0 }) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${angle}deg)`, pointerEvents: 'none' }}>
      <div style={{ background: 'rgba(20,24,30,0.66)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 3, whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{label}</div>
    </div>
  )
}

function AerialContext({ src, points = [], logo = '/logos/npcg-white-hires.png' }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={src} alt="Aerial view of Black Rock, Bridgeport" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 24, left: 36 }}>
          <img src={logo} alt="" style={{ maxHeight: 42, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {points.map((p, i) => p.kind === 'street' ? <AerialStreet key={i} {...p} /> : <AerialPoint key={i} {...p} />)}
      </div>
    </div>
  )
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  // Page order is the single source of truth — pageNum is auto-assigned by
  // position below (1-based). Keep Toc.jsx's `n` values in sync.
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <Divider eyebrow="01" title="The Property" image="/photos/ext-1.jpg" />,
    <PropertyOverview />,
    <SiteMap />,
    <InvestmentHighlights />,
    ...PHOTO_PAGES.map(p => <PhotoPage {...p} />),
    <PhotoFullBleed />,
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ext-2.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <TrailingCashFlow />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/aerial-1.jpg" />,
    <BlackRockOverview />,
    <WhyBlackRock />,
    <FairfieldTax />,
    <AerialContext src="/photos/aerial-2.jpg" points={[
      { x: 50, y: 78, label: '2836 Fairfield Avenue', primary: true },
      { x: 38, y: 34, title: 'Fairfield Avenue Corridor', label: 'Taco Loco\nThe Sitting Room\nPark City Music Hall\nBlackrock Social\nHarborview Market' },
      { x: 72, y: 40, label: "St. Mary's-By-The-Sea" },
      { x: 50, y: 92, kind: 'street', angle: -6, label: 'Fairfield Avenue' },
    ]} />,
    <AerialContext src="/photos/aerial-3.jpg" points={[
      { x: 48, y: 80, label: '2836 Fairfield Avenue', primary: true },
      { x: 60, y: 36, label: 'Black Rock Harbor' },
      { x: 28, y: 44, label: "Captain's Cove Seaport" },
      { x: 78, y: 60, label: 'Fairfield Town Line' },
    ]} />,
    <LocationMap />,
    <FairfieldCounty />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/parcel-1.jpg" />,
    <TeamPage />,
    <LocationsPage />,
  ]
  return (
    <div className="om-container">
      {pages.map((el, i) => cloneElement(el, { key: i, pageNum: i + 1 }))}
    </div>
  )
}

export default App
