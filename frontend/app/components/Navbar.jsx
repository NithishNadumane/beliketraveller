"use client"
import React from 'react'
import Link from 'next/link'
import './css/navbar.css'
import Image from 'next/image'
const Navbar = () => {
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
            <Link href="/login'" className='authbtn'>Login/signup</Link>
          </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar
