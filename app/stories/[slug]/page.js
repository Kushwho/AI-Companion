import Link from 'next/link'
import { notFound } from 'next/navigation'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from '../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../components/StoryBreadcrumbs'
import StoryJsonLd from '../components/StoryJsonLd'
import SampleStoryCard from '../components/SampleStoryCard'
import StoryFAQ from '../components/StoryFAQ'
import StoryFooterCTA from '../components/StoryFooterCTA'

export function generateStaticParams() {
  return genres.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const genre = genres.find((g) => g.slug === params.slug)
  if (!genre) return {}

  return {
    title: genre.metaTitle,
    description: genre.metaDescription,
    alternates: { canonical: `/stories/${genre.slug}` },
    openGraph: {
      title: genre.metaTitle,
      description: genre.metaDescription,
      url: `https://www.playla.org/stories/${genre.slug}`,
    },
  }
}

export default async function GenrePage(props) {
  const params = await props.params
  const genre = genres.find((g) => g.slug === params.slug)
  if (!genre) notFound()

  const relatedGenreData = genres.filter((g) => genre.relatedGenres?.includes(g.slug))

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: `${genre.name} Story Generator` },
          ]}
        />

        <div className="story-hero">
          <h1>{genre.h1}</h1>
          <p className="subtitle">
            Type your idea, pick a genre, and get a unique {genre.name.toLowerCase()} story
            with illustrations and audio narration.
          </p>
        </div>

        {/* INTERACTIVE TOOL */}
        <StoryGeneratorWidget
          genres={genres}
          defaultGenre={genre.genreId}
          promptChips={genre.promptChips}
        />

        {/* GENRE INTRO */}
        <section className="story-seo-section">
          <h2>What Makes a Great {genre.name} Story?</h2>
          <p>{genre.description}</p>
        </section>

        {/* SAMPLE STORY */}
        {genre.sampleStory && (
          <section className="story-seo-section">
            <h2>Sample {genre.name} Story</h2>
            <SampleStoryCard
              title={genre.sampleStory.title}
              text={genre.sampleStory.text}
              readingTime={genre.sampleStory.readingTime}
              genre={genre.name}
            />
          </section>
        )}

        {/* WRITING TIPS */}
        {genre.writingTips && genre.writingTips.length > 0 && (
          <section className="story-seo-section">
            <h2>Tips for Writing {genre.name} Stories</h2>
            <ul>
              {genre.writingTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {/* MORE PROMPT IDEAS */}
        <section className="story-seo-section">
          <h2>More {genre.name} Story Ideas to Try</h2>
          <p>Click any idea below to fill the generator above and create your own version:</p>
          <div className="related-links">
            {genre.promptChips.map((chip, i) => (
              <span key={i} className="related-link">{chip}</span>
            ))}
          </div>
        </section>

        {/* RELATED GENRES */}
        {relatedGenreData.length > 0 && (
          <section className="story-seo-section">
            <h3>Explore More Genres</h3>
            <div className="related-links">
              {relatedGenreData.map((rg) => (
                <Link key={rg.slug} href={`/stories/${rg.slug}`} className="related-link">
                  {rg.emoji} {rg.name} Story Generator
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RELATED TOPICS */}
        {genre.relatedTopics && genre.relatedTopics.length > 0 && (
          <section className="story-seo-section">
            <h3>Popular {genre.name} Topics</h3>
            <div className="related-links">
              {genre.relatedTopics.map((topic) => (
                <Link key={topic} href={`/stories/about/${topic}`} className="related-link">
                  {topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, ' ')} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {genre.faqs && genre.faqs.length > 0 && (
          <section className="story-seo-section">
            <h2>Frequently Asked Questions</h2>
            <StoryFAQ faqs={genre.faqs} />
          </section>
        )}

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="genre"
        data={{
          h1: genre.h1,
          metaDescription: genre.metaDescription,
          faqs: genre.faqs,
          canonicalUrl: `/stories/${genre.slug}`,
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: `${genre.name} Story Generator` },
        ]}
      />

    </div>
  )
}
