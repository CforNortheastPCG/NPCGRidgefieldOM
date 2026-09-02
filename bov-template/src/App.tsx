/* ═══════════ PAGE ASSEMBLY (container) ═══════════
   MANIFEST (src/data/manifest.ts) is the single source of page order; page
   numbers are 1-based manifest positions.

   This file tracks npcgstudio/frame/src/App.tsx. One deliberate product
   difference: the OM frame sets document.title per deal at runtime. The BOV
   must NOT — scripts/qa-shots.cjs proves it is screenshotting THIS deck by
   comparing page.title() (the DOM) against dist/index.html's <title>, and a
   runtime override would defeat that guard. The BOV's title is the
   hand-edited one in index.html; see the EDIT-ME note there. */

import { Component, useEffect, useState, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { MANIFEST } from './data/manifest.ts'
import { DRAFT } from './data/deal.ts'
import { TWEAKS } from './data/tweaks.ts'
import { PROPERTIES, IS_PORTFOLIO } from './data/properties.ts'
import { PHOTO_PAGES } from './data/photos.ts'
import type { ManifestEntry } from './lib/types.ts'

import Divider from './components/Divider.tsx'
import { PhotoPage } from './components/PhotoPages.tsx'

import CoverHero from './components/pages/CoverHero.tsx'
import TocPage from './components/pages/TocPage.tsx'
import AdvisorsPage from './components/pages/AdvisorsPage.tsx'
import DisclaimerPage from './components/pages/DisclaimerPage.tsx'
import ProjectPage from './components/pages/ProjectPage.tsx'
import PropertyPage from './components/pages/PropertyPage.tsx'
import PortfolioSummary from './components/pages/PortfolioSummary.tsx'
import AssessmentTaxPage from './components/pages/AssessmentTaxPage.tsx'
import AsGivenPage from './components/pages/AsGivenPage.tsx'
import WhyNpcg from './components/pages/WhyNpcg.tsx'
import ProvenPerformancePage from './components/pages/ProvenPerformancePage.tsx'
import TrackRecordPage from './components/pages/TrackRecordPage.tsx'
import UnitMixIePage from './components/pages/UnitMixIePage.tsx'
import TenantRentRollPage from './components/pages/TenantRentRollPage.tsx'
import LeaseRolloverPage from './components/pages/LeaseRolloverPage.tsx'
import TenantProfilesPage from './components/pages/TenantProfilesPage.tsx'
import UnderwritingPage from './components/pages/UnderwritingPage.tsx'
import ValuationPage from './components/pages/ValuationPage.tsx'
import SalesCompsPage from './components/pages/SalesCompsPage.tsx'
import RentCompsPage from './components/pages/RentCompsPage.tsx'
import ConclusionPage from './components/pages/ConclusionPage.tsx'
import SellingStagesPage from './components/pages/SellingStagesPage.tsx'
import TimelinePage from './components/pages/TimelinePage.tsx'
import VisibilityPage from './components/pages/VisibilityPage.tsx'
import BuyerTrackingPage from './components/pages/BuyerTrackingPage.tsx'
import ReportingPage from './components/pages/ReportingPage.tsx'
import ProcessPage from './components/pages/ProcessPage.tsx'
import ExpectPage from './components/pages/ExpectPage.tsx'
import ContractPage from './components/pages/ContractPage.tsx'
import ClosingPage from './components/pages/ClosingPage.tsx'
import MarketOverview from './components/pages/MarketOverview.tsx'
import MarketActivity from './components/pages/MarketActivity.tsx'
import WhyOwnersSellPage from './components/pages/WhyOwnersSellPage.tsx'
import TaxDeferralPage from './components/pages/TaxDeferralPage.tsx'
import FlywheelPage from './components/pages/FlywheelPage.tsx'
import TeamPage from './components/pages/TeamPage.tsx'
import LocationsPage from './components/pages/LocationsPage.tsx'
import FirmPage from './components/pages/FirmPage.tsx'

/** One bad page must cost ONE page, not the deck. A page that throws during
    render becomes a loud red error page — visible in the browser, in the
    PDF, and to a screenshot review — while every other page keeps
    rendering. */
class PageBoundary extends Component<{ pageId: string; pageNum: number; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error) {
    console.error(`page "${this.props.pageId}" failed to render:`, error)
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div
        className="page"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fbeae7' }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: '#B3261E' }}>Page failed to render — {this.props.pageId}</div>
        <div style={{ fontSize: 12, color: '#7a2620', maxWidth: 640, textAlign: 'center', fontFamily: 'ui-monospace, monospace' }}>
          {String(this.state.error.message ?? this.state.error).slice(0, 400)}
        </div>
        <div style={{ fontSize: 11, color: '#7a2620' }}>Fix the page's data or content module — the rest of the deck is unaffected.</div>
      </div>
    )
  }
}

