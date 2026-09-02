import { PageHeader, PageFooter, Md, PlaceholderBanner } from '../Shell.tsx'
import { SectionTitle, BlockLabel, KpiStrip, Callout } from '../Blocks.tsx'
import { PROJECT } from '../../data/project.ts'
import { PROJECT_CONTENT } from '../../content/index.ts'

/* ═══════════════════ THE PROJECT ═══════════════════
   The assignment page: who engaged NPCG, what this document concludes, the
   thesis in four lines, and how the opinion was built.

   It carries `summary` and `highlights` from project.js — copy that was
   written for the retired Executive Summary page and would otherwise sit
   unrendered. The highlights belong here: on a document addressed to the
   owner, "what makes this asset sell" is part of the assignment, not a
   pitch bolted onto it.

   Data: src/data/project.js */
export default function ProjectPage({ pageNum }: { pageNum?: number }) {
  const highlights = PROJECT_CONTENT.highlights || []

  return (
    <div className="page">
      <PageHeader section="The Project" />
      {!PROJECT_CONTENT.generated && <PlaceholderBanner what="The Project prose" />}
      <div className="section--tight" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <SectionTitle
          title="The"
          accent="Project"
          subtitle={PROJECT.eyebrow}
          style={{ marginBottom: 6 }}
        />

        {PROJECT.stats?.length > 0 && (
          <KpiStrip items={PROJECT.stats.map(s => ({ label: s.l, value: s.v }))} style={{ marginBottom: 12 }} />
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>

          {/* ── left: the assignment, then the thesis ── */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {PROJECT_CONTENT.paragraphs.map((p, i) => (
              <Md key={i} text={p} style={{ fontSize: 'var(--fs-sub)', lineHeight: 1.5, marginBottom: 8, color: 'var(--graphite)' }} />
            ))}

            {highlights.length > 0 && (
              <>
                <BlockLabel style={{ marginTop: 4 }}>Why It Sells</BlockLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {highlights.slice(0, 4).map((h, i) => (
                    <div key={h.title} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                      <span style={{
                        flex: '0 0 auto', width: 12, color: 'var(--golden)',
                        fontSize: 11, fontWeight: 800, lineHeight: 1.25,
                      }}>{i + 1}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.25 }}>{h.title}</div>
                        <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.42, color: 'var(--graphite)', marginTop: 1 }}>{h.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ marginTop: 'auto', paddingTop: 10 }}>
              <BlockLabel>How This Opinion Was Built</BlockLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {PROJECT.methodology.map(m => (
                  <div key={m.head} style={{ borderLeft: '2px solid var(--golden)', paddingLeft: 9, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sub)', fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2 }}>{m.head}</div>
                    <div style={{ fontSize: 'var(--fs-note)', lineHeight: 1.38, color: 'var(--graphite)', marginTop: 1 }}>{m.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── right: the asset, and the standard this document is held to ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <img
              src={PROJECT.photo}
              alt=""
              style={{ width: '100%', flex: 1, minHeight: 200, objectFit: 'cover', display: 'block' }}
            />
            {PROJECT_CONTENT.summary && (
              <Callout title="In Short">{PROJECT_CONTENT.summary}</Callout>
            )}
            <Callout title="Please Note">{PROJECT.note}</Callout>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
