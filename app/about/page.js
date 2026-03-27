import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeUpObserver from '../components/FadeUpObserver'

export const metadata = {
  title: 'About Playla — Safe AI Learning Companion for Kids Aged 4-12',
  description:
    'Learn how Playla helps children aged 4-12 explore curiosity, answer questions, and learn AI safely. Built with COPPA compliance and parent oversight.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.playla.org/about',
    title: 'About Playla — Safe AI Learning Companion for Kids',
    description:
      'Playla answers children\'s curious questions and helps them learn with AI in a safe, parent-controlled environment.',
    siteName: 'Playla',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Playla - AI companion for children',
      },
    ],
  },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.playla.org/about#aboutpage',
  name: 'About Playla',
  description:
    'Playla is an AI companion that helps children aged 4-12 explore their curiosity, learn new concepts, and develop critical thinking in a safe, parent-monitored environment.',
  url: 'https://www.playla.org/about',
  isPartOf: { '@id': 'https://www.playla.org/#website' },
  mainEntity: { '@id': 'https://www.playla.org/#organization' },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />

      <section className="about-hero">
        <div className="max">
          <div className="about-hero-glow" aria-hidden="true" />
          <div className="section-tag fade-up">✦ About Playla</div>
          <h1 className="fade-up">
            Answering Every <em>Why</em>, Safely
          </h1>
          <p className="about-hero-sub fade-up">
            Playla is an AI learning companion built for children aged 4&ndash;12. We turn curiosity
            into understanding &mdash; without compromising safety or privacy.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="max">
          <div className="about-grid">
            <div className="about-card fade-up">
              <div className="about-card-icon" style={{ background: 'rgba(232, 101, 58, 0.12)' }}>
                🧒
              </div>
              <h2>Built for Curious Minds</h2>
              <p>
                Children ask hundreds of questions a day. &ldquo;Why is the sky blue?&rdquo;
                &ldquo;How do volcanoes work?&rdquo; &ldquo;What do astronauts eat?&rdquo; Playla is
                designed to meet that curiosity head-on, providing clear, age-appropriate explanations
                that spark deeper thinking rather than shutting questions down.
              </p>
              <p>
                Using Socratic questioning, Playla guides children to discover answers themselves,
                building real comprehension and confidence in their ability to learn.
              </p>
            </div>

            <div className="about-card fade-up">
              <div className="about-card-icon" style={{ background: 'rgba(139, 92, 246, 0.12)' }}>
                🤖
              </div>
              <h2>AI That Teaches, Not Just Answers</h2>
              <p>
                Unlike search engines or chatbots built for adults, Playla is purpose-built for
                children. Every response is tailored to a child&rsquo;s age, learning level, and
                interests. A 5-year-old asking about space gets a different answer than a
                10-year-old asking the same question.
              </p>
              <p>
                Playla never gives homework answers outright. Instead, it walks children through the
                thinking process, helping them build problem-solving skills aligned with Common Core
                and international learning standards.
              </p>
            </div>

            <div className="about-card fade-up">
              <div className="about-card-icon" style={{ background: 'rgba(52, 211, 153, 0.12)' }}>
                🛡️
              </div>
              <h2>Child-Safe by Design</h2>
              <p>
                Safety isn&rsquo;t a feature we bolted on &mdash; it&rsquo;s the foundation
                everything is built upon. Playla is fully COPPA compliant, with built-in content
                moderation that prevents exposure to inappropriate material.
              </p>
              <p>
                Conversations are end-to-end encrypted. We never sell data, never target ads at
                children, and never share personal information with third parties for marketing.
                Parents maintain full control through a real-time dashboard.
              </p>
            </div>

            <div className="about-card fade-up">
              <div className="about-card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)' }}>
                📊
              </div>
              <h2>Parents Stay in the Loop</h2>
              <p>
                The parent dashboard gives you visibility into your child&rsquo;s learning journey.
                See what topics they explored, how their emotional well-being is trending, and where
                they&rsquo;re making progress &mdash; all without hovering over their shoulder.
              </p>
              <p>
                Set usage limits, review conversation summaries, and manage privacy settings from one
                place. You decide what&rsquo;s appropriate for your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-mission">
        <div className="max">
          <div className="section-tag fade-up">✦ Our Mission</div>
          <h2 className="fade-up">
            Making AI a <em>Tool</em> for Learning
          </h2>
          <p className="about-mission-text fade-up">
            AI is transforming every industry, and children will grow up in a world shaped by it. We
            believe the best way to prepare them isn&rsquo;t to shield them from AI entirely &mdash;
            it&rsquo;s to give them a safe, structured way to learn alongside it.
          </p>
          <p className="about-mission-text fade-up">
            Playla introduces children to AI as a learning partner: something that helps them think,
            not something that thinks for them. By interacting with Playla, children develop critical
            thinking, digital literacy, and the confidence to ask questions &mdash; skills they will
            carry for a lifetime.
          </p>
          <div className="about-values fade-up">
            <div className="about-value">
              <span className="about-value-icon">🎙️</span>
              <h3>Voice-First</h3>
              <p>Natural voice conversations make learning feel like talking to a friend.</p>
            </div>
            <div className="about-value">
              <span className="about-value-icon">🌍</span>
              <h3>Multilingual</h3>
              <p>Available in English, Spanish, French, German, Portuguese, and Mandarin.</p>
            </div>
            <div className="about-value">
              <span className="about-value-icon">💚</span>
              <h3>Emotion-Aware</h3>
              <p>Adapts tone and pacing based on your child&rsquo;s emotional state.</p>
            </div>
            <div className="about-value">
              <span className="about-value-icon">📖</span>
              <h3>Story-Driven</h3>
              <p>Personalised interactive stories make learning engaging and memorable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="max">
          <h2 className="fade-up">
            Ready to Fuel Your Child&rsquo;s <em>Curiosity</em>?
          </h2>
          <p className="fade-up">
            Join thousands of parents who trust Playla to make learning safe and exciting.
          </p>
          <div className="about-cta-buttons fade-up">
            <a className="btn btn-primary-lg" href="/#waitlist">
              Reserve Your Spot
            </a>
            <Link className="btn btn-ghost" href="/contact">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FadeUpObserver />
    </>
  )
}
