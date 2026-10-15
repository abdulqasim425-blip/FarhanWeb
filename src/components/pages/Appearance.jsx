import { useState, useEffect } from "react";

const themes = [
  { id: "dark", label: "Dark", colors: ["#0f0f1e", "#1a1a2e", "#6366f1"] },
  { id: "light", label: "Light", colors: ["#f8fafc", "#e2e8f0", "#6366f1"] },
  {
    id: "midnight",
    label: "Midnight",
    colors: ["#000000", "#0a0a0a", "#8b5cf6"],
  },
  { id: "ocean", label: "Ocean", colors: ["#0c1a2b", "#132f4c", "#38bdf8"] },
];

export default function Appearance() {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("#6366f1");
  const [saved, setSaved] = useState(false);

  // Load saved values on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAccent = localStorage.getItem("accent");
    if (savedTheme) setTheme(savedTheme);
    if (savedAccent) setAccent(savedAccent);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);
    document.documentElement.setAttribute("data-theme", theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page">
      <div className="page__container">
        <h1 className="page__title">Appearance</h1>
        <p className="page__subtitle">Customize how the site looks</p>

        <div className="page card mb-6">
          <h2 className="section-title">Theme</h2>
          <div className="theme-grid">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`theme-swatch ${theme === t.id ? "is-active" : ""}`}
              >
                <div className="theme-swatch__colors">
                  {t.colors.map((c) => (
                    <span
                      key={c}
                      className="theme-swatch__dot"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <p className="theme-swatch__label">{t.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="page card">
          <h2 className="section-title">Accent Color</h2>
          <div className="accent-row">
            {[
              "#6366f1",
              "#8b5cf6",
              "#ec4899",
              "#f59e0b",
              "#10b981",
              "#ef4444",
            ].map((c) => (
              <button
                key={c}
                onClick={() => setAccent(c)}
                className={`accent-dot ${accent === c ? "is-active" : ""}`}
                style={{ background: c }}
                aria-label={`Select ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="form-actions mt-6">
          <button onClick={saveSettings} className="btn btn--primary">
            Save Preferences
          </button>
          {saved && <span className="success-text">✓ Saved successfully!</span>}
        </div>
      </div>
    </div>
  );
}
