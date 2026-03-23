import Link from 'next/link'
import { notFound } from 'next/navigation'
import topics from '@/data/topics.json'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from '../../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../../components/StoryBreadcrumbs'
import StoryJsonLd from '../../components/StoryJsonLd'
import StoryFAQ from '../../components/StoryFAQ'
import StoryFooterCTA from '../../components/StoryFooterCTA'

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const topic = topics.find((t) => t.slug === params.topic)
  if (!topic) return {}
  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    alternates: { canonical: `/stories/about/${topic.slug}` },
  }
}

export default async function TopicPage(props) {
  const params = await props.params
  const topic = topics.find((t) => t.slug === params.topic)
  if (!topic) notFound()

  const relatedTopicData = topics.filter((t) => topic.relatedTopics?.includes(t.slug))

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Topics', href: '/stories/about' },
            { label: `${topic.name} Stories` },
          ]}
        />

        <div className="story-hero">
          <h1>{topic.name} Story Generator — <em>Create & Listen Free</em></h1>
          <p className="subtitle">{topic.introHook}</p>
        </div>

        <StoryGeneratorWidget
          genres={genres}
          defaultGenre={topic.defaultGenre}
          defaultPrompt={`Write a story about ${topic.name.toLowerCase()}`}
          promptChips={topic.promptChips}
        />

        {/* FUN FACTS */}
        {topic.funFacts && topic.funFacts.length > 0 && (
          <section className="story-seo-section">
            <h2>Fun {topic.name} Facts for Kids</h2>
            <ul>
              {topic.funFacts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </section>
        )}

        {/* MORE PROMPTS */}
        <section className="story-seo-section">
          <h2>More {topic.name} Story Ideas</h2>
          <p>Try these prompts in the generator above:</p>
          <div className="related-links">
            {topic.promptChips.map((chip, i) => (
              <span key={i} className="related-link">{chip}</span>
            ))}
          </div>
        </section>

        {/* RELATED TOPICS */}
        {relatedTopicData.length > 0 && (
          <section className="story-seo-section">
            <h3>More Stories Your Child Will Love</h3>
            <div className="related-links">
              {relatedTopicData.map((rt) => (
                <Link key={rt.slug} href={`/stories/about/${rt.slug}`} className="related-link">
                  {rt.emoji} {rt.name} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RELATED THEMES */}
        {topic.relatedThemes && topic.relatedThemes.length > 0 && (
          <section className="story-seo-section">
            <h3>Stories That Teach</h3>
            <div className="related-links">
              {topic.relatedThemes.map((theme) => (
                <Link key={theme} href={`/stories/themes/${theme}`} className="related-link">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="story-seo-section">
          <p>Best for ages {topic.ageRange}. Adjust reading level with Playla&apos;s AI.</p>
        </section>

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="topic"
        data={{
          h1: `${topic.name} Story Generator`,
          metaDescription: topic.metaDescription,
          faqs: topic.faqs,
          canonicalUrl: `/stories/about/${topic.slug}`,
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Topics', href: '/stories/about' },
          { label: `${topic.name} Stories` },
        ]}
      />

    </div>
  )
}
