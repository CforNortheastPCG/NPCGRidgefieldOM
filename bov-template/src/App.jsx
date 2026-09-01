import './App.css'
import { cloneElement } from 'react'
import { DRAFT, FORMAT } from './data/deal.js'
import { PROPERTIES, IS_PORTFOLIO } from './data/properties.js'
import { PHOTO_PAGES } from './data/photos.js'
import { ASSESSOR } from './data/assessor.js'
import { TAXES } from './data/taxes.js'
import { AS_GIVEN } from './data/asGiven.js'

import Divider from './components/Divider.jsx'
import { PhotoPage } from './components/PhotoPages.jsx'
import TeamPage from './components/TeamPage.jsx'
import FirmPage from './pages/FirmPage.jsx'
import LocationsPage from './components/LocationsPage.jsx'

import CoverHero from './pages/CoverHero.jsx'
import TocPage from './pages/TocPage.jsx'
import AdvisorsPage from './pages/AdvisorsPage.jsx'
import DisclaimerPage from './pages/DisclaimerPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import PortfolioSummary from './pages/PortfolioSummary.jsx'
import AssessmentTaxPage from './pages/AssessmentTaxPage.jsx'
import AsGivenPage from './pages/AsGivenPage.jsx'
import WhyNpcg from './pages/WhyNpcg.jsx'
import ProvenPerformancePage from './pages/ProvenPerformancePage.jsx'
import TrackRecordPage from './pages/TrackRecordPage.jsx'
import UnitMixIePage from './pages/UnitMixIePage.jsx'
import UnderwritingPage from './pages/UnderwritingPage.jsx'
import ValuationPage from './pages/ValuationPage.jsx'
import SalesCompsPage from './pages/SalesCompsPage.jsx'
import RentCompsPage from './pages/RentCompsPage.jsx'
import ConclusionPage from './pages/ConclusionPage.jsx'
import SellingStagesPage from './pages/SellingStagesPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import VisibilityPage from './pages/VisibilityPage.jsx'
import BuyerTrackingPage from './pages/BuyerTrackingPage.jsx'
import ReportingPage from './pages/ReportingPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import ExpectPage from './pages/ExpectPage.jsx'
import ContractPage from './pages/ContractPage.jsx'
import ClosingPage from './pages/ClosingPage.jsx'
import MarketOverview from './pages/MarketOverview.jsx'
import MarketActivity from './pages/MarketActivity.jsx'
import WhyOwnersSellPage from './pages/WhyOwnersSellPage.jsx'
import TaxDeferralPage from './pages/TaxDeferralPage.jsx'
import FlywheelPage from './pages/FlywheelPage.jsx'

/* ═══════════════════ MAIN APP ═══════════════════
   pageDefs is the single source of truth for page ORDER, page NUMBERS, and
   the TABLE OF CONTENTS. Each entry: { el, toc?, section? } — give a page a
   `toc` label to list it; `section: true` renders it as a TOC section head.
   Add/remove/reorder entries freely: numbering and the TOC follow.

   ── TWO FORMATS, ONE ARRAY ─────────────────────────────────────────────
   FORMAT (src/data/deal.js) selects which pages render:

     'short'  the analytical BOV, in the order a reader checks it: cover,
              the project, property record & taxes, the owner's figures AS
              GIVEN, the three-column UNDERWRITING, the price, the
              comparables that support it, the team, and the close-out.
              Nothing to skim past.
     'full'   those same pages, plus the pitch around them: TOC, advisors,
              Why NPCG, track record, comps, the firm's marketing-process
              pages, market, the owner-advisory "Beyond the Sale" section,
              team. Use when the BOV doubles as the listing pitch.

   `full(...)` below marks entries that appear only in the long format, so
   the two sequences stay visibly one list rather than drifting apart. */

const IS_FULL = FORMAT === 'full'

// Include these entries only in the long format.
const full = (...defs) => (IS_FULL ? defs : [])

/* The Property Record & Taxes page needs at least one of its two sources.
   A deal with neither simply doesn't get the page — in either format —
   rather than rendering an empty shell. */
const HAS_RECORD = !!ASSESSOR?.parcels?.length || !!TAXES?.fiscalYears?.length
const HAS_AS_GIVEN = !!AS_GIVEN
const ifData = (cond, ...defs) => (cond ? defs : [])

// Property pages expand by count: a single property renders one page; a
// portfolio renders a summary page then one page per property.
const propertyPages = () =>
  IS_PORTFOLIO
    ? [
        { el: <PortfolioSummary />, toc: 'Portfolio Summary' },
        ...PROPERTIES.map(p => ({ el: <PropertyPage property={p} showName />, toc: p.name })),
      ]
    : [{ el: <PropertyPage property={PROPERTIES[0]} />, toc: 'Property Information' }]

// Photography runs in the long format only — the short deck is the
// analysis, and its pages already carry the property imagery they need.
const photoPages = () => (IS_FULL ? PHOTO_PAGES : []).map(p => ({ el: <PhotoPage {...p} />, toc: null }))

