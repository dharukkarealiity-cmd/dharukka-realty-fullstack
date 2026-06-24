import React, { useState } from "react";
import axios from "axios";
import "./AdminAuth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const login = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5001/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.log(err);

      if (err.response && err.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Allow pressing Enter to submit from either field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <p className="admin-login-brand">DHARUKKA REALTY</p>
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">
          Sign in to manage projects, leads and inquiries.
        </p>

        {error && <div className="admin-login-error">{error}</div>}

        <div className="admin-login-field">
          <label className="admin-login-label">Email</label>
          <input
            className="admin-login-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="admin-login-field">
          <label className="admin-login-label">Password</label>
          <input
            className="admin-login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="admin-login-button"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;