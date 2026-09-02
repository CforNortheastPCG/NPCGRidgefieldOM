import { PageHeader, PageFooter, PlaceholderBanner } from '../Shell.tsx'
import { SectionTitle, BlockLabel, Callout, SourceNote } from '../Blocks.tsx'
import { T, zebra } from '../tableKit.ts'
import { LadderCurve, RangeBar } from '../Charts.tsx'
import { VALUATION } from '../../data/valuation.ts'
import { VALUATION_CONTENT } from '../../content/index.ts'
import { FIN, VAL, RR, fmtMoney, fmtMoneyShort, fmtPct, fmtPctFixed } from '../../lib/calc.ts'
import { VOCAB } from '../../lib/vocab.ts'

/* ═══════════════════ VALUATION & PRICING ═══════════════════
   Where the opinion becomes a number. Three moves, in order:

     1. The headline band — the ask and what it prices to, so a reader who
        stops here still leaves with the answer.
     2. The cap-rate ladder — the ask located inside a continuous range of
        outcomes rather than asserted next to one. The shaded band is where
        we expect bidding to concentrate; the golden row is the ask.
     3. The three argument cards — why this price, who buys it, what moves
        it. This is the part a spreadsheet cannot produce.

   Every figure is computed from NOI in lib/calc.js. You choose the asking
   price, the ladder bounds, and the prose — in src/data/valuation.js. */
