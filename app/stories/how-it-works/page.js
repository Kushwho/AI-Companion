import Link from 'next/link'
import genres from '../../../data/genres.json'
import StoryGeneratorWidget from '../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../components/StoryBreadcrumbs'
import StoryJsonLd from '../components/StoryJsonLd'
import StoryFAQ from '../components/StoryFAQ'
import StoryFooterCTA from '../components/StoryFooterCTA'

export const metadata = {
  title: 'How Playla AI Story Generator Works — Behind the Magic | Playla',
  description: 'Learn how Playla uses AI to create personalized stories with illustrations and audio narration. Safe, creative, and designed for children.',
  alternates: { canonical: '/stories/how-it-works' },
}

const faqs = [
  { q: 'What AI technology does Playla use?', a: 'Playla uses advanced language models trained on children\'s literature to generate age-appropriate, creative stories. Each story is unique and generated in real-time based on your prompt.' },
  { q: 'Is the content safe for children?', a: 'Yes. Playla has built-in safety guardrails that ensure all generated content is appropriate for children. The AI is specifically tuned to avoid scary, violent, or inappropriate content unless generating in the Horror genre for older audiences.' },
  { q: 'How are the illustrations created?', a: 'Playla uses AI image generation to create unique illustrations for each scene in your story. The art style is consistent within each story and designed to complement the narrative.' },
  { q: 'How does the audio narration work?', a: 'Each story scene comes with AI-generated audio narration. The voice is clear, warm, and paced for easy listening — perfect for bedtime stories or independent reading practice.' },
]

export default function HowItWorksPage() {
  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'How It Works' },
          ]}
        />

        <div className="story-hero">
          <h1>How Playla&apos;s AI Story Generator <em>Works</em></h1>
          <p className="subtitle">
            Behind the magic: how we turn your idea into a personalized story with
            illustrations and narration.
          </p>
        </div>

        <StoryGeneratorWidget genres={genres} />

        <section className="story-seo-section">
          <h2>The Three Steps to Your Story</h2>
          <div className="how-it-works-grid">
            <div className="how-step">
              <div className="how-step-num">1</div>
              <h3>You Describe</h3>
              <p>Type a story idea in the prompt box. Be as specific or as vague as you like. Pick a genre to set the mood.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">2</div>
              <h3>Playla Creates</h3>
              <p>Our AI writes a multi-scene story, generates unique illustrations for each scene, and creates audio narration.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">3</div>
              <h3>You Enjoy</h3>
              <p>Read along, listen to narration, and navigate between scenes. Share it, save it, or generate another.</p>
            </div>
          </div>
        </section>

        <section className="story-seo-section">
          <h2>What Makes Playla Different</h2>
          <ul>
            <li><strong>Multi-Scene Stories:</strong> Not just a block of text — each story is broken into illustrated scenes with their own narration</li>
            <li><strong>Audio First:</strong> Every scene comes with AI narration, making bedtime stories effortless for tired parents</li>
            <li><strong>Genre Intelligence:</strong> A bedtime story feels different from a horror story — Playla adjusts tone, pacing, vocabulary, and imagery per genre</li>
            <li><strong>Safe by Design:</strong> Built-in content safety guardrails ensure every story is appropriate for its intended audience</li>
            <li><strong>Truly Unique:</strong> No templates, no re-used paragraphs. Every generation creates an entirely new story</li>
          </ul>
        </section>

        <section className="story-seo-section">
          <h2>Built for Parents and Kids</h2>
          <p>
            Playla was built by parents who wanted better bedtime stories. We believe that every child
            deserves stories that match their interests, respect their intelligence, and spark their
            imagination. Whether it&apos;s a 3-year-old who wants a story about a sleepy bunny or a
            10-year-old who wants a mystery set in a haunted school — Playla delivers.
          </p>
          <p>
            The full Playla app goes beyond stories — it&apos;s an AI companion that helps with homework,
            provides emotional support, and speaks your child&apos;s language. The story generator is
            just the beginning.
          </p>
        </section>

        <section className="story-seo-section">
          <h2>Frequently Asked Questions</h2>
          <StoryFAQ faqs={faqs} />
        </section>

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="article"
        data={{
          h1: 'How Playla AI Story Generator Works',
          metaDescription: metadata.description,
          faqs,
          canonicalUrl: '/stories/how-it-works',
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'How It Works' },
        ]}
      />

    </div>
  )
}
