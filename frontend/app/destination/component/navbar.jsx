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

  const navItems = [
    { label: districtName, key: "district" },
    { label: "Rentals", key: "rental" },
    { label: "Travel Agency", key: "agency" },
    { label: "Stay & Food", key: "hotel" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-black/95 shadow-lg font-sans backdrop-blur-md">

        {/* ===== TOP SECTION ===== */}
    <div className="px-3 md:px-8 py-1 md:py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1">

          {/* MOBILE ROW 1 : LOGO + LOGIN */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              {/* BIGGER LOGO */}
<Image
  src="/beliketravellerlogo.png"
  alt="Be Like Traveller"
  width={65}
  height={65}
  className="rounded-full h-10 w-10 md:h-[60px] md:w-[60px] shadow-md object-contain"
/>

              <span className="text-white text-[14px] md:text-2xl font-semibold tracking-wide">
                beliketraveller
              </span>

            </div>

            {/* Mobile Login */}
            <div className="md:hidden">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-black border border-gray-700 text-white px-3 py-[3px] rounded-md text-[11px]"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setshowlogin(true)}
                  className="bg-black border border-gray-700 text-white px-3 py-[3px] rounded-md text-[11px]"
                >
                  Login
                </button>
              )}
            </div>

          </div>

          {/* MOBILE ROW 2 : SEARCH */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md scale-[0.85] md:scale-100 origin-top">
              <SearchBar variant="navbar" />
            </div>
          </div>

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center justify-end gap-4">

            {user ? (
              <div className="flex items-center gap-3 bg-black border border-gray-700 px-3 py-2 rounded-xl shadow-md">

                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold shadow">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <span className="text-white font-semibold tracking-wide">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-black border border-red-700 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <button
                onClick={() => setshowlogin(true)}
                className="bg-black border border-gray-700 hover:border-white text-white px-5 py-2 rounded-xl text-sm font-semibold tracking-wide shadow-md transition"
              >
                Login / Signup
              </button>
            )}

          </div>

        </div>

        {/* ===== CATEGORY TABS ===== */}
        <div className="w-full flex justify-center border-t border-gray-800">

          <div className="flex gap-3 md:gap-10 px-4 md:px-8 py-2 
            text-white text-[11px] md:text-base font-semibold tracking-wide
            overflow-x-auto whitespace-nowrap">

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`px-3 md:px-5 py-1 md:py-2 rounded-full transition-all duration-300 ${
                  activeTab === item.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl scale-110"
                    : "hover:text-pink-400"
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>

        </div>

      </nav>

      {/* LOGIN MODAL */}
      {showlogin && (
        <Loginmodal
          onClose={() => setshowlogin(false)}
          switchtosignup={() => {
            setshowlogin(false);
            setshowsignup(true);
          }}
        />
      )}

      {/* SIGNUP MODAL */}
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
