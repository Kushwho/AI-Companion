import './stories.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export default function StoriesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
