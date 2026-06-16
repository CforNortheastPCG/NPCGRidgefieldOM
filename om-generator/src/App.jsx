import { useState, useEffect, useRef, useCallback } from 'react'
import readXlsxFile from 'read-excel-file/browser'
import OmDeck from './om/OmDeck.jsx'
import { ROSTER } from './om/firm.js'

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
  { id: 'rentroll', label: 'Rent Roll', keys: ['rentRoll', 'units'], refKinds: ['rentroll'] },
  { id: 'income', label: 'Income & Expense', keys: ['expenses'], refKinds: ['ie', 'rentroll'] },
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
  { key: 'location', label: 'Location & Market', rows: 4,
    ph: 'Neighborhood, employers, schools, transit/highway access, demographics, comps. Google Places auto-pulls nearby amenities — add anything it would miss.' },
]

// Rent roll + expenses come from the uploaded .xlsx (see the Photos & spreadsheet
// group), so they aren't typed sections — but typed notes are still honored if a
// user adds them under "Notes" inside the relevant inputs.

// Broker quips that cycle while the OM generates.
const QUIPS = [
  'What are you gonna spend the money on?',
  'Is this really a 6 cap?',
  'Adjusting the pro forma to taste…',
  'Finding comps that agree with us…',
  'Assuming below-market rents (aggressively)…',
  'Calling deferred maintenance “upside”…',
  'Telling the seller it’s worth more…',
  'Telling the buyer it’s worth less…',
  'Stabilizing the NOI with optimism…',
  'Rounding the cap rate in your favor…',
  'Adding “transit-oriented” to the highlights…',
  'Spinning the vacancy as a “lease-up opportunity”…',
  'Pre-writing the “priced to sell” email…',
  'Booking the closing dinner…',
  'Counting the parking spaces twice…',
]

// Attached-document kinds. Rent roll + I&E docs are extracted into the deal AND
// kept as reference material the AI update chat can cite.
const DOC_KINDS = [
  { id: 'rentroll', label: 'Rent Roll' },
  { id: 'ie', label: 'Income & Expense' },
  { id: 'other', label: 'Other' },
]
const kindLabel = (k) => (DOC_KINDS.find(d => d.id === k) || DOC_KINDS[2]).label
// Guess a doc's kind from its filename.
function guessKind(name) {
  if (/rent|\brr\b|roll/i.test(name)) return 'rentroll'
  if (/i&e|income|expense|t-?12|operating|noi|oper/i.test(name)) return 'ie'
  return 'other'
}

const ss = {
  get: (k, d = '') => { try { return localStorage.getItem(k) ?? d } catch { return d } },
  set: (k, v) => { try { localStorage.setItem(k, v) } catch { /* */ } },
}

// Concatenate the text of all attached docs of one kind.
function docsText(docs, kind) {
  return docs.filter(d => d.kind === kind).map(d => `[${d.name}]\n${d.text}`).join('\n\n')
}

