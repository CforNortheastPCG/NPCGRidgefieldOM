import { Md } from '../components/Shell.jsx'
import { UpdateShell, StatGrid } from '../components/UpdateBlocks.jsx'
import { SNAPSHOT } from '../data/update.js'

/* ═══════════════════ LISTING SNAPSHOT ═══════════════════ */
export default function SnapshotPage({ pageNum }) {
  return (
    <UpdateShell section="Listing Snapshot" eyebrow="Where the Listing Stands" title="Listing" accent="Snapshot" pageNum={pageNum}>
      <StatGrid stats={SNAPSHOT.stats} bare style={{ marginBottom: 14 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
        {SNAPSHOT.paragraphs.map((p, i) => (
          <Md key={i} text={p} style={{ fontSize: 10.2, lineHeight: 1.6, color: 'var(--graphite)', margin: 0 }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/snapshot-1.jpg" alt="387 Danbury Road aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src="/photos/snapshot-2.jpg" alt="387 Danbury Road site and Route 7 corridor" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </UpdateShell>
  )
}
