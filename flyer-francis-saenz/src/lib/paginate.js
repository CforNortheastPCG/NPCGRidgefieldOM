/* ═══════════════════ PAGINATION ═══════════════════ */

/* Split rows into the FEWEST pages that respect `cap`, then even them out.
   Chunking naively at the cap leaves a stub final page (51/51/51/41); balancing
   gives 49/49/49/47 instead — same page count, no page that looks unfinished,
   and ~2 rows of headroom on every sheet as a buffer against the hand-computed
   row cap in deck.css. */
export function balancedChunks(rows, cap) {
  if (!rows.length) return []
  const pages = Math.ceil(rows.length / cap)
  const size = Math.ceil(rows.length / pages)
  const out = []
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size))
  return out
}
