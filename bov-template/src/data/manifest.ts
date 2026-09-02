/* ═══════════════════ PAGE ORDER — THE SINGLE SOURCE OF TRUTH ═══════════════════
   MANIFEST is the one place page ORDER and page NUMBERS are decided. Page
   numbers are 1-based manifest positions; the table of contents derives
   from the same array (TocPage.tsx), and every build ships it as
   dist/manifest.json. Never renumber a page by hand.

   Each entry: { id, type, title } — `type` selects the component in
   pageFor() (src/App.tsx), `title` is the TOC label, and dividers use it as
   the section head. Adding a page means: a type in src/lib/types.ts, a case
   in pageFor(), an entry here.

   ── TWO FORMATS, ONE ARRAY ─────────────────────────────────────────────
   FORMAT (src/data/deal.ts) selects which pages render:

     'short'  the analytical BOV, in the order a reader checks it: cover,
              the project, property record & taxes, the owner's figures AS
              GIVEN, the three-column UNDERWRITING, the price, the
              comparables that support it, and the close-out. Nothing to
              skim past.
     'full'   those same pages, plus the pitch around them: TOC, advisors,
              Why NPCG, track record, photography, the firm's
              marketing-process pages, market, the owner-advisory "Beyond
              the Sale" section, team. Use when the BOV doubles as the
              listing pitch.

   `full(...)` marks entries that appear only in the long format, so the two
   sequences stay visibly one list rather than drifting apart. */

import type { ManifestEntry } from '../lib/types.ts'
import { FORMAT } from './deal.ts'
import { IS_COMMERCIAL, IS_RESIDENTIAL } from '../lib/vocab.ts'
import { PROPERTIES, IS_PORTFOLIO } from './properties.ts'
import { PHOTO_PAGES } from './photos.ts'
import { ASSESSOR } from './assessor.ts'
import { TAXES } from './taxes.ts'
import { AS_GIVEN } from './asGiven.ts'

const IS_FULL = FORMAT === 'full'

/** Include these entries only in the long format. */
const full = (...defs: ManifestEntry[]): ManifestEntry[] => (IS_FULL ? defs : [])

/** Include these entries only when their source data exists. A deal with
    neither assessor card nor tax bills simply doesn't get that page — in
    either format — rather than rendering an empty shell. */
const ifData = (cond: boolean, ...defs: ManifestEntry[]): ManifestEntry[] => (cond ? defs : [])

/* Asset class decides which rent-roll pages exist. A retail deck has no
   unit mix; a multifamily deck has no lease rollover. Mixed-use gets both,
   because it genuinely is both. */
const commercial = (...defs: ManifestEntry[]): ManifestEntry[] => (IS_COMMERCIAL ? defs : [])
const residential = (...defs: ManifestEntry[]): ManifestEntry[] => (IS_RESIDENTIAL ? defs : [])

const HAS_RECORD = !!ASSESSOR?.parcels?.length || !!TAXES?.fiscalYears?.length
const HAS_AS_GIVEN = !!AS_GIVEN

/** Property pages expand by count: a single property renders one page; a
    portfolio renders a summary page then one page per property. */
const propertyPages = (): ManifestEntry[] =>
  IS_PORTFOLIO
    ? [
        { id: 'portfolio-summary', type: 'portfolio-summary', title: 'Portfolio Summary' },
        ...PROPERTIES.map((p, i) => ({
          id: `property-${i + 1}`,
          type: 'property' as const,
          title: p.name,
          index: i,
        })),
      ]
    : [{ id: 'property', type: 'property', title: 'Property Information', index: 0 }]

/** Photography runs in the long format only — the short deck is the
    analysis, and its pages already carry the property imagery they need. */
const photoPages = (): ManifestEntry[] =>
  (IS_FULL ? PHOTO_PAGES : []).map((p, i) => ({
    id: `photos-${i + 1}`,
    type: 'photos' as const,
    title: `${p.title} ${p.accent}`.trim(),
    index: i,
    tocHidden: true,
  }))

