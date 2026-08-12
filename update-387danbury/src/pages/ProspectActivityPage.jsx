import { UpdateShell, StoryCard, BlockHead } from '../components/UpdateBlocks.jsx'
import { TOURS, FEEDBACK } from '../data/update.js'

/* ═══════════════════ PROSPECT ACTIVITY — TOURS, FEEDBACK & LEADS ═══════════════════ */
export default function ProspectActivityPage({ pageNum }) {
  const { leads } = FEEDBACK
  return (
    <UpdateShell section="Prospect Activity" eyebrow="Who Has Engaged & What They Said" title="Prospect" accent="Activity" pageNum={pageNum}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, minHeight: 0 }}>
        <div>
          <BlockHead title="Tours Completed" meta={TOURS.intro} bump={1.5} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
            {TOURS.items.map(t => (
              <StoryCard key={t.name} name={t.name} meta={t.meta} body={t.body} bare />
            ))}
          </div>
        </div>

        <div>
          <BlockHead title="Feedback by Buyer Profile" meta={FEEDBACK.intro} bump={1.5} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
            {FEEDBACK.profiles.map(p => (
              <div key={p.title}>
                <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--carbon)', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12.8, lineHeight: 1.55, color: 'var(--graphite)' }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <BlockHead title={leads.title} meta="Still in the conversation" bump={1.5} />
          {leads.items.map(l => (
            <StoryCard key={l.name} name={l.name} meta={l.meta} body={l.body} bare />
          ))}
          <div style={{ fontSize: 10.8, color: 'var(--stone)', lineHeight: 1.5, marginTop: 10 }}>
            We remain in regular contact with every prospect that has executed a confidentiality agreement or requested the offering memorandum, and we re-engage each of them as the campaign develops.
          </div>
        </div>
      </div>
    </UpdateShell>
  )
}
