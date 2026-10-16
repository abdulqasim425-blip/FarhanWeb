import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  ["nav.services", "/#services"],
  ["nav.work", "/#work"],
  ["nav.process", "/#process"],
  ["nav.pricing", "/#pricing"],
  ["nav.contact", "/#contact"],
];

const accountMenu = [
  {
    group: "Account",
    items: [
      { labelKey: "nav.profile", icon: "👤", to: "/profile" },
      { labelKey: "nav.editProfile", icon: "✏️", to: "/profile/edit" },
    ],
  },
  {
    group: "Preferences",
    items: [
      { labelKey: "nav.settings", icon: "⚙️", to: "/settings" },
      { labelKey: "nav.appearance", icon: "🎨", to: "/settings/appearance" },
      { labelKey: "nav.language", icon: "🌐", to: "/settings/language" },
    ],
  },
  {
    group: "Billing",
    items: [
      { labelKey: "nav.plan", icon: "📦", to: "/billing/plan" },
      { labelKey: "nav.invoices", icon: "🧾", to: "/billing/invoices" },
      { labelKey: "nav.payments", icon: "💳", to: "/billing/payment" },
    ],
  },
  {
    group: "Support",
    items: [
      { labelKey: "nav.help", icon: "❓", to: "/help" },
      { labelKey: "nav.report", icon: "🐛", to: "/report" },
    ],
  },
];

export default function Navbar() {
  const { profile, t } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ← YE LINE component ke andar sabse pehle
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

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setOpen(false);
    navigate("/login"); // ← ab navigate yahan kaam karega
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="logo">
          {profile.name}
          <span>.dev</span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {navLinks.map(([key, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {t(key)}
            </a>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                className="nav__auth-link"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn--small"
                onClick={() => setOpen(false)}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
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
                  <span>{user.name?.split(" ")[0] || "Account"}</span>
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
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>
                    <hr />

                    {accountMenu.map((group, idx) => (
                      <div key={idx} className="account-dropdown__group">
                        <p className="account-dropdown__label">{group.group}</p>
                        {group.items.map((item) => (
                          <Link
                            key={item.labelKey}
                            to={item.to}
                            onClick={() => setAccountOpen(false)}
                            className="account-dropdown__link"
                          >
                            <span className="account-dropdown__icon">
                              {item.icon}
                            </span>
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    ))}

                    <hr />
                    <button
                      className="account-dropdown__logout"
                      onClick={handleLogout}
                    >
                      <span className="account-dropdown__icon">🚪</span>{" "}
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>

              <a
                href="/#contact"
                className="btn btn--small"
                onClick={() => setOpen(false)}
              >
                {t("nav.hire")}
              </a>
            </>
          )}
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
