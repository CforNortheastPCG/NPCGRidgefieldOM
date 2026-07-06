import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import DriveTimeMap from './DriveTimeMap.jsx'  // Norwell isochrones + label overlay regenerated
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'
import { TENANT_LOGOS } from './tenantLogos.js'

// Tenants whose logo art is white/light → render on a dark chip so it shows.
const DARK_LOGOS = new Set(['Jets.com'])

/* ═══════════════════ DEAL DATA ═══════════════════
   Tenancy + financials transcribed from the underwriting workbook
   ("I&E - 120 Longwater Dr Norwell, MA.xlsx", the current source of truth —
   newer than the prior Canva OM, which carried a $9.0M price and a vacant
   suite). Base rents shown annualized (workbook stores monthly). Pro forma =
   in-place rents marked up 5% per the workbook. */
const TENANTS = [
  { name: 'NVNA Foundation, Inc.', suite: '200', sf: 26349, end: '9/11/26', curPSF: 26.91, cur: 708929, pfPSF: 28.25, pf: 744376, camYr: 37926, color: '#F8971D',
    blurb: 'NVNA and Hospice — a century-old South Shore nonprofit providing home health care, hospice, and palliative and behavioral-health services.', url: 'nvna.org' },
  { name: 'Alera Group', suite: '102', sf: 8491, end: '5/31/29', curPSF: 23.50, cur: 199539, pfPSF: 24.68, pf: 209515, camYr: 8491, color: '#3F4753',
    blurb: 'A national, independent insurance and financial-services firm offering employee benefits, risk management, property & casualty insurance, and retirement planning.', url: 'aleragroup.com' },
  { name: 'Veterans Development Corp', suite: '103', sf: 6317, end: '8/31/27', curPSF: 25.00, cur: 157925, pfPSF: 26.25, pf: 165821, camYr: 0, color: '#566573',
    blurb: 'A certified Service-Disabled Veteran-Owned Small Business delivering general construction and design/build services for the VA, GSA, and other state and federal agencies.', url: 'vetdevcorp.com' },
  { name: 'Jets.com', suite: '106', sf: 4401, end: '1/31/31', curPSF: 24.50, cur: 107824, pfPSF: 25.72, pf: 113216, camYr: 6602, color: '#7C8896',
    blurb: 'A leading private-jet charter operator offering flexible, on-demand air travel across a diverse fleet of aircraft.', url: 'jets.com' },
  { name: 'Contravisory', suite: '101', sf: 3515, end: '5/31/26', curPSF: 25.26, cur: 88778, pfPSF: 26.52, pf: 93217, camYr: 5272, color: '#9aa4b1',
    blurb: 'An SEC-registered investment-advisory firm serving high-net-worth individuals and families through large corporations and institutions.', url: 'contravisory.com' },
  { name: 'NORD', suite: '105', sf: 1962, end: '12/31/30', curPSF: 25.00, cur: 49050, pfPSF: 26.25, pf: 51502, camYr: 2943, color: '#c4cad2',
    blurb: 'Office tenant occupying Suite 105 on a lease running through 2030.', url: null },
]
const NRA = 51035

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero photo-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Gradient hugs the bottom — the sunny exterior reads through up top; the
            dark concentrates low to seat the title block. */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '52%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 38%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, bottom: 44, top: 'auto', textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.02, marginBottom: 8 }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 24, fontWeight: 600 }}>{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={{ marginLeft: 'auto', marginRight: 0 }} />
          <div className="cover-hero-prep">{DEAL.type}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ pageNum }) {
  const tiles = [
    { v: '$8,500,000', l: 'Offering Price' },
    { v: '9.17%', l: 'In-Place Cap' },
    { v: '51,035 SF', l: 'Net Rentable' },
    { v: '100%', l: 'Leased · 6 Tenants' },
  ]
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {tiles.map(t => (
                <div key={t.l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{t.v}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{t.l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.6, lineHeight: 1.5, marginBottom: 10 }}>
              Northeast Private Client Group is pleased to present <strong>Longwater Corporate Center</strong>, a
              ±51,035-square-foot, 100% leased multi-tenant office building at {ADDR} in Norwell, Massachusetts,
              offered at $8,500,000 ($166.55/SF). Built in 1982 on 5.74 acres in the Route&nbsp;3 / South Shore
              corridor about 20 miles southeast of Boston, the two-story building is fully leased to six tenants on
              net leases that reimburse real estate taxes and utilities.
            </p>
            <p style={{ fontSize: 11.6, lineHeight: 1.5, marginBottom: 10 }}>
              The rent roll is anchored by <strong>NVNA &amp; Hospice</strong>, which occupies 26,349 square feet
              &mdash; roughly 52% of the building &mdash; at $26.91/SF through 2026. The balance is leased to Alera
              Group, Contravisory, Veterans Development Corporation, Jets.com, and NORD at rents from $23.50 to
              $25.26/SF, with expirations laddered from 2026 through 2031.
            </p>
            <p style={{ fontSize: 11.6, lineHeight: 1.5, marginBottom: 10 }}>
              In-place net operating income is $779,410 &mdash; a 9.17% cap rate on the asking price &mdash; with
              tenant CAM and tax reimbursements of $61,234 per year that protect the bottom line from expense growth.
              A modest 5% mark-to-market on in-place rents lifts pro forma NOI to $832,332 &mdash; a 9.79% cap.
            </p>
            <p style={{ fontSize: 11.6, lineHeight: 1.5, marginBottom: 0 }}>
              Longwater Corporate Center offers a stabilized, fully occupied office investment with credit and
              mission-driven tenancy, a basis well below replacement cost, and near-term 2026 rollover that creates
              mark-to-market and renewal upside in a supply-constrained South Shore submarket.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/exterior.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/lobby.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
  const boxes = [
    {
      title: 'Stabilized, Net-Leased Income',
      items: [
        { head: '100% Leased to Six Tenants', body: 'Fully occupied across 51,035 SF on net leases; tenants reimburse their pro-rata share of real estate taxes and utilities ($61,234 per year), insulating NOI from expense growth.' },
        { head: 'Mission-Driven Anchor', body: 'NVNA & Hospice occupies ~52% of the building (26,349 SF) at $26.91/SF — a century-old South Shore home-health and hospice nonprofit.' },
        { head: 'Quality, Diversified Tenancy', body: 'National insurance brokerage Alera Group, SEC-registered advisor Contravisory, a service-disabled-veteran general contractor, and private-aviation operator Jets.com round out the roster.' },
        { head: 'Laddered Lease Expirations', body: 'Rollover spread across 2026, 2027, 2029, 2030, and 2031 limits single-year exposure and staggers renewal risk.' },
      ],
    },
    {
      title: 'Basis, Yield & Location',
      items: [
        { head: '9.17% In-Place Cap Rate', body: 'A $779,410 in-place NOI on the $8,500,000 ask, with a 12% cash-on-cash return and 1.62 debt coverage at 70% leverage.' },
        { head: 'Below Replacement Cost', body: 'At $166.55/SF for a two-story, 51,035 SF office on 5.74 acres with ample surface parking, the asset trades well below the cost to build.' },
        { head: 'Route 3 / South Shore Location', body: 'In an established office corridor off Route 3, about 20 miles southeast of Boston, with strong regional highway access from the affluent South Shore.' },
      ],
    },
  ]
  const photos = ['/photos/rendering.jpg', '/photos/atrium.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0, paddingTop: 6 }}>
          {(() => {
            const TextBox = (g, key, opts = {}) => {
              const { headSize = 11, bodySize = 9.6, justify = 'space-between', gap = 9 } = opts
              return (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '2px 6px' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 9, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>{g.title}</div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap, justifyContent: justify, minHeight: 0 }}>
                    {g.items.map((it, ii) => (
                      <div key={ii} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
                        <div style={{ fontSize: headSize, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3, lineHeight: 1.2 }}>{it.head}</div>
                        <p style={{ fontSize: bodySize, lineHeight: 1.42, color: 'var(--graphite)' }}>{it.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            const PhotoBox = (src, key) => (
              <div key={key} style={{ borderRadius: 8, overflow: 'hidden', minHeight: 0, background: 'var(--linen)', border: '1px solid var(--border)' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )
            return [TextBox(boxes[0], 'tl'), PhotoBox(photos[0], 'tr'), PhotoBox(photos[1], 'bl'), TextBox(boxes[1], 'br', { headSize: 12.5, bodySize: 11, justify: 'flex-start', gap: 16 })]
          })()}
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Multi-Tenant Office</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">51,035 SF (net rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">5.74 Acres</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1982</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories · Buildings</span><span className="bldg-val">2 · 1</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">Commercial</span></div>
                <div className="bldg-row"><span className="bldg-label">Assessed Value</span><span className="bldg-val">$5,566,300</span></div>
                <div className="bldg-row"><span className="bldg-label">Parcel ID</span><span className="bldg-val">MARL-000053-000081</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1.1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Electric / Heat</span><span className="bldg-val">National Grid · electric heat · tenant-metered</span></div>
                <div className="bldg-row"><span className="bldg-label">Water &amp; Sewer</span><span className="bldg-val">Town of Norwell</span></div>
                <div className="bldg-row"><span className="bldg-label">Expense Recovery</span><span className="bldg-val">Taxes &amp; utilities reimbursed pro-rata (CAM)</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Exterior</span><span className="bldg-val">Stone &amp; clapboard · pitched roof</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">2010 asphalt shingle</span></div>
                <div className="bldg-row"><span className="bldg-label">Elevators</span><span className="bldg-val">1</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Ample on-site surface (off-street)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Tenancy</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Occupancy</span><span className="bldg-val">100% leased</span></div>
                <div className="bldg-row"><span className="bldg-label">Tenants</span><span className="bldg-val">6 · office, net leases</span></div>
                <div className="bldg-row"><span className="bldg-label">Anchor</span><span className="bldg-val">NVNA &amp; Hospice — 26,349 SF (~52%)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lease Expirations</span><span className="bldg-val">2026 – 2031</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$8,500,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / SF</span><span className="bldg-val">$166.55</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI</span><span className="bldg-val">$779,410 · 9.17% cap</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$832,332 · 9.79% cap</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ DONUT CHART ═══════════════════ */
function DonutChart({ data, size = 150, thickness = 26, centerLabel, centerSub }) {
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ece7e1" strokeWidth={thickness} />
        {data.map((d, i) => {
          // Tiny overlap on each arc so adjacent slices meet with no anti-alias
          // seam (the last slice overlaps the first, closing the 12-o'clock gap).
          const len = (d.value / total) * C + 1.4
          const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * C, 0)
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color}
              strokeWidth={thickness} strokeDasharray={`${len} ${Math.max(0, C - len)}`} strokeDashoffset={-offset} />
          )
        })}
      </g>
      {centerLabel && (
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 26, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>
      )}
    </svg>
  )
}

function MixCard({ title, data, centerLabel, centerSub, fmt }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flex: 1, minHeight: 0 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, maxWidth: 230 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9.7 }}>
              <span style={{ width: 11, height: 11, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label}</span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(d.value)} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
function RentRollPage({ pageNum }) {
  const cell = { padding: '3px 9px', fontSize: 10.3 }
  const th = { fontSize: 8.6, padding: '4px 9px' }
  const rt = { textAlign: 'right' }
  const ct = { textAlign: 'center' }
  const usd = n => `$${Math.round(n).toLocaleString()}`
  const sfMix = TENANTS.map(t => ({ label: t.name.replace(', Inc.', ''), value: t.sf, color: t.color }))
  const rentMix = TENANTS.map(t => ({ label: t.name.replace(', Inc.', ''), value: t.cur, color: t.color }))
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Roll</span></div>
        <div className="title-rule" />
        <div className="eyebrow" style={{ marginBottom: 5 }}>In-Place vs Pro Forma — Annualized Base Rent</div>
        <table className="data-table">
          <thead>
            <tr>
              <th style={th}>Tenant</th>
              <th style={{ ...th, ...ct }}>Suite</th>
              <th style={{ ...th, ...rt }}>SF</th>
              <th style={{ ...th, ...rt }}>% NRA</th>
              <th style={{ ...th, ...ct }}>Lease End</th>
              <th style={{ ...th, ...rt }}>Cur. $/SF</th>
              <th style={{ ...th, ...rt }}>Current Rent</th>
              <th style={{ ...th, ...rt }}>PF $/SF</th>
              <th style={{ ...th, ...rt }}>Pro Forma</th>
            </tr>
          </thead>
          <tbody>
            {TENANTS.map((t, i) => (
              <tr key={i}>
                <td style={cell}>{t.name}</td>
                <td style={{ ...cell, ...ct }}>{t.suite}</td>
                <td style={{ ...cell, ...rt }}>{t.sf.toLocaleString()}</td>
                <td style={{ ...cell, ...rt }}>{((t.sf / NRA) * 100).toFixed(1)}%</td>
                <td style={{ ...cell, ...ct }}>{t.end}</td>
                <td style={{ ...cell, ...rt }}>${t.curPSF.toFixed(2)}</td>
                <td style={{ ...cell, ...rt }}>{usd(t.cur)}</td>
                <td style={{ ...cell, ...rt }}>${t.pfPSF.toFixed(2)}</td>
                <td style={{ ...cell, ...rt }}>{usd(t.pf)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td style={cell}><strong>Total · 100% Leased</strong></td>
              <td style={{ ...cell, ...ct }}><strong>6</strong></td>
              <td style={{ ...cell, ...rt }}><strong>51,035</strong></td>
              <td style={{ ...cell, ...rt }}><strong>100%</strong></td>
              <td style={{ ...cell, ...ct }}>—</td>
              <td style={{ ...cell, ...rt }}><strong>$25.71</strong></td>
              <td style={{ ...cell, ...rt }}><strong>$1,312,045</strong></td>
              <td style={{ ...cell, ...rt }}><strong>$26.99</strong></td>
              <td style={{ ...cell, ...rt }}><strong>$1,377,647</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, marginTop: 18, flex: 1, minHeight: 0 }}>
          <MixCard title="Square Footage by Tenant" data={sfMix} centerLabel="51K" centerSub="NET SF" fmt={v => `${(v / 1000).toFixed(1)}K`} />
          <MixCard title="In-Place Base Rent by Tenant" data={rentMix} centerLabel="$1.3M" centerSub="BASE RENT" fmt={v => `$${Math.round(v / 1000)}K`} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ TENANT PROFILES ═══════════════════ */
function TenantProfiles({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Tenant Profiles" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Tenant <span style={{ color: '#F8971D' }}>Profiles</span></div>
        <div className="title-rule" />
        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 16 }}>
          Six office tenants occupy the building under net leases. The roster blends a mission-driven healthcare anchor
          with national and regional financial, professional, and aviation firms — a durable, diversified income base.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {TENANTS.map(t => {
            const logo = TENANT_LOGOS[t.name]
            const dark = DARK_LOGOS.has(t.name)
            const chip = { flexShrink: 0, width: 96, height: 68, borderRadius: 6, border: '1px solid var(--border)', background: dark ? 'var(--carbon)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 10px' }
            return (
              <div key={t.name} style={{ display: 'flex', gap: 15, alignItems: 'center', borderLeft: '3px solid var(--golden)', paddingLeft: 16 }}>
                {logo
                  ? <div style={chip}><img src={logo} alt={`${t.name} logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} /></div>
                  : <div style={{ ...chip, background: 'var(--carbon)', color: '#fff', fontWeight: 800, letterSpacing: '0.03em', fontSize: 17 }}>{t.name}</div>}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)' }}>{t.name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--stone)', whiteSpace: 'nowrap' }}>Suite {t.suite}</span>
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--golden)', margin: '4px 0 7px' }}>
                    {t.sf.toLocaleString()} SF · {((t.sf / NRA) * 100).toFixed(1)}% of NRA · exp {t.end}{t.url ? ` · ${t.url}` : ''}
                  </div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--graphite)' }}>{t.blurb}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8.6, padding: '3px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.6, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.6, padding: '3.5px 7px', textAlign: 'right' }
  const thl = { fontSize: 7.6, padding: '3.5px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.6, padding: '3px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }
  const cols = (
    <colgroup>
      <col style={{ width: '36%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16%' }} />)}
    </colgroup>
  )
  const noi = [
    { label: 'NOI — Current (In-Place)', val: '$779,410' },
    { label: 'NOI — Pro Forma', val: '$832,332' },
  ]
  const income = [
    ['Base Rental Income', '$1,312,045', '$25.71', '$1,377,647', '$26.99', false],
    ['Less: Vacancy & Credit (5%)', '-$65,602', '-$1.29', '-$68,882', '-$1.35', false],
    ['Effective Rental Income', '$1,246,443', '$24.42', '$1,308,765', '$25.64', true],
    ['CAM / Tax Reimbursements', '$61,234', '$1.20', '$61,234', '$1.20', false],
  ]
  const expenses = [
    ['Real Estate Taxes', '$74,922', '$1.47', '$74,922', '$1.47'],
    ['Heat (Electric)', '$147,867', '$2.90', '$147,867', '$2.90'],
    ['Electric', '$77,118', '$1.51', '$77,118', '$1.51'],
    ['Property Management (5%)', '$62,322', '$1.22', '$65,438', '$1.28'],
    ['Snow & Landscape', '$55,015', '$1.08', '$50,000', '$0.98'],
    ['Janitorial / Cleaning', '$49,020', '$0.96', '$49,020', '$0.96'],
    ['Repairs & Maintenance', '$26,000', '$0.51', '$26,000', '$0.51'],
    ['Insurance', '$10,701', '$0.21', '$22,000', '$0.43'],
    ['Trash Removal', '$8,953', '$0.18', '$8,953', '$0.18'],
    ['Water', '$5,048', '$0.10', '$5,048', '$0.10'],
    ['Sewer', '$4,856', '$0.10', '$4,856', '$0.10'],
    ['Elevator Maintenance', '$3,630', '$0.07', '$3,630', '$0.07'],
    ['Security / Telephone', '$2,815', '$0.06', '$2,815', '$0.06'],
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
          {cols}
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/SF</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/SF</th>
            </tr>
          </thead>
          <tbody>
            {income.map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$1,307,677</td><td style={totBg}>$25.62</td><td style={totBg}>$1,369,999</td><td style={totBg}>$26.84</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          {cols}
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/SF</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/SF</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$528,267</td><td style={totBg}>$10.35</td><td style={totBg}>$537,667</td><td style={totBg}>$10.54</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$779,410</td><td style={noiBg}>$15.27</td><td style={noiBg}>$832,332</td><td style={noiBg}>$16.31</td></tr>
          </tbody>
        </table>
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
          <h3 className="dc-disclaimer-title">Listed By</h3>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Francis-Saenz-430x488.png" alt="Francis Saenz" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Francis Saenz</div>
            <div className="dc-title">Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (857) 990-6803</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>fsaenz@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0, marginTop: 18 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2024/02/tom-430x488.jpg" alt="Tom Egbers" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Tom Egbers</div>
            <div className="dc-title">Investment Associate</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (857) 990-2022</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>tegbers@northeastpcg.com</div>
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

/* ═══════════════════ CITY OVERVIEW ═══════════════════ */
function CityOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Norwell <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>An affluent South Shore town on the North River, ~20 miles southeast of Boston.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11, lineHeight: 1.62, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <p>
              Longwater Corporate Center sits in an established office corridor in Norwell, just off Route&nbsp;3 — the
              expressway that runs the length of the South Shore, connecting north to Boston in about 30 minutes and
              south toward Plymouth and Cape Cod. The location pairs suburban quiet with direct highway access, drawing
              professional, healthcare, and financial tenants to a setting that is both convenient and scenic.
            </p>
            <p>
              Norwell is a charming small town on the South Shore known for its scenic New England landscape, historic
              homes, picturesque woodlands, and the winding North River. It offers a blend of suburban and rural charm
              with a strong sense of community, excellent schools, and easy access to natural spaces like the Norris
              Reservation — a peaceful, family-friendly town with convenient access to both the coast and Boston.
            </p>
            <p>
              The surrounding South Shore is one of metro Boston’s most desirable suburban markets, with limited new
              office supply and a deep base of established service businesses. Nearby Hingham, Hanover, and Weymouth add
              regional retail (Derby Street Shops, Hanover Crossing), healthcare (South Shore Health), and MBTA commuter
              rail and ferry connections to downtown Boston.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 'auto', paddingTop: 16, marginBottom: 8 }}>About Norwell</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.6, lineHeight: 1.7 }}>
            <li>Population ~11,300 · among the higher-income towns in Massachusetts</li>
            <li>Direct access to Route 3 (South Shore expressway)</li>
            <li>~20 miles / ~30 minutes southeast of Boston</li>
            <li>Top-rated public schools and low crime</li>
            <li>North River, Norris Reservation &amp; World’s End nearby</li>
            <li>Regional retail and healthcare in adjacent Hingham, Hanover &amp; Weymouth</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/exterior.jpg" alt="Longwater Corporate Center, Norwell MA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/atrium.jpg" alt="Longwater Corporate Center interior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ COUNTY OVERVIEW ═══════════════════ */
function CountyOverview({ pageNum }) {
  const employers = [
    { label: 'Norwell & Immediate Area', items: 'South Shore office and service firms across the Route 3 corridor, the Town of Norwell and its schools, and a deep base of professional, financial, and healthcare employers — including the tenants at Longwater Corporate Center.' },
    { label: 'Greater South Shore (Weymouth / Hingham)', items: 'South Shore Health (South Shore Hospital, the region’s largest employer), Talbots (headquartered in Hingham), Derby Street Shops, and a broad retail and medical-office base.' },
    { label: 'Greater Boston (~30 min north)', items: 'The full Boston metropolitan economy — financial services, healthcare, higher education, and technology — reachable via Route 3 and MBTA commuter rail and ferry from the South Shore.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Plymouth County <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Norwell sits in the northern reaches of Plymouth County, on metro Boston’s South Shore. The county runs from the affluent commuter suburbs nearest the city south toward Plymouth and the gateway to Cape Cod, anchored by the Route&nbsp;3 corridor and MBTA commuter rail and ferry service. The northern South Shore towns — Norwell, Hingham, Cohasset, Scituate, and Duxbury — are among the wealthiest in the state, with high homeownership, top schools, and limited new commercial supply that keeps well-located office and retail in steady demand.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Norwell vs. County <span style={{ textTransform: 'none', fontWeight: 500 }}>(approximate)</span></div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Norwell</th>
                <th style={{ textAlign: 'right' }}>Plymouth County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population</td><td style={{ textAlign: 'right' }}>~11,300</td><td style={{ textAlign: 'right' }}>~530,000</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~4,000</td><td style={{ textAlign: 'right' }}>~195,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$160,000</td><td style={{ textAlign: 'right' }}>~$98,000</td></tr>
              <tr><td>Homeownership (est.)</td><td style={{ textAlign: 'right' }}>~90%</td><td style={{ textAlign: 'right' }}>~74%</td></tr>
            </tbody>
          </table>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Major Area Employers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, justifyContent: 'space-between' }}>
            {employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 10.3, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{g.label}</div>
                <div style={{ fontSize: 9.6, lineHeight: 1.45, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 7.8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>
            Demographic figures are approximate (ACS-range estimates) and provided for context only; buyer to verify.
          </div>
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/rendering.jpg" alt="Longwater Corporate Center, Norwell MA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/lobby.jpg" alt="Longwater Corporate Center lobby" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PLAN SHEET ═══════════════════
   A self-contained plan image (its own color legend baked in) shown large and
   centered below the standard page header/title, with the page footer. */
function PlanSheet({ src, section, title, accent, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>{title} <span style={{ color: '#F8971D' }}>{accent}</span></div>
        <div className="title-rule" />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
          <img src={src} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  // Page order is the single source of truth — pageNum is auto-assigned by
  // position below (1-based). (Keep Toc.jsx's `n` values in sync.)
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <InvestmentHighlights />,
    <Divider eyebrow="01" title="The Property" image="/photos/rendering.jpg" />,
    <PropertyOverview />,
    <PlanSheet src="/photos/floorplan-asbuilt.png" section="Property Overview" title="Current" accent="Floor Plan" />,
    <PlanSheet src="/photos/floorplan-subdivision.png" section="Property Overview" title="Second Floor" accent="Sub-Division Plan" />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/exterior.jpg" />,
    <RentRollPage />,
    <TenantProfiles />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/lobby.jpg" />,
    <CityOverview />,
    <LocationMap />,
    <DriveTimeMap />,
    <CountyOverview />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/atrium.jpg" />,
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
