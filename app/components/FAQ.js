'use client'

import { useCallback } from 'react'

const faqs = [
  { q: "Is my child's conversation data safe?", a: "Absolutely. Conversations are end-to-end encrypted and never read by us. Emotion tracking analyses patterns only — not content. We're DPDPA 2023 compliant." },
  { q: 'What ages is Sakhi designed for?', a: 'Sakhi adapts to children aged 4–12, with age-appropriate language, topics, and complexity levels that grow with your child.' },
  { q: 'Does Sakhi just give homework answers?', a: 'Never. Sakhi uses Socratic questioning to guide your child to the answer themselves, building real understanding. Aligned with CBSE, ICSE, and state boards.' },
  { q: 'What languages does Sakhi speak?', a: 'Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and English — with more coming soon.' },
  { q: 'What devices does Sakhi work on?', a: 'Sakhi works on any smartphone or tablet via our app (iOS and Android), and via web browser on desktop.' },
]

export default function FAQ() {
  const toggleFaq = useCallback((e) => {
    e.currentTarget.closest('.faq-item').classList.toggle('open')
  }, [])

  return (
    <section id="faq">
      <div className="max">
        <div className="section-header fade-up" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--jade)', borderColor: 'rgba(52, 211, 153, 0.2)', background: 'rgba(52, 211, 153, 0.06)', margin: '0 auto', display: 'inline-flex' }}>
            ✦ Common Questions
          </div>
          <h2 style={{ textAlign: 'center', marginTop: 14 }}>Parents ask, <em>we answer.</em></h2>
        </div>
        <div className="faq-list fade-up">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>
                <span>{f.q}</span><span className="faq-arrow">+</span>
              </button>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
