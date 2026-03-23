import Link from 'next/link'

export default function StoryFooterCTA() {
  return (
    <div className="story-footer-cta">
      <h2>Want unlimited AI stories for your child?</h2>
      <p>
        Playla creates personalized stories, helps with homework, and provides emotional
        support — all in your child&apos;s language.
      </p>
      <Link href="/#waitlist" className="btn btn-primary-lg">
        Join the Waitlist
      </Link>
    </div>
  )
}
