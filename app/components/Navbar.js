'use client'

import { useEffect } from 'react'

export default function Navbar() {
  useEffect(() => {
    const handler = () => {
      document.getElementById('nav')?.classList.toggle('scrolled', scrollY > 10)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav id="nav">
      <a className="nav-logo" href="#">
        <span className="logo-dot"></span> Sakhi
      </a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#agents">Social Layer</a></li>
        <li><a href="#dashboard">Dashboard</a></li>
      </ul>
      <a className="btn btn-primary" href="#waitlist">Reserve Your Spot</a>
    </nav>
  )
}
