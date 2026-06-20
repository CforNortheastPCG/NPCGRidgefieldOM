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
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
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
            <p style={{ fontSize: 11.4, lineHeight: 1.45, marginBottom: 8 }}>
              Northeast Private Client Group is pleased to present <strong>South End Plaza</strong>, a 17-unit
              mixed-use retail and apartment property at {ADDR} in Thomaston, Connecticut, offered at $2,450,000.
              Built in 1971, the two-story building holds about 14,614 SF on a 0.77-acre parcel, with seven
              ground-floor commercial suites (5,973 SF) below ten second-floor apartments (7,750 SF) that have
              private rear ground-level access. An on-site asphalt lot of roughly 10,000 SF sits less than a mile
              from Route 8 (Exits 38 and 39).
            </p>
            <p style={{ fontSize: 11.4, lineHeight: 1.45, marginBottom: 8 }}>
              The property is 88.2% occupied. Two small commercial suites are vacant (~1,000 SF combined) and
              available for immediate lease-up. The April 30, 2026 rent roll shows apartments leased $1,300&ndash;$1,600
              a month and occupied commercial suites averaging ~$14.20/SF against the $17.50&ndash;$20 underwritten on
              renewal, with several commercial leases expiring in 2026. Tenants include Thomaston Smoke &amp; Vape,
              KC&rsquo;s Package Store, Elegant Nail &amp; Spa, and S &amp; S Laundry, with two leases in place since
              2011 and 2013.
            </p>
            <p style={{ fontSize: 11.4, lineHeight: 1.5, marginBottom: 8 }}>
              The property presents a compelling value-add mixed-use opportunity with multiple paths to grow revenue.
              A new buyer can lease the two vacant commercial suites, bring residential and commercial rents to levels
              established by the market, and recover more of the water and sewer cost through CAM &mdash; moving
              normalized in-place NOI of about $158,400 (a 6.47% going-in cap) toward roughly $191,443, about 7.81%.
            </p>
            <p style={{ fontSize: 11.4, lineHeight: 1.5, color: 'var(--stone)' }}>
              The tax basis is stable. Thomaston completed its town-wide revaluation in 2025, which fixes the
              property&rsquo;s assessed value through the next revaluation in 2030, and Connecticut does not reassess on
              sale, so the assessment will not step up at closing.
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Mixed-Use Retail &amp; Apartment</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">17 (10 residential · 7 commercial)</span></div>
                <div className="bldg-row"><span className="bldg-label">Building SF</span><span className="bldg-val">14,614 gross (13,723 rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.77 Acres</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1971</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">GC – General Commercial</span></div>
                <div className="bldg-row"><span className="bldg-label">Traffic Count</span><span className="bldg-val">12,800 VPD (South Main St)</span></div>
                <div className="bldg-row"><span className="bldg-label">Parcel ID</span><span className="bldg-val">M0186700 (Map-Block-Lot 48-02-20)</span></div>
                <div className="bldg-row"><span className="bldg-label">Occupancy</span><span className="bldg-val">88.2%</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Forced hot air (unit) / [TO CONFIRM]</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Common areas LL; individually metering</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Landlord paid</span></div>
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
                <div className="bldg-row"><span className="bldg-label">A/C / Laundry</span><span className="bldg-val">[TO CONFIRM] / On-site laundry</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Residential</span><span className="bldg-val">10 apartments · 7,750 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Commercial</span><span className="bldg-val">7 suites · 5,973 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Apartment Rents</span><span className="bldg-val">$1,300–$1,600 / mo</span></div>
                <div className="bldg-row"><span className="bldg-label">Commercial (occ.)</span><span className="bldg-val">~$14.20/SF → $17.50–$20</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$2,450,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / Unit · / SF</span><span className="bldg-val">$144,100 · $168 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI (Norm.)</span><span className="bldg-val">$158,400 · 6.47% cap</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$191,443 · 7.81% cap</span></div>
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
    { comp: 'Apartments', count: '10 units', inPlace: '$175,800', pf: '$196,800', note: 'Avg $1,465/mo → $1,640 pro forma · private rear access' },
    { comp: 'Commercial Retail', count: '7 suites', inPlace: '$84,900', pf: '$106,300', note: 'Suites 4 & 6 vacant (~500 SF ea.) · mark to $17.50–$20/SF' },
  ]
  const useMix = [
    { label: 'Apartments', value: 10, color: '#3F4753' },
    { label: 'Commercial Suites', value: 7, color: '#F8971D' },
  ]
  const grossRent = [
    { label: 'In-Place', value: 260700, color: '#3F4753' },
    { label: 'Pro Forma', value: 303100, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent Roll & <span style={{ color: '#F8971D' }}>Lease-Up</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11 }}>
          <thead><tr><th>Income Component</th><th style={{ textAlign: 'center' }}>Count</th><th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Pro Forma</th><th>Notes</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.comp}</td>
                <td style={{ textAlign: 'center' }}>{r.count}</td>
                <td style={{ textAlign: 'right' }}>{r.inPlace}</td>
                <td style={{ textAlign: 'right' }}>{r.pf}</td>
                <td style={{ fontSize: 9.5, color: 'var(--stone)' }}>{r.note}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td style={{ textAlign: 'center' }}><strong>17 units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$260,700</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$303,100</strong></td>
              <td style={{ fontSize: 9.5, color: 'var(--stone)' }}>Gross scheduled rent · 88.2% occ. (Apr 30, 2026)</td>
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
/* Summary income statement — T12 → Current (normalized in-place) → Pro Forma.
   Real estate taxes and insurance were escrowed in the T12 and normalized in
   the Current/Pro Forma columns; the full line-item schedule (electric,
   water/sewer, trash, management, etc., held at recent actuals) lives in the
   BOV / data room. NOI and cap figures are those carried in the underwriting. */
