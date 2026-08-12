/* ═══════════════════ EDIT-ME · INCOME & EXPENSES (AS GIVEN) ═══════════════════
   Owner-reported operating figures, normalized for underwriting. ANNUAL
   dollars, plain numbers (no $ or commas). Everything derived — EGI, NOI,
   $/unit, expense ratio — is COMPUTED in src/lib/calc.js. Never hand-total.

   Gross Potential Rent, Loss to Lease, and Vacancy are derived from
   rentRoll.js + VACANCY_PCT below, so income stays in sync with the rent
   roll automatically. Only OTHER income line items are listed here. */

// Vacancy & collection loss applied to both scenarios (percent of GSR).
export const VACANCY_PCT = 5

// Management fee as a percent of EGI (0 to omit the line).
export const MGMT_PCT = 5

// Other income — annual, applies to both Current and Pro Forma unless a
// scenario-specific value is given ({ label, current, proforma }).
export const OTHER_INCOME = [ // SAMPLE — replace
  { label: 'Laundry Income', current: 2400, proforma: 2400 },
  { label: 'Storage & Fees', current: 1200, proforma: 1200 },
]

// Operating expenses — annual. `mgmt: true` marks the management line whose
// value is computed from MGMT_PCT (leave current/proforma at 0 for it).
export const EXPENSES = [ // SAMPLE — replace with the owner's real figures
  { label: 'Real Estate Taxes', current: 28000, proforma: 28000 },
  { label: `Property Management (${MGMT_PCT}%)`, current: 0, proforma: 0, mgmt: true },
  { label: 'Property Insurance', current: 9600, proforma: 9600 },
  { label: 'Water & Sewer', current: 7200, proforma: 7200 },
  { label: 'Electric (Common)', current: 1800, proforma: 1800 },
  { label: 'Trash Removal', current: 2400, proforma: 2400 },
  { label: 'Repairs & Maintenance', current: 6000, proforma: 6000 },
  { label: 'Landscaping / Snow', current: 3600, proforma: 3600 },
]

// Notes under the expense table (source + normalization assumptions).
export const FIN_NOTES = [
  'Source: owner-provided operating statements, normalized. Management underwritten at market even where owner self-manages. Verify independently.', // SAMPLE — adjust
]
