import { Md } from '../components/Shell.jsx'
import { UpdateShell, BlockHead } from '../components/UpdateBlocks.jsx'
import { NEXT_STEPS, DISCUSSION } from '../data/update.js'
import { ADVISORS } from '../data/advisors.js'

/* ═══════════════════ NEXT STEPS + QUESTIONS / DISCUSSION ═══════════════════ */
export default function ClosePage({ pageNum }) {
  return (
    <UpdateShell section="Next Steps" eyebrow="The Path Forward" title="Next Steps &" accent="Discussion" pageNum={pageNum}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, flex: 1, minHeight: 0 }}>
        <div>
          <BlockHead title="Recommended Next Steps" bump={3} />
          <Md text={NEXT_STEPS.intro} style={{ fontSize: 13.9, lineHeight: 1.55, color: 'var(--carbon)', fontWeight: 600, margin: '0 0 7px' }} />
          <div style={{ fontSize: 13.2, lineHeight: 1.58, color: 'var(--graphite)', marginBottom: 10 }}>{NEXT_STEPS.framing}</div>
          <div style={{ fontSize: 13.2, lineHeight: 1.5, color: 'var(--carbon)', fontWeight: 700, marginBottom: 9 }}>{NEXT_STEPS.recsLabel}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
            {NEXT_STEPS.recommendations.map(r => (
              <div key={r.num}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--carbon)', marginBottom: 3 }}>{r.title}</div>
                <div style={{ fontSize: 13.2, lineHeight: 1.55, color: 'var(--graphite)' }}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <BlockHead title="Questions & Discussion" meta={DISCUSSION.intro} bump={3} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {DISCUSSION.questions.map((q, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < DISCUSSION.questions.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 13.6, lineHeight: 1.55, color: 'var(--graphite)' }}>{q}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', paddingTop: 12, marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
          {ADVISORS.map(a => (
            <div key={a.name} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <img src={a.photo} alt={a.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--golden)' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--carbon)' }}>{a.name}</div>
                <div style={{ fontSize: 11.2, color: 'var(--graphite)' }}>{a.phone} · {a.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UpdateShell>
  )
}