export const MANIFEST: ManifestEntry[] = [
  { id: 'cover', type: 'cover', title: 'Cover' },
  ...full(
    { id: 'toc', type: 'toc', title: 'Contents' },
    { id: 'advisors', type: 'advisors', title: 'Your Advisors' },
    { id: 'disclaimer', type: 'disclaimer', title: 'Confidentiality & Disclaimer' },
    { id: 'divider-01', type: 'divider', title: 'The Project & Property', eyebrow: '01', image: '/photos/divider.jpg' },
  ),

  { id: 'project', type: 'project', title: 'The Project' },
  ...ifData(HAS_RECORD, { id: 'assessment-tax', type: 'assessment-tax', title: 'Property Record & Taxes' }),
  ...full(...propertyPages()),
  ...full(
    { id: 'why-npcg', type: 'why-npcg', title: 'Why NPCG' },
    { id: 'proven-performance', type: 'proven-performance', title: 'Proven Performance' },
    { id: 'track-record', type: 'track-record', title: 'Our Track Record' },
    { id: 'divider-02', type: 'divider', title: 'Financial Analysis & Valuation', eyebrow: '02', image: '/photos/divider.jpg' },
  ),

  ...ifData(HAS_AS_GIVEN, { id: 'as-given', type: 'as-given', title: 'As Given — Owner-Provided' }),

  /* On a commercial deal the leases ARE the analysis — they feed the
     underwriting and they carry the value — so both pages run in the short
     format too, not just the pitch deck. */
  ...commercial(
    { id: 'tenant-rent-roll', type: 'tenant-rent-roll', title: 'Tenant Rent Roll' },
    { id: 'lease-rollover', type: 'lease-rollover', title: 'Lease Rollover & WALT' },
  ),

  { id: 'underwriting', type: 'underwriting', title: 'Underwriting' },
  ...full(...residential({ id: 'unit-mix-ie', type: 'unit-mix-ie', title: 'Unit Mix & Income Analysis' })),
  ...full(...commercial({ id: 'tenant-profiles', type: 'tenant-profiles', title: 'Tenant Profiles' })),
  { id: 'valuation', type: 'valuation', title: 'Valuation & Pricing' },
  { id: 'sales-comps', type: 'sales-comps', title: 'Sales Comparables' },
  { id: 'rent-comps', type: 'rent-comps', title: 'Rent Comparables' },

  ...photoPages(),

  /* The marketing section opens with the firm's standard pitch pages — the
     three-stage process, the twelve-week timeline, syndication, buyer
     tracking, and reporting — then the deal-facing pages on what the owner
     decides, signs, and receives. */
  ...full(
    { id: 'divider-03', type: 'divider', title: 'The Marketing Process', eyebrow: '03', image: '/photos/divider.jpg' },
    { id: 'selling-stages', type: 'selling-stages', title: 'Selling Process Stages' },
    { id: 'timeline', type: 'timeline', title: 'Marketing Timeline' },
    { id: 'visibility', type: 'visibility', title: 'National Visibility' },
    { id: 'buyer-tracking', type: 'buyer-tracking', title: 'Buyer Tracking & Follow-Up' },
    { id: 'reporting', type: 'reporting', title: 'Client Reporting & Communication' },
    { id: 'process', type: 'process', title: 'The Process' },
    { id: 'expect', type: 'expect', title: 'What to Expect' },
    { id: 'contract', type: 'contract', title: 'Contract & Due Diligence' },
    { id: 'closing', type: 'closing', title: 'The Closing' },

    { id: 'divider-04', type: 'divider', title: 'The Market', eyebrow: '04', image: '/photos/divider.jpg' },
    { id: 'market-overview', type: 'market-overview', title: 'Market Overview' },
    { id: 'market-activity', type: 'market-activity', title: 'Development & Regulation' },

    /* Owner-advisory pages: why owners sell, what to do with the proceeds,
       and the relationship that continues after the close. */
    { id: 'divider-05', type: 'divider', title: 'Beyond the Sale', eyebrow: '05', image: '/photos/divider.jpg' },
    { id: 'why-owners-sell', type: 'why-owners-sell', title: 'Why Property Owners Sell' },
    { id: 'tax-deferral', type: 'tax-deferral', title: 'Deferring Capital Gains Taxes' },
    { id: 'flywheel', type: 'flywheel', title: 'The Strategic Advisory Flywheel' },
  ),

  ...full(
    { id: 'divider-06', type: 'divider', title: 'The Team', eyebrow: '06', image: '/photos/divider.jpg' },
    { id: 'team', type: 'team', title: 'Our Team' },
    { id: 'locations', type: 'locations', title: 'Our Locations' },
  ),

  /* The close, in order, in both formats: the stated opinion and the phone
     number, then the one page that argues for the firm rather than the
     asset. That argument only earns its place after the analysis has been
     made. Both sit outside the `full(...)` groups so the TOC doesn't file
     them under whatever section happens to precede them. */
  { id: 'conclusion', type: 'conclusion', title: 'Conclusion & Recommendation' },
  { id: 'firm', type: 'firm', title: 'Northeast Private Client Group' },
]
