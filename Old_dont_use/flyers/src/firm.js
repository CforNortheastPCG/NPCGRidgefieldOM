/* ═══════════════════ FIRM DATA ═══════════════════
   Single source of truth for the Our Locations + Our Team pages.
   Transcribed from "Contact Pages.pdf".

   Headshots: drop files in public/photos/team/ and set `photo` to
   e.g. '/photos/team/edward-jordan.png'. Until then, members render
   with an initials placeholder avatar, so the page is complete now.
*/

export const OFFICES = [
  { region: 'Hartford / Springfield', address1: '360 Bloomfield Avenue, Suite 301', address2: 'Windsor, CT 06095', phone: '(860) 414-3750' },
  { region: 'CT / Metro North', address1: '2 Trap Falls Road, Suite 312', address2: 'Shelton, CT 06484', phone: '(203) 692-2420' },
  { region: 'Greater Boston', address1: '300 Washington Street, Suite 351', address2: 'Newton, MA 02458', phone: '(857) 990-6800' },
  { region: 'Southeastern US', address1: 'Southeast Private Client Group', address2: '50 N. Laura Street, Suite 2500 · Jacksonville, FL 32202', phone: '(904) 544-9200' },
  { region: 'Rhode Island', address1: '10 Dorrance Street, Suite 700', address2: 'Providence, RI 02903', phone: '(401) 285-4080' },
  { region: 'New Hampshire', address1: '170 Commerce Way, Suite 200', address2: 'Portsmouth, NH 03801', phone: '(603) 652-1440' },
  { region: 'Hudson Valley', address1: '777 Westchester Ave, Suite 101', address2: 'White Plains, NY 10604', phone: '(914) 940-0500' },
]

// Real lat/lng per office, projected onto the East Coast map via d3-geo so
// markers land on actual geography rather than eyeballed percentages.
export const OFFICE_MARKERS = [
  { key: 'windsor', lat: 41.8526, lng: -72.6437 },     // Hartford/Springfield (Windsor, CT)
  { key: 'shelton', lat: 41.3165, lng: -73.0932 },     // CT/Metro North (Shelton, CT)
  { key: 'newton', lat: 42.3370, lng: -71.2092 },      // Greater Boston (Newton, MA)
  { key: 'jacksonville', lat: 30.3322, lng: -81.6557 },// Southeastern US (Jacksonville, FL)
  { key: 'providence', lat: 41.8240, lng: -71.4128 },  // Rhode Island (Providence, RI)
  { key: 'portsmouth', lat: 43.0718, lng: -70.7626 },  // New Hampshire (Portsmouth, NH)
  { key: 'whiteplains', lat: 41.0340, lng: -73.7629 }, // Hudson Valley (White Plains, NY)
]

const U = 'https://northeastpcg.com/wp-content/uploads'
const P = 'https://northeastpcg.com/our-team'

export const LEADERSHIP = [
  { name: 'Edward Jordan', title: 'CEO & Founder', phone: '857.990.6801', email: 'ejordan@northeastpcg.com', photo: `${U}/2021/10/ChatGPT-Image-Feb-17-2026-04_28_06-PM-430x488.png`, url: `${P}/edward-jordan/` },
  { name: 'Robert Paterno', title: 'Vice President, Brokerage', phone: '203.307.1582', email: 'rpaterno@northeastpcg.com', photo: `${U}/2021/11/Robert-Paterno-430x488.png`, url: `${P}/robert-paterno/` },
  { name: 'Brad Balletto', title: 'Managing Director, Investments', phone: '203.307.1574', email: 'bballetto@northeastpcg.com', photo: `${U}/2021/11/Brad-B-2-430x488.jpg`, url: `${P}/bradley-balletto/` },
  { name: 'Jake Jordan', title: 'Vice President, Operations', phone: '203.307.1578', email: 'jjordan@northeastpcg.com', photo: `${U}/2021/11/Jake-Jordan-430x488.png`, url: `${P}/jake-jordan/` },
  { name: 'Taylor Perun', title: 'Senior Vice President, Investments', phone: '203.307.1576', email: 'tperun@northeastpcg.com', photo: `${U}/2021/11/Taylor-Perun-430x488.png`, url: `${P}/taylor-perun/` },
]

