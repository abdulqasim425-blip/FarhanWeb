import { useState } from "react";
import "./pages.css";

const faqs = [
  {
    q: "How do I start a project?",
    a: "Simply click on the 'Hire me' button in the navigation or scroll to the Contact section and fill out the form. I'll get back to you within 24 hours.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Most projects take between 2-6 weeks depending on complexity. A simple landing page can be delivered in under a week.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes! I offer monthly maintenance packages that include updates, bug fixes, and performance monitoring.",
  },
  {
    q: "What technologies do you work with?",
    a: "I specialize in React, Next.js, Tailwind CSS, Node.js, and various headless CMS platforms like Sanity and Contentful.",
  },
  {
    q: "How does payment work?",
    a: "Projects are typically split into milestones — 50% upfront and 50% on delivery. For longer projects, we can set up a monthly billing schedule.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I can audit your current site and provide a modern redesign while preserving your SEO rankings.",
  },
];

export default function Help() {
  const [open, setOpen] = useState(null);

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Help Center</h1>
        <p className="page__subtitle">Frequently asked questions</p>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq ${open === i ? "is-open" : ""}`}>
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{f.q}</span>
                <span className="faq__plus">{open === i ? "×" : "+"}</span>
              </button>
              {open === i && <div className="faq__answer">{f.a}</div>}
            </div>
          ))}
        </div>

        <div className="help-cta">
          <p className="muted">Still need help?</p>
          <a href="/#contact" className="btn btn--primary">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