const pageDefs = [
  { el: <CoverHero /> },
  ...full(
    { el: <TocPage /> },                                  // receives derived entries below
    { el: <AdvisorsPage />, toc: 'Your Advisors' },
    { el: <DisclaimerPage />, toc: 'Confidentiality & Disclaimer' },
    { el: <Divider eyebrow="01" title="The Project & Property" image="/photos/divider.jpg" />, toc: 'The Project & Property', section: true },
  ),

  { el: <ProjectPage />, toc: 'The Project' },
  ...ifData(HAS_RECORD, { el: <AssessmentTaxPage />, toc: 'Property Record & Taxes' }),
  ...full(...propertyPages()),
  ...full(
    { el: <WhyNpcg />, toc: 'Why NPCG' },
    { el: <ProvenPerformancePage />, toc: 'Proven Performance' },
    { el: <TrackRecordPage />, toc: 'Our Track Record' },
    { el: <Divider eyebrow="02" title="Financial Analysis & Valuation" image="/photos/divider.jpg" />, toc: 'Financial Analysis & Valuation', section: true },
  ),

  ...ifData(HAS_AS_GIVEN, { el: <AsGivenPage />, toc: 'As Given — Owner-Provided' }),
  { el: <UnderwritingPage />, toc: 'Underwriting' },
  ...full({ el: <UnitMixIePage />, toc: 'Unit Mix & Income Analysis' }),
  { el: <ValuationPage />, toc: 'Valuation & Pricing' },
  { el: <SalesCompsPage />, toc: 'Sales Comparables' },
  { el: <RentCompsPage />, toc: 'Rent Comparables' },

  ...photoPages(),

  /* The marketing section opens with the firm's standard pitch pages — the
     three-stage process, the twelve-week timeline, syndication, buyer
     tracking, and reporting — then the deal-facing pages on what the owner
     decides, signs, and receives. */
  ...full(
    { el: <Divider eyebrow="03" title="The Marketing Process" image="/photos/divider.jpg" />, toc: 'The Marketing Process', section: true },
    { el: <SellingStagesPage />, toc: 'Selling Process Stages' },
    { el: <TimelinePage />, toc: 'Marketing Timeline' },
    { el: <VisibilityPage />, toc: 'National Visibility' },
    { el: <BuyerTrackingPage />, toc: 'Buyer Tracking & Follow-Up' },
    { el: <ReportingPage />, toc: 'Client Reporting & Communication' },
    { el: <ProcessPage />, toc: 'The Process' },
    { el: <ExpectPage />, toc: 'What to Expect' },
    { el: <ContractPage />, toc: 'Contract & Due Diligence' },
    { el: <ClosingPage />, toc: 'The Closing' },

    { el: <Divider eyebrow="04" title="The Market" image="/photos/divider.jpg" />, toc: 'The Market', section: true },
    { el: <MarketOverview />, toc: 'Market Overview' },
    { el: <MarketActivity />, toc: 'Development & Regulation' },

    /* Owner-advisory pages: why owners sell, what to do with the proceeds,
       and the relationship that continues after the close. */
    { el: <Divider eyebrow="05" title="Beyond the Sale" image="/photos/divider.jpg" />, toc: 'Beyond the Sale', section: true },
    { el: <WhyOwnersSellPage />, toc: 'Why Property Owners Sell' },
    { el: <TaxDeferralPage />, toc: 'Deferring Capital Gains Taxes' },
    { el: <FlywheelPage />, toc: 'The Strategic Advisory Flywheel' },
  ),

  ...full(
    { el: <Divider eyebrow="06" title="The Team" image="/photos/divider.jpg" />, toc: 'The Team', section: true },
    { el: <TeamPage />, toc: 'Our Team' },
    { el: <LocationsPage />, toc: 'Our Locations' },
  ),

  /* The close, in order, in both formats: the stated opinion and the phone
     number, then the one page that argues for the firm rather than the
     asset. That argument only earns its place after the analysis has been
     made. Both sit outside the `full(...)` groups so the TOC doesn't file
     them under whatever section happens to precede them. */
  { el: <ConclusionPage />, toc: 'Conclusion & Recommendation' },
  { el: <FirmPage />, toc: 'Northeast Private Client Group' },
]

// TOC entries derive from pageDefs: 1-based position + label.
const tocEntries = pageDefs
  .map((d, i) => ({ n: i + 1, label: d.toc, section: !!d.section }))
  .filter(e => e.label)

function App() {
  return (
    <div className={`om-container${DRAFT ? ' draft' : ''}`}>
      {pageDefs.map((d, i) =>
        cloneElement(d.el, {
          key: i,
          pageNum: i + 1,
          ...(d.el.type === TocPage ? { entries: tocEntries } : {}),
        })
      )}
    </div>
  )
}

export default App
