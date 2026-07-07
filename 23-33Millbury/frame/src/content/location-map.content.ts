import type { LocationMapContent } from './types.ts'

// AGENT-WRITABLE. Set generated: true when authored for this deal.
// Curate REAL nearby anchors (research them): everyday retail, employment
// anchors (hospitals, universities, major employers), civic landmarks,
// transit. Items with an address get a numbered map pin automatically.
export const LOCATION_MAP: LocationMapContent = {
  generated: true,
  intro:
    "The property sits in the Canal District, immediately south of Kelley Square — the most heavily reinvested neighborhood in Worcester. Polar Park, the Worcester Public Market, and more than 80 restaurants and shops sit within a short walk. The employers and schools that anchor the city — UMass Memorial, Saint Vincent Hospital, WPI, Holy Cross, and Clark University — ring the district within minutes. Union Station and the I-290 Kelley Square ramp put regional rail and highway access at the doorstep.",
  categories: [
    {
      heading: 'Employment & Anchors',
      items: [
        { name: 'UMass Memorial Medical Center', note: 'Largest employer in Central MA · 13,000+', address: 'UMass Memorial Medical Center, Worcester, MA' },
        { name: 'Saint Vincent Hospital', note: 'Regional hospital & trauma center · 381 beds', address: '123 Summer St, Worcester, MA' },
        { name: 'Hanover Insurance', note: 'Fortune 500 headquarters · 4,000+ local', address: '440 Lincoln St, Worcester, MA' },
        { name: 'City of Worcester', note: 'Municipal government & schools · 6,000+', address: '455 Main St, Worcester, MA' },
        { name: 'AbbVie', note: 'Fortune 500 biologics campus · 1,000+ local' },
        { name: 'Fallon Health', note: 'Worcester-based health insurer · local HQ' },
      ],
    },
    {
      heading: 'Education',
      items: [
        { name: 'Worcester Polytechnic (WPI)', note: 'Top-ranked engineering · 6,700 students', address: '100 Institute Rd, Worcester, MA' },
        { name: 'College of the Holy Cross', note: 'Elite liberal arts · 3,000 students', address: '1 College St, Worcester, MA' },
        { name: 'Clark University', note: 'Research university · 3,500 students', address: '950 Main St, Worcester, MA' },
        { name: 'UMass Chan Medical School', note: 'Nobel-winning research institution', address: '55 Lake Ave North, Worcester, MA' },
        { name: 'Quinsigamond Community College', note: "Central MA's largest CC · 7,000 students" },
        { name: 'MCPHS Worcester', note: 'Pharmacy & health sciences campus' },
      ],
    },
    {
      heading: 'Dining & Culture',
      items: [
        { name: 'Polar Park', note: 'Home of the WooSox · opened 2021', address: 'Polar Park, Worcester, MA' },
        { name: 'Worcester Public Market', note: 'Indoor market hall · Harding Green', address: '160 Green St, Worcester, MA' },
        { name: 'Hanover Theatre', note: '1904 movie palace · 2,300 seats', address: '2 Southbridge St, Worcester, MA' },
        { name: 'DCU Center', note: "Region's largest arena · 14,800", address: '50 Foster St, Worcester, MA' },
        { name: 'Lock 50', note: 'Modern American on Water St · next door' },
        { name: 'Wormtown Brewery', note: 'Flagship Canal District brewery' },
      ],
    },
    {
      heading: 'Transit & Retail',
      items: [
        { name: 'Worcester Union Station', note: 'Amtrak + MBTA rail to Boston', address: 'Worcester Union Station, Worcester, MA' },
        { name: 'I-290 / Kelley Square Ramp', note: 'Direct highway access on-site' },
        { name: 'Worcester Regional Airport (ORH)', note: 'Commercial air · ~6 mi west', address: '375 Airport Dr, Worcester, MA' },
        { name: 'Walmart Supercenter', note: 'Full-line retail & grocery · Greendale', address: '25 Tobias Boland Way, Worcester, MA' },
        { name: 'Target — Lincoln Plaza', note: 'Closest Target to downtown' },
        { name: 'WRTA Central Hub', note: 'Regional bus hub at Union Station' },
      ],
    },
  ],
}