export const SENIOR_INVESTMENT_SALES = [
  { name: 'Tim McGeary', title: 'Vice President, Investments', phone: '857.990.6804', email: 'tmcgeary@northeastpcg.com', photo: `${U}/2021/11/Tim-McGeary-430x488.png`, url: `${P}/tim-mcgeary/` },
  { name: 'Francis Saenz', title: 'Vice President, Investments', phone: '857.990.6803', email: 'fsaenz@northeastpcg.com', photo: `${U}/2021/11/Francis-Saenz-430x488.png`, url: `${P}/francis-saenz/` },
  { name: 'Rich Edwards Jr.', title: 'Vice President, Investments', phone: '203.307.1577', email: 'redwards@northeastpcg.com', photo: `${U}/2021/11/Richard-Edwards-430x488.png`, url: `${P}/richard-edwards-jr/` },
  { name: 'Jeff Wright', title: 'Vice President, Investments', phone: '203.307.1581', email: 'jwright@northeastpcg.com', photo: `${U}/2021/11/Jeff-Wright-430x488.png`, url: `${P}/jeff-wright/` },
  { name: 'Drew Kirkland', title: 'Vice President, Investments', phone: '857.990.6802', email: 'dkirkland@northeastpcg.com', photo: `${U}/2021/11/Drew-Kirkland-430x488.png`, url: `${P}/drew-kirkland/` },
  { name: 'Jim Casey', title: 'Senior Associate', phone: '857.990.6821', email: 'jcasey@northeastpcg.com', photo: `${U}/2021/11/Jim-Casey-430x488.png`, url: `${P}/jim-casey/` },
]

export const INVESTMENT_SALES = [
  { name: 'Patrick Wheeler', title: 'Investment Associate', phone: '857.990.6819', email: 'pwheeler@northeastpcg.com', photo: `${U}/2024/02/patrick-430x488.jpg`, url: `${P}/patrick-wheeler-investment-associate/` },
  { name: 'Karl Hasselrot', title: 'Investment Associate', phone: '203.677.0340', email: 'khasselrot@northeastpcg.com', photo: `${U}/2023/07/Karl83-430x488.jpg`, url: `${P}/karl-hasselrot/` },
  { name: 'Derek Mahabir', title: 'Investment Associate', phone: '203.751.1187', email: 'dmahabir@northeastpcg.com', photo: `${U}/2023/12/Derek-Mahabir-002-430x488.jpg`, url: `${P}/derek-mahabir/` },
  { name: 'Tom Egbers', title: 'Associate', phone: '857.990.2022', email: 'tegbers@northeastpcg.com', photo: `${U}/2024/02/tom-430x488.jpg`, url: `${P}/tom-egbers-associate/` },
  { name: 'Anthony Rakauskas', title: 'Associate', phone: '857.990.6807', email: 'arakauskas@northeastpcg.com', photo: `${U}/2025/01/Untitled-design-1-430x488.png`, url: `${P}/anthony-rakauskas/` },
  { name: 'Collin Murphy', title: 'Associate', phone: '203.307.1580', email: 'cmurphy@northeastpcg.com', photo: `${U}/2025/04/Collin-Murphy-430x488.jpg`, url: `${P}/collin-murphy/` },
  { name: 'Joe Ferrandino', title: 'Associate', phone: '914.440.0908', email: 'jferrandino@northeastpcg.com', photo: `${U}/2025/08/joe-headshot-430x488.jpg`, url: `${P}/joe-ferrandino-2/` },
]

export const SUPPORT_STAFF = [
  { name: 'Rebecca Hope', title: 'Marketing Associate', phone: '203.997.0162', email: 'rhope@northeastpcg.com' },
  { name: 'Cameron Formica', title: 'Transaction Coordinator', phone: '860.414.3753', email: 'cformica@northeastpcg.com' },
  { name: 'Kaylee Bollman', title: 'Junior Graphic Designer', phone: '857.396.0774', email: 'kbollmann@northeastpcg.com' },
  { name: 'Ravi Patel', title: 'CRE Analyst', phone: '203.307.1575', email: 'rpatel@northeastpcg.com' },
]
