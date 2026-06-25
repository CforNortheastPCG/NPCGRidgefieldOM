import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import DriveTimeMap from './DriveTimeMap.jsx'
import SiteMap from './SiteMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Scrim — light top shade so the white logo reads, strong bottom shade for the title */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.88) 100%)', pointerEvents: 'none' }} />
        {/* NPCG logo — top right */}
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {/* Name & address — top left */}
        <div className="cover-hero-overlay" style={{ top: 40, bottom: 'auto', left: 48, right: 'auto', textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 40 }}>{ADDR}</div>
          <div className="cover-hero-sub" style={{ marginBottom: 0 }}>{DEAL.cityLong}</div>
        </div>
        {/* Rule & descriptor — bottom left */}
        <div className="cover-hero-overlay" style={{ left: 48, right: 'auto', textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
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
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)', marginBottom: 10 }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$3,800,000</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Offering Price</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>13</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>In-Place Units</div>
                </div>
                <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>51</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Entitled Units</div>
                </div>
                <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>&plusmn;19,266 <span style={{ fontSize: 11 }}>SF</span></div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Existing Building Area</div>
                </div>
                <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>2.69 <span style={{ fontSize: 11 }}>Acres</span></div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Lot Size (±1.69 Entitled)</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 9, lineHeight: 1.46, margin: '0 0 10px' }}>
              Northeast Private Client Group is pleased to present <strong>Salem Square</strong>, a value-add
              commercial mixed-use opportunity at {ADDR} in Naugatuck, Connecticut. The 2.69-acre parcel includes an
              approved 51-unit multifamily development site, so a buyer acquires an income-producing center and a
              shovel-ready residential project together.
            </p>
            <p style={{ fontSize: 9, lineHeight: 1.46, margin: '0 0 10px' }}>
              Built in 1960, the two-story building holds about 19,266 square feet, 18,770 of it rentable, with ten
              ground-floor commercial suites and two rear apartments. The property fronts New Haven Road, which is
              Route 63, with direct access to Route 8. The center sits in the heart of the Naugatuck Valley, with
              Waterbury and its Metro-North Waterbury Branch terminus about ten minutes north, where the state is
              building a new $33.2 million station scheduled to open in summer 2027. The commercial tenants are
              convenience and service businesses, several of them in place for fifteen years or more, including Great
              China, Rose Spa &amp; Nails, Salem Wine &amp; Spirits, and Mexican Deli.
            </p>
            <p style={{ fontSize: 9, lineHeight: 1.46, margin: '0 0 10px' }}>
              The opportunity is a commercial center with several clear paths to grow income, paired with a residential
              development site that adds a second phase. Inside the existing center, a buyer leases up the vacant
              ground-floor commercial space, marks the occupied suites from about $13.38 per square foot toward the $15
              to $22 the building achieves on renewal, implements CAM recovery, and converts the vacant rear commercial
              suite into two apartments. That conversion is proven rather than theoretical, since the two apartments
              already in the building were created from similar space. On the same parcel, about 1.69 acres of excess
              land is entitled for a 51-unit multifamily building, with updated site plans approved by the Naugatuck
              Zoning Commission in September 2025. A buyer can run and improve the center while permitting the
              residential project, then build into Naugatuck&rsquo;s push for transit-oriented housing around the new
              station.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/aerial-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/ext-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use Retail + Development Site</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Units</span><span className="bldg-val">13 (10 commercial · 2 residential · 1 storage)</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">18,770 rentable (19,266 gross)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">2.69 Acres (±1.00 improved + ±1.69 entitled)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1960</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">R8</span></div>
                <div className="bldg-row"><span className="bldg-label">Traffic Count</span><span className="bldg-val">16,200 VPD (New Haven Rd / Rte 63)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parcel ID</span><span className="bldg-val">048-3303 (MBL N-5E211 · VisionPID 7366)</span></div>
                <div className="bldg-row"><span className="bldg-label">Occupancy</span><span className="bldg-val">84.6%</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Forced hot air, natural gas / [TO CONFIRM]</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Individually metered (16-meter modular, 2020); common areas LL</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Landlord paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Foundation</span><span className="bldg-val">Concrete; full basement (±8,814 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Frame / Stories</span><span className="bldg-val">Wood frame · two stories</span></div>
                <div className="bldg-row"><span className="bldg-label">Exterior</span><span className="bldg-val">Brick veneer / cedar / redwood</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Flat · tar and gravel</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">±26,000 SF paved asphalt</span></div>
                <div className="bldg-row"><span className="bldg-label">A/C</span><span className="bldg-val">None central; apartments on mini-split heat pumps</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Entitled Development</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Development Rights</span><span className="bldg-val">51-unit multifamily building</span></div>
                <div className="bldg-row"><span className="bldg-label">Approval</span><span className="bldg-val">Site plans approved Sept 2025</span></div>
                <div className="bldg-row"><span className="bldg-label">Excess Land</span><span className="bldg-val">±1.69 acres on the same lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Status</span><span className="bldg-val">Building permits the remaining step</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$3,800,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / Entitled Unit</span><span className="bldg-val">$74,510 (51 units)</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI (Norm.)</span><span className="bldg-val">$167,602</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$245,217</span></div>
              </div>
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

function ChartCard({ title, data, centerLabel, centerSub, size = 112, money = false }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flex: 1, minHeight: 0 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} size={size} thickness={24} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, maxWidth: 220 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 11 }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600 }}>{d.label}</span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{money ? `$${d.value.toLocaleString()}` : d.value} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Horizontal bar chart — in-place vs pro forma, with upside note. */
function BarChartCard({ title, data, note }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22, minHeight: 0, padding: '0 8px' }}>
        {data.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ flex: '0 0 84px', textAlign: 'right', fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>{d.label}</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: 34, background: d.color, borderRadius: 4 }} />
            </div>
            <span style={{ flex: '0 0 72px', fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>${d.value.toLocaleString()}</span>
          </div>
        ))}
        {note && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--golden)', marginTop: 2 }}>{note}</div>
        )}
      </div>
    </div>
  )
}

