import { PageHeader, PageFooter } from '../Shell.tsx'
import { BlockLabel, KpiStrip, SourceNote, Callout } from '../Blocks.tsx'
import { T, zebra, DASH } from '../tableKit.ts'
import { COMMERCIAL_ROLL } from '../../data/commercialRoll.ts'
import { CRE, VAL, fmtMoney, fmtNum, fmtPct } from '../../lib/calc.ts'

/* ═══════════════════ LEASE ROLLOVER & WALT ═══════════════════
   The exposure page. A commercial building is worth what its leases are
   worth, so the two questions a buyer asks before any other are: how long
   is the income contracted for, and when does it come up for renewal all at
   once?

   WALT is weighted two ways because they answer different questions — by SF
   ("how much of the building rolls") and by rent ("how much of the income
   does"). They diverge exactly when a large space is cheap or a small one
   is expensive, and that divergence is worth seeing.

   Month-to-month and already-expired space is its own row at the top. It is
   exposure TODAY, not in some future year, and burying it inside a year
   bucket is how a rollover table flatters a deal.

   Data: src/data/commercialRoll.ts · math: src/lib/calc.ts (CRE) */
export default function LeaseRolloverPage({ pageNum }: { pageNum?: number }) {
  if (!CRE) return null
  // Narrowing is lost inside the render callbacks below — hold it.
  const cre = CRE

  const maxSf = Math.max(...cre.rollover.map(r => r.sf), 1)
  const nearTerm = cre.rollover.filter(r => r.key === '0000')
  const nearTermSf = nearTerm.reduce((s, r) => s + r.sf, 0)

  return (
    <div className="page">
      <PageHeader section="Lease Rollover" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Income Durability</div>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Lease Rollover &amp; <span style={{ color: '#F8971D' }}>WALT</span>
        </div>
        <div className="title-rule" />

        <KpiStrip
          items={[
            { label: 'WALT — by Rent', value: `${cre.waltByRent.toFixed(1)} yrs`, invert: true },
            { label: 'WALT — by SF', value: `${cre.waltBySf.toFixed(1)} yrs` },
            { label: 'Leased Area', value: `${fmtNum(cre.leasedSf)} SF` },
            { label: 'Rolling ≤ 12 Mo', value: nearTermSf ? `${fmtNum(nearTermSf)} SF` : 'None' },
            { label: 'Contracted Base Rent', value: fmtMoney(cre.baseRent) },
          ]}
          style={{ marginBottom: 10 }}
        />

        <div style={{ display: 'flex', gap: 13, flex: 1, minHeight: 0 }}>
          {/* ── the schedule ── */}
          <div style={{ flex: 1.35, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <table style={{ ...T.table, flex: 1 }}>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Expiring</th>
                  <th style={T.thl}>Tenants</th>
                  <th style={T.thr}>SF</th>
                  <th style={T.thr}>% of NRA</th>
                  <th style={T.thr}>Rent Expiring</th>
                </tr>
              </thead>
              <tbody>
                {cre.rollover.map((r, i) => {
                  const z = zebra(i)
                  const now = r.key === '0000'
                  return (
                    <tr key={r.key}>
                      <td style={{ ...T.tdl, ...z, color: now ? 'var(--terracotta)' : 'var(--carbon)', fontWeight: now ? 800 : 600 }}>
                        {r.label}
                      </td>
                      <td style={{ ...T.tdl, ...z, fontWeight: 500 }}>{r.tenants.join(', ')}</td>
                      <td style={{ ...T.tdr, ...z }}>{fmtNum(r.sf)}</td>
                      <td style={{ ...T.tdr, ...z }}>{fmtPct(r.pctOfNra, 1)}</td>
                      <td style={{ ...T.tdr, ...z }}>{fmtMoney(r.rent)}</td>
                    </tr>
                  )
                })}
                {cre.vacantSf > 0 && (
                  <tr>
                    <td style={{ ...T.tdl, color: 'var(--terracotta)', fontWeight: 800 }}>Vacant</td>
                    <td style={T.tdl}>Available now</td>
                    <td style={T.tdr}>{fmtNum(cre.vacantSf)}</td>
                    <td style={T.tdr}>{fmtPct((cre.vacantSf / cre.nra) * 100, 1)}</td>
                    <td style={T.tdr}>{DASH}</td>
                  </tr>
                )}
                <tr>
                  <td style={T.totl} colSpan={2}>Total</td>
                  <td style={T.totr}>{fmtNum(cre.nra)}</td>
                  <td style={T.totr}>100%</td>
                  <td style={T.totr}>{fmtMoney(cre.baseRent)}</td>
                </tr>
              </tbody>
            </table>

            {/* The gap a buyer prices, expiry by expiry. Rollover is only a
                risk when rents are above market; below market it is the
                reason to buy. */}
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <BlockLabel>Mark-to-Market at Rollover</BlockLabel>
              <table style={{ ...T.table, flex: 1 }}>
                <thead>
                  <tr style={T.head}>
                    <th style={T.thl}>Expiring</th>
                    <th style={T.thr}>SF</th>
                    <th style={T.thr}>In-Place / SF</th>
                    <th style={T.thr}>Market / SF</th>
                    <th style={T.thr}>&Delta; Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {cre.rollover.map((r, i) => {
                    const z = zebra(i)
                    const delta = r.marketRent - r.rent
                    return (
                      <tr key={r.key}>
                        <td style={{ ...T.tdl, ...z }}>{r.key === '0000' ? 'MTM / expired' : r.label}</td>
                        <td style={{ ...T.tdr, ...z }}>{fmtNum(r.sf)}</td>
                        <td style={{ ...T.tdr, ...z }}>${(r.rent / r.sf).toFixed(2)}</td>
                        <td style={{ ...T.tdr, ...z }}>${(r.marketRent / r.sf).toFixed(2)}</td>
                        <td style={{ ...T.tdr, ...z, color: delta >= 0 ? 'var(--carbon)' : 'var(--terracotta)', fontWeight: 700 }}>
                          {delta >= 0 ? '+' : '−'}{fmtMoney(Math.abs(delta))}
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td style={T.totl}>Total at market</td>
                    <td style={T.totr}>{fmtNum(cre.leasedSf)}</td>
                    <td style={T.totr}>${cre.avgInPlacePsf.toFixed(2)}</td>
                    <td style={T.totr}>
                      ${(cre.rollover.reduce((a, r) => a + r.marketRent, 0) / cre.leasedSf).toFixed(2)}
                    </td>
                    <td style={T.totr}>
                      +{fmtMoney(cre.rollover.reduce((a, r) => a + r.marketRent - r.rent, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── the shape of the exposure ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 6 }}>
              Expirations by Year
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {cre.rollover.map(r => (
                <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 74, flexShrink: 0, fontSize: 'var(--fs-note)', fontWeight: 700, color: r.key === '0000' ? 'var(--terracotta)' : 'var(--carbon)' }}>
                    {r.key === '0000' ? 'MTM / exp.' : r.label}
                  </span>
                  <span style={{ flex: 1, height: 9, background: '#ece7e1', minWidth: 0 }}>
                    <span
                      style={{
                        display: 'block',
                        height: '100%',
                        width: `${(r.sf / maxSf) * 100}%`,
                        background: r.key === '0000' ? 'var(--terracotta)' : 'var(--carbon)',
                      }}
                    />
                  </span>
                  <span style={{ width: 62, textAlign: 'right', fontSize: 'var(--fs-note)', fontWeight: 700, color: 'var(--carbon)' }}>
                    {fmtNum(r.sf)} SF
                  </span>
                </div>
              ))}
            </div>

            <Callout title="What this means for the price" style={{ marginTop: 'auto' }}>
              {nearTermSf > 0
                ? `${fmtNum(nearTermSf)} SF — ${fmtPct((nearTermSf / cre.nra) * 100, 0)} of the building — is month-to-month or already expired, and a buyer will underwrite it as vacant-in-waiting. Papering those renewals before going to market is the single cheapest thing an owner can do to the price.`
                : `No space is month-to-month or expired. Contracted income runs ${cre.waltByRent.toFixed(1)} years on a rent-weighted basis, which is what supports a cap rate at the low end of the range rather than the high.`}
            </Callout>
          </div>
        </div>

        <SourceNote top>
          Source: {COMMERCIAL_ROLL.source}, as of {COMMERCIAL_ROLL.asOf}. WALT is measured from that date;
          month-to-month and expired leases carry zero remaining term rather than an assumed renewal.
          Rent expiring is annual base rent and excludes recovery income. Values shown against an asking
          price of {fmtMoney(VAL.ask)}.
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
