import { Outfit, Fraunces } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata = {
  title: 'Playla — AI Learning Companion for Children Ages 4-12',
  description:
    'Playla is a personalised AI companion for children aged 4-12. Homework help, stories & emotional support in multiple languages with a parent dashboard.',
  metadataBase: new URL('https://www.playla.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.playla.org/',
    title: 'Playla — AI Companion for Children',
    description:
      'Personalised AI companion for children aged 4-12. Stories, homework help, and emotional support in multiple languages with a parent dashboard.',
    siteName: 'Playla',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Playla AI companion for children',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playla — AI Companion for Children',
    description:
      'Personalised AI companion for children aged 4-12. Stories, homework help, and emotional support in multiple languages.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  )
}
