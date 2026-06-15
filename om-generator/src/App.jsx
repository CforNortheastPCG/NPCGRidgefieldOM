import { useState, useEffect, useRef, useCallback } from 'react'
import readXlsxFile from 'read-excel-file/browser'
import OmDeck from './om/OmDeck.jsx'

/* NPCG OM Generator — full stack.
   Address → /api/enrich (Google: identity, Street View cover, Static Map,
   Places-API nearby amenities) + structured facts → /api/fill (AI, structured)
   → one deal model → renders the branded OM deck. The AI update chat edits the
   model via /api/update (always Opus — the "heavy lift" is done, edits just need
   context). The working OM auto-saves to localStorage. */

const MODELS = [
  { id: 'claude-opus-4-8', label: 'Opus 4.8 — recommended' },
  { id: 'claude-fable-5', label: 'Fable 5 — most capable' },
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6 — faster' },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5 — cheapest' },
]

// The update chat always runs on Opus — once the deck exists, edits are small
// and Opus's code/prose with full deal context is reliable.
const UPDATE_MODEL = 'claude-opus-4-8'

// Edits are scoped to ONE page so the agent only works on that page's slice of
// the deal model — it isn't combing the whole thing every time. Each page maps
// to the deal-model keys it owns.
const PAGES = [
  { id: 'cover', label: 'Cover', keys: ['name', 'type', 'askingPrice'] },
  { id: 'exec', label: 'Executive Summary', keys: ['summary', 'highlights', 'askingPrice', 'units'] },
  { id: 'property', label: 'Property Overview', keys: ['siteSummary', 'utilities'] },
  { id: 'building', label: 'Building Information', keys: ['buildingInfo'] },
  { id: 'rentroll', label: 'Rent Roll', keys: ['rentRoll', 'units'] },
  { id: 'income', label: 'Income & Expense', keys: ['expenses'] },
  { id: 'location', label: 'Location Overview', keys: ['locationOverview'] },
]

// Structured inputs — each becomes a labeled block in the composed facts.
const SECTIONS = [
  { key: 'cover', label: 'Cover & Narrative', rows: 4,
    ph: 'Marketing name (e.g. "Main Street Apartments"), property type/headline, and the positioning/story you want on the cover & executive summary.' },
  { key: 'property', label: 'Property & Pricing', rows: 5,
    ph: 'Asking price, # units, # buildings, year built / renovated, lot size, building SF, zoning, parking, and utilities (heat / electric / water-sewer — who pays).' },
  { key: 'building', label: 'Building Information', rows: 4,
    ph: 'Construction type, foundation, roof, exterior/siding, windows, mechanicals (heating/cooling), electrical, and fire protection/sprinklers.' },
  { key: 'rentRoll', label: 'Rent Roll', rows: 6,
    ph: 'One unit per line: Unit / Type / SF / Designation / In-Place rent / Market rent / Pro Forma rent. e.g. "1 · 2BR/1BA · 850 · Market · 1,650 · 2,100 · 2,100".' },
  { key: 'expenses', label: 'Expenses (T-12)', rows: 4,
    ph: 'Annual operating expenses: taxes, insurance, water/sewer, common electric, R&M, management, trash, landscaping/snow, reserves.' },
  { key: 'location', label: 'Location & Market', rows: 4,
    ph: 'Neighborhood, employers, schools, transit/highway access, demographics, comps. Google Places auto-pulls nearby amenities — add anything it would miss.' },
]

const ss = {
  get: (k, d = '') => { try { return localStorage.getItem(k) ?? d } catch { return d } },
  set: (k, v) => { try { localStorage.setItem(k, v) } catch { /* */ } },
}

// Compose the structured sections (+ any imported spreadsheet) into the single
// labeled facts string /api/fill expects.
function composeFacts(inputs, sheetText) {
  const parts = SECTIONS
    .map(s => ({ s, v: (inputs[s.key] || '').trim() }))
    .filter(x => x.v)
    .map(({ s, v }) => `${s.label.toUpperCase()}:\n${v}`)
  if (sheetText && sheetText.trim()) {
    parts.push(`RENT ROLL & EXPENSES (imported spreadsheet — extract the unit-by-unit rent roll and the operating expenses from this; read column headers for in-place vs market/pro-forma rents):\n${sheetText.trim()}`)
  }
  return parts.join('\n\n')
}

// Read every sheet of an .xlsx workbook into plain text the AI can parse.
async function workbookToText(file) {
  const sheets = await readXlsxFile(file, { getSheets: true })
  const blocks = []
  let rows = 0
  for (const sh of sheets) {
    const data = await readXlsxFile(file, { sheet: sh.name })
    if (!data.length) continue
    rows += data.length
    blocks.push(`Sheet "${sh.name}":\n` + data.map(r => r.map(c => (c == null ? '' : String(c))).join(' | ')).join('\n'))
  }
  return { text: blocks.join('\n\n'), rows }
}

