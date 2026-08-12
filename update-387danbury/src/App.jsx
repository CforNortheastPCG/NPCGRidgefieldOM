import './App.css'
import { cloneElement } from 'react'
import { DRAFT } from './data/deal.js'

import CoverHero from './pages/CoverHero.jsx'
import AdvisorsPage from './pages/AdvisorsPage.jsx'
import SnapshotPage from './pages/SnapshotPage.jsx'
import CampaignOverviewPage from './pages/CampaignOverviewPage.jsx'
import MetricsPage from './pages/MetricsPage.jsx'
import ProspectActivityPage from './pages/ProspectActivityPage.jsx'
import MarketContextPage from './pages/MarketContextPage.jsx'
import ClosePage from './pages/ClosePage.jsx'

/* ═══════════════════ MAIN APP ═══════════════════
   Client listing update for 387 Danbury Road — a compact 8-page portrait
   book. pageDefs stays the single source of truth for order + numbers. */

const pageDefs = [
  { el: <CoverHero /> },
  { el: <AdvisorsPage /> },
  { el: <SnapshotPage /> },
  { el: <CampaignOverviewPage /> },
  { el: <MetricsPage /> },
  { el: <ProspectActivityPage /> },
  { el: <MarketContextPage /> },
  { el: <ClosePage /> },
]

function App() {
  return (
    <div className={`om-container${DRAFT ? ' draft' : ''}`}>
      {pageDefs.map((d, i) => cloneElement(d.el, { key: i, pageNum: i + 1 }))}
    </div>
  )
}

export default App
