import Link from 'next/link'
import ages from '@/data/ages.json'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from '../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../components/StoryBreadcrumbs'
import StoryJsonLd from '../components/StoryJsonLd'
import StoryFooterCTA from '../components/StoryFooterCTA'

export const metadata = {
  title: 'Stories by Age — Age-Appropriate AI Stories for Kids | Playla',
  description: 'Find the perfect AI-generated stories for your child\'s age. From toddlers to tweens, each age group gets stories tailored to their development.',
  alternates: { canonical: '/stories/age' },
}

export default function AgeHubPage() {
  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Stories by Age' },
          ]}
        />

        <div className="story-hero">
          <h1>Stories by Age — <em>Right Story, Right Time</em></h1>
          <p className="subtitle">
            Every age needs different stories. Find the perfect match for your child&apos;s
            developmental stage.
          </p>
        </div>

        <StoryGeneratorWidget genres={genres} />

        <section className="story-seo-section">
          <h2>Choose Your Child&apos;s Age Group</h2>
          <div className="hub-grid">
            {ages.map((a) => (
              <Link key={a.slug} href={`/stories/age/${a.slug}`} className="hub-card">
                <span className="hub-card-emoji">{a.emoji}</span>
                <h3>{a.range}</h3>
                <p>{a.label} — {a.characteristics.substring(0, 80)}...</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="story-seo-section">
          <h2>Why Age-Appropriate Stories Matter</h2>
          <p>
            Children at different ages process stories differently. A 3-year-old needs simple, repetitive
            language with familiar objects. An 8-year-old craves plot twists, mystery, and characters who
            face real challenges. Playla&apos;s AI automatically adjusts vocabulary, complexity, and themes
            to match your child&apos;s developmental stage.
          </p>
          <ul>
            <li>Ages 2-4: Simple vocabulary, repetition, sensory language, and soothing rhythms</li>
            <li>Ages 4-6: Moral lessons, imagination, relatable characters, and basic problem-solving</li>
            <li>Ages 6-8: Complex plots, mystery, humour with wordplay, and emotional depth</li>
            <li>Ages 8-10: Nuanced themes, moral complexity, and multi-layered characters</li>
            <li>Ages 10-12: Plot twists, identity exploration, and stories that respect their intelligence</li>
          </ul>
        </section>

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="hub"
        data={{ metaDescription: 'Stories by age for kids', canonicalUrl: '/stories/age' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Stories by Age', href: '/stories/age' },
        ]}
      />

    </div>
  )
}