export default function ValuationPage({ pageNum }: { pageNum?: number }) {
  /* Ends of the cap ladder: the highest cap prices lowest, and vice versa. */
  const lowRung = VAL.ladder[VAL.ladder.length - 1] ?? { price: VAL.ask, cap: VAL.askMetrics.capCurrent }
  const highRung = VAL.ladder[0] ?? { price: VAL.ask, cap: VAL.askMetrics.capCurrent }
  const A = VAL.askMetrics
  const debt = VAL.debt

  const debtRows = debt ? [
    ['Net Operating Income — Current', fmtMoney(FIN.current.noi)],
    ...(FIN.t12 ? [['Net Operating Income — Trailing 12', fmtMoney(FIN.t12.noi)]] : []),
    ['Net Operating Income — Pro Forma', fmtMoney(FIN.proforma.noi)],
    ['Loan to Value', `${debt.ltvPct}%`],
    ['Loan Amount', fmtMoney(debt.amount)],
    ['Down Payment / Total Cash In', fmtMoney(debt.down)],
    ['Interest Rate / Amortization', `${fmtPct(debt.ratePct)} / ${debt.amortYears} Years`],
    ['Annual Debt Service', fmtMoney(debt.ads)],
    ['Debt Service Coverage — Current', `${debt.dscrCurrent.toFixed(2)}x`],
    ['Debt Service Coverage — Pro Forma', `${debt.dscrProforma.toFixed(2)}x`],
    ['Cash Flow After Debt — Current', fmtMoney(FIN.current.noi - debt.ads)],
    ['Cash Flow After Debt — Pro Forma', fmtMoney(FIN.proforma.noi - debt.ads)],
    ['Cash-on-Cash — Current', fmtPct(debt.cocCurrent, 2)],
    ['Cash-on-Cash — Pro Forma', fmtPct(debt.cocProforma, 2)],
  ] : []

  const cards = [
    { title: 'Pricing Rationale', body: VALUATION_CONTENT.pricingRationale },
    { title: 'Likely Buyer Profile', body: VALUATION_CONTENT.buyerProfile },
    { title: 'What Moves the Price', body: VALUATION_CONTENT.whatMovesPrice },
  ].filter(c => c.body)

  return (
    <div className="page">
      <PageHeader section="Valuation & Pricing" />
      {!VALUATION_CONTENT.generated && <PlaceholderBanner what="the pricing rationale" />}
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="Valuation &"
          accent="Pricing"
          subtitle="Analysis Summary — Recommended Trade Range"
        />

        {/* ── the headline: no band, no fill. A price this size does not
              need a box around it; the golden rule under it does the work. ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 26,
          borderBottom: '2px solid var(--golden)', paddingBottom: 11, marginBottom: 12,
        }}>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 3, whiteSpace: 'nowrap' }}>
              Recommended Asking Price
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{fmtMoney(VAL.ask)}</div>
          </div>
          <div style={{ display: 'flex', gap: 0, marginLeft: 'auto' }}>
            {[
              { v: fmtMoney(A.perUnit), l: 'Per Unit' },
              { v: `$${A.perSf.toFixed(2)}`, l: 'Per SF' },
              { v: fmtPct(A.capCurrent), l: 'Current\nCap Rate', accent: true },
              ...(A.capT12 != null ? [{ v: fmtPct(A.capT12), l: 'Trailing 12\nCap Rate' }] : []),
              { v: fmtPct(A.capProforma), l: 'Pro Forma\nCap Rate' },
            ].map((m, i) => (
              <div key={m.l} style={{ padding: '0 18px', borderLeft: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: m.accent ? 'var(--golden)' : 'var(--carbon)', lineHeight: 1.05 }}>{m.v}</div>
                <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.25 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 12, flex: 1, minHeight: 0 }}>

          {/* ── the ladder ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>Cap Rate Sensitivity &amp; Trade Range</BlockLabel>
            <table style={{ ...T.table, height: '100%' }}>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Cap Rate</th>
                  <th style={T.thr}>Indicated Value</th>
                  {VOCAB.perUnitPrice && <th style={T.thr}>Price / {VOCAB.unit}</th>}
                  <th style={T.thr}>Price / SF</th>
                </tr>
              </thead>
              <tbody>
                {VAL.ladder.map((r, i) => {
                  const fill = r.isAsk
                    ? { background: 'var(--golden)' }
                    : r.inBand ? { background: 'var(--linen)' } : zebra(i)
                  const fg = r.isAsk ? '#fff' : 'var(--graphite)'
                  const weight = r.isAsk || r.inBand ? 800 : 500
                  return (
                    <tr key={r.cap}>
                      <td style={{ ...T.tdl, ...fill, color: r.isAsk ? '#fff' : 'var(--carbon)', fontWeight: weight }}>
                        {fmtPctFixed(r.cap)}{r.isAsk ? '  \u25c4 ask' : ''}
                      </td>
                      <td style={{ ...T.tdr, ...fill, color: fg, fontWeight: weight }}>{fmtMoney(r.price)}</td>
                      <td style={{ ...T.tdr, ...fill, color: fg, fontWeight: weight }}>{fmtMoney(r.perUnit)}</td>
                      <td style={{ ...T.tdr, ...fill, color: fg, fontWeight: weight }}>${r.perSf.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 7 }}>
              <LadderCurve rows={VAL.ladder} fmt={fmtMoneyShort} height={72} />
            </div>
          </div>

          {/* ── returns ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>Returns &amp; Financing Assumptions</BlockLabel>
            {debt ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                <tbody>
                  {debtRows.map(([l, v], i) => (
                    <tr key={l} style={zebra(i)}>
                      <td style={{ fontSize: 'var(--fs-table)', padding: '3.2px 8px', color: 'var(--stone)', fontWeight: 500, lineHeight: 1.25 }}>{l}</td>
                      <td style={{ fontSize: 'var(--fs-table)', padding: '3.2px 8px', color: 'var(--carbon)', fontWeight: 700, textAlign: 'right', lineHeight: 1.25 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ fontSize: 'var(--fs-table)', color: 'var(--stone)', padding: '12px 0' }}>
                Financing summary omitted — set `loan` in src/data/valuation.js to include market debt terms.
              </div>
            )}
            <div style={{ marginTop: 9 }}>
              <BlockLabel>Where the Ask Sits</BlockLabel>
              <RangeBar
                low={lowRung.price}
                high={highRung.price}
                mark={VAL.ask}
                fmt={fmtMoneyShort}
                lowLabel={`at ${fmtPctFixed(lowRung.cap)}`}
                highLabel={`at ${fmtPctFixed(highRung.cap)}`}
                markLabel="ASK"
                height={50}
              />
            </div>
          </div>
        </div>

        {/* ── the argument ── */}
        {cards.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cards.length}, 1fr)`, gap: 12 }}>
            {cards.map(c => <Callout key={c.title} title={c.title}>{c.body}</Callout>)}
          </div>
        )}

        <SourceNote>
          Indicated values capitalize current net operating income of {fmtMoney(FIN.current.noi)} across{' '}
          {RR.unitCount} units and {RR.totSqft.toLocaleString('en-US')} rentable SF. Shaded band ={' '}
          {fmtPctFixed(VALUATION.capLadder.bandFrom)}–{fmtPctFixed(VALUATION.capLadder.bandTo)}, where we expect
          bidding to concentrate. Debt terms are illustrative and not a financing commitment.
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
