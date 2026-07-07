/* ═══════════════════ SCRIPTED ENRICHMENT (Google) ═══════════════════
   POST /api/enrich  { password, address }
   Deterministic data pulled from the street address — no AI:
     • Geocode  → street/city/state/zip/lat/lng + display strings
     • Street View → cover photo (returned as a data URL; key stays server-side)
     • Static Map → location map (data URL)
     • Places Nearby → amenities (only if the Places API is enabled on the key)
   The Google key is a Cloudflare secret (GOOGLE_MAPS_API_KEY); it never reaches
   the browser — images are fetched here and inlined as data URLs. */

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

function toBase64(buf) {
  const bytes = new Uint8Array(buf)
  let bin = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
  }
  return btoa(bin)
}

async function imageDataUrl(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || 'image/jpeg'
    return `data:${ct};base64,${toBase64(await res.arrayBuffer())}`
  } catch { return null }
}

export async function onRequestPost(context) {
  const { request, env } = context
  const key = env.GOOGLE_MAPS_API_KEY
  if (!key) return json({ error: 'Server is missing the GOOGLE_MAPS_API_KEY secret.' }, 500)

  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid request.' }, 400) }
  if (!safeEqual(body.password, env.OM_PASSWORD || 'NPCGOM2026!')) return json({ error: 'Wrong password.' }, 401)

  const address = (typeof body.address === 'string' ? body.address : '').trim()
  if (!address) return json({ error: 'Enter a street address.' }, 400)
  if (address.length > 200) return json({ error: 'Address too long.' }, 413)

  // ── Geocode ──
  const geo = await (await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`,
  )).json()
  if (geo.status !== 'OK' || !geo.results?.length) {
    return json({ error: `Could not locate that address (${geo.status || 'no result'}).` }, 400)
  }
  const r = geo.results[0]
  const comp = (type, long = false) => {
    const c = r.address_components.find(x => x.types.includes(type))
    return c ? (long ? c.long_name : c.short_name) : ''
  }
  const { lat, lng } = r.geometry.location
  const city = comp('locality') || comp('sublocality') || comp('administrative_area_level_3') || comp('administrative_area_level_2')
  const state = comp('administrative_area_level_1')
  const stateLong = comp('administrative_area_level_1', true) || state
  const zip = comp('postal_code')
  const street = `${comp('street_number')} ${comp('route')}`.trim() || r.formatted_address.split(',')[0]

  const out = {
    formattedAddress: r.formatted_address,
    street,
    city,
    state,
    zip,
    lat,
    lng,
    cityState: `${city}, ${state}${zip ? ' ' + zip : ''}`.trim(),
    cityLong: `${city}, ${stateLong}`.trim(),
  }

  // ── Street View cover + Static Map (server-fetched data URLs) ──
  const sv = await (await fetch(
    `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${key}`,
  )).json()
  out.cover = sv.status === 'OK'
    ? await imageDataUrl(`https://maps.googleapis.com/maps/api/streetview?size=640x420&location=${lat},${lng}&fov=80&pitch=4&key=${key}`)
    : null
  out.map = await imageDataUrl(
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x380&scale=2&maptype=hybrid&markers=color:0xF8971D%7C${lat},${lng}&key=${key}`,
  )

  // ── Nearby amenities — Places API (New) searchNearby ──
  // Ranked by distance from the subject; each result gets a human distance
  // ("0.3 mi") so the location page can "size" how close things are.
  out.amenities = await nearbyAmenities(lat, lng, key)

  return json(out)
}

// Curated categories that matter for a multifamily location story.
const PLACE_TYPES = [
  'supermarket', 'grocery_store', 'restaurant', 'cafe', 'school', 'primary_school',
  'park', 'transit_station', 'train_station', 'shopping_mall', 'gym', 'hospital', 'pharmacy', 'bank',
]
// Friendlier labels for the raw Google type strings.
const TYPE_LABEL = {
  supermarket: 'Grocery', grocery_store: 'Grocery', restaurant: 'Dining', cafe: 'Café',
  school: 'School', primary_school: 'School', secondary_school: 'School', university: 'University',
  park: 'Park', transit_station: 'Transit', train_station: 'Rail', subway_station: 'Transit',
  bus_station: 'Bus', shopping_mall: 'Shopping', gym: 'Fitness', hospital: 'Hospital',
  pharmacy: 'Pharmacy', bank: 'Bank',
}

function metersToMiles(m) {
  const mi = m / 1609.344
  return mi < 0.1 ? `${Math.round(m / 0.3048 / 50) * 50} ft` : `${mi.toFixed(1)} mi`
}
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000, toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}
function labelFor(types = []) {
  for (const t of types) if (TYPE_LABEL[t]) return TYPE_LABEL[t]
  return ''
}

async function nearbyAmenities(lat, lng, key) {
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'places.displayName,places.types,places.rating,places.userRatingCount,places.location,places.shortFormattedAddress',
      },
      body: JSON.stringify({
        includedTypes: PLACE_TYPES,
        maxResultCount: 20,
        rankPreference: 'DISTANCE',
        locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius: 2500 } },
      }),
    })
    const data = await res.json()
    if (!res.ok || !Array.isArray(data.places)) return []
    const seen = new Set()
    return data.places
      .map(p => {
        const ploc = p.location || {}
        const dist = ploc.latitude != null ? haversine(lat, lng, ploc.latitude, ploc.longitude) : null
        return {
          name: p.displayName?.text || '',
          category: labelFor(p.types),
          rating: p.rating || null,
          reviews: p.userRatingCount || null,
          vicinity: p.shortFormattedAddress || '',
          distanceMeters: dist,
          distance: dist != null ? metersToMiles(dist) : '',
        }
      })
      .filter(a => a.name && !seen.has(a.name) && seen.add(a.name))
      .sort((a, b) => (a.distanceMeters ?? 1e9) - (b.distanceMeters ?? 1e9))
      .slice(0, 12)
  } catch {
    return []
  }
}
