import './App.css'
import { cloneElement, useState, useRef } from 'react'
import Toc from './Toc.jsx'
import { PhotoGallery, PhotoComingSoon } from './PhotoPages.jsx'
import { PHOTO_PAGES } from './photos.js'
import Divider from './Divider.jsx'
import LocationsPage from './LocationsPage.jsx'
import TeamPage from './TeamPage.jsx'
import DriveTimeMap from './DriveTimeMap.jsx'
import { TENANT_LOGOS } from './tenantLogos.js'
import LocationMap from './LocationMap.jsx'
import RegionalMap from './RegionalMap.jsx'
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

/* ═══════════════════ PIN LAYER ═══════════════════
   Reusable overlay of circular building photo pins, anchored by % over whatever
   aerial it's dropped on. Self-contained: it fills its (position:relative)
   parent via inset:0. In dev (npm run dev) the pins drag and a readout prints
   the current coordinates — copy them back into the source array, and they
   freeze for the production build / PDF. */
const MAP_ORANGE = '#F8971D'
function PinLayer({ pins: initial, varName = 'PINS' }) {
  const EDIT = import.meta.env.DEV
  const [pins, setPins] = useState(initial)
  const ref = useRef(null)
  const dragIdx = useRef(-1)
  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100))
    setPins(ps => ps.map((p, i) => i === dragIdx.current ? { ...p, x: +x.toFixed(1), y: +y.toFixed(1) } : p))
  }
  const onMove = (e) => { if (dragIdx.current >= 0) { e.preventDefault(); setFromEvent(e) } }
  const endDrag = () => { dragIdx.current = -1 }
  const coordText = pins.map(p => `  { label: '${p.label}', img: '${p.img}', x: ${p.x}, y: ${p.y} },`).join('\n')
  return (
    <div ref={ref} onMouseMove={onMove} onMouseUp={endDrag} onMouseLeave={endDrag}
      style={{ position: 'absolute', inset: 0, pointerEvents: EDIT ? 'auto' : 'none', zIndex: 5 }}>
      {pins.map((p, i) => (
        <div key={p.label}
          onMouseDown={EDIT ? (e) => { e.preventDefault(); dragIdx.current = i } : undefined}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: EDIT ? 'auto' : 'none', cursor: EDIT ? 'grab' : 'default', userSelect: 'none' }}>
          <div style={{ background: 'rgba(40,27,18,0.85)', color: '#fff', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.03em', padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap', marginBottom: 4 }}>{p.label}</div>
          <div style={{ width: 58, height: 58, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${MAP_ORANGE}`, boxShadow: '0 2px 7px rgba(0,0,0,0.5)' }}>
            <img src={p.img} alt={p.label} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `9px solid ${MAP_ORANGE}`, marginTop: -1, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))' }} />
        </div>
      ))}
      {EDIT && (
        <textarea readOnly value={`// ${varName}\n${coordText}`} onFocus={(e) => e.target.select()}
          style={{ position: 'absolute', top: 6, left: 6, width: 360, height: 92, fontFamily: 'monospace', fontSize: 10, lineHeight: 1.3, padding: 6, border: `1px solid ${MAP_ORANGE}`, borderRadius: 4, background: 'rgba(255,255,255,0.92)', color: '#222', resize: 'both', zIndex: 10, pointerEvents: 'auto' }} />
      )}
    </div>
  )
}

/* Pin coordinates — % of the frame; tip points at the building. Drag-tunable in
   dev (see the readout), frozen here for the PDF. */
const MAP_PINS = [
  { label: '107 Danbury Rd', img: '/photos/bldg-107.jpg', x: 29.8, y: 46.8 },
  { label: '109 Danbury Rd', img: '/photos/bldg-109.jpg', x: 81.3, y: 36.1 },
]
// Site Aerial uses a different (top-down) photo, so it carries its own positions.
const SITE_PINS = [
  { label: '107 Danbury Rd', img: '/photos/bldg-107.jpg', x: 68.7, y: 48.5 },
  { label: '109 Danbury Rd', img: '/photos/bldg-109.jpg', x: 31.6, y: 35 },
]

/* ═══════════════════ FULL-BLEED IMAGE ═══════════════════
   Edge-to-edge photo page (no header/footer frame) — reuses the cover-hero
   treatment: section label top-left, NPCG logo top-right, page number bottom-
   right, all over a top scrim so the white chrome stays legible. Pass `pins`
   to overlay the draggable building pins. */
