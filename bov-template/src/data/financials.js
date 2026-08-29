/* ═══════════════════ EDIT-ME · INCOME & EXPENSES (AS GIVEN) ═══════════════════
   Owner-reported operating figures, normalized for underwriting. ANNUAL
   dollars, plain numbers (no $ or commas). Everything derived — EGI, NOI,
   $/unit, expense ratio — is COMPUTED in src/lib/calc.js. Never hand-total.

   Gross Potential Rent, Loss to Lease, and Vacancy are derived from
   rentRoll.js + VACANCY_PCT below, so income stays in sync with the rent
   roll automatically. Only OTHER income line items are listed here.

   ── THE THREE COLUMNS ──────────────────────────────────────────────────
   t12       What the owner's trailing-twelve statement actually shows. It
             is a record, not an underwriting: it usually carries no
             management fee, thin repairs, and no reserve, and it reflects
             whatever the property collected — not scheduled rent. Use null
             for any line the T-12 does not report; the page prints "—".
             A T-12 has no gross potential rent or loss-to-lease line, so
             its income starts at T12_EFFECTIVE_RENTAL_INCOME below.
   current   The underwriting anchor: in-place rents, fully loaded with
             management, repairs, reserves, and a vacancy factor. This is
             what the cap rate in valuation.js is applied to.
   proforma  Same expense structure, rents moved to achievable.

   Being explicit about this is the point of the page — a buyer's lender
   will underwrite `current`, and the gap to `t12` is what a buyer discounts
   for in diligence. */

// Vacancy & collection loss applied to current and pro forma (percent of GSR).
// The T-12 is actuals, so no vacancy factor is applied to it.
export const VACANCY_PCT = 5

// Management fee as a percent of EGI (0 to omit the line).
export const MGMT_PCT = 5

/* Trailing-twelve effective rental income — what the owner actually
   collected over the period, straight off their statement. Set to null if
   you have no T-12; the whole T-12 column then drops out of the Operating
   Statement page automatically. */
export const T12_EFFECTIVE_RENTAL_INCOME = 227800  // SAMPLE — replace

// Period label for the T-12 column header / source note.
export const T12_LABEL = 'Calendar 2025'           // SAMPLE — replace

// Other income — annual. Use null in t12 for lines the statement omits.
export const OTHER_INCOME = [ // SAMPLE — replace
  { label: 'Laundry Income', t12: 2280, current: 2400, proforma: 2400 },
  { label: 'Storage & Fees', t12: 1150, current: 1200, proforma: 1200 },
]

// Operating expenses — annual. `mgmt: true` marks the management line whose
// current/proforma value is computed from MGMT_PCT (leave those at 0). Its
// t12 value is NOT computed — enter what the statement shows, or null.
export const EXPENSES = [ // SAMPLE — replace with the owner's real figures
  { label: 'Real Estate Taxes', t12: 27140, current: 28000, proforma: 28000 },
  { label: `Property Management (${MGMT_PCT}%)`, t12: null, current: 0, proforma: 0, mgmt: true },
  { label: 'Property Insurance', t12: 9600, current: 9600, proforma: 9600 },
  { label: 'Water & Sewer', t12: 7420, current: 7200, proforma: 7200 },
  { label: 'Electric (Common)', t12: 1760, current: 1800, proforma: 1800 },
  { label: 'Trash Removal', t12: 2400, current: 2400, proforma: 2400 },
  { label: 'Repairs & Maintenance', t12: 3180, current: 6000, proforma: 6000 },
  { label: 'Landscaping / Snow', t12: 4050, current: 3600, proforma: 3600 },
]

// Notes under the operating statement (source + normalization assumptions).
export const FIN_NOTES = [
  'Source: owner-provided operating statements, normalized. Management underwritten at market even where owner self-manages. Verify independently.', // SAMPLE — adjust
  'The trailing-twelve column reflects only the expense detail ownership provided and carries no management fee or replacement reserve. Current and pro forma load management at 5% of effective gross income, repairs at $500 per unit, and a 5% vacancy factor against in-place rents.', // SAMPLE — adjust
]
