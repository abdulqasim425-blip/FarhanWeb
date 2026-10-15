import { useState } from "react";
import "./pages.css";

export default function Report() {
  const [form, setForm] = useState({
    title: "",
    category: "Bug",
    severity: "Medium",
    description: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="page__container page__container--narrow">
          <div className="success-box">
            <div className="success-box__icon">✅</div>
            <h1 className="page__title">Report Submitted</h1>
            <p className="muted mb-6">
              Thanks for helping improve the site. I'll look into this shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: "",
                  category: "Bug",
                  severity: "Medium",
                  description: "",
                  email: "",
                });
              }}
              className="btn btn--primary"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Report a Bug</h1>
        <p className="page__subtitle">Found something broken? Let me know.</p>

        <form onSubmit={submit} className="card form-stack">
          <div>
            <label className="label block">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={change}
              required
              placeholder="Short summary of the issue"
              className="input"
            />
          </div>

          <div className="grid-2">
            <div>
              <label className="label block">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={change}
                className="input"
              >
                <option>Bug</option>
                <option>UI Issue</option>
                <option>Performance</option>
                <option>Content Typo</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="label block">Severity</label>
              <select
                name="severity"
                value={form.severity}
                onChange={change}
                className="input"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label block">Description</label>
            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={change}
              required
              placeholder="Describe what happened and how to reproduce it..."
              className="input"
            />
          </div>

          <div>
            <label className="label block">Your Email (optional)</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="you@example.com"
              className="input"
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
