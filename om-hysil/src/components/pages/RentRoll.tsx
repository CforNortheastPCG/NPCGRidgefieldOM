import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { MixCard, BarChartCard, type Slice } from '../Charts.tsx'
import { FINANCIALS } from '../../data/financials.ts'
import { fmtMoney, fmtMoney2, fmtInt } from '../../lib/fmt.ts'

const MIX_COLORS = ['#F8971D', '#3F4753', '#B55D37', '#566573', '#7C8896', '#9aa4b1', '#c4cad2']

/** Unit-based roll (monthly basis) — Chelsea layout. */
function UnitRoll({ pageNum }: { pageNum?: number }) {
  const roll = FINANCIALS.rentRoll!
  const computed = FINANCIALS.computed.rentRoll!
  const cols = roll.columns
  const hasGroups = roll.rows.some((r) => r.group)

  const mixSlices: Slice[] = computed.unitMix.map((m, i) => ({
    label: m.use,
    value: m.count,
    color: MIX_COLORS[i % MIX_COLORS.length]!,
  }))
  const rentBars =
    cols.length > 1
      ? [
          { label: 'In-Place', value: computed.byColumn['current']?.annual ?? 0, color: '#3F4753' },
          {
            label: 'Pro Forma',
            value: computed.byColumn['proForma']?.annual ?? computed.byColumn['current']?.annual ?? 0,
            color: '#F8971D',
          },
        ]
      : null
  const upside =
    rentBars && rentBars[1]!.value > rentBars[0]!.value
      ? `+${fmtMoney(rentBars[1]!.value - rentBars[0]!.value)} · +${Math.round(((rentBars[1]!.value - rentBars[0]!.value) / rentBars[0]!.value) * 100)}% rental upside`
      : undefined

  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Rent Roll" />
        <div className="title-rule" />
        <table className="data-table" style={{ fontSize: 10 }}>
          <thead>
            <tr>
              {hasGroups && <th>Building</th>}
              <th>Unit</th>
              <th>Type</th>
              <th className="num">SF</th>
              {cols.map((c) => (
                <th className="num" key={c.key}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roll.rows.map((r, i) => (
              <tr key={i}>
                {hasGroups && (
                  <td>
                    <strong>{r.group}</strong>
                  </td>
                )}
                <td>{r.unit}</td>
                <td>{r.vacant ? `${r.use} · Vacant` : r.use}</td>
                <td className="num">{r.sf != null ? fmtInt(r.sf) : '—'}</td>
                {cols.map((c) => (
                  <td className="num" key={c.key}>
                    {r.rents[c.key] != null ? fmtMoney(r.rents[c.key]!) : '—'}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="total-row">
              {hasGroups && (
                <td>
                  <strong>Total</strong>
                </td>
              )}
              <td colSpan={2}>
                <strong>{computed.unitCount} Units</strong>
              </td>
              <td className="num">
                <strong>{fmtInt(computed.totalSf)}</strong>
              </td>
              {cols.map((c) => (
                <td className="num" key={c.key}>
                  <strong>{fmtMoney(computed.byColumn[c.key]?.monthly ?? 0)}</strong>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: rentBars ? '1fr 1.15fr' : '1fr',
            gap: 40,
            marginTop: 14,
            flex: 1,
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          <MixCard
            title="Units by Type"
            data={mixSlices}
            centerLabel={String(computed.unitCount)}
            centerSub="UNITS"
            fmt={(v) => String(v)}
          />
          {rentBars && (
            <BarChartCard title="Gross Scheduled Rent — In-Place vs Pro Forma" data={rentBars} note={upside} />
          )}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

/** Tenant-based roll (annual basis) — Longwater layout. */
function TenantRoll({ pageNum }: { pageNum?: number }) {
  const roll = FINANCIALS.rentRoll!
  const computed = FINANCIALS.computed.rentRoll!
  const nra = computed.totalSf
  const cols = roll.columns

  const sfMix: Slice[] = roll.rows.map((r, i) => ({
    label: r.tenant ?? r.unit,
    value: r.sf ?? 0,
    color: MIX_COLORS[i % MIX_COLORS.length]!,
  }))
  const rentMix: Slice[] = roll.rows.map((r, i) => ({
    label: r.tenant ?? r.unit,
    value: r.rents['current'] ?? 0,
    color: MIX_COLORS[i % MIX_COLORS.length]!,
  }))
  const totalCur = computed.byColumn['current']?.annual ?? 0

  return (
    <div className="page">
      <PageHeader section="Rent Roll" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Rent Roll" />
        <div className="title-rule" />
        <div className="eyebrow" style={{ marginBottom: 5 }}>
          Annualized Base Rent
        </div>
        <table className="data-table" style={{ fontSize: 10.3 }}>
          <thead>
            <tr>
              <th>Tenant</th>
              <th className="ctr">Suite</th>
              <th className="num">SF</th>
              <th className="num">% NRA</th>
              <th className="ctr">Lease End</th>
              {cols.map((c) => (
                <th className="num" key={c.key} colSpan={2}>
                  {c.label} / $/SF
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roll.rows.map((r, i) => (
              <tr key={i}>
                <td>{r.tenant ?? r.use}</td>
                <td className="ctr">{r.unit}</td>
                <td className="num">{r.sf != null ? fmtInt(r.sf) : '—'}</td>
                <td className="num">{r.sf != null && nra > 0 ? `${((r.sf / nra) * 100).toFixed(1)}%` : '—'}</td>
                <td className="ctr">{r.leaseEnd ?? '—'}</td>
                {cols.map((c) => {
                  const rent = r.rents[c.key]
                  return [
                    <td className="num" key={`${c.key}-r`}>
                      {rent != null ? fmtMoney(rent) : '—'}
                    </td>,
                    <td className="num" key={`${c.key}-psf`}>
                      {rent != null && r.sf ? fmtMoney2(rent / r.sf) : '—'}
                    </td>,
                  ]
                })}
              </tr>
            ))}
            <tr className="total-row">
              <td>
                <strong>Total{computed.vacantCount === 0 ? ' · 100% Leased' : ''}</strong>
              </td>
              <td className="ctr">
                <strong>{computed.unitCount}</strong>
              </td>
              <td className="num">
                <strong>{fmtInt(nra)}</strong>
              </td>
              <td className="num">
                <strong>100%</strong>
              </td>
              <td className="ctr">—</td>
              {cols.map((c) => {
                const t = computed.byColumn[c.key]
                return [
                  <td className="num" key={`${c.key}-r`}>
                    <strong>{fmtMoney(t?.annual ?? 0)}</strong>
                  </td>,
                  <td className="num" key={`${c.key}-psf`}>
                    <strong>{t?.psfAnnual != null ? fmtMoney2(t.psfAnnual) : '—'}</strong>
                  </td>,
                ]
              })}
            </tr>
          </tbody>
        </table>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, marginTop: 18, flex: 1, minHeight: 0 }}>
          <MixCard
            title="Square Footage by Tenant"
            data={sfMix}
            centerLabel={`${Math.round(nra / 1000)}K`}
            centerSub="NET SF"
            fmt={(v) => `${(v / 1000).toFixed(1)}K`}
          />
          <MixCard
            title="In-Place Base Rent by Tenant"
            data={rentMix}
            centerLabel={`$${(totalCur / 1_000_000).toFixed(1)}M`}
            centerSub="BASE RENT"
            fmt={(v) => `$${Math.round(v / 1000)}K`}
          />
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}

export function RentRoll({ pageNum }: { pageNum?: number }) {
  if (!FINANCIALS.rentRoll || !FINANCIALS.computed.rentRoll) return null
  return FINANCIALS.rentRoll.basis === 'annual' ? <TenantRoll pageNum={pageNum} /> : <UnitRoll pageNum={pageNum} />
}
