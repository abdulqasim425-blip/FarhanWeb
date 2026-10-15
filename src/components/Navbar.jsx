import { useApp } from "../context/AppContext"; // ← ye import add karo

// component ke andar
const { profile, t } = useApp();

// links array ke bajaye ye use karo:
const navLinks = [
  ["nav.services", "/#services"],
  ["nav.work", "/#work"],
  ["nav.process", "/#process"],
  ["nav.pricing", "/#pricing"],
  ["nav.contact", "/#contact"],
];

// Render me:
{
  navLinks.map(([key, href]) => (
    <a key={href} href={href} onClick={() => setOpen(false)}>
      {t(key)}
    </a>
  ));
}

// "Hire me" button:
<a href="/#contact" className="btn btn--small" onClick={() => setOpen(false)}>
  {t("nav.hire")}
</a>;
