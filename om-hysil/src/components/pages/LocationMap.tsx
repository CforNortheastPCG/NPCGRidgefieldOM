/* ═══════════ LOCATION & AMENITIES (protected) ═══════════
   Two data sources, one layout (modeled on the om-salem-square page):
   - Authored: LOCATION_MAP content module — agent-researched anchor
     directory with notes. Items with addresses become numbered pins;
     Static Maps geocodes the addresses server-side and auto-fits the
     frame to every pin, so regional anchors (a hospital 10 min out)
     pull the map wide automatically.
   - Fallback (module not yet generated): deterministic Places-API
     amenities from gen-maps.mjs, decluttered around a fixed zoom. */

import { PageHeader, PageFooter, SectionTitle } from '../Shell.tsx'
import { DEAL } from '../../data/deal.ts'
import { MAPDATA } from '../../data/mapdata.ts'
import { LOCATION_MAP } from '../../content/index.ts'
import type { MapAmenity } from '../../lib/types.ts'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
const GOLDEN = '0xF8971D'

/** Category palette, assigned by order (mirrors the reference book). */
const PALETTE = [
  { color: '0xC0392B', swatch: '#C0392B' },
  { color: '0x884EA0', swatch: '#884EA0' },
  { color: '0x117A65', swatch: '#117A65' },
  { color: '0x2C3E50', swatch: '#2C3E50' },
]

const MAP_STYLE = [
  'feature:poi|visibility:off',
  'feature:transit|visibility:off',
  'feature:administrative|element:labels|visibility:on',
  'feature:road|element:geometry|color:0xffffff',
  'feature:road.arterial|element:geometry|color:0xf3efe9',
  'feature:landscape|color:0xf6f2ee',
  'feature:water|color:0xc9d4d9',
]

function declutter(pois: MapAmenity[], anchor: { lat: number; lng: number } | null): MapAmenity[] {
  const MIN = 0.0011 // ~120 m collision radius at zoom 14
  const placed: Array<{ lat: number; lng: number }> = anchor ? [anchor] : []
  const near = (aLat: number, aLng: number, bLat: number, bLng: number) => {
    const dLat = aLat - bLat
    const dLng = (aLng - bLng) * Math.cos((aLat * Math.PI) / 180)
    return Math.sqrt(dLat * dLat + dLng * dLng) < MIN
  }
  return pois.map((p) => {
    let lat = p.lat
    let lng = p.lng
    let tries = 0
    while (placed.some((q) => near(lat, lng, q.lat, q.lng)) && tries < 24) {
      const ang = (tries * 137.5 * Math.PI) / 180
      const r = MIN * (1 + tries * 0.5)
      lat = p.lat + Math.sin(ang) * r
      lng = p.lng + (Math.cos(ang) * r) / Math.cos((p.lat * Math.PI) / 180)
      tries++
    }
    placed.push({ lat, lng })
    return { ...p, lat, lng }
  })
}

interface Group {
  heading: string
  swatch: string
  items: Array<{ n: number; name: string; note?: string }>
}

