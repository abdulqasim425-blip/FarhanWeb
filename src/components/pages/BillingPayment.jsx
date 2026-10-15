import { useState, useEffect } from "react";

const defaultCards = [
  { id: 1, brand: "Visa", last4: "4242", exp: "12/26", default: true },
  { id: 2, brand: "Mastercard", last4: "8888", exp: "08/27", default: false },
];

export default function BillingPayment() {
  const [cards, setCards] = useState(defaultCards);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ number: "", name: "", exp: "", cvc: "" });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("paymentCards");
    if (stored) {
      try {
        setCards(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    }
  }, []);

  // Persist whenever cards change
  useEffect(() => {
    localStorage.setItem("paymentCards", JSON.stringify(cards));
  }, [cards]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addCard = (e) => {
    e.preventDefault();
    if (!form.number || !form.name) return;
    setCards([
      ...cards,
      {
        id: Date.now(),
        brand: "Card",
        last4: form.number.slice(-4),
        exp: form.exp || "—",
        default: false,
      },
    ]);
    setForm({ number: "", name: "", exp: "", cvc: "" });
    setShowForm(false);
  };

  const setDefault = (id) =>
    setCards(cards.map((c) => ({ ...c, default: c.id === id })));

  const remove = (id) => setCards(cards.filter((c) => c.id !== id));

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Payment Methods</h1>
        <p className="page__subtitle">Manage your saved cards</p>

        <div className="stack">
          {cards.map((c) => (
            <div
              key={c.id}
              className={`card-row ${c.default ? "card-row--default" : ""}`}
            >
              <div className="card-row__info">
                <div className="card-brand">{c.brand}</div>
                <div>
                  <p className="bold">•••• •••• •••• {c.last4}</p>
                  <p className="muted small">Expires {c.exp}</p>
                </div>
                {c.default && (
                  <span className="badge badge--soft">Default</span>
                )}
              </div>
              <div className="card-row__actions">
                {!c.default && (
                  <button
                    className="link muted"
                    onClick={() => setDefault(c.id)}
                  >
                    Set default
                  </button>
                )}
                <button className="link danger" onClick={() => remove(c.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm ? (
          <form onSubmit={addCard} className="page card form-stack mt-6">
            <input
              name="number"
              value={form.number}
              onChange={change}
              placeholder="Card number"
              className="input"
            />
            <input
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Cardholder name"
              className="input"
            />
            <div className="page grid-2">
              <input
                name="exp"
                value={form.exp}
                onChange={change}
                placeholder="MM/YY"
                className="input"
              />
              <input
                name="cvc"
                value={form.cvc}
                onChange={change}
                placeholder="CVC"
                className="input"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn--primary">Add Card</button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-text"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn--primary mt-6"
          >
            + Add Payment Method
          </button>
        )}
      </div>
    </div>
  );
}
