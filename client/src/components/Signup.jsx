import { useState } from "react";
import { API_BASE_URL } from "../config";

function Signup({ onSignup, onHaveAnAccount }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForm(e) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) throw new Error(data.message || "Signup failed");
      onSignup();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Please enter your details</p>

        <form onSubmit={handleForm}>
          <div className="input-group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary">
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        <p className="toggle-text">
          Already have an account ?{" "}
          <button onClick={onHaveAnAccount}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
