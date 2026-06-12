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
        <img className="cover-hero-img" src="/photos/1-web-or-mls-6 Elm St, Norwalk, CT 06850 (1 OF 53).JPG" alt="" />
        <div className="cover-hero-shade" />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>For Sale</div>
          <div className="cover-hero-name">Elm Street Apartments</div>
          <div className="cover-hero-title">{ADDR}</div>
          <div className="cover-hero-sub">Norwalk, Connecticut</div>
          <div className="cover-hero-rule" />
          <div className="cover-hero-prep">12-Unit Multifamily Property</div>
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$3,275,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Asking Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>12</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              Northeast Private Client Group is pleased to present {ADDR}, a 12-unit multifamily property in
              Norwalk, Connecticut. This value-add complex consists of three buildings on a single parcel,
              offering a compelling blend of stable cash flow and significant upside in one of
              Fairfield County&rsquo;s most desirable rental markets.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              The property features large apartment layouts &mdash; 10 of 12 units are 2BR, 3BR, or 4BR &mdash;
              across three buildings with varying utility configurations. Five apartments have been fully
              renovated, and two former commercial units have been converted to legal residential apartments.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 6 }}>
              Significant capital improvements have been completed including a new parking lot, storm drains,
              siding, vinyl windows, new HVAC systems to the rear building, a new furnace and commercial
              hot water heater to the middle building, brick pointing throughout, basement sump pumps,
              and washer/dryer in all renovated units plus units 11 and 12.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.4, marginBottom: 8 }}>
              All qualified parties are invited to request the full offering package and schedule a private
              tour through Northeast Private Client Group.
            </p>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights highlights--lg" style={{ flex: 1, justifyContent: 'space-between', fontSize: 9.4 }}>
              <li><strong>Large Unit Layouts</strong> — 10/12 units are 2BR, 3BR, or 4BR, commanding premium rents</li>
              <li><strong>Significant Capex Completed</strong> — 5 fully renovated units, new parking lot, HVAC, siding, windows</li>
              <li><strong>Value-Add Opportunity</strong> — Remaining units to renovate at turnover for additional rent growth</li>
              <li><strong>Desirable Market</strong> — Historically high occupancy in a strong Norwalk rental market with Metro-North access</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/41-web-or-mls-6 Elm St, Norwalk, CT 06850 (40 OF 53).JPG" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/42-web-or-mls-6 Elm St, Norwalk, CT 06850 (41 OF 53).JPG" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
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
              a 12-unit multifamily investment property located in Norwalk, Connecticut.
              This value-add complex consists of three buildings situated on a single parcel.
            </p>
            <p style={{ marginBottom: 8 }}>
              The property features large apartment layouts with 10 of 12 units being 2BR, 3BR, or 4BR.
              Significant capital improvements have been completed, with additional value-add
              opportunity remaining for an incoming investor.
            </p>
          </div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Property Summary</div>
          <div className="kf-list" style={{ flex: 1 }}>
            <div className="kf-row"><span className="kf-label">Address</span><span className="kf-val">{FULL_ADDR}</span></div>
            <div className="kf-row"><span className="kf-label">Property Type</span><span className="kf-val">Multifamily</span></div>
            <div className="kf-row"><span className="kf-label"># of Units</span><span className="kf-val">12</span></div>
            <div className="kf-row"><span className="kf-label"># of Buildings</span><span className="kf-val">3</span></div>
            <div className="kf-row"><span className="kf-label">Parking</span><span className="kf-val">New Parking Lot</span></div>
            <div className="kf-row"><span className="kf-label">Laundry</span><span className="kf-val">W/D in renovated units + Units 11 & 12</span></div>
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}>
          <img src="/photos/15-web-or-mls-6 Elm St, Norwalk, CT 06850 (14 OF 53).JPG" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">12 (2BR, 3BR, 4BR)</span></div>
                <div className="bldg-row"><span className="bldg-label">Buildings</span><span className="bldg-val">3</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">New Parking Lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Laundry</span><span className="bldg-val">W/D in renovated units + Units 11 & 12</span></div>
                <div className="bldg-row"><span className="bldg-label">Market</span><span className="bldg-val">All Market Rate</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Front Bldg (6 units)</span><span className="bldg-val">All Tenant Paid Electric (heat, HW, cooking)</span></div>
                <div className="bldg-row"><span className="bldg-label">Middle Bldg (4 units)</span><span className="bldg-val">Tenant Paid Electric, Landlord Paid Gas Heat & HW</span></div>
                <div className="bldg-row"><span className="bldg-label">Back Bldg (2 units)</span><span className="bldg-val">All Tenant Paid w/ Central A/C</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Front Building — 6 Units</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">6 Apartments — All separate tenants</span></div>
                <div className="bldg-row"><span className="bldg-label">Utilities</span><span className="bldg-val">Tenant paid electric (heat, hot water, cooking)</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">Renovated apartments, large layouts</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Middle Building — 4 Units</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">4 Apartments</span></div>
                <div className="bldg-row"><span className="bldg-label">Utilities</span><span className="bldg-val">Tenant paid electric, landlord paid gas heat & HW</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">New furnace, new commercial hot water heater</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Back Building — 2 Units</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Units</span><span className="bldg-val">2 Apartments</span></div>
                <div className="bldg-row"><span className="bldg-label">Utilities</span><span className="bldg-val">All tenant paid with central A/C</span></div>
                <div className="bldg-row"><span className="bldg-label">Features</span><span className="bldg-val">New HVAC units, ducts, pipes, new electric owners meter</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ CAPEX SUMMARY ═══════════════════ */
