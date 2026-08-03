import './App.css'
import { cloneElement } from 'react'
import { DRAFT } from './data/deal.js'
import { PROPERTIES, IS_PORTFOLIO } from './data/properties.js'
import { PHOTO_PAGES } from './data/photos.js'

import Divider from './components/Divider.jsx'
import { PhotoPage } from './components/PhotoPages.jsx'
import TeamPage from './components/TeamPage.jsx'
import LocationsPage from './components/LocationsPage.jsx'

import CoverHero from './pages/CoverHero.jsx'
import TocPage from './pages/TocPage.jsx'
import AdvisorsPage from './pages/AdvisorsPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import PortfolioSummary from './pages/PortfolioSummary.jsx'
import WhyNpcg from './pages/WhyNpcg.jsx'
import TrackRecordPage from './pages/TrackRecordPage.jsx'
import RentRollPage from './pages/RentRollPage.jsx'
import ExpensesPage from './pages/ExpensesPage.jsx'
import UnitMixIePage from './pages/UnitMixIePage.jsx'
import ValuationPage from './pages/ValuationPage.jsx'
import SalesCompsPage from './pages/SalesCompsPage.jsx'
import RentCompsPage from './pages/RentCompsPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import ExpectPage from './pages/ExpectPage.jsx'
import ContractPage from './pages/ContractPage.jsx'
import ClosingPage from './pages/ClosingPage.jsx'
import MarketOverview from './pages/MarketOverview.jsx'
import MarketActivity from './pages/MarketActivity.jsx'

/* ═══════════════════ MAIN APP ═══════════════════
   pageDefs is the single source of truth for page ORDER, page NUMBERS, and
   the TABLE OF CONTENTS. Each entry: { el, toc?, section? } — give a page a
   `toc` label to list it; `section: true` renders it as a TOC section head.
   Add/remove/reorder entries freely: numbering and the TOC follow. */

// Property pages expand by count: a single property renders one page; a
// portfolio renders a summary page then one page per property.
const propertyPages = () =>
  IS_PORTFOLIO
    ? [
        { el: <PortfolioSummary />, toc: 'Portfolio Summary' },
        ...PROPERTIES.map(p => ({ el: <PropertyPage property={p} showName />, toc: p.name })),
      ]
    : [{ el: <PropertyPage property={PROPERTIES[0]} />, toc: 'Property Information' }]

const pageDefs = [
  { el: <CoverHero /> },
  { el: <TocPage /> },                                    // receives derived entries below
  { el: <AdvisorsPage />, toc: 'Your Advisors' },

  { el: <Divider eyebrow="01" title="The Project & Property" image="/photos/divider.jpg" />, toc: 'The Project & Property', section: true },
  { el: <ProjectPage />, toc: 'The Project' },
  ...propertyPages(),
  ...PHOTO_PAGES.map(p => ({ el: <PhotoPage {...p} />, toc: null })),
  { el: <WhyNpcg />, toc: 'Why NPCG' },
  { el: <TrackRecordPage />, toc: 'Our Track Record' },

  { el: <Divider eyebrow="02" title="Financial Analysis & Valuation" image="/photos/divider.jpg" />, toc: 'Financial Analysis & Valuation', section: true },
  { el: <RentRollPage />, toc: 'Rent Roll' },
  { el: <ExpensesPage />, toc: 'Operating Expenses' },
  { el: <UnitMixIePage />, toc: 'Unit Mix & Income Analysis' },
  { el: <ValuationPage />, toc: 'Valuation & Trade Range' },
  { el: <SalesCompsPage />, toc: 'Sales Comparables' },
  { el: <RentCompsPage />, toc: 'Rent Comparables' },

  { el: <Divider eyebrow="03" title="The Marketing Process" image="/photos/divider.jpg" />, toc: 'The Marketing Process', section: true },
  { el: <ProcessPage />, toc: 'The Process' },
  { el: <ExpectPage />, toc: 'What to Expect' },
  { el: <ContractPage />, toc: 'Contract & Due Diligence' },
  { el: <ClosingPage />, toc: 'The Closing' },

  { el: <Divider eyebrow="04" title="The Market" image="/photos/divider.jpg" />, toc: 'The Market', section: true },
  { el: <MarketOverview />, toc: 'Market Overview' },
  { el: <MarketActivity />, toc: 'Development & Regulation' },

  { el: <Divider eyebrow="05" title="The Team" image="/photos/divider.jpg" />, toc: 'The Team', section: true },
  { el: <TeamPage />, toc: 'Our Team' },
  { el: <LocationsPage />, toc: 'Our Locations' },
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
