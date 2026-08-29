import { PageHeader, PageFooter } from '../components/Shell.jsx'
import { FIRM_STATS, CORE_VALUES, FIRM_NARRATIVE, OFFICES } from '../data/firm.js'
import { TRACK_RECORD } from '../data/trackRecord.js'

/* ═══════════════════ WHY NPCG ═══════════════════
   About-the-firm page: stat tiles (third tile derived from this deal's
   track record), mission narrative with the golden pull-quote, core values,
   and the offices strip. Copy: src/data/firm.js. */
export default function WhyNpcg({ pageNum }) {
  const stats = [
    ...FIRM_STATS,
    { val: `${TRACK_RECORD.deals.length}`, label: `${TRACK_RECORD.marketLabel} Closings Since ${TRACK_RECORD.sinceYear}` },
  ]
  return (
    <div className="page">
      <PageHeader section="Why NPCG" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="eyebrow">The Firm</div>
        <div className="section-title" style={{ marginBottom: 2 }}>Why <span style={{ color: '#F8971D' }}>NPCG</span></div>
        <div className="title-rule" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '4px 0 14px' }}>
          {stats.map(s => (
            <div key={s.label} className="stat-tile">
              <div className="st-val">{s.val}</div>
              <div className="st-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          {/* Narrative + pull quote */}
          <div style={{ fontSize: 9.5, lineHeight: 1.55, color: 'var(--carbon)' }}>
            {FIRM_NARRATIVE.lead.map((p, i) => <p key={i} style={{ marginBottom: 8 }}>{p}</p>)}
            <p style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '3px solid var(--golden)', fontSize: 11.5, fontWeight: 700, lineHeight: 1.4 }}>
              {FIRM_NARRATIVE.pullQuote}
            </p>
            {FIRM_NARRATIVE.close.map((p, i) => <p key={i} style={{ marginBottom: 8 }}>{p}</p>)}
          </div>

          {/* Core values 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, alignContent: 'start' }}>
            <div className="eyebrow" style={{ marginBottom: 0 }}>How We Work</div>
            {CORE_VALUES.map(v => (
              <div key={v.title} style={{ borderLeft: '3px solid var(--golden)', paddingLeft: 11 }}>
                <div style={{ fontSize: 9.7, fontWeight: 800, color: 'var(--carbon)' }}>{v.title}</div>
                <div style={{ fontSize: 8.8, lineHeight: 1.4, color: 'var(--graphite)', marginTop: 1 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Offices strip */}
        <div style={{ marginTop: 'auto', paddingTop: 12 }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--golden)', marginBottom: 6 }}>Our Offices</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            {OFFICES.map(o => (
              <div key={o.region} style={{ fontSize: 8, lineHeight: 1.4 }}>
                <div style={{ fontWeight: 700, color: 'var(--carbon)', whiteSpace: 'nowrap' }}>{o.region}</div>
                <div style={{ color: 'var(--graphite)', whiteSpace: 'nowrap' }}>
                  {o.address2.includes('·') ? o.address2.split('·')[1].trim() : o.address2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
