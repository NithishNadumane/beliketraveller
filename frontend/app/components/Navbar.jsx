"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './css/navbar.css'
import Image from 'next/image'
import Loginmodal from './loginn';  
import Signup from './signupp';

const Navbar = () => {
  const [showlogin, setshowlogin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
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
          <select className='language'>
            <option value='en'>English</option>
          </select>

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
  <button className='authbtn' onClick={() => setshowlogin(true)}>Login / Signup</button>
)}

          </div>
        </div>
      </nav>

      {showlogin && (
        <Loginmodal onClose={() => setshowlogin(false)}
          switchtosignup={() => { setshowlogin(false); setshowsignup(true) }}
        />
      )}
      {showsignup && (
        <Signup onClose={() => setshowsignup(false)}
          switchtologin={() => { setshowlogin(true); setshowsignup(false) }}
        />
      )}
    </>
  )
}

export default Navbar
