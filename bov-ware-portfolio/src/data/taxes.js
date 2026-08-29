/* ═══════════════════ REAL ESTATE TAXES ═══════════════════
   Source: Town of Ware, MA real estate bill detail (Tyler Technologies
   MUNIS self-service) pulled 6/10/2026 for bills 921 / 922 / 923, plus the
   FY2027 preliminary billing carried on the workbook's Real Estate tab.

   The FY2026 mill rate is not printed on the bills — it is derived, and it
   derives cleanly: each parcel's FY2026 tax divided by its assessed value
   gives $14.49 per $1,000 to four decimals on all three parcels
   independently, so the rate is reliable.

   ⚠ AS OF THE PULL DATE the FY2026 Q4 installments were OVERDUE across all
   three parcels — $4,108.79 of principal plus $195.29 of accrued interest.
   That is a diligence item, not a valuation item, and it is stated in the
   underwriting note rather than buried. */

export const TAXES = {
  municipality: 'Town of Ware, MA',
  asOfDate: 'June 10, 2026',
  billRef: 'FY2026 — Bills 921 / 922 / 923',

  fiscalYears: [
    { fy: 'FY2026', assessedValue: 1094800, ratePer1000: 14.49, surcharge: 0 },
  ],

  byParcel: [
    { parcelId: '60-0-130', location: '27 Parker St',   units: 4,  assessedValue: 275400, tax: 3990.55, billNo: '921' },
    { parcelId: '61-0-10',  location: '28-30 North St', units: 14, assessedValue: 591100, tax: 8565.04, billNo: '922' },
    { parcelId: '61-0-11',  location: '38 North St',    units: 2,  assessedValue: 228300, tax: 3308.07, billNo: '923' },
  ],

  // FY2027 preliminary billing — two installments, portfolio-wide.
  installments: [
    { label: 'FY2027 Installment 1', payBy: '08/03/2026', amount: 4084.90, credits: 0, interest: 0 },
    { label: 'FY2027 Installment 2', payBy: '11/02/2026', amount: 4084.89, credits: 0, interest: 0 },
  ],
  installmentsArePreliminary: true,

  ownerStatedAnnual: 15460.69,

  underwritingNote:
    'FY2026 tax across the three parcels totals $15,863.66 against the $15,460.69 the ownership workbook carries — a $403 understatement, immaterial to value but corrected here. The FY2027 bills shown are Massachusetts preliminary billing, customarily half the prior year’s net tax; annualized they imply $16,339.58. Separately, as of the June 10 pull the FY2026 Q4 installments were overdue on all three parcels — $4,108.79 plus $195.29 of interest — which should be cleared at or before closing.',

  reassessmentRatios: [0.75, 1.0],

  sourceNote:
    'Source: Town of Ware online real estate bill detail for bills 921, 922 and 923, printed June 10, 2026, and the assessor property cards printed June 11, 2026. The rate per $1,000 is derived from FY2026 tax against total assessed value — it reconciles to $14.49 on each parcel independently — and is not a published mill rate.',
}
