"use client";
import React, { useState } from "react";
import axios from "axios";
import "./css/auth.css";

const Signup = ({ onClose, switchtologin }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [otp, setotp] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  async function handleotp() {
    try {
      if (!email) return alert("Please enter your email first!");
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      alert(response.data.message);
      setotpsent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  }

  async function handelsignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        otp,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onClose();
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>Signup</h2>

        <form className="signupForm" onSubmit={handelsignup}>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />

          {/* Password with eye icon 👁️ */}
          <div className="passwordContainer">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {!otpsent && (
            <button type="button" onClick={handleotp}>
              Send OTP
            </button>
          )}
          {otpsent && (
            <input
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              required
            />
          )}
          <button type="submit">Signup</button>
        </form>

        <p className="switchText">
          Already have an account?{" "}
          <span onClick={switchtologin} className="switchLink">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
