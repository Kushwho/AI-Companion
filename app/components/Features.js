const features = [
  { icon: '🎙️', bg: 'rgba(232, 101, 58, 0.12)', title: 'Stories & Conversation', desc: 'Personalised bedtime stories and voice conversations in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali & English.', delay: 'd1' },
  { icon: '📖', bg: 'rgba(52, 211, 153, 0.1)', title: 'Homework Companion', desc: 'Guides with Socratic questions — never just gives the answer. Aligned with CBSE, ICSE, and state boards.', delay: 'd2' },
  { icon: '💚', bg: 'rgba(245, 158, 11, 0.1)', title: 'Emotion Awareness', desc: 'Detects mood patterns through conversation. Flags concerns to parents before they escalate.', delay: 'd3' },
  { icon: '👥', bg: 'rgba(139, 92, 246, 0.1)', title: 'Friend Social Layer', desc: "Your child's Sakhi connects with friends' companions for group projects, study circles, and story worlds.", delay: 'd4' },
  { icon: '📊', bg: 'rgba(232, 101, 58, 0.08)', title: 'Parent Dashboard', desc: 'Emotion trends, mastery heatmaps, social health. Know everything, hover over nothing.', delay: 'd1' },
  { icon: '🎮', bg: 'rgba(52, 211, 153, 0.08)', title: 'Gamified Learning', desc: 'Progress unlocks story chapters. Achievements tied to real learning, not arbitrary dopamine.', delay: 'd2' },
  { icon: '🌍', bg: 'rgba(245, 158, 11, 0.08)', title: 'Indian Culture Built-In', desc: "Panchatantra, Jataka tales, festivals, regional folklore. Sakhi doesn't feel foreign — it feels like home.", delay: 'd3' },
  { icon: '🔒', bg: 'rgba(99, 102, 241, 0.08)', title: 'Child-Safe by Design', desc: 'DPDPA-compliant, no ads, no data sold. Conversations never read by us. Privacy is foundational.', delay: 'd4' },
]

export default function Features() {
  return (
    <section id="features">
      <div className="max">
        <div className="feat-header">
          <div className="section-tag" style={{ color: 'var(--terra2)', borderColor: 'rgba(232, 101, 58, 0.2)', background: 'rgba(232, 101, 58, 0.06)' }}>
            ✦ Everything in one place
          </div>
          <h2>Built for the whole child,<br />not just <em>one subject.</em></h2>
          <p>Four capabilities working together — a companion, not another app to manage.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className={`feat-tile fade-up ${f.delay}`}>
              <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
