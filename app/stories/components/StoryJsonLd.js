export default function StoryJsonLd({ type, data, breadcrumbs }) {
  const graphs = []

  // BreadcrumbList
  if (breadcrumbs && breadcrumbs.length > 0) {
    graphs.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: item.href ? `https://www.playla.org${item.href}` : undefined,
      })),
    })
  }

  // WebApplication (main /stories page)
  if (type === 'main') {
    graphs.push({
      '@type': 'WebApplication',
      name: 'Playla AI Story Generator',
      description: 'Free AI story generator. Create unique stories in any genre — fantasy, horror, romance, bedtime, and more. Type your idea and listen instantly.',
      url: 'https://www.playla.org/stories',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': 'https://www.playla.org/#organization' },
      audience: { '@type': 'PeopleAudience', suggestedMinAge: 3 },
      featureList: ['AI story generation', 'Genre selection', 'Text-to-speech', 'Personalized prompts'],
    })
  }

  // Article (genre, theme, topic, age pages)
  if (type === 'genre' || type === 'theme' || type === 'topic' || type === 'age' || type === 'article') {
    graphs.push({
      '@type': 'Article',
      headline: data.h1 || data.metaTitle,
      description: data.metaDescription,
      author: { '@type': 'Organization', name: 'Playla' },
      publisher: { '@id': 'https://www.playla.org/#organization' },
      datePublished: '2026-03-24',
      dateModified: '2026-03-24',
      mainEntityOfPage: data.canonicalUrl ? `https://www.playla.org${data.canonicalUrl}` : undefined,
      inLanguage: 'en',
    })
  }

  // FAQPage
  if (data.faqs && data.faqs.length > 0) {
    graphs.push({
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graphs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
