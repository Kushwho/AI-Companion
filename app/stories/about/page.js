import Link from 'next/link'
import topics from '../../../data/topics.json'
import genres from '../../../data/genres.json'
import StoryGeneratorWidget from '../components/StoryGeneratorWidget'
import StoryBreadcrumbs from '../components/StoryBreadcrumbs'
import StoryJsonLd from '../components/StoryJsonLd'
import StoryFooterCTA from '../components/StoryFooterCTA'

export const metadata = {
  title: 'Stories by Topic — Dinosaurs, Space, Pirates & More | Playla',
  description: 'Browse AI-generated stories by topic. Dinosaurs, space, dragons, pirates, robots, and more. Create a personalized story about any topic.',
  alternates: { canonical: '/stories/about' },
}

const categories = {
  animals: 'Animals & Creatures',
  adventure: 'Adventure & Exploration',
  fantasy: 'Fantasy & Magic',
  'sci-fi': 'Science & Technology',
  everyday: 'Everyday Life',
  holidays: 'Holidays & Seasons',
  nature: 'Nature & Space',
}

export default function TopicsHubPage() {
  const grouped = {}
  topics.forEach((t) => {
    const cat = t.category || 'other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(t)
  })

  return (
    <div className="story-page">
      <main className="max">
        <StoryBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Story Generator', href: '/stories' },
            { label: 'Stories by Topic' },
          ]}
        />

        <div className="story-hero">
          <h1>Stories by Topic — <em>Pick Any Subject</em></h1>
          <p className="subtitle">
            Dinosaurs, space, pirates, cooking — create a story about anything your child loves.
          </p>
        </div>

        <StoryGeneratorWidget genres={genres} />

        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat} className="story-seo-section">
            <h2>{categories[cat] || cat}</h2>
            <div className="hub-grid">
              {items.map((t) => (
                <Link key={t.slug} href={`/stories/about/${t.slug}`} className="hub-card">
                  <span className="hub-card-emoji">{t.emoji}</span>
                  <h3>{t.name} Stories</h3>
                  <p>{t.introHook?.substring(0, 80)}...</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="hub"
        data={{ metaDescription: 'Stories by topic for kids', canonicalUrl: '/stories/about' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
          { label: 'Topics', href: '/stories/about' },
        ]}
      />

    </div>
  )
}
