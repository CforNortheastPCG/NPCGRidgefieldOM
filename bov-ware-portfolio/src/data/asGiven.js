/* ═══════════════════ AS GIVEN (OWNER-PROVIDED) ═══════════════════
   Source: "Ware Portfolio - Workbook 06.2026.xlsx" → `Rent Roll` tab
   (as of June 10, 2026) and `P&L` tab ("Pro Forma Income & Expenses,
   Stabilized Annual Basis"). Transcribed verbatim, including the labels.

   ⚠ TENANT NAMES REDACTED. The source rent roll carries them; they are not
   reproduced here. Restore only for an owner-facing draft, never for buyer
   distribution.

   ONE PRESENTATION QUIRK, NOT AN ERROR. The tab's "Total Operating
   Expenses" of $103,999.94 includes the $15,123 vacancy allowance, which
   was already deducted above it to reach effective gross income. The nine
   actual expense lines sum to $88,876.94. Either way the stated NOI is
   right: $293,037 of EGI less $88,876.94 of operating expenses is
   $204,160.06 to the cent. We show the nine lines and their true total,
   and note the difference rather than restating the owner's number. */

export const AS_GIVEN = {
  subtitle: 'Ownership Workbook, June 2026 — Rent Roll & Pro Forma P&L, Unadjusted',
  rentRollLabel: 'Rent Roll — As Provided, June 10, 2026',
  rentRollTotalLabel: 'Portfolio Total — 20 Units',
  rentRollTotal: 25855,

  rentRoll: [
    {
      label: '27 PARKER ST — APT 4-8 · Parcel 60-0-130',
      units: [
        { unit: '1', type: '1BD',      rent: 1800, expiry: null,      status: 'Occupied' },
        { unit: '2', type: '1BD',      rent: 1375, expiry: '4/30/27', status: 'Occupied' },
        { unit: '3', type: '2BD',      rent: 1200, expiry: '10/31/26', status: 'Occupied' },
        { unit: '4', type: '3BR',      rent: 1375, expiry: '12/31/25', status: 'Occupied' },
      ],
    },
    {
      label: '28.5 NORTH ST — APT · Adjacent Structure',
      units: [
        { unit: '1', type: '2BD',      rent: 1225, expiry: '11/30/26', status: 'Occupied' },
        { unit: '2', type: '1BR — L',  rent: 1225, expiry: '4/30/27', status: 'Occupied' },
        { unit: '3', type: '1BD',      rent: 1150, expiry: null,      status: 'Occupied' },
      ],
    },
    {
      label: '28-30 NORTH ST — APT 4-8 · Parcel 61-0-10',
      units: [
        { unit: '28-1', type: '2BD',     rent: 950,  expiry: '5/31/27', status: 'Occupied' },
        { unit: '28-2', type: '2BD',     rent: 1125, expiry: '8/31/26', status: 'Occupied' },
        { unit: '28-3', type: '1BR — L', rent: 1200, expiry: null,      status: 'Occupied' },
        { unit: '30-1', type: 'STUDIO',  rent: 1670, expiry: '3/31/25', status: 'Expired' },
        { unit: '30-2', type: '2BD',     rent: 1575, expiry: null,      status: 'Occupied' },
        { unit: '30-3', type: '1BD',     rent: 1475, expiry: '4/30/27', status: 'Occupied' },
        { unit: '30-4', type: '1BD',     rent: 1750, expiry: '10/31/25', status: 'Expired' },
        { unit: '30-5', type: '2BD',     rent: 1200, expiry: '3/31/27', status: 'Occupied' },
        { unit: '30-6', type: '3BD',     rent: 1125, expiry: '6/30/26', status: 'Occupied' },
        { unit: '30-7', type: '3BR',     rent: 950,  expiry: null,      status: 'Occupied' },
        { unit: '30-8', type: '3BR',     rent: 1275, expiry: null,      status: 'Occupied' },
      ],
    },
    {
      label: '38 NORTH ST — TWO-FAMILY · Parcel 61-0-11',
      units: [
        { unit: '1', type: '1BD', rent: 1160, expiry: '11/30/25', status: 'Expired' },
        { unit: '2', type: '1BD', rent: 1050, expiry: '4/30/27', status: 'Occupied' },
      ],
    },
  ],

  statementLabel: 'Pro Forma Income & Expenses — As Provided',
  income: [
    { label: 'Gross Potential Rent', amount: 308160 },
    { label: 'Less: Vacancy (5%)', amount: -15123 },
    { label: 'Effective Gross Income', amount: 293037, strong: true },
  ],
  expenses: [
    { label: 'Real Estate Taxes', amount: 15460.69 },
    { label: 'Insurance', amount: 12283 },
    { label: 'Water & Sewer', amount: 11613.95 },
    { label: 'Gas / Electric', amount: 3812.30 },
    { label: 'Management Fee (3% of EGI)', amount: 9073 },
    { label: 'Rubbish Removal', amount: 8561 },
    { label: 'Repairs & Maintenance', amount: 10000 },
    { label: 'Misc Expenses (3% of EGI)', amount: 9073 },
    { label: 'Part-Time Help / Super', amount: 9000 },
  ],
  statedNoi: 204160.06,

  reconciliationTitle: 'Reading This Against Our Underwriting',
  reconciliation:
    'The stated NOI checks out — $293,037 of EGI less the nine lines above ($88,877) is $204,160 exactly. The tab’s own expense total of $103,999.94 folds the vacancy back in after already deducting it; a presentation quirk, not an error. We differ on two lines: management normalized from 3% to 5% of EGI, and "Misc Expenses" carried as Landscaping / Snow per the Analysis tab. They offset — our Market NOI of $204,206 lands within $50.',

  sourceNote:
    'Source: ownership workbook, June 2026 — Rent Roll and P&L tabs, transcribed without adjustment. Tenant names on the source roll are redacted. Four leases had expired at the roll date and no month-to-month conversion is recorded; lease start dates were not populated. Normalized figures appear on the Underwriting page.',
}
