import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧", region: "United Kingdom" },
  { code: "ur", name: "اردو", flag: "🇵🇰", region: "Pakistan" },
  { code: "es", name: "Español", flag: "🇪🇸", region: "Spain" },
  { code: "fr", name: "Français", flag: "🇫🇷", region: "France" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", region: "Germany" },
  { code: "ar", name: "العربية", flag: "🇸🇦", region: "Saudi Arabia" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", region: "India" },
  { code: "zh", name: "中文", flag: "🇨🇳", region: "China" },
];

export default function Language() {
  const { language, setLanguage, t } = useApp();
  const [saved, setSaved] = useState(false);

  const choose = (code) => {
    setLanguage(code);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <Link to="/settings" className="page__back">
          ← {t("settings.title")}
        </Link>

        <div className="page__header">
          <div className="page__header-text">
            <h1 className="page__title">
              <span className="page__title-icon">🌐</span>
              {t("language.title")}
            </h1>
            <p className="page__subtitle">{t("language.subtitle")}</p>
          </div>
        </div>

        <div className="page__card page__card--flush">
          {languages.map((l, i) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className={`lang-row ${i !== languages.length - 1 ? "has-border" : ""}`}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-name">
                {l.name}
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                >
                  {l.region}
                </span>
              </span>
              {language === l.code && <span className="lang-check">✓</span>}
            </button>
          ))}
        </div>

        {saved && (
          <p className="success-text" style={{ marginTop: 16 }}>
            ✓ {t("language.saved")}
          </p>
        )}
      </div>
    </div>
  );
}