/* Mixed-use rent roll — gross scheduled rent by income component, in-place vs
   pro forma. Per-suite detail lives in the BOV / data room; this summarizes the
   figures carried in the underwriting. */
function RentRoll({ pageNum }) {
  const rows = [
    { comp: 'Commercial Retail', count: '10 suites', inPlace: 229788, pf: 319160, note: '2 vacant lease-up · mark to $15–$22/SF' },
    { comp: 'Apartments', count: '2 units', inPlace: 39600, pf: 43200, note: '$1,650 → $1,800 / mo' },
    { comp: 'Suite 12 Conversion', count: '+2 units (PF)', inPlace: 0, pf: 43200, note: '1,600 SF retail → two apartments' },
    { comp: 'Storage', count: '1 unit', inPlace: 0, pf: 0, note: 'Ancillary' },
  ]
  const totalInPlace = rows.reduce((s, r) => s + r.inPlace, 0)
  const totalPf = rows.reduce((s, r) => s + r.pf, 0)
  const useMix = [
    { label: 'Commercial Suites', value: 10, color: '#3F4753' },
    { label: 'Apartments', value: 2, color: '#F8971D' },
    { label: 'Storage', value: 1, color: '#B55D37' },
  ]
  const commercialUpside = [
    { label: 'In-Place', value: 229788, color: '#3F4753' },
    { label: 'Pro Forma', value: 319160, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent Roll & <span style={{ color: '#F8971D' }}>Lease-Up</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11 }}>
          <thead><tr><th>Income Component</th><th style={{ textAlign: 'center' }}>Count</th><th style={{ textAlign: 'right' }}>In-Place GSR</th><th style={{ textAlign: 'right' }}>Pro Forma GSR</th><th>Notes</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.comp}</td>
                <td style={{ textAlign: 'center' }}>{r.count}</td>
                <td style={{ textAlign: 'right' }}>{r.inPlace ? `$${r.inPlace.toLocaleString()}` : '—'}</td>
                <td style={{ textAlign: 'right' }}>{r.pf ? `$${r.pf.toLocaleString()}` : '—'}</td>
                <td style={{ fontSize: 9.5, color: 'var(--stone)' }}>{r.note}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td style={{ textAlign: 'center' }}><strong>13 (+2 PF)</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totalInPlace.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totalPf.toLocaleString()}</strong></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8.5, color: 'var(--stone)', marginTop: 6, lineHeight: 1.45 }}>
          Gross scheduled rent (annual). Occupied commercial suites currently average ~$13.38/SF against $15&ndash;$22
          underwritten on renewal; Salem Wine &amp; Spirits (exp. 6/30/2026) and Video Temptations (exp. 8/31/2026)
          roll in 2026. Effective and normalized figures appear on the Income &amp; Expense page; per-suite detail is
          in the data room.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 40, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="In-Place Units by Use" data={useMix} centerLabel="13" centerSub="UNITS" size={170} />
          <BarChartCard title="Commercial GSR — In-Place vs Pro Forma" data={commercialUpside} note="+$89,372 · +39% lease-up & mark-to-market" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
