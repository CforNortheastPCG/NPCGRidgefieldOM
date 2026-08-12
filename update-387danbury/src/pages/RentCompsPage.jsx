import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { RENT_COMPS } from '../data/rentComps.js'
import { RR, fmtMoney, fmtNum } from '../lib/calc.js'

/* ═══════════════════ RENT COMPARABLES ═══════════════════
   Subject in-place vs pro-forma strip (derived from the rent roll) above
   competing-property rent comps. Data: src/data/rentComps.js; rent/SF
   computed. */

function Metric({ label, value }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>{label}</div>
      <div style={{ fontSize: 9.6, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  )
}

export default function RentCompsPage({ pageNum }) {
  const comps = RENT_COMPS.comps.slice(0, 6)
  const dense = comps.length > 3
  return (
    <div className="page">
      <PageHeader section="Rent Comparables" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Market Rent Support</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Rent <span style={{ color: '#F8971D' }}>Comparables</span></div>
        <div className="title-rule" />

        {/* Subject strip — in-place vs pro forma by unit type */}
        <div style={{ border: '2px solid var(--golden)', borderRadius: 4, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--golden)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>S</div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', flexShrink: 0 }}>Subject<br />Averages</div>
          <div style={{ display: 'flex', gap: 14, flex: 1 }}>
            {RR.mix.map(m => (
              <div key={m.type} style={{ flex: 1, borderLeft: `3px solid ${m.color}`, paddingLeft: 8 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--carbon)' }}>{m.type} ({m.count})</div>
                <div style={{ fontSize: 9.4, fontWeight: 800, color: 'var(--carbon)' }}>
                  {fmtMoney(m.avgInPlace)} <span style={{ color: 'var(--stone)', fontWeight: 600 }}>→</span> <span style={{ color: 'var(--golden)' }}>{fmtMoney(m.avgProforma)}</span>
                </div>
                <div style={{ fontSize: 7, color: 'var(--stone)', fontWeight: 600 }}>in-place → pro forma · ~{fmtNum(m.avgSqft)} SF</div>
              </div>
            ))}
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
              <div style={{ fontSize: 7.6, color: 'var(--stone)', fontWeight: 600, margin: '2px 0 5px', paddingLeft: 26 }}>{c.unitType}</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <Metric label="Monthly Rent" value={fmtMoney(c.rent)} />
                <Metric label="Unit SF" value={fmtNum(c.sqft)} />
                <Metric label="Rent / SF" value={`$${(c.rent / c.sqft).toFixed(2)}`} />
              </div>
              {c.notes && <div style={{ fontSize: 7.6, color: 'var(--graphite)', marginTop: 4, lineHeight: 1.35 }}>{c.notes}</div>}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 8.6, lineHeight: 1.45, color: 'var(--graphite)', marginTop: 8, borderLeft: '3px solid var(--golden)', paddingLeft: 10 }}>
          {RENT_COMPS.commentary}
        </div>
        <div style={{ fontSize: 7.2, color: 'var(--stone)', marginTop: 4 }}>
          Comparable rents per listings and market sources deemed reliable; verify independently.
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
