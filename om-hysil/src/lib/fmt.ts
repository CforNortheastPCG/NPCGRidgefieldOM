/* Display formatting (protected). Injected values are already rounded by
   om-core; these only put separators/signs on them. */

export function fmtMoney(n: number): string {
  const r = Math.round(n)
  const sign = r < 0 ? '-' : ''
  return `${sign}$${Math.abs(r).toLocaleString('en-US')}`
}

export function fmtMoney2(n: number): string {
  const sign = n < 0 ? '-' : ''
  return `${sign}$${Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/** Percent already expressed as a percent number: 9.17 → "9.17%". */
export function fmtPctNum(p: number, dp = 2): string {
  return `${p.toFixed(dp)}%`
}

export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}
