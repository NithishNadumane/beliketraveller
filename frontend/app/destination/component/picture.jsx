"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Picture = ({ districtName }) => {
  const [images, setImages] = useState([]);
  const scrollRef = useRef(null);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get(
          `${API}/api/images/${districtName}`
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

    const scrollAmount = 300; // Desktop unchanged

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative my-6">

      {/* LEFT BUTTON (Desktop Only) */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-black/60 text-white px-3 py-2 rounded-full
          max-sm:hidden
        "
      >
        ‹
      </button>

      {/* IMAGE STRIP */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth px-10 scrollbar-hide
          max-sm:px-2 max-sm:gap-3 max-sm:snap-x max-sm:snap-mandatory
        "
      >
        {images.map((item) => (
          <div
            key={item.media_id}
            className="
              min-w-[200px] bg-white rounded-xl shadow-md
              max-sm:min-w-[150px] max-sm:snap-start
            "
          >
            <img
              src={item.media_url}
              alt={item.place_name}
              className="
                w-full h-[160px] object-cover rounded-t-xl
                max-sm:h-[120px]
              "
            />
            <p className="text-center text-sm font-medium py-2 max-sm:text-xs">
              {item.place_name}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON (Desktop Only) */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-black/60 text-white px-3 py-2 rounded-full
          max-sm:hidden
        "
      >
        ›
      </button>

    </div>
  );
};

export default Picture;