import { services } from "./data.js";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">What I do</span>
          <h2>Services built around your goals</h2>
          <p>
            From a simple business site to a full web application, here is how I
            can help.
          </p>
        </div>
        <div className="grid grid--3">
          {services.map((s) => (
            <article className="card" key={s.title}>
              <div className="card__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
