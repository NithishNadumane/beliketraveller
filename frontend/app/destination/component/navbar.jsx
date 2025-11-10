"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loginmodal from "@/app/components/loginn";
import Signup from "@/app/components/signupp";
import SearchBar from "@/app/components/searchbar";

const Navbar = ({ districtName, districtid, onTabChange, activeTab }) => {
  const [showlogin, setshowlogin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
  const [user, setUser] = useState(null);

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

  // 👇 Navigation items
  const navItems = [
    { label: districtName, key: "district" },
    { label: "Rentals", key: "rental" },
    { label: "Travel Agency", key: "agency" },
    { label: "Hotels", key: "hotel" },
  ];

  return (
    <>
      {/* Whole Navbar Wrapper */}
      <nav className="w-full bg-black/95 shadow-md fixed top-0 left-0 right-0 z-50 font-sans">
        {/* Top Row */}
        <div className="px-6 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/beliketravellerlogo.png"
              alt="Be Like Traveller"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-white text-xl font-bold">
              beliketraveller
            </span>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <SearchBar variant="navbar" />
            </div>
          </div>

          {/* Right: Language + Auth */}
          <div className="flex items-center gap-4">
            <select className="p-2 rounded border border-gray-300 bg-white text-sm">
              <option value="en">English</option>
            </select>

            {user ? (
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-white font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition text-sm"
                onClick={() => setshowlogin(true)}
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Second Row: Categories */}
        <div className="flex justify-center gap-8 px-6 py-3 text-white text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)} // 👈 Parent tab switch trigger
              className={`relative px-4 py-2 transition-all duration-300 rounded-full ${
                activeTab === item.key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "hover:text-pink-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Login / Signup Modals */}
      {showlogin && (
        <Loginmodal
          onClose={() => setshowlogin(false)}
          switchtosignup={() => {
            setshowlogin(false);
            setshowsignup(true);
          }}
        />
      )}
      {showsignup && (
        <Signup
          onClose={() => setshowsignup(false)}
          switchtologin={() => {
            setshowlogin(true);
            setshowsignup(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
