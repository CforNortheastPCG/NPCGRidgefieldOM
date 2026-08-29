import { PageHeader, PageFooter, Md, DEAL } from '../components/Shell.jsx'
import { SectionTitle, BlockLabel } from '../components/Blocks.jsx'
import { zebra } from '../components/tableKit.js'
import { VALUATION } from '../data/valuation.js'
import { ADVISORS } from '../data/advisors.js'
import { OFFICES } from '../data/firm.js'
import { VAL, FIN, fmtMoney, fmtMoneyShort, fmtPct } from '../lib/calc.js'
import { RangeBar } from '../components/Charts.jsx'

/* ═══════════════════ CONCLUSION & CONTACT ═══════════════════
   The page the whole document exists to reach: a stated opinion of value,
   the range around it, and who to call. A BOV that never names a number is
   not a BOV.

   The narrative comes from valuation.js `opinionParagraphs`; every figure
   below it is computed, so the prose and the table cannot drift apart.
   Endpoints are the named cap scenarios, not the concluded range — the
   range is where you'd settle, the endpoints are what the income supports. */
export default function ConclusionPage({ pageNum }) {
  const caps = [...VALUATION.capScenarios].sort((a, b) => a.cap - b.cap)
  const lowCap = caps[caps.length - 1]   // highest cap → lowest value
  const highCap = caps[0]                // lowest cap → highest value
  const lowValue = FIN.current.noi / (lowCap.cap / 100)
  const highValue = FIN.current.noi / (highCap.cap / 100)

  const conclusionRows = [
    { label: `Low End of Range (${fmtPct(lowCap.cap)} Cap)`, value: fmtMoney(lowValue) },
    { label: `High End of Range (${fmtPct(highCap.cap)} Cap)`, value: fmtMoney(highValue) },
    { label: 'Recommended Asking Price', value: fmtMoney(VAL.ask), strong: true },
    { label: 'Price per Unit', value: fmtMoney(VAL.askMetrics.perUnit) },
    { label: 'Price per Rentable SF', value: `$${VAL.askMetrics.perSf.toFixed(2)}` },
    { label: 'Going-In Cap Rate (Current)', value: fmtPct(VAL.askMetrics.capCurrent) },
    ...(VAL.askMetrics.capT12 != null
      ? [{ label: 'Cap on Trailing Twelve', value: fmtPct(VAL.askMetrics.capT12) }] : []),
    { label: 'Pro Forma Cap Rate', value: fmtPct(VAL.askMetrics.capProforma) },
  ]


  return (
    <div className="page">
      <PageHeader section="Conclusion & Contact" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 258px', gap: 20, flex: 1, minHeight: 0 }}>

          {/* ── left: the opinion ── */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <SectionTitle
              title="Conclusion &"
              accent="Recommendation"
              subtitle={`Broker Opinion of Value — ${DEAL.preparedDate}`}
            />

            {(VALUATION.opinionParagraphs || []).slice(0, 1).map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 'var(--fs-sub)', lineHeight: 1.5, color: 'var(--graphite)', margin: '0 0 10px' }} />
            ))}

            {/* the number — open, not banded */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 24,
              borderTop: '2px solid var(--golden)', borderBottom: '1px solid var(--border)',
              padding: '11px 0 12px', marginBottom: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 3 }}>
                  Recommended Asking Price
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{fmtMoney(VAL.ask)}</div>
                <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', marginTop: 5 }}>
                  {fmtMoney(VAL.askMetrics.perUnit)} per unit &nbsp;|&nbsp; ${VAL.askMetrics.perSf.toFixed(2)} per SF
                  &nbsp;|&nbsp; {fmtPct(VAL.askMetrics.capCurrent)} cap on current NOI
                </div>
              </div>
              <div style={{ flex: '0 0 auto', textAlign: 'right', paddingLeft: 24, borderLeft: '1px solid var(--border)' }}>
                <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: 3 }}>
                  Expected Trade Range
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2 }}>
                  {fmtMoney(lowValue)} — {fmtMoney(highValue)}
                </div>
                <div style={{ fontSize: 'var(--fs-note)', color: 'var(--golden)', fontWeight: 700, marginTop: 4 }}>
                  {fmtPct(lowCap.cap)} — {fmtPct(highCap.cap)} capitalization
                </div>
              </div>
            </div>

            {(VALUATION.opinionParagraphs || []).slice(1).map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 'var(--fs-sub)', lineHeight: 1.5, color: 'var(--graphite)', margin: '0 0 8px' }} />
            ))}

            {/* flex column so the disclaimer's marginTop:auto can drop it to
                the foot of the page — trailing white space reads as an
                unfinished page; white space framed by content reads as air. */}
            {/* the range, drawn — the table below is the same thing in
                figures, for the reader who wants to check it */}
            <div style={{ marginBottom: 12 }}>
              <RangeBar
                low={lowValue} high={highValue} mark={VAL.ask}
                fmt={fmtMoneyShort}
                lowLabel={`${fmtPct(lowCap.cap)} cap`}
                highLabel={`${fmtPct(highCap.cap)} cap`}
                markLabel="RECOMMENDED ASK"
                height={56}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <BlockLabel>Value Conclusion</BlockLabel>
              {/* height:100% lets the rows take the slack, so the page ends on
                  content rather than on a void above the disclaimer. */}
              <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                <tbody>
                  {conclusionRows.map((r, i) => (
                    <tr key={r.label} style={r.strong ? { borderTop: '1px solid var(--golden)', borderBottom: '1px solid var(--golden)' } : zebra(i)}>
                      <td style={{ fontSize: 'var(--fs-table)', padding: '3.5px 8px', color: r.strong ? 'var(--carbon)' : 'var(--stone)', fontWeight: r.strong ? 800 : 500, lineHeight: 1.25 }}>{r.label}</td>
                      <td style={{ fontSize: 'var(--fs-table)', padding: '3.5px 8px', color: r.strong ? 'var(--golden)' : 'var(--carbon)', fontWeight: 800, textAlign: 'right', lineHeight: 1.25 }}>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.4, color: 'var(--stone)', paddingTop: 10 }}>
                {VALUATION.disclaimerNote}
              </div>
            </div>
          </div>

          {/* ── right: who to call ── */}
          <div style={{ paddingLeft: 20, borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <img
              src="/logos/npcg-color-hires.png"
              alt="Northeast Private Client Group"
              style={{ width: '100%', maxHeight: 52, objectFit: 'contain', objectPosition: 'left center', marginBottom: 14 }}
            />
            <div style={{ borderTop: '2px solid var(--golden)', paddingTop: 10 }} />

            <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 5 }}>
              Presented By
            </div>

            {ADVISORS.map((a, i) => (
              <div key={a.name} style={{ marginBottom: 12, paddingTop: i > 0 ? 10 : 0, borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2 }}>{a.name}</div>
                <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', marginBottom: 5 }}>{a.title}</div>
                <div style={{ fontSize: 'var(--fs-sub)', color: 'var(--carbon)', lineHeight: 1.6 }}>
                  <div><strong style={{ color: 'var(--stone)', fontWeight: 700 }}>Direct</strong> {a.phone}</div>
                  <div style={{ wordBreak: 'break-word' }}><strong style={{ color: 'var(--stone)', fontWeight: 700 }}>Email</strong> {a.email}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
              {(OFFICES || []).slice(0, 2).map(o => (
                <div key={o.address1} style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', lineHeight: 1.45, marginBottom: 6 }}>
                  <div style={{ color: 'var(--carbon)', fontWeight: 700 }}>{o.region}</div>
                  <div>{o.address1}</div>
                  <div>{o.address2}</div>
                </div>
              ))}
              <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 700, color: 'var(--golden)', marginTop: 6 }}>northeastpcg.com</div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
