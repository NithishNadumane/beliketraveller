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
    { label: "Hotels", key: "hotel" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 shadow-md font-sans">

        {/* ===== TOP SECTION ===== */}
        <div className="px-3 md:px-6 py-1 md:py-3 md:h-20 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">

          {/* MOBILE ROW 1 : LOGO + LOGIN */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Image
                src="/beliketravellerlogo.png"
                alt="Be Like Traveller"
                width={32}
                height={32}
                className="rounded-full md:w-[50px] md:h-[50px]"
              />
              <span className="text-white text-[13px] md:text-xl font-bold">
                beliketraveller
              </span>
            </div>

            {/* Mobile Login */}
            <div className="md:hidden">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-700 text-white px-2 py-[2px] rounded text-[10px]"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setshowlogin(true)}
                  className="bg-gray-800 text-white px-2 py-[2px] rounded text-[10px]"
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
          <div className="hidden md:flex items-center justify-end gap-3">

            {user ? (
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <span className="text-white font-medium">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setshowlogin(true)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
              >
                Login / Signup
              </button>
            )}

          </div>

        </div>

        {/* ===== CATEGORY TABS (CENTERED FIX) ===== */}
        <div className="w-full flex justify-center">

          <div className="flex gap-2 md:gap-8 px-3 md:px-6 py-[2px] md:py-3 
            text-white text-[10px] md:text-sm font-medium 
            overflow-x-auto whitespace-nowrap">

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`px-2 md:px-4 py-[2px] md:py-2 rounded-full transition-all duration-300 ${
                  activeTab === item.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-105"
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