// Compose the structured sections (+ any attached docs) into the single labeled
// facts string /api/fill expects.
function composeFacts(inputs, docs) {
  const parts = SECTIONS
    .map(s => ({ s, v: (inputs[s.key] || '').trim() }))
    .filter(x => x.v)
    .map(({ s, v }) => `${s.label.toUpperCase()}:\n${v}`)
  const rr = docsText(docs, 'rentroll')
  if (rr) parts.push(`RENT ROLL (imported — extract the unit-by-unit rent roll; read headers for in-place vs market/pro-forma rents):\n${rr}`)
  const ie = docsText(docs, 'ie')
  if (ie) parts.push(`INCOME & EXPENSE / T-12 (imported — extract the operating expenses, and reconcile income against the rent roll):\n${ie}`)
  const other = docsText(docs, 'other')
  if (other) parts.push(`ADDITIONAL DOCUMENTS:\n${other}`)
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
  const [docs, setDocs] = useState(() => { try { return JSON.parse(ss.get('om_docs') || '[]') } catch { return [] } }) // attached rent roll / I&E / other docs
  const [parsing, setParsing] = useState('') // filename currently being read
  const [deal, setDeal] = useState(() => { try { return JSON.parse(ss.get('om_deal') || 'null') } catch { return null } })
  const [sectionPhoto, setSectionPhoto] = useState(() => { try { return JSON.parse(ss.get('om_deal') || 'null')?.sectionPhoto || '' } catch { return '' } }) // one photo for all section dividers
  const [team, setTeam] = useState(() => { // names of the deal team on the Deal Contacts page
    try { const t = JSON.parse(ss.get('om_deal') || 'null')?.dealTeam; if (t?.length) return t.map(m => m.name) } catch { /* */ }
    return ['Brad Balletto', 'Jeff Wright']
  })
  const [busy, setBusy] = useState('')
  const [status, setStatus] = useState('')
  const [chat, setChat] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [updatePage, setUpdatePage] = useState('')
  const [zoom, setZoom] = useState(0.6)
  const [quip, setQuip] = useState('')
  const previewRef = useRef(null)

  // Cycle the broker quips while building.
  useEffect(() => {
    if (busy !== 'build') { setQuip(''); return }
    let i = Math.floor(Math.random() * QUIPS.length)
    setQuip(QUIPS[i])
    const id = setInterval(() => { i = (i + 1) % QUIPS.length; setQuip(QUIPS[i]) }, 2400)
    return () => clearInterval(id)
  }, [busy])

  useEffect(() => { ss.set('om_addr', address) }, [address])
  useEffect(() => { ss.set('om_inputs', JSON.stringify(inputs)) }, [inputs])
  useEffect(() => { ss.set('om_model', model) }, [model])
  useEffect(() => { ss.set('om_docs', JSON.stringify(docs)) }, [docs])
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

  function toggleTeam(name) {
    setTeam(prev => {
      const next = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      if (deal) saveDeal({ ...deal, dealTeam: ROSTER.filter(m => next.includes(m.name)) })
      return next
    })
  }

  async function pickSectionPhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await fileToDataUrl(file)
      setSectionPhoto(url)
      if (deal) saveDeal({ ...deal, sectionPhoto: url })
    } catch { setStatus('Could not read that image.') }
  }
  function clearSectionPhoto() {
    setSectionPhoto('')
    if (deal) saveDeal({ ...deal, sectionPhoto: '' })
  }

  // Attach one or more .xlsx docs; each is read into text and tagged by kind.
  async function addDocs(e) {
    const files = [...(e.target.files || [])]
    e.target.value = ''
    for (const file of files) {
      setParsing(file.name)
      try {
        const { text, rows } = await workbookToText(file)
        const doc = { id: `${file.name}-${Math.floor(Math.random() * 1e9)}`, name: file.name, kind: guessKind(file.name), text, rows }
        setDocs(prev => [...prev, doc])
        setStatus(`Attached ${file.name} (${rows} rows) as ${kindLabel(doc.kind)}.`)
      } catch { setStatus(`Could not read ${file.name} — export it as .xlsx and try again.`) }
    }
    setParsing('')
  }
  const setDocKind = (id, kind) => setDocs(prev => prev.map(d => d.id === id ? { ...d, kind } : d))
  const removeDoc = (id) => setDocs(prev => prev.filter(d => d.id !== id))

  async function build() {
    const facts = composeFacts(inputs, docs)
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
    if (sectionPhoto) merged.sectionPhoto = sectionPhoto
    merged.dealTeam = ROSTER.filter(m => team.includes(m.name))
    saveDeal(merged)
    setStatus(`Done.${enriched.amenities?.length ? ` ${enriched.amenities.length} nearby places.` : ''}`); setBusy('')
  }

  // One code path for every AI edit: page scope + instruction (+ reference docs).
  async function runUpdate({ label, scope, instruction, refKinds = [], busyKey = 'update' }) {
    if (!instruction || !deal) return
    const refs = refKinds.flatMap(k => docs.filter(d => d.kind === k).map(d => ({ name: d.name, text: d.text })))
    setChat(c => [...c, { role: 'user', text: `[${label}] ${instruction}${refs.length ? ` · ${refs.length} ref` : ''}` }]); setBusy(busyKey)
    const res = await post('/api/update', { password, model: UPDATE_MODEL, deal, instruction, scope, page: label, refs })
    if (res.error) { setChat(c => [...c, { role: 'err', text: res.error }]); setBusy(''); return false }
    saveDeal(res.deal)
    setChat(c => [...c, { role: 'ai', text: res.note || 'Updated.' }]); setBusy('')
    return true
  }

  async function sendUpdate() {
    const instruction = chatInput.trim()
    if (!instruction || !deal) return
    const page = PAGES.find(p => p.id === updatePage)
    if (!page) { setChat(c => [...c, { role: 'err', text: 'Pick a page to edit first.' }]); return }
    if (await runUpdate({ label: page.label, scope: page.keys, instruction, refKinds: page.refKinds })) setChatInput('')
  }

  // Dedicated quick editors for the two data-heavy pages — each cites its attached docs.
  const [rrInput, setRrInput] = useState('')
  const [ieInput, setIeInput] = useState('')
  async function sendRr() { if (await runUpdate({ label: 'Rent Roll', scope: ['rentRoll', 'units'], instruction: rrInput.trim(), refKinds: ['rentroll'], busyKey: 'rr' })) setRrInput('') }
  async function sendIe() { if (await runUpdate({ label: 'Income & Expense', scope: ['expenses'], instruction: ieInput.trim(), refKinds: ['ie', 'rentroll'], busyKey: 'ie' })) setIeInput('') }

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
          <div className="hint">Auto-pulls cover, location map & nearby amenities (Google).</div>

          <details className="grp">
            <summary>Photos &amp; documents{(coverUpload || docs.length || sectionPhoto) ? <span className="grp-count">{[coverUpload && 'cover', docs.length && `${docs.length} doc${docs.length > 1 ? 's' : ''}`, sectionPhoto && 'section'].filter(Boolean).join(' · ')}</span> : null}</summary>

            <label>Cover Photo <span className="opt">overrides Street View</span></label>
            <input type="file" accept="image/*" onChange={pickCover} />
            {coverUpload && <div className="cover-prev"><img src={coverUpload} alt="cover" /><button className="ghost" type="button" onClick={() => setCoverUpload('')}>Remove</button></div>}

            <label>Rent Roll &amp; I&amp;E Documents <span className="opt">.xlsx · attach multiple</span></label>
            <input type="file" accept=".xlsx,.xlsm" multiple onChange={addDocs} disabled={!!parsing} />
            {parsing && <div className="doc-row doc-parsing"><span className="spin" /> Reading {parsing}…</div>}
            {docs.map(d => (
              <div key={d.id} className="doc-row">
                <span className="doc-name" title={d.name}>📄 {d.name} <span className="opt">{d.rows}r</span></span>
                <select value={d.kind} onChange={e => setDocKind(d.id, e.target.value)}>
                  {DOC_KINDS.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
                </select>
                <button className="ghost" type="button" onClick={() => removeDoc(d.id)}>✕</button>
              </div>
            ))}
            {!docs.length && !parsing && <div className="hint">Attach rent roll + I&amp;E workbooks — they're extracted into the deck and kept as reference for AI edits.</div>}

            <label>Section Cover Photo <span className="opt">used on all dividers</span></label>
            <input type="file" accept="image/*" onChange={pickSectionPhoto} />
            {sectionPhoto && <div className="cover-prev"><img src={sectionPhoto} alt="section" /><button className="ghost" type="button" onClick={clearSectionPhoto}>Remove</button></div>}
          </details>

          <details className="grp">
            <summary>Deal Team <span className="grp-count">{team.length} on contacts page</span></summary>
            {ROSTER.map(m => (
              <label key={m.name} className="team-pick">
                <input type="checkbox" checked={team.includes(m.name)} onChange={() => toggleTeam(m.name)} />
                <span className="team-pick-name">{m.name}</span>
                <span className="team-pick-title">{m.title}</span>
              </label>
            ))}
          </details>

          {SECTIONS.map(s => (
            <div key={s.key}>
              <label>{s.label}</label>
              <textarea value={inputs[s.key] || ''} onChange={e => setSection(s.key, e.target.value)}
                style={{ minHeight: 22 * s.rows }} placeholder={s.ph} />
            </div>
          ))}

          <label>Model <span className="opt">initial draft</span></label>
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
              <label style={{ marginTop: 22 }}>Update with AI <span className="opt">· Opus</span></label>
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

              {/* Dedicated editors for the two data-heavy pages — cite attached docs */}
              <label style={{ marginTop: 16 }}>Edit Rent Roll <span className="opt">{docs.filter(d => d.kind === 'rentroll').length} ref doc(s)</span></label>
              <div className="chat-in">
                <input value={rrInput} onChange={e => setRrInput(e.target.value)} placeholder='e.g. "re-pull unit 4 from the attached rent roll"'
                  onKeyDown={e => e.key === 'Enter' && rrInput.trim() && sendRr()} disabled={working} />
                <button onClick={sendRr} disabled={working || !rrInput.trim()}>{busy === 'rr' ? '…' : 'Edit'}</button>
              </div>
              <label style={{ marginTop: 12 }}>Edit Income &amp; Expense <span className="opt">{docs.filter(d => d.kind === 'ie').length} ref doc(s)</span></label>
              <div className="chat-in">
                <input value={ieInput} onChange={e => setIeInput(e.target.value)} placeholder='e.g. "use the T-12 taxes & insurance, not pro forma"'
                  onKeyDown={e => e.key === 'Enter' && ieInput.trim() && sendIe()} disabled={working} />
                <button onClick={sendIe} disabled={working || !ieInput.trim()}>{busy === 'ie' ? '…' : 'Edit'}</button>
              </div>
            </div>
          )}
        </section>

        {/* ── Rendered deck ── */}
        <section className="panel preview-wrap">
          <div className="preview-head"><span>OM Preview {working && <em className="live">● working</em>}</span></div>
          {busy === 'build' && quip && <div className="quip" key={quip}>{quip}</div>}
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
