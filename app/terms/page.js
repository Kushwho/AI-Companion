import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Terms of Service — Playla',
  description:
    'Playla terms of service. Read the terms governing use of our AI-powered learning companion for children aged 4-12.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="privacy-page">
      <div className="privacy-nav">
        <Link href="/" className="privacy-back">
          &larr; Back to Playla
        </Link>
      </div>

      <article className="privacy-content">
        <h1>Terms of Service</h1>
        <p className="privacy-updated">Last Updated: March 2026</p>

        <section>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using Playla (&ldquo;Service&rdquo;), you agree to be bound by these Terms
            of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the
            Service.
          </p>
        </section>

        <section>
          <h2>Service Description</h2>
          <p>
            Playla is an AI-powered educational platform designed for children aged 4&ndash;12. The
            Service provides interactive learning experiences through text conversations, voice chat, and
            image generation, all with child-safety features and parental controls.
          </p>
        </section>

        <section>
          <h2>Parental Consent and Responsibility</h2>
          <p>
            By creating an account, you confirm that you are a parent or legal guardian of the child for
            whom you are creating a profile. You agree to:
          </p>
          <ul>
            <li>Supervise your child&rsquo;s use of the Service appropriately</li>
            <li>Review conversation history regularly through the parent dashboard</li>
            <li>Set appropriate usage limits based on your child&rsquo;s age and needs</li>
            <li>Ensure account credentials are kept secure and not shared</li>
            <li>Comply with all applicable laws regarding children&rsquo;s online privacy</li>
          </ul>
        </section>

        <section>
          <h2>Account Registration</h2>
          <p>To use the Service, you must:</p>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Provide accurate and complete information during registration</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2>Subscription and Payment</h2>

          <p>
            Subscription plans and pricing are upcoming and will be announced on{' '}
            <a href="https://www.playla.org" target="_blank" rel="noopener noreferrer">
              playla.org
            </a>
            . Once available, subscriptions will automatically renew unless canceled before the renewal
            date. We reserve the right to change pricing with 30 days&rsquo; notice.
          </p>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul>
            <li>Attempt to bypass or disable any safety features or content filters</li>
            <li>Use the Service for any unlawful or harmful purpose</li>
            <li>Share account credentials with unauthorized individuals</li>
            <li>Reverse engineer, decompile, or attempt to extract source code</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Attempt to gain unauthorized access to our systems or other users&rsquo; accounts</li>
            <li>Misrepresent your identity or your relationship to a child</li>
          </ul>
        </section>

        <section>
          <h2>Content and Intellectual Property</h2>

          <h3>Our Content</h3>
          <p>
            All content provided by Playla, including text, graphics, logos, software, and AI-generated
            responses, is owned by us or our licensors and protected by intellectual property laws.
          </p>

          <h3>User-Generated Content</h3>
          <p>
            Content created through your use of the Service (conversations, generated images) remains
            your property. However, you grant us a license to use this content to:
          </p>
          <ul>
            <li>Provide and improve the Service</li>
            <li>Train and enhance our AI models</li>
            <li>Ensure safety and compliance with our policies</li>
          </ul>
        </section>

        <section>
          <h2>Safety and Content Moderation</h2>
          <p>
            We employ multiple layers of content filtering and moderation to ensure child safety.
            However:
          </p>
          <ul>
            <li>No automated system is perfect; parental supervision is essential</li>
            <li>We reserve the right to review conversations for safety purposes</li>
            <li>We may suspend or terminate accounts that violate our safety policies</li>
            <li>We will notify parents of any flagged content or concerning behavior</li>
          </ul>
        </section>

        <section>
          <h2>Disclaimers and Limitations</h2>

          <h3>Educational Purposes</h3>
          <p>
            The Service is designed for educational and entertainment purposes. It is not a substitute
            for professional education, therapy, or medical advice.
          </p>

          <h3>AI Limitations</h3>
          <p>
            While we strive for accuracy, AI-generated content may contain errors or inaccuracies. The
            Service is provided &ldquo;as is&rdquo; without warranties of any kind.
          </p>

          <h3>Service Availability</h3>
          <p>
            We do not guarantee uninterrupted or error-free service. We reserve the right to modify,
            suspend, or discontinue the Service at any time with reasonable notice.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Playla shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Playla from any claims, damages, or expenses arising
            from your violation of these Terms or your use of the Service.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice, if
            you:
          </p>
          <ul>
            <li>Violate these Terms</li>
            <li>Engage in fraudulent or illegal activity</li>
            <li>Compromise the safety of children using the Service</li>
            <li>Fail to pay subscription fees</li>
          </ul>
          <p>
            Upon termination, your right to use the Service will immediately cease, and we will delete
            your account data in accordance with our{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of material
            changes via email or through the Service. Your continued use after such notice constitutes
            acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws. Any
            disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>If you have questions about these Terms, please contact us:</p>
          <p>
            Email: <a href="mailto:hello@playla.org">hello@playla.org</a>
          </p>
        </section>

        <p>
          By using Playla, you acknowledge that you have read, understood, and agree to be bound by
          these Terms of Service and our{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </article>

      <Footer />
    </div>
  )
}
