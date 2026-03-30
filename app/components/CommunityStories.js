'use client'

import { useEffect, useRef, useState } from 'react'

const communityStories = [
  {
    title: 'The Night the Stars Came Down to Play',
    child: 'Anaya, age 6',
    genre: 'Bedtime',
    color: 'var(--blue)',
    bg: 'rgba(99, 102, 241, 0.10)',
    rating: 5,
    parent: 'Priya Sharma',
    parentEmoji: '👩',
    location: 'Mumbai',
    excerpt:
      'One evening, little Meera refused to sleep. "The sky is too beautiful," she whispered. So the stars heard her — and one by one, they floated down through her window like golden fireflies. The smallest star, barely bigger than a marble, landed on her pillow. "We get lonely up there too," it said. Meera giggled and tucked it under her blanket. Together, they counted backwards from a hundred. By forty-two, both were fast asleep — Meera dreaming of constellations, and the tiny star dreaming of warm blankets.',
    badge: 'Most Loved This Week',
    readTime: '4 min',
    hearts: 342,
  },
  {
    title: 'Captain Rudo and the Mango Treasure Map',
    child: 'Kabir, age 8',
    genre: 'Adventure',
    color: 'var(--terra)',
    bg: 'rgba(232, 101, 58, 0.10)',
    rating: 4.8,
    parent: 'Arjun Mehta',
    parentEmoji: '👨',
    location: 'Bangalore',
    excerpt:
      'Rudo found the map inside his grandmother\'s old recipe book — drawn in turmeric ink on the back of a dosa batter stain. "X marks the sweetest mango in the world," read the tiny writing. He packed his slingshot, three rotis, and his best friend\'s phone number (just in case). The trail led through the neighbourhood park, past the chai stall where Mr. Iyer waved, and into the lane behind the temple nobody ever walked down. There, behind a crumbling wall covered in jasmine, stood a tree so heavy with mangoes that its branches touched the ground. Rudo bit into one. It tasted like summer holidays and his grandmother\'s laugh.',
    badge: 'New Today',
    readTime: '6 min',
    hearts: 128,
  },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const start = performance.now()
          function step(now) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="cs-counter-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function CommunityStories() {
  return (
    <section id="community-stories" className="story-seo-section">
      {/* Counter banner */}
      <div className="cs-banner">
        <div className="cs-banner-glow" />
        <div className="cs-banner-content">
          <div className="cs-banner-stat">
            <AnimatedCounter target={1000} suffix="+" />
            <span className="cs-banner-label">stories created by families</span>
          </div>
          <p className="cs-banner-sub">
            Every story is unique — shaped by your child's name, interests, and imagination.
            Here are two that families loved this week.
          </p>
        </div>
      </div>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <div
          className="section-tag"
          style={{
            color: 'var(--jade)',
            borderColor: 'rgba(52, 211, 153, 0.25)',
            background: 'rgba(52, 211, 153, 0.08)',
            margin: '0 auto',
            display: 'inline-flex',
          }}
        >
          ✦ From Our Community
        </div>
        <h2 style={{ textAlign: 'center', marginTop: 14 }}>
          Real stories, created by <em>real families.</em>
        </h2>
      </div>

      {/* Story cards */}
      <div className="cs-grid">
        {communityStories.map((story, i) => (
          <article
            key={i}
            className="cs-card"
            style={{ '--cs-color': story.color, '--cs-bg': story.bg }}
          >
            {/* Badge */}
            <div className="cs-badge">{story.badge}</div>

            {/* Header */}
            <div className="cs-card-header">
              <div className="cs-genre-tag">{story.genre}</div>
              <div className="cs-read-time">{story.readTime} read</div>
            </div>

            {/* Title */}
            <h3 className="cs-card-title">{story.title}</h3>
            <div className="cs-created-by">
              Created for <strong>{story.child}</strong>
            </div>

            {/* Story excerpt */}
            <div className="cs-excerpt">
              <p>{story.excerpt}</p>
              <div className="cs-excerpt-fade" />
            </div>

            {/* Footer */}
            <div className="cs-card-footer">
              <div className="cs-parent-info">
                <div className="cs-parent-avatar">{story.parentEmoji}</div>
                <div>
                  <div className="cs-parent-name">{story.parent}</div>
                  <div className="cs-parent-loc">{story.location}</div>
                </div>
              </div>
              <div className="cs-card-stats">
                <div className="cs-hearts">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--terra)" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{story.hearts}</span>
                </div>
                <div className="cs-rating">
                  <span className="cs-star">★</span>
                  <span>{story.rating}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Social proof strip */}
      <div className="cs-proof-strip">
        <div className="cs-proof-avatars">
          {['👩', '👨', '👩', '👨', '👩'].map((e, i) => (
            <div key={i} className="cs-proof-face" style={{ zIndex: 5 - i }}>
              {e}
            </div>
          ))}
        </div>
        <p className="cs-proof-text">
          Join <strong>1,000+</strong> parents who&apos;ve created personalised stories for their children
        </p>
      </div>
    </section>
  )
}
