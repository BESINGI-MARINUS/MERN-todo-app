import { useState } from "react";
import { API_BASE_URL } from "../config";

function Login({ onLogin, onHaveAnAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.message || "Login failed");

      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Please enter your details</p>

        <form onSubmit={handleForm}>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className="toggle-text">
          <a href="/forgot-password">Forgot Password</a>
        </p>
        <p className="toggle-text">
          Don't have an account?{" "}
          <button onClick={onHaveAnAccount}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
