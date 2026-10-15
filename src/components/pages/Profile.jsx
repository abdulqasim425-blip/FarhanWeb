import { Link } from "react-router-dom";
import { useApp } from "../Appcontext";

export default function Profile() {
  const { profile } = useApp();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1020",
        color: "#e8ecf8",
        padding: "120px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px",
          }}
        >
          My Profile
        </h1>
        <p
          style={{ color: "#9aa6c7", margin: "0 0 32px", fontSize: "0.95rem" }}
        >
          Manage your personal information
        </p>

        {/* Profile card */}
        <div
          style={{
            background: "#151d38",
            border: "1px solid #243055",
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6d7cff, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {profile.name?.charAt(0) || "U"}
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 4px",
                }}
              >
                {profile.name}
              </h2>
              <p
                style={{
                  color: "#e8ecf8",
                  margin: "0 0 4px",
                  fontSize: "0.95rem",
                }}
              >
                {profile.email}
              </p>
              <p style={{ color: "#9aa6c7", margin: 0, fontSize: "0.85rem" }}>
                {profile.location}
              </p>
            </div>

            <Link
              to="/profile/edit"
              style={{
                background: "#6d7cff",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <InfoBox label="Full Name" value={profile.name} />
          <InfoBox label="Email" value={profile.email} />
          <InfoBox label="Location" value={profile.location} />
          <InfoBox label="Tagline" value={profile.tagline} full />
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, full }) {
  return (
    <div
      style={{
        background: "#0b1020",
        border: "1px solid #243055",
        borderRadius: 12,
        padding: "16px 20px",
        gridColumn: full ? "1 / -1" : "auto",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#9aa6c7",
          margin: "0 0 6px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.98rem",
          fontWeight: 500,
          color: "#fff",
          margin: 0,
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}
      >
        {value}
      </p>
    </div>
  );
}
