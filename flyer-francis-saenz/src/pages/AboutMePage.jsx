import { BROKER, BIO, ATTRIBUTION, HERO_DEAL_ID, DATA } from '../data/deck.js'
import { Page, Md } from '../components/Shell.jsx'
import { fmtMoneyFloor, fmtNum, fmtMoney, fmtDate } from '../lib/fmt.js'

/* ═══════════════════ PAGE 1 · ADVISOR PROFILE ═══════════════════
   Follows the firm's existing broker-page pattern (bov-template's
   BrokerProfile.jsx): white sheet, carbon header bar, golden-bordered headshot
   left, name and credentials right, golden-topped stat cards.

   The earlier version reproduced the old one-pager's full-bleed dark panels.
   It read heavy next to the rest of the deck, so this uses the clean
   white-background roster headshot instead of the dark composite and keeps the
   only large dark element — the closing band — down at the foot of the page.

   Every figure reads from comps.json. The static original hard-coded
   "$200,000,000+ / 90+" and was still advertising them long after the real
   record passed double that; this page cannot repeat that. */

export default function AboutMePage({ pageNum }) {
  const t = DATA.totals
  const hero = DATA.deals.find(d => d.id === HERO_DEAL_ID)

  const stats = [
    { l: 'Total Sales Volume', v: `${fmtMoneyFloor(t.volume)}+` },
    { l: 'Transactions Closed', v: fmtNum(t.count) },
    { l: 'Units Traded', v: fmtNum(t.units) },
    { l: 'Cities & Towns', v: fmtNum(t.cities) },
    { l: 'Average Sale Price', v: fmtMoney(Math.round(t.avgPrice / 1e4) * 1e4) },
  ]

  return (
    <Page section="Advisor Profile" pageNum={pageNum}>
      <div className="ap-top">
        <div className="ap-shot">
          <img src={BROKER.headshot} alt={BROKER.name} />
        </div>

        <div className="ap-id">
          <div className="eyebrow">Northeast Private Client Group</div>
          <h1 className="ap-name">{BROKER.name}</h1>
          <div className="ap-role">{BROKER.title}</div>
          <div className="title-rule" />

          <div className="ap-rows">
            <div className="ap-row"><span className="ap-k">Direct</span><span className="ap-v">{BROKER.phone}</span></div>
            <div className="ap-row"><span className="ap-k">Email</span><span className="ap-v">{BROKER.email}</span></div>
            <div className="ap-row"><span className="ap-k">Focus</span><span className="ap-v">Multifamily · Mixed-Use · Retail</span></div>
            <div className="ap-row"><span className="ap-k">Markets</span><span className="ap-v">Greater Boston · Merrimack Valley · Northern New England</span></div>
            {/* Deliberately "closings on record", not "active since": the bio
                says he joined in 2015 on the original flyer's authority, but
                sales_comps starts in 2017. Stating the span of the record
                avoids asserting a tenure nobody has confirmed yet. */}
            <div className="ap-row">
              <span className="ap-k">Closings On Record</span>
              <span className="ap-v">{t.firstYear}–{t.lastYear}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ap-stats">
        {stats.map(s => (
          <div className="ap-stat" key={s.l}>
            <div className="ap-stat-v">{s.v}</div>
            <div className="ap-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="ap-bio">
        {BIO.map((p, i) => <Md key={i} text={p} />)}
      </div>

      {/* The one dark element on the page, and it earns it: a real closing
          rather than the stock glass tower the original flyer used. */}
      {hero && (
        <div className="ap-closing">
          <img src="/photos/hero.jpg" alt="" />
          <div className="ap-closing-bar">
            <div>
              <div className="ap-closing-k">Representative Closing</div>
              <div className="ap-closing-v">{hero.address}, {hero.city}, {hero.state}</div>
            </div>
            <div className="ap-closing-facts">
              {fmtNum(hero.units)} Units &nbsp;·&nbsp; {fmtMoney(hero.price)} &nbsp;·&nbsp; Closed {fmtDate(hero.closeDate)}
            </div>
          </div>
        </div>
      )}

      <div className="footnote" style={{ marginTop: 'auto', paddingTop: 8 }}>{ATTRIBUTION}</div>
    </Page>
  )
}
