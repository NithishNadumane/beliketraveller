"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Placepicture from "../component/placepicture";
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
    <div className="px-6 md:px-12 lg:px-24 py-12 bg-gray-50 min-h-screen">
      {/* 🔹 Title + Description */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {placedata.name}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {placedata.description}
        </p>
      </div>

      {/* 🔹 Place Pictures */}
      <div className="flex justify-center">
        <div style={{ width: "80%", height: "100vh" }}>
          <Placepicture images={images} />
        </div>
      </div>

      {/* 🔹 Recommended Videos */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Recommended Video
        </h2>
        <div className="flex justify-center">
          <div className="w-full md:w-3/4">
            <Video />
          </div>
        </div>
      </section>

      {/* 🔹 User Reviews */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          User Reviews
        </h2>
        <div className="flex justify-center">
          <div className="w-full md:w-3/4">
            <Review placeId={placedata.id} />
          </div>
        </div>
      </section>

      {/* 🔹 Chatbot */}
      <div className="mt-16">
        <Chatbot />
      </div>
    </div>
  );
}
