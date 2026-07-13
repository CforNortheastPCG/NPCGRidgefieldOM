/* ═══════════ INJECTED-DATA CONTRACTS (protected) ═══════════
   Shapes of everything scripts/inject.mjs writes into src/data/.
   The frame is self-contained: these mirror the relevant parts of
   @autoom/om-core's payload types, but the frame never imports the
   workspace package (the container ships frame/ standalone). */

export interface DealData {
  name: string
  address: string
  cityState: string
  cityLong: string
  fullAddress: string
  status: string
  docType: string
  coverImage: string | null
}

export interface RentColumnData {
  key: string
  label: string
}

export interface RentRowData {
  group?: string
  unit: string
  use: string
  tenant?: string
  sf?: number
  leaseEnd?: string
  vacant?: boolean
  rents: Record<string, number>
  camAnnual?: number
}

export interface RentRollData {
  basis: 'monthly' | 'annual'
  columns: RentColumnData[]
  rows: RentRowData[]
}

export interface IeLineData {
  label: string
  amounts?: Record<string, number>
  note?: string
}

export interface IeData {
  columns: RentColumnData[]
  /** Rows rendered ABOVE Gross Scheduled Rent (e.g. Gross Potential Rent,
      Below Market Rent) — used when the workbook models a GPR → GSR bridge. */
  preRentLines?: IeLineData[]
  otherIncomeLines: IeLineData[]
  expenseLines: IeLineData[]
  vacancyPct: number
  mgmtPct: number | null
}

export interface RentRollColumnTotalsData {
  monthly: number
  annual: number
  psfAnnual: number | null
}

export interface RentRollComputedData {
  unitCount: number
  totalSf: number
  vacantCount: number
  camAnnualTotal: number
  /** Workbook "Average" row of the unit-mix block (per column, monthly). */
  avgRentByColumn?: Record<string, number>
  /** Workbook "Monthly Total" row of the DETAIL rent roll — kept separate
      from byColumn when the workbook's annual model (byColumn) marks units
      beyond the per-unit detail values. */
  detailMonthlyByColumn?: Record<string, number>
  byColumn: Record<string, RentRollColumnTotalsData>
  groups: Array<{
    group: string
    unitCount: number
    totalSf: number
    byColumn: Record<string, RentRollColumnTotalsData>
  }>
  unitMix: Array<{
    use: string
    count: number
    totalSf: number
    avgSf: number | null
    /** Workbook unit-mix average rent per column (monthly). */
    avgRent?: Record<string, number>
    rentRange: Record<string, { min: number; max: number }>
  }>
}

export interface IeColumnComputedData {
  grossScheduledRent: number
  vacancyLoss: number
  effectiveRentalIncome: number
  otherIncome: number
  egi: number
  mgmtFee: number
  totalExpenses: number
  noi: number
}

export interface ComputedData {
  rentRoll?: RentRollComputedData
  incomeExpense?: { byColumn: Record<string, IeColumnComputedData> }
  returns?: {
    capRateByColumn: Record<string, number>
    pricePerSf: number | null
    pricePerUnit: number | null
    grm: number | null
  }
}

export interface FinancialsData {
  askingPrice: number
  unitCount: number | null
  buildingSf: number | null
  rentRoll: RentRollData | null
  ie: IeData | null
  computed: ComputedData
}

export interface OverviewCard {
  title: string
  rows: Array<{ label: string; value: string }>
}

export interface OverviewData {
  cards: OverviewCard[]
}

export interface StatTile {
  v: string
  l: string
}

export interface BrokerData {
  name: string
  title: string
  phone?: string
  email?: string
  photo?: string
}

export interface PhotoData {
  src: string
  caption?: string
}

export interface PhotoPageData {
  id: string
  title: string
  layout: 'g-2x2' | 'g-hero-2'
  photos: PhotoData[]
}

export interface MapBand {
  min: number
  color: string
  /** [lat, lng] ring, closed (first == last). */
  coords: Array<[number, number]>
}

export interface MapAmenity {
  name: string
  lat: number
  lng: number
  note: string
  /** Per-category pin number (1–9). */
  n: number
  /** Static Maps marker color, e.g. "0xB55D37". */
  color: string
  swatch: string
  category: string
}

export interface MapData {
  generated: boolean
  subject: { lat: number; lng: number } | null
  frame: { centerLat: number; centerLng: number; zoom: number; w: number; h: number } | null
  coastal: boolean
  isochrones: MapBand[]
  cities: Array<{ name: string; drive: string; lat?: number; lng?: number }>
  hasLabelsOverlay: boolean
  amenities: MapAmenity[]
  categories: Array<{ label: string; swatch: string }>
}

export interface ManifestEntry {
  id: string
  type: string
  title: string
  eyebrow?: string
  image?: string
  contentModule?: string
}
