import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  // Agar user login hai to uska data, warna default
  const displayName = user?.name || "Guest User";
  const displayEmail = user?.email || "guest@example.com";

  return (
    <div className="page">
      <div className="page__container">
        <div className="page__header">
          <div className="page__header-text">
            <h1 className="page__title">
              <span className="page__title-icon">👤</span>
              My Profile
            </h1>
            <p className="page__subtitle">Manage your personal information</p>
          </div>
          <div className="page__header-actions">
            <Link to="/profile/edit" className="btn btn--primary">
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="page__section">
          <div className="page__card page__card--accent">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div className="avatar avatar--lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    margin: "0 0 4px",
                    color: "var(--text-strong)",
                  }}
                >
                  {displayName}
                </h2>
                <p
                  style={{
                    color: "var(--text)",
                    margin: "0 0 4px",
                    fontSize: "0.95rem",
                  }}
                >
                  {displayEmail}
                </p>
                <p
                  style={{
                    color: "var(--muted)",
                    margin: 0,
                    fontSize: "0.85rem",
                  }}
                >
                  {user ? "Logged in user" : "Not logged in"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page__section">
          <div className="page__section-header">
            <h2 className="page__section-title">
              <span className="page__section-title-icon">📋</span>
              Account Details
            </h2>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-item__label">Full Name</span>
              <span className="info-item__value">{displayName}</span>
            </div>
            <div className="info-item">
              <span className="info-item__label">Email</span>
              <span className="info-item__value">{displayEmail}</span>
            </div>
            <div className="info-item info-item--full">
              <span className="info-item__label">User ID</span>
              <span className="info-item__value">{user?.id || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
