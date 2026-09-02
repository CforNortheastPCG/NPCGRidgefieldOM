/* ═══════════ PAGE-ASSEMBLY CONTRACTS ═══════════
   The shapes App.tsx and src/data/manifest.ts agree on.

   ManifestEntry is CONTAINER — it matches npcgstudio/frame/src/lib/types.ts
   field for field, so the OM frame's tooling (shot.mjs, layout-check.mjs,
   the dist/manifest.json emit) reads a BOV build without adaptation. The
   BovPageType union below is product: it names the BOV's pages, the way the
   frame's `type` strings name the OM's. */

/** Which deck FORMAT (src/data/deal.ts) selects. Annotate the constant
    with this, or `FORMAT === 'full'` narrows to a literal and the long
    format can never render. */
export type DeckFormat = 'short' | 'full'

/** Every page the BOV can render. Adding one means: a type here, a case in
    pageFor() (src/App.tsx), and an entry in src/data/manifest.ts. */
export type BovPageType =
  // front matter
  | 'cover'
  | 'toc'
  | 'advisors'
  | 'disclaimer'
  | 'divider'
  // the project & property
  | 'project'
  | 'assessment-tax'
  | 'portfolio-summary'
  | 'property'
  | 'photos'
  // the firm's case
  | 'why-npcg'
  | 'proven-performance'
  | 'track-record'
  // financial analysis
  | 'as-given'
  | 'underwriting'
  | 'unit-mix-ie'
  // commercial classes (retail · office · industrial · mixed-use)
  | 'tenant-rent-roll'
  | 'lease-rollover'
  | 'tenant-profiles'
  | 'valuation'
  | 'sales-comps'
  | 'rent-comps'
  // the marketing process
  | 'selling-stages'
  | 'timeline'
  | 'visibility'
  | 'buyer-tracking'
  | 'reporting'
  | 'process'
  | 'expect'
  | 'contract'
  | 'closing'
  // the market
  | 'market-overview'
  | 'market-activity'
  // beyond the sale
  | 'why-owners-sell'
  | 'tax-deferral'
  | 'flywheel'
  // the team & the close
  | 'team'
  | 'locations'
  | 'conclusion'
  | 'firm'

export interface ManifestEntry {
  /** Stable page identity — survives reordering, and is what
      `data-page-id` carries into the DOM for any tool reading a build. */
  id: string
  type: BovPageType
  /** TOC label. Dividers use it as the section head. */
  title: string
  /** Divider only: the section number shown above the rule ("01"). */
  eyebrow?: string
  /** Divider only: full-bleed background photo. */
  image?: string
  /** Which entry of a repeating source this page renders — a property in
      portfolio mode, a photo page in PHOTO_PAGES. */
  index?: number
  /** Keep the page out of the table of contents (photo pages). */
  tocHidden?: boolean
}

/** Per-page deterministic text-size tweak, keyed by manifest id. 1 = none.
    The container applies it as --page-zoom; see styles/index.css. */
export interface TweaksData {
  pages: Record<string, number>
}

/* ═══════════ PHOTOGRAPHY ═══════════ */

export interface PhotoImage {
  src: string
  caption?: string
  /** CSS object-position, e.g. "center 30%", when the crop needs steering. */
  pos?: string
}

/** One photo page. `rows` overrides the balanced default layout — [1, 2] is
    a hero on top with two beneath. */
export interface PhotoPageData {
  section: string
  title: string
  accent?: string
  subtitle?: string
  images: PhotoImage[]
  rows?: number[]
  note?: string
}

/** A unit floor plan. `unit` and `type` head the plate; `sub` is an
    optional note beneath ("as-built, not to scale"). */
export interface FloorPlanData {
  src: string
  unit: string
  type?: string
  sub?: string
}

/* ═══════════ FINANCIAL INPUTS ═══════════
   The data files declare these with `satisfies`, not a type annotation:
   the contract is checked, and the literal types survive for calc.ts. An
   inject.mjs writing these same shapes would need no component change. */

export interface RentRollUnit {
  unit: string
  type: string
  sqft: number
  inPlace: number
  proforma: number
  /** The roll's own word. A status starting "Vacant" counts as vacant and
      renders terracotta; its `inPlace` is then the ASKING rent. */
  status?: string
  leaseFrom?: string
  leaseEnd?: string
}

export interface RentRollData {
  asOf: string
  source: string
  units: RentRollUnit[]
  footnotes?: string[]
}

/** One line of the operating statement. `t12` is null for a line the
    trailing-twelve does not report — the page prints an em dash, never $0. */
