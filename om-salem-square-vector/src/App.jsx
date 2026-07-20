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
        {/* Bottom shade — darkens lower portion so the title block pops */}
        <div className="cover-hero-shade" />
        {/* NPCG logo — top right */}
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {/* Title block — bottom left */}
        <div className="cover-hero-overlay" style={{ left: 48, right: 'auto', textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 58, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.02, marginBottom: 6 }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 22, fontWeight: 600 }}>{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityState}</div>
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
  // Right-rail fact box: headline price → asking-price allocation → key stats.
  const alloc = [
    { c: 'Operating Plaza — Existing Income', v: '$2,525,000', p: '66.4%' },
    { c: 'Entitled Land — 51 × $25,000 / Unit', v: '$1,275,000', p: '33.6%' },
  ]
  const stats = [
    { v: '±19,266', k: 'Building SF' },
    { v: '51', k: 'Entitled Units' },
    { v: '2.69', k: 'Acres (±1.69 Entitled)', full: true },
  ]
  const allocRow = (c, v, p, total) => (
    <div key={c} style={{
      display: 'flex', alignItems: 'baseline',
      padding: total ? '8px 0 0' : '5px 0',
      borderBottom: total ? 'none' : '1px solid var(--linen)',
      borderTop: total ? '2px solid var(--carbon)' : 'none',
      marginTop: total ? 3 : 0,
    }}>
      <span style={{ flex: 1, fontSize: total ? 9.5 : 9, fontWeight: total ? 800 : 600, color: 'var(--carbon)' }}>{c}</span>
      <span style={{ fontSize: total ? 10 : 9.5, fontWeight: total ? 800 : 700, color: 'var(--carbon)', whiteSpace: 'nowrap', marginLeft: 8 }}>{v}</span>
      <span style={{ width: 44, textAlign: 'right', fontSize: 9, fontWeight: total ? 800 : 700, color: 'var(--golden)' }}>{p}</span>
    </div>
  )

  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.32fr 1fr', gap: 30, flex: 1, minHeight: 0 }}>
          {/* LEFT — offering summary + narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ textAlign: 'center', padding: '8px 4px 11px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$3,800,000</div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 5 }}>Offering Price</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12, marginBottom: 14 }}>
              {stats.map(s => (
                <div key={s.k} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)', gridColumn: s.full ? '1 / -1' : undefined }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{s.k}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 9.4, lineHeight: 1.5, margin: '0 0 9px' }}>
              Northeast Private Client Group is pleased to present <strong>Salem Square</strong>, a value-add
              commercial mixed-use opportunity at {ADDR} in Naugatuck, Connecticut. The 2.69-acre parcel includes an
              approved 51-unit multifamily development site, so a buyer acquires an income-producing center and a
              shovel-ready residential project together.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.5, margin: '0 0 9px' }}>
              Built in 1960, the two-story building holds about 19,266 square feet, 18,770 of it rentable, with ten
              ground-floor commercial suites and two rear apartments. The property fronts New Haven Road, which is
              Route 63, with direct access to Route 8. The center sits in the heart of the Naugatuck Valley, with
              Waterbury and its Metro-North Waterbury Branch terminus about ten minutes north, where the state is
              building a new $33.2 million station scheduled to open in summer 2027. The commercial tenants are
              convenience and service businesses, several of them in place for fifteen years or more, including Great
              China, Rose Spa &amp; Nails, Salem Wine &amp; Spirits, and Mexican Deli.
            </p>
            <p style={{ fontSize: 9.4, lineHeight: 1.5, margin: 0 }}>
              The opportunity is a commercial center with several clear paths to grow income, paired with a residential
              development site that adds a second phase. Inside the existing center, a buyer leases up the vacant
              ground-floor commercial space, marks the occupied suites from about $13.38 per square foot toward the $15
              to $22 the building achieves on renewal, implements CAM recovery, and converts the vacant rear commercial
              suite into two apartments — proven rather than theoretical, since the two existing apartments were created
              from similar space. On the same parcel, about 1.69 acres is entitled for a 51-unit multifamily building,
              with updated site plans approved by the Naugatuck Zoning Commission in September 2025.
            </p>
          </div>

          {/* RIGHT — photos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 3, overflow: 'hidden' }}>
              <img src="/photos/ext-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 3, overflow: 'hidden' }}>
              <img src="/photos/aerial-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 80%', display: 'block' }} />
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
              <h3 style={{ fontSize: 12.5, marginBottom: 6, paddingBottom: 4 }}>Site Summary</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Address</span><span className="bldg-val">{FULL_ADDR}</span></div>
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use Retail + Development Site</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Units</span><span className="bldg-val">12 (10 commercial · 2 residential)</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">18,770 rentable (19,266 gross)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">2.69 Acres (±1.00 improved + ±1.69 entitled)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1960</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">R8</span></div>
                <div className="bldg-row"><span className="bldg-label">Traffic Count</span><span className="bldg-val">16,200 VPD (New Haven Rd / Rte 63)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parcel ID</span><span className="bldg-val">048-3303 (MBL N-5E211 · VisionPID 7366)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 12.5, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Commercial: natural gas · Apartments: all-electric</span></div>
                <div className="bldg-row"><span className="bldg-label">Heating / Cooling</span><span className="bldg-val">Commercial: rooftop package units (heat &amp; cool)</span></div>
                <div className="bldg-row"><span className="bldg-label">Utilities Paid</span><span className="bldg-val">Tenants pay all utilities (individually metered)</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 12.5, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Foundation</span><span className="bldg-val">Concrete; full basement (±8,814 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Frame / Stories</span><span className="bldg-val">Wood frame · two stories</span></div>
                <div className="bldg-row"><span className="bldg-label">Exterior</span><span className="bldg-val">Brick veneer / cedar / redwood</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Flat · tar and gravel</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">±26,000 SF paved asphalt</span></div>
                <div className="bldg-row"><span className="bldg-label">A/C</span><span className="bldg-val">Rooftop package units (commercial); electric (apartments)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 12.5, marginBottom: 6, paddingBottom: 4 }}>Entitled Development</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Development Rights</span><span className="bldg-val">51-unit multifamily building</span></div>
                <div className="bldg-row"><span className="bldg-label">Approval</span><span className="bldg-val">Site plans approved Sept 2025</span></div>
                <div className="bldg-row"><span className="bldg-label">Excess Land</span><span className="bldg-val">±1.69 acres on the same lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Status</span><span className="bldg-val">Building permits the remaining step</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 12.5, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Asking Price</span><span className="bldg-val">$3,800,000</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Cap (Plaza)</span><span className="bldg-val">6.7%</span></div>
                <div className="bldg-row"><span className="bldg-label">Stabilized Cap (Plaza)</span><span className="bldg-val">9.8%</span></div>
                <div className="bldg-row"><span className="bldg-label">Entitled Land Value</span><span className="bldg-val">$1,275,000 (51 × $25K)</span></div>
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
/* Full per-unit / per-suite rent roll for the existing center, as of
   04.30.2026 (Blue Brook Properties). 12 occupied/vacant units across 18,770
   rentable SF. Annual rent and $/SF calculated from monthly. */
function RentRoll({ pageNum }) {
  const th = { fontSize: 7.8, padding: '3.5px 7px', color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700 }
  const td = { fontSize: 9, padding: '2.5px 7px', color: 'var(--carbon)' }
  const grp = { fontSize: 7.8, padding: '2.5px 7px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--golden)', background: 'var(--linen)' }
  const sub = { fontSize: 9, padding: '3px 7px', fontWeight: 700, color: 'var(--carbon)', background: '#efeae3', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }
  const tot = { fontSize: 9.5, padding: '3.5px 7px', fontWeight: 800, color: '#fff', background: 'var(--carbon)' }
  const R = '—'

  // [unit, tenant, sf, mo, yr, psf]
  const residential = [
    ['Apt 10A', '2 Bed / 1 Bath', '800', '$1,650', '$19,800', '$24.75'],
    ['Apt 10B', '2 Bed / 1 Bath', '800', '$1,650', '$19,800', '$24.75'],
  ]
  const commercial = [
    ['Suite 01', 'Great China', '1,530', '$2,770', '$33,240', '$21.73'],
    ['Suite 02', 'Mexican Deli', '1,500', '$2,300', '$27,600', '$18.40'],
    ['Suite 03', 'Rose Spa & Nails', '1,500', '$2,450', '$29,400', '$19.60'],
    ['Suite 04', 'Smoke Vibe (Naugatuck)', '1,500', '$1,654', '$19,848', '$13.23'],
    ['Suite 05 & 06', 'Video Temptations', '3,340', '$4,797', '$57,564', '$17.23'],
    ['Suite 07', 'Vacant', '1,000', R, R, R],
    ['Suite 08', 'Roberto Valentin', '1,000', '$1,100', '$13,200', '$13.20'],
    ['Suite 09', 'Salem Wine & Spirits', '2,100', '$2,378', '$28,536', '$13.59'],
    ['Suite 12', 'Vacant — convert to 2 apts', '1,600', R, R, R],
    ['Suite 13', 'Valley Social Club', '2,100', '$1,700', '$20,400', '$9.71'],
  ]
  const other = [
    ['Lot Storage', "Garci's Landscaping LLC", R, '$1,000', '$12,000', R],
  ]

  // Unit-mix rollup (excludes lot-storage license). [type, units, sf, %sf, rent/yr, $/sf]
  const unitMix = [
    ['Residential — 2 BR / 1 BA', '2', '1,600', '8.5%', '$39,600', '$24.75'],
    ['Commercial — Retail / Service', '10', '17,170', '91.5%', '$229,788', '$13.38'],
  ]
  const mixAlign = [null, 'right', 'right', 'right', 'right', 'right']
  const MixRow = (r, i) => (
    <tr key={r[0]} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
      {r.map((c, j) => (
        <td key={j} style={{ ...td, textAlign: mixAlign[j] || 'left', fontWeight: j === 0 ? 700 : 400 }}>{c}</td>
      ))}
    </tr>
  )

  const align = [null, null, 'right', 'right', 'right', 'right']
  const Row = (r, i) => (
    <tr key={r[0]} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
      {r.map((c, j) => (
        <td key={j} style={{ ...td, textAlign: align[j] || 'left', fontWeight: j === 0 ? 700 : 400, color: c === 'Vacant' ? 'var(--terracotta)' : td.color }}>{c}</td>
      ))}
    </tr>
  )
  const SubRow = (label, cells) => (
    <tr>
      <td style={{ ...sub, textAlign: 'left' }} colSpan={2}>{label}</td>
      {cells.map((c, j) => (<td key={j} style={{ ...sub, textAlign: align[j + 2] || 'right' }}>{c}</td>))}
    </tr>
  )

  return (
    <div className="page">
      <PageHeader section="In-Place Rent Roll & Unit Mix" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>In-Place Rent Roll <span style={{ color: '#F8971D' }}>&amp; Unit Mix</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 8.8, color: 'var(--stone)', margin: '4px 0 8px', letterSpacing: '0.04em' }}>
          Salem Square &mdash; rent roll as of 04.30.2026 &middot; 12 units &middot; 18,770 rentable SF
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 8.5 }}>Unit Mix</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginBottom: 10 }}>
          <colgroup>
            <col style={{ width: '34%' }} /><col style={{ width: '10%' }} /><col style={{ width: '14%' }} />
            <col style={{ width: '12%' }} /><col style={{ width: '20%' }} /><col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...th, textAlign: 'left' }}>Unit Type</th>
              <th style={{ ...th, textAlign: 'right' }}>Units</th>
              <th style={{ ...th, textAlign: 'right' }}>SF</th>
              <th style={{ ...th, textAlign: 'right' }}>% SF</th>
              <th style={{ ...th, textAlign: 'right' }}>In-Place Rent / Yr</th>
              <th style={{ ...th, textAlign: 'right' }}>Avg $/SF</th>
            </tr>
          </thead>
          <tbody>
            {unitMix.map(MixRow)}
            <tr>
              <td style={{ ...tot, textAlign: 'left' }}>Total / Avg</td>
              <td style={{ ...tot, textAlign: 'right' }}>12</td>
              <td style={{ ...tot, textAlign: 'right' }}>18,770</td>
              <td style={{ ...tot, textAlign: 'right' }}>100%</td>
              <td style={{ ...tot, textAlign: 'right' }}>$269,388</td>
              <td style={{ ...tot, textAlign: 'right' }}>$14.35</td>
            </tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 8.5 }}>Rent Roll Detail</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '14%' }} /><col style={{ width: '34%' }} /><col style={{ width: '12%' }} />
            <col style={{ width: '14%' }} /><col style={{ width: '16%' }} /><col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...th, textAlign: 'left' }}>Unit</th>
              <th style={{ ...th, textAlign: 'left' }}>Tenant</th>
              <th style={{ ...th, textAlign: 'right' }}>SF</th>
              <th style={{ ...th, textAlign: 'right' }}>Rent / Mo</th>
              <th style={{ ...th, textAlign: 'right' }}>Rent / Yr</th>
              <th style={{ ...th, textAlign: 'right' }}>$/SF</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={grp} colSpan={6}>Residential</td></tr>
            {residential.map(Row)}
            {SubRow('Residential Subtotal', ['1,600', '$3,300', '$39,600', '$24.75'])}
            <tr><td style={grp} colSpan={6}>Commercial</td></tr>
            {commercial.map(Row)}
            {SubRow('Commercial Subtotal', ['17,170', '$19,149', '$229,788', '$13.38'])}
            <tr><td style={grp} colSpan={6}>Other</td></tr>
            {other.map(Row)}
            <tr>
              <td style={{ ...tot, textAlign: 'left' }} colSpan={2}>Property Total</td>
              <td style={{ ...tot, textAlign: 'right' }}>18,770</td>
              <td style={{ ...tot, textAlign: 'right' }}>$23,449</td>
              <td style={{ ...tot, textAlign: 'right' }}>$281,388</td>
              <td style={{ ...tot, textAlign: 'right' }}>$14.99</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ SALEM SQUARE PLAZA ANALYSIS ═══════════════════ */