function IncomeExpense({ pageNum }) {
  const tdl = { fontSize: 9, padding: '3px 8px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tds = { fontSize: 9, padding: '3px 8px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 8px', textAlign: 'left', color: '#fff' }
  const thr = { fontSize: 8, padding: '4px 8px', textAlign: 'right', color: '#fff' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '3px 8px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '4px 8px', textAlign: 'right' }
  const capBg = { background: 'var(--linen)', color: 'var(--carbon)', fontWeight: 700, fontSize: 9, padding: '3px 8px', textAlign: 'right' }

  const noi = [
    { label: 'T12 NOI', val: '$184,718' },
    { label: 'In-Place (Normalized) NOI', val: '$158,400' },
    { label: 'Pro Forma NOI', val: '$191,443' },
  ]

  const income = [
    ['Effective Rental Income', '$255,705', '$251,910', '$282,610'],
    ['Other Income', '$15,779', '$15,779', '$15,779'],
  ]
  const expenses = [
    ['Real Estate Taxes', 'escrowed³', '$30,719', '$30,719'],
    ['Property Insurance', 'escrowed³', '$14,375', '$14,375'],
    ['Repairs & Maintenance', '$21,357', '$7,307', '$7,307'],
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
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$271,484</td><td style={totBg}>$267,689&sup1;</td><td style={totBg}>$298,389&sup2;</td></tr>
          </tbody>
        </table>
        {/* Operating expenses — full width */}
        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses — Normalized</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6, tableLayout: 'fixed' }}>
          <Cols /><Head first="Expense" />
          <tbody>
            {expenses.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Operating Expense</td><td style={totBg}>$86,766</td><td style={totBg}>$109,289</td><td style={totBg}>$106,946</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$184,718</td><td style={noiBg}>$158,400</td><td style={noiBg}>$191,443</td></tr>
            <tr><td style={{ ...capBg, textAlign: 'left' }}>Cap Rate on $2,450,000</td><td style={capBg}>&mdash;</td><td style={capBg}>6.47%</td><td style={capBg}>7.81%</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7, color: 'var(--stone)', marginBottom: 8, lineHeight: 1.4 }}>
          <sup>1</sup> Current (normalized in-place) holds the two vacant commercial suites and applies a 5%
          residential vacancy and collection loss, with the now-set taxes and insurance loaded in. <sup>2</sup> Pro Forma EGI = pro
          forma effective rental income + other income held at T12 actuals. <sup>3</sup> RE taxes and insurance
          were escrowed in the T12 and normalized thereafter. <sup>4</sup> Electric, water &amp; sewer, trash, and
          landscaping &amp; snow removal held at 2025 actuals across all periods; management underwritten at 5% of
          EGI. See the BOV / data room for the full schedule.
        </div>

        {/* Underwriting notes — full width, two columns */}
        <div className="eyebrow" style={{ marginBottom: 6, fontSize: 9 }}>Underwriting Notes</div>
        <div style={{ columns: 2, columnGap: 26, fontSize: 9.2, lineHeight: 1.5, color: 'var(--graphite)', flex: 1, minHeight: 0 }}>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Going-in basis.</strong> At $2,450,000 the offering prices to $144,100 per unit and $168/SF — a 6.47% going-in cap on normalized in-place NOI and a 7.81% pro forma cap, with room to grow rents across both the residential and commercial income streams.</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Rental income.</strong> Current normalized rental income of $251,910 applies a 5% residential vacancy and holds the two vacant commercial suites. Pro forma marks commercial rents to $17.50&ndash;$20/SF and lifts the ten apartments from an average $1,465 toward $1,640, raising effective rental income to $282,610 (residential $175,800 &rarr; $196,800; commercial $84,900 &rarr; $106,300).</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Commercial lease-up &amp; mark-to-market.</strong> Suites 4 and 6 (~500 SF each) are underwritten at $15/SF. Occupied suites mark from ~$14.20 toward $17.50&ndash;$20 on 2026 rollover, raising gross scheduled commercial rent from ~$84,900 to ~$106,300, with added upside from raising CAM water recovery.</p>
          <p style={{ breakInside: 'avoid', marginBottom: 8 }}><strong>Taxes, insurance &amp; R&amp;M.</strong> Taxes ($30,719) and insurance ($14,375) were escrowed in the T12 and normalized in the Current/Pro Forma columns. Taxes reflect the 2025 town-wide revaluation at the now-set Grand List mill rate of 27.21; Connecticut does not reassess on sale, so the assessment is fixed through the 2030 revaluation and will not step up at closing. R&amp;M ran high in the T12 ($21,357) and is normalized to $7,307 ($0.50/SF). Management is underwritten at 5% of EGI.</p>
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

          <div style={{ fontSize: 11.6, lineHeight: 1.62, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <p>
              South End Plaza sits on South Main Street in Thomaston, in the Naugatuck Valley, less than a mile from
              Route 8 (Exits 38 and 39) — south to Waterbury (10&ndash;15 min) and the shoreline, north to Torrington.
              U.S. Route 6 runs through downtown. Thomaston is a historic mill town named for the clockmaker Seth
              Thomas, whose factory helped bring the Naugatuck Railroad through the valley; its walkable downtown
              centers on the 1884 Thomaston Opera House, still the town hall and home to the Landmark Community
              Theatre, and the Railroad Museum of New England runs heritage excursions from the historic Thomaston Station.
            </p>
            <p>
              The borough is reinvesting in its center — Sustainable CT certification, Naugatuck River Greenway
              construction, Seth Thomas Park renovations, and a stated focus on housing and economic development.
              Thomaston is not itself a Metro-North stop; the nearest station is the Waterbury Branch terminus about
              nine miles south, connecting to the New Haven Line toward New York. A Litchfield County town of about
              7,500 with median household income near $92,000 — in line with the Connecticut median — and a stable
              owner-occupied base, its affordability, highway access, and limited new multifamily supply support
              steady rental demand for well-run product.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 'auto', paddingTop: 16, marginBottom: 8 }}>About Thomaston</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.6, lineHeight: 1.7 }}>
            <li>Population ~7,500 · ~3,100 households</li>
            <li>Median HH income ~$92,000 — in line with the CT median</li>
            <li>Average HH income ~$111,200</li>
            <li>Less than 1 mile from Route 8 (Exits 38 &amp; 39)</li>
            <li>U.S. Route 6 runs through downtown</li>
            <li>Working manufacturing base (metalworking, defense, packaging)</li>
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
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Litchfield County <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 12 }}>
            <p style={{ marginBottom: 8 }}>Thomaston sits on the southeastern edge of Litchfield County, in the industrial Naugatuck Valley along the Route 8 corridor with Torrington to the north. The county occupies the northwest corner of Connecticut and is among the state&rsquo;s higher-income counties, with a median household income of about $106,300, above the Connecticut median; its northwest reaches are rural and recreation-oriented. The county economy spans precision manufacturing, healthcare, and tourism, and draws on the nearby Waterbury and Hartford job markets.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Thomaston vs. County</div>
          <table className="data-table" style={{ fontSize: 10.5, marginBottom: 14 }}>
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

          <div className="eyebrow" style={{ marginBottom: 8 }}>Major Area Employers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{g.label}</div>
                <div style={{ fontSize: 9.6, lineHeight: 1.5, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/aerial-2.jpg" alt="Litchfield County" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  const items = [
    { head: 'Residential Rents Below Achievable Levels', body: 'The ten apartments average $1,465 a month against $1,540 already achieved and $1,640 pro forma, lifting residential rent from $175,800 to $196,800 as units turn — each with private rear ground-level access.' },
    { head: 'Commercial Lease-Up & Mark-to-Market', body: 'Leasing the two vacant suites and marking occupied rents from about $14.20 toward $17.50 to $20 per square foot moves commercial rent from about $84,900 to about $106,300, with added upside from raising CAM water recovery.' },
    { head: 'Diversified Residential & Commercial Income', body: 'Ten apartments and seven commercial suites split the rent roll between residential and retail demand — both below market — in a single 17-unit building on 0.77 acres.' },
    { head: 'Established, Service-Oriented Commercial Tenancy', body: 'A smoke and vape shop, package store, nail salon, and laundromat anchor the retail, with two leases dating to 2011 and 2013 and limited online competition.' },
    { head: 'Route 8 & Naugatuck Valley Location', body: 'Less than a mile from Route 8 at Exits 38 and 39, with about 12,800 vehicles per day at the frontage and Waterbury — and its Metro-North terminus — 10 to 15 minutes south.' },
    { head: 'Basis of $168 per Square Foot', body: 'At $168 per square foot against $300-plus all-in construction cost, the building trades at about 56% of replacement cost — $144,100 per unit at the offering price.' },
    { head: 'Assessment Set Through the 2025 Revaluation', body: 'Thomaston’s 2025 revaluation fixes the assessment through 2030, and Connecticut does not reassess on sale, so taxes will not step up at closing.' },
  ]
  const thumbs = ['/photos/apt-1.jpg', '/photos/comm-1.jpg', '/photos/ext-1.jpg', '/photos/comm-2.jpg', '/photos/aerial-1.jpg', '/photos/ext-2.jpg', '/photos/aerial-2.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        {/* Highlight cards — each paired with a property photo, stretched to fill the page */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', columnGap: 20, rowGap: 12, minHeight: 0, paddingTop: 4 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, minHeight: 0, alignItems: 'center', gridColumn: i === 6 ? '1 / -1' : 'auto' }}>
              <img src={thumbs[i]} alt="" style={{ flex: '0 0 118px', width: 118, height: 118, objectFit: 'cover', borderRadius: 5, display: 'block' }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3, lineHeight: 1.2 }}>{it.head}</div>
                <p style={{ fontSize: 8.4, lineHeight: 1.4, color: 'var(--graphite)' }}>{it.body}</p>
              </div>
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
