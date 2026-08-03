import './index.css'
import './deck.css'

import AboutMePage from './pages/AboutMePage.jsx'
import ByTheNumbersPage from './pages/ByTheNumbersPage.jsx'
import FeaturedPage from './pages/FeaturedPage.jsx'
import MarketsPage from './pages/MarketsPage.jsx'
import TransactionLogPage from './pages/TransactionLogPage.jsx'

import { DATA, FEATURED_OVERRIDE } from './data/deck.js'
import PHOTOS from './data/photos.json'
import { balancedChunks } from './lib/paginate.js'

/* ═══════════════════ PAGE ORDER ═══════════════════
   One source of truth for what's in the deck and in what order. Page numbers
   are derived from position, so inserting a page never means renumbering.

   Expected: 1 About Me + 1 By the Numbers + 2 Featured + 1 Markets + 4 Log = 9. */

const CARDS_PER_PAGE = 6   // 2 cols x 3 rows of 364x278 cards
const FEATURED_COUNT = 12
const LOG_ROWS_PER_PAGE = 51   // see the vertical budget in TransactionLogPage.jsx

/* Featured selection: a curated list from deck.js wins; otherwise auto-pick the
   largest deals that actually have a photo. Only 71 of the 194 carry one, and
   a card with no image reads as a broken page, so photo availability is a hard
   filter rather than a fallback. */
const eligible = DATA.deals.filter(d => PHOTOS[d.id])
const featured = FEATURED_OVERRIDE.length
  ? FEATURED_OVERRIDE.map(id => DATA.deals.find(d => d.id === id)).filter(Boolean)
  : [...eligible].sort((a, b) => b.price - a.price).slice(0, FEATURED_COUNT)

const featuredPages = balancedChunks(featured, CARDS_PER_PAGE)
const logPages = balancedChunks(DATA.deals, LOG_ROWS_PER_PAGE)

// Running offset so the log numbers continuously across its four sheets.
let logOffset = 0
const logDefs = logPages.map((rows, i) => {
  const startIndex = logOffset
  logOffset += rows.length
  return { rows, startIndex, part: i + 1, of: logPages.length }
})

/* Each entry renders its own `.page` root. Do NOT wrap these in a container
   element — `.page` must be a DIRECT child of `.deck`, or the
   `.page:last-child { page-break-after: auto }` rule in the print block matches
   every page (each would be the only child of its wrapper) and the whole deck
   collapses onto one sheet. */
const pageDefs = [
  { key: 'about', render: n => <AboutMePage key="about" pageNum={n} /> },
  { key: 'numbers', render: n => <ByTheNumbersPage key="numbers" pageNum={n} /> },
  ...featuredPages.map((cards, i) => ({
    key: `featured-${i}`,
    render: n => (
      <FeaturedPage key={`featured-${i}`} pageNum={n} cards={cards}
        part={i + 1} of={featuredPages.length} />
    ),
  })),
  { key: 'markets', render: n => <MarketsPage key="markets" pageNum={n} /> },
  ...logDefs.map(d => ({
    key: `log-${d.part}`,
    render: n => (
      <TransactionLogPage key={`log-${d.part}`} pageNum={n}
        rows={d.rows} part={d.part} of={d.of} startIndex={d.startIndex} />
    ),
  })),
]

export default function App() {
  return <div className="deck">{pageDefs.map((d, i) => d.render(i + 1))}</div>
}
