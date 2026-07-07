/* ═══════════ TRANSPORTATION ═══════════
   Ported verbatim from the website's Transportation section. */

export type TransitMode = 'Air' | 'Rail' | 'Highway' | 'Bus'

export interface Access {
  mode: TransitMode
  title: string
  distance: string
  body: string
  logo?: string
}

export const MODE_COLOR: Record<TransitMode, string> = {
  Air: '#C0392B',
  Rail: '#1E7A52',
  Highway: '#2C5FA0',
  Bus: '#B55D37',
}

export const ACCESS: Access[] = [
  { mode: 'Air', title: 'Logan International (BOS)', distance: '~45 mi east', logo: '/logos/logan.svg', body: "Boston's primary international gateway and one of the busiest airports in the Northeast — about an hour east via I-90 / Mass Pike outside peak." },
  { mode: 'Air', title: 'Bradley International (BDL)', distance: '~65 mi southwest', logo: '/logos/bradley.svg', body: "Hartford-area's main airport — full domestic network plus select transatlantic service. Roughly 75 minutes via the Mass Pike and I-84." },
  { mode: 'Air', title: 'Worcester Regional (ORH)', distance: '~6 mi west', logo: '/logos/orh.jpg', body: 'JetBlue and other commercial service to Florida and NYC-metro destinations — the best-fit option for Worcester-area passengers.' },
  { mode: 'Rail', title: 'MBTA Commuter Rail', distance: 'Union Station', logo: '/logos/mbta.svg', body: 'MBTA Framingham/Worcester Line to Boston South Station — about a 75-minute ride and the direct link to Greater Boston’s rental market.' },
  { mode: 'Rail', title: 'Amtrak Lake Shore Limited', distance: 'Union Station', logo: '/logos/amtrak.svg', body: 'Daily Amtrak service west to Springfield, Albany, and Chicago; east to Boston. NYC and DC via a South Station transfer.' },
  { mode: 'Rail', title: 'CSX Intermodal Terminal', distance: '~1 mi east', logo: '/logos/csx.svg', body: "Class I freight rail's New England intermodal hub — a $100M facility connecting Worcester to the national container-rail network." },
  { mode: 'Highway', title: 'I-290', distance: 'Kelley Square ramp', logo: '/logos/i290.svg', body: "Central Worcester's spine, linking I-90 / Mass Pike south to I-495 and Route 2 north. The on/off ramp is steps from the portfolio." },
  { mode: 'Highway', title: 'Mass Pike (I-90)', distance: '~5 mi south', logo: '/logos/mass-pike.svg', body: "Massachusetts' east-west tolled spine — direct to Boston one way, Albany and the NYC metro via the I-84 interchange the other." },
  { mode: 'Highway', title: 'Route 146', distance: '~2 mi east', logo: '/logos/ma-route-146.svg', body: 'Direct corridor south to Providence, RI and the I-295 ring — the fastest non-Pike connection to Rhode Island.' },
  { mode: 'Highway', title: 'I-395', distance: '~5 mi south', logo: '/logos/i395.svg', body: "South into Connecticut, meeting I-95 at the coast — Worcester's connection to the New London / Groton submarket." },
  { mode: 'Highway', title: 'I-190', distance: '~3 mi north', logo: '/logos/i190.svg', body: 'North spur off I-290 to Leominster, Fitchburg, and southern New Hampshire — the labor-shed feeder north of the city.' },
  { mode: 'Bus', title: 'WRTA Central Hub', distance: 'Union Station', logo: '/logos/wrta.png', body: "Worcester Regional Transit Authority's downtown hub — fixed-route service connecting the Canal District to employers and schools across Central Mass." },
]
