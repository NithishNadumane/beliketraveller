"use client"
import React, { useState } from 'react'
import "./css/check.css";
import axios from "axios";

const loginn = ({ onClose, switchtosignup }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlelogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // ✅ Save token & user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // ✅ close modal + refresh navbar
      onClose();
      window.dispatchEvent(new Event("storage"));

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  async function handlegooglelogin() {}

  return (
    <div className='modalOverlay' onClick={onClose}>
      <div className='modalBox' onClick={(e) => e.stopPropagation()}>
        <button className='closeBtn' onClick={onClose}> ✖</button>
        <h2>Login</h2>
        <form className="loginForm" onSubmit={handlelogin}>
          <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder='Email' required />
          <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className='switchText'>
          New user?{" "}
          <span onClick={switchtosignup} className='switchLink'>Signup</span>
        </p>
        <button className="googleBtn" onClick={handlegooglelogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="googleIcon" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default loginn
