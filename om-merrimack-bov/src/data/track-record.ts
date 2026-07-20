// Hand-authored from NPCG Salesforce closed-deal pipeline (report export
// "Closed Deal Pipeline 2014 - Present", pulled 2026-07-14) — cities and
// unit counts verified against the CRM property records the same day.
// Greater-Lowell closings (Lowell / Lawrence / Methuen), 2019-present.
export interface ClosedDeal {
  address: string
  city: string
  /** Units as recorded in the CRM property record; null where not tracked. */
  units: number | null
  price: number
  /** Display month, e.g. "Jul 2026". */
  closed: string
  broker: string
}

export const TRACK_RECORD: ClosedDeal[] = [
  { address: '11-15 Lilley Avenue', city: 'Lowell', units: 8, price: 1777050, closed: 'Jul 2026', broker: 'Jim Casey' },
  { address: '340 Haverhill Street', city: 'Lawrence', units: 11, price: 1300000, closed: 'Jul 2025', broker: 'Jim Casey' },
  { address: '499 Haverhill Street', city: 'Lawrence', units: 9, price: 950000, closed: 'May 2024', broker: 'Patrick Wheeler' },
  { address: '375-379 Haverhill Street', city: 'Lawrence', units: 8, price: 1970000, closed: 'Dec 2022', broker: 'Bradford Carlson' },
  { address: '348 & 352-354 Haverhill Street', city: 'Lawrence', units: 6, price: 1600000, closed: 'Sep 2022', broker: 'Bradford Carlson' },
  { address: '30-36 Lawrence Street', city: 'Lawrence', units: 69, price: 3550000, closed: 'Aug 2022', broker: 'Jim Casey' },
  { address: '80 Lowell Street', city: 'Methuen', units: 12, price: 2505000, closed: 'Jul 2022', broker: 'Bradford Carlson' },
  { address: '11 Lawrence Street', city: 'Lawrence', units: 32, price: 1185000, closed: 'Apr 2022', broker: 'Bradford Carlson' },
  { address: '604 Chelmsford Street', city: 'Lowell', units: 8, price: 3126000, closed: 'Jan 2022', broker: 'Drew Kirkland' },
  { address: '383 Haverhill Street & 251 Broadway', city: 'Lawrence', units: null, price: 1825000, closed: 'Aug 2021', broker: 'Jim Casey' },
  { address: '375-379 Haverhill Street', city: 'Lawrence', units: 8, price: 1450000, closed: 'Mar 2021', broker: 'Bradford Carlson' },
  { address: '129 Westford Street', city: 'Lowell', units: 17, price: 2150000, closed: 'Jun 2020', broker: 'Francis Saenz' },
  { address: '169-171 Haverhill Street', city: 'Lawrence', units: 18, price: 1015000, closed: 'Dec 2019', broker: 'Bradford Carlson' },
  { address: 'Lowell Portfolio', city: 'Lowell', units: null, price: 1725000, closed: 'Jan 2019', broker: 'Drew Kirkland' },
]
