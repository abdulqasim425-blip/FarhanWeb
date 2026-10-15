import { useState } from "react";
import { useApp } from "../Appcontext";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export default function Language() {
  const { language, setLanguage } = useApp();
  const [saved, setSaved] = useState(false);

  const choose = (code) => {
    setLanguage(code);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Language</h1>
        <p className="page__subtitle">Select your preferred language</p>

        <div className="page card card--flush">
          {languages.map((l, i) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className={`lang-row ${i !== languages.length - 1 ? "has-border" : ""}`}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-name">{l.name}</span>
              {language === l.code && <span className="lang-check">✓</span>}
            </button>
          ))}
        </div>

        {saved && <p className="success-text mt-6">✓ Language saved!</p>}
      </div>
    </div>
  );
}
