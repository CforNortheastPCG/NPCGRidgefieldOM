import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import SiteMap from './SiteMap.jsx'
import { PhotoPage, FloorPlanPage } from './PhotoPages.jsx'
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
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              NortheastPCG, Inc. is pleased to present 613-615 Main Street, a 9-unit multifamily property in the
              heart of Ridgefield, CT.
            </p>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              Ridgefield is one of Fairfield County&rsquo;s most affluent and tightly held towns, and the
              property fits that profile. The nine units &mdash; a mix of townhouse and flat style residences,
              all two-bedrooms &mdash; sit on a well-landscaped half-acre lot. It&rsquo;s the kind of asset
              that&rsquo;s genuinely hard to replicate: a simple, consistent unit mix in a location that keeps
              demand steady through every market cycle.
            </p>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              The units are designed to keep operating costs predictable for ownership. Tenants are responsible
              for their own heat, supplied by propane furnaces, as well as their own electric hot water and
              common-area electric. Water is separately metered for every unit and billed back to the residents.
              Each home comes with an in-unit washer and dryer, there&rsquo;s ample on-site parking, and the
              grounds are nicely maintained year-round. Just as important, the property sits within walking
              distance of downtown Ridgefield and everything the town has to offer.
            </p>
            <p style={{ fontSize: 9.2, lineHeight: 1.35, marginBottom: 6 }}>
              The affordability component is one of the property&rsquo;s defining and most defensible features.
              613 Main Street was originally developed under Connecticut General Statute 8-30g, and it&rsquo;s
              now roughly 16 years into a 40-year restriction &mdash; leaving about 24 years remaining, with an
              estimated expiration around 2050. Importantly, only three of the nine units carry affordability
              restrictions &mdash; two at 60% of State Median Income and one at 80% &mdash; while the remaining
              six operate at full market rents. That set-aside provides steady, mission-aligned income today and
              a long runway before the restricted units eventually revert to unrestricted market rents.
            </p>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights ridge-highlights" style={{ flex: 1, justifyContent: 'space-between' }}>
              <li><strong>Newer 2012 Construction</strong> — Clean, uniform layout of townhouse and flat style residences on a well-landscaped half-acre lot</li>
              <li><strong>Consistent Unit Mix</strong> — All nine units are two-bedrooms with in-unit washer/dryer and ample on-site parking</li>
              <li><strong>Predictable Operating Costs</strong> — Tenants pay propane heat, electric hot water, and common-area electric; water billed back to residents</li>
              <li><strong>Prime Downtown Location</strong> — Walking distance to Ridgefield&rsquo;s Main Street in one of Fairfield County&rsquo;s most affluent, tightly held towns</li>
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
            <div className="kf-row"><span className="kf-label">Year Built / Renovated</span><span className="kf-val">c.1900 / 2012</span></div>
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
                <div className="bldg-row"><span className="bldg-label">Year Built / Renovated</span><span className="bldg-val">c. 1900 / 2012</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">B-1 (Business)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Garages + Surface Lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Market / Affordable</span><span className="bldg-val">6 Market / 3 Affordable</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Propane Forced Air / Electric</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric / Propane</span><span className="bldg-val">Tenant Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water/Sewer</span><span className="bldg-val">Separately Metered &middot; Billed Back / Tenant Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building A — Victorian Main House</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">3 Apartments (2BR) &middot; 3,233 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">c. 1900 &middot; Renovated 2012</span></div>
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
      <PageHeader section="Affordability" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="eyebrow">Affordability — CGS §8-30g</div>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 26 }}>
          8-30g Set-Aside &amp; <span style={{ color: '#F8971D' }}>Income Limits</span>
        </div>
        <div className="title-rule" />

        <p style={{ fontSize: 9.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>
          613 Main Street was originally developed under Connecticut&rsquo;s affordable-housing statute,{' '}
          <strong>CGS §8-30g</strong>, as a set-aside development. Three of the nine units are deed-restricted at the
          lesser of CT State Median Income (SMI) or the applicable HUD Area Median Income — SMI has historically
          controlled. The 40-year restriction is approximately <strong>16 years into its term, leaving roughly 24
          years remaining</strong> (estimated expiration near 2050). The exact expiration should be confirmed against
          the recorded deed-restriction date.
        </p>

        <div className="eyebrow" style={{ marginBottom: 6 }}>Restriction Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, marginBottom: 14 }}>
          <div className="kf-list">
            <div className="kf-row"><span className="kf-label">Set-Aside</span><span className="kf-val">3 of 9 units (2 @ 60% · 1 @ 80%)</span></div>
            <div className="kf-row"><span className="kf-label">Restriction Term</span><span className="kf-val">40 years (~16 elapsed)</span></div>
          </div>
          <div className="kf-list">
            <div className="kf-row"><span className="kf-label">Remaining</span><span className="kf-val">~24 years (est. expiry ~2050)</span></div>
            <div className="kf-row"><span className="kf-label">Income Basis</span><span className="kf-val">CT State Median (MFI $129,500)</span></div>
          </div>
        </div>

        {/* INCOME LIMITS + MAX GROSS RENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>2026 Income Limits — 8-30g (SMI)</h3>
            <table className="data-table" style={{ fontSize: 9.5 }}>
              <thead><tr><th>Income Limit</th><th>1P</th><th>2P</th><th>3P</th><th>4P</th><th>5P</th><th>6P</th></tr></thead>
              <tbody>
                <tr><td>80% of CT MFI — $103,600</td><td>$72,520</td><td>$82,880</td><td>$93,240</td><td>$103,600</td><td>$111,888</td><td>$120,176</td></tr>
                <tr><td>60% of CT MFI — $77,700</td><td>$54,390</td><td>$62,160</td><td>$69,930</td><td>$77,700</td><td>$83,916</td><td>$90,132</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>2026 Max Gross Rent — 8-30g (SMI)</h3>
            <table className="data-table" style={{ fontSize: 9.5 }}>
              <thead><tr><th>Max Gross Rent</th><th>Studio</th><th>1 BR</th><th>2 BR</th><th>3 BR</th></tr></thead>
              <tbody>
                <tr><td>80% of CT MFI</td><td>$1,713</td><td>$1,793</td><td>$2,131</td><td>$2,440</td></tr>
                <tr><td>60% of CT MFI</td><td>$1,260</td><td>$1,307</td><td>$1,548</td><td>$1,770</td></tr>
              </tbody>
            </table>
            <div style={{ fontSize: 7.8, color: 'var(--stone)', marginTop: 5, lineHeight: 1.4 }}>Rental maximums are gross (utility-inclusive) and may vary by development based on estimated utility allowances.</div>
          </div>
        </div>

        {/* IN-PLACE AFFORDABLE UNITS — GAP TO MARKET */}
        <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>In-Place Affordable Units — Gap to Market</h3>
        <table className="data-table" style={{ fontSize: 9.5, marginBottom: 12 }}>
          <thead><tr><th>Unit</th><th>Tier</th><th>Current Rent</th><th>Market Comp</th><th>Monthly Gap</th><th>Annual Gap</th></tr></thead>
          <tbody>
            <tr><td>Unit A3</td><td>60%</td><td>$1,534</td><td>$2,895</td><td>$1,361</td><td>$16,332</td></tr>
            <tr><td>Unit C1</td><td>80%</td><td>$2,039</td><td>$2,895</td><td>$856</td><td>$10,272</td></tr>
            <tr><td>Unit C2</td><td>60%</td><td>$1,478</td><td>$2,895</td><td>$1,417</td><td>$17,004</td></tr>
            <tr className="total-row"><td><strong>Total — 3 Units</strong></td><td></td><td><strong>$5,051</strong></td><td><strong>$8,685</strong></td><td><strong>$3,634</strong></td><td><strong>$43,608</strong></td></tr>
          </tbody>
        </table>

        <p style={{ fontSize: 8.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 6 }}>
          The affordability covenant forgoes roughly <strong>$43,608</strong> of annual income versus market rent
          today — the embedded upside that accrues to ownership only upon release of the restriction (~2050) or unit
          reclassification. Current affordable rents should be reconciled against each household&rsquo;s certification,
          unit-size tier, and the prevailing utility allowance. The restriction&rsquo;s income basis is the{' '}
          <strong>lesser of SMI or AMI</strong>; Connecticut SMI has remained materially below the Stamford-Norwalk
          AMI, so SMI governs.
        </p>
        <div style={{ fontSize: 8, lineHeight: 1.45, color: 'var(--stone)' }}>
          <strong style={{ color: 'var(--carbon)' }}>Sources:</strong> CGS §8-30g; Connecticut 2026 Income Limits
          Program Year schedule (State Median Income), effective 05/01/2026; owner-provided lease and classification data.
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
  const units = [
    { unit: 'A-1', type: '2/1.5', sqft: 850, designation: 'Market', inPlace: 2995, market: 2995, proforma: 3200 },
    { unit: 'A-2', type: '2/1.0', sqft: 950, designation: 'Market', inPlace: 2875, market: 2875, proforma: 3100 },
    { unit: 'A-3', type: '2/1.0 (60%)', sqft: 650, designation: 'Affordable', inPlace: 1534, market: 1534, proforma: 1548 },
    { unit: 'B-1', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 2895, market: 3350, proforma: 3350 },
    { unit: 'B-2', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 2895, market: 3350, proforma: 3350 },
    { unit: 'B-3', type: '2/1.5 Townhouse w/ Garage', sqft: 1052, designation: 'Market', inPlace: 3350, market: 3350, proforma: 3350 },
    { unit: 'C-1', type: '2/1.5 Townhouse w/ Basement (80%)', sqft: 1052, designation: 'Affordable', inPlace: 2039, market: 2039, proforma: 2131 },
    { unit: 'C-2', type: '2/1.5 Townhouse w/ Basement (60%)', sqft: 1052, designation: 'Affordable', inPlace: 1478, market: 1478, proforma: 1548 },
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, justifyContent: 'center' }}>
              {[
                { label: 'Market Rate', units: 6, monthly: '$17,835', avg: '$2,973', color: '#3F4753' },
                { label: 'Affordable (8-30g)', units: 3, monthly: '$5,051', avg: '$1,684', color: '#F8971D' },
              ].map(r => (
                <div key={r.label} style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: 10 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--stone)' }}>{r.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{r.monthly}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                  <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{r.units} units &middot; {r.avg} avg / unit</div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 9, marginTop: 1 }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--golden)' }}>Total &mdash; 9 Units</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>$22,886<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>$2,543 avg / unit &middot; $274,632 / yr</div>
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
  // Row heights are tuned up (vs the Williston original) so the shorter
  // Ridgefield schedule — 15 line items — still fills the page top-to-bottom.
  const tds = { fontSize: 8.5, padding: '2.5px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.5, padding: '2.5px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.5, padding: '3px 7px', textAlign: 'right' }
  const thl = { fontSize: 7.5, padding: '3px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '2.5px 7px', textAlign: 'right' }

  // Shared column geometry so the income + expense tables align column-for-column.
  const Cols = () => (
    <colgroup>
      <col style={{ width: '28%' }} />
      {Array.from({ length: 6 }).map((_, i) => <col key={i} style={{ width: '12%' }} />)}
    </colgroup>
  )

  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }

  const noi = [
    { label: 'NOI — Year 1', val: '$217,144' },
    { label: 'NOI — Pro Forma', val: '$239,970' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        {/* NOI summary strip (boxless), above the tables */}
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
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows mirror the Ridgefield I&E workbook exactly — labels, order,
                and which cells carry $/Unit and % values. Blank workbook cells
                render as em-dashes; nothing is computed for display. */}
            {[
              ['Gross Potential Rent', '$297,924', '—', '—', '$297,924', '—', '—', false],
              ['Below Market Rent', '-$23,292', '—', '-8.48%', '$0', '—', '0.00%', false],
              ['Gross Scheduled Rent', '$274,632', '—', '—', '$297,924', '—', '—', true],
              ['Vacancy & Collections Loss', '-$5,493', '—', '2.00%', '-$5,958', '—', '2.00%', false],
              ['Effective Rental Income', '$269,139', '—', '—', '$291,966', '—', '—', true],
              ['Utility Bill Back', '$9,180', '$1,020', '—', '$9,180', '$1,020', '—', false],
              ['Total Additional Income', '$9,180', '$1,020', '—', '$9,180', '$1,020', '—', true],
            ].map(([label, ...cells], i) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$278,319</td><td style={totBg}>&mdash;</td><td style={totBg}>&mdash;</td><td style={totBg}>$301,146</td><td style={totBg}>&mdash;</td><td style={totBg}>&mdash;</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Real Estate Tax', '$27,743', '$3,083', '—', '$27,743', '$3,083', '—'],
              ['Property Insurance', '$4,320', '$480', '—', '$4,320', '$480', '—'],
              ['Sewer', '$4,320', '$480', '—', '$4,320', '$480', '—'],
              ['Water', '$696', '$77', '—', '$696', '$77', '—'],
              ['Trash Removal', '$4,380', '$487', '—', '$4,380', '$487', '—'],
              ['Alarm Monitoring', '$2,376', '$264', '—', '$2,376', '$264', '—'],
              ['Landscaping', '$5,200', '$578', '—', '$5,200', '$578', '—'],
              ['Snow Removal', '$12,140', '$1,349', '—', '$12,140', '$1,349', '—'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$61,175</td><td style={totBg}>$6,797</td><td style={totBg}>21.98%</td><td style={totBg}>$61,175</td><td style={totBg}>$6,797</td><td style={totBg}>20.31%</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$217,144</td><td style={noiBg}>&mdash;</td><td style={noiBg}>&mdash;</td><td style={noiBg}>$239,970</td><td style={noiBg}>&mdash;</td><td style={noiBg}>&mdash;</td></tr>
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
    <SiteMap />,
    <AffordabilityAnalysis />,
    ...PHOTO_PAGES.map(p => p.plan ? <FloorPlanPage {...p} /> : <PhotoPage {...p} />),
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
