/* ═══════════════════ EDIT-ME · COMMERCIAL RENT ROLL ═══════════════════
   The lease-by-lease roll for a RETAIL, OFFICE, INDUSTRIAL or MIXED-USE
   deck (ASSET_CLASS in deal.ts). Residential decks use rentRoll.ts instead
   and ignore this file entirely.

   ANNUAL rent per SF, plain numbers. Everything derived — NRA, occupancy by
   SF, base rent, recoveries, WALT, the rollover schedule, $/SF metrics — is
   COMPUTED in src/lib/calc.ts (the CRE export). Never hand-total.

   ── PER-LEASE FIELDS ────────────────────────────────────────────────────
   Required : suite · tenant · sf · rentPsf
   Optional : use · marketPsf · leaseFrom · leaseEnd · recovery · camAnnual
              options · escalation · vacant

   ── THE THINGS THAT ACTUALLY MOVE THE VALUE ─────────────────────────────
   · `recovery` is not decoration. A $22 NNN rent and a $22 gross rent are
     different deals; the page prints the structure beside every rent so a
     reader never has to assume.
   · `leaseEnd` drives WALT and the rollover schedule — the pages a buyer
     reads first. 'MTM' is fine. An EXPIRED date is a real finding: leave it
     expired and say so in a footnote. Rolling it forward quietly is the one
     thing that makes a roll untrustworthy.
   · A vacant suite sets `vacant: true` and carries the ASKING rent in
     `rentPsf`. Occupancy math excludes it and the page marks it.
   · `camAnnual` is this tenant's recovery income (CAM + tax + insurance).
     Leave it off a gross lease.

   The roll fits ~14 leases on one page. Past that the page will overflow —
   qa-shots.cjs catches it. */

import type { CommercialRollData } from '../lib/types.ts'

export const COMMERCIAL_ROLL: CommercialRollData = {
  asOf: 'July 2026',                              // SAMPLE — replace
  asOfDate: '2026-07-01',                         // SAMPLE — WALT/rollover strike date
  source: 'Owner-provided rent roll and leases',  // SAMPLE — replace
  // State NRA when the survey differs from the sum of the leases; omit to
  // let calc.ts sum them.
  nraSf: 18400,                                   // SAMPLE — replace

  leases: [ // SAMPLE — replace every row
    {
      suite: '100', tenant: 'Anchor Pharmacy', use: 'Retail pharmacy',
      sf: 5200, rentPsf: 21.5, marketPsf: 24.0,
      leaseFrom: '03/01/2019', leaseEnd: '02/28/2029',
      recovery: 'NNN', camAnnual: 31200, options: '2 × 5 yr @ FMV', escalation: '2%/yr',
    },
    {
      suite: '110', tenant: 'Corner Café', use: 'Quick-service restaurant',
      sf: 2400, rentPsf: 26.0, marketPsf: 28.0,
      leaseFrom: '06/01/2022', leaseEnd: '05/31/2027',
      recovery: 'NNN', camAnnual: 14400, escalation: '3%/yr',
    },
    {
      suite: '120', tenant: 'Valley Dental', use: 'Medical / dental office',
      sf: 2600, rentPsf: 24.0, marketPsf: 26.0,
      leaseFrom: '09/01/2021', leaseEnd: '08/31/2026',
      recovery: 'NNN', camAnnual: 15600, options: '1 × 5 yr',
    },
    {
      suite: '130', tenant: 'Sample Cleaners', use: 'Dry cleaning',
      sf: 1800, rentPsf: 19.0, marketPsf: 23.0,
      leaseFrom: '01/01/2020', leaseEnd: 'MTM',
      recovery: 'MG', camAnnual: 6200,
    },
    {
      suite: '150', tenant: 'Bay State Nails', use: 'Personal services',
      sf: 1200, rentPsf: 22.5, marketPsf: 24.0,
      leaseFrom: '05/01/2023', leaseEnd: '04/30/2028',
      recovery: 'NNN', camAnnual: 7200, escalation: '3%/yr',
    },
    {
      suite: '160', tenant: 'Anytown Wireless', use: 'Mobile retail',
      sf: 1400, rentPsf: 25.0, marketPsf: 26.0,
      leaseFrom: '10/01/2024', leaseEnd: '09/30/2029',
      recovery: 'NNN', camAnnual: 8400, options: '1 × 5 yr', escalation: '2.5%/yr',
    },
    {
      suite: '170', tenant: 'Riverside Insurance', use: 'Insurance office',
      sf: 1600, rentPsf: 20.0, marketPsf: 24.0,
      leaseFrom: '02/01/2018', leaseEnd: '01/31/2027',
      recovery: 'MG', camAnnual: 5400,
    },
    {
      suite: '140', tenant: 'Vacant', use: 'Former salon',
      sf: 2200, rentPsf: 23.0, marketPsf: 23.0,
      recovery: 'NNN', vacant: true,
    },
  ],

  footnotes: [ // SAMPLE — replace
    'Suite 130 has held over on a month-to-month basis since the January 2025 expiration; underwritten at the in-place rent with no renewal assumed.',
    'Suite 140 is vacant and carried at the asking rent. Current underwriting applies no income to it; the pro forma column leases it at market.',
    'Recovery income is billed monthly against a budget and reconciled annually. Figures shown are the current billing rate.',
  ],
}
