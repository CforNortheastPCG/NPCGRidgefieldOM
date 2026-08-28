#!/usr/bin/env node
/* ═══════════ DETERMINISTIC INJECTOR ═══════════
   payload JSON (computed already attached by om-core) → src/data/*.ts
   + frame/payload.json + style-pack tokens. No AI anywhere in here.
   The agent never touches these outputs — they are the protected
   financial spine, hash-checked after every agent run.

   Usage: node scripts/inject.mjs <payload.json> [--stylepacks <dir>]      */

import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const frameDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(frameDir, 'src', 'data')

const args = process.argv.slice(2)
const payloadPath = args.find((a) => !a.startsWith('--'))
if (!payloadPath) {
  console.error('usage: node scripts/inject.mjs <payload.json> [--stylepacks <dir>]')
  process.exit(1)
}
const stylepacksDir =
  args.includes('--stylepacks')
    ? args[args.indexOf('--stylepacks') + 1]
    : join(frameDir, '..', 'stylepacks')

const payload = JSON.parse(readFileSync(resolve(payloadPath), 'utf8'))
const { deal, property, computed = {}, photos = {}, brokers = [] } = payload

/* ── formatting (mirrors om-core display rules; values pre-rounded) ── */
const money = (n) => `${n < 0 ? '-' : ''}$${Math.abs(Math.round(n)).toLocaleString('en-US')}`
const money2 = (n) => `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const int = (n) => Math.round(n).toLocaleString('en-US')
const pct = (p, dp = 2) => `${p.toFixed(dp)}%`

const PROPERTY_TYPE_LABELS = {
  multifamily: 'Multifamily',
  'mixed-use': 'Mixed-Use',
  office: 'Multi-Tenant Office',
  retail: 'Retail',
  industrial: 'Industrial',
  land: 'Land',
  generic: 'Commercial',
}

/* ── photo pool ── */
const cats = ['exterior', 'interior', 'aerial', 'area', 'plans']
const pool = cats.flatMap((c) => (photos[c] ?? []).map((p) => ({ ...p, category: c })))
const coverImage = photos.cover?.path ?? pool[0]?.path ?? null
const pick = (i) => pool[i % Math.max(pool.length, 1)]?.path ?? null

/* ── photo pages: hero-2 first (3 shots), then 2x2 pages of 4 ── */
const photoPages = []
{
  const shots = pool.filter((p) => p.category !== 'plans')
  let idx = 0
  let n = 1
  if (shots.length >= 3) {
    photoPages.push({
      id: `photos-${n++}`,
      title: 'Property Photos',
      layout: 'g-hero-2',
      photos: shots.slice(0, 3).map((p) => ({ src: p.path, ...(p.caption ? { caption: p.caption } : {}) })),
    })
    idx = 3
  }
  while (idx < shots.length) {
    const chunk = shots.slice(idx, idx + 4)
    if (chunk.length < 2) break
    photoPages.push({
      id: `photos-${n++}`,
      title: 'Property Photos',
      layout: 'g-2x2',
      photos: chunk.map((p) => ({ src: p.path, ...(p.caption ? { caption: p.caption } : {}) })),
    })
    idx += 4
  }
}

/* ── manifest: payload.pages if provided, else the canonical deck ── */
const rr = payload.rentRoll ?? null
const ie = payload.incomeExpense ?? null
const isTenantRoll = rr?.basis === 'annual'
// Place names so the location pages don't all read alike: "East Boston
// Overview" / "Greater Boston Overview" instead of City/Regional Overview.
const cityName = (payload.market?.city ?? payload.deal.cityState.split(',')[0] ?? '').trim() || 'City'
const regionName = (payload.market?.county ?? '').trim() || 'Regional'
let manifest
if (Array.isArray(payload.pages) && payload.pages.length > 0) {
  manifest = payload.pages
    .filter((p) => p.include !== false)
    .map(({ id, type, title, eyebrow, image, contentModule }) => ({
      id,
      type,
      title,
      ...(eyebrow ? { eyebrow } : {}),
      ...(image ? { image } : {}),
      ...(contentModule ? { contentModule } : {}),
    }))
} else {
  manifest = [
    { id: 'cover', type: 'cover', title: 'Cover', contentModule: 'cover.content.ts' },
    { id: 'toc', type: 'toc', title: 'Table of Contents' },
    { id: 'contacts', type: 'contacts', title: 'Deal Contacts' },
    { id: 'exec-summary', type: 'exec-summary', title: 'Executive Summary', contentModule: 'exec-summary.content.ts' },
    { id: 'highlights', type: 'highlights', title: 'Investment Highlights', contentModule: 'highlights.content.ts' },
    { id: 'divider-1', type: 'divider', title: 'The Property', eyebrow: '01', ...(pick(0) ? { image: pick(0) } : {}) },
    { id: 'property-overview', type: 'property-overview', title: 'Property Overview' },
    ...photoPages.map((p) => ({ id: p.id, type: 'photos', title: p.title })),
    ...(rr || ie
      ? [{ id: 'divider-2', type: 'divider', title: 'Financial Analysis', eyebrow: '02', ...(pick(1) ? { image: pick(1) } : {}) }]
      : []),
    ...(rr ? [{ id: 'rent-roll', type: 'rent-roll', title: 'Rent Roll' }] : []),
    ...(isTenantRoll
      ? [{ id: 'tenant-profiles', type: 'tenant-profiles', title: 'Tenant Profiles', contentModule: 'tenant-profiles.content.ts' }]
      : []),
    ...(ie ? [{ id: 'income-expense', type: 'income-expense', title: 'Income & Expense' }] : []),
    { id: 'divider-3', type: 'divider', title: 'Location & Market', eyebrow: '03', ...(pick(2) ? { image: pick(2) } : {}) },
    { id: 'city-overview', type: 'city-overview', title: `${cityName} Overview`, contentModule: 'city-overview.content.ts' },
    { id: 'location-map', type: 'location-map', title: 'Location & Amenities', contentModule: 'location-map.content.ts' },
    { id: 'drive-time-map', type: 'drive-time-map', title: 'Drive Times' },
    { id: 'county-overview', type: 'county-overview', title: `${regionName} Overview`, contentModule: 'county-overview.content.ts' },
    { id: 'regional-map', type: 'regional-map', title: 'Regional Positioning', contentModule: 'regional-map.content.ts' },
    { id: 'divider-4', type: 'divider', title: 'The Team', eyebrow: '04', ...(pick(3) ? { image: pick(3) } : {}) },
    { id: 'team', type: 'team', title: 'Our Team' },
    { id: 'locations', type: 'locations', title: 'Our Locations' },
  ]
}

/* ── exec tiles + offering summary rows ── */
const ieCur = computed.incomeExpense?.byColumn?.current
const iePf = computed.incomeExpense?.byColumn?.proForma
const capCur = computed.returns?.capRateByColumn?.current
const capPf = computed.returns?.capRateByColumn?.proForma
const mix = computed.rentRoll?.unitMix ?? []

const tiles = []
tiles.push({ v: money(deal.askingPrice), l: 'Offering Price' })
if (capCur != null) tiles.push({ v: pct(capCur), l: 'In-Place Cap' })
if (property.unitCount) tiles.push({ v: String(property.unitCount), l: 'Total Units' })
else if (property.buildingSf) tiles.push({ v: `${int(property.buildingSf)} SF`, l: 'Net Rentable' })
if (property.occupancyPct != null && rr)
  tiles.push({ v: `${property.occupancyPct}%`, l: `Leased · ${rr.rows.length} Tenants` })
else if (ieCur) tiles.push({ v: money(ieCur.noi), l: 'Net Operating Income' })

const mixLine = mix.length > 1 ? mix.map((m) => `(${m.count}) ${m.use}`).join(' · ') : null
const summaryRows = []
if (property.buildingSf) summaryRows.push(['Building Size', `${int(property.buildingSf)} SF`])
if (property.unitCount) summaryRows.push(['Number of Units', String(property.unitCount)])
if (mixLine) summaryRows.push(['Unit Mix', mixLine])
if (property.yearBuilt) summaryRows.push(['Year Built', String(property.yearBuilt)])
for (const line of ie?.otherIncomeLines ?? []) {
  const amt = line.amounts?.current
  if (amt != null) summaryRows.push([line.label, `${money(amt)} / yr`])
}
if (ieCur) summaryRows.push(['Net Operating Income', `${money(ieCur.noi)} (current)`])
if (iePf) summaryRows.push(['Pro Forma NOI', money(iePf.noi)])
if (capCur != null && capPf != null) summaryRows.push(['Cap Rate (Cur / PF)', `${pct(capCur)} / ${pct(capPf)}`])
else if (capCur != null) summaryRows.push(['Cap Rate', pct(capCur)])

/* ── property overview cards ── */
const cards = []
{
  const site = []
  site.push({ label: 'Address', value: `${deal.address}, ${deal.cityState}` })
  site.push({ label: 'Property Type', value: PROPERTY_TYPE_LABELS[deal.propertyType] ?? deal.propertyType })
  if (property.buildingSf) site.push({ label: 'Building Size', value: `${int(property.buildingSf)} SF` })
  if (property.lotAcres) site.push({ label: 'Lot Size', value: `${property.lotAcres} Acres` })
  if (property.yearBuilt)
    site.push({
      label: 'Year Built',
      value: property.yearRenovated ? `${property.yearBuilt} · renov. ${property.yearRenovated}` : String(property.yearBuilt),
    })
  if (property.stories)
    site.push({
      label: property.buildings ? 'Stories · Buildings' : 'Stories',
      value: property.buildings ? `${property.stories} · ${property.buildings}` : String(property.stories),
    })
  if (property.zoning) site.push({ label: 'Zoning', value: property.zoning })
  if (property.assessedValue) site.push({ label: 'Assessed Value', value: money(property.assessedValue) })
  if (property.parcelIds?.length) site.push({ label: 'Parcel ID', value: property.parcelIds.join(', ') })
  for (const f of property.extraFacts ?? []) site.push({ label: f.label, value: f.value })
  cards.push({ title: 'Site Summary', rows: site })

  const util = []
  if (property.heat) util.push({ label: 'Heat', value: property.heat })
  if (property.ac) util.push({ label: 'Cooling', value: property.ac })
  if (property.metering) util.push({ label: 'Metering', value: property.metering })
  if (property.tenantPays?.length) util.push({ label: 'Tenant Pays', value: property.tenantPays.join(', ') })
  if (property.landlordPays?.length) util.push({ label: 'Landlord Pays', value: property.landlordPays.join(', ') })
  if (util.length) cards.push({ title: 'Utilities', rows: util })

  if (property.construction || property.roof || property.parking) {
    const cs = []
    if (property.construction) cs.push({ label: 'Construction', value: property.construction })
    if (property.roof) cs.push({ label: 'Roof', value: property.roof })
    if (property.parking) cs.push({ label: 'Parking', value: property.parking })
    cards.push({ title: 'Construction & Systems', rows: cs })
  }

  if (mix.length > 0 && rr?.basis === 'monthly') {
    const rows = mix.map((m) => {
      const range = m.rentRange.current
      const rent =
        range == null ? '' : range.min === range.max ? ` · ${money(range.min)}` : ` · ${money(range.min)}–${money(range.max)}`
      return {
        label: m.use,
        value: `${m.count} unit${m.count > 1 ? 's' : ''}${m.avgSf ? ` · ${int(m.avgSf)} SF` : ''}${rent}`,
      }
    })
    const cur = computed.rentRoll?.byColumn?.current
    const pf = computed.rentRoll?.byColumn?.proForma
    if (cur) rows.push({ label: 'In-Place Rent', value: `${money(cur.monthly)} / mo · ${money(cur.annual)} / yr` })
    if (pf) rows.push({ label: 'Pro Forma Rent', value: `${money(pf.monthly)} / mo · ${money(pf.annual)} / yr` })
    cards.push({ title: 'Unit Mix & Rents', rows })
  }

  if (isTenantRoll && rr) {
    const anchor = [...rr.rows].sort((a, b) => (b.sf ?? 0) - (a.sf ?? 0))[0]
    const nra = computed.rentRoll?.totalSf ?? 0
    const years = rr.rows
      .map((r) => r.leaseEnd?.match(/(\d{2,4})\s*$/)?.[1])
      .filter(Boolean)
      .map((y) => (y.length === 2 ? `20${y}` : y))
      .sort()
    const t = []
    if (property.occupancyPct != null) t.push({ label: 'Occupancy', value: `${property.occupancyPct}% leased` })
    t.push({ label: 'Tenants', value: String(rr.rows.length) })
    if (anchor?.tenant && anchor.sf && nra)
      t.push({ label: 'Anchor', value: `${anchor.tenant} — ${int(anchor.sf)} SF (~${Math.round((anchor.sf / nra) * 100)}%)` })
    if (years.length > 1) t.push({ label: 'Lease Expirations', value: `${years[0]} – ${years[years.length - 1]}` })
    cards.push({ title: 'Tenancy', rows: t })
  }

  const inv = [{ label: 'Offering Price', value: money(deal.askingPrice) }]
  if (computed.returns?.pricePerUnit != null) inv.push({ label: 'Price / Unit', value: money(computed.returns.pricePerUnit) })
  if (computed.returns?.pricePerSf != null) inv.push({ label: 'Price / SF', value: money2(computed.returns.pricePerSf) })
  if (ieCur && capCur != null) inv.push({ label: 'Current NOI', value: `${money(ieCur.noi)} · ${pct(capCur)} cap` })
  if (iePf && capPf != null) inv.push({ label: 'Pro Forma NOI', value: `${money(iePf.noi)} · ${pct(capPf)} cap` })
  cards.push({ title: 'Investment Profile', rows: inv })
}

/* ── write files ── */
const HEADER = '// AUTO-GENERATED by scripts/inject.mjs — DO NOT EDIT (protected data tier)\n'
const emit = (file, body) => {
  writeFileSync(join(dataDir, file), HEADER + body)
  console.log(`  wrote src/data/${file}`)
}
const j = (v) => JSON.stringify(v, null, 2)

emit(
  'deal.ts',
  `import type { DealData } from '../lib/types.ts'

