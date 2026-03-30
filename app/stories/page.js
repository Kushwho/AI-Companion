import Link from 'next/link'
import genres from '../../data/genres.json'
import StoryGeneratorWidget from './components/StoryGeneratorWidget'
import StoryBreadcrumbs from './components/StoryBreadcrumbs'
import StoryJsonLd from './components/StoryJsonLd'
import SampleStoryCard from './components/SampleStoryCard'
import StoryFAQ from './components/StoryFAQ'
import StoryFooterCTA from './components/StoryFooterCTA'
import CommunityStories from '@/app/components/CommunityStories'

export const metadata = {
  title: 'Free AI Story Generator & Maker — Unlimited, No Sign Up | Playla',
  description:
    'Free AI story generator and story maker for kids and adults — no sign-up required. Use our AI story writer to create unlimited stories with audio narration. Choose from fantasy, horror, romance, bedtime and more.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'Free AI Story Generator & Maker — Unlimited, No Sign Up | Playla',
    description: 'Free AI story maker and story writer. Create unlimited stories with audio narration — no sign-up required.',
    url: 'https://www.playla.org/stories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Story Generator & Maker — Unlimited, No Sign Up | Playla',
    description: 'Free AI story maker and story writer. Create unlimited stories with audio narration — no sign-up required.',
    images: ['/og-image.png'],
  },
}

const mainFaqs = [
  { q: 'Is the AI story generator free?', a: 'Yes! Playla is a completely free AI story maker — no sign-up, no account, no limits. Each story comes with text, illustrations, and audio narration at no cost.' },
  { q: 'What genres can I choose from?', a: 'Fantasy, horror, romance, bedtime, fairy tale, sci-fi, funny, mystery, adventure, short stories, kids stories, and random surprise stories.' },
  { q: 'Can I listen to the stories?', a: 'Yes — every generated story includes audio narration. Just click play and listen to your story come alive.' },
  { q: 'Are the stories safe for children?', a: 'Playla generates age-appropriate content by default. For kids, use the Kids Story or Bedtime genres, or specify the age in your prompt.' },
  { q: 'How long are the generated stories?', a: 'Stories are typically 200-500 words across 2-3 illustrated scenes. Perfect for a quick read or bedtime.' },
  { q: 'Can I customize the story?', a: 'Absolutely. Describe your idea in the prompt box — include character names, settings, themes, or anything you want. The more specific you are, the more personalized the story.' },
]

// Hub-exclusive sample stories — unique to this page, not duplicated on genre pages
const hubSamples = [
  {
    title: 'The Night the Stars Fell Into the Sea',
    text: "One evening, a fisherman named Hiro noticed something strange — the stars were falling, not burning out, but gently drifting down like lanterns into the ocean.\n\nHe rowed out past the reef and scooped one up in his net. It was warm, humming quietly, and it pulsed with a soft golden light.\n\n'Please,' the star whispered. 'We fell because the Sky Keeper forgot to wind the clock. Without it, we can't float.'\n\nHiro had never heard of a Sky Keeper or a clock that held up stars. But he believed the star — because some things don't need proof, they just need someone willing to listen.\n\nHe climbed the tallest cliff on the island, the star tucked safely inside a jar. At the top, he found an ancient brass clock, its hands frozen at midnight. He turned the key once, twice, three times.\n\nThe clock chimed. And one by one, every star in the ocean rose back into the sky, trailing seawater that turned to stardust. The night sky blazed brighter than anyone on the island had ever seen.\n\nHiro rowed home smiling. He never told anyone what happened. But every night after, he left a lantern on his boat — just in case a star needed help finding its way back up.",
    readingTime: 2,
    genre: 'Magical Realism',
  },
  {
    title: 'Operation Homework Rescue',
    text: "Maya's homework was eaten — not by a dog, but by her baby brother, who had recently discovered that paper was delicious.\n\n'Mom! Arjun ate my science project!'\n\nHer mother looked at the soggy, chewed remains of Maya's volcano diagram. 'Well,' she said carefully, 'at least he's getting his fibre.'\n\nMaya had three hours to redo the entire project. She called an emergency meeting with her two best friends, Zoe and Sam, via walkie-talkie because group chats were for amateurs.\n\n'Code Red,' Maya announced. 'Arjun ate the volcano. I repeat: the volcano has been consumed.'\n\nZoe arrived on her scooter with a bag of baking soda. Sam brought vinegar and food colouring. And Maya's grandmother, who overheard the emergency broadcast, showed up with actual clay and a story about the time she saw a real volcano in Iceland.\n\nThree hours later, Maya's new volcano was twice as good as the original. It erupted properly, with red foam and everything. Arjun watched from his high chair, clapping.\n\n'Don't even think about it,' Maya told him.\n\nArjun smiled and reached for the clay.\n\nMaya got an A. And from that day on, all homework was stored on the highest shelf in the house.",
    readingTime: 2,
    genre: 'Comedy',
  },
  {
    title: 'The Cartographer of Clouds',
    text: "In the year 2471, Zara was the youngest Cloud Cartographer on Station Altius — a floating research lab that mapped weather patterns across three planets.\n\nMost people thought cloud-mapping was boring. Zara thought they were all wrong.\n\n'Every cloud is a story,' she told her robot assistant, Bolt. 'This cirrus formation over Kepler-22b? It's been building for nine years. It's about to become the longest storm in recorded history.'\n\n'Statistically unlikely,' said Bolt.\n\n'That's what makes it interesting.'\n\nWhen the storm finally broke, it wasn't rain that fell — it was light. Cascading sheets of bioluminescent particles, stored in the atmosphere for nearly a decade, released in a single breathtaking downpour. The entire night side of the planet glowed turquoise.\n\nScientists across the galaxy scrambled to explain it. But Zara had seen it coming — because she'd been watching, patiently, one cloud at a time.\n\n'Told you,' she said to Bolt, who was too busy recording data to respond.\n\nZara added one line to her cloud map: 'Here, it rained light.'\n\nSometimes the most extraordinary discoveries belong to the people who are willing to watch the sky and wait.",
    readingTime: 2,
    genre: 'Sci-Fi',
  },
]

