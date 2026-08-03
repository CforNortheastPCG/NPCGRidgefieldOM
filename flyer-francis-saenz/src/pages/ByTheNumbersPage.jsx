import { Page, TitleBlock } from '../components/Shell.jsx'
import VolumeChart from '../components/VolumeChart.jsx'
import { DATA, ATTRIBUTION } from '../data/deck.js'
import { fmtMoneyFloor, fmtMoneyShort, fmtNum, fmtMoney, fmtDate } from '../lib/fmt.js'

/* ═══════════════════ PAGE 2 · TRACK RECORD BY THE NUMBERS ═══════════════════ */

export default function ByTheNumbersPage({ pageNum }) {
  const t = DATA.totals
  const years = t.lastYear - t.firstYear + 1
  const big = t.largest

  const maxBand = Math.max(...DATA.byPriceBand.map(b => b.count))

  const tiles = [
    { v: `${fmtMoneyFloor(t.volume)}+`, l: 'Closed Volume' },
    { v: fmtNum(t.count), l: 'Transactions' },
    { v: fmtNum(t.units), l: 'Units Traded' },
    { v: fmtNum(t.cities), l: `Cities & Towns · ${t.states} States` },
    { v: fmtMoney(Math.round(t.avgPrice / 1e4) * 1e4), l: 'Average Sale Price' },
  ]

  const strip = [
    {
      l: 'Largest Single Transaction',
      v: fmtMoney(big.price),
      s: `${big.address}, ${big.city} · ${fmtNum(big.units)} units · ${fmtDate(big.closeDate)}`,
    },
    {
      l: 'Median Sale Price',
      v: fmtMoney(t.medianPrice),
      s: `Half of all closings traded above this figure`,
    },
    {
      l: 'Pace',
      v: `${(t.count / years).toFixed(1)} deals / yr`,
      s: `${fmtMoneyShort(t.volume / years)} and ${Math.round(t.units / years)} units a year since ${t.firstYear}`,
    },
  ]

  return (
    <Page section="Track Record" pageNum={pageNum}>
      <TitleBlock
        eyebrow="Proof of Execution"
        title="Track Record by the"
        accent="Numbers"
        sub={`Every closing on record from ${t.firstYear} through ${t.lastYear}, drawn directly from the firm's Salesforce database.`}
      />

      <div className="tiles">
        {tiles.map(x => (
          <div className="tile" key={x.l}>
            <div className="tile-v">{x.v}</div>
            <div className="tile-l">{x.l}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, marginBottom: 4 }}>
        <div className="panel-title">Closed Volume by Year</div>
        <VolumeChart byYear={DATA.byYear} axisMax={DATA.chart.axisMax} partialYear={DATA.chart.partialYear} />
      </div>

      <div className="strip" style={{ marginTop: 14 }}>
        {strip.map(x => (
          <div className="strip-item" key={x.l}>
            <div className="strip-l">{x.l}</div>
            <div className="strip-v">{x.v}</div>
            <div className="strip-s">{x.s}</div>
          </div>
        ))}
      </div>

      {/* Deal size and role. Both exist to pre-empt the two questions a
          sophisticated owner asks of any track record: "is this all small
          stuff?" and "what did you actually do on these?" */}
      <div className="split" style={{ marginTop: 16 }}>
        <div>
          <div className="panel-title">Transactions by Deal Size</div>
          <div className="bars">
            {DATA.byPriceBand.map(b => (
              <div className="bar-row" key={b.label}>
                <span className="bar-label">{b.label}</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${(b.count / maxBand) * 100}%` }} />
                </span>
                <span className="bar-val">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="panel-title">Role on the Deal Team</div>
          <div className="bars">
            {DATA.byRole.map(r => (
              <div className="role-row" key={r.role}>
                <div>
                  <div className="role-name">{r.role}</div>
                  <div className="role-sub">{fmtMoneyShort(r.volume)} closed volume</div>
                </div>
                <div className="role-n">{r.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footnote" style={{ marginTop: 'auto', paddingTop: 10 }}>
        {ATTRIBUTION} Record current as of {fmtDate(DATA.generatedAt.slice(0, 7))}.
      </div>
    </Page>
  )
}
