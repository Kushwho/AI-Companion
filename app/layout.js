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
  title: 'Sakhi — AI Learning Companion for Indian Children Ages 4-12',
  description:
    'Sakhi is a personalised AI companion for Indian children aged 4-12. Homework help, stories & emotional support in 7 languages with a parent dashboard.',
  metadataBase: new URL('https://www.playla.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.playla.org/',
    title: 'Sakhi — AI Companion for Indian Children',
    description:
      'Personalised AI companion for Indian children aged 4-12. Stories, homework help, and emotional support in 7 languages with a parent dashboard.',
    siteName: 'Sakhi',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sakhi AI companion for Indian children',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakhi — AI Companion for Indian Children',
    description:
      'Personalised AI companion for Indian children aged 4-12. Stories, homework help, and emotional support in 7 languages.',
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
