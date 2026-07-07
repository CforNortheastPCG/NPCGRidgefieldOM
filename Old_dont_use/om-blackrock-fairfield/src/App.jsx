import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import SiteMap from './SiteMap.jsx'
import { PhotoPage } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import DriveTimeMap from './DriveTimeMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'
import { DRAFT } from './deal.js'

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
              two-, and three-bedroom homes &mdash; alongside a <strong>ground-floor retail unit</strong> leased to an
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
              <li><strong>Diversified Mixed-Use Income</strong> — 15 apartments plus ground-floor retail leased through 2027, adding commercial diversification</li>
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
                <div className="bldg-row"><span className="bldg-label">Stories / Access</span><span className="bldg-val">2 Stories + Basement · Elevator-Served</span></div>
                <div className="bldg-row"><span className="bldg-label">Occupancy</span><span className="bldg-val">100% (16 of 16)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Gated Off-Street Lot</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities &amp; Mechanicals</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant-metered units · house meter common areas</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Owner-paid (sub-metering = upside)</span></div>
                <div className="bldg-row"><span className="bldg-label">Vertical Transport</span><span className="bldg-val">Passenger elevator</span></div>
                <div className="bldg-row"><span className="bldg-label">Basement</span><span className="bldg-val">Tenant storage + extra usable space · original bank vault</span></div>
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

