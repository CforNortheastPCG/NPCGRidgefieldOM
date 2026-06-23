import { useState, useRef, useCallback, useEffect } from 'react'
import { MARKER_LOGOS } from './markerLogos.js'

/* ═══════════════════ FULL-BLEED PHOTO + PLACEABLE OVERLAY ═══════════════════
   Edge-to-edge property photo with an optional subject-property pin and street
   labels. Pin/labels are positioned by x/y percentages of the page.

   PLACING THINGS: in the browser (npm run dev) you can DRAG the pin and any
   street label. While dragging, a small badge shows its live `x% / y%`. Once
   it's where you want it, copy those numbers back into the `pin`/`streets`
   props in App.jsx so the position bakes into the PDF export. */

const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV

/* Dev-only localStorage helpers so placements survive a page refresh. */
function loadSaved(key) {
  if (!isDev || !key) return null
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}
function saveValue(key, value) {
  if (!isDev || !key) return
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}

/* useDrag with optional persistence: pass persistKey to remember position across
   refreshes (dev only). */
function useDrag(initial, onChange, persistKey) {
  const [pos, setPos] = useState(() => {
    const s = loadSaved(persistKey)
    return s && typeof s.x === 'number' ? s : initial
  })
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const onDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return   // ignore right/middle click
    e.preventDefault()
    e.stopPropagation()
    const page = ref.current?.closest('.page')
    if (!page) return
    setActive(true)
    const move = (ev) => {
      const r = page.getBoundingClientRect()
      const x = Math.max(0, Math.min(100, ((ev.clientX - r.left) / r.width) * 100))
      const y = Math.max(0, Math.min(100, ((ev.clientY - r.top) / r.height) * 100))
      const next = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
      setPos(next)
      saveValue(persistKey, next)
      onChange?.(next)
    }
    const up = () => {
      setActive(false)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }, [onChange, persistKey])
  return { pos, active, ref, onDown }
}

/* Golden teardrop subject-property marker with a label pill. The pin tip sits on
   the exact point; the label floats above and auto-aligns left/center/right so it
   never clips off the page edge when the pin is placed near a side. */
function SubjectPin({ x = 50, y = 50, label = 'Subject Property', draggable, pkey }) {
  const { pos, active, ref, onDown } = useDrag({ x, y }, undefined, pkey)
  const labelTf = pos.x > 70 ? 'translateX(-100%)' : pos.x < 30 ? 'translateX(0)' : 'translateX(-50%)'
  return (
    <div
      ref={ref}
      onMouseDown={draggable ? onDown : undefined}
      style={{
        position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, width: 0, height: 0,
        zIndex: 5, cursor: draggable ? (active ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* pin teardrop — tip at the anchor point */}
      <div style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(-50%, -100%)', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))' }}>
        <svg width="22" height="29" viewBox="0 0 26 34" aria-hidden="true" style={{ display: 'block' }}>
          <path d="M13 0C5.8 0 0 5.8 0 13c0 9.2 13 21 13 21s13-11.8 13-21C26 5.8 20.2 0 13 0z"
            fill="var(--golden)" stroke="#fff" strokeWidth="2" />
          <circle cx="13" cy="13" r="4.5" fill="#fff" />
        </svg>
      </div>
      {/* label — above the pin, edge-aware horizontal alignment */}
      <div style={{
        position: 'absolute', left: 0, bottom: 33, transform: labelTf,
        background: 'var(--golden)', color: '#fff', fontSize: 9, fontWeight: 800,
        letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px',
        borderRadius: 3, whiteSpace: 'nowrap', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
      }}>{label}</div>
    </div>
  )
}

/* Street label — same look as the place markers (golden box + arrow). Drag to
   move; in dev, SCROLL to rotate the arrow so it points at the road. */
