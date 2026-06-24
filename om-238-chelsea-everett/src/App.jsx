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
    ['Gross Building Size', '16,500 SF'],
    ['Lot Size', '0.34 Acres (14,810 SF)'],
    ['Number of Units', '26'],
    ['Year Built', '1970'],
    ['Price / SF', '$439'],
    ['Price / Unit', '$278,846'],
    ['Cap Rate', '5.08%'],
    ['Pro Forma Cap Rate', '7.77%'],
    ['Net Operating Income', '$368,028'],
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$7,250,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Listing Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>26</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            <div className="eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Property Overview</div>
            <p style={{ fontSize: 11.2, lineHeight: 1.5, marginBottom: 9 }}>
              Northeast Private Client Group is pleased to present the <strong>Chelsea Street Apartments</strong> located
              at 238 Chelsea Street in Everett, MA.
            </p>
            <p style={{ fontSize: 11.2, lineHeight: 1.5, marginBottom: 9 }}>
              Directly north of Boston, in close proximity to Route 1 with easy access to the MBTA (Orange Line) and
              Chelsea Train Station, this fully de-leaded 3-story brick building built in 1970 sits on a 0.34-acre
              (14,810 SF) lot. It consists of (20) studio apartments and (6) one-bedroom units. Tenants enjoy off-street
              parking and coin-op laundry. The property is located less than two miles from Encore Boston Harbor and down
              the street from new developments including The Pioneer, Jade, and Anthem Everett.
            </p>
            <p style={{ fontSize: 11.2, lineHeight: 1.5, marginBottom: 9 }}>
              With in-place rents well below market, the offering presents a compelling value-add opportunity to mark
              the rent roll to market through turnover and light renovation in one of Greater Boston&rsquo;s
              fastest-changing, most supply-constrained submarkets.
            </p>
            <p style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--stone)', fontStyle: 'italic', marginTop: 'auto' }}>
              All interested and qualified parties will have an opportunity to tour the property during scheduled
              appointments and obtain additional information.
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
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">26-Unit Multifamily (Residential)</span></div>
                <div className="bldg-row"><span className="bldg-label">Unit Mix</span><span className="bldg-val">(20) Studio · (6) 1 Bedroom</span></div>
                <div className="bldg-row"><span className="bldg-label">Gross Building Size</span><span className="bldg-val">16,500 SF (16,525 rentable)</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.34 Acres (14,810 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built</span><span className="bldg-val">1970</span></div>
                <div className="bldg-row"><span className="bldg-label">Construction</span><span className="bldg-val">3-story brick · fully de-leaded</span></div>
                <div className="bldg-row"><span className="bldg-label">Frontage</span><span className="bldg-val">Chelsea Street, Everett</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heat / Hot Water</span><span className="bldg-val">Owner-Paid · Gas</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Common areas owner-paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer / Trash</span><span className="bldg-val">Landlord Paid</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Construction &amp; Systems</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Stories</span><span className="bldg-val">Three</span></div>
                <div className="bldg-row"><span className="bldg-label">Exterior</span><span className="bldg-val">Brick</span></div>
                <div className="bldg-row"><span className="bldg-label">Laundry</span><span className="bldg-val">On-site coin-op</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">Off-street, on-site</span></div>
                <div className="bldg-row"><span className="bldg-label">Lead</span><span className="bldg-val">Fully de-leaded</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Studios</span><span className="bldg-val">20 units · 600–700 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">One-Bedroom</span><span className="bldg-val">6 units · 675–700 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place Rent</span><span className="bldg-val">$44,522 / mo · $534,264 / yr</span></div>
                <div className="bldg-row"><span className="bldg-label">Market Rent</span><span className="bldg-val">$62,610 / mo · $751,320 / yr</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Offering Price</span><span className="bldg-val">$7,250,000</span></div>
                <div className="bldg-row"><span className="bldg-label">Price / Unit · / SF</span><span className="bldg-val">$278,846 · $439 / SF</span></div>
                <div className="bldg-row"><span className="bldg-label">In-Place NOI</span><span className="bldg-val">$368,028 · 5.08% cap</span></div>
                <div className="bldg-row"><span className="bldg-label">Pro Forma NOI</span><span className="bldg-val">$562,969 · 7.77% cap</span></div>
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
/* 26-unit rent roll — in-place vs market rent, split into two side-by-side
   tables (units 1–13 / 14–26) with a full-width totals bar. */
function RentRoll({ pageNum }) {
  const rows = [
    ['1', 'Studio', '600', '$1,750', '$2,359'], ['2', 'One Bed', '700', '$1,990', '$2,475'],
    ['3', 'Studio', '700', '$1,700', '$2,475'], ['4', 'Studio', '700', '$1,750', '$2,475'],
    ['5', 'Studio', '600', '$1,750', '$2,359'], ['6', 'Studio', '600', '$1,750', '$2,359'],
    ['7', 'Studio', '600', '$1,450', '$2,359'], ['8', 'One Bed', '700', '$1,990', '$2,475'],
    ['9', 'Studio', '600', '$1,750', '$2,359'], ['10', 'One Bed', '675', '$1,750', '$2,475'],
    ['11', 'Studio', '600', '$1,750', '$2,359'], ['12', 'Studio', '675', '$1,750', '$2,475'],
    ['13', 'Studio', '600', '$1,700', '$2,359'], ['14', 'Studio', '600', '$1,700', '$2,359'],
    ['15', 'Studio', '600', '$1,690', '$2,359'], ['16', 'One Bed', '675', '$1,990', '$2,475'],
    ['17', 'Studio', '600', '$1,750', '$2,359'], ['18', 'One Bed', '675', '$1,322', '$2,475'],
    ['19', 'Studio', '600', '$1,700', '$2,359'], ['20', 'Studio', '600', '$1,750', '$2,359'],
    ['21', 'Studio', '600', '$1,750', '$2,359'], ['22', 'Studio', '675', '$1,300', '$2,475'],
    ['23', 'Studio', '600', '$1,750', '$2,359'], ['24', 'One Bed', '675', '$1,990', '$2,475'],
    ['25', 'Studio', '675', '$1,350', '$2,475'], ['26', 'Studio', '600', '$1,650', '$2,359'],
  ]
  const left = rows.slice(0, 13)
  const right = rows.slice(13)
  const th = { fontSize: 8.5, padding: '5px 6px', textAlign: 'left', color: '#fff' }
  const thr = { ...th, textAlign: 'right' }
  const td = { fontSize: 9, padding: '3px 6px', textAlign: 'left', color: 'var(--graphite)' }
  const tdr = { ...td, textAlign: 'right' }
  const Half = ({ data }) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <colgroup><col style={{ width: '14%' }} /><col style={{ width: '28%' }} /><col style={{ width: '16%' }} /><col style={{ width: '21%' }} /><col style={{ width: '21%' }} /></colgroup>
      <thead>
        <tr style={{ background: 'var(--carbon)' }}>
          <th style={th}>Unit</th><th style={th}>Type</th><th style={thr}>SF</th><th style={thr}>Rent</th><th style={thr}>Market</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={r[0]} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
            <td style={{ ...td, fontWeight: 700, color: 'var(--carbon)' }}>{r[0]}</td>
            <td style={td}>{r[1]}</td><td style={tdr}>{r[2]}</td><td style={tdr}>{r[3]}</td><td style={tdr}>{r[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Roll</span></div>
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <Half data={left} />
          <Half data={right} />
        </div>
        {/* Full-width totals bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
          {[
            ['26', 'Total Units (20 Studio · 6 1BR)'],
            ['16,525 SF', 'Total Rentable Area'],
            ['$534,264', 'In-Place Gross Rent / yr'],
            ['$751,320', 'Market Gross Rent / yr (+41%)'],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '8px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 7.8, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 8.6, color: 'var(--stone)', marginTop: 'auto', paddingTop: 12, lineHeight: 1.5 }}>
          In-place rents total $44,522/mo ($534,264 annually) against market of $62,610/mo ($751,320 annually) — a
          $217,056 (41%) mark-to-market opportunity. The rent roll is granular across 26 small, in-demand units that
          lease quickly; below-market rents reset to market through natural turnover and light renovation. Tenants enjoy
          off-street parking and on-site coin-op laundry.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
function IncomeExpense({ pageNum }) {
  const tds = { fontSize: 9, padding: '3.5px 7px', textAlign: 'right' }
  const tdl = { fontSize: 9, padding: '3.5px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 8, padding: '4px 7px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 7px', textAlign: 'left' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9, padding: '3.5px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9.5, padding: '4.5px 7px', textAlign: 'right' }

  const Cols = () => (
    <colgroup>
      <col style={{ width: '32%' }} />
      {Array.from({ length: 4 }).map((_, i) => <col key={i} style={{ width: '17%' }} />)}
    </colgroup>
  )

  const noi = [
    { label: 'NOI — Year 1 (Current)', val: '$368,028' },
    { label: 'NOI — Year 2 (Pro Forma)', val: '$562,969' },
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
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Year 2</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Gross Potential Rents', '$534,264', '$20,549', '$751,320', '$28,897', true],
              ['Vacancy & Collections Loss', '-$10,685', '-$411', '-$22,540', '-$867', false],
            ].map(([label, ...cells]) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={bold ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$523,579</td><td style={totBg}>$20,138</td><td style={totBg}>$728,780</td><td style={totBg}>$28,030</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 4, tableLayout: 'fixed' }}>
          <Cols />
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ ...thl, color: '#fff' }}>Expense</th>
              <th style={{ ...thr, color: '#fff' }}>Year 1</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
              <th style={{ ...thr, color: '#fff' }}>Year 2</th><th style={{ ...thr, color: '#fff' }}>$/Unit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Property Management (5%)', '$26,179', '$1,007', '$36,439', '$1,402'],
              ['Real Estate Tax', '$42,114', '$1,620', '$42,114', '$1,620'],
              ['Insurance', '$18,705', '$719', '$18,705', '$719'],
              ['Electric', '$4,061', '$156', '$4,061', '$156'],
              ['Water & Sewer', '$14,634', '$563', '$14,634', '$563'],
              ['Gas', '$18,833', '$724', '$18,833', '$724'],
              ['Repairs & Maintenance', '$13,000', '$500', '$13,000', '$500'],
              ['Payroll & Contract Services', '$13,000', '$500', '$13,000', '$500'],
              ['Trash Removal', '$5,025', '$193', '$5,025', '$193'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$155,551</td><td style={totBg}>$5,983</td><td style={totBg}>$165,811</td><td style={totBg}>$6,377</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$368,028</td><td style={noiBg}>5.08% Cap</td><td style={noiBg}>$562,969</td><td style={noiBg}>7.77% Cap</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.8, color: 'var(--stone)', marginTop: 4, lineHeight: 1.4 }}>
          Year 1 is the current rent roll annualized with stabilized occupancy and expenses; Year 2 marks rents to
          market (+$217,056 gross rent). Caps on the $7,250,000 offering price. Expense ratio 29.7% (Yr 1) / 22.7% (Yr 2);
          $/Unit on 26 units. Property management at 5% of EGI and the 2% / 3% vacancy factors are underwriting
          assumptions and may differ from current owner operations.
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
    { v: '$7,250,000', l: 'Offering Price' },
    { v: '$278,846', l: 'Price / Unit' },
    { v: '$439 / SF', l: 'Price / SF' },
    { v: '5.08% → 7.77%', l: 'Cap: Yr 1 → Yr 2' },
  ]
  const notes = [
    {
      head: 'Going-In Basis',
      body: 'At $7,250,000 the offering prices to $278,846 per unit and $439/SF — a 5.08% going-in cap on $368,028 of Year-1 NOI and a 7.77% pro forma cap on Year-2 NOI of $562,969. A fully de-leaded, 26-unit brick building four miles from downtown Boston and minutes from Encore.',
    },
    {
      head: 'Rental Income',
      body: 'In-place rents average ~$1,712/mo against market of ~$2,408. Marking the rent roll to market lifts gross rent from $534,264 to $751,320 — a $217,056 (41%) increase — and grows NOI by 53%.',
    },
    {
      head: 'Below-Market Mark-to-Market',
      body: 'Current rents range $1,322–$1,990 against $2,359–$2,475 market. The spread is the core value-add, achievable through natural turnover and light renovation across many small, fast-leasing units — no major repositioning required.',
    },
    {
      head: 'Operating Expenses',
      body: 'Real estate tax ($42,114), insurance ($18,705), and owner-paid gas, electric, water/sewer, and trash are carried at actuals. Repairs & maintenance and payroll / contract services are normalized to $500/unit each; management at 5% of EGI.',
    },
    {
      head: 'Management & Vacancy',
      body: 'Management is underwritten at 5% of effective gross income, with a 2% vacancy/collection-loss factor in Year 1 and 3% in Year 2. The resulting expense ratio is 29.7% (Year 1) and 22.7% (Year 2) — efficient operations for a 26-unit asset.',
    },
    {
      head: 'Condition & Location',
      body: 'A fully de-leaded 1970 brick building — a meaningful compliance advantage in Massachusetts — less than two miles from Encore Boston Harbor and down the street from the Lower Broadway development pipeline (The Pioneer, Jade, Anthem) reshaping the Everett submarket.',
    },
  ]
  const half = Math.ceil(notes.length / 2)
  const cols = [notes.slice(0, half), notes.slice(half)]
  const noiBridge = [
    { label: 'Year 1', value: 368028, color: '#3F4753' },
    { label: 'Year 2', value: 562969, color: '#F8971D' },
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
          The notes below explain how each line of the Income &amp; Expense schedule is derived. Year 1 reflects the
          current rent roll annualized with stabilized occupancy; Year 2 reflects achievable, market-supported rents on
          the building&rsquo;s deeply below-market rent roll.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
          {assumptions.map(a => (
            <div key={a.l} style={{ textAlign: 'center', borderTop: '3px solid var(--golden)', padding: '7px 2px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{a.v}</div>
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
            Net Operating Income — Year 1 vs Year 2
          </div>
          {noiBridge.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 7 }}>
              <span style={{ flex: '0 0 64px', fontSize: 10.5, fontWeight: 700, color: 'var(--carbon)' }}>{d.label}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: `${(d.value / 562969) * 100}%`, height: 18, background: d.color, borderRadius: 3 }} />
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
    { name: 'Francis Saenz', title: 'Vice President, Investments', phone: '(857) 990-6803', email: 'fsaenz@northeastpcg.com', photo: '/photos/team/francis-saenz.jpg' },
    { name: 'Jim Casey', title: 'Senior Associate', phone: '(857) 990-6821', email: 'jcasey@northeastpcg.com', photo: '/photos/team/jim-casey.jpg' },
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
        <div style={{ flex: '0 0 52%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Everett <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>A fast-growing urban city just north of Boston, home to Encore Boston Harbor.</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.6, lineHeight: 1.55, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p>
              Everett, Massachusetts is a bustling urban community located just north of Boston in Middlesex County.
              Known for its diverse population and energetic atmosphere, Everett blends residential neighborhoods with a
              strong commercial and industrial presence. Its proximity to Boston makes it a convenient location for
              commuters, while still offering its own identity and local charm — a mix of historic homes, newer
              developments, and vibrant business districts that reflects its growth over time.
            </p>
            <p>
              In addition to its residential appeal, Everett has become a destination for entertainment and dining. The
              city is home to Encore Boston Harbor, a world-class resort and casino that has brought renewed attention
              and economic activity to the area. Everett also features a variety of restaurants, breweries, and shops,
              and its parks and green spaces provide residents with room to relax despite the urban setting.
            </p>
            <p>
              Everett continues to attract new residents and businesses thanks to its location, amenities, and ongoing
              development. The city has invested in infrastructure and community programs to support growth while
              maintaining its neighborhood feel — a dynamic lifestyle that blends tradition with progress just outside
              Boston.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 'auto', paddingTop: 14, marginBottom: 8 }}>About Everett</div>
          <ul className="highlights ridge-highlights" style={{ fontSize: 10.4, lineHeight: 1.6 }}>
            <li>Just north of Boston in Middlesex County</li>
            <li>Home to Encore Boston Harbor (resort &amp; casino)</li>
            <li>MBTA Orange Line + Chelsea commuter rail / Silver Line</li>
            <li>Route 1, Tobin Bridge &amp; I-93 access</li>
            <li>Lower Broadway pipeline — The Pioneer, Jade, Anthem</li>
            <li>Dense, supply-constrained urban rental market</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-1.jpg" alt="Encore Boston Harbor, Everett" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="Boston skyline from Everett" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    { label: 'Everett & Encore', items: 'Encore Boston Harbor — the region’s largest single-site employer (5,000+ jobs) — plus the Lower Broadway development pipeline and Everett’s industrial and logistics base along the Mystic River.' },
    { label: 'Cambridge / Kendall Square (~15 min)', items: 'MIT, Harvard, and the Kendall Square biotech cluster — Moderna, Biogen, Novartis — the densest life-science corridor in the country.' },
    { label: 'Downtown Boston (~15 min)', items: 'Mass General Brigham, State Street, John Hancock, and the downtown financial, government, and healthcare core, reached via Route 1 and the Orange Line.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Greater Boston <span style={{ color: '#F8971D' }}>Overview</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
            <p>Everett sits in Middlesex County — the most populous county in New England — in Greater Boston&rsquo;s dense,
            transit-served inner core. The city is a majority-renter market with household incomes below the county
            average, deep rental demand, and very limited new supply of attainable apartments. With Encore Boston Harbor
            and the Lower Broadway development wave driving jobs and investment, well-located rentals like Chelsea Street
            Apartments sit in persistent, durable demand.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Everett vs. Middlesex County</div>
          <table className="data-table" style={{ fontSize: 10.3, marginBottom: 11 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Everett</th>
                <th style={{ textAlign: 'right' }}>Middlesex County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population (est.)</td><td style={{ textAlign: 'right' }}>~49,000</td><td style={{ textAlign: 'right' }}>~1.63M</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~18,000</td><td style={{ textAlign: 'right' }}>~620,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$70,000</td><td style={{ textAlign: 'right' }}>~$120,000</td></tr>
              <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>~36</td><td style={{ textAlign: 'right' }}>~38</td></tr>
              <tr><td>Renter-Occupied (est.)</td><td style={{ textAlign: 'right' }}>~63%</td><td style={{ textAlign: 'right' }}>~38%</td></tr>
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
            <img src="/photos/area-2.jpg" alt="Boston skyline" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/aerial-2.jpg" alt="Everett & Greater Boston" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
        { head: 'Rents 40%+ Below Market', body: 'Marking rents from an average ~$1,712 to ~$2,408 lifts gross rent from $534,264 to $751,320 — a $217,056 (41%) increase.' },
        { head: 'Pro Forma Cap of 7.77%', body: 'Stabilized Year-2 NOI of $562,969 prices to a 7.77% cap — a 269 bps step-up from the 5.08% going-in cap.' },
        { head: 'Granular 26-Unit Rent Roll', body: 'Twenty studios and six one-bedrooms spread risk across many small, in-demand units that lease quickly in a tight market.' },
        { head: 'Mark-to-Market on Turnover', body: 'Below-market in-place rents reset to market through natural turnover and light renovation — no major repositioning required.' },
      ],
    },
    {
      title: 'Asset Quality & Location',
      items: [
        { head: 'Fully De-Leaded', body: 'A fully de-leaded 1970 brick building — a meaningful compliance and operating advantage in Massachusetts.' },
        { head: 'Minutes from Encore Boston Harbor', body: 'Less than two miles from the region’s largest single-site employer and entertainment destination.' },
        { head: 'Transit & Highway Access', body: 'MBTA Orange Line at Wellington & Assembly, the Chelsea commuter-rail / Silver Line station, and Route 1 / I-93 to downtown Boston.' },
        { head: 'Everett Growth Story', body: 'Down the street from the Lower Broadway development pipeline (The Pioneer, Jade, Anthem) reshaping the submarket.' },
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
    <Divider eyebrow="03" title="Location & Market" image="/photos/aerial-1.jpg" />,
    <CityOverview />,
    <LocationMap />,
    // Annotated drone aerial — subject pin + context labels. Fine-tune positions
    // by dragging in `npm run dev`, then paste back here.
    <FullBleed
      image="/photos/aerial-1.jpg"
      pin={{ x: 46, y: 60, label: 'Subject Property' }}
      markers={[
        { cat: 'Landmark', color: '#F8971D', name: 'Downtown Boston', note: '~4 miles · ~15 minutes', x: 60, y: 14, arrow: 0 },
        { cat: 'Landmark', color: '#884EA0', name: 'Encore Boston Harbor', note: '< 2 miles', x: 30, y: 22, arrow: 0 },
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
