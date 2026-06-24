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
import FullBleed from './FullBleed.jsx'
import { NEARBY } from './nearbyPois.js'
import { AERIAL_MARKERS } from './aerialMarkers.js'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      {/* photo-hero → mild print lift (not the strong dark-scrim cover lift), so
          the bright sky in the cover photo doesn't blow out. */}
      <div className="cover-hero photo-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Gradient hugs only the BOTTOM of the frame — the upper ~half stays fully
            bright, sunny and green; the dark is concentrated low to seat the text. */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '46%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 38%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, bottom: 44, top: 'auto', textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.02, marginBottom: 8 }}>{DEAL.name}</div>
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$2,450,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>17</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <p style={{ fontSize: 11.9, lineHeight: 1.5, marginBottom: 10 }}>
              Northeast Private Client Group is pleased to present <strong>South End Plaza</strong>, a 17-unit
              mixed-use retail and apartment property at {ADDR} in Thomaston, Connecticut, offered at $2,450,000.
              Built in 1971, the two-story building totals about 14,614 square feet on a 0.77-acre parcel, with seven
              ground-floor commercial suites below ten second-floor apartments that have private rear ground-level
              access. An on-site asphalt lot of roughly 10,000 square feet sits less than a mile from Route 8 at
              Exits 38 and 39.
            </p>
            <p style={{ fontSize: 11.9, lineHeight: 1.5, marginBottom: 10 }}>
              The apartment rents currently run between $1,300 and $1,600 a month, and the occupied commercial suites
              average about $14.20 per square foot. The commercial tenants are Thomaston Smoke &amp; Vape, KC&rsquo;s
              Package Store, Elegant Nail &amp; Spa, and S &amp; S Laundry. Two of the commercial leases date to 2011
              and 2013.
            </p>
            <p style={{ fontSize: 11.9, lineHeight: 1.5, marginBottom: 10 }}>
              The tax basis is stable. Thomaston completed its town-wide revaluation in 2025, which fixes the
              property&rsquo;s assessed value through the next revaluation in 2030, and Connecticut does not reassess on
              sale, so the assessment will not step up at closing.
            </p>
            <p style={{ fontSize: 11.9, lineHeight: 1.5, marginBottom: 10 }}>
              The property presents a compelling value-add mixed-use opportunity with multiple paths to grow revenue.
              A new buyer can lease the two vacant commercial suites, bring residential and commercial rents to levels
              established by the market, and recover more of the water and sewer cost through CAM.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/aerial-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/storefront-1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use Retail &amp; Apartment</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">17 (10 residential · 7 commercial)</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">14,614 gross (13,723 rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.77 Acres</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1971</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">GC – General Commercial</span></div>
                <div className="bldg-row"><span className="bldg-label">Traffic Count</span><span className="bldg-val">12,800 VPD (South Main St)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parcel ID</span><span className="bldg-val">M0186700 (Map-Block-Lot 48-02-20)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Tenant-Paid · Electric (apts), Gas HW (retail)</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Common Areas LL · Units Individually Metered</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Landlord Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Foundation / Frame</span><span className="bldg-val">Concrete · wood frame</span></div>
                <div className="bldg-row"><span className="bldg-label">Exterior</span><span className="bldg-val">Brick &amp; block (retail) / frame (apartments)</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Pitched · asphalt shingle</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">On-site ±10,000 SF asphalt</span></div>
                <div className="bldg-row"><span className="bldg-label">Laundry</span><span className="bldg-val">On-site laundromat (S &amp; S Laundry)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Residential</span><span className="bldg-val">3× 1BR (600 SF) · 7× 2BR (850 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Commercial</span><span className="bldg-val">7 suites · 5,973 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Apartment Rents</span><span className="bldg-val">1BR ~$1,333 · 2BR ~$1,521 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">Commercial (occ.)</span><span className="bldg-val">~$14.20/SF</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$2,450,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / Unit · / SF</span><span className="bldg-val">$144,100 · $168 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI (Norm.)</span><span className="bldg-val">$158,400 · 6.47% cap</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$196,491 · 8.02% cap</span></div>
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

/* Mixed-use rent roll — gross scheduled commercial rent vs apartment ranges,
   in-place vs pro forma. Per-suite/per-unit detail lives in the BOV / data room. */
function RentRoll({ pageNum }) {
  const rows = [
    { comp: '1BR / 1BA Apartments', count: '3 units', inPlace: '$48,000', pf: '$54,000', note: '600 SF · avg $1,333/mo → $1,500 pro forma' },
    { comp: '2BR / 1BA Apartments', count: '7 units', inPlace: '$127,800', pf: '$142,800', note: '850 SF · avg $1,521/mo → $1,700 pro forma' },
    { comp: 'Commercial Retail', count: '7 suites', inPlace: '$84,900', pf: '$106,300', note: 'Suites 4 & 6 vacant (~500 SF ea.) · mark to $17.50–$20/SF' },
  ]
  const useMix = [
    { label: '1BR Apartments', value: 3, color: '#3F4753' },
    { label: '2BR Apartments', value: 7, color: '#7C8896' },
    { label: 'Commercial Suites', value: 7, color: '#F8971D' },
  ]
  const grossRent = [
    { label: 'In-Place', value: 260700, color: '#3F4753' },
    { label: 'Pro Forma', value: 303100, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Unit Mix" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit <span style={{ color: '#F8971D' }}>Mix</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11 }}>
          <thead><tr><th>Income Component</th><th style={{ textAlign: 'center' }}>Count</th><th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Pro Forma</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.comp}</td>
                <td style={{ textAlign: 'center' }}>{r.count}</td>
                <td style={{ textAlign: 'right' }}>{r.inPlace}</td>
                <td style={{ textAlign: 'right' }}>{r.pf}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td style={{ textAlign: 'center' }}><strong>17 units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$260,700</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$303,100</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8.5, color: 'var(--stone)', marginTop: 6, lineHeight: 1.45 }}>
          Figures are gross scheduled rent (annual); the ten apartments average $1,465/mo in place. Tenants include
          Thomaston Smoke &amp; Vape, KC&rsquo;s Package Store, Elegant Nail &amp; Spa, S &amp; S Laundry, and a Suite 9
          service tenant; two leases date to 2011 and 2013. Water and sewer is landlord-paid and partly recovered
          through CAM, with room to raise recovery. Effective and normalized figures appear on the Income &amp;
          Expense page; per-suite and per-unit detail is in the data room.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 40, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Units by Use" data={useMix} centerLabel="17" centerSub="UNITS" size={170} />
          <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={grossRent} note="+$42,400 · +16% residential & commercial upside" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
/* Income statement — Current (in-place) vs Pro Forma, each with a $/Unit column
   (17 units). Gross scheduled rent → vacancy → effective rental → EGI, then the
   full itemized operating-expense schedule and the NOI / cap. */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.5, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'right' }
  const thl = { fontSize: 7.5, padding: '3.5px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Current (In-Place)', val: '$158,400' },
    { label: 'NOI — Pro Forma', val: '$196,491' },
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
              <th style={{ ...thr, color: '#fff' }}>Current</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Pro Forma</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Residential Scheduled Rent', '$175,800', '$10,341', '$196,800', '$11,576', false],
              ['Commercial Scheduled Rent', '$84,900', '$4,994', '$106,278', '$6,252', false],
              ['Gross Scheduled Rent', '$260,700', '$15,335', '$303,078', '$17,828', true],
              ['Vacancy & Collections Loss', '-$8,790', '-$517', '-$15,154', '-$891', false],
              ['Effective Rental Income', '$251,910', '$14,818', '$287,924', '$16,937', true],
              ['CAM Reimbursement (Water/Sewer)', '$12,822', '$754', '$16,905', '$994', false],
              ['Other Income (fees, pet, etc.)', '$6,068', '$357', '$6,068', '$357', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$270,800</td><td style={totBg}>$15,929</td><td style={totBg}>$310,897</td><td style={totBg}>$18,288</td></tr>
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
              ['Real Estate Taxes', '$30,719', '$1,807', '$30,719', '$1,807'],
              ['Property Management (5% of EGI)', '$13,540', '$796', '$15,545', '$914'],
              ['Property Insurance', '$14,375', '$846', '$14,375', '$846'],
              ['Water & Sewer', '$28,175', '$1,657', '$28,175', '$1,657'],
              ['Electric (Common)', '$3,064', '$180', '$3,064', '$180'],
              ['Trash Removal', '$7,060', '$415', '$7,060', '$415'],
              ['Repairs & Maintenance', '$7,307', '$430', '$7,307', '$430'],
              ['Landscaping / Snow', '$8,160', '$480', '$8,160', '$480'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$112,401</td><td style={totBg}>$6,612</td><td style={totBg}>$114,406</td><td style={totBg}>$6,730</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$158,400</td><td style={noiBg}>6.47% Cap</td><td style={noiBg}>$196,491</td><td style={noiBg}>8.02% Cap</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 2, lineHeight: 1.4 }}>
          Current reflects in-place rents with a 5% residential vacancy and holds the two vacant commercial suites;
          Pro Forma marks commercial rents to $17.50&ndash;$20/SF and apartments to market (+$36,014/yr effective rental
          income) and grows CAM water/sewer recovery. Expense ratio 41.5% (Current) / 36.8% (Pro Forma); $/Unit on 17
          units. Caps on the $2,450,000 asking price. Real estate taxes reflect the 2025 revaluation (27.21 mill rate);
          property management and the 5% vacancy are underwriting assumptions and may differ from current owner operations.
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10 }}>
          <span style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--golden)' }}>
            Underwriting notes &amp; assumptions &mdash; see next page &rarr;
          </span>
          <span style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ UNDERWRITING NOTES ═══════════════════ */
