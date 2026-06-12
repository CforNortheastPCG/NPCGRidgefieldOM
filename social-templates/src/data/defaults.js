export const categories = [
  { id: 'listing', label: 'New Listing' },
  { id: 'just-sold', label: 'Just Sold' },
  { id: 'broker-spotlight', label: 'Broker Spotlight' },
];

export const platforms = [
  { id: 'linkedin', label: 'LinkedIn', width: 1200, height: 1200 },
  { id: 'instagram', label: 'Instagram', width: 1080, height: 1080 },
  { id: 'linkedin-wide', label: 'LinkedIn Wide', width: 1200, height: 627 },
];

export const templateStylesByCategory = {
  listing: [
    { id: 'listing-standard', label: 'Standard' },
  ],
  'just-sold': [
    { id: 'sold-standard', label: 'Standard' },
  ],
  'broker-spotlight': [
    { id: 'spotlight', label: 'Broker Spotlight' },
  ],
};

// Approved Action lines
export const actionLines = [
  'COMING SOON',
  'EXCLUSIVE NEW LISTING',
  'NEW LISTING',
  'EXCLUSIVE LISTING',
  'PRICE REDUCTION',
  'UPDATED FINANCIALS',
  'NOW TOURING',
  'JUST SOLD',
];

// Interest Generator suggestions
export const interestGeneratorExamples = [
  'X-Unit Value Add Opportunity',
  'X-SF Retail Plaza',
  'X-SF Turn Key Asset',
  'X-Unit Multifamily Portfolio',
  'X-SF Boutique Multifamily Opportunity',
  'X% Cap Rate Opportunity',
  'Legacy Ownership',
];

// Color themes for text/logo visibility on different photos
export const colorThemes = [
  { id: 'light-on-dark', label: 'Light (White text)', action: '#B55D37', interest: '#FFFFFF', address: '#FFFFFF', logo: 'white', fade: 'dark', slideBg: '#3F4753', slideText: '#FFFFFF' },
  { id: 'dark-on-light', label: 'Dark (Carbon text)', action: '#B55D37', interest: '#3F4753', address: '#3F4753', logo: 'color', fade: 'linen', slideBg: '#F6F2EE', slideText: '#3F4753' },
  { id: 'gold-on-dark', label: 'Gold Accent', action: '#F8971D', interest: '#FFFFFF', address: '#F8971D', logo: 'white', fade: 'dark', slideBg: '#281B12', slideText: '#FFFFFF' },
  { id: 'white-clean', label: 'White Clean', action: '#B55D37', interest: '#FFFFFF', address: '#FFFFFF', logo: 'white', fade: 'none', slideBg: '#3F4753', slideText: '#FFFFFF' },
  { id: 'linen-soft', label: 'Linen Soft', action: '#B55D37', interest: '#3F4753', address: '#FFFFFF', logo: 'white', fade: 'linen', slideBg: '#3F4753', slideText: '#FFFFFF' },
];

export const defaultBroker = { name: '', title: '', phone: '', email: '', headshot: null };

export const defaultPost = {
  category: 'listing',
  platform: 'linkedin',
  templateStyle: 'listing-standard',
  colorTheme: 'linen-soft',
  includeContactSlide: false,

  // Image fields
  action: 'EXCLUSIVE NEW LISTING',
  interestGenerator: '',
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyPhoto: null,

  // Caption fields
  propertyType: '',
  propertyDetails: '',
  brokers: [{ ...defaultBroker }],

  // Just Sold extras
  salePrice: '',

  // Broker Spotlight fields
  spotlightName: '',
  spotlightTitle: '',
  spotlightPhone: '',
  spotlightEmail: '',
  spotlightHeadshot: null,
  spotlightBio: '',
  spotlightCredentials: '',
  spotlightSpecialties: '',
  spotlightYearsExp: '',
  spotlightDealsNote: '',
};
