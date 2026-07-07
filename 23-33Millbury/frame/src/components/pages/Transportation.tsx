/* ═══════════ TRANSPORTATION & CONNECTIVITY ═══════════
   Print translation of the website's Transportation section: modal access
   cards (air / rail / highway / bus) beside a travel-times panel. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { Logo } from './market/Logo.tsx'
import { ACCESS, MODE_COLOR, type Access } from '../../data/market/transport.ts'
import { DRIVE_TIMES } from '../../data/market/region.ts'
import { TRANSPORT_COPY } from '../../data/market/copy.ts'

function AccessCard({ a }: { a: Access }) {
  const color = MODE_COLOR[a.mode]
  return (
    <div style={{ borderTop: `3px solid ${color}`, padding: '7px 9px 7px 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <span style={{ fontSize: 7.8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: color, borderRadius: 3, padding: '1px 5px' }}>{a.mode}</span>
        {a.logo && (
          <div style={{ height: 22, maxWidth: 92, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Logo src={a.logo} alt={`${a.title} logo`} style={{ maxHeight: 22 }} />
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.12, marginTop: 4 }}>{a.title}</div>
      <div style={{ fontSize: 8.2, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 2 }}>{a.distance}</div>
      <div style={{ fontSize: 9, lineHeight: 1.3, color: 'var(--graphite)', marginTop: 3 }}>{a.body}</div>
    </div>
  )
}

export function Transportation({ pageNum }: { pageNum?: number }) {
  const travel = DRIVE_TIMES.slice(0, 7)
  return (
    <div className="page">
      <PageHeader section="Transportation" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Transportation &" accent="Connectivity" />
        <div className="title-rule" />
        <div style={{ fontSize: 10.4, lineHeight: 1.45, color: 'var(--graphite)', marginBottom: 10 }}>{TRANSPORT_COPY.intro}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '2.3fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1fr', gap: 8, minHeight: 0 }}>
            {ACCESS.map((a) => (
              <AccessCard key={a.title} a={a} />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingTop: 7, borderTop: '3px solid var(--golden)' }}>
              Travel Times
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {travel.map((t) => (
                <div key={t.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--carbon)' }}>{t.name}</span>
                    <span style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--golden)', whiteSpace: 'nowrap' }}>{t.drive}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone)' }}>By car{t.miles ? ` · ${t.miles} mi` : ''}</span>
                    {t.train && <span style={{ fontSize: 12, color: 'var(--stone)' }}><span style={{ fontWeight: 700, color: 'var(--carbon)' }}>{t.train}</span> rail</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 6.8, color: 'var(--stone)', lineHeight: 1.3, marginTop: 6 }}>
              Direct rail from Union Station: MBTA to Boston South Station and Amtrak to Springfield and Albany. Times approximate.
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
