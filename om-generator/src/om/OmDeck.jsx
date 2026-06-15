import { cloneElement } from 'react'
import './om.css'
import { DealProvider, useDeal, PageHeader, PageFooter, StaticShell } from './Shell.jsx'
import Toc from './Toc.jsx'
import Divider from './Divider.jsx'
import RegionalMap from './RegionalMap.jsx'
import TeamPage from './TeamPage.jsx'
import LocationsPage from './LocationsPage.jsx'

/* ═══════════════════ OM DECK RENDERER ═══════════════════
   The real NPCG OM page components (ported verbatim from the Campbell OM),
   driven by the runtime deal model. Identity/media come from Google
   enrichment, prose + rent roll from the AI; income/expense is computed here
   in JS. Same index.css (om.css) as the production OMs, so it renders
   pixel-for-pixel like the real book.

   Static pages (Deal Contacts, Selling Process, Marketing Timeline/Strategy,
   National Visibility, Team, Locations) are generic NPCG content copied
   verbatim. Address in every header/footer reads from DealContext. */

const money = (n) => '$' + Math.round(n || 0).toLocaleString()
const pm = (s) => { const n = parseFloat(String(s ?? '').replace(/[^0-9.\-]/g, '')); return isNaN(n) ? 0 : n }
const sum = (a, f) => (a || []).reduce((t, x) => t + pm(f(x)), 0)
const pct = (n, d) => (d ? (n / d * 100).toFixed(2) + '%' : '—')
const T = ({ v }) => (v == null || v === '' || v === 'TODO' ? <span style={{ color: '#b9772f', fontWeight: 700 }}>TODO</span> : v)

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function Cover({ deal, pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero">
        {deal.cover
          ? <img className="cover-hero-img" src={deal.cover} alt="" />
          : <div style={{ position: 'absolute', inset: 0, background: 'var(--carbon)' }} />}
        {/* Top scrim so the overlay text reads clearly */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        {/* NPCG logo — top right */}
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {/* Title block — top left */}
        <div className="cover-hero-overlay" style={{ top: 28, bottom: 'auto', left: 40 }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>For Sale</div>
          <div className="cover-hero-name">{deal.name || <T />}</div>
          <div className="cover-hero-title" style={{ fontSize: 40 }}>{deal.street || deal.address || <T />}</div>
          <div className="cover-hero-sub">{deal.cityLong || deal.cityState || ''}</div>
          <div className="cover-hero-rule" />
          <div className="cover-hero-prep">{deal.type || 'Multifamily Offering'}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ deal, pageNum }) {
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
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}><T v={deal.askingPrice} /></div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Offering Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{deal.units || <T />}</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3 }}>Total Units</div>
              </div>
            </div>
            {(deal.summary && deal.summary.length)
              ? deal.summary.map((p, i) => <p key={i} style={{ fontSize: 10.4, lineHeight: 1.55, marginBottom: 10 }}>{p}</p>)
              : <p style={{ fontSize: 10.4, lineHeight: 1.55, marginBottom: 10 }}><T /></p>}
            <div className="eyebrow" style={{ marginBottom: 6 }}>Investment Highlights</div>
            <ul className="highlights highlights--lg" style={{ flex: 1, justifyContent: 'space-between', fontSize: 10.4 }}>
              {(deal.highlights && deal.highlights.length)
                ? deal.highlights.map((h, i) => <li key={i}><strong>{h.title}</strong> — {h.body}</li>)
                : <li><T /></li>}
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            {deal.cover && (
              <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
                <img src={deal.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            {deal.map && (
              <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
                <img src={deal.map} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ FINANCIAL MODEL (computed from the deal) ═══════════════════ */
function financials(deal) {
  const units = deal.rentRoll || []
  const inMo = sum(units, u => u.inPlace), proMo = sum(units, u => u.proforma)
  const gsrY1 = inMo * 12, gprPF = proMo * 12
  const vac = 0.05
  const egiY1 = gsrY1 * (1 - vac), egiPF = gprPF * (1 - vac)
  const totExp = sum(deal.expenses, e => e.amount)
  const noiY1 = egiY1 - totExp, noiPF = egiPF - totExp
  const price = pm(deal.askingPrice)
  const u = pm(deal.units) || units.length || 0
  return { gsrY1, gprPF, vac, egiY1, egiPF, totExp, noiY1, noiPF, price, u, inMo, proMo }
}

/* ═══════════════════ PROPERTY OVERVIEW ═══════════════════ */
function PropertyOverview({ deal, pageNum }) {
  const s = deal.siteSummary || {}, ut = deal.utilities || {}, bi = deal.buildingInfo || {}
  const f = financials(deal)
  const row = (l, v) => <div className="bldg-row"><span className="bldg-label">{l}</span><span className="bldg-val"><T v={v} /></span></div>
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
                {row('Address', deal.street || deal.address)}
                {row('City / State', deal.cityState || deal.cityLong)}
                {row('Property Type', s.propertyType)}
                {row('Total Units', s.totalUnits)}
                {row('Buildings', s.buildings)}
                {row('Lot Size', s.lotSize)}
                {row('Building SF', s.buildingSF)}
                {row('Year Built', s.yearBuilt)}
                {row('Zoning', s.zoning)}
                {row('Parking', s.parking)}
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {row('Heat / Hot Water', ut.heat)}
                {row('Electric', ut.electric)}
                {row('Water / Sewer', ut.water)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 2, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building Information</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {row('Construction', bi.construction)}
                {row('Foundation', bi.foundation)}
                {row('Roof', bi.roof)}
                {row('Exterior', bi.exterior)}
                {row('Windows', bi.windows)}
                {row('Mechanicals', bi.mechanicals)}
                {row('Electrical', bi.electrical)}
                {row('Fire Protection', bi.fireProtection)}
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Investment Profile</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {row('Offering Price', deal.askingPrice)}
                {row('Price / Unit', f.price && f.u ? money(f.price / f.u) : 'TODO')}
                {row('NOI (Year 1 → PF)', f.totExp || f.inMo ? `${money(f.noiY1)} → ${money(f.noiPF)}` : 'TODO')}
                {row('Cap (Year 1 → PF)', f.price ? `${pct(f.noiY1, f.price)} → ${pct(f.noiPF, f.price)}` : 'TODO')}
              </div>
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Unit Mix &amp; Rents</h3>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {row('Total Units', deal.units || (f.u || null))}
                {row('Avg In-Place', f.u ? money(f.inMo / f.u) + ' / mo' : 'TODO')}
                {row('Avg Pro Forma', f.u ? money(f.proMo / f.u) + ' / mo' : 'TODO')}
                {row('Annual GSR → GPR', f.inMo ? `${money(f.gsrY1)} → ${money(f.gprPF)}` : 'TODO')}
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
function RentRoll({ deal, pageNum }) {
  const units = deal.rentRoll || []
  const tot = (f) => money(sum(units, f))
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Unit Mix &amp; <span style={{ color: '#F8971D' }}>Rent Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10 }}>
          <thead><tr><th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th><th>Designation</th><th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Market</th><th style={{ textAlign: 'right' }}>Pro Forma</th></tr></thead>
          <tbody>
            {units.map((u, i) => (
              <tr key={i}>
                <td>{u.unit}</td><td>{u.type}</td><td style={{ textAlign: 'right' }}><T v={u.sf} /></td><td>{u.designation}</td>
                <td style={{ textAlign: 'right' }}>{u.inPlace}</td><td style={{ textAlign: 'right' }}>{u.market}</td><td style={{ textAlign: 'right' }}>{u.proforma}</td>
              </tr>
            ))}
            {units.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 16 }}><T /></td></tr>}
            <tr className="total-row">
              <td><strong>Total</strong></td><td><strong>{units.length} Units</strong></td><td></td><td></td>
              <td style={{ textAlign: 'right' }}><strong>{tot(u => u.inPlace)}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{tot(u => u.market)}</strong></td>
              <td style={{ textAlign: 'right' }}><strong>{tot(u => u.proforma)}</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>Monthly Income Summary</h3>
          <table className="data-table" style={{ fontSize: 10.5, width: '100%' }}>
            <thead><tr><th>Scenario</th><th style={{ textAlign: 'right' }}>Monthly</th><th style={{ textAlign: 'right' }}>Annual</th></tr></thead>
            <tbody>
              <tr><td>In-Place</td><td style={{ textAlign: 'right' }}>{tot(u => u.inPlace)}</td><td style={{ textAlign: 'right' }}>{money(sum(units, u => u.inPlace) * 12)}</td></tr>
              <tr><td style={{ fontWeight: 700 }}>Pro Forma</td><td style={{ textAlign: 'right', fontWeight: 700 }}>{tot(u => u.proforma)}</td><td style={{ textAlign: 'right', fontWeight: 700 }}>{money(sum(units, u => u.proforma) * 12)}</td></tr>
              <tr className="total-row"><td><strong>Upside</strong></td><td style={{ textAlign: 'right' }}><strong>+{money(sum(units, u => u.proforma) - sum(units, u => u.inPlace))}</strong></td><td style={{ textAlign: 'right' }}><strong>+{money((sum(units, u => u.proforma) - sum(units, u => u.inPlace)) * 12)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE (computed) ═══════════════════ */
function IncomeExpense({ deal, pageNum }) {
  const f = financials(deal)
  const tds = { fontSize: 8.5, padding: '2.5px 7px', textAlign: 'right' }
  const tdl = { fontSize: 8.5, padding: '2.5px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const thr = { fontSize: 7.5, padding: '3px 7px', textAlign: 'right', color: '#fff' }
  const thl = { fontSize: 7.5, padding: '3px 7px', textAlign: 'left', color: '#fff' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 8.5, padding: '3px 7px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 9, padding: '4px 7px', textAlign: 'right' }
  const Cols = () => <colgroup><col style={{ width: '40%' }} />{Array.from({ length: 2 }).map((_, i) => <col key={i} style={{ width: '30%' }} />)}</colgroup>
  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income &amp; <span style={{ color: '#F8971D' }}>Expense Analysis</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        {/* NOI summary strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 9, marginBottom: 12, borderBottom: '1px solid var(--border)' }}>
          {[['NOI — Year 1', f.noiY1], ['NOI — Pro Forma', f.noiPF]].map(([l, v]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{money(v)}</div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Income</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10, tableLayout: 'fixed' }}>
          <Cols />
          <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Income</th><th style={thr}>Year 1</th><th style={thr}>Pro Forma</th></tr></thead>
          <tbody>
            <tr><td style={{ ...tdl, fontWeight: 700 }}>Gross Scheduled Rent</td><td style={{ ...tds, fontWeight: 700 }}>{money(f.gsrY1)}</td><td style={{ ...tds, fontWeight: 700 }}>{money(f.gprPF)}</td></tr>
            <tr style={{ background: 'var(--linen)' }}><td style={tdl}>Vacancy &amp; Collections (5%)</td><td style={tds}>-{money(f.gsrY1 * f.vac)}</td><td style={tds}>-{money(f.gprPF * f.vac)}</td></tr>
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>{money(f.egiY1)}</td><td style={totBg}>{money(f.egiPF)}</td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 3, fontSize: 9 }}>Operating Expenses</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup><col style={{ width: '40%' }} /><col style={{ width: '30%' }} /><col style={{ width: '30%' }} /></colgroup>
          <thead><tr style={{ background: 'var(--carbon)' }}><th style={thl}>Expense</th><th style={thr}>Annual</th><th style={thr}>% of EGI</th></tr></thead>
          <tbody>
            {(deal.expenses || []).map((e, i) => (
              <tr key={i} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={tdl}>{e.label}</td><td style={tds}>{e.amount}</td><td style={tds}>{pct(pm(e.amount), f.egiY1)}</td>
              </tr>
            ))}
            {(!deal.expenses || deal.expenses.length === 0) && <tr><td style={tdl} colSpan={3}><T /></td></tr>}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>{money(f.totExp)}</td><td style={totBg}>{pct(f.totExp, f.egiY1)}</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>{money(f.noiY1)}</td><td style={noiBg}>{money(f.noiPF)}</td></tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8 }}>NOI computed from the rent roll &amp; expenses; vacancy assumed at 5%. Verify all figures before distribution.</div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ CITY OVERVIEW ═══════════════════ */
function CityOverview({ deal, pageNum }) {
  const city = deal.cityLong || deal.cityState || 'the City'
  const paras = deal.locationOverview || []
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>{city}</div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {paras.length
              ? paras.map((p, i) => <p key={i}>{p}</p>)
              : <p><T /></p>}
          </div>
          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>Demographics</div>
          <div style={{ fontSize: 9.5, color: 'var(--stone)' }}>TODO: demographics</div>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {deal.cover && (
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <img src={deal.cover} alt={city} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
          {deal.map && (
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <img src={deal.map} alt={city} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ COUNTY / REGION OVERVIEW ═══════════════════ */
function CountyOverview({ deal, pageNum }) {
  const city = deal.cityLong || deal.cityState || 'the City'
  // Second half of the location prose if available, else the full set.
  const paras = deal.locationOverview || []
  const tail = paras.length > 2 ? paras.slice(Math.ceil(paras.length / 2)) : paras
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>{city} &amp; the <span style={{ color: '#F8971D' }}>Surrounding Region</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tail.length
              ? tail.map((p, i) => <p key={i}>{p}</p>)
              : <p><T /></p>}
          </div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — County / Region</div>
          <div style={{ fontSize: 9.5, color: 'var(--stone)' }}>TODO: demographics</div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative', background: 'var(--carbon)' }}>
          {(deal.map || deal.cover) && <img src={deal.map || deal.cover} alt={city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ GOOGLE LOCATION MAP PAGE ═══════════════════
   Renders the deal's static map (data URL) — no client-side Google call —
   with the nearby amenities listed beside it. */
function GoogleLocationMap({ deal, pageNum }) {
  const amenities = deal.amenities || []
  const fullAddr = [deal.street || deal.address, deal.cityState || deal.cityLong].filter(Boolean).join(', ')
  return (
    <div className="page">
      <PageHeader section="Location" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Location &amp; <span style={{ color: '#F8971D' }}>Amenities</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {/* MAP — deal.map data URL */}
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', alignSelf: 'start' }}>
            {deal.map ? (
              <img src={deal.map} alt={`Map of ${fullAddr || 'the property'} and nearby amenities`} style={{ width: '100%', height: 'auto', display: 'block', background: 'var(--linen)' }} />
            ) : (
              <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
                Location map unavailable
              </div>
            )}
          </div>

          {/* SUBJECT PROPERTY + AMENITY LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)' }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--carbon)' }}>Subject Property{deal.street ? ` — ${deal.street}` : ''}</span>
            </div>
            <div className="eyebrow" style={{ marginBottom: 2 }}>Nearby</div>
            {amenities.length ? (
              <div style={{ columns: 2, columnGap: 22, minHeight: 0, overflow: 'hidden' }}>
                {amenities.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '2.5px 0', breakInside: 'avoid' }}>
                    <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: 'var(--golden)', width: 15, textAlign: 'right' }}>{i + 1}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.35, flex: 1 }}>
                      {a.name}{a.rating ? <span style={{ color: 'var(--stone)', fontWeight: 600 }}> · {a.rating}★</span> : ''}
                      <span style={{ display: 'block', fontSize: 9, fontWeight: 500, color: 'var(--stone)' }}>
                        {[a.category, a.distance].filter(Boolean).join(' · ')}{a.category || a.distance ? (a.vicinity ? ' — ' : '') : ''}{a.vicinity}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 10, color: 'var(--stone)' }}>TODO: nearby amenities</div>
            )}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ DEAL CONTACTS (static, generic NPCG) ═══════════════════ */
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

/* ═══════════════════ SELLING PROCESS (static) ═══════════════════ */
function SellingProcess({ pageNum }) {
  const stages = [
    { label: 'Sales and Marketing', items: ['Evaluate, underwrite, and position the property with extensive rent and sales comp research', 'Develop the offering memorandum that articulates the investment thesis to qualified buyers', 'Advocate and educate prospects on deal strengths while mitigating concerns', 'Execute broad and targeted marketing across direct, digital, and email channels', 'Coordinate tours with seller, property manager, and qualified buyers', 'Engineer a competitive environment designed to drive pricing tension', 'Track and report offers, tours, and activity in real time', 'Build and maintain the secure data room for due diligence readiness'] },
    { label: 'Negotiation & Contract', items: ['Facilitate and negotiate offers from prospective buyers', 'Screen and qualify buyer financial capacity and track record', 'Negotiate best possible price and terms for the seller', 'Help identify the buyer with the highest probability of closing', 'Maintain deal momentum and buyer engagement through contract', 'Confirm offer terms are accurately reflected in the PSA', 'Compile and reconcile due diligence documentation to head off surprises'] },
    { label: 'Transaction Management', items: ['Facilitate transmission of due diligence items — taxes, insurance, water, utilities', 'Coordinate with buyer, seller, lender, and attorneys on all diligence workstreams', 'Confirm receipt of third-party reports and lender commitment letters', 'Track key contract dates and manage open contingencies', 'Mitigate unforeseen issues and respond to buyer re-trade attempts', 'Track amendments and any negotiated changes through to closing'] },
  ]
  return (
    <StaticShell section="Selling Process" title="Selling Process Stages" pageNum={pageNum}>
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

/* ═══════════════════ MARKETING TIMELINE (static) ═══════════════════ */
function MarketingTimeline({ pageNum }) {
  const phases = [
    { weeks: '1–2', label: 'Prepare', items: ['Finalize pricing and listing agreement', 'Collect property financials and diligence', 'Schedule photography / video', 'Build marketing materials (OM, flyers, email)', 'Begin quiet marketing to qualified buyers'] },
    { weeks: '3–6', label: 'Launch', items: ['Go live on CoStar, LoopNet, CREXi, and peer platforms', 'Launch email and call campaigns', 'Conduct property tours', 'Provide weekly activity and market feedback', 'Call for Offers typically set at end of Week 6'] },
    { weeks: '7–8', label: 'Offers', items: ['Receive and underwrite offers', 'Conduct best-and-final round if needed', 'Qualify buyers and negotiate LOI'] },
    { weeks: '9–12', label: 'Escrow', items: ['Execute PSA', 'Manage due diligence and buyer financing', 'Coordinate closing process', 'Proactive involvement through close'] },
  ]
  return (
    <StaticShell section="Marketing Timeline" title="Marketing Timeline" pageNum={pageNum}>
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

/* ═══════════════════ MARKETING STRATEGY (static) ═══════════════════ */
function MarketingStrategy({ pageNum }) {
  return (
    <StaticShell section="Marketing Strategy" title="Marketing Strategy & Buyer Profile" pageNum={pageNum}>
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

/* ═══════════════════ NATIONAL VISIBILITY (static) ═══════════════════ */
function NationalVisibility({ pageNum }) {
  const platforms = [
    { name: 'CoStar', stat: '8M monthly users' }, { name: 'LoopNet', stat: '12M monthly searches' },
    { name: 'CREXi', stat: '2M registered buyers' }, { name: 'Brevitas', stat: '250K members' },
    { name: 'RealNex', stat: 'National syndication' }, { name: 'theBrokerList', stat: 'CRE broker network' },
    { name: 'CommercialEdge', stat: 'Enterprise platform' }, { name: 'MLS', stat: 'Regional listings' },
  ]
  return (
    <StaticShell section="National Visibility" title="National Visibility. Maximum Market Exposure." pageNum={pageNum}>
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

/* ═══════════════════ DECK ═══════════════════ */
export default function OmDeck({ deal }) {
  if (!deal) return null
  // Page order is the single source of truth — pageNum auto-assigned by position
  // (1-based). Keep Toc.jsx's `n` values in sync when reordering.
  const pages = [
    <Cover deal={deal} />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary deal={deal} />,
    <Divider eyebrow="01" title="The Property" />,
    <PropertyOverview deal={deal} />,
    <Divider eyebrow="02" title="Financial Analysis" />,
    <RentRoll deal={deal} />,
    <IncomeExpense deal={deal} />,
    <Divider eyebrow="03" title="Location & Market" />,
    <CityOverview deal={deal} />,
    <GoogleLocationMap deal={deal} />,
    <CountyOverview deal={deal} />,
    <RegionalMap />,
    <Divider eyebrow="04" title="The Process" />,
    <SellingProcess />,
    <MarketingTimeline />,
    <MarketingStrategy />,
    <NationalVisibility />,
    <Divider eyebrow="05" title="The Team" />,
    <TeamPage />,
    <LocationsPage />,
  ]
  return (
    <DealProvider value={deal}>
      <div className="om-container omdeck-wrap">
        {pages.map((el, i) => cloneElement(el, { key: i, pageNum: i + 1 }))}
      </div>
    </DealProvider>
  )
}