async function post(url, payload) {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
  let data = null
  try { data = await res.json() } catch { /* */ }
  if (!res.ok) return { error: (data && data.error) || `Request failed (${res.status}).` }
  return data
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

function Gate({ onUnlock }) {
  const [pw, setPw] = useState('')
  return (
    <div className="gate"><div className="gate-box">
      <h2>NPCG <span>OM Generator</span></h2>
      <p>Enter the access password to continue.</p>
      <input type="password" value={pw} autoFocus placeholder="Password"
        onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && pw && onUnlock(pw)} />
      <button onClick={() => pw && onUnlock(pw)}>Enter</button>
      <div className="gate-note">Verified server-side; held only in this tab's memory.</div>
    </div></div>
  )
}

export default function App() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [address, setAddress] = useState(ss.get('om_addr'))
  const [inputs, setInputs] = useState(() => {
    try {
      const saved = JSON.parse(ss.get('om_inputs') || 'null')
      if (saved) return saved
    } catch { /* */ }
    // migrate the old single facts textarea into the Property section
    const legacy = ss.get('om_facts')
    return legacy ? { property: legacy } : {}
  })
  const [model, setModel] = useState(ss.get('om_model') || 'claude-opus-4-8')
  const [coverUpload, setCoverUpload] = useState('') // user-supplied cover photo (data URL)
  const [sheet, setSheet] = useState(() => ({ name: ss.get('om_sheet_name'), text: ss.get('om_sheet') })) // imported rent roll / expenses
  const [deal, setDeal] = useState(() => { try { return JSON.parse(ss.get('om_deal') || 'null') } catch { return null } })
  const [busy, setBusy] = useState('')
  const [status, setStatus] = useState('')
  const [chat, setChat] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [updatePage, setUpdatePage] = useState('')
  const [zoom, setZoom] = useState(0.6)
  const previewRef = useRef(null)

  useEffect(() => { ss.set('om_addr', address) }, [address])
  useEffect(() => { ss.set('om_inputs', JSON.stringify(inputs)) }, [inputs])
  useEffect(() => { ss.set('om_model', model) }, [model])
  const saveDeal = (d) => { setDeal(d); ss.set('om_deal', JSON.stringify(d)) }
  const setSection = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  // scale the 960px deck to fit the preview column
  const fit = useCallback(() => {
    if (previewRef.current) setZoom(Math.min(1, Math.max(0.28, (previewRef.current.clientWidth - 48) / 960)))
  }, [])
  useEffect(() => { fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit) }, [fit])

  async function pickCover(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await fileToDataUrl(file)
      setCoverUpload(url)
      // if a deck already exists, apply the new cover immediately
      if (deal) saveDeal({ ...deal, cover: url })
    } catch { setStatus('Could not read that image.') }
  }

  async function pickSheet(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('Reading spreadsheet…')
    try {
      const { text, rows } = await workbookToText(file)
      setSheet({ name: file.name, text }); ss.set('om_sheet_name', file.name); ss.set('om_sheet', text)
      setStatus(`Loaded ${rows} rows from ${file.name}. Build to extract the rent roll & expenses.`)
    } catch { setStatus('Could not read that spreadsheet — export it as .xlsx and try again.') }
  }
  function clearSheet() { setSheet({ name: '', text: '' }); ss.set('om_sheet_name', ''); ss.set('om_sheet', '') }

  async function build() {
    const facts = composeFacts(inputs, sheet.text)
    if (!address.trim() && !facts.trim()) { setStatus('Enter an address and/or deal facts.'); return }
    setBusy('build'); setStatus('Pulling Google data…')
    let enriched = {}
    if (address.trim()) {
      const en = await post('/api/enrich', { password, address })
      if (en.error) { if (/password/i.test(en.error)) setAuthed(false); setStatus(en.error); setBusy(''); return }
      enriched = en
    }
    setStatus(`Drafting with ${model}…`)
    const fl = await post('/api/fill', { password, model, facts, enriched })
    if (fl.error) { setStatus(fl.error); setBusy(''); return }
    // user-uploaded cover wins over the Street View cover
    const merged = { ...enriched, ...fl.deal }
    if (coverUpload) merged.cover = coverUpload
    saveDeal(merged)
    setStatus(`Done.${enriched.amenities?.length ? ` ${enriched.amenities.length} nearby places.` : ''}`); setBusy('')
  }

  async function sendUpdate() {
    const instruction = chatInput.trim()
    if (!instruction || !deal) return
    const page = PAGES.find(p => p.id === updatePage)
    if (!page) { setChat(c => [...c, { role: 'err', text: 'Pick a page to edit first.' }]); return }
    setChat(c => [...c, { role: 'user', text: `[${page.label}] ${instruction}` }]); setChatInput(''); setBusy('update')
    const res = await post('/api/update', { password, model: UPDATE_MODEL, deal, instruction, scope: page.keys, page: page.label })
    if (res.error) { setChat(c => [...c, { role: 'err', text: res.error }]); setBusy(''); return }
    saveDeal(res.deal)
    setChat(c => [...c, { role: 'ai', text: res.note || 'Updated.' }]); setBusy('')
  }

  if (!authed) return <Gate onUnlock={pw => { setPassword(pw); setAuthed(true) }} />

  const working = busy !== ''

  return (
    <div className="app">
      <header className="topbar">
        <h1>NPCG <span>OM Generator</span></h1>
        <div className="brandsub">Claude · Google · Offering Memoranda</div>
      </header>

      <div className="layout">
        {/* ── Controls ── */}
        <section className="panel controls">
          <label>Property Address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="613 Main Street, Ridgefield, CT" />
          <div className="hint">Geocoded → identity, Street View cover, location map, nearby amenities (Google Places).</div>

          <label>Cover Photo <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: 'var(--graphite)' }}>(optional — overrides Street View)</span></label>
          <input type="file" accept="image/*" onChange={pickCover} />
          {coverUpload && (
            <div className="cover-prev">
              <img src={coverUpload} alt="cover" />
              <button className="ghost" type="button" onClick={() => { setCoverUpload(''); }}>Remove</button>
            </div>
          )}

          <label>Rent Roll &amp; Expenses — Excel <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: 'var(--graphite)' }}>(optional — auto-extracted)</span></label>
          <input type="file" accept=".xlsx,.xlsm" onChange={pickSheet} />
          {sheet.text
            ? <div className="cover-prev"><span className="hint" style={{ margin: 0 }}>📄 {sheet.name}</span><button className="ghost" type="button" onClick={clearSheet}>Remove</button></div>
            : <div className="hint">Drop one .xlsx with the rent roll and expenses — the AI reads it into the deck. Or type them below.</div>}

          {SECTIONS.map(s => (
            <div key={s.key}>
              <label>{s.label}</label>
              <textarea value={inputs[s.key] || ''} onChange={e => setSection(s.key, e.target.value)}
                style={{ minHeight: 22 * s.rows }} placeholder={s.ph} />
            </div>
          ))}

          <label>Model <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: 'var(--graphite)' }}>(initial draft)</span></label>
          <select value={model} onChange={e => setModel(e.target.value)}>
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>

          <div className="actions">
            <button onClick={build} disabled={working}>{busy === 'build' ? 'Building…' : (deal ? 'Rebuild OM' : 'Build OM')}</button>
            {deal && <button className="ghost" onClick={() => window.print()} disabled={working}>Download PDF</button>}
          </div>
          <div className={'status' + (/error|wrong|could not|fail/i.test(status) ? ' err' : '')}>{status}</div>

          {/* ── AI update chat (Opus) ── */}
          {deal && (
            <div className="chat">
              <label style={{ marginTop: 22 }}>Update with AI <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: 'var(--graphite)' }}>· Opus</span></label>
              <div className="chat-log">
                {chat.length === 0 && <div className="chat-empty">Ask for edits — e.g. "bump the asking price to $3.7M", "tighten the summary", "add a value-add highlight about below-market rents".</div>}
                {chat.map((m, i) => <div key={i} className={'cm cm-' + m.role}>{m.text}</div>)}
              </div>
              <select className="chat-page" value={updatePage} onChange={e => setUpdatePage(e.target.value)} disabled={working}>
                <option value="">Which page? (required)</option>
                {PAGES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
              <div className="chat-in">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder={updatePage ? 'Tell the agent what to change…' : 'Select a page above first…'}
                  onKeyDown={e => e.key === 'Enter' && sendUpdate()} disabled={working || !updatePage} />
                <button onClick={sendUpdate} disabled={working || !updatePage || !chatInput.trim()}>{busy === 'update' ? '…' : 'Send'}</button>
              </div>
            </div>
          )}
        </section>

        {/* ── Rendered deck ── */}
        <section className="panel preview-wrap">
          <div className="preview-head"><span>OM Preview {working && <em className="live">● working</em>}</span></div>
          <div className="preview deck-scroll" ref={previewRef}>
            {!deal && <div className="placeholder">Enter an address + deal facts, then <b>Build OM</b> — the offering memorandum renders here.</div>}
            {deal && (
              <div className="deck-scale" style={{ zoom }}>
                <OmDeck deal={deal} />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
