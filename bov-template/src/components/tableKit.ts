/* ═══════════════════ TABLE CELL KIT ═══════════════════
   Plain values, deliberately NOT in Blocks.tsx — a module that mixes
   component and non-component exports breaks React Fast Refresh.

   The financial pages are mostly tables, and every one of them was
   re-declaring the same six cell styles. Spread these instead:
     <th style={T.thl}>Expense</th>  <td style={T.tdr}>{fmtMoney(n)}</td>
   `zebra(i)` gives the alternating row fill. Sizes read from the type
   tokens, so the density retune reaches every table at once.

   `satisfies` rather than a type annotation: it contextually types every
   entry as CSSProperties (so `textAlign: 'right'` is the literal, not
   `string`) while keeping T's keys visible to autocomplete. ── */

import type { CSSProperties } from 'react'

export const T = {
  thl: { fontSize: 'var(--fs-table-head)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 7px', textAlign: 'left', color: '#fff' },
  thr: { fontSize: 'var(--fs-table-head)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 7px', textAlign: 'right', color: '#fff' },
  tdl: { fontSize: 'var(--fs-table)', padding: '3px 7px', textAlign: 'left', fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.25 },
  tdr: { fontSize: 'var(--fs-table)', padding: '3px 7px', textAlign: 'right', color: 'var(--graphite)', fontWeight: 500, lineHeight: 1.25 },
  totl: { fontSize: 'var(--fs-table)', padding: '3.5px 7px', textAlign: 'left', fontWeight: 800, color: '#fff', background: 'var(--carbon)' },
  totr: { fontSize: 'var(--fs-table)', padding: '3.5px 7px', textAlign: 'right', fontWeight: 800, color: '#fff', background: 'var(--carbon)' },
  // Subtotal band (Gross Scheduled Rent, EGI) — stone rather than carbon.
  subl: { fontSize: 'var(--fs-table)', padding: '3px 7px', textAlign: 'left', fontWeight: 800, color: 'var(--carbon)', background: 'var(--stone)' },
  subr: { fontSize: 'var(--fs-table)', padding: '3px 7px', textAlign: 'right', fontWeight: 800, color: 'var(--carbon)', background: 'var(--stone)' },
  head: { background: 'var(--carbon)' },
  table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' },
} satisfies Record<string, CSSProperties>

/* Tighter rows for pages carrying two full-height tables (the As Given page
   prints a 20-unit roll AND a 14-line statement). Spread AFTER T.tdl/T.tdr. */
export const DENSE = { padding: '1.6px 7px', lineHeight: 1.15 } satisfies CSSProperties

export const zebra = (i: number): CSSProperties | undefined =>
  i % 2 === 1 ? { background: 'var(--linen)' } : undefined

// Em dash for a figure the source genuinely does not report — never print $0.
export const DASH = '—'

export const orDash = <V,>(v: V | null | undefined, fmt: (v: V) => string): string =>
  v == null ? DASH : fmt(v)
