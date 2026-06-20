import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import { PhotoGallery } from './PhotoPages.jsx'
import Divider from './Divider.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════════════════════════════════════════════════════════════
   WARE PORTFOLIO — Offering Memorandum
   20-unit, multi-building apartment portfolio across four contiguous addresses
   in downtown Ware, MA: 27 Parker St · 28-30 North St · 28.5 North St · 38
   North St (three buildings). Built on the NPCG multifamily OM engine (cloned
   from om-westhaven-campbell). Photos are real (public/photos/ware/), warm-
   graded in index.css to read "less wintery."

   Content reflects Jake Jordan's 6/19 markups on Chase's first draft:
   • Cover redesigned to the portfolio style (aerial w/ outlined parcels +
     building thumbnails along the bottom); parcels are OUTLINED, not clouded.
   • Tim McGeary removed everywhere; Tom Egbers added to the deal team.
   • Page titles moved into the header/title area; rent roll shown without cents;
     I&E truncated at NOI; "Asbestos" dropped from 28-30 building info.
   TODO (pending from Ravi): refreshed narrative writings, per-building unit-mix
   detail, and unit-mix/rent graphs. Placeholders below are wired and ready.
═══════════════════════════════════════════════════════════════════════════ */

const ORANGE = '#F8971D'

/* ═══════════════════ 1 — COVER ═══════════════════
   Portfolio cover: full-bleed downtown aerial with the three parcels already
   outlined in orange (no clouding, per Jake), the title block top-left, and the
   three individual buildings captioned along the bottom. */
