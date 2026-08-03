import { Page, TitleBlock, Metric } from '../components/Shell.jsx'
import { fmtMoney, fmtMoneyShort, fmtNum, fmtDate } from '../lib/fmt.js'
import PHOTOS from '../data/photos.json'

/* ═══════════════════ PAGES 3-4 · FEATURED TRANSACTIONS ═══════════════════
   Six photo cards per page. Card vocabulary follows bov-template's
   SalesCompsPage — 6.6px uppercase stone label over an 8-9px 800-weight carbon
   value — so this reads as the same document family as the OMs.

   Cap rates are deliberately absent (seller confidentiality). */

function Card({ deal }) {
  const photo = PHOTOS[deal.id]
  return (
    <div className="card">
      <div className="card-photo">
        <img src={photo} alt="" />
        {deal.type && <div className="card-chip">{deal.type}</div>}
      </div>
      <div className="card-name">{deal.address || deal.name}</div>
      <div className="card-loc">
        {deal.city}, {deal.state}
        {deal.yearBuilt ? ` · Built ${deal.yearBuilt}` : ''}
      </div>
      <div className="card-metrics">
        <Metric label="Sale Price" value={fmtMoney(deal.price)} />
        <Metric label="Units" value={deal.units ? fmtNum(deal.units) : '—'} />
        <Metric label="$ / Unit" value={deal.pricePerUnit ? fmtMoneyShort(deal.pricePerUnit) : '—'} />
        <Metric label="Closed" value={fmtDate(deal.closeDate)} />
      </div>
    </div>
  )
}

export default function FeaturedPage({ cards, part, of, pageNum }) {
  const first = part === 1
  return (
    <Page section="Featured Transactions" pageNum={pageNum}>
      {first ? (
        <TitleBlock
          eyebrow="Selected Closings"
          title="Featured"
          accent="Transactions"
          sub="A representative cross-section of the record — multifamily, mixed-use and retail across Greater Boston, the Merrimack Valley and northern New England."
        />
      ) : (
        <div className="title-strip">
          <h2>Featured Transactions</h2>
          <span className="range">Continued · {part} of {of}</span>
        </div>
      )}

      <div className="cards">
        {cards.map(d => <Card key={d.id} deal={d} />)}
      </div>

      <div className="footnote" style={{ marginTop: 'auto', paddingTop: 10 }}>
        Photography from the firm's property records. Full closing detail for all transactions follows.
      </div>
    </Page>
  )
}