/* ═══════════════════ THE BLACK ROCK TRUST BUILDING (history) ═══════════════════ */
function BuildingHistory({ pageNum }) {
  const timeline = [
    { y: '1644', t: 'Black Rock settled', b: 'One of the oldest villages on the Connecticut coast grows up around Black Rock Harbor — a deep-water port that made the neighborhood a center of trade for two centuries.' },
    { y: '1933', t: 'The Black Rock Bank & Trust Co.', b: 'The bank opens at the corner of Fairfield Avenue and Brewster Street — a substantial masonry building anchoring Black Rock’s commercial spine.' },
    { y: 'Mid-1900s', t: 'A neighborhood fixture', b: 'For decades the building serves as Black Rock’s bank, a familiar presence along the Fairfield Avenue corridor.' },
    { y: 'c. 2015', t: 'Adaptive reuse', b: 'The former bank is gut-renovated and converted to 15 modern apartments plus a ground-floor retail unit — a full second life for the building.' },
    { y: 'Today', t: '“Black Rock Commons”', b: 'A fully leased, elevator-served mixed-use building that still carries the neighborhood’s name — and its history.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Building History" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Character &amp; Story</div>
        <div className="section-title" style={{ marginBottom: 2 }}>The Black Rock <span style={{ color: '#F8971D' }}>Trust Building</span></div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--carbon)', marginBottom: 6 }}>Built 1933 · Corner of Fairfield Avenue &amp; Brewster Street</div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
          {/* Narrative + timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <p style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>
              2836 Fairfield Avenue isn&rsquo;t just another apartment building &mdash; it&rsquo;s the former{' '}
              <strong>Black Rock Bank &amp; Trust Company</strong>, a 1933 corner building that has anchored Fairfield
              Avenue and Brewster Street for nearly a century. Its conversion to residential gave it a second life as
              the aptly named <strong>Black Rock Commons</strong>. For a buyer, that story is a marketing asset: a
              named, recognizable building on the neighborhood&rsquo;s main street that tenants are proud to call home.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              {timeline.map((e, i) => (
                <div key={e.y} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 64, textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--golden)', lineHeight: 1 }}>{e.y}</div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--golden)', marginTop: 3 }} />
                    {i < timeline.length - 1 && <span style={{ flex: 1, width: 2, background: 'var(--border)', marginTop: 2 }} />}
                  </div>
                  <div style={{ paddingBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)' }}>{e.t}</div>
                    <div style={{ fontSize: 9, lineHeight: 1.4, color: 'var(--graphite)', marginTop: 1 }}>{e.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo + character callout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: 3 }}>
              <img src="/photos/exterior-1.jpg" alt="The Black Rock Trust Building, 2836 Fairfield Avenue" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Highlights</div>
            <ul className="highlights ridge-highlights">
              <li><strong>Named, recognizable building</strong> — a corner presence on Fairfield Avenue with built-in brand and curb appeal</li>
              <li><strong>Substantial masonry construction</strong> — fully modernized in the 2010s gut renovation</li>
              <li><strong>On the Fairfield Avenue corridor</strong> — the heart of the rental-demand story</li>
              <li><strong>Former-bank conversion</strong> — distinctive character today&rsquo;s renters seek out</li>
            </ul>
            <div style={{ fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
              History compiled from public records and neighborhood sources; renovation year per owner records.
              Verify independently.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
function DonutChart({ data, size = 88, thickness = 16, centerLabel, centerSub, centerFont = 21 }) {
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
              strokeWidth={thickness} strokeDasharray={`${len + 0.8} ${C - len}`} strokeDashoffset={-offset} />
          )
        })}
      </g>
      {centerLabel && (
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: centerFont, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>
      )}
    </svg>
  )
}

function ChartCard({ title, data, centerLabel, centerSub, centerFont, fmt = v => v, note }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} centerFont={centerFont} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 8.8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600 }}>{d.label}</span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(d.value)} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
      {note && <div style={{ fontSize: 8.2, color: 'var(--stone)', fontWeight: 700, marginTop: 8, paddingTop: 6, borderTop: '1px solid var(--border)', textAlign: 'center' }}>{note}</div>}
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
    { label: '1 Bed / 1 Bath', value: 7, color: '#3F4753' },
    { label: '2 Bed / 1 Bath', value: 4, color: '#F8971D' },
    { label: '2 Bed / 2 Bath', value: 3, color: '#B55D37' },
    { label: '3 Bed / 2 Bath', value: 1, color: '#6B7A8F' },
    { label: 'Retail', value: 1, color: '#A9B4C0' },
  ]
  const incomeMix = [
    { label: 'Rental Income', value: 31575, color: '#3F4753' },
    { label: 'Commercial Income', value: 2600, color: '#F8971D' },
  ]
  const td = { fontSize: 8.3, padding: '1.6px 7px' }
  const tdr = { ...td, textAlign: 'right' }
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
          Pro Forma = stabilized mark-to-market target. Total In-Place $410,100/yr (residential $378,900 + retail $31,200); Pro Forma $469,200/yr.
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 8, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Mix" data={unitMix} centerLabel="16" centerSub="UNITS" />
          <ChartCard title="Income Makeup" data={incomeMix} fmt={v => `$${v.toLocaleString()}/mo`} />
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

/* ═══════════════════ MANAGEMENT TRANSITION & T-12 ═══════════════════ */
function ManagementTransition({ pageNum }) {
  // Real monthly NOI (cash) from the T-12 statement. All-Star ran Jul'25–Mar'26;
  // LYP assumed management Apr'26. The chart shows income held up across the handoff.
  const months = [
    { m: 'Jul', noi: 12241, mgr: 'A' }, { m: 'Aug', noi: 28601, mgr: 'A' },
    { m: 'Sep', noi: 29666, mgr: 'A' }, { m: 'Oct', noi: 21499, mgr: 'A' },
    { m: 'Nov', noi: 24566, mgr: 'A' }, { m: 'Dec', noi: 25206, mgr: 'A' },
    { m: 'Jan', noi: 19364, mgr: 'A' }, { m: 'Feb', noi: 22851, mgr: 'A' },
    { m: 'Mar', noi: 26843, mgr: 'A' }, { m: 'Apr', noi: 34857, mgr: 'L' },
    { m: 'May', noi: 23321, mgr: 'L' }, { m: 'Jun', noi: 18098, mgr: 'L' },
  ]
  const maxNoi = Math.max(...months.map(x => x.noi))
  return (
    <div className="page">
      <PageHeader section="Management Transition" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Management Transition <span style={{ color: '#F8971D' }}>& Trailing 12-Month</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          Ownership transitioned property management mid-year &mdash; from <strong>All-Star Property Management</strong>{' '}
          (Jul 2025 – Mar 2026) to <strong>LYP Management</strong> (Apr 2026 – present). The trailing-twelve cash
          statement below stitches both managers&rsquo; reporting together. The takeaway: income and NOI held steady
          through the handoff, and a new, hands-on manager is now in place &mdash; a clean operating baseline for a
          buyer.
        </div>

        {/* T-12 totals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            { v: '$377,102', l: 'T-12 Total Income' },
            { v: '$89,989', l: 'T-12 Operating Expenses' },
            { v: '$287,113', l: 'T-12 NOI (Cash)' },
            { v: '100%', l: 'Occupancy (16 / 16)' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center', borderTop: '3px solid var(--golden)', padding: '6px 2px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Monthly NOI bar chart across the transition */}
        <div className="eyebrow" style={{ marginBottom: 6, fontSize: 9 }}>Monthly Net Operating Income (Cash) — Jul 2025 → Jun 2026</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 230, padding: '0 2px 0', borderBottom: '2px solid var(--carbon)', position: 'relative' }}>
          {months.map((x, i) => (
            <div key={x.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative' }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: 'var(--carbon)', marginBottom: 3 }}>${Math.round(x.noi / 1000)}k</div>
              <div style={{ width: '76%', height: `${(x.noi / maxNoi) * 88}%`, background: x.mgr === 'A' ? '#3F4753' : '#F8971D', borderRadius: '2px 2px 0 0' }} />
              {/* handoff marker before Apr */}
              {i === 9 && <div style={{ position: 'absolute', left: -3.5, top: 0, bottom: 0, borderLeft: '1.5px dashed var(--golden)' }} />}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {months.map(x => <div key={x.m} style={{ flex: 1, textAlign: 'center', fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{x.m}</div>)}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 8.5 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#3F4753', borderRadius: 2 }} /> All-Star Property Mgmt (Jul ’25 – Mar ’26)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, background: '#F8971D', borderRadius: 2 }} /> LYP Management (Apr ’26 – present)</span>
        </div>

        <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontSize: 9.3, lineHeight: 1.5, color: 'var(--carbon)', fontWeight: 600 }}>
            Reach out to the listing brokers for the detailed monthly statements and additional context.
          </div>
          <div style={{ fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
            Source: combined cash-flow statement — All-Star Property Management (Jul 2025 – Mar 2026) &amp; LYP
            Management (Apr 2026 – Jun 2026), cash basis, prepared 06/09/2026.
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
            <img className="dc-avatar" src="/photos/team/brad-balletto.jpg" alt="Brad Balletto" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Brad Balletto</div>
            <div className="dc-title">Managing Director, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1574</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>bballetto@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="/photos/team/rich-edwards.png" alt="Rich Edwards Jr." style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Rich Edwards Jr.</div>
            <div className="dc-title">Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1577</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>redwards@northeastpcg.com</div>
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
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Bridgeport&rsquo;s Standout Coastal Pocket</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Black Rock is the standout neighborhood within Bridgeport &mdash; a historic, harbor-front pocket on
              the city&rsquo;s far west side that runs right up to the Fairfield town line. Built around
              sea-captains&rsquo; homes and a genuinely walkable main street, its spine is <strong>Fairfield
              Avenue</strong>: a lively corridor of independent restaurants, bars, coffee shops, galleries, and music
              venues anchored by neighborhood staples like Taco Loco, The Sitting Room, and Park City Music Hall.
              Residents walk to dinner, take in the half-mile waterfront promenade at <strong>St. Mary&rsquo;s-By-The-Sea</strong>,
              and keep boats at Captain&rsquo;s Cove Seaport on Black Rock Harbor.
            </p>
            <p>
              For an investor, the appeal is value, not prestige &mdash; and that&rsquo;s the point. Black Rock
              isn&rsquo;t Fairfield or Westport, but it offers a genuinely walkable, waterfront lifestyle at a
              fraction of Gold Coast prices, which keeps a steady, year-round pool of renters: young professionals,
              local-university grads, commuters, and downsizers chasing the coast on a budget. Demand is consistent,
              turnover re-prices quickly to market, and well-located multifamily on Fairfield Avenue rarely trades.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Black Rock</div>
          <ul className="highlights ridge-highlights">
            <li>Bridgeport&rsquo;s most sought-after neighborhood — a historic waterfront pocket on the Fairfield town line</li>
            <li>Fairfield Avenue corridor — walkable dining, nightlife, coffee, galleries, and live music</li>
            <li>St. Mary&rsquo;s-By-The-Sea waterfront promenade, Black Rock Harbor &amp; Captain&rsquo;s Cove Seaport</li>
            <li>Value-driven renter demand — coastal, walkable living at a steep discount to neighboring Fairfield &amp; Westport</li>
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

/* ═══════════════════ WHY BLACK ROCK — VIBE + THE FAIRFIELD TAX (merged) ═══════════════════ */
function WhyBlackRock({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Neighborhood" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="eyebrow">The Neighborhood</div>
          <div className="section-title" style={{ marginBottom: 2 }}>Why <span style={{ color: '#F8971D' }}>Black Rock</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', marginBottom: 8 }}>Old Fairfield County, on the Water</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Black Rock is old Fairfield County. Long before it was annexed into Bridgeport it was a colonial
              seaport, and that maritime, old-money character never left &mdash; sea-captain Victorians line the side
              streets, the harbor is still full of boats, and the <strong>Black Rock Yacht Club</strong> (est. 1879)
              has anchored the waterfront for nearly a century and a half. It carries a Bridgeport address, but Black
              Rock has always been the city&rsquo;s set-apart pocket: quieter, prettier, and unmistakably coastal.
            </p>
            <p>
              Daily life runs along <strong>Fairfield Avenue</strong> &mdash; a genuinely walkable village of
              independent restaurants, cafés, galleries, and small shops, with the shoreline promenade at St.
              Mary&rsquo;s-By-The-Sea a few blocks away. That mix of real waterfront, walkability, and an
              established, refined feel is rare on the Connecticut coast and quietly draws a discerning, year-round
              renter base &mdash; which keeps well-located buildings here tightly held and rarely traded. And it
              delivers that Gold Coast lifestyle at a meaningful discount to neighboring Fairfield and Westport
              &mdash; the quiet value gap that underpins durable demand and steady rent growth.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Black Rock</div>
          <ul className="highlights ridge-highlights">
            <li>A historic coastal enclave — colonial seaport roots, sea-captain Victorians &amp; the Black Rock Yacht Club (est. 1879)</li>
            <li>A Bridgeport address, but the city&rsquo;s most desirable, set-apart pocket</li>
            <li>Fairfield Avenue village — walkable dining, cafés, galleries &amp; independent shops</li>
            <li>St. Mary&rsquo;s-By-The-Sea promenade, Black Rock Harbor &amp; Captain&rsquo;s Cove Seaport</li>
            <li>Established Gold Coast coastal living at a more attainable basis than neighboring Fairfield &amp; Westport</li>
            <li>Metro-North New Haven Line to Grand Central; quick I-95 (Exits 24/25) access</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="Black Rock waterfront & harbor" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-3.jpg" alt="Fairfield Avenue, Black Rock" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <tr><td style={td}>Median Home Price</td><td style={{ ...td, textAlign: 'right' }}>$865,000</td><td style={{ ...td, textAlign: 'right' }}>$420K–$447K</td></tr>
                <tr><td style={td}>Avg Apartment Rent</td><td style={{ ...td, textAlign: 'right' }}>$3,120/mo</td><td style={{ ...td, textAlign: 'right' }}>~$2,100/mo</td></tr>
                <tr><td style={td}>Coastal &amp; Walkable</td><td style={{ ...td, textAlign: 'right' }}>Yes</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
                <tr><td style={td}>Metro-North to NYC</td><td style={{ ...td, textAlign: 'right' }}>Yes</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
              </tbody>
            </table>
            <div style={{ marginTop: 12, borderLeft: '4px solid var(--golden)', paddingLeft: 13 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--golden)' }}>The Fairfield Tax</div>
              <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2, color: 'var(--carbon)', marginTop: 3 }}>~$1,000/mo less to rent · ~$430,000 less to own</div>
              <div style={{ fontSize: 10, color: 'var(--graphite)', marginTop: 3, lineHeight: 1.4 }}>
                &mdash; the same Gold Coast lifestyle, one town over.
              </div>
            </div>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 'auto', paddingTop: 8, lineHeight: 1.4 }}>
              Sources: Fairfield median home price (Raveis, 2026); Black Rock median ≈ $420K–$447K (single-family
              listings to $680K+); Fairfield average apartment rent (RentCafe, 2025); Black Rock rent reflects
              in-place at the subject. Illustrative and approximate &mdash; verify independently.
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
    <BuildingHistory />,
    <SiteMap />,
    ...PHOTO_PAGES.map(p => <PhotoPage {...p} />),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ext-2.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <ManagementTransition />,
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
    <DriveTimeMap />,
    <FairfieldCounty />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/parcel-1.jpg" />,
    <TeamPage />,
    <LocationsPage />,
  ]
  return (
    <div className={`om-container${DRAFT ? ' draft' : ''}`}>
      {pages.map((el, i) => cloneElement(el, { key: i, pageNum: i + 1 }))}
    </div>
  )
}

export default App
