"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './css/navbar.css'
import Image from 'next/image'
import Loginmodal from './loginn'
import Signup from './signupp' 
import ForgotPassword from './ForgotPassword'

const Navbar = () => {
  const [mode, setMode] = useState(null); // 👈 login | signup | forgot | null
  const [user, setUser] = useState(null);

  // ✅ load user from storage 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser)); 

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navleft'>
          <Image src="/beliketravellerlogo.png" alt="Be Like Traveller" width={90} height={90} className='navlogo' />
          <span className='sitename'>beliketraveller</span>
        </div>

        <div className='navcenter'> 
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
          </ul>
        </div>

        <div className='navright'>
          <div className='authset'>
            {user ? (
              <div className="profile">
                <div className="profileIcon">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{user.name}</span>
                <button onClick={handleLogout} className="logoutBtn">Logout</button>
              </div>
            ) : (
              <button className='authbtn' onClick={() => setMode("login")}>
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 🔥 Login */}
      {mode === "login" && (
        <Loginmodal
          onClose={() => setMode(null)}
          switchtosignup={() => setMode("signup")}
          switchtoforgot={() => setMode("forgot")}
        />
      )}

      {/* 🔥 Signup */}
      {mode === "signup" && (
        <Signup
          onClose={() => setMode(null)}
          switchtologin={() => setMode("login")}
        />
      )}

      {/* 🔥 Forgot Password */}
      {mode === "forgot" && (
        <ForgotPassword
          onClose={() => setMode(null)}
          switchtologin={() => setMode("login")}
        />
      )}
    </>
  )
}

export default Navbar;