import type { ReactNode } from 'react'
import { PageHeader, PageFooter, DEAL, FULL_ADDR } from '../Shell.tsx'
import { SALES_COMPS } from '../../data/salesComps.ts'
import { RR, VAL, fmtMoney, fmtMoneyShort, fmtPct, fmtNum } from '../../lib/calc.ts'
import { VOCAB } from '../../lib/vocab.ts'

/* ═══════════════════ SALES COMPARABLES ═══════════════════
   Subject banner + numbered comp boxes (1–3 stacked full width, 4–6 in a
   two-column grid) + commentary. Data: src/data/salesComps.js; price/unit
   and price/SF computed. */

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>{label}</div>
      <div style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  )
}

export default function SalesCompsPage({ pageNum }: { pageNum?: number }) {
  const comps = SALES_COMPS.comps.slice(0, 6)
  const dense = comps.length > 3
  return (
    <div className="page">
      <PageHeader section="Sales Comparables" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Market Evidence</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Sales <span style={{ color: '#F8971D' }}>Comparables</span></div>
        <div className="title-rule" />

        {/* Subject banner */}
        <div style={{ border: '2px solid var(--golden)', borderRadius: 4, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--golden)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10.2, flexShrink: 0 }}>S</div>
          <div style={{ minWidth: 0, flexShrink: 0 }}>
            <div style={{ fontSize: 9.7, fontWeight: 800, color: 'var(--carbon)' }}>{DEAL.name}</div>
            <div style={{ fontSize: 8, color: 'var(--stone)', fontWeight: 600 }}>{FULL_ADDR} · Subject</div>
          </div>
          <div style={{ display: 'flex', gap: 9, flex: 1, marginLeft: 10 }}>
            <Metric label="Concluded Range" value={`${fmtMoneyShort(VAL.low)} – ${fmtMoneyShort(VAL.high)}`} />
            <Metric label={VOCAB.perUnitPrice ? `Price / ${VOCAB.unit} (Mid)` : 'Price / SF (Mid)'} value={VOCAB.perUnitPrice ? fmtMoneyShort(VAL.perUnit) : `$${VAL.perSf.toFixed(2)}`} />
            <Metric label="Units" value={RR.unitCount} />
            <Metric label="Cap at Midpoint" value={fmtPct(VAL.goingInCap)} />
          </div>
        </div>

        {/* Comp boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: dense ? '1fr 1fr' : '1fr', gap: 8, flex: 1, minHeight: 0, alignContent: 'stretch' }}>
          {comps.map((c, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 7, display: 'flex', gap: 10, minHeight: 0 }}>
              {/* Photo where the closed record carries one. Comps without an
                  image get a flat tinted panel rather than a borrowed photo —
                  a stand-in on a comparable is a misrepresentation. */}
              <div style={{
                flex: '0 0 auto', width: 96, alignSelf: 'stretch', minHeight: 62,
                background: c.photo ? undefined : 'var(--linen)',
                borderTop: c.photo ? undefined : '2px solid var(--stone)',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {c.photo
                  ? <img src={c.photo} alt={c.address} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <span style={{ fontSize: 6.4, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', textAlign: 'center', padding: '0 6px', lineHeight: 1.35 }}>
                      No listing<br />photo on record
                    </span>}
              </div>

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, color: 'var(--golden)', fontWeight: 800, fontSize: 11, lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.address} — {c.city}</span>
                </div>
                <div style={{ fontSize: 7.4, color: 'var(--stone)', fontWeight: 600, margin: '2px 0 5px', paddingLeft: 17 }}>
                  {c.type}
                  {c.yearBuilt ? <> &nbsp;|&nbsp; Built {c.yearBuilt}</> : null}
                  {c.gla ? <> &nbsp;|&nbsp; {fmtNum(c.gla)} SF</> : null}
                  &nbsp;|&nbsp; Sold {c.date}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <Metric label="Sale Price" value={fmtMoney(c.price)} />
                  <Metric label={VOCAB.perUnitPrice ? `$ / ${VOCAB.unit}` : '$ / SF'} value={VOCAB.perUnitPrice ? (c.units ? fmtMoneyShort(c.price / c.units) : '—') : (c.gla ? `$${(c.price / c.gla).toFixed(2)}` : '—')} />
                  <Metric label="$ / SF" value={c.gla ? fmtMoney(c.price / c.gla) : '—'} />
                  <Metric label="Units" value={c.units ?? '—'} />
                  <Metric label="Cap" value={c.capRate ?? '—'} />
                </div>
                {c.notes && <div style={{ fontSize: 7.4, color: 'var(--graphite)', marginTop: 4, lineHeight: 1.32 }}>{c.notes}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 8.6, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 8, borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
          {SALES_COMPS.commentary}
        </div>
        <div style={{ fontSize: 7.2, color: 'var(--stone)', marginTop: 4 }}>
          {fmtNum(RR.totSqft)} SF subject basis. Comparable data per public records and market sources deemed reliable; verify independently.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