function StreetLabel({ x = 50, y = 50, label = 'Street', arrow = 180, draggable, pkey }) {
  const { pos, active, ref, onDown } = useDrag({ x, y }, undefined, pkey)
  const arrowKey = pkey ? `${pkey}:arrow` : null
  const [ang, setAng] = useState(() => { const s = loadSaved(arrowKey); return typeof s === 'number' ? s : arrow })
  const onWheel = useCallback((e) => {
    e.preventDefault()
    setAng((a) => { const n = ((Math.round((a + (e.deltaY > 0 ? 15 : -15)) / 15) * 15) % 360 + 360) % 360; saveValue(arrowKey, n); return n })
  }, [arrowKey])
  const color = '#F8971D'
  return (
    <div
      ref={ref}
      onMouseDown={draggable ? onDown : undefined}
      onWheel={draggable ? onWheel : undefined}
      style={{
        position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, width: 0, height: 0, zIndex: 4,
        cursor: draggable ? (active ? 'grabbing' : 'grab') : 'default',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: 0,
        transform: `translate(-50%, -50%) translate(${18 * Math.sin(ang * Math.PI / 180)}px, ${-18 * Math.cos(ang * Math.PI / 180)}px)`,
        filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
      }}>
        <Arrow deg={ang} color={color} />
      </div>
      <div style={{
        position: 'absolute', left: 'calc(100% + 7px)', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.85)', borderLeft: `2px solid ${color}`, borderRadius: 2,
        padding: '2px 6px', whiteSpace: 'nowrap', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
        fontSize: 8.5, fontWeight: 800, color: 'var(--carbon)', letterSpacing: '0.04em',
      }}>{label}</div>
    </div>
  )
}

/* Connecticut state-route shield marker (e.g. Route 8) — a draggable highway
   sign: white rounded plate, dark keyline, "CONN" banner, big route number.
   `arrow` (degrees; 0 = straight down out the bottom, 180 = up) renders a
   directional arrow off the bottom of the plate, like the "TO Route 8"
   guide-sign assembly. Pass arrow={null} to hide it. */
function RouteShield({ x = 50, y = 50, route = '8', arrow = 0, draggable, pkey }) {
  const { pos, active, ref, onDown } = useDrag({ x, y }, undefined, pkey)
  return (
    <div
      ref={ref}
      onMouseDown={draggable ? onDown : undefined}
      style={{
        position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)', zIndex: 5,
        cursor: draggable ? (active ? 'grabbing' : 'grab') : 'default',
        filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: '#fff', border: '2px solid var(--carbon)', borderRadius: 6,
          width: 38, padding: '2px 0 3px', lineHeight: 1,
        }}>
          <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--carbon)' }}>CONN</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--carbon)', marginTop: -1 }}>{route}</div>
        </div>
        {arrow != null && (
          <div style={{ marginTop: 2 }}>
            <svg width="18" height="20" viewBox="0 0 24 26" aria-hidden="true"
              style={{ transform: `rotate(${arrow}deg)`, display: 'block' }}>
              <path d="M12 1 L12 16 M12 25 L4.5 14 L19.5 14 Z" fill="#fff" stroke="var(--carbon)"
                strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

/* Point-of-interest label — a neighboring business / landmark up or down the
   street. Optional `logo` (path under /public) shows a small mark left of the
   text; optional `dir` ('↑ ↓ ← →' etc.) prefixes a directional arrow. */
function Poi({ x = 50, y = 50, label = 'Business', logo, dir, draggable, pkey }) {
  const { pos, active, ref, onDown } = useDrag({ x, y }, undefined, pkey)
  return (
    <div
      ref={ref}
      onMouseDown={draggable ? onDown : undefined}
      style={{
        position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)', zIndex: 4,
        cursor: draggable ? (active ? 'grabbing' : 'grab') : 'default',
        filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.95)',
        color: 'var(--carbon)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em',
        padding: '4px 9px', borderRadius: 3, whiteSpace: 'nowrap',
        borderLeft: '3px solid var(--carbon)',
      }}>
        {logo && <img src={logo} alt="" style={{ height: 16, maxWidth: 40, objectFit: 'contain', display: 'block' }} />}
        {dir && <span style={{ color: 'var(--golden)', fontWeight: 800 }}>{dir}</span>}
        <span>{label}</span>
      </div>
    </div>
  )
}

