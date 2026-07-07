/* ═══════════ PAGE ASSEMBLY (protected) ═══════════
   The injected manifest (src/data/manifest.ts) is the single source of
   page order; page numbers are 1-based manifest positions. */

import { Component, useEffect, useState, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { MANIFEST } from './data/manifest.ts'
import { DEAL } from './data/deal.ts'
import { TWEAKS } from './data/tweaks.ts'
import { PHOTO_PAGES } from './data/photos.ts'
import { Toc } from './components/Toc.tsx'
import { Divider } from './components/Divider.tsx'
import { PhotoGallery } from './components/PhotoPages.tsx'
import { CoverHero } from './components/pages/CoverHero.tsx'
import { DealContacts } from './components/pages/DealContacts.tsx'
import { ExecutiveSummary } from './components/pages/ExecutiveSummary.tsx'
import { InvestmentHighlights } from './components/pages/InvestmentHighlights.tsx'
import { PropertyOverview } from './components/pages/PropertyOverview.tsx'
import { RentRoll } from './components/pages/RentRoll.tsx'
import { TenantProfiles } from './components/pages/TenantProfiles.tsx'
import { IncomeExpense } from './components/pages/IncomeExpense.tsx'
import { PortfolioParcelMap } from './components/pages/PortfolioParcelMap.tsx'
import { RegionalPositioning } from './components/pages/RegionalPositioning.tsx'
import { EmployersEducation } from './components/pages/EmployersEducation.tsx'
import { LocationAmenitiesMap } from './components/pages/LocationAmenitiesMap.tsx'
import { LifestyleCulture } from './components/pages/LifestyleCulture.tsx'
import { DevelopmentPipeline } from './components/pages/DevelopmentPipeline.tsx'
import { Transportation } from './components/pages/Transportation.tsx'
import { TeamPage } from './components/pages/TeamPage.tsx'
import { LocationsPage } from './components/pages/LocationsPage.tsx'
import type { ManifestEntry } from './lib/types.ts'

/** One bad content module must cost ONE page, not the book. A page that
    throws during render becomes a loud red error page — visible in the
    preview, in print, and to the verify agent's screenshot review — while
    every other page keeps rendering. */
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
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fbeae7' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#B3261E' }}>Page failed to render — {this.props.pageId}</div>
        <div style={{ fontSize: 12, color: '#7a2620', maxWidth: 640, textAlign: 'center', fontFamily: 'ui-monospace, monospace' }}>
          {String(this.state.error.message ?? this.state.error).slice(0, 400)}
        </div>
        <div style={{ fontSize: 11, color: '#7a2620' }}>Fix the page's content module (or regenerate) — the rest of the book is unaffected.</div>
      </div>
    )
  }
}

function pageFor(entry: ManifestEntry, pageNum: number): ReactElement | null {
  switch (entry.type) {
    case 'cover':
      return <CoverHero pageNum={pageNum} />
    case 'toc':
      return <Toc pageNum={pageNum} />
    case 'contacts':
      return <DealContacts pageNum={pageNum} />
    case 'exec-summary':
      return <ExecutiveSummary pageNum={pageNum} />
    case 'highlights':
      return <InvestmentHighlights pageNum={pageNum} />
    case 'divider':
      return <Divider eyebrow={entry.eyebrow} title={entry.title} image={entry.image} pageNum={pageNum} />
    case 'property-overview':
      return <PropertyOverview pageNum={pageNum} />
    case 'photos': {
      const page = PHOTO_PAGES.find((p) => p.id === entry.id)
      return page ? <PhotoGallery page={page} pageNum={pageNum} /> : null
    }
    case 'rent-roll':
      return <RentRoll pageNum={pageNum} />
    case 'tenant-profiles':
      return <TenantProfiles pageNum={pageNum} />
    case 'income-expense':
      return <IncomeExpense pageNum={pageNum} />
    case 'portfolio-map':
      return <PortfolioParcelMap pageNum={pageNum} />
    case 'regional-position':
      return <RegionalPositioning pageNum={pageNum} />
    case 'employers-education':
      return <EmployersEducation pageNum={pageNum} />
    case 'transportation':
      return <Transportation pageNum={pageNum} />
    case 'location-amenities':
      return <LocationAmenitiesMap pageNum={pageNum} />
    case 'lifestyle-culture':
      return <LifestyleCulture pageNum={pageNum} />
    case 'development-pipeline':
      return <DevelopmentPipeline pageNum={pageNum} />
    case 'team':
      return <TeamPage pageNum={pageNum} />
    case 'locations':
      return <LocationsPage pageNum={pageNum} />
    default:
      return null
  }
}

/** `?fit=1` (the wizard's preview iframe) scales pages to the viewport
    width. `zoom` keeps layout height in sync — no trailing whitespace.
    The print path never passes it. */
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
  // Per-deal title — browser tabs and the PDF's fallback Title field.
  useEffect(() => {
    document.title =
      DEAL.name && DEAL.name !== DEAL.address ? `${DEAL.name}, ${DEAL.fullAddress} · Offering Memorandum` : `${DEAL.fullAddress} · Offering Memorandum`
  }, [])
  return (
    <div className="om-container" style={fit ? ({ zoom: scale } as React.CSSProperties) : undefined}>
      {MANIFEST.map((entry, i) => {
        const el = pageFor(entry, i + 1)
        const tweak = TWEAKS.pages[entry.id]
        const style = tweak && tweak !== 1 ? ({ '--page-zoom': tweak } as CSSProperties) : undefined
        return el ? (
          <div key={entry.id} id={`p-${i + 1}`} style={style}>
            <PageBoundary pageId={entry.id} pageNum={i + 1}>
              {el}
            </PageBoundary>
          </div>
        ) : null
      })}
    </div>
  )
}
