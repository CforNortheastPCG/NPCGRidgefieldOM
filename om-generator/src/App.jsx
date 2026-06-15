import { useState, useEffect, useRef, useCallback } from 'react'
import OmDeck from './om/OmDeck.jsx'

/* NPCG OM Generator — full stack.
   Address → /api/enrich (Google, scripted) + facts → /api/fill (AI, structured)
   → one deal model → renders the branded OM deck. AI update chat edits the model
   via /api/update. The working OM auto-saves to localStorage. */

const MODELS = [
  { id: 'claude-opus-4-8', label: 'Opus 4.8 — recommended' },
  { id: 'claude-fable-5', label: 'Fable 5 — most capable' },
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6 — faster' },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5 — cheapest' },
]

const ss = {
  get: (k, d = '') => { try { return localStorage.getItem(k) ?? d } catch { return d } },
  set: (k, v) => { try { localStorage.setItem(k, v) } catch { /* */ } },
}

async function post(url, payload) {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
  let data = null
  try { data = await res.json() } catch { /* */ }
  if (!res.ok) return { error: (data && data.error) || `Request failed (${res.status}).` }
  return data
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
  const [facts, setFacts] = useState(ss.get('om_facts'))
  const [model, setModel] = useState(ss.get('om_model') || 'claude-opus-4-8')
  const [deal, setDeal] = useState(() => { try { return JSON.parse(ss.get('om_deal') || 'null') } catch { return null } })
  const [busy, setBusy] = useState('')
  const [status, setStatus] = useState('')
  const [chat, setChat] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [zoom, setZoom] = useState(0.6)
  const previewRef = useRef(null)

  useEffect(() => { ss.set('om_addr', address) }, [address])
  useEffect(() => { ss.set('om_facts', facts) }, [facts])
  useEffect(() => { ss.set('om_model', model) }, [model])
  const saveDeal = (d) => { setDeal(d); ss.set('om_deal', JSON.stringify(d)) }

  // scale the 960px deck to fit the preview column
  const fit = useCallback(() => {
    if (previewRef.current) setZoom(Math.min(1, Math.max(0.28, (previewRef.current.clientWidth - 48) / 960)))
  }, [])
  useEffect(() => { fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit) }, [fit])

  async function build() {
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
    saveDeal({ ...enriched, ...fl.deal })
    setStatus('Done.'); setBusy('')
  }

  async function sendUpdate() {
    const instruction = chatInput.trim()
    if (!instruction || !deal) return
    setChat(c => [...c, { role: 'user', text: instruction }]); setChatInput(''); setBusy('update')
    const res = await post('/api/update', { password, model, deal, instruction })
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
          <div className="hint">Geocoded → identity, Street View cover, location map (auto).</div>

          <label>Deal Facts</label>
          <textarea value={facts} onChange={e => setFacts(e.target.value)} style={{ minHeight: 170 }}
            placeholder={'Units & mix, year built, lot/SF, asking price, in-place & market rents (or a rent roll), utilities, expenses/T-12, parking, narrative facts. The agent drafts the prose; you supply the numbers.'} />

          <label>Model</label>
          <select value={model} onChange={e => setModel(e.target.value)}>
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>

          <div className="actions">
            <button onClick={build} disabled={working}>{busy === 'build' ? 'Building…' : (deal ? 'Rebuild OM' : 'Build OM')}</button>
            {deal && <button className="ghost" onClick={() => window.print()} disabled={working}>Download PDF</button>}
          </div>
          <div className={'status' + (/error|wrong|could not|fail/i.test(status) ? ' err' : '')}>{status}</div>

          {/* ── AI update chat ── */}
          {deal && (
            <div className="chat">
              <label style={{ marginTop: 22 }}>Update with AI</label>
              <div className="chat-log">
                {chat.length === 0 && <div className="chat-empty">Ask for edits — e.g. "bump the asking price to $3.7M", "tighten the summary", "add a value-add highlight about below-market rents".</div>}
                {chat.map((m, i) => <div key={i} className={'cm cm-' + m.role}>{m.text}</div>)}
              </div>
              <div className="chat-in">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Tell the agent what to change…"
                  onKeyDown={e => e.key === 'Enter' && sendUpdate()} disabled={working} />
                <button onClick={sendUpdate} disabled={working || !chatInput.trim()}>{busy === 'update' ? '…' : 'Send'}</button>
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
