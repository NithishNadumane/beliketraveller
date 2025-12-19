"use client"
import { useState } from "react";
import axios from "axios";

export default function SearchBar({ variant = "home" }) {
  const [query, setQuery] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${API}/api/search?query=${query}`);
      const data = res.data;

      if (data.type === "district") {
        window.location.href = `/destination/${data.name.toLowerCase()}`;
      } else if (data.type === "place") {
        window.location.href = `/destination/${data.district.toLowerCase()}/${data.name.toLowerCase().replace(/\s+/g, "-")}`;
      } else {
        console.warn("No results found!");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };


  // --- Styling Logic ---
  // The new design uses a single white container with padding,
  // and the input/button are placed inside it.

  // Container: A single white, pill-shaped container with an inner padding.
  const containerClasses =
    variant === "navbar"
      ? "flex items-center h-12 w-full max-w-lg bg-white rounded-full shadow-md px-2"
      : "flex items-center h-16 md:h-20 w-full max-w-[700px] bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2 pl-2 pr-5";

  // Input: Transparent background to blend with the white container.
  const inputClasses =
    variant === "navbar"
      ? "flex-1 h-full bg-transparent text-black placeholder-gray-500 outline-none pl-4"
      : "flex-1 h-full px-6 bg-transparent text-black placeholder-gray-500 text-lg outline-none";

  // Button: An independent, pill-shaped red button inside the container.
  const buttonClasses =
    variant === "navbar"
      ? "py-2 px-6 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors duration-200"
      : "py-3 pl-10 pr-8 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-200 ml-6";

  return (
    <div className={containerClasses}>
      <input
        type="text"
        placeholder="Search destinations, temples, beaches..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className={inputClasses}
      />
      <button onClick={handleSearch} className={buttonClasses}>
        Search
      </button>
    </div>
  );
}

