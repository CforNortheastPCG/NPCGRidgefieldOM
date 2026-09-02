import { PageHeader, PageFooter } from '../Shell.tsx'
import { Fragment } from 'react'
import { SectionTitle, BlockLabel, Callout, SourceNote } from '../Blocks.tsx'
import { T, zebra, DASH, DENSE } from '../tableKit.ts'
import { AS_GIVEN } from '../../data/asGiven.ts'
import { RR, fmtMoney, fmtNum } from '../../lib/calc.ts'

/* ═══════════════════ AS GIVEN — OWNER-PROVIDED FIGURES ═══════════════════
   Ownership's own rent roll and operating statement, reproduced without
   adjustment, beside what our underwriting does to them.

   The point of the page is auditability. Every other financial page in this
   deck is normalized — management to market, vacancy applied, payroll
   trimmed — and a reader is entitled to see the starting point and the size
   of each move. It also, unavoidably, surfaces arithmetic in the source. It
   should: a BOV that quietly corrects an owner's statement and never says so
   has spent the owner's credibility without asking.

   Set AS_GIVEN to null in src/data/asGiven.js and the page drops out.
   Data: src/data/asGiven.js · comparison figures from lib/calc.js */
export default function AsGivenPage({ pageNum }: { pageNum?: number }) {
  if (!AS_GIVEN) return null
  // Narrowing is lost inside the render callbacks below — hold it.
  const ag = AS_GIVEN
  const inc = ag.income || []
  const exp = AS_GIVEN.expenses || []
  const groups = AS_GIVEN.rentRoll || []
  const totExp = exp.reduce((s, e) => s + (e.amount || 0), 0)
  /* Split the roll across two columns at the group boundary that leaves the
     two sides closest in height. Cutting at the first boundary past the
     midpoint puts a big building group entirely on one side. */
  const halves = (() => {
    const rows = groups.map(g => g.units.length + 1)
    const total = rows.reduce((a, b) => a + b, 0)
    let best = 1, bestDiff = Infinity
    for (let cut = 1; cut < groups.length; cut++) {
      const left = rows.slice(0, cut).reduce((a, b) => a + b, 0)
      const diff = Math.abs(left - (total - left))
      if (diff < bestDiff) { bestDiff = diff; best = cut }
    }
    return [groups.slice(0, best), groups.slice(best)]
  })()

  return (
    <div className="page">
      <PageHeader section="As Given" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="As"
          accent="Given"
          subtitle={AS_GIVEN.subtitle || 'Owner-Provided Rent Roll & Operating Statement — Unadjusted'}
        />

        {/* ── the roll, full width and two-up: a 20-unit roll in a single
              narrow column swallows the page and leaves nowhere for the
              statement it is supposed to sit beside. ── */}
        <BlockLabel>{AS_GIVEN.rentRollLabel || 'Rent Roll — As Provided'}</BlockLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 4, alignItems: 'start' }}>
          {[0, 1].map(col => (
            <table key={col} style={{ ...T.table, alignSelf: 'start' }}>
              <colgroup>
                <col style={{ width: '22%' }} /><col style={{ width: '24%' }} />
                <col style={{ width: '20%' }} /><col style={{ width: '18%' }} /><col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Unit</th>
                  <th style={T.thl}>Type</th>
                  <th style={T.thr}>Rent</th>
                  <th style={T.thr}>Expiry</th>
                  <th style={T.thr}>Status</th>
                </tr>
              </thead>
              <tbody>
                {(halves[col] ?? []).map(g => (
                  <Fragment key={g.label}>
                    <tr><td style={{ ...T.subl, ...DENSE }} colSpan={5}>{g.label}</td></tr>
                    {g.units.map((u, i) => (
                      <tr key={`${g.label}-${u.unit}`} style={zebra(i)}>
                        <td style={{ ...T.tdl, ...DENSE, whiteSpace: 'nowrap' }}>{u.unit}</td>
                        <td style={{ ...T.tdl, ...DENSE, fontWeight: 500, color: 'var(--graphite)' }}>{u.type}</td>
                        <td style={{ ...T.tdr, ...DENSE }}>{fmtMoney(u.rent)}</td>
                        <td style={{ ...T.tdr, ...DENSE }}>{u.expiry || DASH}</td>
                        <td style={{ ...T.tdr, ...DENSE, color: /expir/i.test(u.status || '') ? 'var(--terracotta)' : undefined, fontWeight: /expir/i.test(u.status || '') ? 700 : 500 }}>
                          {u.status || DASH}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {col === 1 && (
                  <tr>
                    <td style={T.totl} colSpan={2}>{ag.rentRollTotalLabel || 'Total — Monthly'}</td>
                    <td style={T.totr}>{ag.rentRollTotal == null ? DASH : fmtMoney(ag.rentRollTotal)}</td>
                    <td style={T.totr} colSpan={2}>{ag.rentRollTotal == null ? DASH : `${fmtMoney(ag.rentRollTotal * 12)} / yr`}</td>
                  </tr>
                )}
              </tbody>
            </table>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 20, flex: 1, minHeight: 0, marginTop: 8 }}>

          {/* ── the statement, as provided ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>{AS_GIVEN.statementLabel || 'Operating Statement — As Provided'}</BlockLabel>
            <table style={T.table}>
              <colgroup><col style={{ width: '62%' }} /><col style={{ width: '38%' }} /></colgroup>
              <tbody>
                {inc.map((r, i) => (
                  <tr key={r.label} style={r.strong ? undefined : zebra(i)}>
                    <td style={{ ...(r.strong ? T.subl : T.tdl), ...DENSE }}>{r.label}</td>
                    <td style={{ ...(r.strong ? T.subr : T.tdr), ...DENSE }}>
                      {r.amount < 0 ? `(${fmtMoney(Math.abs(r.amount))})` : fmtMoney(r.amount)}
                    </td>
                  </tr>
                ))}
                {exp.map((r, i) => (
                  <tr key={r.label} style={zebra(i)}>
                    <td style={{ ...T.tdl, ...DENSE }}>{r.label}</td>
                    <td style={{ ...T.tdr, ...DENSE }}>{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...T.subl, ...DENSE }}>Total Operating Expenses</td>
                  <td style={{ ...T.subr, ...DENSE }}>{fmtMoney(totExp)}</td>
                </tr>
                <tr>
                  <td style={T.totl}>Net Operating Income — as stated</td>
                  <td style={T.totr}>{ag.statedNoi == null ? DASH : fmtMoney(ag.statedNoi)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── unit mix + how it reads against our underwriting ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>Unit Mix &amp; Stabilized Rent Schedule</BlockLabel>
            <table style={T.table}>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Unit Type</th>
                  <th style={T.thr}>Units</th>
                  <th style={T.thr}>Avg SF</th>
                  <th style={T.thr}>In-Place</th>
                  <th style={T.thr}>Pro Forma</th>
                  <th style={T.thr}>&Delta; / Unit</th>
                </tr>
              </thead>
              <tbody>
                {RR.mix.map((m, i) => {
                  const d = m.avgProforma - m.avgInPlace
                  return (
                    <tr key={m.type} style={zebra(i)}>
                      <td style={{ ...T.tdl, whiteSpace: 'nowrap' }}>
                        <span style={{ display: 'inline-block', width: 7, height: 7, background: m.color, marginRight: 6, verticalAlign: 'middle' }} />
                        {m.type}
                      </td>
                      <td style={T.tdr}>{m.count}</td>
                      <td style={T.tdr}>{fmtNum(m.avgSqft)}</td>
                      <td style={T.tdr}>{fmtMoney(m.avgInPlace)}</td>
                      <td style={T.tdr}>{fmtMoney(m.avgProforma)}</td>
                      <td style={{ ...T.tdr, color: d > 0 ? 'var(--golden)' : d < 0 ? 'var(--terracotta)' : 'var(--stone)', fontWeight: 700 }}>
                        {d > 0 ? `+${fmtMoney(d)}` : d < 0 ? `(${fmtMoney(Math.abs(d))})` : DASH}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td style={T.totl}>Total / Wtd Avg</td>
                  <td style={T.totr}>{RR.unitCount}</td>
                  <td style={T.totr}>{fmtNum(RR.avgSqft)}</td>
                  <td style={T.totr}>{fmtMoney(RR.avgInPlace)}</td>
                  <td style={T.totr}>{fmtMoney(RR.avgProforma)}</td>
                  <td style={{ ...T.totr, color: 'var(--golden)' }}>+{fmtMoney(RR.avgProforma - RR.avgInPlace)}</td>
                </tr>
              </tbody>
            </table>

            {AS_GIVEN.reconciliation && (
              <Callout title={AS_GIVEN.reconciliationTitle || 'Reading This Against Our Underwriting'} style={{ marginTop: 'auto' }}>
                {AS_GIVEN.reconciliation}
              </Callout>
            )}
          </div>
        </div>

        <SourceNote>{AS_GIVEN.sourceNote}</SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
