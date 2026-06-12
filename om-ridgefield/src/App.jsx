import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import BrokerProfile from './BrokerProfile.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { ADDR, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src="/photos/Exterior Edit 2.png" alt="" />
        <div className="cover-hero-shade" />
        {/* Stronger bottom scrim so the overlay text reads clearly */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>For Sale</div>
          <div className="cover-hero-name">Main Street Apartments</div>
          <div className="cover-hero-title">{ADDR}</div>
          <div className="cover-hero-sub">Ridgefield, Connecticut</div>
          <div className="cover-hero-rule" />
          <div className="cover-hero-prep">9-Unit Multifamily Property</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 2 — EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$3,600,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Asking Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>9</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              Northeast Private Client Group is pleased to present {ADDR}, a 9-unit multifamily property in the
              heart of Ridgefield, Connecticut. This well-maintained complex consists of three buildings on a
              single parcel, offering a compelling blend of stable cash flow and value-add potential in one of
              Fairfield County&rsquo;s most desirable communities.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              The property features a diverse unit mix including townhouse-style apartments with attached
              garages and traditional apartment units, all within walking distance to Ridgefield's vibrant
              Main Street shops, restaurants, and cultural amenities.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              This opportunity affords investors access to a supply-constrained, highly desirable town as a
              true long-term hold. Three units carry 8-30g affordability restrictions running 40 years from
              2012 — roughly 25 years remaining — but in a market like Ridgefield that horizon is an asset,
              not a constraint: durable, low-volatility ownership rather than a quick rent-bump-and-flip play.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 8 }}>
              All qualified parties are invited to request the full offering package and schedule a private
              tour through Northeast Private Client Group.
            </p>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights highlights--lg" style={{ flex: 1, justifyContent: 'space-between', fontSize: 9.4 }}>
              <li><strong>Prime Downtown Location</strong> — Walking distance to Main Street shops, restaurants, and cultural venues</li>
              <li><strong>Diverse Unit Mix</strong> — Townhouses with garages + traditional apartments appeal to broad tenant base</li>
              <li><strong>Below-Market Rents</strong> — Significant upside through strategic rent optimization program</li>
              <li><strong>Strong Demand</strong> — A+ schools, low crime, convenient NYC commuter access via Metro-North</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/Exterior Edit 3.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/Exterior Edit 1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 5 — FULL BLEED PHOTO ═══════════════════ */
function PhotoFullBleed() {
  return (
    <div className="page">
      <div className="photo-full-bleed">
        <img src="/photos/613 Complex.webp" alt="Complex Overview" />
      </div>
    </div>
  )
}

/* ═══════════════════ 6 — THE OFFERING ═══════════════════ */
function TheOffering() {
  return (
    <div className="page">
      <PageHeader section="The Offering" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 20px 40px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Offering</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>
              Northeast Private Client Group is pleased to exclusively offer for sale {ADDR},
              a 13-unit multifamily investment property located in the heart of Ridgefield, Connecticut.
              This well-maintained complex consists of three buildings situated on a single parcel.
            </p>
            <p style={{ marginBottom: 8 }}>
              The property features a diverse unit mix including townhouse-style apartments with attached
              garages and traditional apartment units, all within walking distance to Ridgefield's vibrant
              Main Street shops, restaurants, and cultural amenities.
            </p>
          </div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Property Summary</div>
          <div className="kf-list" style={{ flex: 1 }}>
            <div className="kf-row"><span className="kf-label">Address</span><span className="kf-val">{FULL_ADDR}</span></div>
            <div className="kf-row"><span className="kf-label">Property Type</span><span className="kf-val">Multifamily</span></div>
            <div className="kf-row"><span className="kf-label"># of Units</span><span className="kf-val">13</span></div>
            <div className="kf-row"><span className="kf-label"># of Buildings</span><span className="kf-val">3</span></div>
            <div className="kf-row"><span className="kf-label">Year(s) Built</span><span className="kf-val">c.1900 / 2012</span></div>
            <div className="kf-row"><span className="kf-label">Lot Size</span><span className="kf-val">1.09 Acres</span></div>
            <div className="kf-row"><span className="kf-label">Parking</span><span className="kf-val">Garages + Surface</span></div>
            <div className="kf-row"><span className="kf-label">Zoning</span><span className="kf-val">B-1 (Business)</span></div>
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}>
          <img src="/photos/Exterior Edit 3.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <PageFooter pageNum={5} />
    </div>
  )
}

