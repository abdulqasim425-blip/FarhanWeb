import { process } from '../data.js'

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">How it works</span>
          <h2>A simple, transparent process</h2>
          <p>No surprises. You always know what is happening and what comes next.</p>
        </div>
        <ol className="steps">
          {process.map((p) => (
            <li className="step" key={p.step}>
              <span className="step__num">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
