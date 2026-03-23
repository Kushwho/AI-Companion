import Link from 'next/link'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from './components/StoryGeneratorWidget'
import StoryBreadcrumbs from './components/StoryBreadcrumbs'
import StoryJsonLd from './components/StoryJsonLd'
import SampleStoryCard from './components/SampleStoryCard'
import StoryFAQ from './components/StoryFAQ'
import StoryFooterCTA from './components/StoryFooterCTA'

export const metadata = {
  title: 'Free AI Story Generator — Create & Listen Instantly | Playla',
  description:
    'Free AI story generator for kids and adults. Choose from fantasy, horror, romance, bedtime and more. Type your idea, generate a unique story, and listen with narration.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'Free AI Story Generator — Create & Listen Instantly | Playla',
    description: 'Create unique AI stories in any genre. Type your idea and listen instantly.',
    url: 'https://www.playla.org/stories',
  },
}

const mainFaqs = [
  { q: 'Is the AI story generator free?', a: 'Yes! You can generate stories for free. Each story comes with text and optional audio narration at no cost.' },
  { q: 'What genres can I choose from?', a: 'Fantasy, horror, romance, bedtime, fairy tale, sci-fi, funny, mystery, adventure, short stories, kids stories, and random surprise stories.' },
  { q: 'Can I listen to the stories?', a: 'Yes — every generated story includes audio narration. Just click play and listen to your story come alive.' },
  { q: 'Are the stories safe for children?', a: 'Playla generates age-appropriate content by default. For kids, use the Kids Story or Bedtime genres, or specify the age in your prompt.' },
  { q: 'How long are the generated stories?', a: 'Stories are typically 200-500 words across 2-3 illustrated scenes. Perfect for a quick read or bedtime.' },
  { q: 'Can I customize the story?', a: 'Absolutely. Describe your idea in the prompt box — include character names, settings, themes, or anything you want. The more specific you are, the more personalized the story.' },
]

export default function StoriesPage() {
  // Pick 3 diverse sample stories from genres
  const sampleGenres = ['fantasy', 'bedtime', 'funny']
  const samples = genres
    .filter((g) => sampleGenres.includes(g.genreId) && g.sampleStory)
    .map((g) => ({ ...g.sampleStory, genre: g.name }))

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator' },
          ]}
        />

        {/* HERO */}
        <div className="story-hero">
          <h1>
            Free AI Story Generator — <em>Create & Listen</em>
          </h1>
          <p className="subtitle">
            Type your idea, pick a genre, and get a unique story with illustrations
            and audio narration in seconds.
          </p>
        </div>

        {/* INTERACTIVE TOOL — Above the fold */}
        <StoryGeneratorWidget genres={genres} />

        {/* HOW IT WORKS */}
        <section className="story-seo-section">
          <h2>How Playla&apos;s AI Story Generator Works</h2>
          <div className="how-it-works-grid">
            <div className="how-step">
              <div className="how-step-num">1</div>
              <h3>Choose a Genre</h3>
              <p>Pick from 12 genres — fantasy, bedtime, mystery, horror, and more.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">2</div>
              <h3>Describe Your Idea</h3>
              <p>Type a story idea or click &ldquo;Surprise Me&rdquo; for instant inspiration.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">3</div>
              <h3>Read & Listen</h3>
              <p>Get a unique story with scenes, illustrations, and audio narration.</p>
            </div>
          </div>
        </section>

        {/* GENRE GRID */}
        <section className="story-seo-section">
          <h2>Story Genres You Can Create</h2>
          <p>Each genre creates a different kind of story. Explore them all or stick to your favourite.</p>
          <div className="genre-grid">
            {genres.map((g) => (
              <Link key={g.slug} href={`/stories/${g.slug}`} className="genre-card">
                <span className="genre-card-emoji">{g.emoji}</span>
                <div className="genre-card-info">
                  <h3>{g.name}</h3>
                  <p>{g.searchVolume > 0 ? `${g.name} stories` : 'Stories for kids'}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SAMPLE STORIES */}
        <section className="story-seo-section">
          <h2>Sample AI-Generated Stories</h2>
          <p>Here are a few stories Playla has created. Generate your own above — every story is unique.</p>
          {samples.map((s, i) => (
            <SampleStoryCard key={i} title={s.title} text={s.text} readingTime={s.readingTime} genre={s.genre} />
          ))}
        </section>

        {/* WHY PARENTS LOVE IT */}
        <section className="story-seo-section">
          <h2>Why Parents & Kids Love AI Stories</h2>
          <ul>
            <li>Every story is unique — no two generations are alike</li>
            <li>Audio narration makes bedtime effortless</li>
            <li>Illustrations bring each scene to life</li>
            <li>Safe, age-appropriate content in every genre</li>
            <li>Personalised with your child&apos;s name, favourite topics, and more</li>
            <li>Works in multiple languages — English, Spanish, French, German, and more</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="story-seo-section">
          <h2>Frequently Asked Questions</h2>
          <StoryFAQ faqs={mainFaqs} />
        </section>

        {/* BROWSE LINKS */}
        <section className="story-seo-section">
          <h3>Stories by Theme</h3>
          <div className="related-links">
            <Link href="/stories/themes" className="related-link">Browse all themes →</Link>
            <Link href="/stories/themes/kindness" className="related-link">Kindness</Link>
            <Link href="/stories/themes/bravery" className="related-link">Bravery</Link>
            <Link href="/stories/themes/friendship" className="related-link">Friendship</Link>
            <Link href="/stories/themes/perseverance" className="related-link">Perseverance</Link>
          </div>

          <h3>Stories by Topic</h3>
          <div className="related-links">
            <Link href="/stories/about/dinosaurs" className="related-link">Dinosaurs</Link>
            <Link href="/stories/about/space" className="related-link">Space</Link>
            <Link href="/stories/about/dragons" className="related-link">Dragons</Link>
            <Link href="/stories/about/pirates" className="related-link">Pirates</Link>
            <Link href="/stories/about/robots" className="related-link">Robots</Link>
          </div>

          <h3>Stories by Age</h3>
          <div className="related-links">
            <Link href="/stories/age" className="related-link">Browse all ages →</Link>
            <Link href="/stories/age/3-4" className="related-link">Ages 3-4</Link>
            <Link href="/stories/age/4-5" className="related-link">Ages 4-5</Link>
            <Link href="/stories/age/6-8" className="related-link">Ages 6-8</Link>
            <Link href="/stories/age/8-10" className="related-link">Ages 8-10</Link>
          </div>
        </section>

        {/* FOOTER CTA */}
        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="main"
        data={{
          faqs: mainFaqs,
          canonicalUrl: '/stories',
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
        ]}
      />

    </div>
  )
}
