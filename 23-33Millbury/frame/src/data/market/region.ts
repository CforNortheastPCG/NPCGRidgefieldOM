/* ═══════════ REGIONAL CONTEXT ═══════════
   Ported from the website's Region section ("A Northeast story — anchors,
   not bets"). Anchors drive the regional map markers; stats, narrative,
   travel times, and why-invest pillars drive the facing copy. */

export type AnchorType = 'subject' | 'city' | 'academic' | 'industry' | 'airport'

export interface Anchor {
  name: string
  coords: [number, number] // [lng, lat]
  type: AnchorType
  sub?: string
  miles?: number
  drive?: string
  train?: string
}

export const ANCHOR_COLOR: Record<AnchorType, string> = {
  subject: '#F8971D',
  city: '#2A303A',
  academic: '#7B6CF6',
  industry: '#4A90E2',
  airport: '#14B8A6',
}

export const ANCHORS: Anchor[] = [
  { name: 'Worcester', coords: [-71.8024, 42.2626], type: 'subject' },
  { name: 'Boston', coords: [-71.0589, 42.3601], type: 'city', miles: 45, drive: '1 hr', train: '1 hr 15 min' },
  { name: 'Providence', coords: [-71.4128, 41.824], type: 'city', miles: 45, drive: '45 min' },
  { name: 'Hartford', coords: [-72.6734, 41.7658], type: 'city', miles: 65, drive: '1 hr 15 min' },
  { name: 'Springfield', coords: [-72.5898, 42.1015], type: 'city', miles: 50, drive: '50 min', train: '50 min' },
  { name: 'Portland', coords: [-70.2568, 43.6591], type: 'city', miles: 160, drive: '2 hr 30 min' },
  { name: 'Albany', coords: [-73.7562, 42.6526], type: 'city', miles: 120, drive: '2 hr 15 min', train: '3 hr' },
  { name: 'New York', coords: [-74.006, 40.7128], type: 'city', miles: 175, drive: '3 hr' },
  { name: 'Keene, NH', coords: [-72.2784, 42.9337], type: 'city', miles: 70, drive: '1 hr 20 min' },
  { name: 'Nashua, NH', coords: [-71.4676, 42.7654], type: 'city', miles: 50, drive: '1 hr' },
  { name: 'Berkshires', coords: [-73.2454, 42.4501], type: 'city', sub: 'Pittsfield, MA', miles: 95, drive: '1 hr 45 min' },
  { name: 'Yale', coords: [-72.9223, 41.3163], type: 'academic', sub: 'New Haven' },
  { name: 'Dartmouth', coords: [-72.2887, 43.7044], type: 'academic', sub: 'Hanover, NH' },
  { name: 'Amherst', coords: [-72.5199, 42.3732], type: 'academic', sub: 'UMass + 5 Colleges' },
  { name: 'West Point', coords: [-73.9556, 41.3915], type: 'academic', sub: 'U.S. Military Academy, NY' },
  { name: 'Electric Boat', coords: [-72.0839, 41.3556], type: 'industry', sub: 'Groton, CT' },
  { name: 'Bath Iron Works', coords: [-69.8089, 43.9156], type: 'industry', sub: 'Bath, ME' },
  { name: 'Sikorsky', coords: [-73.1443, 41.1573], type: 'industry', sub: 'Stratford, CT' },
  { name: 'Raytheon', coords: [-71.1372, 42.6583], type: 'industry', sub: 'Andover, MA' },
  { name: 'Hanscom AFB', coords: [-71.2892, 42.4702], type: 'industry', sub: 'Bedford, MA' },
  { name: 'CVS Health', coords: [-71.5139, 42.0031], type: 'industry', sub: 'Woonsocket, RI' },
  { name: 'TJX Companies', coords: [-71.4211, 42.3001], type: 'industry', sub: 'Framingham, MA' },
  { name: 'Boston Scientific', coords: [-71.5523, 42.3459], type: 'industry', sub: 'Marlborough, MA' },
  { name: 'Biogen / Moderna', coords: [-71.09, 42.38], type: 'industry', sub: 'Cambridge, MA' },
  { name: 'BOS', coords: [-71.0096, 42.3656], type: 'airport', sub: 'Boston Logan' },
  { name: 'BDL', coords: [-72.6831, 41.9389], type: 'airport', sub: 'Bradley Intl. (Hartford)' },
  { name: 'MHT', coords: [-71.4357, 42.9326], type: 'airport', sub: 'Manchester-Boston' },
  { name: 'PVD', coords: [-71.4283, 41.724], type: 'airport', sub: 'TF Green (Providence)' },
]

export const WORCESTER_STATS = [
  { value: '206K+', label: 'Population' },
  { value: '#2', label: 'Largest city in New England' },
  { value: '7', label: 'Colleges & universities' },
  { value: '$4B+', label: 'Healthcare economy' },
]

export const REGIONAL_STATS = [
  { value: '7M', label: 'People in Massachusetts' },
  { value: '30M+', label: 'Within a 3-hour drive' },
  { value: '500K+', label: 'College students in range' },
  { value: '4', label: 'Intl. airports within 3 hr' },
]

export const NARRATIVE_BLOCKS = [
  {
    title: "Anchors don't move",
    body: 'Harvard (1636), MIT, Mass General, the Ivy League, the UMass system, and the seven colleges inside Worcester. Centuries of institutional fabric — not replicable through new construction.',
  },
  {
    title: 'Talent stays',
    body: 'Roughly 500,000 college students live within a 3-hour drive of Worcester — across the Ivy-plus core, the UMass system, and a deep ring of regional research and liberal-arts schools. The graduates settle along the same corridor that educated them.',
  },
  {
    title: 'Life stays',
    body: 'Family suburbs with top-ranked public schools 30 minutes out in every direction. Cape Cod and Newport beaches within 90. Berkshires west, Vermont and New Hampshire ski country a morning north, the Maine coast a straight shot east.',
  },
]

export const STABILITY_POINTS = [
  { title: 'Diversified economy', body: 'Healthcare, finance, biotech, insurance, defense, and higher-ed each anchor mature, multi-decade industries. No single-sector exposure.' },
  { title: 'Rail-linked to Boston', body: 'Direct MBTA commuter rail to South Station — roughly 75 minutes door-to-door. Worcester captures Boston-market demand at Worcester pricing.' },
  { title: 'Infrastructure already built', body: 'Interstates, commuter rail, and four international airports already in place. No reliance on speculative buildout to make the math work.' },
  { title: 'Durable demand', body: "Institutions don't relocate. The schools, hospitals, and military bases anchoring the region have been here for a century." },
  { title: 'Ahead of the Providence curve', body: 'Providence repriced on the back of universities and downtown investment. Worcester has more institutions and a larger base, earlier on the same curve.' },
]

/** City drive/train times, sorted by distance — the travel-times panel. */
export const DRIVE_TIMES = ANCHORS.filter((a) => a.type === 'city' && a.drive).sort((a, b) => (a.miles ?? 0) - (b.miles ?? 0))
