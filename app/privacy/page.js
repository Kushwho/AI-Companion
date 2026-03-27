import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Playla',
  description:
    'Playla privacy policy. Learn how we collect, use, and protect information for children aged 4-12. COPPA compliant.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <div className="privacy-nav">
        <Link href="/" className="privacy-back">
          &larr; Back to Playla
        </Link>
      </div>

      <article className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last Updated: March 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Playla (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to
            protecting the privacy of children and their families. This Privacy Policy explains how
            we collect, use, and protect information when you use our AI-powered companion platform
            designed for children aged 4&ndash;12.
          </p>
        </section>

        <section>
          <h2>COPPA Compliance</h2>
          <p>
            Playla is fully compliant with the Children&rsquo;s Online Privacy Protection Act
            (COPPA). We do not knowingly collect personal information from children under 13 without
            verifiable parental consent.
          </p>
          <p>
            Parents have full control over their child&rsquo;s information and can review, modify, or
            delete it at any time through the parent dashboard.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>

          <h3>Parent Account Information</h3>
          <ul>
            <li>Email address</li>
            <li>Name</li>
            <li>Subscription and usage information</li>
          </ul>

          <h3>Child Profile Information</h3>
          <ul>
            <li>Child&rsquo;s first name (optional nickname)</li>
            <li>Age or date of birth</li>
            <li>Avatar selection</li>
            <li>Learning preferences and interests</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Conversation history (text and voice)</li>
            <li>Emotion signals derived from voice tone during conversations</li>
            <li>
              Long-term memory summaries (key facts, interests, and learning milestones extracted
              from conversations)
            </li>
            <li>Usage statistics (queries, session duration, features used)</li>
            <li>Device information and IP address</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>
              Provide personalized, age-appropriate educational content through Socratic dialogue
            </li>
            <li>
              Maintain conversation history and long-term memory to give your child a consistent,
              continuous experience
            </li>
            <li>
              Surface emotion-aware responses that adapt to your child&rsquo;s mood and engagement
            </li>
            <li>
              Allow parents to review sessions, progress, and usage metrics via the parent dashboard
            </li>
            <li>Improve our AI models and safety features</li>
            <li>Process subscriptions and payments</li>
            <li>Send important updates about the service (with parental consent)</li>
            <li>Ensure child safety through content moderation</li>
          </ul>
        </section>

        <section>
          <h2>AI Services and Data Processing</h2>
          <p>Playla uses multiple AI services to deliver its experience:</p>
          <ul>
            <li>
              <strong>Groq (Open source models) </strong> processes your child&rsquo;s text and voice input to
              generate educational responses in real time. Groq does NOT store user queries or
              responses beyond the duration of a request.
            </li>
            <li>
              <strong>Deepgram </strong> converts your child&rsquo;s spoken words to text and
              generates spoken audio from text responses. Deepgram processes audio transiently and
              does NOT retain recordings after transcription.
            </li>
            <li>
              <strong>Hume AI </strong> analyzes vocal tone and prosody to detect emotional signals.
              This helps Playla respond in a way that is sensitive to your child&rsquo;s emotional
              state. Hume processes audio in real time and does NOT store voice recordings.
            </li>
            <li>
              <strong>LiveKit </strong> provides the real-time audio infrastructure for voice
              conversations. Audio is transmitted securely and is not stored by LiveKit beyond the
              active session.
            </li>
          </ul>
          <p>
            All AI services are used under strict data processing agreements that prohibit use of
            your child&rsquo;s data for model training or third-party advertising.
          </p>
        </section>

        <section>
          <h2>Long-Term Memory</h2>
          <p>Playla maintains a long-term memory for each child profile. This memory stores:</p>
          <ul>
            <li>Key facts your child has shared (e.g., name, favorite topics)</li>
            <li>Learning milestones and progress</li>
            <li>Summarized insights from past sessions (not verbatim transcripts)</li>
          </ul>
          <p>
            This memory is stored securely in our database and is used solely to provide a
            personalized, continuous experience. Parents can view and request deletion of their
            child&rsquo;s memory at any time via the parent dashboard.
          </p>
        </section>

        <section>
          <h2>Information Sharing</h2>
          <p>
            We do NOT sell, rent, or share your child&rsquo;s personal information with third parties
            for marketing purposes.
          </p>
          <p>We may share information only in these limited circumstances:</p>
          <ul>
            <li>
              With <strong>Groq </strong> for real-time AI processing &mdash; Groq does NOT store
              queries or responses
            </li>
            <li>
              With <strong>Deepgram </strong> for real-time speech-to-text and text-to-speech
              processing
            </li>
            <li>
              With <strong>Hume AI </strong> for real-time emotional tone analysis
            </li>
            <li>
              With <strong>LiveKit </strong> for real-time voice session infrastructure
            </li>
            <li>
              With service providers who help us operate the platform (e.g., cloud hosting, payment
              processing) under strict confidentiality agreements
            </li>
            <li>To comply with legal obligations or protect rights and safety</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>End-to-end encryption for all data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Strict access controls and authentication</li>
            <li>JWT-based session management with short-lived tokens</li>
            <li>Secure payment processing through certified providers</li>
          </ul>
        </section>

        <section>
          <h2>Parental Rights</h2>
          <p>Parents have the right to:</p>
          <ul>
            <li>Review all information collected about their child</li>
            <li>Review session conversation history and emotion summaries</li>
            <li>
              Request deletion of their child&rsquo;s information, including long-term memory
            </li>
            <li>Refuse further collection or use of their child&rsquo;s information</li>
            <li>Access and download conversation history</li>
            <li>Set usage limits and parental controls</li>
          </ul>
          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:hello@playla.org">hello@playla.org</a>
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            We retain conversation history, memory summaries, and usage data for as long as your
            account is active. When you delete a child profile or close your account, we permanently
            delete all associated data within 30 days, except where required by law.
          </p>
          <p>
            To prevent repeat abuse of free access, we retain anonymized account identifiers (hashed
            user IDs) for up to 12 months after account deletion.
          </p>
        </section>

        <section>
          <h2>Cookies and Tracking</h2>

          <h3>Essential Cookies</h3>
          <p>
            We use essential cookies to maintain your session and provide the service. These cookies
            are necessary for the platform to function and cannot be disabled.
          </p>

          <h3>Analytics Cookies (Optional)</h3>
          <p>
            With your consent, we may use analytics tools to understand how visitors use our platform
            and to improve our service. We do NOT share personally identifiable information about
            children with any third-party analytics provider.
          </p>
          <p>
            You can accept or decline analytics cookies through our cookie consent banner. You can
            change your preference at any time by clearing your browser&rsquo;s local storage and
            refreshing the page.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify parents of any material
            changes via email and update the &ldquo;Last Updated&rdquo; date. Continued use of the
            service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please
            contact us:
          </p>
          <p>
            Email: <a href="mailto:hello@playla.org">hello@playla.org</a>
          </p>
        </section>
      </article>
    </div>
  )
}
