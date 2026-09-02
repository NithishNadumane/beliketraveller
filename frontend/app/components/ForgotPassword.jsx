"use client";
import React, { useState } from "react";
import axios from "axios";
import "./css/check.css";

const ForgotPassword = ({ onClose, switchtologin }) => {
  const [step, setStep] = useState(1);
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const API = process.env.NEXT_PUBLIC_API_URL;
  // 🔹 Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/send-otp`, { email });
      // alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset Password
  const reset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/reset-password-otp`, {
        email,
        otp,
        password,
      });

      // alert("Password updated successfully");

      // ✅ clear fields
      setemail("");
      setotp("");
      setpassword("");

      // ✅ redirect to login
      switchtologin();

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="closeBtn" onClick={onClose}>✖</button>

        <h2>Reset Password</h2>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <form className="loginForm" onSubmit={sendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP + PASSWORD */}
        {step === 2 && (
          <form className="loginForm" onSubmit={reset}>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              required
            />

            <div className="passwordContainer">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
               <span
    className="togglePassword"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <p className="switchText">
          Remember password?{" "}
          <span onClick={switchtologin} className="switchLink">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;