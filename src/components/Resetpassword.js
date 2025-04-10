import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email === email) {
      user.password = newPass;
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMsg("Email not found!");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button type="submit">Reset</button>
        <button type="submit" onClick={() => navigate("/")}>
          Signup
        </button>
      </form>
      <p style={{ color: "green" }}>{msg}</p>
    </div>
  );
};

export default ResetPassword;