/* ═══════════════════ 4 — PROPERTY OVERVIEW ═══════════════════ */
function BuildingDescriptions({ pageNum }) {
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Multifamily</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">9 (All 2BR)</span></div>
                <div className="bldg-row"><span className="bldg-label">Buildings</span><span className="bldg-val">3</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">21,780 SF (0.50 Acres)</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">8,203 SF Total</span></div>
                <div className="bldg-row"><span className="bldg-label">Year(s) Built</span><span className="bldg-val">c. 1900 / 2012</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">B-1 (Business)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Garages + Surface Lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Market / Affordable</span><span className="bldg-val">6 Market / 3 Affordable</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Gas Forced Air / Gas</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric/Gas</span><span className="bldg-val">Tenant Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water/Sewer</span><span className="bldg-val">Owner Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building A — Victorian Main House</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">3 Apartments (2BR) &middot; 3,233 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">c. 1900</span></div>
                <div className="bldg-row"><span className="bldg-label">Designation</span><span className="bldg-val">2 Market / 1 Affordable (60%)</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">Wraparound porch, individual entries</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building B — Townhouses w/ Garage</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">3 Townhouses (2BR/1.5BA)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">2012</span></div>
                <div className="bldg-row"><span className="bldg-label">Designation</span><span className="bldg-val">3 Market Rate</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">Attached garage, hardwood floors, granite</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building C — Townhouses w/ Basement</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">3 Townhouses (2BR/1.5BA) &middot; 4,970 SF (B&C)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">2012</span></div>
                <div className="bldg-row"><span className="bldg-label">Designation</span><span className="bldg-val">1 Market / 2 Affordable (80%, 60%)</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">Basement, hardwood floors, granite</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ AFFORDABILITY ANALYSIS ═══════════════════ */
function AffordabilityAnalysis({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Affordability Analysis" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>
          Affordability <span style={{ color: '#F8971D' }}>Analysis</span>
        </div>
        <div style={{ fontSize: 9, color: 'var(--stone)', marginBottom: 8 }}>613 Main Street, Ridgefield, CT &nbsp;|&nbsp; 8-30g Set-Aside Restrictions</div>

        <div className="two-col" style={{ flex: 1, gap: 16, minHeight: 0 }}>
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Deed Restriction Summary</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Restriction Source</span><span className="bldg-val">CGS §8-30g — Set-Aside Development</span></div>
                <div className="bldg-row"><span className="bldg-label">Required Affordable %</span><span className="bldg-val">30% of units (3 of 9)</span></div>
                <div className="bldg-row"><span className="bldg-label">Income Tiers</span><span className="bldg-val">2 units @ 60% SMI &nbsp;|&nbsp; 1 unit @ 80% SMI</span></div>
                <div className="bldg-row"><span className="bldg-label">Governing Standard</span><span className="bldg-val">Lesser of CT SMI or Stamford-Norwalk AMI</span></div>
                <div className="bldg-row"><span className="bldg-label">Practical Result</span><span className="bldg-val">SMI controls (always lower)</span></div>
                <div className="bldg-row"><span className="bldg-label">Restriction Term</span><span className="bldg-val">40 years (per CGS §8-30g)</span></div>
              </div>
            </div>

            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Max Gross Rent — Current 8-30g (SMI Basis)</h3>
              <table className="data-table" style={{ fontSize: 10, flex: 1 }}>
                <thead><tr><th>Bedrooms</th><th>HH Size</th><th>80% SMI</th><th>60% SMI</th></tr></thead>
                <tbody>
                  <tr><td>Studio</td><td>1.0</td><td>$1,283</td><td>$962</td></tr>
                  <tr><td>1 BR</td><td>1.5</td><td>$1,375</td><td>$1,031</td></tr>
                  <tr><td>2 BR</td><td>3.0</td><td>$1,650</td><td>$1,237</td></tr>
                  <tr><td>3 BR</td><td>4.5</td><td>$1,907</td><td>$1,430</td></tr>
                </tbody>
              </table>
              <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 6 }}>Rent = 30% x Income / 12. HUD HH-size factors applied.</div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Affordable Unit Gap Analysis</h3>
              <table className="data-table" style={{ fontSize: 10, flex: 1 }}>
                <thead><tr><th>Unit</th><th>Current</th><th>Market</th><th>Gap</th><th>Annual Gap</th></tr></thead>
                <tbody>
                  <tr><td>A-3 (60%)</td><td>$1,534</td><td>$2,895</td><td>$1,361</td><td>$16,332</td></tr>
                  <tr><td>C-1 (80%)</td><td>$2,039</td><td>$2,895</td><td>$856</td><td>$10,272</td></tr>
                  <tr><td>C-2 (60%)</td><td>$1,478</td><td>$2,895</td><td>$1,417</td><td>$17,004</td></tr>
                  <tr className="total-row"><td><strong>Total</strong></td><td><strong>$5,051</strong></td><td><strong>$8,685</strong></td><td><strong>$3,634</strong></td><td><strong>$43,608</strong></td></tr>
                </tbody>
              </table>
            </div>

            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Income Basis: SMI vs. AMI (2025, 4-Person HH)</h3>
              <table className="data-table" style={{ fontSize: 10, flex: 1 }}>
                <thead><tr><th>Standard</th><th>100%</th><th>80%</th><th>60%</th></tr></thead>
                <tbody>
                  <tr><td>CT State Median (SMI)</td><td>$91,665</td><td>$73,332</td><td>$54,999</td></tr>
                  <tr><td>Stamford-Norwalk AMI</td><td>$180,500</td><td>$144,400</td><td>$108,300</td></tr>
                  <tr><td>Delta (AMI - SMI)</td><td>$88,835</td><td>$71,068</td><td>$53,301</td></tr>
                </tbody>
              </table>
              <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 6 }}>AMI is ~97% higher than SMI. Sources: HUD FY2025, UCONN CLEAR, Stamford 2025 BMR.</div>
            </div>


            <div style={{ fontSize: 8, lineHeight: 1.5, color: 'var(--stone)', marginTop: 2 }}>
              <strong>Key Caveats:</strong> 8-30g restrictions run 40 years from deed restriction date. Existing units restricted to lesser of SMI/AMI. "Unrestricted" scenario is theoretical. Market comp rent ($2,895) reflects avg in-place market units; top of market is $3,350 (B3, 2025 lease). Rent caps are gross (include utility allowance). Sources: CGS §8-30g; HUD FY2025; UCONN CLEAR; Stamford 2025 BMR Schedule.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
