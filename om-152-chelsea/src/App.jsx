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
      <div className="cover-hero photo-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Gradient hugs the BOTTOM of the frame so the title block reads against
            the streetscape; the sky stays bright and clear. */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '52%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, bottom: 40, textAlign: 'left' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.02, marginBottom: 8 }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 24, fontWeight: 600 }}>East Boston&rsquo;s Corridor to Downtown</div>
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
    ['Building Size', '4,650 SF'],
    ['Number of Units', '6 — (5) residential + (1) retail'],
    ['Unit Mix', '(3) 1BR · (2) 2BR · (1) Retail'],
    ['Year Built', '1902'],
    ['Parking Income', '$4,800 / yr (154 Chelsea lot)'],
    ['Net Operating Income', '$128,958 (current)'],
    ['Pro Forma NOI', '$151,881'],
    ['Cap Rate (Cur / PF)', '5.61% / 6.60%'],
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$2,300,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>6</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Property Overview</div>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                Northeast Private Client Group is pleased to present <strong>152&ndash;154 Chelsea Street</strong>, a
                six-unit mixed-use building with an adjoining parking lot in East Boston, two miles from downtown Boston.
              </p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                The offering consists of (3) one-bedroom and (2) two-bedroom apartments over a street-level retail
                storefront, plus the on-site parking lot generating $4,800 per year of additional income.
                Tenants pay their own heat and electric, keeping the expense load light.
              </p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                In-place residential rents run roughly 13% below market, and ownership&rsquo;s own recent leasing proves
                the mark &mdash; one-bedrooms have already achieved $2,155 and two-bedrooms $2,895. Marking the
                remaining units to market lifts NOI from $128,958 to $151,881 and the cap rate from 5.61% to 6.60% on
                the $2,300,000 asking price.
              </p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                East Boston is the city&rsquo;s workforce-housing hub: 71% renter-occupied, anchored by Logan
                Airport&rsquo;s ~20,000 jobs next door, the Encore casino across the creek, and downtown&rsquo;s
                employment core two Blue Line stops from Maverick Square. Asking rents here still sit hundreds of
                dollars below Boston&rsquo;s citywide average &mdash; durable demand at attainable rents, minutes from
                everything.
              </p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                All interested and qualified parties will have the opportunity to obtain additional information upon
                request.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div style={{ flex: '0 0 44%', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/front-2.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Offering Summary</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {summary.map(([l, v], i) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 2px', borderBottom: i < summary.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: 10.5, color: 'var(--graphite)' }}>{l}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)' }}>{v}</span>
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use — (5) Apartments + Retail</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">On-site lot at 154 Chelsea</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">(3) 1BR · (2) 2BR · (1) Retail</span></div>
                <div className="bldg-row"><span className="bldg-label">Building Size</span><span className="bldg-val">4,650 SF rentable</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">±0.04 acres + parking lot</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1902</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories</span><span className="bldg-val">3 (residential over storefront)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Electric</span><span className="bldg-val">Tenant-Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer</span><span className="bldg-val">Landlord Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Trash</span><span className="bldg-val">City of Boston</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">One-Bedroom</span><span className="bldg-val">3 units · 650 SF · $1,975–$2,155</span></div>
                <div className="bldg-row"><span className="bldg-label">Two-Bedroom</span><span className="bldg-val">2 units · 900 SF · $2,255–$2,895</span></div>
                <div className="bldg-row"><span className="bldg-label">Retail</span><span className="bldg-val">1 unit · 900 SF · $2,746</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Rent</span><span className="bldg-val">$14,121 / mo · $169,452 / yr</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma Rent</span><span className="bldg-val">$16,183 / mo · $194,200 / yr</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Location</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Neighborhood</span><span className="bldg-val">East Boston — Maverick / Day Sq</span></div>
                <div className="bldg-row"><span className="bldg-label">Blue Line</span><span className="bldg-val">Maverick &amp; Airport ~0.5 mi</span></div>
                <div className="bldg-row"><span className="bldg-label">Downtown Boston</span><span className="bldg-val">~2 mi via Sumner Tunnel</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Tenancy &amp; Income</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering</span><span className="bldg-val">$2,300,000 · $383K/unit · $495/SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Current NOI</span><span className="bldg-val">$128,958 (5.61% cap)</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$151,881 (6.60% cap · +18%)</span></div>
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
/* Full per-unit rent roll — in-place vs high-achieved vs pro forma. Ownership's
   own recent leasing ($2,155 1BRs, $2,895 2BRs) proves the pro forma mark. */
function RentRoll({ pageNum }) {
  const rows = [
    { bldg: '152 Chelsea', unit: '1', type: '1 Bed', sf: '650', inPlace: '$2,095', high: '$2,155', pf: '$2,500', pfs: '$3.85' },
    { bldg: '152 Chelsea', unit: '2', type: '1 Bed', sf: '650', inPlace: '$2,155', high: '$2,155', pf: '$2,500', pfs: '$3.85' },
    { bldg: '152 Chelsea', unit: '3', type: '2 Bed', sf: '900', inPlace: '$2,895', high: '$2,895', pf: '$2,900', pfs: '$3.22' },
    { bldg: '154 Chelsea', unit: '1', type: 'Retail', sf: '900', inPlace: '$2,746', high: '$2,746', pf: '$2,883', pfs: '$3.20' },
    { bldg: '154 Chelsea', unit: '2', type: '1 Bed', sf: '650', inPlace: '$1,975', high: '$2,155', pf: '$2,500', pfs: '$3.85' },
    { bldg: '154 Chelsea', unit: '3', type: '2 Bed', sf: '900', inPlace: '$2,255', high: '$2,895', pf: '$2,900', pfs: '$3.22' },
  ]
  const unitMix = [
    { label: '1 Bedroom', value: 3, color: '#F8971D' },
    { label: '2 Bedroom', value: 2, color: '#3F4753' },
    { label: 'Retail', value: 1, color: '#B55D37' },
  ]
  const grossRent = [
    { label: 'In-Place', value: 169452, color: '#3F4753' },
    { label: 'Pro Forma', value: 194200, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10 }}>
          <thead>
            <tr>
              <th>Building</th>
              <th>Unit</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>SF</th>
              <th style={{ textAlign: 'right' }}>In-Place / mo</th>
              <th style={{ textAlign: 'right' }}>High Achieved</th>
              <th style={{ textAlign: 'right' }}>Pro Forma / mo</th>
              <th style={{ textAlign: 'right' }}>PF $/SF</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><strong>{r.bldg}</strong></td>
                <td>{r.unit}</td>
                <td>{r.type}</td>
                <td style={{ textAlign: 'right' }}>{r.sf}</td>
                <td style={{ textAlign: 'right' }}>{r.inPlace}</td>
                <td style={{ textAlign: 'right' }}>{r.high}</td>
                <td style={{ textAlign: 'right' }}>{r.pf}</td>
                <td style={{ textAlign: 'right' }}>{r.pfs}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td colSpan={2}><strong>6 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>4,650</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$14,121</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$15,001</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$16,183</strong></td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Units by Type" data={unitMix} centerLabel="6" centerSub="UNITS" size={140} />
          <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={grossRent} note="+$24,748 · +15% rental upside" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 10.5, padding: '5.5px 8px', textAlign: 'right' }
  const tdl = { fontSize: 10.5, padding: '5.5px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 9, padding: '6px 8px', textAlign: 'right' }
  const thl = { fontSize: 9, padding: '6px 8px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 10.5, padding: '5.5px 8px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 11, padding: '6.5px 8px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Year 1', val: '$128,958' },
    { label: 'NOI — Pro Forma', val: '$151,881' },
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
              ['Gross Scheduled Rent', '$169,452', '$28,242', '$194,200', '$32,367', true],
              ['Vacancy & Collections Loss (2.5%)', '-$4,236', '-$706', '-$4,855', '-$809', false],
              ['Parking Income (154 Chelsea)', '$4,800', '$800', '$4,800', '$800', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$170,016</td><td style={totBg}>$28,336</td><td style={totBg}>$194,145</td><td style={totBg}>$32,357</td></tr>
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
              ['Real Estate Taxes', '$17,357', '$2,893', '$17,357', '$2,893'],
              ['Insurance', '$5,000', '$833', '$5,000', '$833'],
              ['Water & Sewer', '$7,200', '$1,200', '$7,200', '$1,200'],
              ['Repairs & Maintenance', '$3,000', '$500', '$3,000', '$500'],
              ['Property Management (5%)', '$8,501', '$1,417', '$9,707', '$1,618'],
              ['Heat & Electric', 'Tenant-Paid', '—', 'Tenant-Paid', '—'],
              ['Trash Removal', 'City of Boston', '—', 'City of Boston', '—'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$41,057</td><td style={totBg}>$6,843</td><td style={totBg}>$42,264</td><td style={totBg}>$7,044</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$128,958</td><td style={noiBg}></td><td style={noiBg}>$151,881</td><td style={noiBg}></td></tr>
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
    { name: 'Francis Saenz', title: 'Vice President, Investments', phone: '(857) 990-6803', email: 'fsaenz@northeastpcg.com', photo: '/photos/team/francis-saenz.png' },
    { name: 'Drew Kirkland', title: 'Vice President, Investments', phone: '(857) 990-6802', email: 'dkirkland@northeastpcg.com', photo: '/photos/team/drew-kirkland.jpg' },
    { name: 'Jim Casey', title: 'Senior Associate', phone: '(857) 990-6821', email: 'jcasey@northeastpcg.com', photo: '/photos/team/jim-casey.png' },
    { name: 'Patrick Wheeler', title: 'Investment Associate', phone: '(857) 990-6819', email: 'pwheeler@northeastpcg.com', photo: '/photos/team/patrick-wheeler.jpg' },
    { name: 'Anthony Rakauskas', title: 'Associate', phone: '(857) 990-6807', email: 'arakauskas@northeastpcg.com', photo: '/photos/team/anthony-rakauskas.png' },
  ]
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        {/* Five-broker roster — horizontal rows (avatar left, text right) so the
            full team fits the column without clipping. */}
        <aside className="dc-contacts" style={{ gap: 0 }}>
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          {brokers.map((b, i) => (
            <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < brokers.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <img src={b.photo} alt={b.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '2.5px solid var(--golden)', background: 'var(--linen)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <div className="dc-name" style={{ fontSize: 12.5 }}>{b.name}</div>
                <div className="dc-title" style={{ marginBottom: 1 }}>{b.title}</div>
                <div className="dc-meta" style={{ fontWeight: 700, fontSize: 9.5 }}>{b.phone}</div>
                <div className="dc-meta" style={{ fontWeight: 700, fontSize: 9.5 }}>{b.email}</div>
              </div>
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
          <div className="section-title" style={{ marginBottom: 2 }}>East Boston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Boston&rsquo;s workforce neighborhood — two miles from downtown, next door to Logan.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11.5, lineHeight: 1.65, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p>
              East Boston is the city&rsquo;s historic gateway neighborhood &mdash; built by generations of immigrant
              workers, from the Irish and Italians of the shipyard era (Santarpio&rsquo;s has been pulling pizzas on
              Chelsea Street since 1903) to today&rsquo;s majority-Latino community, with roughly 43,000 residents and
              nearly half born outside the U.S. It is a true working neighborhood: 71% of households rent, the median
              age is 34, and the labor force staffs Logan Airport, the region&rsquo;s hotels and hospitals, downtown&rsquo;s
              service economy, and the Encore resort across Chelsea Creek.
            </p>
            <p>
              What East Boston sells is proximity. The Financial District is two miles away through the Sumner Tunnel
              &mdash; two Blue Line stops from Maverick Square &mdash; yet asking rents remain hundreds of dollars below
              the citywide average. That value-for-location gap is exactly what keeps vacancy near zero, and it is
              drawing institutional capital: Lendlease&rsquo;s 478-unit Clippership Wharf on the waterfront, and HYM&rsquo;s
              Suffolk Downs redevelopment &mdash; 10,000 homes over 161 acres, the largest project in Boston&rsquo;s
              history &mdash; both bet on the same demand this offering serves at a fraction of the basis.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 22, marginBottom: 10 }}>About East Boston</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 11, lineHeight: 2.05 }}>
            <li>~43,000 residents &middot; 71% renter-occupied households</li>
            <li>Blue Line at Maverick &mdash; 2 stops to State Street</li>
            <li>Logan Airport next door &mdash; ~20,000 jobs &middot; 43M passengers (2024)</li>
            <li>1BR asking rents ~$450&ndash;500 below the Boston citywide average</li>
            <li>Suffolk Downs &mdash; 10,000-unit master plan underway</li>
            <li>Piers Park, the Greenway &amp; a rebuilt harborfront</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/skyline-2.jpg" alt="Chelsea Street toward downtown Boston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-1.jpg" alt="East Boston rooftops toward Logan Airport" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    { label: 'East Boston & the Harbor', items: 'Logan International Airport — ~20,000 on-airport jobs and a record 43 million passengers in 2024 — plus Massport, the airport hotel and logistics cluster, and the East Boston Neighborhood Health Center, among the largest community health centers in the country.' },
    { label: 'Inner Core (~10 min)', items: 'Encore Boston Harbor across Chelsea Creek in Everett — thousands of resort jobs — Chelsea’s produce-market and logistics hub, and Kendall Square’s biotech cluster (Moderna, Biogen) ten minutes away in Cambridge.' },
    { label: 'Downtown Boston (2 Blue Line stops)', items: 'Roughly 684,000 jobs in the City of Boston — the Financial District, Mass General Brigham (the state’s largest private employer), and a regional base of ~250,000 college students feeding the rental market.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Boston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Boston is among the tightest rental markets in the country &mdash; metro vacancy of roughly 3.2% ranked
            lowest of the 50 largest U.S. metros in 2025, with 95%+ occupancy and double-digit renter competition per
            vacant unit. East Boston supplies that market&rsquo;s workforce housing: city access and airport-anchored
            employment at rents well below the neighborhoods it feeds. For an income investor, that is the durable
            middle of the demand curve.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — East Boston vs. City of Boston</div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>East Boston</th>
                <th style={{ textAlign: 'right' }}>Boston</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population</td><td style={{ textAlign: 'right' }}>~43,300</td><td style={{ textAlign: 'right' }}>~673,800</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$90,100</td><td style={{ textAlign: 'right' }}>~$97,800</td></tr>
              <tr><td>Renter-Occupied</td><td style={{ textAlign: 'right' }}>~71%</td><td style={{ textAlign: 'right' }}>~65%</td></tr>
              <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>~34.5</td><td style={{ textAlign: 'right' }}>~33.8</td></tr>
              <tr><td>Avg Asking Rent — 1BR</td><td style={{ textAlign: 'right' }}>~$2,900</td><td style={{ textAlign: 'right' }}>~$3,400</td></tr>
            </tbody>
          </table>
          <div style={{ fontSize: 7.4, color: 'var(--stone)', marginBottom: 8, lineHeight: 1.35 }}>
            Sources: U.S. Census Bureau ACS (2024) via Census Reporter; renter share per ACS 2019&ndash;2023; asking rents
            per RentCafe (2026). Figures rounded.
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Major Area Employers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, justifyContent: 'space-between' }}>
            {employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 9.8, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{g.label}</div>
                <div style={{ fontSize: 9.1, lineHeight: 1.45, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/skyline-3.jpg" alt="Downtown Boston skyline from East Boston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/front-4.jpg" alt="152–154 Chelsea Street" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
      title: 'Income & Value-Add Upside',
      items: [
        { head: 'Rents ~13% Below Market', body: 'Gross scheduled rent marks from $169,452 to $194,200 (+15%), lifting NOI from $128,958 to $151,881 and the cap from 5.61% to 6.60% at the ask.' },
        { head: 'The Mark Is Already Proven', body: 'Ownership has achieved $2,155 on one-bedrooms and $2,895 on two-bedrooms in-house — the pro forma repeats existing leases rather than projecting new ones.' },
        { head: 'Three Income Streams', body: 'Five apartments, a street-level retail storefront, and $4,800/yr of income from the adjoining parking lot spread risk across the offering — a 6.16% cap on the trailing twelve.' },
      ],
    },
    {
      title: 'Location & Market',
      items: [
        { head: 'Two Miles from Downtown', body: 'The Financial District is one tunnel — or two Blue Line stops from Maverick — away; Logan’s terminals are a five-minute drive.' },
        { head: 'Workforce Renter Base', body: 'East Boston is 71% renter-occupied and staffs Logan (~20,000 jobs), the Encore resort, and downtown’s service economy — deep, recession-resistant tenant demand.' },
        { head: 'Value Rents, Premium Access', body: 'One-bedrooms here ask ~$450–500 below the Boston citywide average — the affordability gap that keeps metro vacancy the lowest of the 50 largest U.S. markets.' },
        { head: 'Institutional Tailwind', body: 'Suffolk Downs (10,000 units) and Clippership Wharf are re-rating the neighborhood — this offering buys the same demand story at $383K/unit.' },
      ],
    },
  ]
  const photos = ['/photos/front-3.jpg', '/photos/skyline-2.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0, paddingTop: 6 }}>
          {(() => {
            const TextBox = (g, key, opts = {}) => {
              const { headSize = 12.5, bodySize = 11, justify = 'space-between', gap = 9 } = opts
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
            return [TextBox(boxes[0], 'tl'), PhotoBox(photos[0], 'tr'), PhotoBox(photos[1], 'bl'), TextBox(boxes[1], 'br', { headSize: 11.5, bodySize: 10 })]
          })()}
        </div>
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
    <InvestmentHighlights />,
    <Divider eyebrow="01" title="The Property" image="/photos/east-1.jpg" />,
    <BuildingDescriptions />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/skyline-3.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/skyline-1.jpg" />,
    <CityOverview />,
    <LocationMap />,
    <DriveTimeMap />,
    <CountyOverview />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/rear-3.jpg" />,
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
