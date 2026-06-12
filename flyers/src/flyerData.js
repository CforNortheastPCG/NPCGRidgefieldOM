/* ═══════════════════ FLYER DATA ═══════════════════
   Per-property flyer content. The FLYERS map is AUTO-GENERATED from the
   Worwebsite project (src/data/properties.ts + parcels.json) by
   Worwebsite/tools/gen-flyers.ts — regenerate it there, not here.
   Photos: Cloudflare R2 public bucket. Parcel outlines: Google Static Map.
*/

export const R2 = 'https://pub-c23015e950e74bf2a7068de2409e26d1.r2.dev'
export const photo = (key) => `${R2}/${key.replace(/^\/+/, '')}`

export const FIRM_BIO =
  'Northeast Private Client Group is a relationship-driven investment real estate firm delivering institutional-level expertise, service, and value to private investors of multifamily, mixed-use, and retail real estate.'

const U = 'https://northeastpcg.com/wp-content/uploads'
export const BROKERS = [
  { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '(203) 307-1574', email: 'bballetto@northeastpcg.com', photo: `${U}/2021/11/Brad-B-2-430x488.jpg` },
  { name: 'Taylor Perun', title: 'Senior Vice President, Investments', phone: '(203) 307-1576', email: 'tperun@northeastpcg.com', photo: `${U}/2021/11/Taylor-Perun-430x488.png` },
  { name: 'Tim McGeary', title: 'Vice President, Investments', phone: '(857) 990-6804', email: 'tmcgeary@northeastpcg.com', photo: `${U}/2021/11/Tim-McGeary-430x488.png` },
]

export { FLYERS } from './flyers.generated.js'
