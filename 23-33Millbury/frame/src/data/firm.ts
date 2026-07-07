/* ═══════════ FIRM DATA (protected, static) ═══════════
   The NPCG roster + offices for Our Team / Our Locations — firm-wide
   canon like the disclaimer, not deal data (deal contacts come from the
   payload). Headshots are baked local copies (the render container can't
   reach northeastpcg.com). */

export interface FirmMember {
  name: string
  title: string
  phone?: string
  email?: string
  photo?: string
  url?: string
}

export const OFFICES = [
  { region: 'Hartford / Springfield', address1: '360 Bloomfield Avenue, Suite 301', address2: 'Windsor, CT 06095', phone: '(860) 414-3750' },
  { region: 'CT / Metro North', address1: '2 Trap Falls Road, Suite 312', address2: 'Shelton, CT 06484', phone: '(203) 692-2420' },
  { region: 'Greater Boston', address1: '300 Washington Street, Suite 351', address2: 'Newton, MA 02458', phone: '(857) 990-6800' },
  { region: 'Southeastern US', address1: 'Southeast Private Client Group', address2: '50 N. Laura Street, Suite 2500 · Jacksonville, FL 32202', phone: '(904) 544-9200' },
  { region: 'Rhode Island', address1: '10 Dorrance Street, Suite 700', address2: 'Providence, RI 02903', phone: '(401) 285-4080' },
  { region: 'New Hampshire', address1: '170 Commerce Way, Suite 200', address2: 'Portsmouth, NH 03801', phone: '(603) 652-1440' },
  { region: 'Hudson Valley', address1: '777 Westchester Ave, Suite 101', address2: 'White Plains, NY 10604', phone: '(914) 940-0500' },
]

// Real lat/lng per office — projected onto the East Coast dot map via
// d3-geo so markers land on actual geography.
export const OFFICE_MARKERS = [
  { key: 'windsor', lat: 41.8526, lng: -72.6437 },
  { key: 'shelton', lat: 41.3165, lng: -73.0932 },
  { key: 'newton', lat: 42.337, lng: -71.2092 },
  { key: 'jacksonville', lat: 30.3322, lng: -81.6557 },
  { key: 'providence', lat: 41.824, lng: -71.4128 },
  { key: 'portsmouth', lat: 43.0718, lng: -70.7626 },
  { key: 'whiteplains', lat: 41.034, lng: -73.7629 },
]

const T = '/photos/team'
const P = 'https://northeastpcg.com/our-team'

export const LEADERSHIP: FirmMember[] = [
  { name: 'Edward Jordan', title: 'CEO & Founder', phone: '857.990.6801', email: 'ejordan@northeastpcg.com', photo: `${T}/edward-jordan.png`, url: `${P}/edward-jordan/` },
  { name: 'Robert Paterno', title: 'Vice President, Brokerage', phone: '203.307.1582', email: 'rpaterno@northeastpcg.com', photo: `${T}/robert-paterno.png`, url: `${P}/robert-paterno/` },
  { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '203.307.1574', email: 'bballetto@northeastpcg.com', photo: `${T}/brad-balletto.jpg`, url: `${P}/bradley-balletto/` },
  { name: 'Taylor Perun', title: 'Senior Vice President, Investments', phone: '203.307.1576', email: 'tperun@northeastpcg.com', photo: `${T}/taylor-perun.png`, url: `${P}/taylor-perun/` },
  { name: 'Jake Jordan', title: 'Vice President, Operations', phone: '203.307.1578', email: 'jjordan@northeastpcg.com', photo: `${T}/jake-jordan.png`, url: `${P}/jake-jordan/` },
]

export const SENIOR_INVESTMENT_SALES: FirmMember[] = [
  { name: 'Francis Saenz', title: 'Vice President, Investments', phone: '857.990.6803', email: 'fsaenz@northeastpcg.com', photo: `${T}/francis-saenz.png`, url: `${P}/francis-saenz/` },
  { name: 'Rich Edwards Jr.', title: 'Vice President, Investments', phone: '203.307.1577', email: 'redwards@northeastpcg.com', photo: `${T}/rich-edwards.png`, url: `${P}/richard-edwards-jr/` },
  { name: 'Jeff Wright', title: 'Vice President, Investments', phone: '203.307.1581', email: 'jwright@northeastpcg.com', photo: `${T}/jeff-wright.png`, url: `${P}/jeff-wright/` },
  { name: 'Drew Kirkland', title: 'Vice President, Investments', phone: '857.990.6802', email: 'dkirkland@northeastpcg.com', photo: `${T}/drew-kirkland.png`, url: `${P}/drew-kirkland/` },
  { name: 'Jim Casey', title: 'Senior Associate', phone: '857.990.6821', email: 'jcasey@northeastpcg.com', photo: `${T}/jim-casey.png`, url: `${P}/jim-casey/` },
]

export const INVESTMENT_SALES: FirmMember[] = [
  { name: 'Patrick Wheeler', title: 'Investment Associate', phone: '857.990.6819', email: 'pwheeler@northeastpcg.com', photo: `${T}/patrick-wheeler.jpg`, url: `${P}/patrick-wheeler-investment-associate/` },
  { name: 'Karl Hasselrot', title: 'Investment Associate', phone: '203.677.0340', email: 'khasselrot@northeastpcg.com', photo: `${T}/karl-hasselrot.jpg`, url: `${P}/karl-hasselrot/` },
  { name: 'Derek Mahabir', title: 'Investment Associate', phone: '203.751.1187', email: 'dmahabir@northeastpcg.com', photo: `${T}/derek-mahabir.jpg`, url: `${P}/derek-mahabir/` },
  { name: 'Tom Egbers', title: 'Associate', phone: '857.990.2022', email: 'tegbers@northeastpcg.com', photo: `${T}/tom-egbers.jpg`, url: `${P}/tom-egbers-associate/` },
  { name: 'Anthony Rakauskas', title: 'Associate', phone: '857.990.6807', email: 'arakauskas@northeastpcg.com', photo: `${T}/anthony-rakauskas.png`, url: `${P}/anthony-rakauskas/` },
  { name: 'Collin Murphy', title: 'Associate', phone: '203.307.1580', email: 'cmurphy@northeastpcg.com', photo: `${T}/collin-murphy.jpg`, url: `${P}/collin-murphy/` },
  { name: 'Joe Ferrandino', title: 'Associate', phone: '914.440.0908', email: 'jferrandino@northeastpcg.com', photo: `${T}/joe-ferrandino.jpg`, url: `${P}/joe-ferrandino-2/` },
]
