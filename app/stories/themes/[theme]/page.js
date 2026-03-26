import Link from 'next/link'
import { notFound } from 'next/navigation'
import themes from '../../../../data/themes.json'
import genres from '../../../../data/genres.json'
import StoryGeneratorWidget from '../../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../../components/StoryBreadcrumbs'
import StoryJsonLd from '../../components/StoryJsonLd'
import SampleStoryCard from '../../components/SampleStoryCard'
import StoryFAQ from '../../components/StoryFAQ'
import StoryFooterCTA from '../../components/StoryFooterCTA'

export const dynamicParams = true

export function generateStaticParams() {
  return themes.map((t) => ({ theme: t.slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const theme = themes.find((t) => t.slug === params.theme)
  if (!theme) return {}
  return {
    title: theme.metaTitle,
    description: theme.metaDescription,
    alternates: { canonical: `/stories/themes/${theme.slug}` },
  }
}

export default async function ThemePage(props) {
  const params = await props.params
  const theme = themes.find((t) => t.slug === params.theme)
  if (!theme) notFound()

  const relatedThemeData = themes.filter((t) => theme.relatedThemes?.includes(t.slug))

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Themes', href: '/stories/themes' },
            { label: `${theme.name} Stories` },
          ]}
        />

        <div className="story-hero">
          <h1>Stories About {theme.name} for Kids — <em>Generate & Listen</em></h1>
          <p className="subtitle">{theme.description}</p>
        </div>

        <StoryGeneratorWidget
          genres={genres}
          defaultGenre={theme.defaultGenre}
          defaultPrompt={`Write a story about ${theme.name.toLowerCase()}`}
          promptChips={theme.promptChips}
        />

        {/* EXPERT INSIGHT */}
        {theme.expertInsight && (
          <section className="story-seo-section">
            <h2>Why {theme.name} Stories Matter</h2>
            <p>{theme.expertInsight}</p>
          </section>
        )}

        {/* SAMPLE STORY */}
        {theme.sampleStory && (
          <section className="story-seo-section">
            <h2>A Story About {theme.name}</h2>
            <SampleStoryCard
              title={theme.sampleStory.title}
              text={theme.sampleStory.text}
              readingTime={theme.sampleStory.readingTime}
              genre={theme.name}
            />
          </section>
        )}

        {/* DISCUSSION QUESTIONS */}
        {theme.discussionQuestions && theme.discussionQuestions.length > 0 && (
          <section className="story-seo-section">
            <h2>Discussion Questions for Parents</h2>
            <p>After reading a {theme.name.toLowerCase()} story, try asking your child:</p>
            <ul>
              {theme.discussionQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>
        )}

        {/* RELATED THEMES */}
        {relatedThemeData.length > 0 && (
          <section className="story-seo-section">
            <h3>Related Themes</h3>
            <div className="related-links">
              {relatedThemeData.map((rt) => (
                <Link key={rt.slug} href={`/stories/themes/${rt.slug}`} className="related-link">
                  {rt.emoji} {rt.name} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RELATED TOPICS */}
        {theme.relatedTopics && theme.relatedTopics.length > 0 && (
          <section className="story-seo-section">
            <h3>Related Topics</h3>
            <div className="related-links">
              {theme.relatedTopics.map((topic) => (
                <Link key={topic} href={`/stories/about/${topic}`} className="related-link">
                  {topic.charAt(0).toUpperCase() + topic.slice(1)} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="theme"
        data={{
          h1: `Stories About ${theme.name} for Kids`,
          metaDescription: theme.metaDescription,
          faqs: theme.faqs,
          canonicalUrl: `/stories/themes/${theme.slug}`,
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Themes', href: '/stories/themes' },
          { label: `${theme.name} Stories` },
        ]}
      />

    </div>
  )
}
