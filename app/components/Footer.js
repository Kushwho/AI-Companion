import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Playla</div>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-note">COPPA Compliant · Child-Safe by Design</div>
    </footer>
  )
}
