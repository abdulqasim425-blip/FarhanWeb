import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { profile as defaultProfile } from "../data";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        return { ...defaultProfile, ...JSON.parse(stored), bio: "" };
      } catch {
        /* ignore */
      }
    }
    return {
      name: defaultProfile.name || "",
      email: defaultProfile.email || "",
      location: defaultProfile.location || "",
      tagline: defaultProfile.tagline || "",
      bio: "",
    };
  });

  const [saved, setSaved] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    // Save to localStorage (bio is excluded to keep shape clean, or include if you want)
    const { bio, ...persisted } = form;
    localStorage.setItem("profile", JSON.stringify(persisted));

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("/profile");
    }, 1200);
  };

  return (
    <div className="page">
      <div className="page__container page__container--narrow">
        <h1 className="page__title">Edit Profile</h1>
        <p className="page__subtitle">Update your personal details</p>

        <form onSubmit={submit} className="page card form-stack">
          {[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "location", label: "Location" },
            { name: "tagline", label: "Tagline" },
          ].map((f) => (
            <div key={f.name}>
              <label className="label block">{f.label}</label>
              <input
                type={f.type || "text"}
                name={f.name}
                value={form[f.name]}
                onChange={change}
                className="input"
              />
            </div>
          ))}

          <div>
            <label className="label block">Bio</label>
            <textarea
              name="bio"
              rows="4"
              value={form.bio}
              onChange={change}
              className="input"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              Save Changes
            </button>
            <Link to="/profile" className="btn-text">
              Cancel
            </Link>
            {saved && <span className="success-text">✓ Profile updated!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
