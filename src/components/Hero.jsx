import { stats } from "./data";
import { useApp } from "./Appcontext";
import Motion from "./Motion";

export default function Hero() {
  const { profile } = useApp();

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="pill">● Available for new projects</span>
          <h1>
            Websites that look great and <em>work hard</em> for your business.
          </h1>
          <p className="lead">{profile.tagline}</p>
          <div className="hero__cta">
            <a href="#contact" className="btn">
              Start a project
            </a>
            <a href="#work" className="btn btn--ghost">
              See my work
            </a>
          </div>
          <ul className="stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="code-card">
            <div className="code-card__bar">
              <i />
              <i />
              <i />
            </div>
            <pre>{`function Developer() {
  const skills = [
    "React", "Node.js",
    "JavaScript", "SEO"
  ];

  return (
    <Website
      fast
      responsive
      secure
    />
  );
}`}</pre>
          </div>
        </div>
      </div>
      <Motion />
    </section>
  );
}
