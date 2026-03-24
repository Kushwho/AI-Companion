import genres from '../data/genres.json'
import themes from '../data/themes.json'
import topics from '../data/topics.json'
import ages from '../data/ages.json'

const BASE_URL = 'https://www.playla.org'

export default function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, priority: 1.0 },
    { url: `${BASE_URL}/stories`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/stories/how-it-works`, priority: 0.7 },
    { url: `${BASE_URL}/stories/themes`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/stories/about`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/stories/age`, priority: 0.7, changeFrequency: 'weekly' },
  ]

  const genrePages = genres.map((g) => ({
    url: `${BASE_URL}/stories/${g.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly',
  }))

  const themePages = themes.map((t) => ({
    url: `${BASE_URL}/stories/themes/${t.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  const topicPages = topics.map((t) => ({
    url: `${BASE_URL}/stories/about/${t.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  const agePages = ages.map((a) => ({
    url: `${BASE_URL}/stories/age/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  return [...staticPages, ...genrePages, ...themePages, ...topicPages, ...agePages]
}
