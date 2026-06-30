/* ═══════════════════ LEAD-CAPTURE GATE ═══════════════════
   Wraps the OM. Until a visitor submits their info, the deck behind is
   blurred and locked. On submit we POST to /api/lead (a Cloudflare Pages
   Function that stores the lead in KV and emails the deal team), record an
   "unlocked" flag in localStorage so returning visitors skip the gate, then
   reveal the OM.

   Deal-team contacts (Brad & Joe) are shown right on the gate so a prospect
   always has a name, face, and number even before they enter the deck. */
import { useState } from 'react'
import { DEAL } from './deal.js'
import './gate.css'

const STORAGE_KEY = 'om-salem-square-unlocked'

// Exclusively Listed By — mirrors the Deal Contacts page in App.jsx.
const CONTACTS = [
  {
    name: 'Brad Balletto',
    title: 'Managing Director, Investments',
    phone: '(203) 307-1574',
    email: 'bballetto@northeastpcg.com',
    photo: 'https://northeastpcg.com/wp-content/uploads/2021/11/Brad-B-2-430x488.jpg',
  },
  {
    name: 'Joe Ferrandino',
    title: 'Associate, Investments',
    phone: '(914) 440-0908',
    email: 'jferrandino@northeastpcg.com',
    photo: '/photos/team/joe-ferrandino.jpg',
  },
]

function hasUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function Gate({ children }) {
  const [unlocked, setUnlocked] = useState(hasUnlocked)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (unlocked) return children

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const name = form.name.trim()
    const email = form.email.trim()
    if (!name) return setError('Please enter your name.')
    if (!validEmail(email)) return setError('Please enter a valid email address.')

    setSubmitting(true)
    const payload = {
      name,
      email,
      phone: form.phone.trim(),
      company: form.company.trim(),
      deal: DEAL.name,
      page: typeof location !== 'undefined' ? location.href : '',
    }
    try {
      // Capture the lead. We never block the prospect on a backend hiccup —
      // a failed POST still unlocks the deck (the attempt is logged).
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    } finally {
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* private mode — unlock for this session anyway */
      }
      setSubmitting(false)
      setUnlocked(true)
    }
  }

  return (
    <div className="gate">
      {/* The deck renders behind, blurred & inert, so the gate feels like a
          doorway into the real document rather than a separate page. */}
      <div className="gate-behind" aria-hidden="true">
        {children}
      </div>

      <div
        className="gate-bg"
        style={{ backgroundImage: `url(${DEAL.coverImage})` }}
        aria-hidden="true"
      />
      <div className="gate-bg-shade" aria-hidden="true" />

      {/* The card reads like a single page of the OM: cover-hero on the left,
          the access request on the right. */}
      <div className="gate-card" role="dialog" aria-modal="true" aria-label="Request access to the offering memorandum">
        <div className="gate-body">
          {/* ── Left: cover hero ── */}
          <div className="gate-hero" style={{ backgroundImage: `url(${DEAL.coverImage})` }}>
            <div className="gate-hero-shade" />
            <div className="gate-hero-overlay">
              <span className="gate-status-box">{DEAL.status}</span>
              <h1 className="gate-hero-title">{DEAL.name}</h1>
              <div className="gate-hero-addr">{DEAL.address}</div>
              <div className="gate-hero-sub">{DEAL.cityState}</div>
              <div className="gate-hero-rule" />
              <div className="gate-hero-type">{DEAL.type}</div>
            </div>
          </div>

          {/* ── Right: lead-capture form + deal team ── */}
          <div className="gate-content">
            <div className="eyebrow">Request Access</div>
            <h2 className="gate-title">View the Offering Memorandum</h2>
            <div className="title-rule" />
            <p className="gate-sub">
              Please enter your information to view the full offering. A member of our
              team will be in touch.
            </p>

            <form className="gate-form" onSubmit={handleSubmit} noValidate>
              <div className="gate-grid">
                <label className="gate-field">
                  <span className="gate-label">Name <em>*</em></span>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" required />
                </label>
                <label className="gate-field">
                  <span className="gate-label">Email <em>*</em></span>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" required />
                </label>
                <label className="gate-field">
                  <span className="gate-label">Phone</span>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000" autoComplete="tel" />
                </label>
                <label className="gate-field">
                  <span className="gate-label">Company</span>
                  <input type="text" value={form.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
                </label>
              </div>

              {error && <div className="gate-error">{error}</div>}

              <button className="gate-submit" type="submit" disabled={submitting}>
                {submitting ? 'Unlocking…' : 'View the Offering'}
              </button>
              <div className="gate-disclaimer">
                By submitting, you agree to be contacted regarding this offering. Your
                information is shared only with Northeast Private Client Group.
              </div>
            </form>

            {/* ── Deal team (matches the Deal Contacts page) ── */}
            <div className="gate-listed-label">Exclusively Listed By</div>
            <div className="gate-contacts">
              {CONTACTS.map((c) => (
                <div className="gate-contact" key={c.email}>
                  <img className="gate-avatar" src={c.photo} alt={c.name} />
                  <div className="gate-contact-info">
                    <div className="gate-contact-name">{c.name}</div>
                    <div className="gate-contact-title">{c.title}</div>
                    <a className="gate-contact-link" href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}>{c.phone}</a>
                    <a className="gate-contact-link" href={`mailto:${c.email}`}>{c.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
