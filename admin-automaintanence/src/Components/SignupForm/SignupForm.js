import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForm({ setShowSignup }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        userName,
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === "Admin created successfully") {
        navigate("/adminDAF/dashboard");
      }
    } catch (error) {
      setMessage("Signup failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setShowSignup(false)}>Back to Login</button>
    </div>
  );
}

export default SignupForm;