/* Summary income statement — T12 → Current (normalized) → Pro Forma. The figures
   shown are those carried in the underwriting; real estate taxes and insurance
   were escrowed in the T12 and normalized in the Current/Pro Forma columns. The
   full line-item schedule (electric, water/sewer, trash, etc., held at recent
   actuals) lives in the BOV / data room. The pro forma reflects the center's
   value-add path: commercial lease-up, mark-to-market, CAM recovery, and the
   Suite 12 residential conversion. NOTE: financials are pending an updated set
   of numbers from the deal team — table values left as-is until those land. */
function IncomeExpense({ pageNum }) {
  const tdl = { fontSize: 9, padding: '3px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tds = { fontSize: 9, padding: '3px 8px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 8px', textAlign: 'left', color: '#fff' }
  const thr = { fontSize: 8, padding: '4px 8px', textAlign: 'right', color: '#fff' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '3px 8px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '4px 8px', textAlign: 'right' }

  const noi = [
    { label: 'T12 NOI', val: '$203,218' },
    { label: 'In-Place (Normalized) NOI', val: '$167,602' },
    { label: 'Pro Forma NOI', val: '$245,217' },
  ]

  // [label, t12, current, proforma, bold]
  const income = [
    ['Effective Rental Income', '$256,767', '$267,408', '$344,242'],
    ['Other Income', '$2,460', '$2,460', '$21,726'],
  ]
  const expenses = [
    ['Real Estate Taxes', 'escrowed²', '$40,337', '$40,337'],
    ['Property Insurance', 'escrowed²', '$16,975', '$16,975'],
    ['Repairs & Maintenance', '$3,601', '$9,633', '$9,633'],
    ['Property Management (5% EGI)', '—³', '$13,493', '$18,298'],
    ['All Other Operating', 'actuals⁴', 'actuals⁴', 'actuals⁴'],
  ]

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      <col style={{ width: '22%' }} /><col style={{ width: '22%' }} /><col style={{ width: '22%' }} />
    </colgroup>
  )
  const Head = ({ first }) => (
    <thead>
      <tr style={{ background: 'var(--carbon)' }}>
        <th style={thl}>{first}</th>
        <th style={thr}>T12</th><th style={thr}>Current</th><th style={thr}>Pro Forma</th>
      </tr>
    </thead>
  )
  const Row = ([label, t12, cur, pf, bold], i) => {
    const w = bold ? { fontWeight: 700 } : null
    return (
      <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
        <td style={{ ...tdl, ...w }}>{label}</td>
        <td style={{ ...tds, ...w }}>{t12}</td><td style={{ ...tds, ...w }}>{cur}</td><td style={{ ...tds, ...w }}>{pf}</td>
      </tr>
    )
  }

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 6 }} />

        {/* NOI summary strip — T12 → Current → Pro Forma */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, paddingBottom: 7, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.val}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        {/* Operating income — full width */}
        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 9, tableLayout: 'fixed' }}>
          <Cols /><Head first="Income" />
          <tbody>
            {income.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$259,227</td><td style={totBg}>$269,868&sup1;</td><td style={totBg}>$365,968</td></tr>
          </tbody>
        </table>
        {/* Operating expenses — full width */}
        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses — Normalized</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols /><Head first="Expense" />
          <tbody>
            {expenses.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Operating Expense</td><td style={totBg}>$56,009</td><td style={totBg}>$102,266</td><td style={totBg}>$120,751</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$203,218</td><td style={noiBg}>$167,602</td><td style={noiBg}>$245,217</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7, color: 'var(--stone)', marginBottom: 8, lineHeight: 1.4 }}>
          <sup>1</sup> Current EGI derived (stabilized rental + other income). <sup>2</sup> RE taxes and insurance
          were escrowed in the T12 and normalized in the Current/Pro Forma columns (mill rate 39.79; town-wide
          revaluation due 2028). <sup>3</sup> Management not separately booked in the T12. <sup>4</sup> Electric,
          water &amp; sewer, trash and other lines held at recent actuals across all periods — see the BOV / data room
          for the full schedule.
        </div>

        {/* Underwriting notes — full width, two columns */}
        <div className="eyebrow" style={{ marginBottom: 6, fontSize: 9 }}>Underwriting Notes</div>
        <div style={{ columns: 2, columnGap: 26, fontSize: 9.2, lineHeight: 1.5, color: 'var(--graphite)', flex: 1, minHeight: 0 }}>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Value-add commercial center.</strong> Current effective rental income of $267,408 reflects in-place rents with the ground-floor commercial vacancy. Pro forma marks commercial rents to $15&ndash;$22/SF, leases the vacant space, converts Suite 12 to apartments, and implements CAM recovery — lifting effective rental income to $344,242 and EGI to $365,968.</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Commercial lease-up &amp; mark-to-market.</strong> Suite 7 (~1,000 SF) is underwritten at $15/SF, and occupied suites mark from ~$13.38 toward $15&ndash;$22 on 2026 rollover, raising gross scheduled commercial rent from $229,788 to $319,160.</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Residential conversion &amp; CAM recovery.</strong> Suite 12 (~1,600 SF of vacant rear retail) converts to two apartments (~$43,200/yr) — proven, since the two existing units were built from similar space in 2019&ndash;2020 and mark from $1,650 toward $1,800/mo. Pro forma also introduces CAM reimbursement of $19,266 (~$1.00/SF of GBA), recovering costs the landlord currently absorbs.</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Other income, taxes, insurance &amp; R&amp;M.</strong> Current other income includes interim lot-storage income from a tenant parking on the development parcel, which burns off at pro forma when the residential project is built. Taxes ($40,337; mill 39.79) and insurance ($16,975) are carried at full market levels; R&amp;M is normalized to $9,633 ($0.50/SF) and management to 5% of EGI in both columns.</p>
        </div>
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
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Brad-B-2-430x488.jpg" alt="Brad Balletto" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Brad Balletto</div>
            <div className="dc-title">Managing Director, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1574</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>bballetto@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="/photos/team/joe-ferrandino.jpg" alt="Joe Ferrandino" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Joe Ferrandino</div>
            <div className="dc-title">Associate, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (914) 440-0908</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>jferrandino@northeastpcg.com</div>
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
        <div style={{ flex: '0 0 56%', padding: '30px 32px 30px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0 }}>
          <div>
            <div className="section-title" style={{ marginBottom: 4 }}>Naugatuck <span style={{ color: '#F8971D' }}>Overview</span></div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 10 }}>The Naugatuck Valley&rsquo;s &ldquo;Rubber Capital,&rdquo; on Metro-North&rsquo;s Waterbury Branch.</div>
            <div className="title-rule" />
          </div>

          <div style={{ fontSize: 11.8, lineHeight: 1.64, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <p>
              Salem Square sits on New Haven Road (Route 63) in the heart of the Naugatuck Valley, with more than
              100 feet of frontage and direct access to Route 8 &mdash; the limited-access expressway that runs the
              length of the valley, north to Waterbury (~10 min) and Hartford and south toward Bridgeport and the
              shoreline. Naugatuck is a New Haven County community of about 31,800 on the Naugatuck River,
              historically the &ldquo;Rubber Capital&rdquo; and birthplace of Keds and Naugahyde, with a walkable
              downtown on the Naugatuck Green and a working manufacturing base anchored by the Naugatuck Industrial
              Park &mdash; long the home of The Eastern Company (Nasdaq: EML), now headquartered in Shelton.
            </p>
            <p>
              Unlike many valley towns, Naugatuck sits directly on Metro-North&rsquo;s Waterbury Branch. The State is
              mid-construction on a new $33.2 million station &mdash; relocated closer to downtown and scheduled to
              open in summer 2027 &mdash; positioned as an anchor for transit-oriented development. With the borough
              actively encouraging downtown housing, proximity to a brand-new transit hub is a powerful demand driver
              for an entitled 51-unit project.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 9 }}>About Naugatuck</div>
            <ul className="highlights ridge-highlights" style={{ fontSize: 11.6, lineHeight: 1.55 }}>
              <li>Population ~31,800 · ~12,700 households</li>
              <li>Median HH income ~$96,300 — above the New Haven County figure</li>
              <li>Stable, ~68% owner-occupied base</li>
              <li>Directly on Metro-North&rsquo;s Waterbury Branch</li>
              <li>New $33.2M station opening summer 2027 (TOD anchor)</li>
              <li>Route 8 valley spine · Waterbury ~10 min north</li>
              <li>Manufacturing heritage — Naugatuck Industrial Park &amp; The Eastern Company (EML)</li>
            </ul>
          </div>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-1.jpg" alt="Naugatuck" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="Naugatuck" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    { label: 'Naugatuck', items: 'Borough of Naugatuck & Naugatuck Public Schools, the manufacturers of the Naugatuck Industrial Park, and The Eastern Company (Nasdaq: EML) — a longtime Naugatuck manufacturer now headquartered in Shelton.' },
    { label: 'Greater Waterbury (~10 min north)', items: "Waterbury Hospital, Saint Mary’s Hospital (Trinity Health), Webster Bank, Post University, UConn Waterbury, and the City of Waterbury." },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 57%', padding: '26px 30px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>New Haven County <span style={{ color: '#F8971D' }}>Overview &amp; Employment</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 11 }}>
            <p>New Haven County is south-central Connecticut&rsquo;s anchor — the state&rsquo;s second-most-populous county (~864,000), led by New Haven and Waterbury, with the Naugatuck Valley (Naugatuck, Waterbury, the Route 8 corridor) forming its industrial spine. Naugatuck&rsquo;s affordability relative to income, direct highway and rail access, and limited new multifamily supply support steady rental demand — the backdrop for the entitled 51-unit development.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 5 }}>Demographics — Naugatuck vs. County</div>
          <table className="data-table" style={{ fontSize: 10, marginBottom: 13 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Naugatuck</th>
                <th style={{ textAlign: 'right' }}>New Haven County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population (2024 est.)</td><td style={{ textAlign: 'right' }}>31,800</td><td style={{ textAlign: 'right' }}>~864,000</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~12,700</td><td style={{ textAlign: 'right' }}>~336,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$96,300</td><td style={{ textAlign: 'right' }}>~$82,000</td></tr>
              <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$107,800</td><td style={{ textAlign: 'right' }}>~$108,000</td></tr>
              <tr><td>Homeownership</td><td style={{ textAlign: 'right' }}>~68%</td><td style={{ textAlign: 'right' }}>~62%</td></tr>
            </tbody>
          </table>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Employment — Major Area Employers</div>
          <div style={{ fontSize: 9.2, lineHeight: 1.48, color: 'var(--graphite)', marginBottom: 8 }}>
            Naugatuck retains a working manufacturing and industrial base and draws on the Greater Waterbury employment, healthcare, and higher-education market about ten minutes north on Route 8, plus the broader New Haven and Hartford job markets.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 2 }}>{g.label}</div>
                <div style={{ fontSize: 9, lineHeight: 1.45, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 43%', position: 'relative' }}><img src="/photos/aerial-1.jpg" alt="New Haven County" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  // Two text boxes (3 highlights each) placed diagonally, with two photos on the
  // opposite diagonal → a 2×2 checkerboard: text · photo / photo · text.
  const boxes = [
    {
      title: 'Value-Add & Income Upside',
      items: [
        { head: 'Value-Add Commercial — Lease-Up, Mark-to-Market & CAM', body: 'Lease the vacant suite at ~$15/SF, mark occupied suites from ~$13.38 toward the $15–$22 achieved on renewal, and add CAM recovery — gross commercial rent $229,788 → $319,160, with leases rolling in 2026.' },
        { head: 'Proven Residential Conversion', body: 'The vacant rear suite (~1,600 SF) converts to two apartments underwriting to ~$43,200/yr — proven, since the two existing apartments were created from similar space and lease at $1,650 toward $1,800/mo.' },
        { head: 'Mixed-Use Income — Retail Plus Residential', body: 'Ten commercial suites and two apartments spread the rent roll across complementary demand on 2.69 acres, blending service-retail cash flow with residential stability.' },
      ],
    },
    {
      title: 'Development, Tenancy & Location',
      items: [
        { head: 'Entitled 51-Unit Development Parcel', body: '~1.69 acres is entitled for a 51-unit multifamily building, with site plans approved by the Naugatuck Zoning Commission in September 2025. Permits are the next step — a de-risked second phase, not a speculative rezoning.' },
        { head: 'Long-Tenured, Service-Oriented Tenancy', body: 'Restaurants, a package store, a nail salon, and personal-service operators — several in place fifteen-plus years — diversify the rent roll and hold up well against online competition.' },
        { head: 'Strategic Location — Route 8 & 2027 Transit', body: 'On New Haven Road (Route 63) with direct Route 8 access and Waterbury ~10 min north. A new $33.2M Metro-North station on the Waterbury Branch opens summer 2027 — a direct demand driver for the entitled units.' },
      ],
    },
  ]
  const photos = ['/photos/comm-1.jpg', '/photos/parcel-1.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        {/* 2×2 checkerboard — text box · photo (top), photo · text box (bottom).
            Each text box holds the highlights; cells stretch to fill the page. */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0, paddingTop: 6 }}>
          {(() => {
            const TextBox = (g, key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '2px 6px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 9, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>{g.title}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'space-between', minHeight: 0 }}>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
                      <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', marginBottom: 2, lineHeight: 1.18 }}>{it.head}</div>
                      <p style={{ fontSize: 8.4, lineHeight: 1.4, color: 'var(--graphite)' }}>{it.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
            const PhotoBox = (src, key) => (
              <div key={key} style={{ borderRadius: 8, overflow: 'hidden', minHeight: 0, background: 'var(--linen)', border: '1px solid var(--border)' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )
            return [TextBox(boxes[0], 'tl'), PhotoBox(photos[0], 'tr'), PhotoBox(photos[1], 'bl'), TextBox(boxes[1], 'br')]
          })()}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PROPOSED DEVELOPMENT ═══════════════════ */
function ProposedDevelopment({ pageNum }) {
  const stats = [
    { v: '51', k: 'Entitled Units' },
    { v: '4', k: 'Stories' },
    { v: '±1.69', k: 'Acres · Excess Land' },
    { v: 'Sept 2025', k: 'Site Plan Approved' },
    { v: 'Summer 2027', k: 'New Metro-North Station' },
  ]
  return (
    <div className="page">
      <PageHeader section="Proposed Development" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Proposed 51-Unit <span style={{ color: '#F8971D' }}>Development</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--graphite)', marginBottom: 12 }}>
          On about <strong>1.69 acres of excess land</strong> behind the existing center, Salem Square is entitled for a
          <strong> 51-unit multifamily building</strong>, with site plans approved by the Naugatuck Zoning Commission in
          September 2025. Building permits are the remaining step &mdash; a de-risked, shovel-ready second phase rather
          than a speculative rezoning, positioned for Naugatuck&rsquo;s push toward transit-oriented housing around the
          new $33.2M Metro-North station opening summer 2027.
        </div>

        {/* Full-bleed conceptual rendering */}
        <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--linen)' }}>
          <img src="/photos/rendering.png" alt="Conceptual rendering of the proposed 51-unit multifamily building at Salem Square" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(43,48,56,0.85)', color: '#fff', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 3 }}>Conceptual Rendering</div>
        </div>

        {/* Development stat strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 12 }}>
          {stats.map(s => (
            <div key={s.k} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 5 }}>{s.k}</div>
            </div>
          ))}
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
    <Divider eyebrow="01" title="The Property" image="/photos/ext-1.jpg" />,
    <BuildingDescriptions />,
    <SiteMap />,
    <ProposedDevelopment />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ext-2.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/aerial-1.jpg" />,
    <CityOverview />,
    <LocationMap />,
    <DriveTimeMap />,
    <CountyOverview />,
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
