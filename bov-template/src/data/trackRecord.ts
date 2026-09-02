/* ═══════════════════ EDIT-ME · OUR TRACK RECORD ═══════════════════
   NPCG closed transactions in THIS deal's market — the proof-of-execution
   page. Hand-author from the Salesforce closed-deal pipeline (report
   "Closed Deal Pipeline 2014 - Present"); verify cities and unit counts
   against CRM property records. Totals and price/unit are COMPUTED.
   `units: null` renders an em dash where the CRM doesn't track a count. */

export const TRACK_RECORD = {
  // Market label used in the page title ("Recent Closings — {marketLabel}").
  marketLabel: 'Greater Anytown', // SAMPLE — replace (e.g. "Greater Lowell")
  // Intro sentence context: since-year + how close to the subject.
  sinceYear: 2019,               // SAMPLE — replace
  proximity: 'within a fifteen-minute drive of the subject', // SAMPLE — replace
  deals: [ // SAMPLE — replace with real closings from Salesforce
    { address: '11-15 Sample Avenue', city: 'Anytown', units: 8, price: 1777050, closed: 'Jul 2026', broker: 'Sample Broker' },
    { address: '340 Placeholder Street', city: 'Nearville', units: 11, price: 1300000, closed: 'Jul 2025', broker: 'Sample Broker' },
    { address: '499 Specimen Street', city: 'Nearville', units: 9, price: 950000, closed: 'May 2024', broker: 'Sample Broker' },
    { address: '375-379 Example Street', city: 'Anytown', units: 8, price: 1970000, closed: 'Dec 2022', broker: 'Sample Broker' },
    { address: '80 Model Street', city: 'Otherton', units: 12, price: 2505000, closed: 'Jul 2022', broker: 'Sample Broker' },
    { address: '604 Template Road', city: 'Anytown', units: 8, price: 3126000, closed: 'Jan 2022', broker: 'Sample Broker' },
    { address: '129 Instance Street', city: 'Anytown', units: 17, price: 2150000, closed: 'Jun 2020', broker: 'Sample Broker' },
    { address: 'Anytown Portfolio', city: 'Anytown', units: null, price: 1725000, closed: 'Jan 2019', broker: 'Sample Broker' },
  ],
  sourceNote: 'Source: NPCG closed-transaction records. Unit counts per firm CRM property records.', // update the pull date when refreshed
}
