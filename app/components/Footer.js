import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Playla</div>
      <div className="footer-links">
        <a href="#">Child Safety</a>
        <Link href="/privacy">Privacy</Link>
        <a href="#">Contact</a>
      </div>
      <div className="footer-note">COPPA Compliant · Child-Safe by Design</div>
    </footer>
  )
}
