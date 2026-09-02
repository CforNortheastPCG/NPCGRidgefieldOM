/* ═══════════════════ ASSET-CLASS VOCABULARY ═══════════════════
   Everything class-dependent keys off this one table: the display label,
   the noun for a leasable space (table headers, tiles, mix cards), whether
   a per-space price is a real metric, and which rent roll the deck renders.

   Components read VOCAB. They never hardcode "Unit" — a retail BOV that
   calls a suite a unit reads as a multifamily deck with the words swapped,
   which is exactly what this layer exists to prevent.

   The table matches the OM frame's ASSET_CLASS (npcgstudio/frame,
   scripts/inject.mjs) so the two products name things identically; `roll`
   is the BOV's own addition, because a BOV renders the rent roll itself
   rather than receiving it pre-shaped. */

import type { AssetClass, VocabData } from './types.ts'
import { ASSET_CLASS } from '../data/deal.ts'

const TABLE: Record<AssetClass, VocabData> = {
  multifamily: {
    label: 'Multifamily',
    unit: 'Unit',
    units: 'Units',
    mixTitle: 'Unit Mix',
    perUnitPrice: true,
    roll: 'residential',
  },
  // A room is never called a unit; per-room price IS a real metric.
  sro: {
    label: 'SRO',
    unit: 'Room',
    units: 'Rooms',
    mixTitle: 'Room Mix',
    perUnitPrice: true,
    roll: 'residential',
  },
  'mixed-use': {
    label: 'Mixed-Use',
    unit: 'Unit',
    units: 'Units',
    mixTitle: 'Unit Mix',
    perUnitPrice: true,
    roll: 'both',
  },
  retail: {
    label: 'Retail',
    unit: 'Suite',
    units: 'Suites',
    mixTitle: 'Tenancy Mix',
    // Retail trades on $/SF and cap rate. A price per suite is noise.
    perUnitPrice: false,
    roll: 'commercial',
  },
  office: {
    label: 'Multi-Tenant Office',
    unit: 'Suite',
    units: 'Suites',
    mixTitle: 'Tenancy Mix',
    perUnitPrice: false,
    roll: 'commercial',
  },
  industrial: {
    label: 'Industrial',
    unit: 'Unit',
    units: 'Units',
    mixTitle: 'Tenancy Mix',
    // Small-bay industrial does trade per unit; the metric stays.
    perUnitPrice: true,
    roll: 'commercial',
  },
}

export const VOCAB: VocabData = TABLE[ASSET_CLASS]

/** True when the deck carries a lease-by-lease commercial roll. */
export const IS_COMMERCIAL = VOCAB.roll === 'commercial' || VOCAB.roll === 'both'
/** True when the deck carries a residential unit roll. */
export const IS_RESIDENTIAL = VOCAB.roll === 'residential' || VOCAB.roll === 'both'
