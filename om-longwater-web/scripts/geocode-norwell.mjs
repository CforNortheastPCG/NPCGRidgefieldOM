/* One-off: geocode the expanded Norwell-area amenity set for amenities.js COORDS.
   Uses the Google Geocoding API key in .env.local. Prints key, [lat,lng], and the
   geocoder precision so imprecise hits can be caught. Run: node scripts/geocode-norwell.mjs */
import { readFileSync } from 'node:fs'
const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const KEY = (env.match(/AIza[\w-]+/) || [])[0]
if (!KEY) throw new Error('no key')

// key → geocode query (street addresses preferred; business names fall back to town)
const Q = {
  // property
  'PROPERTY': '120 Longwater Drive, Norwell, MA 02061',
  // Dining & Coffee
  'TinkersSon': "The Tinker's Son, 707 Main St, Norwell, MA 02061",
  'BBC': 'British Beer Company, 15 Columbia Rd, Pembroke, MA 02359',
  'Dunkin': 'Dunkin, 91 Washington St, Norwell, MA 02061',
  'Panera': 'Panera Bread, 1790 Washington St, Hanover, MA 02339',
  'ScarletOak': 'Scarlet Oak Tavern, 1217 Main St, Hingham, MA 02043',
  'Alba': 'Alba on 53, 2053 Washington St, Hanover, MA 02339',
  'Burtons': 'Burtons Grill, 94 Derby St, Hingham, MA 02043',
  // Grocery & Pharmacy
  'StopShop': '468 Washington St, Norwell, MA 02061',
  'BigY': 'Big Y, 10 Washington St, Norwell, MA 02061',
  'CVS': 'CVS Pharmacy, 2 Pond St, Norwell, MA 02061',
  'WholeFoods': 'Whole Foods Market, 94 Derby St, Hingham, MA 02043',
  'TraderJoes': "Trader Joe's, 1 Derby St, Hingham, MA 02043",
  // Shopping & Retail
  'DerbyStreet': 'Derby Street Shops, 100 Derby St, Hingham, MA 02043',
  'HanoverCrossing': 'Hanover Crossing, 1775 Washington St, Hanover, MA 02339',
  'QueenAnnes': "Queen Anne's Plaza, 10 Washington St, Norwell, MA 02061",
  'Target': 'Target, 1167 Washington St, Hanover, MA 02339',
  'MarketBasket': 'Market Basket, 1801 Washington St, Hanover, MA 02339',
  // Healthcare & Civic
  'SSHNorwell': 'South Shore Health, 143 Longwater Dr, Norwell, MA 02061',
  'SSHospital': 'South Shore Hospital, 55 Fogg Rd, South Weymouth, MA 02190',
  'HanoverUrgent': 'South Shore Health Urgent Care, 1399 Washington St, Hanover, MA 02339',
  'TownHall': 'Norwell Town Hall, 345 Main St, Norwell, MA 02061',
  'Library': 'Norwell Public Library, 64 South St, Norwell, MA 02061',
  // Parks & Recreation
  'Norris': 'Norris Reservation, 18 Dover St, Norwell, MA 02061',
  'Wompatuck': 'Wompatuck State Park, 204 Union St, Hingham, MA 02043',
  'WorldsEnd': "World's End, 250 Martins Ln, Hingham, MA 02043",
  'ScienceCenter': 'South Shore Natural Science Center, 48 Jacobs Ln, Norwell, MA 02061',
  'WidowsWalk': "Widow's Walk Golf Course, 250 Driftway, Scituate, MA 02066",
  // Hotels & Lodging
  'DoubleTree': 'DoubleTree by Hilton, 929 Hingham St, Rockland, MA 02370',
  'BestWestern': '909 Hingham St, Rockland, MA 02370',
  'ComfortInn': '850 Hingham St, Rockland, MA 02370',
  // Transit & Access
  'WestHingham': 'West Hingham Station, 411 Fottler Rd, Hingham, MA 02043',
  'NantasketJct': 'Nantasket Junction Station, Hingham, MA 02043',
  'HinghamFerry': 'Hingham Ferry, 28 Shipyard Dr, Hingham, MA 02043',
  'Greenbush': 'Greenbush Station, 247 Old Driftway, Scituate, MA 02066',
}

const out = {}
for (const [k, a] of Object.entries(Q)) {
  const u = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(a)}&key=${KEY}`
  const j = await (await fetch(u)).json()
  if (j.status !== 'OK') { out[k] = `ERR ${j.status}`; continue }
  const r = j.results[0]
  const { lat, lng } = r.geometry.location
  out[k] = `[${(+lat).toFixed(6)}, ${(+lng).toFixed(6)}]  ${r.geometry.location_type}  // ${r.formatted_address}`
}
for (const [k, v] of Object.entries(out)) console.log(`${k.padEnd(16)} ${v}`)
