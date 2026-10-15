import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile as defaultProfile } from "../data";

export default function Profile() {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        setProfile({ ...defaultProfile, ...JSON.parse(stored) });
      } catch (e) {
        console.error("Failed to parse stored profile:", e);
      }
    }
  }, []);

  return (
    <div className="page">
      <div className="page__container">
        <h1 className="page__title">My Profile</h1>
        <p className="page__subtitle">Manage your personal information</p>

        <div className="page card">
          <div className="profile-header">
            <div className="avatar avatar--lg">
              {profile.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="profile-name">{profile.name}</h2>
              <p className="muted">{profile.email}</p>
              <p className="muted small">{profile.location}</p>
            </div>
          </div>

          <div className="page grid-2">
            <div>
              <span className="label">Full Name</span>
              <p className="value">{profile.name}</p>
            </div>
            <div>
              <span className="label">Email</span>
              <p className="value">{profile.email}</p>
            </div>
            <div>
              <span className="label">Location</span>
              <p className="value">{profile.location}</p>
            </div>
            <div>
              <span className="label">Tagline</span>
              <p className="value">{profile.tagline}</p>
            </div>
          </div>

          <Link to="/profile/edit" className="btn btn--primary mt-8">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
