"use client"
import React, { useState } from 'react'
import axios from 'axios'
import './css/auth.css'

const signupp = ({ onClose, switchtologin }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [seepassword, setseepassword] = useState(false);
  const [otp, setotp] = useState("");
  const [otpsent, setotpsent] = useState(false);

  async function handleotp() {
    try {
      
      setotpsent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  }

  async function handelsignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, otp });

      // ✅ Save token & user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // ✅ close modal + refresh navbar
      onClose();
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  async function handleGoogleSignup() {}

  return (
    <div className='modalOverlay' onClick={onClose}>
      <div className='modalBox' onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>Signup</h2>
        <form className='signupForm' onSubmit={handelsignup}>
          <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="Name" required />
          <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" required />
          <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" required />
          {!otpsent && <button type="button" onClick={handleotp}>Send OTP</button>}
          {otpsent && <input value={otp} onChange={(e) => setotp(e.target.value)} type="text" placeholder="Enter OTP" required />}
          <button type="submit">Signup</button>
        </form>
        <p className="switchText">
          Already have an account?{" "}
          <span onClick={switchtologin} className="switchLink">Login</span>
        </p>
        <button className="googleBtn" onClick={handleGoogleSignup}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="googleIcon" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default signupp