/* Existing center, standalone — Current (Year 1) vs Stabilized Pro Forma
   operating statement, with the plaza-only investment metrics (allocated basis
   $2,525,000, 70% LTV on that basis). Figures per the I&E pro forma 06.25.2026
   (Blue Brook T12; Naugatuck mill rate 37.79). The pro forma reflects commercial
   lease-up, mark-to-market, CAM recovery, and the Suite 12 residential conversion. */
function SalemSquarePlazaAnalysis({ pageNum }) {
  const tdl = { fontSize: 10, padding: '4px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tdr = { fontSize: 10, padding: '4px 8px', textAlign: 'right' }
  // Income & Expense statement (left side)
  const sTdl = { fontSize: 10, padding: '3.5px 9px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const sTdr = { fontSize: 10, padding: '3.5px 9px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 9px', textAlign: 'left', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const thr = { fontSize: 8, padding: '4px 9px', textAlign: 'right', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 10, padding: '3.5px 9px' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 10.5, padding: '4.5px 9px' }
  const eyebrow = { marginBottom: 4, fontSize: 8.5 }
  const subStyle = { background: '#efeae3', fontWeight: 700, fontSize: 10, padding: '3.5px 9px', color: 'var(--carbon)' }

  const strip = [
    { v: '$169,629', k: 'Current NOI' },
    { v: '$247,244', k: 'Pro Forma NOI' },
  ]
  // [label, current, proforma, kind] kind: row | sub | tot | noi
  const income = [
    ['Effective Rental Income — Commercial', '$229,788', '$303,202', 'row'],
    ['Effective Rental Income — Residential', '$37,620', '$41,040', 'row'],
    ['Effective Rental Income — Total', '$267,408', '$344,242', 'sub'],
    ['CAM Reimbursement', '—', '$19,266', 'row'],
    ['Additional Income', '$16,860', '$2,460', 'row'],
    ['Effective Gross Income', '$284,268', '$365,968', 'tot'],
  ]
  const expenses = [
    ['Property Management', '$14,213', '$18,298', 'row'],
    ['Real Estate Tax', '$38,309', '$38,309', 'row'],
    ['Property Insurance', '$16,975', '$16,975', 'row'],
    ['Electric', '$2,228', '$2,228', 'row'],
    ['Water & Sewer', '$6,979', '$6,979', 'row'],
    ['Trash Removal', '$10,856', '$10,856', 'row'],
    ['Repairs & Maintenance', '$9,633', '$9,633', 'row'],
    ['Landscaping / Snow Removal', '$15,445', '$15,445', 'row'],
    ['Total Operating Expense', '$114,639', '$118,724', 'tot'],
    ['Net Operating Income', '$169,629', '$247,244', 'noi'],
  ]
  const StmtRow = ([label, cur, pf, kind], i) => {
    if (kind === 'tot') return (
      <tr key={label}><td style={{ ...totBg, textAlign: 'left' }}>{label}</td><td style={{ ...totBg, textAlign: 'right' }}>{cur}</td><td style={{ ...totBg, textAlign: 'right' }}>{pf}</td></tr>
    )
    if (kind === 'noi') return (
      <tr key={label}><td style={{ ...noiBg, textAlign: 'left' }}>{label}</td><td style={{ ...noiBg, textAlign: 'right' }}>{cur}</td><td style={{ ...noiBg, textAlign: 'right' }}>{pf}</td></tr>
    )
    if (kind === 'sub') return (
      <tr key={label}><td style={{ ...subStyle, textAlign: 'left' }}>{label}</td><td style={{ ...subStyle, textAlign: 'right' }}>{cur}</td><td style={{ ...subStyle, textAlign: 'right' }}>{pf}</td></tr>
    )
    return (
      <tr key={label} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
        <td style={sTdl}>{label}</td><td style={sTdr}>{cur}</td><td style={sTdr}>{pf}</td>
      </tr>
    )
  }
  const MetricTable = ({ title, rows }) => (
    <div>
      <div className="eyebrow" style={eyebrow}>{title}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup><col style={{ width: '60%' }} /><col style={{ width: '40%' }} /></colgroup>
        <tbody>
          {rows.map(([l, v], i) => (
            <tr key={l} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
              <td style={tdl}>{l}</td><td style={tdr}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="page">
      <PageHeader section="In-Place Analysis" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 20 }}>In-Place <span style={{ color: '#F8971D' }}>Analysis</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 8.8, color: 'var(--stone)', margin: '4px 0 8px', letterSpacing: '0.04em' }}>
          Existing center, standalone &mdash; Current (Year 1) vs Stabilized Pro Forma &middot; allocated basis $2,525,000
        </div>

        {/* NOI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, paddingBottom: 7, marginBottom: 10, borderBottom: '1px solid var(--border)' }}>
          {strip.map(n => (
            <div key={n.k} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.v}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 26, flex: 1, minHeight: 0 }}>
          {/* LEFT — operating statement */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={eyebrow}>Operating Income</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '52%' }} /><col style={{ width: '24%' }} /><col style={{ width: '24%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Income</th><th style={thr}>Current</th><th style={thr}>Pro Forma</th></tr></thead>
              <tbody>{income.map(StmtRow)}</tbody>
            </table>
            <div className="eyebrow" style={eyebrow}>Operating Expenses</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '52%' }} /><col style={{ width: '24%' }} /><col style={{ width: '24%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Expense</th><th style={thr}>Current</th><th style={thr}>Pro Forma</th></tr></thead>
              <tbody>{expenses.map(StmtRow)}</tbody>
            </table>
          </div>

          {/* RIGHT — investment metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <MetricTable title="Valuation & Pricing" rows={[
              ['Purchase Price (Allocated)', '$2,525,000'],
              ['Price / SF', '$134.52'],
              ['Cap Rate — Current', '6.72%'],
              ['Cap Rate — Pro Forma', '9.79%'],
            ]} />
            <MetricTable title="Debt Assumptions" rows={[
              ['LTV', '70%'],
              ['Interest Rate', '6.5%'],
              ['Amortization', '25 yrs'],
              ['Loan Amount', '$1,767,500'],
              ['Down Payment', '$757,500'],
              ['Annual Debt Service', '$143,211'],
              ['DSCR (Pro Forma)', '1.18×'],
            ]} />
            <MetricTable title="Cash Flow & Return" rows={[
              ['Capital Budget', '$250,000'],
              ['Total Cash In', '$1,007,500'],
              ['Cash Flow After Debt — Current', '$26,418'],
              ['Cash Flow After Debt — Pro Forma', '$104,033'],
              ['Cash-on-Cash — Current', '2.62%'],
              ['Cash-on-Cash — Pro Forma', '10.33%'],
            ]} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PRICING & ALLOCATION + DEVELOPMENT PRO FORMA ═══════════════════ */
/* One page combining (a) how the $3,800,000 asking price is allocated across the
   single fee-simple parcel — income-producing plaza vs entitled land — with an
   independent value check, and (b) the entitled 51-unit development pro forma and
   the combined fully-built economics. Per the I&E pro forma 06.25.2026: plaza
   stabilized NOI $247,244 @ 7.5% = $3,296,593; land 51 × $25,000 = $1,275,000;
   indicated $4,571,593 vs $3,800,000 ask (16.9% discount). Development EGI
   $1,197,299, NOI $683,734 on $9,275,000 cost (7.4% yield), $11.4M @ 6% cap.
   Combined fully built: $930,979 NOI · $14,692,171 value · $12,050,000 cost. */
function PricingDevelopment({ pageNum }) {
  const tdl = { fontSize: 10, padding: '5px 9px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tdr = { fontSize: 10, padding: '5px 9px', textAlign: 'right' }
  const thl = { fontSize: 8.5, padding: '5px 9px', textAlign: 'left', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const thr = { fontSize: 8.5, padding: '5px 9px', textAlign: 'right', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 10, padding: '5px 9px' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 10, padding: '5px 9px' }
  const eyebrow = { marginBottom: 5, fontSize: 9 }
  // Taller cells for the left column — fewer rows than the right, so they get
  // extra vertical padding to fill the column height and kill the white space.
  const LP = '9.5px 9px'
  const ltdl = { ...tdl, padding: LP }
  const ltdr = { ...tdr, padding: LP }
  const lthl = { ...thl, padding: '7px 9px' }
  const lthr = { ...thr, padding: '7px 9px' }
  const ltot = { ...totBg, padding: LP }
  const lnoi = { ...noiBg, padding: LP }

  const combined = [
    { v: '$930,979', k: 'Combined Stabilized NOI' },
    { v: '$14.69M', k: 'Combined Stabilized Value' },
    { v: '$12.05M', k: 'Total Cost Basis' },
    { v: '1.36×', k: 'DSCR · 70% LTV' },
    { v: '6.85%', k: 'Stabilized Cash-on-Cash' },
  ]

  return (
    <div className="page">
      <PageHeader section="The Combined Property" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 19 }}>If Built — The <span style={{ color: '#F8971D' }}>Combined Property</span></div>
        <div className="title-rule" />

        <div style={{ fontSize: 8.8, lineHeight: 1.45, color: 'var(--graphite)', margin: '8px 0 10px' }}>
          Build out the entitled 51-unit development and Salem Square becomes a single <strong>combined property</strong>
          &mdash; the income-producing plaza plus a stabilized multifamily building on the same lot. The figures below
          show what that fully-built, stabilized asset looks like: a combined <strong>$930,979 NOI</strong> and
          <strong> $14.69M value</strong> against a $12.05M all-in basis &mdash; more than quadrupling the plaza&rsquo;s
          standalone income.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
          {/* LEFT — Pricing & Allocation */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={eyebrow}>Asking Price Allocation</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14, tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '54%' }} /><col style={{ width: '28%' }} /><col style={{ width: '18%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={lthl}>Component</th><th style={lthr}>Allocated</th><th style={lthr}>% Ask</th></tr></thead>
              <tbody>
                <tr><td style={ltdl}>Existing Income — Operating Plaza</td><td style={ltdr}>$2,525,000</td><td style={ltdr}>66%</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={ltdl}>Entitled Land — 51 × $25,000 / Unit</td><td style={ltdr}>$1,275,000</td><td style={ltdr}>34%</td></tr>
                <tr><td style={{ ...ltot, textAlign: 'left' }}>Total Asking Price</td><td style={{ ...ltot, textAlign: 'right' }}>$3,800,000</td><td style={{ ...ltot, textAlign: 'right' }}>100%</td></tr>
              </tbody>
            </table>

            <div className="eyebrow" style={eyebrow}>Independent Value Check</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8, tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '40%' }} /><col style={{ width: '20%' }} /><col style={{ width: '15%' }} /><col style={{ width: '25%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={lthl}>Component</th><th style={lthr}>Stab. NOI</th><th style={lthr}>Cap</th><th style={lthr}>Value</th></tr></thead>
              <tbody>
                <tr><td style={ltdl}>Existing Plaza (Stabilized)</td><td style={ltdr}>$247,244</td><td style={ltdr}>7.5%</td><td style={ltdr}>$3,296,593</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={ltdl}>Entitled Land (51 × $25,000)</td><td style={ltdr}>—</td><td style={ltdr}>—</td><td style={ltdr}>$1,275,000</td></tr>
                <tr><td style={{ ...ltot, textAlign: 'left' }}>Indicated Total Value</td><td style={ltot}></td><td style={ltot}></td><td style={{ ...ltot, textAlign: 'right' }}>$4,571,593</td></tr>
                <tr><td style={ltdl}>Asking Price</td><td style={ltdr}></td><td style={ltdr}></td><td style={ltdr}>$3,800,000</td></tr>
                <tr><td style={{ ...lnoi, textAlign: 'left' }}>Discount to Indicated</td><td style={lnoi}></td><td style={{ ...lnoi, textAlign: 'right' }}>−16.9%</td><td style={{ ...lnoi, textAlign: 'right' }}>−$771,593</td></tr>
              </tbody>
            </table>
            <div style={{ fontSize: 7.3, color: 'var(--stone)', lineHeight: 1.38, marginTop: 'auto' }}>
              Plaza capitalized at a 7.5% market cap for stabilized Naugatuck Valley mixed-use; land held at the same
              $25,000/unit basis. The plaza&rsquo;s $2,525,000 allocated basis implies a <strong>9.8% cap on stabilized
              income</strong> — well inside the 7.5% market cap.
            </div>
          </div>

          {/* RIGHT — Fully built & stabilized economics */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={eyebrow}>Fully Built &amp; Stabilized</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14, tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '36%' }} /><col style={{ width: '21%' }} /><col style={{ width: '21%' }} /><col style={{ width: '22%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Component</th><th style={thr}>Plaza</th><th style={thr}>Dev.</th><th style={thr}>Combined</th></tr></thead>
              <tbody>
                <tr><td style={tdl}>Stabilized NOI</td><td style={tdr}>$247,244</td><td style={tdr}>$683,735</td><td style={tdr}>$930,979</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Valuation Cap</td><td style={tdr}>7.5%</td><td style={tdr}>6.0%</td><td style={tdr}>6.3%</td></tr>
                <tr><td style={tdl}>Stabilized Value</td><td style={tdr}>$3.30M</td><td style={tdr}>$11.40M</td><td style={tdr}>$14.69M</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Total Cost</td><td style={tdr}>$2.78M</td><td style={tdr}>$9.28M</td><td style={tdr}>$12.05M</td></tr>
                <tr><td style={tdl}>Unlevered Yield on Cost</td><td style={tdr}>8.9%</td><td style={tdr}>7.4%</td><td style={tdr}>7.7%</td></tr>
                <tr><td style={{ ...totBg, textAlign: 'left' }}>Value Created Over Cost</td><td style={{ ...totBg, textAlign: 'right' }}>$0.52M</td><td style={{ ...totBg, textAlign: 'right' }}>$2.12M</td><td style={{ ...totBg, textAlign: 'right' }}>$2.64M</td></tr>
              </tbody>
            </table>

            <div className="eyebrow" style={eyebrow}>Levered Return — Combined · 70% LTV</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '62%' }} /><col style={{ width: '38%' }} /></colgroup>
              <tbody>
                <tr><td style={tdl}>Loan (70% of Total Cost)</td><td style={tdr}>$8,435,000</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Equity</td><td style={tdr}>$3,615,000</td></tr>
                <tr><td style={tdl}>Annual Debt Service (6.5%, 25 yr)</td><td style={tdr}>($683,445)</td></tr>
                <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Stabilized Cash Flow After Debt</td><td style={tdr}>$247,534</td></tr>
                <tr><td style={{ ...noiBg, textAlign: 'left' }}>Cash-on-Cash Return</td><td style={{ ...noiBg, textAlign: 'right' }}>6.85%</td></tr>
                <tr><td style={{ ...totBg, textAlign: 'left' }}>DSCR</td><td style={{ ...totBg, textAlign: 'right' }}>1.36&times;</td></tr>
              </tbody>
            </table>
            <div style={{ fontSize: 7.3, color: 'var(--stone)', lineHeight: 1.38, marginTop: 'auto' }}>
              Total cost basis $12,050,000 = $3,800,000 acquisition + $8,000,000 construction + $250,000 plaza capital;
              the $1,275,000 land sits inside acquisition and is not double-counted. Stabilized line-item detail by
              component appears on the Combined Operating Statement.
            </div>
          </div>
        </div>

        {/* Combined fully-built stat strip — below the tables */}
        <div style={{ marginTop: 12 }}>
          <div className="eyebrow" style={{ ...eyebrow, marginBottom: 6 }}>Combined — Plaza + Development, Fully Built &amp; Stabilized</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {combined.map(s => (
              <div key={s.k} style={{ textAlign: 'center', padding: '8px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ COMBINED OPERATING STATEMENT ═══════════════════ */
/* Stabilized standalone page — existing plaza + new development, side by side,
   with the combined summary on top. Figures per the I&E pro forma 06.25.2026.
   Total cost $12,050,000 carries the $250,000 plaza capital and $8,000,000
   development hard cost; the $1,275,000 land sits inside acquisition. */
function CombinedOperatingStatement({ pageNum }) {
  const tdl = { fontSize: 8.6, padding: '2.8px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tdr = { fontSize: 8.6, padding: '2.8px 8px', textAlign: 'right' }
  const thl = { fontSize: 7.5, padding: '4px 8px', textAlign: 'left', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const thr = { fontSize: 7.5, padding: '4px 8px', textAlign: 'right', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.8, padding: '3px 8px' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '3.5px 8px' }
  const eyebrow = { marginBottom: 4, fontSize: 8.5 }

  const Detail = ({ title, eyebrowLabel, income, egi, expenses, opexTotal, noi }) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="eyebrow" style={eyebrow}>{eyebrowLabel}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup><col style={{ width: '64%' }} /><col style={{ width: '36%' }} /></colgroup>
        <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>{title}</th><th style={thr}>Amount</th></tr></thead>
        <tbody>
          {income.map(([l, v], i) => (
            <tr key={l} style={i % 2 ? { background: 'var(--linen)' } : undefined}><td style={tdl}>{l}</td><td style={tdr}>{v}</td></tr>
          ))}
          <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={{ ...totBg, textAlign: 'right' }}>{egi}</td></tr>
          {expenses.map(([l, v], i) => (
            <tr key={l} style={i % 2 ? { background: 'var(--linen)' } : undefined}><td style={tdl}>{l}</td><td style={tdr}>{v}</td></tr>
          ))}
          <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Operating Expenses</td><td style={{ ...totBg, textAlign: 'right' }}>{opexTotal}</td></tr>
          <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={{ ...noiBg, textAlign: 'right' }}>{noi}</td></tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="page">
      <PageHeader section="Operating Statement" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 20 }}>Combined Operating <span style={{ color: '#F8971D' }}>Statement</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 8.8, color: 'var(--stone)', margin: '4px 0 8px', letterSpacing: '0.04em' }}>
          Stabilized &mdash; existing plaza + entitled 51-unit development, fully built
        </div>

        {/* Combined summary */}
        <div className="eyebrow" style={eyebrow}>Stabilized Summary</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14, tableLayout: 'fixed' }}>
          <colgroup><col style={{ width: '34%' }} /><col style={{ width: '22%' }} /><col style={{ width: '22%' }} /><col style={{ width: '22%' }} /></colgroup>
          <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Component</th><th style={thr}>Existing Plaza</th><th style={thr}>New Development</th><th style={thr}>Combined</th></tr></thead>
          <tbody>
            <tr><td style={tdl}>Effective Gross Income</td><td style={tdr}>$365,968</td><td style={tdr}>$1,197,299</td><td style={tdr}>$1,563,267</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Total Operating Expenses</td><td style={tdr}>($118,724)</td><td style={tdr}>($513,565)</td><td style={tdr}>($632,288)</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={{ ...noiBg, textAlign: 'right' }}>$247,244</td><td style={{ ...noiBg, textAlign: 'right' }}>$683,735</td><td style={{ ...noiBg, textAlign: 'right' }}>$930,979</td></tr>
            <tr><td style={tdl}>Total Cost</td><td style={tdr}>$2,775,000</td><td style={tdr}>$9,275,000</td><td style={tdr}>$12,050,000</td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Unlevered Yield on Cost</td><td style={{ ...totBg, textAlign: 'right' }}>8.9%</td><td style={{ ...totBg, textAlign: 'right' }}>7.4%</td><td style={{ ...totBg, textAlign: 'right' }}>7.7%</td></tr>
          </tbody>
        </table>

        {/* Side-by-side stabilized detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
          <Detail
            eyebrowLabel="Existing Plaza — Stabilized Detail (Pro Forma)"
            title="Plaza"
            income={[
              ['Effective Rental Income — Total', '$344,242'],
              ['CAM Reimbursement', '$19,266'],
              ['Additional Income', '$2,460'],
            ]}
            egi="$365,968"
            expenses={[
              ['Property Management', '$18,298'],
              ['Real Estate Tax', '$38,309'],
              ['Property Insurance', '$16,975'],
              ['Electric', '$2,228'],
              ['Water & Sewer', '$6,979'],
              ['Trash Removal', '$10,856'],
              ['Repairs & Maintenance', '$9,633'],
              ['Landscaping / Snow Removal', '$15,445'],
            ]}
            opexTotal="$118,724"
            noi="$247,244"
          />
          <Detail
            eyebrowLabel="New Development — Stabilized Detail (Year 1)"
            title="Development"
            income={[
              ['Gross Rental Income', '$1,185,600'],
              ['Total Other Income', '$74,715'],
              ['Vacancy (5%)', '($63,016)'],
            ]}
            egi="$1,197,299"
            expenses={[
              ['Property Taxes', '$269,821'],
              ['Payroll', '$63,750'],
              ['Utilities', '$45,900'],
              ['Management Fee', '$35,919'],
              ['Insurance', '$30,600'],
              ['Repairs & Maintenance', '$20,400'],
              ['Marketing', '$12,750'],
              ['Contract Services', '$12,750'],
              ['General & Administrative', '$11,475'],
              ['Make Ready Cost', '$10,200'],
            ]}
            opexTotal="$513,565"
            noi="$683,735"
          />
        </div>

        <div style={{ fontSize: 7.4, color: 'var(--stone)', marginTop: 8, lineHeight: 1.45 }}>
          Combined total cost $12,050,000 carries the $250,000 plaza capital budget and the $8,000,000 development hard
          cost; the $1,275,000 entitled land sits inside acquisition and is not double-counted. Plaza shown at stabilized
          pro forma; development at Year-1 stabilization (5% vacancy). Naugatuck mill rate 37.79.
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
            <img className="dc-avatar" src="/photos/team/collin-murphy.jpg" alt="Collin Murphy" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Collin Murphy</div>
            <div className="dc-title">Associate, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1580</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>cmurphy@northeastpcg.com</div>
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
            <img src="/photos/naugatuck-1.jpg" alt="Naugatuck" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/naugatuck-2.jpg" alt="Naugatuck" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            <p>New Haven County is south-central Connecticut&rsquo;s anchor — the state&rsquo;s third-most-populous county (~864,000), led by New Haven and Waterbury, with the Naugatuck Valley (Naugatuck, Waterbury, the Route 8 corridor) forming its industrial spine. Naugatuck&rsquo;s affordability relative to income, direct highway and rail access, and limited new multifamily supply support steady rental demand — the backdrop for the entitled 51-unit development.</p>
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
        <div style={{ flex: '0 0 43%', position: 'relative' }}><img src="/photos/new-haven-green.jpg" alt="New Haven County" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
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
                <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 11, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{g.title}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 13, minHeight: 0 }}>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3, lineHeight: 1.22 }}>{it.head}</div>
                      <p style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)' }}>{it.body}</p>
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
  ]
  const tdl = { fontSize: 9, padding: '3.5px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tdr = { fontSize: 9, padding: '3.5px 8px', textAlign: 'right' }
  const thl = { fontSize: 7.5, padding: '4px 8px', textAlign: 'left', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const thr = { fontSize: 7.5, padding: '4px 8px', textAlign: 'right', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '3.5px 8px' }
  const mix = [
    { t: 'Studio', u: 16 },
    { t: 'One Bedroom', u: 27 },
    { t: 'Two Bedroom', u: 8 },
  ]
  return (
    <div className="page">
      <PageHeader section="Proposed Development" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Proposed 51-Unit <span style={{ color: '#F8971D' }}>Development</span></div>
        <div className="title-rule" />

        {/* Development stat strip — top */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {stats.map(s => (
            <div key={s.k} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 5 }}>{s.k}</div>
            </div>
          ))}
        </div>

        {/* Rendering + unit-mix sidebar */}
        <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>
          {/* Full-bleed conceptual rendering */}
          <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--linen)' }}>
            <img src="/photos/rendering.png" alt="Conceptual rendering of the proposed 51-unit multifamily building at Salem Square" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(43,48,56,0.85)', color: '#fff', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 3 }}>Conceptual Rendering</div>
          </div>

          {/* Entitled unit mix + narrative — sidebar */}
          <div style={{ width: 232, flexShrink: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 4, fontSize: 8.5 }}>Entitled 51-Unit — Unit Mix</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '70%' }} /><col style={{ width: '30%' }} /></colgroup>
              <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Type</th><th style={thr}>Units</th></tr></thead>
              <tbody>
                {mix.map((m, i) => (
                  <tr key={m.t} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
                    <td style={tdl}>{m.t}</td><td style={tdr}>{m.u}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...totBg, textAlign: 'left' }}>Total</td>
                  <td style={{ ...totBg, textAlign: 'right' }}>51</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
              <p style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', margin: 0 }}>
                Adjacent to the existing center, about <strong>1.69 acres of excess land</strong> is entitled for a
                four-story, <strong>51-unit multifamily building</strong> &mdash; a mix of studios, one- and
                two-bedrooms. Updated site plans were approved by the Naugatuck Zoning
                Commission in <strong>September 2025</strong>.
              </p>
              <p style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', margin: 0 }}>
                Much of the hard site work is already done &mdash; the building pad has been excavated, the ledge
                cleared, and utilities brought to the site. Building permits are the only remaining step, making this a
                de-risked, shovel-ready second phase rather than a speculative rezoning. It arrives as Naugatuck pushes
                transit-oriented housing, ten minutes south of Waterbury.
              </p>
              <div style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.35 }}>
                  Acquire an income center and a shovel-ready 51-unit second phase on a single fee-simple lot.
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

/* ═══════════════════ EXISTING BUILDING ═══════════════════ */
function ExistingBuilding({ pageNum }) {
  const tdl = { fontSize: 10.5, padding: '5px 10px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tdr = { fontSize: 10.5, padding: '5px 10px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '5px 10px', textAlign: 'left', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const thr = { fontSize: 8, padding: '5px 10px', textAlign: 'right', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 10.5, padding: '5px 10px' }
  const stats = [
    { v: '18,770', k: 'Rentable SF' },
    { v: '12', k: 'In-Place Units' },
    { v: '1960', k: 'Year Built' },
    { v: '10', k: 'Commercial Units' },
    { v: '2', k: 'Residential Units' },
  ]
  // [type, units, sf, %sf, rent/yr, $/sf] — excludes the lot-storage license
  const unitMix = [
    ['Residential — 2 BR / 1 BA', '2', '1,600', '8.5%', '$39,600', '$24.75'],
    ['Commercial — Retail / Service', '10', '17,170', '91.5%', '$229,788', '$13.38'],
  ]
  return (
    <div className="page">
      <PageHeader section="The Property" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Salem Square <span style={{ color: '#F8971D' }}>(Existing Building)</span></div>
        <div className="title-rule" />

        {/* Building stat strip — top */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 12 }}>
          {stats.map(s => (
            <div key={s.k} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 5 }}>{s.k}</div>
            </div>
          ))}
        </div>

        {/* In-place unit mix — full width */}
        <div className="eyebrow" style={{ marginBottom: 5, fontSize: 10 }}>In-Place Unit Mix</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginBottom: 14 }}>
          <colgroup>
            <col style={{ width: '34%' }} /><col style={{ width: '10%' }} /><col style={{ width: '13%' }} />
            <col style={{ width: '12%' }} /><col style={{ width: '21%' }} /><col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={thl}>Unit Type</th>
              <th style={thr}>Units</th>
              <th style={thr}>SF</th>
              <th style={thr}>% SF</th>
              <th style={thr}>In-Place Rent / Yr</th>
              <th style={thr}>Avg $/SF</th>
            </tr>
          </thead>
          <tbody>
            {unitMix.map((r, i) => (
              <tr key={r[0]} style={i % 2 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{r[0]}</td>
                {r.slice(1).map((c, j) => (<td key={j} style={tdr}>{c}</td>))}
              </tr>
            ))}
            <tr>
              <td style={{ ...totBg, textAlign: 'left' }}>Total / Avg</td>
              <td style={{ ...totBg, textAlign: 'right' }}>12</td>
              <td style={{ ...totBg, textAlign: 'right' }}>18,770</td>
              <td style={{ ...totBg, textAlign: 'right' }}>100%</td>
              <td style={{ ...totBg, textAlign: 'right' }}>$269,388</td>
              <td style={{ ...totBg, textAlign: 'right' }}>$14.35</td>
            </tr>
          </tbody>
        </table>

        {/* Property photo + description */}
        <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--linen)', minHeight: 0 }}>
            <img src="/photos/ext-1.jpg" alt="Existing Salem Square property" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          <div style={{ width: 232, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <div className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>The Building</div>
            <div style={{ fontSize: 12, color: 'var(--graphite)', lineHeight: 1.65 }}>
              <p style={{ margin: '0 0 9px' }}>
                Built in 1960 across two stories, Salem Square is <strong>18,770 rentable SF</strong> (19,266 gross) of
                brick-and-cedar mixed-use &mdash; ten ground-floor retail and service suites fronting New Haven Road
                (Route 63), with two rear apartments and ancillary storage.
              </p>
              <p style={{ margin: 0 }}>
                Electric is individually metered (16-meter modular, 2020) and the site carries ±26,000 SF of paved
                parking. The commercial tenancy is convenience- and service-oriented, several tenants in place fifteen
                years or more &mdash; durable in-place income with clear room to mark rents to market.
              </p>
            </div>
          </div>
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
    <ExistingBuilding />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ext-2.jpg" />,
    <PricingDevelopment />,
    <CombinedOperatingStatement />,
    <RentRoll />,
    <SalemSquarePlazaAnalysis />,
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
