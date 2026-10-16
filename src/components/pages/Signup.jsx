import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  // 🌍 Location automatically detect karo
  const detectLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      if (data.city && data.country_name) {
        return `${data.city}, ${data.country_name}`;
      }
      return "Unknown";
    } catch (e) {
      console.warn("Location detect failed:", e);
      return "Unknown";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (!form.agree) {
      setError("You must agree to the terms.");
      return;
    }

    // Location detect karo
    const location = await detectLocation();

    const result = await signup(form.name, form.email, form.password, location);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    // Signup successful → Home page pe redirect
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Create an account</h1>
          <p className="auth-card__subtitle">
            Join in a few seconds — it's free
          </p>
        </div>

        <form onSubmit={submit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div>
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Your name"
              className="input"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="you@example.com"
              className="input"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={change}
                placeholder="At least 6 characters"
                className="input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="auth-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={change}
              placeholder="Repeat your password"
              className="input"
              autoComplete="new-password"
            />
          </div>

          <label className="auth-checkbox auth-checkbox--full">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={change}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="auth-link">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="auth-link">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button type="submit" className="btn btn--primary btn--full">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