export const DEAL: DealData = ${j({
    name: deal.name,
    address: deal.address,
    cityState: deal.cityState,
    cityLong: deal.cityLong ?? deal.cityState,
    fullAddress: `${deal.address}, ${deal.cityState}`,
    status: deal.status ?? 'For Sale',
    docType: 'Offering Memorandum',
    coverImage,
  })}
`
)

emit(
  'financials.ts',
  `import type { FinancialsData } from '../lib/types.ts'

export const FINANCIALS: FinancialsData = ${j({
    askingPrice: deal.askingPrice,
    unitCount: property.unitCount ?? null,
    buildingSf: property.buildingSf ?? null,
    rentRoll: rr,
    ie: ie
      ? {
          columns: ie.columns,
          otherIncomeLines: ie.otherIncomeLines ?? [],
          expenseLines: ie.expenseLines ?? [],
          vacancyPct: ie.assumptions.vacancyPct,
          mgmtPct: ie.assumptions.mgmtPct ?? null,
        }
      : null,
    computed,
  })}
`
)

emit(
  'financials-display.ts',
  `import type { StatTile } from '../lib/types.ts'

export const EXEC_TILES: StatTile[] = ${j(tiles)}

export const SUMMARY_ROWS: Array<[string, string]> = ${j(summaryRows)}
`
)

emit(
  'overview.ts',
  `import type { OverviewData } from '../lib/types.ts'

