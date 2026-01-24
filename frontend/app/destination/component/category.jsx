"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryPlaces({ districtId, districtName }) {
  const [selectedCategory, setSelectedCategory] = useState("tp");
  const [places, setPlaces] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  const categories = [
    { code: "tp", short: "Top", full: "Top Places" },
    { code: "ch", short: "Culture", full: "Cultural & Heritage" },
    { code: "no", short: "Nature", full: "Nature & Outdoors" },
    { code: "ad", short: "Adventure", full: "Adventures" },
    { code: "hg", short: "Hidden", full: "Hidden Gems" },
  ];

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!districtId) return;
      try {
        const res = await axios.get(
          `${API}/api/categories/${districtId}/${selectedCategory}`
        );
        setPlaces(res.data);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };
    fetchPlaces();
  }, [districtId, selectedCategory]);

  return (
    <div className="p-3 sm:p-4 lg:p-5 mx-4 sm:mx-10 lg:ml-20 lg:mr-20">

      {/* Category Bar */}
      <div className="flex flex-nowrap justify-between sm:justify-center gap-1 sm:gap-3 lg:gap-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.code}
            onClick={() => setSelectedCategory(cat.code)}
            className={`px-2 sm:px-4 lg:px-5 py-1 sm:py-2 
              rounded-md sm:rounded-full 
              text-[10px] sm:text-sm 
              font-semibold transition-all duration-300
              ${
                selectedCategory === cat.code
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`}
          >
            <span className="block sm:hidden">{cat.short}</span>
            <span className="hidden sm:block">{cat.full}</span>
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div
        className="
          mt-2 sm:mt-6 lg:mt-8
          grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3
          gap-3 sm:gap-6 lg:gap-8
        "
      >
        {places.length > 0 ? (
          places.map((place) => (
            <Link
              key={place.id}
              href={`/destination/${districtName
                ?.toLowerCase()
                .replace(/\s+/g, "-")}/${place.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <div className="bg-white border rounded-lg sm:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

                {/* Image */}
                <div className="overflow-hidden rounded-t-lg sm:rounded-t-2xl">
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-28 sm:h-52 lg:h-56 object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-4 lg:p-5">
                  <h3 className="text-xs sm:text-lg font-bold text-gray-800 truncate">
                    {place.name}
                  </h3>

                  <p className="hidden sm:block text-gray-600 text-sm mt-2 line-clamp-2">
                    {place.description}
                  </p>
                </div>

              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No places found for this category.
          </p>
        )}
      </div>

    </div>
  );
}