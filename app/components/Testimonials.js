const testimonials = [
  {
    text: "The dashboard showed my daughter's stress spikes every Monday. Turns out she dreaded one class. We fixed it. I'd never have known without Playla.",
    avatar: '👨', name: 'David Nguyen', meta: 'Dad of 9-year-old · San Francisco', delay: 'd1', rating: 5,
  },
  {
    text: "Playla remembered my son's love for space stories from week one. He calls it his best friend. The first time he said that, I actually cried.",
    avatar: '👩', name: 'Sarah Mitchell', meta: 'Mom of 7-year-old · Austin', delay: 'd2', rating: 4.7,
  },
  {
    text: 'My son and three friends did their entire science project through the group feature. He came second in class. He has never been excited about school before.',
    avatar: '👩', name: 'Emily Chen', meta: 'Mom of 11-year-old · New York', delay: 'd3', rating: 4.6,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="max">
        <div className="section-header fade-up" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--gold)', borderColor: 'rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.06)', margin: '0 auto', display: 'inline-flex' }}>
            ★ Beta Parents
          </div>
          <h2 style={{ textAlign: 'center', marginTop: 14 }}>Families already <em>in love</em> with Playla.</h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testi-card fade-up ${t.delay}`}>
              <div className="stars">
                {'★'.repeat(Math.floor(t.rating))}
                {t.rating % 1 > 0 && <span className="star-partial" style={{ '--fill': `${(t.rating % 1) * 100}%` }}>★</span>}
                <span className="star-rating">{t.rating}</span>
              </div>
              <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testi-bottom">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-meta">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testi-numbers fade-up">
          <div><div className="tn-val">200+</div><div className="tn-lbl">Families on waitlist</div></div>
          <div><div className="tn-val">7</div><div className="tn-lbl">Cities in beta</div></div>
          <div><div className="tn-val">4</div><div className="tn-lbl">Languages live</div></div>
        </div>
      </div>
    </section>
  )
}
