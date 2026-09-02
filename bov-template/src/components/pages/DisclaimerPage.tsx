import { StaticShell, Md } from '../Shell.tsx'
import { DISCLAIMER_PARAGRAPHS } from '../../data/advisors.ts'

/* ═══════════════════ CONFIDENTIALITY & DISCLAIMER ═══════════════════
   Firm-standard NPCG legal text, split out of the Advisors page so that page
   can carry advisor track record instead. Text lives in
   src/data/advisors.js (DISCLAIMER_PARAGRAPHS) — edit it there. */

export default function DisclaimerPage({ pageNum }: { pageNum?: number }) {
  return (
    <StaticShell section="Confidentiality & Disclaimer" title="Confidentiality & Disclaimer" pageNum={pageNum}>
      <div className="dc-disclaimer" style={{ columnCount: 2, columnGap: 30, flex: 1, minHeight: 0 }}>
        {DISCLAIMER_PARAGRAPHS.map((p, i) => <Md key={i} text={p} />)}
      </div>
    </StaticShell>
  )
}
