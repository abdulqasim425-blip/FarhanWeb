import "./pages.css";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 project", "Community support", "Basic analytics"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29/mo",
    features: [
      "10 projects",
      "Priority support",
      "Advanced analytics",
      "Custom domain",
    ],
    current: true,
  },
  {
    name: "Business",
    price: "$99/mo",
    features: [
      "Unlimited projects",
      "24/7 support",
      "Team collaboration",
      "API access",
      "SLA",
    ],
    current: false,
  },
];

export default function BillingPlan() {
  return (
    <div className="page">
      <div className="page__container">
        <h1 className="page__title">My Plan</h1>
        <p className="page__subtitle">Manage your subscription</p>

        <div className="current-plan">
          <div>
            <p className="muted small">Current Plan</p>
            <p className="current-plan__name">Pro</p>
            <p className="muted small">Renews on Dec 15, 2025</p>
          </div>
          <button className="btn btn--primary">Manage</button>
        </div>

        <div className="grid-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`plan-card ${p.current ? "plan-card--current" : ""}`}
            >
              {p.current && <span className="badge">Current</span>}
              <h3 className="plan-card__name">{p.name}</h3>
              <p className="plan-card__price">{p.price}</p>
              <ul className="plan-card__features">
                {p.features.map((f) => (
                  <li key={f}>
                    <span className="check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={p.current}
                className={`btn ${p.current ? "btn--disabled" : "btn--primary"} btn--full`}
              >
                {p.current ? "Active" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
