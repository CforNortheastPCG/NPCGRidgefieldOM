import type { LocationMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
// Curate REAL nearby anchors (research them): everyday retail, employment
// anchors (hospitals, universities, major employers), civic landmarks,
// transit. Items with an address get a numbered map pin automatically.
export const LOCATION_MAP: LocationMapContent = {
  generated: false,
  intro: 'A curated amenity directory has not been authored for this offering.',
  categories: [],
}
