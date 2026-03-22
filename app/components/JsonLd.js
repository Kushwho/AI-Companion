const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.playla.org/#organization',
      name: 'Playla',
      alternateName: 'Sakhi',
      url: 'https://www.playla.org',
      description: 'Sakhi is a personalised AI companion for Indian children aged 4-12. Stories, homework help, and emotional support in 7 languages with a parent dashboard.',
      foundingDate: '2024',
      areaServed: { '@type': 'Country', name: 'India' },
      knowsLanguage: ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn'],
      slogan: 'AI Companion for Indian Children',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.playla.org/#website',
      name: 'Sakhi — AI Companion for Indian Children',
      url: 'https://www.playla.org',
      publisher: { '@id': 'https://www.playla.org/#organization' },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.playla.org/#webpage',
      url: 'https://www.playla.org',
      name: 'Sakhi — AI Companion for Indian Children',
      description: 'Sakhi is a personalised AI companion for Indian children aged 4-12. Stories, homework help, and emotional support in 7 languages — with a parent dashboard that shows how your child is truly doing.',
      isPartOf: { '@id': 'https://www.playla.org/#website' },
      about: { '@id': 'https://www.playla.org/#software' },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.playla.org/#software',
      name: 'Sakhi',
      description: 'Personalised AI companion for Indian children aged 4-12. Provides stories, homework help via Socratic questioning, emotional support, and a parent dashboard with emotion trends and mastery heatmaps.',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'iOS, Android, Web',
      inLanguage: ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn'],
      audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'Children aged 4-12' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/PreOrder', description: 'Free waitlist registration. Founding pricing locked in for early members.' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', bestRating: '5', ratingCount: '3', reviewCount: '3' },
      review: [
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, author: { '@type': 'Person', name: 'Rahul Krishnan' }, reviewBody: "The dashboard showed my daughter's stress spikes every Monday. We fixed it. I'd never have known without Sakhi." },
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, author: { '@type': 'Person', name: 'Priya Mehta' }, reviewBody: 'Sakhi remembered my son\'s love for space stories from week one. He calls it his best friend.' },
        { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, author: { '@type': 'Person', name: 'Sneha Agarwal' }, reviewBody: 'My son and three friends did their entire EVS project through the group feature. He came second in class.' },
      ],
      provider: { '@id': 'https://www.playla.org/#organization' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.playla.org/#faq',
      mainEntity: [
        { '@type': 'Question', name: "Is my child's conversation data safe?", acceptedAnswer: { '@type': 'Answer', text: "Absolutely. Conversations are end-to-end encrypted and never read by us. Emotion tracking analyses patterns only — not content. We're DPDPA 2023 compliant." } },
        { '@type': 'Question', name: 'What ages is Sakhi designed for?', acceptedAnswer: { '@type': 'Answer', text: 'Sakhi adapts to children aged 4-12, with age-appropriate language, topics, and complexity levels that grow with your child.' } },
        { '@type': 'Question', name: 'Does Sakhi just give homework answers?', acceptedAnswer: { '@type': 'Answer', text: 'Never. Sakhi uses Socratic questioning to guide your child to the answer themselves, building real understanding. Aligned with CBSE, ICSE, and state boards.' } },
        { '@type': 'Question', name: 'What languages does Sakhi speak?', acceptedAnswer: { '@type': 'Answer', text: 'Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and English — with more coming soon.' } },
        { '@type': 'Question', name: 'What devices does Sakhi work on?', acceptedAnswer: { '@type': 'Answer', text: 'Sakhi works on any smartphone or tablet via our app (iOS and Android), and via web browser on desktop.' } },
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
