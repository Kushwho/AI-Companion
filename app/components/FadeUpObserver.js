'use client'

import { useEffect } from 'react'

export default function FadeUpObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return null
}