/* Direction arrow (points up at 0°, rotates clockwise). null = no arrow. */
const ARROW_CYCLE = [null, 0, 45, 90, 135, 180, 225, 270, 315]
const nextArrow = (cur) => ARROW_CYCLE[(ARROW_CYCLE.indexOf(cur ?? null) + 1) % ARROW_CYCLE.length]
function Arrow({ deg, color }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"
      style={{ transform: `rotate(${deg}deg)`, flex: '0 0 auto' }}>
      <path d="M12 2 L20 13 L14 13 L14 22 L10 22 L10 13 L4 13 Z" fill={color} stroke="#fff" strokeWidth="1.2" />
    </svg>
  )
}

/* Which side the label sits relative to the anchor dot. */
const SIDE_CYCLE = ['right', 'bottom', 'left', 'top']
const nextSide = (s) => SIDE_CYCLE[(SIDE_CYCLE.indexOf(s || 'right') + 1) % SIDE_CYCLE.length]
function sidePlacement(side) {
  const g = 7
  switch (side) {
    case 'left':   return { right: `calc(100% + ${g}px)`, top: '50%', transform: 'translateY(-50%)' }
    case 'top':    return { bottom: `calc(100% + ${g}px)`, left: '50%', transform: 'translateX(-50%)' }
    case 'bottom': return { top: `calc(100% + ${g}px)`, left: '50%', transform: 'translateX(-50%)' }
    default:       return { left: `calc(100% + ${g}px)`, top: '50%', transform: 'translateY(-50%)' }
  }
}
const devBtn = {
  flex: '0 0 auto', width: 15, height: 15, borderRadius: '50%', border: 'none',
  color: '#fff', fontSize: 10, lineHeight: 1, cursor: 'pointer', padding: 0,
}

/* Category-colored place marker: the label anchors to the exact placed point and
   flips to a chosen side. Draggable; in dev it also gets a ✕ to delete, a ⇄ to
   switch which side the label comes from, and a right-click to cycle a direction
   arrow. Reports every change so the page's export reflects it. */
function NumberedMarker({ m, draggable, onMove, onDelete, onArrow, onSide }) {
  const { pos, active, ref, onDown } = useDrag({ x: m.x, y: m.y }, onMove)
  const side = m.side || 'right'
  return (
    <div
      ref={ref}
      onMouseDown={draggable ? onDown : undefined}
      onContextMenu={draggable && isDev ? (e) => { e.preventDefault(); onArrow(nextArrow(m.arrow ?? null)) } : undefined}
      style={{
        position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
        width: 0, height: 0, zIndex: 6,
        cursor: draggable ? (active ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* direction arrow — orbits the anchor point, pointing the chosen way */}
      {m.arrow != null && (
        <div style={{
          position: 'absolute', left: 0, top: 0,
          transform: `translate(-50%, -50%) translate(${18 * Math.sin(m.arrow * Math.PI / 180)}px, ${-18 * Math.cos(m.arrow * Math.PI / 180)}px)`,
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
        }}>
          <Arrow deg={m.arrow} color={m.color} />
        </div>
      )}
      {/* label, offset to the chosen side of the anchor point */}
      <div style={{
        position: 'absolute', ...sidePlacement(side),
        filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.85)', borderLeft: `2px solid ${m.color}`,
          borderRadius: 2, padding: '2px 6px', whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          {m.logo && (
            <img src={m.logo} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }}
              style={{ height: 15, maxWidth: 34, objectFit: 'contain', display: 'block', flex: '0 0 auto' }} />
          )}
          <div>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: 'var(--carbon)', lineHeight: 1.2 }}>{m.name}</div>
            {m.note && <div style={{ fontSize: 6.5, color: 'var(--stone)', lineHeight: 1.2 }}>{m.note}</div>}
          </div>
        </div>
      </div>
      {/* edit tools — fixed just above the anchor point, same spot for every side */}
      {draggable && isDev && (
        <div style={{ position: 'absolute', left: 4, top: -10, display: 'flex', gap: 4, zIndex: 7 }}>
          <button
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onSide(nextSide(side)) }}
            title="Switch label side"
            style={{ ...devBtn, background: 'var(--golden)' }}
          >⇄</button>
          <button
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete() }}
            title="Delete marker"
            style={{ ...devBtn, background: 'rgba(20,22,28,0.85)', fontSize: 11 }}
          >×</button>
        </div>
      )}
    </div>
  )
}

