/* ═══════════ CONTENT CONTRACTS ═══════════
   Typed shapes for every authored content module. A BOV's *numbers* live in
   src/data/ and are computed by src/lib/calc.ts; its *prose* — the parts a
   person (or an agent) writes for this deal — lives here.

   `generated: false` renders a red placeholder banner on the page, so an
   unwritten module is loudly visible in the browser, in the PDF, and to a
   screenshot review — never silently blank.

   This mirrors npcgstudio/frame/src/content/types.ts; the shapes are the
   BOV's own. */

export interface ProjectContent {
  generated: boolean
  /**
   * 2 paragraphs. Arc: who engaged NPCG and what the asset is → what the
   * conclusion draws on and what it is (a supportable range, not a number).
   * Markdown bold (**text**) is supported for the property name.
   */
  paragraphs: string[]
  /**
   * The "In Short" callout — ONE sentence, the thesis of the whole deck.
   * If a reader takes one line off this page, it is this one.
   */
  summary: string
  /**
   * Numbered investment highlights. The charts beside them do the arguing,
   * so these stay short and factual:
   *   · 4 highlights. Five is already padding.
   *   · `title` ≤ 5 words, `body` ≤ 18 words. Hard caps — the page is laid
   *     out assuming them, and longer copy pushes charts off it.
   *   · Every `body` carries a hard number — a rent gap, a ratio, a count.
   *     A highlight with no number is an adjective.
   *   · Lead with the strongest; a reader takes two and skims the rest.
   *   · No "nestled", "boasts", "prime location", "turnkey", "rare
   *     opportunity". Say the number instead.
   */
  highlights: Array<{ title: string; body: string }>
}

export interface ValuationContent {
  generated: boolean
  /**
   * The three argument cards — where the opinion stops being arithmetic.
   * **≤ 26 words each.** The ladder, the curve and the returns table are
   * already carrying the quantitative load; these only have to say the
   * part a chart can't.
   */
  pricingRationale: string
  buyerProfile: string
  whatMovesPrice: string
  /** How the raw comp range was adjusted to the concluded one. */
  adjustmentsNote?: string
}

export interface ConclusionContent {
  generated: boolean
  /**
   * The stated opinion, in 2 paragraphs: the number and what supports it,
   * then what a seller should do about it. This is the last prose in the
   * deck and the part an owner reads twice.
   */
  opinionParagraphs: string[]
  /** Optional closing line beneath the price band. */
  conclusionNote?: string
  /** The standing not-an-appraisal notice. Legal copy — edit with care. */
  disclaimerNote: string
}

export interface TenantProfilesContent {
  generated: boolean
  /** Optional lead line above the cards. */
  lead?: string
  /**
   * One profile per material tenant, keyed by the tenant name exactly as it
   * appears in commercialRoll.ts. Two or three sentences: who they are,
   * what they do in the space, and why they stay — a credit story, a
   * build-out they paid for, a location they cannot replicate.
   *
   * Say what is verifiable. "National credit tenant" is a claim; "publicly
   * traded, 1,200 locations" is a fact. A tenant with nothing to say gets
   * no profile rather than a paragraph of adjectives.
   */
  profiles: Array<{ tenant: string; body: string }>
}
