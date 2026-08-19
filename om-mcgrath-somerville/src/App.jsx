import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import DriveTimeMap from './DriveTimeMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      {/* photo-hero → mild print lift (not the strong dark-scrim cover lift), so
          the bright sky in the cover photo doesn't blow out. */}
      <div className="cover-hero photo-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Gradient hugs the TOP of the frame so the title block reads against the
            sky; the lower portion stays bright and clear. */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '58%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, top: 28, bottom: 'auto', textAlign: 'left' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.02, marginBottom: 8 }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 24, fontWeight: 600 }}>{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={{ marginLeft: 0, marginRight: 'auto' }} />
          <div className="cover-hero-prep">{DEAL.type}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ pageNum }) {
  const summary = [
    ['Building Size', '4,725 SF'],
    ['Lot Size', '5,624 SF'],
    ['Number of Units', '4'],
    ['Year Built / Renovated', '1920 / 2016'],
    ['Price / SF', '$465.61'],
    ['Price / Unit', '$550,000'],
    ['Cap Rate', '5.23%'],
    ['Pro Forma Cap Rate', '6.90%'],
    ['Net Operating Income', '$115,126'],
  ]
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$2,200,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>4</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Property Overview</div>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 11, lineHeight: 1.52 }}>
                Northeast Private Client Group is pleased to present <strong>416-422 McGrath Highway</strong>, a 4-unit
                multifamily property located at the foot of Prospect Hill in Somerville, Massachusetts.
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.52 }}>
                The property consists of four spacious residential units, including (2) three-bedroom, two-bathroom units
                and (2) four-bedroom, two-bathroom units. Each apartment features direct-entry access, providing tenants
                with the privacy and feel of townhouse-style living. Additional amenities include in-unit laundry, central
                air conditioning, separately metered utilities with tenants responsible for their own gas and electric
                expenses, and outdoor space located at the rear of the property.
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.52 }}>
                Originally gut renovated in 2016, the asset offers modern layouts and finishes while requiring minimal
                near-term capital expenditures. Current ownership has maintained the property well, creating an attractive
                investment opportunity with the potential to further increase cash flow through strategic rent growth as
                leases turn over and rents are adjusted toward market levels.
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.52 }}>
                416-422 McGrath Highway presents the opportunity to acquire a well-maintained four-unit multifamily asset
                in one of Greater Boston&rsquo;s most dynamic and supply-constrained rental markets. Ideally situated in
                Somerville, the property offers convenient access to Cambridge, Boston, Assembly Row, Union Square, Kendall
                Square, and numerous public transportation options, placing residents within minutes of many of the
                region&rsquo;s largest employment, educational, and entertainment hubs.
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.52 }}>
                All interested and qualified parties will have the opportunity to obtain additional information and walk
                the premises upon request.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div style={{ flex: '0 0 44%', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/aerial-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Offering Summary</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {summary.map(([l, v], i) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 2px', borderBottom: i < summary.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: 11, color: 'var(--graphite)' }}>{l}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PROPERTY OVERVIEW ═══════════════════ */
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">4-Unit Multifamily (Residential)</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">(2) 3BR / 2BA · (2) 4BR / 2BA</span></div>
                <div className="bldg-row"><span className="bldg-label">Building Size</span><span className="bldg-val">4,725 SF gross (4,720 rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">5,624 SF (±0.13 acres)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1920</span></div>
                <div className="bldg-row"><span className="bldg-label">Renovated</span><span className="bldg-val">Gut renovation, 2016</span></div>
                <div className="bldg-row"><span className="bldg-label">Frontage</span><span className="bldg-val">McGrath Highway (Route 28)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Tenant-Paid · Gas · Separately Metered</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant-Paid · Separately Metered</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer</span><span className="bldg-val">Landlord Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Cooling</span><span className="bldg-val">Central air conditioning</span></div>
                <div className="bldg-row"><span className="bldg-label">Laundry</span><span className="bldg-val">In-unit (each apartment)</span></div>
                <div className="bldg-row"><span className="bldg-label">Entry</span><span className="bldg-val">Direct-entry access per unit</span></div>
                <div className="bldg-row"><span className="bldg-label">Interiors</span><span className="bldg-val">Refinished hardwood · updated kitchens &amp; baths</span></div>
                <div className="bldg-row"><span className="bldg-label">Outdoor Space</span><span className="bldg-val">Private yard at rear</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Unit 416 · 422</span><span className="bldg-val">3BR / 2BA · 1,160 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit 418 · 420</span><span className="bldg-val">4BR / 2BA · 1,200 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Rent</span><span className="bldg-val">$13,900 / mo · $166,800 / yr</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma Rent</span><span className="bldg-val">$17,600 / mo · $211,200 / yr</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$2,200,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / Unit · / SF</span><span className="bldg-val">$550,000 · $466 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI</span><span className="bldg-val">$115,126 · 5.23% cap</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$151,719 · 6.90% cap</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RENT ROLL — charts ═══════════════════ */
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

function ChartCard({ title, data, centerLabel, centerSub, size = 112 }) {
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
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.value} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
            <span style={{ flex: '0 0 84px', fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>${d.value.toLocaleString()}</span>
          </div>
        ))}
        {note && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--golden)', marginTop: 2 }}>{note}</div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
/* Full per-unit rent roll — in-place vs pro forma, with lease expirations.
   All four leases roll in 2027, supporting a near-term mark-to-market. */
function RentRoll({ pageNum }) {
  const rows = [
    { unit: '416', type: '3 BR / 2 BA', sf: '1,160', inPlace: '$3,600', ips: '$3.10', pf: '$4,200', pfs: '$3.62', end: '8/31/2027' },
    { unit: '418', type: '4 BR / 2 BA', sf: '1,200', inPlace: '$3,300', ips: '$2.75', pf: '$4,600', pfs: '$3.83', end: '8/31/2027' },
    { unit: '420', type: '4 BR / 2 BA', sf: '1,200', inPlace: '$4,000', ips: '$3.33', pf: '$4,600', pfs: '$3.83', end: '8/31/2027' },
    { unit: '422', type: '3 BR / 2 BA', sf: '1,160', inPlace: '$3,000', ips: '$2.59', pf: '$4,200', pfs: '$3.62', end: '10/31/2027' },
  ]
  const unitMix = [
    { label: '3 BR / 2 BA', value: 2, color: '#3F4753' },
    { label: '4 BR / 2 BA', value: 2, color: '#F8971D' },
  ]
  const grossRent = [
    { label: 'In-Place', value: 166800, color: '#3F4753' },
    { label: 'Pro Forma', value: 211200, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11 }}>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Unit Type</th>
              <th style={{ textAlign: 'right' }}>SF</th>
              <th style={{ textAlign: 'right' }}>In-Place / mo</th>
              <th style={{ textAlign: 'right' }}>$/SF</th>
              <th style={{ textAlign: 'right' }}>Pro Forma / mo</th>
              <th style={{ textAlign: 'right' }}>$/SF</th>
              <th style={{ textAlign: 'right' }}>Lease End</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.unit}>
                <td><strong>{r.unit}</strong></td>
                <td>{r.type}</td>
                <td style={{ textAlign: 'right' }}>{r.sf}</td>
                <td style={{ textAlign: 'right' }}>{r.inPlace}</td>
                <td style={{ textAlign: 'right' }}>{r.ips}</td>
                <td style={{ textAlign: 'right' }}>{r.pf}</td>
                <td style={{ textAlign: 'right' }}>{r.pfs}</td>
                <td style={{ textAlign: 'right' }}>{r.end}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>4 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>4,720</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$13,900</strong></td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
              <td style={{ textAlign: 'right' }}><strong>$17,600</strong></td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 36, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Units by Type" data={unitMix} centerLabel="4" centerSub="UNITS" size={170} />
          <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={grossRent} note="+$44,400 · +27% rental upside on 2027 rollover" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
/* Income statement — Current (in-place) vs Pro Forma, each with a $/Unit column
   (4 units). Gross scheduled rent → vacancy → EGI, then the itemized operating
   expense schedule and NOI / cap. */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 9, padding: '3.5px 7px', textAlign: 'right' }
  const tdl = { fontSize: 9, padding: '3.5px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 8, padding: '4px 7px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '3.5px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '4.5px 7px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Current (In-Place)', val: '$115,126' },
    { label: 'NOI — Pro Forma', val: '$151,719' },
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
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Gross Scheduled Rent', '$166,800', '$41,700', '$211,200', '$52,800', true],
              ['Vacancy & Collections Loss', '-$3,336', '-$834', '-$6,336', '-$1,584', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$163,464</td><td style={totBg}>$40,866</td><td style={totBg}>$204,864</td><td style={totBg}>$51,216</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Real Estate Taxes', '$16,755', '$4,189', '$21,740', '$5,435'],
              ['Insurance', '$10,248', '$2,562', '$8,000', '$2,000'],
              ['Water & Sewer', '$6,519', '$1,630', '$6,519', '$1,630'],
              ['Electric (Common)', '$240', '$60', '$240', '$60'],
              ['Repairs & Maintenance', '$2,964', '$741', '$2,964', '$741'],
              ['Snow & Landscaping', '$2,737', '$684', '$2,737', '$684'],
              ['Property Management (5%)', '$8,173', '$2,043', '$10,243', '$2,561'],
              ['Fire Alarm / Security', '$701', '$175', '$701', '$175'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$48,338</td><td style={totBg}>$12,084</td><td style={totBg}>$53,145</td><td style={totBg}>$13,286</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$115,126</td><td style={noiBg}>5.23% Cap</td><td style={noiBg}>$151,719</td><td style={noiBg}>6.90% Cap</td></tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ DEAL CONTACTS ═══════════════════ */
function DealContacts({ pageNum }) {
  const brokers = [
    { name: 'Drew Kirkland', title: 'Vice President, Investments', phone: '(857) 990-6802', email: 'dkirkland@northeastpcg.com', photo: '/photos/team/drew-kirkland.jpg' },
    { name: 'Tom Egbers', title: 'Investment Associate', phone: '(857) 990-2022', email: 'tegbers@northeastpcg.com', photo: '/photos/team/tom-egbers.jpg' },
  ]
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          {brokers.map(b => (
            <div key={b.name} className="dc-card" style={{ border: 'none', padding: 0 }}>
              <img className="dc-avatar" src={b.photo} alt={b.name} style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
              <div className="dc-name">{b.name}</div>
              <div className="dc-title">{b.title}</div>
              <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: {b.phone}</div>
              <div className="dc-meta" style={{ fontWeight: 700 }}>{b.email}</div>
            </div>
          ))}
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
          <div className="section-title" style={{ marginBottom: 2 }}>Somerville <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>A dense, transit-rich city at the doorstep of Boston and Cambridge.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11, lineHeight: 1.6, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p>
              Somerville, Massachusetts is a vibrant, densely populated city just northwest of Boston, known for its
              eclectic neighborhoods, strong arts scene, and urban energy. Once an industrial hub, Somerville has
              transformed into one of the most dynamic and desirable cities in Greater Boston, drawing students,
              professionals, and creatives alike. The city is organized around distinct squares &mdash; Davis, Union,
              and Assembly Row among them &mdash; each with its own mix of restaurants, boutiques, and entertainment.
            </p>
            <p>
              Culturally, Somerville thrives as a center for innovation, diversity, and the arts. Public murals,
              galleries, live-music venues, and annual events like ArtBeat and PorchFest reflect the city&rsquo;s
              creative spirit, and a wide-ranging culinary scene spans international cuisines and locally owned eateries.
              Somerville is also home to Tufts University, which brings academic influence and youthful energy.
            </p>
            <p>
              Transportation and accessibility are key strengths. Extensive transit &mdash; multiple MBTA Green Line
              Extension stops, the Orange Line, bus routes, and bike paths like the Somerville Community Path &mdash;
              pairs with proximity to Boston and Cambridge to make Somerville an ideal base for commuters and one of the
              region&rsquo;s most supply-constrained rental markets.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>About Somerville</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.6, lineHeight: 1.7 }}>
            <li>Population ~81,000 &mdash; among the densest cities in New England</li>
            <li>Minutes to Cambridge, Boston &amp; Kendall Square</li>
            <li>Home to Tufts University</li>
            <li>MBTA Green Line Extension + Orange Line access</li>
            <li>Assembly Row &mdash; 2M+ SF of retail, dining &amp; office</li>
            <li>One of Greater Boston&rsquo;s most supply-constrained rental markets</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/assembly.jpg" alt="Assembly Row, Somerville" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/aerial-2.jpg" alt="East Somerville" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ COUNTY / METRO OVERVIEW ═══════════════════ */
function CountyOverview({ pageNum }) {
  const employers = [
    { label: 'Somerville & Assembly Row', items: 'Mass General Brigham (Assembly Row headquarters), Puma North America, Partners HealthCare administrative offices, and the Assembly Row retail, dining, and office district.' },
    { label: 'Cambridge / Kendall Square (~10 min)', items: 'MIT, Harvard, and the Kendall Square innovation cluster — Google, Microsoft, Amazon, Moderna, Biogen, and Novartis — the densest biotech corridor in the country.' },
    { label: 'Downtown Boston (~10 min)', items: 'Mass General Brigham and Boston Medical Center, State Street, John Hancock, and the downtown financial, government, and healthcare core.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Greater Boston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Somerville sits in Middlesex County — the most populous county in New England — at the core of the Greater
            Boston metro, one of the nation&rsquo;s strongest knowledge economies, anchored by world-class universities,
            hospitals, biotechnology, and technology employers. The inner core is severely supply-constrained: decades of
            limited new housing relative to job and population growth keep well-located rentals like McGrath Apartments in
            persistent, durable demand, with vacancy among the lowest in the country.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Somerville vs. Middlesex County</div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Somerville</th>
                <th style={{ textAlign: 'right' }}>Middlesex County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population (est.)</td><td style={{ textAlign: 'right' }}>~81,000</td><td style={{ textAlign: 'right' }}>~1.63M</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~33,000</td><td style={{ textAlign: 'right' }}>~620,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$117,000</td><td style={{ textAlign: 'right' }}>~$120,000</td></tr>
              <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>~32</td><td style={{ textAlign: 'right' }}>~38</td></tr>
              <tr><td>Renter-Occupied (est.)</td><td style={{ textAlign: 'right' }}>~65%</td><td style={{ textAlign: 'right' }}>~38%</td></tr>
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
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-1.jpg" alt="Downtown Boston skyline" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/aerial-4.jpg" alt="Somerville & Greater Boston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ LOCAL ATTRACTIONS ═══════════════════ */
function LocalAttractions({ pageNum }) {
  const cards = [
    { label: 'Assembly Row', img: '/photos/attr-assembly.jpg' },
    { label: 'Bow Market', img: '/photos/attr-bow.jpg' },
    { label: 'Davis Square', img: '/photos/attr-davis.jpg' },
    { label: 'Prospect Hill Park', img: '/photos/attr-prospect.jpg' },
  ]
  return (
    <div className="page">
      <PageHeader section="Local Attractions" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Local <span style={{ color: '#F8971D' }}>Attractions</span></div>
        <div className="title-rule" />
        <div style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12, marginBottom: 12 }}>
          <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--graphite)' }}>
            Somerville offers a wealth of dining, shopping, and recreation for residents. A few of the neighborhood&rsquo;s
            most notable destinations include:
          </p>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0 }}>
          {cards.map(c => (
            <div key={c.label} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', minHeight: 0 }}>
              <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(24,28,34,0.55) 0%, rgba(24,28,34,0) 45%)' }} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(24,28,34,0.62)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 4, padding: '10px 22px' }}>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            </div>
          ))}
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
      title: 'Income & Value-Add Upside',
      items: [
        { head: 'Rents Below Market with Near-Term Roll', body: 'In-place rents average $3,475/mo and mark to $4,400 pro forma, lifting gross scheduled rent 27% from $166,800 to $211,200.' },
        { head: 'All Four Leases Expire in 2027', body: 'Three units roll 8/31/2027 and one 10/31/2027 — the full mark-to-market is achievable within the first year of ownership.' },
        { head: 'Spacious 3–4 Bedroom Layouts', body: 'Large (2) 3BR/2BA and (2) 4BR/2BA townhouse-style units (1,160–1,200 SF) command premium rents near major universities.' },
        { head: 'Tenant-Paid Utilities', body: 'Separately metered gas and electric keep operating costs low and insulate margins from energy price swings.' },
      ],
    },
    {
      title: 'Asset Quality & Location',
      items: [
        { head: '2016 Gut Renovation', body: 'Modern kitchens and baths, in-unit laundry, central air, and refinished hardwood — minimal near-term capital expenditure.' },
        { head: 'Supply-Constrained Somerville Market', body: 'One of Greater Boston’s densest, most sought-after rental markets, where new multifamily supply is severely limited.' },
        { head: 'Transit-Rich East Somerville', body: 'Minutes to four MBTA rapid-transit stations, Assembly Row, Cambridge, and downtown Boston — at the doorstep of the region’s largest employers.' },
        { head: 'Direct-Entry, Townhouse Feel', body: 'Private direct-entry access and rear outdoor space give each unit the privacy of a townhome, supporting retention and rent growth.' },
      ],
    },
  ]
  const photos = ['/photos/ext-1.jpg', '/photos/aerial-1.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        {/* 2×2 checkerboard — text box · photo (top), photo · text box (bottom). */}
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
            return [TextBox(boxes[0], 'tl'), PhotoBox(photos[0], 'tr'), PhotoBox(photos[1], 'bl'), TextBox(boxes[1], 'br')]
          })()}
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
    <Divider eyebrow="01" title="The Property" image="/photos/ext-2.jpg" />,
    <BuildingDescriptions />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/aerial-4.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/assembly.jpg" />,
    <CityOverview />,
    <LocationMap />,
    <LocalAttractions />,
    <DriveTimeMap />,
    <CountyOverview />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/aerial-3.jpg" />,
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
