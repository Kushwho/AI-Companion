'use client'

import { useEffect } from 'react'
import { trackAppCtaClick } from '@/app/lib/analytics'

export default function StickyCTA() {
  useEffect(() => {
    const sticky = document.getElementById('stickyCta')
    const waitlist = document.getElementById('waitlist')
    if (!sticky) return

    const handler = () => {
      const show = scrollY > 600
      const inWaitlist = waitlist && waitlist.getBoundingClientRect().top < window.innerHeight
      sticky.classList.toggle('visible', show && !inWaitlist)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="sticky-cta" id="stickyCta">
      <a className="btn btn-primary-lg" href="#waitlist" style={{ width: '100%', textAlign: 'center' }} onClick={() => trackAppCtaClick('sticky_bottom', 'Reserve Your Spot — Free')}>
        Reserve Your Spot — Free →
      </a>
    </div>
  )
}
