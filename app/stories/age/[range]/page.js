import Link from 'next/link'
import { notFound } from 'next/navigation'
import ages from '@/data/ages.json'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from '../../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../../components/StoryBreadcrumbs'
import StoryJsonLd from '../../components/StoryJsonLd'
import StoryFooterCTA from '../../components/StoryFooterCTA'

export function generateStaticParams() {
  return ages.map((a) => ({ range: a.slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const age = ages.find((a) => a.slug === params.range)
  if (!age) return {}
  return {
    title: age.metaTitle,
    description: age.metaDescription,
    alternates: { canonical: `/stories/age/${age.slug}` },
  }
}

export default async function AgePage(props) {
  const params = await props.params
  const age = ages.find((a) => a.slug === params.range)
  if (!age) notFound()

  const recommendedGenreData = genres.filter((g) =>
    age.recommendedGenres?.includes(g.genreId)
  )

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Stories by Age', href: '/stories/age' },
            { label: age.range },
          ]}
        />

        <div className="story-hero">
          <h1>Stories for {age.range} — <em>{age.label}</em></h1>
          <p className="subtitle">
            Age-appropriate stories tailored for {age.range.toLowerCase()}. {age.characteristics}
          </p>
        </div>

        <StoryGeneratorWidget
          genres={genres}
          defaultGenre={age.recommendedGenres?.[0] || ''}
          childAge={age.childAge}
          numScenes={age.numScenes}
          promptChips={age.samplePrompts}
        />

        {/* PARENTING TIPS */}
        {age.parentingTips && age.parentingTips.length > 0 && (
          <section className="story-seo-section">
            <h2>Reading Tips for {age.range}</h2>
            <ul>
              {age.parentingTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {/* WHAT TO EXPECT */}
        <section className="story-seo-section">
          <h2>What {age.label} Need in Stories</h2>
          <p>{age.characteristics}</p>
        </section>

        {/* RECOMMENDED GENRES */}
        {recommendedGenreData.length > 0 && (
          <section className="story-seo-section">
            <h2>Recommended Genres for {age.range}</h2>
            <div className="genre-grid">
              {recommendedGenreData.map((g) => (
                <Link key={g.slug} href={`/stories/${g.slug}`} className="genre-card">
                  <span className="genre-card-emoji">{g.emoji}</span>
                  <div className="genre-card-info">
                    <h3>{g.name}</h3>
                    <p>Great for {age.range.toLowerCase()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RECOMMENDED TOPICS */}
        {age.recommendedTopics && age.recommendedTopics.length > 0 && (
          <section className="story-seo-section">
            <h3>Popular Topics for {age.range}</h3>
            <div className="related-links">
              {age.recommendedTopics.map((topic) => (
                <Link key={topic} href={`/stories/about/${topic}`} className="related-link">
                  {topic.charAt(0).toUpperCase() + topic.slice(1)} Stories
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* OTHER AGES */}
        <section className="story-seo-section">
          <h3>Other Age Groups</h3>
          <div className="related-links">
            {ages
              .filter((a) => a.slug !== age.slug)
              .map((a) => (
                <Link key={a.slug} href={`/stories/age/${a.slug}`} className="related-link">
                  {a.emoji} {a.range}
                </Link>
              ))}
          </div>
        </section>

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="age"
        data={{
          h1: `Stories for ${age.range}`,
          metaDescription: age.metaDescription,
          canonicalUrl: `/stories/age/${age.slug}`,
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Stories by Age', href: '/stories/age' },
          { label: age.range },
        ]}
      />

    </div>
  )
}