export const OVERVIEW: OverviewData = ${j({ cards })}
`
)

emit(
  'contacts.ts',
  `import type { BrokerData } from '../lib/types.ts'

export const BROKERS: BrokerData[] = ${j(brokers)}
`
)

emit(
  'photos.ts',
  `import type { PhotoPageData } from '../lib/types.ts'

export const PHOTO_PAGES: PhotoPageData[] = ${j(photoPages)}

export const EXEC_PHOTO: string | null = ${j(pick(1) ?? coverImage)}
export const HIGHLIGHT_PHOTOS: Array<string | null> = ${j([pick(2), pick(3)])}
export const CITY_PHOTOS: Array<string | null> = ${j([pick(4), pick(5)])}
export const COUNTY_PHOTOS: Array<string | null> = ${j([pick(6), pick(7)])}
`
)

emit(
  'manifest.ts',
  `import type { ManifestEntry } from '../lib/types.ts'

export const MANIFEST: ManifestEntry[] = ${j(manifest)}
`
)

// Machine-readable copy shipped with the preview (vite copies public/) so
// the wizard's page selector reflects THIS book's actual deck + numbering.
mkdirSync(join(frameDir, 'public'), { recursive: true })
writeFileSync(join(frameDir, 'public', 'manifest.json'), JSON.stringify(manifest, null, 1))

emit(
  'mapdata.ts',
  `import type { MapData } from '../lib/types.ts'

