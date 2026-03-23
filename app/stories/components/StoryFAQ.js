'use client'

import { useState } from 'react'

export default function StoryFAQ({ faqs }) {
  const [openIdx, setOpenIdx] = useState(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <div className="story-faq-list">
      {faqs.map((f, i) => (
        <div key={f.q} className={`story-faq-item${openIdx === i ? ' open' : ''}`}>
          <button
            className="story-faq-q"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            {f.q}
            <span className="story-faq-arrow">+</span>
          </button>
          <div className="story-faq-a">
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
