import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Safety from './components/Safety'
import StoriesPreview from './components/StoriesPreview'
import SocialLayer from './components/SocialLayer'
import Dashboard from './components/Dashboard'
import MidCTA from './components/MidCTA'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import WaitlistForm from './components/WaitlistForm'
import StickyCTA from './components/StickyCTA'
import Footer from './components/Footer'
import FadeUpObserver from './components/FadeUpObserver'
import Tour from './components/Tour'
import JsonLd from './components/JsonLd'

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
