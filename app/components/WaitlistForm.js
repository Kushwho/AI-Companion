'use client'

import { useRef, useState } from 'react'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4fq8_wezF5FMwVmq-wugUcoWzyxiQSDHD9wF86SZNJL3enDcSk4MMP3LblX2STab2ew/exec'

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fnameRef = useRef(null)
  const femailRef = useRef(null)
  const fageRef = useRef(null)

  async function handleSubmit() {
    const fname = fnameRef.current.value.trim()
    const femail = femailRef.current.value.trim()
    const fage = fageRef.current.value

    if (!fname || !femail) {
      alert('Please enter your name and email.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(femail)) {
      alert('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fname, email: femail, age: fage }),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <section id="waitlist">
      <div className="wl-left fade-up">
        <div className="section-tag" style={{ color: 'var(--terra2)', borderColor: 'rgba(232, 101, 58, 0.2)', background: 'rgba(232, 101, 58, 0.06)' }}>
          ✦ Early Access
        </div>
        <h2 style={{ marginTop: 14 }}>Be there before your<br />child&apos;s childhood<br /><em>goes by.</em></h2>
        <p>Our beta cohort is 85% full. Join free today to secure founding pricing before the public launch.</p>
        <div className="wl-trust">
          <div className="wl-trust-item">Free to join, no credit card</div>
          <div className="wl-trust-item">Founding pricing locked in forever</div>
          <div className="wl-trust-item">COPPA-compliant, child-safe</div>
        </div>
      </div>
      <div className="wl-form fade-up d2">
        {!submitted ? (
          <div id="formContent">
            <div className="form-grid">
              <div className="form-field">
                <label>Parent&apos;s Name</label>
                <input type="text" ref={fnameRef} placeholder="Sarah Mitchell" />
              </div>
              <div className="form-field">
                <label>Child&apos;s Age</label>
                <select ref={fageRef} defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>4–5 years</option>
                  <option>6–8 years</option>
                  <option>9–12 years</option>
                </select>
              </div>
              <div className="form-field form-full">
                <label>Email Address</label>
                <input type="email" ref={femailRef} placeholder="sarah@email.com" />
              </div>
            </div>
            <p className="form-time">Takes 15 seconds</p>
            <button className="form-submit" onClick={handleSubmit} disabled={submitting} style={submitting ? { opacity: 0.7 } : undefined}>
              {submitting ? 'Submitting…' : 'Reserve Our Spot →'}
            </button>
            <p className="form-note">200 families ahead.</p>
          </div>
        ) : (
          <div className="form-success show">
            <div style={{ fontSize: 52 }}>🌟</div>
            <h3>You&apos;re on the list!</h3>
            <p>We&apos;ll reach out as early access opens in your city. Tell a parent friend — the social layer works best when your child&apos;s friends are on it too.</p>
          </div>
        )}
      </div>
    </section>
  )
}
