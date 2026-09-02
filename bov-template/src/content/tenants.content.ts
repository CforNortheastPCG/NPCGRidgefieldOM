import type { TenantProfilesContent } from './types.ts'

/* AUTHORED PROSE for the Tenant Profiles page (commercial decks only).
   Keyed to the tenant names in src/data/commercialRoll.ts. */
export const TENANT_PROFILES: TenantProfilesContent = {
  generated: false, // SAMPLE COPY — flip to true once authored for this deal
  lead:
    'The rent roll is carried by tenants with reason to renew: a pharmacy anchor a decade into a location it built out, and three local operators with established trade in the center.', // SAMPLE — replace
  profiles: [ // SAMPLE — replace
    {
      tenant: 'Anchor Pharmacy',
      body: 'Regional pharmacy chain, in occupancy since 2019 on a triple-net lease running to 2029 with two five-year options. Occupies 37% of the center and paid for its own build-out, including the drive-through window.',
    },
    {
      tenant: 'Corner Café',
      body: 'Owner-operated quick-service restaurant, six years in the center, with a full kitchen fit-out at tenant expense. Rent is the highest in the center at $26.00 per SF on a 3% annual escalation.',
    },
    {
      tenant: 'Valley Dental',
      body: 'Four-operatory dental practice with substantial plumbing and cabinetry investment in place. The lease runs to August 2026 with one five-year option — a renewal a buyer should expect to negotiate early.',
    },
  ],
}