export interface OperatingLine {
  label: string
  t12: number | null
  current: number
  proforma: number
  /** Management fee: computed from MGMT_PCT rather than stated. */
  mgmt?: boolean
  note?: string
}

export interface CapLadder {
  from: number
  to: number
  step: number
  /** Rows between these bounds shade as the expected trade band. */
  bandFrom: number
  bandTo: number
}

export interface ValuationData {
  askingPrice: number
  capLadder: CapLadder
  capScenarios: Array<{ label: string; cap: number; highlight?: boolean }>
  concludedRange: { low: number; high: number }
  compRangeText?: string
  adjustedRangeText?: string
  adjustmentsNote?: string
  loan: { ltvPct: number; ratePct: number; amortYears: number }
  /* Prose for these pages lives in src/content/valuation.content.ts and
     src/content/conclusion.content.ts — data files carry numbers. */
}

/* ═══════════ PROPERTY RECORD & TAXES ═══════════ */

export interface AssessorBuilding {
  style?: string
  yearBuilt?: string
  stories?: string
  livingArea?: string
  totalBaths?: string
  foundation?: string
  frame?: string
  exteriorWall?: string
  interiorWall?: string
  roof?: string
  flooring?: string
  heatType?: string
  ac?: string
  kitchenBathStyle?: string
}

export interface AssessorParcel {
  id: string
  location: string
  owner?: string
  mailingAddress?: string
  visionId?: string
  mapLot?: string
  useDescription?: string
  zoning?: string
  landAcres?: number
  bookPage?: string
  priorSaleDate?: string
  priorSalePrice?: number
  /** Units per the RENT ROLL, for reconciliation against the card. */
  units?: number
  /** Assessed components — the page sums these; never pre-total. */
  assessment: { land: number; buildings: number; outbuildings?: number; extraFeatures?: number }
  /** Per-parcel construction detail. A portfolio whose parcels differ
      carries it here; a single-parcel deal can use ASSESSOR.building
      instead and the page falls back to that. */
  building?: AssessorBuilding
}


export interface AssessorData {
  source: string
  printedDate?: string
  parcels: AssessorParcel[]
  assessmentFy?: string
  building?: AssessorBuilding
  note?: string
  sourceNote?: string
}

export interface TaxFiscalYear {
  fy: string
  assessedValue: number
  ratePer1000: number
  surcharge?: number
}

export interface TaxInstallment {
  label: string
  payBy: string
  amount: number
  credits?: number
  interest?: number
}

export interface TaxParcelRow {
  parcelId: string
  location: string
  units?: number
  priorAssessed: number
  currentAssessed: number
  /** Fiscal-year tax for this parcel, where the bill breaks it out. */
  tax?: number | null
}

export interface TaxesData {
  municipality: string
  asOfDate?: string
  billRef?: string
  fiscalYears: TaxFiscalYear[]
  byParcel?: TaxParcelRow[]
  installments?: TaxInstallment[]
  /** MA-style preliminary bills annualize ×2. Getting this wrong doubles
      the tax on the page. */
  installmentsArePreliminary: boolean
  ownerStatedAnnual?: number | null
  underwritingNote?: string
  reassessmentRatios?: number[]
  sourceNote?: string
}

/* ═══════════ AS GIVEN — THE OWNER'S OWN FIGURES ═══════════
   Reproduced unadjusted, exactly as ownership supplied them, so the reader
   can see what we started from before the underwriting page adjusts it.
   Never reconcile these numbers into agreement with ours — the gap IS the
   page. Set the export to null and the page drops out of both formats. */

export interface AsGivenUnit {
  unit: string
  type: string
  rent: number
  expiry?: string
  status?: string
}

export interface AsGivenRentRollGroup {
  label: string
  units: AsGivenUnit[]
}

/** One line of the owner's statement. `strong` bolds a subtotal row. */
export interface AsGivenLine {
  label: string
  amount: number
  strong?: boolean
  note?: string
}

export interface AsGivenData {
  subtitle?: string
  rentRollLabel?: string
  rentRollTotalLabel?: string
  /** The owner's own stated total — printed as given, never recomputed. */
  rentRollTotal?: number
  rentRoll: AsGivenRentRollGroup[]
  statementLabel?: string
  income: AsGivenLine[]
  expenses: AsGivenLine[]
  /** The owner's stated NOI, printed as given — the page shows whether it
      reconciles, it does not silently correct it. */
  statedNoi?: number
  reconciliationTitle?: string
  reconciliation?: string
  sourceNote?: string
}

/* ═══════════ COMPARABLES ═══════════
   Pulled from CoStar / Salesforce and pasted in. Optional fields render
   only when present — a comp set without photos or year-built still lays
   out correctly. */

