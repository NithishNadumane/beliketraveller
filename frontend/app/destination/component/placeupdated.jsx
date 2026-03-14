"use client";
import React, { useState } from "react";

export default function Placepicture({ images }) {
  const [activeImage, setActiveImage] = useState(
    images?.[0]?.url || ""
  );

  if (!images || images.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No images available
      </p>
    );
  }

  return (
    <div className="w-full">

      {/* MAIN IMAGE */}
      <div className="w-full h-[420px] mb-4">
        <img
          src={activeImage}
          alt="Main Place"
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto">

        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Thumbnail"
            onClick={() => setActiveImage(img.url)}
            className={`
              h-20 w-28 object-cover rounded-lg cursor-pointer
              border-2 transition
              ${
                activeImage === img.url
                  ? "border-pink-500"
                  : "border-transparent"
              }
            `}
          />
        ))}

      </div>

    </div>
  );
}