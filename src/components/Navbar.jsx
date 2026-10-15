import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "./Appcontext";

const links = [
  ["Services", "/#services"],
  ["Work", "/#work"],
  ["Process", "/#process"],
  ["Pricing", "/#pricing"],
  ["Contact", "/#contact"],
];

const accountMenu = [
  {
    group: "Account",
    items: [
      { label: "My Profile", icon: "👤", to: "/profile" },
      { label: "Edit Profile", icon: "✏️", to: "/profile/edit" },
    ],
  },
  {
    group: "Preferences",
    items: [
      { label: "Settings", icon: "⚙️", to: "/settings" },
      { label: "Appearance", icon: "🎨", to: "/settings/appearance" },
      { label: "Language", icon: "🌐", to: "/settings/language" },
    ],
  },
  {
    group: "Billing",
    items: [
      { label: "My Plan", icon: "📦", to: "/billing/plan" },
      { label: "Invoices", icon: "🧾", to: "/billing/invoices" },
      { label: "Payment Methods", icon: "💳", to: "/billing/payment" },
    ],
  },
  {
    group: "Support",
    items: [
      { label: "Help Center", icon: "❓", to: "/help" },
      { label: "Report a Bug", icon: "🐛", to: "/report" },
    ],
  },
];

export default function Navbar() {
  const { profile } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="logo">
          {profile.name}
          <span>.dev</span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}

          <div className="nav__account" ref={accountRef}>
            <button
              className="account-btn"
              onClick={() => setAccountOpen(!accountOpen)}
              aria-expanded={accountOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Account</span>
              <svg
                className={`chevron ${accountOpen ? "is-open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                <div className="account-dropdown__header">
                  <div className="avatar avatar--sm">
                    {profile.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <strong>{profile.name}</strong>
                    <small>{profile.email}</small>
                  </div>
                </div>
                <hr />

                {accountMenu.map((group, idx) => (
                  <div key={idx} className="account-dropdown__group">
                    <p className="account-dropdown__label">{group.group}</p>
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setAccountOpen(false)}
                        className="account-dropdown__link"
                      >
                        <span className="account-dropdown__icon">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}

                <hr />
                <button
                  className="account-dropdown__logout"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  <span className="account-dropdown__icon">🚪</span> Log out
                </button>
              </div>
            )}
          </div>

          <a
            href="/#contact"
            className="btn btn--small"
            onClick={() => setOpen(false)}
          >
            Hire me
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
