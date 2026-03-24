import genres from '../data/genres.json'
import themes from '../data/themes.json'
import topics from '../data/topics.json'
import ages from '../data/ages.json'

const BASE_URL = 'https://www.playla.org'
const LAST_MODIFIED = new Date().toISOString()

export default function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/stories`, lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/stories/how-it-works`, lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/stories/themes`, lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/stories/about`, lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/stories/age`, lastModified: LAST_MODIFIED },
  ]

  const genrePages = genres.map((g) => ({
    url: `${BASE_URL}/stories/${g.slug}`,
    lastModified: LAST_MODIFIED,
  }))

  const themePages = themes.map((t) => ({
    url: `${BASE_URL}/stories/themes/${t.slug}`,
    lastModified: LAST_MODIFIED,
  }))

  const topicPages = topics.map((t) => ({
    url: `${BASE_URL}/stories/about/${t.slug}`,
    lastModified: LAST_MODIFIED,
  }))

  const agePages = ages.map((a) => ({
    url: `${BASE_URL}/stories/age/${a.slug}`,
    lastModified: LAST_MODIFIED,
  }))

  return [...staticPages, ...genrePages, ...themePages, ...topicPages, ...agePages]
}
