import { Page, TitleBlock } from '../components/Shell.jsx'
import { DATA, ATTRIBUTION } from '../data/deck.js'
import { fmtMoney, fmtMoneyShort, fmtNum, fmtDateShort } from '../lib/fmt.js'

/* ═══════════════════ PAGES 6-9 · FULL TRANSACTION LOG ═══════════════════
   Every closing, newest first. The row cap that drives the page count is
   computed in App.jsx; the vertical budget behind it:

     1056 page - 46 header - 28 footer            = 982 content box
          - 16 section pad-top - 12 pad-bottom    = 954 usable
          - 70 title block - 19 thead - 16 footnote = 849 for tbody
     row pitch = 9.6 (8px x 1.2) + 6 (3px padding) + 1 (border) = 16.6px
     849 / 16.6 = 51 rows

   Fixed table-layout + an explicit colgroup so all four sheets align
   pixel-identically. Cap rate is intentionally not a column.

   Zebra rows are why index.css needs print-color-adjust: exact — without it
   Chromium drops the alternating fills in the PDF. */

export default function TransactionLogPage({ rows, part, of, startIndex, pageNum }) {
  const first = part === 1
  const last = part === of
  const t = DATA.totals
  const from = startIndex + 1
  const to = startIndex + rows.length

  return (
    <Page section="Transaction Log" pageNum={pageNum}>
      {first ? (
        <TitleBlock
          eyebrow="The Complete Record"
          title="Full Transaction"
          accent="Log"
          sub={`All ${fmtNum(t.count)} closings from ${t.firstYear} through ${t.lastYear}, most recent first.`}
        />
      ) : (
        <div className="title-strip">
          <h2>Full Transaction Log</h2>
          <span className="range">Continued · {from}–{to} of {t.count}</span>
        </div>
      )}

      <table className="data-table tx-log">
        <colgroup>
          <col style={{ width: '58px' }} />
          <col style={{ width: '268px' }} />
          <col style={{ width: '104px' }} />
          <col style={{ width: '28px' }} />
          <col style={{ width: '84px' }} />
          <col style={{ width: '42px' }} />
          <col style={{ width: '92px' }} />
          <col style={{ width: '82px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Closed</th>
            <th>Property / Address</th>
            <th>City / Town</th>
            <th>ST</th>
            <th>Type</th>
            <th className="num">Units</th>
            <th className="num">Sale Price</th>
            <th className="num">$ / Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(d => (
            <tr key={d.id}>
              <td>{fmtDateShort(d.closeDate)}</td>
              <td className="addr" title={d.address || d.name}>{d.address || d.name || '—'}</td>
              <td>{d.city || '—'}</td>
              <td>{d.state || '—'}</td>
              <td>{d.type || '—'}</td>
              <td className="num">{d.units ? fmtNum(d.units) : '—'}</td>
              <td className="num">{fmtMoney(d.price)}</td>
              <td className="num">{d.pricePerUnit ? fmtMoneyShort(d.pricePerUnit) : '—'}</td>
            </tr>
          ))}
          {last && (
            <tr className="total-row">
              <td colSpan={5}>{fmtNum(t.count)} closings · {t.firstYear}–{t.lastYear}</td>
              <td className="num">{fmtNum(t.units)}</td>
              <td className="num">{fmtMoney(t.volume)}</td>
              <td className="num">—</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="footnote" style={{ marginTop: 'auto', paddingTop: 8 }}>
        {last
          ? `${ATTRIBUTION} A dash indicates the figure is not carried in the firm's record for that asset.`
          : `Continues on the following page. A dash indicates the figure is not carried in the firm's record for that asset.`}
      </div>
    </Page>
  )
}
