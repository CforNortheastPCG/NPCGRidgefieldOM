/* ═══════════ CONTENT CONTRACTS (protected) ═══════════
   Typed shapes for every agent-writable content module. The agent edits
   only src/content/*.content.ts files, each of which exports one of
   these. `generated: false` renders a red placeholder banner on the
   page, so an unwritten module is loudly visible, never silently blank. */

export interface CoverContent {
  generated: boolean
  /** Cover tag line — rendered uppercase under the gold rule, right after
      the deterministic asset descriptor. The thesis as a place-claim,
      e.g. "East Boston's Corridor to Downtown". */
  subtitle: string
}

export interface ExecSummaryContent {
  generated: boolean
  /**
   * 4–5 paragraphs. Arc: presenter + asset → makeup → NOI/cap bridge →
   * positioning close → info-on-request boilerplate. Markdown bold
   * (**text**) is supported for the deal name and anchor tenants.
   */
  paragraphs: string[]
}

export interface HighlightItem {
  /** Bolded claim, e.g. "Rents ~13% Below Market". */
  head: string
  /** ONE supporting sentence carrying a hard stat from the payload. */
  body: string
}

export interface HighlightsContent {
  generated: boolean
  /** Exactly two titled groups (top-left / bottom-right boxes). */
  groups: Array<{ title: string; items: HighlightItem[] }>
}

export interface CityOverviewContent {
  generated: boolean
  /** Title accent word(s) get the golden color, e.g. heading "East Boston". */
  heading: string
  /** One-line dek under the title. */
  dek: string
  paragraphs: string[]
  bulletsTitle: string
  bullets: string[]
}

export interface CountyOverviewContent {
  generated: boolean
  heading: string
  intro: string
  /** Optional researched demographics table: the deal's locale vs the
      region (e.g. "East Boston" vs "Boston"). 4–6 rows: population,
      median HH income, renter share, median age, asking rent. */
  statsTitle?: string
  /** Column headers, e.g. localLabel "East Boston", regionLabel "Boston". */
  localLabel?: string
  regionLabel?: string
  stats?: Array<{ metric: string; local: string; region: string }>
  /** Required when stats are present: source line for researched figures,
      e.g. "Sources: U.S. Census ACS (2024); RentCafe (2026). Figures rounded." */
  sources?: string
  employersTitle: string
  employerGroups: Array<{ label: string; items: string }>
}

export interface LocationMapItem {
  /** Display name, e.g. "Walmart Supercenter". */
  name: string
  /** Small sub-line, e.g. "Big-box anchor · ~1.5 mi" or "New $33M station · opens 2027". */
  note?: string
  /** Full street address (or unambiguous place name + city/state). Items
      WITH an address get a numbered pin — Google Static Maps geocodes the
      address server-side. Items without one appear in the list only. */
  address?: string
}

export interface LocationMapContent {
  generated: boolean
  /** 3–5 sentence researched narrative: everyday retail, walkable
      landmarks, the nearest employment anchors, transit — name real
      places with real distances/timings. */
  intro: string
  /** Up to 4 categories (e.g. "Dining & Retail", "Employment & Anchors",
      "Civic & Lifestyle", "Transit"), ≤9 items each (pin labels are
      single digits). Colors are assigned by category order. */
  categories: Array<{ heading: string; items: LocationMapItem[] }>
}

export interface RegionalMapContent {
  generated: boolean
  /** One paragraph: the region's positioning, ≤ 80 words, opening with a
      bolded claim. */
  intro: string
  /** Exactly 4 stat tiles — value + short uppercase label, payload-backed. */
  statTiles: Array<{ v: string; l: string }>
  /** One short paragraph on highway/transit access (**bold** the routes). */
  highwayAccess: string
  /** One short paragraph on the region's employers/economy. */
  economicAnchors: string
}

export interface TenantProfilesContent {
  generated: boolean
  intro: string
  /** Blurb per tenant, keyed by the tenant name in the rent roll. */
  blurbs: Record<string, string>
}

export interface LifestyleCard {
  /** Venue / destination name. */
  name: string
  /** Short uppercase stat line, e.g. "9,508 seats · Opened 2021". */
  stat?: string
  /** ONE sentence, ≤ 26 words, describing the destination. */
  body: string
}

export interface LifestyleCultureContent {
  generated: boolean
  /** One paragraph, ≤ 55 words, opening with a **bolded claim** about the
      district's cultural pull. */
  intro: string
  /** Exactly 12 cards (3-column × 4-row grid); more will clip. */
  cards: LifestyleCard[]
}

export type DevelopmentStatus = 'delivered' | 'construction' | 'proposed'

export interface DevelopmentProject {
  name: string
  /** Street address or parcel label. */
  address?: string
  /** Headline figure, e.g. "228 units · $89M". */
  stat?: string
  status: DevelopmentStatus
}

export interface DevelopmentPipelineContent {
  generated: boolean
  /** One paragraph, ≤ 65 words, opening with a **bolded claim**. */
  intro: string
  /** Exactly 4 stat tiles — value + short uppercase label. */
  statTiles: Array<{ v: string; l: string }>
  /** Projects grouped by status in the component; ≤ 15 total fit the page. */
  projects: DevelopmentProject[]
  /** Source line for the researched figures. */
  source?: string
}

export interface TransportationAccess {
  mode: 'Air' | 'Rail' | 'Highway' | 'Bus'
  /** Route / facility name, e.g. "Logan International (BOS)". */
  title: string
  /** Distance or location tag, e.g. "~45 mi east". */
  distance: string
  /** ONE sentence, ≤ 28 words. */
  body: string
}

export interface TravelTime {
  city: string
  /** Driving time, e.g. "1 hr". */
  car: string
  /** Direct-rail time from Union Station, omitted when no direct service. */
  train?: string
}

export interface TransportationContent {
  generated: boolean
  /** One paragraph, ≤ 65 words, opening with a **bolded claim**. */
  intro: string
  /** Access cards, grouped by mode in the component; ≤ 10 fit the page. */
  access: TransportationAccess[]
  /** Travel-times panel; ≤ 6 rows. */
  travelTimes: TravelTime[]
  /** Footnote on rail service + approximation. */
  note?: string
}
