import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    const result = login(form.email, form.password);
    if (!result.ok) {
      // Agar email exist nahi karti → signup page pe redirect
      if (result.error === "no-account") {
        navigate("/signup");
        return;
      }
      setError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={submit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

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
                placeholder="••••••••"
                className="input"
                autoComplete="current-password"
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

          <div className="auth-row">
            <label className="auth-checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn--primary btn--full">
            Sign In
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-socials">
          <button className="auth-social" type="button">
            <span>🔵</span> Google
          </button>
          <button className="auth-social" type="button">
            <span>⚫</span> GitHub
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
