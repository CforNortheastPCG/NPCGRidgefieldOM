/* ═══════════════════ DEAL CONFIG · WARE PORTFOLIO ═══════════════════
   Source: "Ware Portfolio - Workbook 06.2026.xlsx" (Analysis / P&L / Real
   Estate / Property Card / Rent Roll tabs), Town of Ware assessor property
   cards printed 6/11/2026, and Town of Ware FY2026 real estate bills
   921 / 922 / 923 pulled 6/10/2026. */
export const DEAL = {
  name: 'Ware Portfolio',
  address: '27 Parker Street · 28-30 North Street · 38 North Street',
  cityState: 'Ware, MA 01082',
  cityLong: 'Ware, Massachusetts',
  status: 'Broker Opinion of Value',
  type: '20-Unit, Three-Parcel Multifamily Portfolio',
  preparedFor: 'CV Ware Opportunity Zone Fund, LLC',
  preparedDate: 'June 2026',
  coverImage: '/photos/cover.jpg',
  pdfName: 'Ware-Portfolio-Ware-MA-BOV.pdf',
}

export const FORMAT = 'short'

export const COVER_STATS = [
  { v: '20',     l: 'Units' },
  { v: '13,875', l: 'Rentable SF' },
  { v: '3',      l: 'Parcels' },
  { v: '0.83',   l: 'Acres' },
  { v: '100%',   l: 'Occupied' },
]

export const ADDR = DEAL.address
export const CITY_STATE = DEAL.cityState
export const FULL_ADDR = `${ADDR}, ${CITY_STATE}`

export const DRAFT = true
