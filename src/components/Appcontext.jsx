import { createContext, useContext, useEffect, useState } from "react";
import { profile as defaultProfile } from "./data";

const AppContext = createContext();

export function AppProvider({ children }) {
  // ---- Profile ----
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        return { ...defaultProfile, ...JSON.parse(stored) };
      } catch {
        /* ignore */
      }
    }
    return defaultProfile;
  });

  // ---- Appearance ----
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [accent, setAccent] = useState(
    () => localStorage.getItem("accent") || "#6366f1",
  );

  // ---- Language ----
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );

  // ---- Payment Cards ----
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("paymentCards");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        /* ignore */
      }
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

  // ---- Apply theme & accent to <html> whenever they change ----
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--accent", accent);
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);
  }, [theme, accent]);

  // ---- Persist everything on change ----
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("paymentCards", JSON.stringify(cards));
  }, [cards]);

  const value = {
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
