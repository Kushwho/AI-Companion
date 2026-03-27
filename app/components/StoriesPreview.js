'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const stories = [
  { emoji: '🐉', genre: 'Fantasy', title: 'The Dragon of Willowmere', color: 'var(--purple)', bg: 'rgba(139, 92, 246, 0.12)' },
  { emoji: '🌙', genre: 'Bedtime', title: 'The Moon That Lost Its Glow', color: 'var(--blue)', bg: 'rgba(99, 102, 241, 0.12)' },
  { emoji: '🏴‍☠️', genre: 'Adventure', title: 'Captain Coral and the Sea Caves', color: 'var(--terra)', bg: 'rgba(232, 101, 58, 0.12)' },
  { emoji: '🤣', genre: 'Funny', title: 'The Day My Homework Ate the Dog', color: 'var(--gold)', bg: 'rgba(245, 158, 11, 0.12)' },
  { emoji: '🔬', genre: 'Sci-Fi', title: 'The Girl Who Grew a Planet', color: 'var(--jade)', bg: 'rgba(52, 211, 153, 0.12)' },
  { emoji: '🏰', genre: 'Fairy Tale', title: 'The Enchanted Forest Kingdom', color: 'var(--purple2)', bg: 'rgba(167, 139, 250, 0.12)' },
]

export default function StoriesPreview() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame
    let offset = 0
    const speed = 0.4

    function animate() {
      offset -= speed
      const firstChild = track.firstElementChild
      if (firstChild && Math.abs(offset) >= firstChild.offsetWidth + 16) {
        offset += firstChild.offsetWidth + 16
        track.appendChild(firstChild)
      }
      track.style.transform = `translateX(${offset}px)`
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="stories-preview">
      <div className="max">
        <div className="stories-header fade-up">
          <div
            className="section-tag"
            style={{
              color: 'var(--purple2)',
              borderColor: 'rgba(139, 92, 246, 0.25)',
              background: 'rgba(139, 92, 246, 0.08)',
            }}
          >
            ✦ Stories
          </div>
          <h2>
            Infinite stories, <em>uniquely theirs.</em>
          </h2>
          <p className="stories-sub">
            Every story is AI-generated, personalised to your child&apos;s interests, and narrated
            aloud. Fantasy, bedtime, adventure &mdash; pick a genre or let Playla surprise them.
          </p>
        </div>
      </div>

      <div className="stories-carousel-wrapper">
        <div className="stories-carousel-mask">
          <div className="stories-track" ref={trackRef}>
            {[...stories, ...stories].map((s, i) => (
              <div key={i} className="story-preview-card" style={{ '--card-color': s.color, '--card-bg': s.bg }}>
                <div className="spc-emoji">{s.emoji}</div>
                <div className="spc-genre">{s.genre}</div>
                <h3 className="spc-title">{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max" style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/stories" className="btn btn-ghost fade-up">
          Explore All Genres &rarr;
        </Link>
      </div>
    </section>
  )
}