export interface SalesComp {
  address: string
  city: string
  type?: string
  date?: string
  price: number
  units?: number
  gla?: number
  capRate?: string
  yearBuilt?: number | string
  photo?: string
  notes?: string
}

export interface SalesCompsData {
  commentary?: string
  comps: SalesComp[]
}

export interface RentComp {
  address: string
  city: string
  unitType: string
  sqft?: number
  rent: number
  yearBuilt?: number | string
  /** Units in the comp's building — context for a per-unit rent. */
  buildingUnits?: number
  photo?: string
  notes?: string
}

export interface RentCompsData {
  commentary?: string
  comps: RentComp[]
}

/* ═══════════ TEAM & OFFICES (firm-standard) ═══════════ */

export interface TeamMember {
  name: string
  title: string
  phone?: string
  email?: string
  /** Headshot in public/photos/team/; initials render until one lands. */
  photo?: string
  url?: string
  licenseNo?: string
  states?: string
}

export interface Office {
  region: string
  address1: string
  address2: string
  phone: string
}

/* ═══════════ PROPERTY INFORMATION ═══════════ */

export interface LabelValue {
  label: string
  value: string
}

export interface PropertyData {
  id: string
  name: string
  address: string
  stats: { units: number; gsf?: number; yearBuilt?: number; lotAcres?: number }
  siteRows: LabelValue[]
  utilityRows?: LabelValue[]
  unitCompositionRows?: LabelValue[]
  ancillaryRows?: LabelValue[]
  photo?: string
}

/* ═══════════ ASSET CLASS ═══════════
   One switch in src/data/deal.ts decides the deck's vocabulary AND which
   rent-roll pages the manifest renders. Components never hardcode "Unit" —
   they read VOCAB (src/lib/vocab.ts). */

export type AssetClass =
  | 'multifamily'
  | 'sro'
  | 'mixed-use'
  | 'retail'
  | 'office'
  | 'industrial'

export interface VocabData {
  /** Display label for the class, e.g. "Multi-Tenant Office". */
  label: string
  /** Singular noun for a leasable space: Unit · Room · Suite. */
  unit: string
  units: string
  mixTitle: string
  /** Is price-per-space a real metric? Retail and office trade on $/SF; a
      per-suite price is meaningless there and is dropped from the deck. */
  perUnitPrice: boolean
  /** Which rent roll the deck renders. 'both' is mixed-use: residential
      units AND commercial suites, each with its own page. */
  roll: 'residential' | 'commercial' | 'both'
}

/* ═══════════ COMMERCIAL RENT ROLL ═══════════
   Retail / office / industrial trade on leases, not unit mix: who is in the
   space, how much of it, until when, at what PSF, and who pays the
   operating costs. Everything derived from this — NRA, occupancy by SF,
   WALT, the rollover schedule, recoveries — is computed in src/lib/calc.ts. */

/** Who pays operating costs. Drives the recovery column and the reader's
    read of the NOI: a gross rent and a triple-net rent are not comparable. */
export type RecoveryType = 'NNN' | 'NN' | 'MG' | 'Gross' | 'Absolute NNN'

export interface CommercialLease {
  suite: string
  tenant: string
  /** Use / trade, e.g. "Quick-service restaurant", "Warehouse & office". */
  use?: string
  sf: number
  /** ANNUAL base rent per SF, in place. A vacant suite carries the ASKING
      rent and must set `vacant: true` — the page says so and the occupancy
      math excludes it. */
  rentPsf: number
  /** Market / achievable annual PSF, for the pro forma column. */
  marketPsf?: number
  leaseFrom?: string
  /** 'MTM' is fine. An expired lease is a real finding — say so, don't
      quietly roll it forward. */
  leaseEnd?: string
  recovery?: RecoveryType
  /** Annual recovery income from this tenant (CAM + tax + insurance). */
  camAnnual?: number
  /** Renewal options, e.g. "2 × 5 yr @ FMV". */
  options?: string
  /** Contractual increases, e.g. "3%/yr". */
  escalation?: string
  vacant?: boolean
}

export interface CommercialRollData {
  /** Human label for the roll date, e.g. "July 2026". */
  asOf: string
  /** ISO date the roll speaks as of. WALT and the rollover schedule are
      struck against it — supply it and the deck renders identically next
      month; omit it and they drift with the clock. */
  asOfDate?: string
  source: string
  /** Net rentable area. State it when the survey differs from the sum of
      the leases; otherwise the leases are summed. */
  nraSf?: number
  leases: CommercialLease[]
  footnotes?: string[]
}
