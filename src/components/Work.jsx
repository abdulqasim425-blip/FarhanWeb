import { useState } from "react";
import { projects } from "./data.js";

export default function Work() {
  const tags = ["All", ...new Set(projects.map((p) => p.tag))];
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <section className="section section--alt" id="work">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Portfolio</span>
          <h2>Recent work</h2>
          <p>
            A selection of projects. Replace these with your own in{" "}
            <code>src/data.js</code>.
          </p>
        </div>
        <div className="filters">
          {tags.map((t) => (
            <button
              key={t}
              className={`chip ${active === t ? "chip--active" : ""}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid--2">
          {shown.map((p) => (
            <article className="project" key={p.title}>
              <div className="project__thumb" style={{ background: p.color }}>
                <span>{p.title}</span>
              </div>
              <div className="project__body">
                <small>{p.tag}</small>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
