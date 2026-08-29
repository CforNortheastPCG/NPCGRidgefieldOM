import { PageHeader, PageFooter, Md } from '../components/Shell.jsx'
import { SectionTitle, BlockLabel, KpiStrip, SourceNote } from '../components/Blocks.jsx'
import {
  OFFICES, LEADERSHIP, SENIOR_INVESTMENT_SALES, INVESTMENT_SALES,
  SUPPORT_STAFF, FIRM_STATS, FIRM_NARRATIVE, CORE_VALUES,
} from '../data/firm.js'
import { TRACK_RECORD } from '../data/trackRecord.js'

/* ═══════════════════ THE FIRM — CLOSING PAGE ═══════════════════
   The last page, and the only one that is about us rather than the asset.

   Its single argument: an owner engaging NPCG is not hiring the broker whose
   name is on the cover. They are hiring a firm — seven offices, an investor
   database built over 750+ closings, and in-house underwriting, marketing
   and transaction coordination. That argument is worth making once, at the
   end, after the analysis has earned the right to make it.

   Contact detail deliberately stays on the Conclusion page. This page is
   the bench, not the phone number: names and titles only, so the roster
   reads as depth instead of a directory.

   Copy: FIRM_NARRATIVE.close in src/data/firm.js — firm-standard, rarely
   edited per deal. Roster and offices: same file. */

function initials(name) {
  return name.split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}

function Face({ member, size = 54 }) {
  const common = {
    width: size, height: size, borderRadius: '50%', objectFit: 'cover',
    display: 'block', margin: '0 auto 6px', border: '2px solid var(--golden)',
  }
  if (member.photo) return <img src={member.photo} alt={member.name} style={common} />
  return (
    <div style={{
      ...common, background: 'var(--carbon)', color: '#fff', fontWeight: 700,
      fontSize: size * 0.32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{initials(member.name)}</div>
  )
}

const Row = ({ people, size }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${people.length}, 1fr)`, gap: 12 }}>
    {people.map(m => (
      <div key={m.name} style={{ textAlign: 'center', minWidth: 0 }}>
        <Face member={m} size={size} />
        <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2 }}>{m.name}</div>
        <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', lineHeight: 1.3, marginTop: 1 }}>{m.title}</div>
      </div>
    ))}
  </div>
)

export default function FirmPage({ pageNum }) {
  const closingsInMarket = TRACK_RECORD?.deals?.length || 0

  return (
    <div className="page">
      <PageHeader section="Northeast Private Client Group" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="You’re Not Hiring a Broker."
          accent="You’re Engaging a Firm."
          subtitle="Northeast Private Client Group"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, alignItems: 'start', marginBottom: 12 }}>
          <div style={{ minWidth: 0 }}>
            {(FIRM_NARRATIVE.close || []).map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 'var(--fs-sub)', lineHeight: 1.5, color: 'var(--graphite)', margin: i ? '7px 0 0' : 0 }} />
            ))}
          </div>
          <KpiStrip
            items={[
              ...(FIRM_STATS || []).slice(0, 2).map(s => ({ label: s.label, value: s.val })),
              { label: 'Offices', value: String((OFFICES || []).length), invert: true },
            ]}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
          <div>
            <BlockLabel>Leadership</BlockLabel>
            <Row people={LEADERSHIP} size={58} />
          </div>
          <div>
            <BlockLabel>Senior Investment Sales</BlockLabel>
            <Row people={SENIOR_INVESTMENT_SALES} size={58} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 22 }}>
            <div style={{ minWidth: 0 }}>
              <BlockLabel>Investment Sales</BlockLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px 14px' }}>
                {INVESTMENT_SALES.map(m => (
                  <div key={m.name} style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.2 }}>{m.name}</div>
                    <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', lineHeight: 1.25 }}>{m.title}</div>
                  </div>
                ))}
              </div>
            </div>
            {(SUPPORT_STAFF || []).length > 0 && (
              <div style={{ minWidth: 0 }}>
                <BlockLabel>Marketing, Analysis &amp; Transaction Support</BlockLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px 14px' }}>
                  {SUPPORT_STAFF.map(m => (
                    <div key={m.name} style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 700, color: 'var(--carbon)', lineHeight: 1.2 }}>{m.name}</div>
                      <div style={{ fontSize: 'var(--fs-note)', color: 'var(--stone)', lineHeight: 1.25 }}>{m.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* How the firm works — the operating commitments behind the
              headcount above. Fills the page with argument rather than air. */}
          {(CORE_VALUES || []).length > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <BlockLabel>How We Work</BlockLabel>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(CORE_VALUES.length, 4)}, 1fr)`, gap: 16 }}>
                {CORE_VALUES.slice(0, 4).map(v => (
                  <div key={v.title} style={{ borderLeft: '2px solid var(--golden)', paddingLeft: 10, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.25 }}>{v.title}</div>
                    <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.4, color: 'var(--graphite)', marginTop: 2 }}>{v.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <BlockLabel>Offices</BlockLabel>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(OFFICES.length, 7)}, 1fr)`, gap: 12, borderTop: '2px solid var(--golden)', paddingTop: 8 }}>
              {OFFICES.map(o => (
                <div key={o.region} style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-note)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.25 }}>{o.region}</div>
                  <div style={{ fontSize: 6.8, color: 'var(--stone)', lineHeight: 1.35, marginTop: 2 }}>{o.address2}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SourceNote>
          {closingsInMarket > 0
            ? `Closed-transaction detail for this market — ${closingsInMarket} sales — appears in our track record and is available on request. `
            : ''}
          Volume and transaction counts reflect closed business firm-wide since 2014, not projections.
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
