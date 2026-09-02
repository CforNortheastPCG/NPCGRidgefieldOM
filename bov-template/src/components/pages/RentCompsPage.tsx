import type { ReactNode } from 'react'
import { PageHeader, PageFooter } from '../Shell.tsx'
import { DASH } from '../tableKit.ts'
import { RENT_COMPS } from '../../data/rentComps.ts'
import { RR, fmtMoney, fmtNum } from '../../lib/calc.ts'

/* ═══════════════════ RENT COMPARABLES ═══════════════════
   Subject in-place vs pro-forma strip (derived from the rent roll) above
   competing-property rent comps. Data: src/data/rentComps.js; rent/SF
   computed. */

function Metric({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>{label}</div>
      <div style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  )
}

export default function RentCompsPage({ pageNum }: { pageNum?: number }) {
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
        <div style={{ border: '2px solid var(--golden)', borderRadius: 4, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--golden)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10.2, flexShrink: 0 }}>S</div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', flexShrink: 0 }}>Subject<br />Averages</div>
          <div style={{ display: 'flex', gap: 11, flex: 1 }}>
            {RR.mix.map(m => (
              <div key={m.type} style={{ flex: 1, borderLeft: `3px solid ${m.color}`, paddingLeft: 8 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--carbon)' }}>{m.type} ({m.count})</div>
                <div style={{ fontSize: 8.6, fontWeight: 800, color: 'var(--carbon)' }}>
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
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 7, display: 'flex', gap: 10, minHeight: 0 }}>
              <div style={{
                flex: '0 0 auto', width: 96, alignSelf: 'stretch', minHeight: 62,
                background: c.photo ? undefined : 'var(--linen)',
                borderTop: c.photo ? undefined : '2px solid var(--stone)',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {c.photo
                  ? <img src={c.photo} alt={c.address} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <span style={{ fontSize: 6.4, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)', textAlign: 'center', padding: '0 6px', lineHeight: 1.35 }}>
                      No photo<br />on record
                    </span>}
              </div>

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 10, color: 'var(--golden)', fontWeight: 800, fontSize: 11, lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 8.8, fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.address}</span>
                </div>
                <div style={{ fontSize: 7.4, color: 'var(--stone)', fontWeight: 600, margin: '2px 0 5px', paddingLeft: 17 }}>
                  {c.unitType}
                  {c.yearBuilt ? <> &nbsp;|&nbsp; Built {c.yearBuilt}</> : null}
                  {c.buildingUnits ? <> &nbsp;|&nbsp; {c.buildingUnits}-Unit Building</> : null}
                  {c.city ? <> &nbsp;|&nbsp; {c.city}</> : null}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <Metric label="Monthly Rent" value={fmtMoney(c.rent)} />
                  <Metric label="Unit SF" value={c.sqft == null ? DASH : fmtNum(c.sqft)} />
                  <Metric label="Rent / SF" value={c.sqft ? `$${(c.rent / c.sqft).toFixed(2)}` : DASH} />
                </div>
                {c.notes && <div style={{ fontSize: 7.4, color: 'var(--graphite)', marginTop: 4, lineHeight: 1.32 }}>{c.notes}</div>}
              </div>
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
