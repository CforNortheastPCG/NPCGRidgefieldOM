import { Page, TitleBlock } from '../components/Shell.jsx'
import Donut from '../components/Donut.jsx'
import { DATA } from '../data/deck.js'
import { fmtMoneyShort, fmtNum } from '../lib/fmt.js'

/* ═══════════════════ PAGE 5 · MARKETS & PRODUCT TYPES ═══════════════════
   Nine raw property types is too many donut slices to read, so everything under
   5 deals rolls into "Other". The Top-15 city table carries the real story:
   the record is concentrated, not scattered. */

/* Exactly as many colors as slices — a modulo palette would paint Multifamily
   and Office the same carbon and make the donut unreadable. */
const SLICE_COLORS = ['#3f4753', '#F8971D', '#B55D37', '#7d8794', '#c9c1b8']
const MAJOR_SLICES = 4   // top 4 by count; everything else rolls into "Other"
// Every market with repeat business — a natural cut (28 towns today) rather
// than an arbitrary top-N, and it's the number that actually makes the point.
const MIN_CITY_DEALS = 2

export default function MarketsPage({ pageNum }) {
  const t = DATA.totals

  const major = DATA.byType.slice(0, MAJOR_SLICES)
  const minor = DATA.byType.slice(MAJOR_SLICES)
  const otherCount = minor.reduce((s, x) => s + x.count, 0)
  const otherVolume = minor.reduce((s, x) => s + x.volume, 0)
  const slices = [
    ...major.map((x, i) => ({ label: x.type, value: x.count, volume: x.volume, color: SLICE_COLORS[i] })),
    ...(otherCount ? [{ label: 'Other', value: otherCount, volume: otherVolume, color: SLICE_COLORS[MAJOR_SLICES] }] : []),
  ]
  const maxSliceVol = Math.max(...slices.map(s => s.volume))

  const topCities = DATA.byCity.filter(c => c.count >= MIN_CITY_DEALS)
  const shown = topCities.reduce((s, c) => s + c.count, 0)
  const singles = DATA.byCity.length - topCities.length

  return (
    <Page section="Markets & Product Types" pageNum={pageNum}>
      <TitleBlock
        eyebrow="Where the Work Is"
        title="Markets &"
        accent="Product Types"
        sub={`${fmtNum(t.count)} closings across ${t.cities} cities and towns in ${t.states} states — with real depth in the Merrimack Valley and Boston's northern suburbs.`}
      />

      <div className="markets">
        {/* ── left: product mix ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-title">Product Mix by Transaction Count</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 20px' }}>
            <Donut data={slices} size={208} thickness={36} centerLabel={fmtNum(t.count)} centerSub="CLOSINGS" />
          </div>
          <div className="legend">
            {slices.map(s => (
              <div className="legend-row" key={s.label}>
                <span className="legend-dot" style={{ background: s.color }} />
                <span className="legend-label">{s.label}</span>
                <span className="legend-val">{s.value} · {Math.round((s.value / t.count) * 100)}%</span>
              </div>
            ))}
          </div>
          {!!minor.length && (
            <div className="footnote" style={{ marginTop: 10 }}>
              Other comprises {minor.map(m => `${m.type.toLowerCase()} (${m.count})`).join(', ')}.
            </div>
          )}

          {/* Count and dollars tell different stories: multifamily is 71% of the
              deals but a smaller share of the volume, because the portfolio and
              hospitality trades are individually much larger. */}
          <div className="panel-title" style={{ marginTop: 22 }}>Volume by Product Type</div>
          <div className="bars">
            {slices.map(s => (
              <div className="bar-row" key={s.label}>
                <span className="bar-label" style={{ width: 72 }}>{s.label}</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${(s.volume / maxSliceVol) * 100}%`, background: s.color }} />
                </span>
                <span className="bar-val" style={{ width: 42 }}>{fmtMoneyShort(s.volume)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── right: geography ── */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div className="panel-title">Geographic Footprint</div>
          <div className="states">
            {DATA.byState.map(s => (
              <div className="state-tile" key={s.state}>
                <div className="st">{s.state}</div>
                <div className="n">{s.count} deals</div>
              </div>
            ))}
          </div>

          <div className="panel-title" style={{ marginTop: 18 }}>Markets with Repeat Business</div>
          <table className="data-table roomy">
            <colgroup>
              <col style={{ width: '38%' }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '16%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>City / Town</th>
                <th>ST</th>
                <th className="num">Deals</th>
                <th className="num">Units</th>
                <th className="num">Volume</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map(c => (
                <tr key={`${c.city}|${c.state}`}>
                  <td>{c.city}</td>
                  <td>{c.state}</td>
                  <td className="num">{c.count}</td>
                  <td className="num">{c.units ? fmtNum(c.units) : '—'}</td>
                  <td className="num">{fmtMoneyShort(c.volume)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footnote" style={{ marginTop: 6 }}>
            Every market with repeat business — {topCities.length} towns, {Math.round((shown / t.count) * 100)}% of all
            closings. A further {singles} towns account for one closing each.
          </div>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 12 }}>
        <div className="callout-v">{t.cities}</div>
        <div className="callout-t">
          cities and towns across <strong>Massachusetts, New Hampshire, Rhode Island and Vermont</strong> — with
          repeat work concentrated in a handful of them. That density is what lets pricing be set from
          experience rather than from a search.
        </div>
      </div>
    </Page>
  )
}