function CoverHero({ pageNum }) {
  const thumbs = [
    { src: '/photos/ware/p27.jpg', label: '27 Parker Street' },
    { src: '/photos/ware/n2830.jpg', label: '28-30 & 28.5 North Street' },
    { src: '/photos/ware/n38.jpg', label: '38 North Street' },
  ]
  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src="/photos/ware/cover-aerial.jpg" alt="" style={{ objectPosition: 'center 38%' }} />
        {/* Top scrim for the title; bottom scrim for the thumbnail strip */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 26%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.20) 66%, rgba(0,0,0,0.86) 100%)', pointerEvents: 'none' }} />
        {/* NPCG logo — top right */}
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        {/* Title block — top left */}
        <div className="cover-hero-overlay" style={{ top: 30, bottom: 'auto', left: 44 }}>
          <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.30em', textTransform: 'uppercase', marginBottom: 14 }}>20-Unit Multifamily Portfolio · For Sale</div>
          <div className="cover-hero-title" style={{ fontSize: 70, lineHeight: 0.98 }}>Ware<br />Portfolio</div>
          <div className="cover-hero-rule" style={{ marginTop: 18 }} />
          <div className="cover-hero-prep" style={{ marginTop: 14, fontSize: 12 }}>27 Parker St · 28-30 &amp; 28.5 North St · 38 North St &middot; Ware, MA 01082</div>
        </div>
        {/* Building thumbnails along the bottom */}
        <div style={{ position: 'absolute', left: 44, right: 44, bottom: 34, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {thumbs.map(t => (
            <div key={t.label} style={{ position: 'relative', height: 138, borderRadius: 4, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
              <img src={t.src} alt={t.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 10px 7px', background: 'linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0))', color: '#fff', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>{t.label}</div>
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
  return (
    <StaticShell section="Deal Contacts" title="Deal Contacts" pageNum={pageNum}>
      <div className="dc-layout">
        <aside className="dc-contacts">
          <h3 className="dc-disclaimer-title">Exclusively Listed By</h3>
          <div className="dc-card">
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Taylor-Perun-430x488.png" alt="Taylor Perun" />
            <div className="dc-name">Taylor Perun</div>
            <div className="dc-title">Senior Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 307-1576</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>tperun@northeastpcg.com</div>
          </div>
          <div className="dc-card">
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2024/02/tom-430x488.jpg" alt="Tom Egbers" />
            <div className="dc-name">Tom Egbers</div>
            <div className="dc-title">Associate, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (857) 990-2022</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>tegbers@northeastpcg.com</div>
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

/* ═══════════════════ EXECUTIVE SUMMARY ═══════════════════ */
function ExecutiveSummary({ pageNum }) {
  const facts = [
    ['Portfolio SF', '13,875 SF'],
    ['Number of Units', '20'],
    ['Number of Buildings', '3'],
    ['Total Acres', '0.83'],
    ['Zoning', 'DTC'],
    ['Cap Rate (Current)', '8.01%'],
    ['Pro Forma Cap Rate', '11.33%'],
    ['Price / Unit', '$127,500'],
  ]
  return (
    <div className="page">
      <PageHeader section="Executive Summary" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">Executive <span style={{ color: ORANGE }}>Summary</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, flex: 1, minHeight: 0 }}>
          {/* Left — price, addresses, narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>$2,550,000</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Listing Price</div>
              </div>
              <div style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>20</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>Units · 3 Buildings</div>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 5 }}>Property Addresses</div>
            <ul className="highlights" style={{ fontSize: 10.6, marginBottom: 12 }}>
              <li>27 Parker Street</li>
              <li>28-30 North Street, 28.5 North Street</li>
              <li>38 North Street</li>
            </ul>

            <div className="eyebrow" style={{ marginBottom: 5 }}>Property Overview</div>
            {/* TODO(Ravi): refreshed Executive Summary writing to drop in here. */}
            <p style={{ fontSize: 10.4, lineHeight: 1.5, marginBottom: 9 }}>
              Northeast Private Client Group is pleased to present the <strong>Ware Portfolio</strong>, a 20-unit,
              multi-building apartment portfolio situated across four contiguous addresses in Ware, Massachusetts.
              The portfolio spans 27 Parker Street, 28-30 North Street, 28.5 North Street, and 38 North Street, and
              consists of a diverse unit mix including studio, one-, two-, and three-bedroom apartments.
            </p>
            <p style={{ fontSize: 10.4, lineHeight: 1.5 }}>
              The offering presents a compelling value-add opportunity for investors seeking immediate
              mark-to-market potential. A meaningful portion of the rent roll reflects below-market rents on leases
              with near-term expirations, with several tenants paying meaningfully below proforma on units that will
              roll within the holding period. With competitors and submarket asking rents well above current
              in-place collections, the portfolio offers a clear path to improved cash flow through disciplined
              lease-up and renewals at market rates.
            </p>
          </div>

          {/* Right — aerial + property summary table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '3px solid var(--golden)' }}>
              <img src="/photos/ware/aerial-outlined.jpg" alt="Ware Portfolio — downtown Ware aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Property Summary</div>
              <div className="flat-cards">
                <div className="bldg-card" style={{ padding: '10px 14px' }}>
                  {facts.map(([k, v]) => (
                    <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INVESTMENT HIGHLIGHTS ═══════════════════
   Title + paragraph format (per Jake's "more into this page" note and the
   attached example). TODO(Ravi): bolster body copy with refreshed writings. */
function InvestmentHighlights({ pageNum }) {
  const items = [
    { head: 'Immediate Value-Add Upside Through Below-Market Rents', body: 'A meaningful share of the rent roll sits well below market on leases with near-term expirations. Marking units to proforma as they roll lifts gross scheduled rent from $310,260 to $401,040 — roughly 29% of embedded upside captured through disciplined lease-up and renewals, with no entitlement or repositioning risk.', img: '/photos/ware/p27-int2.jpg' },
    { head: 'Constrained Supply Environment Supporting Rent Growth', body: 'The Amherst / East Hampshire County submarket carries only ~77 units under construction and no proposed pipeline beyond that. Limited new supply against steady, renter-by-necessity demand supports durable rent fundamentals at the price point where this portfolio competes.', img: '/photos/ware/n2830.jpg' },
    { head: 'Diverse Unit Mix Across a Contiguous Multi-Building Portfolio', body: 'Twenty units across three buildings on four contiguous parcels in downtown Ware — a studio, one-, two-, and three-bedroom apartments. The mix spreads risk across unit types and tenant profiles while keeping operations tight within a single walkable footprint.', img: '/photos/ware/n38-int1.jpg' },
    { head: 'Strong Submarket Fundamentals with Low Competitive Vacancy', body: 'The 1- and 2-Star competitive tier shows healthy absorption with vacancy around 5.0%, and the broader submarket vacancy of ~3.9% is forecast to compress toward its five-year average by year-end 2026 as the near-term supply wave is absorbed.', img: '/photos/ware/p27.jpg' },
    { head: 'Strategic Location with Access to Two Major New England Markets', body: 'Ware sits at the eastern edge of Hampshire County, roughly equidistant between Springfield and Worcester, with access to the Pioneer Valley employment base, healthcare institutions, and UMass Amherst — the region’s largest employer and a persistent driver of rental demand.', img: '/photos/ware/aerial-context.jpg' },
  ]
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: ORANGE }}>Highlights</span></div>
        <div className="title-rule" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0, paddingTop: 6 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 0 }}>
              <img src={it.img} alt="" style={{ flex: '0 0 132px', width: 132, height: 92, objectFit: 'cover', borderRadius: 5, display: 'block' }} />
              <div style={{ flex: 1, minWidth: 0, borderLeft: '3px solid var(--golden)', paddingLeft: 14 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: ORANGE, marginBottom: 3, lineHeight: 1.15 }}>{it.head}</div>
                <p style={{ fontSize: 9.6, lineHeight: 1.45, color: 'var(--graphite)' }}>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PORTFOLIO OVERVIEW ═══════════════════
   Portfolio-level snapshot tying the three buildings together, with a
   per-building summary card row. */
function PortfolioOverview({ pageNum }) {
  const cards = [
    { name: '27 Parker Street', img: '/photos/ware/p27.jpg', rows: [['Units', '4'], ['Year Built', '1890'], ['Living Area', '2,822 SF'], ['Type', 'Apartment (4-Unit)']] },
    { name: '28-30 & 28.5 North Street', img: '/photos/ware/n2830.jpg', rows: [['Units', '14'], ['Year Built', '1932'], ['Living Area', '6,800 SF'], ['Type', 'Apartment Building']] },
    { name: '38 North Street', img: '/photos/ware/n38.jpg', rows: [['Units', '2'], ['Year Built', '1880'], ['Living Area', '1,576 SF'], ['Type', 'Two-Family']] },
  ]
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Portfolio <span style={{ color: ORANGE }}>Overview</span></div>
        <div className="title-rule" />
        <p style={{ fontSize: 10.4, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 14 }}>
          The Ware Portfolio comprises three apartment buildings across four contiguous addresses in downtown Ware,
          totaling 20 units and 13,875 rentable square feet on roughly 0.83 acres. The buildings sit within a single
          walkable block radius of the Ware town common, allowing centralized management while diversifying the rent
          roll across a studio, one-, two-, and three-bedroom apartments.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          {cards.map(c => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--carbon)', marginBottom: 6 }}>{c.name}</div>
              <div className="bldg-card" style={{ padding: '8px 12px' }}>
                {c.rows.map(([k, v]) => (
                  <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PORTFOLIO MAP / ANNOTATED AERIAL ═══════════════════
   The three buildings on a downtown aerial, parcels outlined (no clouding) with
   circular building callouts and a "Ware, MA" anchor placed low so it doesn't
   cover the parcels (per Jake's "move the label lower" note). */
function PortfolioMap({ pageNum }) {
  const pins = [
    { label: '27 Parker Street', img: '/photos/ware/p27.jpg' },
    { label: '28-30 & 28.5 North St', img: '/photos/ware/n2830.jpg' },
    { label: '38 North Street', img: '/photos/ware/n38.jpg' },
  ]
  return (
    <div className="page">
      <PageHeader section="Portfolio Map" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Portfolio <span style={{ color: ORANGE }}>Map</span></div>
        <div className="title-rule" />
        <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/ware/cover-aerial.jpg" alt="Ware Portfolio — aerial with the three buildings outlined" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center 42%' }} />
          {/* Circular building callouts across the top */}
          <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {pins.map(p => (
              <div key={p.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--golden)', boxShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>
                  <img src={p.img} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ background: 'rgba(40,27,18,0.82)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '3px 9px', borderRadius: 3, whiteSpace: 'nowrap' }}>{p.label}</div>
              </div>
            ))}
          </div>
          {/* Town anchor — placed low so it doesn't cover the parcels */}
          <div style={{ position: 'absolute', left: 24, bottom: 22, background: 'rgba(255,255,255,0.92)', borderLeft: `4px solid ${ORANGE}`, padding: '7px 14px', borderRadius: 3 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>Ware, MA</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--stone)', letterSpacing: '0.06em', marginTop: 2 }}>Three contiguous parcels · Downtown</div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ PER-BUILDING — BUILDING INFORMATION ═══════════════════
   Cleaned per Jake's markups: assessor "Total Rooms / Stories" raw codes that
   were crossed out are dropped; "Asbestos" dropped from 28-30; unit-level rent
   detail (from the rent roll) shown below building info. */
function BuildingInfo({ b, pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>{b.titleMain} <span style={{ color: ORANGE }}>{b.titleAccent}</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          {/* Left — hero photo + utilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
              <img src={b.hero} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="bldg-card" style={{ padding: '12px 14px' }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Utilities</h3>
              {b.utilities.map(([k, v]) => (
                <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
              ))}
            </div>
          </div>

          {/* Right — building information + unit detail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div className="bldg-card" style={{ padding: '12px 14px' }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building Information</h3>
              {b.info.map(([k, v]) => (
                <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={{ marginBottom: 5 }}>Unit Mix &amp; In-Place Rents</div>
              <table className="data-table" style={{ fontSize: 9.5 }}>
                <thead><tr><th>Unit</th><th>Type</th><th style={{ textAlign: 'right' }}>SF</th><th style={{ textAlign: 'right' }}>In-Place</th><th style={{ textAlign: 'right' }}>Pro Forma</th></tr></thead>
                <tbody>
                  {b.units.map((u, i) => (
                    <tr key={i}><td>{u[0]}</td><td>{u[1]}</td><td style={{ textAlign: 'right' }}>{u[2]}</td><td style={{ textAlign: 'right' }}>{u[3]}</td><td style={{ textAlign: 'right' }}>{u[4]}</td></tr>
                  ))}
                </tbody>
              </table>
              {/* TODO(Ravi): swap for the refreshed per-building unit-mix table when provided. */}
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ FINANCIAL CHARTS (shared) ═══════════════════ */
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
      {centerLabel && <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 22, fontWeight: 800, fill: 'var(--carbon)' }}>{centerLabel}</text>}
      {centerSub && <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.12em', fill: 'var(--stone)' }}>{centerSub}</text>}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1, maxWidth: 220 }}>
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18, minHeight: 0, padding: '0 8px' }}>
        {data.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ flex: '0 0 84px', textAlign: 'right', fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>{d.label}</span>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: `${(d.value / max) * 100}%`, height: 30, background: d.color, borderRadius: 4 }} />
            </div>
            <span style={{ flex: '0 0 74px', fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>${d.value.toLocaleString()}</span>
          </div>
        ))}
        {note && <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--golden)', marginTop: 2 }}>{note}</div>}
      </div>
    </div>
  )
}

/* ═══════════════════ PORTFOLIO UNIT MIX ═══════════════════ */
function UnitMix({ pageNum }) {
  const mix = [
    ['Studio', 1, 500, 1670, 1670, 1670],
    ['1 Bed', 7, 668, 1394, 1800, 1450],
    ['1 Bed - L', 2, 650, 1213, 1225, 1500],
    ['2 Bed', 6, 700, 1213, 1575, 1800],
    ['3 Bed', 4, 800, 1181, 1375, 1950],
  ]
  const unitType = [
    { label: 'One-Bedroom', value: 9, color: '#3F4753' },
    { label: 'Two-Bedroom', value: 6, color: '#F8971D' },
    { label: 'Three-Bedroom', value: 4, color: '#B55D37' },
    { label: 'Studio', value: 1, color: '#9AA6B2' },
  ]
  const upside = [
    { label: 'In-Place', value: 1293, color: '#3F4753' },
    { label: 'Pro Forma', value: 1671, color: '#F8971D' },
  ]
  return (
    <div className="page">
      <PageHeader section="Unit Mix" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Portfolio <span style={{ color: ORANGE }}>Unit Mix</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 11.5 }}>
          <thead><tr><th>Unit Type</th><th style={{ textAlign: 'center' }}># of Units</th><th style={{ textAlign: 'right' }}>SF</th><th style={{ textAlign: 'right' }}>Current Rent</th><th style={{ textAlign: 'right' }}>High Achieved Rent</th><th style={{ textAlign: 'right' }}>Pro Forma</th></tr></thead>
          <tbody>
            {mix.map((m, i) => (
              <tr key={i}>
                <td>{m[0]}</td>
                <td style={{ textAlign: 'center' }}>{m[1]}</td>
                <td style={{ textAlign: 'right' }}>{m[2]}</td>
                <td style={{ textAlign: 'right' }}>${m[3].toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m[4].toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>${m[5].toLocaleString()}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Annual Total</strong></td>
              <td style={{ textAlign: 'center' }}><strong>20</strong></td>
              <td style={{ textAlign: 'right' }}><strong>&mdash;</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$310,260</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$380,040</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$401,040</strong></td>
            </tr>
            <tr>
              <td><strong>Average</strong></td>
              <td style={{ textAlign: 'center' }}></td>
              <td style={{ textAlign: 'right' }}><strong>694</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,293</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,584</strong></td>
              <td style={{ textAlign: 'right' }}><strong>$1,671</strong></td>
            </tr>
          </tbody>
        </table>

        {/* TODO(Ravi): unit-mix / rent graphs to be provided — interim charts below. */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 40, marginTop: 38, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          <ChartCard title="Unit Type" data={unitType} centerLabel="20" centerSub="UNITS" size={168} />
          <BarChartCard title="Rent Upside — Avg Rent / Unit" data={upside} note="+$378 / unit · +29% mark-to-market" />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RENT ROLL ═══════════════════
   Per Jake: no cents; "Monthly Total" label at far left of the total row. */
function RentRoll({ pageNum }) {
  const rows = [
    ['27 Parker Street', '1', '1 Bed', 625, 1800, 1800, 1450],
    ['27 Parker Street', '2', '1 Bed', 625, 1375, 1800, 1450],
    ['27 Parker Street', '3', '2 Bed', 700, 1200, 1575, 1800],
    ['27 Parker Street', '4', '3 Bed', 800, 1375, 1375, 1950],
    ['28.5 North Street', '1', '2 Bed', 700, 1225, 1575, 1800],
    ['28.5 North Street', '2', '1 Bed - L', 650, 1225, 1225, 1500],
    ['28.5 North Street', '3', '1 Bed', 625, 1150, 1800, 1450],
    ['28-30 North Street', '28-1', '2 Bed', 700, 950, 1575, 1800],
    ['28-30 North Street', '28-2', '2 Bed', 700, 1125, 1575, 1800],
    ['28-30 North Street', '28-3', '1 Bed - L', 650, 1200, 1225, 1500],
    ['28-30 North Street', '30-1', 'Studio', 500, 1670, 1670, 1670],
    ['28-30 North Street', '30-2', '2 Bed', 700, 1575, 1575, 1800],
    ['28-30 North Street', '30-3', '1 Bed', 625, 1475, 1800, 1450],
    ['28-30 North Street', '30-4', '1 Bed', 625, 1750, 1800, 1450],
    ['28-30 North Street', '30-5', '2 Bed', 700, 1200, 1575, 1800],
    ['28-30 North Street', '30-6', '3 Bed', 800, 1125, 1375, 1950],
    ['28-30 North Street', '30-7', '3 Bed', 800, 950, 1375, 1950],
    ['28-30 North Street', '30-8', '3 Bed', 800, 1275, 1375, 1950],
    ['38 North Street', '1', '1 Bed', 775, 1160, 1800, 1450],
    ['38 North Street', '2', '1 Bed', 775, 1050, 1800, 1450],
  ]
  const td = { padding: '2px 8px' }
  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: ORANGE }}>Roll</span></div>
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 9.5 }}>
          <thead><tr>
            <th style={td}>Property</th><th style={td}>Unit #</th><th style={td}>Unit Type</th>
            <th style={{ ...td, textAlign: 'right' }}>SF</th><th style={{ ...td, textAlign: 'right' }}>Current Rent</th>
            <th style={{ ...td, textAlign: 'right' }}>High Achieved Rent</th><th style={{ ...td, textAlign: 'right' }}>Pro Forma</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={td}>{r[0]}</td><td style={td}>{r[1]}</td><td style={td}>{r[2]}</td>
                <td style={{ ...td, textAlign: 'right' }}>{r[3]}</td>
                <td style={{ ...td, textAlign: 'right' }}>${r[4].toLocaleString()}</td>
                <td style={{ ...td, textAlign: 'right' }}>${r[5].toLocaleString()}</td>
                <td style={{ ...td, textAlign: 'right' }}>${r[6].toLocaleString()}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td style={td}><strong>Monthly Total</strong></td>
              <td style={td}></td><td style={td}></td>
              <td style={{ ...td, textAlign: 'right' }}><strong>13,875</strong></td>
              <td style={{ ...td, textAlign: 'right' }}><strong>$25,855</strong></td>
              <td style={{ ...td, textAlign: 'right' }}><strong>$31,670</strong></td>
              <td style={{ ...td, textAlign: 'right' }}><strong>$33,420</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ INCOME & EXPENSE ═══════════════════
   Per Jake: truncate at NOI (Debt Service / Cashflow / Cash-on-Cash removed).
   Current + Pro Forma columns with $/Unit, per the underwriting (Analysis tab). */
function IncomeExpense({ pageNum }) {
  const tdl = { fontSize: 9.5, padding: '3px 10px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)' }
  const tds = { fontSize: 9.5, padding: '3px 10px', textAlign: 'right' }
  const thl = { fontSize: 8, padding: '4px 10px', textAlign: 'left', color: '#fff' }
  const thr = { fontSize: 8, padding: '4px 10px', textAlign: 'right', color: '#fff' }
  const totBg = { background: 'var(--carbon)', color: '#fff', fontWeight: 700, fontSize: 9.5, padding: '3px 10px', textAlign: 'right' }
  const noiBg = { background: 'var(--golden)', color: '#fff', fontWeight: 800, fontSize: 10.5, padding: '4px 10px', textAlign: 'right' }

  // [label, current, currentPerUnit, proforma, proformaPerUnit, bold]
  const income = [
    ['Gross Scheduled Rent', '$310,260', '', '$401,040', ''],
    ['Vacancy & Collections Loss (5%)', '-$15,513', '', '-$20,052', ''],
    ['Effective Rental Income', '$294,747', '', '$380,988', '', true],
    ['Laundry', '$0', '$0', '$3,000', '$150'],
  ]
  const expenses = [
    ['Property Management (5%)', '$14,737', '$737', '$19,199', '$960'],
    ['Real Estate Tax', '$15,461', '$773', '$15,461', '$773'],
    ['Property Insurance', '$12,283', '$614', '$12,283', '$614'],
    ['Electric & Gas', '$3,812', '$191', '$3,812', '$191'],
    ['Water and Sewer', '$11,614', '$581', '$11,614', '$581'],
    ['Trash Removal', '$8,561', '$428', '$8,561', '$428'],
    ['Repairs and Maintenance', '$10,000', '$500', '$10,000', '$500'],
    ['Landscaping / Snow Removal', '$9,073', '$454', '$9,073', '$454'],
    ['Payroll', '$5,000', '$250', '$5,000', '$250'],
  ]
  const Cols = () => (
    <colgroup>
      <col style={{ width: '34%' }} />
      <col style={{ width: '18%' }} /><col style={{ width: '14%' }} />
      <col style={{ width: '18%' }} /><col style={{ width: '14%' }} />
    </colgroup>
  )
  const Head = ({ first }) => (
    <thead>
      <tr style={{ background: 'var(--carbon)' }}>
        <th style={thl}>{first}</th>
        <th style={thr}>Current</th><th style={thr}>$/Unit</th>
        <th style={thr}>Pro Forma</th><th style={thr}>$/Unit</th>
      </tr>
    </thead>
  )
  const Row = ([label, cur, curU, pf, pfU, bold], i) => {
    const w = bold ? { fontWeight: 700 } : null
    return (
      <tr key={label} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
        <td style={{ ...tdl, ...w }}>{label}</td>
        <td style={{ ...tds, ...w }}>{cur}</td><td style={{ ...tds, ...w }}>{curU}</td>
        <td style={{ ...tds, ...w }}>{pf}</td><td style={{ ...tds, ...w }}>{pfU}</td>
      </tr>
    )
  }
  const noi = [
    { label: 'Net Operating Income — Current', val: '$204,206' },
    { label: 'Net Operating Income — Pro Forma', val: '$288,985' },
  ]
  return (
    <div className="page">
      <PageHeader section="Income & Expense" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Income &amp; <span style={{ color: ORANGE }}>Expense</span></div>
        <div className="title-rule" style={{ marginBottom: 6 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, paddingBottom: 8, marginBottom: 10, borderBottom: '1px solid var(--border)' }}>
          {noi.map(n => (
            <div key={n.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--golden)', lineHeight: 1, marginBottom: 3 }}>{n.val}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', fontWeight: 600 }}>{n.label}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Income Summary</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, tableLayout: 'fixed' }}>
          <Cols /><Head first="Income" />
          <tbody>
            {income.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Effective Gross Income</td><td style={totBg}>$294,747</td><td style={totBg}></td><td style={totBg}>$383,988</td><td style={totBg}></td></tr>
          </tbody>
        </table>

        <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>Expense Summary</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <Cols /><Head first="Expense" />
          <tbody>
            {expenses.map(Row)}
            <tr><td style={{ ...totBg, textAlign: 'left' }}>Total Expense</td><td style={totBg}>$90,541</td><td style={totBg}>$4,527</td><td style={totBg}>$95,003</td><td style={totBg}>$4,750</td></tr>
            <tr><td style={{ ...noiBg, textAlign: 'left' }}>Net Operating Income</td><td style={noiBg}>$204,206</td><td style={noiBg}></td><td style={noiBg}>$288,985</td><td style={noiBg}></td></tr>
          </tbody>
        </table>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ LOCATION OVERVIEW ═══════════════════
   Per Jake: first line reads "Ware Portfolio is located..." */
function LocationOverview({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Ware, <span style={{ color: ORANGE }}>Massachusetts</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Pioneer Valley · Between Springfield &amp; Worcester</div>
          <div className="title-rule" />
          {/* TODO(Ravi): refreshed Location Summary writing to drop in here. */}
          <div style={{ fontSize: 10.6, lineHeight: 1.55, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p>
              Ware Portfolio is located in Ware, Massachusetts, a small town situated in the Amherst / East Hampshire
              County submarket of the Amherst Town&ndash;Northampton MSA. Ware sits at the eastern edge of Hampshire
              County, approximately equidistant between Springfield and Worcester, offering residents access to the
              Pioneer Valley&rsquo;s employment base, healthcare institutions, and the University of Massachusetts
              Amherst, the region&rsquo;s largest employer and a persistent driver of rental demand. The immediate
              trade area within a three-mile radius supports a population of approximately 9,100 residents across
              roughly 3,900 households, with demographic characteristics consistent with a renter-by-necessity market
              and limited homeownership attainability.
            </p>
            <p>
              The Amherst / East Hampshire County multifamily submarket contains roughly 4,000 units of inventory and
              carries a current vacancy rate of 3.9%, modestly above its five-year average due to a near-term wave of
              new supply, with vacancy forecast to compress back toward that average by year-end 2026. With only 77
              units currently under construction and no proposed pipeline beyond that, the submarket&rsquo;s supply
              constraints support durable rent fundamentals. The 1- and 2-Star segment, the direct competitive tier
              for this portfolio, reflects healthy absorption at the price point where this asset competes, with
              vacancy in that cohort running at 5.0%.
            </p>
          </div>
        </div>
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/ware/aerial-context.jpg" alt="Downtown Ware, MA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/ware/aerial-wide.jpg" alt="Ware, MA — Pioneer Valley" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ EMPLOYMENT, EDUCATION & DEMOGRAPHICS ═══════════════════ */
function EmploymentEducation({ pageNum }) {
  const employers = ['Baystate Health', 'UMass Memorial Health', 'MassMutual', 'Ware Public Schools']
  const colleges = ['University of Massachusetts Amherst', 'Amherst College', 'Smith College', 'Mount Holyoke College', 'Hampshire College', 'Holyoke Community College', 'Worcester Polytechnic Institute (WPI)']
  const Stat = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border)', padding: '6px 0' }}>
      <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--carbon)' }}>{label}</span>
      <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--carbon)' }}>{value}</span>
    </div>
  )
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Employment, Education &amp; <span style={{ color: ORANGE }}>Demographics</span></div>
        <div className="title-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Major Employers</div>
              {employers.map(e => (
                <div key={e} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11, marginBottom: 7, fontSize: 11.5, fontWeight: 700, color: 'var(--carbon)' }}>{e}</div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Higher Education</div>
              <ul className="highlights" style={{ fontSize: 10.6 }}>
                {colleges.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Population &amp; Business</div>
              <Stat label="2022 Total Population" value="~9,900" />
              <Stat label="2027 Projected Population" value="~10,149" />
              <Stat label="2022 Est. Total Employees" value="~2,455" />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Households &amp; Income</div>
              <Stat label="2022 Total Households" value="~2,700" />
              <Stat label="Average Household Income" value="$69,616" />
              <Stat label="Median Household Income" value="$67,475" />
            </div>
            {/* TODO(Ravi): demographic graphs to be provided. */}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ BUILDING DATA ═══════════════════ */
const BUILDINGS = {
  p27: {
    name: '27 Parker Street', titleMain: '27 Parker', titleAccent: 'Street',
    hero: '/photos/ware/p27.jpg',
    info: [['Year Built', '1890'], ['Building Type', 'Apartment (4-Unit)'], ['Units', '4'], ['Living Area', '2,822 SF'], ['Stories', '3'], ['Exterior Wall', 'Vinyl'], ['Roof', 'Asphalt Shingle · Gable'], ['Heat', 'Forced Hot Water'], ['Heat Fuel', 'Propane'], ['A/C', 'None']],
    utilities: [['Heat', 'Electric & Propane · Tenant Paid'], ['Hot Water', 'Electric & Propane · Tenant Paid'], ['Electric', 'Tenant Paid'], ['Water & Sewer', 'Landlord Paid'], ['Trash', 'Landlord Paid']],
    units: [['1', '1 Bed', '625', '$1,800', '$1,450'], ['2', '1 Bed', '625', '$1,375', '$1,450'], ['3', '2 Bed', '700', '$1,200', '$1,800'], ['4', '3 Bed', '800', '$1,375', '$1,950']],
  },
  n2830: {
    name: '28-30 & 28.5 North Street', titleMain: '28-30 & 28.5', titleAccent: 'North Street',
    hero: '/photos/ware/n2830.jpg',
    // "Asbestos" exterior-wall line dropped per Jake; raw assessor room/story codes omitted.
    info: [['Year Built', '1932'], ['Building Type', 'Apartment Building'], ['Units', '14'], ['Living Area', '6,800 SF'], ['Roof', 'Asphalt Shingle · Gable'], ['Heat', 'Forced Hot Air'], ['Heat Fuel', 'Oil'], ['A/C', 'None']],
    utilities: [['Heat', 'Electric & Propane · Tenant Paid'], ['Hot Water', 'Electric & Propane · Tenant Paid'], ['Electric', 'Tenant Paid'], ['Water & Sewer', 'Landlord Paid'], ['Trash', 'Landlord Paid']],
    units: [['28-1', '2 Bed', '700', '$950', '$1,800'], ['28-2', '2 Bed', '700', '$1,125', '$1,800'], ['28-3', '1 Bed - L', '650', '$1,200', '$1,500'], ['30-1', 'Studio', '500', '$1,670', '$1,670'], ['30-2', '2 Bed', '700', '$1,575', '$1,800'], ['30-3', '1 Bed', '625', '$1,475', '$1,450'], ['30-4', '1 Bed', '625', '$1,750', '$1,450'], ['30-5', '2 Bed', '700', '$1,200', '$1,800'], ['30-6', '3 Bed', '800', '$1,125', '$1,950'], ['30-7', '3 Bed', '800', '$950', '$1,950'], ['30-8', '3 Bed', '800', '$1,275', '$1,950'], ['28.5-1', '2 Bed', '700', '$1,225', '$1,800'], ['28.5-2', '1 Bed - L', '650', '$1,225', '$1,500'], ['28.5-3', '1 Bed', '625', '$1,150', '$1,450']],
  },
  n38: {
    name: '38 North Street', titleMain: '38 North', titleAccent: 'Street',
    hero: '/photos/ware/n38.jpg',
    info: [['Year Built', '1880'], ['Building Type', 'Two-Family'], ['Units', '2'], ['Living Area', '1,576 SF'], ['Stories', '2'], ['Exterior Wall', 'Vinyl'], ['Roof', 'Asphalt Shingle · Gable'], ['Heat', 'Forced Hot Water'], ['Heat Fuel', 'Oil'], ['A/C', 'None']],
    utilities: [['Heat', 'Oil & Electric · Tenant Paid'], ['Hot Water', 'Electric · Tenant Paid'], ['Electric', 'Tenant Paid'], ['Water & Sewer', 'Landlord Paid'], ['Trash', 'Landlord Paid']],
    units: [['1', '1 Bed', '775', '$1,160', '$1,450'], ['2', '1 Bed', '775', '$1,050', '$1,450']],
  },
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function App() {
  const pages = [
    <CoverHero />,
    <Toc />,
    <DealContacts />,
    <ExecutiveSummary />,
    <InvestmentHighlights />,

    <Divider eyebrow="01" title="The Property" image="/photos/ware/aerial-context.jpg" />,
    <PortfolioOverview />,
    <PortfolioMap />,

    <BuildingInfo b={BUILDINGS.p27} />,
    <PhotoGallery section="Property Photography" title="27 Parker Street" accent="Exteriors"
      hero="/photos/ware/p27-ext1.jpg" tiles={['/photos/ware/p27.jpg', '/photos/ware/p27-ext2.jpg', '/photos/ware/p27-ext3.jpg']} />,
    <PhotoGallery section="Property Photography" title="27 Parker Street" accent="Interiors"
      hero="/photos/ware/p27-int1.jpg" tiles={['/photos/ware/p27-int2.jpg', '/photos/ware/p27-int3.jpg', '/photos/ware/p27-int4.jpg']} />,

    <BuildingInfo b={BUILDINGS.n2830} />,
    <PhotoGallery section="Property Photography" title="28-30 & 28.5 North Street" accent="Exteriors"
      hero="/photos/ware/n2830-ext1.jpg" tiles={['/photos/ware/n2830.jpg', '/photos/ware/n2830-ext2.jpg', '/photos/ware/n2830-ext3.jpg']} />,
    <PhotoGallery section="Property Photography" title="28-30 & 28.5 North Street" accent="Interiors"
      hero="/photos/ware/n2830-int1.jpg" tiles={['/photos/ware/n2830-int2.jpg', '/photos/ware/n2830-int3.jpg', '/photos/ware/n2830-int4.jpg']} />,

    <BuildingInfo b={BUILDINGS.n38} />,
    <PhotoGallery section="Property Photography" title="38 North Street" accent="Exteriors"
      hero="/photos/ware/n38.jpg" tiles={['/photos/ware/n38-ext1.jpg', '/photos/ware/n38-ext2.jpg', '/photos/ware/n38-ext3.jpg']} />,
    <PhotoGallery section="Property Photography" title="38 North Street" accent="Interiors"
      hero="/photos/ware/n38-int1.jpg" tiles={['/photos/ware/n38-int2.jpg', '/photos/ware/n38-int3.jpg', '/photos/ware/n38-int4.jpg']} />,

    <Divider eyebrow="02" title="Financial Analysis" image="/photos/ware/n2830.jpg" />,
    <UnitMix />,
    <RentRoll />,
    <IncomeExpense />,

    <Divider eyebrow="03" title="Location & Market" image="/photos/ware/aerial-wide.jpg" />,
    <LocationOverview />,
    <EmploymentEducation />,

    <Divider eyebrow="04" title="The Team" image="/photos/ware/p27.jpg" />,
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
