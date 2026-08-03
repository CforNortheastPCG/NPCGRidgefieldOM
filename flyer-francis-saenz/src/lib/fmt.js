/* ═══════════════════ FORMATTERS ═══════════════════
   comps.json holds raw numbers; every string the reader sees is made here.
   Ported from bov-template/src/lib/calc.js so the deck reads identically to the
   OMs and BOVs. */

export const fmtMoney = n => (n || n === 0 ? `$${Math.round(n).toLocaleString('en-US')}` : '—')

export const fmtMoneyShort = n => {
  if (!n && n !== 0) return '—'
  const a = Math.abs(n)
  if (a >= 1e6) return `$${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M`
  if (a >= 1e3) return `$${Math.round(n / 1e3)}K`
  return fmtMoney(n)
}

export const fmtNum = n => (n || n === 0 ? Math.round(n).toLocaleString('en-US') : '—')

export const fmtPct = (n, d = 1) => (n || n === 0 ? `${n.toFixed(d).replace(/\.0$/, '')}%` : '—')

/* ISO date -> "May 2023" / "5/23". Close dates are stored as plain ISO strings;
   parse the parts directly rather than through Date(), which shifts a
   date-only string by the local UTC offset and can roll it back a day. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const fmtDate = iso => {
  if (!iso) return '—'
  const [y, m] = iso.split('-')
  return `${MONTHS[Number(m) - 1]} ${y}`
}

export const fmtDateShort = iso => {
  if (!iso) return '—'
  const [y, m] = iso.split('-')
  return `${Number(m)}/${y.slice(2)}`
}

/* "$413,104,148" is the honest number but reads as false precision on a cover
   stat. Round DOWN to the nearest million so the "+" is always earned. */
export const fmtMoneyFloor = n => `$${(Math.floor(n / 1e6) * 1e6).toLocaleString('en-US')}`
