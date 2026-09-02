import { PageHeader, PageFooter, PlaceholderBanner, Md } from '../Shell.tsx'
import { SourceNote } from '../Blocks.tsx'
import { COMMERCIAL_ROLL } from '../../data/commercialRoll.ts'
import { TENANT_PROFILES } from '../../content/index.ts'
import { CRE, fmtMoney, fmtNum, fmtPct } from '../../lib/calc.ts'

/* ═══════════════════ TENANT PROFILES ═══════════════════
   Who the income actually comes from. The rent roll says a tenant pays
   $21.50 a foot to 2029; this page says whether they will still be there in
   2029 — the build-out they paid for, the trade they have built, the credit
   behind the signature.

   Only tenants with an authored profile get a card. A tenant with nothing
   verifiable to say gets left off rather than padded with adjectives, and
   vacancy never gets a profile.

   Prose: src/content/tenants.content.ts · roll: src/data/commercialRoll.ts */
export default function TenantProfilesPage({ pageNum }: { pageNum?: number }) {
  if (!CRE) return null
  // Narrowing is lost inside the render callbacks below — hold it.
  const cre = CRE

  const c = TENANT_PROFILES
  // Pair each authored profile with its lease. An unmatched profile name is
  // a typo worth seeing, so it renders without lease figures rather than
  // being dropped silently.
  const cards = c.profiles.map(p => ({
    ...p,
    lease: cre.leases.find(l => l.tenant === p.tenant) ?? null,
  }))

  return (
    <div className="page">
      {!c.generated && <PlaceholderBanner what="tenant profiles" />}
      <PageHeader section="Tenant Profiles" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">Who Pays the Rent</div>
        <div className="section-title" style={{ marginBottom: 2 }}>
          Tenant <span style={{ color: '#F8971D' }}>Profiles</span>
        </div>
        <div className="title-rule" />

        {c.lead && (
          <Md
            text={c.lead}
            style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--graphite)', marginBottom: 10, maxWidth: '86%' }}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, minHeight: 0 }}>
          {cards.map(({ tenant, body, lease }) => (
            <div
              key={tenant}
              style={{
                borderLeft: '3px solid var(--golden)',
                background: 'var(--linen)',
                padding: '8px 12px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                minWidth: 0,
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', marginBottom: 2 }}>
                  {tenant}
                  {lease?.use && (
                    <span style={{ fontWeight: 600, color: 'var(--stone)' }}> · {lease.use}</span>
                  )}
                </div>
                <Md
                  text={body}
                  style={{ fontSize: 'var(--fs-note)', lineHeight: 1.45, color: 'var(--graphite)' }}
                />
              </div>

              {lease && (
                <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0 14px', textAlign: 'right' }}>
                  {[
                    ['Area', `${fmtNum(lease.sf)} SF`],
                    ['% NRA', fmtPct((lease.sf / cre.nra) * 100, 1)],
                    ['Rent / SF', `$${lease.rentPsf.toFixed(2)}`],
                    ['Lease End', lease.leaseEnd ?? '—'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 6.9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', whiteSpace: 'nowrap' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <SourceNote top>
          Lease figures from {COMMERCIAL_ROLL.source}, as of {COMMERCIAL_ROLL.asOf}; tenant background is
          NPCG's own and is believed correct but not warranted — a buyer should verify credit and lease
          terms directly in diligence. Profiled tenants represent{' '}
          {fmtMoney(cards.reduce((s, c2) => s + (c2.lease ? c2.lease.sf * c2.lease.rentPsf : 0), 0))} of
          annual base rent.
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
