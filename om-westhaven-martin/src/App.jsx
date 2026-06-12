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
import { ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src="/photos/martin/martin-2.jpg" alt="" />
        <div className="cover-hero-shade" />
        {/* Stronger bottom scrim so the overlay text reads clearly */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>For Sale</div>
          <div className="cover-hero-name">254 Main Street</div>
          <div className="cover-hero-sub">West Haven, Connecticut</div>
          <div className="cover-hero-rule" />
          <div className="cover-hero-prep">19-Unit Multifamily · Value-Add Offering</div>
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$2,565,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>19</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <p style={{ fontSize: 11.5, lineHeight: 1.55, marginBottom: 10 }}>
              Northeast Private Client Group is pleased to present {ADDR}, a 19-unit multifamily property in the
              Allingtown section of West Haven, Connecticut. The offering comprises three attached, brick-masonry
              buildings on a corner parcel ({ADDR} &amp; 106&ndash;108 Martin Street), held by the same family
              ownership for more than 30 years.
            </p>
            <p style={{ fontSize: 11.5, lineHeight: 1.55, marginBottom: 10 }}>
              The unit mix is sixteen one-bedrooms and three studios &mdash; classic layouts with hardwood floors.
              The property sits minutes from the University of New Haven, the VA Connecticut medical campus, Yale,
              and the West Haven Metro-North station, anchoring a deep, recession-resilient base of students,
              medical workers, and professionals.
            </p>
            <p style={{ fontSize: 11.5, lineHeight: 1.55, marginBottom: 12 }}>
              All qualified parties are invited to request the full offering package and schedule a private
              tour through Northeast Private Client Group.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Investment Highlights</div>
            <ul className="highlights highlights--lg" style={{ gap: 12 }}>
              <li><strong>Below-Market Rents</strong> — In-place ~$1,123 vs. ~$1,518 market; ~35% mark-to-market upside</li>
              <li><strong>Irreplaceable Location</strong> — Minutes to University of New Haven, VA Hospital, Yale &amp; downtown New Haven</li>
              <li><strong>Durable Tenant Demand</strong> — Students, medical workers &amp; faculty; Metro-North to NYC at West Haven Station</li>
              <li><strong>Scale &amp; Pride of Ownership</strong> — 19 units, 30+ years of single-family ownership; clean value-add path</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/martin/martin-4.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/martin/martin-8.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <div className="bldg-row"><span className="bldg-label">Address</span><span className="bldg-val">254 Main St &amp; 106&ndash;108 Martin St</span></div>
                <div className="bldg-row"><span className="bldg-label">City / State</span><span className="bldg-val">{CITY_STATE}</span></div>
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Multifamily</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">19 (16 1BR, 3 Studio)</span></div>
                <div className="bldg-row"><span className="bldg-label">Buildings</span><span className="bldg-val">3 (Attached)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.30 Acres</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">15,771 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1940</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">CBD (Central Business District)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">On-Street</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Gas, Hot Water (Owner Paid)</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer</span><span className="bldg-val">Owner Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Style</span><span className="bldg-val">Brick Masonry Apartment</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories</span><span className="bldg-val">3 + Basement</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Flat &middot; Rubber Membrane</span></div>
                <div className="bldg-row"><span className="bldg-label">Interiors</span><span className="bldg-val">Hardwood &amp; Carpet</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">16 &times; 1BR + 3 Studio</span></div>
                <div className="bldg-row"><span className="bldg-label">Avg In-Place Rent</span><span className="bldg-val">$1,123 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">High Achieved</span><span className="bldg-val">$1,207 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma Rent</span><span className="bldg-val">$1,518 / mo</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$2,565,000 ($135K/Unit)</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / SF</span><span className="bldg-val">$163 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">NOI (Current &rarr; PF)</span><span className="bldg-val">$132,994 &rarr; $188,922</span></div>
                <div className="bldg-row"><span className="bldg-label">Cap (Current &rarr; PF)</span><span className="bldg-val">5.18% &rarr; 7.37%</span></div>
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
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: size * 0.2, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: size * 0.068, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>
      )}
    </svg>
  )
}

