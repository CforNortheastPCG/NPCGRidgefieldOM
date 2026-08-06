/* ═══════════════════ EDIT-ME · OUR TRACK RECORD ═══════════════════
   NPCG closed transactions in THIS deal's market — the proof-of-execution
   page. Hand-author from the Salesforce closed-deal pipeline (report
   "Closed Deal Pipeline 2014 - Present"); verify cities and unit counts
   against CRM property records. Totals and price/unit are COMPUTED.
   `units: null` renders an em dash where the CRM doesn't track a count.

   PULLED: 08.03.2026 from Salesforce (TTL_Core__Deal__c, Status = Closed,
   linked property city in the New Haven / West Haven submarket).
   ⚠ Broker attribution is NOT in that pull — confirm the lead broker on each
   row before this goes to the client. */

export const TRACK_RECORD = {
  // Market label used in the page title ("Recent Closings — {marketLabel}").
  marketLabel: 'West Haven & Greater New Haven',
  // Intro sentence context: since-year + how close to the subject.
  sinceYear: 2023,
  proximity: 'nearly all of it within a fifteen-minute drive of the subject',
  deals: [
    { address: 'Norton Pointe Apartments', city: 'New Haven', units: 41, price: 6155000, closed: 'Jun 2026', broker: 'NPCG' },
    { address: 'Embassy Apartments', city: 'New Haven', units: 33, price: 5200000, closed: 'Apr 2026', broker: 'NPCG' },
    { address: 'Fair Haven Heights Portfolio', city: 'New Haven', units: 46, price: 6425000, closed: 'Dec 2025', broker: 'NPCG' },
    { address: '295 Elm Street — Elm Street Apartments', city: 'West Haven', units: 40, price: 5242500, closed: 'Jun 2025', broker: 'NPCG' },
    { address: '182 Elm Street', city: 'West Haven', units: 19, price: 2375000, closed: 'Jan 2025', broker: 'NPCG' },
    { address: 'Crestview Apartments', city: 'West Haven', units: 63, price: 8250000, closed: 'Jan 2025', broker: 'NPCG' },
    { address: '46-54 Orchard Street', city: 'New Haven', units: 10, price: 1620000, closed: 'Jul 2024', broker: 'NPCG' },
    { address: '16-20 Edgar Ave & 495-511 Howard Ave', city: 'New Haven', units: 12, price: 1870000, closed: 'Nov 2023', broker: 'NPCG' },
  ],
  sourceNote: 'Source: NPCG closed-transaction records, pulled 08.03.2026; unit counts per firm CRM property records. The three West Haven closings above traded between $125,000 and $131,000 per unit — the range that most directly informs the subject’s conclusion.',
}