function FullBleedImage({ section, src, pageNum, pins, pinsVar = 'SITE_PINS', hideLabel }) {
  return (
    <div className="page">
      <div className="cover-hero" style={{ background: 'var(--carbon)' }}>
        <img className="cover-hero-img" src={src} alt={section} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '20%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))', pointerEvents: 'none' }} />
        {pins && <PinLayer pins={pins} varName={pinsVar} />}
        <div className="cover-hero-header" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{hideLabel ? '' : section}</div>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 40, maxWidth: 200, objectFit: 'contain' }} />
        </div>
        {pageNum != null && (
          <div style={{ position: 'absolute', right: 26, bottom: 18, color: '#fff', fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: '0.04em' }}>{pageNum}</div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════ SITE MAP ═══════════════════
   Aerial of the Copps Hill Commons assemblage with a circular photo pin over
   each building. */
function PropertyMap({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Site Map" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Site <span style={{ color: MAP_ORANGE }}>Map</span></div>
        <div className="title-rule" />
        <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/property-map.jpg" alt="Copps Hill Commons — Danbury Road aerial with 107 & 109 outlined" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center 50%' }} />
          <PinLayer pins={MAP_PINS} varName="MAP_PINS" />
        </div>
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
        {/* Lighter top scrim — just enough to seat the white title/status text
            while letting the aerial read through (kept off-dark for print). */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '55%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' }}>{DEAL.status}</div>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 44, maxWidth: 220, objectFit: 'contain' }} />
        </div>
        <div className="cover-hero-overlay" style={{ left: 40, right: 40, top: 68, bottom: 'auto', textAlign: 'left' }}>
          <div className="cover-hero-name" style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.04, margin: '0 0 12px' }}>{DEAL.name}</div>
          <div className="cover-hero-title" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2, margin: '0 0 4px' }}>{ADDR}</div>
          <div className="cover-hero-sub" style={{ margin: '0 0 16px' }}>{DEAL.cityLong}</div>
          <div className="cover-hero-rule" style={{ margin: '0 auto 14px 0' }} />
          <div className="cover-hero-prep" style={{ margin: 0 }}>{DEAL.type}</div>
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
    { v: '±31,414', l: 'Rentable SF' },
    { v: '25', l: 'Units / Suites' },
    { v: '1.55', l: 'Acres' },
    { v: '100%', l: 'Leased' },
  ]
  const summary = [
    ['Retail', '10', '20,160'],
    ['Office / Storage', '13', '9,854'],
    ['Residential', '2', '1,400'],
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
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gridTemplateRows: 'auto 1fr', columnGap: 26, rowGap: 14, flex: 1, minHeight: 0 }}>
          {/* Row 1, left — narrative (drives the row height; aerial matches it) */}
          <div>
            <p style={{ fontSize: 11.5, lineHeight: 1.72, marginBottom: 11 }}>
              <strong>Northeast Private Client Group is pleased to exclusively present for sale 107 &amp; 109 Danbury Road
              at Copps Hill Commons in Ridgefield, CT.</strong> The Property is comprised of two contiguous mixed-use
              buildings on a single 1.55-acre parcel in the heart of Ridgefield&rsquo;s core retail corridor, totaling
              ±31,414 rentable square feet and 100% leased — configured into ten street-level retail suites, thirteen
              office and storage suites, and two residential apartments.
            </p>
            <p style={{ fontSize: 11.5, lineHeight: 1.72, margin: 0 }}>
              Its position in the center of Ridgefield&rsquo;s primary retail corridor — the commercial core of a town
              repeatedly named &ldquo;Connecticut&rsquo;s #1 Town&rdquo; by Connecticut Magazine — gives it outstanding
              access to elite demographics and consumer spending. Ridgefield&rsquo;s central location between Danbury and
              Norwalk keeps Stamford, Greenwich, and White Plains within a 45-minute commute.
            </p>
          </div>

          {/* Row 1, right — aerial. Absolutely filled so it tracks the narrative's
              height exactly, so its bottom lines up with the text. */}
          <div style={{ position: 'relative', borderRadius: 3, overflow: 'hidden', minHeight: 0 }}>
            <img src="/photos/offering-aerial.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Row 2, left — Property Facts */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Property Facts</div>
            <div className="facts-lg" style={{ display: 'grid', gridTemplateColumns: '1fr', flex: 1, minHeight: 0, gridAutoRows: '1fr' }}>
              <div className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}><span className="bldg-label">Address</span><span className="bldg-val">107 &amp; 109 Danbury Rd</span></div>
              <div className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}><span className="bldg-label">Site Area</span><span className="bldg-val">1.55 Acres — Single Parcel</span></div>
              <div className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}><span className="bldg-label">Year Built</span><span className="bldg-val">1983</span></div>
              <div className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}><span className="bldg-label">Parking</span><span className="bldg-val">Surface Lot</span></div>
              <div className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}><span className="bldg-label">Buildings</span><span className="bldg-val">2</span></div>
              <div className="bldg-row" style={{ fontSize: 10.5 }}><span className="bldg-label">Zoning</span><span className="bldg-val">B-1 (Business)</span></div>
            </div>
          </div>

          {/* Row 2, right — Property Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Property Summary</div>
            <div className="facts-lg" style={{ display: 'grid', gridTemplateColumns: '1fr', flex: 1, minHeight: 0, gridAutoRows: '1fr' }}>
              {summary.map(([t, u, sf]) => (
                <div key={t} className="bldg-row" style={{ borderBottom: '1px solid #ececec', fontSize: 10.5 }}>
                  <span className="bldg-label">{t}</span>
                  <span className="bldg-val">{u} units · {sf} SF</span>
                </div>
              ))}
              <div className="bldg-row" style={{ fontSize: 10.5 }}>
                <span className="bldg-label" style={{ fontWeight: 800, color: 'var(--carbon)' }}>Total</span>
                <span className="bldg-val" style={{ fontWeight: 800 }}>25 units · 31,414 SF</span>
              </div>
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
        { head: 'Outstanding Demographics', body: 'An affluent trade area &mdash; average household income of $247,890 and median household income of $179,219, well ahead of Fairfield County ($167,632 / $110,000) &mdash; consumers with substantial disposable income.' },
      ],
    },
    {
      title: 'Tenancy & Stability',
      items: [
        { head: 'Diverse Mix of Uses & Tenants', body: 'National retailers, local favorites, specialty grocers, gourmet food, and restaurants alongside fitness, health & wellness, beauty, and professional office — plus two residential apartments above the retail.' },
        { head: '100% Leased & Professionally Managed', body: 'Fully occupied with many long-term tenants, a proven occupancy track record, and a steadily growing bottom line under decades of professional ownership.' },
      ],
    },
  ]
  const photos = ['/photos/highlights-tr.jpg', '/photos/highlights-bl.jpg']
  return (
    <div className="page">
      <PageHeader section="Investment Highlights" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Investment <span style={{ color: '#F8971D' }}>Highlights</span></div>
        <div className="title-rule" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, minHeight: 0, paddingTop: 4 }}>
          {(() => {
            const TextBox = (g, key) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '2px 6px' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 11, paddingBottom: 6, borderBottom: '2px solid var(--golden)' }}>{g.title}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 13 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--carbon)', marginBottom: 6, lineHeight: 1.22 }}>{it.head}</div>
                      <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--graphite)' }} dangerouslySetInnerHTML={{ __html: it.body }} />
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
  const cols = ['107', '109']
  const rows = [
    ['Property Type', 'Retail & Residential', 'Retail & Office'],
    ['Year Built', '1983', '1983'],
    ['Building SF', '10,529', '20,885'],
    ['Retail (units / SF)', '2 · 7,229', '8 · 12,931'],
    ['Residential (units / SF)', '2 · 1,400', '—'],
    ['Office / Storage (units / SF)', '1 · 1,900', '12 · 7,954'],
    ['Total Units', '5', '20'],
    ['Stories', '2', '3'],
    ['Construction', 'Frame', 'Frame'],
    ['Roof / Façade', 'Asphalt / Vinyl', 'Asphalt / Vinyl'],
    ['Lot Size', '1.55 ac*', '1.55 ac*'],
    ['Real Estate Taxes', '$99,684**', 'incl. w/ 107**'],
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
          107 &amp; 109 Danbury Road are two contiguous mixed-use buildings on a single 1.55-acre parcel,
          blending street-level retail, second-floor office, and residential apartments.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, flex: 1, minHeight: 0, marginBottom: 12 }}>
          {[['/photos/bldg-107.jpg', '107 Danbury Road'], ['/photos/bldg-109.jpg', '109 Danbury Road']].map(([src, label]) => (
            <div key={label} style={{ position: 'relative', minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
              <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 9px 5px', background: 'linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0))', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.04em' }}>{label}</div>
            </div>
          ))}
        </div>
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
              <td style={{ fontSize: 10.5, padding: '6px 10px', textAlign: 'left', fontWeight: 800, color: '#fff' }}>Total — ±31,414 SF</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>5 units</td>
              <td style={{ ...cell, fontWeight: 800, color: '#fff', borderBottom: 'none' }}>20 units</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8.4, color: 'var(--stone)', marginTop: 9, lineHeight: 1.45 }}>
          *107 &amp; 109 Danbury Road share a single 1.55-acre parcel. **107 &amp; 109 are taxed as one property &mdash; combined real estate taxes are $99,684.28.
          Utilities across both buildings: water &amp; sewer are city, landlord-paid; electric/gas are separately metered
          and tenant-paid; internet/phone are tenant-paid. Figures per the most recent building descriptions and are
          approximate — buyers should verify all areas, taxes, and unit counts independently.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* Tenant logo wall — shows each tenant's downloaded logo (white chip), falling
   back to a golden-tab text chip for tenants with no logo on file. Names are
   matched to TENANT_LOGOS exactly, else by the longest key contained in the
   name (so "Nancy O — Boutique & Gifts" finds the "Nancy O" logo). */
function tenantLogo(name) {
  if (TENANT_LOGOS[name]) return TENANT_LOGOS[name]
  const key = Object.keys(TENANT_LOGOS).find(k => name.startsWith(k) || name.includes(k))
  return key ? TENANT_LOGOS[key] : null
}
function TenantLogos({ tenants, compact }) {
  const chipH = compact ? 44 : 38
  const imgH = compact ? 34 : 28
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: compact ? 4 : 6 }}>Tenants</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 5 : 7, alignContent: 'flex-start' }}>
        {tenants.map(t => {
          const logo = tenantLogo(t)
          return logo ? (
            <div key={t} style={{ height: chipH, padding: '4px 9px', background: '#fff', border: '1px solid var(--border)', borderRadius: 4, display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt={t} style={{ maxHeight: imgH, maxWidth: 92, objectFit: 'contain', display: 'block' }} />
            </div>
          ) : (
            <span key={t} style={{ fontSize: compact ? 10.5 : 9.5, fontWeight: 700, color: 'var(--carbon)', background: 'var(--linen)', border: '1px solid var(--border)', borderLeft: '3px solid var(--golden)', borderRadius: 3, padding: '0 11px', display: 'flex', alignItems: 'center', height: chipH }}>{t}</span>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════ PER-BUILDING — BUILDING OVERVIEW ═══════════════════
   One native engine page per address (mixed-use adaptation of the Ware
   Portfolio's per-building page): hero photo + key facts on the left, a
   space-composition table and the building's notable tenants on the right.
   Data is drawn from each building's Canva "Building Overview" / "Tenant"
   pages and the Building Specifications comparison. */
/* Space Composition table — shared by the gallery / fold-tenants / standard
   layouts so it can sit in either column. */
function SpaceComposition({ b }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 6 }}>Space Composition</div>
      <table className="data-table" style={{ fontSize: b.tableFont || 10.6 }}>
        <thead>
          <tr><th>Use</th><th style={{ textAlign: 'center' }}>Units / Suites</th><th style={{ textAlign: 'right' }}>SF</th></tr>
        </thead>
        <tbody>
          {b.composition.map(([t, u, sf]) => (
            <tr key={t}><td>{t}</td><td style={{ textAlign: 'center' }}>{u}</td><td style={{ textAlign: 'right' }}>{sf}</td></tr>
          ))}
          <tr className="total-row">
            <td><strong>Total</strong></td><td style={{ textAlign: 'center' }}><strong>{b.totalUnits}</strong></td><td style={{ textAlign: 'right' }}><strong>{b.totalSF}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function BuildingOverview({ b, pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Building Overview" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>{b.titleMain} <span style={{ color: '#F8971D' }}>{b.titleAccent}</span></div>
        <div className="title-rule" />

        {/* Headline stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {b.stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center', padding: '7px 4px', borderTop: '3px solid var(--golden)' }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          {/* Left — hero (unless the hero lives on the right) + building facts (tenants folded in) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: b.tableLeft ? 7 : 10, minHeight: 0 }}>
            {!b.foldTenants && (
              <div style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
                <img src={b.hero} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            <div className={`${b.plainFacts ? '' : 'bldg-card'} ${b.compact ? 'facts-compact' : ''}`} style={{ padding: b.plainFacts ? 0 : '12px 14px' }}>
              <h3 style={{ fontSize: 11, marginBottom: 6, paddingBottom: 4 }}>Building Facts</h3>
              {b.facts.map(([k, v]) => (
                <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
              ))}
            </div>
            {(b.gallery || b.foldTenants) && <TenantLogos tenants={b.tenants} compact={b.compact} />}
            {(b.gallery || b.foldTenants) && b.note && (
              <p style={{ fontSize: b.compact ? 9 : 9, lineHeight: 1.35, color: 'var(--stone)' }}>{b.note}</p>
            )}
            {/* When tableLeft, the Space Composition table sits here (and the
                second photo moves to the right column). Otherwise an optional
                second photo absorbs the remaining vertical space so a short
                left column doesn't leave a white gap. */}
            {b.tableLeft ? (
              <SpaceComposition b={b} />
            ) : b.extraPhoto && (
              <div style={{ flex: 1, minHeight: 90, borderRadius: 4, overflow: 'hidden' }}>
                <img src={b.extraPhoto} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: b.extraPhotoPos || 'center center', display: 'block' }} />
              </div>
            )}
          </div>

          {b.gallery ? (
            /* Right (gallery layout) — apartment photos on top, space composition below */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Apartment Interiors</div>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {b.gallery.map((src, i) => (
                    <div key={i} style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Space Composition</div>
                <table className="data-table" style={{ fontSize: 10.6 }}>
                  <thead>
                    <tr><th>Use</th><th style={{ textAlign: 'center' }}>Units / Suites</th><th style={{ textAlign: 'right' }}>SF</th></tr>
                  </thead>
                  <tbody>
                    {b.composition.map(([t, u, sf]) => (
                      <tr key={t}><td>{t}</td><td style={{ textAlign: 'center' }}>{u}</td><td style={{ textAlign: 'right' }}>{sf}</td></tr>
                    ))}
                    <tr className="total-row">
                      <td><strong>Total</strong></td><td style={{ textAlign: 'center' }}><strong>{b.totalUnits}</strong></td><td style={{ textAlign: 'right' }}><strong>{b.totalSF}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : b.foldTenants ? (
            /* Right (fold-tenants layout) — hero photo on top; below it either the
               space-composition table or, when tableLeft, the second photo. */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
              <div style={{ flex: b.tableLeft ? 1.8 : 1, minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
                <img src={b.hero} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: b.heroPos || 'center center', display: 'block' }} />
              </div>
              {b.tableLeft && b.extraPhoto ? (
                <div style={{ flex: 1, minHeight: 90, borderRadius: 4, overflow: 'hidden' }}>
                  <img src={b.extraPhoto} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: b.extraPhotoPos || 'center center', display: 'block' }} />
                </div>
              ) : (
                <SpaceComposition b={b} />
              )}
            </div>
          ) : (
            /* Right (standard layout) — space composition + notable tenants */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Space Composition</div>
                <table className="data-table" style={{ fontSize: 10.6 }}>
                  <thead>
                    <tr><th>Use</th><th style={{ textAlign: 'center' }}>Units / Suites</th><th style={{ textAlign: 'right' }}>SF</th></tr>
                  </thead>
                  <tbody>
                    {b.composition.map(([t, u, sf]) => (
                      <tr key={t}><td>{t}</td><td style={{ textAlign: 'center' }}>{u}</td><td style={{ textAlign: 'right' }}>{sf}</td></tr>
                    ))}
                    <tr className="total-row">
                      <td><strong>Total</strong></td><td style={{ textAlign: 'center' }}><strong>{b.totalUnits}</strong></td><td style={{ textAlign: 'right' }}><strong>{b.totalSF}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Notable Tenants</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, alignContent: 'flex-start' }}>
                  {b.tenants.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 700, color: 'var(--carbon)', background: 'var(--linen)', border: '1px solid var(--border)', borderLeft: '3px solid var(--golden)', borderRadius: 3, padding: '5px 10px' }}>{t}</span>
                  ))}
                </div>
                {b.note && (
                  <p style={{ fontSize: 9.5, lineHeight: 1.45, color: 'var(--stone)', marginTop: 'auto', paddingTop: 10 }}>{b.note}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* Per-building data — figures per each building's description page and the
   Building Specifications comparison; approximate, buyer to verify. */
const BUILDINGS = {
  b107: {
    name: '107 Danbury Road', titleMain: '107 Danbury', titleAccent: 'Road',
    hero: '/maps/bldg-107.jpg', heroPos: 'center 55%', cardImg: '/photos/bldg-107.jpg',
    extraPhoto: '/photos/bldg-107.jpg',
    plainFacts: true, foldTenants: true, tableLeft: true,
    stats: [{ v: '10,529', l: 'Building SF' }, { v: '5', l: 'Total Units' }, { v: '2', l: 'Stories' }, { v: '1983', l: 'Year Built' }],
    facts: [['Property Type', 'Retail & Residential'], ['Year Built', '1983'], ['Building SF', '10,529 SF'], ['Stories', '2'], ['Construction', 'Frame'], ['Roof / Façade', 'Asphalt / Vinyl'], ['Lot Size', '1.55 Acres*'], ['Real Estate Taxes', '$99,684 (incl. 109)']],
    composition: [['Retail', '2', '7,229'], ['Residential', '2', '1,400'], ['Office / Storage', '1', '1,900']],
    totalUnits: '5', totalSF: '10,529',
    tenants: ['Talbots', 'DiMaggio Hair Design', 'Apartments (2)'],
    note: '*107 & 109 Danbury Road share a single 1.55-acre parcel and are taxed together.',
  },
  b109: {
    name: '109 Danbury Road', titleMain: '109 Danbury', titleAccent: 'Road',
    hero: '/maps/bldg-109-a.jpg', heroPos: 'center 55%', cardImg: '/photos/bldg-109.jpg',
    extraPhoto: '/photos/bldg-109-b.jpg',
    plainFacts: true, foldTenants: true, tableLeft: true, compact: true,
    stats: [{ v: '20,885', l: 'Building SF' }, { v: '20', l: 'Total Units' }, { v: '3', l: 'Stories' }, { v: '1983', l: 'Year Built' }],
    facts: [['Property Type', 'Retail & Office'], ['Year Built', '1983'], ['Building SF', '20,885 SF'], ['Stories', '3'], ['Construction', 'Frame'], ['Roof / Façade', 'Asphalt / Vinyl'], ['Lot Size', '1.55 Acres*'], ['Real Estate Taxes', '$99,684 (incl. 107)']],
    composition: [['Retail', '8', '12,931'], ['Office / Storage', '12', '7,954']],
    totalUnits: '20', totalSF: '20,885',
    tenants: ['Southwest Café', 'Ridgefield Organics', 'Ross Bakery & Café', 'No. 109 Cheese Market', 'À Table', 'JKH Laundry', 'Kick Fit', 'Ridgefield Health & Wellness', 'Ridgefield Power Yoga'],
    note: '*107 & 109 Danbury Road share a single 1.55-acre parcel and are taxed together. The larger of the two buildings — a retail row shadow-anchored by Stop & Shop, HomeGoods, Marshalls & Michael’s.',
  },
}

/* ═══════════════════ PROPERTY OVERVIEW ═══════════════════
   One page, both buildings — a photo card per address with basic info,
   modeled on the Ware portfolio overview. Pulls from BUILDINGS so it stays in
   sync with the per-building pages. */
function PropertyOverview({ pageNum }) {
  const fact = (b, key) => b.facts.find(([k]) => k === key)?.[1]
  const cards = [BUILDINGS.b107, BUILDINGS.b109].map(b => ({
    name: b.name,
    img: b.cardImg || b.hero,
    // Six rows rather than four — at two buildings the cards are half a page
    // tall each, and a four-row table leaves the column looking unfinished.
    rows: [
      ['Building SF', `${b.totalSF} SF`],
      ['Total Units', b.totalUnits],
      ['Year Built', fact(b, 'Year Built')],
      ['Stories', fact(b, 'Stories')],
      ['Construction', fact(b, 'Construction')],
      ['Type', fact(b, 'Property Type')],
    ],
  }))
  return (
    <div className="page">
      <PageHeader section="Property Overview" />
      <div className="section--tight flat-cards" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>Property <span style={{ color: '#F8971D' }}>Overview</span></div>
        <div className="title-rule" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0, marginTop: 8 }}>
          {cards.map(c => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
              {/* Left — wide building photo */}
              <div style={{ minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {/* Right — name + basic info */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--carbon)', marginBottom: 7 }}>{c.name}</div>
                <div className="bldg-card" style={{ padding: '10px 14px' }}>
                  {c.rows.map(([k, v]) => (
                    <div className="bldg-row" key={k}><span className="bldg-label">{k}</span><span className="bldg-val">{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ TENANT DIRECTORY ═══════════════════
   One flat, box-free page — every tenant grouped under its building across two
   columns, each row a logo (or monogram fallback) + name + category + one-line
   profile. Logos via scripts/gen-tenant-logos.mjs (npm run tenant-logos). */
// Monogram for tenants with no usable web logo (109 Cheese, Health & Wellness,
// JKH Laundry): an all-caps acronym (JKH), a leading number (109), or two
// initials (RH).
function monogram(name) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !['No', 'and', 'the', 'of'].includes(w))
  if (/^\d+$/.test(words[0])) return words[0]
  if (/^[A-Z]{2,4}$/.test(words[0])) return words[0]
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function TenantLogo({ name, size = 36 }) {
  const src = TENANT_LOGOS[name]
  if (src) return (
    <div style={{ flexShrink: 0, width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={src} alt={`${name} logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
    </div>
  )
  return (
    <div style={{ flexShrink: 0, width: size, height: size, borderRadius: '50%', background: 'var(--carbon)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, letterSpacing: '0.02em', fontSize: monogram(name).length > 2 ? 10 : 12 }}>
      {monogram(name)}
    </div>
  )
}

// Tenant-type chip styling: national credit tenants stand out (filled carbon),
// local multi-unit operators get a golden tint, single-site locals a quiet
// outline.
function typeChipStyle(type) {
  if (/National/.test(type)) return { background: 'var(--carbon)', color: '#fff', borderColor: 'var(--carbon)' }
  if (/CT|Multi/.test(type)) return { background: 'rgba(248,151,29,0.16)', color: '#9a6410', borderColor: 'var(--golden)' }
  return { background: '#fff', color: 'var(--stone)', borderColor: 'var(--border)' }
}

/* `fill` (default) lets the block stretch and space its rows across the column
   — right for a long roster. A short roster (107 has two tenants) would sprawl,
   so it's rendered fill={false}: rows pack at the top on a fixed rhythm and the
   column's leftover height goes to a building photo instead. */
function BuildingTenants({ b, fill = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: fill ? b.tenants.length : 'none', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{b.addr}</span>
        <span style={{ flex: 1, borderBottom: '2px solid var(--golden)' }} />
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--stone)', whiteSpace: 'nowrap' }}>{b.tenants.length} {b.tenants.length === 1 ? 'tenant' : 'tenants'}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: fill ? 'space-around' : 'flex-start', gap: fill ? 0 : 18, flex: fill ? 1 : 'none', minHeight: 0 }}>
        {b.tenants.map(t => (
          <div key={t.name} style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
            <TenantLogo name={t.name} size={46} />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.1 }}>{t.name}</span>
                <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--golden)' }}>{t.tag}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 3 }}>
                {t.type && (
                  <span style={{ flexShrink: 0, fontSize: 7.5, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '1px 5px', borderRadius: 3, border: '1px solid', whiteSpace: 'nowrap', ...typeChipStyle(t.type) }}>{t.type}</span>
                )}
                <span style={{ fontSize: 10, lineHeight: 1.35, color: 'var(--graphite)' }}>{t.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TenantDirectory({ pageNum }) {
  const left = TENANT_BUILDINGS.slice(0, 1)   // 107
  const right = TENANT_BUILDINGS.slice(1)     // 109
  return (
    <div className="page">
      <PageHeader section="Tenant Overview" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2 }}>The <span style={{ color: '#F8971D' }}>Tenants</span></div>
        <div className="title-rule" />
        <p style={{ fontSize: 10.6, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 14 }}>
          107 &amp; 109 Danbury Road are 100% leased across ten commercial tenants — anchored by national apparel
          retailer Talbots, alongside a deep roster of established local independents spanning dining, specialty
          grocery, fitness, beauty, and professional office.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, flex: 1, minHeight: 0 }}>
          {/* Left — 107's short roster packed at the top, its building photo
              absorbing the rest of the column so the page doesn't read half-empty. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>
            {left.map(b => <BuildingTenants key={b.addr} b={b} fill={false} />)}
            <div style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: 'hidden' }}>
              <img src="/photos/bldg-107.jpg" alt="107 Danbury Road" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>{right.map(b => <BuildingTenants key={b.addr} b={b} />)}</div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* Tenant profiles — condensed to a one-liner each, grouped by building. */
const TENANT_BUILDINGS = [
  { addr: '107 Danbury Road', tenants: [
    { name: 'Talbots', tag: 'Retail · Apparel', type: 'National Chain', desc: 'National apparel chain (~500 stores), KnitWell Group / Sycamore Partners.' },
    { name: 'DiMaggio Hair Design', tag: 'Beauty · Salon', type: 'Local', desc: 'Full-service hair salon — cuts, color, and styling.' },
  ] },
  { addr: '109 Danbury Road', tenants: [
    { name: 'Southwest Café', tag: 'Dining', type: 'Local', desc: 'Santa Fe–style Southwestern cuisine since 1987.' },
    { name: 'Ridgefield Organics', tag: 'Specialty Grocer', type: 'Local', desc: 'Organic produce, prepared foods, and gourmet baskets.' },
    { name: 'Ross Bakery & Café', tag: 'Bakery · Café', type: 'Local', desc: 'Scratch artisan breads, pastries, and custom cakes.' },
    { name: 'No. 109 Cheese Market', tag: 'Cheese & Wine', type: 'Local · 2 CT', desc: 'Artisanal cheeses, fine wines, and specialty foods.' },
    { name: 'À Table', tag: 'Dining', type: 'Local', desc: 'Gourmet French market — prepared foods and pastries.' },
    { name: 'JKH Laundry', tag: 'Services', type: 'Local', desc: 'Self-service, wash-and-fold, and dry cleaning.' },
    { name: 'Kick Fit', tag: 'Fitness', type: 'Local · 2 CT', desc: 'Coach-led kickboxing fitness for all levels.' },
    { name: 'Ridgefield Health & Wellness', tag: 'Health', type: 'Local', desc: 'Chiropractic, physical therapy, acupuncture, and nutrition.' },
  ] },
]

/* ═══════════════════ RIDGEFIELD — LIVE WHERE YOU INVEST ═══════════════════
   Town narrative + "About Ridgefield" highlights with stacked aerials. Ported
   from the om-ridgefield "new format" location section. */
function RidgefieldCombined({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 56%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Ridgefield, <span style={{ color: '#F8971D' }}>Connecticut</span></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--carbon)', letterSpacing: '0.02em', marginBottom: 8 }}>Live Where You Invest</div>
          <div className="title-rule" />

          <div style={{ fontSize: 10.5, lineHeight: 1.5, color: 'var(--graphite)', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p>
              Few towns in Connecticut offer what Ridgefield does: a genuine, walkable New England village
              paired with the income, schools, and stability of Fairfield County&rsquo;s most desirable communities.
              Main Street is the heartbeat — a tree-lined historic district of independent boutiques, acclaimed
              restaurants, and cultural anchors including the Ridgefield Playhouse, the Prospector Theater,
              A.C.T. of Connecticut, and the Aldrich Contemporary Art Museum. Residents stroll to dinner, catch
              live music at Ballard Park&rsquo;s summer concert series, and still come home to a town surrounded by
              lakes, preserved open space, and miles of trails. For New York commuters, Branchville station sits
              right in town, and express Harlem Line trains from nearby Katonah reach Grand Central in about an hour.
            </p>
            <p>
              For an investor, that quality of life translates directly into the rent roll. Ridgefield is a
              high-barrier-to-entry market where restrictive zoning has kept new commercial and residential
              inventory scarce for decades, while demand comes from a deep pool of high-income professionals, NYC
              commuters, and empty-nesters determined to stay in town. For 107 &amp; 109 Danbury Road that means
              durable retail occupancy and resilient apartment rents in the center of Ridgefield&rsquo;s primary
              commercial corridor — the rare core-of-town, mixed-use asset that almost never trades.
            </p>
          </div>

          <div className="eyebrow" style={{ marginTop: 10, marginBottom: 6 }}>About Ridgefield</div>
          <ul className="highlights ridge-highlights">
            <li>Founded in 1708; Main Street historic district designated a National Historic Landmark in 1984</li>
            <li>Population of ~25,000 in the foothills of the Berkshires on the New York border</li>
            <li>One of Connecticut&rsquo;s most affluent communities — median household income near $179,000, ranking among the top towns in the state</li>
            <li>Highly educated base — about 73% of adults hold a bachelor&rsquo;s degree or higher</li>
            <li>Top-rated public schools; consistently ranked among the best places to live in Connecticut</li>
            <li>A walkable village center — boutique shopping, acclaimed dining, and a cultural scene anchored by the Playhouse, Prospector Theater, A.C.T. of Connecticut, and the Aldrich Museum</li>
            <li>Metro-North in town at Branchville, with ~1-hour express service to Grand Central from nearby Katonah</li>
            <li>Surrounded by lakes, town beaches, state parks, and an extensive preserved trail network</li>
          </ul>
        </div>

        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/ridgefield-1.jpg" alt="Copps Hill Commons, Ridgefield, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <img src="/photos/ridgefield-2.jpg" alt="Copps Hill Commons, Ridgefield, CT" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/* ═══════════════════ RIDGEFIELD IN FAIRFIELD COUNTY ═══════════════════
   County narrative + demographics table (ACS 2024). Ported from om-ridgefield. */
function FairfieldCounty({ pageNum }) {
  return (
    <div className="page">
      <PageHeader section="Location Overview" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ flex: '0 0 55%', padding: '28px 32px 24px 40px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="section-title" style={{ marginBottom: 2 }}>Ridgefield in <span style={{ color: '#F8971D' }}>Fairfield County</span></div>
          <div className="title-rule" />
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 14 }}>
            <p style={{ marginBottom: 8 }}>Ridgefield sits inside Fairfield County — Connecticut&rsquo;s largest and wealthiest county, with roughly 950,000 residents and four of the state&rsquo;s biggest cities in Bridgeport, Stamford, Norwalk, and Danbury. It anchors one of the Northeast&rsquo;s deepest, most diversified economies — financial and professional services, healthcare, and advanced manufacturing — and is home to nineteen Fortune 1000 headquarters.</p>
            <p>Within that already-affluent county, Ridgefield sits near the very top. Household incomes here run well ahead of the county as a whole, anchored by A+ schools, low crime, preserved open space, and direct Metro-North access to Manhattan — the mix that keeps consumer spending and rental demand deep, durable, and quality-driven.</p>
          </div>

          <div className="eyebrow" style={{ marginBottom: 6 }}>Demographics — Ridgefield vs. Fairfield County</div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <table className="data-table" style={{ fontSize: 11, height: '100%' }}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ textAlign: 'right' }}>Town of Ridgefield</th>
                  <th style={{ textAlign: 'right' }}>Fairfield County</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Population</td><td style={{ textAlign: 'right' }}>25,109</td><td style={{ textAlign: 'right' }}>957,419</td></tr>
                <tr><td>Households</td><td style={{ textAlign: 'right' }}>8,772</td><td style={{ textAlign: 'right' }}>360,159</td></tr>
                <tr><td>Median HH Income</td><td style={{ textAlign: 'right' }}>$179,219</td><td style={{ textAlign: 'right' }}>$110,000</td></tr>
                <tr><td>Avg HH Income</td><td style={{ textAlign: 'right' }}>$247,890</td><td style={{ textAlign: 'right' }}>$167,632</td></tr>
                <tr><td>Total Employees</td><td style={{ textAlign: 'right' }}>11,582</td><td style={{ textAlign: 'right' }}>501,539</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 8, color: 'var(--stone)', marginTop: 8, lineHeight: 1.4 }}>
            Ridgefield&rsquo;s median household income runs well above the county&rsquo;s &mdash; reflecting the town&rsquo;s affluent, high-barrier consumer base. Source: U.S. Census ACS 2024 5-Year Estimates. Avg = mean household income.
          </div>
        </div>
        <div style={{ flex: '0 0 45%', position: 'relative' }}><img src="/photos/fairfield-county.jpg" alt="Copps Hill Commons, Ridgefield, CT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
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

    <Divider eyebrow="01" title="The Property" image="/photos/divider-bg.jpg" />,
    <PropertyOverview />,
    <BuildingSpecs />,
    <PropertyMap />,
    <FullBleedImage section="Site Aerial" src="/photos/site-plan-aerial.jpg" pins={SITE_PINS} />,
    <BuildingOverview b={BUILDINGS.b107} />,
    <BuildingOverview b={BUILDINGS.b109} />,

    <Divider eyebrow="02" title="The Tenants" image="/photos/divider-bg.jpg" />,
    <TenantDirectory />,

    <Divider eyebrow="03" title="Location & Market" image="/photos/divider-bg.jpg" />,
    <RidgefieldCombined />,
    <LocationMap />,
    <FullBleedImage section="Aerial Overview" src="/maps/aerial-context-1.jpg" />,
    <FullBleedImage section="Aerial Overview" src="/maps/aerial-context-2.jpg" />,
    <DriveTimeMap />,
    <FairfieldCounty />,
    <RegionalMap />,

    <Divider eyebrow="04" title="The Team" image="/photos/divider-bg.jpg" />,
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
