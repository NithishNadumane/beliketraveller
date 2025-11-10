"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryPlaces({ districtId, districtName }) {  // ✅ added both props
  const [selectedCategory, setSelectedCategory] = useState("tp");
  const [places, setPlaces] = useState([]);

  const categories = [
    { code: "tp", name: "Top Places" },
    { code: "ch", name: "Cultural & Heritage" },
    { code: "no", name: "Nature & Outdoors" },
    { code: "ad", name: "Adventures" },
    { code: "hg", name: "Hidden Gems" },
  ];

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!districtId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/categories/${districtId}/${selectedCategory}`
        );
        setPlaces(res.data);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };
    fetchPlaces();
  }, [districtId, selectedCategory]);

  return (
    <div className="p-5 ml-20 mr-20">
      {/* Category Bar */}
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide justify-center">
        {categories.map((cat) => (
          <button
            key={cat.code}
            onClick={() => setSelectedCategory(cat.code)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === cat.code
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Places List */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.length > 0 ? (
          places.map((place) => (
            <Link
              key={place.id}
              href={`/destination/${districtName
                ?.toLowerCase()
                .replace(/\s+/g, "-")}/${place.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`} // ✅ matches your search URL structure
              passHref
            >
              <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{place.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
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
