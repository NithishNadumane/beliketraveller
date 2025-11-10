"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16 px-6">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Editing Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Transform your travel moments into cinematic stories with our professional
            photo and video editing. Designed to make your memories stand out beautifully.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Card Template */}
          {[
            {
              title: "Travel Reels",
              desc: "Short, engaging videos perfect for Instagram, YouTube Shorts, or TikTok — complete with fast cuts, trendy transitions, and synced music.",
              duration: "30–60 sec",
              includes: "Music sync + transitions",
              price: "₹499 / video",
              link: "https://docs.google.com/forms/d/e/1FAIpQLSesq013JDm9Sn2RVVlD3-pGzObZJWeodUou_CU3PsPCcGxmJQ/viewform?usp=header",
              image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Travel Vlogs",
              desc: "Relive your journey with creative storytelling — perfect for YouTube or sharing with friends and family. Includes captions, transitions, and audio polish.",
              duration: "3–5 min",
              includes: "Music + subtitles + color correction",
              price: "₹500 / min",
              link: "https://forms.gle/TRAVEL_VLOGS_FORM_LINK",
              image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Cinematic Travel Films",
              desc: "Make your trip look like a movie with advanced color grading, music, and cinematic storytelling — ideal for 4K highlights or brand films.",
              duration: "1–3 min (4K)",
              includes: "Cinematic music + effects",
              price: "₹500 / min",
              link: "https://forms.gle/CINEMATIC_FILM_FORM_LINK",
              image:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative group">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                <p className="text-sm text-gray-500 mb-1">⏱ Duration: {card.duration}</p>
                <p className="text-sm text-gray-500 mb-1">🎵 Includes: {card.includes}</p>
                <p className="text-red-500 font-semibold mb-4">💰 Starting at {card.price}</p>
                <Link
                  href={card.link}
                  target="_blank"
                  className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300"
                >
                  Get Started
                </Link>
                <p className="text-xs text-gray-400 mt-3 italic">
                  *Prices may vary depending on duration and footage quality. You’ll be contacted for confirmation.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="max-w-3xl mx-auto text-center mt-20 bg-white shadow-md rounded-2xl py-10 px-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Ready to Bring Your Travel Memories to Life?
          </h2>
          <p className="text-gray-600 mb-4 max-w-lg mx-auto">
            Choose your editing service above and submit the Google Form.
            Our team will review your footage and contact you via WhatsApp or your preferred platform.
          </p>
          <p className="text-sm text-gray-500">
            📁 Ensure your Drive link is set to <span className="font-semibold">“Anyone with the link”</span> for access.
          </p>
          <p className="mt-6 text-xs text-gray-400">— Team Be Like Traveller 🎒✈️</p>
        </div>
      </div>
    </>
  );
};

export default Page;
    