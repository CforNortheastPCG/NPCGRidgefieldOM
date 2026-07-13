import { PageHeader, PageFooter, PlaceholderBanner, SectionTitle } from '../Shell.tsx'
import { FINANCIALS } from '../../data/financials.ts'
import { TENANT_PROFILES } from '../../content/index.ts'
import { fmtInt } from '../../lib/fmt.ts'

export function TenantProfiles({ pageNum }: { pageNum?: number }) {
  const roll = FINANCIALS.rentRoll
  const nra = FINANCIALS.computed.rentRoll?.totalSf ?? 0
  if (!roll) return null
  const c = TENANT_PROFILES
  return (
    <div className="page">
      {!c.generated && <PlaceholderBanner what="tenant profiles" />}
      <PageHeader section="Tenant Profiles" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Tenant Profiles" />
        <div className="title-rule" />
        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 16 }}>{c.intro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {roll.rows.map((t) => {
            const name = t.tenant ?? t.use
            return (
              <div
                key={`${t.unit}-${name}`}
                style={{ display: 'flex', gap: 15, alignItems: 'center', borderLeft: '3px solid var(--golden)', paddingLeft: 16 }}
              >
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--carbon)' }}>{name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--stone)', whiteSpace: 'nowrap' }}>
                      Suite {t.unit}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--golden)',
                      margin: '4px 0 7px',
                    }}
                  >
                    {t.sf != null ? `${fmtInt(t.sf)} SF` : ''}
                    {t.sf != null && nra > 0 ? ` · ${((t.sf / nra) * 100).toFixed(1)}% of NRA` : ''}
                    {t.leaseEnd ? ` · exp ${t.leaseEnd}` : ''}
                  </div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--graphite)' }}>
                    {c.blurbs[name] ?? 'Tenant profile pending.'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