/* Companion page to the Income & Expense schedule — the narrative behind the
   numbers, in a left/right two-column layout, with a key-assumptions strip. */
function UnderwritingNotes({ pageNum }) {
  const assumptions = [
    { v: '$2,450,000', l: 'Offering Price' },
    { v: '$144,100', l: 'Price / Unit' },
    { v: '$168 / SF', l: 'Price / SF' },
    { v: '6.47% → 8.02%', l: 'Cap: In-Place → Pro Forma' },
  ]
  const notes = [
    {
      head: 'Going-In Basis',
      body: 'At $2,450,000 the offering prices to $144,100 per unit and $168/SF — a 6.47% going-in cap on normalized in-place NOI of $158,400 and an 8.02% pro forma cap on $196,491. At $168/SF against $300-plus all-in construction, the building trades at roughly 56% of replacement cost.',
    },
    {
      head: 'Rental Income',
      body: 'Current effective rental income of $251,910 applies a 5% residential vacancy and holds the two vacant commercial suites. Pro forma marks commercial rents to $17.50–$20/SF and lifts the ten apartments from an average $1,465 toward $1,640, raising effective rental income to $287,924 (residential $175,800 → $196,800; commercial $84,900 → $106,300).',
    },
    {
      head: 'Commercial Lease-Up & Mark-to-Market',
      body: 'Suites 4 and 6 (~500 SF each) are underwritten at $15/SF. Occupied suites mark from ~$14.20 toward $17.50–$20/SF on 2026 rollover, raising gross scheduled commercial rent from ~$84,900 to ~$106,300 — with several commercial leases expiring in 2026.',
    },
    {
      head: 'CAM & Expense Recovery',
      body: 'Water and sewer is landlord-paid and partly recovered from commercial tenants through CAM. Recovery grows from ~$12,800 to ~$16,900 as the vacant suites lease and occupied suites roll, with further upside available by raising CAM recovery toward full pass-through.',
    },
    {
      head: 'Taxes, Insurance & R&M',
      body: 'Taxes ($30,719) and insurance ($14,375) were escrowed by ownership and are carried at actuals. Taxes reflect the 2025 town-wide revaluation at the now-set 27.21 mill rate; Connecticut does not reassess on sale, so the assessment is fixed through the 2030 revaluation and will not step up at closing. R&M is normalized to $7,307 ($0.50/SF).',
    },
    {
      head: 'Management & Operating Assumptions',
      body: 'Management is underwritten at 5% of EGI and a 5% residential vacancy/collection-loss factor is applied in both columns. Electric, water & sewer, trash, and landscaping & snow removal are held at recent actuals. The resulting expense ratio is 41.5% (Current) and 36.8% (Pro Forma).',
    },
  ]
  const half = Math.ceil(notes.length / 2)
  const cols = [notes.slice(0, half), notes.slice(half)]
  const noiBridge = [
    { label: 'In-Place', value: 158400, color: '#3F4753' },
    { label: 'Pro Forma', value: 196491, color: '#F8971D' },
  ]
  const Note = (n) => (
    <div key={n.head} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 14 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 6 }}>{n.head}</div>
      <p style={{ fontSize: 10.8, lineHeight: 1.6, color: 'var(--graphite)' }}>{n.body}</p>
    </div>
  )
  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Underwriting <span style={{ color: '#F8971D' }}>Notes</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
          The notes below explain how each line of the Income &amp; Expense schedule is derived. Both columns are built
          from actual operations; the pro forma reflects achievable, market-supported rents and stabilized expenses.
        </div>

        {/* Key-assumptions strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
          {assumptions.map(a => (
            <div key={a.l} style={{ textAlign: 'center', borderTop: '3px solid var(--golden)', padding: '7px 2px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{a.v}</div>
              <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{a.l}</div>
            </div>
          ))}
        </div>

        {/* Notes — two columns, left/right; cards distribute to fill the page height */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, flex: 1, minHeight: 0 }}>
          {cols.map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {col.map(Note)}
            </div>
          ))}
        </div>

        {/* Compact value-creation strip — headline NOI growth, in-place → pro forma. */}
        <div style={{ flexShrink: 0, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 9 }}>
            Net Operating Income — In-Place vs Pro Forma
          </div>
          {noiBridge.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 7 }}>
              <span style={{ flex: '0 0 64px', fontSize: 10.5, fontWeight: 700, color: 'var(--carbon)' }}>{d.label}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: `${(d.value / 196491) * 100}%`, height: 18, background: d.color, borderRadius: 3 }} />
              </div>
              <span style={{ flex: '0 0 76px', textAlign: 'right', fontSize: 12, fontWeight: 800, color: 'var(--carbon)' }}>${d.value.toLocaleString()}</span>
            </div>
          ))}
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
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Thomaston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>A historic Litchfield County mill town on the Naugatuck River.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11, lineHeight: 1.62, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <p>
              South End Plaza sits on South Main Street in Thomaston, in the Naugatuck Valley. The property is less
              than a mile from Route 8 (Exits 38 and 39), the expressway that runs the length of the valley. Route 8
              connects south to Waterbury in 10 to 15 minutes and on toward Bridgeport and the shoreline, and north
              toward Torrington. U.S. Route 6 runs through Thomaston&rsquo;s Main Street, east to Bristol and southwest
              to Watertown.
            </p>
            <p>
              Thomaston is a historic mill town named for the clockmaker Seth Thomas, whose factory helped bring the
              Naugatuck Railroad through the valley. Its walkable downtown centers on the 1884 Thomaston Opera House,
              which still serves as the town hall and home to the Landmark Community Theatre. The Railroad Museum of
              New England runs heritage excursions from the historic Thomaston Station. The town keeps a working
              manufacturing base in metalworking, electronics, defense, and packaging.
            </p>
            <p>
              The borough is reinvesting in its center, with Sustainable CT certification, Naugatuck River Greenway
              construction, Seth Thomas Park renovations, and a stated focus on housing and economic development.
              Thomaston is not itself a Metro-North stop. The nearest station is the Waterbury Branch terminus about
              nine miles south, which connects to the New Haven Line toward New York.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 'auto', paddingTop: 16, marginBottom: 8 }}>About Thomaston</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.6, lineHeight: 1.7 }}>
            <li>Population ~7,500 · ~3,100 households</li>
            <li>Median HH income ~$92,000 — in line with the CT median</li>
            <li>Average HH income ~$111,200</li>
            <li>Less than 1 mile from Route 8 (Exits 38 &amp; 39)</li>
            <li>U.S. Route 6 runs through downtown</li>
            <li>Working manufacturing base (metalworking, electronics, defense, packaging)</li>
            <li>Downtown reinvestment: Greenway, Seth Thomas Park, Sustainable CT</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-1.jpg" alt="Thomaston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="Thomaston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    { label: 'Thomaston', items: 'Thomaston Savings Bank (headquartered in town), Stewart EFI (precision components), Ward Leonard / Fairbanks Morse Defense, ECI Screenprint, and Plymouth Glass & Mirror.' },
    { label: 'Greater Waterbury (~10 min south)', items: "Waterbury Hospital, Saint Mary’s Hospital (Trinity Health), Webster Bank, MacDermid, Post University, UConn Waterbury, and the City of Waterbury." },
    { label: 'Torrington & Upper Valley (~15 min north)', items: 'Charlotte Hungerford Hospital (Hartford HealthCare), O&G Industries (headquartered in Torrington), Northwestern CT Community College, and the City of Torrington.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Litchfield County <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Thomaston sits on the southeastern edge of Litchfield County, in the industrial Naugatuck Valley along the Route 8 corridor with Torrington to the north. The county occupies the northwest corner of Connecticut and is among the state&rsquo;s higher-income counties, with a median household income of about $106,300, above the Connecticut median; its northwest reaches are rural and recreation-oriented. Along the Route 8 spine, Thomaston, Watertown, and Torrington form a contiguous manufacturing and commuter belt that feeds Greater Waterbury and, via I-84, the Hartford and Danbury markets, with limited new multifamily construction keeping well-maintained rentals in steady demand.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Thomaston vs. County</div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Thomaston</th>
                <th style={{ textAlign: 'right' }}>Litchfield County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population (2024 est.)</td><td style={{ textAlign: 'right' }}>7,492</td><td style={{ textAlign: 'right' }}>186,992</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>3,097</td><td style={{ textAlign: 'right' }}>77,719</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$91,967</td><td style={{ textAlign: 'right' }}>$106,288</td></tr>
              <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$111,200</td><td style={{ textAlign: 'right' }}>$149,638</td></tr>
              <tr><td>Homeownership (est.)</td><td style={{ textAlign: 'right' }}>~76%</td><td style={{ textAlign: 'right' }}>~76%</td></tr>
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
            <img src="/photos/litchfield-hills.jpg" alt="Litchfield Hills, Litchfield County, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/county-river.jpg" alt="Naugatuck River with fall foliage, Litchfield County, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  // Two text boxes (4 highlights left, 3 right) placed diagonally, with two
  // photos on the opposite diagonal → a 2×2 checkerboard: text · photo / photo · text.
  const boxes = [
    {
      title: 'Income & Lease-Up Upside',
      items: [
        { head: 'Residential Rents Below Achievable Levels', body: 'Apartments average $1,465 against $1,540 already achieved and $1,640 pro forma, lifting residential rent from $175,800 to $196,800.' },
        { head: 'Commercial Lease-Up and Mark-to-Market', body: 'Leasing two vacant suites and marking occupied rents from $14.20 toward $17.50 to $20 moves commercial rent from $84,900 to $106,300, with added upside from raising CAM water recovery.' },
        { head: 'Diversified Residential and Commercial Income', body: 'Ten apartments and seven commercial suites split the rent roll between residential and retail demand, both below market, in one 17-unit building on 0.77 acres.' },
        { head: 'Established, Service-Oriented Commercial Tenancy', body: 'A smoke and vape shop, package store, nail salon, and laundromat anchor the retail, with two leases dating to 2011 and 2013 and limited online competition.' },
      ],
    },
    {
      title: 'Location, Basis & Tax',
      items: [
        { head: 'Route 8 and Naugatuck Valley Location', body: 'Less than a mile from Route 8 at Exits 38 and 39, with about 12,800 vehicles per day at the frontage and Waterbury 10 to 15 minutes south.' },
        { head: 'Basis of $168 per Square Foot', body: 'At $168 per square foot against $300-plus all-in construction cost, the building trades at about 56% of replacement cost.' },
        { head: 'Assessment Set Through the 2025 Revaluation', body: 'Thomaston’s 2025 revaluation fixes the assessment through 2030, and Connecticut does not reassess on sale, so taxes will not step up at closing.' },
      ],
    },
  ]
  const photos = ['/photos/comm-1.jpg', '/photos/aerial-5.png']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        {/* 2×2 checkerboard — text box · photo (top), photo · text box (bottom).
            Each text box holds 4 highlights; cells stretch to fill the page. */}
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
            return [TextBox(boxes[0], 'tl'), PhotoBox(photos[0], 'tr'), PhotoBox(photos[1], 'bl'), TextBox(boxes[1], 'br', { headSize: 12.5, bodySize: 11, justify: 'flex-start', gap: 14 })]
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
    <Divider eyebrow="01" title="The Property" image="/photos/ext-1.jpg" />,
    <BuildingDescriptions />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ext-2.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <UnderwritingNotes />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/aerial-1.jpg" />,
    <CityOverview />,
    <LocationMap />,
    // Annotated drone aerials — placed right after the Location & Amenities map.
    // bleed-1: drone looking NORTH up South Main St — downtown ahead.
    <FullBleed
      image="/photos/bleed-1.jpg"
      pin={{ x: 31.8, y: 80, label: 'Subject Property' }}
      streets={[{ x: 43.7, y: 52.7, label: 'South Main Street · US Route 6', arrow: 180 }]}
      pois={[
        ...NEARBY['bleed-1'],
      ]}
      shields={[{ x: 91.8, y: 28.4, route: '8' }]}
      markers={[
        { cat: 'Landmark', color: '#F8971D', name: 'Downtown Thomaston', x: 50.1, y: 31.5, arrow: 180, side: 'left' },
        { cat: 'Dining & Coffee', color: '#C0392B', n: 3, name: 'Clocktown Brewing Co.', note: 'Brewery + wood-fired pizza · Seth Thomas clock factory', x: 60.1, y: 43.3, arrow: 180 },
        { cat: 'Banks, Retail & Employers', color: '#884EA0', n: 1, name: 'Thomaston Savings Bank (Main Office)', note: 'Local bank HQ · downtown', x: 51.4, y: 33.6, logo: '/logos/markers/thomastonsavingsbank-com.png', arrow: 180 },
        { cat: 'Banks, Retail & Employers', color: '#884EA0', n: 2, name: 'Webster Bank', note: 'Regional bank branch · downtown', x: 47.3, y: 36.6, logo: '/logos/markers/websterbank-com.png', side: 'left', arrow: 135 },
      ]}
    />,
    // bleed-2: drone over the property looking SOUTH down South Main St.
    <FullBleed
      image="/photos/bleed-2.jpg"
      pin={{ x: 69.2, y: 75.6, label: 'Subject Property' }}
      streets={[{ x: 41.3, y: 55.5, label: 'South Main Street · US Route 6', arrow: 180 }]}
      pois={[...NEARBY['bleed-2']]}
      shields={[{ x: 25.2, y: 27.2, route: '8' }]}
      markers={[
        { cat: 'Dining & Coffee', color: '#C0392B', n: 2, name: 'Hometown Pizza III', note: 'Pizzeria / Italian · near the site', x: 36.6, y: 80.3, side: 'top', arrow: 180 },
        { cat: 'Dining & Coffee', color: '#C0392B', n: 5, name: "Dunkin'", note: 'Coffee · drive-thru · S Main corridor', x: 31.5, y: 34.4, arrow: 180 },
        { cat: 'Grocery & Pharmacy', color: '#1E8449', n: 2, name: 'Walgreens', note: 'Drugstore / pharmacy · S Main', x: 25.3, y: 38, arrow: 180, side: 'left' },
        { cat: 'Transit', color: '#E67E22', n: 1, name: 'Bus Stop — South Main St', note: 'CTtransit · NB & SB stops', x: 50.5, y: 63.9, arrow: 180 },
      ]}
    />,
    <DriveTimeMap />,
    <CountyOverview />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/aerial-2.jpg" />,
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
