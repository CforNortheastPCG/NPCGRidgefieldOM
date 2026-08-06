/* ═══════════════════ EDIT-ME · INCOME & EXPENSES (AS GIVEN) ═══════════════════
   Owner-reported operating figures, normalized for underwriting. ANNUAL
   dollars, plain numbers (no $ or commas). Everything derived — EGI, NOI,
   $/unit, expense ratio — is COMPUTED in src/lib/calc.js. Never hand-total.

   Gross Potential Rent, Loss to Lease, and Vacancy are derived from
   rentRoll.js + VACANCY_PCT below, so income stays in sync with the rent
   roll automatically. Only OTHER income line items are listed here.

   SOURCE: NPCG_I&E_Main_7.31.2026_BJB.xlsx — "Analysis" tab, cross-checked
   against the "2025 Corrected" operating statement. Expense line items and
   order mirror the workbook.

   NOTE ON THE CURRENT COLUMN: the workbook's "Year 1" column grosses in-place
   rent up 5% (Analysis!H6 = Q6*1.05 → $151,326). This BOV capitalizes ACTUAL
   in-place contract rent ($144,120/yr) instead — the defensible basis for a
   value opinion. The Pro Forma column ties to the workbook exactly. */

// Vacancy & collection loss applied to both scenarios (percent of GSR).
export const VACANCY_PCT = 5

// Management fee as a percent of EGI (0 to omit the line).
export const MGMT_PCT = 5

// Other income — annual, applies to both Current and Pro Forma unless a
// scenario-specific value is given ({ label, current, proforma }).
export const OTHER_INCOME = [
  { label: 'Room Income (Unit 5-M)', current: 3720, proforma: 3720 },
  { label: 'Pet Fees', current: 1200, proforma: 1200 },
  { label: 'Additional Income', current: 1000, proforma: 1000 },
  { label: 'Laundry Income', current: 510, proforma: 510 },
  { label: 'Application Fees', current: 50, proforma: 50 },
]

// Operating expenses — annual. `mgmt: true` marks the management line whose
// value is computed from MGMT_PCT (leave current/proforma at 0 for it).
export const EXPENSES = [
  { label: `Property Management (${MGMT_PCT}%)`, current: 0, proforma: 0, mgmt: true },
  { label: 'Real Estate Taxes', current: 26281, proforma: 26281 },
  { label: 'Property Insurance', current: 10347, proforma: 10347 },
  { label: 'Electric (Common)', current: 2282, proforma: 2282 },
  { label: 'Gas — Heat & Hot Water', current: 12066, proforma: 12066 },
  { label: 'Water & Sewer', current: 9146, proforma: 9146 },
  { label: 'Trash Removal', current: 2672, proforma: 2672 },
  { label: 'Repairs & Maintenance', current: 5000, proforma: 5000 },
  { label: 'Landscaping / Snow Removal', current: 1500, proforma: 1500 },
]

// Notes under the expense table (source + normalization assumptions).
export const FIN_NOTES = [
  'Source: owner-provided 2025 operating statement (corrected) and the NPCG I&E workbook dated 07.31.2026, normalized to a stabilized profile. Insurance, electric, gas, water/sewer and trash are carried at trailing-twelve actuals.',
  'Real estate taxes are normalized to $26,281 — the current assessment of $761,110 at West Haven’s City District mill rate — rather than the $29,316 paid in calendar 2025.',
  'Repairs & maintenance is underwritten at $500/unit and landscaping/snow at $1,500 in place of 2025 actuals, which carried non-recurring plumbing and general repair work. The 2025 capital items ($11,850 plumbing, $34,192 general) are excluded below the line.',
  'Management is underwritten at 5% of EGI at market. Heat and hot water are landlord-paid — the single largest controllable expense and the primary value-add lever alongside rent.',
]
