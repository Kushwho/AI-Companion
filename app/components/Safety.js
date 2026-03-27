const shields = [
  { icon: '🔐', label: 'Encrypted' },
  { icon: '🛡️', label: 'Private' },
  { icon: '✅', label: 'Verified' },
  { icon: '🔒', label: 'Protected' },
]

const safetyFeatures = [
  {
    icon: '🧠',
    title: 'Advanced Content Filtering',
    desc: 'Multi-layer AI safety system ensures all content is age-appropriate and educational.',
  },
  {
    icon: '🚫',
    title: 'No Data Collection',
    desc: 'We never collect personal information from children. Privacy by design.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parent Controls',
    desc: 'Fine-grained settings give parents full control over content and features.',
  },
  {
    icon: '📜',
    title: 'COPPA Compliant',
    desc: "Fully compliant with children's online privacy protection regulations.",
  },
]

export default function Safety() {
  return (
    <section id="safety">
      <div className="max">
        <div className="safety-header fade-up">
          <div
            className="section-tag"
            style={{
              color: 'var(--jade)',
              borderColor: 'rgba(52, 211, 153, 0.25)',
              background: 'rgba(52, 211, 153, 0.08)',
            }}
          >
            ✦ Safety First
          </div>
          <h2>
            Your Child&apos;s Safety is Our
            <br />
            <em>Top Priority</em>
          </h2>
          <p className="safety-sub">
            Built from the ground up with multiple layers of protection to ensure a safe learning
            environment.
          </p>
        </div>

        <div className="safety-content">
          <div className="safety-shields fade-up d1">
            {shields.map((s, i) => (
              <div key={i} className="shield-item">
                <div className="shield-icon">{s.icon}</div>
                <span className="shield-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="safety-features">
            {safetyFeatures.map((f, i) => (
              <div key={i} className={`safety-feat fade-up d${i + 1}`}>
                <div className="safety-feat-icon">{f.icon}</div>
                <div className="safety-feat-text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
