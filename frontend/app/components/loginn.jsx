"use client";
import React, { useState } from "react";
import "./css/check.css";
import axios from "axios";

const Login = ({ onClose, switchtosignup }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlelogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onClose();
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>Login</h2>
        <form className="loginForm" onSubmit={handlelogin}>
          <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" required />
          <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="switchText">
          New user?{" "}
          <span onClick={switchtosignup} className="switchLink">Signup</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
