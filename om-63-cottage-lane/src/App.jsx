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
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
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
    ['Building Size', '4,927 SF'],
    ['Lot Size', '6,950 SF'],
    ['Number of Units', '10'],
    ['Unit Mix', '(4) Studio · (6) 1BR'],
    ['Year Built', '1850'],
    ['Net Operating Income', '$100,003'],
    ['Pro Forma NOI', '$139,128'],
    ['Tenancy', 'All Tenant-at-Will'],
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>Subject to Offer</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Listing Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>10</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Property Overview</div>
            <p style={{ fontSize: 10.6, lineHeight: 1.42, marginBottom: 7 }}>
              Northeast Private Client Group is pleased to present <strong>The Cottage Lane Apartments</strong>, a 10-unit
              multifamily property located at 63 Cottage Lane in downtown Concord, Massachusetts.
            </p>
            <p style={{ fontSize: 10.6, lineHeight: 1.42, marginBottom: 7 }}>
              The property consists of (4) studio units and (6) one-bedroom apartments. Tenant amenities include
              off-street parking and on-site laundry facilities. Tenants are responsible for their own electric, while
              ownership covers gas heat and hot water. The property has been well maintained over the years, including a
              roof replacement in 2013, and lead compliance certificates for all units.
            </p>
            <p style={{ fontSize: 10.6, lineHeight: 1.42, marginBottom: 7 }}>
              Ideally situated near Concord Center, the property offers convenient access to the Concord MBTA Commuter
              Rail station, providing direct service into Cambridge and Downtown Boston. Concord is widely regarded as
              one of Greater Boston&rsquo;s most prestigious suburban communities, known for its top-ranked public
              schools, strong household incomes, and vibrant downtown district featuring boutique retail, cafés,
              restaurants, and local amenities.
            </p>
            <p style={{ fontSize: 10.6, lineHeight: 1.42, marginBottom: 7 }}>
              The combination of limited multifamily inventory, strong rental demand, and high barriers to entry makes 63
              Cottage Lane a compelling long-term investment opportunity in an exceptionally supply-constrained market.
              The Town has also adopted multifamily zoning districts in connection with the Commonwealth&rsquo;s MBTA
              Communities Act, intended to accommodate multifamily residential development at an average density of 15
              units per acre across the district.
            </p>
            <p style={{ fontSize: 10, lineHeight: 1.4, color: 'var(--stone)', fontStyle: 'italic', marginTop: 'auto' }}>
              All interested and qualified parties will have the opportunity to obtain additional information and walk the
              premises upon request.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div style={{ flex: '0 0 46%', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">10-Unit Multifamily (Residential)</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">(4) Studio · (6) 1 Bedroom</span></div>
                <div className="bldg-row"><span className="bldg-label">Building Size</span><span className="bldg-val">4,927 SF (4,950 rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">6,950 SF (±0.16 acres)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1850</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Replaced 2013</span></div>
                <div className="bldg-row"><span className="bldg-label">Frontage</span><span className="bldg-val">Cottage Lane (off Thoreau St)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Owner-Paid · Gas</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant-Paid · Separately Metered</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Landlord Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Laundry</span><span className="bldg-val">On-site coin-op</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Off-street, on-site</span></div>
                <div className="bldg-row"><span className="bldg-label">Roof</span><span className="bldg-val">Replaced 2013</span></div>
                <div className="bldg-row"><span className="bldg-label">Compliance</span><span className="bldg-val">Lead certificates · all units</span></div>
                <div className="bldg-row"><span className="bldg-label">Condition</span><span className="bldg-val">Well maintained · value-add interiors</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Studios</span><span className="bldg-val">4 units · 375–450 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">One-Bedroom</span><span className="bldg-val">6 units · 525–650 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Rent</span><span className="bldg-val">$13,575 / mo · $162,900 / yr</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma Rent</span><span className="bldg-val">$17,150 / mo · $205,800 / yr</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Tenancy &amp; Income</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering</span><span className="bldg-val">Subject to Offer</span></div>
                <div className="bldg-row"><span className="bldg-label">Tenancy</span><span className="bldg-val">All Tenant-at-Will (TAW)</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI</span><span className="bldg-val">$100,003</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$139,128 (+39%)</span></div>
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
/* Full per-unit rent roll — in-place vs pro forma. All ten units are
   tenant-at-will, supporting an immediate mark-to-market. */
function RentRoll({ pageNum }) {
  const rows = [
    { unit: '1B', type: 'Studio', sf: '450', inPlace: '$1,500', ips: '$3.33', pf: '$1,550', pfs: '$3.44' },
    { unit: '2B', type: '1 Bed', sf: '650', inPlace: '$1,200', ips: '$1.85', pf: '$1,800', pfs: '$2.77' },
    { unit: '1D', type: '1 Bed', sf: '550', inPlace: '$1,500', ips: '$2.73', pf: '$1,800', pfs: '$3.27' },
    { unit: '2D', type: 'Studio', sf: '400', inPlace: '$1,025', ips: '$2.56', pf: '$1,600', pfs: '$4.00' },
    { unit: '3D', type: '1 Bed', sf: '550', inPlace: '$1,600', ips: '$2.91', pf: '$1,800', pfs: '$3.27' },
    { unit: '4D', type: '1 Bed', sf: '550', inPlace: '$1,550', ips: '$2.82', pf: '$1,800', pfs: '$3.27' },
    { unit: '1U', type: '1 Bed', sf: '525', inPlace: '$1,400', ips: '$2.67', pf: '$1,800', pfs: '$3.43' },
    { unit: '2U', type: '1 Bed', sf: '525', inPlace: '$1,600', ips: '$3.05', pf: '$1,800', pfs: '$3.43' },
    { unit: '3U', type: 'Studio', sf: '375', inPlace: '$1,200', ips: '$3.20', pf: '$1,600', pfs: '$4.27' },
    { unit: '4U', type: 'Studio', sf: '375', inPlace: '$1,000', ips: '$2.67', pf: '$1,600', pfs: '$4.27' },
  ]
  const unitMix = [
    { label: 'Studio', value: 4, color: '#3F4753' },
    { label: '1 Bedroom', value: 6, color: '#F8971D' },
  ]
  const grossRent = [
    { label: 'In-Place', value: 162900, color: '#3F4753' },
    { label: 'Pro Forma', value: 205800, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10 }}>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Bed Type</th>
              <th style={{ textAlign: 'right' }}>SF</th>
              <th style={{ textAlign: 'right' }}>In-Place / mo</th>
              <th style={{ textAlign: 'right' }}>$/SF</th>
              <th style={{ textAlign: 'right' }}>Pro Forma / mo</th>
              <th style={{ textAlign: 'right' }}>$/SF</th>
              <th style={{ textAlign: 'right' }}>Lease</th>
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
                <td style={{ textAlign: 'right' }}>TAW</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>10 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>4,950</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$13,575</strong></td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
              <td style={{ textAlign: 'right' }}><strong>$17,150</strong></td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
              <td style={{ textAlign: 'right' }}>&mdash;</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8.5, color: 'var(--stone)', marginTop: 6, lineHeight: 1.45 }}>
          Monthly scheduled rent totals $13,575 in place ($162,900 annually) and $17,150 pro forma ($205,800 annually) &mdash;
          a $42,900 (26%) increase. All ten units are tenant-at-will (TAW), positioning a new owner to mark rents to market
          immediately. Ownership pays gas heat and hot water; tenants pay their own electric. On-site coin-op laundry adds
          ancillary income.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 28, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Units by Type" data={unitMix} centerLabel="10" centerSub="UNITS" size={170} />
          <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={grossRent} note="+$42,900 · +26% upside · all tenant-at-will" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 8.6, padding: '3px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.6, padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.6, padding: '3.5px 7px', textAlign: 'right' }
  const thl = { fontSize: 7.6, padding: '3.5px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.6, padding: '3px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '16.5%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Current (In-Place)', val: '$100,003' },
    { label: 'NOI — Pro Forma', val: '$139,128' },
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
              ['Gross Scheduled Rent', '$162,900', '$16,290', '$205,800', '$20,580', true],
              ['Vacancy & Collections Loss', '-$6,516', '-$652', '-$8,232', '-$823', false],
              ['Laundry / Other Income', '$2,000', '$200', '$2,000', '$200', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$158,384</td><td style={totBg}>$15,838</td><td style={totBg}>$199,568</td><td style={totBg}>$19,957</td></tr>
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
              ['Real Estate Taxes', '$17,835', '$1,784', '$17,835', '$1,784'],
              ['Insurance', '$9,715', '$972', '$9,715', '$972'],
              ['Water & Sewer', '$4,130', '$413', '$4,130', '$413'],
              ['Electric (Common)', '$1,449', '$145', '$1,449', '$145'],
              ['Gas (Heat & Hot Water)', '$4,749', '$475', '$4,749', '$475'],
              ['Repairs & Maintenance', '$5,000', '$500', '$5,000', '$500'],
              ['Snow & Landscaping', '$4,092', '$409', '$4,092', '$409'],
              ['Property Management (5%)', '$7,819', '$782', '$9,878', '$988'],
              ['Trash Removal', '$3,224', '$322', '$3,224', '$322'],
              ['Fire Alarm / Security', '$367', '$37', '$367', '$37'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$58,381</td><td style={totBg}>$5,838</td><td style={totBg}>$60,440</td><td style={totBg}>$6,044</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$100,003</td><td style={noiBg}>$10,000 / Unit</td><td style={noiBg}>$139,128</td><td style={noiBg}>$13,913 / Unit</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 3, lineHeight: 1.4 }}>
          Current reflects in-place rents with a 4% vacancy/collection-loss factor plus ~$2,000 of coin-op laundry income;
          Pro Forma marks all ten tenant-at-will units to market (+$42,900 gross scheduled rent). Ownership pays gas heat and
          hot water; tenants pay their own electric. Property management at 5% of EGI and the vacancy factor are underwriting
          assumptions. Expense ratio 36.9% (Current) / 30.3% (Pro Forma); $/Unit on 10 units. The property is offered Subject
          to Offer.
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
function UnderwritingNotes({ pageNum }) {
  const assumptions = [
    { v: '$100,003', l: 'In-Place NOI' },
    { v: '$139,128', l: 'Pro Forma NOI' },
    { v: '+39%', l: 'NOI Growth' },
    { v: '10 Units · 4,927 SF', l: 'Scale' },
  ]
  const notes = [
    {
      head: 'Going-In Basis',
      body: 'Offered Subject to Offer. The asset produces $100,003 of in-place NOI and $139,128 pro forma — value scales with each bidder’s target return. With ten tenant-at-will units in supply-constrained Concord, the income is positioned to step up quickly post-close.',
    },
    {
      head: 'Rental Income',
      body: 'In-place scheduled rent of $162,900 ($13,575/mo) marks to $205,800 ($17,150/mo) at market — a $42,900 (26%) lift. Studios move toward ~$1,575 and one-bedrooms toward ~$1,800, levels well supported by Concord’s tight, high-income rental market.',
    },
    {
      head: 'All Tenant-at-Will',
      body: 'Every unit is tenant-at-will, so a new owner can reset rents to market immediately — no fixed-term leases delay the repositioning, and turnover can be sequenced to fund light renovations.',
    },
    {
      head: 'Operating Expenses',
      body: 'Taxes ($17,835), insurance ($9,715), and owner-paid gas heat & hot water ($4,749) are carried at actuals; tenants pay their own electric. Water, sewer, trash, snow, and landscaping are held at recent actuals, and R&M is normalized to $5,000.',
    },
    {
      head: 'Management & Vacancy',
      body: 'Management is underwritten at 5% of effective gross income, with a 4% vacancy/collection-loss factor in both columns and ~$2,000 of annual coin-op laundry income. The resulting expense ratio is 36.9% (Current) and 30.3% (Pro Forma).',
    },
    {
      head: 'Condition & Upside',
      body: 'The property is well maintained — roof replaced in 2013, lead compliance certificates for all units — with a clear value-add path to renovate and re-tenant studios and one-bedrooms at premium Concord rents. The MBTA Communities Act zoning adds long-term optionality.',
    },
  ]
  const half = Math.ceil(notes.length / 2)
  const cols = [notes.slice(0, half), notes.slice(half)]
  const noiBridge = [
    { label: 'In-Place', value: 100003, color: '#3F4753' },
    { label: 'Pro Forma', value: 139128, color: '#F8971D' },
  ]
  const Note = (n) => (
    <div key={n.head} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 14 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 6 }}>{n.head}</div>
      <p style={{ fontSize: 10.8, lineHeight: 1.55, color: 'var(--graphite)' }}>{n.body}</p>
    </div>
  )
  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Underwriting <span style={{ color: '#F8971D' }}>Notes</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
          The notes below explain how each line of the Income &amp; Expense schedule is derived. Current reflects actual
          operations; the pro forma reflects achievable, market-supported rents on the property&rsquo;s entirely
          tenant-at-will rent roll.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
          {assumptions.map(a => (
            <div key={a.l} style={{ textAlign: 'center', borderTop: '3px solid var(--golden)', padding: '7px 2px' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{a.v}</div>
              <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{a.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, flex: 1, minHeight: 0 }}>
          {cols.map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {col.map(Note)}
            </div>
          ))}
        </div>

        <div style={{ flexShrink: 0, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 9 }}>
            Net Operating Income — In-Place vs Pro Forma
          </div>
          {noiBridge.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 7 }}>
              <span style={{ flex: '0 0 64px', fontSize: 10.5, fontWeight: 700, color: 'var(--carbon)' }}>{d.label}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: `${(d.value / 139128) * 100}%`, height: 18, background: d.color, borderRadius: 3 }} />
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
          <div className="section-title" style={{ marginBottom: 2 }}>Concord <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>A historic, affluent town 20 miles northwest of Boston on the MBTA Commuter Rail.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11, lineHeight: 1.6, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p>
              Concord, Massachusetts, is a historic and picturesque town located about 20 miles northwest of Boston,
              renowned for its central role in early American history and its deep literary heritage. Best known as the
              site of the opening battles of Lexington and Concord, the town is rich with preserved landmarks such as the
              Old North Bridge and Minute Man National Historical Park. Its scenic setting along the Concord River,
              combined with tree-lined roads, colonial homes, and expansive conservation land, creates a quintessential
              New England landscape, and its charming town center features boutique shops, cafés, galleries, and historic
              buildings.
            </p>
            <p>
              Concord has long been a hub of intellectual and cultural life, once home to Ralph Waldo Emerson, Henry
              David Thoreau, and Louisa May Alcott. Their legacy lives on through sites like Walden Pond and Orchard
              House, as well as the town&rsquo;s continued emphasis on education, literature, and the arts. Today,
              Concord maintains a strong sense of community, supported by top-rated schools, local events, and a
              commitment to preserving its natural and historical resources &mdash; a timeless, enriching environment
              just outside of Boston.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 'auto', paddingTop: 16, marginBottom: 8 }}>About Concord</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.6, lineHeight: 1.7 }}>
            <li>~20 miles northwest of Boston</li>
            <li>MBTA Fitchburg Line &mdash; direct rail to Cambridge &amp; Boston</li>
            <li>Top-ranked Concord &amp; Concord-Carlisle public schools</li>
            <li>Walden Pond, Old North Bridge &amp; Minute Man NHP</li>
            <li>Literary heritage &mdash; Emerson, Thoreau, Alcott</li>
            <li>High household incomes &middot; very limited multifamily supply</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/assembly.jpg" alt="Downtown Concord" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/aerial-2.jpg" alt="Concord aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    { label: 'Concord & MetroWest', items: 'Emerson Hospital, the Concord and Concord-Carlisle school districts, the Town of Concord, Welch’s (Concord HQ), and the town’s boutique retail and hospitality base.' },
    { label: 'Route 128 / I-95 Corridor (~20 min)', items: 'The region’s technology and life-science ring — Raytheon, MathWorks, MIT Lincoln Laboratory, and the Waltham / Burlington / Lexington office and lab cluster.' },
    { label: 'Cambridge / Boston (via Commuter Rail)', items: 'MIT, Harvard, and the Kendall Square biotech cluster — Moderna, Biogen, Novartis — plus downtown Boston’s financial, healthcare, and consulting core.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Greater Boston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Concord sits in Middlesex County — the most populous county in New England — among Greater Boston&rsquo;s
            most affluent and tightly held western suburbs. Median incomes are roughly $170,000, the public schools rank
            among the state&rsquo;s best, and homeownership is high while multifamily stock is scarce. That combination
            of strong demand, high barriers to entry, and very limited rental supply keeps well-located apartments like
            Cottage Lane in persistent demand, with the MBTA Fitchburg Line tying residents directly to the region&rsquo;s
            knowledge-economy jobs.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Concord vs. Middlesex County</div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Concord</th>
                <th style={{ textAlign: 'right' }}>Middlesex County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population (est.)</td><td style={{ textAlign: 'right' }}>~18,800</td><td style={{ textAlign: 'right' }}>~1.63M</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~6,600</td><td style={{ textAlign: 'right' }}>~620,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$170,000</td><td style={{ textAlign: 'right' }}>~$120,000</td></tr>
              <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>~46</td><td style={{ textAlign: 'right' }}>~38</td></tr>
              <tr><td>Renter-Occupied (est.)</td><td style={{ textAlign: 'right' }}>~20%</td><td style={{ textAlign: 'right' }}>~38%</td></tr>
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
            <img src="/photos/aerial-4.jpg" alt="Concord & Greater Boston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
        { head: 'Rents Well Below Market', body: 'In-place rents average ~$1,358/mo and mark to ~$1,715 pro forma, lifting gross rent 26% from $162,900 to $205,800 and NOI 39% from $100,003 to $139,128.' },
        { head: 'Entirely Tenant-at-Will', body: 'All ten units are tenant-at-will, allowing a new owner to reposition rents to market immediately — no long-term leases in place.' },
        { head: 'Value-Add Interiors', body: 'A mix of original and updated studios and one-bedrooms offers a clear path to renovate and re-tenant at premium Concord rents.' },
        { head: 'Efficient Studio & 1BR Mix', body: 'Ten small, in-demand units (4 studios, 6 one-bedrooms) spread risk and capture strong demand for attainable rentals in an affluent town.' },
      ],
    },
    {
      title: 'Location & Market',
      items: [
        { head: 'Downtown Concord at the Commuter Rail', body: 'Steps from Concord Center and the MBTA Fitchburg Line station — direct service to Cambridge (Porter) and North Station, Boston.' },
        { head: 'Prestigious, Supply-Constrained Suburb', body: 'Concord is among Greater Boston’s most prestigious towns — top-ranked schools, high incomes, and very limited multifamily inventory.' },
        { head: 'High Barriers to Entry', body: 'Scarce multifamily stock and strict development controls protect existing rentals and underpin durable, long-term demand.' },
        { head: 'MBTA Communities Act Upside', body: 'Concord has adopted multifamily zoning districts (~15 units/acre) under the Commonwealth’s MBTA Communities Act — long-term optionality.' },
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
    <UnderwritingNotes />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/assembly.jpg" />,
    <CityOverview />,
    <LocationMap />,
    // Annotated drone aerial — subject pin + Concord context labels. Fine-tune
    // pin/label positions by dragging in `npm run dev`, then paste back here.
    <FullBleed
      image="/photos/aerial-1.jpg"
      pin={{ x: 46, y: 56, label: 'Subject Property' }}
      streets={[{ x: 28, y: 62, label: 'Thoreau St · Cottage Lane', arrow: 135 }]}
      markers={[
        { cat: 'Transit', color: '#E67E22', name: 'Concord Station', note: 'MBTA Fitchburg Line · commuter rail', x: 60, y: 40, arrow: 90 },
        { cat: 'Landmark', color: '#F8971D', name: 'Concord Center', note: 'Downtown · dining & retail', x: 62, y: 22, arrow: 45 },
      ]}
    />,
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
