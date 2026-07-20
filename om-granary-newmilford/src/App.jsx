import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import LocationMap from './LocationMap.jsx'
import { PhotoPage, FloorPlansPage } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'
import { DRAFT } from './deal.js'

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '78%', height: '72%', background: 'radial-gradient(130% 110% at 0% 100%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0) 82%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header">
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay">
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name">{DEAL.name}</div>
          <div className="cover-hero-title">{ADDR}</div>
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
  const stats = [
    { v: '$3,500,000', l: 'Asking Price' },
    { v: '14', l: 'Apartments' },
  ]
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive Summary</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {stats.map(s => (
                <div key={s.l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.7, lineHeight: 1.4, marginBottom: 8 }}>
              Northeast Private Client Group is pleased to present the exclusive listing of <strong>The Granary</strong>,
              a <strong>14-unit multifamily property</strong> located in New Milford, Connecticut. The property offers a
              well-balanced unit mix of seven one-bedroom units, five two-bedroom units, and two two-bedroom townhome
              units &mdash; providing new ownership with diversified tenant appeal across household sizes and price points.
            </p>
            <p style={{ fontSize: 11.7, lineHeight: 1.4, marginBottom: 8 }}>
              Originally built as the Turney Soule granary complex in the 1800s and thoughtfully redeveloped into
              residential lofts, The Granary combines the durability and character of historic construction with the
              operating simplicity of a boutique multifamily asset. Loft-style interiors, exposed beams, and nine-foot
              ceilings distinguish the property from typical garden-style competition in the submarket. Units are
              heated and cooled by efficient electric heat pumps, with heat, air conditioning, and hot water all on
              separately metered, tenant-paid electric service; water is sub-metered and tenant-paid as well &mdash; a mechanical and utility structure
              that minimizes owner-side operating expense exposure. Twelve of the fourteen units include in-unit
              washer/dryers, with a coin-operated laundry facility in the basement serving the remaining units.
            </p>
            <p style={{ fontSize: 11.7, lineHeight: 1.4, marginBottom: 8 }}>
              The Granary offers a rare combination in the Fairfield/Litchfield County submarket: an
              architecturally distinct property in a walkable downtown location, positioned for a new owner following
              New Milford&rsquo;s completed town-wide revaluation. With new tax assessments effective July 1, 2026,
              buyers can underwrite the property&rsquo;s go-forward tax basis with certainty. In-place rents also sit
              meaningfully below market, offering a new owner straightforward upside with no renovation or capital
              investment required to achieve it.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/exec-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/exec-2.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PROPERTY OVERVIEW ═══════════════════ */
function PropertyOverview({ pageNum }) {
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
                <div className="bldg-row"><span className="bldg-label">Location</span><span className="bldg-val">Steps from the New Milford Green</span></div>
                <div className="bldg-row"><span className="bldg-label">Property Type</span><span className="bldg-val">Multifamily (Adaptive Reuse)</span></div>
                <div className="bldg-row"><span className="bldg-label">Total Units</span><span className="bldg-val">14 Apartments</span></div>
                <div className="bldg-row"><span className="bldg-label">Gross Building SF</span><span className="bldg-val">±17,056 SF</span></div>
                <div className="bldg-row"><span className="bldg-label">Lot Size</span><span className="bldg-val">0.33 Acres (~14,375 SF)</span></div>
                <div className="bldg-row"><span className="bldg-label">Year Built / Converted</span><span className="bldg-val">Historic / 2005</span></div>
                <div className="bldg-row"><span className="bldg-label">Stories</span><span className="bldg-val">3 Stories + Basement</span></div>
                <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">On-Site Paved Lot (25 Spaces)</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities &amp; Mechanicals</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">Heating / AC</span><span className="bldg-val">Tenant-Paid · Electric Heat Pumps / AC</span></div>
                <div className="bldg-row"><span className="bldg-label">Electric</span><span className="bldg-val">Tenant-Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Water / Sewer</span><span className="bldg-val">Municipal · Water Tenant-Paid</span></div>
                <div className="bldg-row"><span className="bldg-label">Trash</span><span className="bldg-val">Landlord-Paid (Not Municipal)</span></div>
                <div className="bldg-row"><span className="bldg-label">Fire Protection</span><span className="bldg-val">Full wet sprinkler system</span></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1.3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Composition</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">1 Bed / 1 Bath</span><span className="bldg-val">7 Units · ~599 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">2 Bed / 1 Bath</span><span className="bldg-val">5 Units · ~769 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">2 Bed Townhome</span><span className="bldg-val">2 Units · ~1,060 SF avg</span></div>
                <div className="bldg-row"><span className="bldg-label">Total</span><span className="bldg-val">14 Apartments · ~725 SF avg</span></div>
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Ancillary Income</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="bldg-row"><span className="bldg-label">On-Site Laundry</span><span className="bldg-val">Common-area laundry income</span></div>
                <div className="bldg-row"><span className="bldg-label">Storage</span><span className="bldg-val">Tenant storage · ~$3,235/yr</span></div>
                <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">TLD — Town Center (Village)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ THE GRANARY (history) ═══════════════════ */
function BuildingHistory({ pageNum }) {
  const timeline = [
    { y: '1800s–1900s', t: 'A grain-mill complex', b: 'The Granary grows as a collection of adjoining structures — including six tall grain elevators — built along West Street between the early 1800s and the early 1900s.' },
    { y: 'Est. 1865', t: 'T. Soule & Co.', b: 'Known as the Turney Soule Granary, the mill operates as T. Soule & Co. — Flour, Grain & Feed and Poultry Supplies — anchoring the West Street village core for generations.' },
    { y: '20th c.', t: 'Tobacco warehouse', b: 'The complex later serves as a tobacco warehouse before falling out of use and into disrepair in the decades that follow.' },
    { y: '2006', t: 'Award-winning restoration', b: 'Jim and Cass Hancock, a father-and-son preservation team, convert the mill into loft apartments — earning a Connecticut Trust for Historic Preservation Award of Merit.' },
    { y: 'Today', t: '“The Granary”', b: 'A characterful building of 14 loft-style apartments that carries its heritage name — steps from the New Milford Green.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Building History" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Character &amp; Story</div>
        <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Granary</span></div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--carbon)', marginBottom: 6 }}>29 West Street · Steps from the New Milford Green</div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
          {/* Narrative + timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <p style={{ fontSize: 10, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>
              29 West Street isn&rsquo;t just another apartment building &mdash; it&rsquo;s The Granary,
              the former Turney Soule Granary (T. Soule &amp; Co., Flour, Grain &amp; Feed): a
              collection of adjoining mill structures with six tall grain elevators, built along West Street between the
              early 1800s and early 1900s. After a later life as a tobacco warehouse and years of disuse, it was restored
              by preservationists Jim and Cass Hancock into loft apartments &mdash; a project honored
              with a Connecticut Trust for Historic Preservation Award of Merit. For an owner, that story
              is a marketing asset: a named, award-winning building in one of Litchfield County&rsquo;s most desirable
              small towns that tenants are proud to call home.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              {timeline.map((e, i) => (
                <div key={e.y} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 64, textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--golden)', lineHeight: 1 }}>{e.y}</div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--golden)', marginTop: 3 }} />
                    {i < timeline.length - 1 && <span style={{ flex: 1, width: 2, background: 'var(--border)', marginTop: 2 }} />}
                  </div>
                  <div style={{ paddingBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)' }}>{e.t}</div>
                    <div style={{ fontSize: 9, lineHeight: 1.4, color: 'var(--graphite)', marginTop: 1 }}>{e.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo + character callout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: 3 }}>
              <img src="/photos/history-1.jpg" alt="T. Soule & Co. — Flour, Grain and Feed, Poultry Supplies (Est. 1865) signage on The Granary" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Highlights</div>
            <ul className="highlights ridge-highlights">
              <li><strong>Authentic loft interiors</strong> — nine-foot ceilings and exposed beams, in the spirit of a New York loft conversion</li>
              <li><strong>Preservation-grade restoration</strong> — original paint colors retained and a former grain elevator repurposed as the building&rsquo;s stair tower</li>
              <li><strong>Renovated kitchens &amp; in-unit laundry</strong> — modern appliances and a washer/dryer paired with the building&rsquo;s historic character</li>
              <li><strong>Steps from the New Milford Green</strong> — the walkable heart of the village-center demand story</li>
            </ul>
            <div style={{ fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
              History per the Connecticut Trust for Historic Preservation (<em>Connecticut Preservation News</em>,
              May/June 2006) and local sources; dates approximate. Verify independently.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════ */
function DonutChart({ data, size = 88, thickness = 16, centerLabel, centerSub, centerFont = 21 }) {
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
              strokeWidth={thickness} strokeDasharray={`${len + 0.8} ${C - len}`} strokeDashoffset={-offset} />
          )
        })}
      </g>
      {centerLabel && (
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: centerFont, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>
      )}
      {centerSub && (
        <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>
      )}
    </svg>
  )
}

function ChartCard({ title, data, centerLabel, centerSub, centerFont, fmt = v => v, note }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <DonutChart data={data} centerLabel={centerLabel} centerSub={centerSub} centerFont={centerFont} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 8.8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: 'var(--carbon)', fontWeight: 600 }}>{d.label}</span>
              <span style={{ color: 'var(--stone)', fontWeight: 700, whiteSpace: 'nowrap' }}>{fmt(d.value)} · {Math.round((d.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
      {note && <div style={{ fontSize: 8.2, color: 'var(--stone)', fontWeight: 700, marginTop: 8, paddingTop: 6, borderTop: '1px solid var(--border)', textAlign: 'center' }}>{note}</div>}
    </div>
  )
}

function RentRoll({ pageNum }) {
  // In-Place = current contract rent; Pro Forma = stabilized mark-to-market
  // target. Transcribed from the 29 West Street (The Granary) analysis
  // workbook, as of 07/06/2026, with Units 303 & 304 pro forma pushed to
  // $1,800 per agent direction (07/17/2026).
  // Unit 105 (townhome) is currently vacant, shown at its $2,250 asking rent.
  const units = [
    { unit: '101', type: '1BR / 1BA', sqft: 660, inPlace: 1775, proforma: 1900 },
    { unit: '102', type: '2BR / 1BA', sqft: 790, inPlace: 2000, proforma: 2200 },
    { unit: '103', type: '2BR / 1BA', sqft: 750, inPlace: 1950, proforma: 2200 },
    { unit: '104', type: '1BR / 1BA', sqft: 620, inPlace: 1695, proforma: 1900 },
    { unit: '105', type: '2BR Townhome', sqft: 1060, inPlace: 2250, proforma: 2400 },
    { unit: '106', type: '2BR Townhome', sqft: 1060, inPlace: 2230, proforma: 2400 },
    { unit: '201', type: '1BR / 1BA', sqft: 660, inPlace: 1730, proforma: 1900 },
    { unit: '202', type: '2BR / 1BA', sqft: 790, inPlace: 1940, proforma: 2200 },
    { unit: '203', type: '2BR / 1BA', sqft: 750, inPlace: 1930, proforma: 2200 },
    { unit: '204', type: '1BR / 1BA', sqft: 620, inPlace: 1780, proforma: 1900 },
    { unit: '301', type: '1BR / 1BA', sqft: 610, inPlace: 1650, proforma: 1900 },
    { unit: '302', type: '2BR / 1BA', sqft: 765, inPlace: 1930, proforma: 2200 },
    { unit: '303', type: '1BR / 1BA', sqft: 520, inPlace: 1675, proforma: 1800 },
    { unit: '304', type: '1BR / 1BA', sqft: 500, inPlace: 1525, proforma: 1800 },
  ]
  const totSqft = units.reduce((s, u) => s + u.sqft, 0)
  const totIn = units.reduce((s, u) => s + u.inPlace, 0)
  const totPf = units.reduce((s, u) => s + u.proforma, 0)

  const unitMix = [
    { label: '1 Bed / 1 Bath', value: 7, color: '#3F4753' },
    { label: '2 Bed / 1 Bath', value: 5, color: '#F8971D' },
    { label: '2 Bed Townhome', value: 2, color: '#B55D37' },
  ]
  const rentByType = [
    { label: '1 Bed / 1 Bath (7)', value: 11830, color: '#3F4753' },
    { label: '2 Bed / 1 Bath (5)', value: 9750, color: '#F8971D' },
    { label: '2 Bed Townhome (2)', value: 4480, color: '#B55D37' },
  ]
  const td = { fontSize: 8.3, padding: '1.6px 7px' }
  const tdr = { ...td, textAlign: 'right' }
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix &amp; <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 8.3 }}>
          <thead><tr>
            <th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th>
            <th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Pro Forma</th>
          </tr></thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={u.unit} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={td}>{u.unit}{u.unit === '105' ? ' *' : ''}</td>
                <td style={td}>{u.type}</td>
                <td style={tdr}>{u.sqft.toLocaleString()}</td>
                <td style={tdr}>${u.inPlace.toLocaleString()}</td>
                <td style={tdr}>${u.proforma.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>14 Units</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{totSqft.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totIn.toLocaleString()}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>${totPf.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 4, lineHeight: 1.4 }}>
          Monthly figures. In-Place = current contract rent; Pro Forma = stabilized mark-to-market target.
          Total In-Place $312,720/yr; Pro Forma $346,800/yr.
          &nbsp;* Unit 105 (townhome) is currently vacant, shown at its $2,250 asking rent. Units 303 &amp; 304
          are studio-sized, functional one-bedrooms.
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 8, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Mix" data={unitMix} centerLabel="14" centerSub="UNITS" />
          <ChartCard title="In-Place Rent by Type" data={rentByType} fmt={v => `$${v.toLocaleString()}/mo`} />
          <div style={{ padding: '2px 6px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Rent Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, justifyContent: 'center' }}>
              {[
                { label: 'In-Place', monthly: '$26,060', avg: '$1,861 avg / unit', color: '#3F4753' },
              ].map(r => (
                <div key={r.label} style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: 10 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--stone)' }}>{r.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{r.monthly}<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                  <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>{r.avg}</div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 9, marginTop: 1 }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--golden)' }}>Pro Forma</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>$28,900<span style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)' }}> /mo</span></div>
                <div style={{ fontSize: 8.5, color: 'var(--stone)', fontWeight: 600 }}>$346,800 / yr &middot; 93% occupied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════ */
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
    { label: 'NOI — Current (In-Place)', val: '$209,930' },
    { label: 'NOI — Pro Forma', val: '$240,687' },
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
              ['Gross Potential Rent', '$346,800', '$24,771', '$346,800', '$24,771', false],
              ['Loss to Lease (below market)', '-$34,080', '-$2,434', '$0', '$0', false],
              ['Gross Scheduled Rent', '$312,720', '$22,337', '$346,800', '$24,771', true],
              ['Vacancy & Collections Loss (5%)', '-$15,636', '-$1,117', '-$17,340', '-$1,239', false],
              ['Effective Rental Income', '$297,084', '$21,220', '$329,460', '$23,533', true],
              ['Other Income (laundry, storage, fees)', '$4,685', '$335', '$4,685', '$335', false],
            ].map(([label, ...cells], i) => {
              const bold = cells.pop()
              return (
                <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                  <td style={bold ? { ...tdl, fontWeight: 700 } : tdl}>{label}</td>
                  {cells.map((c, j) => <td key={j} style={bold ? { ...tds, fontWeight: 700 } : tds}>{c}</td>)}
                </tr>
              )
            })}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$301,769</td><td style={totBg}>$21,555</td><td style={totBg}>$334,145</td><td style={totBg}>$23,867</td></tr>
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
              ['Real Estate Taxes', '$31,260', '$2,233', '$31,260', '$2,233'],
              ['Property Management (5%)', '$15,088', '$1,078', '$16,707', '$1,193'],
              ['Property Insurance', '$16,299', '$1,164', '$16,299', '$1,164'],
              ['Water & Sewer', '$8,614', '$615', '$8,614', '$615'],
              ['Electric (Common)', '$2,222', '$159', '$2,222', '$159'],
              ['Trash Removal', '$2,321', '$166', '$2,321', '$166'],
              ['Repairs & Maintenance', '$7,000', '$500', '$7,000', '$500'],
              ['Landscaping / Snow', '$4,200', '$300', '$4,200', '$300'],
              ['Property Lease', '$4,834', '$345', '$4,834', '$345'],
            ].map(([label, ...cells], i) => (
              <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{label}</td>
                {cells.map((c, j) => <td key={j} style={tds}>{c}</td>)}
              </tr>
            ))}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expenses</td><td style={totBg}>$91,839</td><td style={totBg}>$6,560</td><td style={totBg}>$93,458</td><td style={totBg}>$6,676</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$209,930</td><td style={noiBg}>$14,995</td><td style={noiBg}>$240,687</td><td style={noiBg}>$17,192</td></tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ TRAILING 12-MONTH & FORWARD NOI ═══════════════════ */
