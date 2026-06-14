import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Top scrim so the overlay text reads clearly (replaces the default bottom-weighted shade) */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        {/* NPCG logo — top right */}
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {/* Title block — top left, top-aligned with the logo */}
        <div className="cover-hero-overlay" style={{ top: 28, bottom: 'auto', left: 40 }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 40 }}>{ADDR}</div>
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
// TODO: executive summary — fill in offering price, unit count, deal narrative,
// investment highlights, and the two summary photos.
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$0,000,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>00</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <p style={{ fontSize: 10.4, lineHeight: 1.55, marginBottom: 10 }}>
              TODO: deal narrative — overview of the property, unit mix, and location at {ADDR}.
            </p>
            <p style={{ fontSize: 10.4, lineHeight: 1.55, marginBottom: 10 }}>
              TODO: deal narrative — amenities, parking, and proximity to nearby transit and employment anchors.
            </p>
            <p style={{ fontSize: 10.4, lineHeight: 1.55, marginBottom: 12 }}>
              TODO: deal narrative — invitation to qualified parties to request the offering package and tour.
            </p>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights highlights--lg" style={{ flex: 1, justifyContent: 'space-between', fontSize: 10.4 }}>
              <li><strong>TODO: investment highlight</strong></li>
              <li><strong>TODO: investment highlight</strong></li>
              <li><strong>TODO: investment highlight</strong></li>
              <li><strong>TODO: investment highlight</strong></li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src={DEAL.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src={DEAL.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 4 — PROPERTY OVERVIEW ═══════════════════ */
// TODO: property overview — fill in site summary, utilities, construction,
// unit mix & rents, and investment profile.
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
                <div className="bldg-row"><span className="bldg-label">Address</span><span className="bldg-val">{ADDR}</span></div>
                <div className="bldg-row"><span className="bldg-label">City / State</span><span className="bldg-val">{CITY_STATE}</span></div>
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">TODO Property Type</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">00</span></div>
                <div className="bldg-row"><span className="bldg-label">Buildings</span><span className="bldg-val">00</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.00 Acres</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">0,000 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">0000 / 0000</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">TODO Zoning</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">TODO Parking</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">TODO</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">TODO</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer</span><span className="bldg-val">TODO</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Style</span><span className="bldg-val">TODO</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories</span><span className="bldg-val">TODO</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">TODO</span></div>
                <div className="bldg-row"><span className="bldg-label">Interiors</span><span className="bldg-val">TODO</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">TODO Unit Mix</span></div>
                <div className="bldg-row"><span className="bldg-label">Avg In-Place Rent</span><span className="bldg-val">$0,000 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">High Achieved</span><span className="bldg-val">$0,000 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma Rent</span><span className="bldg-val">$0,000 / mo</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$0,000,000 ($000K/Unit)</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / SF</span><span className="bldg-val">$000 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">NOI (Year 1 &rarr; PF)</span><span className="bldg-val">$000,000 &rarr; $000,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Cap (Year 1 &rarr; PF)</span><span className="bldg-val">0.00% &rarr; 0.00%</span></div>
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

/* Horizontal bar chart — in-place vs pro forma avg rent, with upside note. */
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
            <span style={{ flex: '0 0 64px', fontSize: 13.5, fontWeight: 800, color: 'var(--carbon)' }}>${d.value.toLocaleString()}</span>
          </div>
        ))}
        {note && (
          <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--golden)', marginTop: 2 }}>{note}</div>
        )}
      </div>
    </div>
  )
}

