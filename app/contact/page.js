import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeUpObserver from '../components/FadeUpObserver'

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.playla.org/contact#contactpage',
  name: 'Contact Playla',
  description: 'Get in touch with the Playla team. Questions, feedback, or partnership inquiries.',
  url: 'https://www.playla.org/contact',
  isPartOf: { '@id': 'https://www.playla.org/#website' },
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://www.playla.org/#organization',
    email: 'hello@playla.org',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@playla.org',
      contactType: 'customer support',
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Navbar />

      <section className="contact-hero">
        <div className="max">
          <div className="contact-hero-glow" aria-hidden="true" />
          <div className="section-tag fade-up">✦ Contact Us</div>
          <h1 className="fade-up">
            We&rsquo;d Love to <em>Hear</em> From You
          </h1>
          <p className="contact-hero-sub fade-up">
            Have a question, feedback, or partnership idea? Reach out and we&rsquo;ll get back to
            you.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="max">
          <div className="contact-cards fade-up">
            <a href="mailto:hello@playla.org" className="contact-info-card contact-email-card">
              <div className="contact-info-icon">✉️</div>
              <h3>Email Us</h3>
              <p className="contact-email-address">hello@playla.org</p>
              <span className="contact-email-hint">Click to send us an email</span>
            </a>
            <div className="contact-info-card">
              <div className="contact-info-icon">💬</div>
              <h3>Response Time</h3>
              <p>We typically respond within 24 hours.</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">🛡️</div>
              <h3>Privacy</h3>
              <p>
                Read our <Link href="/privacy">Privacy Policy</Link> to see how we handle your
                data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FadeUpObserver />
    </>
  )
}
