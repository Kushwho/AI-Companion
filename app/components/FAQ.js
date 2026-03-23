'use client'

import { useCallback } from 'react'

const faqs = [
  { q: "Is my child's conversation data safe?", a: "Absolutely. Conversations are end-to-end encrypted and never read by us. Emotion tracking analyses patterns only — not content. We're COPPA compliant." },
  { q: 'What ages is Playla designed for?', a: 'Playla adapts to children aged 4–12, with age-appropriate language, topics, and complexity levels that grow with your child.' },
  { q: 'Does Playla just give homework answers?', a: 'Never. Playla uses Socratic questioning to guide your child to the answer themselves, building real understanding. Aligned with Common Core and international standards.' },
  { q: 'What languages does Playla speak?', a: 'English, Spanish, French, German, Portuguese, and Mandarin — with more coming soon.' },
  { q: 'What devices does Playla work on?', a: 'Playla works on any smartphone or tablet via our app (iOS and Android), and via web browser on desktop.' },
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
