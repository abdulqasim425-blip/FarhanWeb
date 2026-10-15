import { useState } from "react";
import "./pages.css";

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
  const [selected, setSelected] = useState("en");

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Language</h1>
        <p className="page__subtitle">Select your preferred language</p>

        <div className="card card--flush">
          {languages.map((l, i) => (
            <button
              key={l.code}
              onClick={() => setSelected(l.code)}
              className={`lang-row ${i !== languages.length - 1 ? "has-border" : ""}`}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-name">{l.name}</span>
              {selected === l.code && <span className="lang-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