function ManagementTransition({ pageNum }) {
  // NOI bridge: trailing-twelve actual (calendar 2025) → Current (in-place,
  // normalized) → Pro Forma (mark-to-market). Figures from the 29 West Street
  // analysis workbook + 2025 QuickBooks P&L.
  const bars = [
    { m: 'T-12 Actual (2025)', noi: 146354, color: '#6B7A8F' },
    { m: 'Current (In-Place)', noi: 209930, color: '#3F4753' },
    { m: 'Pro Forma (Market)', noi: 240687, color: '#F8971D' },
  ]
  const maxNoi = Math.max(...bars.map(x => x.noi))
  const steps = [
    { t: 'Burn off loss-to-lease', b: 'In-place rents sit ~$34,080/yr below market; as leases turn to prevailing New Milford rents, scheduled rent grows to $346,800.' },
    { t: 'Lease up the vacant townhome', b: 'Unit 105 (2BR townhome) is currently vacant; leasing it at its ~$2,250 asking adds immediate income.' },
    { t: 'Normalize operating expenses', b: 'Trailing-twelve expenses carried one-time repair and mechanical costs; the underwriting normalizes R&M, management, and reserves to a stabilized ~29–31% ratio.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Trailing 12-Month" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Trailing 12-Month <span style={{ color: '#F8971D' }}>& Forward NOI</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 9.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 10 }}>
          The property&rsquo;s trailing-twelve operations (calendar year 2025) reflect its actual, as-managed
          performance &mdash; carrying one vacant unit and several one-time repair and mechanical costs. Normalizing
          to in-place rents and a stabilized expense load lifts NOI to a <strong>Current</strong> $209,930, and a
          straightforward mark-to-market takes <strong>Pro Forma</strong> NOI to $240,687. The bridge below is a
          clean operating baseline for a buyer.
        </div>

        {/* T-12 totals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            { v: '$248,356', l: 'T-12 Effective Gross Income' },
            { v: '$102,002', l: 'T-12 Operating Expenses' },
            { v: '$146,354', l: 'T-12 NOI (Actual)' },
            { v: '93%', l: 'Occupancy (13 / 14)' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center', borderTop: '3px solid var(--golden)', padding: '6px 2px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* NOI bridge bar chart */}
        <div className="eyebrow" style={{ marginBottom: 6, fontSize: 9 }}>Net Operating Income — Trailing Actual → Current → Pro Forma</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, height: 190, padding: '0 20px', borderBottom: '2px solid var(--carbon)', position: 'relative' }}>
          {bars.map(x => (
            <div key={x.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', marginBottom: 4 }}>${x.noi.toLocaleString()}</div>
              <div style={{ width: '60%', height: `${(x.noi / maxNoi) * 90}%`, background: x.color, borderRadius: '3px 3px 0 0' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 40, padding: '0 20px', marginTop: 5 }}>
          {bars.map(x => <div key={x.m} style={{ flex: 1, textAlign: 'center', fontSize: 8.8, color: 'var(--stone)', fontWeight: 700 }}>{x.m}</div>)}
        </div>

        <div className="eyebrow" style={{ marginTop: 14, marginBottom: 6, fontSize: 9 }}>The Bridge — T-12 Actual to Pro Forma</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map(s => (
            <div key={s.t} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--carbon)' }}>{s.t}</div>
              <div style={{ fontSize: 8.8, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 1 }}>{s.b}</div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 10, marginTop: 'auto', fontSize: 7.4, color: 'var(--stone)', lineHeight: 1.4 }}>
          Source: 29 West Street analysis workbook and 2025 QuickBooks profit-and-loss statement (cash basis).
          Trailing-twelve NOI excludes mortgage interest and non-operating items. Current and Pro Forma reflect
          underwriting assumptions and may differ from actual owner operations. Verify independently.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ DEAL CONTACTS ═══════════════════ */
function DealContacts({ pageNum }) {
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="/photos/team/brad-balletto.jpg" alt="Brad Balletto" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Brad Balletto</div>
            <div className="dc-title">Managing Director, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1574</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>bballetto@northeastpcg.com</div>
          </div>
          <div className="dc-card" style={{ border: 'none', padding: 0 }}>
            <img className="dc-avatar" src="/photos/team/derek-mahabir.jpg" alt="Derek Mahabir" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Derek Mahabir</div>
            <div className="dc-title">Investment Associate</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 751-1187</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>dmahabir@northeastpcg.com</div>
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

/* ═══════════════════ NEW MILFORD GREEN — LIVE WHERE YOU INVEST ═══════════════════ */
function BlackRockOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>New <span style={{ color: '#F8971D' }}>Milford</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Litchfield County&rsquo;s Quintessential Village Center</div>
          <div className="title-rule" />

          <div style={{ fontSize: 11.3, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Settled in 1707 on the banks of the Housatonic River, New Milford grew up around a
              village Green that ranks among the longest in New England &mdash; an elm-lined common
              framed by white-clapboard churches, the vintage Bank Street Theater, and three
              centuries of historic homes. It is Litchfield County&rsquo;s largest town, yet daily life still centers
              on a compact, genuinely walkable core: independent restaurants and cafés, boutiques, the farmers&rsquo;
              market, and a year-round calendar of green-side fairs and events. The Granary sits a short walk from it
              all, on West Street just off the Green.
            </p>
            <p>
              That blend of authentic New England character and real walkability is increasingly rare &mdash; and it
              draws a discerning, year-round renter base of young professionals, families, remote workers, and
              downsizers who want village-center living without a mortgage. New Milford pairs small-town charm with
              genuine connectivity: Route 7 and US-202 reach I-84 at Danbury in about 20 minutes, with Candlewood
              Lake, the Litchfield Hills, and Metro-North toward New York at the doorstep. Quality apartments in the
              walkable core rarely come available &mdash; and even more rarely trade.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About New Milford</div>
          <ul className="highlights ridge-highlights">
            <li>Settled 1707 on the Housatonic River — Litchfield County&rsquo;s largest town (~28,000 residents)</li>
            <li>Built around one of the longest town greens in New England — an elm-lined village common</li>
            <li>Walkable Bank Street core — independent dining, cafés, boutiques &amp; the historic Bank Street Theater</li>
            <li>Year-round green-side life — farmers&rsquo; market, village fairs &amp; holiday events</li>
            <li>Candlewood Lake, the Housatonic River &amp; the Litchfield Hills at the doorstep</li>
            <li>Route 7 / US-202 to Danbury &amp; I-84 (~20 min); Metro-North Danbury Branch toward NYC</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/drone-3.jpg" alt="New Milford village center from above" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/drone-1.jpg" alt="West Street and the New Milford village center" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ WHY NEW MILFORD — VIBE + SCARCITY ═══════════════════ */
function WhyBlackRock({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="The Town" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="eyebrow">The Town</div>
          <div className="section-title" style={{ marginBottom: 2 }}>Why <span style={{ color: '#F8971D' }}>New Milford</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', marginBottom: 8 }}>Classic Litchfield County, on the Housatonic</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.3, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              New Milford is classic Litchfield County. Settled in 1707 on the banks of the Housatonic River, the
              town grew up around a village Green so long it&rsquo;s among the most storied in New England &mdash;
              lined with historic homes, churches, and civic buildings. It is the county&rsquo;s largest town by
              area, yet the heart of daily life remains a compact, walkable center that has kept its character for
              three centuries.
            </p>
            <p>
              Daily life runs along <strong>Bank Street and the Green</strong> &mdash; a genuinely walkable village
              of independent restaurants, cafés, the historic Bank Street Theater, and small shops, with the river
              and the Litchfield Hills just beyond. That mix of small-town charm, walkability, and an established,
              refined feel is rare and increasingly scarce &mdash; which keeps well-located apartment buildings here
              tightly held and rarely traded. Village-center rentals like The Granary capture a discerning,
              year-round renter base that values the location and the character together.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About New Milford</div>
          <ul className="highlights ridge-highlights">
            <li>A historic river town — settled 1707 on the Housatonic, the largest town by area in Litchfield County</li>
            <li>Built around one of the longest town greens in New England</li>
            <li>Bank Street village — walkable dining, cafés, the Bank Street Theater &amp; independent shops</li>
            <li>Housatonic River, Lynn Deming Park &amp; the Litchfield Hills at the doorstep</li>
            <li>Scarce, tightly held village-center multifamily — durable demand, quick turnover to market</li>
            <li>Route 7 to Danbury &amp; I-84; Metro-North access toward New York City</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-2.jpg" alt="New Milford Green & village center" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/area-3.jpg" alt="Bank Street, New Milford" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ LITCHFIELD COUNTY LIVING — RENTER DEMAND ═══════════════════ */
function FairfieldTax({ pageNum }) {
  const personas = [
    { t: 'Young Professionals & Remote Workers', b: 'Hybrid and remote work lets a new generation live in the Litchfield Hills while staying connected to Danbury and New York. They want a walkable village center — and a quality apartment in it.' },
    { t: 'Families & Local Renters', b: 'Households rooted in the New Milford schools and community who want a well-kept apartment in town — renting by choice, between homes, or ahead of a purchase in a tight for-sale market.' },
    { t: 'Downsizers & Weekenders', b: 'Empty-nesters trading a big house for a low-maintenance apartment steps from the Green, plus NYC weekenders who want a foothold in the Hills without owning.' },
  ]
  const td = { fontSize: 10.5, padding: '6px 10px' }
  return (
    <div className="page">
      <PageHeader section="Renter Demand" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Renter Demand</div>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 25 }}>Village-Center Living, <span style={{ color: '#F8971D' }}>In Genuine Demand</span></div>
        <div className="title-rule" />
        <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 14 }}>
          The Granary&rsquo;s investment story is captured in one idea: it offers what almost nothing else in the
          market can &mdash; a quality apartment inside New Milford&rsquo;s walkable, historic village center. Supply
          is scarce and demand is deep and year-round. Tenants get the lifestyle they want; owners get a motivated
          pool of renters and rents that re-price upward as units turn.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>What Drives Demand Here</h3>
            <table className="data-table" style={{ fontSize: 10.5 }}>
              <thead><tr><th>Demand Driver</th><th style={{ textAlign: 'right' }}>The Granary</th></tr></thead>
              <tbody>
                <tr><td style={td}>Walkable village center</td><td style={{ ...td, textAlign: 'right' }}>Steps from the Green</td></tr>
                <tr><td style={td}>Renovated, sprinklered apartments</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
                <tr><td style={td}>Scarce in-town rental supply</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
                <tr><td style={td}>Route 7 / Metro-North access</td><td style={{ ...td, textAlign: 'right' }}>Yes</td></tr>
              </tbody>
            </table>
            <div style={{ marginTop: 12, borderLeft: '4px solid var(--golden)', paddingLeft: 13 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--golden)' }}>The Scarcity Premium</div>
              <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2, color: 'var(--carbon)', marginTop: 3 }}>Village-center apartments rarely come available &mdash; and rarely trade</div>
              <div style={{ fontSize: 10, color: 'var(--graphite)', marginTop: 3, lineHeight: 1.4 }}>
                &mdash; the location itself is the durable competitive advantage.
              </div>
            </div>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', marginTop: 'auto', paddingTop: 8, lineHeight: 1.4 }}>
              Demand drivers are qualitative and reflect the subject&rsquo;s position in New Milford&rsquo;s village
              center. Illustrative &mdash; verify local market conditions independently.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Who Rents New Milford</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {personas.map(p => (
                <div key={p.t} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)' }}>{p.t}</div>
                  <div style={{ fontSize: 9.5, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 2 }}>{p.b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ NEW MILFORD / LITCHFIELD COUNTY ═══════════════════ */
function FairfieldCounty({ pageNum }) {
  const employers = [
    { label: 'New Milford (local)', items: 'Kimberly-Clark’s New Milford mill on Pickett District Road — a Kleenex® tissue plant and one of the town’s largest private employers (~350 jobs) — plus New Milford Hospital (Nuvance Health), the public school district and town government, and Route 7 corridor retail (Walmart, The Home Depot, Big Y) anchor the local job base.' },
    { label: 'Greater Danbury (~20 min south)', items: 'Danbury Hospital (Nuvance Health), Boehringer Ingelheim in nearby Ridgefield, corporate offices (Ethan Allen, Cartus), and Western Connecticut State University — a deep metro job market down Route 7.' },
    { label: 'Litchfield County & the region', items: 'The Litchfield Hills tourism and second-home economy, plus I-84 and Metro-North access to the Waterbury, Stamford, and New York markets.' },
  ]
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '24px 32px 18px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2, transform: 'translateY(0.3px)' }}>New Milford in <span style={{ color: '#F8971D' }}>Litchfield County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 9.5, lineHeight: 1.42, color: 'var(--graphite)', marginBottom: 8 }}>
            <p>New Milford is Litchfield County&rsquo;s largest town and a primary service center for Connecticut&rsquo;s scenic northwest corner — pairing historic-village character and the Litchfield Hills weekend economy with proximity to the Danbury and New York job markets. Quality rentals in the walkable village core are scarce, keeping demand for apartments like The Granary durable.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 5 }}>Demographics — Town of New Milford vs. Litchfield County</div>
          <table className="data-table" style={{ fontSize: 9.6, marginBottom: 6 }}>
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ textAlign: 'right' }}>Town of New Milford</th>
                <th style={{ textAlign: 'right' }}>Litchfield County</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Population</td><td style={{ textAlign: 'right' }}>~28,100</td><td style={{ textAlign: 'right' }}>~185,000</td></tr>
              <tr><td>Households</td><td style={{ textAlign: 'right' }}>~11,000</td><td style={{ textAlign: 'right' }}>~76,000</td></tr>
              <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>~$99,000</td><td style={{ textAlign: 'right' }}>~$88,000</td></tr>
              <tr><td>Renter-Occupied</td><td style={{ textAlign: 'right' }}>~26%</td><td style={{ textAlign: 'right' }}>~24%</td></tr>
              <tr><td>Median Age</td><td style={{ textAlign: 'right' }}>~44</td><td style={{ textAlign: 'right' }}>~47</td></tr>
            </tbody>
          </table>
          <div style={{ fontSize: 7.4, color: 'var(--stone)', marginBottom: 6, lineHeight: 1.35 }}>
            Source: U.S. Census ACS 5-Year Estimates (approximate; verify independently).
          </div>

          <div className="eyebrow" style={{ marginBottom: 5 }}>Major Area Employers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, justifyContent: 'space-between' }}>
            {employers.map(g => (
              <div key={g.label} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 12 }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 2 }}>{g.label}</div>
                <div style={{ fontSize: 8.6, lineHeight: 1.38, color: 'var(--graphite)' }}>{g.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/divider.jpg" alt="Aerial of New Milford village center and the Housatonic River valley" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/drone-4.jpg" alt="New Milford and the Litchfield Hills from above" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ AERIAL CONTEXT (full-bleed drone + labeled points) ═══════════════════
   Edge-to-edge Black Rock drone shots with the NPCG mark and labeled map points.
   Each point is { x, y, label, primary? } where x/y are % of the page box
   (object-fit: cover) — tune them with aerial-pin-tuner.html once real aerials
   are dropped in. The `primary` point (the subject property) renders larger in
   golden; others are white POI markers. */
function AerialPoint({ x, y, label, title, primary }) {
  const chipBg = primary ? 'rgba(20,24,30,0.86)' : 'rgba(20,24,30,0.74)'
  const box = !!title || (typeof label === 'string' && label.includes('\n'))
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
      <div style={{ background: chipBg, color: '#fff', padding: primary ? '5px 12px' : '5px 10px', borderRadius: 4, textAlign: box ? 'left' : 'center', whiteSpace: box ? 'pre-line' : 'nowrap', maxWidth: box ? 240 : 'none', lineHeight: box ? 1.5 : 1.2, boxShadow: '0 2px 10px rgba(0,0,0,0.55)' }}>
        {primary && <span style={{ display: 'block', color: '#F8971D', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 8.5, fontWeight: 700 }}>Subject Property</span>}
        {title && <span style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#F8971D', borderBottom: '1px solid rgba(255,255,255,0.28)', paddingBottom: 3, marginBottom: 4 }}>{title}</span>}
        <span style={{ fontSize: primary ? 12 : title ? 10 : 10.5, fontWeight: title ? 600 : 700 }}>{label}</span>
      </div>
      <div style={{ width: 2, height: 16, background: '#F8971D', boxShadow: '0 1px 3px rgba(0,0,0,0.55)' }} />
      <div style={{ width: primary ? 10 : 7, height: primary ? 10 : 7, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
    </div>
  )
}

function AerialStreet({ x, y, label, angle = 0 }) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${angle}deg)`, pointerEvents: 'none' }}>
      <div style={{ background: 'rgba(20,24,30,0.66)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 3, whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{label}</div>
    </div>
  )
}

/* Full-bleed pre-rendered aerial pin map (built in aerial-pins/ — logos, arrows
   and subject box are baked into the image; edit there and re-export, not here).
   The `aerial-pinned` class tells print.cjs to skip ALL brightness lifts — these
   drone shots are already color-graded and blow out under the cover lift. */
function AerialPinned({ src, alt }) {
  return (
    <div className="page">
      <div className="cover-hero aerial-pinned">
        <img className="cover-hero-img" src={src} alt={alt} />
      </div>
    </div>
  )
}

function AerialContext({ src, points = [], logo = '/logos/npcg-white-hires.png' }) {
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={src} alt="Aerial view of New Milford, Connecticut" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 24, left: 36 }}>
          <img src={logo} alt="" style={{ maxHeight: 42, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {points.map((p, i) => p.kind === 'street' ? <AerialStreet key={i} {...p} /> : <AerialPoint key={i} {...p} />)}
      </div>
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  const groups = [
    {
      title: 'The Asset',
      big: true,
      items: [
        {
          head: 'Historic Character, Modern Performance',
          body: 'A rare adaptive reuse of the Turney Soule granary — original nine-foot ceilings and exposed beams preserved throughout, delivering a tenant experience competing sets can’t replicate.',
        },
        {
          head: 'Award-Recognized Preservation',
          body: 'Recipient of a 2006 Connecticut Trust for Historic Preservation Award of Merit, underscoring the quality and integrity of the redevelopment.',
        },
        {
          head: 'Tenant-Paid Utilities',
          body: 'Tenants are responsible for their electric, heat, AC, hot water, and cold water expense — the only landlord-paid utility is sewer, significantly limiting owner-side utility exposure relative to typical multifamily assets in the submarket.',
        },
        {
          head: 'Boutique Asset',
          body: '14 units offer new ownership an efficient, low-management-intensity asset — ideal for a 1031 buyer or an owner-operator looking to add a turnkey property without the operational complexity of a larger portfolio.',
        },
      ],
    },
    {
      title: 'The Investment',
      items: [
        {
          head: 'Tax Certainty',
          body: 'New Milford completed a town-wide revaluation in 2025, with new assessments effective July 1, 2026. The next revaluation is not until 2030, with new taxes from that revaluation taking effect July 1, 2031 — a new owner will have five years of full predictability on property tax expense.',
        },
        {
          head: 'Strong Location Fundamentals',
          body: 'Positioned in downtown New Milford, within walking distance of the Village Green, local retail, and dining — supporting durable rental demand from tenants who value walkability and character over commodity apartment product.',
        },
        {
          head: 'Mark-to-Market Upside',
          body: 'In-place rents sit $34,080 annually below current market levels, with no renovation, capital investment, or deferred maintenance required to capture the increase — upside is achieved simply through natural turnover and lease renewals at market rates.',
        },
      ],
    },
  ]
  const TextBox = ({ group }) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>{group.title}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, justifyContent: 'flex-start', minHeight: 0 }}>
        {group.items.map((it, i) => (
          <div key={i} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
            <div style={{ fontSize: group.big ? 11.5 : 10.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 2, lineHeight: 1.18 }}>{it.head}</div>
            <p style={{ fontSize: group.big ? 10 : 9, lineHeight: 1.38, color: 'var(--graphite)', margin: 0 }}>{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Why The Granary</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1.35fr 1fr', gap: 14, minHeight: 0, paddingTop: 6 }}>
          <TextBox group={groups[0]} />
          <div style={{ borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
            <img src="/photos/invest-1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
            <img src="/photos/invest-2.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <TextBox group={groups[1]} />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  // Page order is the single source of truth — pageNum is auto-assigned by
  // position below (1-based). Keep Toc.jsx's `n` values in sync.
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <InvestmentHighlights />,
    <Divider eyebrow="01" title="The Property" image="/photos/divider.jpg" />,
    <BuildingHistory />,
    <PropertyOverview />,
    ...PHOTO_PAGES.map(p => <PhotoPage {...p} />),
    <FloorPlansPage
      section="Floor Plans"
      title="Representative" accent="Unit Floor Plans"
      subtitle="Sample layouts across the unit mix — one- and two-bedroom flats plus a two-story townhome"
      plans={[
        { src: '/photos/floorplans/fp-103.jpg', unit: 'Unit 103', type: '2 Bed / 1 Bath', sub: 'Near-identical layout to Unit 203' },
        { src: '/photos/floorplans/fp-105.jpg', unit: 'Unit 105', type: '2 Bed Townhome · two-story', sub: 'Near-identical layout to Unit 106' },
        { src: '/photos/floorplans/fp-202.jpg', unit: 'Unit 202', type: '2 Bed / 1 Bath', sub: 'Near-identical layout to Units 102 & 302' },
        { src: '/photos/floorplans/fp-204.jpg', unit: 'Unit 204', type: '1 Bed / 1 Bath', sub: 'Near-identical layout to Unit 104' },
      ]}
      note="Floor plans are representative; individual unit layouts and dimensions vary. Measurements deemed reliable but not guaranteed."
    />,
    <Divider eyebrow="02" title="Financial Analysis" image="/photos/divider.jpg" />,
    <RentRoll />,
    <IncomeExpense />,
    <Divider eyebrow="03" title="Location & Market" image="/photos/divider.jpg" />,
    <BlackRockOverview />,
    <LocationMap />,
    <AerialPinned src="/photos/aerial-pinned-north.jpg" alt="Pinned aerial looking north over downtown New Milford — Town Green, Bank Street, and New Milford Hospital" />,
    <AerialPinned src="/photos/aerial-pinned-south.jpg" alt="Pinned aerial over the Housatonic River and Route 7 retail corridor — Litchfield Crossing, New Milford Plaza, and Route 7 South retail" />,
    <FairfieldCounty />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Team" image="/photos/divider.jpg" />,
    <TeamPage />,
    <LocationsPage />,
  ]
  return (
    <div className={`om-container${DRAFT ? ' draft' : ''}`}>
      {pages.map((el, i) => cloneElement(el, { key: i, pageNum: i + 1 }))}
    </div>
  )
}

export default App
