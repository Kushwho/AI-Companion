'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      document.getElementById('nav')?.classList.toggle('scrolled', scrollY > 10)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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
        <a className="btn btn-primary nav-cta" href="/#waitlist">Reserve Your Spot</a>
        <button
          className={`hamburger${menuOpen ? ' hamburger--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile menu - rendered outside nav to avoid layout issues */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <a href="/#features" onClick={closeMenu}>Features</a>
        <Link href="/stories" onClick={closeMenu}>Stories</Link>
        <a href="/#dashboard" onClick={closeMenu}>Dashboard</a>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <a className="btn btn-primary mobile-menu-cta" href="/#waitlist" onClick={closeMenu}>Reserve Your Spot</a>
      </div>
    </>
  )
}
