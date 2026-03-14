"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Video from "../component/video";
import Review from "../component/Review";
import Chatbot from "../component/chatbot";

export default function PlaceOverview({ placedata }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchImages() {
      if (!placedata?.id) return;
      try {
        const res = await axios.get(`${API}/api/imagesplace/${placedata.id}`);
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [placedata]);

  if (!placedata) {
    return (
      <p className="text-center mt-32 text-gray-600 text-lg">
        Place data not available
      </p>
    );
  }

  if (loading) return <p className="text-center mt-32">Loading images...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[480px] md:h-[550px] overflow-hidden rounded-b-3xl shadow-xl">

        <img
          src={images[1]?.src || images[0]?.src}
          alt={placedata.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-16">
          <div className="max-w-xl">

            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-5">
              Explore <br />
              <span className="text-pink-500">{placedata.name}</span>
            </h1>

            <button className="bg-pink-600 hover:bg-pink-700 text-white px-7 py-3 rounded-full font-medium transition">
              Plan Your Visit
            </button>

          </div>
        </div>

      </div>

      {/* ================= ABOUT + VIDEO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt="place"
                className="rounded-xl object-cover h-44 w-full hover:scale-105 transition duration-300"
              />
            ))}
          </div>

          {/* VIDEO */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Recommended Video
            </h2>

            <div className="bg-white rounded-xl shadow-md p-4">
              <Video />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div>

          <h2 className="text-3xl font-bold mb-5">
            About {placedata.name}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {placedata.comdescription}
          </p>

          {/* INFO CARDS */}
          
        </div>

      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-6">
          User Reviews
        </h2>

        <div className="bg-white rounded-xl shadow-md p-4">
          <Review placeId={placedata.id} />
        </div>
      </section>

      {/* ================= CHATBOT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Chatbot />
      </div>

    </div>
  );
}