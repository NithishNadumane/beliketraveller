"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Picture = ({ districtName }) => {
  const [images, setImages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/images/${districtName}`
        );
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    if (districtName) fetchImages();
  }, [districtName]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative my-6">
      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>

      {/* IMAGE STRIP */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-10 scrollbar-hide"
      >
        {images.map((item) => (
          <div
            key={item.media_id}
            className="min-w-[200px] bg-white rounded-xl shadow-md"
          >
            <img
              src={item.media_url}
              alt={item.place_name}
              className="w-full h-[160px] object-cover rounded-t-xl"
            />
            <p className="text-center text-sm font-medium py-2">
              {item.place_name}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default Picture;
