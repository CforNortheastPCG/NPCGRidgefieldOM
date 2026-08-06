import { PageHeader, PageFooter, DEAL, FULL_ADDR } from '../components/Shell.jsx'
import { SALES_COMPS } from '../data/salesComps.js'
import { RR, VAL, fmtMoney, fmtMoneyShort, fmtPct, fmtNum } from '../lib/calc.js'

/* ═══════════════════ SALES COMPARABLES ═══════════════════
   Subject banner + numbered comp boxes (1–3 stacked full width, 4–6 in a
   two-column grid) + commentary. Data: src/data/salesComps.js; price/unit
   and price/SF computed. */

function Metric({ label, value }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>{label}</div>
      <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  )
}

export default function SalesCompsPage({ pageNum }) {
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
        <div style={{ border: '2px solid var(--golden)', borderRadius: 4, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--golden)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>S</div>
          <div style={{ minWidth: 0, flexShrink: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--carbon)' }}>{DEAL.name}</div>
            <div style={{ fontSize: 8, color: 'var(--stone)', fontWeight: 600 }}>{FULL_ADDR} · Subject</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flex: 1, marginLeft: 10 }}>
            <Metric label="Concluded Range" value={`${fmtMoneyShort(VAL.low)} – ${fmtMoneyShort(VAL.high)}`} />
            <Metric label="Price / Unit (Mid)" value={fmtMoneyShort(VAL.perUnit)} />
            <Metric label="Units" value={RR.unitCount} />
            <Metric label="Cap at Midpoint" value={fmtPct(VAL.goingInCap)} />
          </div>
        </div>

        {/* Comp boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: dense ? '1fr 1fr' : '1fr', gap: 8, flex: 1, minHeight: 0, alignContent: 'stretch' }}>
          {comps.map((c, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '7px 11px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--carbon)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 9.5, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: 9.8, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.address} — {c.city}</span>
              </div>
              <div style={{ fontSize: 7.6, color: 'var(--stone)', fontWeight: 600, margin: '2px 0 5px', paddingLeft: 26 }}>{c.type} &nbsp;|&nbsp; Sold {c.date}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <Metric label="Sale Price" value={fmtMoney(c.price)} />
                <Metric label="$ / Unit" value={c.units ? fmtMoneyShort(c.price / c.units) : '—'} />
                <Metric label="$ / SF" value={c.gla ? fmtMoney(c.price / c.gla) : '—'} />
                <Metric label="Units" value={c.units ?? '—'} />
                <Metric label="Cap" value={c.capRate ?? '—'} />
              </div>
              {c.notes && <div style={{ fontSize: 7.6, color: 'var(--graphite)', marginTop: 4, lineHeight: 1.35 }}>{c.notes}</div>}
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