function pageFor(entry: ManifestEntry, pageNum: number): ReactElement | null {
  switch (entry.type) {
    case 'cover':
      return <CoverHero pageNum={pageNum} />
    case 'toc':
      return <TocPage pageNum={pageNum} />
    case 'advisors':
      return <AdvisorsPage pageNum={pageNum} />
    case 'disclaimer':
      return <DisclaimerPage pageNum={pageNum} />
    case 'divider':
      return <Divider eyebrow={entry.eyebrow} title={entry.title} image={entry.image} pageNum={pageNum} />
    case 'project':
      return <ProjectPage pageNum={pageNum} />
    case 'assessment-tax':
      return <AssessmentTaxPage pageNum={pageNum} />
    case 'portfolio-summary':
      return <PortfolioSummary pageNum={pageNum} />
    case 'property': {
      const property = PROPERTIES[entry.index ?? 0]
      return property ? <PropertyPage property={property} showName={IS_PORTFOLIO} pageNum={pageNum} /> : null
    }
    case 'photos': {
      const page = PHOTO_PAGES[entry.index ?? 0]
      return page ? <PhotoPage {...page} pageNum={pageNum} /> : null
    }
    case 'why-npcg':
      return <WhyNpcg pageNum={pageNum} />
    case 'proven-performance':
      return <ProvenPerformancePage pageNum={pageNum} />
    case 'track-record':
      return <TrackRecordPage pageNum={pageNum} />
    case 'as-given':
      return <AsGivenPage pageNum={pageNum} />
    case 'underwriting':
      return <UnderwritingPage pageNum={pageNum} />
    case 'unit-mix-ie':
      return <UnitMixIePage pageNum={pageNum} />
    case 'tenant-rent-roll':
      return <TenantRentRollPage pageNum={pageNum} />
    case 'lease-rollover':
      return <LeaseRolloverPage pageNum={pageNum} />
    case 'tenant-profiles':
      return <TenantProfilesPage pageNum={pageNum} />
    case 'valuation':
      return <ValuationPage pageNum={pageNum} />
    case 'sales-comps':
      return <SalesCompsPage pageNum={pageNum} />
    case 'rent-comps':
      return <RentCompsPage pageNum={pageNum} />
    case 'selling-stages':
      return <SellingStagesPage pageNum={pageNum} />
    case 'timeline':
      return <TimelinePage pageNum={pageNum} />
    case 'visibility':
      return <VisibilityPage pageNum={pageNum} />
    case 'buyer-tracking':
      return <BuyerTrackingPage pageNum={pageNum} />
    case 'reporting':
      return <ReportingPage pageNum={pageNum} />
    case 'process':
      return <ProcessPage pageNum={pageNum} />
    case 'expect':
      return <ExpectPage pageNum={pageNum} />
    case 'contract':
      return <ContractPage pageNum={pageNum} />
    case 'closing':
      return <ClosingPage pageNum={pageNum} />
    case 'market-overview':
      return <MarketOverview pageNum={pageNum} />
    case 'market-activity':
      return <MarketActivity pageNum={pageNum} />
    case 'why-owners-sell':
      return <WhyOwnersSellPage pageNum={pageNum} />
    case 'tax-deferral':
      return <TaxDeferralPage pageNum={pageNum} />
    case 'flywheel':
      return <FlywheelPage pageNum={pageNum} />
    case 'team':
      return <TeamPage pageNum={pageNum} />
    case 'locations':
      return <LocationsPage pageNum={pageNum} />
    case 'conclusion':
      return <ConclusionPage pageNum={pageNum} />
    case 'firm':
      return <FirmPage pageNum={pageNum} />
    default: {
      // Exhaustiveness: a new BovPageType without a case here fails tsc.
      const unreachable: never = entry.type
      console.error(`no component for manifest type "${String(unreachable)}"`)
      return null
    }
  }
}

/** `?fit=1` scales pages to the viewport width for a preview iframe. `zoom`
    keeps layout height in sync — no trailing whitespace. The print path
    never passes it. */
function useFitScale(enabled: boolean): number {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!enabled) return
    const compute = () => setScale(Math.min(1.25, Math.max(0.2, (window.innerWidth - 24) / 960)))
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [enabled])
  return enabled ? scale : 1
}

export default function App() {
  const fit = new URLSearchParams(window.location.search).has('fit')
  const scale = useFitScale(fit)
  return (
    <div
      className={`om-container${DRAFT ? ' draft' : ''}`}
      style={fit ? ({ zoom: scale } as CSSProperties) : undefined}
    >
      {MANIFEST.map((entry, i) => {
        const el = pageFor(entry, i + 1)
        const tweak = TWEAKS.pages[entry.id]
        const style = tweak && tweak !== 1 ? ({ '--page-zoom': tweak } as CSSProperties) : undefined
        return el ? (
          // data-page-id lets any tool identify pages from the DOM itself —
          // a positional manifest[i] ↔ .page[i] mapping breaks whenever an
          // entry renders null.
          <div key={entry.id} id={`p-${i + 1}`} data-page-id={entry.id} style={style}>
            <PageBoundary pageId={entry.id} pageNum={i + 1}>
              {el}
            </PageBoundary>
          </div>
        ) : null
      })}
    </div>
  )
}
