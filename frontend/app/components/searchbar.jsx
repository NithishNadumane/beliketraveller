"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SearchBar({ variant = "home" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${API}/api/search?query=${value}`);
      setSuggestions(res.data.results || []);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleSearch = async (item = null) => {
    const searchValue = item ? item.name : query;
    if (!searchValue.trim()) return;

    try {
      const res = await axios.get(`${API}/api/search?query=${searchValue}`);
      const data = res.data.results?.[0];

      if (!data) return;

      if (data.type === "district") {
        router.push(`/destination/${data.name.toLowerCase()}`);
      } else if (data.type === "place") {
        router.push(
          `/destination/${data.district
            .toLowerCase()}/${data.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );
      }

      setSuggestions([]);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  /* ===== Only Size Scaling For Mobile ===== */

  const containerClasses =
    variant === "navbar"
      ? "relative flex items-center h-12 w-full max-w-lg bg-white rounded-full shadow-md px-2"
      : "relative flex items-center h-14 sm:h-16 md:h-20 w-full max-w-[700px] bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3 sm:px-4";

  const inputClasses =
    variant === "navbar"
      ? "flex-1 h-full bg-transparent text-black placeholder-gray-500 outline-none pl-4"
      : "flex-1 h-full px-3 sm:px-6 bg-transparent text-black placeholder-gray-500 text-sm sm:text-lg outline-none";

  const buttonClasses =
    variant === "navbar"
      ? "py-2 px-6 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors duration-200"
      : "py-2 sm:py-3 px-4 sm:px-8 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-red-700 transition-colors duration-200 ml-3 sm:ml-6";

  return (
    <div className={containerClasses}>
      <input
        type="text"
        placeholder="Search destinations, temples, beaches..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className={inputClasses}
      />

      <button onClick={() => handleSearch()} className={buttonClasses}>
        Search
      </button>

      {/* 🔥 Autocomplete Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-lg mt-2 overflow-hidden z-50 border border-red-100">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSearch(item)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-150 hover:bg-red-50"
            >
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-sm">
                  {item.type === "district" ? "📍" : "🏝️"}
                </span>

                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-gray-800">
                    {item.name}
                  </span>

                  {item.type === "place" && (
                    <span className="text-[10px] text-gray-500">
                      {item.district}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-red-400">
                {item.type === "district" ? "District" : "Place"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}