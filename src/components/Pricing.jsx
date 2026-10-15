import { plans, testimonials } from '../data.js'

export default function Pricing() {
  return (
    <section className="section section--alt" id="pricing">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Pricing</span>
          <h2>Straightforward packages</h2>
          <p>Prices are starting points. Every project gets a fixed quote after we talk.</p>
        </div>
        <div className="grid grid--3">
          {plans.map((p) => (
            <article className={`plan ${p.featured ? 'plan--featured' : ''}`} key={p.name}>
              {p.featured && <span className="badge">Most popular</span>}
              <h3>{p.name}</h3>
              <div className="plan__price">{p.price}</div>
              <p className="plan__note">{p.note}</p>
              <ul>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact" className={`btn ${p.featured ? '' : 'btn--ghost'}`}>Get a quote</a>
            </article>
          ))}
        </div>

        <div className="quotes">
          {testimonials.map((t, i) => (
            <blockquote key={i}>
              <p>“{t.quote}”</p>
              <footer>— {t.name}, {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
