import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { VALUATION } from '../data/valuation.js'
import { FIN, VAL, fmtMoney, fmtMoneyShort, fmtPct } from '../lib/calc.js'

/* ═══════════════════ VALUATION & TRADE RANGE ═══════════════════
   The conclusion page: headline trade range, direct capitalization,
   cap-rate scenario matrix, sales-comparison support, and (optional)
   financing summary. Inputs: src/data/valuation.js; math: lib/calc.js. */
export default function ValuationPage({ pageNum }) {
  const card = { border: '1px solid var(--border)', borderRadius: 4, padding: '10px 13px', display: 'flex', flexDirection: 'column', minHeight: 0 }
  const cardTitle = { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--carbon)', paddingBottom: 5, marginBottom: 7, borderBottom: '2px solid var(--golden)' }
  const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2.5px 0', fontSize: 9.2 }
  const vl = { color: 'var(--stone)', fontWeight: 600 }
  const vv = { color: 'var(--carbon)', fontWeight: 700 }

  return (
    <div className="page">
      <PageHeader section="Valuation" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="section-title" style={{ marginBottom: 2, fontSize: 22 }}>Valuation &amp; <span style={{ color: '#F8971D' }}>Trade Range</span></div>
        <div className="title-rule" style={{ marginBottom: 8 }} />

        {/* Headline trade-range band */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'var(--carbon)', borderRadius: 4, padding: '12px 20px', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 3 }}>Concluded Trade Range</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              {fmtMoneyShort(VAL.low)} <span style={{ color: 'var(--golden)' }}>–</span> {fmtMoneyShort(VAL.high)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 22, marginLeft: 'auto' }}>
            {[
              { l: 'Cap at Midpoint', v: fmtPct(VAL.goingInCap) },
              { l: 'Price / Unit', v: fmtMoneyShort(VAL.perUnit) },
              { l: 'Price / SF', v: fmtMoney(VAL.perSf) },
              { l: 'GRM', v: VAL.grm.toFixed(1) },
            ].map(m => (
              <div key={m.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{m.v}</div>
                <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2×2 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, flex: 1, minHeight: 0 }}>
          {/* Direct capitalization */}
          <div style={card}>
            <div style={cardTitle}>Direct Capitalization</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1 }}>
              {[['Current NOI', FIN.current.noi], ['Pro Forma NOI', FIN.proforma.noi]].map(([label, noi]) => (
                <div key={label}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 3 }}>{label}</div>
                  <div style={row}><span style={vl}>NOI</span><span style={vv}>{fmtMoney(noi)}</span></div>
                  <div style={row}><span style={vl}>Cap at Midpoint</span><span style={{ ...vv, color: 'var(--terracotta)' }}>{fmtPct((noi / VAL.mid) * 100)}</span></div>
                  <div style={row}><span style={vl}>Value at Market Cap</span><span style={vv}>{fmtMoneyShort(noi / ((VALUATION.capScenarios.find(s => s.highlight) || VALUATION.capScenarios[0]).cap / 100))}</span></div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', lineHeight: 1.35, marginTop: 4 }}>{VALUATION.conclusionNote}</div>
          </div>

          {/* Cap-rate scenario matrix */}
          <div style={card}>
            <div style={cardTitle}>Value by Cap-Rate Scenario</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', flex: 1 }}>
              <thead>
                <tr>
                  {['Scenario', 'Cap Rate', 'Current NOI', 'Pro Forma NOI'].map((h, i) => (
                    <th key={h} style={{ fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--stone)', textAlign: i === 0 ? 'left' : 'right', padding: '2px 4px', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VAL.matrix.map(r => (
                  <tr key={r.label} style={r.highlight ? { background: 'var(--linen)' } : undefined}>
                    <td style={{ fontSize: 9, fontWeight: r.highlight ? 800 : 600, color: 'var(--carbon)', padding: '4px 4px' }}>{r.label}{r.highlight ? ' ★' : ''}</td>
                    <td style={{ fontSize: 9, fontWeight: 700, color: 'var(--terracotta)', textAlign: 'right', padding: '4px 4px' }}>{fmtPct(r.cap)}</td>
                    <td style={{ fontSize: 9, fontWeight: r.highlight ? 800 : 600, color: 'var(--carbon)', textAlign: 'right', padding: '4px 4px' }}>{fmtMoneyShort(r.valueCurrent)}</td>
                    <td style={{ fontSize: 9, fontWeight: r.highlight ? 800 : 600, color: 'var(--carbon)', textAlign: 'right', padding: '4px 4px' }}>{fmtMoneyShort(r.valueProforma)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontSize: 7.6, color: 'var(--stone)', lineHeight: 1.35, marginTop: 4 }}>
              ★ Market scenario. Values = NOI ÷ cap rate; the concluded range brackets the market scenario between current and pro-forma income.
            </div>
          </div>

          {/* Sales comparison */}
          <div style={card}>
            <div style={cardTitle}>Sales Comparison Support</div>
            <div style={row}><span style={vl}>Comp Range</span><span style={vv}>{VALUATION.compRangeText}</span></div>
            <div style={row}><span style={vl}>Adjusted Comp Range</span><span style={vv}>{VALUATION.adjustedRangeText}</span></div>
            <div style={row}><span style={vl}>Subject at Midpoint</span><span style={vv}>{fmtMoneyShort(VAL.perUnit)} / unit</span></div>
            <div style={row}><span style={vl}>Concluded Range</span><span style={{ ...vv, color: 'var(--golden)' }}>{fmtMoneyShort(VAL.low)} – {fmtMoneyShort(VAL.high)}</span></div>
            <div style={{ marginTop: 'auto', paddingTop: 5, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 2 }}>Adjustments</div>
              <div style={{ fontSize: 8, color: 'var(--graphite)', lineHeight: 1.4 }}>{VALUATION.adjustmentsNote}</div>
            </div>
          </div>

          {/* Financing summary (optional) */}
          {VAL.debt ? (
            <div style={card}>
              <div style={cardTitle}>Financing Summary — {VAL.debt.ltvPct}% LTV</div>
              <div style={row}><span style={vl}>Basis (Range Midpoint)</span><span style={vv}>{fmtMoney(VAL.mid)}</span></div>
              <div style={row}><span style={vl}>Loan Amount</span><span style={vv}>{fmtMoney(VAL.debt.amount)}</span></div>
              <div style={row}><span style={vl}>Down Payment ({100 - VAL.debt.ltvPct}%)</span><span style={vv}>{fmtMoney(VAL.debt.down)}</span></div>
              <div style={row}><span style={vl}>Rate / Amortization</span><span style={vv}>{fmtPct(VAL.debt.ratePct)} / {VAL.debt.amortYears} yr</span></div>
              <div style={row}><span style={vl}>Annual Debt Service</span><span style={vv}>{fmtMoney(VAL.debt.ads)}</span></div>
              <div style={row}><span style={vl}>DSCR (Current → Pro Forma)</span><span style={{ ...vv, color: 'var(--terracotta)' }}>{VAL.debt.dscrCurrent.toFixed(2)}x → {VAL.debt.dscrProforma.toFixed(2)}x</span></div>
              <div style={row}><span style={vl}>Cash-on-Cash</span><span style={vv}>{fmtPct(VAL.debt.cocCurrent, 1)} → {fmtPct(VAL.debt.cocProforma, 1)}</span></div>
            </div>
          ) : (
            <div style={{ ...card, justifyContent: 'center', textAlign: 'center', color: 'var(--stone)', fontSize: 9 }}>
              Financing summary omitted — set `loan` in src/data/valuation.js to include market debt terms.
            </div>
          )}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