export default function StoriesPage() {

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
            Free AI Story Generator & Maker — <em>Create & Listen</em>
          </h1>
          <p className="subtitle">
            The AI story writer that turns your ideas into illustrated stories with
            audio narration — unlimited and free, no sign-up required.
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
          <h2>Stories Created with Playla</h2>
          <p>Every story below was generated by our AI — yours will be just as unique. Try the generator above to create your own.</p>
          {hubSamples.map((s, i) => (
            <SampleStoryCard key={i} title={s.title} text={s.text} readingTime={s.readingTime} genre={s.genre} />
          ))}
        </section>

        {/* WHY PARENTS LOVE IT */}
        <section className="story-seo-section">
          <h2>Why Parents & Kids Love Playla</h2>
          <ul>
            <li><strong>One-of-a-kind every time</strong> — no two stories are ever the same, even from the same prompt</li>
            <li><strong>Hands-free bedtime</strong> — audio narration reads the story aloud so you can just listen together</li>
            <li><strong>Illustrated scenes</strong> — AI-generated artwork brings each moment to life</li>
            <li><strong>Safe by design</strong> — age-appropriate content across all 12 genres</li>
            <li><strong>Truly personal</strong> — add your child&apos;s name, favourite animals, or inside jokes to the prompt</li>
            <li><strong>Multilingual</strong> — create stories in English, Spanish, French, Hindi, German, and dozens more</li>
          </ul>
        </section>

        {/* NO SIGN-UP / KEYWORDS */}
        <section className="story-seo-section">
          <h2>Unlimited AI Story Maker — No Sign-Up, No Limits</h2>
          <p>
            Most AI story generators lock you behind a paywall after one or two tries.
            Playla doesn&apos;t. Create as many stories as you want — completely free,
            no account required. Every story comes with custom illustrations and audio narration included.
          </p>
          <p>
            Use it as a bedtime story generator when the kids want &ldquo;just one more.&rdquo;
            Use it in the classroom to spark creative writing. Use it on road trips to keep everyone
            entertained. Wherever you need a story, Playla writes one in seconds.
          </p>
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

        {/* COMMUNITY STORIES */}
        <CommunityStories />

        {/* FOOTER CTA */}
        <StoryFooterCTA />
      </main>

      <StoryJsonLd
        type="main"
        data={{
          faqs: mainFaqs,
          canonicalUrl: '/stories',
          sampleStories: hubSamples,
        }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Story Generator', href: '/stories' },
        ]}
      />

    </div>
  )
}