function ChartCard({ title, data, centerLabel, centerSub, size = 112 }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1 }}>
        <DonutChart data={data} size={size} thickness={Math.round(size * 0.18)} centerLabel={centerLabel} centerSub={centerSub} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5 }}>
              <span style={{ width: 11, height: 11, borderRadius: 2, background: d.color, flexShrink: 0 }} />
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
  const mix = [
    { type: 'One-Bedroom', units: 16, avg: 1142, high: 1235, pf: 1550, monthly: 18275, pfMonthly: 24800 },
    { type: 'Studio', units: 3, avg: 1018, high: 1060, pf: 1350, monthly: 3055, pfMonthly: 4050 },
  ]
  const unitMix = [
    { label: '254 Main Street', value: 7, color: '#3F4753' },
    { label: '108 Martin Street', value: 6, color: '#F8971D' },
    { label: '106 Martin Street', value: 6, color: '#B55D37' },
  ]
  const unitType = [
    { label: 'One-Bedroom', value: 16, color: '#3F4753' },
    { label: 'Studio', value: 3, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix & <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10.5 }}>
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
              <td style={{ textAlign: 'center' }}><strong>19</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,123</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,207</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,518</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$21,330</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$28,850</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 28, marginTop: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="By Building" data={unitMix} centerLabel="19" centerSub="UNITS" size={190} />
          <ChartCard title="Unit Type" data={unitType} centerLabel="19" centerSub="UNITS" size={190} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8, padding: '2px 6px', textAlign: 'right' }
  const tdl = { fontSize: 8, padding: '2px 6px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7, padding: '3px 6px', textAlign: 'right' }
  const thl = { fontSize: 7, padding: '3px 6px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8, padding: '2px 6px', textAlign: 'right' }

  // Shared column geometry so the income + expense tables align column-for-column.
  const Cols = () => (
    <colgroup>
      <col style={{ width: '28%' }} />
      {Array.from({ length: 6 }).map((_, i) => <col key={i} style={{ width: '12%' }} />)}
    </colgroup>
  )

  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 8.5, padding: '3px 6px', textAlign: 'right' }

  const noi = [
    { label: 'NOI — Current', val: '$132,994' },
    { label: 'NOI — Pro Forma', val: '$188,922' },
  ]

  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income & <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 6 }} />

        {/* NOI summary strip (boxless), above the tables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.val}</div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        {/* Rows mirror the Martin I&E workbook exactly — labels, order, and
            which cells carry $/Unit and % values. Blank workbook cells render
            as em-dashes; nothing is computed for display. */}
        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Income</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Gross Potential Rent', '$346,200', '—', '—', '$346,200', '—', '—', false],
              ['Below Market Rent', '-$77,442', '—', '-28.81%', '$0', '—', '0.00%', false],
              ['Gross Scheduled Rent', '$268,758', '—', '—', '$346,200', '—', '—', true],
              ['Vacancy & Collections Loss', '-$13,438', '—', '5.00%', '-$17,310', '—', '5.00%', false],
              ['Effective Rental Income', '$255,320', '—', '—', '$328,890', '—', '—', true],
              ['Application Fees', '$100', '$5', '—', '$100', '$5', '—', false],
              ['Laundry Income', '$1,635', '$86', '—', '$1,635', '$86', '—', false],
              ['Pet Fees', '$2,400', '$126', '—', '$2,400', '$126', '—', false],
              ['Additional Income', '$1,900', '$100', '—', '$1,900', '$100', '—', false],
              ['Total Additional Income', '$6,035', '$318', '—', '$6,035', '$318', '—', true],
            ].map(([label, ...cells], i) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$261,355</td><td style={totBg}>&mdash;</td><td style={totBg}>&mdash;</td><td style={totBg}>$334,925</td><td style={totBg}>&mdash;</td><td style={totBg}>&mdash;</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th><th style={{ ...thr, color: '#fff' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Property Management', '$13,068', '$688', '5.00%', '$16,746', '$881', '5.00%'],
              ['Real Estate Tax', '$43,036', '$2,265', '—', '$57,000', '$3,000', '—'],
              ['Property Insurance', '$18,025', '$949', '—', '$18,025', '$949', '—'],
              ['Electric', '$5,050', '$266', '—', '$5,050', '$266', '—'],
              ['Gas', '$20,372', '$1,072', '—', '$20,372', '$1,072', '—'],
              ['Water and Sewer', '$14,847', '$781', '—', '$14,847', '$781', '—'],
              ['Trash Removal', '$2,962', '$156', '—', '$2,962', '$156', '—'],
              ['Repairs and Maintenance', '$9,500', '$500', '—', '$9,500', '$500', '—'],
              ['Landscaping/Snow Removal', '$1,500', '$79', '—', '$1,500', '$79', '—'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$128,361</td><td style={totBg}>$6,756</td><td style={totBg}>49.11%</td><td style={totBg}>$146,003</td><td style={totBg}>$7,684</td><td style={totBg}>43.59%</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$132,994</td><td style={noiBg}>&mdash;</td><td style={noiBg}>&mdash;</td><td style={noiBg}>$188,922</td><td style={noiBg}>&mdash;</td><td style={noiBg}>&mdash;</td></tr>
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
          <div className="dc-card">
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Brad-B-2-430x488.jpg" alt="Brad Balletto" />
            <div className="dc-name">Brad Balletto</div>
            <div className="dc-title">Managing Director, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1574</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>bballetto@northeastpcg.com</div>
          </div>
          <div className="dc-card">
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Jeff-Wright-430x488.png" alt="Jeff Wright" />
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

/* ═══════════════════ WEST HAVEN COMBINED ═══════════════════ */
function WestHavenCombined({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>West Haven, <span style={{ color: '#F8971D' }}>Connecticut</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Anchored Shoreline Demand</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              West Haven is a dense, transit-served shoreline city of roughly 55,000 on Long Island Sound,
              immediately southwest of New Haven. The Allingtown neighborhood — where 254 Main Street sits — is
              built around two large, stable institutions: the University of New Haven and the VA Connecticut
              medical campus, both within walking distance and both generating steady, year-round housing demand.
              Residents are minutes from the West Haven Metro-North station on the New Haven Line, I-95 and I-91,
              and the Yale-anchored job base of downtown New Haven, while the Savin Rock shoreline — beaches, a
              waterfront boardwalk, and classic seafood institutions — adds genuine lifestyle appeal.
            </p>
            <p>
              For an investor, West Haven is a cash-flow market with a clear, low-risk value-add path. Rents sit
              well below the cost of new construction, and the tenant base is deep and largely non-discretionary —
              students, medical workers, university faculty, and working professionals. With the property's
              long-term, below-market rents, the thesis is straightforward: mark rents to market through light,
              in-unit renovation rather than speculative repositioning, and capture the spread between in-place
              and achievable rents in one of Greater New Haven's most renter-driven submarkets.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About West Haven</div>
          <ul className="highlights ridge-highlights">
            <li>Shoreline city of ~55,000 on Long Island Sound, directly adjacent to New Haven</li>
            <li>Home to the University of New Haven (~7,500 students) and the VA Connecticut Healthcare medical campus</li>
            <li>West Haven Metro-North station on the New Haven Line — direct rail service toward NYC / Grand Central</li>
            <li>Immediate I-95 and I-91 access; roughly 10 minutes to downtown New Haven and Yale</li>
            <li>Savin Rock shoreline — public beaches, a waterfront boardwalk, and waterfront dining</li>
            <li>Deep, non-discretionary renter base: students, medical workers, faculty, and working professionals</li>
            <li>Part of Greater New Haven — one of the Northeast's most diverse and resilient economies, anchored by Yale, Yale New Haven Health, and a growing life-sciences cluster</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/martin/martin-5.jpg" alt="West Haven, CT — aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/martin/martin-3.jpg" alt="254 Main Street, West Haven" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

function NewHavenCounty({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>West Haven in <span style={{ color: '#F8971D' }}>New Haven County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>West Haven sits inside New Haven County — the south-central Connecticut region anchored by the City of New Haven, Yale University, and Yale New Haven Health. The county is home to roughly 863,000 residents and one of the Northeast&rsquo;s most diverse, resilient economies, spanning healthcare and life sciences, higher education, advanced manufacturing, and finance, with an estimated 421,000 jobs. New Haven is a nationally ranked biotech and life-sciences hub, drawing on Yale, Yale New Haven Health, and companies such as Alexion and Arvinas.</p>
            <p>Within that economy, West Haven is a value-oriented, renter-heavy submarket tied directly to two anchor institutions — the University of New Haven and the VA Connecticut medical campus — with quick access to Yale and downtown New Haven. Moderate incomes and a broad renter base are exactly the profile that supports stable occupancy and steady rent growth for well-located workforce housing.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — West Haven vs. New Haven County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>City of West Haven</th>
                  <th style={{ textAlign: 'right' }}>New Haven County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>54,924</td><td style={{ textAlign: 'right' }}>863,305</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>21,538</td><td style={{ textAlign: 'right' }}>336,041</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$61,288</td><td style={{ textAlign: 'right' }}>$74,200</td></tr>
                <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$80,500</td><td style={{ textAlign: 'right' }}>$96,101</td></tr>
                <tr><td>Renter-Occupied</td><td style={{ textAlign: 'right' }}>~46%</td><td style={{ textAlign: 'right' }}>~36%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/martin/martin-6.jpg" alt="West Haven, CT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
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
    <WestHavenCombined />,
    <LocationMap />,
    <NewHavenCounty />,
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
