/* ═══════════ KELLEY SQUARE PORTFOLIO — parcels ═══════════
   Ported from the Kelley Square Portfolio website (properties.ts). The
   OM's subject building (23-33 Millbury Street) is two of these parcels;
   the rest render as portfolio context on the parcel map. */

export type PropertyUse = 'parking-lot' | 'building' | 'mixed'

export interface PortfolioProperty {
  id: string
  slug: string
  address: string
  name?: string
  addresses?: string[]
  coords: [number, number] // [lng, lat]
  currentUse: PropertyUse
  useLabelOverride?: string
  tagline: string
  groupId?: string
}

export interface PropertyGroup {
  id: string
  name: string
  tagline: string
  addresses?: string[]
}

/** Parcel ids that make up THIS offering (23-33 Millbury Street). 30 Millbury
    is a separate portfolio parcel, not part of the subject offering. */
export const SUBJECT_PARCEL_IDS = new Set(['millbury-23'])

export const portfolioCenter: [number, number] = [-71.79828213333333, 42.25480506666666]

export const propertyGroups: PropertyGroup[] = [
  {
    id: 'kelley-anchor',
    name: 'Kelley Square Portfolio',
    tagline:
      'Three buildings totaling 47,000 SF of mixed-use on four parcels totaling one acre on the Peanut, including a revenue-generating parking lot with long-term development potential.',
    addresses: ['1 Kelley Square', '126 Water Street', '233 Harding Street', '121-129 Water Street'],
  },
  {
    id: 'water-street',
    name: 'Water Street Portfolio',
    tagline:
      'Two mixed-use buildings totaling 21,300+ SF across two parcels, featuring off-street parking, ground-floor commercial, and 16 residential units above, steps from Polar Park.',
  },
  {
    id: 'lamartine-pair',
    name: 'Lamartine Street Portfolio',
    tagline:
      'Two commercial buildings totaling 5,575 SF on over 34,000 SF across two parcels, with extensive paved surface area and significant redevelopment potential overlooking Polar Park.',
  },
]

export const USE_LABEL: Record<PropertyUse, string> = {
  'parking-lot': 'Parking lot',
  building: 'Existing building',
  mixed: 'Mixed use',
}

export const portfolioProperties: PortfolioProperty[] = [
  { id: 'water-121', slug: '121-water-st', address: '121-129 Water Street', coords: [-71.795957, 42.255781], currentUse: 'building', tagline: "Heart of the district's restaurant row.", groupId: 'kelley-anchor' },
  { id: 'water-126', slug: '126-water-st', address: '126 Water Street', coords: [-71.79663, 42.255934], currentUse: 'building', tagline: 'Directly across from 121 — pair them to control the block.', groupId: 'kelley-anchor' },
  { id: 'harding-233', slug: '233-harding-st', address: '233 Harding Street', coords: [-71.7971, 42.25572], currentUse: 'building', tagline: 'Eastern edge of the assemblage, high visibility.', groupId: 'kelley-anchor' },
  { id: 'kelley-1', slug: '1-kelley-square', address: '1 Kelley Square', name: 'Kelley Square Portfolio', addresses: ['1 Kelley Square', '126 Water Street', '233 Harding Street', '& 121-129 Water Street'], coords: [-71.797266, 42.255464], currentUse: 'mixed', tagline: 'Three buildings totaling 47,000 SF of mixed-use on four parcels totaling one acre on the Peanut, including a revenue-generating parking lot with long-term development potential.', groupId: 'kelley-anchor' },
  { id: 'water-56', slug: '56-water-st', address: '56 Water Street', name: 'Water Street Portfolio', addresses: ['56 Water Street', '64 Water Street'], coords: [-71.795574, 42.257178], currentUse: 'mixed', tagline: 'Canal District mainstay with ground-floor retail upside.', groupId: 'water-street' },
  { id: 'water-64', slug: '64-water-st', address: '64 Water Street', coords: [-71.795618, 42.256954], currentUse: 'building', tagline: "Steps from Polar Park's north gate.", groupId: 'water-street' },
  { id: 'lamartine-7', slug: '7-lamartine-st', address: '7½ Lamartine Street', name: 'Lamartine Street Portfolio', addresses: ['7½ Lamartine Street', '13 Lamartine Street'], coords: [-71.799119, 42.25416], currentUse: 'mixed', tagline: 'Two parcels totaling 34,000+ SF of land directly overlooking Polar Park — a development site with two existing buildings and significant redevelopment potential.', groupId: 'lamartine-pair' },
  { id: 'lamartine-13', slug: '13-lamartine-st', address: '13 Lamartine Street', coords: [-71.799571, 42.254247], currentUse: 'building', tagline: 'Contiguous assemblage partner to 7½ Lamartine — combined parcels produce the largest redevelopment footprint on the Lamartine corridor.', groupId: 'lamartine-pair' },
  { id: 'washington-156', slug: '156-washington-st', address: '156 Washington Street', coords: [-71.799521, 42.254325], currentUse: 'parking-lot', tagline: '14,684 SF paved parking lot at the gateway to the Peanut — adjacent to the Lamartine Street Portfolio, within walking distance of Kelley Square and Polar Park.' },
  { id: 'washington-172', slug: '172-washington-st', address: '172 Washington Street', coords: [-71.799741, 42.253529], currentUse: 'parking-lot', tagline: '5,500 SF paved parking lot near 156 Washington — a block-scale assemblage opportunity on the Kelley Square approach.' },
  { id: 'harding-182', slug: '182-harding-st', address: '182 Harding Street', coords: [-71.799771, 42.253119], currentUse: 'parking-lot', tagline: '5,824 SF clean development site steps from Polar Park — pairs with 156/172 Washington and the Lamartine Street Portfolio for a block-scale position.' },
  { id: 'millbury-15', slug: '15-millbury-st', address: '15 Millbury Street', coords: [-71.797903, 42.254154], currentUse: 'parking-lot', tagline: '5,120 SF development parcel on the Kelley Square approach — optionally pairs with 23 and 30 Millbury for a Millbury-corridor position.' },
  { id: 'millbury-23', slug: '23-millbury-st', address: '23 Millbury Street', coords: [-71.798042, 42.253997], currentUse: 'mixed', tagline: '4-story, 18,000+ SF mixed-use building on the Kelley Square approach — fully cash-flowing with 9 residential units.' },
  { id: 'millbury-30', slug: '30-millbury-st', address: '30 Millbury Street', coords: [-71.798481, 42.254072], currentUse: 'building', useLabelOverride: 'Commercial Building', tagline: '16,500 SF masonry building — completes the three-parcel Millbury Street assemblage on the Kelley Square approach.' },
  { id: 'langdon-9', slug: '9-langdon-st', address: '9 Langdon Street', coords: [-71.803938, 42.253442], currentUse: 'parking-lot', tagline: 'One acre-plus of income-generating land in the shadow of Polar Park — the largest contiguous development parcel in the Canal District.' },
]
