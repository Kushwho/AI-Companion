const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.playla.org/#organization',
      name: 'Playla',
      url: 'https://www.playla.org',
      description: 'Playla is a personalised AI companion for children aged 4-12. Stories, homework help, and emotional support in multiple languages with a parent dashboard.',
      foundingDate: '2024',
      knowsLanguage: ['en', 'es', 'fr', 'de', 'pt', 'zh'],
      slogan: 'AI Companion for Children',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.playla.org/#website',
      name: 'Playla — AI Companion for Children',
      url: 'https://www.playla.org',
      publisher: { '@id': 'https://www.playla.org/#organization' },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.playla.org/#webpage',
      url: 'https://www.playla.org',
      name: 'Playla — AI Companion for Children',
      description: 'Playla is a personalised AI companion for children aged 4-12. Stories, homework help, and emotional support in multiple languages — with a parent dashboard that shows how your child is truly doing.',
      isPartOf: { '@id': 'https://www.playla.org/#website' },
      about: { '@id': 'https://www.playla.org/#software' },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.playla.org/#software',
      name: 'Playla',
      description: 'Personalised AI companion for children aged 4-12. Provides stories, homework help via Socratic questioning, emotional support, and a parent dashboard with emotion trends and mastery heatmaps.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'iOS, Android, Web',
      inLanguage: ['en', 'es', 'fr', 'de', 'pt', 'zh'],
      audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'Children aged 4-12' },
      featureList: [
        'AI-generated personalised stories across 12+ genres',
        'Advanced content filtering for age-appropriate content',
        'COPPA-compliant — no data collection from children',
        'Parent controls with fine-grained settings',
        'End-to-end encrypted conversations',
        'Homework help via Socratic questioning',
        'Emotion awareness and mood tracking',
        'Multi-language support',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/PreOrder', description: 'Free waitlist registration. Founding pricing locked in for early members.' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', bestRating: '5', ratingCount: '3', reviewCount: '3' },
      review: [
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, author: { '@type': 'Person', name: 'David Nguyen' }, reviewBody: "The dashboard showed my daughter's stress spikes every Monday. We fixed it. I'd never have known without Playla." },
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '4.7', bestRating: '5' }, author: { '@type': 'Person', name: 'Sarah Mitchell' }, reviewBody: 'Playla remembered my son\'s love for space stories from week one. He calls it his best friend.' },
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '4.6', bestRating: '5' }, author: { '@type': 'Person', name: 'Emily Chen' }, reviewBody: 'My son and three friends did their entire science project through the group feature. He came second in class.' },
      ],
      provider: { '@id': 'https://www.playla.org/#organization' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.playla.org/#faq',
      mainEntity: [
        { '@type': 'Question', name: "Is my child's conversation data safe?", acceptedAnswer: { '@type': 'Answer', text: "Absolutely. Conversations are end-to-end encrypted and never read by us. Emotion tracking analyses patterns only — not content. We're COPPA compliant." } },
        { '@type': 'Question', name: 'What ages is Playla designed for?', acceptedAnswer: { '@type': 'Answer', text: 'Playla adapts to children aged 4-12, with age-appropriate language, topics, and complexity levels that grow with your child.' } },
        { '@type': 'Question', name: 'Does Playla just give homework answers?', acceptedAnswer: { '@type': 'Answer', text: 'Never. Playla uses Socratic questioning to guide your child to the answer themselves, building real understanding. Aligned with Common Core and international standards.' } },
        { '@type': 'Question', name: 'What languages does Playla speak?', acceptedAnswer: { '@type': 'Answer', text: 'English, Spanish, French, German, Portuguese, and Mandarin — with more coming soon.' } },
        { '@type': 'Question', name: 'What devices does Playla work on?', acceptedAnswer: { '@type': 'Answer', text: 'Playla works on any smartphone or tablet via our app (iOS and Android), and via web browser on desktop.' } },
        { '@type': 'Question', name: 'How does Playla keep my child safe?', acceptedAnswer: { '@type': 'Answer', text: 'Playla uses multi-layer AI content filtering, collects no personal data from children, is fully COPPA compliant, and gives parents fine-grained controls over content and features. All conversations are end-to-end encrypted.' } },
        { '@type': 'Question', name: 'What kind of stories can Playla create?', acceptedAnswer: { '@type': 'Answer', text: 'Playla generates unique, personalised stories across 12+ genres including fantasy, bedtime, adventure, funny, sci-fi, fairy tale, mystery, and more. Each story is tailored to your child\'s interests and can be narrated aloud.' } },
      ],
    },
  ],
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
