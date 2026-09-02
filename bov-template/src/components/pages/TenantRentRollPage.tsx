import { PageHeader, PageFooter } from '../Shell.tsx'
import { BlockLabel, KpiStrip, SourceNote } from '../Blocks.tsx'
import { ChartCard } from '../Charts.tsx'
import { T, zebra, DASH } from '../tableKit.ts'
import { COMMERCIAL_ROLL } from '../../data/commercialRoll.ts'
import { CRE, fmtMoney, fmtNum, fmtPct } from '../../lib/calc.ts'
import { VOCAB } from '../../lib/vocab.ts'

/* ═══════════════════ TENANT RENT ROLL ═══════════════════
   The lease-by-lease roll for a retail / office / industrial deck: who is
   in the space, how much of it, at what rent, on what recovery structure,
   until when. Residential decks render Unit Mix & Income instead — the
   manifest picks by ASSET_CLASS.

   Two things this page refuses to do, because they are how a rent roll
   starts lying: it never hides a vacancy (vacant space is a row AND a slice
   of the mix), and it never quietly rolls an expired lease forward — an
   expiry in the past prints as expired.

   Data: src/data/commercialRoll.ts · math: src/lib/calc.ts (CRE) */
export default function TenantRentRollPage({ pageNum }: { pageNum?: number }) {
  if (!CRE) return null
  // Narrowing is lost inside the render callbacks below — hold it.
  const cre = CRE

  const psf = (v: number) => `$${v.toFixed(2)}`
  const mixByRent = cre.mix
    .filter(m => m.rent > 0)
    .map(m => ({ label: m.label, value: m.rent, color: m.color }))

  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">As Leased · {COMMERCIAL_ROLL.asOf}</div>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Tenant <span style={{ color: '#F8971D' }}>Rent Roll</span>
        </div>
        <div className="title-rule" />

        <KpiStrip
          items={[
            { label: 'Net Rentable Area', value: `${fmtNum(cre.nra)} SF` },
            { label: 'Occupancy (by SF)', value: fmtPct(cre.occupancyPct, 1) },
            { label: 'Avg In-Place Rent', value: `${psf(cre.avgInPlacePsf)} / SF` },
            { label: 'Base Rent (Annual)', value: fmtMoney(cre.baseRent) },
            { label: 'WALT (by rent)', value: `${cre.waltByRent.toFixed(1)} yrs` },
          ]}
          style={{ marginBottom: 9 }}
        />

        <div style={{ display: 'flex', gap: 11, flex: 1, minHeight: 0 }}>
          {/* ── the roll ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <table style={T.table}>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Suite</th>
                  <th style={T.thl}>Tenant</th>
                  <th style={T.thr}>SF</th>
                  <th style={T.thr}>% NRA</th>
                  <th style={T.thr}>Rent / SF</th>
                  <th style={T.thr}>Annual Rent</th>
                  {cre.hasRecovery && <th style={T.thl}>Recovery</th>}
                  <th style={T.thr}>Lease End</th>
                </tr>
              </thead>
              <tbody>
                {cre.leases.map((l, i) => {
                  const annual = l.sf * l.rentPsf
                  const z = zebra(i)
                  return (
                    <tr key={l.suite}>
                      <td style={{ ...T.tdl, ...z }}>{l.suite}</td>
                      <td style={{ ...T.tdl, ...z, color: l.vacant ? 'var(--terracotta)' : 'var(--carbon)' }}>
                        {l.tenant}
                        {l.use && (
                          <span style={{ display: 'block', fontSize: 'var(--fs-note)', fontWeight: 500, color: 'var(--stone)' }}>
                            {l.use}
                          </span>
                        )}
                      </td>
                      <td style={{ ...T.tdr, ...z }}>{fmtNum(l.sf)}</td>
                      <td style={{ ...T.tdr, ...z }}>{fmtPct((l.sf / cre.nra) * 100, 1)}</td>
                      <td style={{ ...T.tdr, ...z }}>{psf(l.rentPsf)}</td>
                      <td style={{ ...T.tdr, ...z }}>
                        {l.vacant ? <span style={{ color: 'var(--stone)' }}>{DASH}</span> : fmtMoney(annual)}
                      </td>
                      {cre.hasRecovery && <td style={{ ...T.tdl, ...z }}>{l.recovery ?? DASH}</td>}
                      <td style={{ ...T.tdr, ...z, color: l.vacant ? 'var(--terracotta)' : undefined }}>
                        {l.vacant ? 'Vacant' : (l.leaseEnd ?? DASH)}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td style={T.totl} colSpan={2}>
                    {cre.occupiedCount} Leased · {cre.vacantCount} Vacant
                  </td>
                  <td style={T.totr}>{fmtNum(cre.nra)}</td>
                  <td style={T.totr}>{fmtPct(cre.occupancyPct, 1)}</td>
                  <td style={T.totr}>{psf(cre.avgInPlacePsf)}</td>
                  <td style={T.totr}>{fmtMoney(cre.baseRent)}</td>
                  {cre.hasRecovery && <td style={T.totr} />}
                  <td style={T.totr}>{cre.waltBySf.toFixed(1)} yr</td>
                </tr>
              </tbody>
            </table>

            {/* Lease structure — the terms behind the rents. A short roll has
                room for it; a long one does not, and the roll itself is the
                point of the page. */}
            {cre.leases.length <= 8 && (cre.hasOptions || cre.hasEscalation) && (
              <div style={{ flex: 1, minHeight: 0, marginTop: 10 }}>
                <BlockLabel>Lease Structure &amp; Options</BlockLabel>
                <table style={T.table}>
                  <thead>
                    <tr style={T.head}>
                      <th style={T.thl}>Tenant</th>
                      <th style={T.thl}>Recovery</th>
                      {cre.hasEscalation && <th style={T.thl}>Escalation</th>}
                      {cre.hasOptions && <th style={T.thl}>Renewal Options</th>}
                      <th style={T.thr}>Commenced</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cre.leases.filter(l => !l.vacant).map((l, i) => {
                      const z = zebra(i)
                      return (
                        <tr key={l.suite}>
                          <td style={{ ...T.tdl, ...z }}>{l.tenant}</td>
                          <td style={{ ...T.tdl, ...z, fontWeight: 500 }}>{l.recovery ?? DASH}</td>
                          {cre.hasEscalation && <td style={{ ...T.tdl, ...z, fontWeight: 500 }}>{l.escalation ?? DASH}</td>}
                          {cre.hasOptions && <td style={{ ...T.tdl, ...z, fontWeight: 500 }}>{l.options ?? 'None'}</td>}
                          <td style={{ ...T.tdr, ...z }}>{l.leaseFrom ?? DASH}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {cre.recoveries > 0 && (
              <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', marginTop: 'auto', paddingTop: 6 }}>
                Plus {fmtMoney(cre.recoveries)} of annual recovery income (CAM, tax &amp; insurance), billed
                against budget and reconciled annually — carried as other income in the underwriting.
              </div>
            )}
          </div>

          {/* ── mix by income ── */}
          <div style={{ width: 208, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <ChartCard
              title={`${VOCAB.mixTitle} — by Rent`}
              data={mixByRent}
              centerLabel={`${cre.occupiedCount}`}
              centerSub={VOCAB.units.toUpperCase()}
              fmt={v => fmtMoney(v)}
              note={
                cre.vacantSf > 0
                  ? `${fmtNum(cre.vacantSf)} SF vacant (${fmtPct((cre.vacantSf / cre.nra) * 100, 1)} of NRA) carries no income here.`
                  : undefined
              }
            />

            {/* What the leases produce — the line the underwriting starts from. */}
            <div style={{ marginTop: 'auto', borderTop: '2px solid var(--golden)', paddingTop: 7 }}>
              <div style={{ fontSize: 'var(--fs-kpi-label)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 5 }}>
                Income In Place
              </div>
              {[
                ['Base rent', fmtMoney(cre.baseRent)],
                ['Recovery income', cre.recoveries ? fmtMoney(cre.recoveries) : DASH],
                ['Gross in place', fmtMoney(cre.baseRent + cre.recoveries)],
                ['At market, fully leased', fmtMoney(cre.marketRent + cre.recoveries)],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 8,
                    fontSize: 'var(--fs-note)',
                    padding: '2.5px 0',
                    borderTop: i === arr.length - 1 ? '1px solid var(--border)' : undefined,
                    marginTop: i === arr.length - 1 ? 2 : undefined,
                  }}
                >
                  <span style={{ color: 'var(--stone)', fontWeight: 600 }}>{label}</span>
                  <span style={{ color: 'var(--carbon)', fontWeight: 800 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SourceNote top>
          Source: {COMMERCIAL_ROLL.source}, as of {COMMERCIAL_ROLL.asOf}. Rents are annual base rent per
          rentable square foot on the stated recovery structure; a gross rent and a triple-net rent are
          not comparable figures.{' '}
          {(COMMERCIAL_ROLL.footnotes ?? []).join(' ')}
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