function CapexSummary({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Capital Improvements" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>
          Capital <span style={{ color: '#F8971D' }}>Improvements</span>
        </div>
        <div style={{ fontSize: 9, color: 'var(--stone)', marginBottom: 8 }}>6 Elm Street, Norwalk, CT &nbsp;|&nbsp; Completed Capex Summary</div>

        <div className="two-col" style={{ flex: 1, gap: 16, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Interior Renovations</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Full Renovations</span><span className="bldg-val">5 apartments fully renovated</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit Conversions</span><span className="bldg-val">2 commercial units converted to legal residential</span></div>
                <div className="bldg-row"><span className="bldg-label">Washer/Dryer</span><span className="bldg-val">Installed in all renovated units + Units 11 & 12</span></div>
              </div>
            </div>

            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Mechanical & HVAC</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Back Building</span><span className="bldg-val">New HVAC units, ducts, pipes</span></div>
                <div className="bldg-row"><span className="bldg-label">Back Building</span><span className="bldg-val">New electric owners meter added</span></div>
                <div className="bldg-row"><span className="bldg-label">Middle Building</span><span className="bldg-val">New furnace installed</span></div>
                <div className="bldg-row"><span className="bldg-label">Middle Building</span><span className="bldg-val">New commercial hot water heater</span></div>
                <div className="bldg-row"><span className="bldg-label">Basement</span><span className="bldg-val">New sump pumps installed</span></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11 }}>Exterior & Site Work</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">New parking lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Drainage</span><span className="bldg-val">New storm drains</span></div>
                <div className="bldg-row"><span className="bldg-label">Siding</span><span className="bldg-val">New siding installed</span></div>
                <div className="bldg-row"><span className="bldg-label">Flashing</span><span className="bldg-val">New flashing</span></div>
                <div className="bldg-row"><span className="bldg-label">Windows</span><span className="bldg-val">New vinyl windows</span></div>
                <div className="bldg-row"><span className="bldg-label">Masonry</span><span className="bldg-val">All brick pointed on property</span></div>
                <div className="bldg-row"><span className="bldg-label">Gutters</span><span className="bldg-val">Partial gutter replacement</span></div>
              </div>
            </div>

            <div style={{ fontSize: 9, lineHeight: 1.5, color: 'var(--stone)', marginTop: 2, padding: '10px 14px', background: 'var(--linen)', borderRadius: 4 }}>
              <strong>Value-Add Opportunity:</strong> With 5 of 12 units already fully renovated, the remaining
              units present a clear path to additional rent growth through renovation at turnover. The property
              benefits from historically high occupancy in a desirable Norwalk rental market.
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

function ChartCard({ title, data, centerLabel, centerSub, size, thickness }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} size={size} thickness={thickness} />
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
    { unit: '1', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 2170, high: 2550, proforma: 2600, leaseStart: '12/1/2023', leaseEnd: '12/31/2026' },
    { unit: '2', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 2150, high: 2550, proforma: 2600, leaseStart: '12/20/2025', leaseEnd: '12/19/2026' },
    { unit: '3', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 1900, high: 2550, proforma: 2600, leaseStart: '7/1/2023', leaseEnd: '2/28/2026' },
    { unit: '4', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 2220, high: 2550, proforma: 2600, leaseStart: '12/1/2023', leaseEnd: '12/31/2026' },
    { unit: '5', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 2550, high: 2550, proforma: 2600, leaseStart: '9/1/2024', leaseEnd: '8/31/2026' },
    { unit: '6', bldg: 'Front', type: '2/1.00', sqft: 800, inPlace: 1950, high: 2550, proforma: 2600, leaseStart: '4/1/2025', leaseEnd: '3/31/2027' },
    { unit: '7', bldg: 'Middle', type: '1/1.00', sqft: 700, inPlace: 1800, high: 1895, proforma: 2000, leaseStart: '2/1/2026', leaseEnd: '1/31/2027' },
    { unit: '8', bldg: 'Middle', type: '1/1.00', sqft: 845, inPlace: 1895, high: 1895, proforma: 2000, leaseStart: '7/1/2025', leaseEnd: '6/30/2026' },
    { unit: '9', bldg: 'Middle', type: '3/1.50', sqft: 1374, inPlace: 2000, high: 2000, proforma: 2850, leaseStart: '7/1/2023', leaseEnd: '2/28/2027' },
    { unit: '10', bldg: 'Middle', type: '2/1.00', sqft: 1374, inPlace: 2170, high: 2550, proforma: 2600, leaseStart: '12/1/2023', leaseEnd: '1/31/2027' },
    { unit: '11', bldg: 'Rear', type: '4/1.00', sqft: 1782, inPlace: 3100, high: 3100, proforma: 3250, leaseStart: '12/1/2024', leaseEnd: '11/30/2026' },
    { unit: '12', bldg: 'Rear', type: '3/1.00', sqft: 1210, inPlace: 2625, high: 2625, proforma: 2750, leaseStart: '12/1/2023', leaseEnd: '6/30/2026' },
  ]
  const totalSqft = units.reduce((s, u) => s + u.sqft, 0)
  const totalInPlace = units.reduce((s, u) => s + u.inPlace, 0)
  const totalHigh = units.reduce((s, u) => s + u.high, 0)
  const totalProforma = units.reduce((s, u) => s + u.proforma, 0)
  const unitMix = [
    { label: 'Front Building', value: 6, color: '#3F4753' },
    { label: 'Middle Building', value: 4, color: '#F8971D' },
    { label: 'Rear Building', value: 2, color: '#B55D37' },
  ]
  const bedroomMix = [
    { label: '1 BR', value: 2, color: '#566573' },
    { label: '2 BR', value: 7, color: '#3F4753' },
    { label: '3 BR', value: 2, color: '#F8971D' },
    { label: '4 BR', value: 1, color: '#B55D37' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix & <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 8, borderCollapse: 'collapse' }}>
          <thead><tr><th style={{ padding: '3px 4px' }}>Bldg</th><th style={{ padding: '3px 4px' }}>Unit</th><th style={{ padding: '3px 4px' }}>Type</th><th style={{ textAlign: 'right', padding: '3px 4px' }}>SF</th><th style={{ textAlign: 'right', padding: '3px 4px' }}>Current Rent</th><th style={{ textAlign: 'right', padding: '3px 4px' }}>High Achieved</th><th style={{ textAlign: 'right', padding: '3px 4px' }}>Pro Forma</th><th style={{ textAlign: 'center', padding: '3px 4px' }}>Lease Start</th><th style={{ textAlign: 'center', padding: '3px 4px' }}>Lease End</th></tr></thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={i} style={i % 2 === 1 ? { background: 'var(--linen)' } : {}}>
                <td style={{ padding: '2px 4px' }}>{u.bldg}</td>
                <td style={{ padding: '2px 4px' }}>{u.unit}</td>
                <td style={{ padding: '2px 4px' }}>{u.type}</td>
                <td style={{ textAlign: 'right', padding: '2px 4px' }}>{u.sqft.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '2px 4px' }}>${u.inPlace.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '2px 4px' }}>${u.high.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '2px 4px' }}>${u.proforma.toLocaleString()}</td>
                <td style={{ textAlign: 'center', padding: '2px 4px' }}>{u.leaseStart}</td>
                <td style={{ textAlign: 'center', padding: '2px 4px' }}>{u.leaseEnd}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td style={{ padding: '2px 4px' }}><strong>Monthly</strong></td>
              <td style={{ padding: '2px 4px' }}></td>
              <td style={{ padding: '2px 4px' }}><strong>12 Units</strong></td>
              <td style={{ textAlign: 'right', padding: '2px 4px' }}><strong>{totalSqft.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right', padding: '2px 4px' }}><strong>${totalInPlace.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right', padding: '2px 4px' }}><strong>${totalHigh.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right', padding: '2px 4px' }}><strong>${totalProforma.toLocaleString()}</strong></td>
              <td style={{ padding: '2px 4px' }}></td>
              <td style={{ padding: '2px 4px' }}></td>
            </tr>
            <tr style={{ background: 'var(--golden)', color: '#fff', fontWeight: 700 }}>
              <td style={{ color: '#fff', padding: '2px 4px' }}><strong>Annual</strong></td>
              <td style={{ color: '#fff', padding: '2px 4px' }}></td>
              <td style={{ color: '#fff', padding: '2px 4px' }}></td>
              <td style={{ color: '#fff', padding: '2px 4px' }}></td>
              <td style={{ textAlign: 'right', color: '#fff', padding: '2px 4px' }}><strong>${(totalInPlace * 12).toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right', color: '#fff', padding: '2px 4px' }}><strong>${(totalHigh * 12).toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right', color: '#fff', padding: '2px 4px' }}><strong>${(totalProforma * 12).toLocaleString()}</strong></td>
              <td style={{ color: '#fff', padding: '2px 4px' }}></td>
              <td style={{ color: '#fff', padding: '2px 4px' }}></td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 10, marginTop: 8, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Building Mix" data={unitMix} centerLabel="12" centerSub="UNITS" size={90} thickness={16} />
          <ChartCard title="Bedroom Mix" data={bedroomMix} centerLabel="12" centerSub="UNITS" size={90} thickness={16} />
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 9, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>Income Summary</h3>
            <table className="data-table" style={{ fontSize: 8, flex: 1 }}>
              <thead><tr><th>Metric</th><th style={{ textAlign: 'right' }}>Monthly</th><th style={{ textAlign: 'right' }}>Annual</th></tr></thead>
              <tbody>
                <tr><td>Current Rent</td><td style={{ textAlign: 'right' }}>${totalInPlace.toLocaleString()}</td><td style={{ textAlign: 'right' }}>${(totalInPlace * 12).toLocaleString()}</td></tr>
                <tr><td>High Achieved</td><td style={{ textAlign: 'right' }}>${totalHigh.toLocaleString()}</td><td style={{ textAlign: 'right' }}>${(totalHigh * 12).toLocaleString()}</td></tr>
                <tr><td>Pro Forma</td><td style={{ textAlign: 'right' }}>${totalProforma.toLocaleString()}</td><td style={{ textAlign: 'right' }}>${(totalProforma * 12).toLocaleString()}</td></tr>
                <tr className="total-row"><td><strong>Avg / Unit</strong></td><td style={{ textAlign: 'right' }}><strong>${Math.round(totalInPlace / 12).toLocaleString()}</strong></td><td style={{ textAlign: 'right' }}><strong>${Math.round(totalProforma / 12).toLocaleString()}</strong></td></tr>
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
  const tds = { fontSize: 8, padding: '2px 5px', textAlign: 'right' }
  const tdsPf = { fontSize: 8, padding: '2px 5px', textAlign: 'right' }
  const tdl = { fontSize: 8, padding: '2px 5px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7, padding: '3px 5px', textAlign: 'right' }
  const thrPf = { fontSize: 7, padding: '3px 5px', textAlign: 'right' }
  const thl = { fontSize: 7, padding: '3px 5px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8, padding: '2px 5px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 8.5, padding: '3px 5px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '22%' }} />
      {Array.from({ length: 6 }).map((_, i) => <col key={i} style={{ width: '13%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Current', val: '$212,794' },
    { label: 'NOI — Pro Forma', val: '$261,745' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 4 }}>{n.val}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 8 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thrPf, color: '#fff' }}>Pro Forma</th><th style={{ ...thrPf, color: '#fff' }}>$/Unit</th><th style={{ ...thrPf, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdl}>Gross Potential Rent</td><td style={tds}>$372,600</td><td style={tds}>$31,050</td><td style={tds}></td><td style={tdsPf}>$372,600</td><td style={tdsPf}>$31,050</td><td style={tdsPf}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Below Market Rent</td><td style={tds}>-$54,240</td><td style={tds}>-$4,520</td><td style={tds}>-14.56%</td><td style={tdsPf}>$0</td><td style={tdsPf}>$0</td><td style={tdsPf}>0.00%</td></tr>
            <tr><td style={{ ...tdl, fontWeight: 700 }}>Gross Scheduled Rent</td><td style={{ ...tds, fontWeight: 700 }}>$318,360</td><td style={{ ...tds, fontWeight: 700 }}>$26,530</td><td style={{ ...tds, fontWeight: 700 }}></td><td style={{ ...tdsPf, fontWeight: 700 }}>$372,600</td><td style={{ ...tdsPf, fontWeight: 700 }}>$31,050</td><td style={{ ...tdsPf, fontWeight: 700 }}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Vacancy & Collections Loss (5%)</td><td style={tds}>-$15,918</td><td style={tds}>-$1,327</td><td style={tds}>-5.00%</td><td style={tdsPf}>-$18,630</td><td style={tdsPf}>-$1,553</td><td style={tdsPf}>-5.00%</td></tr>
            <tr><td style={{ ...tdl, fontWeight: 700 }}>Effective Rental Income</td><td style={{ ...tds, fontWeight: 700 }}>$302,442</td><td style={{ ...tds, fontWeight: 700 }}>$25,204</td><td style={{ ...tds, fontWeight: 700 }}></td><td style={{ ...tdsPf, fontWeight: 700 }}>$353,970</td><td style={{ ...tdsPf, fontWeight: 700 }}>$29,498</td><td style={{ ...tdsPf, fontWeight: 700 }}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Late Fee, App Fee, Misc</td><td style={tds}>$1,050</td><td style={tds}>$88</td><td style={tds}></td><td style={tdsPf}>$1,050</td><td style={tdsPf}>$88</td><td style={tdsPf}></td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$303,492</td><td style={totBg}>$25,291</td><td style={totBg}></td><td style={totBg}>$355,020</td><td style={totBg}>$29,585</td><td style={totBg}></td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 8 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thrPf, color: '#fff' }}>Pro Forma</th><th style={{ ...thrPf, color: '#fff' }}>$/Unit</th><th style={{ ...thrPf, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdl}>Property Management (5%)</td><td style={tds}>$15,175</td><td style={tds}>$1,265</td><td style={tds}>5.00%</td><td style={tdsPf}>$17,751</td><td style={tdsPf}>$1,479</td><td style={tdsPf}>5.00%</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Real Estate Tax</td><td style={tds}>$35,338</td><td style={tds}>$2,945</td><td style={tds}></td><td style={tdsPf}>$35,338</td><td style={tdsPf}>$2,945</td><td style={tdsPf}></td></tr>
            <tr><td style={tdl}>Property Insurance</td><td style={tds}>$9,745</td><td style={tds}>$812</td><td style={tds}></td><td style={tdsPf}>$9,745</td><td style={tdsPf}>$812</td><td style={tdsPf}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Electric</td><td style={tds}>$4,169</td><td style={tds}>$347</td><td style={tds}></td><td style={tdsPf}>$4,169</td><td style={tdsPf}>$347</td><td style={tdsPf}></td></tr>
            <tr><td style={tdl}>Heating Fuel</td><td style={tds}>$5,447</td><td style={tds}>$454</td><td style={tds}></td><td style={tdsPf}>$5,447</td><td style={tdsPf}>$454</td><td style={tdsPf}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Water</td><td style={tds}>$4,668</td><td style={tds}>$389</td><td style={tds}></td><td style={tdsPf}>$4,668</td><td style={tdsPf}>$389</td><td style={tdsPf}></td></tr>
            <tr><td style={tdl}>Trash Removal</td><td style={tds}>$4,767</td><td style={tds}>$397</td><td style={tds}></td><td style={tdsPf}>$4,767</td><td style={tdsPf}>$397</td><td style={tdsPf}></td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Repairs & Maintenance</td><td style={tds}>$6,000</td><td style={tds}>$500</td><td style={tds}></td><td style={tdsPf}>$6,000</td><td style={tdsPf}>$500</td><td style={tdsPf}></td></tr>
            <tr><td style={tdl}>Landscaping / Snow</td><td style={tds}>$5,390</td><td style={tds}>$449</td><td style={tds}></td><td style={tdsPf}>$5,390</td><td style={tdsPf}>$449</td><td style={tdsPf}></td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$90,698</td><td style={totBg}>$7,558</td><td style={totBg}>29.88%</td><td style={totBg}>$93,275</td><td style={totBg}>$7,773</td><td style={totBg}>26.27%</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$212,794</td><td style={noiBg}>$17,733</td><td style={noiBg}>70.12%</td><td style={noiBg}>$261,745</td><td style={noiBg}>$21,812</td><td style={noiBg}>73.73%</td></tr>
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
        <aside className="dc-contacts dc-contacts--2">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Richard-Edwards-430x488.png" alt="Rich Edwards Jr." style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Rich Edwards Jr.</div>
            <div className="dc-title">Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1577</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>redwards@northeastpcg.com</div>
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

/* ═══════════════════ NORWALK LOCATION ═══════════════════ */
function NorwalkCombined({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Norwalk, <span style={{ color: '#F8971D' }}>Connecticut</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>A Desirable Coastal Market</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Norwalk is one of Connecticut&rsquo;s most dynamic cities — a coastal community of nearly 92,000
              that blends a thriving arts and dining scene in South Norwalk (SoNo) with quiet residential
              neighborhoods, excellent schools, and direct Metro-North express service to Grand Central
              in about an hour. The SoNo Collection, Maritime Aquarium, and a waterfront restaurant row
              draw visitors from across the region, while Calf Pasture Beach and Cranbury Park offer
              residents easy access to Long Island Sound and preserved green space.
            </p>
            <p>
              For investors, Norwalk delivers a compelling combination: a deep, diverse tenant base driven
              by NYC commuters, local professionals, and corporate relocations; a supply-constrained
              multifamily market where zoning limits new construction; and historically high occupancy
              that has produced durable, resilient rents. The city sits between Stamford and Bridgeport
              on I-95, giving residents access to the full Fairfield County employment base and all
              major transportation corridors.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Norwalk</div>
          <ul className="highlights ridge-highlights">
            <li>Population of ~92,000 — Connecticut&rsquo;s 6th largest city on the Long Island Sound</li>
            <li>Vibrant SoNo district — dining, arts, waterfront, and The SoNo Collection (Nordstrom, Bloomingdale&rsquo;s)</li>
            <li>Metro-North New Haven Line — ~60-minute express to Grand Central Terminal</li>
            <li>Major employers: Xerox, Frontier Communications, Booking Holdings, FactSet</li>
            <li>Strong rental demand driven by NYC commuters and Stamford/Bridgeport corridor professionals</li>
            <li>Coastal amenities — Calf Pasture Beach, Veterans Park, Oyster Shell Park waterfront</li>
            <li>Direct I-95, Merritt Parkway, and Route 7 highway access</li>
            <li>Maritime Aquarium, Lockwood-Mathews Mansion, Wall Street Theater cultural anchors</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/49-web-or-mls-6 Elm St, Norwalk, CT 06850 (48 OF 53).JPG" alt="Norwalk, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/51-web-or-mls-6 Elm St, Norwalk, CT 06850 (50 OF 53).JPG" alt="Norwalk Aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
          <div className="section-title" style={{ marginBottom: 2 }}>Norwalk in <span style={{ color: '#F8971D' }}>Fairfield County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>Norwalk sits inside Fairfield County — Connecticut's largest and wealthiest county, with roughly 950,000 residents and four of the state's biggest cities in Bridgeport, Stamford, Norwalk, and Danbury. It anchors one of the Northeast's deepest, most diversified economies — financial and professional services, healthcare, and advanced manufacturing — and is home to nineteen Fortune 1000 headquarters.</p>
            <p>As the county&rsquo;s third-largest city, Norwalk benefits from a diversified economy, strong employment base, and a desirable coastal location that drives consistent rental demand from professionals, commuters, and families alike.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Norwalk vs. Fairfield County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>City of Norwalk</th>
                  <th style={{ textAlign: 'right' }}>Fairfield County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>91,829</td><td style={{ textAlign: 'right' }}>957,419</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>35,420</td><td style={{ textAlign: 'right' }}>360,159</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$95,981</td><td style={{ textAlign: 'right' }}>$110,000</td></tr>
                <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$135,000</td><td style={{ textAlign: 'right' }}>$167,632</td></tr>
                <tr><td>Total Employees</td><td style={{ textAlign: 'right' }}>55,000+</td><td style={{ textAlign: 'right' }}>501,539</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>
            Norwalk&rsquo;s large employment base and coastal location drive deep, durable rental demand. Source: U.S. Census ACS 2024 5-Year Estimates.
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/19-web-or-mls-6 Elm St, Norwalk, CT 06850 (18 OF 53).JPG" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <Divider eyebrow="01" title="The Property" />,
    <BuildingDescriptions />,
    <CapexSummary />,
    ...PHOTO_PAGES.map(p => <PhotoComingSoon {...p} />),
    <Divider eyebrow="02" title="Financial Analysis" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" />,
    <NorwalkCombined />,
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