export function LocationMap({ pageNum }: { pageNum?: number }) {
  const c = LOCATION_MAP
  const m = MAPDATA
  const curated = c.generated && c.categories.length > 0

  let groups: Group[]
  let markerParams: string[] = []
  let subjectMarker: string | null = null
  let fitted = false // curated maps auto-fit; fallback uses fixed zoom

  if (curated) {
    // Static Maps geocodes at most 15 address markers per request — budget
    // 14 pins + the subject P. Round-robin across categories so each keeps
    // its top items pinned; unpinned items list without a number.
    const cats = c.categories.slice(0, PALETTE.length)
    const pinned = new Map<string, number>() // "cat:idx" → pin number
    const perCatCount: number[] = cats.map(() => 0)
    let budget = 14
    for (let row = 0; row < 9 && budget > 0; row++) {
      cats.forEach((cat, i) => {
        const it = cat.items[row]
        if (!it?.address || budget <= 0 || perCatCount[i]! >= 9) return
        perCatCount[i]! += 1
        pinned.set(`${i}:${row}`, perCatCount[i]!)
        budget--
      })
    }
    groups = cats.map((cat, i) => ({
      heading: cat.heading,
      swatch: PALETTE[i]!.swatch,
      items: cat.items.map((it, j) => ({ n: pinned.get(`${i}:${j}`) ?? 0, name: it.name, note: it.note })),
    }))
    markerParams = cats.flatMap((cat, i) =>
      cat.items.flatMap((it, j) => {
        const n = pinned.get(`${i}:${j}`)
        return n ? [`markers=${encodeURIComponent(`size:mid|color:${PALETTE[i]!.color}|label:${n}|${it.address}`)}`] : []
      })
    )
    subjectMarker = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|label:P|${DEAL.fullAddress}`)}`
    fitted = true
  } else {
    groups = m.categories
      .map((cat) => ({
        heading: cat.label,
        swatch: cat.swatch,
        items: m.amenities.filter((p) => p.category === cat.label).map((p) => ({ n: p.n, name: p.name, note: p.note })),
      }))
      .filter((g) => g.items.length > 0)
    if (m.subject) {
      markerParams = declutter(m.amenities, m.subject).map(
        (p) => `markers=${encodeURIComponent(`size:mid|color:${p.color}|label:${p.n}|${p.lat},${p.lng}`)}`
      )
      subjectMarker = `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|label:P|${m.subject.lat},${m.subject.lng}`)}`
    }
  }

  const ready = API_KEY && subjectMarker && (curated || (m.generated && m.amenities.length > 0))

  let mapEl: React.ReactNode
  if (!ready) {
    mapEl = (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
        {API_KEY ? 'Amenity data not generated yet — run scripts/gen-maps.mjs or draft the book.' : 'Set VITE_GOOGLE_MAPS_API_KEY to render the map.'}
      </div>
    )
  } else {
    // Curated path sends no center/zoom — Static Maps fits every marker.
    const frame = fitted ? '' : `center=${m.subject!.lat},${m.subject!.lng}&zoom=14&`
    const url =
      `https://maps.googleapis.com/maps/api/staticmap?${frame}size=593x640&scale=2&maptype=hybrid&format=png` +
      `&${MAP_STYLE.map((s) => 'style=' + encodeURIComponent(s)).join('&')}` +
      `&${subjectMarker}&${markerParams.join('&')}&key=${API_KEY}`
    mapEl = (
      <img
        src={url}
        alt={`Map of ${DEAL.fullAddress} and nearby amenities`}
        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', margin: 'auto', display: 'block', background: 'var(--linen)' }}
      />
    )
  }

  return (
    <div className="page">
      <PageHeader section="Location & Amenities" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Location &" accent="Amenities" />
        <div className="title-rule" />
        {curated && (
          <div style={{ fontSize: 10.6, lineHeight: 1.5, color: 'var(--graphite)', marginBottom: 8 }}>{c.intro}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', minHeight: 0, gap: 4 }}>
            <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', flex: 1, minHeight: 0, display: 'flex' }}>
              {mapEl}
            </div>
            <div style={{ flexShrink: 0, fontSize: 7.5, lineHeight: 1.3, color: 'var(--stone)', fontStyle: 'italic' }}>
              {curated
                ? 'Pin placement is geocoded from public addresses and approximate.'
                : 'Map locations are approximate; nearby pins may be offset slightly to prevent overlap.'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', background: '#F8971D', border: '2px solid #fff', boxShadow: '0 0 0 1px var(--golden)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                P
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--carbon)' }}>Subject Property — {DEAL.address}</span>
            </div>
            <div style={{ columns: 2, columnGap: 22, flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {groups.map((g) => (
                <div key={g.heading} style={{ breakInside: 'avoid', marginBottom: 9 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                    <span style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', background: g.swatch, border: '1px solid rgba(0,0,0,0.15)' }} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: g.swatch }}>{g.heading}</span>
                  </div>
                  {g.items.map((p, k) => (
                    <div key={`${g.heading}-${k}`} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '2px 0' }}>
                      <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: g.swatch, width: 14, textAlign: 'right' }}>{p.n > 0 ? p.n : '·'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10.6, fontWeight: 600, color: 'var(--carbon)', lineHeight: 1.25 }}>{p.name}</div>
                        {p.note && <div style={{ fontSize: 8.2, color: 'var(--stone)', lineHeight: 1.3, marginTop: 1 }}>{p.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
