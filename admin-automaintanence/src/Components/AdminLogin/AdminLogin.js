import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupForm from "../SignupForm/SignupForm";

function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        userName,
        password,
      });
      setMessage(response.data.message);

      if (response.data.success) {
        localStorage.setItem("username", userName);
        navigate("/adminDAF/dashboard");
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      {showSignup ? (
        <SignupForm setShowSignup={setShowSignup} />
      ) : (
        <div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
          {message && <p>{message}</p>}
          <button onClick={() => setShowSignup(true)}>Create Account</button>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