function DonutChart({ data, size = 112, thickness = 20, centerLabel, centerSub }) {
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
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 22, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
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
  const units = [
    { unit: 'A-1', type: '2/1.5', sqft: 850, designation: 'Market', inPlace: 2995, market: 2995, proforma: 3200 },
    { unit: 'A-2', type: '2/1.0', sqft: 950, designation: 'Market', inPlace: 2875, market: 2875, proforma: 3100 },
    { unit: 'A-3', type: '2/1.0 (60%)', sqft: 650, designation: 'Affordable', inPlace: 1534, market: 1534, proforma: 1935 },
    { unit: 'B-1', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 2895, market: 3350, proforma: 3350 },
    { unit: 'B-2', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 2895, market: 3350, proforma: 3350 },
    { unit: 'B-3', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 3350, market: 3350, proforma: 3350 },
    { unit: 'C-1', type: '2/1.5 Townhouse w/ Basement (80%)', sqft: 1052, designation: 'Affordable', inPlace: 2039, market: 2039, proforma: 2039 },
    { unit: 'C-2', type: '2/1.5 Townhouse w/ Basement (60%)', sqft: 1052, designation: 'Affordable', inPlace: 1478, market: 1478, proforma: 1935 },
    { unit: 'C-3', type: '2/1.5 Townhouse w/ Basement', sqft: 1052, designation: 'Market', inPlace: 2825, market: 2825, proforma: 3250 },
  ]
  const totalSqft = units.reduce((s, u) => s + u.sqft, 0)
  const totalInPlace = units.reduce((s, u) => s + u.inPlace, 0)
  const totalMarket = units.reduce((s, u) => s + u.market, 0)
  const totalProforma = units.reduce((s, u) => s + u.proforma, 0)
  const unitMix = [
    { label: 'Apartments (A)', value: 3, color: '#3F4753' },
    { label: 'Townhouse · Garage (B)', value: 3, color: '#F8971D' },
    { label: 'Townhouse · Basement (C)', value: 3, color: '#B55D37' },
  ]
  const affordability = [
    { label: 'Market Rate', value: 6, color: '#3F4753' },
    { label: 'Affordable (8-30g)', value: 3, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix & <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 9.5 }}>
          <thead><tr><th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th><th style={{ textAlign: 'center' }}>Designation</th><th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Market</th><th style={{ textAlign: 'center' }}>Pro Forma</th></tr></thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={i}>
                <td>{u.unit}</td>
                <td>{u.type}</td>
                <td style={{ textAlign: 'right' }}>{u.sqft.toLocaleString()}</td>
                <td style={{ textAlign: 'center' }}>{u.designation}</td>
                <td style={{ textAlign: 'right' }}>${u.inPlace.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${u.market.toLocaleString()}</td>
                <td style={{ textAlign: 'center' }}>${u.proforma.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>9 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{totalSqft.toLocaleString()} SF</strong></td>
              <td></td>
              <td style={{ textAlign: 'right' }}><strong>${totalInPlace.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totalMarket.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'center' }}><strong>${totalProforma.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 14, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Mix" data={unitMix} centerLabel="9" centerSub="UNITS" />
          <ChartCard title="Affordability" data={affordability} centerLabel="9" centerSub="UNITS" />
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Income Summary by Designation</h3>
            <table className="data-table" style={{ fontSize: 9, flex: 1 }}>
              <thead><tr><th>Designation</th><th>Units</th><th>Monthly</th><th>Avg / Unit</th></tr></thead>
              <tbody>
                <tr><td>Market</td><td>6</td><td>$17,835</td><td>$2,973</td></tr>
                <tr><td>Affordable</td><td>3</td><td>$5,051</td><td>$1,684</td></tr>
                <tr className="total-row"><td><strong>Total</strong></td><td><strong>9</strong></td><td><strong>$22,886</strong></td><td><strong>$2,543</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8, padding: '3px 6px', textAlign: 'right' }
  const tdl = { fontSize: 8, padding: '3px 6px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7, padding: '4px 6px', textAlign: 'right' }
  const thl = { fontSize: 7, padding: '4px 6px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8, padding: '3px 6px', textAlign: 'right' }

  // Shared column geometry so the income + expense tables align column-for-column.
  const Cols = () => (
    <colgroup>
      <col style={{ width: '19%' }} />
      {Array.from({ length: 9 }).map((_, i) => <col key={i} style={{ width: '9%' }} />)}
    </colgroup>
  )

  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 8.5, padding: '4px 6px', textAlign: 'right' }

  const noi = [
    { label: 'NOI — In-Place (T12)', val: '$222,637' },
    { label: 'NOI — Year 1', val: '$217,144' },
    { label: 'NOI — Pro Forma', val: '$247,991' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 10 }} />

        {/* NOI summary strip (boxless), above the tables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 4 }}>{n.val}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Trailing 12</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdl}>Gross Potential Rent</td><td style={tds}>$306,108</td><td style={tds}>$34,012</td><td style={tds}>107.86%</td><td style={tds}>$306,108</td><td style={tds}>$34,012</td><td style={tds}>109.98%</td><td style={tds}>$306,108</td><td style={tds}>$34,012</td><td style={tds}>99.01%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Below Market Rent</td><td style={tds}>-$31,476</td><td style={tds}>-$3,497</td><td style={tds}>-11.09%</td><td style={tds}>-$31,476</td><td style={tds}>-$3,497</td><td style={tds}>-11.31%</td><td style={tds}>$0</td><td style={tds}>$0</td><td style={tds}>0.00%</td></tr>
            <tr><td style={{ ...tdl, fontWeight: 700 }}>Gross Scheduled Rent</td><td style={{ ...tds, fontWeight: 700 }}>$274,632</td><td style={{ ...tds, fontWeight: 700 }}>$30,515</td><td style={{ ...tds, fontWeight: 700 }}>96.77%</td><td style={{ ...tds, fontWeight: 700 }}>$274,632</td><td style={{ ...tds, fontWeight: 700 }}>$30,515</td><td style={{ ...tds, fontWeight: 700 }}>98.68%</td><td style={{ ...tds, fontWeight: 700 }}>$306,108</td><td style={{ ...tds, fontWeight: 700 }}>$34,012</td><td style={{ ...tds, fontWeight: 700 }}>99.01%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Vacancy & Collections Loss</td><td style={tds}>$0</td><td style={tds}>$0</td><td style={tds}>0.00%</td><td style={tds}>-$5,493</td><td style={tds}>-$610</td><td style={tds}>-1.97%</td><td style={tds}>-$6,122</td><td style={tds}>-$680</td><td style={tds}>-1.98%</td></tr>
            <tr><td style={{ ...tdl, fontWeight: 700 }}>Effective Rental Income</td><td style={{ ...tds, fontWeight: 700 }}>$274,632</td><td style={{ ...tds, fontWeight: 700 }}>$30,515</td><td style={{ ...tds, fontWeight: 700 }}>96.77%</td><td style={{ ...tds, fontWeight: 700 }}>$269,139</td><td style={{ ...tds, fontWeight: 700 }}>$29,904</td><td style={{ ...tds, fontWeight: 700 }}>96.70%</td><td style={{ ...tds, fontWeight: 700 }}>$299,986</td><td style={{ ...tds, fontWeight: 700 }}>$33,332</td><td style={{ ...tds, fontWeight: 700 }}>97.03%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Utility Bill Back</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>3.23%</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>3.30%</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>2.97%</td></tr>
            <tr><td style={tdl}>Total Additional Income</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>3.23%</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>3.30%</td><td style={tds}>$9,180</td><td style={tds}>$1,020</td><td style={tds}>2.97%</td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$283,812</td><td style={totBg}>$31,535</td><td style={totBg}>100.00%</td><td style={totBg}>$278,319</td><td style={totBg}>$30,924</td><td style={totBg}>100.00%</td><td style={totBg}>$309,166</td><td style={totBg}>$34,352</td><td style={totBg}>100.00%</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Trailing 12</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdl}>Real Estate Tax</td><td style={tds}>$27,743</td><td style={tds}>$3,083</td><td style={tds}>9.78%</td><td style={tds}>$27,743</td><td style={tds}>$3,083</td><td style={tds}>9.97%</td><td style={tds}>$27,743</td><td style={tds}>$3,083</td><td style={tds}>8.97%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Property Insurance</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.52%</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.55%</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.40%</td></tr>
            <tr><td style={tdl}>Sewer</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.52%</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.55%</td><td style={tds}>$4,320</td><td style={tds}>$480</td><td style={tds}>1.40%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Water</td><td style={tds}>$696</td><td style={tds}>$77</td><td style={tds}>0.25%</td><td style={tds}>$696</td><td style={tds}>$77</td><td style={tds}>0.25%</td><td style={tds}>$696</td><td style={tds}>$77</td><td style={tds}>0.23%</td></tr>
            <tr><td style={tdl}>Trash Removal</td><td style={tds}>$4,380</td><td style={tds}>$487</td><td style={tds}>1.54%</td><td style={tds}>$4,380</td><td style={tds}>$487</td><td style={tds}>1.57%</td><td style={tds}>$4,380</td><td style={tds}>$487</td><td style={tds}>1.42%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Alarm Monitoring</td><td style={tds}>$2,376</td><td style={tds}>$264</td><td style={tds}>0.84%</td><td style={tds}>$2,376</td><td style={tds}>$264</td><td style={tds}>0.85%</td><td style={tds}>$2,376</td><td style={tds}>$264</td><td style={tds}>0.77%</td></tr>
            <tr><td style={tdl}>Landscaping</td><td style={tds}>$5,200</td><td style={tds}>$578</td><td style={tds}>1.83%</td><td style={tds}>$5,200</td><td style={tds}>$578</td><td style={tds}>1.87%</td><td style={tds}>$5,200</td><td style={tds}>$578</td><td style={tds}>1.68%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Snow Removal</td><td style={tds}>$12,140</td><td style={tds}>$1,349</td><td style={tds}>4.28%</td><td style={tds}>$12,140</td><td style={tds}>$1,349</td><td style={tds}>4.36%</td><td style={tds}>$12,140</td><td style={tds}>$1,349</td><td style={tds}>3.93%</td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$61,175</td><td style={totBg}>$6,797</td><td style={totBg}>21.55%</td><td style={totBg}>$61,175</td><td style={totBg}>$6,797</td><td style={totBg}>21.98%</td><td style={totBg}>$61,175</td><td style={totBg}>$6,797</td><td style={totBg}>19.79%</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Effective Net Operating Income</td><td style={noiBg}>$222,637</td><td style={noiBg}>$24,737</td><td style={noiBg}>78.45%</td><td style={noiBg}>$217,144</td><td style={noiBg}>$24,127</td><td style={noiBg}>78.02%</td><td style={noiBg}>$247,991</td><td style={noiBg}>$27,555</td><td style={noiBg}>80.21%</td></tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 10 — DEAL CONTACTS ═══════════════════ */
function DealContacts({ pageNum }) {
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts dc-contacts--1">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Taylor-Perun-430x488.png" alt="Taylor Perun" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Taylor Perun</div>
            <div className="dc-title">Senior Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1576</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>tperun@northeastpcg.com</div>
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

/* ═══════════════════ 11 — SELLING PROCESS ═══════════════════ */
function SellingProcess() {
  const stages = [
    { label: 'Sales and Marketing', items: ['Evaluate, underwrite, and position the property with extensive rent and sales comp research','Develop the offering memorandum that articulates the investment thesis to qualified buyers','Advocate and educate prospects on deal strengths while mitigating concerns','Execute broad and targeted marketing across direct, digital, and email channels','Coordinate tours with seller, property manager, and qualified buyers','Engineer a competitive environment designed to drive pricing tension','Track and report offers, tours, and activity in real time','Build and maintain the secure data room for due diligence readiness'] },
    { label: 'Negotiation & Contract', items: ['Facilitate and negotiate offers from prospective buyers','Screen and qualify buyer financial capacity and track record','Negotiate best possible price and terms for the seller','Help identify the buyer with the highest probability of closing','Maintain deal momentum and buyer engagement through contract','Confirm offer terms are accurately reflected in the PSA','Compile and reconcile due diligence documentation to head off surprises'] },
    { label: 'Transaction Management', items: ['Facilitate transmission of due diligence items — taxes, insurance, water, utilities','Coordinate with buyer, seller, lender, and attorneys on all diligence workstreams','Confirm receipt of third-party reports and lender commitment letters','Track key contract dates and manage open contingencies','Mitigate unforeseen issues and respond to buyer re-trade attempts','Track amendments and any negotiated changes through to closing'] },
  ]
  return (
    <StaticShell section="Selling Process" title="Selling Process Stages" pageNum={11}>
      <div className="stages">
        {stages.map((s, i) => (
          <section key={s.label} className={`stages__stage ${i % 2 === 1 ? 'stages__stage--alt' : ''}`}>
            <h3 className="stages__label">{s.label}</h3>
            <ul className="stages__list">{s.items.map(it => <li key={it}>{it}</li>)}</ul>
          </section>
        ))}
      </div>
    </StaticShell>
  )
}

/* ═══════════════════ 12 — MARKETING TIMELINE ═══════════════════ */
function MarketingTimeline() {
  const phases = [
    { weeks: '1–2', label: 'Prepare', items: ['Finalize pricing and listing agreement','Collect property financials and diligence','Schedule photography / video','Build marketing materials (OM, flyers, email)','Begin quiet marketing to qualified buyers'] },
    { weeks: '3–6', label: 'Launch', items: ['Go live on CoStar, LoopNet, CREXi, and peer platforms','Launch email and call campaigns','Conduct property tours','Provide weekly activity and market feedback','Call for Offers typically set at end of Week 6'] },
    { weeks: '7–8', label: 'Offers', items: ['Receive and underwrite offers','Conduct best-and-final round if needed','Qualify buyers and negotiate LOI'] },
    { weeks: '9–12', label: 'Escrow', items: ['Execute PSA','Manage due diligence and buyer financing','Coordinate closing process','Proactive involvement through close'] },
  ]
  return (
    <StaticShell section="Marketing Timeline" title="Marketing Timeline" pageNum={12}>
      <div className="timeline">
        <p className="timeline__lead">A proven process designed to generate urgency, drive competition, and produce the highest price the market will bear.</p>
        <div className="timeline__track">
          {phases.map((p, i) => (
            <div key={p.label} className="timeline__phase">
              <div className="timeline__bubble">
                <div className="timeline__bubble-weeks">Weeks</div>
                <div className="timeline__bubble-range">{p.weeks}</div>
              </div>
              {i < phases.length - 1 && <div className="timeline__connector" />}
              <div className="timeline__label">{p.label}</div>
              <ul className="timeline__items">{p.items.map(it => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </StaticShell>
  )
}

/* ═══════════════════ 13 — MARKETING STRATEGY ═══════════════════ */
function MarketingStrategy() {
  return (
    <StaticShell section="Marketing Strategy" title="Marketing Strategy & Buyer Profile" pageNum={13}>
      <div className="mkt-strategy">
        <section>
          <h3 className="mkt-strategy__heading">Marketing Strategy</h3>
          <ul className="mkt-strategy__list">
            <li><span className="mkt-strategy__tag">Professional Marketing Materials</span> — High-quality exterior, aerial, and interior photography that showcases the asset.</li>
            <li><span className="mkt-strategy__tag">Comprehensive Offering Memorandum</span> — Full investor package detailing financials, market overview, and value-add thesis.</li>
            <li><span className="mkt-strategy__tag">Broad Market Exposure</span> — Digital campaign across CoStar, LoopNet, CREXi, paired with targeted email outreach.</li>
            <li><span className="mkt-strategy__tag">Relationship-Driven Outreach</span> — Leverage established relationships with active multifamily investors.</li>
            <li><span className="mkt-strategy__tag">Organized Tour Process</span> — Scheduled tour days to build momentum and competitive tension.</li>
            <li><span className="mkt-strategy__tag">Competitive Bidding</span> — Structured Call for Offers followed by best-and-final round.</li>
            <li><span className="mkt-strategy__tag">Data Room & Due Diligence</span> — Secure deal room under NDA with all property documents.</li>
            <li><span className="mkt-strategy__tag">Buyer Support</span> — Introductions to preferred lenders, managers, attorneys, and insurance providers.</li>
          </ul>
        </section>
        <section>
          <h3 className="mkt-strategy__heading">Target Buyer Profile</h3>
          <ul className="mkt-strategy__list">
            <li><span className="mkt-strategy__tag">Smaller Institutional Investors</span> — Groups with an existing or expanding presence in the local market.</li>
            <li><span className="mkt-strategy__tag">1031 Exchange Buyers</span> — Seeking a turnkey multifamily asset with established rent roll.</li>
            <li><span className="mkt-strategy__tag">High-Net-Worth Investors</span> — Individuals or family offices pursuing stable multifamily with value-add upside.</li>
            <li><span className="mkt-strategy__tag">Trade-Up Operators</span> — Experienced regional owners moving from smaller Class B/C assets.</li>
          </ul>
          <div className="mkt-strategy__note"><strong>Value Optimization:</strong> Prior to launch, execute low-cost, high-impact cosmetic improvements — refreshed landscaping, selective exterior painting, general cleanup — to ensure the property shows at its best.</div>
        </section>
      </div>
    </StaticShell>
  )
}

/* ═══════════════════ 14 — NATIONAL VISIBILITY ═══════════════════ */
function NationalVisibility() {
  const platforms = [
    { name: 'CoStar', stat: '8M monthly users' },{ name: 'LoopNet', stat: '12M monthly searches' },
    { name: 'CREXi', stat: '2M registered buyers' },{ name: 'Brevitas', stat: '250K members' },
    { name: 'RealNex', stat: 'National syndication' },{ name: 'theBrokerList', stat: 'CRE broker network' },
    { name: 'CommercialEdge', stat: 'Enterprise platform' },{ name: 'MLS', stat: 'Regional listings' },
  ]
  return (
    <StaticShell section="National Visibility" title="National Visibility. Maximum Market Exposure." pageNum={14}>
      <div className="visibility">
        <p className="visibility__lead">Beyond our private database, we deploy the most powerful digital tools in commercial real estate to broadcast your property nationwide.</p>
        <ul className="visibility__bullets">
          <li>Featured on CoStar, LoopNet, CREXi, and top national CRE networks</li>
          <li>Enhanced exposure through our website, email campaigns, and listing syndication</li>
          <li>Designed to reach institutional, private, and 1031 exchange buyers coast to coast</li>
        </ul>
        <div className="visibility__grid">
          {platforms.map(p => <div key={p.name} className="visibility__chip"><div className="visibility__chip-name">{p.name}</div><div className="visibility__chip-stat">{p.stat}</div></div>)}
        </div>
        <div className="visibility__banner">Our mission is to create a market for your asset — not wait for one.</div>
      </div>
    </StaticShell>
  )
}

/* ═══════════════════ RIDGEFIELD COMBINED ═══════════════════ */
function RidgefieldCombined({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Ridgefield, <span style={{ color: '#F8971D' }}>Connecticut</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Live Where You Invest</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Few towns in Connecticut offer what Ridgefield does: a genuine, walkable New England village
              paired with the income, schools, and stability of Fairfield County's most desirable communities.
              Main Street is the heartbeat — a tree-lined historic district of independent boutiques, acclaimed
              restaurants, and cultural anchors including the Ridgefield Playhouse, the Prospector Theater,
              A.C.T. of Connecticut, and the Aldrich Contemporary Art Museum. Residents stroll to dinner, catch
              live music at Ballard Park's summer concert series, and still come home to a town surrounded by
              lakes, preserved open space, and miles of trails. For New York commuters, Branchville station sits
              right in town, and express Harlem Line trains from nearby Katonah reach Grand Central in about an hour.
            </p>
            <p>
              For an investor, that quality of life translates directly into the rent roll. Ridgefield is a
              high-barrier-to-entry market where restrictive zoning has kept multifamily inventory scarce for
              decades, while demand comes from a deep pool of high-income professionals, NYC commuters, and
              empty-nesters determined to stay in town. The result is durable occupancy, resilient rents, and an
              asset class that rarely trades here. This is the rare offering where the owner's thesis is as simple
              as the town itself: people want to live in Ridgefield — and there are very few doors available to them.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Ridgefield</div>
          <ul className="highlights ridge-highlights">
            <li>Founded in 1708; Main Street historic district designated a National Historic Landmark in 1984</li>
            <li>Population of ~25,000 in the foothills of the Berkshires on the New York border</li>
            <li>One of Connecticut's most affluent communities — median household income of roughly $170,000+, ranking among the top towns in the state</li>
            <li>Highly educated base — about 73% of adults hold a bachelor's degree or higher</li>
            <li>Top-rated public schools; consistently ranked among the best places to live in Connecticut</li>
            <li>A walkable village center — boutique shopping, acclaimed dining, and a cultural scene anchored by the Playhouse, Prospector Theater, A.C.T. of Connecticut, and the Aldrich Museum</li>
            <li>Metro-North in town at Branchville, with ~1-hour express service to Grand Central from nearby Katonah</li>
            <li>Surrounded by lakes, town beaches, state parks, and an extensive preserved trail network</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/Exterior Edit 2.png" alt="Ridgefield, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/613 Complex.webp" alt="Main Street Apartments" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

function FairfieldCounty({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Ridgefield in <span style={{ color: '#F8971D' }}>Fairfield County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>Ridgefield sits inside Fairfield County — Connecticut's largest and wealthiest county, with roughly 950,000 residents and four of the state's biggest cities in Bridgeport, Stamford, Norwalk, and Danbury. It anchors one of the Northeast's deepest, most diversified economies — financial and professional services, healthcare, and advanced manufacturing — and is home to nineteen Fortune 1000 headquarters.</p>
            <p>Within that already-affluent county, Ridgefield sits near the very top. Household incomes here run well ahead of the county as a whole, anchored by A+ schools, low crime, preserved open space, and direct Metro-North access to Manhattan — the mix that keeps rental demand deep, durable, and quality-driven.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Ridgefield vs. Fairfield County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>Town of Ridgefield</th>
                  <th style={{ textAlign: 'right' }}>Fairfield County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>25,109</td><td style={{ textAlign: 'right' }}>957,419</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>8,772</td><td style={{ textAlign: 'right' }}>360,159</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$179,219</td><td style={{ textAlign: 'right' }}>$110,000</td></tr>
                <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$247,890</td><td style={{ textAlign: 'right' }}>$167,632</td></tr>
                <tr><td>Total Employees</td><td style={{ textAlign: 'right' }}>11,582</td><td style={{ textAlign: 'right' }}>501,539</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>
            Ridgefield&rsquo;s median household income runs well above the county&rsquo;s &mdash; reflecting the town&rsquo;s affluent, high-barrier rental base. Source: U.S. Census ACS 2024 5-Year Estimates. Avg = mean household income.
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/Exterior Edit 5.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  // Page order is the single source of truth — pageNum is auto-assigned by
  // position below (1-based), so adding/removing/reordering a page renumbers
  // the whole deck automatically. (Keep Toc.jsx's `n` values in sync.)
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <Divider eyebrow="01" title="The Property" />,
    <BuildingDescriptions />,
    <AffordabilityAnalysis />,
    ...PHOTO_PAGES.map(p => <PhotoComingSoon {...p} />),
    <Divider eyebrow="02" title="Financial Analysis" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" />,
    <RidgefieldCombined />,
    <LocationMap />,
    <FairfieldCounty />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" />,
    <BrokerProfile />,
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
