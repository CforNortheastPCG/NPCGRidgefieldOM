/* ═══════════ REGIONAL POSITIONING (protected) ═══════════
   Regional-scale Static Maps view (auto-framed by its markers: subject +
   the drive-time cities) with a commute panel from routed times and
   agent-authored positioning prose. */

import { PageHeader, PageFooter, PlaceholderBanner, SectionTitle, Md } from '../Shell.tsx'
import { MAPDATA } from '../../data/mapdata.ts'
import { REGIONAL_MAP } from '../../content/index.ts'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
const CARBON = '0x3F4753'
const GOLDEN = '0xF8971D'

function LegendRow({ color, label, line }: { color: string; label: string; line?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
      {line ? (
        <span style={{ width: 14, height: 3, background: color, flexShrink: 0, borderRadius: 2 }} />
      ) : (
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, flexShrink: 0 }} />
      )}
      <span style={{ color: 'var(--carbon)', fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export function RegionalMap({ pageNum }: { pageNum?: number }) {
  const c = REGIONAL_MAP
  const m = MAPDATA
  const cityPins = m.cities.filter((x) => x.lat != null && x.lng != null)
  const ready = m.generated && m.subject && API_KEY

  let mapEl: React.ReactNode
  if (!ready) {
    mapEl = (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--linen)', color: 'var(--stone)', fontSize: 10, textAlign: 'center', padding: 24 }}>
        {m.generated ? 'Set VITE_GOOGLE_MAPS_API_KEY to render the map.' : 'Map data not generated yet — run scripts/gen-maps.mjs.'}
      </div>
    )
  } else {
    const style = [
      'feature:poi|visibility:off',
      'feature:landscape|color:0xf3efe9',
      'feature:water|color:0xc4d2d8',
      'feature:road.arterial|element:geometry|color:0xffffff',
      'feature:road.highway|element:geometry.fill|color:0xF8971D',
      'feature:road.highway|element:geometry.stroke|color:0xCE7C12',
      'feature:road.highway|element:labels|visibility:on',
      'feature:administrative.locality|element:labels|visibility:on',
    ]
    const params = [
      'size=640x520',
      'scale=2',
      'maptype=roadmap',
      'format=png',
      ...style.map((s) => `style=${encodeURIComponent(s)}`),
      ...(cityPins.length > 0
        ? [`markers=${encodeURIComponent(`size:mid|color:${CARBON}|${cityPins.map((x) => `${x.lat},${x.lng}`).join('|')}`)}`]
        : []),
      `markers=${encodeURIComponent(`size:mid|color:${GOLDEN}|${m.subject!.lat},${m.subject!.lng}`)}`,
      `key=${API_KEY}`,
    ]
    const url = `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`
    mapEl = <img src={url} alt="Regional positioning map" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  }

  return (
    <div className="page">
      {!c.generated && <PlaceholderBanner what="regional positioning" />}
      <PageHeader section="Regional Positioning" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text="Regional Positioning" />
        <div className="title-rule" />
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--graphite)', marginBottom: 10 }}>
          <Md text={c.intro} />
        </div>

        {c.statTiles.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.statTiles.length, 4)}, 1fr)`, gap: 12, marginBottom: 12 }}>
            {c.statTiles.slice(0, 4).map((t) => (
              <div key={t.l} style={{ textAlign: 'center', padding: '6px 4px', borderTop: '3px solid var(--golden)' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1 }}>{t.v}</div>
                <div style={{ fontSize: 7.6, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: 4 }}>{t.l}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
          <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0 }}>
            {mapEl}
            <div className="map-legend-card" style={{ position: 'absolute', left: 10, top: 10, background: 'rgba(255,255,255,0.95)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 6px rgba(0,0,0,0.18)' }}>
              <LegendRow color="#F8971D" label="Subject Property" />
              <LegendRow color="#3F4753" label="Regional Cities" />
              <LegendRow color="#F8971D" label="Major Highways" line />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0, overflow: 'hidden' }}>
            {m.cities.length > 0 && (
              <div>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingBottom: 5, borderBottom: '2px solid var(--golden)' }}>
                  Drive &amp; Commute Times
                </h3>
                {m.cities.map((x, i) => (
                  <div key={x.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2.5px 6px', fontSize: 10.5, background: i % 2 === 1 ? 'var(--linen)' : 'transparent', borderRadius: 2 }}>
                    <span style={{ color: 'var(--carbon)', fontWeight: 600 }}>{x.name}</span>
                    <span style={{ color: 'var(--carbon)', fontWeight: 700, whiteSpace: 'nowrap' }}>{x.drive}</span>
                  </div>
                ))}
              </div>
            )}
            {c.highwayAccess && (
              <div>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>
                  Highway Access
                </h3>
                <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--graphite)' }}>
                  <Md text={c.highwayAccess} />
                </div>
              </div>
            )}
            {c.economicAnchors && (
              <div style={{ flex: 1, minHeight: 0 }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--carbon)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, paddingBottom: 4, borderBottom: '2px solid var(--golden)' }}>
                  Economic Anchors
                </h3>
                <div style={{ fontSize: 9.4, lineHeight: 1.42, color: 'var(--graphite)' }}>
                  <Md text={c.economicAnchors} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
