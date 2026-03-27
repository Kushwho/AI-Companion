import dynamic from 'next/dynamic'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import JsonLd from './components/JsonLd'

const Safety = dynamic(() => import('./components/Safety'))
const StoriesPreview = dynamic(() => import('./components/StoriesPreview'))
const SocialLayer = dynamic(() => import('./components/SocialLayer'))
const Dashboard = dynamic(() => import('./components/Dashboard'))
const MidCTA = dynamic(() => import('./components/MidCTA'))
const FAQ = dynamic(() => import('./components/FAQ'))
const Testimonials = dynamic(() => import('./components/Testimonials'))
const WaitlistForm = dynamic(() => import('./components/WaitlistForm'))
const StickyCTA = dynamic(() => import('./components/StickyCTA'))
const Footer = dynamic(() => import('./components/Footer'))
const FadeUpObserver = dynamic(() => import('./components/FadeUpObserver'))
const Tour = dynamic(() => import('./components/Tour'))

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <Hero />
      <Features />
      <SocialLayer />
      <Dashboard />
      <StoriesPreview />
      <Safety />
      <MidCTA />
      <FAQ />
      <Testimonials />
      <WaitlistForm />
      <StickyCTA />
      <Footer />
      <FadeUpObserver />
      <Tour />
    </>
  )
}
