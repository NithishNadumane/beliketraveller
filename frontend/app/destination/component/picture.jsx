"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const Picture = ({ districtName }) => {
  const [images, setImages] = useState([]);

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

  return (
    <div className="mt-1">
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={20}
        slidesPerView={"auto"}
        navigation
        pagination={{ 
          clickable: true,
          el: ".custom-pagination", // custom container
        }}
        grabCursor={true}
        freeMode={true}
      >
        {images.map((item) => (
          <SwiperSlide key={item.media_id} className="text-center relative !w-72">
            <img
              src={item.media_url}
              alt={item.place_name}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black bg-opacity-50 px-2 py-1 rounded">
              <span className="w-1 h-5 bg-red-500 block"></span>
              <p className="text-white text-sm font-semibold">{item.place_name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination container below */}
      <div className="custom-pagination mt-4 flex justify-center"></div>
    </div>
  );
};

export default Picture;
 