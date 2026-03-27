'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
      <a className="nav-logo" href="/">
        <span className="logo-dot"></span> Playla
      </a>
      <ul className="nav-links">
        <li><a href="/#features">Features</a></li>
        <li><Link href="/stories">Stories</Link></li>
        <li><a href="/#dashboard">Dashboard</a></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <a className="btn btn-primary" href="/#waitlist">Reserve Your Spot</a>
    </nav>
  )
}
