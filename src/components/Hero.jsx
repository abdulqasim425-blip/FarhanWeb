import { stats } from "./data";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import Motion from "./Motion";

export default function Hero() {
  const { profile } = useApp();
  const { user } = useAuth();

  // Agar user login hai to uska naam, warna "new projects"
  const greeting = user?.name ? `Hi, ${user.name.split(" ")[0]}` : null;

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="pill">
            ●{" "}
            {greeting
              ? `${greeting} — welcome back`
              : "Available for new projects"}
          </span>

          <h1>
            {user ? (
              <>
                Welcome back, <em>{user.name.split(" ")[0]}</em>.
                <br />
                Let's build something great.
              </>
            ) : (
              <>
                Websites that look great and <em>work hard</em> for your
                business.
              </>
            )}
          </h1>

          <p className="lead">
            {user
              ? `Good to see you again, ${user.name.split(" ")[0]}. Ready to start your next project?`
              : profile.tagline}
          </p>

          <div className="hero__cta">
            <a href="#contact" className="btn">
              {user ? "Start a new project" : "Start a project"}
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
