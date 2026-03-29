import genres from '../data/genres.json'
import themes from '../data/themes.json'
import topics from '../data/topics.json'
import ages from '../data/ages.json'

const BASE_URL = 'https://www.playla.org'
const LAST_MODIFIED = '2026-03-26'

export default function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: LAST_MODIFIED, priority: 1 },
    { url: `${BASE_URL}/stories`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: LAST_MODIFIED, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: LAST_MODIFIED, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: LAST_MODIFIED, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: LAST_MODIFIED, priority: 0.3 },
    { url: `${BASE_URL}/stories/how-it-works`, lastModified: LAST_MODIFIED, priority: 0.7 },
    { url: `${BASE_URL}/stories/themes`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/stories/about`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/stories/age`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const genrePages = genres.map((g) => ({
    url: `${BASE_URL}/stories/${g.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const themePages = themes.map((t) => ({
    url: `${BASE_URL}/stories/themes/${t.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const topicPages = topics.map((t) => ({
    url: `${BASE_URL}/stories/about/${t.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const agePages = ages.map((a) => ({
    url: `${BASE_URL}/stories/age/${a.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...genrePages, ...themePages, ...topicPages, ...agePages]
}
