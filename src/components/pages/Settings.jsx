const items = [
  {
    href: "/settings/appearance",
    icon: "🎨",
    title: "Appearance",
    desc: "Theme, colors, dark mode",
  },
  {
    href: "/settings/language",
    icon: "🌐",
    title: "Language",
    desc: "Choose your preferred language",
  },
  {
    href: "/settings/notifications",
    icon: "🔔",
    title: "Notifications",
    desc: "Email and push preferences",
  },
  {
    href: "/settings/security",
    icon: "🔒",
    title: "Security",
    desc: "Password and 2FA",
  },
];

export default function Settings() {
  return (
    <div className="page">
      <div className="page__container">
        <h1 className="page__title">Settings</h1>
        <p className="page__subtitle">Manage your account preferences</p>

        <div className="grid-2">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="card card--hover">
              <div className="card__icon">{it.icon}</div>
              <h3 className="card__title">{it.title}</h3>
              <p className="muted small">{it.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