export default function FullBleed({ image, position, pin, streets = [], pois = [], shields = [], markers = [], placeable = isDev, pageNum }) {
  const pageKey = `aerial:${image}`
  // Auto-attach a brand logo by marker name (populated by `npm run logos`).
  const seed = () => markers.map((m, i) => ({
    ...m, _id: i, x: m.x ?? 7, y: m.y ?? Math.min(93, 8 + i * 4.7),
    logo: m.logo ?? MARKER_LOGOS[m.name],
  }))
  const [marks, setMarks] = useState(() => {
    const saved = loadSaved(`${pageKey}:markers`)
    const base = Array.isArray(saved) ? saved : seed()
    // (re)attach logos by name so saved placements pick up newly-fetched logos
    return base.map((m) => ({ ...m, logo: m.logo ?? MARKER_LOGOS[m.name] }))
  })
  // Persist placements so a page refresh doesn't lose in-progress work (dev only).
  useEffect(() => { saveValue(`${pageKey}:markers`, marks) }, [pageKey, marks])

  // Render mode: hide all dev chrome (tools, helper, drag) to preview the page
  // exactly as it exports. Editable only when placeable AND not previewing.
  const [preview, setPreview] = useState(false)
  const editable = placeable && !preview

  const moveMark = useCallback((id, p) =>
    setMarks((ms) => ms.map((mm) => (mm._id === id ? { ...mm, x: p.x, y: p.y } : mm))), [])
  const deleteMark = useCallback((id) =>
    setMarks((ms) => ms.filter((mm) => mm._id !== id)), [])
  const arrowMark = useCallback((id, arrow) =>
    setMarks((ms) => ms.map((mm) => (mm._id === id ? { ...mm, arrow } : mm))), [])
  const sideMark = useCallback((id, side) =>
    setMarks((ms) => ms.map((mm) => (mm._id === id ? { ...mm, side } : mm))), [])
  const exportMarks = useCallback(() => {
    // Capture the WHOLE page — pin, streets, shields, markers — pulling each
    // element's dragged position from localStorage so nothing is missed.
    const pinOut = pin ? { ...pin, ...(loadSaved(`${pageKey}:pin`) || {}) } : undefined
    const streetsOut = streets.map((s, i) => {
      const p = loadSaved(`${pageKey}:street:${i}`) || {}
      const a = loadSaved(`${pageKey}:street:${i}:arrow`)
      return { ...s, ...p, ...(typeof a === 'number' ? { arrow: a } : {}) }
    })
    const shieldsOut = shields.map((s, i) => ({ ...s, ...(loadSaved(`${pageKey}:shield:${i}`) || {}) }))
    const markersOut = marks.map(({ _id, logo, ...m }) => m)   // logo re-attaches by name
    const out = { pin: pinOut, streets: streetsOut, shields: shieldsOut, markers: markersOut }
    const txt = JSON.stringify(out, null, 2)
    console.log(txt)
    if (navigator.clipboard) navigator.clipboard.writeText(txt)
  }, [pin, streets, shields, marks, pageKey])
  const resetPage = useCallback(() => {
    // clear every saved placement for this page (markers + pin/streets/shields/pois)
    try {
      Object.keys(localStorage).filter((k) => k.startsWith(pageKey)).forEach((k) => localStorage.removeItem(k))
    } catch { /* ignore */ }
    window.location.reload()
  }, [pageKey])

  return (
    <div className="page">
      <div className="cover-hero">
        <img className="cover-hero-img" src={image} alt="" style={{ objectPosition: position || 'center' }} />
        <div className="cover-hero-header" style={{ justifyContent: 'flex-end' }}>
          <img src="/logos/npcg-white-hires.png" alt="NPCG" style={{ maxHeight: 36, maxWidth: 180, objectFit: 'contain', opacity: 0.95 }} />
        </div>

        {streets.map((s, i) => <StreetLabel key={`s${i}`} {...s} draggable={editable} pkey={`${pageKey}:street:${i}`} />)}
        {pois.map((p, i) => <Poi key={`p${i}`} {...p} draggable={editable} pkey={`${pageKey}:poi:${i}`} />)}
        {shields.map((s, i) => <RouteShield key={`r${i}`} {...s} draggable={editable} pkey={`${pageKey}:shield:${i}`} />)}
        {marks.map((m) => (
          <NumberedMarker key={m._id} m={m} draggable={editable}
            onMove={(p) => moveMark(m._id, p)} onDelete={() => deleteMark(m._id)}
            onArrow={(a) => arrowMark(m._id, a)} onSide={(s) => sideMark(m._id, s)} />
        ))}
        {pin && <SubjectPin {...pin} draggable={editable} pkey={`${pageKey}:pin`} />}

        {/* Render/Edit toggle — stays visible in dev so you can flip back */}
        {placeable && isDev && (
          <button
            onClick={() => setPreview((p) => !p)}
            title="Toggle render preview (hide/show edit tools)"
            style={{
              position: 'absolute', left: 14, top: 14, zIndex: 11, border: 'none',
              background: preview ? 'var(--golden)' : 'rgba(20,22,28,0.82)', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 4,
              cursor: 'pointer', letterSpacing: '0.04em',
            }}
          >{preview ? '✎ Edit mode' : '👁 Render preview'}</button>
        )}

        {editable && isDev && marks.length > 0 && (
          <div style={{ position: 'absolute', right: 14, bottom: 32, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <div style={{
              background: 'rgba(20,22,28,0.82)', color: '#fff', fontSize: 9.5, lineHeight: 1.5,
              padding: '6px 9px', borderRadius: 4, maxWidth: 230,
            }}>
              <strong>Place markers (dev only):</strong><br />
              Drag to position · <span style={{ color: 'var(--golden)' }}>⇄</span> flip label side ·
              right-click = direction arrow · <span style={{ color: '#E74C3C' }}>×</span> delete.
              Placements persist on refresh. Then “Copy markers” → paste into App.jsx.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={exportMarks}
                style={{
                  border: 'none', background: 'var(--golden)', color: '#fff', fontSize: 10, fontWeight: 700,
                  padding: '5px 10px', borderRadius: 4, cursor: 'pointer', letterSpacing: '0.04em',
                }}
              >Copy page ({marks.length} markers + pin)</button>
              <button
                onClick={resetPage}
                title="Discard saved placements on this page and reload from code"
                style={{
                  border: '1px solid rgba(255,255,255,0.6)', background: 'transparent', color: '#fff',
                  fontSize: 10, fontWeight: 700, padding: '5px 10px', borderRadius: 4, cursor: 'pointer',
                }}
              >Reset</button>
            </div>
          </div>
        )}

        {pageNum != null && (
          <div style={{ position: 'absolute', right: 26, bottom: 18, color: '#fff', fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: '0.04em' }}>
            {pageNum}
          </div>
        )}
      </div>
    </div>
  )
}
