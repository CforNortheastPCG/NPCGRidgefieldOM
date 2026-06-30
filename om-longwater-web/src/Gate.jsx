/* ═══════════════════ LEAD-CAPTURE GATE ═══════════════════
   Wraps the OM. Until a visitor submits their info, the deck behind is
   blurred and locked. On submit we POST to /api/lead (a Cloudflare Pages
   Function that emails the deal team), record an "unlocked" flag in
   localStorage so returning visitors skip the gate, then reveal the OM.

   On submit the lead is emailed to the deal team; the contact card itself is
   kept off the gate. */
import { useState } from 'react'
import { DEAL } from './deal.js'
import './gate.css'

const STORAGE_KEY = 'om-longwater-unlocked'

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

            <div className="gate-moreinfo" style={{ marginTop: 18, fontSize: 12, lineHeight: 1.5, color: 'var(--graphite)' }}>
              For more information, contact <strong>Tom Egbers</strong> ·{' '}
              <a className="gate-contact-link" href="tel:+18579902022">(857) 990-2022</a> ·{' '}
              <a className="gate-contact-link" href="mailto:tegbers@northeastpcg.com">tegbers@northeastpcg.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