export const MAPDATA: MapData = {
  "generated": false,
  "subject": null,
  "frame": null,
  "coastal": false,
  "isochrones": [],
  "cities": [],
  "hasLabelsOverlay": false,
  "amenities": [],
  "categories": []
}
`
)

emit(
  'tweaks.ts',
  `// AUTO-GENERATED — page-level layout tweaks (protected data tier).
// Written by scripts (inject resets it; the tweak job adjusts it) — the
// agent never touches this.
//   pages: content zoom factor per page id
//   cover: title corner (tl/tr/bl/br), logo corner ('auto' = opposite of
//          title) or a free-drag position in page percentages
export const TWEAKS: {
  pages: Record<string, number>
  cover: {
    titleCorner?: 'tl' | 'tr' | 'bl' | 'br'
    logoCorner?: 'tl' | 'tr' | 'bl' | 'br' | 'auto'
    logoX?: number
    logoY?: number
  }
} = {
  "pages": {},
  "cover": {}
}
`
)

// Full payload — the agent's single source of factual truth.
writeFileSync(join(frameDir, 'payload.json'), JSON.stringify(payload, null, 2))
console.log('  wrote payload.json')

/* Reset agent-writable content to generated:false placeholders so a new
   deal can never inherit the previous deal's prose. The draft pass
   re-authors them; PlaceholderBanner flags anything left behind.
   Skip with --keep-content (used when re-injecting mid-edit-session). */
if (!args.includes('--keep-content')) {
  const contentDir = join(frameDir, 'src', 'content')
  const PLACEHOLDERS = {
    'cover.content.ts': `import type { CoverContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COVER: CoverContent = {
  generated: false,
  subtitle: 'An Investment Offering',
}
`,
    'exec-summary.content.ts': `import type { ExecSummaryContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const EXEC_SUMMARY: ExecSummaryContent = {
  generated: false,
  paragraphs: [
    'Northeast Private Client Group is pleased to present this offering. A deal-specific executive summary has not been generated yet.',
    'All interested and qualified parties will have the opportunity to obtain additional information upon request.',
  ],
}
`,
    'highlights.content.ts': `import type { HighlightsContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const HIGHLIGHTS: HighlightsContent = {
  generated: false,
  groups: [
    {
      title: 'Investment Highlights',
      items: [
        { head: 'Not Yet Generated', body: 'Deal-specific highlights have not been authored for this offering.' },
      ],
    },
    {
      title: 'Location & Market',
      items: [
        { head: 'Not Yet Generated', body: 'Deal-specific highlights have not been authored for this offering.' },
      ],
    },
  ],
}
`,
    'city-overview.content.ts': `import type { CityOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const CITY_OVERVIEW: CityOverviewContent = {
  generated: false,
  heading: ${JSON.stringify(cityName)},
  dek: 'A deal-specific location overview has not been generated yet.',
  paragraphs: [
    'City overview prose has not been authored for this offering.',
  ],
  bulletsTitle: 'About the Area',
  bullets: [],
}
`,
    'location-map.content.ts': `import type { LocationMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
// Curate REAL nearby anchors (research them): everyday retail, employment
// anchors (hospitals, universities, major employers), civic landmarks,
// transit. Items with an address get a numbered map pin automatically.
export const LOCATION_MAP: LocationMapContent = {
  generated: false,
  intro: 'A curated amenity directory has not been authored for this offering.',
  categories: [],
}
`,
    'county-overview.content.ts': `import type { CountyOverviewContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const COUNTY_OVERVIEW: CountyOverviewContent = {
  generated: false,
  heading: ${JSON.stringify(regionName)},
  intro: 'Regional overview prose has not been authored for this offering.',
  employersTitle: 'Major Area Employers',
  employerGroups: [],
}
`,
    'tenant-profiles.content.ts': `import type { TenantProfilesContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const TENANT_PROFILES: TenantProfilesContent = {
  generated: false,
  intro: 'Tenant profiles have not been authored for this offering.',
  blurbs: {},
}
`,
    'regional-map.content.ts': `import type { RegionalMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
export const REGIONAL_MAP: RegionalMapContent = {
  generated: false,
  intro: 'Regional positioning prose has not been authored for this offering.',
  statTiles: [],
  highwayAccess: '',
  economicAnchors: '',
}
`,
  }
  for (const [file, body] of Object.entries(PLACEHOLDERS)) {
    writeFileSync(join(contentDir, file), body)
  }
  console.log(`  reset ${Object.keys(PLACEHOLDERS).length} content modules to placeholders`)
}

// Style pack: tokens + writing canon (STYLE.md / CONVENTIONS.md).
const packName = String(payload.stylePack ?? 'npcg-v1').replace(/-v\d+$/, '')
const packFiles = [
  ['tokens.css', join('src', 'styles', 'tokens.css')],
  ['STYLE.md', 'STYLE.md'],
  ['CONVENTIONS.md', 'CONVENTIONS.md'],
]
for (const [src, dest] of packFiles) {
  const from = join(stylepacksDir, packName, src)
  if (existsSync(from)) {
    copyFileSync(from, join(frameDir, dest))
    console.log(`  copied stylepack ${src} (${packName})`)
  } else {
    console.log(`  style pack file missing: ${from} — keeping existing ${dest}`)
  }
}

console.log(`inject complete: ${deal.name} (${manifest.length} pages)`)
