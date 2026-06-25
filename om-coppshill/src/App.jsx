import './App.css'
import { cloneElement } from 'react'
import Toc from './Toc.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import { DEAL, ADDR, CITY_STATE, FULL_ADDR, PageHeader, PageFooter, StaticShell } from './Shell.jsx'

/* ═══════════════════ LIFTED PAGE ═══════════════════
   Bespoke pages — site plan, building overviews, tenant pages, and every
   map/aerial — are lifted as branded images from the original Canva deck
   (public/maps/, footer bar cropped off). Each is dropped into the engine
   frame here: our dark PageHeader on top, our PageFooter below, the Canva
   artwork contained between them. Swap `src` to retune any single page. */
function LiftedPage({ section, src, pageNum }) {
  return (
    <div className="page">
      <PageHeader section={section} />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '8px 12px' }}>
        <img src={src} alt={section} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 1 — COVER HERO ═══════════════════ */
function CoverHero({ pageNum }) {
  return (
    <div className="page">
      <div className="cover-hero photo-hero">
        <img className="cover-hero-img" src={DEAL.coverImage} alt="" />
        {/* Gradient hugs the bottom so the upper aerial stays bright while the
            title block seats on a darkened base. */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, bottom: 44, top: 'auto', textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }}>{DEAL.status}</div>
          <div className="cover-hero-name" style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.02, marginBottom: 8 }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 22, fontWeight: 600 }}>{ADDR}</div>
          <div className="cover-hero-sub">{DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={{ marginLeft: 'auto', marginRight: 0 }} />
          <div className="cover-hero-prep">{DEAL.type}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 3 — DEAL CONTACTS ═══════════════════ */
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
            <img className="dc-avatar" src="https://northeastpcg.com/wp-content/uploads/2021/11/Jeff-Wright-430x488.png" alt="Jeff Wright" style={{ border: '3px solid var(--golden)', boxShadow: '0 0 0 2px #fff inset' }} />
            <div className="dc-name">Jeff Wright</div>
            <div className="dc-title">Vice President, Investments</div>
            <div className="dc-meta" style={{ fontWeight: 700 }}>Direct: (203) 556-5950</div>
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

/* ═══════════════════ 4 — THE OFFERING ═══════════════════ */
function TheOffering({ pageNum }) {
  const stats = [
    { v: '±47,025', l: 'Rentable SF' },
    { v: '42', l: 'Units / Suites' },
    { v: '2.29', l: 'Acres' },
    { v: '100%', l: 'Leased' },
  ]
  const summary = [
    ['Residential', '14', '6,719'],
    ['Retail', '14', '27,182'],
    ['Office', '11', '4,200'],
    ['Shared Professional Suite', '2', '7,042'],
    ['Storage', '1', '1,900'],
  ]
  return (
    <div className="page">
      <PageHeader section="The Offering" />
      <div className="section" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div className="eyebrow">Overview</div>
        <div className="section-title">The <span style={{ color: '#F8971D' }}>Offering</span></div>
        <div className="title-rule" />

        {/* Headline stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 26, flex: 1, minHeight: 0 }}>
          {/* Left — narrative + property summary */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <p style={{ fontSize: 11, lineHeight: 1.55, marginBottom: 9 }}>
              <strong>Northeast Private Client Group is pleased to exclusively present for sale Copps Hill Commons in
              Ridgefield, CT.</strong> Copps Hill Commons is comprised of four mixed-use buildings located in the heart of
              Ridgefield&rsquo;s core retail corridor. The Property totals ±47,025 rentable square feet on 2.29 acres and
              is 100% leased — configured into fourteen street-level retail suites, fourteen residential units, eleven
              small-office suites, and two shared professional suites.
            </p>
            <p style={{ fontSize: 11, lineHeight: 1.55, marginBottom: 12 }}>
              Its position in the center of Ridgefield&rsquo;s primary retail corridor — the commercial core of a town
              repeatedly named &ldquo;Connecticut&rsquo;s #1 Town&rdquo; by Connecticut Magazine — gives it outstanding
              access to elite demographics and consumer spending. Ridgefield&rsquo;s central location between Danbury and
              Norwalk keeps Stamford, Greenwich, and White Plains within a 45-minute commute.
            </p>

            <div className="eyebrow" style={{ marginBottom: 6 }}>Property Summary</div>
            <table className="data-table" style={{ fontSize: 10.6 }}>
              <thead>
                <tr>
                  <th>Space Type</th>
                  <th style={{ textAlign: 'center' }}>Units / Suites</th>
                  <th style={{ textAlign: 'right' }}>Total SF</th>
                </tr>
              </thead>
              <tbody>
                {summary.map(([t, u, sf]) => (
                  <tr key={t}>
                    <td>{t}</td>
                    <td style={{ textAlign: 'center' }}>{u}</td>
                    <td style={{ textAlign: 'right' }}>{sf}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>Total</strong></td>
                  <td style={{ textAlign: 'center' }}><strong>42</strong></td>
                  <td style={{ textAlign: 'right' }}><strong>47,025</strong></td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 18px', marginTop: 12, fontSize: 10.4 }}>
              <div className="bldg-row"><span className="bldg-label">Address</span><span className="bldg-val">103–109 Danbury Rd</span></div>
              <div className="bldg-row"><span className="bldg-label">Site Area</span><span className="bldg-val">2.29 Acres</span></div>
              <div className="bldg-row"><span className="bldg-label">Year(s) Built</span><span className="bldg-val">1983 · 1984 · 1985 · 2009</span></div>
              <div className="bldg-row"><span className="bldg-label">Parking</span><span className="bldg-val">±105 Spaces</span></div>
              <div className="bldg-row"><span className="bldg-label">Buildings</span><span className="bldg-val">4</span></div>
              <div className="bldg-row"><span className="bldg-label">Zoning</span><span className="bldg-val">B-1 (Business)</span></div>
            </div>
          </div>

          {/* Right — imagery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
            <div style={{ flex: 1.4, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/aerial-front.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
              <img src="/photos/aerial-top.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ 5 — INVESTMENT HIGHLIGHTS ═══════════════════ */
function InvestmentHighlights({ pageNum }) {
  const boxes = [
    {
      title: 'Location & Demographics',
      items: [
        { head: 'Prime Retail Location', body: 'In the heart of Ridgefield&rsquo;s commercial corridor, shadow-anchored by Stop & Shop, HomeGoods, Marshalls, and Michael&rsquo;s, with an average daily traffic count of roughly 48,100 vehicles.' },
        { head: 'Outstanding Demographics', body: 'An affluent trade area with average household income over $218,908 and a median home value above $903,723 — consumers with substantial disposable income.' },
      ],
    },
    {
      title: 'Tenancy & Stability',
      items: [
        { head: 'Diverse Mix of Uses & Tenants', body: 'National retailers, local favorites, specialty grocers, gourmet food, and restaurants alongside fitness, health & wellness, education, beauty, and professional office — plus fourteen residential units (nine studios, one one-bed with loft, four two-beds).' },
        { head: '100% Leased & Professionally Managed', body: 'Fully occupied with many long-term tenants, a proven occupancy track record, and a steadily growing bottom line under decades of professional ownership.' },
      ],
    },
  ]
  const photos = ['/maps/bldg-109-a.jpg', '/photos/aerial-wide.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, minHeight: 0, paddingTop: 6 }}>
          {(() => {
            const TextBox = (g, key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '2px 6px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 9, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>{g.title}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-evenly', minHeight: 0 }}>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--carbon)', marginBottom: 4, lineHeight: 1.2 }}>{it.head}</div>
                      <p style={{ fontSize: 10.2, lineHeight: 1.46, color: 'var(--graphite)' }} dangerouslySetInnerHTML={{ __html: it.body }} />
                    </div>
                  ))}
                </div>
              </div>
            )
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

/* ═══════════════════ BUILDING SPECIFICATIONS ═══════════════════
   Four-building comparison — one column per address, built from each building's
   Canva "Building Description" page. */
function BuildingSpecs({ pageNum }) {
  const cols = ['103', '105', '107', '109']
  const rows = [
    ['Property Type', 'Retail & Residential', 'Retail & Office', 'Retail & Residential', 'Retail & Office'],
    ['Year Built', '1984', '2009', '1983', '1983'],
    ['Building SF', '7,519', '8,092', '10,529', '20,885'],
    ['Retail (units / SF)', '1 · 2,200', '3 · 4,822', '2 · 7,229', '8 · 12,931'],
    ['Residential (units / SF)', '12 · 5,319', '—', '2 · 1,400', '—'],
    ['Office / Storage (units / SF)', '—', '1 · 3,270', '1 · 1,900', '12 · 7,954'],
    ['Total Units', '13', '4', '5', '20'],
    ['Stories', '3', '2', '2', '3'],
    ['Construction', 'Wood Frame', 'Masonry', 'Frame', 'Frame'],
    ['Roof / Façade', 'Asphalt / Vinyl', 'Asphalt / Vinyl', 'Asphalt / Vinyl', 'Asphalt / Vinyl'],
    ['Lot Size', '0.26 ac', '0.48 ac', '1.55 ac*', '1.55 ac*'],
    ['Real Estate Taxes', '$30,531', '$37,460', '$99,684**', '$95,899**'],
  ]
  const cell = { fontSize: 10, padding: '4px 10px', textAlign: 'center', borderBottom: '1px solid var(--border)' }
  const labelCell = { ...cell, textAlign: 'left', fontWeight: 700, color: 'var(--carbon)' }
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Building <span style={{ color: '#F8971D' }}>Specifications</span></div>
        <div className="title-rule" />
        <p style={{ fontSize: 10.6, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 12 }}>
          Copps Hill Commons spans four contiguous mixed-use buildings at 103, 105, 107 &amp; 109 Danbury Road,
          blending street-level retail, second-floor office, and residential apartments across the assemblage.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--carbon)' }}>
              <th style={{ fontSize: 9.5, padding: '7px 10px', textAlign: 'left', color: '#fff', letterSpacing: '0.04em' }}>Specification</th>
              {cols.map(c => (
                <th key={c} style={{ fontSize: 11, padding: '7px 10px', textAlign: 'center', color: '#fff' }}>{c} Danbury Rd</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r[0]} style={i % 2 === 1 ? { background: 'var(--linen)' } : undefined}>
                <td style={labelCell}>{r[0]}</td>
                {r.slice(1).map((v, j) => <td key={j} style={cell}>{v}</td>)}
              </tr>
            ))}
            <tr style={{ background: 'var(--golden)' }}>
              <td style={{ fontSize: 10.5, padding: '6px 10px', textAlign: 'left', fontWeight: 800, color: '#fff' }}>Total — ±47,025 SF</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>13 units</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>4 units</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>5 units</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>20 units</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8.4, color: 'var(--stone)', marginTop: 9, lineHeight: 1.45 }}>
          *107 &amp; 109 Danbury Road share a single 1.55-acre parcel. **107 &amp; 109 are taxed as one property.
          Utilities across all buildings: water &amp; sewer are city, landlord-paid; electric/gas are separately metered
          and tenant-paid; internet/phone are tenant-paid. Figures per the most recent building descriptions and are
          approximate — buyers should verify all areas, taxes, and unit counts independently.
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
    <TheOffering />,
    <InvestmentHighlights />,

    <Divider eyebrow="01" title="The Property" image="/photos/aerial-front.jpg" />,
    <LiftedPage section="Site Plan" src="/maps/site-aerial.jpg" />,
    <LiftedPage section="Site Plan" src="/maps/site-plan.jpg" />,
    <BuildingSpecs />,
    <LiftedPage section="103 Danbury Road" src="/maps/bldg-103-a.jpg" />,
    <LiftedPage section="103 Danbury Road" src="/maps/bldg-103-b.jpg" />,
    <LiftedPage section="105 Danbury Road" src="/maps/bldg-105.jpg" />,
    <LiftedPage section="107 Danbury Road" src="/maps/bldg-107.jpg" />,
    <LiftedPage section="109 Danbury Road" src="/maps/bldg-109-a.jpg" />,
    <LiftedPage section="109 Danbury Road" src="/maps/bldg-109-b.jpg" />,
    <LiftedPage section="109 Danbury Road" src="/maps/bldg-109-c.jpg" />,
    ...PHOTO_PAGES.map(p => (p.kind === 'comingsoon' ? <PhotoComingSoon {...p} /> : <PhotoGallery {...p} />)),

    <Divider eyebrow="02" title="The Tenants" image="/photos/aerial-wide.jpg" />,
    <LiftedPage section="103 Danbury Road · Tenant" src="/maps/tenants-103.jpg" />,
    <LiftedPage section="105 Danbury Road · Tenants" src="/maps/tenants-105.jpg" />,
    <LiftedPage section="107 Danbury Road · Tenants" src="/maps/tenants-107.jpg" />,
    <LiftedPage section="109 Danbury Road · Tenants" src="/maps/tenants-109.jpg" />,

    <Divider eyebrow="03" title="Location & Market" image="/photos/aerial-top.jpg" />,
    <LiftedPage section="Local Map" src="/maps/local-map.jpg" />,
    <LiftedPage section="Aerial Overview" src="/maps/aerial-context-1.jpg" />,
    <LiftedPage section="Aerial Overview" src="/maps/aerial-context-2.jpg" />,
    <LiftedPage section="Drive Times" src="/maps/drive-time.jpg" />,
    <LiftedPage section="Regional Map" src="/maps/regional-map.jpg" />,
    <LiftedPage section="Ridgefield Town Center" src="/maps/town-center.jpg" />,
    <LiftedPage section="Retail Trade Area" src="/maps/trade-area.jpg" />,
    <LiftedPage section="Ridgefield Area Amenities" src="/maps/amenities-1.jpg" />,
    <LiftedPage section="Ridgefield Area Amenities" src="/maps/amenities-2.jpg" />,
    <LiftedPage section="Ridgefield, CT" src="/maps/ridgefield-demo.jpg" />,
    <LiftedPage section="Fairfield County Overview" src="/maps/fairfield-county.jpg" />,

    <Divider eyebrow="04" title="The Team" image="/photos/aerial-cover.jpg" />,
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