// TODO: rent roll — fill in unit mix, in-place / pro forma rents, and the
// totals row; update the unit-type and rent-upside charts to match.
function RentRoll({ pageNum }) {
  const mix = [
    { type: 'Unit Type A', units: 0, avg: 0, high: 0, pf: 0, monthly: 0, pfMonthly: 0 },
    { type: 'Unit Type B', units: 0, avg: 0, high: 0, pf: 0, monthly: 0, pfMonthly: 0 },
    { type: 'Unit Type C', units: 0, avg: 0, high: 0, pf: 0, monthly: 0, pfMonthly: 0 },
  ]
  const unitType = [
    { label: 'Unit Type A', value: 1, color: '#3F4753' },
    { label: 'Unit Type B', value: 1, color: '#F8971D' },
    { label: 'Unit Type C', value: 1, color: '#B55D37' },
  ]
  // TODO: set real avg rents — placeholder values keep the bar chart from
  // dividing by zero.
  const upside = [
    { label: 'In-Place', value: 1, color: '#3F4753' },
    { label: 'Pro Forma', value: 1, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix & <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11.5 }}>
          <thead><tr><th>Unit Type</th><th style={{ textAlign: 'center' }}>Units</th><th style={{ textAlign: 'right' }}>Avg In-Place</th><th style={{ textAlign: 'right' }}>High Achieved</th><th style={{ textAlign: 'right' }}>Pro Forma</th><th style={{ textAlign: 'right' }}>Monthly (In-Place)</th><th style={{ textAlign: 'right' }}>Monthly (Pro Forma)</th></tr></thead>
          <tbody>
            {mix.map((m, i) => (
              <tr key={i}>
                <td>{m.type}</td>
                <td style={{ textAlign: 'center' }}>{m.units}</td>
                <td style={{ textAlign: 'right' }}>${m.avg.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m.high.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m.pf.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m.monthly.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m.pfMonthly.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td style={{ textAlign: 'center' }}><strong>00</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$0,000</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$0,000</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$0,000</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$00,000</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$00,000</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 64, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Type" data={unitType} centerLabel="00" centerSub="UNITS" size={170} />
          <BarChartCard title="Rent Upside — Avg Rent / Unit" data={upside} note="TODO: + $000 / unit · +00% mark-to-market" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
/* TODO: income & expense — fill in Year 1 and Pro Forma figures for each
   itemized income and expense line, plus the EGI, total-expense, and NOI
   rows. Percentages appear only where the model carries them. */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8, padding: '1.5px 8px', textAlign: 'right' }
  const tdl = { fontSize: 8, padding: '1.5px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7, padding: '2.5px 8px', textAlign: 'right' }
  const thl = { fontSize: 7, padding: '2.5px 8px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8, padding: '2px 8px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 8.5, padding: '2.5px 8px', textAlign: 'right' }

  // [label, y1, y1PerUnit, y1Pct, pf, pfPerUnit, pfPct, bold]
  const incomeRows = [
    ['Gross Potential Rent', '$000,000', '', '', '$000,000', '', ''],
    ['Below Market Rent', '$000,000', '', '0.00%', '$0', '', '0.00%'],
    ['Gross Scheduled Rent', '$000,000', '', '', '$000,000', '', '', true],
    ['Vacancy & Collections Loss', '$00,000', '', '0.00%', '$00,000', '', '0.00%'],
    ['Effective Rental Income', '$000,000', '', '', '$000,000', '', '', true],
    ['Laundry Income', '$0,000', '$000', '', '$0,000', '$000', ''],
    ['Parking & Garage Income', '$0', '$0', '', '$00,000', '$000', ''],
    ['Pet Fees', '$0', '$0', '', '$0,000', '$00', ''],
    ['Additional Income', '$0,000', '$00', '', '$0,000', '$000', ''],
    ['Total Additional Income', '$0,000', '$000', '', '$00,000', '$000', '', true],
  ]
  const expenseRows = [
    ['Property Management', '$00,000', '$000', '0.00%', '$00,000', '$000', '0.00%'],
    ['Real Estate Tax', '$00,000', '$0,000', '', '$000,000', '$0,000', ''],
    ['Property Insurance', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Electric', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Gas', '$00,000', '$0,000', '', '$00,000', '$0,000', ''],
    ['Water and Sewer', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Trash Removal', '$0,000', '$000', '', '$0,000', '$000', ''],
    ['Repairs and Maintenance', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Landscaping/Snow Removal', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Payroll', '$00,000', '$000', '', '$00,000', '$000', ''],
    ['Contract Services', '$0,000', '$00', '', '$0,000', '$00', ''],
    ['Professional and Legal', '$0,000', '$000', '', '$0,000', '$000', ''],
    ['General and Administrative', '$0', '$0', '', '$0', '$0', ''],
    ['Leasing and Advertising', '$0,000', '$000', '', '$0,000', '$000', ''],
  ]

  const Cols = () => (
    <colgroup>
      <col style={{ width: '28%' }} />
      {Array.from({ length: 6 }).map((_, i) => <col key={i} style={{ width: '12%' }} />)}
    </colgroup>
  )

  const Head = ({ first }) => (
    <thead>
      <tr style={{ background: 'var(--carbon)' }}>
        <th style={{ ...thl, color: '#fff' }}>{first}</th>
        <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
        <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
      </tr>
    </thead>
  )

  const Row = ([label, y1, y1u, y1p, pf, pfu, pfp, bold], i) => {
    const w = bold ? { fontWeight: 700 } : null
    return (
      <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
        <td style={{ ...tdl, ...w }}>{label}</td>
        <td style={{ ...tds, ...w }}>{y1}</td><td style={{ ...tds, ...w }}>{y1u}</td><td style={{ ...tds, ...w }}>{y1p}</td>
        <td style={{ ...tds, ...w }}>{pf}</td><td style={{ ...tds, ...w }}>{pfu}</td><td style={{ ...tds, ...w }}>{pfp}</td>
      </tr>
    )
  }

  const noi = [
    { label: 'NOI — Year 1', val: '$000,000' },
    { label: 'NOI — Pro Forma', val: '$000,000' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 6 }} />

        {/* NOI summary strip (boxless), above the tables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 6, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.val}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <Head first="Income" />
          <tbody>
            {incomeRows.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$000,000</td><td style={totBg}></td><td style={totBg}></td><td style={totBg}>$000,000</td><td style={totBg}></td><td style={totBg}></td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <Head first="Expense" />
          <tbody>
            {expenseRows.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$000,000</td><td style={totBg}>$0,000</td><td style={totBg}>0.00%</td><td style={totBg}>$000,000</td><td style={totBg}>$0,000</td><td style={totBg}>0.00%</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$000,000</td><td style={noiBg}></td><td style={noiBg}></td><td style={noiBg}>$000,000</td><td style={noiBg}></td><td style={noiBg}></td></tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 10 — DEAL CONTACTS ═══════════════════ */
// TODO: deal contacts — set the exclusively-listed-by advisors for this deal.
function DealContacts({ pageNum }) {
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card">
            <div className="dc-avatar dc-avatar--ph">AN</div>
            <div className="dc-name">Advisor Name</div>
            <div className="dc-title">Title, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: 000.000.0000</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>name@northeastpcg.com</div>
          </div>
          <div className="dc-card">
            <div className="dc-avatar dc-avatar--ph">AN</div>
            <div className="dc-name">Advisor Name</div>
            <div className="dc-title">Title, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: 000.000.0000</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>name@northeastpcg.com</div>
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

/* ═══════════════════ CITY OVERVIEW ═══════════════════ */
// TODO: city overview — market narrative, "about" highlights, and two photos.
function CityOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>City <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>TODO: market tagline</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              TODO: city overview — the city's character, location, and how the property fits within its
              walkable / transit-served context.
            </p>
            <p>
              TODO: investment thesis — why this is an attractive market for the buyer, the tenant base, and the
              value-add path.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About the City</div>
          <ul className="highlights ridge-highlights">
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
            <li>TODO: city highlight</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src={DEAL.coverImage} alt="City overview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src={DEAL.coverImage} alt="City overview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ COUNTY OVERVIEW ═══════════════════ */
// TODO: county overview — regional narrative and demographics table.
function CountyOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>County <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>TODO: county overview — the broader region, its anchor institutions, and the scale of its economy and employment base.</p>
            <p>TODO: submarket positioning — how the city / property fits within the county and why its demographics support stable demand.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — City vs. County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>City</th>
                  <th style={{ textAlign: 'right' }}>County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>00,000</td><td style={{ textAlign: 'right' }}>000,000</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>00,000</td><td style={{ textAlign: 'right' }}>000,000</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$00,000</td><td style={{ textAlign: 'right' }}>$00,000</td></tr>
                <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$00,000</td><td style={{ textAlign: 'right' }}>$00,000</td></tr>
                <tr><td>Renter-Occupied</td><td style={{ textAlign: 'right' }}>~00%</td><td style={{ textAlign: 'right' }}>~00%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src={DEAL.coverImage} alt="County overview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
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
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" />,
    <CityOverview />,
    <LocationMap />,
    <CountyOverview />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" />,
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
