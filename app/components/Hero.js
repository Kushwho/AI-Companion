import VoiceChat from './VoiceChat'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-glow g1"></div>
      <div className="hero-bg-glow g2"></div>
      <div className="hero-bg-grid"></div>
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="pulse"></span> Early Access · India
        </div>
        <h1>The AI companion<br />your child will<br /><em>grow up with.</em></h1>
        <p className="hero-sub">
          Get back 5 hours a week while Sakhi handles bedtime stories, safe answers, and patient homework help — all while you get real-time insights into your child&apos;s learning and emotions.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary-lg" href="#waitlist">Reserve Your Spot — Free</a>
          <a className="btn btn-ghost" href="#features">See Features</a>
        </div>
        <div className="hero-proof">
          <div className="proof-faces">
            <span>👩</span><span>👨</span><span>👩</span><span>👨</span><span>👩</span>
          </div>
          <div className="proof-label"><strong>200+ parents</strong> already on the waitlist</div>
        </div>
      </div>
      <VoiceChat />
    </section>
  )
}
