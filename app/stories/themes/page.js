import Link from 'next/link'
import themes from '@/data/themes.json'
import genres from '@/data/genres.json'
import StoryGeneratorWidget from '../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../components/StoryBreadcrumbs'
import StoryJsonLd from '../components/StoryJsonLd'
import StoryFooterCTA from '../components/StoryFooterCTA'

export const metadata = {
  title: 'Stories by Theme — Kindness, Bravery, Friendship & More | Playla',
  description: 'Browse AI-generated stories by theme. Kindness, bravery, honesty, empathy, perseverance and more. Create personalized stories that teach values.',
  alternates: { canonical: '/stories/themes' },
}

export default function ThemesHubPage() {
  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Stories by Theme' },
          ]}
        />

        <div className="story-hero">
          <h1>Stories by Theme — <em>Values That Matter</em></h1>
          <p className="subtitle">
            Stories that teach kindness, bravery, honesty, and more. Pick a theme and create
            a personalized story for your child.
          </p>
        </div>

        <StoryGeneratorWidget genres={genres} defaultGenre="bedtime" />

        <section className="story-seo-section">
          <h2>Browse All Themes</h2>
          <p>Each theme page has a dedicated story generator, discussion questions, expert insights, and sample stories.</p>
          <div className="hub-grid">
            {themes.map((t) => (
              <Link key={t.slug} href={`/stories/themes/${t.slug}`} className="hub-card">
                <span className="hub-card-emoji">{t.emoji}</span>
                <h3>Stories About {t.name}</h3>
                <p>{t.description.substring(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </section>

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="hub"
        data={{ metaDescription: 'Stories by theme for kids', canonicalUrl: '/stories/themes' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Themes', href: '/stories/themes' },
        ]}
      />

    </div>
  )
}
