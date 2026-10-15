import { createContext, useContext, useEffect, useState } from "react";
import { profile as defaultProfile } from "../components/data";
import { translations } from "../i18n/translations";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        return { ...defaultProfile, ...JSON.parse(stored) };
      } catch {}
    }
    return defaultProfile;
  });

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [accent, setAccent] = useState(
    () => localStorage.getItem("accent") || "#6d7cff",
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("paymentCards");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [
      { id: 1, brand: "Visa", last4: "4242", exp: "12/26", default: true },
      {
        id: 2,
        brand: "Mastercard",
        last4: "8888",
        exp: "08/27",
        default: false,
      },
    ];
  });

  // Apply theme + accent
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--accent", accent);
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);
  }, [theme, accent]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" || language === "ur" ? "rtl" : "ltr",
    );
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("paymentCards", JSON.stringify(cards));
  }, [cards]);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        theme,
        setTheme,
        accent,
        setAccent,
        language,
        setLanguage,
        cards,
        setCards,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
